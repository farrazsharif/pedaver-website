// Post-build (2026-11-14): hidden "text change detection" index for the Ask PQNK bot's indexer (n8n -> RAG).
// Reads every page listed in out/sitemap.xml, takes the text inside <main id="main-content">, normalises it with
// normalize_text() (the ONE normaliser: every hash is computed through it), and writes:
//   out/content-index-data/index.json          [{url, title, content_hash, content_updated_at}]
//   out/content-index-data/pages/<id>.json     {url, title, content_hash, content_updated_at, blocks[]}
// These files are never served to the public: functions/content-index-data/[[path]].ts answers 404, and only the
// key-protected functions /api/content-index and /api/page-text read them (through env.ASSETS).
//
// content_updated_at stays fixed while a page's normalised text is unchanged: the previous index is read back from the
// live site (GET /api/content-index with INDEXER_API_KEY, available to the Cloudflare build), or from PREV_INDEX_FILE
// (local testing). A page whose hash is new or different gets this build's time. If the previous index cannot be read,
// every page gets this build's time (the indexer then simply re-reads everything once: safe, never misses a change).
// Finally out/sitemap.xml <lastmod> values are set to content_updated_at (nothing else in the sitemap changes).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";

const OUT = "out";
const SITE = "https://pedaver.com";
const DATA = join(OUT, "content-index-data");
const BUILD_TIME = new Date().toISOString();

const sha256 = (s) => createHash("sha256").update(s, "utf8").digest("hex");
export const pageId = (url) => sha256(url).slice(0, 32);

// ---------------------------------------------------------------- the ONE normaliser
const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", hellip: "…",
  lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", copy: "©", reg: "®", trade: "™", middot: "·",
  times: "×", deg: "°", bull: "•", laquo: "«", raquo: "»", shy: "­" };
function decodeEntities(s) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") {
      const n = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      try { return String.fromCodePoint(n); } catch { return m; }
    }
    return NAMED[e.toLowerCase()] ?? m;
  });
}
/** Strip HTML (script/style content removed), decode entities, Unicode NFC, remove zero-width characters,
 *  collapse all whitespace to single spaces, trim. Works the same for Urdu/Arabic and English text. */
export function normalize_text(html) {
  return decodeEntities(
    String(html)
      .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1\s*>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]*>/g, " ")
  )
    .normalize("NFC")
    .replace(/[​‌‍⁠﻿­]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ---------------------------------------------------------------- main-content extraction
// Interactive page furniture inside <main> (buttons, forms, navigation, the "Read aloud" controls) is not article text.
const FURNITURE = /<(nav|button|form|select|textarea|svg|script|style|noscript|template)\b[\s\S]*?<\/\1\s*>/gi;
function mainContent(html) {
  const a = html.search(/<main\b[^>]*\bid="main-content"/);
  if (a < 0) return null;
  const b = html.indexOf("</main>", a);
  if (b < 0) return null;
  let m = html.slice(html.indexOf(">", a) + 1, b);
  for (let i = 0; i < 3; i++) m = m.replace(FURNITURE, " "); // nested furniture
  return m;
}

// ---------------------------------------------------------------- blocks (paragraph / list item, with h1-h4 path)
const BLOCK_TAGS = new Set(["p", "li", "div", "section", "article", "header", "footer", "aside", "blockquote", "figure",
  "figcaption", "table", "thead", "tbody", "tr", "td", "th", "ul", "ol", "dl", "dt", "dd", "pre", "h1", "h2", "h3", "h4", "h5", "h6"]);
function blocks(main) {
  const out = [];
  const path = [null, null, null, null]; // h1..h4 texts
  let level = 0, buf = "", inHeading = 0, headBuf = "";
  const flush = () => {
    const t = normalize_text(buf); buf = "";
    if (!t) return;
    out.push({ section_path: path.filter(Boolean).join(" > "), heading_level: level, text: t });
  };
  const re = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>|[^<]+|</g;
  let m;
  while ((m = re.exec(main))) {
    const tok = m[0];
    if (tok[0] === "<" && m[1]) {
      const tag = m[1].toLowerCase(), close = tok[1] === "/";
      const hn = /^h([1-6])$/.exec(tag);
      if (hn) {
        const n = +hn[1];
        if (!close) { flush(); inHeading = n; headBuf = ""; }
        else if (inHeading) {
          const t = normalize_text(headBuf);
          if (t && n <= 4) { path[n - 1] = t; for (let k = n; k < 4; k++) path[k] = null; level = n; }
          else if (t) buf += " " + headBuf; // h5/h6 kept as text
          inHeading = 0; headBuf = "";
        }
        continue;
      }
      if (BLOCK_TAGS.has(tag) || tag === "br") { if (!inHeading) flush(); continue; }
      if (inHeading) headBuf += " "; else buf += " "; // inline tag: a space, as in normalize_text()
      continue;
    }
    if (inHeading) headBuf += tok; else buf += tok;
  }
  flush();
  return out;
}

// ---------------------------------------------------------------- previous index (for stable dates)
async function previousIndex() {
  try {
    if (process.env.PREV_INDEX_FILE) return JSON.parse(readFileSync(process.env.PREV_INDEX_FILE, "utf8"));
    const key = process.env.INDEXER_API_KEY;
    if (!key) return null;
    const r = await fetch(`${SITE}/api/content-index`, { headers: { "x-api-key": key }, signal: AbortSignal.timeout(20000) });
    if (!r.ok) return null;
    const j = await r.json();
    return Array.isArray(j) ? j : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------- run
const sitemapPath = join(OUT, "sitemap.xml");
if (!existsSync(sitemapPath)) { console.log("content-index: no out/sitemap.xml, skipped"); process.exit(0); }
const sitemap = readFileSync(sitemapPath, "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const prev = await previousIndex();
const prevMap = new Map((prev || []).map((p) => [p.url, p]));

mkdirSync(join(DATA, "pages"), { recursive: true });
const index = [];
const skipped = [];
for (const url of urls) {
  if (!url.startsWith(SITE + "/")) { skipped.push([url, "other host"]); continue; }
  const rel = decodeURIComponent(url.slice(SITE.length)).replace(/^\/|\/$/g, "");
  const file = join(OUT, rel, "index.html");
  if (!existsSync(file)) { skipped.push([url, "no page file"]); continue; }
  const html = readFileSync(file, "utf8");
  if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) { skipped.push([url, "noindex"]); continue; }
  const main = mainContent(html);
  if (main === null) { skipped.push([url, "no main-content"]); continue; }
  const text = normalize_text(main);
  const content_hash = sha256(text);
  const old = prevMap.get(url);
  const content_updated_at = old && old.content_hash === content_hash && old.content_updated_at ? old.content_updated_at : BUILD_TIME;
  const title = normalize_text((/<title>([\s\S]*?)<\/title>/i.exec(html) || [, ""])[1]);
  index.push({ url, title, content_hash, content_updated_at });
  writeFileSync(join(DATA, "pages", pageId(url) + ".json"),
    JSON.stringify({ url, title, content_hash, content_updated_at, blocks: blocks(main) }));
}
writeFileSync(join(DATA, "index.json"), JSON.stringify(index));

// sitemap: only <lastmod> changes, to the page's content date
const dates = new Map(index.map((p) => [p.url, p.content_updated_at]));
const newSitemap = sitemap.replace(/(<loc>([^<]+)<\/loc>\s*<lastmod>)[^<]*(<\/lastmod>)/g,
  (m, a, loc, b) => (dates.has(loc.trim()) ? a + dates.get(loc.trim()) + b : m));
writeFileSync(sitemapPath, newSitemap);

const changed = index.filter((p) => p.content_updated_at === BUILD_TIME).length;
console.log(`content-index: ${index.length} pages indexed, ${changed} new or changed since the previous index` +
  `${prev ? "" : " (no previous index: all dated now)"}, ${skipped.length} skipped` +
  (skipped.length ? ": " + skipped.map((s) => s.join(" (") + ")").join(", ") : ""));

/**
 * Shared code for the hidden, read-only text index used by the Ask PQNK indexer (n8n -> RAG vector database).
 * Endpoints: GET /api/content-index and GET /api/page-text (Cloudflare Pages Functions). The data is made at build
 * time by scripts/content-index.mjs into /content-index-data/, which the public cannot open (404); it is read here
 * through env.ASSETS.
 *
 * Every request needs the header  x-api-key: <INDEXER_API_KEY>.  INDEXER_API_KEY is set in Cloudflare Pages >
 * Settings > Variables and Secrets (never in this repo). Without it the endpoints refuse everything.
 */

export interface Env {
  INDEXER_API_KEY?: string;
  ASSETS: { fetch(input: Request | string | URL, init?: RequestInit): Promise<Response> };
}
export interface Ctx {
  request: Request;
  env: Env;
  waitUntil(p: Promise<unknown>): void;
}

export const PER_MINUTE = 300; // per internet connection; a full scan of all pages (~360) takes a little over a minute
export const CACHE_SECONDS = 300; // answers are kept at Cloudflare's edge for 5 minutes

const BASE_HEADERS: Record<string, string> = {
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Cache-Control": "private, no-store",
};

export function json(status: number, body: unknown, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...BASE_HEADERS, ...extra },
  });
}

/** Constant-time comparison of two strings (so the key cannot be guessed by timing). */
function same(a: string, b: string) {
  const x = new TextEncoder().encode(a), y = new TextEncoder().encode(b);
  let d = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) d |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return d === 0;
}

/** Count one request for `key` in a window of `seconds` (Cloudflare cache; approximate, per data centre). */
async function bump(key: string, seconds: number, waitUntil: Ctx["waitUntil"]): Promise<number> {
  const cache = (caches as unknown as { default: Cache }).default;
  const window = Math.floor(Date.now() / 1000 / seconds);
  const url = `https://pedaver-indexer-limit.invalid/${seconds}/${window}/${encodeURIComponent(key)}`;
  const hit = await cache.match(url);
  const count = (hit ? parseInt(await hit.text(), 10) || 0 : 0) + 1;
  const left = seconds - (Math.floor(Date.now() / 1000) % seconds);
  waitUntil(cache.put(url, new Response(String(count), { headers: { "Cache-Control": `max-age=${Math.max(left, 1)}` } })));
  return count;
}

/** Key check + speed limit. Returns a refusal Response, or null when the request may go on. */
export async function guard({ request, env, waitUntil }: Ctx): Promise<Response | null> {
  if (!env.INDEXER_API_KEY) return json(503, { error: "not_configured" });
  const key = request.headers.get("x-api-key") || "";
  if (!key || !same(key, env.INDEXER_API_KEY)) return json(401, { error: "unauthorized" });
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  if ((await bump(ip, 60, waitUntil)) > PER_MINUTE) return json(429, { error: "too_many" }, { "Retry-After": "60" });
  return null;
}

/** Read a build-time data file. Cached at the edge for CACHE_SECONDS (after the key check, never before it). */
export async function readData(ctx: Ctx, path: string): Promise<Response | null> {
  const cache = (caches as unknown as { default: Cache }).default;
  const cacheKey = `https://pedaver-indexer-cache.invalid${path}`;
  const hit = await cache.match(cacheKey);
  if (hit) return hit;
  const r = await ctx.env.ASSETS.fetch(new URL(path, ctx.request.url));
  if (!r.ok) return null;
  const type = r.headers.get("Content-Type") || "";
  if (!type.includes("json")) return null; // e.g. the site's 404 page
  const body = await r.text();
  const res = new Response(body, { headers: { "Content-Type": "application/json", "Cache-Control": `max-age=${CACHE_SECONDS}` } });
  ctx.waitUntil(cache.put(cacheKey, res.clone()));
  return res;
}

export async function pageId(url: string) {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(url));
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

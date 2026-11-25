// Crop Prices data proxy for pedaver.com (from the Ask PQNK developer's package, 2026-11-25).
// pedaver.com changes: no Access-Control-Allow-Origin (the tool is same-origin, so other websites cannot use this as an
// AMIS gateway), requests from other sites' pages refused, and price-series ranges limited to 20 years ending no later than tomorrow.
// Fetches amis.pk (Agriculture Marketing Information Service, Punjab) server-side, because browsers
// cannot call amis.pk directly (plain HTTP, no CORS). Standard Fetch API only, so the same file runs as a
// Cloudflare Pages Function / Worker and on Node 20+.
//
// GET <base>?op=series&crop=<id>&city=<id>&start=M/D/YYYY&end=M/D/YYYY   wholesale price series
// GET <base>?op=retail&date=YYYY-MM-DD                                  official retail, all items x districts
// GET <base>?op=today&market=<market-page id>[&date=YYYY-MM-DD]         all items' mandi rates at one market
//
// Responses are the same JSON the AMIS Prices Android/iPhone apps use.

const HOST = "http://amis.pk";
const TREND_URL = HOST + "/Price%20Trends.aspx";
const RETAIL_URL = HOST + "/Reports/districtretail.aspx";
const VIEW_URL = HOST + "/ViewPrices.aspx?searchType=1&commodityId=";
const UA = "Mozilla/5.0 (compatible; PedaverCropPrices/1.0; +https://pedaver.com/crop-prices/)";

// ------------------------------------------------------------------ HTTP session with manual cookies
class Session {
  constructor() { this.cookies = new Map(); }
  async get(url) { return this.request(url, null); }
  async post(url, fields) {
    const body = fields.map(([k, v]) => enc(k) + "=" + enc(v)).join("&");
    return this.request(url, body);
  }
  async request(url, body) {
    let target = url;
    for (let hop = 0; hop < 5; hop++) {
      const headers = { "User-Agent": UA };
      if (this.cookies.size) headers["Cookie"] = [...this.cookies].map(([k, v]) => k + "=" + v).join("; ");
      if (body != null) headers["Content-Type"] = "application/x-www-form-urlencoded";
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 60000);
      let res;
      try {
        res = await fetch(target, { method: body != null ? "POST" : "GET", headers, body: body ?? undefined, redirect: "manual", signal: ctrl.signal });
      } finally { clearTimeout(timer); }
      const setCookies = typeof res.headers.getSetCookie === "function" ? res.headers.getSetCookie()
        : (res.headers.get("set-cookie") ? [res.headers.get("set-cookie")] : []);
      for (const sc of setCookies) {
        const kv = sc.split(";", 1)[0], eq = kv.indexOf("=");
        if (eq > 0) this.cookies.set(kv.slice(0, eq).trim(), kv.slice(eq + 1).trim());
      }
      const loc = res.headers.get("location");
      if (res.status >= 300 && res.status < 400 && loc) { target = new URL(loc, target).toString(); body = null; continue; }
      if (res.status >= 400) throw new Error("AMIS server error " + res.status);
      return await res.text();
    }
    throw new Error("Too many redirects");
  }
}

function enc(s) {
  // application/x-www-form-urlencoded, byte-identical to Java's URLEncoder
  return encodeURIComponent(s).replace(/[!'()~]/g, c => "%" + c.charCodeAt(0).toString(16).toUpperCase()).replace(/%20/g, "+");
}

// ------------------------------------------------------------------ ASP.NET form helpers
function unescapeHtml(s) {
  if (s.indexOf("&") < 0) return s;
  return s.replace(/&(#x[0-9a-fA-F]+|#\d+|amp|lt|gt|quot|apos|nbsp);/g, (m, e) => {
    if (e === "amp") return "&"; if (e === "lt") return "<"; if (e === "gt") return ">";
    if (e === "quot") return '"'; if (e === "apos") return "'"; if (e === "nbsp") return " ";
    if (e[1] === "x" || e[1] === "X") return String.fromCharCode(parseInt(e.slice(2), 16));
    return String.fromCharCode(parseInt(e.slice(1), 10));
  });
}
function formFields(html) {
  const out = [];
  const set = (k, v) => { const i = out.findIndex(x => x[0] === k); if (i >= 0) out[i][1] = v; else out.push([k, v]); };
  for (const m of html.matchAll(/<input[^>]*>/gi)) {
    const tag = m[0], name = /name="([^"]+)"/.exec(tag);
    if (!name) continue;
    const type = ((/type="([^"]+)"/.exec(tag) || [])[1] || "text").toLowerCase();
    if (["submit", "image", "checkbox", "button"].includes(type)) continue;
    const v = /value="([^"]*)"/.exec(tag);
    set(unescapeHtml(name[1]), v ? unescapeHtml(v[1]) : "");
  }
  for (const m of html.matchAll(/<select[^>]*name="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g)) {
    const sel = /<option[^>]*selected="selected"[^>]*value="([^"]*)"/.exec(m[2]);
    set(unescapeHtml(m[1]), sel ? unescapeHtml(sel[1]) : "");
  }
  out.set = set;
  return out;
}
function exportBase(html) {
  const m = /"ExportUrlBase":"([^"]+)"/.exec(html);
  return m ? m[1].replace(/\\u0026/g, "&").replace(/\\\//g, "/") : null;
}
function splitCsv(line) {
  const cells = []; let cur = "", q = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { if (q && line[i + 1] === '"') { cur += '"'; i++; } else q = !q; }
    else if (ch === "," && !q) { cells.push(cur); cur = ""; }
    else cur += ch;
  }
  cells.push(cur);
  return cells;
}
const lines = s => s.replace(/^﻿/, "").split(/\r?\n/);
const num = v => { const n = parseFloat(String(v).replace(/,/g, "").trim()); return isFinite(n) ? n : 0; };
const fmt = v => Number.isInteger(v) ? String(v) : String(v);
const key = name => name.toLowerCase().replace(/[^a-z0-9]/g, "");
const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };
const pad = n => (n < 10 ? "0" : "") + n;

// ------------------------------------------------------------------ operations
async function retry(fn) {
  let last;
  for (let i = 0; i < 2; i++) {
    try { return await fn(); } catch (e) { last = e; await new Promise(r => setTimeout(r, 800)); }
  }
  throw last;
}

export async function fetchSeries(crop, city, start, end) {
  return retry(async () => {
    const s = new Session();
    const f = formFields(await s.get(TREND_URL));
    if (!f.some(x => x[0] === "ReportViewer1$ctl08$ctl03$ddValue")) throw new Error("AMIS report page changed");
    f.set("ReportViewer1$ctl08$ctl03$ddValue", String(crop));
    f.set("ReportViewer1$ctl08$ctl05$ddValue", String(city));
    f.set("ReportViewer1$ctl08$ctl07$txtValue", start);
    f.set("ReportViewer1$ctl08$ctl09$txtValue", end);
    f.set("__EVENTTARGET", ""); f.set("__EVENTARGUMENT", ""); f.set("ReportViewer1$ctl08$ctl00", "View Report");
    const base = exportBase(await s.post(TREND_URL, f));
    if (!base) throw new Error("AMIS did not return a report");
    return parseSeries(await s.get(HOST + base + "CSV"));
  });
}
export function parseSeries(csv) {
  const ls = lines(csv);
  let unit = "";
  if (ls.length > 1) { const m = splitCsv(ls[1]); if (m.length >= 5) unit = m[4].trim(); }
  const pts = []; let inData = false;
  for (const line of ls) {
    if (line.startsWith("Price_label")) { inData = true; continue; }
    if (!inData || !line.trim()) continue;
    const c = splitCsv(line);
    if (c.length < 3) continue;
    const price = num(c[2]);
    const d = /^(\d{1,2}) ([A-Za-z]{3}) (\d{2})$/.exec(c[1].trim());
    if (!(price > 0) || !d || !MONTHS[d[2].toLowerCase()]) continue;
    pts.push([`20${d[3]}-${pad(MONTHS[d[2].toLowerCase()])}-${pad(+d[1])}`, price]);
  }
  return { ok: true, unit, points: pts };
}

export async function fetchRetail(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return retry(async () => {
    const s = new Session();
    const f = formFields(await s.get(RETAIL_URL));
    if (!f.some(x => x[0] === "PriceDistrict$ctl08$ctl03$txtValue")) throw new Error("AMIS retail page changed");
    f.set("PriceDistrict$ctl08$ctl03$txtValue", `${m}/${d}/${y}`);
    f.set("__EVENTTARGET", ""); f.set("__EVENTARGUMENT", ""); f.set("PriceDistrict$ctl08$ctl00", "View Report");
    const base = exportBase(await s.post(RETAIL_URL, f));
    if (!base) throw new Error("AMIS did not return the retail report");
    return parseRetail(await s.get(HOST + base + "CSV"), iso);
  });
}
export function parseRetail(csv, iso) {
  const ls = lines(csv), items = {};
  const h = splitCsv(ls[0] || "");
  for (const line of ls.slice(1)) {
    const c = splitCsv(line);
    if (c.length < 3 || !c[0].trim()) continue;
    const row = {};
    for (let i = 1; i + 1 < c.length && i + 1 < h.length; i += 2) {
      let lo = num(c[i]), hi = num(c[i + 1]);
      if (lo <= 0 && hi <= 0) continue;
      if (lo <= 0) lo = hi; if (hi <= 0) hi = lo;
      if (lo > hi) [lo, hi] = [hi, lo];
      row[h[i].trim()] = [lo, hi];
    }
    if (Object.keys(row).length) items[key(c[0])] = row;
  }
  return { ok: true, date: iso, items, n: Object.keys(items).length };
}

export async function fetchToday(market, iso) {
  return retry(async () => {
    const s = new Session(), url = VIEW_URL + market;
    let page = await s.get(url);
    if (iso) {
      const [y, m, d] = iso.split("-").map(Number);
      const f = formFields(page).filter(x => !x[0].includes("ListBox2"));
      const set = (k, v) => { const i = f.findIndex(x => x[0] === k); if (i >= 0) f[i][1] = v; else f.push([k, v]); };
      set("ctl00$cphPage$DateTextBox", `${m}/${d}/${y}`);
      set("ctl00$cphPage$ReminderButton", "Show prices");
      page = await s.post(url, f);
    }
    return parseToday(page);
  });
}
export function parseToday(html) {
  const i = html.indexOf("ctl00_cphPage_tabletext");
  if (i < 0) throw new Error("AMIS market page changed");
  const seg = html.slice(i);
  const dm = /Dated:\s*(\d{1,2})-(\d{1,2})-(\d{4})/.exec(seg);
  const date = dm ? `${dm[3]}-${pad(+dm[2])}-${pad(+dm[1])}` : "";
  const items = {};
  for (const r of seg.matchAll(/<tr[\s\S]*?<\/tr>/gi)) {
    const c = [...r[0].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)]
      .map(x => unescapeHtml(x[1].replace(/<[^>]+>/g, "")).replace(/ /g, " ").replace(/&nbsp/g, " ").trim());
    if (c.length < 6 || !/^\d+\s+/.test(c[0])) continue;
    let lo = num(c[2]), hi = num(c[3]), fqp = num(c[4]);
    if (fqp <= 0 && lo <= 0 && hi <= 0) continue;
    if (fqp <= 0) fqp = lo > 0 && hi > 0 ? (lo + hi) / 2 : Math.max(lo, hi);
    if (lo <= 0) lo = fqp; if (hi <= 0) hi = fqp;
    items[key(c[0].replace(/^\d+\s+/, ""))] = [lo, hi, fqp];
  }
  return { ok: true, date, items, n: Object.keys(items).length };
}

// ------------------------------------------------------------------ request handler
const isoRe = /^\d{4}-\d{2}-\d{2}$/, mdyRe = /^\d{1,2}\/\d{1,2}\/\d{4}$/, idRe = /^\d{1,4}$/;
function todayPk() {           // calendar date in Pakistan (UTC+5)
  const d = new Date(Date.now() + 5 * 3600 * 1000);
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
}
function mdyToIso(s) { const [m, d, y] = s.split("/").map(Number); return `${y}-${pad(m)}-${pad(d)}`; }
function json(obj, status, maxAge) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": maxAge ? `public, max-age=${maxAge}` : "no-store"
    }
  });
}

/**
 * Handles one API request. `cache` is optional: a Cache-API compatible object
 * (Cloudflare: caches.default). Results are cached so amis.pk is not hit once per visitor:
 * past dates for 30 days, anything involving today for 30 minutes.
 */
export async function handleCropPrices(request, { cache, waitUntil } = {}) {
  const url = new URL(request.url), q = url.searchParams, op = q.get("op");
  // Only the Crop Prices page on this site may use the proxy. Browsers send Sec-Fetch-Site on every fetch; a page on another
  // website shows "cross-site". (Requests without the header, e.g. a server or curl, are still served, from the cache when possible.)
  const sfs = request.headers.get("sec-fetch-site");
  if (sfs && sfs !== "same-origin" && sfs !== "none") return json({ ok: false, code: "bad", error: "not allowed" }, 403);
  const today = todayPk();
  let job, ttl;
  try {
    if (op === "series") {
      const crop = q.get("crop"), city = q.get("city"), start = q.get("start"), end = q.get("end");
      if (!idRe.test(crop || "") || !idRe.test(city || "") || !mdyRe.test(start || "") || !mdyRe.test(end || "")) return json({ ok: false, code: "bad", error: "bad parameters" }, 400);
      const s0 = mdyToIso(start), e0 = mdyToIso(end);
      if (s0 > e0 || Date.parse(e0) > Date.parse(today) + 86400000 || Date.parse(e0) - Date.parse(s0) > 7400 * 86400000) return json({ ok: false, code: "bad", error: "bad range" }, 400);
      ttl = mdyToIso(end) < today ? 30 * 86400 : 6 * 3600;
      job = () => fetchSeries(+crop, +city, start, end);
    } else if (op === "retail") {
      const date = q.get("date");
      if (!isoRe.test(date || "") || date > today) return json({ ok: false, code: "bad", error: "bad date" }, 400);
      ttl = date < today ? 30 * 86400 : 1800;
      job = () => fetchRetail(date);
    } else if (op === "today") {
      const market = q.get("market"), date = q.get("date") || "";
      if (!idRe.test(market || "") || (date && (!isoRe.test(date) || date > today))) return json({ ok: false, code: "bad", error: "bad parameters" }, 400);
      ttl = date && date < today ? 30 * 86400 : 1800;
      job = () => fetchToday(+market, date === today ? "" : date);
    } else {
      return json({ ok: false, code: "bad", error: "unknown op" }, 400);
    }
  } catch (e) {
    return json({ ok: false, code: "bad", error: String(e && e.message || e) }, 400);
  }

  // normalised cache key (today's date is part of it so "today" entries roll over at midnight PKT)
  const ck = new Request(`https://crop-prices.cache/${op}?${[...q].filter(([k]) => k !== "_").sort().map(([k, v]) => k + "=" + v).join("&")}&d=${today}`);
  if (cache) {
    const hit = await cache.match(ck);
    if (hit) return hit;
  }
  let body;
  try {
    body = await job();
  } catch (e) {
    return json({ ok: false, code: "server", error: String(e && e.message || e) }, 502);
  }
  // don't keep empty "today" answers long: AMIS uploads rates during the morning
  if ((op === "today" || op === "retail") && body.n === 0 && ttl > 1800) ttl = 1800;
  if (op === "today" || op === "retail") { if (body.n === 0) ttl = Math.min(ttl, 900); }
  const res = json(body, 200, ttl);
  if (cache) {
    const p = cache.put(ck, res.clone());
    if (waitUntil) waitUntil(p); else await p;
  }
  return res;
}

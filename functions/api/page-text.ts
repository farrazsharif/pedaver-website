/**
 * GET /api/page-text?url=<canonical url>   (hidden, read-only; header x-api-key required)
 * { url, title, content_hash, content_updated_at, blocks: [{ section_path, heading_level, text }] }
 * content_hash is the same as in /api/content-index. ETag = content_hash (If-None-Match -> 304). Unknown url -> 404.
 */
import { guard, json, readData, pageId, type Ctx } from "../../functions-lib/indexer";

export async function onRequestGet(ctx: Ctx) {
  const refused = await guard(ctx);
  if (refused) return refused;
  const url = new URL(ctx.request.url).searchParams.get("url") || "";
  if (!/^https:\/\/pedaver\.com\//.test(url)) return json(404, { error: "unknown_url" });
  const data = await readData(ctx, `/content-index-data/pages/${await pageId(url)}.json`);
  if (!data) return json(404, { error: "unknown_url" });
  const page = (await data.json()) as { url: string; content_hash: string; content_updated_at: string };
  if (page.url !== url) return json(404, { error: "unknown_url" });
  const etag = `"${page.content_hash}"`;
  const cond = { ETag: etag, "Last-Modified": new Date(page.content_updated_at).toUTCString() };
  if ((ctx.request.headers.get("If-None-Match") || "").includes(page.content_hash)) {
    return new Response(null, { status: 304, headers: { ...cond, "X-Robots-Tag": "noindex, nofollow, noarchive", "Cache-Control": "private, no-store" } });
  }
  return json(200, page, cond);
}

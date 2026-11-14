/**
 * GET /api/content-index   (hidden, read-only; header x-api-key required)
 * All indexable pages: [{ url, title, content_hash, content_updated_at }].  ?since=<ISO date> returns only pages whose
 * text changed after that date. See functions-lib/indexer.ts and scripts/content-index.mjs.
 */
import { guard, json, readData, type Ctx } from "../../functions-lib/indexer";

type Item = { url: string; title: string; content_hash: string; content_updated_at: string };

export async function onRequestGet(ctx: Ctx) {
  const refused = await guard(ctx);
  if (refused) return refused;
  const data = await readData(ctx, "/content-index-data/index.json");
  if (!data) return json(503, { error: "index_missing" });
  let items = (await data.json()) as Item[];
  const since = new URL(ctx.request.url).searchParams.get("since");
  if (since !== null) {
    const t = Date.parse(since);
    if (Number.isNaN(t)) return json(400, { error: "bad_since", hint: "use an ISO 8601 date, e.g. 2026-11-14T00:00:00Z" });
    items = items.filter((p) => Date.parse(p.content_updated_at) > t);
  }
  return json(200, items);
}

# Hidden text index for the Ask PQNK indexer (2026-11-14)

Lets the bot's n8n workflow find which pages had their TEXT changed and re-index only those. Nothing visible changes.

- Build step `scripts/content-index.mjs` (runs at the end of `npm run build`): reads every page in `out/sitemap.xml`,
  takes the text inside `<main id="main-content">` (buttons, forms, navigation removed), normalises it with
  `normalize_text()` (strip tags + script/style, NFC, zero-width chars removed, whitespace collapsed), hashes it (sha256),
  and writes `out/content-index-data/` (index.json + one file per page with text blocks). It also sets the sitemap's
  `<lastmod>` to each page's content date.
- Dates stay fixed while the text is unchanged: the build reads the previous index from the live site using
  `INDEXER_API_KEY`. If it cannot (first deploy, or key missing), every page is dated "now" once (safe: a full re-read).
- `functions/api/content-index.ts` and `functions/api/page-text.ts` (Pages Functions, shared code in
  `functions-lib/indexer.ts`): header `x-api-key` must equal `INDEXER_API_KEY`; 300 requests a minute per connection;
  `X-Robots-Tag: noindex`; page-text has ETag/Last-Modified/304. `functions/content-index-data/[[path]].ts` makes the raw
  data folder answer 404 to the public.
- Setting: Cloudflare Pages > pedaver-website > Settings > Variables and Secrets: `INDEXER_API_KEY` (Secret, Production
  and Preview). Without it both endpoints answer 503 (nothing is exposed).
- Not covered: PDFs (every KP and chapter PDF has the same text on its web page, which is indexed); pages not in the sitemap.
- Restore point before this work: git tag `before-text-index`.

/**
 * The build-time data behind /api/content-index and /api/page-text lives in /content-index-data/. The public must
 * not be able to open it directly, so every request here gets a plain 404 (the API functions read it via env.ASSETS).
 */
export function onRequest() {
  return new Response("Not found", { status: 404, headers: { "X-Robots-Tag": "noindex", "Cache-Control": "no-store" } });
}

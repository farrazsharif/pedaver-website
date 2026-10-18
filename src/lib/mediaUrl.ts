/**
 * Resolve a site-relative media path (e.g. a PDF under /public) to its public URL.
 *
 * The large PDFs are served from an external media host — Cloudflare R2 at
 * https://files.pedaver.com — so they stay out of the website build (Cloudflare
 * Pages has a 25 MiB per-file limit, and shipping ~1.6 GB of PDFs would be
 * wasteful). Point links at that host with the build-time env var
 * NEXT_PUBLIC_MEDIA_BASE.
 *
 * When the base is unset (local `npm run dev` / `npm run build`), paths fall
 * through unchanged and resolve from /public as before, so local preview still
 * works. Only root-relative paths are rewritten; absolute URLs are left as-is.
 */
const MEDIA_BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE ?? "").replace(/\/+$/, "");

export function mediaUrl(path: string): string {
  if (!MEDIA_BASE) return path;
  if (!path.startsWith("/")) return path;
  return `${MEDIA_BASE}${path}`;
}

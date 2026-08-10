import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` on `next build` — no Node server needed.
  output: "export",
  // Emit folder/index.html for each route (e.g. /about/index.html) so Apache/LiteSpeed
  // on cPanel serves clean URLs reliably, including on page refresh of nested routes.
  trailingSlash: true,
  // We use plain <img> tags, but this keeps any future next/image usage export-safe.
  images: { unoptimized: true },
  // Next.js defaults to a fresh random build ID every build, which changes the
  // `_next/<buildId>/` folder name on every deploy. Since this is a fully
  // static export (no server-side revalidation depends on buildId uniqueness,
  // and individual chunk filenames are already content-hashed for correct
  // cache invalidation), a stable ID lets the FTP deploy action diff `_next/`
  // incrementally instead of re-uploading the whole framework bundle every
  // time — this was also intermittently causing FTP 550 errors when the
  // upload action raced to create a brand-new nested `_next/<buildId>/`
  // folder mid-deploy.
  generateBuildId: async () => "pedaver-static-build",
};

export default nextConfig;

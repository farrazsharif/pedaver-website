import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Produce a fully static site in `out/` on `next build` — no Node server needed.
  output: "export",
  // Emit folder/index.html for each route (e.g. /about/index.html) so Apache/LiteSpeed
  // on cPanel serves clean URLs reliably, including on page refresh of nested routes.
  trailingSlash: true,
  // We use plain <img> tags, but this keeps any future next/image usage export-safe.
  images: { unoptimized: true },
};

export default nextConfig;

import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pedaver — PQNK",
    short_name: "Pedaver",
    description: "Farming the way nature already knows how — PQNK, the Natural Ecosystem Science of Production Agriculture.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf7f0",
    theme_color: "#2f5233",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

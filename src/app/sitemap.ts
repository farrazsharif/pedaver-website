import type { MetadataRoute } from "next";
import { crops } from "@/lib/content/crops";
import { papers } from "@/lib/content/papers";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const staticPages = [
  "",
  "/about",
  "/founder",
  "/crops",
  "/resources",
  "/papers",
  "/advisory",
  "/services",
  "/machines",
  "/validation",
  "/videos",
  "/video-library",
  "/install",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticPages.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: now })),
    ...crops.map((crop) => ({ url: `${SITE_URL}/crops/${crop.slug}`, lastModified: now })),
    ...papers.map((paper) => ({ url: `${SITE_URL}/papers/${paper.slug}`, lastModified: new Date(paper.publishedDate) })),
  ];
}

import type { MetadataRoute } from "next";
import { crops } from "@/lib/content/crops";
import { papers } from "@/lib/content/papers";
import { SITE_URL } from "@/lib/seo";

const staticPages = [
  "",
  "/about",
  "/founder",
  "/crops",
  "/resources",
  "/papers",
  "/certification",
  "/videos",
  "/farmer-stories",
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

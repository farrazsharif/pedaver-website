import type { MetadataRoute } from "next";
import { crops } from "@/lib/content/crops";
import { papers } from "@/lib/content/papers";
import { machines } from "@/lib/content/machines";
import { resources } from "@/lib/content/resources";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

const staticPages = [
  "",
  "/about",
  "/founder",
  "/science",
  "/science/soil",
  "/science/plants",
  "/science/water",
  "/science/biodiversity",
  "/science/transition",
  "/crops",
  "/resources",
  "/papers",
  "/advisory",
  "/services",
  "/machines",
  "/validation",
  "/videos",
  "/video-library",
  "/farmer-voices",
  "/install",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticPages.map((path) => ({ url: `${SITE_URL}${path}`, lastModified: now })),
    ...crops.map((crop) => ({ url: `${SITE_URL}/crops/${crop.slug}`, lastModified: now })),
    ...papers.map((paper) => ({ url: `${SITE_URL}/papers/${paper.slug}`, lastModified: new Date(paper.publishedDate) })),
    ...machines.map((machine) => ({ url: `${SITE_URL}/machines/${machine.slug}`, lastModified: now })),
    ...resources.map((resource) => ({ url: `${SITE_URL}/resources/${resource.slug}`, lastModified: now })),
  ];
}

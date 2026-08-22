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
  "/science/nutrition",
  "/science/crop-protection",
  "/science/climate",
  "/science/food-quality",
  "/science/production-architecture",
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
    // publishedDate means two different things depending on the paper: for
    // Pedaver-authored papers it's genuinely when the page was published, a
    // correct lastmod. For externally-cited papers (externalUrl set), it's
    // the CITED WORK's original publication date — e.g. a 2011 Springer
    // journal article — which has nothing to do with when Pedaver's own
    // page about it was last touched. Using it as lastmod there makes a
    // current page look 15 years stale to crawlers. Fall back to the same
    // build-time signal every other content type already uses.
    // modifiedDate (set only when a substantive revision like an R1 rewrite
    // has happened) is the most recent applicable date when present, since
    // that's a genuine "this page changed" signal for crawlers.
    ...papers.map((paper) => ({
      url: `${SITE_URL}/papers/${paper.slug}`,
      lastModified: paper.externalUrl ? now : new Date(paper.modifiedDate ?? paper.publishedDate),
    })),
    ...machines.map((machine) => ({ url: `${SITE_URL}/machines/${machine.slug}`, lastModified: now })),
    ...resources.map((resource) => ({ url: `${SITE_URL}/resources/${resource.slug}`, lastModified: now })),
  ];
}

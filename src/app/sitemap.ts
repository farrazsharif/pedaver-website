import type { MetadataRoute } from "next";
import { crops } from "@/lib/content/crops";
import { papers } from "@/lib/content/papers";
import { machines } from "@/lib/content/machines";
import { resources } from "@/lib/content/resources";
import { books, getPublishedChapters } from "@/lib/content/books";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// next.config.ts sets trailingSlash: true, so every page's actual canonical
// URL (and the folder/index.html Apache serves) ends in "/" — but this
// route's raw string URLs don't get that treatment automatically the way
// page metadata does. Without this, every sitemap entry 301-redirects to
// its own trailing-slash canonical before Google ever sees a 200.
function toUrl(path: string): string {
  return path === "" ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
}

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
  "/field-evidence",
  "/books",
  "/validation",
  "/videos",
  "/video-library",
  "/farmer-voices",
  "/ask",
  "/install",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticPages.map((path) => ({ url: toUrl(path), lastModified: now })),
    ...crops.map((crop) => ({ url: toUrl(`/crops/${crop.slug}`), lastModified: now })),
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
      url: toUrl(`/papers/${paper.slug}`),
      lastModified: paper.externalUrl ? now : new Date(paper.modifiedDate ?? paper.publishedDate),
    })),
    ...machines.map((machine) => ({ url: toUrl(`/machines/${machine.slug}`), lastModified: now })),
    ...resources.map((resource) => ({ url: toUrl(`/resources/${resource.slug}`), lastModified: now })),
    // Every book's landing page is always indexed, regardless of how many of
    // its chapters are published — it's the permanent home of the book. Only
    // PUBLISHED chapters get their own sitemap entry: an "in-preparation"
    // chapter has no route at all (see books.ts / the chapter page's
    // generateStaticParams), so there's nothing to list here for it yet.
    ...books.map((book) => ({ url: toUrl(`/books/${book.bookId}`), lastModified: now })),
    ...books.flatMap((book) =>
      getPublishedChapters(book).map((chapter) => ({
        url: toUrl(`/books/${book.bookId}/${chapter.chapterId}`),
        lastModified: new Date(chapter.modifiedDate ?? chapter.publishedDate ?? now),
      }))
    ),
  ];
}

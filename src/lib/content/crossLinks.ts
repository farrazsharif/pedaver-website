import { crops, type Crop } from "./crops";
import { papers, type Paper } from "./papers";

/**
 * Lightweight keyword-based cross-linking between crops and Knowledge Papers.
 *
 * There's no manually curated relation field on either type (122 papers x 21
 * crops would make hand-maintaining that mapping a real maintenance burden),
 * so instead we match on the crop's own name appearing in a paper's title —
 * which is how nearly every crop-specific paper in papers.ts is actually
 * titled (e.g. "Transforming Wheat Production through PQNK" for the Wheat
 * crop). This is deliberately conservative: it only surfaces papers whose
 * title clearly names the crop, so it stays precise rather than exhaustive.
 */

const STOPWORDS = new Set([
  "and", "the", "of", "for", "through", "a", "an", "in", "on", "with", "to", "by",
]);

function keywordsFor(name: string): string[] {
  return name
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}

export function getRelatedPapers(crop: Crop, max = 4): Paper[] {
  const keywords = keywordsFor(crop.name);
  if (keywords.length === 0) return [];
  return papers
    .filter((paper) => {
      const title = paper.title.toLowerCase();
      return keywords.some((keyword) => title.includes(keyword));
    })
    .slice(0, max);
}

export function getRelatedCrops(paper: Paper, max = 4): Crop[] {
  const title = paper.title.toLowerCase();
  return crops
    .filter((crop) => keywordsFor(crop.name).some((keyword) => title.includes(keyword)))
    .slice(0, max);
}

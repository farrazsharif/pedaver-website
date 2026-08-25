import { crops, type Crop } from "./crops";
import { papers, type Paper } from "./papers";
import type { Machine } from "./machines";
import { METADATA } from "./knowledge/taxonomy";
import taxonomyData from "./knowledge/taxonomy.json";

/**
 * Crop ↔ Knowledge Paper cross-linking.
 *
 * Primary signal: the already-structured `crops` field in metadata.json —
 * each paper is already tagged with the canonical taxonomy crop(s) it
 * covers, so this is a direct, accurate join, not an inference.
 *
 * Fallback (unchanged from before): a small number of crops.ts entries
 * don't map cleanly onto a single canonical taxonomy crop name — either
 * because they combine two crops ("Onion & Garlic") or because they're not
 * a single crop at all (a farming system like "Agroforestry", or a bundled
 * guide like "Vegetables — One Acre Prosperity"). For those specifically,
 * fall back to the original title-keyword match rather than silently
 * losing their existing related-paper links.
 */

const CANONICAL_CROP_NAMES = new Set(Object.keys(taxonomyData.crops));

// crops.ts display names that don't map 1:1 onto a single canonical
// taxonomy crop — named explicitly rather than guessed.
const CANONICAL_CROP_OVERRIDES: Record<string, string[]> = {
  "Onion & Garlic": ["Onion", "Garlic"],
};

function canonicalCropNames(crop: Crop): string[] {
  if (CANONICAL_CROP_OVERRIDES[crop.name]) return CANONICAL_CROP_OVERRIDES[crop.name];
  return CANONICAL_CROP_NAMES.has(crop.name) ? [crop.name] : [];
}

const STOPWORDS = new Set([
  "and", "the", "of", "for", "through", "a", "an", "in", "on", "with", "to", "by",
]);

function keywordsFor(name: string): string[] {
  return name
    .toLowerCase()
    .split(/[^a-z]+/)
    .filter((word) => word.length > 2 && !STOPWORDS.has(word));
}

function titleKeywordMatchPapers(crop: Crop, max: number): Paper[] {
  const keywords = keywordsFor(crop.name);
  if (keywords.length === 0) return [];
  return papers
    .filter((paper) => {
      const title = paper.title.toLowerCase();
      return keywords.some((keyword) => title.includes(keyword));
    })
    .slice(0, max);
}

export function getRelatedPapers(crop: Crop, max = 4): Paper[] {
  const canonicalNames = canonicalCropNames(crop);
  if (canonicalNames.length > 0) {
    const matchingSlugs = new Set(
      METADATA.filter((m) => m.crops.some((c) => canonicalNames.includes(c))).map((m) => m.slug)
    );
    if (matchingSlugs.size > 0) {
      return papers.filter((p) => matchingSlugs.has(p.slug)).slice(0, max);
    }
  }
  return titleKeywordMatchPapers(crop, max);
}

/**
 * Machine ↔ Knowledge Paper cross-linking, additive to the existing
 * hand-curated `relatedConcepts`/`furtherReading` on Machine — not a
 * replacement for either. Uses metadata.json's `machineryTools` field,
 * which stores the exact canonical taxonomy key per paper (verified
 * directly, not an alias or a guess) — a clean, explicit join, one entry
 * per machine in this codebase today.
 */
const MACHINE_CANONICAL_TOOL: Record<string, string> = {
  "hardpan-breaker": "Subsoiler / Hardpan Breaker",
  "raised-bed-shaper": "Raised Bed Shaper (PQNK machine)",
  "sipp-planter": "SIPP (PQNK machine)",
  "vipp-planter": "VIPP (PQNK machine)",
  "mulcher-bed-renovator": "Mulcher & Bed Renovator (PQNK machine)",
};

export function getRelatedPapersForMachine(machine: Machine, max = 6): Paper[] {
  const canonicalTool = MACHINE_CANONICAL_TOOL[machine.slug];
  if (!canonicalTool) return [];
  const matchingSlugs = new Set(
    METADATA.filter((m) => m.machineryTools.includes(canonicalTool)).map((m) => m.slug)
  );
  return papers.filter((p) => matchingSlugs.has(p.slug)).slice(0, max);
}

export function getRelatedCrops(paper: Paper, max = 4): Crop[] {
  const meta = METADATA.find((m) => m.slug === paper.slug);
  if (meta && meta.crops.length > 0) {
    const taggedCrops = crops.filter((crop) =>
      canonicalCropNames(crop).some((name) => meta.crops.includes(name))
    );
    if (taggedCrops.length > 0) return taggedCrops.slice(0, max);
  }
  const title = paper.title.toLowerCase();
  return crops.filter((crop) => keywordsFor(crop.name).some((keyword) => title.includes(keyword))).slice(0, max);
}

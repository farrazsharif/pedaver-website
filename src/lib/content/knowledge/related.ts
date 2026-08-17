import type { Paper } from "@/lib/content/papers";
import type { PaperMetadata } from "./taxonomy";

/**
 * Related Knowledge — implements the exact weighting order approved in
 * TAXONOMY_AUDIT_REPORT.md §17:
 *   1. explicit companion/response/continuation relationship (always wins)
 *   2. same field problem
 *   3. same crop
 *   4. same field practice
 *   5. same Science domain(s)
 *   6. same production stage
 *   7. same machinery
 *   8. shared PQNK principle (weakest signal alone — tiebreaker only)
 *
 * Hand-identified from the Phase 1 audit — the only editorial (non-algorithmic)
 * relationships in the corpus. These always outrank algorithmic similarity.
 */
export const EXPLICIT_PAIRS: [string, string][] = [
  ["sugarcane-the-bamboo-principle", "sugarcane-cultivation-on-pqnk"],
  ["beyond-extraction-and-illusion", "a-regenerative-imperative-a-pqnk-response"],
  ["watermelon-cultivation-under-pqnk", "watermelon-cultivation-pruning-and-nutrition-qa"],
];

const EXPLICIT_PARTNERS = new Map<string, string[]>();
for (const [a, b] of EXPLICIT_PAIRS) {
  if (!EXPLICIT_PARTNERS.has(a)) EXPLICIT_PARTNERS.set(a, []);
  if (!EXPLICIT_PARTNERS.has(b)) EXPLICIT_PARTNERS.set(b, []);
  EXPLICIT_PARTNERS.get(a)!.push(b);
  EXPLICIT_PARTNERS.get(b)!.push(a);
}

function overlapCount(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setB = new Set(b);
  let n = 0;
  for (const x of a) if (setB.has(x)) n++;
  return n;
}

export interface RelatedPaper {
  paper: Paper;
  score: number;
  reason: string;
}

export function getRelatedKnowledge(
  currentPaper: Paper,
  currentMeta: PaperMetadata | undefined,
  allPapers: Paper[],
  getMeta: (slug: string) => PaperMetadata | undefined,
  max = 4
): RelatedPaper[] {
  const explicitSlugs = EXPLICIT_PARTNERS.get(currentPaper.slug) ?? [];
  const explicit: RelatedPaper[] = [];
  for (const slug of explicitSlugs) {
    const p = allPapers.find((x) => x.slug === slug);
    if (p) explicit.push({ paper: p, score: Infinity, reason: "Companion paper" });
  }

  if (!currentMeta) return explicit.slice(0, max);

  const scored: RelatedPaper[] = [];
  for (const paper of allPapers) {
    if (paper.slug === currentPaper.slug) continue;
    if (explicitSlugs.includes(paper.slug)) continue; // already included above
    const meta = getMeta(paper.slug);
    if (!meta) continue;

    let score = 0;
    const reasons: string[] = [];

    const problemOverlap = overlapCount(currentMeta.fieldProblems, meta.fieldProblems);
    if (problemOverlap > 0) { score += problemOverlap * 50; reasons.push("same problem"); }

    const cropOverlap = overlapCount(currentMeta.crops, meta.crops);
    if (cropOverlap > 0) { score += cropOverlap * 30; reasons.push("same crop"); }

    const practiceOverlap = overlapCount(currentMeta.fieldPractices, meta.fieldPractices);
    if (practiceOverlap > 0) { score += practiceOverlap * 15; reasons.push("same practice"); }

    const domainOverlap = overlapCount(currentMeta.scientificDomains, meta.scientificDomains);
    if (domainOverlap > 0) { score += domainOverlap * 8; reasons.push("same science"); }

    const stageOverlap = overlapCount(currentMeta.productionStages, meta.productionStages);
    if (stageOverlap > 0) { score += stageOverlap * 4; reasons.push("same production stage"); }

    const machineryOverlap = overlapCount(currentMeta.machineryTools, meta.machineryTools);
    if (machineryOverlap > 0) { score += machineryOverlap * 2; reasons.push("same machinery"); }

    const principleOverlap = overlapCount(currentMeta.pqnkPrinciples, meta.pqnkPrinciples);
    if (principleOverlap > 0) { score += principleOverlap * 1; reasons.push("shared principle"); }

    if (score > 0) scored.push({ paper, score, reason: reasons[0] ?? "related" });
  }

  scored.sort((a, b) => b.score - a.score);
  return [...explicit, ...scored].slice(0, max);
}

import type { Paper } from "@/lib/content/papers";
import type { PaperMetadata } from "./taxonomy";
import { CURRENT_APPROVED } from "./taxonomy";

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

/**
 * Science → Related Knowledge Papers (Phase 2). A reverse lookup over the
 * already-approved paper → Science `scienceLinks` mapping — no new
 * classification, no invented relationships. For a given Science page
 * (`domainPath`, e.g. "/science/soil"), returns every paper whose own
 * `scienceLinks` already names that page, ranked and trimmed to a small set
 * that represents the domain, not just the papers with the most indexed
 * questions:
 *
 *   1. Current/Approved PQNK Knowledge ranks ahead of Requires-Review or
 *      External material (never hidden — just not the default first pick
 *      when an approved alternative exists for this domain).
 *   2. Direct mapping is already the entry criterion (this list only
 *      contains papers the taxonomy itself links to this Science page).
 *   3. Card 1 is a hand-curated Science Anchor (`SCIENCE_ANCHORS` below) —
 *      not a scoring heuristic. Editorial review found that proxies for
 *      "centrality" (fewest scientificDomains, fewest crops, most
 *      questionsAnswered) each reliably mispicked on at least one domain —
 *      a narrowly-scoped paper can still be peripheral to the page, and a
 *      paper with crop examples can still be the most central mechanism
 *      explainer. Each anchor was chosen by a human reading the candidate's
 *      own approved `scienceLinks[].why`/`primarySubject` against that
 *      Science page's stated framing; see the Science Anchor review for the
 *      full 10-domain comparison. All anchors resolve to an existing
 *      Current/Approved paper with an explicit approved Science relationship
 *      to that domain — see the lookup below for the fail-safe check.
 *   4. The remaining slots use farmer/practical usefulness
 *      (`questionsAnswered` count, existing data) plus a diversity pass
 *      that prefers papers introducing a crop or field problem not yet
 *      represented, so the module reads as mechanism → practice → crop
 *      example rather than six papers on the same narrow topic. This logic
 *      is unchanged from before the anchor was curated — only Card 1's
 *      selection method changed.
 */
export interface RelatedScienceKnowledge {
  paper: Paper;
  meta: PaperMetadata;
  why: string;
}

/**
 * Hand-curated Science Anchor per domain — the Card 1 pick for each Science
 * page's Related Knowledge module. Deliberately NOT derived from any scoring
 * heuristic; see the JSDoc above for why. Each slug must resolve to a
 * Current/Approved paper whose own `scienceLinks` names the matching domain
 * path, enforced by `getRelatedKnowledgeForScience` below.
 */
const SCIENCE_ANCHORS: Record<string, string> = {
  "/science/soil": "beyond-sand-silt-and-clay",
  "/science/plants": "the-living-plant-a-primer-on-physiology-and-processes",
  "/science/water": "understanding-soil-water-absorption",
  "/science/biodiversity": "the-autonomous-biome-self-assembling-fungal-networks",
  "/science/nutrition": "the-mechanism-of-nutrient-absorption-in-pqnk-farming",
  "/science/crop-protection": "pest-ecology-and-the-collapse-of-biological-balance",
  // Climate: the strongest mechanism match among approved Climate candidates.
  // Its own scienceLinks[].why is "temperature-cue disruption from broken
  // water cycle" — it carries two crop examples (Citrus, Guava) that a pure
  // specificity/crop-count proxy would have penalized, but no zero-crop
  // candidate matched the page's "water cycle as an energy cycle" framing as
  // directly. Revisit if a more general-purpose Climate paper is approved.
  "/science/climate": "the-silenced-clock-temperature-cued-plant-development",
  "/science/food-quality": "comparing-food-quality-pqnk-vs-aci",
  "/science/production-architecture": "the-pqnk-raised-bed-system-engineering-root-zones",
  "/science/transition": "the-pqnk-framework-from-degenerative-to-sustainable",
};

export function getRelatedKnowledgeForScience(
  domainPath: string,
  allPapers: Paper[],
  getMeta: (slug: string) => PaperMetadata | undefined,
  min = 4,
  max = 6
): RelatedScienceKnowledge[] {
  interface Candidate {
    paper: Paper;
    meta: PaperMetadata;
    why: string;
  }

  const candidates: Candidate[] = [];
  for (const paper of allPapers) {
    const meta = getMeta(paper.slug);
    if (!meta) continue;
    const link = meta.scienceLinks.find((l) => l.page === domainPath);
    if (link) candidates.push({ paper, meta, why: link.why });
  }

  const tier = (c: Candidate) => (c.meta.authorityStatus === CURRENT_APPROVED ? 0 : 1);

  // Card 1: curated Science Anchor. Must resolve to a Current/Approved
  // candidate already in this domain's approved pool — fail the build rather
  // than silently falling back to an algorithmic pick or an unrelated paper
  // if a configured slug is ever renamed, removed, or de-approved.
  const anchorSlug = SCIENCE_ANCHORS[domainPath];
  const anchor = anchorSlug
    ? candidates.find((c) => c.paper.slug === anchorSlug && tier(c) === 0)
    : undefined;
  if (anchorSlug && !anchor) {
    throw new Error(
      `getRelatedKnowledgeForScience: configured Science anchor "${anchorSlug}" for ` +
        `"${domainPath}" is not a valid Current/Approved candidate for this domain ` +
        `(missing, not approved, or lacks an explicit scienceLinks relationship to this page).`
    );
  }

  // Remaining slots: practical-usefulness-ordered, with a diversity pass —
  // seeded with the anchor's own crops/problems so this pass builds on top
  // of it rather than re-covering the same ground.
  const rest = candidates.filter((c) => c !== anchor);
  const sorted = [...rest].sort((a, b) => {
    if (tier(a) !== tier(b)) return tier(a) - tier(b);
    const qDiff = b.meta.questionsAnswered.length - a.meta.questionsAnswered.length;
    if (qDiff !== 0) return qDiff;
    return a.paper.slug.localeCompare(b.paper.slug);
  });

  const selected: Candidate[] = anchor ? [anchor] : [];
  const seenCrops = new Set<string>(anchor?.meta.crops ?? []);
  const seenProblems = new Set<string>(anchor?.meta.fieldProblems ?? []);

  for (const c of sorted) {
    if (selected.length >= max) break;
    const addsCrop = c.meta.crops.some((x) => !seenCrops.has(x));
    const addsProblem = c.meta.fieldProblems.some((x) => !seenProblems.has(x));
    if (selected.length < min || addsCrop || addsProblem) {
      selected.push(c);
      c.meta.crops.forEach((x) => seenCrops.add(x));
      c.meta.fieldProblems.forEach((x) => seenProblems.add(x));
    }
  }

  // Small/narrow domains: top up to `min` from the remainder if the
  // diversity pass alone didn't reach it.
  if (selected.length < min) {
    for (const c of sorted) {
      if (selected.length >= min) break;
      if (!selected.includes(c)) selected.push(c);
    }
  }

  return selected.slice(0, max).map(({ paper, meta, why }) => ({ paper, meta, why }));
}

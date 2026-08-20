import taxonomyData from "./taxonomy.json";
import metadataData from "./metadata.json";

/**
 * PQNK Knowledge Library — Taxonomy 1.1 (APPROVED AND LOCKED).
 *
 * This data is generated from the approved Controlled Vocabulary & Taxonomy 1.1
 * package (taxonomy.json / normalized_classification.json), trimmed to the
 * fields the live site actually needs. It is a DISCOVERY/INDEX layer on top
 * of the original Knowledge Paper content in `papers.ts` — joined by `slug`,
 * never merged into it. Do not hand-edit these generated JSON files; they are
 * a build-time export of the approved taxonomy package.
 */

export interface ScienceLink {
  page: string;
  why: string;
}

export interface PaperMetadata {
  slug: string;
  primarySubject: string;
  crops: string[];
  fieldProblems: string[];
  problemFamily: string[];
  fieldPractices: string[];
  machineryTools: string[];
  climateType: string[];
  scientificDomains: string[];
  pqnkPrinciples: string[];
  productionStages: string[];
  evidenceType: string;
  authorityStatus: string;
  scienceLinks: ScienceLink[];
  questionsAnswered: string[];
  keywords: string[];
  geography: string | null;
}

export const PROBLEM_FAMILIES: string[] = taxonomyData.problemFamilies;
export const PROBLEM_TO_FAMILIES: Record<string, string[]> = taxonomyData.problemToFamilies;
export const SCIENTIFIC_DOMAINS: string[] = taxonomyData.scientificDomains;
export const PQNK_PRINCIPLES: string[] = taxonomyData.pqnkPrinciples;
export const EVIDENCE_TYPES: string[] = taxonomyData.evidenceTypes;
export const AUTHORITY_STATUSES: string[] = taxonomyData.authorityStatuses;

// Editorial-consistency status, not an evidentiary/scientific one — the
// underlying PQNK knowledge in a paper carrying this status is already
// authenticated. Only wording, terminology, and presentation consistency
// with the rest of the Pedaver knowledge system are still pending. Never
// treat this as a reason to suppress, downgrade, or exclude a paper.
export const REQUIRES_REVIEW = "PQNK Authenticated — Editorial Consistency Review Pending";
export const EXTERNAL_EVIDENCE = "External Knowledge / Evidence";
export const CURRENT_APPROVED = "Current / Approved PQNK Knowledge";
export const HISTORICAL_FORMULATION = "Historical PQNK Formulation";

export const METADATA: PaperMetadata[] = metadataData as PaperMetadata[];

const METADATA_BY_SLUG: Record<string, PaperMetadata> = {};
for (const m of METADATA) METADATA_BY_SLUG[m.slug] = m;

export function getMetadata(slug: string): PaperMetadata | undefined {
  return METADATA_BY_SLUG[slug];
}

function uniqueValuesInUse(pick: (m: PaperMetadata) => string[]): string[] {
  const set = new Set<string>();
  for (const m of METADATA) for (const v of pick(m)) set.add(v);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** Canonical crops that at least one paper actually carries — not the full taxonomy list. */
export const CROPS_IN_USE: string[] = uniqueValuesInUse((m) => m.crops);
/** Canonical field practices that at least one paper actually carries. */
export const PRACTICES_IN_USE: string[] = uniqueValuesInUse((m) => m.fieldPractices);
/** Canonical detailed field problems that at least one paper actually carries. */
export const PROBLEMS_IN_USE: string[] = uniqueValuesInUse((m) => m.fieldProblems);

/** Detailed problems within a given Problem Family that are actually in use. */
export function problemsInFamily(family: string): string[] {
  return PROBLEMS_IN_USE.filter((p) => (PROBLEM_TO_FAMILIES[p] || []).includes(family));
}

export function countBy(pick: (m: PaperMetadata) => string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const m of METADATA) {
    for (const v of pick(m)) counts.set(v, (counts.get(v) ?? 0) + 1);
  }
  return counts;
}

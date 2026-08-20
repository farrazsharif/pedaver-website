/**
 * The small, verified set of Knowledge Papers that genuinely originated
 * from a real farmer's question — Tier 1 from the questionsAnswered
 * provenance audit. Distinct from `questionsAnswered` in taxonomy.ts,
 * which is discovery/retrieval metadata, not a farmer-question record.
 *
 * Every entry here has explicit textual evidence in the paper's own
 * summary (papers.ts) or, where checked, its source PDF — e.g. a named
 * individual, or an unambiguous "a farmer asked..." framing. `question`
 * is Pedaver's own account of what was asked, not a confirmed verbatim
 * quote — the repository does not preserve the farmer's exact original
 * wording for any of these six, only Pedaver's paraphrase and (for two of
 * them) a named attribution. Do not add an entry here without the same
 * standard of evidence; do not apply this treatment to any other paper,
 * including the four Tier-2 "Q&A"-titled candidates, until their
 * provenance is separately confirmed.
 */
export interface FarmerQuestionOrigin {
  slug: string;
  question: string;
  attribution: string;
}

export const FARMER_QUESTION_ORIGINS: FarmerQuestionOrigin[] = [
  {
    slug: "the-breathing-soil-humidity-and-soil-structure",
    question: "Why does relative humidity matter around my crop in PQNK production?",
    attribution: "Mr. Rakesh, a practicing PQNK farmer from Rajasthan — asked in a PQNK WhatsApp learning group",
  },
  {
    slug: "why-is-oxygen-less-in-soil-air-why-is-co2-high",
    question:
      "Why is soil air lower in oxygen and higher in CO2 than the air above it, and how does PQNK maintain the oxygen diffusion rate?",
    attribution: "Asked in a PQNK WhatsApp learning group",
  },
  {
    slug: "the-paradox-of-resistance-pests-adapt-humans-degrade",
    question: "Why do pests evolve immunity to pesticides while human diseases from the same chemicals keep rising?",
    attribution: "Asked in a PQNK WhatsApp learning group",
  },
  {
    slug: "two-pathways-to-pest-resistance",
    question:
      "Why do pests develop resistance to sprays over time, while humans grow more susceptible to the same chemical residues?",
    attribution:
      "Asked in a PQNK WhatsApp learning group — a second, deeper treatment of the same question answered in “The Paradox of Resistance”",
  },
  {
    slug: "mango-sop-under-pqnk",
    question: "What is the correct standard operating procedure for mango harvesting and post-harvest handling under PQNK?",
    attribution: "Mr. Kaushil Patel Gaubharat — asked in PQNK WhatsApp learning group number 3",
  },
  {
    slug: "white-and-green-growth-after-irrigation-qa",
    question:
      "After a second irrigation, my furrows turned moist and cooled, and white and green growth appeared — is this a disease?",
    attribution: "PQNK farmer question — field observation on a Khapli wheat plot",
  },
];

const BY_SLUG: Record<string, FarmerQuestionOrigin> = {};
for (const f of FARMER_QUESTION_ORIGINS) BY_SLUG[f.slug] = f;

export function getFarmerQuestionOrigin(slug: string): FarmerQuestionOrigin | undefined {
  return BY_SLUG[slug];
}

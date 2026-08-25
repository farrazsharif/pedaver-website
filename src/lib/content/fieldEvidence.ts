/**
 * Field Evidence Library — documents what farmers, fields, machinery
 * demonstrations and observations show under actual production conditions.
 * Distinct in kind from Knowledge Papers (src/lib/content/papers.ts), which
 * explain mechanism, science, engineering and policy. See papers.ts for the
 * KP-numbering precedent this mirrors.
 *
 * FE numbering rule (permanent, mirrors KP numbering):
 * Migrated 2026-08-25 from the farmerStories array that previously lived in
 * farmers.ts (now removed — its content lives here) and rendered as an
 * easy-to-miss card grid at the bottom of /videos. Initial FE numbers were
 * assigned in that array's existing order, top to bottom, one time only:
 * FE-001 = its 1st entry, FE-002 = its 2nd, etc. An FE number, once
 * assigned, never changes — not on re-sort, not on new evidence arriving,
 * not on re-categorisation. New records after this migration simply take
 * the next unused number in arrival order.
 *
 * Data-quality note found during migration: farmers.ts listed "Kaushil
 * Patel" and "Gaubharat" as two different people. They are the same person
 * — farmerQuestions.ts already attributes a question to "Mr. Kaushil Patel
 * Gaubharat". Both original entries are kept (they document two distinct
 * Q&A exchanges), but the `farmer` field below is corrected to the same
 * full name on both so the farmer cross-link surfaces them together.
 */

export type EvidenceType =
  | "Farmer Testimony"
  | "Field Observation"
  | "Measured Result"
  | "Case Documentation"
  | "Machinery Demonstration"
  | "Training / Field Demonstration";

export interface FieldEvidence {
  feNumber: number;
  slug: string;
  title: string;
  evidenceType: EvidenceType;
  /** The farmer/grower/person this evidence documents, when known. Also the join key for "other evidence from this farmer". */
  farmer?: string;
  /** Join key into crops.ts, when this evidence maps to an existing crop page. */
  cropSlug?: string;
  /** Display crop name, for evidence about a crop that doesn't have its own crops.ts page yet. */
  cropName?: string;
  location?: string;
  district?: string;
  province?: string;
  country?: string;
  /** ISO date, if the recording date is actually known. */
  recordedDate?: string;
  year?: number;
  /** Years under PQNK at time of recording, if the farmer states it. */
  pqnkYears?: number;
  /** Short summary — for farmer testimony, this is the farmer's own words. */
  summary: string;
  /** The farmer's own quote, when the evidence is testimony in their words (may equal summary). */
  quote?: string;
  keyObservations?: string[];
  videoId?: string;
  videoSourceName?: string;
  videoSourceUrl?: string;
  /** Explicit, hand-verified links beyond the automatic crop-based join — only set when a real, specific connection is known (not a crop-topic guess). */
  relatedKpSlugs?: string[];
  tags?: string[];
  sourceAttribution?: string;
}

export const fieldEvidence: FieldEvidence[] = [
  {
    feNumber: 1,
    slug: "wheat-on-pqnk-mian-arfan-khalid",
    title: "Wheat on PQNK — Mian Arfan Khalid",
    evidenceType: "Farmer Testimony",
    farmer: "Mian Arfan Khalid",
    cropSlug: "wheat",
    summary: "Wheat on PQNK — lowest cost of production, highest quality.",
    quote: "Wheat on PQNK — lowest cost of production, highest quality.",
    videoSourceName: "YouTube",
    videoSourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=Wheat+on+PQNK+Mian+Arfan+Khalid",
    relatedKpSlugs: ["transforming-wheat-production-through-pqnk"],
    tags: ["wheat", "cost of production"],
  },
  {
    feNumber: 2,
    slug: "guava-on-pqnk-mian-arfan-khalid-rajanpur",
    title: "Guava on PQNK — Mian Arfan Khalid, Rajanpur",
    evidenceType: "Farmer Testimony",
    farmer: "Mian Arfan Khalid",
    cropName: "Guava",
    location: "Rajanpur",
    district: "Rajanpur",
    province: "Punjab",
    country: "Pakistan",
    pqnkYears: 3,
    summary:
      "Guava on PQNK — high-density planting, three years without a single chemical input, and market shelf life stretched from two days to two weeks.",
    quote:
      "Guava on PQNK — high-density planting, three years without a single chemical input, and market shelf life stretched from two days to two weeks.",
    keyObservations: [
      "High-density guava planting.",
      "Three years with no chemical or fertilizer input on this orchard.",
      "Market shelf life extended from guava's normal ~1–2 days to 14–15 days without deshaping.",
    ],
    videoId: "DLxK3CEoXkA",
    videoSourceName: "YouTube",
    videoSourceUrl: "https://www.youtube.com/watch?v=DLxK3CEoXkA",
    tags: ["guava", "high-density planting", "shelf life", "zero chemical input"],
  },
  {
    feNumber: 3,
    slug: "citrus-on-pqnk-nasir-goraya-sargodha",
    title: "Citrus on PQNK — Nasir Goraya, Sargodha",
    evidenceType: "Farmer Testimony",
    farmer: "Nasir Goraya",
    cropSlug: "citrus-kinnow",
    location: "Sargodha",
    district: "Sargodha",
    province: "Punjab",
    country: "Pakistan",
    summary: "Citrus on PQNK, documented on our own orchard in Sargodha.",
    quote: "Citrus on PQNK, documented on our own orchard in Sargodha.",
    videoSourceName: "YouTube",
    videoSourceUrl:
      "https://www.youtube.com/@pedaverpqnk3167/search?query=Citrus+on+PQNK+Nasir+Goraya+Sarghoda",
    tags: ["citrus", "kinnow"],
  },
  {
    feNumber: 4,
    slug: "mango-citrus-recovery-mirshad-ali",
    title: "Mango & Citrus Recovery on PQNK — Mirshad Ali",
    evidenceType: "Farmer Testimony",
    farmer: "Mirshad Ali",
    cropSlug: "mango",
    summary: "Citrus recovery on PQNK — bringing a declining orchard back to health.",
    quote: "Citrus recovery on PQNK — bringing a declining orchard back to health.",
    videoSourceName: "YouTube",
    videoSourceUrl:
      "https://www.youtube.com/@pedaverpqnk3167/search?query=Citrus+recovery+Farmer+Mirshad+Ali+Mango",
    tags: ["mango", "citrus", "orchard recovery"],
  },
  {
    feNumber: 5,
    slug: "vegetables-on-pqnk-zia-ul-azad-india",
    title: "Vegetables on PQNK — Zia Ul Azad, India",
    evidenceType: "Farmer Testimony",
    farmer: "Zia Ul Azad",
    cropSlug: "vegetables-oap",
    country: "India",
    summary: "High-nutrition, high-density vegetables produced under PQNK.",
    quote: "High-nutrition, high-density vegetables produced under PQNK.",
    videoSourceName: "YouTube",
    videoSourceUrl:
      "https://www.youtube.com/@pedaverpqnk3167/search?query=vegetables+farmer+Zia+Ul+Azad+India+PQNK",
    tags: ["vegetables", "high density", "nutrition"],
  },
  {
    feNumber: 6,
    slug: "pqnk-results-ali-dhillon-gujranwala",
    title: "PQNK Results — Ali Dhillon, Gujranwala",
    evidenceType: "Farmer Testimony",
    farmer: "Ali Dhillon",
    location: "Gujranwala",
    district: "Gujranwala",
    province: "Punjab",
    country: "Pakistan",
    summary: "Reports on his own PQNK results and adoption.",
    quote: "Reports on his own PQNK results and adoption.",
    videoSourceName: "YouTube",
    videoSourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=PQNK+farmer+Ali+Dhillon+Gujranwala",
    tags: ["adoption"],
  },
  {
    feNumber: 7,
    slug: "wheat-on-pqnk-bilal",
    title: "Wheat on PQNK — Bilal",
    evidenceType: "Farmer Testimony",
    farmer: "Bilal",
    cropSlug: "wheat",
    summary: "Wheat on PQNK — lowest cost of production, highest quality.",
    quote: "Wheat on PQNK — lowest cost of production, highest quality.",
    videoSourceName: "YouTube",
    videoSourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=Wheat+on+PQNK+Bilal",
    relatedKpSlugs: ["transforming-wheat-production-through-pqnk"],
    tags: ["wheat", "cost of production"],
  },
  {
    feNumber: 8,
    slug: "citrus-on-pqnk-mohammad-ismail-lieah",
    title: "Citrus on PQNK — Mohammad Ismail Lieah",
    evidenceType: "Farmer Testimony",
    farmer: "Mohammad Ismail Lieah",
    cropSlug: "citrus-kinnow",
    summary: "Citrus on PQNK, documented on his own orchard.",
    quote: "Citrus on PQNK, documented on his own orchard.",
    videoSourceName: "YouTube",
    videoSourceUrl:
      "https://www.youtube.com/@pedaverpqnk3167/search?query=Citrus+on+PQNK+Farmer+Mohammad+Ismail+Lieah",
    tags: ["citrus"],
  },
  {
    feNumber: 9,
    slug: "crop-light-requirements-kaushil-patel-gaubharat",
    title: "Crop Light Requirements Under PQNK — Kaushil Patel Gaubharat",
    evidenceType: "Farmer Testimony",
    farmer: "Kaushil Patel Gaubharat",
    summary: "Raised detailed questions on crop light requirements under PQNK, answered directly by our advisory team.",
    quote: "Raised detailed questions on crop light requirements under PQNK, answered directly by our advisory team.",
    sourceAttribution: "PQNK farmer WhatsApp learning group",
    tags: ["advisory", "light requirements"],
  },
  {
    feNumber: 10,
    slug: "natural-ecosystem-science-question-kaushil-patel-gaubharat",
    title: "A Question on Natural Ecosystem Science — Kaushil Patel Gaubharat",
    evidenceType: "Farmer Testimony",
    farmer: "Kaushil Patel Gaubharat",
    summary:
      "Brought a question on the Natural Ecosystem Science of Production Agriculture directly to our farmer WhatsApp group — answered as part of our ongoing advisory support.",
    quote:
      "Brought a question on the Natural Ecosystem Science of Production Agriculture directly to our farmer WhatsApp group — answered as part of our ongoing advisory support.",
    sourceAttribution: "PQNK farmer WhatsApp learning group",
    tags: ["advisory", "natural ecosystem science"],
  },
];

export function getFieldEvidenceBySlug(slug: string) {
  return fieldEvidence.find((f) => f.slug === slug);
}

export function getFieldEvidenceByFeNumber(feNumber: number) {
  return fieldEvidence.find((f) => f.feNumber === feNumber);
}

/** Formats a permanent Field Evidence catalogue ID for display, e.g. 2 -> "FE-002". */
export function formatFeNumber(feNumber: number) {
  return `FE-${String(feNumber).padStart(3, "0")}`;
}

/** Parses a user-entered FE reference ("FE-002", "FE002", "fe-2") into its numeric feNumber, or null. */
export function parseFeQuery(query: string): number | null {
  const m = query.trim().match(/^fe-?0*(\d+)$/i);
  return m ? Number(m[1]) : null;
}

/** Other Field Evidence records from the same named farmer (excludes the record itself). */
export function getOtherFieldEvidenceByFarmer(fe: FieldEvidence): FieldEvidence[] {
  if (!fe.farmer) return [];
  return fieldEvidence.filter((f) => f.farmer === fe.farmer && f.slug !== fe.slug);
}

/**
 * Field Evidence data — the underlying records behind the user-facing
 * "Knowledge Exchange" page (renamed 2026-08-25 from "Field Evidence
 * Library"; this file/variable/route name deliberately did NOT change and
 * is not expected to — /field-evidence is the permanent technical URL for
 * this indexed collection, see field-evidence/page.tsx). A lightweight,
 * permanent record of what farmers, fields and machinery demonstrations
 * show under actual production conditions.
 * Distinct in kind from Knowledge Papers (papers.ts), which explain
 * mechanism, science and policy.
 *
 * Pedaver stores the evidence RECORD, not the media. The original video
 * stays on YouTube/Facebook; this only holds the lightweight metadata
 * needed to identify, search and reference it. No individual FE page,
 * no embedded players, no re-hosted media — see /field-evidence/page.tsx.
 *
 * A record may carry more than one evidenceTypes classification (e.g. a
 * farmer video can be both "Farmer Testimony" and "Field Evidence" at
 * once) — added 2026-08-25 alongside the Knowledge Exchange rename.
 * Existing records were reclassified accordingly; this was a taxonomy
 * correction on the 10 already-migrated records, not a bulk import of
 * new evidence.
 *
 * FE numbering rule (permanent, mirrors KP numbering):
 * Migrated 2026-08-25 from farmerStories, which previously lived in
 * farmers.ts (removed) and rendered as a card grid at the bottom of
 * /videos. Initial FE numbers were assigned in that array's existing
 * order, top to bottom, one time only: FE-001 = its 1st entry, FE-002 =
 * its 2nd, etc. An FE number, once assigned, never changes — not on
 * re-sort, not on new evidence arriving, not on re-categorisation, not
 * when older historical evidence is discovered later. New records simply
 * take the next unused number in arrival order.
 *
 * Privacy (tightened 2026-08-25): farmer name and/or location are included
 * ONLY when Claude has actually verified — by reading/watching the source
 * material itself — that the farmer publicly self-disclosed that specific
 * information. "This was already published on Pedaver.com before" is
 * explicitly NOT sufficient grounds to retain it. Never inferred from
 * scenery, dialect, metadata, or any other contextual clue. Both fields
 * are optional; omit rather than guess.
 *
 * Only FE-002 (Guava) has been verified this way, directly from the
 * farmer's own words in the video transcript, and keeps both fields.
 * Every other migrated record's only "source" is a YouTube channel
 * *search-query* link (not a specific video Claude has watched) or, for
 * FE-009/FE-010, no link at all — so name/location were removed from all
 * of them on the 2026-08-25 privacy audit, even though they appeared on
 * the site before this Field Evidence system existed. If a specific video
 * is later confirmed for one of these and it shows the farmer
 * self-disclosing name/location on camera, those fields can be restored.
 *
 * Data-quality note found during the original migration: farmers.ts had
 * listed "Kaushil Patel" and "Gaubharat" as two different people; they're
 * the same person per farmerQuestions.ts's "Mr. Kaushil Patel Gaubharat"
 * attribution. Both original entries are kept as separate records (they
 * document two distinct Q&A exchanges) — the name itself is omitted from
 * both under the privacy rule above, same as any other unverified record.
 */

export type EvidenceType = "Q&A" | "Advisory" | "Farmer Testimony" | "Field Evidence" | "Machinery Demonstration";

export type SourcePlatform = "YouTube" | "Facebook" | "Keynote" | "Other";

export interface FieldEvidence {
  feNumber: number;
  title: string;
  /** At least one; a record may carry more than one (e.g. a farmer video is often both "Farmer Testimony" and "Field Evidence"). */
  evidenceTypes: EvidenceType[];
  /** Crop or general topic this evidence concerns, when known. Free text — not required to match a crops.ts slug. */
  cropOrTopic?: string;
  year?: number;
  /** ISO date, only when reliably known — most entries only have a year, or nothing. */
  date?: string;
  summary: string;
  /** Omit both when there's genuinely no link to point to (e.g. a text-only exchange never recorded on video) — don't invent a placeholder. */
  sourcePlatform?: SourcePlatform;
  sourceUrl?: string;
  /** YouTube video ID, when the source platform is YouTube — used only to link out, never to embed. */
  videoId?: string;
  /** Include only when Claude has verified the farmer publicly self-disclosed this in the source material itself. Omit rather than guess — see privacy note above. */
  farmer?: string;
  /** Include only when Claude has verified the farmer publicly self-disclosed this in the source material itself. Omit rather than guess — see privacy note above. */
  location?: string;
  /** Capability only for now — not yet rendered as a cross-link anywhere (see project note, 2026-08-25). */
  relatedKpSlug?: string;
  /** Capability only for now — not yet rendered as a cross-link anywhere. */
  relatedCropSlug?: string;
  tags?: string[];
}

export const fieldEvidence: FieldEvidence[] = [
  {
    feNumber: 1,
    title: "Wheat on PQNK",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Wheat",
    summary: "Wheat on PQNK — lowest cost of production, highest quality.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=Wheat+on+PQNK",
    relatedKpSlug: "transforming-wheat-production-through-pqnk",
    relatedCropSlug: "wheat",
    tags: ["wheat", "cost of production"],
  },
  {
    feNumber: 2,
    title: "Guava on PQNK — Mian Arfan Khalid, Rajanpur",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Guava",
    year: 2026,
    summary:
      "Guava on PQNK — high-density planting, three years without a single chemical input, and market shelf life stretched from two days to two weeks.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=DLxK3CEoXkA",
    videoId: "DLxK3CEoXkA",
    farmer: "Mian Arfan Khalid",
    location: "Rajanpur",
    tags: ["guava", "high-density planting", "shelf life", "zero chemical input"],
  },
  {
    feNumber: 3,
    title: "Citrus on PQNK",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Citrus (Kinnow)",
    summary: "Citrus on PQNK, documented on our own orchard.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=Citrus+on+PQNK",
    relatedCropSlug: "citrus-kinnow",
    tags: ["citrus", "kinnow"],
  },
  {
    feNumber: 4,
    title: "Mango & Citrus Recovery on PQNK",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Mango & Citrus",
    summary: "Citrus recovery on PQNK — bringing a declining orchard back to health.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=Citrus+recovery+Mango+PQNK",
    relatedCropSlug: "mango",
    tags: ["mango", "citrus", "orchard recovery"],
  },
  {
    feNumber: 5,
    title: "Vegetables on PQNK",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Vegetables",
    summary: "High-nutrition, high-density vegetables produced under PQNK.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=vegetables+farmer+PQNK",
    relatedCropSlug: "vegetables-oap",
    tags: ["vegetables", "high density", "nutrition"],
  },
  {
    feNumber: 6,
    title: "PQNK Results",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    summary: "Reports on his own PQNK results and adoption.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=PQNK+farmer+results",
    tags: ["adoption"],
  },
  {
    feNumber: 7,
    title: "Wheat on PQNK",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Wheat",
    summary: "Wheat on PQNK — lowest cost of production, highest quality.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=Wheat+on+PQNK",
    relatedKpSlug: "transforming-wheat-production-through-pqnk",
    relatedCropSlug: "wheat",
    tags: ["wheat", "cost of production"],
  },
  {
    feNumber: 8,
    title: "Citrus on PQNK",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Citrus (Kinnow)",
    summary: "Citrus on PQNK, documented on his own orchard.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=Citrus+on+PQNK+Farmer",
    relatedCropSlug: "citrus-kinnow",
    tags: ["citrus"],
  },
  {
    feNumber: 9,
    title: "Crop Light Requirements Under PQNK",
    evidenceTypes: ["Q&A", "Advisory"],
    summary:
      "Raised detailed questions on crop light requirements under PQNK, answered directly by our advisory team.",
    tags: ["advisory", "light requirements"],
  },
  {
    feNumber: 10,
    title: "A Question on Natural Ecosystem Science",
    evidenceTypes: ["Q&A", "Advisory"],
    summary:
      "Brought a question on the Natural Ecosystem Science of Production Agriculture directly to our farmer WhatsApp group — answered as part of our ongoing advisory support.",
    tags: ["advisory", "natural ecosystem science"],
  },
  {
    feNumber: 11,
    title: "Citrus Under PQNK — No Agrochemicals Applied",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Citrus (Kinnow)",
    summary: "Citrus performing under PQNK with no agrochemical inputs applied.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/U4hON68JrBQ",
    videoId: "U4hON68JrBQ",
    relatedCropSlug: "citrus-kinnow",
    tags: ["citrus", "zero chemical input"],
  },
];

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

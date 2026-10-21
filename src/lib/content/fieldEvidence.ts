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
 * One deliberate exception (added 2026-09-13, FE-014): a static print
 * clipping (e.g. a newspaper feature) with no online original to link to
 * at all may carry a `clippingImage`, a small locally-hosted photo of the
 * clipping itself, since there is no external source to point to instead.
 * This is not a general photo/gallery field — it exists only for this
 * "no online original exists" case. Video/social evidence keeps pointing
 * outward via sourceUrl as before.
 * The same case covers a farmer's own photos shared privately (WhatsApp),
 * with no online original: FE-039 (2026-10-14) carries Vasudha Sardar's
 * photo as its picture and its approved Knowledge Exchange PDF, hosted
 * under /field-evidence/, as its sourceUrl.
 *
 * Author policy (2026-09-13, forward-looking only): every NEW record from
 * this point on must carry a picture — either a real photo (clippingImage,
 * for the print/no-online-original case above) or a YouTube thumbnail,
 * which just needs a genuine per-video `videoId` (FieldEvidenceBrowser.tsx
 * derives `https://img.youtube.com/vi/{videoId}/hqdefault.jpg` from it
 * automatically; no thumbnail field to fill in). A record whose only link
 * is a channel search query (no specific video) does not qualify — get the
 * actual video URL first. Do not add a new text-only record going forward.
 * This policy is NOT retroactive: FE-001 and FE-003 through FE-010 are
 * known text-only/search-link records, left as a deliberate backlog until
 * the author revisits them (deprioritised while work is focused on the
 * book, per docs/pqnk-book-workflow.md) — don't "fix" them proactively.
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

export type EvidenceType = "Q&A" | "Advisory" | "Farmer Testimony" | "Field Evidence" | "Machinery Demonstration" | "Media Coverage";

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
  /** Path under /public to a locally-hosted photo of a print clipping with no online original — see the exception note above. Not for general use. */
  clippingImage?: string;
  /** A saved copy of the video's own thumbnail, used instead of YouTube's when its CDN keeps serving a broken image (2026-10-18, KE-043). */
  thumbnail?: string;
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
  {
    feNumber: 12,
    title: "The Role of Hardpan, Nematodes, and Aeration in Plant Health",
    evidenceTypes: ["Advisory", "Field Evidence"],
    cropOrTopic: "Hardpan & soil aeration",
    summary:
      "Asif Sharif explains how the Farmer Advisory guidance on the compaction hardpan, nematode activity, and soil aeration played out in the field — a confirmation of how the advisory worked in practice.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/LHm57VFVFLc",
    videoId: "LHm57VFVFLc",
    tags: ["hardpan", "nematodes", "soil aeration", "plant health", "farmer advisory"],
  },
  {
    feNumber: 13,
    title: "Amla on PQNK on Rolling Land",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Amla (aonla) on rolling land",
    summary:
      "A PQNK farmer's field report on an amla (aonla) plantation established on rolling land using a contour-line layout — grown rainfed with no irrigation, no agrochemicals and no tillage.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/IuOKKARiP6w",
    videoId: "IuOKKARiP6w",
    relatedCropSlug: "amla",
    tags: ["amla", "aonla", "contour planting", "rolling land", "rainfed", "no irrigation", "zero chemical input", "no-till"],
  },
  {
    feNumber: 14,
    title: "PQNK Crosses the Border: Kutchmitra Newspaper Coverage, Kutch, Gujarat, India",
    evidenceTypes: ["Media Coverage", "Farmer Testimony"],
    year: 2025,
    date: "2025-10-22",
    summary:
      "Kutchmitra, a regional Gujarati-language newspaper published in Bhuj, ran a special interview feature on PQNK's introduction into Kutch, India, under the headline “Complete Natural Regenerative Farming ‘PQNK’ Initiative in Kutch – India.” The piece profiles farmer Deepakbhai BhanuShali, who is practising PQNK in Nakhatrana under Kutch's difficult rainfall, water and soil conditions, and explains the system's no-till, minimum-disturbance approach and its use of raised beds and furrows to balance soil moisture and aeration under water scarcity. The coverage documents PQNK's first reported field adoption outside Pakistan, where the system was developed.",
    farmer: "Deepakbhai BhanuShali",
    location: "Nakhatrana, Kutch, Gujarat, India",
    clippingImage: "/field-evidence/fe-014-kutchmitra-clipping.jpg",
    tags: ["Kutch", "Gujarat", "India", "Kutchmitra", "newspaper", "media coverage", "dryland farming", "water scarcity", "no-till", "raised beds", "international adoption"],
  },
  {
    feNumber: 15,
    title: "Mango on PQNK in Saline Waterlogged Soil",
    evidenceTypes: ["Advisory", "Field Evidence"],
    cropOrTopic: "Mango",
    summary:
      "Raised beds under PQNK accelerate tree growth even in hard, saline and alkaline soils prone to waterlogging. Once the beds are formed, the irrigation water level does not reach the soil surface for weeks at a time — excess water moves off into the drains, and only the roots draw the moisture the tree needs.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/54HKEwQATAI",
    videoId: "54HKEwQATAI",
    relatedCropSlug: "mango",
    tags: ["mango", "saline soil", "waterlogged soil", "raised beds", "salinity", "orchard"],
  },
  {
    feNumber: 16,
    title: "Peanut on PQNK — Mulch Keeps Water Off the Bed in Heavy Monsoon Rain",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Peanut (Groundnut)",
    year: 2026,
    date: "2026-09-14",
    summary:
      "A farmer's own field demonstration during a heavy monsoon downpour: on PQNK beds with mulch — peanut, cucumber and tomato — a footstep on the bed stays firm and water does not rise onto the surface, while on unmulched beds, including an unmulched section of the same peanut plot, water climbs the bed and the soil gives way underfoot. The farmer credits the mulch layer and the retained root network of prior crops for holding the bed together, and thanks Asif Sharif directly for the technique.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/4PVrRQ05kU4",
    videoId: "4PVrRQ05kU4",
    tags: ["peanut", "groundnut", "mulching", "waterlogging resistance", "monsoon rain", "raised beds", "soil structure", "water infiltration"],
  },
  {
    feNumber: 17,
    title: "Citrus (Lemon) on PQNK — No Agrochemicals, Farmer's Best Result Yet",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Citrus (Lemon)",
    year: 2026,
    date: "2026-09-16",
    summary:
      "A farmer in a lemon-growing belt reports that most growers around him are spraying pesticide heavily against recurring pest and disease pressure, while his own PQNK crop has had no spray applied at all. He describes this season's result as the best he has ever seen — better even than last year's already strong result.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/SSE1SRp-P7M",
    videoId: "SSE1SRp-P7M",
    relatedCropSlug: "citrus-kinnow",
    tags: ["citrus", "lemon", "zero spray", "no agrochemicals", "pest pressure"],
  },
  {
    feNumber: 18,
    title: "Papaya on PQNK — Farmer from Nepal",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Papaya",
    year: 2026,
    date: "2026-09-19",
    summary:
      "A papaya farmer in Nepal explains how organic mulch on PQNK raised beds gives soil microbes both an organic-matter food source and a place to live, keeps the soil under the mulch noticeably cooler than the exposed surface, and lets roots breathe rather than sitting waterlogged. He contrasts this with chemical-input farming, where poison compounds poison and nutrition quality suffers, arguing that leaving the soil's own biological system alone lets it do its own work — protecting the soil ecosystem, he says, ultimately protects people too.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/7sybBx-qpQ0",
    videoId: "7sybBx-qpQ0",
    location: "Nepal",
    tags: ["papaya", "mulching", "soil microbes", "raised beds", "soil temperature", "root aeration"],
  },
  {
    feNumber: 19,
    title: "SIPP in Operation — Planting in a Matured Crop",
    evidenceTypes: ["Field Evidence", "Machinery Demonstration"],
    cropOrTopic: "SIPP / Precision Planting",
    year: 2026,
    date: "2026-09-20",
    summary:
      "A short field clip of the SIPP (Slit Insertion Precision Planter) operating in a bed where the standing crop has already matured, placing seed through the existing crop and residue without disturbing it — a practical demonstration of the crop-in-crop, no-till planting capability described in the PQNK machinery chapters.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/gQF3kUvAV60",
    videoId: "gQF3kUvAV60",
    tags: ["SIPP", "precision planting", "crop-in-crop", "no-till", "machinery demonstration"],
  },
  {
    feNumber: 20,
    title: "Gladiolus on PQNK — Early September Planting and Germination",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "Gladiolus",
    year: 2026,
    date: "2026-09-21",
    summary:
      "A field update on gladiolus grown under PQNK, planted on 5 September, roughly a month earlier than the previous practice of planting only after October. Germination is described as excellent, with strong leaf colour and growth achieved before any irrigation was given. Planting density was also substantially increased over previous seasons, from a single row on one side of the bed to four rows spanning both sides, including the bed top. A small patch left without mulch after wind disturbed it shows patchier emergence than the surrounding mulched area, illustrating mulch’s role in even germination.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/jCIckx2tmrs",
    videoId: "jCIckx2tmrs",
    tags: ["gladiolus", "early planting", "germination", "mulching", "planting density"],
  },
  {
    feNumber: 21,
    title: "One Acre Prosperity Model on PQNK — Fruit Tree Biodiversity",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "One Acre Prosperity",
    year: 2026,
    date: "2026-09-22",
    summary:
      "A field walkthrough of the fruit-tree component of the One Acre Prosperity model under PQNK, moving between nectarine, guava, date, lemon and peach trees at different growth and fruiting stages within the same managed plot. The clip illustrates the perennial fruit layer of the OAP design described in the PQNK book's Closed-Loop Farm chapter, showing several species carrying fruit simultaneously on the same acre rather than a single-crop planting.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/E6TNbYvCkT8",
    videoId: "E6TNbYvCkT8",
    tags: ["one acre prosperity", "biodiversity", "fruit trees", "nectarine", "guava", "peach", "date", "lemon"],
  },
  {
    feNumber: 22,
    title: "Sesame Between Ber (Jujube) Rows on PQNK — Farmer from Nepal",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Sesame",
    year: 2026,
    date: "2026-09-26",
    summary:
      "The PQNK farmer in Nepal whose papaya field appears in KE-018 shows sesame (til) grown between rows of ber (jujube) trees. The land was first shaped into raised beds and mulched, then the ber was planted with 20 feet between rows, leaving three beds between each tree row, which were sown with sesame. The plants are compact rather than tall and flowering well, with three to four branches each carrying pods along their length. A small conventional plot grown alongside as a comparison shows visible crop problems, while the PQNK beds show none. He values sesame as an easily grown oilseed and a good dietary source of calcium, and says the same guided approach is being applied to papaya, ber, guava and mango on the farm.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/MoUWr1U9ZsY",
    videoId: "MoUWr1U9ZsY",
    location: "Nepal",
    tags: ["sesame", "ber", "jujube", "intercropping", "raised beds", "mulching", "conventional comparison"],
  },
  {
    feNumber: 23,
    title: "Rice on PQNK Raised Beds — First Crop With No Puddling or Fertiliser",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Rice",
    year: 2026,
    date: "2026-09-27",
    summary:
      "Field footage of a standing PQNK paddy crop on raised beds, followed by the farmer's own voice report and an English reading of it. After attending the PQNK training in Lahore, he and a fellow farmer from his village decided to introduce PQNK on their farms, and this rice is their first result. His partner has been associated with PQNK since 2018 and had already run small-scale PQNK trials with satisfactory results. The crop was grown without puddling (kaddu) and, the farmer reports, with no fertiliser at all: no DAP and no urea. The crop was still standing ahead of harvest, drawing a steady stream of neighbouring farmers asking how it was grown. No yield is reported yet.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/WFErthS3rT4",
    videoId: "WFErthS3rT4",
    relatedCropSlug: "rice",
    tags: ["rice", "paddy", "raised beds", "no puddling", "no inundation", "zero fertiliser", "farmer adoption"],
  },
  {
    feNumber: 24,
    title: "Soybean on PQNK Raised Beds: No Inputs but the Seed and Two Furrow Waterings",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "Soybean",
    year: 2026,
    date: "2026-09-29",
    summary:
      "Field footage of a dense, even soybean crop growing on PQNK permanent raised beds, with the canopy closing over the beds and the furrows still visible between them. As reported by Asif Sharif, the crop received no input other than the seed and two supplementary flows of water through the furrows: no fertiliser, no pesticide and no other purchased input. It is a legume grown on the living, covered soil of the permanent beds, relying on the field's own biology for its nutrition. No yield is reported yet.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/j32tfG3icS0",
    videoId: "j32tfG3icS0",
    tags: ["soybean", "legume", "raised beds", "furrow irrigation", "zero fertiliser", "zero pesticide", "zero purchased inputs"],
  },
  {
    feNumber: 25,
    title: "Laying Out a High-Density Orchard on a Four-Year PQNK Field: Mian Arfan Khalid, Rajanpur",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "High-density orchard",
    year: 2026,
    date: "2026-10-02",
    summary:
      "Speaking on camera in front of freshly shaped raised beds, the farmer explains that his plot has been under PQNK for about four years. This season he re-laid the beds, not because they had failed to mature, but to plan a systematic high-density orchard: the earlier one-acre plots watered from a central channel have become straight two-acre plots across a six to eight acre belt, fed directly from a lined water channel. Mustard has been sown as an intercrop, and the orchard will be planted next with reduced plant-to-plant and row-to-row spacing, laid out so that picking and transport stay easy. He reports that the farm has become a model in his area that other farmers visit to learn from, and describes PQNK as farming without fertiliser or chemicals.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/5XNUenOwq4k",
    videoId: "5XNUenOwq4k",
    farmer: "Mian Arfan Khalid",
    location: "Rajanpur",
    tags: ["orchard", "high-density planting", "raised beds", "farm layout", "mustard intercrop", "farmer adoption", "zero fertiliser"],
  },
  {
    feNumber: 26,
    title: "Can High-TDS Water Rehabilitate Saline Soils? The PQNK Salt Equation",
    evidenceTypes: ["Q&A", "Advisory"],
    cropOrTopic: "Saline soils and high-TDS irrigation water",
    year: 2026,
    date: "2026-10-02",
    summary:
      "An illustrated explainer on whether groundwater with high total dissolved solids can be used for crops on saline or alkaline soil. It argues that the limiting factor is not the salt concentration alone but what happens to the salts after the water enters the soil. Under conventional flood irrigation, poor infiltration, surface evaporation, capillary rise and a hardpan leave salts concentrated in the root zone. PQNK conversion breaks the hardpan to about 22 inches, gives a deep water wash (with acid where soil pH is high), forms permanent raised beds and grows a Jantar cover crop; the mature system keeps the soil covered and the root zone moist and aerated. Because the salt load equals concentration multiplied by the volume of water applied, far less irrigation water means far less salt entering the field. The ten-step transition protocol is summarised, and the conclusion is that high-TDS water is not automatically the enemy: poor water and soil management is the greater problem.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/KBCFIp3lWj8",
    videoId: "KBCFIp3lWj8",
    tags: ["saline soil", "alkaline soil", "high TDS water", "groundwater", "salt accumulation", "hardpan", "deep water wash", "permanent raised beds", "Jantar", "soil moisture management"],
  },
  {
    feNumber: 27,
    title: "Sugarcane on PQNK: 2,800 Maunds (112 Tonnes) per Acre",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "Sugarcane",
    year: 2026,
    date: "2026-10-02",
    summary:
      "Field footage of a mature PQNK sugarcane crop being harvested from a residue-covered field, with the stalks cut and the trash left on the ground. The video's summary slide states a yield of 2,800 maunds (about 112 tonnes) per acre grown without fertiliser or pesticides, against 600 to 1,000 maunds for conventional sugarcane with high input costs, together with over 80 percent water saving, no tillage and 44 percent higher sugar recovery, and credits Al-Noor Sugar Mills, Sindh. It is the documented result behind the 2,800-maund figure in Chapters Five and Thirty-Seven of the PQNK book.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/b51QG7Mc3BY",
    videoId: "b51QG7Mc3BY",
    relatedCropSlug: "sugarcane",
    tags: ["sugarcane", "yield", "2,800 maunds", "112 tonnes per acre", "zero fertiliser", "zero pesticide", "water saving", "sugar recovery", "no tillage"],
  },
  {
    feNumber: 28,
    title: "The Five Stages of Learning: From Information to Wisdom",
    evidenceTypes: ["Advisory"],
    cropOrTopic: "Learning PQNK",
    year: 2026,
    date: "2026-10-03",
    summary:
      "An illustrated advisory on learning PQNK as a journey in which each stage prepares the farmer for the next. Information comes by reading and listening: papers, books, videos, experienced farmers and group discussion. Knowledge comes by seeing the system actually work: crops, soil and roots in the field, compared results and farmers already applying it. Experience comes by doing it yourself, preferably on a small area with your own soil, water, tools and conditions, making mistakes and solving problems until knowledge becomes skill and confidence. Understanding comes when soil, plants, water, biodiversity, climate and productivity are seen as one living production ecosystem, with cause and effect clear enough to decide well when conditions change. Wisdom, the fifth stage, is knowing what to do, when to do it and when not to interfere: an insect seen is not automatically a reason to spray, a dry surface not automatically a reason to irrigate, a changing plant not automatically a reason to add fertiliser. Sometimes the ecosystem is already correcting itself, and wisdom also carries the responsibility to share experience and guide those who follow.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/4kSgUWxnnSg",
    videoId: "4kSgUWxnnSg",
    tags: ["learning PQNK", "farmer training", "information", "knowledge", "experience", "understanding", "wisdom", "observe before acting", "start small", "farmer-to-farmer learning"],
  },
  {
    feNumber: 29,
    title: "Using High-TDS Water in PQNK Agriculture (Urdu Version)",
    evidenceTypes: ["Q&A", "Advisory"],
    cropOrTopic: "Saline soils and high-TDS irrigation water",
    year: 2026,
    date: "2026-10-07",
    summary:
      "The Urdu version, with Urdu on-screen text and voiceover, of the PQNK explainer on whether groundwater with high total dissolved solids can be used to grow crops on saline or alkaline soil (the English version is KE-026). The message is the same: the limiting factor is not the salt concentration of the water alone but what happens to the salts once the water enters the soil. Conventional flood irrigation, a hardpan, surface evaporation and capillary rise leave salts concentrated in the root zone. PQNK conversion breaks the hardpan to about 22 inches, gives a deep water wash (with acid where soil pH is high), forms permanent raised beds and grows a cover crop, and the mature system keeps the soil covered and the root zone moist and aerated. Because the salt load is concentration multiplied by the volume of water applied, using far less water means far less salt entering the field. High-TDS water is not automatically the enemy; poor water and soil management is the greater problem.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/Egvsfx6GBLI",
    videoId: "Egvsfx6GBLI",
    tags: ["Urdu", "saline soil", "alkaline soil", "high TDS water", "groundwater", "salt accumulation", "hardpan", "deep water wash", "permanent raised beds", "soil moisture management"],
  },
  {
    feNumber: 30,
    title: "Green Peas on PQNK: Strong Germination in Unusually Hot Weather",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "Green peas",
    year: 2026,
    date: "2026-10-07",
    summary:
      "A short field clip, in Urdu and English, of green peas sown under PQNK, emerging through a thick layer of organic mulch on the bed. Although the temperature at sowing was unusually high for peas, germination is uniform and the young plants are healthy and vigorous. The reason is the organic mulch on the soil surface: it shields the soil from direct sun, moderates soil temperature and conserves moisture around the seed and the young roots. The clip sums up the PQNK approach: instead of making the crop fight the weather, give its roots a better environment.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/kGu_HBY-Nys",
    videoId: "kGu_HBY-Nys",
    tags: ["green peas", "germination", "organic mulch", "soil temperature", "moisture conservation", "heat", "permanent raised beds", "root environment"],
  },
  {
    feNumber: 31,
    title: "Tomato on PQNK: Healthy, Vigorous Plants in Intense Heat",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "Tomato",
    year: 2026,
    date: "2026-10-07",
    summary:
      "A short field clip of tomatoes growing under PQNK in the field of farmer Abdul Razak at Sherkpur. Even in intense heat the plants show strong health, good colour and exceptional vigour; the farmer himself calls it the happiness of the plants. Organic mulch on the soil surface shields the soil from direct sun, conserves moisture and helps moderate the environment around the roots. The clip sums up the PQNK approach: PQNK does not control the weather; it improves the environment of the soil and roots so that the plant can express its natural potential.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/Gdzhr-fIL8E",
    videoId: "Gdzhr-fIL8E",
    tags: ["tomato", "heat", "organic mulch", "soil temperature", "moisture conservation", "plant vigour", "root environment", "farmer field"],
  },
  {
    feNumber: 32,
    title: "When 13 Inches of Rain Falls in Eight Hours: PQNK Beds Take the Water In",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Kinnow orchard: rainfall infiltration after hardpan breaking",
    year: 2026,
    date: "2026-10-08",
    summary:
      "Jaskaran Singh, a PQNK farmer in Fazilka district, Indian Punjab, records his Kinnow orchard after extreme rain (13 inches in eight hours). On the permanent beds he made under PQNK, where the hardpan had been broken, the water has gone into the soil within a short time and he walks on the beds in slippers; water is left only in the furrows. In the neighbouring conventionally managed orchards and fields, water stands a foot deep. A strip of his own orchard where beds were shaped but the hardpan was not broken still holds water. He credits the guidance he received and notes the Jantar cover crop and mulch on his beds. The field evidence behind Knowledge Paper KP-213.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/AOgnRUUc7KI",
    videoId: "AOgnRUUc7KI",
    tags: ["extreme rainfall", "infiltration", "hardpan", "permanent raised beds", "Kinnow", "citrus orchard", "flooding", "Jantar", "Fazilka", "Indian Punjab", "KP-213"],
  },
  {
    feNumber: 33,
    title: "Harvesting Without Irrigation: Residue Holds Moisture, Even in the Desert",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "Soil moisture under organic cover",
    year: 2026,
    date: "2026-10-08",
    summary:
      "Three field clips on how organic cover keeps soil moist without irrigation. Sugarcane residue lying on a roller-compacted road is pulled aside to show moist soil soft enough to open by hand, while the uncovered road beside it is as hard as rock. In the Cholistan Desert, on the road from Chishtian towards Haroonabad, a heap of residue left in an open place for five to six months is lifted to reveal moist, soft soil, while the land around it is so dry and hard that a metal key cannot open it. A third clip compares soil with and without mulch. Residue captures humidity and dew and slows the loss of moisture, so the soil beneath stays soft and alive. The field evidence behind Knowledge Paper KP-214.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/EsgsgFdRqEA",
    videoId: "EsgsgFdRqEA",
    tags: ["harvesting without irrigation", "organic mulch", "sugarcane residue", "dew", "humidity", "soil moisture", "Cholistan", "desert", "compacted soil", "KP-214"],
  },
  {
    feNumber: 34,
    title: "Q&A on PQNK Citrus: Soil in the Furrows, Water, and the Empty Centre Bed",
    evidenceTypes: ["Q&A", "Advisory"],
    cropOrTopic: "Citrus orchard on PQNK permanent beds",
    year: 2026,
    date: "2026-10-09",
    farmer: "Ikram",
    location: "Sillanwali, Sargodha",
    summary:
      "Farmer Ikram has moved his citrus orchard onto PQNK permanent beds and the trees are healthy and active. Soil and weeds are collecting in the furrows between the rows, and he asks whether to remove the soil from the centre so the water can flow. The answer: do not remove the soil; the problem is excess water, not soil. Before watering, check the soil 2 feet from the trunk and 4 inches deep, and if it forms a ball, do not water; with good mulch and correct water management the orchard hardly needs irrigation. Do not leave the centre bed empty: grow wheat or vegetables on it. About 8 feet between trees is best; where trees are farther apart, plant a peach between them, for a peach harvest in summer and citrus in winter, two harvests a year and less risk. Never disturb the beds, and give water only in the furrow and only when it is needed. Weeds in the furrow do no harm, as the water runs slowly. Running the tractor two or three times along the furrow makes its bottom firm, like a footpath, so the water moves into the beds. Next step: mulch the tree beds and the centre bed with paddy straw, then sow wheat or vegetables. Orchards under PQNK are covered in PQNK Book Chapter 40.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/wpNUKbCNXAA",
    videoId: "wpNUKbCNXAA",
    tags: ["citrus", "Kinnow", "orchard", "furrow", "soil-ball test", "irrigation", "excess water", "mulch", "paddy straw", "intercropping", "peach", "tree spacing", "controlled traffic", "Sargodha"],
  },
  {
    feNumber: 35,
    title: "Mango Orchard on Death Row, Recovered Within Nine Months on PQNK",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Mango orchard recovery on PQNK",
    year: 2026,
    date: "2026-10-11",
    farmer: "Abdul Qadir",
    location: "Sujjahabad",
    summary:
      "The slide, \"Mango orchard on death row, recovered within just nine months with PQNK: Mango Research Station Sujjahabad reports\", shows the same declining mango tree in September 2019 and, on PQNK, in full healthy leaf in July 2020. In the video, Abdul Qadir, mango grower and President of the Mango Association, says growers had believed they would never reach the planned plant population per acre: trees raised for ten to twelve years fell to dieback, disease and decline, and had to be planted again. With PQNK he is now sure that every tree in the orchards will be healthy and give a proper crop. His orchards are healthy, produce without fertiliser, and the cost of production has fallen sharply. He has about 200 acres of mango and, with the fruit harvest almost over, has started shifting the whole orchard onto beds this winter, so that not a single tree will be off the beds. Orchards under PQNK, including this recovery, are covered in PQNK Book Chapter 40.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/ppRk8ZXBdDU",
    videoId: "ppRk8ZXBdDU",
    relatedCropSlug: "mango",
    tags: ["mango", "orchard recovery", "dying trees", "dieback", "decline", "permanent beds", "no fertiliser", "cost of production", "plant population", "Sujjahabad", "Multan", "Mango Association"],
  },
  {
    feNumber: 36,
    title: "Papaya on PQNK: The Profitable Tropical Plant",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Papaya on PQNK permanent beds",
    year: 2026,
    date: "2026-10-11",
    summary:
      "A papaya grower shows his orchard, fully on PQNK: no fertiliser and no spray. Last year the beds were mulched with paddy straw; over the year the mulch blew away in places and broke down, so after the water channel was cleaned the beds were mulched again. The trees are fruiting heavily, the fruit is going to market, and his crop is better than that of the growers around him. Before PQNK, he says, there was endless labour, spraying day and night at high cost, and still the diseases were not controlled; since the beds were mulched the family has been free of that worry, and they only check the plants and give water. The slide sets out the economics, kept on the low side: conventional papaya costs more than Rs. 200,000 per acre per year, while PQNK needs no purchased inputs and about 90 percent less water. At 600 plants per acre, an average of 50 fruits per plant at 0.62 kg each and Rs. 50 per kg, well below the wholesale price of over Rs. 100, the gross income is close to Rs. 1,000,000 per acre. Papaya under PQNK is covered in PQNK Book Chapter 41.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/G-dP-x8U0j8",
    videoId: "G-dP-x8U0j8",
    tags: ["papaya", "tropical crops", "paddy straw", "mulch", "no fertiliser", "no spray", "disease control", "cost of production", "fruit yield", "income per acre", "water saving"],
  },
  {
    feNumber: 37,
    title: "Dew on PQNK Sugarcane at Dawn: Wet Mulch, Moist Living Soil Beneath",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Dew, mulch and soil moisture in PQNK sugarcane",
    year: 2026,
    date: "2026-10-13",
    farmer: "Vasudha Sardar",
    summary:
      "On a clear morning, Vasudha Sardar walks her PQNK sugarcane plot and shows dew collected on the leaves of almost every plant, with the mulch beneath wet with it. Lifting the mulch with a stick, she finds the soil underneath moist and sweet-smelling, with white fungal growth in it, which she reads as beneficial fungi. It is the water a living, covered soil gathers from the air every night: dew condenses on the leaves and runs down into the mulch, and the mulch keeps the soil beneath moist. The PQNK water cycle of receiving, retaining and using this water is explained in Knowledge Papers KP-214 and KP-217.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/Vf8L--0XZII",
    videoId: "Vf8L--0XZII",
    relatedCropSlug: "sugarcane",
    tags: ["dew", "humidity", "mulch", "soil moisture", "sugarcane", "beneficial fungi", "living soil", "harvesting without irrigation", "KP-214", "KP-217"],
  },
  {
    feNumber: 38,
    title: "No-Till Planting of Canola on PQNK Permanent Beds in a Mango Orchard",
    evidenceTypes: ["Field Evidence", "Machinery Demonstration"],
    cropOrTopic: "Canola (rapeseed) sown without tillage between mango rows",
    year: 2026,
    date: "2026-10-13",
    location: "Haroonabad (Maxim Farm)",
    summary:
      "On an organic PQNK mango orchard at Haroonabad, with the trees planted 10 by 20 feet, the three empty permanent beds between the tree rows are sown with canola without tillage. A Jantar cover crop grown on the beds is cut with a mulcher, the beds are lightly renovated and the furrows cleaned, and all the residue stays on the surface as mulch. The canola is then sown straight through the residue with a precision planter, the two outer rows about 6 inches in from the bed edges. The field had received rain, and the crop was sown on that moisture with no irrigation. The sowing window and care of PQNK rapeseed are covered in Knowledge Paper KP-215.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/QXq8cEaFrzw",
    videoId: "QXq8cEaFrzw",
    tags: ["canola", "rapeseed", "no-till", "precision planter", "permanent raised beds", "mulcher", "Jantar", "cover crop", "residue mulch", "mango orchard", "intercropping", "rain-fed sowing", "Haroonabad", "KP-215"],
  },
  {
    feNumber: 39,
    title: "Behind the Obvious: Reading a Living Agricultural Ecosystem",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Biodiversity in a PQNK field",
    year: 2026,
    date: "2026-10-14",
    farmer: "Vasudha Sardar",
    summary:
      "Vasudha Sardar photographed a small bird perched on a crop plant in her PQNK field and shared it as \u201cA bird watching.\u201d Her friend Madhuri Paranjape, of Vasudha\u2019s PQNK Training group, looked \u201cbehind the obvious\u201d: the deep green leaves are making sugars, and send 20 to 40 percent of their carbon below ground to feed the soil life that makes minerals available to the roots; the bird, which she identified as a shrike (khatik in Marathi), is a small predator that lives only where a whole food chain is at work. On PQNK beds, never tilled and never left bare, that chain is whole again, and pests are held in balance by their natural enemies and by healthy plants, without sprays. A field is more than its harvest: it is a living system, and its biological relationships produce the harvest.",
    sourcePlatform: "Other",
    sourceUrl: "/field-evidence/fe-039-behind-the-obvious.pdf",
    clippingImage: "/field-evidence/fe-039-behind-the-obvious.jpg",
    tags: ["biodiversity", "birds", "shrike", "food web", "natural pest control", "soil biology", "photosynthesis", "living soil", "Vasudha Sardar", "Madhuri Paranjape"],
  },
  {
    feNumber: 40,
    title: "Sugarcane Tillering Strongly Beside Weeds on PQNK",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "Sugarcane",
    year: 2026,
    date: "2026-10-16",
    summary:
      "A PQNK sugarcane field filmed on 16 October 2026 is tillering strongly: new shoots are coming up in large numbers, and they are thick and uniform. A few plants stand out, taller and more vigorous with every shoot thicker, like a sturdy boy in a class, and can be picked out even from a distance; the rest of the field gradually comes up alongside them. The field is covered with weeds at this stage, and the narration is clear that this is no cause for worry at all.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/Ax62H0_dqVs",
    videoId: "Ax62H0_dqVs",
    tags: ["sugarcane", "tillering", "shoots", "weeds", "uniform crop", "permanent raised beds", "pristine organic"],
  },
  {
    feNumber: 41,
    title: "No-Till Canola Germinating on Rain Moisture in a PQNK Orange Orchard",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Canola (rapeseed) sown without tillage in an orange orchard",
    year: 2026,
    date: "2026-10-17",
    location: "Haroonabad (Rehmat Bibi Farm)",
    summary:
      "At Rehmat Bibi Farm in Haroonabad, the orange block is planted 10 by 10 feet. Canola was sown on the middle bed with SIPP, the Slit Insertion Precision Planter, and the germination has come up beautifully. Rain provided the moisture needed to trigger germination; no water was run through the furrows. The farm thanks PQNK for its guidance. The sowing window and care of PQNK canola are covered in Knowledge Paper KP-215.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/jPlpn3Y3NH8",
    videoId: "jPlpn3Y3NH8",
    tags: ["canola", "rapeseed", "no-till", "SIPP", "Slit Insertion Precision Planter", "orange orchard", "citrus", "intercropping", "rain-fed sowing", "germination", "Haroonabad", "KP-215"],
  },
  {
    feNumber: 42,
    title: "VIPP: Sowing Alfalfa Straight Through the Cover",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "Alfalfa sown with the VIPP on permanent beds",
    year: 2026,
    date: "2026-10-17",
    location: "Haroonabad (Rehmat Bibi Farm)",
    summary:
      "At Rehmat Bibi Farm in Haroonabad, the tractor-mounted VIPP (Vertical Insertion Precision Planter) is sowing alfalfa on PQNK permanent beds. The beds carry a cover of grass, weeds and older alfalfa plants, and nothing is ploughed, burnt or cleared before sowing. The earlier alfalfa germination was not satisfactory, so new seed is being planted in between the old plants without disturbing the soil. This is the advantage of the VIPP: it can plant a crop into a standing crop (crop-in-crop). Each unit presses the seed straight down into the bed at one point and lifts out again, so the cover stays on the bed, keeping the soil cool and moist, feeding the soil life and holding back new weeds while the crop comes up. One pass, no tillage, no bare soil and no purchased input.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/lPzOH5devsQ",
    videoId: "lPzOH5devsQ",
    tags: ["alfalfa", "VIPP", "Vertical Insertion Precision Planter", "no-till", "sowing through cover", "crop-in-crop", "reseeding", "permanent raised beds", "cover", "Haroonabad"],
  },  {
    feNumber: 43,
    title: "Raya (Mustard) Sown with SIPP Straight into Mature PQNK Beds",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "Raya (mustard) sown with the SIPP on mature permanent beds",
    year: 2026,
    date: "2026-10-17",
    location: "Sangla Hill, Faisalabad",
    summary:
      "At Sangla Hill, Faisalabad, Raya (mustard) is being sown on mature PQNK permanent beds. The beds carry a cover of grass, and nothing is ploughed or cleared before sowing. The tractor-mounted SIPP, the Slit Insertion Precision Planter, places the seed through the cover in one pass. No tillage, no bare soil.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/eMyo0NQZhRE",
    videoId: "eMyo0NQZhRE",
    thumbnail: "/field-evidence/ke-043-thumbnail.jpg",
    tags: ["raya", "mustard", "SIPP", "Slit Insertion Precision Planter", "no-till", "sowing through cover", "permanent raised beds", "mature beds", "Faisalabad", "Sangla Hill"],
  },  {
    feNumber: 44,
    title: "200 Acres of Mango on PQNK: Eight Years Without Chemical Fertiliser",
    evidenceTypes: ["Farmer Testimony"],
    cropOrTopic: "Mango orchard, 200 acres, on PQNK beds since 2018",
    year: 2026,
    date: "2026-10-18",
    location: "Jalalpur Pirwala, District Multan",
    summary:
      "In an interview with Mian Arfan Khalid, Ghulam Qadir Bhutta, who grows mango on 200 acres at Jalalpur Pirwala, District Multan, explains that he came across PQNK on social media in 2018, studied it for two to three months and moved his entire orchard onto beds that same year. Eight years on, he reports at least fifty percent less water, weeds now treated as friends with the cost of weedicides and weed control saved, and not a single ounce of chemical fertiliser bought or applied since 2018, with no year of problems in fruit quality, size or colour. He reads the mango leaf: when its size, colour and number are right, the yield follows. For a new orchard he advises PQNK's basic steps, levelling the land and breaking the hardpan before planting, then Jantar and beds, and he finds mango suits PQNK better than field crops, because falling leaves and flowers mulch the beds on their own once the trees are grown.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/yWPqa9US-u0",
    videoId: "yWPqa9US-u0",
    tags: ["mango", "orchard", "farmer testimony", "no chemical fertiliser", "water saving", "weeds", "permanent raised beds", "Jantar", "hardpan", "Jalalpur Pirwala", "Multan", "Ghulam Qadir Bhutta"],
  },  {
    feNumber: 45,
    title: "Mixed Orchard on PQNK",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "Mixed fruit orchard on permanent beds",
    year: 2026,
    date: "2026-10-18",
    summary:
      "A walk through a mixed fruit orchard on PQNK. The trees stand in rows on permanent raised beds, healthy and in full leaf. Fallen leaves lie as a natural mulch on the beds, and a living cover of grass and weeds grows in the furrows between them. Nothing is cleared or tilled: the orchard's own leaf fall and ground cover protect the soil.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/5vJ3jEigiho",
    videoId: "5vJ3jEigiho",
    tags: ["orchard", "mixed orchard", "fruit trees", "permanent raised beds", "leaf mulch", "ground cover", "no-till"],
  },  {
    feNumber: 46,
    title: "Peanut on PQNK Beds: A Full Crop Where Nothing Would Grow",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Peanut on permanent beds, no fertiliser or pesticide",
    year: 2026,
    date: "2026-10-19",
    summary:
      "Peanut was sown on PQNK permanent beds with no fertiliser and no pesticide. The plants grew large and carried many pods, and the kernels are hard, mature and well filled. The farmer says it is the first time he has harvested a crop like this on that land, which agriculture department staff had said could grow nothing. For the next crop, Asif Sharif advises keeping the full plant population, rolling a light drum over the plants when pegging begins so they lie down a little and the pegs reach the soil easily, and pulling the plants by hand at harvest: as the beds mature the soil stays soft and the plants come out with all their pods, with no blade needed. Wheat follows on the same beds, sown through mulch.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/rT3ySxaNGoA",
    videoId: "rT3ySxaNGoA",
    thumbnail: "/field-evidence/ke-046-thumbnail.jpg",
    tags: ["peanut", "groundnut", "permanent raised beds", "no fertiliser", "no pesticide", "pegging", "harvest by hand", "degraded land", "farmer testimony"],
  },
  {
    feNumber: 47,
    title: "Garlic on PQNK, Multan",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "Garlic on permanent beds",
    year: 2026,
    date: "2026-10-19",
    location: "Multan",
    summary:
      "A walk through a PQNK garlic field in Multan. The crop stands dense and green on permanent beds, with mulch and a living ground cover between the plants. Bulbs pulled by hand from the soft bed come out whole, with their full root mass, and are large, firm and clean, with no tillage, no fertiliser and no spray behind them.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/tlF3J4Gzigc",
    videoId: "tlF3J4Gzigc",
    tags: ["garlic", "Multan", "permanent raised beds", "mulch", "harvest by hand", "no fertiliser", "no pesticide"],
  },
  {
    feNumber: 48,
    title: "Citrus on PQNK, Bhakkar: Less Water, Fewer Sprays, Better Fruit",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Citrus orchard on permanent beds, with Jantar and then chickpea and canola between the rows",
    year: 2026,
    date: "2026-10-20",
    location: "Bhakkar",
    summary:
      "Sardar Iftikhar Alam grows citrus at Bhakkar. Following Asif Sharif's instructions, he broke the hardpan, made permanent beds and grew Jantar between the rows of citrus trees. In his own message he writes that the orchard has not only saved water and sprays, but the quality of the fruit is visibly better too. On 9 October he shows the next step: two beds between every two rows of trees, with water travelling in the furrows and chickpea on the beds, and a plank dragged behind the bed maker so the seed is covered with soil. Asif Sharif replies that not one inch of land should be left bare for even a minute: sow wheat, toria or mustard on the open ground, so it earns an income and the soil keeps improving. The farmer answers that the Jantar crop has just finished, the tall Jantar was cut and laid between the trees, and canola and chickpea are now sown, so no inch of the orchard is left bare.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/ylUTsMrVqUM",
    videoId: "ylUTsMrVqUM",
    thumbnail: "/field-evidence/ke-048-thumbnail-v2.jpg",
    tags: ["citrus", "orchard", "farmer testimony", "hardpan", "permanent raised beds", "Jantar", "chickpea", "canola", "no bare soil", "water saving", "fewer sprays", "fruit quality", "Bhakkar", "Sardar Iftikhar Alam"],
  },
  {
    feNumber: 49,
    title: "Wheat Sown with the SIPP Straight into a Harvested Rice Field",
    evidenceTypes: ["Field Evidence"],
    cropOrTopic: "Wheat sown with the SIPP through rice stubble, no tillage",
    year: 2026,
    date: "2026-10-21",
    summary:
      "Wheat is being sown on PQNK straight into a field where rice has just been harvested. The rice stubble and straw are left standing and lying on the ground as mulch, and nothing is ploughed, burnt or cleared. The tractor-mounted SIPP, the Slit Insertion Precision Planter, with its five seed boxes, places the wheat seed through the straw cover in a single pass. The rice residue stays on the field to protect the soil and feed it, and the wheat follows the rice without a gap.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/jEgCt1pjPxU",
    videoId: "jEgCt1pjPxU",
    thumbnail: "/field-evidence/ke-049-thumbnail.jpg",
    tags: ["wheat", "rice", "rice-wheat", "SIPP", "Slit Insertion Precision Planter", "no-till", "sowing through mulch", "rice straw", "no burning"],
  },
  {
    feNumber: 50,
    title: "Kinnow on PQNK, Bhakkar: No Spray All Year, 90% Less Chemical Fertiliser",
    evidenceTypes: ["Farmer Testimony", "Field Evidence"],
    cropOrTopic: "Kinnow orchard on PQNK, moving off chemical fertiliser",
    year: 2026,
    date: "2026-10-22",
    location: "Bhakkar",
    summary:
      "A Kinnow orchard on PQNK in Bhakkar, with the trees heavily loaded with fruit and the ground under them covered with dry mulch. In his own statement the farmer writes that the orchard was not given a single chemical spray all year, that 90 percent less chemical fertiliser was used than the year before, and that next year the plan, God willing, is to give no chemical fertiliser at all.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/6fX2GR_UxkU",
    videoId: "6fX2GR_UxkU",
    thumbnail: "/field-evidence/ke-050-thumbnail.jpg",
    tags: ["kinnow", "citrus", "orchard", "farmer testimony", "no spray", "chemical fertiliser reduced", "transition", "mulch", "Bhakkar"],
  },
];

export function getFieldEvidenceByFeNumber(feNumber: number) {
  return fieldEvidence.find((f) => f.feNumber === feNumber);
}

/** Formats a permanent Field Evidence catalogue ID for display, e.g. 2 -> "KE-002" (displayed as "KE" to match the Knowledge Exchange section name; the internal field/id remain "fe" for stability). */
export function formatFeNumber(feNumber: number) {
  return `KE-${String(feNumber).padStart(3, "0")}`;
}

/** Parses a user-entered KE/FE reference ("KE-002", "FE-002", "KE002", "ke-2") into its numeric feNumber, or null. */
export function parseFeQuery(query: string): number | null {
  const m = query.trim().match(/^(?:ke|fe)-?0*(\d+)$/i);
  return m ? Number(m[1]) : null;
}

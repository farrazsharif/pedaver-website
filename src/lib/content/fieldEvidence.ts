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
      "A short field clip of tomatoes growing under PQNK in the field of farmer Abdul Razak at Sherpur. Even in intense heat the plants show strong health, good colour and exceptional vigour; the farmer himself calls it the happiness of the plants. Organic mulch on the soil surface shields the soil from direct sun, conserves moisture and helps moderate the environment around the roots. The clip sums up the PQNK approach: PQNK does not control the weather; it improves the environment of the soil and roots so that the plant can express its natural potential.",
    sourcePlatform: "YouTube",
    sourceUrl: "https://youtu.be/Gdzhr-fIL8E",
    videoId: "Gdzhr-fIL8E",
    tags: ["tomato", "heat", "organic mulch", "soil temperature", "moisture conservation", "plant vigour", "root environment", "farmer field"],
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

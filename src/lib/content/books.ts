/**
 * PQNK Books data model — the permanent publishing architecture for
 * Pedaver's four PQNK books (2026-08-27). Structured, systematic bodies of
 * knowledge published chapter by chapter, distinct from Knowledge Papers
 * (single-subject research, papers.ts) and Knowledge Exchange (field
 * evidence and farmer testimony, fieldEvidence.ts).
 *
 * CORE PRINCIPLE — chapter number can change, chapter identity must not:
 * the manuscript is still being developed. Chapters may be inserted,
 * divided, merged, retitled, or moved between Parts, so a chapter's
 * position in `chapters` (which drives its displayed number and its Part
 * grouping) is treated as presentational and recalculated on every read.
 * Its `chapterId` is the only thing anything permanent — the URL, the PDF
 * filename, analytics, external citations — is ever built from, and it
 * never changes once assigned, even if the chapter's number, title, or
 * Part does.
 *
 * BOOK / PART / CHAPTER POSITION / CHAPTER IDENTITY / PUBLICATION VERSION
 * are five separate concerns here, exactly as specified: bookId and
 * chapterId are permanent identity; partId and array position are
 * organisational/presentational and may be edited freely; status/version/
 * dates are the publication record layered on top.
 *
 * PUBLIC VS. INTERNAL VIEW (2026-08-27 correction): `book.chapters` below
 * holds the FULL current manuscript structure — all 66 chapters, published
 * and in-preparation alike — because that is genuinely useful for internal
 * planning (it's what getChapterDisplayNumber and getAdjacentPublishedChapters
 * read from). It is NOT meant to be rendered publicly as-is. The public
 * `/books/{bookId}` page must only ever show chapters that are actually
 * published, grouped only under Parts that contain at least one published
 * chapter — use getPublishedPartsWithChapters for that, never getPartsWithChapters
 * (kept below for internal/future admin use) on a public-facing page. A
 * chapter's displayed number is always its position in the FULL sequence,
 * not a renumbering of the published subset — see getChapterDisplayNumber —
 * so that number is a snapshot of current manuscript position, not a
 * permanent identifier. It only becomes authoritative once a book's
 * `status` becomes "complete" and its First Edition is frozen.
 */

export type BookStatus = "in-progress" | "complete";
export type ChapterStatus = "published" | "in-preparation";

export interface BookPart {
  /** Stable id for this Part within its book. Grouping key only — never appears in a URL, so a chapter can move to a different Part without touching its permanent address. */
  partId: string;
  title: string;
  subtitle?: string;
}

export interface BookChapter {
  /** Permanent identity. Sourced from the chapter's subject/title, never a chapter number — see the file-level note on why. This is what the URL and the PDF filename are built from, and it is the ONLY field anything permanent should ever reference. */
  chapterId: string;
  /** The Part this chapter currently sits under (must match a partId in the book's `parts` list). Purely organisational — reassigning this does not affect the chapter's URL. */
  partId: string;
  title: string;
  subtitle?: string;
  status: ChapterStatus;
  /** One or two lines for the book's contents list and the chapter page's own header — set only once a chapter is far enough along to describe. */
  summary?: string;
  /** Full chapter text, as an array of paragraphs — same convention as Paper.abstract. Present only once status is "published"; this is what the chapter page renders under "Read Chapter". */
  body?: string[];
  /** ISO date first published. Present only once status is "published". */
  publishedDate?: string;
  /** ISO date of the latest meaningful revision, set only when it differs from publishedDate (e.g. a 1.0 -> 1.1 correction). */
  modifiedDate?: string;
  /** Lightweight editorial version, e.g. "1.0", "1.1" — see file note on versioning. Present only once published. */
  version?: string;
  /** Path under /public, e.g. "/books/natural-ecosystem-science/earths-original-design.pdf" — stable, semantic, never numbered. Present only once published. */
  pdfPath?: string;
}

export interface Book {
  /** Permanent identity for the book itself, e.g. "natural-ecosystem-science". Used in its URL and nowhere else needs to change if the title is ever refined. */
  bookId: string;
  title: string;
  subtitle?: string;
  description: string;
  status: BookStatus;
  /** Set only once the manuscript is frozen — see the file note on the Complete First Edition. */
  edition?: string;
  parts: BookPart[];
  /**
   * The CURRENT chapter sequence, in order. This is the single authoritative
   * source for Part grouping, chapter numbering, and Prev/Next — nothing
   * else stores or hard-codes a chapter number. Insert, remove, or reorder
   * a chapter here and every displayed number, and every Prev/Next link,
   * recalculates automatically; nothing else in the codebase needs to
   * change (see getChapterDisplayNumber / getAdjacentPublishedChapters).
   */
  chapters: BookChapter[];
  /** Set only once the complete First Edition has been compiled and frozen. Individual chapter URLs remain live after this — they are never removed. */
  completeBookPdfPath?: string;
}

export const books: Book[] = [
  {
    bookId: "natural-ecosystem-science",
    title: "PQNK: The Natural Ecosystem Science of Production Agriculture",
    subtitle: "Nature's Wisdom for Abundant and Nutrient-Dense Food Production by Rebuilding Living Soil",
    description:
      "The first of Pedaver's four PQNK books: the complete natural-ecosystem science behind PQNK, drawn from fifty-three years of field research. It is being published chapter by chapter as each is written, reviewed, and prepared for release, rather than held back until the whole manuscript is finished.",
    status: "in-progress",
    // Editorial contents structure below reflects the manuscript's current Part/Chapter
    // arrangement as of 2026-08-27, shown per the task brief's allowance to display
    // existing chapter titles even before any are published. Parts One through Five are
    // reasonably settled; Part Six's boundary past Chapter 49 is NOT yet confirmed by the
    // manuscript itself — no further Part heading exists after it, so Chapters 50-66 are
    // grouped under Part Six provisionally, purely as a container, not as an editorial
    // claim that they belong there. Because `partId` is just an organisational label,
    // re-grouping any of them (or introducing a Part Seven) later is a one-line change
    // per chapter here and touches no URL, no file, and no other part of the codebase.
    parts: [
      { partId: "part-one", title: "The Original System", subtitle: "Nature's 400-Million-Year Blueprint" },
      { partId: "part-two", title: "The Destruction", subtitle: "Ten Thousand Years of Incremental Error" },
      { partId: "part-three", title: "The Discovery", subtitle: "Fifty-Three Years of Field Science" },
      { partId: "part-four", title: "The PQNK System", subtitle: "How It Works" },
      { partId: "part-five", title: "The Evidence", subtitle: "Crop by Crop" },
      { partId: "part-six", title: "The Transformation", subtitle: "From Farm to Future" },
    ],
    chapters: [
      { chapterId: "earths-original-design", partId: "part-one", title: "Earth's Original Design", status: "in-preparation" },
      { chapterId: "rock-dirt-soil-life", partId: "part-one", title: "Rock, Dirt, Soil, Life", status: "in-preparation" },
      { chapterId: "the-0-083-paradox", partId: "part-one", title: "The 0.083% Paradox", subtitle: "Plants Eat Air, Not Soil", status: "in-preparation" },
      { chapterId: "carbon-the-currency-of-life", partId: "part-one", title: "Carbon: The Currency of Life", status: "in-preparation" },
      { chapterId: "the-natural-water-system", partId: "part-one", title: "The Natural Water System", subtitle: "Rain, Dew, Humidity, and Soil Moisture Management", status: "in-preparation" },
      { chapterId: "natures-pest-protection", partId: "part-one", title: "Nature's Pest Protection", subtitle: "BT Bacteria, the Living Immune System, and the Hundred-Billion-Dollar Lie", status: "in-preparation" },
      { chapterId: "weeds-as-soil-physicians", partId: "part-one", title: "Weeds as Soil Physicians", subtitle: "The Paradigm Inversion, Reading the Field's Own Diagnosis", status: "in-preparation" },

      { chapterId: "the-first-error", partId: "part-two", title: "The First Error", subtitle: "When Humans Buried Seeds in Fear, Not Understanding", status: "in-preparation" },
      { chapterId: "ancient-conventional-industrial-aci-the-cover-up-technology-chain", partId: "part-two", title: "Ancient Conventional Industrial (ACI): The Cover-Up Technology Chain", subtitle: "How Each Agricultural Intervention Creates the Problem That Requires the Next", status: "in-preparation" },
      { chapterId: "the-industrialization-of-agriculture", partId: "part-two", title: "The Industrialization of Agriculture", subtitle: "How the Living Ecosystem Was Replaced by an Industrial Response System", status: "in-preparation" },
      { chapterId: "the-68-year-experiment", partId: "part-two", title: "The 68-Year Experiment", subtitle: "1958 to the Present, Measuring the Quantified Catastrophe", status: "in-preparation" },
      { chapterId: "captured-science", partId: "part-two", title: "Captured Science", subtitle: "How Agricultural Research Became a Tool of the Input Supply Industry", status: "in-preparation" },
      { chapterId: "the-sevenfold-bankruptcy", partId: "part-two", title: "The Sevenfold Bankruptcy", subtitle: "Ecological, Nutritional, Economic, Health, Knowledge, Social, and Moral", status: "in-preparation" },
      { chapterId: "the-true-cost", partId: "part-two", title: "The True Cost", subtitle: "$1.9 Trillion Per Year, and the $4.7 Trillion PQNK Restoration Dividend", status: "in-preparation" },
      { chapterId: "human-civilization-and-the-politics-of-food", partId: "part-two", title: "Human Civilization and the Politics of Food", subtitle: "Agriculture, Power, and the Future of Autonomy", status: "in-preparation" },

      { chapterId: "building-the-machine", partId: "part-three", title: "Building the Machine", subtitle: "1973-1994: Mastering Industrial Agriculture Before Rejecting It", status: "in-preparation" },
      { chapterId: "the-turning-points", partId: "part-three", title: "The Turning Points", subtitle: "Four Cotton Crises and the Questions They Forced", status: "in-preparation" },
      { chapterId: "the-amazon-revelation", partId: "part-three", title: "The Amazon Revelation", subtitle: "2008, What Four Hundred Million Years Showed in a Forest", status: "in-preparation" },
      { chapterId: "the-first-experiment", partId: "part-three", title: "The First Experiment", subtitle: "Rice on Moist Soil Raised Beds, Paradoxical Agriculture Becomes Proof", status: "in-preparation" },
      { chapterId: "the-naming-of-pqnk", partId: "part-three", title: "The Naming of PQNK", subtitle: "From Paradox to Picnic, the System Codified and Named", status: "in-preparation" },
      { chapterId: "adversity-as-laboratory", partId: "part-three", title: "Adversity as Laboratory", subtitle: "The Years That Forged the PQNK Knowledge System", status: "in-preparation" },

      { chapterId: "the-four-prohibitions-and-four-principles", partId: "part-four", title: "The Four Prohibitions and Four Principles", subtitle: "The Litmus Test for True Natural Agriculture", status: "in-preparation" },
      { chapterId: "the-eight-step-transition-protocol", partId: "part-four", title: "The Eight-Step Transition Protocol", subtitle: "From ACI to PQNK in One Season", status: "in-preparation" },
      { chapterId: "the-complete-pqnk-system-timeline", partId: "part-four", title: "The Complete PQNK System Timeline", subtitle: "From the Day of Transition to the Mature Ecosystem", status: "in-preparation" },
      { chapterId: "hardpan-what-it-is-what-it-does-and-how-to-shatter-it", partId: "part-four", title: "Hardpan: What It Is, What It Does, and How to Shatter It", subtitle: "The Invisible Wall Beneath Every Conventionally Managed Field", status: "in-preparation" },
      { chapterId: "soil-moisture-management", partId: "part-four", title: "Soil Moisture Management", subtitle: "The Water Revolution: Four Sources, One Protocol, Zero Waste", status: "in-preparation" },
      { chapterId: "organic-mulch-natures-blanket", partId: "part-four", title: "Organic Mulch, Nature's Blanket", subtitle: "Thermostat, Food Source, Weed Suppressor, and Carbon Engine", status: "in-preparation" },
      { chapterId: "pqnk-machinery-engineering", partId: "part-four", title: "PQNK Machinery Engineering", subtitle: "Tools That Serve the Ecosystem", status: "in-preparation" },
      { chapterId: "sipp-and-precision-planting", partId: "part-four", title: "SIPP and Precision Planting", subtitle: "The Machine Revolution, Every Seed in Its Right Place", status: "in-preparation" },
      { chapterId: "the-closed-loop-farm", partId: "part-four", title: "The Closed-Loop Farm", subtitle: "Self-Sufficiency as a System State, Zero Inputs, Maximum Output", status: "in-preparation" },
      { chapterId: "pqnk-vs-all-others", partId: "part-four", title: "PQNK vs. All Others", subtitle: "The Definitive Comparison", status: "in-preparation" },
      { chapterId: "field-evidence-and-the-authority-of-living-ecosystems", partId: "part-four", title: "Field Evidence and the Authority of Living Ecosystems", subtitle: "The Farm as the Final Judge", status: "in-preparation" },

      { chapterId: "rice-the-proof-of-concept", partId: "part-five", title: "Rice, The Proof of Concept", subtitle: "2008 to Present, Peer-Reviewed, Replicated, and Scaled", status: "in-preparation" },
      { chapterId: "wheat-from-78-tillers-to-8-kg-seed", partId: "part-five", title: "Wheat, From 78 Tillers to 8 kg Seed", subtitle: "Pakistan's Food Security Crop Transformed", status: "in-preparation" },
      { chapterId: "cotton-from-bt-to-pqnk", partId: "part-five", title: "Cotton, From BT to PQNK", subtitle: "The Fourth Turning Point, 200 Balls Per Plant, Zero Sprays", status: "in-preparation" },
      { chapterId: "maize-three-crops-a-year", partId: "part-five", title: "Maize, Three Crops a Year", subtitle: "Dramatically Lower Cost, Dramatically Higher Annual Income", status: "in-preparation" },
      { chapterId: "sugarcane-the-bamboo-principle", partId: "part-five", title: "Sugarcane: The Bamboo Principle", status: "in-preparation" },
      { chapterId: "potato-circular-production", partId: "part-five", title: "Potato, Circular Production", subtitle: "Year-Round Yield, 75% Less Seed, Superior Quality", status: "in-preparation" },
      { chapterId: "garlic-onion-and-vegetables", partId: "part-five", title: "Garlic, Onion, and Vegetables", subtitle: "Rs. 1,000,000 per Acre in Six Months: The Designed Diversity System", status: "in-preparation" },
      { chapterId: "orchards-citrus-mango-and-dying-trees", partId: "part-five", title: "Orchards, Citrus, Mango, and Dying Trees", subtitle: "The Toba Tek Singh Data, and How PQNK Revives What Conventional Management Is Killing", status: "in-preparation" },
      { chapterId: "tropical-crops-banana-and-papaya", partId: "part-five", title: "Tropical Crops, Banana and Papaya", subtitle: "Banana Where It Shouldn't Grow; Papaya at Zero Cost", status: "in-preparation" },
      { chapterId: "new-frontiers-five-unexpected-crops", partId: "part-five", title: "New Frontiers, Five Unexpected Crops", subtitle: "Strawberry, Olive, Bamboo, Watermelon, and Saffron in PQNK Systems", status: "in-preparation" },
      { chapterId: "livestock-and-fodder", partId: "part-five", title: "Livestock and Fodder", subtitle: "From 70% to 20% Feeding Cost, Soil to Soul", status: "in-preparation" },

      { chapterId: "one-acre-prosperity", partId: "part-six", title: "One Acre Prosperity", subtitle: "The Smallholder's Path to Dignity", status: "in-preparation" },
      { chapterId: "water-floods-and-aquifer-replenishment", partId: "part-six", title: "Water, Floods, and Aquifer Replenishment", subtitle: "PQNK as Hydrological Solution", status: "in-preparation" },
      { chapterId: "climate-carbon-and-atmospheric-water", partId: "part-six", title: "Climate, Carbon, and Atmospheric Water", subtitle: "PQNK as Climate Solution", status: "in-preparation" },
      { chapterId: "food-security-food-sovereignty-and-economy", partId: "part-six", title: "Food Security, Food Sovereignty, and Economy", subtitle: "What PQNK Means for Pakistan as a Nation-State", status: "in-preparation" },
      { chapterId: "bio-potentiation-from-soil-to-soul", partId: "part-six", title: "Bio-potentiation, From Soil to Soul", subtitle: "The Food Chain as Fountain of Life", status: "in-preparation" },
      { chapterId: "pqnk-as-the-farmacy", partId: "part-six", title: "PQNK as the Farmacy", subtitle: "The Root of the Chronic Disease Epidemic, and Its Cure", status: "in-preparation" },
      { chapterId: "re-mothering-agriculture-maaee-zameen", partId: "part-six", title: "Re-Mothering Agriculture: Maaee Zameen", status: "in-preparation" },
      { chapterId: "okra-under-pqnk", partId: "part-six", title: "Okra Under PQNK", subtitle: "Fruiting Management and the Non-Intervention Principle", status: "in-preparation" },
      { chapterId: "pakistans-sugar-industry", partId: "part-six", title: "Pakistan's Sugar Industry", subtitle: "The PQNK Transformation", status: "in-preparation" },
      { chapterId: "the-four-step-pqnk-transition-protocol", partId: "part-six", title: "The Four-Step PQNK Transition Protocol", subtitle: "Reopening the Living Earth", status: "in-preparation" },
      { chapterId: "the-pqnk-bed-system", partId: "part-six", title: "The PQNK Bed System", subtitle: "Engineering the Physical Architecture of Living Agriculture", status: "in-preparation" },
      { chapterId: "jantar-and-the-biological-architecture-of-living-soil", partId: "part-six", title: "Jantar and the Biological Architecture of Living Soil", subtitle: "From Mechanical Restoration to Self-Organizing Regeneration", status: "in-preparation" },
      { chapterId: "root-retention-science", partId: "part-six", title: "Root Retention Science", subtitle: "The Underground Architecture of the Permanent Bed", status: "in-preparation" },
      { chapterId: "the-pqnk-weed-indicator-system", partId: "part-six", title: "The PQNK Weed-Indicator System", subtitle: "Reading the Field Through Vegetation", status: "in-preparation" },
      { chapterId: "pest-ecology-and-the-collapse-of-biological-balance", partId: "part-six", title: "Pest Ecology and the Collapse of Biological Balance", status: "in-preparation" },
      { chapterId: "nutrition-dense-food-and-the-recovery-of-ecological-quality", partId: "part-six", title: "Nutrition-Dense Food and the Recovery of Ecological Quality", status: "in-preparation" },
      { chapterId: "the-farmer-as-the-ultimate-instrument", partId: "part-six", title: "The Farmer as the Ultimate Instrument", status: "in-preparation" },
      { chapterId: "when-mulch-becomes-a-barrier", partId: "part-six", title: "When Mulch Becomes a Barrier", status: "in-preparation" },
      { chapterId: "why-only-four-kilograms-of-np-during-transition", partId: "part-six", title: "Why Only Four Kilograms of NP During Transition", status: "in-preparation" },
      { chapterId: "the-pqnk-validation-system", partId: "part-six", title: "The PQNK Validation System", status: "in-preparation" },
      { chapterId: "policy-recommendations", partId: "part-six", title: "Policy Recommendations", subtitle: "What Governments, Academia, Finance, and Extension Must Do", status: "in-preparation" },
      { chapterId: "a-call-to-action", partId: "part-six", title: "A Call to Action", subtitle: "For Farmers, Consumers, Youth, Environmentalists, and Scientists", status: "in-preparation" },
      { chapterId: "the-field-record", partId: "part-six", title: "The Field Record", subtitle: "Production Economics of the PQNK System, Crop by Crop", status: "in-preparation" },
    ],
  },
  // Architecture supports additional books as records in this array — see file header.
  // The other three PQNK books are not added here yet: their titles have not been
  // supplied, and inventing placeholders would violate the "do not invent" rule this
  // architecture was built under. Add each as its own { bookId, title, ..., chapters }
  // entry when it's ready; nothing else in the codebase needs to change.
];

export function getBookById(bookId: string): Book | undefined {
  return books.find((b) => b.bookId === bookId);
}

export function getChapterByChapterId(book: Book, chapterId: string): BookChapter | undefined {
  return book.chapters.find((c) => c.chapterId === chapterId);
}

export function getPartById(book: Book, partId: string): BookPart | undefined {
  return book.parts.find((p) => p.partId === partId);
}

/**
 * Displayed chapter number = 1-based position in `book.chapters`. Never
 * stored, always recalculated — inserting, removing, or reordering an
 * entry in that array is the only edit needed anywhere for numbering
 * (and Part grouping, and Prev/Next) to update everywhere it's shown.
 */
export function getChapterDisplayNumber(book: Book, chapterId: string): number | undefined {
  const idx = book.chapters.findIndex((c) => c.chapterId === chapterId);
  return idx === -1 ? undefined : idx + 1;
}

export function getPublishedChapters(book: Book): BookChapter[] {
  return book.chapters.filter((c) => c.status === "published");
}

/**
 * Chapters grouped by Part, in Part order — the FULL internal structure,
 * published and in-preparation chapters alike. Useful for internal
 * planning/admin views. NOT for the public book landing page — see
 * getPublishedPartsWithChapters for that.
 */
export function getPartsWithChapters(book: Book): { part: BookPart; chapters: BookChapter[] }[] {
  return book.parts.map((part) => ({
    part,
    chapters: book.chapters.filter((c) => c.partId === part.partId),
  }));
}

/**
 * The PUBLIC view: Parts that contain at least one published chapter, each
 * listing only its published chapters. A Part with zero published chapters
 * is omitted entirely — unpublished chapters are never listed individually
 * on the public book page (see file header, 2026-08-27 correction).
 */
export function getPublishedPartsWithChapters(book: Book): { part: BookPart; chapters: BookChapter[] }[] {
  return book.parts
    .map((part) => ({
      part,
      chapters: book.chapters.filter((c) => c.partId === part.partId && c.status === "published"),
    }))
    .filter((group) => group.chapters.length > 0);
}

/**
 * Previous/next PUBLISHED chapter relative to chapterId, walking the
 * current sequence and skipping any in-preparation chapters in between —
 * they have no live page to link to. Recalculated from `book.chapters`
 * every time, so it updates automatically if the sequence changes later.
 */
export function getAdjacentPublishedChapters(
  book: Book,
  chapterId: string
): { prev?: BookChapter; next?: BookChapter } {
  const idx = book.chapters.findIndex((c) => c.chapterId === chapterId);
  if (idx === -1) return {};

  let prev: BookChapter | undefined;
  for (let i = idx - 1; i >= 0; i--) {
    if (book.chapters[i].status === "published") {
      prev = book.chapters[i];
      break;
    }
  }
  let next: BookChapter | undefined;
  for (let i = idx + 1; i < book.chapters.length; i++) {
    if (book.chapters[i].status === "published") {
      next = book.chapters[i];
      break;
    }
  }
  return { prev, next };
}

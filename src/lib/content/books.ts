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

/**
 * A published chapter's body is a sequence of typed content blocks rather
 * than plain paragraphs, so its web page can reproduce the actual
 * hierarchy of the approved manuscript (headings, pull paragraphs,
 * illustrations with captions, the Q&A panel, the closing synthesis)
 * instead of flattening it to plain text. Every block type here maps
 * directly to a named style in PQNK_Book_Editorial_and_Typography_Style_Standard.docx —
 * see that document before adding a new block type, and add at most one,
 * matching its precision, rather than reaching for ad hoc formatting.
 */
export type ChapterInlineRun = { text: string; bold?: boolean };
export type ChapterQAItem = { q: string; a: string };
export type ChapterBlock =
  | { type: "openingQuote"; text: string }
  | { type: "attribution"; text: string }
  | { type: "heading"; text: string }
  | { type: "paragraph"; runs: ChapterInlineRun[] }
  | { type: "pullParagraph"; text: string }
  | { type: "imageGroup"; files: string[] }
  | { type: "caption"; text: string }
  | { type: "qaPanel"; heading: string; items: ChapterQAItem[] }
  | { type: "closingHeading"; text: string }
  | { type: "transition"; text: string };

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
  /** Full chapter content as an ordered sequence of typed blocks (see ChapterBlock). Present only once status is "published"; this is what the chapter page renders under "Read Chapter". */
  body?: ChapterBlock[];
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
  /**
   * The approved cover/title-page artwork, when one exists. Optional so a
   * book can be added to this array before its cover is ready — the
   * landing page and the book card both already handle its absence.
   * `width`/`height` are the actual pixel dimensions of `src`, used to
   * preserve its exact aspect ratio and avoid layout shift; update both if
   * the image is ever replaced.
   */
  coverImage?: {
    src: string; // path under /public
    alt: string;
    width: number;
    height: number;
  };
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
    subtitle: "Industrial Devastation To Natural Abundance",
    coverImage: {
      src: "/books/natural-ecosystem-science/cover.jpg",
      alt: "Cover of PQNK: The Natural Ecosystem Science of Production Agriculture — Industrial Devastation To Natural Abundance, showing a split landscape: an industrial field with a smokestack and bare, cracked soil on the left, and a thriving orchard with visible healthy root and mycorrhizal networks on the right. By Asif Sharif, Agricultural Researcher and PQNK Founder.",
      width: 700,
      height: 991,
    },
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
      {
        chapterId: "earths-original-design",
        partId: "part-one",
        title: "Earth's Original Design",
        status: "published",
        summary:
          "Why the four-hundred-million-year natural ecosystem, not the fertiliser bag, is where production agriculture should start: plants build themselves from air and water, the soil supplies a net 0.083%, and the biological machinery that makes minerals accessible, not their absence, is what modern agriculture has destroyed.",
        publishedDate: "2026-08-27",
        version: "1.0",
        pdfPath: "/books/natural-ecosystem-science/earths-original-design.pdf",
        body: [
  { type: "imageGroup", files: ["ch1-img-01.jpg", "ch1-img-02.jpg"] },
  { type: "caption", text: "Left: nature's original design. Every layer occupied, every niche filled, no bare soil, no chemical input. Right: the bare, exposed earth of conventional tillage. The same design, dismantled. This is the contrast PQNK restores." },
  { type: "openingQuote", text: "“For four hundred million years, the planet solved the problem of food. It solved it without a single bag of fertilizer, a litre of pesticide, or a moment of human intervention. We did not inherit a broken world. We broke it ourselves.”" },
  { type: "attribution", text: "Asif Sharif, Lahore, 2024" },
  { type: "paragraph", runs: [{ text: "Before the first human hand ever disturbed the ground, before the first seed was buried in soil to keep it safe from the birds and to draw moisture from the earth, before any civilisation rose and fell on the grain it could extract from the earth, the planet was already feeding every living thing upon it. It had been doing so, without interruption, for four hundred million years. Not adequately. Not just enough. In extraordinary abundance." }] },
  { type: "paragraph", runs: [{ text: "This is the fact that changes everything. It is also the fact that modern agricultural science, in more than a century of organized endeavour, has been most careful never to fully examine. To do so would be to ask an uncomfortable question: if nature solved the problem of food production so completely, and sustained that solution for a span of time so vast it resists human comprehension, then what exactly has agriculture been doing for the last ten thousand years? And what has it been doing, with far greater violence, for the last sixty?" }] },
  { type: "paragraph", runs: [{ text: "The answer, as this book will demonstrate, is that agriculture has not been improving upon nature" }, { text: "’" }, { text: "s design. It has been dismantling it. The fertilizers, the pesticides, the deep plowing, " }, { text: "the inversion, " }, { text: "the flood irrigation, these are not refinements of a natural process. They are substitutes for one that has been destroyed. We have been filling, at enormous cost and with diminishing returns, the biological void we created. We have mistaken the patch for the cure." }] },
  { type: "pullParagraph", text: "PQNK does not propose a new way of farming. It proposes a return to the only way that has ever actually worked, a way that was working, perfectly, for four hundred million years before we interfered." },
  { type: "paragraph", runs: [{ text: "This chapter is about understanding what that original system was. Not romantically, nature is not sentimental, and this book will not be. But precisely. The mechanisms that sustained life across four hundred million years of geological time are not mysteries. They are knowable. They have been decoded, slowly and painstakingly, through more than five decades of field observation and experiment. And once understood, they reveal with devastating clarity how wrong our present system is, and how available the correction is." }] },
  { type: "heading", text: "THE LIVING PLANET: A SYSTEM DESIGNED FOR ABUNDANCE" },
  { type: "paragraph", runs: [{ text: "The Earth was not assembled neutrally. Its crust, formed over billions of years of geological process, contains within it every mineral that any plant will ever require for growth, iron, phosphorus, potassium, calcium, magnesium, zinc, and dozens of trace elements. Not in one place, but everywhere. Distributed through every rock formation, every ancient seabed, every compressed stratum of geological time. The planet is a mineral bank of incomprehensible depth, and it was available to life long before any human farmer thought to add a handful of something to the soil." }] },
  { type: "paragraph", runs: [{ text: "What nature required, then, was not the minerals themselves, those were already present in staggering abundance. What it required was a mechanism for making them accessible. That mechanism, perfected over hundreds of millions of years of biological evolution, is the soil food web: the intricate, self-organising community of bacteria, fungi, protozoa, nematodes, earthworms, and ten thousand other organisms that inhabit every cubic centimetre of healthy ground." }] },
  { type: "paragraph", runs: [{ text: "At the centre of this web, performing a role so fundamental that calling it " }, { text: "“" }, { text: "important" }, { text: "” " }, { text: "is an understatement, are the mycorrhizal fungi. These are the first ecosystem engineers Earth ever produced. They emerged approximately four hundred and sixty million years ago, and the story of how they did so is also the story of how land life became possible at all." }] },
  { type: "heading", text: "ROCK TO DIRT TO SOIL TO LIFE: NATURE’S FOUR-STAGE ENGINE" },
  { type: "paragraph", runs: [{ text: "The process by which bare rock becomes living soil, and living soil sustains an entire biosphere, unfolds in four stages. Understanding these stages is not an academic exercise. It is the prerequisite for understanding PQNK, because PQNK is, at its heart, an attempt to faithfully replicate all four of them on a farm." }] },
  { type: "paragraph", runs: [{ text: "Stage One: Rock. ", bold: true }, { text: "The journey begins with solid stone. Mycorrhizal fungi, along with specialised bacteria called lithotrophs, secrete powerful enzymes and organic acids that attack the mineral surface of rock. Over time, geological time, measured in millennia rather than seasons, this biological weathering breaks rock down into mineral-rich particles. This is not erosion, which is a physical process and destroys structure. This is dissolution: a chemical and biological process that liberates the minerals locked inside the rock while preserving their availability. The stone becomes dirt." }] },
  { type: "paragraph", runs: [{ text: "Stage Two: Dirt. ", bold: true }, { text: "Mineral-rich dirt is not yet soil. It has the raw materials but not the architecture. What transforms dirt into soil is biological activity, specifically, the work of the microbial community that colonises it. Bacteria produce sticky polysaccharides that bind mineral particles into aggregates. Fungi produce glomalin, a glycoprotein that further cements these aggregates into stable structures. Earthworms pass the material through their digestive systems, creating perfectly structured castings. Over time, the once-inert mineral particles are organised into a complex, porous architecture that holds water like a sponge, exchanges gases like a lung, and teems with biological activity at every scale." }] },
  { type: "paragraph", runs: [{ text: "Stage Three: Soil. ", bold: true }, { text: "Living soil is the most complex ecosystem on Earth by volume. A single teaspoon of healthy soil contains more organisms than there are people on the planet. These organisms are not merely present; they are organised. They form what ecologists call a soil food web: a layered, interdependent community where every organism serves a function, every function serves the whole, and the whole serves the plants that grow in it. Bacteria fix atmospheric nitrogen, making it available to roots. Fungi form vast networks, mycorrhizal highways, that extend a plant" }, { text: "’" }, { text: "s effective root system by orders of magnitude. Protozoa graze on bacteria, releasing nutrients in plant-available form. Nematodes regulate bacterial populations, preventing any single organism from dominating and disrupting the balance. The system is self-regulating, self-renewing, and self-funding. It requires no external input whatsoever." }] },
  { type: "paragraph", runs: [{ text: "Stage Four: Life. ", bold: true }, { text: "Upon this living soil, plants establish themselves. But they do not simply take from the soil; they invest in it. Through their roots, plants exude sugars, amino acids, and complex organic compounds, a substantial portion of everything they produce through photosynthesis, sometimes as much as half. These exudates are the " }, { text: "‘" }, { text: "wages" }, { text: "’ " }, { text: "paid to the microbial community in exchange for nutrients. The plant communicates its specific nutritional needs through this chemical language, and the microbial community responds by mining and delivering the precise minerals required. It is a relationship of mutual dependence, evolved over hundreds of millions of years, and it works with a precision no agrochemical programme has ever matched." }] },
  { type: "pullParagraph", text: "A plant growing in a healthy soil ecosystem is not merely surviving. It is operating within the most sophisticated nutrient delivery system ever developed, one calibrated by four hundred million years of evolutionary refinement, and available, free of charge, in every acre of ground on Earth." },
  { type: "heading", text: "THE 0.083% PARADOX: PLANTS DO NOT EAT SOIL" },
  { type: "paragraph", runs: [{ text: "Here is the fact that demolishes the entire intellectual foundation of modern input-dependent agriculture, and the one that the industry that profits from it has worked hardest to obscure: plants do not eat soil. They eat air." }] },
  { type: "paragraph", runs: [{ text: "More than ninety-five percent of a plant" }, { text: "’" }, { text: "s physical mass, every leaf, every stem, every grain of wheat or kernel of corn, is constructed from carbon, hydrogen, and oxygen. " }, { text: "Four percent nitrogen also comes from the atmosphere through soil-living bacteria. " }, { text: "These elements are sourced not from the ground but from the atmosphere and from water, through the process of photosynthesis. The sun provides the energy. The air provides the carbon. The water provides the hydrogen. The soil provides, in net terms, approximately 0.083 percent of a plant" }, { text: "’" }, { text: "s total mass, the trace minerals that are essential to life but required only in quantities almost too small to measure." }] },
  { type: "paragraph", runs: [{ text: "The implications of this figure are staggering. Consider what it means for a wheat crop growing on one acre of ground. The topsoil beneath that acre, just the upper six inches, contains approximately eight hundred kilograms of phosphorus, fourteen thousand kilograms of potassium, and two thousand kilograms of nitrogen. The wheat crop growing above it will remove, from that geological reserve, approximately 4.4 kilograms of phosphorus, twelve kilograms of potassium, and forty kilograms of nitrogen per tonne of yield. The ratio of what the soil holds to what the crop withdraws is, for phosphorus, one hundred and eighty-two to one. For potassium, it is over one thousand to one." }] },
  { type: "paragraph", runs: [{ text: "And this is only the topsoil. Below it lies a virtually inexhaustible geological reserve: the subsoil, the weathered bedrock, and ultimately the planet" }, { text: "’" }, { text: "s crust, containing minerals in " }, { text: "quantities that would " }, { text: "never" }, { text: " exhaust. To be precise about this claim: the reserve in question is not the deep geological mantle accessed through volcanic or tectonic processes, those operate on timescales of millions of years and play no direct role in agricultural nutrition. What is meant by the geological reserve is the mineral matrix of the local soil profile itself: the rock particles, clay minerals, and mineral compounds distributed through every centimetre of soil down to the depth that roots can penetrate. Biological weathering, the secretion of organic acids and chelating compounds by mycorrhizal fungi and bacteria, dissolves minerals from these local particles through chemistry that happens in place. Gravity does tend to move soluble minerals downward through the profile; this is precisely why deep roots in a PQNK system, made possible by hardpan fracture, access what has concentrated at depth, while capillary rise driven by evapotranspiration moves dissolved materials upward. The biological system does not oppose gravity, it works intelligently with the full depth of the soil profile. For nitrogen specifically, the ultimate bank is the atmosphere itself, seventy-eight percent nitrogen gas, continuously fixed into plant-available form by nitrogen-fixing bacteria, free of charge, in every cubic centimetre of healthy soil." }] },
  { type: "paragraph", runs: [{ text: "Why, then, do farmers face nutrient deficiencies? Why do soils " }, { text: "‘" }, { text: "run out" }, { text: "’ " }, { text: "of nutrients? The answer is not that the minerals are absent. They are present, in overwhelming abundance. The answer is that the biological machinery required to access them, the mycorrhizal networks, the microbial assembly lines, the root exudate communication systems, has been destroyed. By tillage. By flooding. By pesticides. By the very practices that modern agriculture defines as " }, { text: "‘" }, { text: "farming" }, { text: "’" }, { text: "." }] },
  { type: "paragraph", runs: [{ text: "When a farmer applies synthetic nitrogen fertiliser to a field, he is not feeding his crop. He is bypassing, and thereby further destroying, the biological system that would have fed it naturally. The fertiliser disrupts the plant" }, { text: "’" }, { text: "s production of root exudates, effectively laying off the microbial workforce that the plant had previously employed. With each application, the soil" }, { text: "’" }, { text: "s biological capacity diminishes further. The farmer must apply more next season to achieve the same yield. The cycle deepens. The dependency becomes absolute. And the companies that sell the fertiliser grow more profitable with every passing year." }] },
  { type: "pullParagraph", text: "Nutrient deficiency in modern agriculture is not a shortage of minerals. It is a shutdown of the biological machinery that accesses them. The farmer who buys fertiliser is not solving a problem. He is paying for a problem that was created for him." },
  { type: "heading", text: "400 MILLION YEARS WITHOUT A SINGLE BAG OF FERTILISER" },
  { type: "paragraph", runs: [{ text: "It is worth pausing, at this point, to sit with the weight of the number four hundred million. Not as an abstraction, but as a duration. Four hundred million years ago, the first land plants were taking root on a barren continental surface. The dinosaurs would not appear for another hundred and seventy million years. The first humans would not walk the earth for another three hundred and ninety-eight million years after that. Throughout this entire span of biological time, through mass extinctions, ice ages, continental drift, and every climate variation the planet has experienced, the natural soil-plant ecosystem did not fail. It did not require intervention. It did not run out of nutrients. It sustained, and in fact grew in complexity and productivity, entirely through the operation of its own internal logic." }] },
  { type: "paragraph", runs: [{ text: "This is not a romantic notion. It is an empirical fact of the geological record. And it is the most powerful argument available for the position that PQNK takes: that the principles governing this four-hundred-million-year system are not obsolete, not superseded by modern science, and not applicable only to wild ecosystems. They are the principles of production agriculture. They are the only principles that have ever actually worked, at scale, sustainably, and without destroying the resource base they depend upon." }] },
  { type: "paragraph", runs: [{ text: "What changed, ten thousand years ago, was not the principles. What changed was the human relationship to them. And the change was born not from hunger, the planet was already solving hunger with extraordinary generosity, but from death." }] },
  { type: "paragraph", runs: [{ text: "Why that first seed was deliberately buried, and what it set in motion, is a fuller story than this opening chapter needs to tell. What matters here is only its direction: once soil could be opened for human convenience, the four-hundred-million-year system just described stopped being sustained and started being drawn down." }] },
  { type: "heading", text: "WATER, TEMPERATURE, AND THE SELF-REGULATING FARM" },
  { type: "paragraph", runs: [{ text: "The natural ecosystem did not merely solve the problem of nutrients. It solved, with equal elegance, the problems of water and temperature, the two other conditions upon which plant growth depends." }] },
  { type: "imageGroup", files: ["ch1-img-03.png"] },
  { type: "paragraph", runs: [{ text: "Water in the natural system does not fall from the sky and run away. It falls, is absorbed into the living sponge of healthy soil, and is stored there in a dynamic equilibrium between liquid, vapour, and solid. A healthy soil with intact structure can absorb and hold many times its own weight in water. Between rainfalls, this stored moisture is drawn upward by capillary action, the same physics that allows a paper towel to absorb a spill, continuously supplying the root zone with moisture even in dry periods. The system also harvests water" }, { text: " directly from the atmosphere: morning dew condenses on the mulch layer of leaf litter and organic matter, and the air" }, { text: "’" }, { text: "s own humidity is absorbed by the carbon-rich organic surface, supplementing rainfall in ways that conventional hydrology does not fully account for." }] },
  { type: "paragraph", runs: [{ text: "Temperature, in the natural system, is regulated by the forest floor: the layer of decomposing organic matter that blankets the soil surface. This layer acts as an insulator, preventing extreme heat from penetrating in summer and retaining warmth in winter. The mycorrhizal fungi and microbial communities that drive nutrient cycling operate within a specific temperature window, roughly thirteen to twenty-six degrees Celsius. The natural mulch layer maintains that window even when air temperatures swing far beyond it. The soil is not at the mercy of the weather. It moderates the weather" }, { text: "’" }, { text: "s effects." }] },
  { type: "paragraph", runs: [{ text: "In a PQNK field, thick organic mulch replicates the forest floor. Measurements from PQNK farms in Pakistan" }, { text: "’" }, { text: "s Punjab region, where summer air temperatures routinely exceed fifty degrees Celsius, show that mulch-covered soil maintains temperatures within the optimal biological window even on the hottest days. The soil surface beneath the mulch is thirty degrees cooler than an exposed conventional field beside it. That thirty-degree difference is not a detail. It is the difference between a living soil and a baked one." }] },
  { type: "heading", text: "THE IMMUNE SYSTEM THAT WAS ALWAYS THERE" },
  { type: "paragraph", runs: [{ text: "There is a third problem that the natural ecosystem solved, and that modern agriculture has spectacularly failed to solve in sixty years of trying: pest and disease control. The global pesticide market was worth approximately one hundred billion dollars in 2023. Farmers in Pakistan, India, and across the developing world spend between a quarter and a third of their total production costs on chemicals intended to protect their crops. Resistance to those chemicals grows steadily. The chemicals become stronger. The dosages increase. The costs rise. The pests remain." }] },
  { type: "paragraph", runs: [{ text: "In a natural ecosystem, this cycle does not exist. It cannot exist, because the conditions that create it, the crop vulnerability that makes chemical intervention seem necessary, are absent. Why?" }] },
  { type: "paragraph", runs: [{ text: "The answer lies, in part, in a soil bacterium called Bacillus thuringiensis, known universally as BT. Multiple species of BT bacteria inhabit healthy soil, and each produces proteins that are specifically toxic to the larvae of particular insect groups, caterpillars, bollworms, beetles, sucking insects, whitefly, mosquitoes. Each BT species targets a different set. Together, they constitute a comprehensive, species-specific, biological pest management system, one that is free, self-renewing, and leaves no toxic residue in the food produced." }] },
  { type: "paragraph", runs: [{ text: "The agricultural industry discovered BT bacteria in the 1950s and responded by attempting to commercialise them, first as spray-on biological pesticides, then, more lucratively, by inserting the BT gene into crop plants to produce " }, { text: "‘" }, { text: "BT cotton" }, { text: "’ " }, { text: "and " }, { text: "‘" }, { text: "BT corn" }, { text: "’" }, { text: ". Billions of dollars were made. What was never told to farmers, and what took a field researcher fifty years of patient observation to understand and document, is this: BT bacteria are already in the soil. They have always been there. They require no purchase, no application, and no genetic modification. They require only one thing: a living soil ecosystem in which to thrive. The same tillage, flooding, and chemical applications that destroy the nutrient-cycling biology also destroy the pest-protection biology. And then, into the biological void thus created, the industry sells a substitute." }] },
  { type: "paragraph", runs: [{ text: "Beyond BT bacteria, a healthy agricultural ecosystem supports a vast and diverse community of organisms that collectively regulate pest populations. Predatory insects and spiders, parasitoids, birds, reptiles, entomopathogenic fungi and bacteria, and many other organisms form interconnected biological control networks. PQNK therefore does not depend on an arbitrary number of " }, { text: "“" }, { text: "natural predators." }, { text: "” " }, { text: "Its strength lies in restoring the biodiversity, habitat and ecological relationships through which pest populations are naturally kept in balance. When the soil food web and the wider farm ecosystem remain intact, pest regulation becomes an ecosystem function rather than a chemical management operation." }] },
  { type: "imageGroup", files: ["ch1-img-04.png"] },
  { type: "caption", text: "PQNK cotton: no purchased inputs, the soil surface kept permanently covered with organic mulch." },
  { type: "imageGroup", files: ["ch1-img-05.png"] },
  { type: "pullParagraph", text: "Every pesticide ever sold was sold into a biological vacuum that did not exist in nature. The vacuum was created first. Then the product was sold to fill it." },
  { type: "heading", text: "ABUNDANCE AS THE DEFAULT STATE" },
  { type: "paragraph", runs: [{ text: "Everything described in this chapter, the geological mineral bank, the mycorrhizal delivery system, the microbial assembly line, the water management, the temperature regulation, the biological pest control, was operating, in full and perfect integration, across the entire land surface of this planet for four hundred million years. Not in special places. Not under exceptional conditions. Everywhere. In what we now call deserts, in what we now call the tropics, in the temperate zones, in the rain shadows of mountain ranges. Wherever life" }, { text: " could find a foothold, the system organised itself and began producing." }] },
  { type: "paragraph", runs: [{ text: "The default state of the natural world, in other words, is not scarcity. It is abundance. Scarcity, in the context of agriculture, is a human achievement. It has been produced, methodically and at enormous expense, by ten thousand years of practices that systematically dismantle the system that produces abundance. It has been deepened, catastrophically, by sixty years of industrial agriculture that dismantles that system faster than any previous technology in history." }] },
  { type: "paragraph", runs: [{ text: "There is a useful analogy for how this happened without most of the world noticing. " }, { text: "Imagine a frog placed " }, { text: "in a pot of water at room temperature. The heat is raised one degree at a time. The frog does not leap out. Each change is too small to register as danger. The frog adjusts continuously, drawing on its internal reserves to withstand the rising stress, adapting to each increment as it arrives. Only when the heat becomes unbearable does it attempt to escape, but by then, its energy is exhausted and it cannot. Humanity" }, { text: "’" }, { text: "s relationship with its agricultural soil followed exactly this pattern. Each season of tillage was slightly more destructive than the last, but not dramatically so. Each application of synthetic nitrogen displaced a little more of the mycorrhizal community, but the crop still grew. Each pesticide spray killed a few more predator species, but pests were still controlled, with more spray. Deep soil carbon buffered the nutritional losses for decades. Mineral abundance in the subsoil compensated for the depleted surface. The vast biological reserves that four hundred million years had accumulated absorbed the assault, season by season, year by year, generation by generation. The system signalled strain. But the signals were slow, and the adjustments were incremental, and the people most directly affected, the farmers, adapted to each new diminished baseline without recognising it as diminished. The water table fell a metre. Then another. The yield plateau arrived. Then the yield decline. The input cost rose. Then rose again. The buffers are now weakening. The central question is no longer whether something went wrong. It is how far the drift ha" }, { text: "s p" }, { text: "rogressed, and whether correction remains possible." }] },
  { type: "qaPanel", heading: "What the Living Soil System Tells Us", items: [{ q: "What separates soil from dirt?", a: "Dirt is mineral particles without biological community. Soil is the same particles organised and managed by billions of organisms per teaspoon. The difference is not chemical, it is biological." }, { q: "Why does Ancient Conventional Industrial Agriculture management reduce productive soil back toward dirt over time?", a: "Because tillage destroys the biological community that maintains soil structure, while synthetic fertiliser substitutes for what that community provides, creating a cycle where the farm needs more chemistry to compensate for the biology it has destroyed." }, { q: "Can degraded soil recover?", a: "Yes. The biological community is suppressed, not extinguished. When tillage stops, the surface is covered, and biological food is restored, the community re-establishes. Every PQNK farm demonstrates this every season." }] },
  { type: "paragraph", runs: [{ text: "This is not a counsel of despair. It is, in fact, the most hopeful thing that can be said about agriculture" }, { text: "’" }, { text: "s future. Because if scarcity is a product of what we have done, then abundance is recoverable by ceasing to do it, and by restoring, as precisely as we can, the conditions that allowed the four-hundred-million-year system to operate." }] },
  { type: "paragraph", runs: [{ text: "That restoration is what PQNK is. Not a philosophy. Not a movement. A precise, sequential, field-tested, farmer-validated protocol for returning a degraded piece of ground to biological function, and then standing back while it produces." }] },
  { type: "closingHeading", text: "WHAT THIS CHAPTER HAS ESTABLISHED" },
  { type: "paragraph", runs: [{ text: "Before we can properly understand what went wrong, and how comprehensively, and at whose benefit, we need the foundation this chapter has laid. It is this:" }] },
  { type: "paragraph", runs: [{ text: "The Earth possesses, in its geology, its biology, and its atmosphere, everything required to feed every living thing upon it indefinitely, without depletion, " }, { text: "without pollution, " }, { text: "without external input, and without cost. This is not a theoretical proposition. It is a proven fact of four hundred million years of uninterrupted biological operation." }] },
  { type: "paragraph", runs: [{ text: "The mechanisms that make this possible, the mycorrhizal networks, the microbial assembly lines, the soil food web, the organic mulch layer, the atmospheric nitrogen fixation, the BT bacterial immune system, are knowable, replicable, and available on any farm, anywhere in the world, at no cost beyond the cost of understanding them." }] },
  { type: "paragraph", runs: [{ text: "Modern agriculture has not improved upon these mechanisms. It has replaced them with purchased substitutes. It has done so in a way that degrades the original system further with each cycle, making the farmer more dependent on the substitutes, more indebted to their suppliers, and less capable of returning to the system that once sustained everything without his help." }] },
  { type: "imageGroup", files: ["ch1-img-07.png"] },
  { type: "paragraph", runs: [{ text: "The following chapters will trace how this happened: the decisions, the institutions, the incentives, and the blindnesses that led a species capable of extraordinary intelligence to spend more than a century and a half making the ground b" }, { text: "eneath its feet progressively less able to grow food. They will also show, in the precise and documented detail of fifty-three years of field research, how to stop." }] },
  { type: "transition", text: "Chapter Two: Rock, Dirt, Soil, Life, The Natural Soil Cycle in Detail" },
        ],
      },
      {
        chapterId: "rock-dirt-soil-life",
        partId: "part-one",
        title: "Rock, Dirt, Soil, Life",
        status: "published",
        summary:
          "How bare rock becomes living soil, and living soil becomes a plant that manufactures its own nutrition: the four-stage biological engine, rock to dirt to soil to life, that Ancient Conventional Industrial (ACI) agriculture dismantles at every stage, and that PQNK restores in sequence.",
        publishedDate: "2026-08-29",
        version: "1.0",
        pdfPath: "/books/natural-ecosystem-science/rock-dirt-soil-life.pdf",
        body: [
  { type: "openingQuote", text: "“The farmer who has never seen his soil alive does not know what farming is. He has only seen what farming has done to soil that was once alive.”" },
  { type: "attribution", text: "Asif Sharif, Lahore, 2017" },
  { type: "paragraph", runs: [{ text: "Pick up a handful of soil from a healthy, undisturbed field. Hold it. What you are holding is not dirt. It is not inert material. It is one of the most complex ecosystems on Earth, compressed into your palm. In that handful are more living organisms than there are people on the planet, bacteria, fungi, protozoa, nematodes, microarthropods, and thousands of other life forms, all interacting, all serving a function, all contributing to a system that has been producing food for four hundred million years without a single external input." }] },
  { type: "paragraph", runs: [{ text: "Now pick up a handful of soil from a typical conventionally farmed field that has been plowed and flooded and chemically treated for thirty years. The difference is not obvious to the eye. But hold both samples in your hands long enough, and you will begin to notice. The healthy soil is dark, slightly moist, crumbly, it holds together when compressed, but falls apart easily when released, like a rich cake. The degraded soil is pale, either bone dry or clumped into hard, dense lumps that resist breaking. It smells of little. It holds nothing." }] },
  { type: "imageGroup", files: ["ch2-img-01.png"] },
  { type: "paragraph", runs: [{ text: "Those two handfuls tell the story of this chapter. The distance between them, between living soil and biological ruin, is the distance that Ancient Conventional Industrial agriculture (ACI) " }, { text: "— " }, { text: "the trajectory that began with the domesticated, human-powered farming of some twelve thousand years ago, passed through the animal-draft-powered agriculture of most of recorded history, and arrived at today" }, { text: "’" }, { text: "s mechanised, industrial system " }, { text: "— " }, { text: "has traveled in more than a century and a half. And the journey back, which PQNK maps in precise and reproducible steps, begins with understanding exactly how the living system is built, because you cannot restore what you do not understand." }] },
  { type: "heading", text: "THE FOUR-STAGE JOURNEY: FROM ROCK TO LIFE" },
  { type: "paragraph", runs: [{ text: "The soil beneath any productive field did not arrive there ready-made. It was built, over geological time, through a sequence of biological processes so interlocked and interdependent that removing any one of them eventually unravels the whole. Understanding these four stages, rock, dirt, soil, and life, is not optional background knowledge for the PQNK farmer. It is the foundation upon which every practical decision in the PQNK system rests." }] },
  { type: "heading", text: "STAGE ONE: ROCK, THE GEOLOGICAL BANK" },
  { type: "paragraph", runs: [{ text: "Every mineral a plant will ever need is already present in the rock that underlies every field on Earth. Iron, phosphorus, potassium, calcium, magnesium, zinc, copper, manganese, boron, molybdenum, the entire periodic table of plant nutrition is locked within the mineral structure of geological formations laid down over billions of years. The soil is not a depleting resource that must be replenished from outside. It is a bank of almost incomprehensible depth, requiring only the right biological mechanisms to make withdrawals." }] },
  { type: "paragraph", runs: [{ text: "The organisms that make those withdrawals are among the oldest on Earth. Mycorrhizal fungi, the great ecosystem engineers, appeared approximately four hundred and sixty million years ago, around the same time that the first plants colonized land. This timing is not coincidental. The two arrived together because neither could succeed without the other. Plants needed minerals from rock; fungi needed carbon from photosynthesis. A partnership formed that has never been dissolved, and that still governs the fertility of every hectare of productive land on Earth, or should, where it has not been destroyed." }] },
  { type: "paragraph", runs: [{ text: "The mechanism of rock weathering is elegant in its simplicity. Mycorrhizal fungi, along with specialised lithotrophic bacteria, secrete organic acids and chelating compounds, molecular tools evolved specifically to attack mineral crystal structures. These secretions dissolve the bonds holding minerals within the rock matrix, liberating individual ions into the soil water around the fungal threads. The fungi then absorb these ions and transport them, through their hyphal networks, to the roots of the plants they are associated with. The rock becomes mineral-rich dirt. The fungi receive carbon sugars from the plant in exchange. The transaction has been occurring, without interruption, for nearly half a billion years." }] },
  { type: "paragraph", runs: [{ text: "The soil does not need fertiliser. It needs the biological machinery to access what is already there. Every field on Earth sits above a mineral bank containing thousands of times more nutrients than any crop will ever remove. The bank is not empty. The withdrawal mechanism has been broken." }] },
  { type: "paragraph", runs: [{ text: "To understand the scale of this geological bank, consider phosphorus, the nutrient most often cited as a reason for fertiliser application. The top six inches of one acre of average soil contains approximately eight hundred kilograms of phosphorus. A tonne of wheat removes approximately 4.4 kilograms. The ratio of bank reserves to annual withdrawal is one hundred and eighty-two to one. For potassium, the ratio exceeds one thousand to one. The minerals are not scarce. The biology that accesses them has been killed, and the industry that killed it sells the substitutes." }] },
  { type: "imageGroup", files: ["ch2-img-02.png"] },
  { type: "pullParagraph", text: "Soil already contains vast mineral reserves; the challenge is not scarcity, but biological access. PQNK restores the living processes that make these minerals available to plants." },
  { type: "heading", text: "STAGE TWO: DIRT, RAW MATERIAL WITHOUT ARCHITECTURE" },
  { type: "paragraph", runs: [{ text: "The distinction between dirt and soil is one of the most important concepts in this book, and one that conventional agriculture has effectively erased from farming practice. Dirt is the raw mineral material produced by geological weathering, particles of sand, silt, and clay, free of their parent rock but not yet organised into the living architecture of productive soil. Dirt can grow things, after a fashion, the way a hydroponic tank full of nutrient solution can grow things, by forcing the inputs from outside rather than generating them from within. But it cannot sustain itself. It has raw material but not intelligence." }] },
  { type: "paragraph", runs: [{ text: "The agricultural significance of this distinction is this: ACI farming, through decades of tillage, flooding, and chemical application, progressively destroys soil and converts it back toward dirt. The farmer is left with a substrate that has lost its biological architecture, its aggregate structure, its pore networks, its fungal threads, its microbial community, and must substitute for all of it with purchased inputs. Fertilisers substitute for microbial nutrient cycling. Irrigation substitutes for soil water retention. Pesticides substitute for biological pest control. The farmer has not lost fertility; he has lost the machinery of fertility, and is now running his farm on a combination of geological capital and chemical props." }] },
  { type: "paragraph", runs: [{ text: "Understanding what transforms dirt into soil, and therefore what must be restored to reverse ACI damage, requires understanding the role of three biological processes: aggregation, structuring, and the formation of the pore network." }] },
  { type: "paragraph", runs: [{ text: "Aggregation.", bold: true }, { text: " The first transformation of loose mineral particles into something more than dirt is performed by bacteria. Certain soil bacteria produce sticky polysaccharide compounds, essentially biological glues, that bind individual mineral particles into larger composite units called microaggregates. These microaggregates are more stable than individual particles; they do not disperse in water or compact under pressure as readily as loose minerals do. The formation of microaggregates is the first step in building soil architecture from raw mineral material." }] },
  { type: "paragraph", runs: [{ text: "Structuring.", bold: true }, { text: " Mycorrhizal fungi produce a glycoprotein called glomalin, one of the most important and least publicly discussed substances in agriculture. Glomalin is a sticky, water-resistant protein that coats soil particles and microaggregates, binding them into larger, more stable macroaggregates. These macroaggregates are the building blocks of soil structure, the crumbly, coherent texture of genuinely healthy soil. Glomalin is also carbon-rich; a soil high in glomalin is a soil high in stable organic carbon, which is the foundation of long-term fertility. Tillage destroys glomalin by shredding the fungal threads that produce it. A single pass of a plow can eliminate decades of glomalin accumulation." }] },
  { type: "imageGroup", files: ["ch2-img-03.png"] },
  { type: "paragraph", runs: [{ text: "Pore network formation.", bold: true }, { text: " Earthworms, the largest engineers of soil structure visible to the naked eye, consume mineral particles and organic matter together, processing them through a digestive system that produces castings of exceptional structure and fertility. Earthworm channels, some running several metres deep in undisturbed soil, create the macropores through which water moves rapidly downward during rainfall and through which oxygen exchanges with carbon dioxide in the soil atmosphere. Bacterial and fungal threads create the micropores between aggregates, which hold the film of water available to plant roots between rainfall events. Without this dual pore network, soil cannot simultaneously drain excess water and retain available water, the twin requirements that every crop needs." }] },
  { type: "heading", text: "STAGE THREE: SOIL, THE LIVING SYSTEM" },
  { type: "paragraph", runs: [{ text: "When aggregation, structuring, and pore-network formation are complete, something remarkable has happened: a complex, self-organising, self-renewing biological system has established itself. This is living soil, and it is categorically different from dirt in the same way that a living animal is categorically different from a collection of the chemicals it is made of. The components of living soil, minerals, water, air, and organisms, interact with one another in ways that produce capabilities none of the components possesses individually." }] },
  { type: "paragraph", runs: [{ text: "The soil food web, as ecologists call this community, is organised into layers of mutual dependency. At the base are the primary decomposers, bacteria and fungi that break down organic matter into simpler compounds and release minerals in plant-available form. Above them are the grazers, protozoa that consume bacteria and release excess nitrogen as they digest, making it available to plants in its most immediately usable form. Nematodes graze on both bacteria and fungi, regulating their populations and preventing any single organism from dominating and disrupting the ecological balance. Arthropods, beetles, and other macro-fauna fragment organic material into pieces small enough for bacteria to process, serving the community as pre-digesters. At the apex of the soil food web are the plant roots themselves, not passive recipients of whatever the soil provides, but active managers of the entire system." }] },
  { type: "paragraph", runs: [{ text: "The plant" }, { text: "’" }, { text: "s role as manager is exercised through root exudates: chemical compounds released continuously from root tips into the surrounding soil. These exudates are not waste products. They are signals, incentives, and raw materials. Simple sugars in the exudate provide energy to bacteria and fungi in the immediate root zone, stimulating their activity. More complex compounds, organic acids, amino acids, flavonoids, and secondary metabolites, serve as specific attractants or repellents, selectively recruiting the microbial community the plant needs at a particular moment. A plant deficient in phosphorus releases compounds that specifically attract and stimulate the phosphorus-solubilising bacteria and mycorrhizal fungi that can access more of it. A plant under pest attack releases compounds that attract predatory organisms. The plant does not wait passively for the soil to provide; it actively requisitions what it requires, and the soil food web responds." }] },
  { type: "pullParagraph", text: "The plant is not a passive occupant of the soil. It is the system’s chief executive, continuously managing a workforce of trillions through a chemical language so precise that no agrochemist has ever come close to replicating it." },
  { type: "paragraph", runs: [{ text: "The scale of this underground enterprise is staggering. A single teaspoon of living soil contains between one hundred million and one billion bacteria, representing thousands of species " }, { text: "— " }, { text: "and that is before the fungi, protozoa, and nematodes sharing the same teaspoon are added in. Combined, they add up to more organisms than there are people on Earth. It contains several metres of fungal threads, many belonging to the mycorrhizal networks that extend across entire fields, connecting individual plants in a common nutrient-sharing infrastructure. The mycorrhizal network of a mature ecosystem has been compared to the internet, a distributed, redundant, self-repairing communication and resource-transfer system. Like the internet, it does not have a central point of failure; damage to one part is routed around by the others." }] },
  { type: "heading", text: "THE MYCORRHIZAL NETWORK: NATURE’S INTERNET" },
  { type: "paragraph", runs: [{ text: "Of all the organisms in the soil food web, mycorrhizal fungi deserve particular attention, because they are simultaneously the most important and the most vulnerable to the practices of ACI. Understanding what they do, and what their loss means, is the key to understanding why conventional farming produces the results it does, and why PQNK produces different ones." }] },
  { type: "paragraph", runs: [{ text: "The word " }, { text: "‘" }, { text: "mycorrhiza" }, { text: "’ " }, { text: "means " }, { text: "‘" }, { text: "fungus-root" }, { text: "’" }, { text: ", a composite term for the symbiotic union between a fungal organism and a plant root. In this union, the fungus extends the plant" }, { text: "’" }, { text: "s effective root system by orders of magnitude. A plant root is a relatively coarse structure, able to absorb water and minerals from the soil it physically contacts. Fungal hyphae, the threads of the mycorrhizal network, are many times thinner than the finest root hair. They penetrate spaces in the soil matrix that roots can never reach. They access mineral surfaces that roots can never contact. And because they are connected to the plant, everything they absorb becomes available to it." }] },
  { type: "paragraph", runs: [{ text: "The reach of a single mycorrhizal network is remarkable. Studies of undisturbed forest soils have documented fungal networks spanning hundreds of metres, connecting individual trees of different species in a common biological infrastructure. Carbon produced by a tree in sunlight has been traced, through the fungal network, to the roots of a neighbouring tree in shade, effectively subsidising its survival. Phosphorus mined from deep subsoil has been traced upward through the network to surface roots of plants whose own root systems cannot reach that depth. The network does not merely connect; it redistributes, equalises, and stabilises. It is, in the truest sense, a commons, a shared resource infrastructure that benefits all participants." }] },
  { type: "paragraph", runs: [{ text: "In exchange for these services, the plant pays in carbon. Between twenty and thirty percent of the total carbon a plant fixes through photosynthesis is directed to mycorrhizal fungi through root exudates. This is a substantial biological investment, one that the plant makes willingly because the returns are so superior to what the plant could achieve alone. The partnership is so ancient and so mutually beneficial that the vast majority of terrestrial plant species, an estimated ninety percent, form mycorrhizal associations. The ten percent that do not, notably, the brassicas and sedges, are the exceptions that prove the rule." }] },
  { type: "paragraph", runs: [{ text: "Now consider what a single pass of a plow does to this network. The fungal threads are severed. The connections are broken. The network, the result of years or decades of patient biological construction, is shredded in an afternoon. The plant, deprived of its extended root system, is suddenly confined to what it can reach alone. Its access to deep minerals is cut off. Its ability to communicate nutritional needs to a responsive microbial community is severed. It is, in effect, placed in isolation. And then the farmer applies fertiliser to compensate for the nutritional deficit he has just created." }] },
  { type: "imageGroup", files: ["ch2-img-04.png"] },
  { type: "pullParagraph", text: "Tillage severs the mycorrhizal network, the biological infrastructure that took years to build and that the plant depends on for nutrition, communication, and protection. The farmer then buys fertiliser to replace, imperfectly and at considerable cost, what was free." },
  { type: "heading", text: "STAGE FOUR: LIFE, THE PLANT AS ALCHEMIST" },
  { type: "imageGroup", files: ["ch2-img-05.png"] },
  { type: "paragraph", runs: [{ text: "The fourth stage of the soil cycle is the one most visible to the farmer: the plant itself. But" }, { text: " in the PQNK understanding, the plant is not what most farmers have been taught to think it is. It is not a passive consumer of soil inputs, to be stimulated with fertiliser and protected with pesticide. It is an alchemist: an organism of extraordinary sophistication that transforms raw geological minerals, atmospheric carbon, sunlight, and water into the most complex nutritional compounds that biology has ever produced." }] },
  { type: "paragraph", runs: [{ text: "The plant fulfils this alchemical role through a set of physiological systems of remarkable precision. Begin with photosynthesis, not as a school biology abstraction but as a living industrial process. In the chloroplasts of every leaf, the light-dependent reactions capture solar energy and use it to split water molecules, liberating oxygen and producing the chemical energy currency, ATP and NADPH, that drives everything else. The light-independent reactions then use that currency to fix atmospheric carbon dioxide molecule by molecule through the Calvin cycle, assembling the simple sugar molecules that are the carbon skeleton from which every organic compound the plant will ever produce is built. A single well-nourished wheat plant conducting photosynthesis at full capacity on a clear day is processing carbon at a rate, and with an energy efficiency, that no chemical factory on Earth can replicate." }] },
  { type: "paragraph", runs: [{ text: "The raw minerals, delivered from the geological reserve via the mycorrhizal network, are absorbed through the root surface by highly specific protein transporter molecules embedded in the root cell membranes. Each mineral element has its own transporter, and many of these transport processes are active: they consume ATP because they must move ions against concentration gradients. This is why a plant growing in a living soil, where mycorrhizal fungi pre-process and deliver minerals in the precise ionic forms that the transporters are designed to accept, absorbs nutrients with dramatically greater efficiency than a plant growing in chemically fertilised soil, where soluble compounds flood the root zone in forms that may overwhelm the transporter system and bypass the biological control mechanisms entirely." }] },
  { type: "paragraph", runs: [{ text: "Once inside the plant, water and dissolved minerals move upward through the xylem, drawn by the negative pressure created at the leaf surface by transpiration, a pulling force so precisely calibrated that it lifts water to the tops of trees sixty metres tall without a single mechanical pump. Sugars and synthesised compounds travel through the phloem in both directions, distributed to growing tissues, storage organs, and developing seeds, and critically, back down to the root zone. Up to thirty percent of all the photosynthate a healthy plant produces is released through its roots as exudates: sugars, amino acids, and organic acids specifically formulated to recruit, feed, and communicate with the microbial community in the rhizosphere. This is not leakage. It is deliberate investment, the plant paying its biological partners in real time for the services they provide." }] },
  { type: "paragraph", runs: [{ text: "It is within these physiological systems, the chloroplast, the transporter membrane, the vascular architecture, the rhizosphere communication channel, that the transformation actually occurs. The plant does not passively receive inputs and produce outputs. It operates an integrated biological manufacturing system whose output is precisely calibrated to the quality of its mineral nutrition, the integrity of its mycorrhizal partnerships, and the freedom of its metabolic signalling pathways from chemical disruption. We must respect this plant intelligence by not disturbing it, and by creating an environment conducive to its full efficiency." }] },
  { type: "paragraph", runs: [{ text: "The chemistry of what happens inside a healthy plant growing in living soil is, by any measure, astonishing. The simple minerals delivered by the mycorrhizal network and microbial assembly line are incorporated into proteins of almost unimaginable complexity. Carbon from the air is fixed through photosynthesis and assembled into carbohydrates, lipids, vitamins, and thousands of secondary metabolites, compounds produced not for the plant" }, { text: "’" }, { text: "s own nutrition, but for defence, signalling, and ecological interaction. Flavonoids, polyphenols, terpenes, alkaloids, glucosinolates, these are the compounds that give food its flavour, its colour, its medicinal properties, and its nutritional power. They are also the compounds that are measurably depleted in food grown by ACI methods, because they require a living soil ecosystem to produce." }] },
  { type: "paragraph", runs: [{ text: "The reason for this depletion is now well understood in plant science, even if it has not penetrated agricultural practice. Many secondary metabolites are produced by plants as responses to stress, specifically, the mild, managed stresses of competition, predator pressure, and environmental variation that a plant in a living ecosystem continuously experiences. A plant that has been force-fed synthetic nitrogen and shielded from all pest pressure by chemical intervention has no biological reason to produce many of these compounds. It puts its energy into rapid vegetative growth, producing large, water-filled cells that look productive but are nutritionally hollow. The result is the food we have learned to accept as normal: big, uniform, visually appealing, and measurably less nutritious than what grew in the same fields sixty years ago." }] },
  { type: "imageGroup", files: ["ch2-img-06.png"] },
  { type: "paragraph", runs: [{ text: "PQNK restores the conditions under which the plant performs its full alchemical function. With mycorrhizal nutrition delivered precisely and in balance, with mild biological stresses from a diverse soil ecosystem, with no chemical disruption to its metabolic signalling, the plant produces the full spectrum of compounds it is genetically capable of. The food that results is not merely " }, { text: "‘" }, { text: "organic" }, { text: "’ " }, { text: "in the sense of being produced without synthetic chemicals. It is nutritionally superior in composition, denser in minerals, richer in secondary metabolites, more complex in flavour, and more stable in storage. PQNK produce does not merely meet organic standards. It surpasses them on every measurable axis." }] },
  { type: "heading", text: "WHAT ACI DOES TO EACH STAGE" },
  { type: "imageGroup", files: ["ch2-img-07.png"] },
  { type: "paragraph", runs: [{ text: "Now that the four stages of the natural soil cycle are clear, it is possible to be precise about what ACI does to each of them, and therefore precise about why the PQNK transition follows the sequence it does. Every step in the PQNK protocol is a direct response to a specific form of ACI damage." }] },
  { type: "paragraph", runs: [{ text: "To the geological bank (Rock stage): ", bold: true }, { text: "ACI does not damage the geological mineral reserve directly, it is too vast to deplete through farming. What ACI damages is access to it. By destroying the mycorrhizal networks and lithotrophic bacteria that weather and transport minerals from the geological reserve, ACI cuts the supply line. The minerals are still there, in exactly the quantities they have always been. The farmer simply cannot reach them without the biological machinery that was his original access mechanism." }] },
  { type: "paragraph", runs: [{ text: "To dirt-to-soil transformation: ", bold: true }, { text: "Tillage physically destroys the aggregate structure that soil organisms spend years building. A single tillage pass shatters macroaggregates into individual particles, severs fungal threads, kills earthworms, and exposes previously protected organic matter to oxidation. The soil is reset toward dirt. Flood irrigation then compounds this damage by dispersing the remaining aggregates through hydraulic pressure, the force of water hitting unprotected soil particles destroys structure from above while waterlogging destroys aerobic biology below. After decades of this cycle, many conventional fields have effectively no aggregate structure at all, they are, in biological terms, dirt." }] },
  { type: "paragraph", runs: [{ text: "To living soil: ", bold: true }, { text: "The application of synthetic fertilisers disrupts the chemical signalling between plant roots and the soil food web. When soluble nutrients are supplied directly, the plant no longer needs to produce the root exudates that recruit and reward its microbial partners. The microbial community, deprived of its carbon food source, declines. Pesticides and herbicides kill non-target soil organisms directly. Flood irrigation creates anaerobic conditions that kill the aerobic organisms responsible for nutrient cycling. What begins as a living system, the most complex ecosystem on Earth per unit volume, is progressively simplified toward a biological desert." }] },
  { type: "paragraph", runs: [{ text: "To the plant (Life stage): ", bold: true }, { text: "A plant growing in biologically impoverished soil is not performing its full alchemical function. Deprived of mycorrhizal delivery of balanced minerals, it receives instead whatever soluble compounds happen to be present in its immediate root zone, primarily the nitrogen, phosphorus, and potassium of the NPK fertiliser, in isolation from the complex mineral balance that living soil provides. The result is rapid vegetative growth driven by nitrogen, but nutritionally unbalanced and structurally weak. The plant" }, { text: "’" }, { text: "s immune system" }, { text: ", its production of secondary metabolites and its relationship with protective soil bacteria like BT, is compromised. It becomes exactly what the pesticide industry requires it to be: a vulnerable crop in need of constant chemical protection." }] },
  { type: "heading", text: "THE CLOSED LOOP: WHY NATURAL SYSTEMS NEVER RUN OUT" },
  { type: "paragraph", runs: [{ text: "There is one more principle of the natural soil cycle that must be understood before the PQNK protocol makes complete sense: the principle of the closed loop. In a natural ecosystem, nothing is wasted and nothing is permanently removed. Every organism that dies becomes food for decomposers. Every leaf that falls becomes organic matter for the soil food web. Every root that decays becomes a channel, a food source, and eventually a contribution to stable soil carbon. The system runs on what it produces, indefinitely, without depletion, without input, and without waste. There is an important precision to add here. The organic matter that accumulates and returns to the surface plays a specific and critical role: it maintains the moisture, temperature, and microbial habitat conditions under which biological weathering of the local mineral matrix operates. If the organic layer degrades, if the loop is broken, the microbial community degrades with it, and access to the mineral reserve is interrupted. The closed loop is not merely about recycling minerals in a simple circuit; it is about maintaining the living infrastructure through which the local geology is made continuously available to plants. This is why the return of organic matter to the soil is not optional in PQNK. It is the mechanism that keeps the biological key in the lock." }] },
  { type: "paragraph", runs: [{ text: "ACI systematically opens this loop. Grain is harvested and removed from the field, taking its minerals with it. Straw is burned, releasing its carbon into the atmosphere rather than returning it to the soil. Roots are plowed up and oxidised rather than left to decompose in place. The soil receives nothing back from what it gave. Every harvest is a net withdrawal from a bank that receives no deposits. The deficits must then be covered by external inputs, a dependence that deepens with every season, as the soil" }, { text: "’" }, { text: "s own biological capacity to generate fertility declines." }] },
  { type: "paragraph", runs: [{ text: "PQNK closes the loop again. Crop residues stay on the field as mulch. Roots are never removed. Cover crops are terminated in place. Every harvest removes only what is intended for consumption; everything else remains in the system. Over successive seasons, the soil" }, { text: "’" }, { text: "s biological capital grows rather than declines. The amount of biological activity increases. The depth of the active root zone extends. The water-holding capacity improves. The pest and disease resilience strengthens. The farm becomes more productive without becoming more expensive, a trajectory that ACI has never achieved and can never achieve, because its structural logic runs in the opposite direction." }] },
  { type: "pullParagraph", text: "In a PQNK farm, every season leaves the soil richer than the one before. In an ACI farm, every season leaves it poorer. This single difference, in the direction of biological change over time, is the difference between a farming system that can last forever and one that cannot." },
  { type: "heading", text: "READING SOIL HEALTH: WHAT THE PQNK FARMER OBSERVES" },
  { type: "paragraph", runs: [{ text: "Theory becomes practice when the farmer can look at a field and read its biological condition. The PQNK system teaches farmers to use the land itself as its own diagnostic instrument. The following observations, all immediately accessible without laboratory equipment, are among the most reliable indicators of where a field sits on the journey from ACI degradation to PQNK restoration." }] },
  { type: "paragraph", runs: [{ text: "Water infiltration rate.", bold: true }, { text: " Pour a bucket of water onto the soil surface. In a healthy PQNK field, the water disappears rapidly, absorbed into the sponge-like aggregate structure and pulled downward through root channels and earthworm burrows. In a compacted ACI field, the water pools, sits on the surface, and eventually runs off or evaporates. This simple observation reveals more about soil health than most laboratory analyses." }] },
  { type: "paragraph", runs: [{ text: "Soil colour and smell.", bold: true }, { text: " Healthy, biologically active soil is dark, often nearly black in its richest zones, because of its high organic matter content. It smells of petrichor, the distinctive earthy fragrance produced by actinomycetes bacteria: a smell universally described as pleasant and associated with rain on dry ground. Degraded soil is pale, often with a greyish or yellowish cast, and smells of little or nothing. Waterlogged, anaerobic soil smells sulphurous or fetid, the odour of the wrong kind of biological activity." }] },
  { type: "imageGroup", files: ["ch2-img-08.jpg"] },
  { type: "caption", text: "A PQNK wheat crop, pulled from the field by farmers in Maharashtra, India: roots reaching deep, coated in living soil, the rhizosphere visibly intact." },
  { type: "paragraph", runs: [{ text: "Earthworm presence.", bold: true }, { text: " Dig a spade of soil and count the earthworms visible in it. A healthy soil will contain ten to thirty earthworms per spade. A degraded conventional field may contain none. Earthworms are highly vulnerable to tillage, flooding, and pesticide application, and in the most degraded fields, populations are eliminated entirely." }] },
  { type: "paragraph", runs: [{ text: "Soil aggregate stability.", bold: true }, { text: " Take a small clod of moist soil and drop it gently into a glass of water. A soil with good aggregate structure will hold together or break slowly into stable crumbs. A soil with poor structure will immediately disperse into a cloud of individual particles that settle as a fine silt at the bottom of the glass. This dispersal is called slaking, and it is directly correlated with susceptibility to surface crusting, erosion, and waterlogging." }] },
  { type: "paragraph", runs: [{ text: "Root architecture.", bold: true }, { text: " Pull up a plant from a PQNK field and examine its roots. In a biologically healthy soil with no hardpan restriction, roots grow deeply, branch extensively, and carry a visible coating of soil particles, the rhizosphere, the zone of intense biological activity that immediately surrounds root surfaces. In a compacted field, roots are shallow, thick, and blunt, they have hit the hardpan and turned sideways or stopped. The shape of a root system tells the precise history of the soil it grew in." }] },
  { type: "closingHeading", text: "WHAT THIS CHAPTER HAS ESTABLISHED" },
  { type: "paragraph", runs: [{ text: "Chapter One established that the natural system was in permanent operation for four hundred million years, and that modern agriculture has been systematically dismantling it. This chapter has explained, in biological and mechanistic detail, how that system actually works, and therefore what precisely must be restored." }] },
  { type: "imageGroup", files: ["ch2-img-09.png"] },
  { type: "imageGroup", files: ["ch2-img-10.png"] },
  { type: "paragraph", runs: [{ text: "The soil is not an inert substrate. It is a living system of four interdependent stages: a geological mineral bank of overwhelming abundance; a biological transformation process that converts raw minerals into structured, productive soil; a self-organising food web of almost incomprehensible complexity that manages nutrient delivery, water retention, pest control, and climate regulation simultaneously; and a plant that serves as alchemist and chief executive, transforming the soil" }, { text: "’" }, { text: "s outputs into the most nutritionally complex food that biology can pro" }, { text: "duce." }] },
  { type: "paragraph", runs: [{ text: "ACI damages every one of these stages: it cuts access to the geological bank by destroying the biological machinery that mines it; it destroys aggregate structure through tillage and flooding; it kills the soil food web through chemical application and anaerobic conditions; and it deprives the plant of the biological ecosystem it needs to perform its full function." }] },
  { type: "paragraph", runs: [{ text: "PQNK restores all four stages, in a specific sequence, using a precise protocol that initiates biological recovery within a single growing season. That protocol begins where the damage is most fundamental: with the physical structure of the soil itself. The next chapter examines the geological bank in detail, the evidence that makes the case for perpetual abundance more rigorously, and more devastatingly for the fertiliser industry, than any previous analysis has done." }] },
  { type: "transition", text: "Chapter Three: The 0.083% Paradox, Plants Eat Air, Not Soil" },
        ],
      },
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

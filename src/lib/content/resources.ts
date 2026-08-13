export interface RelatedLink {
  label: string;
  href: string;
}

export interface Resource {
  slug: string;
  title: string;
  /** One-time transition correction vs. a practice repeated every production cycle. This distinction is the whole point of the page. */
  category: "one-time" | "permanent";
  oneSentenceDefinition: string;
  /** Short paragraph for the overview page card — full depth lives on the individual page. */
  overviewBlurb: string;
  /** The biological/agronomic problem this technique addresses. */
  whyItExists: string[];
  /** What PQNK actually does. */
  pqnkTechnique: string[];
  /** Explicit one-time-vs-permanent statement — required so a reader never mistakes a transition correction for a routine practice. */
  oneTimeOrPermanent: string;
  /** The fixed biological principle this technique implements. */
  universalPrinciple: string;
  /** What legitimately varies by field, climate, crop or equipment. */
  localImplementation?: string[];
  relatedMachinery?: RelatedLink[];
  furtherReading?: RelatedLink[];
}

export const resources: Resource[] = [
  {
    slug: "breaking-the-hardpan",
    title: "Breaking the Hardpan",
    category: "one-time",
    oneSentenceDefinition:
      "A one-time transition operation that reopens the compacted layer beneath the topsoil, restoring the vertical connectivity between surface and subsoil that decades of tillage sealed off.",
    overviewBlurb: "The one-time foundation step behind every PQNK conversion, from wheat to bamboo.",
    whyItExists: [
      "Decades of tillage and machinery traffic compact a layer beneath the surface known as the hardpan. It blocks deep water infiltration, air exchange and root penetration, forcing crops into shallow, stressed root systems no matter what is added on top.",
    ],
    pqnkTechnique: [
      "In PQNK, a subsoiler is used to shatter this compacted layer without inverting the soil. Hardpan depth varies by field, tillage history, tractor weight and number of passes, so a pit is dug to check where it actually sits before setting the subsoiler's depth; a working depth of up to 24 inches is commonly used as a safety margin to make sure the hardpan is reached even where its exact depth is uncertain.",
      "Once the hardpan is broken, roots (and later, the Jantar cover crop's taproots) can reach 4 to 12 feet deep depending on the crop, unlocking subsoil moisture and minerals that shallow-rooted, conventionally managed plants never access.",
    ],
    oneTimeOrPermanent:
      "This is done once, before the first planting on a given plot, and not repeated season after season. Once the profile is open and the field is managed to preserve that connectivity, roots and soil biology take over the job of maintaining it — repeating the operation unnecessarily would undo the very structure it was meant to restore.",
    universalPrinciple:
      "No soil disturbance is the universal principle. Breaking the hardpan is the one-time corrective step that removes inherited physical damage so that principle can hold going forward — it corrects the past, it does not repeat into the future.",
    localImplementation: [
      "Whether hardpan-breaking is needed at all, and to what depth, depends on the field's own tillage history, tractor weight and number of previous passes — not a fixed depth applied everywhere.",
    ],
    relatedMachinery: [{ label: "The Hardpan Breaker", href: "/machines/hardpan-breaker" }],
    furtherReading: [
      {
        label: "PQNK: The Wholesale Four-Step System to Reconnect the Water Cycle and End Water Scarcity",
        href: "/papers/the-wholesale-four-step-system-to-end-water-scarcity",
      },
    ],
  },
  {
    slug: "soil-chemistry-correction",
    title: "Correcting Soil Chemistry with Water and Acid",
    category: "one-time",
    oneSentenceDefinition:
      "A one-time correction for fields with high pH and accumulated salts, using deep leaching and, where needed, a documented acid protocol — not a routine fertility input.",
    overviewBlurb: "A one-time protocol for unlocking minerals in high-pH, salt-affected fields, without imported gypsum.",
    whyItExists: [
      "Many fields farmed conventionally for decades carry soil pH above 8, locking up essential minerals like iron, zinc and phosphorus, and creating conditions that favor parasitic weeds and disease. This applies specifically to fields carrying that chemical legacy, not to soil in general.",
    ],
    pqnkTechnique: [
      "PQNK does not permit imported gypsum or synthetic amendments. Instead, a deep leaching irrigation is applied first, to dissolve and push down salts accumulated from previous farming cycles.",
      "Where pH remains above 8 after leaching, a one-time application of roughly 8 kg of sulfuric acid per acre is added with the irrigation water. It is a permitted, one-time correction tool that rapidly lowers pH, liberates locked nutrients, and creates conditions hostile to parasitic weeds but favorable to the crop.",
    ],
    oneTimeOrPermanent:
      "This applies only where soil chemistry is actually degraded — fields that don't carry high pH or salt legacy don't require it at all. Where it is required, it is applied once; the field is not treated again afterward.",
    universalPrinciple:
      "The universal requirement is a biologically functional root zone free of chemical lockout. Where that condition already exists, no correction is needed; where it doesn't, this one-time protocol is how PQNK restores it without importing conventional amendments.",
    localImplementation: [
      "The pH threshold (above 8) and the acid quantity are specific to the high-pH, salt-affected conditions this protocol was documented against — not a prescription for every soil everywhere.",
    ],
  },
  {
    slug: "permanent-raised-beds",
    title: "The PQNK Raised Bed System",
    category: "one-time",
    oneSentenceDefinition:
      "A fixed bed-and-furrow geometry, shaped once, that ends repeated soil compaction for the life of the field.",
    overviewBlurb: "A fixed bed-and-furrow geometry that ends repeated soil compaction for good.",
    whyItExists: [
      "Conventional ridging is rebuilt every season: the same ground is repeatedly reshaped and run over by machinery. A growing zone that never stabilizes can't build the permanent soil structure a living ecosystem depends on.",
    ],
    pqnkTechnique: [
      "After the hardpan is broken and soil chemistry corrected where needed, PQNK farms build permanent raised beds, with furrows matched to standard tractor wheel spacing so that wheels always run in the furrows and never on the growing bed.",
      "Because the beds are permanent, the growing zone is never compacted again by machinery traffic. Crop after crop is planted on the same beds, season after season, without reshaping the soil.",
    ],
    oneTimeOrPermanent:
      "Shaping the bed is a one-time operation, typically completed in hours; the architecture it establishes then serves the field permanently, corrected only occasionally through routine maintenance, never rebuilt from scratch each season.",
    universalPrinciple:
      "No soil disturbance and controlled traffic separation are the universal requirements: a fixed, uncompacted growing zone kept apart from a dedicated traffic lane.",
    localImplementation: [
      "Typical PQNK beds run 42 inches wide with 18-inch furrows, but bed and furrow dimensions are engineered around the specific tractor's wheel-track geometry, crop spacing needs and farm scale — one dimension set is not biologically mandatory everywhere.",
    ],
    relatedMachinery: [
      { label: "The Raised Bed Shaper", href: "/machines/raised-bed-shaper" },
      { label: "The Mulcher & Bed Renovator", href: "/machines/mulcher-bed-renovator" },
    ],
  },
  {
    slug: "jantar-cover-cropping",
    title: "Jantar (Sesbania) Cover Cropping",
    category: "one-time",
    oneSentenceDefinition:
      "The living, closed-loop fertility step, grown once during establishment, that replaces every bag of imported fertilizer.",
    overviewBlurb: "The living, closed-loop fertility step that replaces every bag of imported fertilizer.",
    whyItExists: [
      "A newly corrected field has broken physical structure but not yet living biology. Hardpan and soil chemistry can be corrected mechanically, but fertility and soil life have to be built, not imported.",
    ],
    pqnkTechnique: [
      "Once permanent beds are formed, PQNK farms sow Jantar (Sesbania aculeata or S. bispinosa) at high density before planting the cash crop, and let it grow for 60–90 days.",
      "Jantar's powerful taproots continue the work the subsoiler started, biologically fracturing the subsoil, pulling up leached minerals from deep layers, and creating vertical channels that the next crop's roots will follow.",
      "This is a closed-loop fertility-building step: no external manure or fertilizer is brought onto the field. Once Jantar reaches maturity, it is terminated at ground level, its roots left to decompose and feed soil microbes, its above-ground biomass chopped and laid as mulch on the very same bed.",
    ],
    oneTimeOrPermanent:
      "Jantar is grown once, during the establishment of a new field, ahead of the first cash crop. It is not regrown between every subsequent crop cycle — from there, the permanent mulch-and-no-till loop takes over.",
    universalPrinciple:
      "The universal requirement is permanent biological cover, biodiversity and root activity building the soil from within — not any one specific plant. Jantar is the cover crop PQNK has documented and established for this transition step in the growing environments where it has been used.",
    localImplementation: [
      "In ecological regions where Jantar itself is not suitable, a locally appropriate deep-rooting, biomass-producing cover species fulfilling the same biological function would take its place. This project's material does not document specific alternative species for other climates, so none are proposed here without that evidence.",
    ],
  },
  {
    slug: "mulch-and-no-till",
    title: "Mulch and No-Till Planting",
    category: "permanent",
    oneSentenceDefinition:
      "The permanent production loop PQNK repeats every cycle: retain roots, return biomass as surface mulch, and plant directly through it without disturbing the bed.",
    overviewBlurb: "The core PQNK loop: retain, mulch, and plant directly, never disturbing the soil again.",
    whyItExists: [
      "Conventional agriculture treats crop residue as waste to be removed or burned, and re-tills the seedbed every season — both of which strip away the biological cover and structure a living soil depends on.",
    ],
    pqnkTechnique: [
      "With Jantar's biomass (or the prior crop's own residue, once the system is established) laid down as a 4–6 inch mulch layer, the cash crop is planted directly through it using a no-till planter or manual dibbling, never by ploughing the bed again.",
      "The mulch layer suppresses weeds, conserves moisture, moderates soil temperature against both heat and frost, and continues feeding soil biology as it decomposes.",
    ],
    oneTimeOrPermanent:
      "This is the permanent production loop, not a transition step: grow, harvest or terminate at the surface, retain roots in the soil, return above-ground biomass as mulch, and plant the next crop directly through that cover without disturbing the bed beneath it. It repeats every cycle, indefinitely, once the transition is complete.",
    universalPrinciple:
      "Permanent biological cover and no soil disturbance are the universal requirements. Surface mulch is retained, never incorporated by tillage, and residue is never routinely removed or burned.",
    localImplementation: [
      "Mulch thickness and the specific biomass source vary by what the field's own cover crop and crop residue actually produce; the function, continuous surface protection, stays constant.",
    ],
    relatedMachinery: [
      { label: "SIPP — Slit Insertion Precision Planter", href: "/machines/sipp-planter" },
      { label: "VIPP — Vertical Insertion Precision Planter", href: "/machines/vipp-planter" },
      { label: "The Mulcher & Bed Renovator", href: "/machines/mulcher-bed-renovator" },
    ],
    furtherReading: [{ label: "The Evolution of Seed Placement", href: "/papers/the-evolution-of-seed-placement" }],
  },
  {
    slug: "moisture-based-irrigation",
    title: "Soil Moisture Management: Replacing the Calendar",
    category: "permanent",
    oneSentenceDefinition:
      "PQNK irrigates according to the actual moisture condition of the root zone, governed by a direct soil test, not a fixed calendar.",
    overviewBlurb: "Why PQNK farms water by feel and observation, not by a fixed schedule.",
    whyItExists: [
      "Conventional irrigation follows a calendar: water on day X, regardless of what the plant or soil actually needs.",
    ],
    pqnkTechnique: [
      "PQNK replaces the calendar with direct observation of the root zone itself. The governing method is the soil ball test: take a handful of soil from the root zone — if it forms a cohesive ball, moisture is sufficient; if it crumbles, it's time to water.",
      "Visible afternoon wilting can be a secondary signal worth noticing in the field, but it is the soil condition at the root zone, not the plant's visible stress, that governs the irrigation decision.",
    ],
    oneTimeOrPermanent:
      "This is a permanent production practice, applied every season for the life of the field — not a transition step.",
    universalPrinciple:
      "No inundation is the universal principle: the root zone stays moist and aerated, never drowned. Excess irrigation dilutes the soil's mineral solution, drowns soil microbes, pushes plants into excess vegetative growth at the expense of fruiting, and wastes a resource that is often scarce.",
    localImplementation: [
      "Furrow irrigation timing, frequency and infrastructure vary by crop, soil, climate and equipment — the soil ball test is what determines when to water in any of those configurations, not a fixed interval.",
    ],
    furtherReading: [
      {
        label: "PQNK: The Wholesale Four-Step System to Reconnect the Water Cycle and End Water Scarcity",
        href: "/papers/the-wholesale-four-step-system-to-end-water-scarcity",
      },
    ],
  },
];

export function getResourceBySlug(slug: string) {
  return resources.find((r) => r.slug === slug);
}

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
      "Repeated tillage collapses soil pores and destroys the soil's natural architecture. That destruction compacts the profile into a dense layer, and where compaction is severe enough, a hardpan forms beneath the surface. Hardpan is a consequence of this process, not the original problem — but once it exists, it blocks deep water infiltration, air exchange and root penetration, forcing crops into shallow, stressed root systems no matter what is added on top.",
    ],
    pqnkTechnique: [
      "In PQNK, a subsoiler is used to shatter this compacted layer without inverting the soil, after the soil profile is first inspected to identify where the actual compacted layer sits. The established PQNK broad-acre operating specification is approximately 22 inches. Where field inspection shows deeper compaction, or where additional safety margin is required, working depth may extend up to approximately 24 inches — the purpose is to fully break the hardpan, not to impose one universal depth on every field.",
      "Once the hardpan is broken, roots (and later, the Jantar cover crop's taproots) can reach 4 to 12 feet deep depending on the crop, unlocking subsoil moisture and minerals that shallow-rooted, conventionally managed plants never access.",
    ],
    oneTimeOrPermanent:
      "This is done once, before the first planting on a given plot, and not repeated season after season. Once the profile is open and the field is managed to preserve that connectivity, roots and soil biology take over the job of maintaining it — repeating the operation unnecessarily would undo the very structure it was meant to restore.",
    universalPrinciple:
      "The universal requirement is that the compacted layer must be identified and physically broken during the initial corrective transition, reconnecting the upper biological production zone with the deeper soil profile. Breaking the hardpan is the one-time corrective step that removes inherited physical damage so that no-soil-disturbance can hold going forward — it corrects the past, it does not repeat into the future.",
    localImplementation: [
      "Actual soil-profile inspection — digging a pit on each field — identifies the location, thickness and severity of compaction, and determines where within the established operating range the working depth should be set. Engineering responds to the field's own condition rather than assuming the compacted layer sits at the same depth everywhere.",
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
      "PQNK does not permit imported gypsum or synthetic amendments. Instead, the field is water-washed to leach accumulated salts and residues left by previous management. Where soil pH exceeds 8, approximately 8 kg of sulfuric acid per acre may be added with that same water wash — not as a separate step afterward.",
      "This is a conditional correction tool, applied only where the high-pH condition actually exists, not a routine input added to every field. Where it applies, it rapidly lowers pH, liberates locked nutrients, and creates conditions hostile to parasitic weeds but favorable to the crop.",
    ],
    oneTimeOrPermanent:
      "This applies only where soil chemistry is actually degraded — fields that don't carry high pH or salt legacy don't require it at all, and most fields do not receive the acid step. Where it is required, it is applied once, with the water wash; the field is not treated again afterward.",
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
      "A permanent bed-and-furrow production architecture that separates the protected biological growing zone from permanent traffic and hydraulic corridors.",
    overviewBlurb: "A permanent bed-and-furrow production architecture, shaped once, that ends repeated soil compaction for the life of the field.",
    whyItExists: [
      "Conventional ridging is rebuilt every season: the same ground is repeatedly reshaped and run over by machinery. A growing zone that never stabilizes can't build the permanent soil structure a living ecosystem depends on.",
    ],
    pqnkTechnique: [
      "After the hardpan is broken and soil chemistry corrected where needed, PQNK farms build permanent raised beds, with the furrow matched to both the tractor's wheel-track and its tyre width, so tractor tyres always run entirely within the permanent traffic and hydraulic corridors, never compacting the sides of the growing bed.",
      "Because the beds are permanent, the growing zone is never compacted again by machinery traffic. Crop after crop is planted on the same beds, season after season, without reshaping the soil.",
    ],
    oneTimeOrPermanent:
      "Shaping the bed is a one-time operation, typically completed in hours; the architecture it establishes then serves the field permanently, corrected only occasionally through routine maintenance, never rebuilt from scratch each season.",
    universalPrinciple:
      "Permanent production architecture and controlled traffic are the governing requirements: a fixed, protected biological growing zone kept structurally apart from a dedicated traffic and irrigation corridor.",
    localImplementation: [
      "For the established PQNK configuration, the standard geometry is approximately a 42-inch bed top, an 18-inch furrow top, an 8-inch furrow bottom and roughly 8 inches of furrow depth — but these are engineering dimensions, adapted to the specific tractor's wheel-track profile and tyre width and local operating requirements, not a fixed spec mandatory on every tractor system worldwide. The engineering objective is that tractor tyres remain entirely within the traffic corridor without compacting the sides of the protected bed, since sidewall compaction restricts water seepage and infiltration into the bed.",
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
      "The biological transition crop that establishes living roots, biomass, soil cover and nutrient cycling, preparing the field to move away from routine fertilizer dependence.",
    overviewBlurb:
      "The biological transition crop, grown once during establishment, that builds living roots, biomass, soil cover and nutrient cycling.",
    whyItExists: [
      "A newly corrected field has broken physical structure but not yet living biology. Hardpan and soil chemistry can be corrected mechanically, but fertility and soil life have to be built, not imported.",
    ],
    pqnkTechnique: [
      "Once permanent beds are formed, PQNK farms sow Jantar (Sesbania aculeata or S. bispinosa) at high density before planting the cash crop, and let it grow for 60–90 days.",
      "Jantar's powerful taproots continue the work the subsoiler started, biologically fracturing the subsoil, pulling up leached minerals from deep layers, and creating vertical channels that the next crop's roots will follow.",
      "This is a closed-loop fertility-building step: no external manure or fertilizer is brought onto the field. Once Jantar reaches maturity, it is terminated at ground level, its roots left to decompose and feed soil microbes, its above-ground biomass chopped and laid as mulch on the very same bed.",
    ],
    oneTimeOrPermanent:
      "Jantar is grown once, during the establishment of a new field, ahead of the first cash crop. It is not regrown between every subsequent crop cycle — but biological cover itself does not end when Jantar's transition role is complete. Its roots remain in the soil, its biomass is retained as mulch, and successive crops continue that same biological occupation and cover through the permanent mulch-and-no-till loop from there.",
    universalPrinciple:
      "Jantar itself is not the universal PQNK principle — the governing requirements are Permanent Biological Cover and Maximum Biodiversity, alongside PQNK's other principles. Jantar is the established transition tool PQNK uses to rapidly establish living roots, biomass, biological activity and soil cover during that transition, in the growing environments where it has been used.",
    localImplementation: [
      "Jantar is especially suited to warm-season establishment, when it can rapidly build roots and biomass — under suitable conditions, preparing a field in as little as 60 days. Where transition begins in cooler autumn conditions and Jantar cannot establish adequately, alfalfa is a documented functional alternative: it develops a strong root system and tolerates mild cold well, though it produces less above-ground biomass than Jantar under warm-season conditions. The species may change; the biological function it fulfils — roots, biomass, biological cover — does not.",
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
      "This page brings two distinct PQNK principles together in one field practice. No Soil Disturbance protects the soil architecture already built — pores, roots and fungal networks stay intact because the bed is never re-tilled. Permanent Biological Cover protects the surface itself — mulch shields it from solar radiation and evaporation, moderates temperature, retains moisture and dew, and feeds biological processes as it decomposes. The two reinforce each other in the field, but they remain conceptually distinct requirements, not one combined rule.",
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
    title: "Soil Moisture Management (SMM)",
    category: "permanent",
    oneSentenceDefinition:
      "PQNK manages the root zone's moisture, air and biological condition as a whole — irrigation is only an occasional supplemental intervention within that system, not the subject itself.",
    overviewBlurb: "Why PQNK manages soil moisture directly, by observation, rather than defaulting to a fixed irrigation calendar.",
    whyItExists: [
      "Conventional irrigation follows a calendar: water on day X, regardless of what the plant, the soil, or recent weather actually indicate.",
    ],
    pqnkTechnique: [
      "PQNK replaces the calendar with direct observation of the root zone itself. The governing method is the soil ball test: take a handful of soil from the root zone — if it forms a cohesive ball, moisture is sufficient; if it crumbles, external water may be needed.",
      "Before deciding whether externally supplied water is required, the ball test result is weighed alongside recent rainfall, the rainfall forecast, the crop's visible condition, and the functioning condition of the biological production system as a whole. There is no predetermined irrigation calendar and no routine assumption that irrigation must occur — the question is simply whether the crop's natural water supply is currently sufficient. Visible wilting may be the first field observation that prompts the Production Manager to investigate root-zone soil moisture. The soil ball test then confirms whether the crop is actually short of water before any irrigation decision is made. A plant may wilt even when adequate soil moisture is present because high temperature, low humidity, wind, high transient transpiration demand or natural maturity can temporarily cause water loss from the canopy to exceed the rate at which roots can supply it.",
      "When natural supply is insufficient under extreme conditions, water may be applied through the permanent furrows as a supplement — not to uniformly saturate the raised bed. As water seeps laterally and vertically through the bed profile, it establishes a gradient: conditions near the wetted edge immediately after irrigation may approach roughly 90% water to 10% air, while toward the centre of the bed, water decreases and air increases as nutrient concentration in the soil solution rises, approaching roughly 10% water to 90% air. Roots remain free to explore the undisturbed bed profile and draw water, air and nutrients according to what the plant actually needs.",
      "This temporary gradient is distinct from the broadly balanced condition — roughly 30% water to 70% air — that soil life maintains once the system reaches its Sustained Closed Loop State and plant water needs are being met naturally. That 30:70 condition is not an irrigation target; it describes the ongoing state of a functioning system, not the spatial pattern that follows a supplemental furrow irrigation.",
    ],
    oneTimeOrPermanent:
      "This is a permanent production practice, applied every season for the life of the field — not a transition step.",
    universalPrinciple:
      "No inundation is the universal principle: the root zone stays moist and aerated, never drowned. Excess irrigation dilutes the soil's mineral solution, drowns soil microbes, pushes plants into excess vegetative growth at the expense of fruiting, and wastes a resource that is often scarce. PQNK has demonstrated approximately 70–90% reduction in externally supplied irrigation water, depending upon crop and conditions. Plants continue using water for biological processes, mineral transport, transpiration and cooling — PQNK reduces the amount that must be supplied externally by restoring a functioning production ecosystem, not the plant's own water use.",
    localImplementation: [
      "Furrow irrigation timing, frequency and infrastructure vary by crop, soil, climate and equipment — the soil ball test, weighed against rainfall and system condition, is what determines when to water in any of those configurations, not a fixed interval.",
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

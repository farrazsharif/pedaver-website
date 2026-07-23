export interface Resource {
  slug: string;
  title: string;
  summary: string;
  body: string[];
}

export const resources: Resource[] = [
  {
    slug: "breaking-the-hardpan",
    title: "Breaking the Hardpan",
    summary: "The one-time foundation step behind every PQNK conversion, from wheat to bamboo.",
    body: [
      "Decades of tillage and machinery traffic compact a layer beneath the surface known as the hardpan. It blocks deep water infiltration, air exchange and root penetration, forcing crops into shallow, stressed root systems no matter what is added on top.",
      "In PQNK, a subsoiler is used to shatter this compacted layer without inverting the soil, typically to a depth of 18–24 inches. This is done once, before the first planting on a given plot, and not repeated season after season.",
      "Once the hardpan is broken, roots (and later, the Jantar cover crop's taproots) can reach 4 to 12 feet deep depending on the crop, unlocking subsoil moisture and minerals that shallow-rooted, conventionally managed plants never access.",
    ],
  },
  {
    slug: "soil-chemistry-correction",
    title: "Correcting Soil Chemistry with Water and Acid",
    summary: "A one-time protocol for unlocking minerals in high-pH, salt-affected fields, without imported gypsum.",
    body: [
      "Many fields farmed conventionally for decades carry soil pH above 8, locking up essential minerals like iron, zinc and phosphorus, and creating conditions that favor parasitic weeds and disease.",
      "PQNK does not permit imported gypsum or synthetic amendments. Instead, a deep leaching irrigation is applied first, to dissolve and push down salts accumulated from previous farming cycles.",
      "Where pH remains above 8, a one-time application of roughly 8 kg of sulfuric acid per acre is added with the irrigation water. It is a permitted, one-time correction tool that rapidly lowers pH, liberates locked nutrients, and creates conditions hostile to parasitic weeds but favorable to the crop.",
    ],
  },
  {
    slug: "permanent-raised-beds",
    title: "The PQNK Raised Bed System",
    summary: "A fixed bed-and-furrow geometry that ends repeated soil compaction for good.",
    body: [
      "After the hardpan is broken and soil chemistry corrected, PQNK farms build permanent raised beds, typically 42 inches wide with 18-inch furrows, matched to standard tractor wheel spacing so that wheels always run in the furrows and never on the growing bed.",
      "Because the beds are permanent, the growing zone is never compacted again by machinery traffic. Crop after crop is planted on the same beds, season after season, without reshaping the soil.",
      "Bed and furrow dimensions can be adjusted to match different tractor tracks or crop spacing needs, but the underlying principle stays the same across every crop in the PQNK system: a fixed, uncompacted growing zone separated from a dedicated traffic lane.",
    ],
  },
  {
    slug: "jantar-cover-cropping",
    title: "Jantar (Sesbania) Cover Cropping",
    summary: "The living, closed-loop fertility step that replaces every bag of imported fertilizer.",
    body: [
      "Once permanent beds are formed, PQNK farms sow Jantar (Sesbania aculeata or S. bispinosa) at high density before planting the cash crop, and let it grow for 60–90 days.",
      "Jantar's powerful taproots continue the work the subsoiler started, biologically fracturing the subsoil, pulling up leached minerals from deep layers, and creating vertical channels that the next crop's roots will follow.",
      "This is a closed-loop fertility-building step: no external manure or fertilizer is brought onto the field. Once Jantar reaches maturity, it is terminated at ground level, its roots left to decompose and feed soil microbes, its above-ground biomass chopped and laid as mulch on the very same bed.",
    ],
  },
  {
    slug: "mulch-and-no-till",
    title: "Mulch and No-Till Planting",
    summary: "The core PQNK loop: retain, mulch, and plant directly, never disturbing the soil again.",
    body: [
      "With Jantar's biomass laid down as a 4–6 inch mulch layer, the cash crop is planted directly through it using a no-till planter or manual dibbling, never by ploughing the bed again.",
      "The mulch layer suppresses weeds, conserves moisture, moderates soil temperature against both heat and frost, and continues feeding soil biology as it decomposes.",
      "This is the loop that repeats across every PQNK crop, from wheat to bamboo: roots and residues stay in the soil, biomass becomes surface mulch, and cash crops are planted directly into an undisturbed, living root zone, season after season, without tillage.",
    ],
  },
  {
    slug: "moisture-based-irrigation",
    title: "Soil Moisture Management: Replacing the Calendar",
    summary: "Why PQNK farms water by feel and observation, not by a fixed schedule.",
    body: [
      "Conventional irrigation follows a calendar: water on day X, regardless of what the plant or soil actually needs. PQNK replaces this with direct observation, so plants drink water only when needed, just as a person does.",
      "Two simple field tests replace the schedule. The first is watching for afternoon wilting as a sign water is needed. The second is taking a handful of soil from the root zone: if it forms a cohesive ball, moisture is sufficient; if it crumbles, it's time to water.",
      "Excess irrigation dilutes the soil's mineral solution, drowns soil microbes, pushes plants into excess vegetative growth at the expense of fruiting, and wastes a resource that is often scarce. Keeping plants slightly on the dry side, deliberately, is one of the most consistent quality levers across every PQNK crop.",
    ],
  },
];

export function getResourceBySlug(slug: string) {
  return resources.find((r) => r.slug === slug);
}

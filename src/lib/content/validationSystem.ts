export type VBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "subsection"; heading: string; items: string[] }
  | { type: "steps"; items: { title: string; body: string }[] }
  | { type: "quad"; items: { title: string; body: string }[] };

export interface VSection {
  heading?: string;
  blocks: VBlock[];
}

export const validationInfographic = "/images/pqnk-validation-infographic.png";

export const validationPageTitle = "PQNK™ Validation";
export const validationPageSubtitle = "Validating Biological Excellence from Production System to Consumer";

export const validationExecutiveSummary: string[] = [
  "PQNK is more than a production system. It is a scientific framework for designing, implementing, evaluating, and continuously improving agricultural ecosystems, and validation is the piece that completes that framework. Most agricultural certification, Organic, regenerative labels, Good Agricultural Practice, answers a narrow question: did the producer follow the prescribed practices? It rarely asks whether the food produced is more nutritious, whether the soil has improved, whether biodiversity has increased, whether water has been conserved, or whether the farming system has become more resilient and prosperous.",
  "PQNK™ Validation exists to answer those questions directly. It is organised around four integrated pillars, System Validation, Food Value Validation, Environmental Validation, and Economic Validation, that together evaluate agriculture as one living system rather than as a checklist of isolated practices. It does not compete with Organic, GAP, or food-safety certification; it adds a scientific layer above them that measures biological performance and outcome.",
  "A central part of that outcome is the elimination of agrochemicals from the production system, and laboratory confirmation that the harvested food carries no trace of them, on the surface or within the tissue. This is not treated as a separate safety checkbox. It is inseparable from nutritional value and diversity, because a residue-bearing food cannot be called nutritionally superior no matter what its mineral or vitamin content shows, and PQNK™ Validation measures the two together.",
];

export const validationSections: VSection[] = [
  {
    heading: "Why Validation Matters",
    blocks: [
      {
        type: "paragraph",
        text: "Modern certification systems verify process. They rarely validate outcome. A farm can be certified while the questions that matter most to the people who eat its food and depend on its land remain unanswered: is the food more nutritious, is it biologically superior, has the soil improved, has biodiversity increased, has water been conserved, has the farming system become economically stronger, has the landscape been restored?",
      },
      {
        type: "paragraph",
        text: "PQNK adopts a different starting principle. Agriculture should ultimately be judged by the measurable biological, environmental, and economic outcomes it produces, not only by the management steps that were followed to get there. Validation is the extension of production science that makes that judgment possible. In short, PQNK™ Validation is:",
      },
      {
        type: "bullets",
        items: [
          "Beyond process certification — it evaluates outcome, not just adherence to a set of practices",
          "Focused on measurable outcomes — every claim is backed by an indicator that can be recorded and checked",
          "Science-based — evaluation methods are built on laboratory measurement, field observation, and peer-reviewed research",
          "Holistic and integrated — the farm is assessed as one system, not a set of unrelated checklists",
          "Beneficial to farmers, consumers, the environment, and society together, not to any one of them at the expense of the others",
        ],
      },
    ],
  },
  {
    heading: "Guiding Philosophy",
    blocks: [
      {
        type: "paragraph",
        text: "PQNK Validation rests on one principle: the value of an agricultural system should be determined not only by how it is managed, but by what it produces, what it restores, and how it improves the lives of the people who depend on it. Validation therefore extends across the complete agricultural system, from field management to the harvested food, and from ecological restoration to farmer prosperity.",
      },
      {
        type: "paragraph",
        text: "It is not positioned as a competitor to Organic, GAP, or other certification programmes, all of which continue to serve an important regulatory and market function. It is positioned as a comprehensive scientific framework for evaluating biological excellence throughout the agricultural production system, held under a single identity, PQNK™ Validation, rather than fragmented into a separate brand for every dimension of performance.",
      },
    ],
  },
  {
    heading: "The Four Pillars",
    blocks: [
      {
        type: "paragraph",
        text: "PQNK Validation evaluates the complete agricultural system through four integrated pillars. Proper implementation should naturally improve performance across all four at once, because they are different dimensions of a single biological system rather than four independent tests.",
      },
      {
        type: "subsection",
        heading: "Pillar One: PQNK™ System Validation",
        items: [
          "Permanent beds, no soil disturbance, no inundation",
          "Permanent biological cover and active biodiversity management",
          "Controlled traffic and crop residue retention",
          "Soil biological activity and Soil Moisture Management (SMM)",
          "Machinery compliance and sound production management",
          "Elimination of synthetic agrochemical inputs — no synthetic fertilizer, pesticide, or herbicide use",
        ],
      },
      {
        type: "paragraph",
        text: "This pillar validates management, not yield alone. In practice, that management is assessed against a defined field implementation sequence, the order in which a plot is brought into correct PQNK condition:",
      },
      {
        type: "steps",
        items: [
          { title: "1. Farm Designing", body: "The farm is laid out to make the longest fields practical with minimum soil disturbance (relevant to flatland, flood-irrigated areas only)." },
          { title: "2. Break the Hardpan", body: "A tine is run to a depth of twenty-two inches to fracture the compacted layer that blocks root, air, and water movement." },
          { title: "3. Water Wash", body: "Salts and accumulated chemicals are leached down through the profile; if soil pH exceeds 8, eight kilograms of sulphuric acid are added per acre." },
          { title: "4. Make Permanent Raised Beds", body: "The beds serve as a protected biological zone. Furrows carry water for soil moisture management and confine machinery traffic, so it passes only through the furrows and never across the bed itself." },
          { title: "5. Plant Cover Crop, preferably Jantar", body: "Roots open soil pores for infiltration, seepage, and aeration, and establish soil biology. Roots are retained in the soil, and the upper part of the plant is mulched onto the bed to maintain organic cover." },
          { title: "6. Plant Crop After Crop", body: "Cropping is continuous, ideally crop into crop, to maintain uninterrupted biological cover and diversity." },
          { title: "7. SMM, Soil Moisture Management", body: "Checked occasionally by taking soil from the root zone: if it holds together like a ball, moisture is sufficient; if it does not hold, water is applied slowly to a depth of about half the furrow height." },
          { title: "8. Harvest Without Disturbing Soil", body: "Roots stay in the soil and crop residue stays on the bed at harvest, preserving the biological architecture built through the preceding seven steps." },
        ],
      },
      {
        type: "paragraph",
        text: "System integrity, established through this sequence, is the foundation every other pillar is measured against: food value, environmental performance, and economics all depend on the field having been brought into this condition first.",
      },
      {
        type: "subsection",
        heading: "Pillar Two: PQNK™ Food Value Validation",
        items: [
          "Agrochemical residue freedom: laboratory testing confirming the absence of pesticide, herbicide, and synthetic fertilizer residues, on the surface and within the tissue of the harvested food",
          "Nutritional value: mineral density, vitamin profile, amino acid and protein quality, beneficial fatty acids, natural sugars, antioxidants, and beneficial phytochemicals",
          "Nutritional diversity: the range of minerals, vitamins, amino acids, and phytochemicals present, not merely their existence",
          "Sensory quality: natural colour, surface shine, smell, aroma, texture, firmness, taste, and eating quality",
          "Post-harvest performance: natural shelf life without preserving chemicals, weight loss during storage, storage stability, and processing recovery and quality",
        ],
      },
      {
        type: "paragraph",
        text: "Agrochemical residue freedom is placed first among these measures deliberately. It is not a separate safety add-on sitting apart from nutritional value, it is part and parcel of it. A crop's mineral density, vitamin profile, and phytochemical diversity cannot be called nutritionally superior if the tissue also carries pesticide, herbicide, or synthetic fertilizer residue, since that residue is itself a measurable negative attribute of the same food. PQNK™ Food Value Validation therefore requires laboratory confirmation of residue-free status, on the surface and within the tissue, as a precondition before nutritional density and diversity are reported at all.",
      },
      {
        type: "paragraph",
        text: "The objective is to validate the biological value delivered to consumers, rather than simply the production method used. This pillar formalises the Nutrition Density & Food Value Validation framework as an integral part of PQNK Validation, not a separate initiative.",
      },
      {
        type: "subsection",
        heading: "Pillar Three: PQNK™ Environmental Validation",
        items: [
          "Soil restoration and biological activity",
          "Water infiltration, retention, and groundwater recharge; reduced runoff and erosion",
          "Water-use efficiency and carbon storage",
          "Moderation of surface temperature",
          "Recovery of biodiversity, ecosystem function, and landscape resilience",
        ],
      },
      {
        type: "paragraph",
        text: "Environmental restoration is treated as an integral measure of agricultural success, not a side effect of good farming.",
      },
      {
        type: "subsection",
        heading: "Pillar Four: PQNK™ Economic Validation",
        items: [
          "Cost of production, irrigation and energy savings",
          "Reduced machinery operations and reduced fertiliser and pesticide expenditure",
          "Labour efficiency, yield stability, and product quality premiums",
          "Net profitability, return on investment, and employment generation",
          "Broader rural economic resilience",
        ],
      },
      {
        type: "paragraph",
        text: "Agricultural sustainability cannot exist without economic sustainability. This pillar exists to prove, rather than assume, that PQNK delivers it.",
      },
    ],
  },
  {
    heading: "One System, Not Four Separate Tests",
    blocks: [
      {
        type: "paragraph",
        text: "The four pillars are not independent systems; they represent different dimensions of one biological production system. Proper implementation should naturally improve food quality, environmental performance, and economic performance together. The framework therefore evaluates agriculture as one integrated living system rather than four unrelated performance categories to be optimised separately.",
      },
    ],
  },
  {
    heading: "Together They Deliver: Biological Excellence",
    blocks: [
      {
        type: "paragraph",
        text: "When the four pillars are validated together, they converge on four outcomes that no single pillar can produce alone:",
      },
      {
        type: "quad",
        items: [
          { title: "Better Food", body: "Produce that is more nutritious, tastier, longer lasting, and laboratory-confirmed free of agrochemical residues." },
          { title: "Better Environment", body: "Restored soil, conserved water, healthier ecosystems, and a more stable local climate." },
          { title: "Better Farmer", body: "Lower costs, higher income, reduced risk, and stronger rural livelihoods." },
          { title: "Better Future", body: "Healthier people, resilient communities, and a thriving planet for generations to come." },
        ],
      },
    ],
  },
  {
    heading: "Transparency and Trust",
    blocks: [
      {
        type: "paragraph",
        text: "Every PQNK™ Validation report is designed to be traceable back to its underlying evidence. Where practical, a validated product or farm carries a QR code linking directly to its full validation report, laboratory results, field data, and the indicators behind them, so that any claim made under PQNK™ Validation can be checked, not merely taken on trust.",
      },
    ],
  },
  {
    heading: "Relationship to Existing Certification Systems",
    blocks: [
      {
        type: "paragraph",
        text: "PQNK Validation is not intended to replace Organic certification, GAP certification, food safety systems, or regulatory inspection. These systems continue to perform important regulatory and market functions. PQNK Validation provides an additional scientific layer that evaluates biological performance and measurable outcomes that existing certification systems do not.",
      },
    ],
  },
  {
    heading: "A Framework Built to Evolve",
    blocks: [
      {
        type: "paragraph",
        text: "As research advances, additional indicators may be incorporated: carbon accounting, water footprint, climate resilience, nutrient-use efficiency, human health outcomes, landscape biodiversity, and ecosystem service valuation among them. Every indicator is intended eventually to be supported by laboratory measurement, field observation, statistical analysis, peer-reviewed research, long-term monitoring, and independent verification where appropriate.",
      },
      {
        type: "paragraph",
        text: "Building a validation framework of this scope cannot be done in isolation. Pedaver actively seeks collaboration with universities, research institutions, government laboratories, public health organisations, food scientists, soil scientists, environmental scientists, agricultural economists, standards organisations, and international development agencies.",
      },
    ],
  },
  {
    heading: "Long-Term Vision",
    blocks: [
      {
        type: "paragraph",
        text: "The long-term objective is not merely to validate individual farms; it is to help redefine how agricultural success is measured. Agriculture has historically been judged primarily through yield, production volume, and short-term economic output. These measures remain important, but they do not fully capture the biological performance of a farming system or its contribution to society.",
      },
      {
        type: "paragraph",
        text: "PQNK™ Validation proposes a broader definition of success, one that integrates production integrity, food value, environmental restoration, and economic resilience into a single scientific framework, so that agriculture can be assessed not only by the quantity of food it produces, but by the quality of that food, the health of the ecosystems that sustain it, and the long-term prosperity of the farming communities that depend on it.",
      },
    ],
  },
  {
    heading: "The PQNK™ Validation Chain",
    blocks: [
      {
        type: "quote",
        text: "Correct principles → correct implementation → superior food → restored environment → prosperous farmer → sustainable future.",
      },
      {
        type: "paragraph",
        text: "PQNK™ Validation completes a continuous chain of accountability, and it exists to prove, at every link, that the chain is holding.",
      },
    ],
  },
  {
    heading: "Conclusion",
    blocks: [
      {
        type: "paragraph",
        text: "Through this integrated approach, PQNK™ Validation seeks to establish a new global benchmark for measuring agricultural excellence, one that measures not only how food is produced, but how effectively agriculture fulfills its broader responsibilities to human health, environmental stewardship, and economic sustainability.",
      },
    ],
  },
];

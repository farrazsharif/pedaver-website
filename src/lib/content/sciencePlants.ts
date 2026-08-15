/**
 * Content for /science/plants, the third Science detail page (after
 * /science/transition and /science/soil). This page is written more
 * prose-forward than scienceSoil.ts, per its own brief — fewer bullet
 * grids, more connected explanatory paragraphs.
 */

export const hero = {
  eyebrow: "PQNK Science · Plants",
  title: "Plants — The Biological Production Engine",
  body: [
    "Agriculture commonly treats the plant as the final recipient of production inputs: seed is planted, fertilizer supplies nutrients, irrigation supplies water, and crop protection keeps the plant alive until harvest.",
    "PQNK sees the plant differently. The plant captures energy, carbon, water and nutrients, interacts with soil biology, and ultimately builds both the harvested produce and part of the biological infrastructure supporting future crops.",
  ],
  callout: "The plant is not merely grown by the system. The plant helps build and operate the system that grows it.",
};

export const plantMass = {
  title: "Where Plant Mass Actually Comes From",
  body: [
    "Although plants appear to rise from soil, most plant biomass is not physically extracted from geological soil. The overwhelming majority of plant biomass is constructed from carbon, hydrogen and oxygen obtained through carbon dioxide and water.",
    "Nitrogen is fundamentally an atmospheric element, although its entry into biologically available pathways depends upon biological processes and the crop or system involved. Mineral elements from geological soil constitute a much smaller proportion of total plant mass while remaining physiologically essential.",
  ],
  proposition: "Soil is not primarily a warehouse from which the physical mass of the crop is extracted. It is the living biological, mineral, water and air environment that enables the plant to construct that mass.",
  figures: {
    intro: "PQNK's established working formulation for the origin of plant mass is approximately:",
    items: [
      { value: "95.917%", label: "carbon, hydrogen and oxygen" },
      { value: "~4%", label: "nitrogen" },
      { value: "~0.083%", label: "geological minerals" },
    ],
    note: "These are PQNK's own working figures, not independently verified textbook constants — presented here as the established formulation, not as a universal law.",
  },
  paperLinkLabel: "Unlocking the Secrets of the Soil: Deep Topsoil and Nature's Partnership",
  paperLinkHref: "/papers/unlocking-the-secrets-of-the-soil-deep-topsoil",
};

export const photosynthesis = {
  title: "Photosynthesis: The Primary Production Reaction",
  body: [
    "Leaves capture solar radiation. Photosynthesis converts carbon dioxide and water into energy-rich organic compounds, while oxygen is released.",
    "Photosynthesis produces the carbon compounds used to build roots, stems, leaves, flowers, seeds, fruit and all harvested biomass. Part of this photosynthetically fixed carbon moves below ground through living roots and root-derived compounds.",
  ],
  proposition: "Sunlight captured above ground becomes biological energy below ground.",
};

export const twoWorlds = {
  title: "The Plant Connects Two Worlds",
  canopyIntro: "Above ground, the canopy occupies an atmospheric environment: sunlight, carbon dioxide, oxygen, temperature, humidity and wind.",
  rootIntro: "Below ground, the root occupies a different environment entirely: water, air, mineral surfaces, organic matter, microorganisms, fungi and other roots.",
  flowOne: ["Atmosphere", "Leaf", "Plant Metabolism", "Root", "Rhizosphere", "Soil Biology"],
  flowTwo: ["Soil", "Water & Nutrients", "Root", "Vascular System", "Leaf", "Growth & Produce"],
  proposition: "The plant is the biological bridge between atmosphere and soil.",
};

export const roots = {
  title: "Roots Are Not Drinking Straws",
  body: "Roots do much more than absorb water and fertilizer. They explore soil, penetrate pores, create channels, release organic compounds, interact with microorganisms and fungi, alter their immediate chemical environment, and influence the rhizosphere around them.",
  retentionNote: "When roots die naturally and remain in the soil, their channels become part of the architecture available to subsequent crops — this is why PQNK retains roots after a crop's productive role is complete.",
  proposition: "PQNK retains roots because yesterday's root system becomes part of tomorrow's soil system.",
};

export const exudates = {
  title: "Root Exudates: Carbon Sent Underground",
  body: "Plants do not simply extract resources from soil. Living roots release carbon-containing compounds into the rhizosphere. These exudates influence and support microbial communities and nutrient cycling.",
  reversal: "The soil is not simply feeding the plant. The plant is also feeding the soil ecosystem.",
  flow: ["Atmospheric CO₂", "Photosynthesis", "Plant Carbon", "Root Exudates", "Rhizosphere Biology"],
};

export const rhizosphere = {
  title: "The Rhizosphere",
  body: "The rhizosphere is the biologically active interface influenced by living roots — a zone of interaction among roots, microorganisms, fungi, water, gases, organic compounds and mineral surfaces.",
  proposition: "The plant does not feed from soil alone. It feeds through a living soil–root system.",
};

export const mycorrhizae = {
  title: "Mycorrhizae Extend the Exploration Network",
  body: "Mycorrhizal fungi form associations with roots, extending fine hyphae to explore soil beyond the immediate root surface. In exchange for photosynthetically derived carbon supplied by the plant, the fungal network contributes to the acquisition and movement of water and mineral nutrients.",
  disturbanceLink: "This connects directly to No Soil Disturbance: repeated disturbance can damage these physical fungal networks.",
  proposition: "The machinery decision therefore becomes a biological decision.",
  caveat: "Not every crop depends on mycorrhizal association to the same degree, and the relationship is not identical across species.",
};

export const nutrientAccess = {
  title: "Nutrient Acquisition Is a Biological Process",
  distinction: {
    left: "Nutrient presence in soil",
    right: "Nutrient accessibility to the plant",
  },
  body: "Whether a nutrient present in soil actually becomes available to a plant depends on mineral particles, water chemistry, microorganisms, fungi, root exudates, root-zone chemistry and biological transformations. PQNK's objective is not simply to place larger quantities of soluble nutrients into soil. It is to restore the biological machinery through which nutrients are cycled and accessed according to plant demand.",
};

export const proportion = {
  title: "Proportion Matters, Not Merely Quantity",
  body: "Plant metabolism requires many elements performing different biochemical functions. A large quantity of one nutrient cannot substitute for inadequate access to another required nutrient.",
  approvedFormulation:
    "PQNK seeks to restore a biologically mediated environment in which a diverse range of nutrients can become available in proportions responsive to plant physiological demand.",
  closing: "The plant participates in regulating uptake through its own physiology, while soil biology, water, root chemistry and nutrient availability determine what is actually accessible.",
};

export const nutrientDenseFood = {
  title: "From Nutrient Availability to Nutrient-Dense and Diverse Food",
  intro: "Yield is only one outcome of plant metabolism. Plants manufacture complex compounds including carbohydrates, proteins, oils, pigments, vitamins, aromatic compounds, phenolics and other primary and secondary metabolites — food composition is not determined by nitrogen, phosphorus and potassium alone.",
  chain: [
    "Living Soil",
    "Biological Nutrient Cycling",
    "Root–Microbe Exchange",
    "Diverse & Proportionate Nutrient Availability",
    "Complete Plant Metabolism",
    "Complex Biochemical Composition",
    "Nutrient-Dense & Diverse Produce",
  ],
  bridge: "This is where production agriculture becomes directly connected to human nutrition.",
  evidenceBoundary: "Restored biological function provides the mechanism; the nutritional composition of the harvested produce must be established through measurement.",
};

export const densityVsDiversity = {
  title: "Nutrient Density and Nutrient Diversity Are Different",
  density: { name: "Nutrient density", body: "The concentration of particular nutrients or beneficial compounds within harvested produce." },
  diversity: { name: "Nutrient diversity", body: "The breadth of nutrients and biochemical compounds represented in that food." },
  body: "PQNK seeks a biological production environment capable of supporting both — but no PQNK crop should be assumed automatically superior on either measure without actual measurement.",
  evidenceChain: ["Science explains the mechanism.", "Evidence demonstrates the field outcome.", "PQNK Validation measures the produce."],
  validationLinkLabel: "PQNK Validation",
  validationLinkHref: "/validation",
};

export const notFertilizer = {
  title: "Plant Nutrition Is Not Fertilizer Nutrition",
  fertilization: { name: "Fertilization", body: "External application of selected nutrients." },
  plantNutrition: { name: "Plant nutrition", body: "The larger biological process through which plants acquire and use the elements required for metabolism." },
  proposition: "PQNK's objective is not simply fertilizer elimination. It is restoration of biological nutrient acquisition.",
  closing: "Fertilizer dependence should disappear because biological function has recovered — not because nutrients have somehow ceased to be necessary.",
};

export const nitrogen = {
  title: "Nitrogen: An Atmospheric Resource Entering Biology",
  body: "The atmosphere holds an enormous reservoir of nitrogen, but most plants cannot directly use atmospheric molecular nitrogen. It must enter biologically available pathways, including biological nitrogen fixation involving microorganisms.",
  approvedFormulation: "The atmosphere is the ultimate nitrogen reservoir; biology provides pathways through which atmospheric nitrogen can enter the soil–plant nutrient cycle.",
  closing: "Living roots, biodiversity, biological cover and a protected habitat all support this cycling — without every nitrogen requirement being automatically met on every field.",
};

export const waterTransport = {
  title: "Water Is the Transport Medium",
  body: "Nutrient acquisition cannot be separated from water: dissolved mineral ions move toward and into the root system through it. Roots require both water and air — flooding may provide abundant water while restricting oxygen, and dry soil may hold abundant mineral reserves while limiting the water that would carry them toward roots.",
  requirement: "A functioning water–air–root relationship is the requirement.",
  resourceLinkLabel: "Soil Moisture Management (SMM)",
  resourceLinkHref: "/resources/moisture-based-irrigation",
};

export const transpiration = {
  title: "Transpiration Is Part of the Production Engine",
  body: "Water absorbed by roots moves through the plant and is lost as vapour through stomata, contributing to water and nutrient transport along the way and providing evaporative cooling that regulates leaf temperature.",
  distinction: {
    left: "Total plant water use",
    right: "Externally supplied irrigation water",
  },
  precisionNote: "Where water-saving concepts are mentioned, the correct phrasing is a reduction in externally supplied irrigation water — not loose shorthand like \"90% less water,\" which conflates the two.",
};

export const waterCycleParticipation = {
  title: "Plants Participate in the Water Cycle",
  body: "Productive vegetation is part of the land–atmosphere water system: plants move water into the atmosphere through transpiration, and vegetated, biologically covered surfaces interact with solar radiation differently from bare, overheated soil — affecting field microclimate and atmospheric moisture.",
  pointerNote: "The fuller mechanics of this belong to future Science treatments of Water and Climate.",
};

export const canopy = {
  title: "Canopy Architecture Is Biological Infrastructure",
  body: "Leaves are solar collectors. The canopy captures radiation, drives photosynthesis, shades soil, modifies field microclimate, produces biomass and eventually contributes residue.",
  proposition: "Canopy and roots are two sides of the same biological production machine.",
};

export const residue = {
  title: "Crop Residue Is the Next Generation's Resource",
  body: "PQNK's harvest philosophy is consistent: harvest the desired produce, retain roots, retain appropriate above-ground biomass as mulch. That retained material protects soil, moderates temperature, restricts evaporation and feeds decomposition and biology.",
  flow: ["Crop", "Roots & Residue", "Soil Biology", "Next Crop"],
  closedLoopNote: "This connects directly to the Sustained Closed Loop State — which, as established on the Transition page, does not mean nothing ever enters or leaves the system.",
};

export const cropAfterCrop = {
  title: "Crop After Crop, Combinations and Crop-in-Crop",
  body: "PQNK seeks continuing biological continuity: living roots, ongoing photosynthesis, carbon transfer, soil cover, biological habitat and biodiversity — through crop-after-crop production, crop combinations, and crop-in-crop arrangements where appropriate.",
  caveat: "This is not an instruction toward maximum plant crowding. Species, spacing, timing and combinations remain field adaptations.",
  closing: "Science is universal. Application is local.",
};

export const biodiversityProtection = {
  title: "Biodiversity Changes Plant Protection",
  body: "Crops exist within biological food webs. Greater functional biodiversity creates more ecological relationships through which pest and disease populations may be moderated, and PQNK therefore seeks biological regulation rather than permanent chemical dependence.",
  caveat: "This is not a claim that all pests disappear, that pesticides can never be required, that every organism is beneficial, or that intervention is impossible during transition. The detailed mechanism belongs to a future Crop Protection Science treatment.",
};

export const plantHealth = {
  title: "Plant Health Is a System Outcome",
  body: "Leaf colour, growth, rooting, flowering, fruit formation, disease expression, wilting and maturity all provide information about a plant — but observation alone is not automatically a diagnosis.",
  wiltingIntro: "Wilting may be the first observation when the Production Manager walks through a plantation. That observation prompts investigation: root-zone soil moisture is then checked using the soil ball test.",
  wiltingCauses: "The test helps determine whether irrigation is actually required, or whether wilting may instead result from high temperature, low humidity, wind, temporary transpiration demand exceeding root water transfer, natural maturity, or another plant or system condition.",
  sequence: [
    { label: "Observation", body: "A plant symptom is noticed." },
    { label: "Investigation", body: "The relevant condition is examined." },
    { label: "Diagnosis", body: "Root-zone soil is tested where water is the question." },
    { label: "Management Decision", body: "Action follows only once the diagnosis confirms the need." },
  ],
};

export interface HabitatPrinciple {
  name: string;
  body: string;
}

export const habitatPrinciples: HabitatPrinciple[] = [
  { name: "No Soil Disturbance", body: "Protects pores, roots, aggregates, fungal networks and biological architecture." },
  { name: "No Inundation", body: "Maintains the water–air relationship required by roots and aerobic biology." },
  { name: "Permanent Biological Cover", body: "Protects the soil surface, moderates temperature, restricts evaporation and feeds biology." },
  { name: "Maximum Biodiversity", body: "Expands biological relationships above and below ground." },
];

export const scienceApplication = {
  science:
    "Plants require sunlight, carbon dioxide, water, oxygen, mineral elements and functioning biological relationships. Roots require both water and air. Photosynthesis supplies carbon and energy. Living roots interact continuously with the rhizosphere. Biological nutrient cycling influences nutrient accessibility. Plant metabolism determines the biochemical composition of harvested produce.",
  application: "Crop species differ. Planting geometry differs. Canopy architecture differs. Rooting depth differs. Water demand differs. Season and climate differ. Crop combinations differ. Harvest systems differ. Machinery requirements differ.",
  closing: "PQNK does not require every crop to look the same above ground. It requires the same ecological functions to remain protected below and around the crop.",
};

export const soilPlantReciprocity = {
  title: "Plants Do Not Replace Soil — And Soil Does Not Replace Plants",
  body: "Without functioning soil, roots lose biological habitat. Without living plants, soil loses a major source of freshly fixed carbon, root activity and biological stimulation.",
  relationship: { left: "Soil builds the conditions for Plants.", right: "Plants build the conditions for Soil." },
  closing: "Neither can be restored independently for long.",
  soilLinkLabel: "Continue with Soil Science",
  soilLinkHref: "/science/soil",
};

export const productionLoop: string[] = [
  "Sunlight",
  "Photosynthesis",
  "Carbon Compounds",
  "Plant Growth + Root Exudation",
  "Rhizosphere & Biological Activity",
  "Nutrient Cycling & Acquisition",
  "Plant Metabolism",
  "Biomass + Nutritionally Complex Produce",
  "Roots & Residues Returned",
  "Soil Biological Function",
];
export const productionLoopClosing = "Next Generation of Plants";

export const centralProposition = {
  intro: "PQNK does not attempt to manufacture the plant through external inputs. It restores the environment in which the plant can increasingly perform the biological work for which plants evolved.",
  lines: [
    "The plant captures energy.",
    "The plant captures carbon.",
    "The plant builds biomass.",
    "The plant feeds the rhizosphere.",
    "The plant participates in nutrient acquisition.",
    "The plant moves water.",
    "The plant contributes to atmospheric moisture.",
    "The plant builds roots and soil architecture.",
    "The plant supports biological communities.",
    "The plant manufactures the complex compounds that ultimately become food.",
    "Roots and residues contribute to the next production cycle.",
  ],
  final: "The plant is not the passive product of agriculture. It is the biological engine of agriculture.",
};

/**
 * Content for /science/food-quality, the ninth Science detail page (after
 * /science/transition, /science/soil, /science/plants, /science/water,
 * /science/biodiversity, /science/nutrition, /science/crop-protection and
 * /science/climate).
 */

export const hero = {
  eyebrow: "PQNK Science · Food Quality",
  title: "PQNK Food Quality Science",
  subtitle: "From Living Soil to the Food We Eat",
  body: [
    "A harvested grain, fruit, vegetable, seed or other edible plant part does not form independently of the plant's growing environment.",
    "Its characteristics emerge through interconnected processes including soil function, root function, microbial nutrient transformation, water movement, aeration, photosynthesis, plant metabolism, reproductive development, physiological maturity, and harvest and post-harvest handling.",
  ],
  callout: "Food quality is the final biological expression of the soil–plant–water–biodiversity system in which the crop was produced.",
};

export const openingChain = ["Living Soil", "Functional Roots", "Biological Nutrient Acquisition", "Balanced Plant Physiology", "Healthy Reproductive Development", "Produce Formation", "Food Quality"];

export const yieldVsQuality = {
  title: "Yield and Food Quality Are Not the Same Measurement",
  yield: { name: "Yield", body: "How much material was harvested." },
  quality: { name: "Food Quality", body: "Characteristics of what was harvested and how it performs as food." },
  guardrails: [
    "High yield does not by itself prove high nutritional quality.",
    "Lower yield does not automatically prove better nutritional quality.",
  ],
  statement: "Yield and food quality must be evaluated independently.",
};

export interface QualityDimension {
  name: string;
  body: string;
}

export const multidimensional = {
  title: "Food Quality Is Multidimensional",
  intro: "These dimensions do not necessarily move together.",
  dimensions: [
    { name: "Nutrient Density", body: "Concentration of specified nutrients within a defined quantity of food." },
    { name: "Nutrient Diversity", body: "Range of nutritionally relevant nutrients/compounds present." },
    { name: "Physical Quality", body: "Weight, size, grain filling, kernel development, firmness, structural integrity." },
    { name: "Sensory Quality", body: "Aroma, taste, colour, texture." },
    { name: "Storage Behaviour", body: "Shelf life, moisture/weight loss, deterioration, post-harvest stability." },
    { name: "Food Safety", body: "Residue status, contaminants, toxins where relevant." },
    { name: "Processing Quality", body: "Crop-specific measures such as milling recovery, broken grain, cooking behaviour, oil characteristics, sugar characteristics, starch characteristics." },
  ] as QualityDimension[],
};

export const soilToComposition = {
  title: "From Soil Mineral Reserve to Food Composition",
  chain: ["Geological Mineral Reserve", "Biological Transformation", "Root Acquisition", "Plant Metabolism", "Translocation to Harvested Organ", "Food Composition"],
  boundary: "A biologically functional soil provides a mechanism by which balanced plant nutrition may be supported. It does not, by itself, prove that every harvested PQNK product contains higher concentrations of every nutrient. That requires measurement.",
  linkLabel: "Continue with Nutrition Science",
  linkHref: "/science/nutrition",
};

export const photosynthesisFood = {
  title: "Food Is Not Built From Fertilizer Alone",
  chain: ["Sunlight + CO₂ + Water", "Photosynthesis", "Plant Metabolism", "Carbohydrates / Oils / Proteins / Secondary Compounds", "Harvested Food"],
  body: "Carbon-containing compounds in food are built through plant metabolism, and photosynthesis provides the fundamental carbon-energy entry pathway. Mineral nutrition remains essential, but it is one component of a larger biological production system.",
  linkLabel: "Continue with Plant Science",
  linkHref: "/science/plants",
};

export const balancedVsForced = {
  title: "Balanced Nutrition Versus Forced Vegetative Growth",
  body: "Rapid vegetative growth is not synonymous with superior food quality. Large plants are not automatically nutritionally superior plants.",
  nitrogenNote: "High readily available nitrogen supply can alter plant growth and physiology, but outcomes depend on form, quantity, timing, crop, growth stage, environment and overall nutrient balance.",
  statement: "Plant size is not a substitute for food-composition measurement.",
  linkLabel: "Continue with Crop Protection Science",
  linkHref: "/science/crop-protection",
};

export const reproductiveDevelopment = {
  title: "Reproductive Development and Grain Filling",
  inputs: ["Healthy Root System", "Functional Leaves", "Adequate Water", "Balanced Nutrition", "Functional Biology"],
  chain: ["Photosynthesis and Assimilate Production", "Flowering / Pollination", "Grain Filling", "Mature Kernel"],
  body: "Harvested grain represents the result of reproductive development and translocation of plant-produced compounds into the seed — the mechanism behind field observations such as better grain filling, without implying universal nutritional superiority.",
};

export const riceExample = {
  title: "PQNK Rice — A Food-Quality Case Example",
  intro: "PQNK field experience has reported characteristics including better-filled grains, greater kernel proportion, lower breakage during processing, and improved aroma/taste observations.",
  guardrail: "These are not presented as universal guarantees.",
  levels: [
    { name: "Field Observation", body: "What is observed in the growing crop and at harvest." },
    { name: "Processing Measurement", body: "Broken-rice percentage measured during milling; kernel proportion physically measured." },
    { name: "Laboratory Nutritional Measurement", body: "Nutritional composition established through laboratory analysis." },
  ],
  aromaNote: "Aroma and taste require appropriate sensory and/or analytical assessment.",
  noInventedNote: "No percentages or laboratory results are invented on this page.",
};

export const tasteAroma = {
  title: "Taste and Aroma",
  factors: ["Genetics", "Environment", "Plant Physiology", "Maturity", "Post-Harvest Handling"],
  resultLabel: "Sensory Expression",
  body: "Taste and aroma can involve sugars, acids, volatile compounds, oils and other metabolites. Growing conditions can influence their expression, but genetics and post-harvest factors also matter.",
  observationNote: "PQNK farmer/consumer observations may be reported as observations.",
  guardrail: "PQNK does not claim that its produce always tastes better.",
};

export const colourShine = {
  title: "Colour and Shine — Signals, Not Proof",
  body: "Colour, shine and visual integrity can be useful observable indicators of produce condition.",
  statement: "Appearance is not laboratory proof of nutrition.",
  guardrail: "Nutrient density is not inferred from colour or shine alone.",
};

export const weightDensity = {
  title: "Weight and Physical Density",
  body: "Improved grain filling or tissue development can influence physical characteristics such as unit weight, specific gravity or produce density, depending on crop.",
  statement: "Greater weight is a physical measurement; it is not automatically proof of greater nutrient density.",
};

export const shelfLife = {
  title: "Shelf Life — A Measurable Post-Harvest Outcome",
  body: "Harvested produce remains biological material. Its deterioration can be influenced by respiration, water loss, microbial activity, tissue integrity, maturity, temperature, humidity, handling and storage conditions.",
  fieldNote: "PQNK field experience may report improved keeping quality in some crops, but comparative shelf-life claims require controlled comparison.",
  chain: ["Harvest", "Storage Under Defined Conditions", "Periodic Measurement", "Weight Loss / Firmness / Visual Deterioration / Spoilage", "Comparative Shelf-Life Result"],
  guardrail: "PQNK does not claim universally longer shelf life.",
};

export const residues = {
  title: "Chemical Residues — Separate From Nutrition",
  statement: "Nutritional quality is not the same thing as residue status.",
  bodyOne: "A food can have strong nutritional composition while still containing an undesirable pesticide residue.",
  bodyTwo: "Absence of detectable pesticide residues does not itself prove superior nutritional composition.",
  analyticalNote: "Residue status must be established analytically, with the test method and detection limits identified.",
  wordingGuidance: "Rather than an absolute zero claim such as \"chemical free,\" the appropriate phrasing is \"not detected under the analytical method and detection limit used.\"",
};

export const aflatoxin = {
  title: "Food Safety and Aflatoxin",
  factors: ["fungal contamination", "crop condition", "moisture", "temperature", "harvesting", "drying", "storage"],
  body: "Aflatoxin occurrence can depend on multiple factors.",
  guardrails: ["PQNK does not prevent aflatoxin.", "PQNK food is not claimed to be incapable of containing aflatoxin."],
  labStatement: "If lower aflatoxin is claimed for a defined PQNK sample, it must be established by laboratory analysis.",
  finalNote: "Food safety is not inferred solely from the production-system label.",
};

export const densityVsDiversity = {
  title: "Nutrient Density Versus Nutrient Diversity",
  density: { name: "Nutrient Density", body: "How much of specified nutrients occurs in a defined amount of food." },
  diversity: { name: "Nutrient Diversity", body: "How broad the range of relevant nutrients/compounds is." },
  body: "A food can be concentrated in one nutrient without necessarily having broad nutrient diversity.",
  guardrail: "Neither is inferred solely from appearance.",
};

export const maturity = {
  title: "Biological and Physiological Maturity",
  body: "Food harvested at different physiological stages can differ in composition, moisture, flavour, texture, storage behaviour and processing performance.",
  statement: "Food quality depends not only on how a crop grows but also on when and how it is harvested.",
  guardrail: "Later harvest is not always better — crop-specific appropriate maturity is the governing concept.",
};

export const foodQualityChain = {
  title: "The Complete PQNK Food-Quality Chain",
  chain: [
    "Living Soil",
    "Functional Soil Biology",
    "Nutrient Transformation",
    "Root Acquisition",
    "Soil Moisture + Aeration",
    "Photosynthesis",
    "Balanced Plant Physiology",
    "Crop Protection / Biological Regulation",
    "Reproductive Development",
    "Produce Formation",
    "Physiological Maturity",
    "Harvest & Handling",
    "Food Quality",
  ],
  evidenceChain: ["Measure", "Compare", "Validate"],
};

export const validationLevels = {
  title: "PQNK Validation — Where Observation Becomes Evidence",
  levels: [
    { name: "Level 1 — Observable Produce Characteristics", items: ["colour and shine", "aroma", "texture", "grain filling", "physical integrity", "visible deterioration"] },
    { name: "Level 2 — Measurable Performance", items: ["unit weight", "shelf life", "weight loss", "milling recovery", "broken grain", "processing behaviour", "crop-specific physical measurements"] },
    { name: "Level 3 — Laboratory Evidence", items: ["nutrient composition", "relevant phytochemical analysis where justified", "pesticide residues", "contaminants", "aflatoxin or other relevant food-safety parameters"] },
  ],
  guardrail: "Level 1 observations do not prove Level 3 nutritional outcomes.",
  linkLabel: "Continue with PQNK Validation",
  linkHref: "/validation",
};

export const compareLikeWithLike = {
  title: "Compare Like With Like",
  chain: ["Same Crop", "Same Variety / Hybrid", "Comparable Physiological Maturity", "Comparable Harvest Period", "Comparable Post-Harvest Handling", "Defined Sampling", "Appropriate Analytical Method"],
  body: "Otherwise, differences may arise from genetics, maturity, environment, storage, handling or sampling rather than production system alone.",
};

export const evidenceHierarchy = {
  title: "Science, Field Observation and Validation",
  levels: [
    { name: "Science", body: "Explains biological mechanisms through which soil condition, nutrient acquisition, water, photosynthesis, biodiversity and plant physiology can influence produce formation." },
    { name: "Field Observation", body: "Documents characteristics observed under PQNK production that merit measurement and investigation." },
    { name: "Validation", body: "Measures whether defined differences actually exist in a defined sample using appropriate methods." },
  ],
  statement: "Biological mechanism explains possibility. Field observation identifies the outcome worth investigating. Measurement establishes the evidence. PQNK Validation authenticates the measured result.",
};

export interface HabitatPrinciple {
  name: string;
  body: string;
}

export const habitatPrinciples: HabitatPrinciple[] = [
  { name: "No Soil Disturbance", body: "Protects the pore architecture and biological continuity that support nutrient acquisition." },
  { name: "No Inundation", body: "Maintains the aerated root environment required for balanced physiological function." },
  { name: "Permanent Biological Cover", body: "Feeds decomposition and continuous nutrient cycling into the root zone." },
  { name: "Maximum Biodiversity", body: "Broadens the biological pathways through which nutrients reach the developing produce." },
];

export const principlesGuardrail = "Following the four principles does not automatically guarantee superior nutritional composition.";

export const finalProposition = {
  statement: "PQNK does not define food quality by yield, appearance or a production label alone. Food quality is the measurable biological outcome of how the plant was grown, how the produce developed, and what the harvested food actually contains.",
  lines: ["The production system creates the conditions.", "The plant produces the food.", "Measurement reveals its quality.", "Validation establishes the evidence."],
};

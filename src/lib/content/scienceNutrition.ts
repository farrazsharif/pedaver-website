/**
 * Content for /science/nutrition, the sixth Science detail page (after
 * /science/transition, /science/soil, /science/plants, /science/water and
 * /science/biodiversity), completing the first production-function layer
 * built on top of the four foundational components.
 */

export const hero = {
  eyebrow: "PQNK Science · Nutrition",
  title: "Nutrition — From Mineral Presence to Biological Availability",
  body: [
    "Agriculture commonly equates plant nutrition with fertilizer application: identify a deficiency, apply the corresponding product, repeat on a schedule.",
    "PQNK draws a sharper distinction. Plant nutrition is the full biological process through which nutrients become present, accessible, transported, absorbed and metabolically useful. Fertilizer is only one possible external means of supplying selected nutrients within that larger process.",
  ],
  callout:
    "Plants do not need fertilizer; plants need nutrients. Fertilizer is one way of supplying selected nutrients when the biological system is unable to make them sufficiently available. PQNK seeks to restore the biological system itself.",
};

export const biologicalProcess = {
  title: "Plant Nutrition Is a Biological Process",
  body: [
    "Plant nutrition is not a delivery event. It is a continuous biological process spanning mineral presence in the soil, biological transformation, transport through water, root absorption, internal transport, and metabolic use within the plant.",
    "Fertilizer application is one intervention within that process — a way of supplying selected nutrients externally. It is not a substitute for the process itself.",
  ],
};

export const presenceVsAvailability = {
  title: "Nutrient Presence Is Not Nutrient Availability",
  intro: "A mineral may exist in geological soil yet remain biologically inaccessible to the plant.",
  factors: [
    "mineral surfaces",
    "soil water",
    "pore architecture",
    "oxygen",
    "roots",
    "root exudates",
    "microorganisms",
    "fungi",
    "mycorrhizal relationships",
    "decomposition",
    "rhizosphere chemistry",
    "plant physiological demand",
  ],
  statement: "A nutrient can be present geologically but unavailable biologically.",
};

export const mineralReservoir = {
  title: "Soil Is a Mineral Reservoir, Not an Empty Container",
  body: "Geological soil contains mineral reserves. Soil is not a simple empty nutrient container requiring permanent refilling — but nutrients do leave the field in harvested produce, and reserves are not infinite in every location.",
  statement: "The challenge is often access, not merely total quantity.",
  restoreList: ["roots", "microorganisms", "fungal networks", "water movement", "soil architecture", "biological cycling"],
  objective: "PQNK seeks to restore these so that geological reserves can become part of the plant's working environment.",
};

export const mineralFunction = {
  title: "Minerals Are a Small Fraction of Plant Mass but a Large Part of Plant Function",
  body: "Consistent with PQNK Plant Science, most plant mass is built largely from carbon, hydrogen and oxygen, with nitrogen also important and ultimately linked to atmospheric reservoirs through transformation pathways. Mineral elements represent a relatively small fraction of total plant mass but perform critical metabolic functions.",
  linkLabel: "Continue with Plant Science",
  linkHref: "/science/plants",
};

export const rootsAcquisition = {
  title: "Roots Are Active Nutrient-Acquisition Organs",
  intro: "The plant does not simply eat fertilizer placed in the soil. Roots actively explore soil, grow toward resources, branch, contact mineral surfaces, alter the rhizosphere, release exudates and form biological associations.",
  statement: "Root architecture determines how much of the soil's nutrient reservoir becomes part of the plant's working environment.",
  restrictionNote: "Restricted roots mean reduced nutrient access — a consequence of compaction, hardpan, poor aeration, inundation or damaged soil structure, not only of low fertilizer supply.",
};

export const rhizosphereExchange = {
  title: "The Rhizosphere Is the Nutrient-Exchange Zone",
  intro: "Nutrient acquisition is not a simple one-way path from soil to root.",
  simplePath: "Soil → Root",
  actualPath: "Soil ↔ Biology ↔ Root ↔ Plant",
  participants: ["roots", "microorganisms", "fungi", "water", "gases", "mineral surfaces", "organic compounds", "exudates"],
};

export const plantsFeedBiology = {
  title: "Plants Feed the Biology That Helps Feed the Plant",
  loop: ["Sunlight", "Photosynthesis", "Plant Carbon", "Roots / Root Exudates", "Soil Biology", "Nutrient Cycling", "Plant Nutrition"],
  loopClosingLabel: "More Photosynthesis",
  reciprocalLines: ["Plant feeds biology.", "Biology helps cycle nutrients.", "Nutrients support plant.", "Plant captures more carbon."],
};

export const microbialTransformation = {
  title: "Microorganisms Transform Nutrients",
  intro: "Microorganisms participate in decomposition, nitrogen transformation, phosphorus-related transformations, sulfur cycling, mineral interactions, organic-matter decomposition, aggregation and other nutrient-cycling processes.",
  damageHeading: "Soil Biology Can Be Damaged When the Habitat Is Repeatedly Exposed to Agrochemical Stress",
  damageIntro: "Routine or repeated agrochemical use can alter microbial community composition, population abundance, enzyme activity, root–microbe relationships, fungal continuity, decomposition pathways, rhizosphere processes and the biological cycling of nutrients.",
  weedicideHeading: "Weedicides and Herbicides Deserve Particular Attention",
  weedicideIntro: "Weedicide use can affect the nutrient-cycling system through more than the simple removal of visible weeds.",
  pathways: [
    "Direct effects on susceptible non-target microorganisms or biological processes, depending on chemistry, dose, formulation, soil conditions and exposure.",
    "Indirect effects through removal of living plants and roots that were supplying root exudates, carbon, habitat, rhizosphere activity and biological diversity.",
    "Reduction of continuous biological occupation of the soil surface.",
    "Reduction of root diversity and therefore rhizosphere diversity.",
    "Changes in the quantity and quality of residues entering decomposition pathways.",
    "Disturbance of food-web relationships above and below ground.",
    "Potential disruption of fungal and microbial relationships that contribute to nutrient cycling.",
  ],
  variabilityNote: "Effects vary according to active ingredient, formulation, dose, frequency, soil type, organic matter, moisture, temperature, microbial community, crop and duration of exposure.",
  formulation: "Repeated agrochemical dependence can simplify or disrupt the biological habitat and relationships upon which nutrient cycling depends.",
  whyWeedsHeading: "Why Weedicides Matter Especially in PQNK's System View",
  whyWeedsBody: "Weeds and spontaneous vegetation are themselves part of biological occupation. When herbicide removes living vegetation, it can simultaneously remove photosynthesis, living roots, root exudation, rhizosphere habitat, surface cover, biodiversity and biological succession.",
  biodiversityLinkLabel: "Continue with Biodiversity Science — Weeds as Nature's Rescue Workers",
  biodiversityLinkHref: "/science/biodiversity",
  questionContrast: {
    conventional: "What chemical controls the weed?",
    pqnk: "What biological functions disappear when that vegetation is removed?",
  },
  transitionGuardrail: "PQNK's established transition framework permits weedicide use where heavy weed pressure creates a genuine production risk during regeneration. The distinction is routine dependence versus diagnosed transitional intervention. The goal remains to restore a biological system in which dependence progressively declines.",
  closingStatement: "The objective is not: buy the right microbe. It is: restore the environment in which microbial nutrient cycling can operate.",
};

export const fungiExploration = {
  title: "Fungi Extend Nutrient Exploration",
  body: "Fungi function as biological exploration networks. Mycorrhizae receive plant-derived carbon, can increase effective exploration of soil, and can facilitate access to water and nutrients under appropriate biological conditions.",
  notInputNote: "Mycorrhizae are not a PQNK input.",
  disturbanceNote: "Repeated disturbance and unsuitable habitat can break network continuity.",
};

export const waterCarrier = {
  title: "Water Is the Carrier of Nutrition",
  body: "Minerals do not move independently of water. Nutrient movement occurs through soil solution, water transport toward roots, root absorption and plant vascular transport.",
  statement: "Water alone is not enough. Roots require water, air and biological function together.",
  linkLabel: "Continue with Water Science",
  linkHref: "/science/water",
};

export const aeration = {
  title: "Aeration Is Part of Nutrition",
  body: "Prolonged saturation changes oxygen diffusion, root respiration, microbial processes, fungal function, redox conditions and nutrient transformations.",
  principleLink: "This connects directly to No Inundation.",
  statement: "A productive soil must remain moist and aerated.",
};

export const soilStructureAccess = {
  title: "Soil Structure Determines Nutrient Access",
  factors: ["pore connectivity", "root exploration", "oxygen", "water movement", "microbial habitat", "fungal continuity"],
  statement: "Physical degradation can generate nutritional limitation even when laboratory nutrient analysis appears adequate.",
};

export const decompositionRecycling = {
  title: "Decomposition Returns Nutrients to the Biological Cycle",
  chain: ["Plant", "Roots / Residues", "Decomposers", "Nutrient Cycling", "Soil–Root System", "Next Plant"],
  caution: "Decomposition does not create nutrients from nothing. It retains and recycles what is already within the system.",
};

export const rootRetentionNutrition = {
  title: "Roots Retain Nutrients Within the System",
  intro: "Root retention functions as both physical inheritance and nutritional inheritance.",
  physical: "Root channels remain as architecture for the next crop.",
  nutritional: "Roots contain carbon, nitrogen and minerals already incorporated into plant tissue.",
};

export const nitrogen = {
  title: "Nitrogen Is Different From Geological Minerals",
  body: "The atmosphere is the ultimate nitrogen reservoir. Most plants cannot directly use atmospheric molecular nitrogen. Biological nitrogen fixation and subsequent transformations create plant-available forms.",
  statement: "The atmosphere is the ultimate nitrogen reservoir; biology provides pathways through which atmospheric nitrogen enters the soil–plant nutrient cycle.",
  caveat: "Not every PQNK field immediately supplies all crop nitrogen biologically.",
};

export const biodiversityPathways = {
  title: "Biodiversity Broadens Nutrient Pathways",
  body: "Different plants, roots, microorganisms, fungi, residues and rhizospheres create different nutrient pathways. Maximum Biodiversity therefore broadens the biological network available for nutrient acquisition.",
  linkLabel: "Continue with Biodiversity Science",
  linkHref: "/science/biodiversity",
};

export const proportionAndDemand = {
  title: "Proportion Matters, and Plant Demand Is Dynamic",
  proportionIntro: "More nutrients does not automatically mean better nutrition, and PQNK does not invent a fixed \"balanced nutrient ratio.\"",
  approvedFormulation: "PQNK seeks to restore a biologically mediated environment in which a diverse range of nutrients can become available in proportions responsive to plant physiological demand.",
  demandIntro: "That demand changes through development:",
  demandStages: ["vegetative growth", "root development", "flowering", "fruiting", "grain filling", "seed formation", "stress", "maturity", "environmental change"],
  demandNote: "Biological systems do not perfectly supply every nutrient at every moment. The point is adaptive access, not perfection.",
};

export const deficiencySymptom = {
  title: "Nutritional Deficiency Is a Symptom — Not Automatically a Fertilizer Prescription",
  intro: "When deficiency is observed, the Production Manager investigates possible causes before prescribing a response.",
  causes: ["actual nutrient shortage", "restricted roots", "waterlogging", "dryness", "poor aeration", "weak biology", "incomplete cover-crop transition", "limited rooting volume", "environmental stress"],
  sequence: [
    { label: "Observation", body: "A visible symptom is noticed." },
    { label: "Investigation", body: "Root-zone and field conditions are examined." },
    { label: "Diagnosis", body: "The underlying cause is identified." },
    { label: "Management Decision", body: "Action follows only once the diagnosis confirms the need." },
  ],
};

export const substitutionVsSupplementation = {
  title: "Supplementation Is Different From Substitution",
  substitution: { name: "Substitution", body: "External fertilizer routinely performs a nutrient-cycling function that the degraded system cannot perform biologically." },
  supplementation: { name: "Supplementation", body: "A limited external application temporarily supports a recovering biological system where diagnosed deficiency appears." },
  question: "Is the intervention supporting recovery, or replacing the system again?",
};

export const transitionalNP = {
  title: "Transitional NP Supplementation",
  points: [
    "Supplementation is conditional.",
    "Diagnosis comes first.",
    "It is not routine.",
    "It provides regenerative-phase support where visible deficiency genuinely appears.",
    "Properly completed transition steps, especially biological cover and root establishment, often reduce or avoid deficiency.",
  ],
  scopeNote: "Detailed dose and application-count guidance belongs to Resources and Advisory, not this Science page.",
};

export const withdrawalGuardrail = {
  title: "Fertilizer Withdrawal Is Not the Objective",
  body: "Stopping fertilizer without restoring soil structure, roots, water, biology and cover does not restore nutrition.",
  objective: "The objective is biological nutrient-acquisition function.",
  statement: "Fertilizer dependence should decline because biological function is returning.",
};

export const photosynthesisReprise = {
  title: "Nutrition Begins With Photosynthesis",
  body: "The reciprocal loop above begins with sunlight: photosynthesis supplies the plant carbon that feeds root exudation and soil biology, which in turn cycles the nutrients the plant depends on.",
  linkLabel: "Continue with Plant Science",
  linkHref: "/science/plants",
};

export const fourComponentConvergence = {
  title: "Nutrition Connects Soil, Plants, Water and Biodiversity",
  components: [
    { name: "Soil", body: "Provides habitat and mineral reserves." },
    { name: "Plants", body: "Provide roots, demand and photosynthetic carbon." },
    { name: "Water", body: "Carries nutrients and supports biological processes." },
    { name: "Biodiversity", body: "Provides multiple transformation and acquisition pathways." },
  ],
  statement: "Plant nutrition is an emergent function of the living production system.",
};

export const acquisitionToMetabolism = {
  title: "From Nutrient Acquisition to Plant Metabolism",
  body: "Nutrients support enzymes, pigments, proteins, membranes, energy transfer, structural tissues and many other biochemical functions.",
  caution: "Yield alone does not equate to complete nutrition.",
};

export const plantManufacturesFood = {
  title: "The Plant Manufactures Food — Fertilizer Does Not",
  body: "Fertilizer may supply selected mineral elements. The plant manufactures carbohydrates, proteins, oils, vitamins, pigments, phenolics, aromatic compounds and other metabolites.",
  environment: "Sunlight + Carbon + Water + Oxygen + Nutrient Elements + Biological Function",
};

export const densityDiversity = {
  title: "Nutrient Density and Nutrient Diversity",
  density: { name: "Nutrient density", body: "The concentration of particular nutritionally relevant constituents." },
  diversity: { name: "Nutrient diversity", body: "The breadth and composition of nutrients and biologically important compounds." },
  caution: "PQNK does not automatically claim superiority on either measure.",
};

export const nutritionCausalChain = {
  title: "The Nutrition Causal Chain",
  chain: [
    "Living Soil",
    "Root Exploration",
    "Microbial & Fungal Activity",
    "Biological Nutrient Cycling",
    "Water-Mediated Transport",
    "Diverse & Proportionate Nutrient Availability",
    "Plant Physiological Regulation",
    "Complete Plant Metabolism",
    "Complex Biochemical Composition",
    "Nutrient-Dense & Diverse Produce",
  ],
  evidenceChain: ["Science", "Evidence", "Validation"],
  boundaryNote: "This is a biological hypothesis and mechanism leading toward a measurable outcome — not an automatically proven result in every case.",
};

export const scienceEvidenceValidation = {
  title: "Science Explains; Measurement Proves",
  lines: ["Science explains the mechanism.", "Evidence demonstrates the field outcome.", "PQNK Validation measures the produce."],
  linkLabel: "PQNK Validation",
  linkHref: "/validation",
};

export const sensoryOutcomes = {
  title: "Taste, Aroma, Colour and Shelf Life Are Biological Outcomes Too",
  compounds: ["sugars", "organic acids", "oils", "pigments", "volatile compounds", "cell-wall structure", "water relations", "secondary metabolites"],
  boundary: "Mechanism can be explained. Observations can be documented. Specific superiority must be measured and validated.",
  scopeNote: "A dedicated Food Quality Science page will develop this topic more fully.",
};

export const nutritionAndHealth = {
  title: "Nutrition and Plant Health Are Connected",
  connections: ["growth", "tissue development", "root function", "flowering", "reproduction", "structural integrity", "physiological resilience", "pest/pathogen interactions"],
  caution: "More fertilizer does not automatically create healthier plants.",
  framing: { functional: "Functional Nutrition", loading: "Maximum Nutrient Loading" },
};

export const nutritionAndCropProtection = {
  title: "Nutrition and Crop Protection Interact",
  statement: "A physiologically well-supported plant is one component of a biologically regulated production system.",
  caution: "Balanced nutrition does not prevent every pest or disease.",
};

export const nutritionAndWater = {
  title: "Nutrition and Water Cannot Be Separated",
  factors: ["water transport", "oxygen requirement", "evaporative demand", "root exploration", "nutrient movement"],
  linkLabel: "Continue with Water Science",
  linkHref: "/science/water",
};

export const nutritionAndBiodiversity = {
  title: "Nutrition and Biodiversity Cannot Be Separated",
  body: "Different functional pathways created by biological diversity determine how broadly a field can acquire and cycle nutrients.",
  linkLabel: "Continue with Biodiversity Science",
  linkHref: "/science/biodiversity",
};

export interface HabitatPrinciple {
  name: string;
  body: string;
}

export const habitatPrinciples: HabitatPrinciple[] = [
  { name: "No Soil Disturbance", body: "Protects pore continuity, aggregates and the fungal networks nutrient cycling depends on." },
  { name: "No Inundation", body: "Maintains the water–air relationship required for aerobic nutrient transformation." },
  { name: "Permanent Biological Cover", body: "Feeds decomposition and continuously supplies organic material to the nutrient cycle." },
  { name: "Maximum Biodiversity", body: "Broadens the biological pathways through which nutrients are transformed and accessed." },
];

export const scienceApplication = {
  science: "Nutrient presence does not equal accessibility. Roots, microorganisms, fungi and water together determine what a plant can actually acquire. Nutrient availability must remain proportionate to physiological demand.",
  application: "Local variation includes crop demand, soil mineral reserves, climate, root architecture, transition state, water quality, crop stage and field conditions.",
  closing: "Science is universal. Application is local.",
};

export const productionManagerWatches = {
  title: "What the Production Manager Watches",
  observations: ["root development", "leaf colour", "canopy growth", "flowering", "grain/fruit development", "tissue strength", "deficiency symptoms", "uniformity", "root-zone condition", "biological activity", "residue decomposition", "declining supplementation"],
  caution: "Observation is not diagnosis.",
};

export const functionalRecovery = {
  title: "Nutrition Recovery Is Functional, Not Calendar-Based",
  factors: ["soil architecture", "roots", "cover", "water", "biodiversity", "residue cycling", "previous degradation", "crop sequence", "climate", "management quality"],
  statement: "The calendar tells us how long the system has been managed differently. Function tells us whether biological nutrition has recovered.",
};

export const centralProposition = {
  statement: "Plants do not need fertilizer; plants need nutrients. Fertilizer is one way of supplying selected nutrients when the biological system is unable to make them sufficiently available. PQNK seeks to restore the biological system itself.",
  clarification: "This does not make nutrient inputs forbidden.",
  objective: "The objective is biological nutrient competence.",
};

export interface TransitionStage {
  name: string;
  body: string;
}

export const transitionVisual: TransitionStage[] = [
  { name: "Degraded System", body: "Routine external nutrient substitution." },
  { name: "Corrective Intervention", body: "Restore soil architecture, water, cover and roots." },
  { name: "Regenerative Phase", body: "Biological nutrient cycling strengthens, with diagnosed supplementation where genuinely required." },
  { name: "Sustained Closed Loop", body: "Increasing reliance on biological cycling, atmospheric pathways, geological reserves, residue recycling and ecosystem function." },
];

export const closedLoopNotIsolation = {
  title: "Closed Loop Does Not Mean Isolation",
  entries: ["Seed enters.", "Produce leaves.", "Water cycles.", "Atmospheric gases move.", "Minerals leave in harvested biomass."],
  statement: "Closed Loop means restored system function, not literal material isolation.",
};

export const livingNutritionLoop = {
  title: "The Living Nutrition Loop",
  steps: [
    "Sunlight",
    "Plant Carbon",
    "Roots & Exudates",
    "Soil Biology",
    "Mineral Transformation & Recycling",
    "Water-Mediated Nutrient Movement",
    "Root Uptake",
    "Plant Metabolism",
    "Biomass & Produce",
    "Roots / Residues Returned",
  ],
  closingLabel: "Soil Biology",
  statement: "Nutrition is not a pipeline from fertilizer bag to crop. It is a living cycle.",
};

export const closingProposition = {
  intro: "Conventional agriculture answered a real biological need — nutrient supply — largely by treating fertilizer as the primary mechanism, rather than one supporting tool within a living system.",
  body: [
    "Roots explore and negotiate with soil biology.",
    "Microorganisms and fungi transform and transport what roots alone cannot reach.",
    "Water carries nutrients only where soil architecture allows it to move.",
    "Biodiversity broadens the pathways available for acquisition.",
    "Photosynthesis funds the biological economy that makes all of this possible.",
  ],
  finalProposition: "Plant nutrition is not a fertilizer problem. It is a living-system function — and PQNK's objective is to restore the system that performs it.",
};

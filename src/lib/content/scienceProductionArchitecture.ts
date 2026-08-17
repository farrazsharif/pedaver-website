/**
 * Content for /science/production-architecture, the tenth and final Science
 * detail page (after /science/transition, /science/soil, /science/plants,
 * /science/water, /science/biodiversity, /science/nutrition,
 * /science/crop-protection, /science/climate and /science/food-quality).
 * This is the engineering/application page connecting all locked Science
 * pages into a permanent, physical production system.
 */

export const hero = {
  eyebrow: "PQNK Science · Production Architecture",
  title: "PQNK Production Architecture",
  subtitle: "Engineering the Field So the Living System Never Has to Be Rebuilt",
  body: [
    "Agricultural production requires machinery, movement, water delivery, planting and harvesting. That is not in question.",
    "The engineering question is where mechanical pressure should occur, and where biological continuity must be protected.",
  ],
  callout: "Separate destructive pressure from productive biology.",
};

export const twoZones = {
  protected: {
    name: "Protected Biological Production Zone",
    subtitle: "Beds",
    items: ["crops", "roots", "soil organisms", "organic mulch", "nutrient cycling", "soil pores", "water storage", "biological continuity"],
  },
  corridor: {
    name: "Permanent Traffic & Hydraulic Corridors",
    subtitle: "Furrows",
    items: ["tractor-wheel traffic", "controlled operational access", "irrigation-water delivery", "drainage where required"],
  },
};

export const diagnoseFirst = {
  title: "First Diagnose — Then Engineer",
  intro: "Production Architecture does not begin by prescribing a machinery depth. It begins with a soil pit.",
  statement: "Diagnose the restriction before prescribing the correction.",
  checklist: [
    "whether a mechanically compacted layer exists",
    "its depth",
    "its thickness",
    "whether there are multiple restrictive layers",
    "rooting depth",
    "soil structure",
    "evidence of prolonged inundation/flood-irrigation effects",
    "drainage restrictions",
  ],
  caveat: "Not every field has an identical hardpan depth.",
};

export const hardpanCorrection = {
  title: "Hardpan Correction — A Depth Refinement, Not a Number",
  chain: ["Soil Pit", "Identify Restrictive Layer", "Determine Depth + Thickness", "Set Implement Depth", "Penetrate Below Restriction", "Shatter the Layer"],
  referenceNote:
    "Under average field conditions where machinery traffic and repeated flood irrigation have produced the common restrictive layer encountered in PQNK conversion work, approximately 22 inches of penetration has generally been sufficient to pass beneath and shatter the compacted layer.",
  boundedNote: "22 inches is not a universal depth prescription. Where diagnosis indicates a deeper restrictive layer, working depth may extend toward approximately 24 inches as a safety allowance — not as a fixed depth required on every field.",
  deeperNote: "If the restrictive layer extends deeper still, the implement must penetrate sufficiently below it to achieve effective shattering. If it is shallower, unnecessary excessive depth is not the objective.",
  objectiveStatement: "The objective is not a number. The objective is to shatter the restrictive hard layer.",
  transitionNote: "This is a corrective transition operation, not recurring tillage. Once corrected and the permanent architecture is protected, routine soil disturbance must stop.",
};

export const correctOnceProtect = {
  title: "Correct Once — Protect Thereafter",
  conventional: {
    label: "Conventional Loop",
    chain: ["Traffic / Flooding", "Compaction / Structural Damage", "Tillage", "Temporary Loosening", "Traffic / Flooding Again", "Compaction Again", "More Tillage"],
  },
  pqnk: {
    label: "PQNK Transition",
    chain: ["Diagnose", "Correct Restrictive Layer", "Build Permanent Architecture", "Control Traffic", "Protect Soil", "Retain Roots", "Maintain Cover", "Produce Crop After Crop"],
  },
  statement: "The purpose of engineering is to end the rebuild-destroy-rebuild cycle.",
};

export const bedGeometry = {
  title: "Permanent Raised-Bed Architecture",
  intro: "The repeating profile reads: 42-inch bed, 18-inch furrow, 42-inch bed, 18-inch furrow, 42-inch bed.",
  dims: [
    { label: "Bed top", value: "42 inches" },
    { label: "Furrow top", value: "18 inches" },
    { label: "Furrow bottom", value: "approximately 8 inches" },
    { label: "Furrow depth", value: "approximately 8 inches" },
  ],
  centralNote: "The central area between two tractor-wheel furrows is a 42-inch bed — not an 18-inch strip.",
};

export const adaptiveDimensions = {
  title: "Dimensions Are a Reference Architecture — Not a Universal Law",
  intro: "The standard architecture was developed around commonly used tractors of approximately 55–75 HP, two-wheel-drive, with roughly a 60-inch rear wheel-centre spacing and approximately 13-inch tyre width.",
  purpose: "This geometry allows tractor tyres to remain in the permanent furrows while the biological bed remains protected.",
  guardrail: "42 inches and 18 inches are not universal dimensions for every machine or region. For tractors with different wheel tracks, tyre widths, implements or cropping requirements, bed and furrow dimensions must be recalculated.",
  governingPrinciple: "Tractor tyres must travel in the permanent traffic corridors — not across the protected biological bed.",
  closing: "Biological protection is the constant. Dimensions are adapted to achieve it.",
};

export const controlledTraffic = {
  title: "Controlled Traffic",
  intro: "Repeated tyre pressure across cropping soil can compress pores, reduce infiltration, restrict oxygen movement, impede rooting, alter water movement, damage aggregates and reduce habitat continuity.",
  mapping: { tyres: "Tractor tyres → Furrows", biology: "Biology → Beds" },
  continuityNote: "Once permanent lanes are established, machinery returns to the same corridors operation after operation.",
  statement: "The tractor is not the problem. Uncontrolled tractor traffic is the problem.",
};

export const furrowsNotWasted = {
  title: "Furrows Are Not Wasted Land",
  intro: "A conventional interpretation may see furrows merely as unplanted space. PQNK treats them as infrastructure.",
  functions: ["traffic corridor", "irrigation-water delivery corridor", "hydraulic interface with the bed", "drainage pathway where appropriate", "machinery guidance corridor", "separation between mechanical pressure and biological production"],
  statement: "The furrow is part of the production system. It protects the productivity of the bed.",
};

export const waterWithoutInundation = {
  title: "Water Delivery Without Inundation",
  intro: "Water is supplied through the furrows. It must not flood across the bed.",
  pathways: ["infiltration", "capillary pathways", "pore networks", "root channels", "biologically developed structure"],
  objective: { moist: "Moist + aerated soil", not: "Saturated / inundated soil" },
  ballTest: "The soil ball test is the operational field diagnostic: take a handful of soil from the root zone — if it forms a cohesive ball, moisture is sufficient; if it crumbles, external water may be needed.",
  applicationNote: "Where appropriate, irrigation may be applied slowly to approximately half furrow height rather than flooding the beds — soil condition determines the irrigation decision, not a universal fixed prescription.",
  linkLabel: "Continue with Water Science",
  linkHref: "/science/water",
};

export const waterWashTransition = {
  title: "Water Wash During Transition",
  body: "Where inherited salinity, accumulated salts or previous chemical management require correction, PQNK conversion includes a water-wash step. Where soil pH exceeds approximately 8, sulfuric acid has historically been used at approximately 8 kg per acre, added with that same water wash.",
  guardrails: ["This is a transition practice, not a recurring production input.", "It is context-dependent, applied only where field diagnosis indicates the need — not a universal prescription for every field."],
};

export const establishCover = {
  title: "Establish Biological Cover",
  body: "After the physical architecture is established, biological protection begins — typically with a cover crop such as Jantar (Sesbania) or another suitable species.",
  purposeIntro: "The purpose is not merely to grow biomass. The cover crop helps:",
  purposes: ["establish roots", "occupy biological space", "create channels", "support microorganisms", "protect soil from solar heating", "reduce direct evaporation", "build organic surface cover"],
  terminationNote: { roots: "Roots stay in the soil.", top: "Top growth becomes mulch." },
  guardrail: "The biological structure that has just been created is not uprooted.",
};

export const retainRootsmulch = {
  title: "Retain Roots — Mulch the Top",
  below: { label: "Below ground", body: "roots, root channels, exudate pathways, microbial associations" },
  above: { label: "Above ground", body: "crop residue that becomes protective organic cover" },
  statement: "PQNK harvest removes the economic product while preserving as much biological infrastructure as possible. The next crop inherits the architecture of the previous crop.",
  contrastNote: "This is a fundamental contrast with repeated tillage.",
};

export const precisionPlanting = {
  title: "Plant Without Rebuilding the Seedbed",
  intro: "Precision no-till planting machinery creates only the minimum opening necessary to place seed correctly through mulch, while preserving surrounding soil architecture.",
  contrast: { whole: "Whole-Field Disturbance", precision: "Precision Seed Insertion" },
  machines: [
    { name: "SIPP", full: "Slit Insertion Precision Planter", body: "Cuts a discrete, roughly 2\"×2\" pocket per seed through the mulch layer." },
    { name: "VIPP", full: "Vertical Insertion Precision Planter", body: "Presses seed straight down through mulch and soil at a single point, a vertical alternative to SIPP's slit." },
  ],
  closing: "The planter's job is not to cultivate the whole bed. This distinction is central to PQNK engineering.",
};

export const harvestWithoutResetting = {
  title: "Harvest Without Resetting the System",
  intro: "Harvest is not the end of the production architecture. After harvest:",
  remains: ["permanent beds remain", "furrows remain", "roots remain", "residue remains or is appropriately managed as mulch", "controlled traffic remains", "soil structure remains", "biological continuity remains"],
  closing: "The next crop is planted into the same protected architecture — crop after crop, and where agronomically appropriate, crop-in-crop, without rebuilding the soil each season.",
};

export interface HabitatPrinciple {
  name: string;
  engineeringOutcome: string;
}

export const principlesConverge: HabitatPrinciple[] = [
  { name: "No Soil Disturbance", engineeringOutcome: "Permanent beds + precision planting." },
  { name: "No Inundation", engineeringOutcome: "Furrow water delivery + Soil Moisture Management." },
  { name: "Permanent Biological Cover", engineeringOutcome: "Retained residues + mulch + living roots." },
  { name: "Maximum Biodiversity", engineeringOutcome: "Habitat continuity above and below ground." },
];

export const convergenceFormula = {
  parts: ["Physical Architecture", "Biological Continuity", "Water Management", "Controlled Traffic"],
  result: "Functional Production Ecosystem",
};

export const whyPermanence = {
  title: "Why Permanence Matters",
  intro: "Biology needs continuity. Repeated reconstruction interrupts:",
  interruptions: ["fungal networks", "root channels", "aggregates", "microbial habitats", "pore continuity", "residue decomposition pathways", "predator/prey relationships"],
  statement: "PQNK does not rebuild the field for every crop. It builds the field so successive crops can inherit an increasingly functional biological system.",
};

export const machinerySubordinate = {
  title: "Machinery Becomes Subordinate to Biology",
  contrast: { industrial: "Industrial production often shapes soil around machinery.", pqnk: "PQNK shapes machinery operations around the biological architecture." },
  body: "Machinery remains necessary. But machinery becomes a precision servant of the system.",
  examples: ["tractor tyres stay in corridors", "the planter disturbs only the seed-placement zone", "the mulcher manages residue without tillage", "the harvester removes product without destroying beds", "irrigation travels through designed hydraulic corridors"],
};

export const operatorDiscipline = {
  title: "Operator Discipline",
  intro: "Architecture alone cannot protect the system if operators ignore it.",
  responsibilities: ["permanent wheel lanes", "correct tractor alignment", "planter alignment", "hydraulic depth control", "avoiding unnecessary steering across beds", "residue handling", "maintaining permanent geometry"],
  terminology: "PQNK Production Architecture describes this responsibility directly: the operator is the gunman.",
  explanation: "Precision machinery achieves nothing on its own. Its value is realized only through the precision of the person operating it — the same engineered geometry can be protected or destroyed depending on whether the operator holds the line, pass after pass.",
};

export const productionManager = {
  title: "The Production Manager",
  intro: "The Production Manager's role changes from repeatedly manipulating soil to managing system conditions.",
  observes: ["soil moisture", "crop condition", "residue cover", "traffic discipline", "root continuity", "weed/light relationships", "biological signals", "machinery alignment"],
  statement: "Intervention follows diagnosis rather than calendar habit.",
};

export const conversionSequence = [
  { step: "Farm Design", body: "Design fields for efficient operation and, where relevant, the longest practical runs." },
  { step: "Diagnose Hardpan", body: "Dig the soil pit and identify the restrictive layer." },
  { step: "Shatter the Restriction", body: "Set depth according to the actual soil profile — approximately 22 inches is typical under average diagnosed conditions, deeper if required." },
  { step: "Water Wash Where Required", body: "Address inherited salt/chemical conditions according to diagnosis." },
  { step: "Build Permanent Raised Beds and Furrows", body: "Separate the biological production zone from traffic and hydraulic corridors." },
  { step: "Establish Cover Crop", body: "Jantar/Sesbania or a suitable alternative." },
  { step: "Retain Roots and Mulch Tops", body: "The biological inheritance is not removed." },
  { step: "Plant Crop After Crop", body: "Preferably crop-in-crop where suitable, using precision no-till planting." },
  { step: "Manage Soil Moisture", body: "Use soil condition and the ball test; no inundation." },
  { step: "Harvest Without Disturbing the Architecture", body: "Begin the next crop in the same living system." },
];

export const transitionVsMature = {
  title: "Transition Is Different From the Mature System",
  transitionExamples: ["hardpan shattering", "water washing", "diagnosed transitional nutrient support", "limited transitional crop protection", "limited first-summer-crop weedicide use under the already-established Crop Protection conditions"],
  guardrail: "These are not presented as permanent PQNK inputs.",
  distinction: { transition: "Transition: repair inherited dysfunction.", mature: "Mature PQNK: protect biological function so repeated repair becomes unnecessary." },
};

export const waterEfficiencyLink = {
  title: "Architecture and Water Efficiency",
  mechanismChain: ["Permanent beds", "Mulch", "Root channels", "Soil pores", "Controlled traffic", "No inundation"],
  result: "Greater opportunity for infiltration and storage, while reducing unnecessary evaporative loss.",
  note: "Historical PQNK water-use observations are documented on the Water Science page; this page does not introduce new numerical claims.",
  linkLabel: "Continue with Water Science",
  linkHref: "/science/water",
};

export const soilTemperatureLink = {
  title: "Architecture and Soil Temperature",
  observation: "Under established PQNK field observations for hot summer environments where ambient temperature reaches approximately 45–50°C, exposed bare soil may exceed 70°C, while adequate mulch has produced approximately 30°C lower soil-surface temperatures relative to exposed soil under those conditions.",
  guardrail: "This is a field observation under those hot conditions, not a universal fixed temperature differential for every soil, climate, mulch depth or measurement method.",
  linkLabel: "Continue with Climate Science",
  linkHref: "/science/climate",
};

export const biodiversityLink = {
  title: "Architecture and Biodiversity",
  body: "Biodiversity cannot be ordered into existence. The architecture creates the conditions in which biological diversity can persist.",
  conditions: ["stable habitat", "retained roots", "organic cover", "reduced disturbance", "moisture", "aeration", "crop diversity", "continuous biological space"],
  linkLabel: "Continue with Biodiversity Science",
  linkHref: "/science/biodiversity",
};

export const cropProtectionLink = {
  title: "Architecture and Crop Protection",
  supports: ["balanced plant development", "biological regulation", "predator habitat", "microbial communities", "less physiologically stressed plants", "reduced conditions favouring some pest outbreaks"],
  guardrail: "Architecture does not guarantee zero pests or disease.",
  linkLabel: "Continue with Crop Protection Science",
  linkHref: "/science/crop-protection",
};

export const foodQualityLink = {
  title: "Architecture and Food Quality",
  body: "The architecture is upstream. It affects the environment in which roots, microorganisms, water and plants interact. Food-quality outcomes must still be measured.",
  hierarchy: ["Biological mechanism provides the pathway.", "Field observation provides the signal.", "Produce analysis provides the evidence.", "PQNK Validation determines the measured outcome."],
  guardrail: "Appearance, weight, shelf life or yield alone do not prove nutritional superiority.",
  linkLabel: "Continue with Food Quality Science",
  linkHref: "/science/food-quality",
};

export const climateFunctionLink = {
  title: "Architecture and Climate Function",
  mechanisms: ["greater biological cover", "cooler protected soil", "less unnecessary direct soil evaporation", "productive transpiration", "improved infiltration", "photosynthetic activity", "root-derived carbon pathways", "residue retention", "reduced recurring tillage", "improved soil structural continuity"],
  guardrail: "PQNK does not claim to alone control climate.",
  linkLabel: "Continue with Climate Science",
  linkHref: "/science/climate",
};

export const adaptiveEngineering = {
  title: "Adaptive Engineering",
  intro: "PQNK Production Architecture is principle-locked but dimension-adaptive.",
  fixed: ["separate traffic from biological beds", "no recurring tillage", "no inundation", "permanent cover", "biological continuity", "precision operations"],
  adaptableIntro: "Engineering dimensions may change according to:",
  adaptable: ["tractor wheel track", "tyre width", "crop", "field slope", "soil type", "irrigation infrastructure", "implement geometry", "regional farming system"],
  statement: "The geometry may change. The biological logic does not.",
};

export const whatItIsNot = {
  title: "What Production Architecture Is Not",
  items: [
    "merely raised-bed farming",
    "ordinary ridge planting",
    "seasonal bed formation",
    "controlled traffic alone",
    "no-till alone",
    "mulch alone",
    "furrow irrigation alone",
    "a fixed 42/18 prescription for every tractor",
    "a universal 22-inch subsoiling prescription",
    "abandonment of machinery",
    "abandonment of management",
  ],
  statement: "It is the integration of physical field design with the biological principles of PQNK.",
};

export const integratedSystemChain = ["Diagnose Soil", "Correct Inherited Physical Restriction", "Build Permanent Beds + Furrows", "Confine Traffic", "Manage Water Without Inundation", "Establish Roots + Cover", "Retain Residues + Biological Structure", "Precision Planting", "Crop Development", "Harvest", "Next Crop in Same Architecture"];

export const surroundingRelationships = ["Soil", "Roots", "Water", "Microorganisms", "Biodiversity", "Crop Protection", "Nutrition", "Food Quality", "Climate Function"];

export const finalProposition = {
  statement: "PQNK Production Architecture does not redesign the field for each crop. It redesigns the field once so that machinery, water and management can operate without repeatedly destroying the biological system that produces the crop.",
  lines: ["Build the architecture once.", "Protect the biology thereafter.", "Produce crop after crop."],
};

export const evidenceBoundary = {
  title: "Mechanism, Observation, Diagnosis and Validation",
  levels: [
    { name: "Mechanism", body: "What physical and biological processes explain." },
    { name: "Field Observation", body: "What has been repeatedly observed in PQNK fields." },
    { name: "Engineering Reference", body: "Dimensions or operating values derived from the established PQNK system." },
    { name: "Field Diagnosis", body: "What must be determined locally before implementation." },
    { name: "Measurement", body: "What must be quantified in the field." },
    { name: "Validation", body: "What PQNK Validation establishes through defined evidence." },
  ],
  guardrail: "Field observations are not treated as universal scientific constants.",
  linkLabel: "Continue with PQNK Validation",
  linkHref: "/validation",
};

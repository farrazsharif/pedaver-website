/**
 * Content for /science/biodiversity, the fifth and final Science detail
 * page completing the four-component foundation (after /science/transition,
 * /science/soil, /science/plants and /science/water).
 */

export const hero = {
  eyebrow: "PQNK Science · Biodiversity",
  title: "Biodiversity — The Stability Engine of the Living Production System",
  body: [
    "Agriculture commonly treats biodiversity as something adjacent to production — a conservation goal pursued around the edges of a field.",
    "PQNK treats biodiversity differently. Biological complexity is part of the production machinery itself: it distributes agricultural functions across many organisms, relationships, habitats, spatial zones and time periods.",
  ],
  callout:
    "Biodiversity is not an accessory to production. It is the biological architecture through which a living production system acquires stability, resilience and self-regulation.",
};

export const productionInfrastructure = {
  title: "Biodiversity Is Production Infrastructure",
  body: [
    "A production system built around a single crop, a single dominant organism, or a narrow set of biological relationships has few pathways available when conditions change.",
    "A biologically complex system distributes the work of production — energy capture, decomposition, nutrient cycling, pest regulation, soil construction — across many organisms rather than concentrating it in one place.",
  ],
  statement: "Biodiversity is part of the production machinery itself.",
};

export const ecosystemBeforeCrop = {
  title: "Agriculture Is an Ecosystem Before It Is a Crop",
  body: [
    "Before a crop is planted, a field is already a physical and biological environment: soil, air, water, sunlight, microorganisms and whatever vegetation is already present.",
    "Planting a crop does not remove that ecosystem. It adds one more species to it. What determines whether the field functions well is not the crop alone, but the biological relationships operating around and beneath it.",
  ],
};

export interface Zone {
  name: string;
  body: string;
}

export const threeZones = {
  title: "Diversity Exists Above and Below the Soil Surface",
  intro: "PQNK Biodiversity Science recognizes three connected biological zones.",
  zones: [
    {
      name: "Above Ground",
      body: "Crops, companion plants, flowering vegetation, insects, pollinators, herbivores, predators and other organisms.",
    },
    {
      name: "At the Soil Surface",
      body: "Mulch, crop residues, fallen leaves, decomposing biological material, insects, fungi and microorganisms.",
    },
    {
      name: "Below Ground",
      body: "Roots, root exudates, bacteria, fungi, mycorrhizae, decomposers, soil fauna and microscopic biological relationships occupying the soil pore system.",
    },
  ] as Zone[],
  exchangeNote: "These zones are not isolated ecological compartments. They continuously exchange energy, carbon, water, nutrients and biological material.",
};

export const rootDiversity = {
  title: "Plant and Root Diversity Is Biological Engineering",
  intro:
    "Different plants create different below-ground environments because they differ in root depth, root diameter, root density, root architecture, growth period, root exudates, nutrient demand and biological associations.",
  proposition: "Plant diversity is also rhizosphere diversity.",
  rootTypes: [
    { name: "Fine roots", body: "Explore fine pore spaces and the immediate soil-microbe interface." },
    { name: "Deep roots", body: "Penetrate below the surface zone and access deeper moisture and mineral reserves." },
    { name: "Taproots", body: "Drive vertically, creating a distinct large biological channel." },
    { name: "Fibrous roots", body: "Densely occupy the surface and near-surface soil volume." },
    { name: "Naturally senesced root channels", body: "Remain as biological pathways after roots die, available to the next occupant." },
  ],
  engineeringStatement: "A diverse root community does not merely occupy soil. It helps engineer it.",
  retentionNote: "This connects directly to PQNK root retention: retained roots and their channels become part of the architecture available to the next crop.",
  caveat: "Not every root can penetrate every compacted layer. Root diversity broadens the biological toolkit available to the field — it does not eliminate every physical restriction.",
};

export const microbialFungal = {
  title: "Microbial and Fungal Diversity Expand Biological Function",
  intro:
    "Biodiversity is not reducible to \"more microbes.\" What matters is different biological functions and relationships, including decomposition, nutrient transformation, nitrogen cycling, aggregation, carbon processing, mineral interactions, biological competition and root relationships.",
  proposition:
    "PQNK does not try to replace an ecosystem with a collection of biological products. It restores the conditions from which an ecosystem can rebuild.",
  mycorrhizae: {
    title: "Fungal Diversity Extends the Biological Network",
    body: "The plant supplies carbon compounds generated through photosynthesis. The fungal network can increase the effective soil volume explored by the plant and facilitate access to water and nutrients under suitable conditions.",
    notInputNote: "Mycorrhizae are not a PQNK input. They are a biological relationship that emerges when habitat is protected.",
  },
};

export const functionalRedundancy = {
  title: "Biodiversity Creates Functional Redundancy",
  body: [
    "Multiple organisms can contribute to similar ecological functions through different pathways. This does not mean every organism is interchangeable.",
    "It means a biologically diverse system can contain alternative pathways that help retain function when conditions change — reducing dependence on any single organism, and on external correction, remaining perfect at all times.",
  ],
};

export const biologicalRegulation = {
  title: "Biodiversity Is the Basis of Biological Regulation",
  contrast: {
    conventional: "Pest appears → pest is killed.",
    pqnk: "A field's predator, parasitoid, and microbial relationships regulate populations as an ongoing ecological process.",
  },
  regulatoryOrganisms: ["predatory insects", "spiders", "parasitoids", "birds", "microorganisms", "and other biological agents"],
  formulation:
    "Greater functional biodiversity can strengthen the ecological relationships that regulate pest populations and can reduce dependence on routine chemical suppression as the production system recovers.",
  insectPresenceTitle: "The Presence of an Insect Is Not Automatically Crop Failure",
  insectPresenceBody:
    "An insect observed on a crop is not automatically evidence of economic crop damage. PQNK does not seek biological emptiness.",
  decisionHierarchy: ["Presence", "Population", "Damage", "Economic significance", "Management decision"],
  transitionCaveat: "During transition, biological regulation may not yet be fully established, and intervention may still be justified when actual crop risk requires it.",
};

export const predatorHabitat = {
  title: "Predators Require Habitat Too",
  body: "Predators themselves require habitat, food and continuity. Permanent biological cover, living roots, crop diversity and reduced disturbance help maintain the habitat predators depend on.",
  statement: "Biological regulation requires biological continuity.",
  caveat: "Predator presence does not guarantee control.",
};

export const disease = {
  title: "Disease Is Also Influenced by the Biological Environment",
  intro: "Disease is an interaction among many factors, not a single cause.",
  factors: [
    "host",
    "pathogen",
    "environment",
    "plant physiological condition",
    "soil moisture",
    "temperature",
    "aeration",
    "nutrient balance",
    "biological competition/antagonism",
  ],
  boundary: "Biodiversity does not prevent all disease. The biological environment changes the ecological context in which disease develops.",
};

export const weeds = {
  heading: "Weeds Are Nature's Rescue Workers",
  intro: "Agriculture commonly sees weeds only as competitors. PQNK asks a different question first.",
  question: "Why is that particular plant appearing there?",
  body: "Disturbed, exposed, compacted, overheated or biologically weakened landscapes tend to be recolonized by spontaneous vegetation. From the PQNK perspective, weeds may therefore function as nature's rescue workers.",
  narrowLeaf: {
    title: "Narrow-Leaf Rescue Workers — Opening the Soil",
    body: "Grasses and other narrow-leaf plants commonly develop dense fibrous root systems.",
    functions: ["occupying compacted surface zones", "creating numerous small biological channels", "root-derived organic inputs", "rhizosphere activity", "soil aggregation", "progressive pore development"],
  },
  broadleaf: {
    title: "Broadleaf Rescue Workers — Protecting the Surface",
    body: "Broadleaf plants can rapidly create canopy and shading.",
    functions: ["intercepting solar radiation", "reducing direct heating of exposed soil", "reducing wind exposure", "protecting biological activity", "providing biomass"],
  },
  keyFormulation: "Narrow-leaf rescue workers can contribute to reopening damaged soil architecture; broadleaf rescue workers can contribute to shielding exposed soil from radiation.",
  guardrail: "It does not mean that every weed must remain uncontrolled indefinitely.",
  managementNote: "Management can be necessary when weeds threaten crop establishment, harvestability, or create unacceptable competition.",
  messageNote: "Understand the biological message before automatically destroying the messenger.",
  scopeCaveat: "This is not a claim that every weed species precisely diagnoses one specific soil defect.",
};

export const bareSoil = {
  title: "Bare Soil Is an Empty Biological Opportunity",
  body: "Bare soil is not a neutral condition. It exposes the surface to solar radiation, heating, evaporation, wind and biological habitat loss.",
  occupationNote: "Spontaneous vegetation represents biological occupation of available space. PQNK intentionally maintains soil cover through crops, crop residues, organic mulch and, where appropriate, managed spontaneous vegetation.",
  objective: "The objective is larger than conventional weed control: continuous biological occupation of the soil surface.",
};

export const diversityThroughTime = {
  title: "Diversity Through Time — Crop-After-Crop and Crop-in-Crop",
  intro: "Biodiversity is diversity through time as well as space.",
  sequence: ["Crop", "Crop", "Crop"],
  cropInCropNote: "Where agronomically appropriate, Crop-in-Crop arrangements can further reduce biological interruption between production cycles.",
  continuityBody: "Continuous production sequences can maintain living roots, rhizosphere activity, carbon flow, biological habitat, surface protection and functional diversity across seasons.",
  inheritance: {
    title: "Crop-After-Crop Is More Than Rotation",
    body: "The previous crop leaves roots, root channels, residues, microbial associations, modified soil architecture and organic material. Under PQNK, the next crop should inherit rather than erase this biological infrastructure.",
    statement: "Crop-after-crop is not merely succession in time. It is biological inheritance.",
    disturbanceLink: "This connects directly with No Soil Disturbance.",
  },
  cropInCropCaveat: "Crop-in-Crop is not mandatory everywhere. Species, spacing, timing and combinations remain local field adaptations.",
};

export const decomposition = {
  title: "Biodiversity Drives Decomposition and Recycling",
  body: "Roots, leaves, stems, residues, mulch and dead organisms enter biological decomposition pathways rather than simply becoming waste. Different organisms act at different stages of that process.",
  distinction: "Residue retention alone is not equivalent to residue functioning inside an active decomposer food web.",
};

export const soilArchitecture = {
  title: "Biodiversity Helps Build Soil Architecture",
  body: "Biological construction of soil architecture proceeds through roots, fungal hyphae, microbial aggregation processes, soil fauna, organic residues and successive root channels.",
  connectedTo: ["infiltration", "aeration", "water storage", "root penetration", "biological habitat", "structural resilience"],
  feedbackLoop: ["Better habitat", "Greater biological activity", "Improved architecture", "Better habitat"],
};

export const waterRelationship = {
  title: "Biodiversity and Water Are Interdependent",
  body: "Water enables biology. Biology changes water behavior. Roots create channels, aggregates create pore networks, organic material alters surface conditions, mulch restricts unnecessary evaporative loss, living cover reduces direct radiation, and biological architecture affects infiltration, storage, aeration and movement.",
  statement: "Water does not move through an empty container. It moves through biological architecture.",
  linkLabel: "Continue with Water Science",
  linkHref: "/science/water",
};

export const microclimate = {
  title: "Biodiversity Helps Moderate the Field Microclimate",
  intro: "Plant canopy, mulch, shade, transpiration, different canopy heights, light, temperature, humidity and air movement all shape field-scale conditions.",
  boundary: "Biological cover and plant architecture alter the field-scale energy and water environment, which forms one component of the wider land–atmosphere system.",
  scopeNote: "The broader climate mechanism belongs to a future Climate Science page. Biodiversity does not alone control regional weather.",
};

export const nutrientAcquisition = {
  title: "Biodiversity Expands Nutrient-Acquisition Pathways",
  intro: "Nutrient presence does not equal nutrient accessibility.",
  pathways: [
    "different root architectures",
    "different soil exploration volumes",
    "root exudates",
    "rhizosphere organisms",
    "mycorrhizal associations",
    "microbial transformations",
    "decomposition",
    "soil mineral reserves",
    "organic cycling",
    "water movement",
    "plant physiological demand",
  ],
  objective: "PQNK seeks a complex nutrient-acquisition network rather than dependence primarily on repeated direct delivery of soluble fertilizer.",
  caveat: "This is not a fixed nutrient ratio, and it does not mean a plant simply absorbs all minerals available in the soil.",
};

export const nutrientDensityDiversity = {
  title: "Nutrient Density and Nutrient Diversity Are Different",
  intro:
    "Biologically complex soil systems can provide multiple interacting nutrient-acquisition pathways rather than a narrow externally supplied nutrient program. This may support more balanced plant nutrition through diverse roots, rhizosphere organisms, fungal associations, decomposition, soil mineral reserves, organic cycling, water movement and plant physiological demand.",
  mechanismNote: "This creates a scientifically plausible mechanism for investigating whether PQNK produce develops greater nutrient density and nutrient diversity — the outcome is not automatically claimed.",
  density: { name: "Nutrient density", body: "The concentration of nutritionally relevant constituents in harvested produce." },
  diversity: { name: "Nutrient diversity", body: "The breadth and composition of those constituents." },
  evidenceBoundary: "Biological complexity provides the mechanism. Produce analysis provides the evidence. PQNK Validation determines the measured outcome.",
  validationLinkLabel: "PQNK Validation",
  validationLinkHref: "/validation",
};

export const resilience = {
  title: "Biodiversity Creates Resilience Through Multiple Pathways",
  body: "A diverse system is less dependent upon one biological pathway remaining perfect at all times.",
  stabilityTitle: "Stability Does Not Mean Nothing Changes",
  dynamism: ["Populations fluctuate.", "Plants germinate and die.", "Residues decompose.", "Roots grow and senesce.", "Water and temperature change."],
  stabilityDefinition: "Ecological stability means the capacity to retain or recover function despite change.",
  statement: "Not a frozen field. A functioning one.",
};

export interface HabitatPrinciple {
  name: string;
  body: string;
}

export const habitatPrinciples: HabitatPrinciple[] = [
  { name: "No Soil Disturbance", body: "Protects pores, roots, aggregates, fungal networks and the physical habitat biodiversity depends on." },
  { name: "No Inundation", body: "Maintains the water–air relationship required by aerobic soil biology and biodiversity." },
  { name: "Permanent Biological Cover", body: "Protects the soil surface, moderates temperature and continuously feeds biological activity." },
  { name: "Maximum Biodiversity", body: "Expands biological relationships, root architectures, nutrient cycling and ecological stability." },
];

export const habitatClosing =
  "Maximum Biodiversity depends on the habitat created by the first three principles, while recovered biodiversity strengthens the functioning of the other principles in return.";

export const notDisorder = {
  title: "Maximum Biodiversity Does Not Mean Maximum Disorder",
  definition: "Maximum Biodiversity means the greatest functional biological complexity compatible with the production system.",
  notAbandonment: "It does not mean abandoning field management.",
  managementList: ["crop establishment", "crop combinations", "crop succession", "weed competition", "pest thresholds", "harvest", "water", "machinery movement", "transition interventions"],
  statement: "PQNK does not remove management. It changes what management is trying to manage.",
};

export const duringTransition = {
  title: "Biodiversity During Transition",
  body: "Biodiversity does not return instantly when tillage or chemicals stop. Habitat recovery may require root recolonization, organic cover, pore recovery, fungal development, microbial reorganization, predator–prey establishment and time.",
  interventionNote: "Temporary intervention can still be necessary.",
  question: "Is the intervention supporting recovery, or replacing the system again?",
  linkLabel: "Continue with the PQNK Transition Model",
  linkHref: "/science/transition",
};

export const returningSigns = {
  title: "How the Production Manager Recognizes Returning Biodiversity",
  intro: "These are observations that may indicate returning biological function, not a rigid certification checklist.",
  signs: [
    "increasing root penetration",
    "persistent aggregation",
    "visible fungal activity",
    "biological residue decomposition",
    "soil-fauna activity where locally appropriate",
    "greater insect variety",
    "predator presence",
    "improved residue breakdown",
    "improved infiltration",
    "continuous biological cover",
    "healthier roots",
    "more stable crop performance",
    "reduced routine corrective intervention",
  ],
  closing: "No single sign proves complete regeneration. The pattern matters.",
};

export const diagnosticHierarchy = {
  title: "Observation → Investigation → Diagnosis → Management Decision",
  intro: "An unusual insect population, weed flush, residue condition, root problem or crop symptom should initiate investigation.",
  sequence: [
    { label: "Observation", body: "An unusual biological signal is noticed." },
    { label: "Investigation", body: "The Production Manager examines the relevant condition." },
    { label: "Diagnosis", body: "The underlying cause is identified before acting." },
    { label: "Management Decision", body: "Action follows only once the diagnosis confirms the need." },
  ],
  centralStatement: "The organism may be the problem. It may be part of the solution. Or it may simply be a signal of something else happening in the system.",
};

export const notPurchasedInput = {
  title: "Biodiversity Is Not a Purchased Input",
  body: "Markets may sell microorganisms, inoculants, biological extracts, beneficial insects and similar products. Some can have legitimate specific applications.",
  distinction: "Purchased biological products are not equivalent to ecosystem biodiversity.",
  firstQuestion: "Can the field support the biology we expect to live there?",
  closing: "Habitat comes first.",
};

export const livingSystemLoop = {
  title: "The Living-System Loop",
  steps: ["Soil", "Plants", "Water", "Biodiversity"],
  closingLabel: "Functional Soil",
};

export const stabilityEngine = {
  title: "Biodiversity Is the Stability Engine",
  roles: {
    soil: "Soil provides the architecture.",
    plants: "Plants provide biological energy.",
    water: "Water enables biological activity and transport.",
    biodiversity: "Biodiversity distributes the work.",
  },
  functions: [
    "energy capture",
    "carbon cycling",
    "nutrient acquisition",
    "decomposition",
    "aggregation",
    "pore formation",
    "population regulation",
    "habitat maintenance",
    "water movement",
    "root support",
    "recovery after disturbance",
  ],
  conclusion: "Biodiversity becomes the stability engine of PQNK.",
};

export const scienceApplication = {
  science:
    "Biological complexity distributes production functions across many organisms. Functional redundancy creates resilience. Predators and regulatory organisms require habitat and continuity. Roots, fungi and microorganisms expand nutrient-acquisition pathways. Biological occupation of the soil surface must remain continuous through time.",
  application:
    "Local biodiversity differs according to climate, soil, cropping system, weed communities, predators, microorganisms, rainfall, temperature, machinery and production objectives. PQNK does not prescribe one universal species list.",
  closing: "Science is universal. Application is local.",
};

export const fourComponentSynthesis = {
  title: "The Four Foundational Components Are Now One System",
  components: [
    { name: "Soil", role: "The living production habitat." },
    { name: "Plants", role: "The biological production engine." },
    { name: "Water", role: "The carrier and circulatory medium of the system." },
    { name: "Biodiversity", role: "The stability and self-regulation engine." },
  ],
  dependencies: [
    "Soil without Plants loses biological energy.",
    "Plants without Water cannot function.",
    "Water without Soil architecture cannot be managed biologically.",
    "Plants and Soil without Biodiversity lose functional complexity and resilience.",
    "Biodiversity without protected habitat cannot persist.",
  ],
  statement: "PQNK does not manage Soil, Plants, Water and Biodiversity as separate agricultural variables. It restores the relationships through which they function as one production system.",
};

export interface FutureTopic {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
}

export const futurePathways: FutureTopic[] = [
  { slug: "nutrition", name: "Natural Plant Nutrition", tagline: "Feeding the Plant by Restoring the Nutrient Cycle", summary: "How mineral reserves, microorganisms, fungi, roots, water and plant demand interact to determine nutrient availability." },
  { slug: "crop-protection", name: "Natural Crop Protection", tagline: "Restoring Biological Regulation", summary: "How biodiversity, plant condition, habitat and ecological regulation reduce dependence on routine chemical protection." },
  { slug: "climate", name: "Climate & the Agricultural Water Cycle", tagline: "The Field's Role in the Larger Water Cycle", summary: "How infiltration, evaporation, transpiration, vegetation and soil temperature connect the individual field to the larger water cycle." },
  { slug: "food-quality", name: "Food Quality & Human Nutrition", tagline: "Quality Begins Before Harvest", summary: "How the production environment influences mineral acquisition, plant metabolism and measured food quality." },
  { slug: "production-architecture", name: "PQNK Production Architecture", tagline: "Engineering the Science", summary: "How farm layout, permanent beds, controlled traffic and machinery geometry serve the biological system." },
];

export const futurePathwaysNote =
  "Nutrition, Crop Protection, Climate, Food Quality and Production Architecture are not additional PQNK principles. They are functions, outcomes and applications emerging from the four-component system — Soil, Plants, Water and Biodiversity.";

export const closingProposition = {
  intro:
    "Industrial agriculture achieved control partly by simplifying biological systems and replacing lost functions with machinery, irrigation, fertilizers, pesticides and repeated intervention.",
  question: "How many of those functions can be restored to the living system itself?",
  relationships: [
    "Roots work with microorganisms.",
    "Plants exchange resources with fungi.",
    "Residues feed decomposers.",
    "Predators regulate populations.",
    "Different plants occupy different spaces and times.",
    "Water moves through architecture created partly by biology.",
    "Each generation inherits biological infrastructure from the previous one.",
  ],
  fieldStatement: "The field becomes more than a place where a crop is planted. It becomes a functioning production ecosystem.",
  finalProposition: "The objective of PQNK is not to manufacture biodiversity. It is to stop destroying the conditions that allow biodiversity to manufacture function.",
  closingMovement: "This is the movement from externally maintained production toward a biologically sustained production system.",
};

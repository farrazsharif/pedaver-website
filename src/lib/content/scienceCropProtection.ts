/**
 * Content for /science/crop-protection, the seventh Science detail page
 * (after /science/transition, /science/soil, /science/plants, /science/water,
 * /science/biodiversity and /science/nutrition).
 */

export const hero = {
  eyebrow: "PQNK Science · Crop Protection",
  title: "Crop Protection — Biological Regulation Instead of Routine Suppression",
  body: [
    "Agriculture commonly treats crop protection as the act of killing pests: identify the organism, select the product, apply it.",
    "PQNK treats crop protection as the consequence of building a biologically functional production ecosystem — one in which plants are physiologically supported, soil biology functions, biodiversity is protected, and ecological regulation operates.",
  ],
  callout: "Crop protection begins before the pest arrives.",
};

export const centralProposition = {
  title: "Crop Protection Begins Before the Pest Arrives",
  body: [
    "The production environment determines much of a crop's capacity to tolerate, compensate for, or biologically interact with pest and disease pressure. A field is not a blank surface awaiting attack — it is already a biological system, and the condition of that system shapes what happens next.",
    "PQNK therefore asks a different first question.",
  ],
  questionNot: "Not: \"What chemical should kill it?\"",
  questionBut: "But: \"What conditions allowed damaging pressure to develop?\"",
};

export const pestsPartOfEcosystem = {
  title: "Pests Are Part of the Ecosystem",
  body: "Organisms classified as agricultural pests did not evolve specifically to attack agriculture. They exist inside ecological systems. Herbivores, insects, microorganisms, pathogens, predators, parasitoids, decomposers and other organisms participate in food webs, population regulation and biological recycling.",
  caveat: "This is not a claim that every pest is beneficial, or that every pest must be allowed to multiply.",
  statement: "Pest presence does not equal economic damage.",
  hierarchy: ["Presence", "Population", "Plant response", "Actual damage", "Economic significance", "Management decision"],
};

export const recyclingAndCondition = {
  title: "Pests and Disease Organisms as Part of Recycling",
  body: "Many organisms regarded as pests, pathogens, decomposers or scavengers participate in ecological processes that remove, consume, decompose or recycle biological material.",
  conditionIntro: "PQNK field interpretation places particular importance on plant physiological condition. Stressed, deficient, damaged or physiologically compromised plants can differ from vigorous plants in:",
  conditionFactors: ["tissue chemistry", "soluble compounds", "defensive capacity", "volatile signals", "susceptibility", "attractiveness or suitability to particular herbivores/pathogens"],
  signalNote: "Therefore severe pest or disease pressure can sometimes function as a system diagnostic signal.",
  boundary: "Plant condition can influence susceptibility and pest/pathogen relationships, while crop, organism, environment, timing and other factors also matter. Not all pests and diseases attack only weak plants, and healthy plants are not biologically incapable of infection or herbivory.",
};

export const suckingInsects = {
  title: "Sucking Insects — Presence Is Not Automatic Damage",
  formulation: "PQNK field observation has identified another relationship that deserves attention rather than automatic suppression. Low populations of sap-sucking insects, particularly under vigorous rainy-season vegetative growth, may coincide with a change in plant growth allocation in which excessive vegetative expansion is moderated and reproductive development becomes relatively more prominent.",
  guardrail: "This does not mean sucking insects always increase yield.",
  dependsOn: ["insect species", "crop", "growth stage", "population pressure", "plant physiological condition", "weather/environment", "duration and intensity of feeding"],
  question: "Is the insect merely present, is the plant compensating, or is economically meaningful damage actually occurring?",
};

export const nitrogenPestPressure = {
  title: "Nitrogen Fertilization Can Change Pest Pressure",
  intro: "PQNK recognizes another important connection between crop nutrition and crop protection.",
  body: "In conventional production, heavy application of nitrogen — particularly readily available nitrogen supplied through urea and other soluble nitrogen fertilizers — can stimulate rapid, succulent vegetative growth and alter the nutritional composition of plant tissues. These changes can create more favorable feeding conditions for some herbivorous insects, particularly sap-sucking insects.",
  chain: [
    "High Readily Available Nitrogen Supply",
    "Rapid Succulent Vegetative Growth",
    "Changes in Plant Tissue Chemistry and Soluble Nitrogen Availability",
    "Greater Suitability for Certain Sucking Insects",
    "Potential Increase in Pest Population and Damage",
    "Greater Demand for Chemical Crop Protection",
  ],
  fertilizerDecisionStatement: "A fertilizer decision can therefore become a crop-protection decision.",
  pqnkPosition: "PQNK does not separate plant nutrition from pest management. Its objective is not to force vegetative growth through repeated applications of readily available nitrogen, but to restore biologically mediated nutrient acquisition through the functioning soil–plant system.",
  qualification: "This does not mean that every application of urea causes a pest outbreak, nor that nitrogen itself is harmful to plants. Nitrogen is essential to plant life. The relevant variables include the form, quantity and timing of nitrogen supply, crop and pest species, plant growth stage, environmental conditions and the resulting physiological condition of the crop.",
  distinctionIntro: "The mere presence of a small population of sucking insects is not equivalent to the heavy sucking-insect pressure that can develop in a rapidly growing, nitrogen-rich crop.",
  distinctionBody: "The Production Manager must interpret the insect together with the physiological condition of the plant and the management history of the field.",
  systemFlow: ["Nutrition", "Plant Physiology", "Pest Relationship", "Crop Protection"],
  nutritionLinkLabel: "Continue with Nutrition Science",
  nutritionLinkHref: "/science/nutrition",
  plantsLinkLabel: "Continue with Plant Science",
  plantsLinkHref: "/science/plants",
};

export const lundgrenCorrection = {
  title: "One Pest Species, Many Others — Correcting a Common Simplification",
  wrongVersion: "\"Against every pest there are 1,700 predators.\"",
  correction: "That figure has often been repeated inaccurately. Entomologist Jonathan Lundgren has used the estimate that for every pest insect species there may be hundreds — and in his formulation up to approximately 1,700 insect species — that are beneficial or whose ecological roles are not fully understood.",
  keyDistinctionLeft: "1 pest species",
  keyDistinctionRight: "1,700 predators",
  keyDistinctionNote: "The number refers to species diversity surrounding a pest, not a predator-to-pest headcount.",
  includes: ["predators", "parasitoids", "pollinators", "decomposers", "detritivores", "organisms participating in food webs", "neutral species", "species whose ecological functions remain incompletely understood"],
  notAllPredators: "Not all of these species are natural enemies of the pest.",
  lesson: "Agriculture tends to notice the relatively small number of organisms labelled \"pests\" while overlooking the much larger biological community surrounding them.",
  rhetoricalQuestion: "Why destroy the community in order to kill one member of it?",
  broadSpectrumNote: "Broad-spectrum intervention can disrupt beneficial and neutral organisms as well as the target organism.",
};

export const biologicalRegulation = {
  title: "Biological Regulation",
  mechanisms: ["predators", "parasitoids", "microbial pathogens", "entomopathogenic fungi", "bacteria", "viruses", "food-web relationships", "habitat effects", "plant physiological resistance/tolerance", "biodiversity-mediated regulation"],
  guardrail: "No single mechanism guarantees control.",
  statement: "Predator presence does not guarantee control.",
  systemNote: "The system is ecological regulation, not replacing one pesticide with one predator.",
};

export const btSection = {
  title: "Bt — Nature Already Contains Insect-Control Mechanisms",
  intro: "Bacillus thuringiensis (Bt) is a naturally occurring bacterium associated with soil and other environments. Different Bt strains can produce different insecticidal proteins active against particular susceptible insect groups.",
  mechanism: "For susceptible larvae, relevant Bt proteins generally must be ingested. They become active in the insect digestive system, interact with specific gut receptors and can damage the gut, resulting in cessation of feeding and death.",
  distinctions: [
    { name: "Natural Bt", body: "Naturally occurring microorganisms present in the environment." },
    { name: "Bt Biopesticide", body: "Selected Bt organisms/proteins deliberately formulated and applied for pest control." },
    { name: "Bt/GM Crop", body: "A genetically engineered plant carrying genetic information enabling it to produce a Bt-derived insecticidal protein." },
  ],
  significance: "Bt demonstrates that insect regulation already exists within biology.",
  objective: "PQNK's broader objective is to restore conditions in which biological regulation can function, rather than assuming that crop protection must begin with synthetic chemical intervention.",
  caveat: "Natural Bt alone does not explain all PQNK pest outcomes.",
};

export const fieldExperienceTwoPercent = {
  title: "PQNK Field Experience — Approximately 2%",
  body: "Where the complete PQNK conversion protocol has been followed properly, PQNK field experience has normally observed very low pest incidence/damage even in the first crop — commonly around 2% or below. At that level, intervention is normally unnecessary.",
  labelNote: "This is an observed PQNK field-performance statement, not a scientifically guaranteed constant and not a universal biological threshold.",
};

export const tenPercentThreshold = {
  title: "The 10% Transitional Threshold",
  body: "Approximately 10% pest incidence/damage can serve as a practical field decision point during transition, subject to crop, pest, growth stage, actual damage, plant condition and field conditions.",
  statement: "10% is not a spraying instruction.",
  clarification: "It is the point at which intervention may need to be justified through investigation.",
  sequence: [
    { label: "Observation", body: "Pest or damage level is noticed." },
    { label: "Investigation", body: "The relevant condition is examined." },
    { label: "Diagnosis", body: "Actual economic significance is established." },
    { label: "Management Decision", body: "Intervention follows only once justified." },
  ],
  experienceNote: "In established PQNK field experience, properly converted fields have not normally approached this threshold.",
};

export const chemicalException = {
  title: "Chemical Intervention — Exception, Not Foundation",
  body: "PQNK is not built around calendar spraying. A pesticide is not applied merely because an insect is seen.",
  transitionNote: "During transition, if economically meaningful damaging pressure develops and diagnosis establishes that intervention is justified, a targeted intervention may be considered.",
  goal: "The goal is to protect the developing biological system while avoiding unnecessary disruption of predators, parasitoids, soil organisms, pollinators, microbial communities and food-web relationships.",
  guardrail: "Chemical intervention is not a routine component of mature PQNK.",
};

export const weedsEnemyToSignal = {
  title: "Weeds — From Enemy to Ecological Signal",
  conventional: "In input-dependent conventional agriculture, weeds are commonly treated as direct competitors because they can acquire some of the same externally supplied resources intended for the cash crop, including soluble fertilizer, water and light.",
  pqnkPremise: "PQNK changes the nutrient premise. PQNK does not build crop nutrition around a finite dose of soluble fertilizer applied for exclusive capture by the crop.",
  connectedTo: ["the soil mineral reservoir", "biological transformation", "rhizosphere processes", "roots", "mycorrhizal relationships", "water movement", "microbial activity"],
  statement: "PQNK does not begin with the assumption that every nutrient absorbed by a weed has been \"stolen\" from the cash crop.",
  ecosystemNote: "A biologically functioning soil can support many plants simultaneously. Natural ecosystems demonstrate this principle continuously.",
  guardrails: ["Nutrients are not unlimited.", "Plants can compete under genuinely limiting conditions.", "Not every weed should remain uncontrolled."],
};

export const rootsCoexistence = {
  title: "Roots — Coexistence Rather Than a Competition-First Model",
  statement: "PQNK does not design the production system around root competition. It designs it around biological coexistence, interaction and complementary occupation of the soil.",
  capabilities: ["occupy different soil depths", "create rhizosphere effects", "interact with microbial communities", "participate in mycorrhizal relationships", "modify soil structure", "contribute different residues/root exudates", "support biological complexity"],
  caveat: "Competition can occur when resources become limiting. PQNK seeks to remove the degraded conditions that unnecessarily intensify such competition.",
};

export const sunlightIssue = {
  title: "The Critical Above-Ground Issue — Sunlight",
  intro: "In a functioning PQNK system, the practical management concern increasingly shifts from presumed below-ground nutrient theft to above-ground light interception.",
  problemConditions: ["overtops the crop", "shades young crop plants", "restricts photosynthetically useful light", "interferes physically with crop establishment or harvest"],
  statement: "Manage the light, not the biology.",
  belowGround: "Below ground: preserve biological interaction wherever practical.",
  aboveGround: "Above ground: manage canopy architecture so the production crop receives adequate sunlight.",
};

export const rowOrientation = {
  title: "North–South Row Orientation",
  body: "PQNK generally prefers north–south crop/plant rows where field geometry, drainage, topography, irrigation architecture, machinery and other practical constraints permit.",
  purpose: "The purpose is solar distribution. As the sun moves across the sky, north–south row orientation can distribute exposure between the sides of the crop row rather than creating persistent one-sided shading — helping plants receive sunlight during both earlier and later parts of the day.",
  guardrail: "This is a PQNK design preference intended to improve solar access where conditions permit, not a claim that north–south orientation universally maximizes yield in every crop or location.",
};

export const weedicideException = {
  title: "Weedicide — A Very Narrow Transitional Exception",
  scope: "PQNK recommends weedicide only as an exceptional tool during the first summer crop of conversion when necessary.",
  example: "Rice offers the clearest example: first summer crop, rice seedlings establishing, biological cover not yet fully developed, insufficient organic mulch on the soil surface, aggressive summer weeds emerging and beginning to overtop or shade the young seedlings.",
  reasonNot: "The reason for intervention is not: \"Weeds exist.\"",
  reasonIs: "The reason is: \"The developing crop is losing access to sunlight because adequate mulch or biological occupation has not yet been established.\"",
  disappearingNote: "Once permanent biological cover, adequate organic mulch, residue retention, continuous crop occupation and the functioning PQNK soil system are established, the circumstances creating the need for weedicide should progressively disappear.",
  guardrail: "Herbicide is not a normal recurring PQNK practice.",
};

export const agrochemicalEffects = {
  title: "Agrochemical Effects on the Protection System",
  intro: "Routine broad-spectrum chemical intervention can affect organisms beyond the target pest or weed.",
  consequences: ["beneficial insects", "predators", "parasitoids", "pollinators", "microbial communities", "fungal relationships", "food-web interactions", "soil biological processes"],
  herbicideNote: "Herbicides deserve particular attention because repeated weed suppression also removes living plant diversity — altering root diversity, rhizosphere diversity, habitat, food sources, flowering resources and surface cover.",
  guardrails: ["Not every pesticide kills every beneficial organism.", "Not every herbicide has identical microbiological effects."],
  variesWith: ["chemistry", "dose", "timing", "formulation", "organism", "soil", "environment", "frequency of exposure"],
  argument: "The PQNK argument is against routine dependence, not scientifically unsupported universal toxicity claims.",
  linkLabel: "Continue with Nutrition Science",
  linkHref: "/science/nutrition",
};

export const weedsRescueWorkers = {
  title: "Weeds as Rescue Workers",
  body: "Spontaneous vegetation can occupy exposed ecological space, provide living roots, cover soil and contribute biological material.",
  linkLabel: "Continue with Biodiversity Science — Weeds as Nature's Rescue Workers",
  linkHref: "/science/biodiversity",
};

export const occupyEcologicalSpace = {
  title: "Occupy the Ecological Space",
  body: "Nature does not willingly leave ecological space empty. If the Production Manager leaves bare soil, unoccupied sunlight, unused rooting space or open ecological niches, other organisms will occupy them.",
  strategies: ["continuous crops", "crop-after-crop", "crop-in-crop where appropriate", "mulch", "retained roots", "biodiversity", "canopy planning"],
  statement: "The objective is not sterile ground. It is designed biological occupation.",
};

export const cropProtectionLoop = {
  title: "The Crop Protection Loop",
  steps: [
    "Functional Soil",
    "Balanced Plant Nutrition",
    "Physiologically Functioning Plants",
    "Biodiversity",
    "Predators / Parasitoids / Microbial Regulation",
    "Lower Risk of Damaging Pest Pressure",
    "Residues + Roots + Biological Return",
  ],
  closingLabel: "Functional Soil",
};

export interface HabitatPrinciple {
  name: string;
  body: string;
}

export const habitatPrinciples: HabitatPrinciple[] = [
  { name: "No Soil Disturbance", body: "Protects the fungal networks and biological channels that support natural enemies and soil-based regulation." },
  { name: "No Inundation", body: "Maintains aerobic soil biology, part of the wider regulatory ecosystem." },
  { name: "Permanent Biological Cover", body: "Provides habitat, food and continuity for predators, parasitoids and decomposers." },
  { name: "Maximum Biodiversity", body: "Broadens the community of organisms available to regulate pest populations." },
];

export const scienceApplication = {
  science: "Pest presence is not economic damage. Biological regulation depends on habitat, continuity and community diversity. Plant physiological condition influences susceptibility. Broad-spectrum intervention disturbs beneficial and neutral organisms alongside targets.",
  application: "Crop protection decisions depend on observation, pest identification, population, crop stage, actual damage, environmental conditions, plant condition and system condition.",
  closing: "Science is universal. Application is local.",
};

export const finalProposition = {
  statement: "PQNK does not begin crop protection by asking how to kill the pest. It begins by asking why the biological system allowed damaging pressure to develop.",
  notObjective: "The objective is not a field without insects.",
  objective: "The objective is a production ecosystem in which biological regulation keeps damaging pressure below the point at which routine chemical intervention becomes necessary.",
};

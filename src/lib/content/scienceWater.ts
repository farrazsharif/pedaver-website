/**
 * Content for /science/water, the fourth Science detail page (after
 * /science/transition, /science/soil and /science/plants). Follows the
 * same content/component pattern as its siblings.
 */

export const hero = {
  eyebrow: "PQNK Science · Water",
  title: "Water — Restoring the Natural Water Cycle",
  body: [
    "Agriculture commonly treats water as an input: something supplied to a crop in a measured quantity at a scheduled time.",
    "PQNK Water Science treats water differently. Water is a connected biological and hydrological system that moves between atmosphere, soil and plant — and back to the atmosphere again.",
  ],
  callout: "Atmosphere ↕ Soil ↕ Plants ↕ Atmosphere — restoring the connected movement of water, not simply reducing irrigation events.",
};

export const notInputAlone = {
  title: "Water Is Not an Agricultural Input Alone",
  body: [
    "In conventional agriculture, water is often treated as a single input: apply enough, at the right time, and the crop responds.",
    "PQNK Water Science asks a different question: what happens to water once it arrives? Water reaching a field can infiltrate and remain within the biological production system, or it can run off, evaporate, or drain away without ever becoming biologically useful.",
    "The production system itself — its soil architecture, biological cover and root network — determines how much of that water actually becomes available to plants.",
  ],
};

export const waterCycle = {
  title: "The PQNK Water Cycle",
  intro:
    "Water moves through the field as a connected cycle, not as a one-way delivery from tap or sky to crop. The cycle begins and ends at the same place: the atmosphere.",
  mainSteps: [
    "Atmosphere",
    "Precipitation / Dew / Atmospheric Moisture",
    "Biological Cover",
    "Soil Infiltration",
    "Seepage",
    "Soil Storage",
    "Root Absorption",
    "Plant Transport",
    "Transpiration",
  ],
  mainClosingLabel: "Atmosphere",
  branch: {
    title: "A Secondary Pathway",
    steps: ["Excess Infiltrated Water", "Deeper Seepage", "Groundwater Recharge"],
    note: "Not all infiltrated water is drawn back up through roots. Where conditions permit, some continues downward beyond the root zone.",
  },
};

export const firstRequirement = {
  title: "The First Requirement: Water Must Enter the Soil",
  body: [
    "Before water can be stored, absorbed by roots or transpired by plants, it must first enter the soil.",
    "Water that cannot infiltrate is water the biological production system cannot use — regardless of how much rain fell or how much irrigation was applied.",
  ],
  statement: "Infiltration is therefore the gateway to every other water function in the system.",
};

export interface WaterTerm {
  name: string;
  body: string;
}

export const infiltrationTerms = {
  title: "Infiltration Is Only the Beginning",
  terms: [
    { name: "Infiltration", body: "Water entering through the soil surface." },
    { name: "Seepage", body: "Water moving through connected soil pores." },
    { name: "Absorption", body: "Water entering soil aggregates, organic materials and biological interfaces and becoming available within the root environment." },
    { name: "Retention", body: "Water remaining within the soil system rather than immediately draining away or returning to the atmosphere." },
  ] as WaterTerm[],
  halfNote: "These are only one half of the water equation.",
};

export const twoSidedConservation = {
  title: "Water Conservation Has Two Sides",
  formula: "Better water entry and storage + restriction of unnecessary evaporative loss.",
  partOne: {
    title: "Part One",
    pathway: ["Infiltration", "Seepage", "Absorption", "Retention"],
  },
  partTwo: {
    title: "Part Two — Restrict Unnecessary:",
    pathway: ["Soil Water", "Capillary Rise", "Surface Evaporation", "Atmosphere"],
  },
  cautionNote: "PQNK water conservation is not reducible merely to improved infiltration.",
};

export const mulchBoundary = {
  title: "Mulch Changes the Soil–Atmosphere Boundary",
  intro: "Permanent organic mulch:",
  functions: [
    "shades the soil",
    "reduces direct solar heating",
    "reduces air movement immediately above the soil",
    "protects soil moisture",
    "interrupts the direct capillary pathway between moist soil and the exposed atmosphere",
  ],
  notNote: "Within PQNK Water Science, mulch is not merely residue, fertilizer, organic matter addition, or cosmetic soil covering.",
  statement: "Mulch is part of the hydraulic architecture of the field.",
};

export const evaporationHeating = {
  title: "Evaporation Is Water Loss — and Energy Transfer",
  body: "When water evaporates from exposed soil, water is lost from the soil system and energy is exchanged with the atmosphere.",
  bareLandNote: "Bare, dry land also heats rapidly.",
  scaleNote:
    "Widespread changes in vegetation, soil moisture, evapotranspiration and surface temperature can alter land–atmosphere energy and water exchange.",
  boundary:
    "Agricultural land degradation can contribute to altered local and regional water and energy cycling, but erratic weather cannot scientifically be attributed to soil evaporation alone.",
};

export const evapVsTranspiration = {
  title: "Plants Return Water Differently",
  intro: "The objective is not to stop water returning to the atmosphere. Water must return.",
  unproductive: {
    label: "Unproductive / Avoidable Pathway",
    steps: ["Stored Soil Water", "Bare Soil Surface", "Unnecessary Evaporation", "Atmosphere"],
  },
  productive: {
    label: "Biological / Productive Pathway",
    steps: ["Soil Water", "Roots", "Plant Vascular System", "Physiological Processes", "Transpiration", "Atmosphere"],
  },
  notWasteNote: "Transpiration is not waste. It is part of biological production.",
};

export const transpirationProduction = {
  title: "Transpiration Is Part of Production",
  body: "Transpiration contributes importantly to leaf-temperature regulation and nutrient transport — it is a functioning part of the biological production process, not a loss to be eliminated.",
};

export const waterAirCoexist = {
  title: "Soil Must Hold Water and Air Together",
  intro: "A root does not require water alone. It requires a moist, aerated biological environment.",
  saturationNote:
    "Prolonged saturation restricts oxygen diffusion and affects root respiration, aerobic microbial processes, fungal relationships and other biological functions.",
  objective: "The objective is functioning pore architecture containing both water and air — not maximum soil water content.",
};

export const thirtySeventy = {
  title: "The Meaning of the 30:70 Condition",
  body: "The 30:70 condition describes a sustained biological soil condition previously established within PQNK Science — a description of a functioning state, not a field prescription.",
  notTarget: "It is not an irrigation target.",
  temporaryNote:
    "After irrigation, the local water–air relationship changes temporarily. Drainage, seepage, redistribution and plant uptake subsequently restore aerated conditions.",
};

export const smmDiagnosis = {
  title: "Soil Moisture Management Is Diagnosis",
  sequence: [
    { label: "Observation", body: "Wilting may be the first field observation." },
    { label: "Investigation", body: "The Production Manager investigates root-zone moisture." },
    { label: "Diagnosis", body: "The soil ball test helps diagnose moisture status." },
    { label: "Management Decision", body: "If soil moisture is inadequate, irrigation may be required." },
  ],
  otherCausesIntro: "If moisture remains adequate, investigate other possible causes such as:",
  otherCauses: [
    "high temperature",
    "low humidity",
    "strong wind",
    "temporary transpiration demand exceeding root water transfer",
    "crop maturity",
  ],
  centralStatement: "The plant alerts the Production Manager. The soil confirms the diagnosis.",
};

export const irrigationSupplementary = {
  title: "Irrigation Is Supplementary to the Water Cycle",
  conventional: { label: "Conventional Model", body: "Irrigation becomes the dominant water mechanism." },
  pqnk: {
    label: "PQNK Model",
    body: "The functioning water cycle is primary. Irrigation supplements the system when diagnosis indicates inadequate root-zone moisture.",
  },
};

export const noInundation = {
  title: "No Inundation Is a Biological Principle",
  statement: "No inundation does not mean no irrigation.",
  body: "Routine prolonged saturation converts the root environment toward an oxygen-restricted condition and damages biological function. The purpose of irrigation is to restore adequate root-zone moisture while preserving aeration.",
};

export const dew = {
  title: "Dew Is Part of the Water System",
  body: "Under suitable conditions, dew forms on plants and mulch. Organic mulch can absorb and retain this water. Through physical contact, surface cavities and the mulch–soil interface, some moisture can move toward and contribute to wetting of the soil surface.",
  pathway: ["Atmospheric Water", "Dew Formation", "Mulch Capture", "Retention / Transfer", "Soil Moisture"],
  fieldNote: "PQNK field observations treat this as a real component of the field water system.",
};

export const atmosphericHumidity = {
  title: "Dry Mulch Also Interacts With Atmospheric Humidity",
  body: "Organic material is hygroscopic. Dry mulch exposed to humid air can sorb atmospheric water vapour. Under suitable temperature and humidity conditions this increases mulch moisture content. Where mulch remains in close contact with the soil, that moisture participates in the moisture environment at the mulch–soil interface.",
  pathway: ["Atmospheric Humidity", "Hygroscopic Mulch", "Moisture Accumulation", "Mulch–Soil Interface"],
  intentionalNote: "The mechanism and field observation are intentionally part of PQNK Water Science.",
};

export const rainfallEffectiveness = {
  title: "Rainfall Becomes More Valuable When Soil Functions",
  degraded: { label: "Degraded Land", steps: ["Rain", "Surface Sealing / Ponding", "Runoff + Evaporation"] },
  functioning: {
    label: "Functioning Covered Soil",
    steps: ["Rain", "Mulch Interception", "Infiltration", "Seepage", "Storage", "Roots"],
  },
  questionNot: "Not merely: \"How much rain did we receive?\"",
  questionBut: "But: \"How much of that rain entered and remained within the biological production system?\"",
};

export const deepSeepage = {
  title: "Deep Seepage and Groundwater",
  body: "Water moving below the immediate root zone is not automatically waste.",
  conditionsIntro: "Where the following permit, deeper infiltrated water can contribute to groundwater recharge:",
  conditions: ["geology", "water quality", "soil conditions", "aquifer connectivity"],
  caution: "Not every litre of deep seepage necessarily recharges a usable aquifer.",
};

export const rootReservoir = {
  title: "Roots Extend the Effective Water Reservoir",
  body: "Water access depends on both soil moisture and the volume of soil explored by roots.",
  contrast: {
    shallow: "Shallow/restricted roots access a smaller reservoir.",
    deep: "Deep, biologically supported roots access a larger soil volume.",
  },
  mycorrhizaNote: "Mycorrhizal relationships can further extend exploration of microsites beyond the immediate root surface.",
  centralConcept:
    "PQNK does not solve water scarcity solely by adding more water from above. It also increases biological capacity to locate and access water already present within the soil profile.",
};

export const biodiversityWater = {
  title: "Biodiversity Stabilizes Water Use",
  body: "Species differ in rooting depth, root diameter, root architecture, seasonal activity and soil biological relationships. Biological diversity therefore contributes to a more complex below-ground architecture.",
  statement: "Diversity above ground creates diversity below ground — and diversity below ground creates more pathways for water.",
};

export const biologicalCoverArchitecture = {
  title: "Biological Cover Completes the Water Architecture",
  functions: [
    "intercepts rainfall impact",
    "protects soil aggregates",
    "reduces crusting",
    "supports infiltration",
    "moderates soil temperature",
    "interrupts capillary evaporation",
    "retains surface moisture",
    "provides habitat and carbon for soil organisms",
    "supports root- and biology-created pore architecture",
  ],
  notNote: "This is not merely residue management.",
};

export interface HydroPrinciple {
  name: string;
  body: string;
}

export const hydroPrinciples: HydroPrinciple[] = [
  { name: "No Soil Disturbance", body: "Protects pore continuity, aggregates, fungal networks and root-created channels." },
  { name: "No Inundation", body: "Protects aeration and oxygen-dependent biology." },
  { name: "Permanent Biological Cover", body: "Protects the soil–atmosphere boundary, moderates temperature and restricts unnecessary evaporation." },
  { name: "Maximum Biodiversity", body: "Creates varied root architectures, biological pathways and resilience." },
];

export const hydroPrinciplesClosing =
  "These are not four independent recommendations. Together they create the habitat through which water functions biologically.";

export const scienceApplication = {
  scienceLines: [
    "Water must enter the soil.",
    "Water must move through functioning pores.",
    "Water and air must coexist.",
    "Roots must access stored moisture.",
    "Unnecessary evaporation should be restricted.",
    "Plants must transpire.",
    "The water cycle must remain connected.",
  ],
  application:
    "Depends on soil texture, slope, rainfall pattern, crop, rooting depth, climate, irrigation source, water quality, tractor architecture, field geometry, and local conditions.",
  closing: "Science is universal. Application is local.",
  centralStatement:
    "PQNK does not prescribe one irrigation quantity for every field. It establishes the biological conditions within which the Production Manager can diagnose what that field requires.",
};

export const waterSavingOutcome = {
  title: "Water Saving Is a System Outcome",
  factors: [
    "greater infiltration",
    "deeper seepage",
    "improved soil storage",
    "stronger root exploration",
    "biological soil structure",
    "permanent surface protection",
    "reduced unnecessary evaporation",
    "rainfall capture",
    "dew and atmospheric-moisture interaction",
    "diagnosis-based irrigation",
    "avoidance of inundation",
  ],
  resultStatement: "The result can be a substantial reduction in externally supplied irrigation water.",
  clarification: "PQNK is not claiming that crops cease using water. It is rebuilding the system that manages water.",
};

export const waterSoilPlantsClimate = {
  title: "Water Connects Soil and Plants to Climate",
  flowOne: ["Atmosphere", "Water", "Soil", "Roots", "Plants", "Transpiration", "Atmosphere"],
  flowTwo: ["Plants", "Roots", "Soil Biology", "Soil Architecture", "Water Infiltration"],
  body: "These pathways form a coupled cycle. Agricultural degradation can alter the land surface through which solar energy and water interact with the atmosphere.",
  frame: "This is a matter of landscape hydrology, water cycling, energy partitioning and climate resilience.",
  scopeNote: "PQNK does not claim to alone control weather.",
};

export const centralWaterProposition = {
  statement:
    "Water scarcity in agriculture is not only a question of how much water reaches the farm. It is also a question of what the production system does with water after it arrives.",
  degradedNote: "A degraded system loses control of water.",
  functioningIntro: "A functioning biological system:",
  functioningSteps: [
    "receives it",
    "infiltrates it",
    "stores it",
    "protects it",
    "makes it accessible to roots",
    "uses it in production",
    "returns it through plants",
    "and allows appropriate excess to continue through the landscape hydrological cycle",
  ],
  fromLabel: "Supplying water to a crop",
  toLabel: "Managing the biological architecture of the water cycle",
};

export const continueScience = {
  closingLine: "SOIL ↔ PLANTS ↔ WATER ↔ BIODIVERSITY",
  biodiversityTagline: "The Stability Engine of the Living Production System",
};

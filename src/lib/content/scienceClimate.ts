/**
 * Content for /science/climate, the eighth Science detail page (after
 * /science/transition, /science/soil, /science/plants, /science/water,
 * /science/biodiversity, /science/nutrition and /science/crop-protection).
 */

export const hero = {
  eyebrow: "PQNK Science · Climate",
  title: "Climate — Restoring the Climate Function of Living Land",
  body: [
    "Agricultural climate discussion commonly narrows to atmospheric carbon accounting: what farming emits, and how to offset it.",
    "PQNK approaches climate differently. Agricultural land is part of the Earth's climate-moderation system — its surface partitions solar energy, moves water, cycles carbon and exchanges heat with the atmosphere every day, whether or not anyone is counting emissions.",
  ],
  callout: "Agricultural land is part of the Earth's climate-moderation system.",
};

export interface ChainPair {
  label: string;
  chain: string[];
}

export const landSurfaceOpening = {
  title: "Climate Begins at the Land Surface",
  intro: "Every hectare receiving sunlight must partition incoming energy. The condition of the land surface determines where that energy goes.",
  bare: {
    label: "Bare / Degraded Agricultural Land",
    chain: [
      "Solar Radiation",
      "Exposed Soil",
      "Extreme Surface Heating",
      "Accelerated Direct Soil-Water Loss",
      "Reduced Biological Activity and Plant Function",
      "Greater Sensible-Heat Loading of the Near-Surface Environment",
    ],
  } as ChainPair,
  living: {
    label: "Biologically Functioning PQNK Land",
    chain: [
      "Solar Radiation",
      "Living Plants + Organic Mulch",
      "Protected Soil Surface",
      "Moist, Biologically Active Root Zone",
      "Productive Plant Water Movement",
      "Evaporative/Transpirational Cooling + Photosynthesis + Biological Function",
    ],
  } as ChainPair,
  scopeNote: "Agricultural land alone does not control global climate — this comparison describes the land-surface energy pathway that PQNK changes.",
};

export const soilTemperature = {
  title: "Soil Temperature — The First Climate Boundary",
  observation: "Under hot summer conditions where ambient air temperatures reach approximately 45–50°C, exposed bare agricultural soil can exceed 70°C.",
  reduction: "Maintaining the soil under adequate organic mulch can reduce soil-surface temperature by approximately 30°C relative to exposed bare soil under these conditions.",
  labelNote: "This ~30°C figure is presented as the expected PQNK field-scale cooling magnitude under such extreme summer conditions — not a literal constant irrespective of conditions.",
  bare: {
    label: "Bare Soil",
    chain: ["Direct Solar Radiation", "Intense Surface Heating", "Extreme Soil Temperature", "Accelerated Direct Evaporation", "Biological Stress", "Greater Sensible-Heat Transfer"],
  } as ChainPair,
  mulched: {
    label: "Mulch-Covered PQNK Soil",
    chain: ["Solar Interception", "Protected Soil Surface", "Substantially Lower Soil Temperature", "Reduced Unproductive Direct Soil Evaporation", "Conserved Soil Moisture", "Protected Soil Biology", "Moderated Land-Surface Heating"],
  } as ChainPair,
  variabilityNote: "Actual temperature differences depend on factors such as mulch depth/material, soil moisture, solar radiation, soil properties, wind and measurement position.",
};

export const evaporationVsTranspiration = {
  title: "Evaporation Is Not Simply \"Wasted Water\"",
  intro: "Evaporation is a physical phase-change process and has a cooling effect, because converting liquid water to vapour consumes latent heat.",
  unproductive: {
    title: "Unproductive Direct Soil Evaporation",
    body: "Water leaves exposed agricultural soil without passing through the plant.",
    restrictedBy: ["permanent organic cover", "lower soil temperature", "improved infiltration", "improved retention", "maintained biological structure"],
  },
  productive: {
    title: "Productive Plant Water Movement / Transpiration",
    body: "Water moves soil → roots → plant → atmosphere.",
    supports: ["nutrient transport", "plant metabolism", "photosynthesis-related processes", "evaporative cooling of vegetation", "biological productivity"],
  },
  guardrail: "Transpiration is not wasted water.",
  linkLabel: "Continue with Water Science",
  linkHref: "/science/water",
};

export const oceanQuestion = {
  title: "Evaporative Cooling and the Ocean Question",
  mechanism: "Evaporation removes heat from a liquid surface through latent heat transfer.",
  chain: ["Reduced Evaporative Heat Loss", "Reduced Latent Cooling", "Greater Retention of Heat in the Water Body"],
  possibleContribution: "This physical relationship may contribute to warmer surface-water conditions, all else being equal.",
  boundary:
    "Evaporation is also a cooling process. Where evaporative heat loss from a water surface is reduced, one pathway of latent cooling is correspondingly reduced. The climatic behaviour of oceans, however, is controlled by multiple interacting processes, so this mechanism should not be interpreted as a single-cause explanation of observed ocean warming.",
  variablesIntro: "Ocean evaporation and ocean heat content are governed by multiple interacting variables, including:",
  variables: ["sea-surface temperature", "air-sea humidity gradient", "wind speed", "atmospheric circulation", "incoming and outgoing radiation", "ocean circulation", "greenhouse forcing"],
};

export const waterEnergyCycle = {
  title: "The Water Cycle Is Also an Energy Cycle",
  chain: [
    "Sun",
    "Water Evaporation / Plant Transpiration",
    "Latent Heat Transfer",
    "Atmospheric Water Vapour",
    "Condensation / Cloud Processes",
    "Precipitation",
    "Infiltration / Storage / Biological Use",
    "Return of Water Through Plants and Other Surface Fluxes",
  ],
  statement: "Water does not merely move mass. It also transports energy.",
  implication: "Disturbance of the water cycle therefore also changes the way energy is partitioned between land, vegetation and atmosphere.",
  scopeNote: "This is a systems relationship, not a claim of simple one-direction causation with specific weather events.",
};

export const infiltrationUsableWater = {
  title: "Infiltration — Rainfall Is Not the Same as Usable Water",
  intro: "The amount of rain falling on a hectare does not tell us how much water becomes biologically useful.",
  pathways: ["infiltrate", "run off", "evaporate directly", "remain temporarily stored", "move deeper into the profile", "become available to roots", "return through transpiration"],
  supportFactors: ["organic mulch", "undisturbed soil structure", "root channels", "soil organisms", "aggregates and pores"],
  statement: "Together, these support rapid infiltration and storage under PQNK.",
};

export const rainfallVolume = {
  title: "Rainfall Volume — Making the Scale Understandable",
  reference: "1 mm of rainfall over 1 acre ≈ 4,047 litres of water.",
  formula: "Rainfall Water (litres) = Rainfall (mm) × Area (acres) × 4,047",
  guardrail: "Rainfall volume is not equivalent to plant-available water. What matters is what happens after the rain reaches the land surface.",
  bridge: "This creates the bridge to infiltration, storage, evaporation and biological use.",
};

export interface WaterUseRow {
  crop: string;
  value: string;
}

export const waterUseObservations = {
  title: "PQNK Water-Use Observations",
  intro: "PQNK field material contains historical comparisons between conventional flood-irrigation water requirements and Soil Moisture Management on mulch-covered raised beds, expressed as a share of conventional water use:",
  table: [
    { crop: "Wheat", value: "approximately 19%" },
    { crop: "Cotton", value: "approximately 23%" },
    { crop: "Autumn corn", value: "20–23% range in historical calculations" },
    { crop: "Spring corn", value: "approximately 20–23%" },
    { crop: "Potato", value: "approximately 23%" },
    { crop: "Sugarcane", value: "approximately 12%" },
    { crop: "Rice", value: "approximately 8%" },
  ] as WaterUseRow[],
  riceNote:
    "Historical rice calculations have varied: one older SMM table records approximately 4,699 litres/kg conventional versus approximately 367 litres/kg, while other PQNK records/calculations have used approximately 321 litres/kg depending on the field dataset and calculation.",
  noCombineNote: "These inconsistent historical figures are reported separately here rather than silently combined into a single number.",
  labelNote: "These are PQNK field observations and historical operational calculations, not universal crop coefficients. Actual savings must be established through field measurement.",
  distinctionStatement:
    "Total plant water use is not the same thing as externally supplied irrigation water. A crop can continue moving substantial quantities of water biologically while irrigation demand falls, because rainfall is better infiltrated and stored and direct non-productive losses are restricted.",
  linkLabel: "Continue with Water Science",
  linkHref: "/science/water",
};

export const rainDewHumidity = {
  title: "Rain, Dew and Atmospheric Humidity",
  body: "Organic mulch can absorb and interact with dew and atmospheric humidity, supplementing water availability at the mulch–soil interface.",
  guardrails: [
    "No unsupported fixed percentage of crop water requirement is assigned to dew or atmospheric humidity.",
    "Dew and atmospheric humidity are not merged into one quantified water source.",
  ],
  statement: "PQNK improves the effectiveness of water already entering or interacting with the land system.",
  linkLabel: "Continue with Water Science",
  linkHref: "/science/water",
};

export const bareVsLiving = {
  title: "Bare Land Versus Living Land",
  bare: {
    label: "Bare / Conventionally Disturbed Land",
    items: ["direct solar exposure", "high soil temperature", "low protective cover", "rapid direct soil evaporation", "reduced infiltration where structure is degraded", "runoff risk", "disrupted soil biology", "reduced root continuity", "lower biological buffering of heat and water"],
  },
  living: {
    label: "Living PQNK Land",
    items: ["permanent organic cover", "living roots", "undisturbed soil architecture", "high biological activity", "improved infiltration", "moisture storage", "moderated soil temperature", "plant transpiration", "photosynthesis", "biodiversity", "continuous carbon cycling"],
  },
  statement: "The point is not merely carbon sequestration. It is restoration of function.",
};

export const photosynthesisEntry = {
  title: "Photosynthesis — The Solar-Energy Entry Point",
  chain: ["Atmospheric CO₂ + Water + Solar Energy", "Photosynthesis", "Plant Biomass", "Roots + Residues + Exudates", "Soil Organisms", "Soil Organic Matter / Biological Carbon Cycling"],
  functionsIntro: "Living vegetation therefore performs several functions simultaneously:",
  functions: ["captures carbon", "converts solar energy", "builds biomass", "feeds soil organisms", "supports soil structure", "drives transpiration", "shades/protects the soil", "participates in water cycling"],
  guardrail: "Plants are not reducible to carbon-capture machines.",
};

export const carbonSystem = {
  title: "Agricultural Soil as a Carbon System",
  distinction: {
    left: { name: "Carbon capture", body: "Plants capture atmospheric carbon through photosynthesis." },
    right: { name: "Carbon retention", body: "Whether a meaningful portion remains in the soil system depends on what happens to roots, residues, exudates, microbial biomass and soil aggregates." },
  },
  disturbanceNote: "Conventional repeated disturbance can accelerate oxidation and disrupt aggregates and fungal networks.",
  pqnkMaintainsIntro: "PQNK instead maintains:",
  pqnkMaintains: ["no routine soil disturbance", "living roots", "retained crop roots", "surface residues/mulch", "biodiversity", "continuous biological processing"],
  guardrail: "No universal tonnes-of-carbon-per-hectare sequestration rate is promised, and no carbon-credit numbers are used here.",
};

export const forestsAgriculture = {
  title: "Forests and Agriculture — Correcting a Conceptual Error",
  body: "Forests and crops both use photosynthesis. The biological carbon-capture mechanism is not exclusive to forests.",
  difference: "The major difference is how the ecosystem is managed after carbon enters biological material.",
  forestRetainsIntro: "A forest generally retains:",
  forestRetains: ["permanent soil cover", "living roots", "residues", "biodiversity", "minimal mechanical soil disturbance"],
  agricultureDisrupts: "Industrial agriculture often repeatedly removes or disrupts these conditions.",
  objective: "PQNK seeks to restore those ecosystem functions to production agriculture while continuing food production.",
  guardrail: "Cropland is not claimed to automatically store more carbon than forests, and no unsupported productivity multipliers are used.",
};

export const biodiversityClimate = {
  title: "The Climate Function of Biodiversity",
  supports: ["decomposition", "nutrient cycling", "aggregation", "root function", "biological regulation", "carbon transformation", "soil structure", "water movement"],
  statement: "Biodiversity participates indirectly in climate moderation by maintaining the biological machinery through which soil, plants, carbon and water remain connected.",
  guardrail: "Biodiversity does not control climate.",
  linkLabel: "Continue with Biodiversity Science",
  linkHref: "/science/biodiversity",
};

export interface HabitatPrinciple {
  name: string;
  body: string;
}

export const habitatPrinciples: HabitatPrinciple[] = [
  { name: "No Soil Disturbance", body: "Preserves aggregates, pores, roots, fungal networks and soil carbon architecture." },
  { name: "No Inundation", body: "Maintains aerated biological soil and avoids unnecessary saturation/flooding." },
  { name: "Permanent Biological Cover", body: "Intercepts solar radiation, lowers soil temperature, suppresses direct evaporation and protects biology." },
  { name: "Maximum Biodiversity", body: "Maintains nutrient, carbon, soil-structure and ecological-regulation processes." },
];

export const principlesConvergence = ["Four Principles", "Functional Soil", "Healthy Plants", "Efficient Water Cycling", "Biological Carbon Cycling", "Moderated Land-Surface Energy Exchange", "Climate Resilience"];

export const heatIsland = {
  title: "Heat Island and Land-Surface Heating",
  body: "Large areas of exposed, dry agricultural soil can become powerful heat-absorbing surfaces.",
  mechanism:
    "Loss of vegetation, mulch and soil moisture alters the surface energy balance. Dry exposed land generally partitions more available energy into sensible heating, whereas moist vegetated surfaces can partition more energy into latent heat flux through evapotranspiration.",
  connectionNote: "This connects to the bare-soil temperatures exceeding 70°C observed under extreme summer conditions described above.",
  guardrail: "This is not a claim that industrial agriculture alone creates climate change.",
};

export const climateResilience = {
  title: "Climate Resilience Is Not Only Emissions Reduction",
  intro: "PQNK climate resilience is presented as the restoration of land function.",
  scenarios: [
    { condition: "During intense rainfall", response: "better infiltration and storage can reduce rapid surface loss." },
    { condition: "During heat", response: "mulch and vegetation protect the soil surface." },
    { condition: "During dry periods", response: "stored soil moisture and reduced direct evaporation extend biological function." },
    { condition: "During irrigation scarcity", response: "better soil-water management can reduce dependence on externally supplied irrigation." },
    { condition: "During biological stress", response: "biodiversity and functional soil increase system buffering capacity." },
  ],
  guardrail: "PQNK does not promise immunity from drought, flood, heatwaves or extreme weather.",
};

export const evidenceArchitecture = {
  title: "Mechanism, Field Observation, Measurement and Validation",
  levels: [
    { name: "Mechanism", body: "Explains why the system can behave differently." },
    { name: "Field Observation", body: "Shows what has been observed under PQNK management." },
    { name: "Measurement", body: "Establishes the magnitude under a particular field, crop and climate." },
    { name: "Validation", body: "Determines whether the claimed outcome is demonstrated." },
  ],
  guardrail: "Operational PQNK observations are not treated as universal scientific constants.",
  linkLabel: "PQNK Validation",
  linkHref: "/validation",
};

export const scienceApplication = {
  science: "Land-surface energy partitioning depends on cover, moisture and biological activity. Water transports both mass and energy. Carbon capture requires photosynthesis; carbon retention requires undisturbed soil biology.",
  application: "Local variation includes climate zone, crop, soil type, rainfall pattern, mulch material and availability, field geometry and management history.",
  closing: "Science is universal. Application is local.",
};

export const climateSystemLoop = {
  title: "The Integrated PQNK Climate System",
  steps: ["Soil", "Plants", "Water", "Biodiversity", "Carbon + Energy Exchange", "Climate Resilience"],
};

export const finalProposition = {
  statement: "PQNK does not attempt to engineer the climate from above. It restores the biological surface through which soil, water, plants, carbon and solar energy interact.",
  problemStatement: "The climate problem of agriculture is not only what farming emits. It is also what happens when living land stops functioning as living land.",
  restoreList: ["Restore the soil.", "Cover the surface.", "Restore the water cycle.", "Restore the plants.", "Restore biodiversity."],
  conclusion: "The climate function follows from the restored system.",
};

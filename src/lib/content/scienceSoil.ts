/**
 * Content for /science/soil, the second Science detail page (after
 * /science/transition). Follows the same content/component pattern —
 * see scienceTransition.ts for the sibling file.
 */

export const hero = {
  eyebrow: "PQNK Science · Soil",
  title: "Soil — The Living Production System",
  body: [
    "Soil is not an inert growing medium. It is a living production system.",
    "Its productivity emerges through interaction among soil particles, aggregates, pore spaces, air, water, roots, microorganisms, fungi, mycorrhizae, organic matter and geological minerals.",
    "None of these operates independently. Production emerges from how they interact.",
  ],
};

export interface ChainStep {
  label: string;
}

export const soilSystemChain: string[] = [
  "Mineral Particles",
  "Aggregates",
  "Pores",
  "Air + Water",
  "Roots",
  "Microorganisms + Fungi",
  "Nutrient Cycling",
  "Plant Growth",
  "Biomass + Roots",
];

export const soilSystem = {
  title: "The Soil System",
  loopClosingLabel: "Soil",
  intro:
    "Plants do not merely extract resources from soil. They actively participate in building and maintaining the soil system through roots, root exudates, biological relationships and returned biomass.",
  callout: "The plant is part of the machinery that builds the soil from which the next plant grows.",
};

export const physicalArchitecture = {
  title: "Physical Architecture Comes First",
  intro:
    "Before fertilizer, deficiency or soil chemistry, the physical architecture of soil governs what's possible. Natural functioning soil is not a solid block. It contains aggregates and a three-dimensional network of pores of different sizes.",
  functions: [
    "infiltration",
    "seepage and redistribution of water",
    "air movement and gas exchange",
    "root penetration",
    "fungal growth",
    "microbial habitat",
    "biological interaction",
  ],
  statement: "PQNK therefore treats soil architecture as production infrastructure.",
  reframe: [
    "PQNK does not reduce soil productivity to the amount of nutrients detected by laboratory analysis.",
    "The relevant question is not only: what nutrients are present?",
    "It is also: can roots, water, air and biology reach, transform and cycle what is already there?",
  ],
};

export const degradation = {
  title: "How Repeated Disturbance Degrades the System",
  chain: [
    "Repeated Soil Disturbance",
    "Aggregate and Pore-System Damage",
    "Loss of Continuous Pore Architecture",
    "Compaction",
    "Restricted Air and Water Movement",
    "Restricted Root Exploration",
    "Declining Biological Function",
    "Hardpan Formation Where Compaction Becomes Severe",
    "Increasing Dependence on External Inputs",
  ],
  hardpanNote:
    "Hardpan is a consequence of this deeper structural degradation, not the original problem. Breaking hardpan while continuing the management that created it simply starts the degradation cycle again.",
  correctiveNote:
    "PQNK breaks inherited physical restrictions during Corrective Intervention so that permanent non-disturbance can subsequently begin.",
  resourceLinkLabel: "Breaking the Hardpan",
  resourceLinkHref: "/resources/breaking-the-hardpan",
  machineLinkLabel: "The Hardpan Breaker",
  machineLinkHref: "/machines/hardpan-breaker",
};

export const pores = {
  title: "Soil Pores Are Production Space",
  intro:
    "What visually appears to be empty space within soil is actually essential production space. Pores accommodate water, contain air, permit gas exchange, provide root pathways, provide biological habitat, allow infiltration, and allow seepage and redistribution through the profile.",
  statement:
    "A soil containing abundant geological minerals but damaged pore architecture can function poorly because the biological system cannot effectively access and cycle those resources.",
};

export const waterAir = {
  title: "Water and Air Must Occupy the Same Soil",
  intro:
    "Plants require water, but roots are living organs and also require oxygen. More water does not automatically create better growing conditions.",
  gradient: {
    title: "Temporary spatial gradient after supplemental furrow irrigation",
    body: "Following supplemental furrow irrigation, water seeps laterally through the raised-bed profile. Near the wetted furrow edge, the temporary condition may approach approximately 90% water : 10% air. Moving toward the centre of the bed, water decreases and air increases, potentially approaching 10% water : 90% air. Roots are free to explore this gradient and occupy zones according to changing requirements for water, air and nutrients.",
  },
  sustained: {
    title: "Sustained biological condition",
    body: "When PQNK has matured and natural moisture processes are functioning effectively, soil biology tends to maintain a broadly sustained condition around 30% water : 70% air.",
    note: "This is a description of a functioning biological condition. It is not an irrigation target to be artificially manufactured.",
  },
};

export const roots = {
  title: "Roots Are Biological Engineers",
  intro: "Roots are not merely water- and nutrient-absorption organs.",
  functions: [
    "penetrate soil",
    "create biological channels",
    "interact with aggregates",
    "support rhizosphere organisms",
    "release root exudates",
    "move carbon derived from photosynthesis below ground",
    "leave pathways behind when they die",
    "contribute organic material throughout the profile",
  ],
  retentionNote: "PQNK therefore retains roots in the soil after crops and cover crops complete their productive role.",
  pair: {
    above: "Above-ground biomass protects and feeds the soil from above.",
    below: "Roots build and feed the soil from within.",
  },
};

export const rhizosphere = {
  title: "The Rhizosphere — Where Plant and Soil Meet",
  intro:
    "The rhizosphere is the biologically active interface between plant roots and soil. Plants do not simply wait for soluble fertilizer ions to arrive — through root exudates they release carbon compounds that support microbial communities around roots.",
  organismRoles: ["decomposition", "nutrient transformation", "biological interaction", "mineral mobilization", "nutrient cycling"],
  cycle: [
    "Plant supplies biological energy",
    "Biology participates in transformation and cycling",
    "Soil provides habitat, minerals and water",
    "Plant receives resources",
    "Photosynthesis supplies further energy",
  ],
};

export const mycorrhizae = {
  title: "Fungi and Mycorrhizae Extend Root Exploration",
  intro:
    "Roots cannot physically occupy every microscopic part of soil. Fungal networks extend biological exploration beyond the root surface. Mycorrhizal fungi form relationships with roots and extend fine hyphae into soil spaces inaccessible to larger roots.",
  damage: "Repeated disturbance damages these networks. Inundation and prolonged oxygen deficiency also undermine the habitat required by much of this biology.",
  notInput:
    "Mycorrhizae are not a separate PQNK input or technique. They are part of the biological system that emerges when the habitat is protected through No Soil Disturbance, No Inundation, Permanent Biological Cover and Maximum Biodiversity.",
};

export const microorganisms = {
  title: "Microorganisms Are Production Machinery",
  intro: "Bacteria, fungi and other organisms participate in decomposition, mineral transformation, nutrient cycling, aggregation, rhizosphere interactions, and wider soil biological processes.",
  reframe:
    "PQNK is not merely agriculture \"without fertilizer.\" The deeper transition is from routine nutrient substitution toward biological nutrient cycling, with supplementation used only when system recovery demonstrably requires support.",
  supplementNote: "During regeneration, supplementation may occasionally support recovery where visible deficiency appears.",
};

export const mineralReserve = {
  title: "Geological Soil Is a Mineral Reserve",
  intro: "There's a distinction between total mineral quantity and immediate biological availability to plants.",
  question:
    "The central question is not merely how much phosphorus, potassium or another mineral exists in the geological soil. The question is whether the functioning biological system can reach it, transform it, mobilize it, and transport the required fraction to the plant.",
  agents: [
    "Water participates as a carrier.",
    "Roots explore the profile.",
    "Microorganisms participate in transformation.",
    "Fungi enlarge the zone of biological access.",
    "Rhizosphere activity modifies the immediate root environment.",
  ],
  diagnosisNote: "This is not a claim that every deficiency can simply be ignored. The correct PQNK principle is diagnosis before supplementation.",
};

export const organicMatter = {
  title: "Organic Matter Is More Than Fertilizer",
  aboveGround: {
    title: "Above-ground residues",
    items: [
      "protect the soil surface",
      "intercept solar radiation",
      "reduce direct evaporation",
      "moderate temperature",
      "intercept raindrop impact",
      "support decomposer organisms",
      "contribute carbon",
    ],
  },
  belowGround: {
    title: "Below-ground retained roots",
    items: ["distribute organic material throughout the profile", "maintain biological channels", "feed biological processes from within the soil"],
  },
  statement: "Permanent Biological Cover is part of the operating architecture of the soil system. Mulch is not a cosmetic covering.",
};

export const waterConservation = {
  title: "Infiltration, Seepage, Absorption, Retention — and Restricting Evaporation",
  formula: "Water conservation under PQNK = Better entry and storage + Restricted evaporative loss.",
  partOne: {
    title: "Part One — Getting water into and retaining it within the soil system",
    body: [
      "Rain falling on agricultural land can follow very different pathways. On structurally degraded, compacted or sealed soil, infiltration is restricted — water may run across the surface, collect in depressions, cause erosion or leave the field.",
      "A protected porous PQNK soil architecture promotes infiltration, seepage, absorption and retention. Water can move into and through the profile, contribute to stored soil moisture and, where hydrological conditions permit, move deeper toward groundwater reserves and aquifer recharge.",
    ],
    pathway: ["Infiltration", "Seepage", "Absorption", "Retention"],
  },
  partTwo: {
    title: "Part Two — Preventing unnecessary return to the atmosphere",
    body: "Water retained in the soil can still be lost rapidly if the soil remains bare. Bare soil exposed directly to solar radiation and wind develops an evaporative pathway from moist soil toward the atmosphere. Permanent organic mulch changes this.",
    mulchFunctions: [
      "shields the soil from direct solar radiation",
      "reduces surface heating",
      "reduces wind exposure at the soil surface",
      "interrupts the direct capillary pathway between moist soil and the exposed atmosphere",
      "restricts evaporation",
      "helps retain moisture within the soil–mulch environment",
    ],
  },
  approvedFormulation:
    "PQNK reduces the water that must be externally supplied through two complementary processes: first, by improving infiltration, seepage, absorption and retention of water within the soil profile; and second, by restricting its return to the atmosphere through evaporation. Permanent organic mulch breaks the direct capillary pathway between moist soil and the exposed atmosphere, while also shielding the surface from solar radiation and wind. Water is therefore conserved within the soil–plant system rather than being rapidly lost from bare soil.",
};

export const climateWaterCycle = {
  title: "Evaporation, Land Heating and the Water Cycle",
  intro:
    "When large areas of agricultural soil are bare, degraded and directly heated by solar radiation, a major pathway of water moves back toward the atmosphere through direct evaporation. The exposed land surface also heats strongly, altering the exchange of water and energy between land and atmosphere.",
  scaleNote:
    "Across extensive agricultural landscapes, disturbance of this land–water–energy relationship can contribute to disruption of local and regional water cycling and greater weather instability.",
  contrast: {
    bare: "Bare degraded land rapidly loses water and heat to the atmosphere.",
    covered: "Living covered land receives, stores, circulates and biologically returns water.",
  },
  objective: "PQNK seeks to turn agricultural land from a surface that sheds and rapidly loses water into a living structure that receives, stores and cycles water.",
  scopeNote:
    "This is not the claim that agriculture is the sole cause of all erratic weather. The mechanism described is the disturbance of the land–water–energy cycle across large exposed landscapes.",
  engineeringNote:
    "Tractor tyres must remain within properly designed furrows and must not compact bed sides, because side compaction reduces seepage and infiltration into the protected biological bed.",
};

export const dewAtmosphere = {
  title: "Dew and Atmospheric Moisture",
  intro: "A permanently covered soil surface interacts with atmospheric moisture differently from bare soil.",
  dew: {
    title: "Dew",
    body: "During dew formation, water condenses onto vegetation, residues and organic mulch. The mulch absorbs and retains this water. Through contact points, cavities and capillary movement within the mulch–soil interface, this moisture can move downward and contribute to wetting the protected soil.",
    pathway: ["Dew", "Captured by mulch", "Absorbed and retained", "Transferred through the mulch–soil interface", "Contributes to soil moisture"],
  },
  humidity: {
    title: "Atmospheric humidity",
    body: "Dry organic mulch can also absorb moisture from humid atmospheric air. As mulch absorbs atmospheric moisture, that water becomes part of the protected mulch–soil microenvironment and contributes to moistening the soil beneath.",
    pathway: ["Atmospheric humidity", "Absorbed by dry organic mulch", "Retained within the mulch–soil environment", "Contributes to soil moisture"],
  },
  combinedNote: "Permanent cover simultaneously captures atmospheric moisture, retains deposited water, and restricts evaporation.",
};

export const plantWaterUse = {
  title: "Total Plant Water Use Is Not Externally Supplied Irrigation",
  uses: ["transpiration", "nutrient transport", "evaporative cooling", "photosynthetic and other biological processes"],
  statement: "PQNK does not mean the plant stops requiring water. It reduces the quantity of water that must be externally supplied.",
  mechanism: {
    improves: "capture, infiltration, seepage, absorption, retention, access and biological cycling",
    restricts: "direct evaporative loss from the soil surface",
  },
  precisionNote: "\"Externally supplied irrigation water\" should not be replaced with the inaccurate shorthand \"water use\" where the distinction matters.",
};

export const smmDiagnosis = {
  title: "Soil Moisture Diagnosis Begins With Plant Observation — but Ends in the Soil",
  intro:
    "A Production Manager walking through a field may first observe wilting. That observation is valuable because it prompts investigation. But wilting alone does not prove that irrigation is required.",
  wiltingNote:
    "A plant may wilt even where soil moisture is adequate because transpiration from leaves temporarily exceeds the rate at which roots can transfer water upward. Possible causes include high temperature, low atmospheric humidity, wind, and natural crop maturity.",
  sequence: [
    { label: "Observation", body: "Plant wilting is noticed." },
    { label: "Investigation", body: "Root-zone soil is examined." },
    { label: "Diagnosis", body: "Soil is tested by forming a ball." },
    { label: "Management Decision", body: "Irrigate only if soil moisture confirms the need." },
  ],
  closing: "The ball test confirms the diagnosis; plant observation tells the Production Manager when investigation may be necessary.",
  resourceLinkLabel: "Soil Moisture Management (SMM)",
  resourceLinkHref: "/resources/moisture-based-irrigation",
};

export const biologicalCover = {
  title: "Permanent Biological Cover — Including Weeds as Nature's Rescue Workers",
  intro:
    "Permanent Biological Cover is a habitat rule, not merely the deliberate placement of crop residue. PQNK also changes how spontaneous vegetation — conventionally called weeds — is understood.",
  reframe:
    "In a disturbed ecosystem, spontaneous vegetation can function as part of nature's repair response. The type of vegetation appearing on degraded land can reflect the repair function being performed.",
  types: [
    { name: "Narrow-leaf plants", body: "Help penetrate and reopen damaged soil. Their root systems can occupy compacted soil, create biological channels and contribute to reopening damaged pore architecture." },
    { name: "Broadleaf plants", body: "Help cover and protect exposed soil from radiation. Their canopy can rapidly shade exposed ground, reduce direct solar radiation and contribute protective biological cover." },
  ],
  label: "Nature's rescue workers",
  concept: "Damaged/open soil → spontaneous biological response → plants arrive that help repair or protect the exposed system.",
  caveat:
    "This is not an instruction that every weed must remain uncontrolled indefinitely. The Production Manager must understand what ecological function spontaneous vegetation may be performing before automatically destroying it. Permanent Biological Cover remains the governing principle.",
};

export const biodiversity = {
  title: "Biodiversity Creates Stability",
  intro: "Maximum Biodiversity is a production function, not simply an environmental aspiration. Different plants produce different root architectures, occupy different soil depths, release different root compounds, support different organisms, contribute different biomass, and occupy different ecological niches.",
  encourages: ["cover crops", "crop combinations", "crop-after-crop production", "crop-in-crop arrangements", "continued biological occupation"],
  objective: "The objective is not complexity for its own sake. It is functional diversity.",
};

export interface HabitatPrinciple {
  name: string;
  body: string;
}

export const habitatPrinciples: HabitatPrinciple[] = [
  { name: "No Soil Disturbance", body: "Protects aggregates, pore continuity, biological channels, retained roots, fungal networks and soil habitat." },
  { name: "No Inundation", body: "Maintains the coexistence of water and air required by roots and aerobic soil biology." },
  { name: "Permanent Biological Cover", body: "Protects soil from radiation, excessive heating and evaporation; captures and retains moisture; feeds biological processes; and keeps the soil surface biologically occupied. Includes spontaneous vegetation's rescue-worker role." },
  { name: "Maximum Biodiversity", body: "Expands biological interactions, root architectures, nutrient cycling and ecological stability." },
];

export const habitatClosing = "These are not four unrelated farming practices. They are four rules for protecting the habitat in which the living production system operates.";

export const soilTemperature = {
  title: "Soil Temperature Is a Biological Variable",
  intro: "Bare soil absorbs solar radiation and can reach temperatures that severely impair biological activity, root function, moisture retention, and the soil microenvironment.",
  mulchFunctions: ["intercepts radiation", "reduces direct surface heating", "reduces evaporation", "moderates temperature fluctuations", "protects biological habitat"],
  diagnosticPoint: "A farmer may attempt to solve a crop problem by adding water when the underlying stress is excessive heat. Water cannot substitute for habitat. PQNK therefore manages the soil environment, not water in isolation.",
};

export const scienceApplication = {
  science: "Protect structure. Maintain water and air. Maintain biological cover. Encourage biodiversity. Allow roots and organisms to continuously occupy the soil.",
  application:
    "What changes is field application and engineering: crop and row spacing according to breeder recommendations, tractor wheel-track geometry, tyre width, bed/furrow geometry, locally appropriate cover-crop species, and irrigation timing/frequency according to soil moisture, rainfall, weather and crop condition.",
  intro:
    "The underlying biological science does not change between wheat, rice, cotton, maize, vegetables, orchards, sandy soils, clay soils, different topographies or different climatic zones.",
  closing: "Science is universal. Application is local.",
};

export const notReplacement = {
  title: "Soil Restoration Is Not Soil Replacement",
  substitutions: [
    { weak: "Weak nutrient cycling", substitute: "fertilizer" },
    { weak: "Poor infiltration", substitute: "more irrigation" },
    { weak: "Restricted roots", substitute: "more cultivation" },
    { weak: "Weak biological pest regulation", substitute: "pesticide" },
  ],
  intro: "When natural soil functions decline, conventional agriculture often substitutes externally. These interventions may address immediate symptoms while leaving the damaged production architecture unchanged.",
  question: "PQNK asks: what function has been lost, and what prevents the soil–plant system from performing it?",
  sequence: "Corrective Intervention removes inherited barriers. Regeneration rebuilds biological function. The Sustained Closed Loop protects the recovered system.",
  objective: "The objective is not to manufacture a better artificial soil. It is to restore the soil's capacity to function as a living production system.",
};

export const returningFunction = {
  title: "What a Functioning PQNK Soil Begins to Do",
  changes: [
    "infiltration improves",
    "seepage improves",
    "moisture retention improves",
    "unnecessary evaporation declines",
    "air remains within the root zone",
    "roots explore a larger soil volume",
    "biological channels accumulate",
    "crop roots remain in the profile",
    "residues remain on the surface",
    "fungal continuity improves",
    "biological nutrient cycling strengthens",
    "soil temperature becomes more moderated",
    "dependence upon mechanical disturbance declines",
    "externally supplied irrigation can decline",
    "routine fertilizer dependence can decline",
  ],
  closing: "These are not independent benefits. They are expressions of the same recovering system.",
};

export const judgedByFunction = {
  title: "Soil Recovery Must Be Judged by Function",
  questions: [
    "Can water infiltrate?",
    "Can water seep through and be retained within the profile?",
    "Is unnecessary direct evaporation restricted?",
    "Does the profile remain aerated?",
    "Can roots penetrate deeply and freely?",
    "Are roots occupying biological channels?",
    "Does the soil remain covered?",
    "Is biological activity evident?",
    "Is residue decomposing biologically?",
    "Is crop performance becoming less dependent upon external intervention?",
    "Is externally supplied irrigation declining as rainfall, stored moisture and soil architecture function more effectively?",
    "Are deficiency symptoms becoming less frequent?",
  ],
  closing: "The calendar tells us how long management has changed. Function tells us whether the soil has recovered.",
};

export const foundationalNotWhole = {
  title: "Soil Is Foundational — but Not the Whole System",
  points: [
    "Plants build soil.",
    "Soil receives, stores and transmits water.",
    "Water transports materials and supports biological processes.",
    "Biology transforms and cycles resources.",
    "Roots connect plants to biological and geological resources.",
    "Atmospheric processes supply carbon dioxide, moisture and biological nitrogen pathways.",
    "Sunlight powers photosynthesis.",
  ],
  closing: "PQNK is not reducible to \"soil health.\" It describes an interconnected natural production system.",
};

export const closingProposition = {
  statement:
    "Agricultural soil does not become productive because we continuously put production into it. It becomes productive when its physical architecture and biological habitat allow the soil–plant ecosystem to perform the production functions for which it is naturally equipped.",
  questionNot: "Not: \"What should we add?\"",
  questionBut: "But: \"What natural function have we prevented, and how do we restore it?\"",
};

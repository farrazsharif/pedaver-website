/**
 * Content for /science/transition, the first Science detail page. Establishes
 * the content shape a future /science/[slug] detail-page pattern (Soil,
 * Plants, Water, Biodiversity, ...) can reuse — kept concrete to this page
 * rather than generalized prematurely.
 */

export const hero = {
  eyebrow: "PQNK Science · Transition",
  title: "From a Degraded Production System to a Sustained Closed Loop",
  body: [
    "PQNK seeks to restore agriculture to a production system in which soil, plants, water and biodiversity increasingly perform the functions that conventional agriculture attempts to supply externally.",
    "But agricultural land carries a history.",
    "Repeated tillage may have collapsed soil pores and created compaction or hardpan. Years of inundation may have altered soil aeration and salt movement. Chemical residues and accumulated salts may remain. Soil may be bare, biologically depleted and structurally unable to infiltrate and store water effectively.",
    "Simply stopping fertilizer, pesticides or tillage does not instantly remove these physical and chemical legacies. The damaged production environment must first be corrected so that biology can function again.",
    "That is the purpose of the PQNK Transition.",
  ],
};

export const notSubstitution = {
  title: "Not Input Substitution",
  intro:
    "Much agricultural change substitutes one fertilizer for another, one pesticide for another, one tillage implement for another, one irrigation method for another. PQNK takes a different direction.",
  statement:
    "PQNK moves agriculture from substitution toward supplementation, and ultimately toward a system in which routine external production inputs become progressively unnecessary. During transition, supplementation or corrective intervention may still be required.",
  callout: "PQNK does not judge transition by how quickly inputs disappear. It judges transition by how completely natural production functions return.",
  closing: "The objective is not simply zero inputs. The objective is a functioning production ecosystem.",
};

export interface Stage {
  number: number;
  name: string;
  body: string;
}

export const stages: Stage[] = [
  { number: 1, name: "Degenerative", body: "The production system is losing natural function." },
  { number: 2, name: "Corrective Intervention", body: "Remove the barriers preventing recovery." },
  { number: 3, name: "Regenerative", body: "Allow biological functions to rebuild." },
  { number: 4, name: "Sustained Closed Loop", body: "Maintain the restored production environment." },
];

export const stageVisualCaption = {
  body: "A field cannot meaningfully be called regenerative merely because tillage has stopped.",
  question: "The question is: has the production environment regained the conditions required for biological function?",
};

export const stageOne = {
  title: "When Agriculture Replaces Functions It Has Weakened",
  intro:
    "A degenerative field is not defined merely by low yield. A high-yielding field can still be degenerating if production depends upon progressively greater mechanical, chemical and water intervention.",
  chain: [
    "Repeated Soil Disturbance",
    "Pore Collapse & Compaction",
    "Restricted Infiltration & Aeration",
    "Weaker Root Exploration",
    "Loss of Biological Habitat & Relationships",
    "Greater Dependence on Irrigation, Fertilizer & Crop Protection",
  ],
  bareSoil:
    "Without biological cover, soil receives direct solar radiation, loses moisture rapidly, experiences greater temperature extremes and has less continuous organic material entering its biological system.",
  inundation: "Inundation creates a different disturbance by displacing air from pore space.",
  conclusion:
    "The result is an agricultural environment increasingly maintained by external intervention rather than internal biological function.",
  diagnosisNote:
    "Not every conventionally managed field has identical degradation. The condition of the field must be diagnosed before correction is designed.",
};

export const stageTwo = {
  title: "Repair What Prevents Nature From Functioning",
  intro:
    "PQNK's permanent principle is No Soil Disturbance. Yet transition may require hardpan breaking, field reshaping or another physical correction.",
  explanation:
    "There is no contradiction. Repeated tillage is disturbance used as a recurring production practice. Corrective Intervention is a one-time repair intended to make repeated disturbance unnecessary. The difference is purpose, frequency and end state.",
  callout: "PQNK may disturb a damaged system once in order to stop disturbing it permanently.",
};

export interface CorrectiveOperation {
  name: string;
  body: string;
  linkLabel?: string;
  linkHref?: string;
  secondaryLinkLabel?: string;
  secondaryLinkHref?: string;
}

export const correctiveOperations: CorrectiveOperation[] = [
  {
    name: "Topography Survey",
    body: "Understand how water moves across the land and identify physical constraints affecting permanent production architecture.",
  },
  {
    name: "Farm & Irrigation-System Design",
    body: "Design the field before disturbing it so future production can occur within protected permanent biological beds and permanent hydraulic/traffic corridors.",
  },
  {
    name: "Hardpan Correction",
    body: "Where restrictive compaction exists, break it sufficiently to reconnect the soil profile and permit roots, water and air to move vertically.",
    linkLabel: "Breaking the Hardpan",
    linkHref: "/resources/breaking-the-hardpan",
    secondaryLinkLabel: "The Hardpan Breaker",
    secondaryLinkHref: "/machines/hardpan-breaker",
  },
  {
    name: "Water Wash & Conditional Chemical Correction",
    body: "Where previous management has left excessive salts, residues or high-pH conditions, corrective washing and conditional treatment may be required.",
    linkLabel: "Correcting Soil Chemistry with Water and Acid",
    linkHref: "/resources/soil-chemistry-correction",
  },
  {
    name: "Permanent Raised Beds",
    body: "Create the permanent physical architecture separating the protected biological growing zone from permanent traffic and hydraulic corridors.",
    linkLabel: "The PQNK Raised Bed System",
    linkHref: "/resources/permanent-raised-beds",
  },
  {
    name: "Establish Biological Cover",
    body: "Plant an appropriate transition cover crop such as Jantar, or an adapted equivalent where conditions require another species.",
    linkLabel: "Jantar Cover Cropping",
    linkHref: "/resources/jantar-cover-cropping",
  },
  {
    name: "Retain the Biological Structure",
    body: "Roots remain in the soil. Above-ground biomass becomes protective and biologically useful surface cover.",
    linkLabel: "Mulch and No-Till Planting",
    linkHref: "/resources/mulch-and-no-till",
  },
];

export const correctiveClosing = "Resources explains the operating procedures. Science explains why these interventions are necessary.";

export const turningPoint = {
  title: "From Mechanical Correction to Biological Reconstruction",
  intro: "Corrective Intervention creates opportunity. It does not itself create a sustained PQNK system.",
  pairs: [
    { limit: "A subsoiler can break a restrictive layer.", cannot: "It cannot manufacture a living soil." },
    { limit: "A bed shaper can create permanent geometry.", cannot: "It cannot create biodiversity." },
    { limit: "A water wash can remove accumulated constraints.", cannot: "It cannot build biological nutrient cycling." },
  ],
  callout: "Engineering creates the environment. Biology begins rebuilding the system.",
};

export const stageThree = {
  title: "Crop After Crop, the System Rebuilds Itself",
  intro: "Once the major physical and chemical barriers have been corrected, repeated disturbance stops.",
  points: [
    "Successive plants occupy the permanent beds.",
    "Roots penetrate the profile and remain after harvest.",
    "Root channels become pathways for air, water and future roots.",
    "Root exudates support rhizosphere organisms.",
    "Fungal and mycorrhizal relationships develop without repeated mechanical severance.",
    "Crop residues remain on the surface.",
    "Biological cover moderates temperature, reduces direct evaporation and supplies organic material to soil organisms.",
    "Biodiversity increases through crop combinations, crop-after-crop production and, where suitable, crop-in-crop arrangements.",
  ],
  conclusion: "The production environment progressively changes from one maintained mechanically to one maintained biologically.",
};

export const regenerationTimetable = {
  title: "Different Fields Recover at Different Rates",
  factors: [
    "starting soil condition",
    "severity and depth of compaction",
    "chemical legacy",
    "climate",
    "biological cover",
    "root development",
    "crop sequence",
    "water management",
    "completeness of PQNK implementation",
  ],
  body: "A few crop cycles may produce substantial change where corrective steps are properly executed.",
  callout: "But the stage of transition should be judged by system function, not simply by time elapsed.",
};

export const supplementation = {
  title: "Support Recovery Without Rebuilding Dependency",
  body: [
    "A regenerating field may occasionally show that biological functions are not yet fully meeting crop demand. PQNK allows limited supplementation where actual crop condition demonstrates need. Visible nutrient deficiency may justify limited NP supplementation.",
    "This does not redefine PQNK as a fertilizer programme. It recognises that biological recovery is a process.",
    "Likewise, serious pest pressure during transition may occasionally justify intervention while biodiversity and ecological regulation rebuild.",
  ],
  question: "Is the intervention supporting recovery, or replacing the system again?",
  distinction: {
    left: "Routine calendar application",
    leftLabel: "Dependency model",
    right: "Diagnosed supplementation",
    rightLabel: "Transition support",
  },
  note: "Supplementation is not mandatory.",
};

export const waterDuringTransition = {
  title: "From Water Supply to Water Supplementation",
  intro: [
    "Water management changes as the production environment changes. Hardpan is corrected where necessary. Permanent beds and furrows establish hydraulic architecture. Soil remains covered. Roots and biological pores progressively improve infiltration and storage.",
    "Water supplied through permanent furrows, when required, is supplemental rather than an inundation treatment. Rainfall, stored soil moisture, dew and atmospheric moisture contribute to the production environment.",
  ],
  sequence: [
    { label: "Observation", body: "Visible wilting may be the first field observation." },
    { label: "Investigation", body: "That observation prompts the Production Manager to investigate root-zone moisture." },
    { label: "Diagnosis", body: "The soil ball test confirms whether the crop is actually short of water." },
    { label: "Management Decision", body: "Supplemental irrigation is applied only when actual soil-moisture condition indicates need." },
  ],
  wiltingNote:
    "Wilting may also result from conditions such as high temperature, low humidity, wind or natural crop maturity even where soil moisture is adequate.",
  resourceLinkLabel: "Soil Moisture Management (SMM)",
  resourceLinkHref: "/resources/moisture-based-irrigation",
};

export interface FunctionalIndicator {
  name: string;
  body: string;
}

export const functionalIndicators: FunctionalIndicator[] = [
  { name: "Soil", body: "Improving aggregation, pore continuity, root penetration and biological activity." },
  { name: "Water", body: "Greater infiltration and retention, declining dependence on externally supplied irrigation and absence of routine inundation." },
  { name: "Plants", body: "Increasing root exploration, stronger biological relationships and declining dependence on corrective supplementation." },
  { name: "Biological Cover", body: "Continuous protection of the soil and progressive residue cycling." },
  { name: "Biodiversity", body: "Increasing biological occupation above and below ground." },
  { name: "Inputs", body: "Movement from routine application, to diagnosed supplementation, to declining requirement." },
  { name: "Production", body: "Increasing ability to sustain crops without repeatedly reconstructing the field mechanically." },
];

export const indicatorsNote = "These are transition indicators, not a rigid certification checklist.";

export const stageFour = {
  title: "When the Production System Becomes the Principal Input",
  notIsolation: "The Sustained Closed Loop is not a field where nothing enters and nothing leaves.",
  entriesExits: [
    "Sunlight enters.",
    "Carbon dioxide enters.",
    "Water cycles through the system.",
    "Atmospheric nitrogen can become biologically available.",
    "Seed enters when a new crop is established.",
    "Produce leaves at harvest.",
  ],
  definition:
    "Closed Loop refers to the restoration and retention of production functions that conventional agriculture repeatedly attempts to replace from outside.",
  changes: [
    "Soil architecture is no longer repeatedly rebuilt by tillage.",
    "Routine fertility is no longer maintained principally through bags of fertilizer.",
    "Routine chemical crop protection is no longer the principal means of ecological regulation.",
    "Water management no longer depends upon repeated inundation.",
    "Roots, residues, organisms, minerals, water and plants continue cycling through the production environment.",
  ],
  managerRole:
    "The Production Manager's role changes from repeatedly manufacturing crop conditions to protecting the conditions in which the production ecosystem functions.",
};

export const closedLoopManagement = {
  title: "Production Management Remains Essential",
  intro: "PQNK requires active observation. The Production Manager continues to:",
  duties: [
    "observe plants",
    "investigate symptoms",
    "check soil moisture when conditions indicate concern",
    "watch unusual pest populations",
    "maintain biological cover",
    "keep traffic within permanent corridors",
    "protect the permanent production architecture during planting and harvesting",
  ],
  distinction: "Management increasingly protects system function rather than routinely imposing external intervention.",
};

export interface PrincipleThroughTransition {
  name: string;
  body: string;
}

export const principlesThroughTransition: PrincipleThroughTransition[] = [
  { name: "No Soil Disturbance", body: "Correct the physical legacy once where required, then protect the architecture permanently." },
  { name: "No Inundation", body: "Move from flooding toward an aerated soil-water environment, using supplemental furrow water only when required." },
  { name: "Permanent Biological Cover", body: "Establish cover during transition and do not return the soil to routine exposure." },
  { name: "Maximum Biodiversity", body: "Move from simplified production toward increasing biological and crop relationships." },
];

export const principlesClosing = "The principles remain constant. What changes is the condition of the field.";

export const scienceApplication = {
  science: "A degraded production environment must regain the physical and biological conditions required for natural processes to function.",
  application:
    "The exact corrective operation depends upon diagnosis. One field may require deep hardpan correction. Another may have little restrictive compaction. High-pH correction is conditional. Cover-crop species may differ with climate. Bed/furrow dimensions adapt to tractor wheel-track and tyre profile while preserving the protected biological zone.",
  closing: "Science remains constant. Application responds to diagnosis.",
};

export const notInputPackage = {
  title: "Tools Do Not Define PQNK",
  intro:
    "A farmer may mechanically build beds, buy cover-crop seed, reduce fertilizer and still fail to establish PQNK. Why? Because PQNK is not defined by possession of particular tools.",
  sequence: [
    "A subsoiler is not PQNK.",
    "A raised bed is not PQNK.",
    "Mulch alone is not PQNK.",
    "No-till alone is not PQNK.",
    "Eliminating chemicals alone is not PQNK.",
  ],
  callout: "PQNK is the functioning system produced when its governing principles operate together.",
};

export const evidence = {
  title: "Transition Must Be Demonstrated Through Function",
  pathways: [
    "before/after soil condition",
    "root development",
    "water requirement",
    "externally supplied irrigation records",
    "crop condition",
    "input records",
    "pest-intervention records",
    "yield and quality",
    "farmer observations",
    "long-term field continuity",
  ],
  statement: "Transition should be demonstrated through changes in system function, not claimed merely because a farmer adopts the PQNK name.",
};

export interface SciencePathwayTopic {
  name: string;
  question: string;
}

export const sciencePathway: SciencePathwayTopic[] = [
  { name: "Soil", question: "What is being physically and biologically restored?" },
  { name: "Plants", question: "How do plants become active architects of the recovering ecosystem?" },
  { name: "Water", question: "How does restored soil architecture change water movement and irrigation dependence?" },
  { name: "Biodiversity", question: "How does biological occupation rebuild regulation and nutrient cycling?" },
  { name: "Natural Plant Nutrition", question: "How does fertility move from external supply toward biological access and cycling?" },
  { name: "Natural Crop Protection", question: "How does ecological regulation progressively replace routine chemical intervention?" },
  { name: "Production Architecture", question: "How is the science physically maintained in a working agricultural system?" },
];

export const closing = {
  title: "The End of Transition Is Not a New Farming Technique",
  intro: [
    "It is a different state of the production system.",
    "The journey begins with land whose natural functions have been progressively weakened and externally replaced.",
    "Corrective Intervention removes the major barriers. Regeneration rebuilds biological function crop after crop. The Sustained Closed Loop protects those functions so they continue.",
  ],
  notList: ["No tillage.", "No fertilizer.", "No pesticide.", "Less externally supplied irrigation."],
  notIntro: "The destination is not simply:",
  notOutro: "Those are consequences of something deeper.",
  final: "The destination is a production ecosystem that increasingly performs those functions for itself.",
};

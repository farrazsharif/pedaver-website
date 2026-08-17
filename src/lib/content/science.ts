/**
 * Content for the /science landing page. Detail pages (/science/[slug]) do
 * not exist yet — futureRoute is retained on each topic so the landing
 * page's data shape does not need to change when they're built.
 */

export interface ScienceTopic {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  futureRoute: string;
}

export const hero = {
  eyebrow: "PQNK Science",
  title: "Agriculture Did Not Invent Plant Production. Nature Did.",
  body: [
    "Long before agriculture, natural ecosystems were producing enormous quantities of plant biomass without ploughing the soil, flooding it, applying manufactured fertilizer or routinely protecting plants with pesticides.",
    "They did this through a living production system in which soil, plants, water and biodiversity functioned together.",
    "PQNK begins with a simple question: if nature already knows how to build soil, cycle water, nourish plants and regulate biological populations, why should agriculture work against those processes?",
    "PQNK studies those natural relationships and translates them into production agriculture. It is not an attempt to replace one agricultural input with another. It is an attempt to restore the production system itself.",
  ],
};

export const inheritedSystem = {
  title: "Agriculture Changed the Environment in Which Plants Grow",
  intro: [
    "The problem did not begin with fertilizer or pesticides. It began much earlier.",
    "Humans progressively moved from placing seed into soil with hand tools, to disturbing larger areas with animal power, and eventually to industrial machinery capable of repeatedly cutting, turning, pulverising and compacting entire soil profiles.",
    "This Ancient → Conventional → Industrial progression intensified the same fundamental intervention: disturbance of the natural soil system.",
    "Repeated disturbance damaged pore architecture. Compaction followed. Restrictive layers and hardpan developed. Water infiltration declined. Soil became increasingly exposed to heat and evaporation. Biological habitat deteriorated.",
    "As natural functions weakened, agriculture compensated with more external intervention. More tillage. More irrigation. More fertilizer. More crop protection.",
    "The production system gradually moved from biological function toward input dependence.",
  ],
  chain: [
    "Repeated Soil Disturbance",
    "Pore Collapse & Compaction",
    "Restricted Water and Air Movement",
    "Loss of Biological Habitat",
    "Weaker Root–Microbe Function",
    "Greater Dependence on External Inputs",
  ],
  closing:
    "PQNK therefore does not begin by asking which fertilizer should replace fertilizer. It asks: what happened to the production ecosystem?",
};

export interface CoreComponent {
  slug: "soil" | "plants" | "water" | "biodiversity";
  name: string;
  role: string;
  roleBody: string;
  exploreTitle: string;
  exploreSummary: string;
  futureRoute: string;
}

export const coreComponents: CoreComponent[] = [
  {
    slug: "soil",
    name: "Soil",
    role: "The Living Habitat",
    roleBody:
      "Soil is not simply material that holds a plant upright. Its pore architecture provides the physical environment in which roots, water, air, microorganisms, fungi, organic residues and geological minerals interact.",
    exploreTitle: "The Living Production System",
    exploreSummary:
      "How soil architecture, pores, roots, microorganisms, fungi, minerals, water and air create the physical and biological environment for production.",
    futureRoute: "/science/soil",
  },
  {
    slug: "plants",
    name: "Plants",
    role: "The Energy & Carbon Engine",
    roleBody:
      "Plants capture solar energy and atmospheric carbon through photosynthesis. Their roots penetrate the soil, release exudates, interact with microorganisms and fungi, create biological channels and return roots and residues to the soil.",
    exploreTitle: "The Biological Production Engine",
    exploreSummary:
      "How plants capture atmospheric carbon and solar energy, build roots, feed the rhizosphere, move water and minerals and participate in constructing their own production environment.",
    futureRoute: "/science/plants",
  },
  {
    slug: "water",
    name: "Water",
    role: "The Carrier & Circulatory System",
    roleBody:
      "Water moves through the soil and plant, carries dissolved minerals, participates in photosynthesis, enables biological processes and regulates plant temperature through transpiration.",
    exploreTitle: "Restoring the Natural Water Cycle",
    exploreSummary:
      "How infiltration, soil storage, roots, mulch, transpiration, rainfall and supplemental irrigation interact, and why managing water is fundamentally different from flooding soil.",
    futureRoute: "/science/water",
  },
  {
    slug: "biodiversity",
    name: "Biodiversity",
    role: "The Biological Workforce",
    roleBody:
      "Bacteria, fungi, mycorrhizae, insects, predators and other organisms participate in decomposition, nutrient cycling, mineral transformation, root relationships and ecological regulation.",
    exploreTitle: "Nature's Production Workforce",
    exploreSummary:
      "How microbial, fungal, plant, insect and predator diversity participates in nutrition, decomposition, soil formation and biological regulation.",
    futureRoute: "/science/biodiversity",
  },
];

export const centralIdea = {
  title: "Production Depends on Environment Before It Depends on Inputs",
  body: [
    "A microorganism cannot function merely because it has been added to soil.",
    "A root cannot explore soil merely because fertilizer is present.",
    "Mycorrhizae cannot build functioning networks in an environment repeatedly destroyed.",
    "Water cannot infiltrate effectively through a compacted profile simply because more irrigation is applied.",
    "The first requirement is therefore the environment in which biological processes operate. PQNK seeks to restore that environment.",
    "When pore architecture, aeration, moisture, biological cover, roots and biodiversity begin functioning together, the production system progressively regains processes that conventional agriculture attempts to replace externally.",
  ],
};

export const productionFunctions: ScienceTopic[] = [
  {
    slug: "nutrition",
    name: "Natural Plant Nutrition",
    tagline: "Feeding the Plant by Restoring the Nutrient Cycle",
    summary:
      "Plants require minerals, but the existence of minerals and their biological availability are not the same thing. PQNK examines the relationships among geological mineral reserves, microorganisms, fungi, roots, water and plant demand. During transition, limited supplementation may occasionally be required — but the objective is not permanent supplementation. It is restoration of nutrient cycling and biological access.",
    futureRoute: "/science/nutrition",
  },
  {
    slug: "crop-protection",
    name: "Natural Crop Protection",
    tagline: "Restoring Biological Regulation",
    summary:
      "Natural ecosystems are not free of insects, fungi or microorganisms. They remain productive because biological populations exist within relationships. PQNK approaches crop protection through biodiversity, plant condition, habitat and ecological regulation rather than assuming that the presence of an organism automatically requires eradication. Corrective intervention may still be necessary during transition — the direction of travel is toward biological regulation rather than routine chemical protection.",
    futureRoute: "/science/crop-protection",
  },
];

export const systemOutcomes: ScienceTopic[] = [
  {
    slug: "climate",
    name: "Climate & the Agricultural Water Cycle",
    tagline: "The Field's Role in the Larger Water Cycle",
    summary:
      "A covered, biologically active soil interacts with rainfall and atmospheric energy differently from bare, compacted agricultural land. PQNK Science examines how infiltration, evaporation, transpiration, vegetation, soil temperature, runoff and water storage connect the individual field to the larger water cycle.",
    futureRoute: "/science/climate",
  },
  {
    slug: "food-quality",
    name: "Food Quality & Human Nutrition",
    tagline: "Quality Begins Before Harvest",
    summary:
      "Food quality begins before harvest. The environment in which a plant grows influences mineral acquisition, plant metabolism, grain or fruit development, moisture relationships, storage behaviour, aroma, taste and other quality characteristics. PQNK treats food quality as an outcome of the production ecosystem, while PQNK Validation separately measures and authenticates those outcomes.",
    futureRoute: "/science/food-quality",
  },
];

export const transition = {
  slug: "transition",
  name: "PQNK Transition",
  title: "Restoring a Degraded Field",
  intro:
    "Nature's processes may be self-organising, but severely degraded agricultural land cannot always be restored merely by stopping inputs. Physical and chemical legacies may first need correction.",
  stages: [
    { name: "Degenerative", body: "The existing ACI condition." },
    {
      name: "Corrective Intervention",
      body: "Repair physical and, where necessary, chemical barriers preventing biological recovery.",
    },
    {
      name: "Regenerative",
      body: "Roots, cover, biodiversity and biological processes progressively rebuild function.",
    },
    {
      name: "Sustained Closed Loop",
      body: "Routine external production inputs progressively cease to be required as the system increasingly performs those functions biologically.",
    },
  ],
  closing:
    "Corrective Intervention is not a contradiction of No Soil Disturbance. It is the one-time repair required to end repeated disturbance.",
  futureRoute: "/science/transition",
};

export const productionArchitecture = {
  slug: "production-architecture",
  name: "PQNK Production Architecture",
  title: "Engineering the Science",
  intro:
    "Science establishes what the production environment requires. Engineering makes those requirements physically possible in a working farm.",
  body: "Farm layout, permanent beds, furrows, controlled traffic, tractor geometry, tyre dimensions, planting equipment and harvesting operations must all serve the biological system rather than repeatedly destroy it. The exact engineering may change. The governing science does not.",
  scienceApplication: {
    science: "Traffic must not repeatedly compact the protected biological production zone.",
    application:
      "For one established tractor configuration this may translate into a 42-inch bed top, 18-inch furrow top and appropriately matched tyre width. Different machinery may require different dimensions while preserving the governing science.",
  },
  futureRoute: "/science/production-architecture",
};

export const scienceAndEvidence = {
  title: "We Separate What We Explain From What We Have Observed",
  mechanismLabel: "Why PQNK says this happens",
  evidenceLabel: "What has been observed, measured, calculated or reported",
  body: "Science pages will distinguish mechanism from evidence throughout. Evidence categories may eventually include, only where justified: Engineering Specification, Calculation, Measured Result, Field Observation, Farmer Testimony, Case Study, External Published Science, Hypothesis Requiring Further Research, or Evidence Status Requires Review.",
};

export const oneScience = {
  title: "The Crop Changes. The Governing System Does Not.",
  body: "PQNK does not create separate sciences for wheat, rice, cotton, vegetables, orchards or sugarcane. The same relationships among soil, plants, water and biodiversity remain fundamental. What changes are legitimate adaptations such as plant spacing, row spacing, crop architecture, season, climate, tractor configuration and other field requirements.",
};

export const closing = {
  title: "From Input Agriculture to System Agriculture",
  body: [
    "Agriculture has spent centuries becoming increasingly skilled at intervening in plant production. PQNK asks whether some of those interventions became necessary because the underlying production system had first been damaged.",
    "Its objective is therefore not simply less fertilizer, less pesticide, less irrigation or less tillage. Those are consequences.",
  ],
  objective: "Restore the system that makes those interventions progressively unnecessary.",
  pathway: ["Understand the Science", "Follow the Transition", "Apply the Architecture", "Examine the Evidence"],
};

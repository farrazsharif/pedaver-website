// Content for the institutional/government partnership section of the Services page.
// This replaces the previous "Paid Advisory Services" intro block with Pedaver's
// invitation to governments, development agencies, NGOs, universities, and other
// institutions to collaborate on PQNK adaptation, validation, and implementation.

export type PartnershipBlock =
  | { type: "paragraph"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "subitems"; items: { label: string; text: string }[] };

export interface PartnershipSection {
  heading?: string;
  blocks: PartnershipBlock[];
}

const p = (text: string): PartnershipBlock => ({ type: "paragraph", text });
const bullets = (items: string[]): PartnershipBlock => ({ type: "bullets", items });
const subitems = (items: { label: string; text: string }[]): PartnershipBlock => ({ type: "subitems", items });

export const partnershipTitle = "Partner With Pedaver to Restore the Living Earth";
export const partnershipSubtitle = "Scientific, Technical and Implementation Partnerships for a Sustainable Future";

export const partnershipSections: PartnershipSection[] = [
  {
    blocks: [
      p(
        "Humanity is confronting an interconnected crisis of soil degradation, water scarcity, climate instability, declining biodiversity, deteriorating food quality, rising agricultural costs and deepening rural poverty."
      ),
      p(
        "Agricultural soils are losing their biological life and natural structure. Freshwater resources are being depleted faster than they can be replenished. Industrial farming has increased dependence on machinery, fossil fuels, chemical fertilizers, pesticides and costly external inputs, while farmers continue to face shrinking margins and growing production risks."
      ),
      p(
        "At the same time, much of the food being produced is declining in nutritional density and biological diversity. Rural communities are losing viable livelihoods, young people are leaving agriculture, and migration toward already overcrowded cities is accelerating. Governments and development institutions are therefore being required to address food security, water security, climate resilience, farmer poverty, unemployment and environmental restoration simultaneously."
      ),
      p(
        "These are not separate problems. They are different expressions of a production system that has progressively moved away from the biological principles upon which natural productivity depends."
      ),
    ],
  },
  {
    heading: "PQNK: A Unified Response to Interconnected Challenges",
    blocks: [
      p(
        "PQNK® — Paedar Qudratti Nizam Kashatkari — is the science of managing production agriculture as a functioning natural ecosystem."
      ),
      p(
        "Rather than treating degraded soil, water scarcity, climate stress, pest pressure, declining nutrition and farmer poverty as isolated issues, PQNK addresses their common biological and structural causes."
      ),
      p("The system is founded on four interdependent principles:"),
      bullets([
        "No disturbance of the soil",
        "No inundation or prolonged flooding",
        "Permanent biological cover",
        "Maximum biodiversity",
      ]),
      p(
        "Together, these principles restore the conditions under which soil organisms, plant roots, water, air and minerals function as one living production system."
      ),
      p(
        "PQNK seeks to rebuild soil structure, revive microbial and fungal activity, improve water infiltration and retention, reduce evaporation, protect the soil from extreme heat, restore natural nutrient cycling and strengthen the relationship between plants and the living soil."
      ),
      p("It replaces dependency on repeated external intervention with the restoration of natural biological processes."),
    ],
  },
  {
    heading: "Agriculture as an Instrument of Restoration",
    blocks: [
      p(
        "Agriculture occupies a vast proportion of the productive land managed by humanity. This makes agricultural land not only part of the environmental problem, but potentially the largest practical opportunity for ecological restoration."
      ),
      p("When agricultural land is managed biologically, it can help:"),
      bullets([
        "Restore degraded soils",
        "Rebuild the natural water cycle",
        "Reduce irrigation demand",
        "Improve rainfall absorption",
        "Moderate surface temperatures",
        "Increase biological carbon storage",
        "Protect biodiversity",
        "Reduce dependence on agrochemicals",
        "Produce more nutritious food",
        "Lower the cost and risk of production",
        "Improve farmer profitability",
        "Create skilled rural employment",
        "Strengthen local and national food security",
      ]),
      p(
        "Agriculture need not remain a driver of environmental degradation. Properly managed, it can become humanity's greatest instrument for restoring the Earth."
      ),
    ],
  },
  {
    heading: "An Invitation to Governments and Institutions",
    blocks: [
      p(
        "Pedaver invites governments, international development agencies, NGOs, research institutions, universities, philanthropic foundations, farmer organizations and responsible private enterprises to collaborate in the development and implementation of biologically sustainable production systems."
      ),
      p("We particularly welcome engagement from institutions working in the areas of:"),
      bullets([
        "Soil degradation, erosion, salinity and declining fertility",
        "Water scarcity, groundwater depletion and inefficient irrigation",
        "Climate adaptation, mitigation and resilience",
        "Disruption of the water cycle and agricultural heat islands",
        "Biodiversity loss and ecosystem restoration",
        "Food security and nutritional quality",
        "Farmer poverty and declining agricultural profitability",
        "High dependence on imported agricultural inputs",
        "Rural unemployment and skills development",
        "Rural-to-urban migration",
        "Agricultural mechanization and precision implementation",
        "Regenerative landscape development",
        "Sustainable rice, wheat, maize, cotton, sugarcane, vegetable, fruit and horticultural systems",
        "National agricultural policy reform",
        "Climate-smart investment and development programs",
        "Agricultural education and institutional capacity building",
      ]),
    ],
  },
  {
    heading: "A Knowledge and Implementation Partnership",
    blocks: [
      p("Pedaver does not approach these challenges merely as a conventional consultancy or technology vendor."),
      p(
        "We seek to work as a scientific, technical and implementation partner, helping institutions understand the complete production system, identify the causes of failure and develop solutions suited to local ecological, climatic, economic and social conditions."
      ),
      p(
        "Every landscape is different. Soil types, water availability, climate, crops, machinery, farm size, labour systems and institutional capacities vary widely between regions and countries."
      ),
      p(
        "For this reason, PQNK is not applied as a rigid, one-size-fits-all package. Its biological principles remain constant, while its engineering, machinery, crop planning and field implementation are adapted to local conditions."
      ),
      p("Our role is to help partners convert these principles into practical, measurable and locally appropriate production systems."),
    ],
  },
  {
    heading: "Areas of Collaboration",
    blocks: [
      p("Partnerships may include one or more of the following areas:"),
      subitems([
        {
          label: "National and Regional Strategy",
          text: "Development of agricultural transformation strategies that integrate soil restoration, water conservation, climate resilience, food quality, rural employment and farmer prosperity.",
        },
        {
          label: "Policy Advisory",
          text: "Scientific and technical support for governments seeking to reform agricultural, irrigation, environmental, food-security or rural-development policies.",
        },
        {
          label: "Pilot and Demonstration Projects",
          text: "Design and implementation of field projects that demonstrate PQNK under local crops, soils, climates and farming conditions.",
        },
        {
          label: "Farm and Landscape Conversion",
          text: "Planning the transition of conventional farms, command areas, development projects and degraded landscapes toward biologically functioning production systems.",
        },
        {
          label: "Feasibility and System Assessment",
          text: "Evaluation of soil conditions, water management, cropping systems, machinery requirements, production economics and institutional capacity before implementation.",
        },
        {
          label: "Machinery and Engineering",
          text: "Development and adaptation of permanent bed systems, controlled traffic systems, hardpan management, no-till precision planting, residue management and other machinery required for PQNK implementation.",
        },
        {
          label: "Professional and Farmer Training",
          text: "Training programs for policymakers, agricultural officers, extension workers, researchers, engineers, machinery operators, production managers and farmers.",
        },
        {
          label: "Research and Validation",
          text: "Collaboration with universities, scientific institutions and development agencies to evaluate soil recovery, water savings, productivity, food quality, economics, climate resilience and environmental outcomes.",
        },
        {
          label: "Monitoring and Performance Assessment",
          text: "Development of practical systems for measuring implementation quality, biological restoration, resource-use efficiency and farm-level economic performance.",
        },
        {
          label: "Institutional Capacity Building",
          text: "Support for organizations seeking to establish long-term knowledge, training and implementation capacity in natural-system production agriculture.",
        },
      ]),
    ],
  },
  {
    heading: "From Pilot Projects to Large-Scale Transformation",
    blocks: [
      p(
        "Collaboration may begin with a single farm, crop, district or research site. It may also involve a regional development program or a national agricultural transformation strategy."
      ),
      p(
        "A well-designed pilot can provide local evidence, train practitioners, identify engineering requirements, measure outcomes and create a practical model for expansion."
      ),
      p(
        "The purpose of such collaboration should not be to conduct isolated demonstrations that disappear when funding ends. It should be to build the local knowledge, machinery, skills and institutional capacity required for lasting transformation."
      ),
    ],
  },
  {
    heading: "Shared Objectives, Measurable Outcomes",
    blocks: [
      p("Each partnership should be designed around clearly defined objectives and measurable results."),
      p("Depending on the project, these may include:"),
      bullets([
        "Reduced irrigation-water use",
        "Improved soil infiltration and moisture retention",
        "Lower dependence on fertilizers and pesticides",
        "Reduced fuel and machinery operations",
        "Lower cost of production",
        "Improved crop productivity and stability",
        "Increased farmer profitability",
        "Greater nutritional density and food quality",
        "Reduced soil erosion and degradation",
        "Improved resilience to heat, drought and irregular rainfall",
        "Recovery of soil biology and biodiversity",
        "Creation of skilled rural employment",
        "Reduced pressure for rural-to-urban migration",
      ]),
      p("The objective is not simply to introduce another agricultural practice. It is to restore the biological foundation upon which sustainable production depends."),
    ],
  },
  {
    heading: "An Invitation to Collaborate for the Future",
    blocks: [
      p(
        "No single government, institution, organization or community can solve today's environmental and agricultural challenges alone. Their scale and complexity demand collaboration across disciplines, sectors and nations."
      ),
      p(
        "We invite concerned institutions to work with us in adapting, validating and implementing PQNK under local conditions. Whether your objective is to restore degraded landscapes, improve water security, strengthen food systems, reduce climate risks, improve nutrition, increase farmer prosperity or develop sustainable agricultural policy, Pedaver welcomes the opportunity to become your knowledge and implementation partner."
      ),
      p(
        "We believe that meaningful transformation begins when scientific understanding is connected with practical field experience, appropriate engineering, capable institutions and the people who manage the land."
      ),
      p(
        "Together, we can demonstrate that agriculture can do far more than produce a crop. It can restore soil, conserve water, rebuild biodiversity, strengthen the climate, create dignified livelihoods and produce healthier food for present and future generations."
      ),
    ],
  },
  {
    heading: "Let Us Build the Future Together",
    blocks: [
      p(
        "The future of agriculture cannot be secured by increasing inputs into a failing system. It must be built by restoring the natural processes that make production possible."
      ),
      p(
        "Pedaver invites governments, development agencies, NGOs, universities, research institutions, foundations, businesses and farming communities to join in this effort."
      ),
      p("We are not offering another agricultural technology. We are inviting the world to work with us to restore the biological foundation of agriculture."),
    ],
  },
];

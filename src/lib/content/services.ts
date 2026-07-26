export interface Service {
  slug: string;
  title: string;
  summary: string;
  body: string[];
}

export const services: Service[] = [
  {
    slug: "broad-acre-project-design-and-development",
    title: "Broad-Acre Project Design & Development",
    summary: "Turning barren or underperforming land into a PQNK production unit, from soil survey to bed layout.",
    body: [
      "Pedaver designs and develops broad-acre PQNK projects from the ground up: site assessment, soil and water survey, bed geometry and layout, crop selection and rotation planning, and the phased conversion of raw or barren land into a functioning regenerative production unit.",
      "Every design is engineered around the same PQNK objective that governs all of Pedaver's work: the lowest achievable cost of production alongside the highest achievable quality, built on permanent raised beds, continuous soil cover, and minimal disturbance rather than input-heavy conventional practice.",
    ],
  },
  {
    slug: "staff-selection-and-training",
    title: "Staff Selection & Training",
    summary: "Building and training the on-farm team that can actually run PQNK day to day.",
    body: [
      "PQNK succeeds or fails on the people executing it in the field. Pedaver helps growers and investors select, structure, and train the farm staff, supervisors, and managers who will run a PQNK operation day to day, from bed preparation and Jantar cover cropping through mulch planting and irrigation scheduling.",
      "Training is field-based and hands-on, covering the reasoning behind each PQNK practice as well as the mechanics, so the on-farm team can diagnose problems and hold the system's standards without needing to be walked through every decision.",
    ],
  },
  {
    slug: "production-management",
    title: "Production Management",
    summary: "Ongoing oversight of an active PQNK production cycle, season after season.",
    body: [
      "For growers and investors who want ongoing oversight rather than a one-time setup, Pedaver provides production management across the crop cycle: monitoring soil and plant health, adjusting practice to weather and pest pressure, and keeping the operation aligned with PQNK's zero-external-input, self-regulated approach as conditions change.",
      "The goal through every season is the same standard PQNK is built around: the lowest cost of production the system can sustain, and the highest quality, nutrient-dense output the crop is capable of producing.",
    ],
  },
  {
    slug: "produce-validation-and-placement",
    title: "Produce Validation & Placement",
    summary: "Confirming genuine PQNK practice and connecting validated produce to buyers who will pay for it.",
    body: [
      "Pedaver's PQNK Validation process confirms that a plot is genuinely following PQNK practice rather than borrowing the name, giving buyers a verifiable basis for trusting the produce coming off that land.",
      "Beyond validation, Pedaver works to place that produce, connecting growers to markets and buyers who recognize the value of lower-input, nutrient-dense, regeneratively grown crops, so the economic case for PQNK extends past the field and into the sale.",
    ],
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);

export type NVBlock =
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "subsection"; heading: string; items: string[] };

export interface NVSection {
  heading?: string;
  blocks: NVBlock[];
}

export const nvPageTitle = "Nutrition Density & Food Value Validation";
export const nvPageSubtitle = "Moving Beyond Process Certification to Food Quality Validation";

export const nvSections: NVSection[] = [
  {
    blocks: [
      {
        type: "paragraph",
        text: "For more than half a century, agricultural certification systems have focused primarily on how food is produced. Organic, regenerative and other certification programs verify whether prescribed production standards have been followed. While these systems have contributed significantly to improving farming practices, they do not answer the most important question:",
      },
      {
        type: "quote",
        text: "How nutritious and biologically valuable is the food that reaches the consumer?",
      },
      {
        type: "paragraph",
        text: "Consumers purchase food not because of the production process itself, but because they seek nourishment, health, flavour and quality. Yet existing certification systems rarely measure the nutritional density, biological diversity or overall food value of the harvested product.",
      },
      {
        type: "paragraph",
        text: "Pedaver believes that the future of agriculture must move beyond process certification toward food quality validation.",
      },
    ],
  },
  {
    heading: "A New Standard for Food",
    blocks: [
      {
        type: "paragraph",
        text: "PQNK recognizes that the true value of food lies not merely in how it is grown, but in what it ultimately delivers to the human body.",
      },
      {
        type: "paragraph",
        text: "A biologically healthy production system should produce food that is richer in nutrients, superior in flavour, longer lasting after harvest and more valuable to consumers.",
      },
      {
        type: "paragraph",
        text: "The PQNK Nutrition Density & Food Value Validation Framework is being developed to provide an objective and scientifically measurable method for evaluating these qualities.",
      },
      {
        type: "paragraph",
        text: "Rather than replacing food safety regulations or existing certification programs, this framework complements them by introducing a new dimension of agricultural excellence—the measurable biological quality of food itself.",
      },
    ],
  },
  {
    heading: "What We Measure",
    blocks: [
      {
        type: "paragraph",
        text: "The PQNK Nutrition Density & Food Value Validation Framework aims to evaluate food using measurable biological indicators, including:",
      },
      {
        type: "subsection",
        heading: "Nutritional Density",
        items: [
          "Essential minerals",
          "Vitamins",
          "Amino acid profile",
          "Beneficial fatty acids (where applicable)",
          "Natural sugars and carbohydrates",
          "Protein quality",
          "Antioxidants",
          "Beneficial phytochemicals",
        ],
      },
      {
        type: "subsection",
        heading: "Nutritional Diversity",
        items: [
          "Diversity of minerals",
          "Diversity of vitamins",
          "Diversity of amino acids",
          "Diversity of phytochemicals",
          "Overall biological complexity of the food",
        ],
      },
      {
        type: "subsection",
        heading: "Physical Quality Indicators",
        items: [
          "Natural colour intensity and surface shine",
          "Smell and aroma",
          "Texture and firmness",
          "Taste and eating quality",
          "Moisture balance",
          "Uniformity and appearance",
        ],
      },
      {
        type: "subsection",
        heading: "Post-Harvest Performance",
        items: [
          "Natural shelf life without preserving chemicals",
          "Weight loss during storage",
          "Resistance to physiological deterioration",
          "Storage stability",
          "Processing and recovery quality where applicable",
        ],
      },
      {
        type: "subsection",
        heading: "Overall Food Value",
        items: [],
      },
      {
        type: "paragraph",
        text: "These measurements will be integrated into a comprehensive assessment of the food's biological value, providing consumers, retailers and institutions with information that extends far beyond conventional certification systems.",
      },
    ],
  },
  {
    heading: "From Certification to Validation",
    blocks: [
      { type: "paragraph", text: "Traditional certification asks:" },
      { type: "quote", text: "“Was the farmer following approved production practices?”" },
      {
        type: "paragraph",
        text: "PQNK asks an additional and more fundamental question:",
      },
      { type: "quote", text: "“Did those practices actually produce better food?”" },
      { type: "paragraph", text: "The distinction is important." },
      {
        type: "paragraph",
        text: "A production system should ultimately be judged not only by the practices it follows but by the quality of the food it produces.",
      },
      {
        type: "paragraph",
        text: "Validation therefore focuses on measurable outcomes rather than assumptions.",
      },
    ],
  },
  {
    heading: "The PQNK Food Value Index",
    blocks: [
      {
        type: "paragraph",
        text: "Pedaver is developing a comprehensive PQNK Food Value Index (FVI) that combines nutritional measurements and biological quality indicators into a practical validation system.",
      },
      {
        type: "paragraph",
        text: "The framework may include assessments such as:",
      },
      {
        type: "bullets",
        items: [
          "Nutrition Density Score",
          "Nutrition Diversity Score",
          "Biological Quality Score",
          "Food Value Index",
          "PQNK Validation Score",
        ],
      },
      {
        type: "paragraph",
        text: "Each validated product may also include a QR code linking consumers to detailed laboratory analyses and supporting information, providing transparency and confidence throughout the food chain.",
      },
    ],
  },
  {
    heading: "Benefits for Farmers",
    blocks: [
      {
        type: "paragraph",
        text: "Farmers who invest in restoring biological production systems should be recognized for producing superior food.",
      },
      {
        type: "paragraph",
        text: "The PQNK validation framework aims to help producers:",
      },
      {
        type: "bullets",
        items: [
          "Differentiate premium-quality products",
          "Demonstrate measurable food quality",
          "Build consumer confidence",
          "Access premium-value markets",
          "Reduce competition based solely on appearance or price",
          "Receive fair recognition for producing nutritionally superior food",
        ],
      },
      {
        type: "paragraph",
        text: "Quality should be rewarded in the marketplace, not merely assumed.",
      },
    ],
  },
  {
    heading: "Benefits for Consumers",
    blocks: [
      {
        type: "paragraph",
        text: "Consumers increasingly seek food that is healthier, more nutritious and produced in harmony with nature.",
      },
      {
        type: "paragraph",
        text: "The PQNK validation framework will help consumers make informed choices by providing objective information about food quality rather than relying solely on production claims.",
      },
      {
        type: "paragraph",
        text: "Instead of purchasing food simply because it carries a production label, consumers will be able to compare products according to their measured biological value.",
      },
    ],
  },
  {
    heading: "Research and International Collaboration",
    blocks: [
      {
        type: "paragraph",
        text: "The development of internationally credible food value validation requires collaboration across multiple disciplines.",
      },
      { type: "paragraph", text: "Pedaver welcomes partnerships with:" },
      {
        type: "bullets",
        items: [
          "Universities",
          "Research institutions",
          "Food scientists",
          "Nutrition scientists",
          "Public health organizations",
          "Government laboratories",
          "Standards organizations",
          "Food industries",
          "Retail chains",
          "Healthcare institutions",
          "International development agencies",
        ],
      },
      {
        type: "paragraph",
        text: "Together, we seek to develop transparent, scientifically robust methods for measuring and validating the biological quality of food.",
      },
    ],
  },
  {
    heading: "A New Generation of Agricultural Standards",
    blocks: [
      {
        type: "paragraph",
        text: "Agriculture has entered an era in which producing more food is no longer enough.",
      },
      {
        type: "paragraph",
        text: "The challenge before humanity is to produce food that restores human health while restoring the biological health of the Earth.",
      },
      { type: "paragraph", text: "PQNK addresses the production system." },
      {
        type: "paragraph",
        text: "The Nutrition Density & Food Value Validation Framework evaluates the quality of its outcome.",
      },
      {
        type: "paragraph",
        text: "Together they establish a complete pathway—from biologically correct production to scientifically validated food quality.",
      },
      {
        type: "paragraph",
        text: "We invite governments, universities, laboratories, development organizations, food industries and scientific institutions to collaborate with Pedaver in developing the next generation of agricultural standards—standards that measure not only how food is grown, but how well it nourishes humanity.",
      },
    ],
  },
];

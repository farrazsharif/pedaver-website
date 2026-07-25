export interface Paper {
  slug: string;
  title: string;
  summary: string;
  publishedDate: string; // ISO date, e.g. "2026-07-25"
  pdfPath: string; // path under /public, e.g. "/papers/the-evolution-of-seed-placement.pdf"
  heroImage?: string;
  abstract: string[];
  keyTakeaways: string[];
}

export const papers: Paper[] = [
  {
    slug: "the-evolution-of-seed-placement",
    title: "The Evolution of Seed Placement: Why the Seed Opener Was Left Behind",
    summary:
      "A century of planter engineering perfected the seed meter but never solved the seed opener, the part of the machine that actually places seed in the soil. This paper traces that history and explains the SIPP and VIPP no-till planters Pedaver engineered to close the gap.",
    publishedDate: "2026-07-25",
    pdfPath: "/papers/the-evolution-of-seed-placement.pdf",
    heroImage: "/images/seedlings-beds.jpg",
    abstract: [
      "Modern seed drills and planters owe their precision to a century of refinement in one component: the seed meter, the mechanism that singulates and doses seed at a controlled rate. Meanwhile the seed opener, the part of the machine that actually cuts into the soil and places that seed, has been left largely unchanged since the era of animal-drawn drills. This paper traces that uneven history and argues that seed placement, not seed metering, is the unresolved half of planter engineering.",
      "Conventional openers place seed inside a single continuous slit or furrow, a geometry with no precedent in natural seed dispersal. No wild plant drops its seed into a straight, uninterrupted line; nature scatters seed into pockets of varying depth and spacing, shaped by wind, gravity and animal movement. PQNK's placement work starts from that observation, treating the continuous slit itself, rather than any input the crop is missing, as a root cause of uneven germination and weak early root architecture.",
      "Pedaver's response was to design two purpose-built no-till planters rather than adapt an existing drill. SIPP, the Slit Insertion Precision Planter, opens a short, discrete two-inch by two-inch pocket for each seed rather than a running slit, cutting cleanly through thick surface mulch without dragging residue into the seed zone. VIPP, the Vertical Insertion Precision Planter, uses a cone-shaped insertion point to press seed straight down into an undisturbed soil profile, suited to crops and field conditions where a vertical placement outperforms a slit-style opener.",
      "Both machines are built for the same underlying PQNK requirement: planting directly through a mulch layer, on permanent raised beds, without inverting or disturbing the soil beneath. The paper closes by walking through field-documented outcomes from SIPP and VIPP across multiple crops, and situates the seed-opener problem within the broader argument that PQNK's engineering, not just its biology, is what makes no-till mulch planting workable at commercial scale.",
    ],
    keyTakeaways: [
      "The seed meter (dosing and singulating seed) has been engineered for a century; the seed opener (placing that seed in the soil) has not kept pace.",
      "A continuous planting slit has no equivalent in natural seed dispersal, and PQNK treats that mismatch as a cause of poor germination, not a detail to work around.",
      "SIPP (Slit Insertion Precision Planter) opens a discrete 2\"×2\" pocket per seed, built to cut through thick mulch without dragging residue into the seed zone.",
      "VIPP (Vertical Insertion Precision Planter) uses a cone-shaped opener to press seed vertically into undisturbed soil.",
      "Both planters exist to make PQNK's no-till, permanent-bed, mulch-planting system mechanically possible at commercial scale.",
    ],
  },
];

export function getPaperBySlug(slug: string) {
  return papers.find((p) => p.slug === slug);
}

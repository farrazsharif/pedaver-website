export interface Highlight {
  slug: string;
  image: string;
  href: string;
  title: string;
  cta: string;
}

export const highlights: Highlight[] = [
  {
    slug: "discover-pqnk",
    image: "/images/hero-1.png",
    href: "/about",
    title: "Farming the way nature already knows how",
    cta: "Discover PQNK",
  },
  {
    slug: "wheat-tillers",
    image: "/images/young-crop-beds.jpg",
    href: "/crops/wheat",
    title: "Wheat tillering up to 20 times per seed under PQNK, versus 1.5 under ACI",
    cta: "See the results",
  },
  {
    slug: "garlic-economics",
    image: "/images/garlic-beds.jpg",
    href: "/crops/onion-garlic",
    title: "Raised beds let farmers plant up to 4x more garlic per acre",
    cta: "Read the guide",
  },
  {
    slug: "validation-open",
    image: "/images/beds-prepared.jpg",
    href: "/validation",
    title: "PQNK Validation is open for verified growers",
    cta: "Learn more",
  },
  {
    slug: "farmer-videos",
    image: "/images/wheat-misty.jpg",
    href: "/videos",
    title: "Hundreds of farmer videos, one regenerative system",
    cta: "Watch on YouTube",
  },
];

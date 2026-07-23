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
    slug: "sugarcane-tillers",
    image: "/images/wheat-field.jpg",
    href: "/crops/sugarcane",
    title: "47 tillers from a single bud, filmed in the field",
    cta: "See the results",
  },
  {
    slug: "garlic-economics",
    image: "/images/garlic-beds.jpg",
    href: "/crops/onion-garlic",
    title: "Garlic yields reported near Rs. 1,000,000 per acre",
    cta: "Read the guide",
  },
  {
    slug: "certification-open",
    image: "/images/young-crop-beds.jpg",
    href: "/certification",
    title: "PQNK Certification is open for verified growers",
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

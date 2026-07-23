// Real farm photography mapped to crop slugs.
// Used on the homepage grids/cards and on individual crop guide pages.
export const cropImages: Record<string, string> = {
  wheat: "/images/wheat-field.jpg",
  cotton: "/images/wheat-misty.jpg",
  rice: "/images/cereal-green.jpg",
  "citrus-kinnow": "/images/citrus-orchard.jpg",
  sugarcane: "/images/young-crop-beds.jpg",
  pomegranate: "/images/pomegranate.jpg",
  "onion-garlic": "/images/garlic-beds.jpg",
  potato: "/images/potato-beds.jpg",
  agroforestry: "/images/intercrop-palms.jpg",
};

export const getCropImage = (slug: string): string | undefined => cropImages[slug];

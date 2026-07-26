// Real farm photography mapped to crop slugs.
// Used on the homepage grids/cards and on individual crop guide pages.
export const cropImages: Record<string, string> = {
  wheat: "/images/wheat-field.jpg",
  cotton: "/images/crops/cotton-cultivator.jpg",
  rice: "/images/cereal-green.jpg",
  "citrus-kinnow": "/images/crops/kinnow-orchard-rows.jpg",
  sugarcane: "/images/young-crop-beds.jpg",
  pomegranate: "/images/pomegranate.jpg",
  "onion-garlic": "/images/crops/garlic-harvest.jpg",
  potato: "/images/crops/potato-field-rows.jpg",
  mango: "/images/crops/mango-orchard.jpg",
  olive: "/images/crops/olive-orchard.jpg",
  chilli: "/images/crops/chilli-closeup.jpg",
  agroforestry: "/images/intercrop-palms.jpg",
};

export const getCropImage = (slug: string): string | undefined => cropImages[slug];

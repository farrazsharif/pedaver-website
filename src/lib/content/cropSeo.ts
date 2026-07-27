// Hand-tuned SEO title/description copy per crop slug, used by
// crops/[slug]/page.tsx's generateMetadata(). Falls back to a generated
// title/description from the crop's own name/blurb for any slug not listed here.
export const cropSeo: Record<string, { title: string; description: string }> = {
  wheat: {
    title: "Wheat Under PQNK — Lower Cost, Higher Grain Quality | Pedaver",
    description:
      "Punjab's staple crop grown under PQNK: lower cost of production and higher grain quality, documented on working wheat farms.",
  },
  cotton: {
    title: "Cotton Under PQNK — Fiber Production Field Results | Pedaver",
    description:
      "PQNK cotton fiber production documented in short field clips from active cotton plots across Punjab.",
  },
  rice: {
    title: "Rice & Direct Seeded Rice (DSR) Under PQNK | Pedaver",
    description:
      "Rice, including Direct Seeded Rice (DSR), grown under PQNK — among the most-viewed crops on Pedaver's channel.",
  },
  "citrus-kinnow": {
    title: "Citrus (Kinnow) Under PQNK — Sargodha Orchard Results | Pedaver",
    description: "PQNK documented on a working Kinnow orchard in Sargodha, Pakistan's citrus belt.",
  },
  sugarcane: {
    title: "Sugarcane Under PQNK — 47 Tillers From One Bud | Pedaver",
    description: "A documented PQNK sugarcane result: 47 tillers from a single bud, filmed directly in the field.",
  },
  pomegranate: {
    title: "Pomegranate Under PQNK — Orchard Development Results | Pedaver",
    description: "Watch pomegranate development under PQNK, filmed directly on a working orchard.",
  },
  potato: {
    title: "Potato Under PQNK — No-Till vs Conventional Ridging | Pedaver",
    description:
      "A production and economics comparison: PQNK mulch-based no-till potato planting versus conventional deep-burial ridging.",
  },
  mango: {
    title: "Mango Under PQNK — Pruning & Post-Harvest Guidance | Pedaver",
    description: "Post-harvest handling advisory and pruning guidance for mango under PQNK, drawn from real farmer questions.",
  },
  banana: {
    title: "Banana Under PQNK — Grown Through Extreme Cold and Heat | Pedaver",
    description:
      "Banana grown successfully through extreme cold and heat in the Nainital foothills — proof banana is soil-limited, not climate-limited.",
  },
  olive: {
    title: "Olive Under PQNK — Two Orchard Paths | Pedaver",
    description: "Two olive orchard paths under PQNK: high-density irrigated planting, or rainwater harvesting for dry, sloping land.",
  },
  rose: {
    title: "Rose Under PQNK — Closed-Loop Cash Flower Crop | Pedaver",
    description: "Rose grown as a perennial cash flower crop through PQNK's closed-loop, no-external-input system.",
  },
  chilli: {
    title: "Chilli Under PQNK — A Decade-Long Perennial Crop | Pedaver",
    description:
      "Chilli rediscovered as a perennial: it can keep fruiting for a decade or more once soil biology, not chemistry, is restored.",
  },
  "onion-garlic": {
    title: "Onion & Garlic Under PQNK — Rs. 1 Million Per Acre | Pedaver",
    description: "PQNK raised beds enable 4x garlic planting density — real farmers reporting yields near Rs. 1 million per acre.",
  },
  "black-carrot": {
    title: "Black Carrot Under PQNK — Contract Anthocyanin Production | Pedaver",
    description:
      "Black carrot grown under contract farming for nutraceutical anthocyanin extraction, quality tuned through cold and mild water stress.",
  },
  amla: {
    title: "Amla Under PQNK — High-Density Closed-Loop Orchards | Pedaver",
    description: "High-density amla orchards under PQNK's closed-loop, zero-external-input system, including a one-time acid correction step.",
  },
  bamboo: {
    title: "Bamboo Under PQNK — 60–100 Years From One Planting | Pedaver",
    description: "Bamboo under PQNK: 60 to 100 years of productive life from one planting, at 6 to 15 tons of biomass per acre per year.",
  },
  castor: {
    title: "Castor Under PQNK — High-Density Medicinal Crop | Pedaver",
    description: "High-density castor under PQNK, delivering 6 to 12 harvests from a single 3 to 5 year planting, grown for castor oil, a traditional healthcare remedy.",
  },
  watermelon: {
    title: "Watermelon Under PQNK — Higher Sugar, Longer Shelf Life | Pedaver",
    description: "PQNK watermelon takes longer to mature in exchange for higher natural sugar content and longer shelf life.",
  },
  "motha-grass": {
    title: "Motha Grass Under PQNK — Soil-Emergency Indicator | Pedaver",
    description: 'Motha grass reframed: not a "cancer weed" to spray, but a soil-emergency indicator under the PQNK system.',
  },
  agroforestry: {
    title: "Agroforestry Under PQNK — Rethinking Eucalyptus | Pedaver",
    description: "Agroforestry under PQNK reframes Eucalyptus: soil biology, not species choice, decides whether a tree helps or harms the land.",
  },
  "vegetables-oap": {
    title: "Vegetables — One Acre Prosperity Under PQNK | Pedaver",
    description: "A PQNK guide for smallholders growing vegetables on small plots, including circular production cropping plans.",
  },
};

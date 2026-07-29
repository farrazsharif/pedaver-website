export interface Crop {
  slug: string;
  flagship: boolean;
  videoId?: string;
  videoTitle?: string;
  sourceNote?: string;
  name: string;
  blurb: string;
  overview?: string;
  practices?: string[];
  results?: string;
}

export const crops: Crop[] = [
  {
    slug: "wheat",
    flagship: true,
    name: "Wheat",
    blurb: "Punjab's staple crop, grown under PQNK for lower cost, higher grain quality, and tillering up to 20 times per seed.",
    overview:
      "Wheat is one of the most widely adopted PQNK crops across Punjab. Farmers running PQNK wheat report the lowest cost of production alongside the highest grain quality they have achieved on their own land.",
    practices: [
      "Raised bed and contour line layouts to manage water and root-zone conditions",
      "Breaking hardpan without machinery to open compacted soil to roots",
      "Ongoing monitoring of soil life through the season",
      "Well-managed PQNK fields report wheat tillering up to 20 times per seed, against roughly 1.5 tillers per seed under conventional (ACI) management",
    ],
    results:
      "“Wheat on PQNK — lowest cost of production, highest quality.” — Mian Arfan Khalid, PQNK wheat grower",
  },
  {
    slug: "cotton",
    flagship: true,
    videoId: "r1iN4iRsTmE",
    videoTitle: "PQNK Cotton: Resilience Through Drought and Biological Balance",
    name: "Cotton",
    blurb: "PQNK fiber production, documented in short field clips from active cotton plots.",
    overview:
      "Cotton is grown under PQNK as part of Pedaver's fiber production work. Field clips from active cotton plots show the crop's development under PQNK's ecosystem-based approach rather than conventional input-heavy management.",
    practices: [
      "Ecosystem-based soil and root-zone management instead of routine synthetic inputs",
      "Field documentation shared directly from working cotton plots",
    ],
    results:
      "PQNK cotton field clips are among the most-watched short videos on Pedaver's channel, reflecting strong farmer interest in fiber crops grown this way.",
  },
  {
    slug: "rice",
    flagship: true,
    name: "Rice",
    blurb: "Including Direct Seeded Rice (DSR) under PQNK, among the most-viewed crops on our channel.",
    overview:
      "Rice under PQNK includes Direct Seeded Rice (DSR), a technique highlighted specifically for its water and labor efficiency compared to traditional puddled transplanting.",
    practices: [
      "Direct Seeded Rice (DSR) to reduce water use and transplanting labor",
      "Soil-life-first field management through the growing season",
    ],
    results:
      "Rice and DSR Rice videos are among the most-watched content on Pedaver's official channel, with thousands of views each.",
  },
  {
    slug: "citrus-kinnow",
    flagship: true,
    name: "Citrus (Kinnow)",
    blurb: "Documented on a working Kinnow orchard in Sargodha, Pakistan's citrus belt.",
    overview:
      "Citrus, in particular Kinnow, is documented on a working orchard in Sargodha — the heart of Pakistan's citrus belt — through direct testimony from the grower.",
    practices: [
      "Orchard-scale soil and root-zone rehabilitation under PQNK",
      "On-the-ground testimony from an established Kinnow grower",
    ],
    results: "“Citrus on PQNK.” — Nasir Goraya, Kinnow grower, Sargodha",
  },
  {
    slug: "sugarcane",
    flagship: true,
    name: "Sugarcane",
    blurb: "Featuring a documented result of 47 tillers from a single bud under PQNK.",
    overview:
      "Sugarcane under PQNK is documented with a striking tillering result — 47 tillers grown from a single bud — filmed directly in the field as evidence of the system's effect on plant vigor.",
    practices: [
      "Single-bud planting under PQNK's root-zone and soil-life management",
      "Field-filmed tillering counts as a direct, verifiable result",
    ],
    results:
      "“Sugarcane: 47 tillers per plant, grown from one bud, on PQNK.” — as filmed and shared on Pedaver's official channel",
  },
  {
    slug: "pomegranate",
    flagship: true,
    videoId: "xzORUOK79v4",
    videoTitle: "Pomegranate on PQNK",
    name: "Pomegranate",
    blurb: "Watch pomegranate development under PQNK, filmed directly on a working orchard.",
    overview:
      "Pomegranate under PQNK is documented on video, showing orchard conditions and fruit development under the system's soil-first approach.",
    practices: [
      "Orchard soil rehabilitation and root-zone care under PQNK",
      "Direct video documentation of fruiting and orchard health",
    ],
    results: "See the full video below — filmed on a working PQNK pomegranate orchard.",
  },
  {
    slug: "potato",
    flagship: false,
    name: "Potato",
    blurb: "A production and economics comparison: mulch-based no-till planting versus conventional deep-burial ridging.",
    overview:
      "Conventional potato farming buries seed roughly six inches deep in ridged soil to protect it from Punjab's punishing autumn heat, where bare soil can exceed 70°C at the surface. Pedaver's knowledge paper compares this against the PQNK approach: shallow surface seed placement under 4–6 inches of thick organic mulch, on permanent no-till raised beds.",
    practices: [
      "Surface seed placement instead of deep ridge burial",
      "4–6 inches of organic mulch for temperature buffering and moisture retention",
      "Permanent no-till raised beds, avoiding repeated soil disturbance",
      "Untreated cut seed, cutting seed cost sharply versus certified treated seed",
    ],
    results:
      "Even where yield is marginally lower than deep-burial ridging, mulch-based PQNK planting delivers superior economic returns, produce quality, and system resilience — while also enabling earlier planting and higher plant populations through optimized bed design.",
  },
  {
    slug: "mango",
    flagship: false,
    name: "Mango",
    blurb: "Post-harvest handling advisory and pruning guidance, drawn from real farmer questions on our WhatsApp learning group.",
    overview:
      "Pedaver's Mango Post-Harvest Standard Operating Procedures were written in direct answer to a farmer's question in a PQNK WhatsApp learning group. The guide covers maturity checks, harvest timing, latex handling, and natural ripening — alongside a separate advisory on PQNK-based pruning within a self-sustaining orchard ecosystem, issued by Jamil Shahzad and Asif Sharif.",
    practices: [
      "Stop irrigation 10–15 days before harvest to concentrate natural sugars and reduce sap-related rot",
      "Harvest in cool morning or evening hours with a 2–3 cm stalk, never plucked, to avoid latex burn and fungal entry",
      "Drain latex stem-down for 30–60 minutes before moving fruit to shade",
      "Natural ripening on clean straw with a ripe banana or mango as the ethylene source — never onion or mustard, a common but false remedy",
    ],
    results:
      "Careful post-harvest handling under this protocol reduces black-spot damage, uneven ripening, and storage losses — extending shelf life without any chemical treatment.",
  },
  {
    slug: "banana",
    flagship: false,
    name: "Banana",
    blurb: "Grown successfully through extreme cold and heat in the Nainital foothills: proof that banana is soil-limited, not climate-limited.",
    overview:
      "Banana is conventionally treated as a high-input, climate-sensitive crop. Pedaver's knowledge paper documents a successful open-field PQNK banana plantation in the Nainital foothills — an area with frost-risk winters and high-evaporation summers where conventional banana would normally suffer winter damage and summer collapse.",
    practices: [
      "One-time hardpan breaking to restore deep root penetration and monsoon drainage",
      "Soil detoxification with a single deep irrigation to leach salts and reset chemistry",
      "Permanent raised beds where terrain allows, with all traffic confined to furrows",
      "Grass and crop-residue cover left in place as insulation, not weeded away — it buffers the root zone against both frost and heat",
    ],
    results:
      "\"PQNK does not grow crops. PQNK grows soil that grows crops.\" Under this system, banana in a climatically hostile region remained healthy, upright and productive — demonstrating that banana's usual climate sensitivity is a soil problem, not a species limitation.",
  },
  {
    slug: "olive",
    flagship: false,
    name: "Olive",
    blurb: "Two orchard paths under PQNK: high-density irrigated planting, or a clever rainwater-harvesting system for dry, sloping land.",
    overview:
      "Pedaver's farmer's guide to establishing an olive orchard offers two paths depending on land and resources: high-density planting for irrigated land, and an ingenious \"curved furrow & borehole\" rainwater-harvesting system for rain-fed, sloping land with no irrigation access.",
    practices: [
      "Irrigated land: permanent 42-inch raised beds with 18-inch furrows, high-density spacing of 10 ft × 8 ft (about 545 plants per acre)",
      "Rain-fed slopes: a curved furrow on the downhill side of each tree traps rainwater into a dedicated 1 ft × 4 ft borehole, sized to store a full year's water requirement",
      "The tree's own planting hole is dug uphill of the borehole and refilled with loose, aerated soil for root establishment",
      "Thick organic mulch over the planted area, furrow and borehole absorbs rain, dew and humidity, and keeps the whole system moist year-round",
    ],
    results:
      "With as little as 400mm of annual rainfall properly captured in the soil, this system makes olive orchards viable on rolling, rain-fed land with no irrigation infrastructure at all.",
  },
  {
    slug: "rose",
    flagship: false,
    name: "Rose",
    blurb: "A perennial cash flower crop grown through PQNK's closed-loop, no-external-input system.",
    overview:
      "Rose responds well to soil regeneration and thrives under closed-loop PQNK management, in place of the synthetic fertilizers, hormones and chemical pest control that conventional rose farming typically relies on.",
    practices: [
      "One-time hardpan breaking to 18–24 inches for rose's strong, branching root system",
      "Soil pH corrected to 6.0–7.0 — the range roses prefer for vibrant blooms and healthy foliage",
      "Jantar (Sesbania) grown and mulched in place before planting, as the system's only fertility input",
      "Two rows per 42-inch permanent bed, no-till planted through the mulch — roughly 8,712 plants per acre",
    ],
    results:
      "Projected cut-flower yield on this 8,712-plants-per-acre design rises from 15,000–25,000 stems per acre in years 1–2 while the planting establishes, to 60,000–85,000 in year 3's first meaningful harvest, reaching 130,000–170,000+ stems per acre by years 4–5 once the system is fully sustained.",
  },
  {
    slug: "chilli",
    flagship: false,
    name: "Chilli",
    blurb: "A rediscovered perennial: chilli can keep fruiting for a decade or more once soil biology, not chemistry, is restored.",
    overview:
      "Chilli is biologically a perennial plant, similar to cotton, capable of remaining productive for many years where cold stress is managed. Conventional (\"ACI\") practices — heavy urea use, repeated tillage, chemical pest control — collapse soil biology and lock chilli into a short, disease-prone annual cycle instead.",
    practices: [
      "Break the hardpan and correct soil chemistry before planting, then build permanent 42-inch raised beds with Jantar cover cropping, mulch, and no-till planting",
      "Soil moisture managed by feel, not by calendar — keeping plants slightly on the dry side improves fruit set, quality and disease resistance",
      "Seed germination tested before sowing (soaked in cloth 1–2 hours, kept warm 2–3 days) to set an accurate seeding rate",
    ],
    results:
      "The PQNK principle: when soil biology is alive, fertilizers become unnecessary, pests do not dominate, and disease does not express — breaking the urea-pest-spray cycle that conventional chilli farming depends on.",
  },
  {
    slug: "onion-garlic",
    flagship: false,
    name: "Onion & Garlic",
    blurb: "Raised beds enabling 4x planting density, with real farmers reporting yields several times higher than flat-field cultivation.",
    overview:
      "Garlic and onion have long depended on imports due to labour-intensive flat-field cultivation and heavy agrochemical reliance. Pedaver's knowledge paper documents PQNK's raised-bed, mulch-based system as a transformative alternative — one already contributing to Pakistan's garlic import substitution.",
    practices: [
      "Raised beds instead of flat planting — a geometry change allowing at least four times more cloves planted per acre",
      "Thick organic mulch for weed suppression, water conservation, and ongoing soil building as it decomposes",
      "Precise furrow irrigation, applied sparingly and directly to the root zone",
      "No synthetic fertilisers, weedicides, fungicides or pesticides, and no further hoeing after establishment",
    ],
    results:
      "Documented yields of 250–300 mounds (10,000–12,000 kg) of Dessi garlic per acre, with minimal input costs and revenue reported several times higher than conventional flat-field cultivation — market price fluctuates, but yield, quality, and cost stay firmly in the grower's favour. Produce with lower water content also stores far longer with less spoilage.",
  },
  {
    slug: "black-carrot",
    flagship: false,
    name: "Black Carrot",
    blurb: "Grown under contract farming for nutraceutical anthocyanin extraction, with quality tuned through cold and mild water stress.",
    overview:
      "Black carrot is grown under PQNK for its anthocyanin content — a plant pigment prized for nutraceutical extraction, with some buyers offering contract prices tied directly to pigment concentration. PQNK's stable, mulch-buffered soil temperature (13–26°C year-round) gives farmers precise control over the conditions that drive pigment production.",
    practices: [
      "Hardpan broken before planting — with the restriction gone, roots have been documented reaching close to 4 feet in length",
      "No external NPK — nutrition comes entirely from the soil's own gradient, accessed by the plant as needed",
      "Full root-size growth allowed for the first 60–70 days, before introducing mild water stress",
      "Deliberately extended irrigation intervals in the final 25–30 days to signal mild drought and trigger pigment synthesis",
      "Cool nights and full sun exposure, which together drive the strongest anthocyanin response",
    ],
    results:
      "Breaking the hardpan alone is reported to roughly quadruple yield versus conventional carrot production, with no fertilizer or pesticide applied and a lower cost of production at the same time. Winter-grown roots are smaller but far more pigment-dense than summer roots — a direct, controllable trade-off between size and nutraceutical value that PQNK's stable soil system lets farmers manage deliberately.",
  },
  {
    slug: "amla",
    flagship: false,
    name: "Amla",
    blurb: "High-density amla orchards using a closed-loop, zero-external-input system, including a one-time acid correction step.",
    overview:
      "Amla (Indian gooseberry) is hardy, perennial, and responds exceptionally well to soil regeneration — but conventional high-density planting recommendations lean on external fertilisers and hormones that PQNK prohibits. Pedaver's knowledge paper reframes high-density amla production entirely within the closed-loop system.",
    practices: [
      "Hardpan broken to 18–24 inches, letting amla's deep taproot — which can reach 10–12 feet in healthy soil — establish properly",
      "Where soil pH exceeds 8, a one-time correction using deep leaching irrigation plus 8 kg of sulfuric acid per acre, unlocking locked minerals",
      "Permanent 42-inch raised beds with 18-inch furrows, sized to standard tractor wheel spacing",
      "Jantar (Sesbania) grown, then slashed and left as mulch — the sole source of fertility, with no manure or fertiliser brought in from outside",
    ],
    results:
      "Amla grown in corrected, biologically active soil produces larger, juicier fruit with higher Vitamin C content than the same variety grown in alkaline, salt-stressed conventional soil.",
  },
  {
    slug: "bamboo",
    flagship: false,
    name: "Bamboo",
    blurb: "A commercial factsheet crop: 60–100 years of productive life from one planting, at 6–15 tons of biomass per acre per year.",
    overview:
      "Bamboo is, in PQNK's view, a natural \"soil engine\": a fast-growing perennial grass that builds humus, sequesters carbon, and stabilizes land while producing poles, biomass, fodder, and construction material. Pedaver's factsheet lays out a full commercial protocol, available in English, Urdu and Hindi.",
    practices: [
      "Multi-species bamboo belts preferred over single-species monoculture for resilience",
      "Hardpan broken, then Jantar grown and terminated as in-situ mulch before no-till planting through a jab planter",
      "Spacing of roughly 726 plants per acre on permanent 42-inch beds, watered by a soil-ball moisture test rather than a fixed schedule",
      "Intercropping with turmeric, ginger, sweet potato, cowpea, beans or medicinal herbs during the first 1–3 years before canopy closure",
    ],
    results:
      "Harvesting begins in year 3–4, taking only 20–30% of mature culms annually to protect clump health, with peak profitability from year 4 and clumps remaining productive for 60–100 years from a single planting.",
  },
  {
    slug: "castor",
    flagship: false,
    name: "Castor",
    blurb: "High-density medicinal crop, delivering 6–12 harvests from a single 3–5 year planting.",
    overview:
      "High-Density (HD) Castor is grown under PQNK as both a cash crop and a soil regenerator — its deep taproot and continuous biomass production stimulate microbial activity while producing the seed pressed for castor oil, a traditional healthcare remedy used for generations.",
    practices: [
      "Standard PQNK land conversion: hardpan broken, soil chemistry corrected where pH exceeds 8, permanent raised beds built, Jantar grown and mulched, no-till planting",
      "9,000–12,000 plants per acre — a density that sustains deep, healthy root systems and lower pest pressure rather than forcing growth",
      "No fertilisers, no external compost, no sprays — nutrition from microbial mineralization, decomposing Jantar, and root exudates",
    ],
    results:
      "A single HD Castor planting stays economically productive for 3–5 years, yielding 2–3 pickings annually — roughly 6–8 harvests from a 3-year stand and up to 10–12 from a 5-year stand, with peak productivity in years 2–4.",
  },
  {
    slug: "watermelon",
    flagship: false,
    name: "Watermelon",
    blurb: "A deliberate trade: PQNK watermelon takes longer to mature, in exchange for higher natural sugar content and longer shelf life.",
    overview:
      "Pedaver's field-based guideline notes that PQNK watermelon reaches maturity in 90–100 days, against roughly 70 days in a conventional chemical system. This is not a delay but a rebalancing: conventional systems force fast, weak growth with soluble nutrients, while PQNK plants develop in partnership with the soil food web.",
    practices: [
      "December sowing targeted at a February harvest, using thick mulch (3–4 inches) around the plant base for frost protection",
      "Windbreak crops such as Napier grass or sugarcane established upwind of the field to stabilize the field's microclimate in cold-wind areas",
      "Light furrow irrigation in late afternoon before expected frost, using soil moisture as thermal mass",
      "Nursery-raised seedlings recommended for early-season plantings rather than direct sowing, to protect young plants during the establishment window",
    ],
    results:
      "The extra 20–30 days in the field allow full biological ripening — producing fruit with a higher natural sugar (Brix) concentration and a longer storage life than fast-grown conventional watermelon.",
  },
  {
    slug: "motha-grass",
    flagship: false,
    name: "Motha Grass",
    blurb: "Reframing a \"cancer weed\": motha grass is a soil-emergency indicator, not an enemy to be sprayed.",
    overview:
      "Motha grass (Cyperus rotundus) is widely labeled a \"cancer weed\" in conventional agriculture for its aggressive spread. Pedaver's knowledge paper argues the opposite: motha is a biological indicator and emergency responder, signaling that hardpan, low oxygen, high pH and dead soil biology have collapsed a field's normal order — not a problem to be attacked directly.",
    practices: [
      "Recognize motha dominance as a signal to break the hardpan, not a signal to spray",
      "Correct soil chemistry with deep irrigation and, where pH exceeds 8, sulfuric acid application to neutralize the allelopathic residues motha responds to",
      "Build permanent raised beds and grow Jantar (Sesbania) to rebuild the deep-rooted, oxygenated conditions crops need to dominate again",
      "Avoid herbicides and repeated tillage, both of which fragment motha's tubers and multiply the very problem they aim to solve",
    ],
    results:
      "Once hardpan is broken and soil biology is restored, motha grass naturally retreats without chemical warfare — because the emergency conditions it was responding to no longer exist.",
  },
  {
    slug: "agroforestry",
    flagship: false,
    name: "Agroforestry",
    blurb: "Reframing Eucalyptus: soil biology, not species choice, decides whether a tree helps or harms the land.",
    overview:
      "Environmentalists and farmers often disagree sharply about species like Eucalyptus in agroforestry systems. Pedaver's scientific note argues that plant behavior is a response to soil biological condition, not an inherent property of the species — Eucalyptus \"exploits\" water and degrades soil only where it is planted on already-dead soil.",
    practices: [
      "Restore soil biology first — via hardpan breaking, pH correction, and Jantar cover cropping — before judging any species' suitability",
      "In fully restored soil, even fast-growing, nutrient-demanding species like Eucalyptus behave normally, without excessive transpiration or ecological stress",
      "Prioritize deep-rooted, high-root-exudation, continuous-biomass species as primary soil-regenerating trees in an agroforestry belt",
      "Species like Eucalyptus can be introduced afterward, once soil life is established, rather than avoided altogether",
    ],
    results:
      "\"PQNK does not oppose Eucalyptus. PQNK opposes planting any species without restoring the soil ecosystem first.\" Restore soil life, and the plant regulates itself.",
  },
  {
    slug: "vegetables-oap",
    flagship: false,
    name: "Vegetables — One Acre Prosperity",
    blurb: "A PQNK guide for smallholders growing vegetables on small plots, including circular production cropping plans.",
    overview:
      "The One Acre Prosperity (OAP) advisory is written specifically for smallholder vegetable growers — farmers working small plots who need a cropping plan that keeps the land continuously productive without relying on purchased inputs.",
    practices: [
      "Circular production cropping plans that rotate vegetable crops through the same permanent beds year-round",
      "The same raised-bed, mulch and no-till foundation used across PQNK's other crops, scaled to smallholder plot sizes",
      "Guidance on critical initial irrigation for new beds established without a cover crop",
    ],
    results:
      "A practical entry point into PQNK for farmers with limited land, aimed at building steady household income from a single acre rather than requiring large-scale investment.",
  },
];

export const flagshipCrops = crops.filter((c) => c.flagship);
export const otherCrops = crops.filter((c) => !c.flagship);

export function getCropBySlug(slug: string) {
  return crops.find((c) => c.slug === slug);
}

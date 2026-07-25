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
  {
    slug: "transforming-wheat-production-through-pqnk",
    title: "Transforming Wheat Production through the Paedar Qudratti Nizam Kashatqari (PQNK)",
    summary:
      "Conventional wheat farming is locked into a cycle of high input costs and stagnant yields around 30 maunds per acre. This paper lays out the PQNK cost and revenue model for wheat, comparing it head-to-head against the conventional system and projecting the foreign exchange impact of national-scale adoption.",
    publishedDate: "2026-07-25",
    pdfPath: "/papers/transforming-wheat-production-through-pqnk.pdf",
    heroImage: "/images/wheat-field.jpg",
    abstract: [
      "Conventional wheat farming is trapped in a cycle of high costs and diminishing returns: repeated tillage, synthetic fertilizer (DAP and Urea), weedicides, and frequent flood irrigation push operational costs per acre while yields plateau around 30 maunds per acre, a ceiling that has not kept pace with rising input prices. The result is chemical burden on the soil, long-term fertility loss, and a commodity-market price that keeps farmer incomes low and vulnerable to shocks outside their control.",
      "PQNK applies its regenerative lens to wheat as a precise, knowledge-based system rather than a substitution of one input for another. Zero-tillage direct seeding replaces three to four tillage passes; a precision seed rate of roughly 10 kg per acre replaces the dense 60 kg per acre conventional rate; and soil biology is left to provide nitrogen and solubilize phosphorus and other nutrients from the soil's own mineral reserves, eliminating the need for DAP and Urea altogether. Residue mulch suppresses weeds without chemical weedicides and cuts irrigation from four or five flood irrigations down to a maximum of two furrow irrigations.",
      "The paper walks through a full per-acre cost and revenue comparison. Conventional production costs roughly PKR 39,000 per acre against a PQNK cost of about PKR 5,000, an 87% reduction. At a conservative PQNK yield of 45 maunds per acre sold into a premium organic market (PKR 7,500/maund versus PKR 3,500/maund for conventional grain), net profit rises from PKR 66,000 to PKR 332,500 per acre, an increase of more than 400%.",
      "Scaling this to national policy, the paper models converting 20% of Pakistan's roughly 9 million hectares of wheat area to PQNK. At a PQNK yield of 4.0 tonnes per hectare and assuming 80% of that production is exported at a conservative $650 per tonne for 'Organic Plus' wheat, the resulting foreign exchange earnings approach US $3.75 billion, a figure the paper argues could rival or surpass forex earnings from established commodity export sectors. A 50% adoption scenario is also sketched, covering farmer prosperity, water savings, soil regeneration, and food security.",
      "The paper closes with a four-pillar national proposal: knowledge transfer through master trainers and showcase farms, market linkage and a 'PQNK Organic Plus' export brand, policy support for the transition (including access to PQNK machinery), and a dedicated research and production-management entity to hit export targets.",
    ],
    keyTakeaways: [
      "PQNK cuts wheat production costs per acre by roughly 87%, from about PKR 39,000 to PKR 5,000, mainly by eliminating tillage passes, DAP/Urea, and weedicides.",
      "PQNK yield is modeled at 45 maunds/acre versus 30 maunds/acre conventional, sold at a premium organic price of PKR 7,500/maund versus PKR 3,500/maund.",
      "Net profit per acre rises from PKR 66,000 to PKR 332,500, an increase of over 400%.",
      "Converting just 20% of national wheat area to PQNK is projected to generate nearly US $3.75 billion in export forex earnings.",
      "Irrigation drops from 4-5 flood irrigations to a maximum of 2 furrow irrigations thanks to residue mulch cover.",
      "The paper proposes a national 'PQNK Wheat for Prosperity' mission built on training, branding, policy support, and R&D.",
    ],
  },
  {
    slug: "enhancing-wheat-crop-lifespan-through-pqnk",
    title: "Enhancing Wheat Crop Lifespan through the PQNK System",
    summary:
      "The short, rapidly warming spring of the Indian subcontinent forces wheat into premature ripening and shriveled grain under conventional management. This paper explains the soil-biology mechanisms by which PQNK extends the crop's productive lifespan, letting it fill grain longer and yield more even under heat stress.",
    publishedDate: "2026-07-25",
    pdfPath: "/papers/enhancing-wheat-crop-lifespan-through-pqnk.pdf",
    heroImage: "/images/wheat-heads.jpg",
    abstract: [
      "The Indian subcontinent's short spring, with its rapid rise in temperature, routinely forces wheat into premature maturation. Conventional 'Ancient Conventional Industrial' (ACI) systems make this worse: repeated tillage and chemical-input dependence degrade soil structure and reduce its water-holding capacity, so as evaporation demand climbs, crops ripen early and grains shrivel before they fill out, costing yield at the exact moment the plant needs more time, not less.",
      "PQNK counters this through a small set of interlocking soil principles: no hardpan formation, so roots can expand freely; soil moisture held at roughly 30% of pore space to encourage roots to explore further; a permanent organic mulch cover that regulates soil temperature and slows evaporation; a thriving soil food web that drives nutrient cycling; and a proportionally balanced nutrient supply rather than the boom-bust dosing of synthetic fertilizer.",
      "These principles compound into a physically larger root system. Eliminating hardpan lets roots penetrate deeper, moisture retained in soil pores gives them a reason to reach further, and mulch keeps soil temperatures below roughly 30°C, preventing root-level heat stress. The resulting root surface area lets the plant meet spiking evaporation demand during hot spells without wilting, while mulch-conserved soil moisture and stable microbial aggregates let the crop endure dry spells without triggering premature senescence.",
      "The combined effect is a wheat plant that simply stays alive and functional longer: an extended ripening period translates directly into higher seed weight, reduced wilting and shriveling improves both grain quality and quantity, and resilience to temperature spikes stabilizes yield despite year-to-year climate variability. The paper cites yield increases of 15-25% under stress conditions in analogous regenerative systems, driven primarily by improved root health and water-use efficiency.",
      "The paper closes with a practical transition sequence for farmers moving off ACI management: phase out deep tillage to stop hardpan formation, apply organic mulch immediately after sowing, build soil life through compost and diverse rotations while avoiding biocides, and monitor soil porosity and moisture to hold the 30% water-filled pore space that the whole system depends on.",
    ],
    keyTakeaways: [
      "Short, fast-warming subcontinental springs push conventional wheat into premature ripening and shriveled grain; PQNK is framed as a direct countermeasure to this specific climate stress.",
      "Five PQNK principles drive longer crop lifespan: no hardpan, ~30% water-filled soil pores, organic mulch cover, active soil biology, and balanced nutrient supply.",
      "Mulch keeps soil temperature below roughly 30°C, preventing root-level heat stress during hot spells.",
      "A larger, deeper root network gives the plant the absorption capacity to meet spiking evaporation demand without wilting.",
      "Analogous regenerative systems show 15-25% yield gains under stress conditions, attributed to root health and water-use efficiency.",
      "Recommended transition steps: stop deep tillage, mulch immediately after sowing, build soil life via compost and rotation, and monitor pore-space moisture.",
    ],
  },
  {
    slug: "modern-semi-dwarf-wheat-vs-heirloom-and-ancient-varieties",
    title: "Modern (Green Revolution) Semi-Dwarf Wheat vs. Heirloom and Ancient Wheat Varieties",
    summary:
      "A critical review of the popular claim that Green Revolution semi-dwarf wheat is inherently more harmful than heirloom varieties. Applying the PQNK lens, the paper argues the farming system, not just the genetics, is the overlooked variable driving gluten-related health concerns, and that soil biology can meaningfully change a grain's nutritional and digestive profile regardless of variety.",
    publishedDate: "2026-07-25",
    pdfPath: "/papers/modern-semi-dwarf-wheat-vs-heirloom-and-ancient-varieties.pdf",
    heroImage: "/images/cereal-green.jpg",
    abstract: [
      "Wheat feeds over 35% of the global population, and the semi-dwarf, high-yielding cultivars bred at CIMMYT during the 1960s Green Revolution now dominate world production. Their rise has coincided with growing rates of diagnosed celiac disease and self-reported non-celiac wheat sensitivity, fueling a popular narrative that modern wheat genetics are themselves the cause. This review synthesizes the agronomic, compositional, and clinical evidence and introduces a third, frequently ignored variable into the debate: the farming system the wheat was grown in.",
      "The paper contrasts heirloom and ancient wheat, historically grown in lower-input, more biologically balanced soils, with modern semi-dwarf wheat, typically bred and grown for responsiveness to synthetic NPK inputs in ways that can produce mineral imbalance in the grain. Into that contrast it introduces PQNK as a third axis entirely independent of genotype: a regenerative system built on soil biome health, mineral balance and density, and carbon-driven ecosystem resilience, on the premise that a farm's soil 'terroir' is as determinative of final food quality as the seed's genetics.",
      "On composition, the paper is careful not to overstate what farming system can change: it cannot remove the specific gluten epitopes that trigger celiac disease, and total gluten content remains primarily driven by genotype and environment. But it argues that soil nitrogen form and mineral balance can shape protein synthesis and quality, and that plants grown in mineral-rich, biologically active soil may express fewer stress-induced compounds (such as certain ATIs) while showing higher bioavailable concentrations of zinc, iron, selenium, magnesium, and polyphenols, independent of whether the variety is modern or heirloom.",
      "Applied to human health, the paper draws a sharp line: celiac disease is unaffected by farming system, and no wheat from any system is safe for celiac patients. But it proposes that non-celiac wheat sensitivity may be aggravated not only by wheat proteins but by consumption of grain grown in depleted, mineral-imbalanced soils lacking cofactors the body needs for digestion, and that nutrient-dense, PQNK-grown wheat could be better tolerated by some individuals and could lower postprandial inflammation relative to the same variety grown conventionally.",
      "The paper frames wheat quality as governed by a triad of Genetics × Environment × Management, positions PQNK as a deliberate optimization of the Management term, and closes by calling the 'modern vs. ancient' debate incomplete without accounting for agricultural practice, then lays out a research agenda: paired-variety trials comparing PQNK and conventional management, human feeding trials on bread from matched flour, and correlation studies linking soil health to grain nutrient density.",
    ],
    keyTakeaways: [
      "The paper challenges the popular claim that Green Revolution wheat genetics alone explain rising gluten-related health concerns.",
      "It introduces farming system (specifically PQNK) as a third variable alongside genotype and environment in determining a grain's nutritional and health profile.",
      "PQNK cannot alter celiac-triggering gluten epitopes; celiac patients must avoid all wheat regardless of how it was grown.",
      "PQNK-grown wheat, modern or heirloom, is hypothesized to carry higher bioavailable zinc, iron, selenium, magnesium, and polyphenols due to soil mineral balance.",
      "Non-celiac wheat sensitivity may be partly a function of depleted, imbalanced soils rather than wheat genetics alone.",
      "The paper calls for controlled trials comparing identical wheat varieties under PQNK versus conventional management, including human feeding studies.",
    ],
  },
  {
    slug: "transforming-pakistans-sugar-industry-through-pqnk",
    title: "Transforming Pakistan's Sugar Industry Through the PQNK (Pristine Organic Farming) System",
    summary:
      "Pakistan's sugar sector runs on a decades-old cycle of farmer exploitation, long-haul cane transport, and volatile supply. This paper proposes concentrating high-yield PQNK sugarcane cultivation within a 10-15 km radius of each mill, and models the profit, sugar-recovery, and crushing-season gains that follow.",
    publishedDate: "2026-07-25",
    pdfPath: "/papers/transforming-pakistans-sugar-industry-through-pqnk.pdf",
    abstract: [
      "Pakistan's sugar industry has run the same operational model for over four decades: an annual cycle of overproduction that depresses farmer prices, followed by underproduction that leaves mills scrambling for cane. Farmers face delayed payments, under-weighed produce, and disrespectful treatment, discouraging cultivation; mills then pay high costs to truck cane in from hundreds of miles away, degrading quality en route and inflating operating expenses. The end-consumer absorbs the cost through inflated sugar prices. The paper identifies the root failure as mills neglecting their immediate agricultural geography.",
      "PQNK is proposed as a structural fix rather than an efficiency tweak: concentrated, high-yield, organic sugarcane cultivation within a 10-15 km radius of the mill, turning farmers from supplicants into economic partners. A head-to-head comparison shows PQNK cutting soil preparation cost in half, seed requirement from 150 to 5 maunds, and eliminating fertilizer and weedicide spend entirely, while lifting maximum yield from 1,000 to 3,000 maunds per acre and sugar content from 9% to 11-13%. Critically, PQNK also extends the harvesting window from five months (November-March) to eight months (October-May).",
      "The paper's per-acre economic model for a PQNK cane plot — 5,000 plants, 10 canes per plant, 2 kg average cane weight — yields 100,000 kg (2,500 maunds) per acre, generating gross income of roughly PKR 875,000 and net profit near PKR 745,000 after approximately PKR 130,000 in expenditure. For the mill, the benefits compound: an 8-10 month operating season instead of 6, sugar recovery rates up by as much as 40% thanks to fresher, higher-sucrose cane, and dramatically lower costs from eliminating long-distance transport.",
      "At the national and consumer level, the paper argues concentrated PQNK sourcing zones would stabilize sugar prices through consistent supply, protect soil health and water tables by eliminating chemical fertilizer and pesticide use, cut irrigation water use by up to 80%, and stimulate rural economies through a thriving, profitable farming base tied directly to each mill.",
      "The paper closes with a four-part call to action: pilot PQNK adoption within 10-15 km radii of participating mills, mill-led farmer education and facilitation, government policy support and regulatory incentives for mills that adopt regenerative sourcing, and a wider knowledge-dissemination campaign to bring stakeholders — government, mill boards, and farmer associations — to the table.",
    ],
    keyTakeaways: [
      "PQNK sugarcane lifts maximum yield from 1,000 to 3,000 maunds/acre and sugar content from 9% to 11-13%.",
      "The harvesting window expands from 5 months (Nov-Mar) to 8 months (Oct-May), letting mills run 8-10 months instead of 6.",
      "Modeled net profit reaches roughly PKR 745,000 per acre for PQNK cane growers, against about PKR 130,000 in expenditure.",
      "Concentrating PQNK cultivation within a 10-15 km radius of each mill eliminates the long-haul transport costs and cane-quality loss driving the current crisis.",
      "Fresher, higher-sucrose cane is projected to raise mill sugar recovery rates by up to 40%.",
      "The paper calls for mill-led pilot programs, farmer training, and government policy support to seed a national transition.",
    ],
  },
  {
    slug: "pqnk-paradigm-shift-for-climate-resilient-rice-cultivation",
    title: "PQNK - The Paradigm Shift for Sustainable, Profitable, and Climate-Resilient Rice Cultivation",
    summary:
      "Pakistan's Basmati export sector faces a triple threat of quality rejections, water scarcity, and methane emissions from flooded paddies. This paper presents PQNK's move 'beyond flooded fields' to direct-seeded rice on permanent mulched beds, arguing it solves all three problems simultaneously rather than trading one for another.",
    publishedDate: "2026-07-25",
    pdfPath: "/papers/pqnk-paradigm-shift-for-climate-resilient-rice-cultivation.pdf",
    abstract: [
      "Pakistan's rice sector, and its Basmati export trade in particular, faces three compounding pressures. Importing countries are tightening limits on agrochemical residues and mycotoxins such as aflatoxins, and conventional flooded systems consistently fail to meet them, causing costly rejections and reputational damage. Conventional cultivation also uses roughly 5,000 liters of water per kilogram of rice produced, an unsustainable draw in a water-scarce country. And continuously flooded paddies are a major source of methane, a gas over 25 times more potent than CO2, estimated to account for around 12% of global methane emissions — with the common fix, Alternate Wetting and Drying, risking a swap into nitrous oxide, a gas roughly 300 times more potent than CO2.",
      "PQNK's response is framed as a return to how rice actually grows in nature: no floodplain provides continuous standing water, only monsoons, dew, and groundwater moving through porous, root-bound, hardpan-free soil. Practically, this took the form of an evolving system — starting with a dry-soil transplanter placing seedlings into water-filled pits, then evolving to the current method: Direct Seeded Rice (DSR) on permanent raised beds covered in organic mulch carried over from the prior crop's residue, with five precise rows spaced 8 inches apart on 42-inch beds achieving a plant density of about 65,000 per acre.",
      "The system layers four principles: observing and emulating nature's non-flooded hydrology; treating water as a precious input rather than a default weed-suppression tool; managing soil as a living system through aeration and organic matter rather than mechanical weeding or intensive tillage; and precision plant geometry over blanket application, so each plant gets calibrated access to light, air, and nutrients.",
      "Quantified against conventional flooded rice, PQNK is credited with cutting water use by over 90% (from roughly 5,000 L/kg to about 321 L/kg), eliminating herbicide, pesticide, and fertilizer residues that cause export rejections, eliminating methane production from anaerobic flooding without triggering a nitrous oxide trade-off, and reducing input costs enough to materially raise farmer margins. The paper also generalizes the underlying principle beyond rice, citing a reduction in sugarcane's water footprint from 2,284 L/kg of sugar to just 156 L/kg under the same logic.",
      "The paper closes by pointing to PQNK-style water-saving rice adoption already underway in agriculturally advanced nations such as Israel, Korea, and China, and calls on the Government of Pakistan, research institutions, exporters, and farmers to pursue a national transition strategy built on shifting subsidies from water and chemical inputs toward bed-formation and precision-planting equipment, farmer training and demonstration farms, and a certified 'PQNK Basmati' export brand.",
    ],
    keyTakeaways: [
      "Conventional flooded rice uses ~5,000 L of water per kg of rice; PQNK's direct-seeded, mulched bed system cuts that by over 90% to roughly 321 L/kg.",
      "Flooded paddies are estimated to produce around 12% of global methane emissions; PQNK's aerated, non-flooded soil eliminates this pathway without the N2O trade-off risked by Alternate Wetting and Drying.",
      "The current PQNK method is Direct Seeded Rice (DSR): five rows on 42-inch permanent raised beds, 8 inches apart, at roughly 65,000 plants per acre.",
      "Eliminating agrochemical residues and reducing fungal (aflatoxin) risk directly addresses the export rejections costing Pakistan's Basmati trade.",
      "The same 'beyond flooding' logic is credited with cutting sugarcane's water footprint from 2,284 L/kg of sugar to 156 L/kg.",
      "The paper calls for a national policy shift, redirecting subsidies from water and chemical inputs toward PQNK bed-formation and planting equipment.",
    ],
  },
  {
    slug: "transforming-garlic-and-onion-cultivation-through-pqnk",
    title: "Transforming Garlic and Onion Cultivation through the PQNK Regenerative System",
    summary:
      "Garlic and onion farming has been squeezed by rising labour costs and heavy agrochemical reliance, pushing countries toward import dependence. This paper shows how PQNK's raised-bed geometry and mulch management quadruple planting density and let farmers reach up to 300 maunds per acre without synthetic inputs.",
    publishedDate: "2026-07-25",
    pdfPath: "/papers/transforming-garlic-and-onion-cultivation-through-pqnk.pdf",
    heroImage: "/images/garlic-beds.jpg",
    abstract: [
      "Garlic and onion cultivation has long been constrained by a cluster of interconnected problems: manual hoeing for weeding and bed formation runs into a chronic labour shortage, which in turn shrinks the viable cultivation area as labour becomes scarcer and more expensive; reliance on synthetic fertilizers, weedicides, fungicides, and pesticides drives up cost and environmental footprint; and conventionally grown bulbs carry higher water content, leading to significant weight loss and spoilage in storage. Together these have created a persistent supply-demand gap that many countries fill through imports.",
      "PQNK's intervention rests on four pillars. First, planting geometry shifts from flat fields to raised beds, a change the paper calls simple but revolutionary because it allows at least four times more cloves to be planted per acre. Second, a thick layer of organic mulch applied after planting suppresses weeds without hoeing or chemical weedicides, conserves soil moisture by cutting evaporation, and enriches the soil with organic matter as it decomposes. Third, water is applied precisely through furrows between the raised beds rather than broadcast, reaching the root zone efficiently with minimal waste. Fourth, and most striking, is a 'minimal intervention' philosophy: farmers are reported producing up to 300 maunds (12,000 kg) per acre of high-quality Dessi garlic without synthetic fertilizer, weedicides, fungicides, pesticides, or further hoeing.",
      "The yield and quality outcomes follow directly from that model: 250-300 maunds per acre of superior, lower-water-content bulbs with minimal storage weight loss and significantly extended shelf life versus conventional produce. At a conservative 250 maunds (10,000 kg) per acre and a minimum wholesale price of Rs. 100/kg, gross revenue reaches roughly Rs. 1,000,000 per acre, with minimal input costs pushing net profit past a million rupees on some farms for a six-month crop — a scale of return the paper describes as fundamentally changing farmer livelihoods.",
      "Beyond the farm gate, the paper frames PQNK garlic and onion as exceeding organic certification standards by virtue of its natural-production, agro-ecology-rebuilding approach, giving it a distinct premium market position. At the national level, it credits PQNK-driven domestic production increases with already reducing garlic import volumes within a few years, and positions consistent PQNK quality as a strong candidate for future export markets and foreign-exchange generation.",
      "The paper closes by tying these threads together: PQNK increases production efficiency through optimized geometry and precise irrigation, restores agricultural sustainability by removing chemical dependence, boosts farmer profitability by collapsing costs while lifting output value, and strengthens national food security through import substitution with a path toward exports — contingent on continued policy support, farmer training, access to specialized PQNK machinery, and market linkage initiatives.",
    ],
    keyTakeaways: [
      "Switching from flat fields to PQNK raised beds allows at least four times more garlic cloves to be planted per acre.",
      "Farmers are reported reaching up to 300 maunds (12,000 kg) per acre without synthetic fertilizer, weedicides, fungicides, or pesticides.",
      "At a conservative 250 maunds/acre and Rs. 100/kg, gross revenue is roughly Rs. 1,000,000 per acre, with net profit often exceeding one million rupees.",
      "Lower water content in PQNK-grown bulbs means significantly less storage weight loss and a longer shelf life than conventional produce.",
      "PQNK-driven domestic production growth has already contributed to reduced garlic import volumes.",
      "The system's precise furrow irrigation and organic mulch eliminate the need for manual hoeing and chemical weed control entirely.",
    ],
  },
  {
    slug: "restoring-prosperity-in-citrus-and-mango-orchards",
    title: "Restoring Prosperity in Citrus and Mango Orchards Through the PQNK Regenerative System",
    summary:
      "Decades of industrial orchard management have driven a 60% decline in Kinnow nutrition density and widespread orchard abandonment. This paper presents field data from a Toba Tek Singh comparison and the Sujjahabad Mango Research Station showing how PQNK reverses that decline, lifting A-grade fruit yield by up to 80%.",
    publishedDate: "2026-07-25",
    pdfPath: "/papers/restoring-prosperity-in-citrus-and-mango-orchards.pdf",
    heroImage: "/images/citrus-orchard.jpg",
    abstract: [
      "Citrus and mango orchards have been in steady decline for over 30 years under industrial management. Input costs have risen sharply even as yields fall, nutrition density in key varieties such as Kinnow has declined by as much as 60%, affecting taste, market value, and health benefit, and mounting farmer distress has led to widespread orchard abandonment and uprooting. The paper traces this crisis to specific, identifiable practices: excessive irrigation that destroys soil structure and depletes oxygen, tillage implements such as spring tine cultivators that create a compacted hardpan restricting root growth and water infiltration, and bare, chemically dependent soil that erodes biodiversity and destroys the soil microbiome.",
      "PQNK is presented not as a theoretical alternative but as a field-validated recovery method, anchored by two documented cases. At the Sujjahabad Mango Research Station, an orchard facing imminent collapse was converted to PQNK management and showed remarkable recovery within a few months. A more systematic comparison from Toba Tek Singh set conventional and PQNK Kinnow orchards side by side, generating the paper's core quantitative evidence.",
      "That comparison shows PQNK orchards operating at significantly lower annual cost per acre than the conventional PKR 80,000-200,000 range, with markedly lower disease pressure requiring far less chemical intervention. A-grade fruit yield rises from 40-50% under conventional management to 70-80% under PQNK, and net return per acre climbs from PKR 300,000-400,000 conventionally to a substantially higher PKR 500,000-800,000 under PQNK. Fruit quality metrics follow the same pattern: longer shelf life, dark green and healthy canopies versus stressed, prematurely ripening ones, and more uniform fruit maturity with better internal seed development.",
      "On pest and soil management, the Toba Tek Singh data show near-zero fruit fly damage under PQNK versus severe infestations conventionally, with mealybugs controlled by robust natural predator populations such as ants rather than costly, low-result chemical sprays. PQNK orchards also show visible mycorrhizal fungi activity — mushrooms appearing after rain — as a direct sign of the biological soil health driving nutrient cycling and disease resistance. Rehabilitated orchards are reported recovering fully, while 5-year-old high-density PQNK orchards are on track to outperform conventional orchards 'by several multiples' once they reach full production in year six.",
      "The paper concludes that the citrus and mango crisis is a direct consequence of broken agricultural ecosystems, not an inevitable feature of the crops themselves, and that the Sujjahabad and Toba Tek Singh evidence together make the case for widespread PQNK adoption as the path to environmental sustainability, economic prosperity through drastically lower costs and higher-value yield, and market leadership through nutrition-dense, long-shelf-life produce that surpasses organic standards.",
    ],
    keyTakeaways: [
      "Industrial orchard management has driven a 60% decline in Kinnow nutrition density and widespread orchard abandonment over the past 30 years.",
      "A Toba Tek Singh field comparison shows PQNK lifting A-grade fruit yield from 40-50% to 70-80%.",
      "Net return per acre rises from PKR 300,000-400,000 conventionally to PKR 500,000-800,000 under PQNK.",
      "PQNK orchards show near-zero fruit fly damage and natural mealybug control via predator populations like ants, replacing costly chemical spraying.",
      "The Sujjahabad Mango Research Station orchard, facing imminent collapse, showed remarkable recovery within a few months of PQNK conversion.",
      "Five-year-old high-density PQNK orchards are projected to outperform conventional orchards by several multiples once mature.",
    ],
  },
  {
    slug: "optimizing-mango-pruning-within-a-pqnk-ecosystem",
    title: "Optimizing Mango Pruning Within a Self-Sustaining PQNK Ecosystem for Punjab",
    summary:
      "This advisory paper reframes mango pruning as an ecological signal rather than a mechanical operation, timed to Punjab's cold dormant winter to redirect the tree's stored energy from vegetative growth into flowering. It sets out the precise December pruning protocol and the no-irrigation, no-fertilization discipline that makes it work.",
    publishedDate: "2026-07-25",
    pdfPath: "/papers/optimizing-mango-pruning-within-a-pqnk-ecosystem.pdf",
    abstract: [
      "Under conventional management, pruning is typically followed by irrigation and fertilization to force a fast vegetative recovery. This advisory paper, issued by Jamil Shahzad and Asif Sharif, argues that within a PQNK orchard, pruning should instead be treated as a carefully timed ecological signal to the tree's own survival mechanisms, working with existing seasonal conditions rather than overriding them with inputs. The stated goal is to manipulate the tree's auxin-cytokinin hormonal balance at a precise climatic point so stored energy is directed into reproductive flowering rather than vegetative leaf growth, without triggering a stress-induced leafy flush.",
      "Punjab's cold winter is framed as the orchard's greatest natural ally: it is the overarching stressor that primes the tree for flowering, and pruning is simply the final, precise cue layered on top of it. The protocol calls for pruning only after the tree has fully entered dormancy, marked by complete leaf drop and sustained cold soil temperatures, which typically falls in mid-December in Punjab conditions.",
      "The biological logic is explained in some detail: by mid-December the tree's energy reserves are already stored in roots and wood, and cold soil and air have halted vegetative activity, so a pruning cut at this point is not read by the tree as a call for new leaves but as a wound it will wait to heal. When sun intensity increases in late February or March, the combination of pre-existing cold stress and the healing wound is interpreted as a single strong signal to prioritize reproduction, bypassing significant leaf production and channeling energy from mature wood directly into flowering.",
      "Two key operations mimic natural disturbance rather than working against it. Sanitary pruning removes dead, diseased, or damaged wood, but that material stays in the system, stacked at the tree's base or chipped to begin recycling nutrients and building fungal-dominated biomass immediately. Structural pruning for light harvesting removes inward-growing branches and opens the canopy so light reaches lower layers and the soil surface. Crucially, the protocol specifies no irrigation after pruning, no fertilization, and no soil disturbance, since forcing recovery with inputs would undercut the very stress signal the technique depends on.",
      "The paper stresses that this pruning strategy only functions inside a fully mature PQNK ecosystem: continuous mulch cover to regulate soil temperature and moisture, an active soil food web to break down pruned wood and recycle nutrients, and living, undisturbed soil supplying the tree's needs. Done correctly, farmers should see prolific, biologically driven flowering, mineral-dense fruit from biologically processed nutrients, reduced pest pressure because there is less vegetative flush to attract them, and energy directed efficiently into fruit rather than excess foliage.",
    ],
    keyTakeaways: [
      "Mango pruning in a PQNK orchard is treated as a timed ecological signal, not a mechanical operation to be followed by irrigation and fertilization.",
      "The recommended window is mid-December, after full dormancy (complete leaf drop, sustained cold soil), leveraging Punjab's cold winter as the primary flowering stressor.",
      "The pruning cut combines with pre-existing cold stress to redirect the tree's stored energy from vegetative leaf growth into reproductive flowering.",
      "Pruned wood is never removed from the orchard; it is stacked or chipped at the tree base to recycle nutrients and build fungal biomass.",
      "The protocol explicitly forbids irrigation, fertilization, or soil disturbance after pruning, since forcing recovery would defeat the stress signal.",
      "The method only works within a mature PQNK ecosystem with continuous mulch cover and an active soil food web already in place.",
    ],
  },
  {
    slug: "achieving-high-density-kinnow-plantation-through-pqnk",
    title: "Achieving a High-Density Kinnow Plantation through the PQNK Framework: A Comparative Analysis of Rootstock Options and Their Synergy with Regenerative Soil Ecology",
    summary:
      "High-density Kinnow planting depends on getting two decisions right together: rootstock selection and soil environment. This paper argues that Flying Dragon Trifoliata's dwarfing trait is a deliberate design choice, not a compromise, and shows how it only delivers its full benefit inside a PQNK raised-bed root zone.",
    publishedDate: "2026-07-25",
    pdfPath: "/papers/achieving-high-density-kinnow-plantation-through-pqnk.pdf",
    heroImage: "/images/citrus-orchard.jpg",
    abstract: [
      "High-density planting (HDP) is a critical lever for improving yield and land-use efficiency in Kinnow mandarin (Citrus reticulata x Citrus sinensis) orchards, but the paper argues its full potential is only realized when rootstock genetics and soil ecology are designed together. It opens by reframing grafting itself: because Kinnow was bred as a hybrid for fruit quality rather than root performance, its own root system is unselected and often lacks the vigor, efficiency, and disease resistance needed under cultivation. Grafting, then, is not a correction for a defective plant but a strategic selection process that lets the orchardist impose specific, desirable traits onto the tree's foundation.",
      "For a PQNK high-density system planted at 8 ft. by 10 ft. spacing (1,089 plants per acre), the paramount desired trait is controlled canopy size, and the paper's comparative rootstock analysis identifies Flying Dragon Trifoliata as the definitive choice. Its genetic dwarfing is presented not as a weakness to be managed but as the very trait selected for: it maintains orchard geometry with minimal pruning effort, freeing the tree's energy for fruiting rather than vegetative sprawl, and keeping orchard size control biological rather than mechanical.",
      "That genetically controlled canopy is paired with a purpose-built below-ground environment: the field is laser-leveled and the historical hardpan shattered with a subsoiler for deep drainage; permanent raised beds are formed at 42 inches top width, 18-inch furrows, and 8 inches height; a diverse cover crop is grown and returned as surface mulch to start the soil life cycle without tillage; and grafted plants are set without soil disturbance, with the graft union kept well above the soil surface. The resulting root zone holds roughly 30% water-filled to 70% air-filled pore space, with microbes extracting a balanced nutrient spectrum and a competitive microbiome providing built-in disease suppression.",
      "Two management protocols get particular emphasis. Water shoots (suckers) emerging below the graft union must be cut flush to the trunk with sharp secateurs to prevent the tree reverting toward its own weak root system. And the graft union itself must sit at least 4-6 inches above final soil grade — burying it risks scion rooting, which bypasses the dwarfing rootstock entirely and also raises the risk of Phytophthora Foot Rot. The paper also covers advisory cases: where Flying Dragon isn't available and a more vigorous rootstock like Cleopatra Mandarin or Carrizo Citrange must be substituted, intensive structural and maintenance pruning becomes mandatory to hold the high-density geometry; and it notes that own-rooted, non-hybrid citrus varieties such as lemon, lime, and certain local mandarins can thrive on their own roots specifically because the PQNK soil environment removes the waterlogging, compaction, and biological imbalance that would otherwise stress them.",
      "The paper's overall argument is one of synergy: the dwarfing rootstock supplies the biological form (a naturally small tree), while the PQNK raised-bed habitat supplies the function (effortless nutrient cycling, moisture regulation, and disease protection) that lets that form actually perform. Neither element alone, the paper argues, delivers the sustainability, resilience, profitability, and orchard longevity that the combination achieves.",
    ],
    keyTakeaways: [
      "Flying Dragon Trifoliata is identified as the definitive rootstock for PQNK high-density Kinnow at 8 ft. x 10 ft. spacing (1,089 plants/acre), chosen deliberately for its dwarfing trait.",
      "Grafting is reframed as strategic trait selection, not correction: Kinnow's own root system is unselected and weak because the variety was bred for fruit quality, not rootstock performance.",
      "The PQNK raised-bed root zone (42\" beds, subsoiled hardpan, cover-crop mulch) targets roughly 30% water-filled / 70% air-filled soil pore space.",
      "The graft union must stay 4-6 inches above soil grade; burying it risks scion rooting and Phytophthora Foot Rot.",
      "Water shoots below the graft union must be cut flush to the trunk to prevent the tree reverting to its weak own-root system.",
      "If a more vigorous rootstock must substitute for Flying Dragon, intensive structural and maintenance pruning becomes mandatory to hold canopy geometry.",
    ],
  },
  {
    slug: "the-future-of-potato-cultivation-through-pqnk",
    title: "The Future of Potato Cultivation: A Scientific and Economic Comparison of ACI, Global Best Practices, and the PQNK Framework",
    summary:
      "Conventional potato farming traps growers in a cycle of high input costs, a hard yield ceiling near 14 tonnes per acre, and boom-bust pricing. This paper compares conventional (ACI), Global Best Practice, and PQNK potato systems on plant physiology, economics, and risk, and lays out a year-by-year transition pathway for farmers.",
    publishedDate: "2026-07-25",
    pdfPath: "/papers/the-future-of-potato-cultivation-through-pqnk.pdf",
    heroImage: "/images/potato-beds.jpg",
    abstract: [
      "The paper opens with a diagnostic image: soil that feels dead, lifeless, and inert in the hand is the signature of a collapsed system. Conventional 'Ancient Conventional Industrial' (ACI) potato farming produces exactly this, through compacted earth that repels water rather than absorbing it, plants left susceptible to disease, chemical runoff, and tubers that are often tasteless, less nutritious, carry chemical residues, and store poorly. PQNK's founding premise is the opposite: that soil is a living, breathing organism whose original design — teeming with microbial life, rich in organic matter, properly moist and aerated, buffered against temperature extremes — must be restored before the plant can reach its genetic potential.",
      "The paper grounds its argument in potato physiology. Tuber initiation and bulking depend on soil temperature in the 13°C-26°C range, consistent moisture, and day length; under vigorous PQNK growth, farmers use a technique called 'vine pressing' 25-30 days after germination, gently pressing vines with a plank or roller to signal the plant to stop vegetative expansion and begin tuber bulking. Potatoes also need a well-aerated root zone for tuber expansion (compacted soil stunts growth) and a steady nutrient supply rather than the boom-and-bust dosing typical of synthetic fertilizer. The paper describes a healthy source-sink relationship, where photosynthesizing vines (the source) fuel tuber development (the sink), a flow easily disrupted by heat, frost, or drought stress. It also details the soil microbiology underpinning all of this: mycorrhizal fungi extending root uptake of water and phosphorus, and beneficial bacteria fixing nitrogen and solubilizing minerals — biology that ACI practices destroy and PQNK actively cultivates.",
      "On economics, ACI potato production carries heavy recurring costs: roughly 1,500 kg of seed per acre, 3-6 bags of fertilizer, 10-15 cultivation passes, and ongoing chemical spend, capping yield near 14 tonnes per acre. PQNK shifts the cost structure toward one-time or periodic investment in organic mulch and bed establishment rather than annual chemical purchases, while a denser stand of roughly 50,000 healthier plants, a longer growing window, and better growing conditions push past the ACI yield ceiling with tubers that are more flavorful, chemical-residue-free, and longer-storing due to mineral density and stronger skins. The paper frames PQNK's biggest economic advantage as risk reduction: buffering against heat, cold, and drought de-risks farming from climate variability, and freedom from volatile fertilizer and pesticide markets further stabilizes farm income, while PQNK's stable soil environment even opens the door to near-perennial, staggered production that lets farmers sell fresh potatoes year-round at off-season premium prices.",
      "A year-by-year transition pathway is laid out for farmers moving off ACI. In year one: level the field with minimal disturbance while breaking the ACI-era hardpan for deep root growth and infiltration; form permanent 42-inch-wide raised beds; grow cover crops (legumes for nitrogen, deep-rooted species to break compaction) to restore organic matter and kickstart microbial life; plant the first potato crop under a thick organic mulch layer; and monitor closely, supplementing inputs only if an extreme situation demands it. From year one onward, the soil becomes a self-sustaining, largely closed-loop ecosystem, with management shifting to maintaining mulch, rotating crops on the permanent beds, and observing the natural balance as yields stabilize high and costs stay low.",
      "The paper concludes that ACI agriculture is a high-risk, degenerative dead end, that Global Best Practices offer real but incomplete improvement while remaining input-dependent, and that PQNK represents the necessary evolution toward a resilient, profitable, ecologically sound system — a shift from dominating nature to collaborating with it. It urges farmers, extension officers, and policymakers to start the transition on a small portion of land and let the results speak for themselves.",
    ],
    keyTakeaways: [
      "ACI potato farming caps out near a 14 tonne/acre yield ceiling; PQNK is positioned to break through it via roughly 50,000 healthier plants per acre and a longer growing window.",
      "'Vine pressing' 25-30 days after germination — gently pressing vines with a plank or roller — signals the plant to shift energy from vegetative growth into tuber bulking.",
      "PQNK shifts costs from recurring annual chemical inputs (1,500 kg seed, 3-6 fertilizer bags, 10-15 cultivations under ACI) to one-time or periodic mulch and bed investment.",
      "PQNK's stable soil environment opens the door to near-perennial, staggered production, letting farmers sell fresh potatoes year-round at off-season premium prices.",
      "PQNK-grown tubers are described as more flavorful, chemical-residue-free, and longer-storing due to mineral density and stronger skins.",
      "A defined year-one transition sequence covers hardpan-breaking, permanent 42-inch bed formation, cover cropping, and mulch-covered planting.",
    ],
  },
];

export function getPaperBySlug(slug: string) {
  return papers.find((p) => p.slug === slug);
}

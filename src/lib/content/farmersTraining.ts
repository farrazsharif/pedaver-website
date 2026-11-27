/**
 * PQNK Farmers Training (added 2026-11-27, author: "Farmers Training" as its own section, "a much more powerful tool as in it I
 * talk in farmers language"). Each session is one of Asif Sharif's Urdu training videos with an English transcript that he has
 * reviewed. The transcript is edited for reading (repeats removed, plain international English) without changing the meaning.
 * Visitors use the site's Translate button for their own language, and Read Aloud to listen.
 *
 * To add a session: transcribe, write the English draft for the author's review (PQNK_Claude_Work/Claude tools/farmers_training),
 * apply his corrections, then add an entry here. Time marks are "mm:ss" from the start of the video.
 */

export type TrainingSection = {
  /** "mm:ss" from the start of the video; clicking it plays the video from there. */
  time: string;
  heading: string;
  paragraphs: string[];
};

export type TrainingSession = {
  slug: string;
  /** The author's session number, e.g. "6.4". */
  number: string;
  title: string;
  summary: string;
  videoId: string;
  channelName: string;
  channelUrl: string;
  /** Video length, "mm:ss". */
  duration: string;
  /** Date the transcript was published on pedaver.com. */
  publishedDate: string;
  sections: TrainingSection[];
  related: { label: string; href: string }[];
};

export function timeToSeconds(time: string): number {
  return time.split(":").reduce((total, part) => total * 60 + Number(part), 0);
}

export const trainingSessions: TrainingSession[] = [
  {
    slug: "6-4-soil-moisture-management",
    number: "6.4",
    title: "Soil Moisture Management: Growing Crops with 80 Percent Less Water",
    summary:
      "Asif Sharif moves from soil to water. He explains the ways water is given to crops and why each one suits only certain sites, how the hardpan stops water and starves the groundwater, why water is above all a carrier of nutrients, what decides how much water a plant really needs, and why PQNK keeps the soil moist instead of irrigating by turn. For wheat, this means about 220 litres of water for each kilogram of grain instead of about 1,175 litres.",
    videoId: "jYGf84YbhFU",
    channelName: "Indus PQNK Farm",
    channelUrl: "https://www.youtube.com/@IndusPQNKFarm",
    duration: "31:21",
    publishedDate: "2026-11-27",
    sections: [
      {
        time: "00:00",
        heading: "From soil to water",
        paragraphs: [
          "Now we move from soil to water. Water is a precious resource, and most scientists agree that life itself began in water. The study I began with, of algae, also starts in water. There may have been animals in the water before them, but the land plants that followed grew out of algae, with the mycorrhizal fungus as their partner, and that partnership has continued ever since.",
          "Understanding water is very important, so I will explain it in detail. You have seen the soil. Now comes water.",
        ],
      },
      {
        time: "01:11",
        heading: "The ways we give water to crops",
        paragraphs: [
          "First, the ways we give water. The first is flood irrigation: we build bunds around the field, let water in from the watercourse, and drown the whole field, just as a river in flood does. Then there is border irrigation, where bunds trap the water in strips. Then furrow irrigation, with ridges and furrows, the way potatoes are planted. And then there is bed irrigation, which we started in 2008.",
          "All four are gravity flow systems: the water flows from a higher place to a lower one.",
        ],
      },
      {
        time: "02:24",
        heading: "Level only where the furrow runs",
        paragraphs: [
          "There is one more thing we can do with furrows. Instead of disturbing the whole field to level it, why not level only the strip where the furrow will run? Zero-level or laser-level just the furrow and leave the rest of the soil alone, so the topsoil is not disturbed. This works even where one end of the field is a foot higher than the other. If the difference is greater than that, make the higher part a separate field.",
        ],
      },
      {
        time: "03:23",
        heading: "Sprinkler, drip and sub-surface: the pressurised systems",
        paragraphs: [
          "First there is natural rain, and sprinklers copy it. Then there is drip irrigation, and sub-surface irrigation, where a small trench about 9 to 10 inches (23 to 25 cm) deep is dug and a porous pipe is buried in it. The pipe is full of tiny pores, and water slowly seeps out of them.",
          "All of these are pressurised systems: they need a pump to build the pressure. Sprinklers came in many kinds, first the centre pivot, then the lateral move, then small sprinklers.",
          "They were developed after the gravity systems for two or three main reasons. One was land that cannot be levelled. Such land depended on rain, and in years when the rain failed, the crop suffered badly. So people found a way to make rain artificially, so that in a drought or other extreme they could water the crop at least once. Sprinklers were made, above all, for rolling land.",
          "They bring many problems. The cost is very high. They need maintenance, and trained, skilled staff to run them. And they use a great deal of energy: you lift the water from below, then push it out again under pressure. The motor that builds the pressure is often twice the size of the pump motor, so the pumping cost can rise threefold.",
          "The spray makes droplets of different sizes, depending on the nozzle and the pressure. Some are very fine, some very coarse, and some in between. The finest stay in the air and blow away; they never reach the ground. The coarse and the middle-sized ones fall, and then it depends on the crop below. On a delicate crop, the coarse droplets punch holes in the leaves and damage them.",
          "So these are the different irrigation systems, and each one suits only certain sites.",
        ],
      },
      {
        time: "06:58",
        heading: "Drip is not for every farm",
        paragraphs: [
          "We have formed a habit: as soon as a few farmers start something, it is drip, drip, drip everywhere. Subsidies are offered, but much of their benefit can end up with the suppliers, and the farmer may pay more than the market price for the system. Farmers were tempted, and drip was installed. Yet running drip is not easy, and it brings many problems besides those of supply. Whenever you change to drip, the production system changes, and so do the soil and the root system. I will explain this further on.",
        ],
      },
      {
        time: "08:07",
        heading: "What PQNK relies on: rain, dew and humidity",
        paragraphs: [
          "What we rely on is this: we hold the rainwater in the field, one way or another. If the rain falls short, dew and the humidity in the air make up the gap. We have had great success in growing good crops without irrigation, and by irrigation I mean any method of applying water.",
          "We need this for rainfed land. As was said earlier today, we also need it for saline and sodic soils, and wherever water is the main problem. For that we must understand the system, start on a small scale, and build from there.",
        ],
      },
      {
        time: "09:18",
        heading: "How water moves in soil, and the hardpan",
        paragraphs: [
          "The slide shows how water moves through soil over time. Through large particles it moves faster, through small particles more slowly. Follow the blue lines and you can see how water moves through very fine particles and through coarse ones.",
          "We often talk about the hardpan, and this picture explains it well. We keep working the top four, five or six inches of soil with a cultivator or a harrow, and the cultivator's action keeps hardening the soil underneath. First, the tractor's air-filled tyres compact the soil heavily. Then comes the spring-tine cultivator: it is as if you trample the ground with your feet and then start digging. The soil below becomes hard, and this cultivator is the main cause of the hardpan. Below the hardpan the soil is soft again. The hardpan usually starts at six or seven inches and goes down to fifteen or even eighteen inches.",
          "In that layer, no water goes down and no air stays. The water stays on top, so the soil can absorb water only in the layer above it. Second, anaerobic bacteria, nematodes and other organisms that harm plants develop there. Third, the aquifer below, our groundwater, is not recharged. We keep pumping water out, but for how many more years can we do that? We have taken the water table from 20 feet down to 200 feet, and in some places further. Who will recharge it? That water built up over hundreds of thousands of years, and the system we have made does not recharge it, because the water cannot pass the hardpan. So the water table keeps falling. In some areas it has dropped to 1,200 feet. This whole system needs to be corrected.",
        ],
      },
      {
        time: "12:05",
        heading: "Water is a pickup truck",
        paragraphs: [
          "Fix this slide in your mind. It will serve you well.",
          "A plant's roots are of two kinds. The first are the root hairs, very fine roots that draw water in by capillary action. The second are the thick roots, which anchor the plant and keep it standing.",
          "Water rises by capillary action, and its evaporation from the leaves creates a suction that pulls more water up. This water carries minerals with it. Water is a pickup truck, a delivery van: it dissolves the minerals in the soil, carries them up, and evaporates from the leaves, while the minerals stay in the plant. The plant combines them with carbon dioxide and makes its food.",
          "Carrying nutrients is the major use of water in a plant. Its second use is to keep the plant cool, as I will explain, and its minor uses are to supply hydrogen and to keep the plant's cells firm. But above all, water is a carrier.",
          "It is like the blood in our body. The body does not eat or use up its blood. The blood takes nourishment from the stomach and oxygen from the lungs, delivers them to every cell, and goes round again to be refreshed. Water moves in the same way: rain falls, plants use it, the rest rises, and it rains again. Allah Almighty has made this a circle, just like the circulation of blood in our body.",
          "Every drop of water that is not absorbed by a fine root and does not rise through the plant is useless, and it does us harm. Too much water also dilutes the soil solution.",
        ],
      },
      {
        time: "14:57",
        heading: "Give the plant pure milk, not watered-down lassi",
        paragraphs: [
          "Take the glass of water that rises through the leaves. You cannot make it bigger. The canopy decides its size, as I will explain, and the plant will drink only that much. Think of it as one glass. You can fill it with thin lassi (a yoghurt drink diluted with water), with half milk and half water, or with pure milk. The richer the drink, the more nutrients and minerals the plant takes up, and the healthier, greener and more vigorous it becomes.",
          "So the water a crop needs is equal to its transpiration. The water that rises through the leaves is the plant's whole requirement. All other water is wasted; it only causes trouble and does damage.",
          "Under our present system of flood irrigation, 90 percent of the water or more is of no use to us. Hardly 5 percent, and I am being generous, is used by the plant. If there is no hardpan, perhaps 4 or 5 percent seeps down. That is how water is shared out today.",
        ],
      },
      {
        time: "16:29",
        heading: "What decides how much water a plant needs",
        paragraphs: [
          "Which factors decide how much water a plant needs? First, the size of its canopy: the leaf area of the whole plant. If there are a thousand plants and each has one square inch of leaf, the crop has a thousand square inches of leaf, and the water rises from that surface. The bigger the canopy, the more water it needs. Leaf size and leaf thickness play a part too.",
          "Then come the outside factors. How much moisture is in the air? In a rainy region during the monsoon, the air is so humid that water hardly evaporates. Hang washed clothes outside, and they will not dry in four days. So evaporation falls very low in the monsoon.",
          "Then temperature. Less water evaporates at 20 degrees Celsius than at 30, and much more at 40. Water is doing two jobs here: it carries minerals up, and it keeps the plant cool. When we go out in the summer sun, we sweat, and sweat cools the body. It is a law of nature that whenever a liquid turns into a gas, it cools its surroundings. Every air conditioner and every fridge works on this law: a gas is condensed, then allowed to evaporate, and a fan carries the cooling into your room or your fridge. The plant does the same. In great heat it evaporates more water to cool and protect itself.",
          "Then the speed of the wind. The faster the wind blows, the more water it carries away.",
          "These four factors decide how much water will rise through the plant. In a greenhouse the conditions are controlled, like this air-conditioned room. In the open field, humidity, temperature and wind decide the water uptake, and we cannot control them.",
        ],
      },
      {
        time: "19:40",
        heading: "Smaller leaves mean a smaller yield",
        paragraphs: [
          "Many people play a trick here: \"We have bred a drought-resistant variety.\" Its canopy is reduced, so less water moves through it. But water is the pickup truck. Make the truck smaller, and less goes up: the nutrition falls, and so does the yield. It makes no sense. If we cut the water uptake by reducing the leaves, the yield will show it.",
        ],
      },
      {
        time: "20:29",
        heading: "Allah designed every leaf for its place",
        paragraphs: [
          "Now see what Allah Almighty has done. He gave every plant its own size, and its own leaf size, shape and number, so that it performs best in its own environment. The leaves were designed for the best transpiration.",
          "Look at the rice plant on the left of the slide. If rice needed a lot of water, why would Allah make its leaf narrow? The leaf is narrow because rice does not need much water. Look at the leaves of plants where rain is low or water is scarce: they are narrow, like the leaf of the date palm. Desert plants have narrow leaves, and you will hardly find a broad-leaved plant there. But their leaves are thicker, so they can hold water inside for longer. The rice leaf is narrow and thin as well, which tells us that rice needs the least water of all.",
          "And rice is grown when the humidity is very high. The rice crop comes in the monsoon, when the humidity is above 80 percent, so very little transpiration takes place. On top of that, its leaf is small. What would it need so much water for?",
          "The basic lesson is this: Allah designed each plant for its needs and its conditions, and matched the width, thickness, number and size of its leaves to them.",
        ],
      },
      {
        time: "22:43",
        heading: "Stop irrigating by turn: manage the soil moisture",
        paragraphs: [
          "We all think constantly about irrigation, about how to apply the water. We asked ourselves what this whole cycle is for. All we need is to keep the soil moist; we need no water beyond that. If we can keep the moisture in the soil some other way, why irrigate at all?",
          "When we began studying this, there was flood irrigation. Then came furrow irrigation, which I introduced in the early seventies. Then came sprinkler and drip, a new fashion driven by subsidies, without anyone thinking through what they meant. Drip was sent even to canal-irrigated areas, to field crops and to orchards. Farmers were persuaded and given drip. Six months or a year later the pipes are rotting, the tractor has run over them, and they no longer work in the field. Then, in 2008, we brought in the raised bed irrigation system, and it is working.",
          "Our system is periodic: water every week or every fifteen days, by turn (in Pakistan, warabandi). Nobody looks at whether the crop or the soil is asking for water. The water simply comes every week and drowns everything. We must put this periodic irrigation out of our minds; it is not a system. All we have to do is check the moisture in the soil and not let it fall. Keep the soil at the 30/70 balance: about 30 percent of the pore space holding water and 70 percent holding air. The closer you keep to it, the healthier the plant stays, with no excess water, and the microbes and the rest of the soil life stay healthy too.",
          "So we brought a new regime, a new theory, a new philosophy: the Soil Moisture Management system. We do not irrigate. We see that the soil keeps its 30/70 balance, and when the moisture drops, we give a light flow of water to restore it. That may be needed after two months, or after ten days. And when mulch covers the soil, very little is lost to evaporation.",
          "(Once PQNK beds have matured, they need no irrigation at all where rainfall is 16 inches (400 mm) a year or more. These light flows are for the transition years.)",
        ],
      },
      {
        time: "25:44",
        heading: "Wheat: 220 litres instead of 1,175",
        paragraphs: [
          "When we worked out the actual water requirement of each crop, its transpiration, we put all the data in this table. Normally we give wheat 16 acre-inches of water, which is about 1,645 cubic metres, or about 1.6 million litres. With a yield of 1,400 kg per acre, that is 1,175 litres of water for each kilogram of wheat.",
          "Under our system it falls to 220 litres for each kilogram: only 19 percent of the water. We save 81 percent.",
          "It is the same with other crops. People say sugarcane uses the most water. Grown the right way, sugarcane uses the least water of all for each kilogram it produces.",
          "(The full table for every crop is in KP-052 and in Chapter 52 of the PQNK book; see Related on pedaver.com below. For sugarcane it is 206 litres per kilogram conventionally and 26 on PQNK. The number of light irrigations is not given, because it varies with the soil and the field conditions.)",
        ],
      },
      {
        time: "27:55",
        heading: "The root tip is a filter",
        paragraphs: [
          "At the root tip, where the root begins, Allah has placed a filter. If there is too much salt in the water, the root removes it by filtration, by reverse osmosis, and takes up water only at the concentration the plant needs. But if the salts are beyond its capacity, if the TDS (total dissolved solids) is too high, the water stops going in. The root cap does not let water of that strength in, the plant cannot take up water, and it goes into decline.",
          "This is a natural system. If the root could not control what it takes in, the plant would build up too high a concentration of minerals. Water uptake depends on the strength of the mineral solution in the water, on the plant's structure, and on the conditions around it.",
        ],
      },
    ],
    related: [
      { label: "KP-148: Soil Moisture Management in PQNK Organic Farming: The 30/70 Rule", href: "/papers/soil-moisture-management-in-pqnk-organic-farming/" },
      { label: "KP-216: How Much Water Does One Irrigation Use?", href: "/papers/how-much-water-does-one-irrigation-use/" },
      { label: "KP-052: Creating On-Farm \"Micro-Water Cycles\" (the full crop water table)", href: "/papers/creating-on-farm-micro-water-cycles/" },
      { label: "PQNK Book, Chapter 52: The Sugar Industry (the same table)", href: "/books/natural-ecosystem-science/the-sugar-industry/" },
      { label: "KP-231: Why a Plant Needs Water", href: "/papers/why-a-plant-needs-water/" },
      { label: "KP-217: The PQNK Water System: Receive, Retain, Use", href: "/papers/the-pqnk-water-system/" },
    ],
  },
];

export function getTrainingSession(slug: string) {
  return trainingSessions.find((s) => s.slug === slug);
}

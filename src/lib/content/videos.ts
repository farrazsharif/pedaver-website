export interface VideoEntry {
  videoId: string;
  title: string;
  channel: "official" | "founder";
  /** Short written English summary — see the note on ExternalVideoEntry.description. */
  description?: string;
}

/**
 * A video hosted on someone else's YouTube channel (e.g. a farmer's own
 * testimonial video). Because the player is a plain YouTube iframe embed,
 * any public video ID can be played directly on-page regardless of who
 * uploaded it — this just needs the source channel name/URL for credit.
 */
export interface ExternalVideoEntry {
  videoId: string;
  title: string;
  sourceName: string;
  sourceUrl: string;
  /**
   * A short written English summary of the video's spoken content. Most of
   * these are farmer workshops recorded in Urdu/Punjabi with no usable
   * YouTube captions, so this is the only text on the page that actually
   * describes what's said — and, unlike the video itself, it's real page
   * text that the site's translate-to-other-languages feature can pick up.
   */
  description?: string;
}

export const officialChannel = {
  name: "PedaVer PQNK",
  handle: "@pedaverpqnk3167",
  url: "https://www.youtube.com/@pedaverpqnk3167/videos",
  subscribers: "11K+",
  videoCount: "847",
};

export const founderChannel = {
  name: "Asif Sharif",
  handle: "@aasifsharif",
  url: "https://www.youtube.com/@aasifsharif/videos",
  subscribers: "3.36K+",
  videoCount: "621",
};

/** Workshop / event videos not tied to a specific tracked channel. */
export const workshopVideos: ExternalVideoEntry[] = [
  {
    videoId: "95R-Ah83lI0",
    title: "Sahiwal Farmers Workshop — PQNK Old & New Farmers",
    sourceName: "YouTube",
    sourceUrl: "https://www.youtube.com/watch?v=95R-Ah83lI0",
    description:
      "Asif Sharif explains the devastation caused by ACI (Ancient Conventional Industrial) farming to a room of Sahiwal farmers, walking through why that damage happens and how PQNK reverses it.",
  },
];

export const videos: VideoEntry[] = [
  {
    videoId: "T03n8FqZ-eg",
    title: "PQNK — The Natural Ecosystem Science of Production Agriculture (Story Book, V2)",
    channel: "official",
  },
  {
    videoId: "7gUHowqR8D4",
    title: "No Other Business Is as Profitable as Food Production (Lecture, 2023)",
    channel: "official",
    description:
      "Asif Sharif's 2023 lecture, in Urdu, on the viability of farming as a business. Working from slides, he walks through four one-acre crop rotations on PQNK beds, such as rice, potato and maize in a single year, peanut followed by onion and garlic, and melons interplanted with a continuous run of vegetables, with the costs and returns of each. He argues that low input costs, higher quality and a managed supply chain that pays the farmer more and charges the consumer less make food production more profitable than most industries, and calls for Crop Production Management Companies and business investment in the sector.",
  },
  {
    videoId: "xzORUOK79v4",
    title: "Pomegranate on PQNK",
    channel: "official",
    description:
      "Pomegranate grown at high density under PQNK, where deep, infrequent irrigation through the fractured hardpan profile prevents the fruit cracking and pest pressure that plague conventionally irrigated orchards.",
  },
  {
    videoId: "bpmGRdrccH4",
    title: "PQNK — The Natural Ecosystem Science of Production Agriculture (Story Book)",
    channel: "founder",
  },
  {
    videoId: "Di7XD7iPUa4",
    title: "Advanced Canopy Management: Plant \"Topping\" for Energy Diversion",
    channel: "founder",
    description:
      "Part of PQNK's \"Four Directives\" for guiding a plant's own energy allocation — topping (removing the growing tip) releases apical dominance and redirects the plant's energy from vertical growth into branching, fruiting, and root development.",
  },
  {
    videoId: "Z6fKpGgyRuI",
    title: "Channeling Plant Energy: A PQNK Guide to Managing Vegetative Growth",
    channel: "founder",
  },
  {
    videoId: "X2HHUcARW_g",
    title: "Slit Insertion Precision Planter SIPP",
    channel: "founder",
  },
  {
    videoId: "3y9EiGkABEs",
    title: "SIPP & VIPP No-Till Precision Planters for PQNK",
    channel: "founder",
    description:
      "A 21-minute walk through PQNK's two no-till planters, built for soil that is never bare. Every planter must place seed at a consistent depth through a living crop, dead mulch or both. SIPP, the Slit Insertion Precision Planter, cuts one continuous slit 2 inches wide and 2 inches deep and meters one seed at a time into it; it is the simpler, faster choice where residue is light or brittle. VIPP, the Vertical Insertion Precision Planter, pokes a single cone-shaped hole per seed, under half an inch wide at the bottom, an inch at the top and an inch and a half deep, so tough corn, sugarcane and cotton stalks and rice straw cannot drag or skip it. Both keep the bed profile as it is, never disturb the soil life beneath, and plant 5 rows in a first pass and 4 more in a second on a 42-inch bed.",
  },
  {
    videoId: "0njmBrIGDGY",
    title: "Not Just Another Book: PQNK, The Natural Ecosystem Science of Production Agriculture",
    channel: "founder",
    description:
      "A short introduction to Asif Sharif's book. Most farming books tell farmers what to add; PQNK asks how nature grows a forest with no one feeding it. The book is a complete, field-proven system in which the soil comes alive again, crops feed themselves through the life around their roots, pests settle on their own, and costs fall while yields hold or rise. All 65 chapters are free to read, listen to or download on pedaver.com.",
  },
];

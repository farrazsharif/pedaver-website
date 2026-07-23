export interface FarmerStory {
  name: string;
  location?: string;
  role: string;
  quote: string;
  cropSlug?: string;
}

export const farmerStories: FarmerStory[] = [
  {
    name: "Mian Arfan Khalid",
    role: "Wheat grower",
    quote: "Wheat on PQNK — lowest cost of production, highest quality.",
    cropSlug: "wheat",
  },
  {
    name: "Nasir Goraya",
    location: "Sargodha",
    role: "Kinnow (citrus) grower",
    quote: "Citrus on PQNK, documented on our own orchard in Sargodha.",
    cropSlug: "citrus-kinnow",
  },
  {
    name: "Kaushil Patel",
    role: "PQNK farmer & researcher",
    quote:
      "Raised detailed questions on crop light requirements under PQNK, answered directly by our advisory team.",
  },
  {
    name: "Gaubharat",
    role: "Farmer, PQNK WhatsApp community",
    quote:
      "Brought a question on the Natural Ecosystem Science of Production Agriculture directly to our farmer WhatsApp group — answered as part of our ongoing advisory support.",
  },
];

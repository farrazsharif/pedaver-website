export interface FarmerStory {
  name: string;
  location?: string;
  role: string;
  quote: string;
  cropSlug?: string;
  /** Optional: a YouTube video ID of this farmer telling their own story, from any channel. */
  videoId?: string;
  videoSourceName?: string;
  videoSourceUrl?: string;
}

export const farmerStories: FarmerStory[] = [
  {
    name: "Mian Arfan Khalid",
    role: "Wheat grower",
    quote: "Wheat on PQNK — lowest cost of production, highest quality.",
    cropSlug: "wheat",
    videoSourceName: "YouTube",
    videoSourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=Wheat+on+PQNK+Mian+Arfan+Khalid",
  },
  {
    name: "Nasir Goraya",
    location: "Sargodha",
    role: "Kinnow (citrus) grower",
    quote: "Citrus on PQNK, documented on our own orchard in Sargodha.",
    cropSlug: "citrus-kinnow",
    videoSourceName: "YouTube",
    videoSourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=Citrus+on+PQNK+Nasir+Goraya+Sarghoda",
  },
  {
    name: "Mirshad Ali",
    role: "Mango & citrus grower",
    quote: "Citrus recovery on PQNK — bringing a declining orchard back to health.",
    cropSlug: "mango",
    videoSourceName: "YouTube",
    videoSourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=Citrus+recovery+Farmer+Mirshad+Ali+Mango",
  },
  {
    name: "Zia Ul Azad",
    location: "India",
    role: "Vegetable grower",
    quote: "High-nutrition, high-density vegetables produced under PQNK.",
    cropSlug: "vegetables-oap",
    videoSourceName: "YouTube",
    videoSourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=vegetables+farmer+Zia+Ul+Azad+India+PQNK",
  },
  {
    name: "Ali Dhillon",
    location: "Gujranwala",
    role: "PQNK farmer",
    quote: "Reports on his own PQNK results and adoption.",
    videoSourceName: "YouTube",
    videoSourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=PQNK+farmer+Ali+Dhillon+Gujranwala",
  },
  {
    name: "Bilal",
    role: "Wheat grower",
    quote: "Wheat on PQNK — lowest cost of production, highest quality.",
    cropSlug: "wheat",
    videoSourceName: "YouTube",
    videoSourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=Wheat+on+PQNK+Bilal",
  },
  {
    name: "Mohammad Ismail Lieah",
    role: "Citrus grower",
    quote: "Citrus on PQNK, documented on his own orchard.",
    cropSlug: "citrus-kinnow",
    videoSourceName: "YouTube",
    videoSourceUrl: "https://www.youtube.com/@pedaverpqnk3167/search?query=Citrus+on+PQNK+Farmer+Mohammad+Ismail+Lieah",
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

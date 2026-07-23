export interface VideoEntry {
  videoId: string;
  title: string;
  channel: "official" | "founder";
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

export const videos: VideoEntry[] = [
  {
    videoId: "T03n8FqZ-eg",
    title: "PQNK — The Natural Ecosystem Science of Production Agriculture (Story Book, V2)",
    channel: "official",
  },
  {
    videoId: "xzORUOK79v4",
    title: "Pomegranate on PQNK",
    channel: "official",
  },
  {
    videoId: "Nf7-cErzDOU",
    title: "PQNK — The Natural Ecosystem Science of Production Agriculture (Story Book, V2)",
    channel: "founder",
  },
  {
    videoId: "Di7XD7iPUa4",
    title: "Advanced Canopy Management: Plant \"Topping\" for Energy Diversion",
    channel: "founder",
  },
  {
    videoId: "Z6fKpGgyRuI",
    title: "Channeling Plant Energy: A PQNK Guide to Managing Vegetative Growth",
    channel: "founder",
  },
];

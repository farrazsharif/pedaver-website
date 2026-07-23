export interface NavItem {
  key:
    | "home"
    | "about"
    | "founder"
    | "crops"
    | "resources"
    | "videos"
    | "farmerStories"
    | "certification"
    | "contact";
  path: string;
}

export const navItems: NavItem[] = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "founder", path: "/founder" },
  { key: "crops", path: "/crops" },
  { key: "resources", path: "/resources" },
  { key: "videos", path: "/videos" },
  { key: "farmerStories", path: "/farmer-stories" },
  { key: "certification", path: "/certification" },
  { key: "contact", path: "/contact" },
];

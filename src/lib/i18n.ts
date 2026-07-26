export interface NavItem {
  key:
    | "home"
    | "about"
    | "founder"
    | "crops"
    | "resources"
    | "videos"
    | "validation"
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
  { key: "validation", path: "/validation" },
  { key: "contact", path: "/contact" },
];

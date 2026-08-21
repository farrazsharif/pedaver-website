// Loads the static content-snapshot.json (Papers + Science + taxonomy
// vocabulary), produced by scripts/export-content.ts. Kept in memory —
// V1's corpus is small (186 papers, 10 science pages).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SNAPSHOT_PATH = path.join(__dirname, "..", "content-snapshot.json");

export interface PaperContent {
  slug: string;
  title: string;
  summary: string;
  category: string;
  crops: string[];
  fieldProblems: string[];
  scientificDomains: string[];
  fieldPractices: string[];
  authorityStatus: string;
  evidenceType: string;
  questionsAnswered: string[];
  keywords: string[];
  scienceLinks: { page: string; why: string }[];
}

export interface ScienceContent {
  domainSlug: string;
  path: string;
  title: string;
  description: string;
}

interface Snapshot {
  generatedAt: string;
  papers: PaperContent[];
  science: ScienceContent[];
  taxonomy: {
    scientificDomains: string[];
    problemFamilies: string[];
    problemToFamilies: Record<string, string[]>;
    crops: Record<string, string[]>; // canonical crop name -> alias list
    fieldProblems: Record<string, string[]>;
  };
}

if (!fs.existsSync(SNAPSHOT_PATH)) {
  throw new Error(
    `content-snapshot.json not found at ${SNAPSHOT_PATH}. Run "npm run export-content" first.`
  );
}

export const snapshot: Snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_PATH, "utf8"));

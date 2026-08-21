// Reads the main site's Papers, Science pages, and taxonomy vocabulary and
// writes a flat JSON snapshot the Ask PQNK service can load without
// depending on the Next.js app's build system or path aliases.
//
// Run manually with: npx tsx scripts/export-content.ts
// (from ask-pqnk-service/). Re-run whenever Papers/Science content changes.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, "..", "..");

interface PaperExport {
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

interface ScienceExport {
  domainSlug: string;
  path: string;
  title: string;
  description: string;
}

async function loadPapers(): Promise<PaperExport[]> {
  const mod = await import(path.join(SITE_ROOT, "src/lib/content/papers.ts"));
  const papers = mod.papers as Array<{ slug: string; title: string; summary: string; category: string }>;

  const metaMod = await import(path.join(SITE_ROOT, "src/lib/content/knowledge/taxonomy.ts"));
  const metadataList = metaMod.METADATA as Array<{
    slug: string;
    crops: string[];
    fieldProblems: string[];
    scientificDomains: string[];
    fieldPractices: string[];
    authorityStatus: string;
    evidenceType: string;
    questionsAnswered: string[];
    keywords: string[];
    scienceLinks: { page: string; why: string }[];
  }>;
  const metaBySlug = new Map(metadataList.map((m) => [m.slug, m]));

  return papers.map((p) => {
    const meta = metaBySlug.get(p.slug);
    return {
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      category: p.category,
      crops: meta?.crops ?? [],
      fieldProblems: meta?.fieldProblems ?? [],
      scientificDomains: meta?.scientificDomains ?? [],
      fieldPractices: meta?.fieldPractices ?? [],
      authorityStatus: meta?.authorityStatus ?? "Requires PQNK Review",
      evidenceType: meta?.evidenceType ?? "",
      questionsAnswered: meta?.questionsAnswered ?? [],
      keywords: meta?.keywords ?? [],
      scienceLinks: meta?.scienceLinks ?? [],
    };
  });
}

function extractScience(): ScienceExport[] {
  const domains = [
    "soil", "plants", "water", "biodiversity", "nutrition",
    "crop-protection", "climate", "food-quality",
    "production-architecture", "transition",
  ];
  const results: ScienceExport[] = [];
  for (const domain of domains) {
    const file = path.join(SITE_ROOT, "src/app/science", domain, "page.tsx");
    const src = fs.readFileSync(file, "utf8");
    const titleMatch = src.match(/export const metadata:\s*Metadata\s*=\s*buildMetadata\(\{\s*title:\s*"([^"]+)"/);
    const descMatch = src.match(/export const metadata:\s*Metadata\s*=\s*buildMetadata\(\{[\s\S]*?description:\s*\n?\s*"([^"]+)"/);
    if (!titleMatch || !descMatch) {
      throw new Error(`Could not extract title/description for science domain "${domain}" from ${file}`);
    }
    results.push({
      domainSlug: domain,
      path: `/science/${domain}`,
      title: titleMatch[1].replace(/\s*\|\s*[^|]+$/, ""),
      description: descMatch[1],
    });
  }
  return results;
}

function loadTaxonomy() {
  const raw = fs.readFileSync(
    path.join(SITE_ROOT, "src/lib/content/knowledge/taxonomy.json"),
    "utf8"
  );
  return JSON.parse(raw);
}

async function main() {
  const [papers, science, taxonomy] = [await loadPapers(), extractScience(), loadTaxonomy()];
  const snapshot = { generatedAt: new Date().toISOString(), papers, science, taxonomy };
  const outPath = path.join(__dirname, "..", "content-snapshot.json");
  fs.writeFileSync(outPath, JSON.stringify(snapshot, null, 2));
  console.log(`Wrote ${outPath}`);
  console.log(`  papers: ${papers.length}`);
  console.log(`  science: ${science.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

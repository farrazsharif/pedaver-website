# Pedaver.com — SEO Refinement & Knowledge Papers Publishing Guide

**For:** Claude Code, working directly in the `pedaver-website` repo
**Prepared by:** Cowork, after inspecting the live codebase (Next.js 16.2, App Router, static export, GitHub Actions → cPanel FTP)
**Goal:** (1) make every page on pedaver.com correctly discoverable and described in search results, and (2) stand up a `/papers` section so PQNK Knowledge Papers can be published on a regular cadence and indexed by Google individually — not just linked as bare PDFs.

This is one combined brief covering both. Hand it to Claude Code as-is, or paste sections in as you work through them. Everything below was checked against the actual repo, not written generically — file paths, component names and existing conventions are real.

---

## 0. What's already true about this codebase

Confirmed directly from the repo before writing this:

- **Stack:** Next.js 16.2 App Router, exported as a fully static site (`output: "export"` in `next.config.ts`), hosted on cPanel shared hosting. No backend — the contact form uses `mailto:`.
- **Deploy is already automated.** `.github/workflows/deploy.yml` builds and FTP-deploys to cPanel on every push to `main`. This matters a lot for the papers workflow below: publishing a new paper is a `git push`, not a manual re-upload.
- **Content is data-driven**, not hardcoded in components. Existing pattern: `src/lib/content/crops.ts` holds an array of `Crop` objects; `src/app/crops/[slug]/page.tsx` uses `generateStaticParams()` to pre-render one static page per crop. `src/app/crops/page.tsx` is the index/listing page. This is the exact pattern the new `/papers` section should follow.
- **Copy/labels live in `src/lib/dictionaries/en.ts`** (a single English strings object — the site is English-only, there's no real i18n despite the "dictionary" name).
- **The SEO problem is confirmed and not yet fixed.** `src/app/layout.tsx` exports one `metadata` object at the root and nothing else — no route currently overrides it, including `crops/[slug]/page.tsx`, which has no `generateMetadata()` at all. Every page on the live site returns the identical title (`Pedaver — PQNK`) and description. There is no `robots.txt` or `sitemap.xml` anywhere in the project.
- A prior audit (`docs/Pedaver_SEO_Metadata_Spec.md` if it's still in the repo, otherwise it was in the working folder) already drafted exact title/description copy for every existing page and crop. Reuse that copy verbatim where it exists rather than re-deriving it — Part 1 below just points to it.

---

## Part 1 — Fix site-wide SEO fundamentals

### 1.1 Per-page metadata

Every static route needs its own `metadata` export; the one dynamic route (`crops/[slug]`) needs `generateMetadata()`.

```ts
// src/app/about/page.tsx  (repeat the pattern for every static route)
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Pedaver — The Science Behind PQNK",
  description:
    "Pedaver is rebuilding production agriculture around PQNK: a natural ecosystem science that cuts input cost and restores soil health across Food, Feed, Fiber and Bio-Fuel crops.",
  openGraph: {
    title: "About Pedaver — The Science Behind PQNK",
    description:
      "Pedaver is rebuilding production agriculture around PQNK: a natural ecosystem science that cuts input cost and restores soil health across Food, Feed, Fiber and Bio-Fuel crops.",
    url: "https://pedaver.com/about",
    siteName: "Pedaver",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Pedaver — The Science Behind PQNK",
    description:
      "Pedaver is rebuilding production agriculture around PQNK: a natural ecosystem science that cuts input cost and restores soil health across Food, Feed, Fiber and Bio-Fuel crops.",
  },
};

export default function AboutPage() { /* existing component, unchanged */ }
```

Apply this to `/about`, `/founder`, `/crops`, `/resources`, `/certification`, `/videos`, `/contact`, `/farmer-stories` — and use `docs/Pedaver_SEO_Metadata_Spec.md` for the exact title/description text already written for each (150–160 characters, already checked for display length). Don't reinvent that copy.

For the dynamic crop route, one `generateMetadata()` covers all 21 crop pages:

```ts
// src/app/crops/[slug]/page.tsx — add above the existing default export
import type { Metadata } from "next";
import { getCropBySlug } from "@/lib/content/crops";
import { getCropImage } from "@/lib/content/cropImages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const crop = getCropBySlug(slug);
  if (!crop) return {};
  const title = `${crop.name} Under PQNK | Pedaver`;
  const description = crop.blurb;
  const image = getCropImage(slug);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://pedaver.com/crops/${slug}`,
      siteName: "Pedaver",
      type: "article",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
```

The metadata spec doc has hand-tuned titles per crop (e.g. wheat, cotton, rice) that read better than the mechanical `${crop.name} Under PQNK` template above — use those where they exist, fall back to the template for any crop not yet covered there.

### 1.2 `robots.txt`

Next.js's static-export mode supports the native file-based generator — it pre-renders to a real static file at build time, so this works fine with `output: "export"`.

```ts
// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://pedaver.com/sitemap.xml",
  };
}
```

### 1.3 `sitemap.xml`

Same native generator, list-driven so new crops **and new papers** are picked up automatically without hand-editing an XML file:

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { crops } from "@/lib/content/crops";
import { papers } from "@/lib/content/papers"; // added in Part 2

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pedaver.com";
  const staticPages = [
    "", "/about", "/founder", "/crops", "/resources",
    "/certification", "/videos", "/contact", "/farmer-stories", "/papers",
  ];
  return [
    ...staticPages.map((path) => ({ url: `${base}${path}`, lastModified: new Date() })),
    ...crops.map((c) => ({ url: `${base}/crops/${c.slug}`, lastModified: new Date() })),
    ...papers.map((p) => ({ url: `${base}/papers/${p.slug}`, lastModified: new Date(p.datePublished) })),
  ];
}
```

Build `sitemap.ts` **after** `papers.ts` exists (Part 2), or comment out the `papers` import/lines temporarily — don't skip wiring papers into the sitemap once that content file exists, since an unlisted page is much slower to get crawled.

### 1.4 Structured data (JSON-LD)

Not in the original spec doc — worth adding now since it's what actually earns rich results and helps Google understand what kind of entity each page is ("proper tags to guide each search," in the founder's words, is exactly what this does).

Add an `Organization` schema once, site-wide, in the root layout:

```tsx
// src/app/layout.tsx — inside <head> (Next 16 lets you add raw JSON-LD via a script tag in the body/head)
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Pedaver",
      url: "https://pedaver.com",
      description: dict.meta.tagline,
      sameAs: [
        "https://www.facebook.com/Pedaver",
        "https://www.youtube.com/@pedaverpqnk3167",
        "https://www.youtube.com/@aasifsharif",
      ],
    }),
  }}
/>
```

Per-paper `ScholarlyArticle` schema is covered in Part 2.5 below — that's the higher-value addition since it's what lets a paper's title/author/date show up distinctly in search results rather than as a generic page.

### 1.5 Small cleanup items while a developer is in this code

- Homepage hero carousel images render with no `alt` text; the per-crop images already have good descriptive alt text (`"Wheat grown under PQNK"`) — extend that same pattern to the homepage.
- `/resources` currently reads as one long page with six numbered sections (hardpan, soil chemistry, raised beds, Jantar, mulch, moisture). Each is genuinely substantial and topic-distinct. Splitting into six individual routes (mirroring the crops pattern) would let each one rank on its own search terms instead of competing for one URL. Not urgent — flag it, don't block the papers work on it.

---

## Part 2 — Build the Knowledge Papers section

This is new. There's no `/papers` route yet. The pattern below mirrors `crops.ts` / `crops/[slug]` deliberately, since that's the proven content model already in this codebase.

### 2.1 Content model — `src/lib/content/papers.ts`

```ts
export interface Paper {
  slug: string;                 // e.g. "the-evolution-of-seed-placement"
  title: string;
  subtitle?: string;
  datePublished: string;        // ISO date, e.g. "2026-07-24"
  author: string;                // "PQNK Team" or a named author
  readingTime?: string;          // "18 min read" — optional, nice to have
  topics: string[];              // ["Machinery", "No-Till", "Soil Biology"] — used for tag chips + internal links
  summary: string;               // 1–2 sentence teaser for the /papers index cards
  abstract: string;              // 150–300 words, plain text — this is the single most important
                                  // field for SEO: it's real, unique HTML text Google can index,
                                  // as opposed to a PDF link with no on-page context.
  keyTakeaways?: string[];       // 3–6 bullet points, optional but strengthens the page
  pdfFile: string;               // "/papers/the-evolution-of-seed-placement.pdf" — lives in public/papers/
  relatedCropSlugs?: string[];   // e.g. ["wheat"] — powers internal links from crop pages back to relevant papers
}

export const papers: Paper[] = [
  {
    slug: "the-evolution-of-seed-placement",
    title: "The Evolution of Seed Placement",
    subtitle: "Why the Seed Opener Determines the Future of Agriculture",
    datePublished: "2026-07-24",
    author: "PQNK Team",
    readingTime: "20 min read",
    topics: ["Machinery", "No-Till", "SIPP & VIPP"],
    summary:
      "Twelve thousand years of planting technology solved the seed meter and never touched the seed opener. This paper explains why that changes with SIPP and VIPP.",
    abstract:
      "Every planter is really two machines: a seed meter, which decides which seed goes into the ground and when, and a seed opener, which decides how the soil is disturbed to receive it. Agricultural engineering spent two centuries refining the meter — plate cells, vacuum drums, finger pick-ups — until singulation became a solved problem. The opener received almost none of that attention. From the sharpened planting stick through the hoe, the plough, and the shoe, hoe, disc and tine openers fitted to mechanical drills, every method shared one strategy: disturb a continuous channel the full length of the row, then drop seed into it. This paper introduces Disturbed Soil Volume as the engineering parameter that measures the cost of that strategy, traces the twelve-thousand-year history of seed openers, and explains how PQNK's SIPP and VIPP no-till planters — the second replacing a continuous slit with a single vertical insertion per seed — bring planting geometry back into line with how nature itself places a seed.",
    keyTakeaways: [
      "Seed metering is a solved engineering problem; the seed opener is not.",
      "\"Disturbed soil volume\" is a real, measurable engineering parameter — and one almost no conventional planter designer has optimised for.",
      "Nature never plants in a continuous slit: every wild seed germinates as an individual point-event, with the surrounding soil left undisturbed.",
      "VIPP's cone-shaped insertion — under ½\" wide at the base, 1\" at the top, 1.5\" deep — is engineered around that same principle.",
    ],
    pdfFile: "/papers/the-evolution-of-seed-placement.pdf",
    relatedCropSlugs: ["wheat", "cotton", "rice"],
  },
  // Add each new paper as one more object here.
];

export function getPaperBySlug(slug: string): Paper | undefined {
  return papers.find((p) => p.slug === slug);
}

export function getPapersByTopic(topic: string): Paper[] {
  return papers.filter((p) => p.topics.includes(topic));
}
```

Note the `abstract` field is doing real work here — it's not decorative. A page that's just a title and a "Download PDF" button is thin content and won't rank. A page with a genuine 150–300 word abstract in real HTML, plus 3–6 key takeaways, gives Google (and any human who lands there before deciding to download) something substantial to index and read. This abstract can be pulled from the paper's own opening paragraphs — every PQNK Knowledge Paper already opens with exactly this kind of framing paragraph, so it's usually a five-minute copy-and-trim job, not new writing.

### 2.2 Where PDFs live

`public/papers/<slug>.pdf` — same static-asset convention as `public/images/`. Referenced directly from `pdfFile` above; Next's static export copies `public/` as-is, so `https://pedaver.com/papers/<slug>.pdf` works with no extra config.

### 2.3 Index page — `src/app/papers/page.tsx`

Mirrors `src/app/crops/page.tsx` structure exactly:

```tsx
import Link from "next/link";
import { papers } from "@/lib/content/papers";
import Section from "@/components/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Knowledge Papers — PQNK Research & Engineering | Pedaver",
  description:
    "PQNK Knowledge Papers: the research, engineering and field science behind Pedaver's regenerative farming system, published on a regular basis.",
  openGraph: {
    title: "Knowledge Papers — PQNK Research & Engineering | Pedaver",
    description:
      "PQNK Knowledge Papers: the research, engineering and field science behind Pedaver's regenerative farming system, published on a regular basis.",
    url: "https://pedaver.com/papers",
    siteName: "Pedaver",
    type: "website",
  },
};

export default function PapersPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">Knowledge Papers</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
            The research, engineering and field science behind PQNK, published as it's finished.
          </p>
        </div>
      </section>

      <Section>
        <div className="mt-2 grid gap-6 sm:grid-cols-2">
          {papers
            .slice()
            .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
            .map((paper) => (
              <Link
                key={paper.slug}
                href={`/papers/${paper.slug}`}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {new Date(paper.datePublished).toLocaleDateString("en-US", {
                    year: "numeric", month: "long",
                  })}
                </p>
                <h2 className="mt-2 text-xl font-bold text-primary-dark group-hover:text-primary">
                  {paper.title}
                </h2>
                {paper.subtitle && <p className="mt-1 text-sm italic text-ink-soft">{paper.subtitle}</p>}
                <p className="mt-3 text-sm text-ink-soft">{paper.summary}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent">Read paper →</span>
              </Link>
            ))}
        </div>
      </Section>
    </div>
  );
}
```

### 2.4 Detail page — `src/app/papers/[slug]/page.tsx`

```tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { papers, getPaperBySlug } from "@/lib/content/papers";
import { crops } from "@/lib/content/crops";
import Section from "@/components/Section";

export async function generateStaticParams() {
  return papers.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) return {};
  const title = `${paper.title} | PQNK Knowledge Paper | Pedaver`;
  return {
    title,
    description: paper.summary,
    openGraph: {
      title,
      description: paper.summary,
      url: `https://pedaver.com/papers/${slug}`,
      siteName: "Pedaver",
      type: "article",
      publishedTime: paper.datePublished,
    },
    twitter: { card: "summary_large_image", title, description: paper.summary },
  };
}

export default async function PaperDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) notFound();

  const relatedCrops = crops.filter((c) => paper.relatedCropSlugs?.includes(c.slug));

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline: paper.title,
            description: paper.summary,
            datePublished: paper.datePublished,
            author: { "@type": "Organization", name: paper.author },
            publisher: { "@type": "Organization", name: "Pedaver" },
            url: `https://pedaver.com/papers/${slug}`,
          }),
        }}
      />

      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
          <Link href="/papers" className="text-sm font-semibold text-primary underline underline-offset-4">
            ← All Knowledge Papers
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
            {new Date(paper.datePublished).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            {paper.readingTime ? ` · ${paper.readingTime}` : ""}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold text-primary-dark">{paper.title}</h1>
          {paper.subtitle && <p className="mt-3 text-lg italic text-ink-soft">{paper.subtitle}</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            {paper.topics.map((t) => (
              <span key={t} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {t}
              </span>
            ))}
          </div>
          <a
            href={paper.pdfFile}
            className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-cream hover:bg-primary-dark"
            download
          >
            Download Full Paper (PDF)
          </a>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-bold text-primary-dark">Abstract</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">{paper.abstract}</p>

          {paper.keyTakeaways && paper.keyTakeaways.length > 0 && (
            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Key Takeaways</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {paper.keyTakeaways.map((point, i) => (
                  <li key={i} className="flex gap-2 text-ink-soft">
                    <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {relatedCrops.length > 0 && (
            <div className="mt-10">
              <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Related Crops</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {relatedCrops.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/crops/${c.slug}`}
                    className="rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
                  >
                    {c.name} →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>
    </div>
  );
}
```

### 2.5 Why the abstract + ScholarlyArticle schema matter more than the PDF link

Google can index PDF text, but it treats a bare PDF link with no surrounding context as a weak, ambiguous signal — no clear title hierarchy, no clean meta description, no structured data, often poor mobile rendering. A proper HTML page with a real `<h1>`, a written abstract, `ScholarlyArticle` JSON-LD, and a clean meta description consistently outperforms a PDF-only listing for the same content. The PDF stays as the authoritative full-text download for anyone who wants it — the HTML page is what gets found, ranked, and shared.

### 2.6 Wire papers into the sitemap

Already shown in Part 1.3 — just confirm the `papers` import and the `.map()` over it are actually in `sitemap.ts` once this section exists.

### 2.7 Internal linking

- Add a "Knowledge Papers" link to the main site nav (`src/components/Header.tsx`) and footer.
- On each crop detail page, if `paper.relatedCropSlugs` includes that crop, show a small "Related Reading" card linking to the paper (mirror of the reverse link already built into the paper page above).
- Consider one paragraph on `/resources` or `/about` pointing to `/papers` as the deeper research trail — internal links from already-indexed, already-trusted pages are one of the fastest ways to get a brand-new page crawled.

---

## Part 3 — The regular publishing workflow

Because this site has no CMS or backend, "publish a new paper" is a repo change, not a content-management-system action. Once Part 2 is built, the recurring steps are:

1. **Get the paper into two forms:** the finished PDF (already produced as part of the normal Knowledge Paper workflow), and a trimmed **abstract** (150–300 words) plus 3–6 **key takeaways** — usually just the paper's own opening framing paragraph(s), lightly cut for a web reader.
2. **Add the PDF** to `public/papers/<slug>.pdf`.
3. **Add one object** to the `papers` array in `src/lib/content/papers.ts` — slug, title, date, author, topics, summary, abstract, key takeaways, `pdfFile` path, and `relatedCropSlugs` if relevant.
4. **Build locally to catch errors:** `npm run build`.
5. **Commit and push to `main`.** The existing GitHub Action handles the rest — build, add `.htaccess`, FTP-deploy to cPanel. No manual zip/upload step needed once this is wired up.
6. **After it's live**, submit the new URL in Google Search Console (`URL Inspection` → `Request Indexing`) — the one manual step outside the repo that meaningfully speeds up discovery versus waiting for the next crawl. The sitemap update itself (automatic, from Part 1.3) is what lets Google find it at all; requesting indexing just skips the queue.

This turns "publish a knowledge paper" into a five-minute, mostly-copy-paste task once the section exists — no redesign, no redeploy process to relearn each time.

---

## Part 4 — One-time setup outside the repo

Not code, but worth doing once the above ships, since none of it matters if Google doesn't know the domain exists yet:

- **Google Search Console:** verify `pedaver.com` (DNS TXT record or HTML file method), submit `https://pedaver.com/sitemap.xml`.
- **Bing Webmaster Tools:** same — Bing can often import directly from a verified Search Console property, which is the fastest path.
- Both are free and take about ten minutes combined; check whether either has already been done before starting, since duplicate verification attempts are harmless but unnecessary.

---

## Suggested order of work for Claude Code

1. Part 1.1–1.3 (per-page metadata, robots.txt, sitemap.xml) — fixes the current duplicate-title problem site-wide, immediately.
2. Part 2 (papers content model + two routes) — unblocks publishing.
3. Publish the first 1–2 real papers through the Part 3 workflow to confirm the whole pipeline works end to end, including the GitHub Action deploy.
4. Part 1.4–1.5 (structured data, alt text, `/resources` split) — valuable polish, not blocking.
5. Part 4 (Search Console / Bing) — do this as soon as Part 1 ships; no reason to wait for papers.

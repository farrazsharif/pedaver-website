import Link from "next/link";
import dict from "@/lib/dictionaries";
import { papers } from "@/lib/content/papers";
import Section from "@/components/Section";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import PapersBrowser from "./PapersBrowser";

export const metadata = buildMetadata({
  title: "Knowledge Papers — The Research Behind PQNK",
  description:
    "In-depth research papers behind PQNK: the science, the engineering, and the field evidence, published regularly as our work develops.",
  path: "/papers",
});

export default function PapersPage() {
  const sortedPapers = [...papers].sort((a, b) => a.title.localeCompare(b.title));

  // Mirrors the numbered list already rendered below — a structured
  // inventory of the same real entries, not a separate claim.
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Knowledge Papers — The Research Behind PQNK",
    url: `${SITE_URL}/papers`,
    isPartOf: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: sortedPapers.length,
      itemListElement: sortedPapers.map((paper, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/papers/${paper.slug}`,
        name: paper.title,
      })),
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.papers.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.papers.pageSubtitle}</p>
        </div>
      </section>

      <Section muted>
        <h2 className="text-center text-xl font-bold text-primary-dark">What do you need to know?</h2>
        <p className="mx-auto mt-1 max-w-2xl text-center text-sm text-ink-soft">
          Search in your own words, or browse by crop, problem, PQNK Science, or field practice.
        </p>
        <div className="mt-6">
          <PapersBrowser papers={papers} />
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary-dark">{dict.papers.tocTitle}</h2>
          <p className="mt-1 text-sm text-ink-soft">{dict.papers.tocSubtitle}</p>
          <ol className="mt-5 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
            {sortedPapers.map((paper, idx) => (
              <li key={paper.slug} className="mb-2 break-inside-avoid text-sm leading-snug">
                <Link href={`/papers/${paper.slug}`} className="text-ink-soft hover:text-accent">
                  <span className="text-ink-soft/60">{idx + 1}.</span> {paper.title}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </div>
  );
}

import Link from "next/link";
import { fieldEvidence, formatFeNumber } from "@/lib/content/fieldEvidence";
import Section from "@/components/Section";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import FieldEvidenceBrowser from "./FieldEvidenceBrowser";

export const metadata = buildMetadata({
  title: "Field Evidence Library — What PQNK Farms Actually Show",
  description:
    "Farmer testimony, field observations, and documented results from real PQNK production — searchable by farmer, crop, location, or evidence number.",
  path: "/field-evidence",
});

export default function FieldEvidencePage() {
  const sortedByTitle = [...fieldEvidence].sort((a, b) => a.title.localeCompare(b.title));

  // Mirrors the ItemList JSON-LD already used on /papers — a structured
  // inventory of the same real entries, not a separate claim. Deliberately
  // CollectionPage/ItemList, not Review or a study/dataset schema: this
  // page indexes testimony and observation, not verified research findings.
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Field Evidence Library",
    url: `${SITE_URL}/field-evidence`,
    isPartOf: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: sortedByTitle.length,
      itemListElement: sortedByTitle.map((fe, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/field-evidence/${fe.slug}`,
        name: fe.title,
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
          <h1 className="text-4xl font-extrabold text-primary-dark">Field Evidence Library</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
            What PQNK farms actually show — farmer testimony, field observations, and documented
            results, organized the same way our Knowledge Papers are.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-ink-soft">
            Knowledge Papers explain the science. Field Evidence documents what happened in the
            field. <Link href="/papers" className="font-semibold text-primary underline underline-offset-4">See the Knowledge Papers →</Link>
          </p>
        </div>
      </section>

      <Section muted>
        <h2 className="text-center text-xl font-bold text-primary-dark">Find a farmer, a crop, a place</h2>
        <p className="mx-auto mt-1 max-w-2xl text-center text-sm text-ink-soft">
          Search by FE number, farmer name, crop, location, or evidence type.
        </p>
        <div className="mt-6">
          <FieldEvidenceBrowser records={fieldEvidence} />
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h2 className="text-xl font-bold text-primary-dark">Complete A–Z Field Evidence Index</h2>
          <p className="mt-1 text-sm text-ink-soft">Every record, listed alphabetically.</p>
          <ol className="mt-5 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
            {sortedByTitle.map((fe) => (
              <li key={fe.slug} className="mb-2 break-inside-avoid text-sm leading-snug">
                <Link href={`/field-evidence/${fe.slug}`} className="text-ink-soft hover:text-accent">
                  <span className="text-ink-soft/60">{formatFeNumber(fe.feNumber)}</span> · {fe.title}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </div>
  );
}

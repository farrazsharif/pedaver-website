import Link from "next/link";
import dict from "@/lib/dictionaries";
import { papers } from "@/lib/content/papers";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Knowledge Papers — The Research Behind PQNK",
  description:
    "In-depth research papers behind PQNK: the science, the engineering, and the field evidence, published regularly as our work develops.",
  path: "/papers",
});

export default function PapersPage() {
  const sortedPapers = [...papers].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.papers.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.papers.pageSubtitle}</p>
        </div>
      </section>

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

      <Section muted>
        <div className="grid gap-6 md:grid-cols-2">
          {papers.map((paper) => (
            <Link
              key={paper.slug}
              href={`/papers/${paper.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {paper.heroImage && (
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={paper.heroImage}
                    alt={paper.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">
                  {dict.papers.publishedLabel} {new Date(paper.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
                </p>
                <h2 className="mt-2 text-xl font-bold text-primary-dark group-hover:text-primary">{paper.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{paper.summary}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent">{dict.papers.readAbstract} →</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

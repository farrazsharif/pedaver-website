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
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.papers.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.papers.pageSubtitle}</p>
        </div>
      </section>

      <Section>
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
                    alt=""
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

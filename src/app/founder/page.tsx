import Link from "next/link";
import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import FounderGallery from "@/components/FounderGallery";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Asif Sharif — Founder Chairman of Pedaver and Architect of PQNK",
  description:
    "Meet Asif Sharif, the engineer behind PQNK — designer of the VIPP and SIPP no-till planters and the raised-bed system driving Pedaver's regenerative farms.",
  path: "/founder",
  image: "https://pedaver.com/images/asif-sharif.png",
});

export default function FounderPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[220px_1fr]">
          <div className="mx-auto h-48 w-48 overflow-hidden rounded-full border-4 border-cream shadow-sm lg:mx-0">
            <img
              src="/images/asif-sharif.png"
              alt="Asif Sharif, Founder Chairman of Pedaver"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold text-primary-dark">{dict.founder.pageTitle}</h1>
            <p className="mt-2 text-lg font-medium text-accent">{dict.founder.pageSubtitle}</p>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft lg:mx-0">
              {dict.founder.intro}
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {dict.founder.sections.map((section, i) => (
            <div key={section.title}>
              <h2 className="text-2xl font-bold text-primary-dark">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{section.body}</p>
              {i === 0 && (
                <div className="mt-6 flex flex-col items-start gap-3 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-primary-dark">{dict.founder.recordTitle}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{dict.founder.recordBody}</p>
                  </div>
                  <Link
                    href="/papers/five-decades-of-agricultural-innovation"
                    className="inline-block flex-shrink-0 rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
                  >
                    {dict.founder.recordButton}
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark">Five Decades in Photos</h2>
          <p className="mx-auto mt-2 max-w-2xl text-ink-soft">
            From the first sugarcane harvester in 1977 to PQNK reaching national policy forums and international
            research institutions.
          </p>
        </div>
        <div className="mt-8">
          <FounderGallery />
        </div>
      </Section>

      <Section muted>
        <blockquote className="mx-auto max-w-2xl border-l-4 border-accent pl-6 text-xl italic leading-relaxed text-ink">
          {dict.founder.closingQuote}
        </blockquote>
      </Section>
    </div>
  );
}

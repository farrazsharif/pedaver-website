import Link from "next/link";
import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import FounderGallery from "@/components/FounderGallery";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Asif Sharif — Founder Chairman of Pedaver and Architect of PQNK",
  description:
    "Meet Asif Sharif, agricultural researcher, production-system designer and founder of PQNK — Founder Chairman of Pedaver, and designer of the VIPP and SIPP no-till planters.",
  path: "/founder",
  image: "https://pedaver.com/images/asif-sharif.png",
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/founder#person`,
  name: "Asif Sharif",
  url: `${SITE_URL}/founder`,
  image: `${SITE_URL}/images/asif-sharif.png`,
  jobTitle: "Founder Chairman of Pedaver",
  description:
    "Agricultural researcher, production-system designer and machinery innovator; founder of PQNK and Founder Chairman of Pedaver.",
  worksFor: { "@id": `${SITE_URL}/#organization` },
  sameAs: ["https://www.youtube.com/@aasifsharif"],
};

interface InlineLinkTerm {
  match: string;
  href: string;
}

/** Splits `text` on the given terms and wraps each matched term in a <Link>, leaving the rest as plain text. */
function withInlineLinks(text: string, terms: InlineLinkTerm[]) {
  if (terms.length === 0) return text;
  const pattern = new RegExp(`(${terms.map((t) => t.match.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return text.split(pattern).map((part, i) => {
    const term = terms.find((t) => t.match === part);
    if (!term) return part;
    return (
      <Link
        key={i}
        href={term.href}
        className="font-semibold text-primary underline underline-offset-4 hover:text-primary-dark"
      >
        {part}
      </Link>
    );
  });
}

const INTRO_LINKS: InlineLinkTerm[] = [
  { match: "founder of PQNK", href: "/" },
  { match: "Pedaver", href: "/about" },
];

const SECTION_LINKS: Record<number, InlineLinkTerm[]> = {
  1: [
    { match: "raised bed shapers", href: "/machines#raised-bed-shaper" },
    { match: "VIPP", href: "/machines#vipp-planter" },
    { match: "SIPP", href: "/machines#sipp-planter" },
  ],
  2: [
    { match: "permanent raised beds", href: "/resources#permanent-raised-beds" },
    { match: "thick organic mulch layer", href: "/resources#mulch-and-no-till" },
    {
      match: "reductions in water use of over 70%",
      href: "/papers/the-wholesale-four-step-system-to-end-water-scarcity",
    },
  ],
};

export default function FounderPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />

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
              {withInlineLinks(dict.founder.intro, INTRO_LINKS)}
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {dict.founder.sections.map((section, i) => (
            <div key={section.title}>
              <h2 className="text-2xl font-bold text-primary-dark">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">
                {withInlineLinks(section.body, SECTION_LINKS[i] ?? [])}
              </p>
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

      <Section id="explore-the-work">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary-dark">{dict.founder.closingPathwayTitle}</h2>
          <p className="mt-4 text-ink-soft">{dict.founder.closingPathwayBody}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {dict.founder.closingPathwayLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between rounded-2xl border border-border bg-card px-6 py-4 font-semibold text-primary-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {link.label}
              <span className="text-accent transition group-hover:translate-x-0.5">→</span>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

import Link from "next/link";
import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const pageDescription =
  "Pedaver is the independent knowledge, research and validation institution behind PQNK, the natural ecosystem science of production agriculture, field-tested across Pakistan and built to apply across soils, climates, crops and scales.";

export const metadata = buildMetadata({
  title: "About Pedaver — The Institution Behind PQNK",
  description: pageDescription,
  path: "/about",
});

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: dict.about.pageTitle,
  url: `${SITE_URL}/about`,
  description: pageDescription,
  about: { "@id": `${SITE_URL}/#organization` },
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

const INTRO_LINKS: InlineLinkTerm[] = [{ match: "Food, Feed, Fiber and Timber production", href: "/crops" }];

const INSTITUTIONAL_NOTE_LINKS: InlineLinkTerm[] = [{ match: "Pedaver's services", href: "/services" }];

const FOUNDER_LINKS: InlineLinkTerm[] = [
  { match: "soil moisture management", href: "/resources#moisture-based-irrigation" },
  { match: "the machinery", href: "/machines" },
];

const PHILOSOPHY_LINKS: InlineLinkTerm[] = [
  { match: "soil moisture management", href: "/resources#moisture-based-irrigation" },
  { match: "hardpan-breaking", href: "/resources#breaking-the-hardpan" },
  { match: "raised beds", href: "/resources#permanent-raised-beds" },
  { match: "mulch-built soil biology", href: "/resources#mulch-and-no-till" },
  { match: "SIPP", href: "/machines/sipp-planter" },
  { match: "VIPP", href: "/machines/vipp-planter" },
  { match: "Our knowledge papers", href: "/papers" },
];

export default function AboutPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }} />

      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.about.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">
            {withInlineLinks(dict.about.intro, INTRO_LINKS)}
          </p>
        </div>
      </section>

      <Section>
        <h2 className="text-center text-3xl font-bold text-primary-dark">{dict.about.missionTitle}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dict.about.missionPoints.map((point) => (
            <div key={point.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-primary">{point.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{point.body}</p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-ink-soft">
          {withInlineLinks(dict.about.institutionalNote, INSTITUTIONAL_NOTE_LINKS)}
        </p>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-primary-dark">{dict.about.founderTitle}</h2>
          <p className="mt-2 text-xl font-semibold text-accent">{dict.about.founderName}</p>
          <div className="mt-6 flex flex-col gap-4 text-ink-soft">
            {dict.about.founderBody.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">
                {withInlineLinks(paragraph, FOUNDER_LINKS)}
              </p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-border pt-6">
            <p className="text-sm text-ink-soft">{dict.about.founderCtaBody}</p>
            <div className="flex flex-shrink-0 gap-3">
              <Link href="/founder" className="text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-dark">
                {dict.about.founderCtaFounderLink} →
              </Link>
              <Link
                href="/papers/five-decades-of-agricultural-innovation"
                className="text-sm font-semibold text-primary underline underline-offset-4 hover:text-primary-dark"
              >
                {dict.about.founderCtaRecordLink} →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark">{dict.about.philosophyTitle}</h2>
          <div className="mt-6 flex flex-col gap-4 text-ink-soft">
            {dict.about.philosophyBody.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">
                {withInlineLinks(paragraph, PHILOSOPHY_LINKS)}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section muted id="knowledge-system">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary-dark">{dict.about.closingTitle}</h2>
          <p className="mt-4 text-ink-soft">{dict.about.closingBody}</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
          {dict.about.closingLinks.map((link) => (
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

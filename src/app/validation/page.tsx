import Link from "next/link";
import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  validationInfographic,
  validationPageTitle,
  validationPageSubtitle,
  validationExecutiveSummary,
  validationSections,
} from "@/lib/content/validationSystem";

const PAGE_TITLE = "PQNK™ Validation — Validating Biological Excellence";
const PAGE_DESCRIPTION =
  "PQNK™ Validation is a comprehensive framework for biological, environmental, and economic performance, organised around four pillars: System, Food Value, Environmental, and Economic Validation — including laboratory-confirmed freedom from agrochemical residues.";

export const metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/validation",
});

const validationPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: `${SITE_URL}/validation`,
  author: { "@id": `${SITE_URL}/founder#person` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  about: { "@id": `${SITE_URL}/#pqnk` },
};

export default function ValidationPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(validationPageJsonLd) }}
      />
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{validationPageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{validationPageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={validationInfographic}
            alt="PQNK™ Validation — a comprehensive framework for biological, environmental, and economic performance, organised around four pillars"
            className="w-full"
          />
        </div>
      </Section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {validationExecutiveSummary.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {validationSections.map((section, sIdx) => (
            <div key={sIdx}>
              {section.heading && (
                <h2 className="text-2xl font-bold text-primary-dark">{section.heading}</h2>
              )}
              <div className={`flex flex-col gap-4 ${section.heading ? "mt-3" : ""}`}>
                {section.blocks.map((block, bIdx) => {
                  if (block.type === "paragraph") {
                    return (
                      <p key={bIdx} className="leading-relaxed text-ink-soft">
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "quote") {
                    return (
                      <p
                        key={bIdx}
                        className="border-s-4 border-accent bg-card py-2 ps-4 text-lg font-medium italic text-primary-dark"
                      >
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "bullets") {
                    return (
                      <ul key={bIdx} className="flex flex-col gap-2">
                        {block.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex gap-2 text-ink-soft">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.type === "subsection") {
                    return (
                      <div key={bIdx}>
                        <h3 className="text-xl font-bold text-primary-dark">{block.heading}</h3>
                        <ul className="mt-2 flex flex-col gap-2">
                          {block.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex gap-2 text-ink-soft">
                              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                  if (block.type === "steps") {
                    return (
                      <ol key={bIdx} className="flex flex-col gap-3">
                        {block.items.map((step, iIdx) => (
                          <li key={iIdx} className="rounded-xl border border-border bg-card p-4">
                            <p className="font-semibold text-primary-dark">{step.title}</p>
                            <p className="mt-1 leading-relaxed text-ink-soft">{step.body}</p>
                          </li>
                        ))}
                      </ol>
                    );
                  }
                  // quad
                  return (
                    <div key={bIdx} className="grid gap-4 sm:grid-cols-2">
                      {block.items.map((item, iIdx) => (
                        <div key={iIdx} className="rounded-xl border border-border bg-card p-4">
                          <p className="font-semibold text-primary-dark">{item.title}</p>
                          <p className="mt-1 leading-relaxed text-ink-soft">{item.body}</p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-primary-dark">{dict.validation.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-soft">{dict.validation.ctaBody}</p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-cream shadow transition hover:bg-primary-dark"
          >
            {dict.validation.cta}
          </Link>
        </div>
      </Section>
    </div>
  );
}

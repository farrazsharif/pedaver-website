import Link from "next/link";
import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";
import { nvPageSubtitle, nvSections } from "@/lib/content/nutritionValidation";

export const metadata = buildMetadata({
  title: "PQNK™ Validation — Verify Genuine Practice & Food Value",
  description:
    "PQNK Validation confirms a farm is genuinely following PQNK practice, and the Nutrition Density & Food Value Validation Framework measures the biological quality of the food it produces.",
  path: "/validation",
});

export default function ValidationPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.validation.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.validation.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {dict.validation.sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-primary-dark">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{section.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-cream shadow transition hover:bg-primary-dark"
          >
            {dict.validation.cta}
          </Link>
        </div>
      </Section>

      <Section muted id="nutrition-validation" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-primary-dark">{dict.validation.nutritionHeading}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg font-medium text-ink-soft">{nvPageSubtitle}</p>
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-10">
          {nvSections.map((section, sIdx) => (
            <div key={sIdx}>
              {section.heading && (
                <h3 className="text-xl font-bold text-primary-dark">{section.heading}</h3>
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
                        className="border-s-4 border-accent bg-primary-light/10 py-2 ps-4 text-lg font-medium italic text-primary-dark"
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
                  // subsection
                  return (
                    <div key={bIdx}>
                      <h4 className="text-base font-semibold uppercase tracking-wide text-primary-dark">
                        {block.heading}
                      </h4>
                      {block.items.length > 0 && (
                        <ul className="mt-2 flex flex-col gap-2">
                          {block.items.map((item, iIdx) => (
                            <li key={iIdx} className="flex gap-2 text-ink-soft">
                              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
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
          <h2 className="text-xl font-bold text-primary-dark">{dict.validation.nutritionCtaTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-soft">{dict.validation.nutritionCtaBody}</p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-cream shadow transition hover:bg-primary-dark"
          >
            {dict.validation.nutritionCta}
          </Link>
        </div>
      </Section>
    </div>
  );
}

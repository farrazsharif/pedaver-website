import Link from "next/link";
import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";
import { nvPageTitle, nvPageSubtitle, nvSections } from "@/lib/content/nutritionValidation";

export const metadata = buildMetadata({
  title: "Nutrition Density & Food Value Validation — PQNK Food Quality",
  description:
    "Moving beyond process certification to food quality validation: how Pedaver is developing the PQNK Nutrition Density & Food Value Validation Framework.",
  path: "/nutrition-validation",
});

export default function NutritionValidationPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{nvPageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{nvPageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {nvSections.map((section, sIdx) => (
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
                      <h3 className="text-base font-semibold uppercase tracking-wide text-primary-dark">
                        {block.heading}
                      </h3>
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

      <Section muted>
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-primary-dark">{dict.nutritionValidation.ctaTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-soft">{dict.nutritionValidation.ctaBody}</p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-cream shadow transition hover:bg-primary-dark"
          >
            {dict.nutritionValidation.cta}
          </Link>
        </div>
      </Section>
    </div>
  );
}

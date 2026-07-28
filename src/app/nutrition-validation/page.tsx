import Link from "next/link";
import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Nutrition Density & Food Value Validation — PQNK Food Quality",
  description:
    "How Pedaver validates the nutritional density and food value of PQNK-grown produce. Full detail coming soon.",
  path: "/nutrition-validation",
});

export default function NutritionValidationPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.nutritionValidation.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.nutritionValidation.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-primary-dark">{dict.nutritionValidation.comingSoonTitle}</h2>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-ink-soft">
            {dict.nutritionValidation.comingSoonBody}
          </p>
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

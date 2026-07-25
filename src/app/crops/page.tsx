import Link from "next/link";
import dict from "@/lib/dictionaries";
import { flagshipCrops, otherCrops } from "@/lib/content/crops";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crops & Solutions — PQNK Field Guides by Crop",
  description:
    "PQNK field-tested across 20+ crops, from wheat and cotton to bamboo and black carrot. Browse real results, crop by crop.",
  path: "/crops",
});

export default function CropsPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.crops.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.crops.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <h2 className="text-2xl font-bold text-primary-dark">{dict.crops.flagshipLabel}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flagshipCrops.map((crop) => (
            <Link
              key={crop.slug}
              href={`/crops/${crop.slug}`}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h3 className="text-xl font-bold text-primary-dark group-hover:text-primary">{crop.name}</h3>
              <p className="mt-2 text-sm text-ink-soft">{crop.blurb}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">{dict.crops.viewGuide} →</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section muted>
        <h2 className="text-2xl font-bold text-primary-dark">{dict.crops.moreLabel}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherCrops.map((crop) => (
            <Link
              key={crop.slug}
              href={`/crops/${crop.slug}`}
              className="rounded-xl border border-border bg-cream p-5 transition hover:border-primary/40 hover:shadow-sm"
            >
              <h3 className="font-bold text-primary-dark">{crop.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{crop.blurb}</p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

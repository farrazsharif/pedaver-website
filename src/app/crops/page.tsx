import Link from "next/link";
import dict from "@/lib/dictionaries";
import { flagshipCrops, otherCrops } from "@/lib/content/crops";
import { cropImages } from "@/lib/content/cropImages";
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
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark">{dict.crops.introTitle}</h2>
          <p className="mt-3 leading-relaxed text-ink-soft">
            {dict.crops.introBody.split(dict.crops.introPrinciplesLink)[0]}
            <Link href="/#four-principles" className="font-semibold text-primary underline underline-offset-4 hover:text-primary-dark">
              {dict.crops.introPrinciplesLink}
            </Link>
            {dict.crops.introBody.split(dict.crops.introPrinciplesLink)[1]}
          </p>
        </div>
      </Section>

      <Section muted>
        <h2 className="text-2xl font-bold text-primary-dark">{dict.crops.flagshipLabel}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flagshipCrops.map((crop) => (
            <Link
              key={crop.slug}
              href={`/crops/${crop.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={cropImages[crop.slug]}
                  alt={crop.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">{crop.category}</span>
                <h3 className="mt-1 text-xl font-bold text-primary-dark group-hover:text-primary">{crop.name}</h3>
                <p className="mt-2 text-sm text-ink-soft">{crop.blurb}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent">{dict.crops.viewGuide} →</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl font-bold text-primary-dark">{dict.crops.moreLabel}</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherCrops.map((crop) => (
            <Link
              key={crop.slug}
              href={`/crops/${crop.slug}`}
              className="rounded-xl border border-border bg-cream p-5 transition hover:border-primary/40 hover:shadow-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">{crop.category}</span>
              <h3 className="mt-1 font-bold text-primary-dark">{crop.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{crop.blurb}</p>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

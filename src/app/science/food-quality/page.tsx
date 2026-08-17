import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  hero,
  openingChain,
  yieldVsQuality,
  multidimensional,
  soilToComposition,
  photosynthesisFood,
  balancedVsForced,
  reproductiveDevelopment,
  riceExample,
  tasteAroma,
  colourShine,
  weightDensity,
  shelfLife,
  residues,
  aflatoxin,
  densityVsDiversity,
  maturity,
  foodQualityChain,
  validationLevels,
  compareLikeWithLike,
  evidenceHierarchy,
  habitatPrinciples,
  principlesGuardrail,
  finalProposition,
} from "@/lib/content/scienceFoodQuality";

export const metadata: Metadata = buildMetadata({
  title: "PQNK Food Quality Science — From Living Soil to the Food We Eat | Pedaver",
  description:
    "Why food quality is the measurable biological outcome of how a plant was grown, not an automatic consequence of yield, appearance or a production label: nutrient density vs. diversity, taste, shelf life, residue status and the path from field observation to laboratory validation.",
  path: "/science/food-quality",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: hero.title,
  description:
    "Why food quality is the measurable biological outcome of how a plant was grown, not an automatic consequence of yield, appearance or a production label: nutrient density vs. diversity, taste, shelf life, residue status and the path from field observation to laboratory validation.",
  url: `${SITE_URL}/science/food-quality`,
  author: { "@id": `${SITE_URL}/founder#person` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

function FlowSequence({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-center text-sm font-medium text-primary-dark">
      {steps.map((step, i) => (
        <span key={`${step}-${i}`} className="flex items-center gap-2">
          <span className="rounded-full border border-border bg-card px-3 py-1.5">{step}</span>
          {i < steps.length - 1 && <span aria-hidden="true">→</span>}
        </span>
      ))}
    </div>
  );
}

function VerticalChain({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-col items-stretch gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center">
          <div className="w-full max-w-md rounded-lg border border-border bg-card px-5 py-3 text-center text-sm font-semibold text-primary-dark">
            {step}
          </div>
          {i < steps.length - 1 && (
            <svg width="16" height="20" viewBox="0 0 16 20" className="my-1 text-ink-soft/50" aria-hidden="true">
              <path d="M8 0 L8 14 M2 9 L8 15 L14 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ScienceFoodQualityPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <Link href="/science" className="text-sm font-semibold text-primary underline underline-offset-4">
            ← PQNK Science
          </Link>
          <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-accent">{hero.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-extrabold text-primary-dark sm:text-4xl">{hero.title}</h1>
          <p className="mt-2 text-lg font-medium italic text-ink-soft">{hero.subtitle}</p>
          <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-4 text-start text-lg leading-relaxed text-ink-soft">
            {hero.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl rounded-xl border border-accent/30 bg-accent/5 p-5 text-lg font-medium text-primary-dark">
            {hero.callout}
          </p>
          <div className="mt-10">
            <VerticalChain steps={openingChain} />
          </div>
        </div>
      </section>

      {/* YIELD VS QUALITY */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{yieldVsQuality.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{yieldVsQuality.yield.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{yieldVsQuality.yield.body}</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="font-bold text-primary-dark">{yieldVsQuality.quality.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{yieldVsQuality.quality.body}</p>
            </div>
          </div>
          <ul className="mt-6 flex flex-col gap-1">
            {yieldVsQuality.guardrails.map((g) => (
              <li key={g} className="text-sm text-ink-soft">
                {g}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-lg font-bold text-primary-dark">{yieldVsQuality.statement}</p>
        </div>
      </Section>

      {/* MULTIDIMENSIONAL */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{multidimensional.title}</h2>
          <p className="mt-4 text-ink-soft">{multidimensional.intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {multidimensional.dimensions.map((d) => (
              <div key={d.name} className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary-dark">{d.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SOIL TO COMPOSITION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{soilToComposition.title}</h2>
          <div className="mt-8">
            <VerticalChain steps={soilToComposition.chain} />
          </div>
          <p className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5 text-sm leading-relaxed text-primary-dark">
            {soilToComposition.boundary}
          </p>
          <Link href={soilToComposition.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {soilToComposition.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* PHOTOSYNTHESIS FOOD */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{photosynthesisFood.title}</h2>
          <div className="mt-8">
            <VerticalChain steps={photosynthesisFood.chain} />
          </div>
          <p className="mt-8 leading-relaxed text-ink-soft">{photosynthesisFood.body}</p>
          <Link href={photosynthesisFood.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {photosynthesisFood.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* BALANCED VS FORCED */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{balancedVsForced.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{balancedVsForced.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{balancedVsForced.nitrogenNote}</p>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-bold text-primary-dark">
            {balancedVsForced.statement}
          </p>
          <Link href={balancedVsForced.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {balancedVsForced.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* REPRODUCTIVE DEVELOPMENT */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{reproductiveDevelopment.title}</h2>
          <div className="mt-6">
            <FlowSequence steps={reproductiveDevelopment.inputs} />
          </div>
          <div className="mt-8">
            <VerticalChain steps={reproductiveDevelopment.chain} />
          </div>
          <p className="mt-8 leading-relaxed text-ink-soft">{reproductiveDevelopment.body}</p>
        </div>
      </Section>

      {/* RICE EXAMPLE */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{riceExample.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{riceExample.intro}</p>
          <p className="mt-4 text-lg font-bold text-primary-dark">{riceExample.guardrail}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {riceExample.levels.map((l) => (
              <div key={l.name} className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary-dark">{l.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{l.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-ink-soft">{riceExample.aromaNote}</p>
          <p className="mt-2 text-sm text-ink-soft">{riceExample.noInventedNote}</p>
        </div>
      </Section>

      {/* TASTE AROMA */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{tasteAroma.title}</h2>
          <div className="mt-6">
            <FlowSequence steps={[...tasteAroma.factors, tasteAroma.resultLabel]} />
          </div>
          <p className="mt-6 leading-relaxed text-ink-soft">{tasteAroma.body}</p>
          <p className="mt-4 text-sm text-ink-soft">{tasteAroma.observationNote}</p>
          <p className="mt-4 text-center text-lg font-bold text-primary-dark">{tasteAroma.guardrail}</p>
        </div>
      </Section>

      {/* COLOUR SHINE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{colourShine.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{colourShine.body}</p>
          <p className="mt-6 text-center text-lg font-bold text-primary-dark">{colourShine.statement}</p>
          <p className="mt-4 text-center text-sm text-ink-soft">{colourShine.guardrail}</p>
        </div>
      </Section>

      {/* WEIGHT DENSITY */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{weightDensity.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{weightDensity.body}</p>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {weightDensity.statement}
          </p>
        </div>
      </Section>

      {/* SHELF LIFE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{shelfLife.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{shelfLife.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{shelfLife.fieldNote}</p>
          <div className="mt-8">
            <FlowSequence steps={shelfLife.chain} />
          </div>
          <p className="mt-6 text-center text-lg font-bold text-primary-dark">{shelfLife.guardrail}</p>
        </div>
      </Section>

      {/* RESIDUES */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{residues.title}</h2>
          <p className="mt-4 text-center text-lg font-bold text-primary-dark">{residues.statement}</p>
          <p className="mt-6 leading-relaxed text-ink-soft">{residues.bodyOne}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{residues.bodyTwo}</p>
          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">
            {residues.analyticalNote}
          </p>
          <p className="mt-4 text-sm text-ink-soft">{residues.wordingGuidance}</p>
        </div>
      </Section>

      {/* AFLATOXIN */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{aflatoxin.title}</h2>
          <p className="mt-4 text-ink-soft">{aflatoxin.body}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {aflatoxin.factors.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <ul className="mt-6 flex flex-col gap-1">
            {aflatoxin.guardrails.map((g) => (
              <li key={g} className="text-sm font-medium text-primary-dark">
                {g}
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">
            {aflatoxin.labStatement}
          </p>
          <p className="mt-4 text-center text-sm text-ink-soft">{aflatoxin.finalNote}</p>
        </div>
      </Section>

      {/* DENSITY VS DIVERSITY */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{densityVsDiversity.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{densityVsDiversity.density.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{densityVsDiversity.density.body}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{densityVsDiversity.diversity.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{densityVsDiversity.diversity.body}</p>
            </div>
          </div>
          <p className="mt-6 leading-relaxed text-ink-soft">{densityVsDiversity.body}</p>
          <p className="mt-4 text-sm text-ink-soft">{densityVsDiversity.guardrail}</p>
        </div>
      </Section>

      {/* MATURITY */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{maturity.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{maturity.body}</p>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{maturity.statement}</p>
          <p className="mt-4 text-center text-sm text-ink-soft">{maturity.guardrail}</p>
        </div>
      </Section>

      {/* FOOD QUALITY CHAIN */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{foodQualityChain.title}</h2>
          <div className="mt-10">
            <VerticalChain steps={foodQualityChain.chain} />
          </div>
          <div className="mt-8">
            <FlowSequence steps={foodQualityChain.evidenceChain} />
          </div>
        </div>
      </Section>

      {/* VALIDATION LEVELS */}
      <Section muted>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{validationLevels.title}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {validationLevels.levels.map((l) => (
              <div key={l.name} className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-bold text-primary-dark">{l.name}</p>
                <ul className="mt-3 flex flex-col gap-1">
                  {l.items.map((item) => (
                    <li key={item} className="text-sm text-ink-soft">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-lg font-medium text-primary-dark">{validationLevels.guardrail}</p>
          <div className="mt-4 text-center">
            <Link href={validationLevels.linkHref} className="text-sm font-semibold text-primary underline underline-offset-4">
              {validationLevels.linkLabel} →
            </Link>
          </div>
        </div>
      </Section>

      {/* COMPARE LIKE WITH LIKE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{compareLikeWithLike.title}</h2>
          <div className="mt-8">
            <VerticalChain steps={compareLikeWithLike.chain} />
          </div>
          <p className="mt-8 leading-relaxed text-ink-soft">{compareLikeWithLike.body}</p>
        </div>
      </Section>

      {/* EVIDENCE HIERARCHY */}
      <Section muted>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{evidenceHierarchy.title}</h2>
          <div className="mx-auto mt-6 grid max-w-2xl gap-4 text-start sm:grid-cols-3">
            {evidenceHierarchy.levels.map((l) => (
              <div key={l.name} className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">{l.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{l.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-2xl rounded-xl border border-accent/30 bg-accent/5 p-5 text-lg font-medium text-primary-dark">
            {evidenceHierarchy.statement}
          </p>
        </div>
      </Section>

      {/* FOUR PRINCIPLES */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">The Four Principles and Food Quality</h2>
          <div className="mx-auto mt-6 grid max-w-2xl gap-4 text-start sm:grid-cols-2">
            {habitatPrinciples.map((p) => (
              <div key={p.name}>
                <p className="font-bold text-primary-dark">{p.name}</p>
                <p className="text-sm text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-ink-soft">{principlesGuardrail}</p>
        </div>
      </Section>

      {/* FINAL PROPOSITION */}
      <Section muted className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <div className="absolute inset-0 bg-primary-dark" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-cream/95">{finalProposition.statement}</p>
            <div className="mt-8 flex flex-col gap-1 border-t border-cream/15 pt-6 text-cream/90">
              {finalProposition.lines.map((l) => (
                <p key={l} className="font-semibold">
                  {l}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CONTINUE THE SCIENCE */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">Continue the Science</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Link
              href="/science/soil"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Soil</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">The Living Production System</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <Link
              href="/science/plants"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Plants</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">The Biological Production Engine</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <Link
              href="/science/nutrition"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Nutrition</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">From Mineral Presence to Biological Availability</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <Link
              href="/science/crop-protection"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Crop Protection</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">Biological Regulation Instead of Routine Suppression</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <div className="flex flex-col rounded-2xl border-2 border-primary bg-primary/5 p-6 sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">Current page</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark">Food Quality</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">From Living Soil to the Food We Eat</p>
            </div>

            <Link
              href="/validation"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:col-span-2"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">PQNK Validation</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">Where Field Observation Becomes Measured Evidence</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Explore Validation →</span>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <Link href="/science" className="text-sm font-semibold text-primary underline underline-offset-4">
              ← Back to PQNK Science
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";
import ScienceApplicationNote from "@/components/science/ScienceApplicationNote";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  hero,
  landSurfaceOpening,
  soilTemperature,
  evaporationVsTranspiration,
  oceanQuestion,
  waterEnergyCycle,
  infiltrationUsableWater,
  rainfallVolume,
  waterUseObservations,
  rainDewHumidity,
  bareVsLiving,
  photosynthesisEntry,
  carbonSystem,
  forestsAgriculture,
  biodiversityClimate,
  habitatPrinciples,
  principlesConvergence,
  heatIsland,
  climateResilience,
  evidenceArchitecture,
  scienceApplication,
  climateSystemLoop,
  finalProposition,
  type ChainPair,
} from "@/lib/content/scienceClimate";

export const metadata: Metadata = buildMetadata({
  title: "PQNK Climate Science — Restoring the Climate Function of Living Land | Pedaver",
  description:
    "Why agricultural land is part of the Earth's climate-moderation system: land-surface energy partitioning, soil temperature, evaporation vs. transpiration, the water cycle as an energy cycle, and carbon capture vs. retention.",
  path: "/science/climate",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: hero.title,
  description:
    "Why agricultural land is part of the Earth's climate-moderation system: land-surface energy partitioning, soil temperature, evaporation vs. transpiration, the water cycle as an energy cycle, and carbon capture vs. retention.",
  url: `${SITE_URL}/science/climate`,
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

function ComparisonPair({ left, right }: { left: ChainPair; right: ChainPair }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div>
        <p className="text-center text-sm font-bold uppercase tracking-wide text-ink-soft/70">{left.label}</p>
        <div className="mt-4">
          <VerticalChain steps={left.chain} />
        </div>
      </div>
      <div>
        <p className="text-center text-sm font-bold uppercase tracking-wide text-accent">{right.label}</p>
        <div className="mt-4">
          <VerticalChain steps={right.chain} />
        </div>
      </div>
    </div>
  );
}

export default function ScienceClimatePage() {
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
          <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-4 text-start text-lg leading-relaxed text-ink-soft">
            {hero.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl rounded-xl border border-accent/30 bg-accent/5 p-5 text-lg font-medium text-primary-dark">
            {hero.callout}
          </p>
        </div>
      </section>

      {/* LAND SURFACE OPENING */}
      <Section muted>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{landSurfaceOpening.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{landSurfaceOpening.intro}</p>
          <div className="mt-8">
            <ComparisonPair left={landSurfaceOpening.bare} right={landSurfaceOpening.living} />
          </div>
          <p className="mt-8 text-center text-sm text-ink-soft">{landSurfaceOpening.scopeNote}</p>
        </div>
      </Section>

      {/* SOIL TEMPERATURE */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{soilTemperature.title}</h2>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {soilTemperature.observation}
          </p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {soilTemperature.reduction}
          </p>
          <p className="mt-4 text-sm text-ink-soft">{soilTemperature.labelNote}</p>

          <div className="mt-8">
            <ComparisonPair left={soilTemperature.bare} right={soilTemperature.mulched} />
          </div>

          <p className="mt-8 text-sm text-ink-soft">{soilTemperature.variabilityNote}</p>
        </div>
      </Section>

      {/* EVAPORATION VS TRANSPIRATION */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{evaporationVsTranspiration.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{evaporationVsTranspiration.intro}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{evaporationVsTranspiration.unproductive.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{evaporationVsTranspiration.unproductive.body}</p>
              <p className="mt-3 text-xs text-ink-soft">PQNK restricts this loss through:</p>
              <ul className="mt-2 flex flex-col gap-1">
                {evaporationVsTranspiration.unproductive.restrictedBy.map((r) => (
                  <li key={r} className="text-sm text-ink-soft">
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="font-bold text-primary-dark">{evaporationVsTranspiration.productive.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{evaporationVsTranspiration.productive.body}</p>
              <p className="mt-3 text-xs text-ink-soft">This supports:</p>
              <ul className="mt-2 flex flex-col gap-1">
                {evaporationVsTranspiration.productive.supports.map((s) => (
                  <li key={s} className="text-sm text-ink-soft">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 text-center text-lg font-bold text-primary-dark">{evaporationVsTranspiration.guardrail}</p>
          <Link
            href={evaporationVsTranspiration.linkHref}
            className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            {evaporationVsTranspiration.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* OCEAN QUESTION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{oceanQuestion.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{oceanQuestion.mechanism}</p>
          <div className="mt-6">
            <FlowSequence steps={oceanQuestion.chain} />
          </div>
          <p className="mt-6 leading-relaxed text-ink-soft">{oceanQuestion.possibleContribution}</p>
          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">
            {oceanQuestion.boundary}
          </p>
          <p className="mt-4 text-ink-soft">{oceanQuestion.variablesIntro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {oceanQuestion.variables.map((v) => (
              <span key={v} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {v}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* WATER ENERGY CYCLE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterEnergyCycle.title}</h2>
          <div className="mt-8">
            <VerticalChain steps={waterEnergyCycle.chain} />
          </div>
          <p className="mt-8 text-center text-lg font-medium text-primary-dark">{waterEnergyCycle.statement}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterEnergyCycle.implication}</p>
          <p className="mt-4 text-sm text-ink-soft">{waterEnergyCycle.scopeNote}</p>
        </div>
      </Section>

      {/* INFILTRATION USABLE WATER */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{infiltrationUsableWater.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{infiltrationUsableWater.intro}</p>
          <p className="mt-4 text-ink-soft">Rain may:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {infiltrationUsableWater.pathways.map((p) => (
              <span key={p} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {p}
              </span>
            ))}
          </div>
          <p className="mt-6 text-ink-soft">Under PQNK, rapid infiltration and storage are supported by:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {infiltrationUsableWater.supportFactors.map((f) => (
              <span key={f} className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{infiltrationUsableWater.statement}</p>
        </div>
      </Section>

      {/* RAINFALL VOLUME */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{rainfallVolume.title}</h2>
          <p className="mt-4 rounded-xl border border-border bg-card p-5 text-center font-medium text-primary-dark">
            {rainfallVolume.reference}
          </p>
          <p className="mt-4 rounded-xl border border-border bg-card p-5 text-center font-mono text-sm text-primary-dark">
            {rainfallVolume.formula}
          </p>
          <p className="mt-6 text-lg font-bold text-primary-dark">{rainfallVolume.guardrail}</p>
          <p className="mt-4 text-ink-soft">{rainfallVolume.bridge}</p>
        </div>
      </Section>

      {/* WATER USE OBSERVATIONS */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterUseObservations.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterUseObservations.intro}</p>

          <div className="mt-6 flex flex-col gap-2">
            {waterUseObservations.table.map((row) => (
              <div key={row.crop} className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-4 py-2">
                <span className="font-semibold text-primary-dark">{row.crop}</span>
                <span className="text-sm text-ink-soft">{row.value}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ink-soft">{waterUseObservations.riceNote}</p>
          <p className="mt-3 text-sm text-ink-soft">{waterUseObservations.noCombineNote}</p>

          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-sm leading-relaxed text-primary-dark">
            {waterUseObservations.labelNote}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterUseObservations.distinctionStatement}</p>
          <Link
            href={waterUseObservations.linkHref}
            className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            {waterUseObservations.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* RAIN DEW HUMIDITY */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{rainDewHumidity.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{rainDewHumidity.body}</p>
          <ul className="mt-4 flex flex-col gap-1">
            {rainDewHumidity.guardrails.map((g) => (
              <li key={g} className="text-sm text-ink-soft">
                {g}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{rainDewHumidity.statement}</p>
          <Link
            href={rainDewHumidity.linkHref}
            className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            {rainDewHumidity.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* BARE VS LIVING */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{bareVsLiving.title}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{bareVsLiving.bare.label}</p>
              <ul className="mt-3 flex flex-col gap-1">
                {bareVsLiving.bare.items.map((i) => (
                  <li key={i} className="text-sm text-ink-soft">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="font-bold text-primary-dark">{bareVsLiving.living.label}</p>
              <ul className="mt-3 flex flex-col gap-1">
                {bareVsLiving.living.items.map((i) => (
                  <li key={i} className="text-sm text-ink-soft">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-lg font-medium text-primary-dark">{bareVsLiving.statement}</p>
        </div>
      </Section>

      {/* PHOTOSYNTHESIS ENTRY */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{photosynthesisEntry.title}</h2>
          <div className="mt-8">
            <VerticalChain steps={photosynthesisEntry.chain} />
          </div>
          <p className="mt-8 text-ink-soft">{photosynthesisEntry.functionsIntro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {photosynthesisEntry.functions.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{photosynthesisEntry.guardrail}</p>
        </div>
      </Section>

      {/* CARBON SYSTEM */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{carbonSystem.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{carbonSystem.distinction.left.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{carbonSystem.distinction.left.body}</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="font-bold text-primary-dark">{carbonSystem.distinction.right.name}</p>
              <p className="mt-2 text-sm text-ink-soft">{carbonSystem.distinction.right.body}</p>
            </div>
          </div>
          <p className="mt-6 leading-relaxed text-ink-soft">{carbonSystem.disturbanceNote}</p>
          <p className="mt-4 text-ink-soft">{carbonSystem.pqnkMaintainsIntro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {carbonSystem.pqnkMaintains.map((m) => (
              <span key={m} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {m}
              </span>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">
            {carbonSystem.guardrail}
          </p>
        </div>
      </Section>

      {/* FORESTS AND AGRICULTURE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{forestsAgriculture.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{forestsAgriculture.body}</p>
          <p className="mt-4 text-lg font-medium text-primary-dark">{forestsAgriculture.difference}</p>
          <p className="mt-4 text-ink-soft">{forestsAgriculture.forestRetainsIntro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {forestsAgriculture.forestRetains.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-6 leading-relaxed text-ink-soft">{forestsAgriculture.agricultureDisrupts}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {forestsAgriculture.objective}
          </p>
          <p className="mt-4 text-sm text-ink-soft">{forestsAgriculture.guardrail}</p>
        </div>
      </Section>

      {/* BIODIVERSITY CLIMATE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{biodiversityClimate.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {biodiversityClimate.supports.map((s) => (
              <span key={s} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{biodiversityClimate.statement}</p>
          <p className="mt-4 text-center text-sm text-ink-soft">{biodiversityClimate.guardrail}</p>
          <div className="mt-4 text-center">
            <Link
              href={biodiversityClimate.linkHref}
              className="text-sm font-semibold text-primary underline underline-offset-4"
            >
              {biodiversityClimate.linkLabel} →
            </Link>
          </div>
        </div>
      </Section>

      {/* FOUR PRINCIPLES + CONVERGENCE */}
      <Section muted>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">The Four Principles — One Climate System</h2>
          <div className="mx-auto mt-6 grid max-w-2xl gap-4 text-start sm:grid-cols-2">
            {habitatPrinciples.map((p) => (
              <div key={p.name}>
                <p className="font-bold text-primary-dark">{p.name}</p>
                <p className="text-sm text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-md text-start">
            <VerticalChain steps={principlesConvergence} />
          </div>
        </div>
      </Section>

      {/* HEAT ISLAND */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{heatIsland.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{heatIsland.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{heatIsland.mechanism}</p>
          <p className="mt-4 text-sm text-ink-soft">{heatIsland.connectionNote}</p>
          <p className="mt-4 rounded-xl border border-border bg-card p-5 text-sm text-ink-soft">{heatIsland.guardrail}</p>
        </div>
      </Section>

      {/* CLIMATE RESILIENCE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{climateResilience.title}</h2>
          <p className="mt-4 text-ink-soft">{climateResilience.intro}</p>
          <div className="mt-6 flex flex-col gap-3">
            {climateResilience.scenarios.map((s) => (
              <div key={s.condition} className="rounded-lg border border-border bg-card px-4 py-3">
                <span className="font-semibold text-primary-dark">{s.condition}: </span>
                <span className="text-sm text-ink-soft">{s.response}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-bold text-primary-dark">{climateResilience.guardrail}</p>
        </div>
      </Section>

      {/* EVIDENCE ARCHITECTURE */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{evidenceArchitecture.title}</h2>
          <div className="mx-auto mt-6 grid max-w-2xl gap-4 text-start sm:grid-cols-2">
            {evidenceArchitecture.levels.map((l) => (
              <div key={l.name} className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">{l.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{l.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-ink-soft">{evidenceArchitecture.guardrail}</p>
          <Link
            href={evidenceArchitecture.linkHref}
            className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            {evidenceArchitecture.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* INTEGRATED CLIMATE SYSTEM */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{climateSystemLoop.title}</h2>
          <div className="mt-10">
            <VerticalChain steps={climateSystemLoop.steps} />
          </div>
        </div>
      </Section>

      {/* SCIENCE VS APPLICATION */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">Science Is Universal — Application Is Local</h2>
          <div className="mt-8">
            <ScienceApplicationNote science={scienceApplication.science} application={scienceApplication.application} />
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{scienceApplication.closing}</p>
        </div>
      </Section>

      {/* FINAL PROPOSITION */}
      <Section className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <div className="absolute inset-0 bg-primary-dark" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-cream/95">{finalProposition.statement}</p>
            <p className="mt-6 leading-relaxed text-cream/90">{finalProposition.problemStatement}</p>
            <div className="mt-8 flex flex-col gap-1 border-t border-cream/15 pt-6 text-cream/90">
              {finalProposition.restoreList.map((r) => (
                <p key={r} className="font-semibold">
                  {r}
                </p>
              ))}
            </div>
            <p className="mt-8 text-lg font-semibold text-accent-light">{finalProposition.conclusion}</p>
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
              href="/science/water"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Water</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">Restoring the Natural Water Cycle</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <Link
              href="/science/biodiversity"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Biodiversity</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">The Stability Engine of the Living Production System</p>
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

            <div className="flex flex-col rounded-2xl border-2 border-primary bg-primary/5 p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">Current page</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark">Climate</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">Restoring the Climate Function of Living Land</p>
            </div>

            <Link
              href="/science/transition"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Transition</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">From Degraded Soil to a Sustained Closed Loop</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
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

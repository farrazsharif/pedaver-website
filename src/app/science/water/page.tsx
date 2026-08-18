import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";
import RelatedKnowledgeModule from "@/components/science/RelatedKnowledgeModule";
import StageProgression from "@/components/science/StageProgression";
import ScienceApplicationNote from "@/components/science/ScienceApplicationNote";
import FutureTopicCard from "@/components/science/FutureTopicCard";
import ProductionLoop from "@/components/science/ProductionLoop";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  hero,
  notInputAlone,
  waterCycle,
  firstRequirement,
  infiltrationTerms,
  twoSidedConservation,
  mulchBoundary,
  evaporationHeating,
  evapVsTranspiration,
  transpirationProduction,
  waterAirCoexist,
  thirtySeventy,
  smmDiagnosis,
  irrigationSupplementary,
  noInundation,
  dew,
  atmosphericHumidity,
  rainfallEffectiveness,
  deepSeepage,
  rootReservoir,
  biodiversityWater,
  biologicalCoverArchitecture,
  hydroPrinciples,
  hydroPrinciplesClosing,
  scienceApplication,
  waterSavingOutcome,
  waterSoilPlantsClimate,
  centralWaterProposition,
  continueScience,
} from "@/lib/content/scienceWater";

export const metadata: Metadata = buildMetadata({
  title: "PQNK Water Science — Restoring the Natural Water Cycle | Pedaver",
  description:
    "Why water in PQNK is a connected biological and hydrological system rather than an irrigation input alone: infiltration, seepage, mulch, transpiration, dew, rainfall capture and diagnosis-based irrigation.",
  path: "/science/water",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: hero.title,
  description:
    "Why water in PQNK is a connected biological and hydrological system rather than an irrigation input alone: infiltration, seepage, mulch, transpiration, dew, rainfall capture and diagnosis-based irrigation.",
  url: `${SITE_URL}/science/water`,
  author: { "@id": `${SITE_URL}/founder#person` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

function FlowSequence({ steps }: { steps: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-center text-sm font-medium text-primary-dark">
      {steps.map((step, i) => (
        <span key={step} className="flex items-center gap-2">
          <span className="rounded-full border border-border bg-card px-3 py-1.5">{step}</span>
          {i < steps.length - 1 && <span aria-hidden="true">→</span>}
        </span>
      ))}
    </div>
  );
}

export default function ScienceWaterPage() {
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

      {/* WATER IS NOT AN AGRICULTURAL INPUT ALONE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{notInputAlone.title}</h2>
          {notInputAlone.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* THE PQNK WATER CYCLE — CENTRAL VISUAL */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{waterCycle.title}</h2>
          <p className="mt-4 text-center leading-relaxed text-ink-soft">{waterCycle.intro}</p>
          <div className="mt-10">
            <ProductionLoop steps={waterCycle.mainSteps} closingLabel={waterCycle.mainClosingLabel} />
          </div>

          <div className="mt-10 rounded-xl border border-border bg-card p-6 text-center">
            <p className="text-sm font-bold uppercase tracking-wide text-accent">{waterCycle.branch.title}</p>
            <div className="mt-4">
              <FlowSequence steps={waterCycle.branch.steps} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">{waterCycle.branch.note}</p>
          </div>
        </div>
      </Section>

      {/* FIRST REQUIREMENT */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{firstRequirement.title}</h2>
          {firstRequirement.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
          <p className="mt-4 text-lg font-medium text-primary-dark">{firstRequirement.statement}</p>
        </div>
      </Section>

      {/* INFILTRATION / SEEPAGE / ABSORPTION / RETENTION */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{infiltrationTerms.title}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {infiltrationTerms.terms.map((t) => (
              <div key={t.name} className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary-dark">{t.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{infiltrationTerms.halfNote}</p>
        </div>
      </Section>

      {/* WATER CONSERVATION HAS TWO SIDES */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{twoSidedConservation.title}</h2>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {twoSidedConservation.formula}
          </p>

          <h3 className="mt-8 text-lg font-bold text-primary-dark">{twoSidedConservation.partOne.title}</h3>
          <div className="mt-4">
            <FlowSequence steps={twoSidedConservation.partOne.pathway} />
          </div>

          <h3 className="mt-10 text-lg font-bold text-primary-dark">{twoSidedConservation.partTwo.title}</h3>
          <div className="mt-4">
            <FlowSequence steps={twoSidedConservation.partTwo.pathway} />
          </div>

          <p className="mt-8 text-center text-sm text-ink-soft">{twoSidedConservation.cautionNote}</p>
        </div>
      </Section>

      {/* MULCH CHANGES THE SOIL-ATMOSPHERE BOUNDARY */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{mulchBoundary.title}</h2>
          <p className="mt-4 text-ink-soft">{mulchBoundary.intro}</p>
          <ul className="mt-3 flex flex-col gap-1">
            {mulchBoundary.functions.map((f) => (
              <li key={f} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">{mulchBoundary.notNote}</p>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {mulchBoundary.statement}
          </p>
        </div>
      </Section>

      {/* EVAPORATION IS WATER LOSS - AND ENERGY TRANSFER */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{evaporationHeating.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{evaporationHeating.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{evaporationHeating.bareLandNote}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{evaporationHeating.scaleNote}</p>
          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">
            {evaporationHeating.boundary}
          </p>
        </div>
      </Section>

      {/* PLANTS RETURN WATER DIFFERENTLY - EVAPORATION VS TRANSPIRATION */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{evapVsTranspiration.title}</h2>
          <p className="mt-4 text-center leading-relaxed text-ink-soft">{evapVsTranspiration.intro}</p>

          <div className="mt-8">
            <p className="text-center text-sm font-bold uppercase tracking-wide text-ink-soft/70">
              {evapVsTranspiration.unproductive.label}
            </p>
            <div className="mt-3">
              <FlowSequence steps={evapVsTranspiration.unproductive.steps} />
            </div>
          </div>

          <div className="mt-8">
            <p className="text-center text-sm font-bold uppercase tracking-wide text-accent">
              {evapVsTranspiration.productive.label}
            </p>
            <div className="mt-3">
              <FlowSequence steps={evapVsTranspiration.productive.steps} />
            </div>
          </div>

          <p className="mt-8 text-center text-lg font-medium text-primary-dark">{evapVsTranspiration.notWasteNote}</p>
        </div>
      </Section>

      {/* TRANSPIRATION IS PART OF PRODUCTION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{transpirationProduction.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{transpirationProduction.body}</p>
        </div>
      </Section>

      {/* SOIL MUST HOLD WATER AND AIR TOGETHER */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterAirCoexist.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterAirCoexist.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterAirCoexist.saturationNote}</p>
          <p className="mt-4 text-lg font-medium text-primary-dark">{waterAirCoexist.objective}</p>
        </div>
      </Section>

      {/* THE MEANING OF THE 30:70 CONDITION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{thirtySeventy.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{thirtySeventy.body}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-bold text-primary-dark">
            {thirtySeventy.notTarget}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{thirtySeventy.temporaryNote}</p>
        </div>
      </Section>

      {/* SOIL MOISTURE MANAGEMENT IS DIAGNOSIS */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{smmDiagnosis.title}</h2>

          <div className="mt-8">
            <StageProgression stages={smmDiagnosis.sequence.map((s, i) => ({ number: i + 1, name: s.label, body: s.body }))} />
          </div>

          <p className="mt-6 text-ink-soft">{smmDiagnosis.otherCausesIntro}</p>
          <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {smmDiagnosis.otherCauses.map((c) => (
              <li key={c} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>

          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {smmDiagnosis.centralStatement}
          </p>
        </div>
      </Section>

      {/* IRRIGATION IS SUPPLEMENTARY */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{irrigationSupplementary.title}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-soft/70">{irrigationSupplementary.conventional.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{irrigationSupplementary.conventional.body}</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">{irrigationSupplementary.pqnk.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{irrigationSupplementary.pqnk.body}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* NO INUNDATION IS A BIOLOGICAL PRINCIPLE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{noInundation.title}</h2>
          <p className="mt-4 text-lg font-bold text-primary-dark">{noInundation.statement}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{noInundation.body}</p>
        </div>
      </Section>

      {/* DEW */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{dew.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{dew.body}</p>
          <div className="mt-6">
            <FlowSequence steps={dew.pathway} />
          </div>
          <p className="mt-6 text-sm text-ink-soft">{dew.fieldNote}</p>
        </div>
      </Section>

      {/* ATMOSPHERIC HUMIDITY AND DRY MULCH */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{atmosphericHumidity.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{atmosphericHumidity.body}</p>
          <div className="mt-6">
            <FlowSequence steps={atmosphericHumidity.pathway} />
          </div>
          <p className="mt-6 text-sm text-ink-soft">{atmosphericHumidity.intentionalNote}</p>
        </div>
      </Section>

      {/* RAINFALL EFFECTIVENESS */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{rainfallEffectiveness.title}</h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-center text-sm font-bold uppercase tracking-wide text-ink-soft/70">
                {rainfallEffectiveness.degraded.label}
              </p>
              <div className="mt-3">
                <FlowSequence steps={rainfallEffectiveness.degraded.steps} />
              </div>
            </div>
            <div>
              <p className="text-center text-sm font-bold uppercase tracking-wide text-accent">
                {rainfallEffectiveness.functioning.label}
              </p>
              <div className="mt-3">
                <FlowSequence steps={rainfallEffectiveness.functioning.steps} />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-1 text-center text-ink-soft">
            <p>{rainfallEffectiveness.questionNot}</p>
            <p className="text-lg font-medium text-primary-dark">{rainfallEffectiveness.questionBut}</p>
          </div>
        </div>
      </Section>

      {/* DEEP SEEPAGE AND GROUNDWATER */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{deepSeepage.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{deepSeepage.body}</p>
          <p className="mt-4 text-ink-soft">{deepSeepage.conditionsIntro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {deepSeepage.conditions.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {c}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-soft">{deepSeepage.caution}</p>
        </div>
      </Section>

      {/* ROOTS EXTEND THE EFFECTIVE WATER RESERVOIR */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{rootReservoir.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{rootReservoir.body}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-center text-ink-soft">{rootReservoir.contrast.shallow}</div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-center text-ink-soft">{rootReservoir.contrast.deep}</div>
          </div>
          <p className="mt-4 leading-relaxed text-ink-soft">{rootReservoir.mycorrhizaNote}</p>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {rootReservoir.centralConcept}
          </p>
        </div>
      </Section>

      {/* BIODIVERSITY STABILIZES WATER USE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{biodiversityWater.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{biodiversityWater.body}</p>
          <p className="mt-4 text-center text-lg font-medium text-primary-dark">{biodiversityWater.statement}</p>
        </div>
      </Section>

      {/* BIOLOGICAL COVER COMPLETES THE WATER ARCHITECTURE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{biologicalCoverArchitecture.title}</h2>
          <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {biologicalCoverArchitecture.functions.map((f) => (
              <li key={f} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">{biologicalCoverArchitecture.notNote}</p>
        </div>
      </Section>

      {/* THE FOUR PRINCIPLES FORM ONE HYDROLOGICAL SYSTEM */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">The Four Principles Form One Hydrological System</h2>
          <div className="mx-auto mt-6 grid max-w-2xl gap-4 text-start sm:grid-cols-2">
            {hydroPrinciples.map((p) => (
              <div key={p.name}>
                <p className="font-bold text-primary-dark">{p.name}</p>
                <p className="text-sm text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-primary-dark">{hydroPrinciplesClosing}</p>
        </div>
      </Section>

      {/* SCIENCE VS APPLICATION */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">Science Is Universal — Application Is Local</h2>
          <div className="mt-8">
            <ScienceApplicationNote
              science={scienceApplication.scienceLines.join(" ")}
              application={scienceApplication.application}
            />
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{scienceApplication.closing}</p>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-ink-soft">{scienceApplication.centralStatement}</p>
        </div>
      </Section>

      {/* WATER SAVING IS A SYSTEM OUTCOME */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{waterSavingOutcome.title}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {waterSavingOutcome.factors.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-lg font-medium text-primary-dark">
            {waterSavingOutcome.resultStatement}
          </p>
          <p className="mx-auto mt-4 max-w-xl text-center text-ink-soft">{waterSavingOutcome.clarification}</p>
        </div>
      </Section>

      {/* WATER, SOIL, PLANTS AND CLIMATE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterSoilPlantsClimate.title}</h2>
          <div className="mt-8 flex flex-col gap-6">
            <FlowSequence steps={waterSoilPlantsClimate.flowOne} />
            <FlowSequence steps={waterSoilPlantsClimate.flowTwo} />
          </div>
          <p className="mt-8 leading-relaxed text-ink-soft">{waterSoilPlantsClimate.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterSoilPlantsClimate.frame}</p>
          <p className="mt-4 text-sm text-ink-soft">{waterSoilPlantsClimate.scopeNote}</p>
        </div>
      </Section>

      {/* CENTRAL WATER PROPOSITION */}
      <Section className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <div className="absolute inset-0 bg-primary-dark" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-cream/95">{centralWaterProposition.statement}</p>

            <div className="mt-8 flex flex-col gap-2 border-t border-cream/15 pt-6 text-cream/90">
              <p className="font-semibold">{centralWaterProposition.degradedNote}</p>
              <p className="mt-2">{centralWaterProposition.functioningIntro}</p>
              <ul className="mx-auto flex max-w-md flex-col gap-1 text-start text-cream/85">
                {centralWaterProposition.functioningSteps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2 border-t border-cream/15 pt-6">
              <p className="text-cream/70">{centralWaterProposition.fromLabel}</p>
              <span aria-hidden="true" className="text-accent-light">↓</span>
              <p className="text-lg font-semibold text-accent-light">{centralWaterProposition.toLabel}</p>
            </div>
          </div>
        </div>
      </Section>

      <RelatedKnowledgeModule domainSlug="water" />

      {/* CONTINUE THE SCIENCE */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">Continue the Science</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm font-semibold uppercase tracking-wide text-ink-soft/70">
            {continueScience.closingLine}
          </p>

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

            <div className="flex flex-col rounded-2xl border-2 border-primary bg-primary/5 p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">Current page</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark">Water</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">Restoring the Natural Water Cycle</p>
            </div>

            <FutureTopicCard
              name="Biodiversity"
              tagline={continueScience.biodiversityTagline}
              summary="How biological diversity above and below ground creates functional stability."
            />

            <Link
              href="/science/transition"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:col-span-2"
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

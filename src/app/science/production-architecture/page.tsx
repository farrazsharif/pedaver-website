import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";
import RelatedKnowledgeModule from "@/components/science/RelatedKnowledgeModule";
import ScienceApplicationNote from "@/components/science/ScienceApplicationNote";
import BedFurrowCrossSection from "@/components/science/BedFurrowCrossSection";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  hero,
  twoZones,
  diagnoseFirst,
  hardpanCorrection,
  correctOnceProtect,
  bedGeometry,
  adaptiveDimensions,
  controlledTraffic,
  furrowsNotWasted,
  waterWithoutInundation,
  waterWashTransition,
  establishCover,
  retainRootsmulch,
  precisionPlanting,
  harvestWithoutResetting,
  principlesConverge,
  convergenceFormula,
  whyPermanence,
  machinerySubordinate,
  operatorDiscipline,
  productionManager,
  conversionSequence,
  transitionVsMature,
  waterEfficiencyLink,
  soilTemperatureLink,
  biodiversityLink,
  cropProtectionLink,
  foodQualityLink,
  climateFunctionLink,
  adaptiveEngineering,
  whatItIsNot,
  integratedSystemChain,
  surroundingRelationships,
  finalProposition,
  evidenceBoundary,
} from "@/lib/content/scienceProductionArchitecture";

export const metadata: Metadata = buildMetadata({
  title: "PQNK Production Architecture — Engineering the Permanent Biological Field | Pedaver",
  description:
    "How PQNK physically separates the protected biological production zone from permanent traffic and hydraulic corridors: soil-pit diagnosis, hardpan correction, permanent bed/furrow geometry, controlled traffic, and precision no-till planting.",
  path: "/science/production-architecture",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: hero.title,
  description:
    "How PQNK physically separates the protected biological production zone from permanent traffic and hydraulic corridors: soil-pit diagnosis, hardpan correction, permanent bed/furrow geometry, controlled traffic, and precision no-till planting.",
  url: `${SITE_URL}/science/production-architecture`,
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

export default function ScienceProductionArchitecturePage() {
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
        </div>
      </section>

      {/* TWO ZONES */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">The Two Permanent Zones</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="font-bold text-primary-dark">{twoZones.protected.name}</p>
              <p className="text-sm font-medium italic text-ink-soft">{twoZones.protected.subtitle}</p>
              <ul className="mt-3 flex flex-col gap-1">
                {twoZones.protected.items.map((i) => (
                  <li key={i} className="text-sm text-ink-soft">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{twoZones.corridor.name}</p>
              <p className="text-sm font-medium italic text-ink-soft">{twoZones.corridor.subtitle}</p>
              <ul className="mt-3 flex flex-col gap-1">
                {twoZones.corridor.items.map((i) => (
                  <li key={i} className="text-sm text-ink-soft">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* DIAGNOSE FIRST */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{diagnoseFirst.title}</h2>
          <p className="mt-4 text-ink-soft">{diagnoseFirst.intro}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-bold text-primary-dark">
            {diagnoseFirst.statement}
          </p>
          <p className="mt-6 text-ink-soft">Determine:</p>
          <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {diagnoseFirst.checklist.map((c) => (
              <li key={c} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">{diagnoseFirst.caveat}</p>
        </div>
      </Section>

      {/* HARDPAN CORRECTION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{hardpanCorrection.title}</h2>
          <div className="mt-8">
            <VerticalChain steps={hardpanCorrection.chain} />
          </div>
          <p className="mt-8 leading-relaxed text-ink-soft">{hardpanCorrection.referenceNote}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{hardpanCorrection.boundedNote}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{hardpanCorrection.deeperNote}</p>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-bold text-primary-dark">
            {hardpanCorrection.objectiveStatement}
          </p>
          <p className="mt-4 text-sm text-ink-soft">{hardpanCorrection.transitionNote}</p>
        </div>
      </Section>

      {/* CORRECT ONCE PROTECT */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{correctOnceProtect.title}</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-center text-sm font-bold uppercase tracking-wide text-ink-soft/70">{correctOnceProtect.conventional.label}</p>
              <div className="mt-4">
                <VerticalChain steps={correctOnceProtect.conventional.chain} />
              </div>
            </div>
            <div>
              <p className="text-center text-sm font-bold uppercase tracking-wide text-accent">{correctOnceProtect.pqnk.label}</p>
              <div className="mt-4">
                <VerticalChain steps={correctOnceProtect.pqnk.chain} />
              </div>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-lg font-medium text-primary-dark">{correctOnceProtect.statement}</p>
        </div>
      </Section>

      {/* BED GEOMETRY — MAIN CROSS SECTION */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{bedGeometry.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-ink-soft">{bedGeometry.intro}</p>

          <div className="mt-10">
            <BedFurrowCrossSection />
          </div>

          <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
            {bedGeometry.dims.map((d) => (
              <div key={d.label} className="rounded-lg border border-border bg-card p-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/70">{d.label}</p>
                <p className="mt-1 text-sm font-bold text-primary-dark">{d.value}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-6 max-w-xl text-center text-lg font-bold text-primary-dark">{bedGeometry.centralNote}</p>
        </div>
      </Section>

      {/* ADAPTIVE DIMENSIONS */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{adaptiveDimensions.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{adaptiveDimensions.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{adaptiveDimensions.purpose}</p>
          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">
            {adaptiveDimensions.guardrail}
          </p>
          <p className="mt-6 text-center text-lg font-bold text-primary-dark">{adaptiveDimensions.governingPrinciple}</p>
          <p className="mt-4 text-center text-ink-soft">{adaptiveDimensions.closing}</p>
        </div>
      </Section>

      {/* CONTROLLED TRAFFIC */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{controlledTraffic.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{controlledTraffic.intro}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-center font-medium text-primary-dark">{controlledTraffic.mapping.tyres}</div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">{controlledTraffic.mapping.biology}</div>
          </div>
          <p className="mt-6 text-ink-soft">{controlledTraffic.continuityNote}</p>
          <p className="mt-4 text-center text-lg font-bold text-primary-dark">{controlledTraffic.statement}</p>
        </div>
      </Section>

      {/* FURROWS NOT WASTED */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{furrowsNotWasted.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{furrowsNotWasted.intro}</p>
          <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {furrowsNotWasted.functions.map((f) => (
              <li key={f} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {furrowsNotWasted.statement}
          </p>
        </div>
      </Section>

      {/* WATER WITHOUT INUNDATION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterWithoutInundation.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterWithoutInundation.intro}</p>
          <div className="mt-6">
            <FlowSequence steps={waterWithoutInundation.pathways} />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">{waterWithoutInundation.objective.moist}</div>
            <div className="rounded-xl border border-border bg-card p-5 text-center text-ink-soft">{waterWithoutInundation.objective.not}</div>
          </div>
          <p className="mt-6 leading-relaxed text-ink-soft">{waterWithoutInundation.ballTest}</p>
          <p className="mt-4 text-sm text-ink-soft">{waterWithoutInundation.applicationNote}</p>
          <Link href={waterWithoutInundation.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {waterWithoutInundation.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* WATER WASH TRANSITION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterWashTransition.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterWashTransition.body}</p>
          <ul className="mt-4 flex flex-col gap-1">
            {waterWashTransition.guardrails.map((g) => (
              <li key={g} className="text-sm text-ink-soft">
                {g}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ESTABLISH COVER */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{establishCover.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{establishCover.body}</p>
          <p className="mt-4 text-ink-soft">{establishCover.purposeIntro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {establishCover.purposes.map((p) => (
              <span key={p} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {p}
              </span>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-center font-medium text-primary-dark">{establishCover.terminationNote.roots}</div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">{establishCover.terminationNote.top}</div>
          </div>
          <p className="mt-6 text-center text-sm text-ink-soft">{establishCover.guardrail}</p>
        </div>
      </Section>

      {/* RETAIN ROOTS MULCH TOP */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{retainRootsmulch.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{retainRootsmulch.below.label}</p>
              <p className="mt-2 text-sm text-ink-soft">{retainRootsmulch.below.body}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{retainRootsmulch.above.label}</p>
              <p className="mt-2 text-sm text-ink-soft">{retainRootsmulch.above.body}</p>
            </div>
          </div>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {retainRootsmulch.statement}
          </p>
          <p className="mt-4 text-center text-sm text-ink-soft">{retainRootsmulch.contrastNote}</p>
        </div>
      </Section>

      {/* PRECISION PLANTING */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{precisionPlanting.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{precisionPlanting.intro}</p>
          <div className="mt-6 flex items-center justify-center gap-3 text-center text-sm font-semibold text-primary-dark">
            <span className="rounded-full border border-border bg-card px-3 py-1.5">{precisionPlanting.contrast.whole}</span>
            <span aria-hidden="true">→</span>
            <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5">{precisionPlanting.contrast.precision}</span>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {precisionPlanting.machines.map((m) => (
              <div key={m.name} className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary-dark">
                  {m.name} — {m.full}
                </p>
                <p className="mt-2 text-sm text-ink-soft">{m.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-ink-soft">{precisionPlanting.closing}</p>
        </div>
      </Section>

      {/* HARVEST WITHOUT RESETTING */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{harvestWithoutResetting.title}</h2>
          <p className="mt-4 text-ink-soft">{harvestWithoutResetting.intro}</p>
          <ul className="mt-4 flex flex-col gap-1">
            {harvestWithoutResetting.remains.map((r) => (
              <li key={r} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{harvestWithoutResetting.closing}</p>
        </div>
      </Section>

      {/* PRINCIPLES CONVERGE */}
      <Section muted>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">The Architecture Enables the Four PQNK Principles</h2>
          <div className="mx-auto mt-6 grid max-w-2xl gap-4 text-start sm:grid-cols-2">
            {principlesConverge.map((p) => (
              <div key={p.name}>
                <p className="font-bold text-primary-dark">{p.name}</p>
                <p className="text-sm text-ink-soft">→ {p.engineeringOutcome}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <div className="mx-auto flex max-w-xl flex-wrap items-center justify-center gap-2 text-center text-sm font-semibold text-primary-dark">
              {convergenceFormula.parts.map((p, i) => (
                <span key={p} className="flex items-center gap-2">
                  <span className="rounded-full border border-border bg-card px-3 py-1.5">{p}</span>
                  {i < convergenceFormula.parts.length - 1 && <span aria-hidden="true">+</span>}
                </span>
              ))}
            </div>
            <div className="mt-3 flex justify-center">
              <span aria-hidden="true" className="text-accent">↓</span>
            </div>
            <p className="mt-2 text-center text-lg font-bold text-primary-dark">{convergenceFormula.result}</p>
          </div>
        </div>
      </Section>

      {/* WHY PERMANENCE MATTERS */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{whyPermanence.title}</h2>
          <p className="mt-4 text-ink-soft">{whyPermanence.intro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {whyPermanence.interruptions.map((i) => (
              <span key={i} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {i}
              </span>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {whyPermanence.statement}
          </p>
        </div>
      </Section>

      {/* MACHINERY SUBORDINATE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{machinerySubordinate.title}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-sm text-ink-soft">{machinerySubordinate.contrast.industrial}</div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-sm text-ink-soft">{machinerySubordinate.contrast.pqnk}</div>
          </div>
          <p className="mt-6 text-ink-soft">{machinerySubordinate.body}</p>
          <ul className="mt-4 flex flex-col gap-1">
            {machinerySubordinate.examples.map((e) => (
              <li key={e} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {e}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* OPERATOR DISCIPLINE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{operatorDiscipline.title}</h2>
          <p className="mt-4 text-ink-soft">{operatorDiscipline.intro}</p>
          <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {operatorDiscipline.responsibilities.map((r) => (
              <li key={r} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {operatorDiscipline.terminology}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{operatorDiscipline.explanation}</p>
        </div>
      </Section>

      {/* PRODUCTION MANAGER */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{productionManager.title}</h2>
          <p className="mt-4 text-ink-soft">{productionManager.intro}</p>
          <p className="mt-4 text-ink-soft">The Production Manager observes:</p>
          <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {productionManager.observes.map((o) => (
              <li key={o} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {o}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{productionManager.statement}</p>
        </div>
      </Section>

      {/* CONVERSION SEQUENCE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">The Full PQNK Conversion Sequence</h2>
          <div className="mt-8 flex flex-col gap-2">
            {conversionSequence.map((s, i) => (
              <div key={s.step} className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-bold text-accent">STEP {i + 1}</p>
                <p className="mt-1 font-bold text-primary-dark">{s.step}</p>
                <p className="mt-1 text-sm text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* TRANSITION VS MATURE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{transitionVsMature.title}</h2>
          <p className="mt-4 text-ink-soft">PQNK conversion may require temporary corrective actions that are not features of the mature system, including:</p>
          <ul className="mt-3 flex flex-col gap-1">
            {transitionVsMature.transitionExamples.map((e) => (
              <li key={e} className="text-sm text-ink-soft">
                {e}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm font-medium text-primary-dark">{transitionVsMature.guardrail}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-sm text-ink-soft">{transitionVsMature.distinction.transition}</div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-sm text-ink-soft">{transitionVsMature.distinction.mature}</div>
          </div>
        </div>
      </Section>

      {/* WATER EFFICIENCY LINK */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterEfficiencyLink.title}</h2>
          <div className="mt-6">
            <FlowSequence steps={waterEfficiencyLink.mechanismChain} />
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{waterEfficiencyLink.result}</p>
          <p className="mt-4 text-sm text-ink-soft">{waterEfficiencyLink.note}</p>
          <Link href={waterEfficiencyLink.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {waterEfficiencyLink.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* SOIL TEMPERATURE LINK */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{soilTemperatureLink.title}</h2>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {soilTemperatureLink.observation}
          </p>
          <p className="mt-4 text-sm text-ink-soft">{soilTemperatureLink.guardrail}</p>
          <Link href={soilTemperatureLink.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {soilTemperatureLink.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* BIODIVERSITY LINK */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{biodiversityLink.title}</h2>
          <p className="mt-4 text-ink-soft">{biodiversityLink.body}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {biodiversityLink.conditions.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {c}
              </span>
            ))}
          </div>
          <Link href={biodiversityLink.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {biodiversityLink.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* CROP PROTECTION LINK */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{cropProtectionLink.title}</h2>
          <p className="mt-4 text-ink-soft">Healthy architecture supports:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {cropProtectionLink.supports.map((s) => (
              <span key={s} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm font-medium text-primary-dark">{cropProtectionLink.guardrail}</p>
          <Link href={cropProtectionLink.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {cropProtectionLink.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* FOOD QUALITY LINK */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{foodQualityLink.title}</h2>
          <p className="mt-4 text-ink-soft">{foodQualityLink.body}</p>
          <div className="mt-4 flex flex-col gap-1 rounded-xl border border-accent/30 bg-accent/5 p-5">
            {foodQualityLink.hierarchy.map((h) => (
              <p key={h} className="text-center text-sm font-medium text-primary-dark">
                {h}
              </p>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-soft">{foodQualityLink.guardrail}</p>
          <Link href={foodQualityLink.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {foodQualityLink.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* CLIMATE FUNCTION LINK */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{climateFunctionLink.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {climateFunctionLink.mechanisms.map((m) => (
              <span key={m} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {m}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm font-medium text-primary-dark">{climateFunctionLink.guardrail}</p>
          <Link href={climateFunctionLink.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {climateFunctionLink.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* ADAPTIVE ENGINEERING */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{adaptiveEngineering.title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-ink-soft">{adaptiveEngineering.intro}</p>
          <div className="mt-8">
            <ScienceApplicationNote
              science={adaptiveEngineering.fixed.join(". ") + "."}
              application={adaptiveEngineering.adaptableIntro + " " + adaptiveEngineering.adaptable.join(", ") + "."}
            />
          </div>
          <p className="mt-6 text-center text-lg font-bold text-primary-dark">{adaptiveEngineering.statement}</p>
        </div>
      </Section>

      {/* WHAT IT IS NOT */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{whatItIsNot.title}</h2>
          <p className="mt-4 text-ink-soft">It is not:</p>
          <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {whatItIsNot.items.map((i) => (
              <li key={i} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {whatItIsNot.statement}
          </p>
        </div>
      </Section>

      {/* INTEGRATED SYSTEM DIAGRAM */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">The Integrated Production Architecture System</h2>
          <div className="mt-10">
            <VerticalChain steps={integratedSystemChain} />
          </div>

          <p className="mx-auto mt-10 max-w-xl text-center text-sm font-semibold uppercase tracking-wide text-ink-soft/70">
            Surrounding Functional Relationships
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {surroundingRelationships.map((r, i) => (
              <span key={r} className="flex items-center gap-2">
                <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5 text-sm font-medium text-primary-dark">{r}</span>
                {i < surroundingRelationships.length - 1 && <span aria-hidden="true" className="text-ink-soft/50">↔</span>}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-ink-soft">
            Production Architecture is the physical platform on which the entire PQNK Science system operates.
          </p>
        </div>
      </Section>

      {/* EVIDENCE BOUNDARY */}
      <Section muted>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{evidenceBoundary.title}</h2>
          <div className="mx-auto mt-6 grid max-w-3xl gap-4 text-start sm:grid-cols-3">
            {evidenceBoundary.levels.map((l) => (
              <div key={l.name} className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">{l.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{l.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-ink-soft">{evidenceBoundary.guardrail}</p>
          <Link href={evidenceBoundary.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {evidenceBoundary.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* FINAL PROPOSITION */}
      <Section className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <div className="absolute inset-0 bg-primary-dark" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-cream/95">{finalProposition.statement}</p>
            <div className="mt-8 flex flex-col gap-1 border-t border-cream/15 pt-6 text-cream/90">
              {finalProposition.lines.map((l) => (
                <p key={l} className="text-lg font-semibold">
                  {l}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <RelatedKnowledgeModule domainSlug="production-architecture" />

      {/* CONTINUE THE SCIENCE */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">Continue the Science</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Link href="/science/soil" className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Soil</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">The Living Production System</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <Link href="/science/plants" className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Plants</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">The Biological Production Engine</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <Link href="/science/water" className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Water</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">Restoring the Natural Water Cycle</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <Link href="/science/biodiversity" className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Biodiversity</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">The Stability Engine of the Living Production System</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <Link href="/science/nutrition" className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Nutrition</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">From Mineral Presence to Biological Availability</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <Link href="/science/crop-protection" className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Crop Protection</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">Biological Regulation Instead of Routine Suppression</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <Link href="/science/climate" className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Climate</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">Restoring the Climate Function of Living Land</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <Link href="/science/food-quality" className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Food Quality</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">From Living Soil to the Food We Eat</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">Read the Science →</span>
            </Link>

            <div className="flex flex-col rounded-2xl border-2 border-primary bg-primary/5 p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">Current page</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark">Production Architecture</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">Engineering the Field So the Living System Never Has to Be Rebuilt</p>
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

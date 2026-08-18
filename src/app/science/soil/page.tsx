import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";
import StageProgression from "@/components/science/StageProgression";
import ScienceApplicationNote from "@/components/science/ScienceApplicationNote";
import FutureTopicCard from "@/components/science/FutureTopicCard";
import LivingSystemDiagram from "@/components/science/LivingSystemDiagram";
import RelatedKnowledgeModule from "@/components/science/RelatedKnowledgeModule";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { coreComponents } from "@/lib/content/science";
import {
  hero,
  soilSystemChain,
  soilSystem,
  physicalArchitecture,
  degradation,
  pores,
  waterAir,
  roots,
  rhizosphere,
  mycorrhizae,
  microorganisms,
  mineralReserve,
  organicMatter,
  waterConservation,
  climateWaterCycle,
  dewAtmosphere,
  plantWaterUse,
  smmDiagnosis,
  biologicalCover,
  biodiversity,
  habitatPrinciples,
  habitatClosing,
  soilTemperature,
  scienceApplication,
  notReplacement,
  returningFunction,
  judgedByFunction,
  foundationalNotWhole,
  closingProposition,
} from "@/lib/content/scienceSoil";

export const metadata: Metadata = buildMetadata({
  title: "Soil — The Living Production System | PQNK Science | Pedaver",
  description:
    "Why soil is a living production system, not an inert growing medium: pore architecture, roots, microorganisms, fungi, mycorrhizae, water and air interacting to make production possible.",
  path: "/science/soil",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: hero.title,
  description:
    "Why soil is a living production system, not an inert growing medium: pore architecture, roots, microorganisms, fungi, mycorrhizae, water and air interacting to make production possible.",
  url: `${SITE_URL}/science/soil`,
  author: { "@id": `${SITE_URL}/founder#person` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

function VerticalChain({ steps, closingLabel }: { steps: string[]; closingLabel?: string }) {
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
      {closingLabel && (
        <>
          <svg width="16" height="20" viewBox="0 0 16 20" className="my-1 text-accent/70" aria-hidden="true">
            <path d="M8 0 L8 14 M2 9 L8 15 L14 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <div className="w-full max-w-md rounded-lg border-2 border-accent bg-accent/10 px-5 py-3 text-center text-sm font-bold text-primary-dark">
            {closingLabel}
          </div>
          <p className="mt-2 text-center text-xs font-semibold uppercase tracking-wide text-accent">
            completes the cycle
          </p>
        </>
      )}
    </div>
  );
}

export default function ScienceSoilPage() {
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
        </div>
      </section>

      {/* THE SOIL SYSTEM */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{soilSystem.title}</h2>
          <div className="mt-8">
            <VerticalChain steps={soilSystemChain} closingLabel={soilSystem.loopClosingLabel} />
          </div>
          <p className="mt-8 leading-relaxed text-ink-soft">{soilSystem.intro}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center text-lg font-medium text-primary-dark">
            {soilSystem.callout}
          </p>
        </div>
      </Section>

      {/* PHYSICAL ARCHITECTURE COMES FIRST */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{physicalArchitecture.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{physicalArchitecture.intro}</p>
          <p className="mt-4 text-ink-soft">These spaces allow:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {physicalArchitecture.functions.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{physicalArchitecture.statement}</p>
          <div className="mt-6 flex flex-col gap-2 text-ink-soft">
            {physicalArchitecture.reframe.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* DEGRADATION SEQUENCE */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{degradation.title}</h2>
          <div className="mt-8">
            <VerticalChain steps={degradation.chain} />
          </div>
          <p className="mt-8 leading-relaxed text-ink-soft">{degradation.hardpanNote}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{degradation.correctiveNote}</p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            <Link href={degradation.resourceLinkHref} className="text-sm font-semibold text-primary underline underline-offset-4">
              {degradation.resourceLinkLabel} →
            </Link>
            <Link href={degradation.machineLinkHref} className="text-sm font-semibold text-primary underline underline-offset-4">
              {degradation.machineLinkLabel} →
            </Link>
          </div>
        </div>
      </Section>

      {/* SOIL PORES ARE PRODUCTION SPACE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{pores.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{pores.intro}</p>
          <p className="mt-4 leading-relaxed text-primary-dark font-medium">{pores.statement}</p>
        </div>
      </Section>

      {/* WATER AND AIR */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterAir.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterAir.intro}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-accent">{waterAir.gradient.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{waterAir.gradient.body}</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="text-sm font-bold uppercase tracking-wide text-primary">{waterAir.sustained.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{waterAir.sustained.body}</p>
              <p className="mt-2 text-sm font-medium text-primary-dark">{waterAir.sustained.note}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ROOTS ARE BIOLOGICAL ENGINEERS */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{roots.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{roots.intro}</p>
          <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {roots.functions.map((f) => (
              <li key={f} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-ink-soft">{roots.retentionNote}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-center font-medium text-primary-dark">{roots.pair.above}</div>
            <div className="rounded-xl border border-border bg-card p-5 text-center font-medium text-primary-dark">{roots.pair.below}</div>
          </div>
        </div>
      </Section>

      {/* RHIZOSPHERE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{rhizosphere.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{rhizosphere.intro}</p>
          <p className="mt-4 text-ink-soft">These organisms participate in:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {rhizosphere.organismRoles.map((r) => (
              <span key={r} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {r}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-center text-sm font-medium text-primary-dark">
            {rhizosphere.cycle.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-border bg-card px-3 py-1.5">{step}</span>
                {i < rhizosphere.cycle.length - 1 && <span aria-hidden="true">→</span>}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* MYCORRHIZAE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{mycorrhizae.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{mycorrhizae.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{mycorrhizae.damage}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 leading-relaxed text-primary-dark">
            {mycorrhizae.notInput}
          </p>
        </div>
      </Section>

      {/* MICROORGANISMS */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{microorganisms.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{microorganisms.intro}</p>
          <p className="mt-4 leading-relaxed text-primary-dark font-medium">{microorganisms.reframe}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{microorganisms.supplementNote}</p>
        </div>
      </Section>

      {/* MINERAL RESERVE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{mineralReserve.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{mineralReserve.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{mineralReserve.question}</p>
          <ul className="mt-4 flex flex-col gap-1">
            {mineralReserve.agents.map((a) => (
              <li key={a} className="text-ink-soft">
                {a}
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-xl border border-border bg-card p-5 text-ink-soft">{mineralReserve.diagnosisNote}</p>
        </div>
      </Section>

      {/* ORGANIC MATTER */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{organicMatter.title}</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{organicMatter.aboveGround.title}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {organicMatter.aboveGround.items.map((i) => (
                  <li key={i} className="text-sm text-ink-soft">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{organicMatter.belowGround.title}</p>
              <ul className="mt-2 flex flex-col gap-1">
                {organicMatter.belowGround.items.map((i) => (
                  <li key={i} className="text-sm text-ink-soft">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{organicMatter.statement}</p>
        </div>
      </Section>

      {/* WATER CONSERVATION */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterConservation.title}</h2>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {waterConservation.formula}
          </p>

          <h3 className="mt-8 text-lg font-bold text-primary-dark">{waterConservation.partOne.title}</h3>
          {waterConservation.partOne.body.map((p, i) => (
            <p key={i} className="mt-3 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-center text-sm font-medium text-primary-dark">
            {waterConservation.partOne.pathway.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-border bg-card px-3 py-1.5">{step}</span>
                {i < waterConservation.partOne.pathway.length - 1 && <span aria-hidden="true">→</span>}
              </span>
            ))}
          </div>

          <h3 className="mt-10 text-lg font-bold text-primary-dark">{waterConservation.partTwo.title}</h3>
          <p className="mt-3 leading-relaxed text-ink-soft">{waterConservation.partTwo.body}</p>
          <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {waterConservation.partTwo.mulchFunctions.map((f) => (
              <li key={f} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-8 rounded-xl border border-border bg-card p-5 leading-relaxed text-ink-soft">
            {waterConservation.approvedFormulation}
          </p>
        </div>
      </Section>

      {/* EVAPORATION, LAND HEATING, WATER CYCLE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{climateWaterCycle.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{climateWaterCycle.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{climateWaterCycle.scaleNote}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-ink-soft">{climateWaterCycle.contrast.bare}</div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-ink-soft">{climateWaterCycle.contrast.covered}</div>
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{climateWaterCycle.objective}</p>
          <p className="mt-6 text-sm text-ink-soft">{climateWaterCycle.scopeNote}</p>
          <p className="mt-4 text-sm text-ink-soft">{climateWaterCycle.engineeringNote}</p>
        </div>
      </Section>

      {/* DEW AND ATMOSPHERIC MOISTURE */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{dewAtmosphere.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{dewAtmosphere.intro}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-bold text-primary-dark">{dewAtmosphere.dew.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{dewAtmosphere.dew.body}</p>
              <div className="mt-3 flex flex-col gap-1">
                {dewAtmosphere.dew.pathway.map((step, i) => (
                  <p key={step} className="text-xs font-medium text-ink-soft">
                    {i > 0 && "→ "}
                    {step}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="font-bold text-primary-dark">{dewAtmosphere.humidity.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{dewAtmosphere.humidity.body}</p>
              <div className="mt-3 flex flex-col gap-1">
                {dewAtmosphere.humidity.pathway.map((step, i) => (
                  <p key={step} className="text-xs font-medium text-ink-soft">
                    {i > 0 && "→ "}
                    {step}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {dewAtmosphere.combinedNote}
          </p>
        </div>
      </Section>

      {/* TOTAL PLANT WATER USE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{plantWaterUse.title}</h2>
          <p className="mt-4 text-ink-soft">Plants continue using water for:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {plantWaterUse.uses.map((u) => (
              <span key={u} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {u}
              </span>
            ))}
          </div>
          <p className="mt-6 text-lg font-medium text-primary-dark">{plantWaterUse.statement}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">
            PQNK improves {plantWaterUse.mechanism.improves}, while simultaneously restricting {plantWaterUse.mechanism.restricts}.
          </p>
          <p className="mt-4 text-sm text-ink-soft">{plantWaterUse.precisionNote}</p>
        </div>
      </Section>

      {/* SMM DIAGNOSIS */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{smmDiagnosis.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{smmDiagnosis.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{smmDiagnosis.wiltingNote}</p>

          <div className="mt-8">
            <StageProgression
              stages={smmDiagnosis.sequence.map((s, i) => ({ number: i + 1, name: s.label, body: s.body }))}
            />
          </div>

          <p className="mt-6 leading-relaxed text-primary-dark font-medium">{smmDiagnosis.closing}</p>
          <Link
            href={smmDiagnosis.resourceLinkHref}
            className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            {smmDiagnosis.resourceLinkLabel} →
          </Link>
        </div>
      </Section>

      {/* PERMANENT BIOLOGICAL COVER / WEEDS */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{biologicalCover.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{biologicalCover.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{biologicalCover.reframe}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {biologicalCover.types.map((t) => (
              <div key={t.name} className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary-dark">{t.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm font-bold uppercase tracking-wide text-accent">{biologicalCover.label}</p>
          <p className="mt-2 text-center text-ink-soft">{biologicalCover.concept}</p>
          <p className="mt-6 rounded-xl border border-border bg-card p-5 leading-relaxed text-ink-soft">
            {biologicalCover.caveat}
          </p>
        </div>
      </Section>

      {/* BIODIVERSITY */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{biodiversity.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{biodiversity.intro}</p>
          <p className="mt-4 text-ink-soft">PQNK therefore encourages:</p>
          <ul className="mt-2 flex flex-col gap-1">
            {biodiversity.encourages.map((e) => (
              <li key={e} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {e}
              </li>
            ))}
          </ul>
          <p className="mt-4 leading-relaxed text-primary-dark font-medium">{biodiversity.objective}</p>
        </div>
      </Section>

      {/* FOUR PRINCIPLES AS HABITAT RULES */}
      <Section muted>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">The Four Principles Are Habitat Rules</h2>
          <div className="mx-auto mt-6 grid max-w-2xl gap-4 text-start sm:grid-cols-2">
            {habitatPrinciples.map((p) => (
              <div key={p.name}>
                <p className="font-bold text-primary-dark">{p.name}</p>
                <p className="text-sm text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-primary-dark">{habitatClosing}</p>
        </div>
      </Section>

      {/* SOIL TEMPERATURE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{soilTemperature.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{soilTemperature.intro}</p>
          <p className="mt-4 text-ink-soft">Mulch:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {soilTemperature.mulchFunctions.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 leading-relaxed text-primary-dark">
            {soilTemperature.diagnosticPoint}
          </p>
        </div>
      </Section>

      {/* SCIENCE VS APPLICATION */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">Science Is Universal — Application Is Local</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-relaxed text-ink-soft">{scienceApplication.intro}</p>
          <div className="mt-8">
            <ScienceApplicationNote science={scienceApplication.science} application={scienceApplication.application} />
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{scienceApplication.closing}</p>
        </div>
      </Section>

      {/* SOIL RESTORATION IS NOT SOIL REPLACEMENT */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{notReplacement.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{notReplacement.intro}</p>
          <div className="mt-6 flex flex-col gap-2">
            {notReplacement.substitutions.map((s) => (
              <div key={s.weak} className="flex items-center gap-3 text-sm">
                <span className="flex-1 rounded-lg border border-border bg-card px-3 py-2 text-ink-soft">{s.weak}</span>
                <span aria-hidden="true" className="text-ink-soft/50">→</span>
                <span className="flex-1 rounded-lg border border-accent/30 bg-accent/5 px-3 py-2 text-ink-soft">{s.substitute}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {notReplacement.question}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{notReplacement.sequence}</p>
          <p className="mt-4 leading-relaxed text-primary-dark font-medium">{notReplacement.objective}</p>
        </div>
      </Section>

      {/* WHAT A FUNCTIONING PQNK SOIL BEGINS TO DO */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{returningFunction.title}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {returningFunction.changes.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {c}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-center text-lg font-medium text-primary-dark">{returningFunction.closing}</p>
        </div>
      </Section>

      {/* SOIL RECOVERY MUST BE JUDGED BY FUNCTION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{judgedByFunction.title}</h2>
          <ul className="mt-4 flex flex-col gap-1">
            {judgedByFunction.questions.map((q) => (
              <li key={q} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {q}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {judgedByFunction.closing}
          </p>
        </div>
      </Section>

      {/* SOIL IS FOUNDATIONAL BUT NOT THE WHOLE SYSTEM */}
      <Section muted>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{foundationalNotWhole.title}</h2>
          <div className="mt-10">
            <LivingSystemDiagram components={coreComponents} />
          </div>
          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-1">
            {foundationalNotWhole.points.map((p) => (
              <li key={p} className="text-ink-soft">
                {p}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-xl text-center text-lg font-medium text-primary-dark">
            {foundationalNotWhole.closing}
          </p>
        </div>
      </Section>

      {/* CENTRAL CLOSING PROPOSITION */}
      <Section className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <div className="absolute inset-0 bg-primary-dark" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-cream/95">{closingProposition.statement}</p>
            <div className="mt-8 flex flex-col gap-1 border-t border-cream/15 pt-6 text-cream/90">
              <p>{closingProposition.questionNot}</p>
              <p className="text-lg font-semibold text-accent-light">{closingProposition.questionBut}</p>
            </div>
          </div>
        </div>
      </Section>

      <RelatedKnowledgeModule domainSlug="soil" />

      {/* SCIENCE PATHWAY */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">Continue the Science</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <FutureTopicCard
              name="Plants"
              tagline="The Architects of the Soil Ecosystem"
              summary="How plants capture atmospheric carbon and solar energy, build roots and construct their own production environment."
            />
            <FutureTopicCard
              name="Water"
              tagline="The Carrier, Climate Regulator and Life Medium"
              summary="How water moves through the soil-plant system and connects the field to the larger water cycle."
            />
            <FutureTopicCard
              name="Biodiversity"
              tagline="The Biological Stability Network"
              summary="How biological diversity above and below ground creates functional stability."
            />
            <Link
              href="/science/transition"
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">Transition</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">
                From Degraded Soil to a Sustained Closed Loop
              </p>
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

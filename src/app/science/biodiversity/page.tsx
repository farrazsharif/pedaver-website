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
  productionInfrastructure,
  ecosystemBeforeCrop,
  threeZones,
  rootDiversity,
  microbialFungal,
  functionalRedundancy,
  biologicalRegulation,
  predatorHabitat,
  disease,
  weeds,
  bareSoil,
  diversityThroughTime,
  decomposition,
  soilArchitecture,
  waterRelationship,
  microclimate,
  nutrientAcquisition,
  nutrientDensityDiversity,
  resilience,
  habitatPrinciples,
  habitatClosing,
  notDisorder,
  duringTransition,
  returningSigns,
  diagnosticHierarchy,
  notPurchasedInput,
  livingSystemLoop,
  stabilityEngine,
  scienceApplication,
  fourComponentSynthesis,
  futurePathways,
  futurePathwaysNote,
  closingProposition,
} from "@/lib/content/scienceBiodiversity";

export const metadata: Metadata = buildMetadata({
  title: "PQNK Biodiversity Science — The Stability Engine of the Living Production System | Pedaver",
  description:
    "Why biodiversity is production infrastructure, not conservation around agriculture: root and microbial diversity, biological pest regulation, weeds as rescue workers, nutrient-acquisition pathways and the four-component living system.",
  path: "/science/biodiversity",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: hero.title,
  description:
    "Why biodiversity is production infrastructure, not conservation around agriculture: root and microbial diversity, biological pest regulation, weeds as rescue workers, nutrient-acquisition pathways and the four-component living system.",
  url: `${SITE_URL}/science/biodiversity`,
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

export default function ScienceBiodiversityPage() {
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

      {/* PRODUCTION INFRASTRUCTURE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{productionInfrastructure.title}</h2>
          {productionInfrastructure.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
          <p className="mt-4 text-center text-lg font-medium text-primary-dark">{productionInfrastructure.statement}</p>
        </div>
      </Section>

      {/* ECOSYSTEM BEFORE CROP */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{ecosystemBeforeCrop.title}</h2>
          {ecosystemBeforeCrop.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* THREE ZONES */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{threeZones.title}</h2>
          <p className="mt-4 text-ink-soft">{threeZones.intro}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {threeZones.zones.map((z) => (
              <div key={z.name} className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary-dark">{z.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{z.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{threeZones.exchangeNote}</p>
        </div>
      </Section>

      {/* ROOT DIVERSITY */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{rootDiversity.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{rootDiversity.intro}</p>
          <p className="mt-4 text-center text-lg font-medium text-primary-dark">{rootDiversity.proposition}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {rootDiversity.rootTypes.map((t) => (
              <div key={t.name} className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary-dark">{t.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {rootDiversity.engineeringStatement}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{rootDiversity.retentionNote}</p>
          <p className="mt-4 text-sm text-ink-soft">{rootDiversity.caveat}</p>
        </div>
      </Section>

      {/* MICROBIAL AND FUNGAL DIVERSITY */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{microbialFungal.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{microbialFungal.intro}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {microbialFungal.proposition}
          </p>

          <h3 className="mt-8 text-lg font-bold text-primary-dark">{microbialFungal.mycorrhizae.title}</h3>
          <p className="mt-3 leading-relaxed text-ink-soft">{microbialFungal.mycorrhizae.body}</p>
          <p className="mt-3 text-sm text-ink-soft">{microbialFungal.mycorrhizae.notInputNote}</p>
        </div>
      </Section>

      {/* FUNCTIONAL REDUNDANCY */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{functionalRedundancy.title}</h2>
          {functionalRedundancy.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* BIOLOGICAL REGULATION */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{biologicalRegulation.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-soft/70">Conventional Response</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{biologicalRegulation.contrast.conventional}</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">PQNK Model</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{biologicalRegulation.contrast.pqnk}</p>
            </div>
          </div>

          <p className="mt-6 text-ink-soft">Regulatory relationships may involve:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {biologicalRegulation.regulatoryOrganisms.map((o) => (
              <span key={o} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {o}
              </span>
            ))}
          </div>

          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {biologicalRegulation.formulation}
          </p>

          <h3 className="mt-10 text-lg font-bold text-primary-dark">{biologicalRegulation.insectPresenceTitle}</h3>
          <p className="mt-3 leading-relaxed text-ink-soft">{biologicalRegulation.insectPresenceBody}</p>

          <div className="mt-6">
            <FlowSequence steps={biologicalRegulation.decisionHierarchy} />
          </div>

          <p className="mt-6 text-sm text-ink-soft">{biologicalRegulation.transitionCaveat}</p>
        </div>
      </Section>

      {/* PREDATOR HABITAT */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{predatorHabitat.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{predatorHabitat.body}</p>
          <p className="mt-4 text-center text-lg font-medium text-primary-dark">{predatorHabitat.statement}</p>
          <p className="mt-4 text-sm text-ink-soft">{predatorHabitat.caveat}</p>
        </div>
      </Section>

      {/* DISEASE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{disease.title}</h2>
          <p className="mt-4 text-ink-soft">{disease.intro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {disease.factors.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">{disease.boundary}</p>
        </div>
      </Section>

      {/* WEEDS */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{weeds.heading}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{weeds.intro}</p>
          <p className="mt-4 text-center text-lg font-medium text-primary-dark">"{weeds.question}"</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{weeds.body}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{weeds.narrowLeaf.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{weeds.narrowLeaf.body}</p>
              <ul className="mt-3 flex flex-col gap-1">
                {weeds.narrowLeaf.functions.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-ink-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{weeds.broadleaf.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{weeds.broadleaf.body}</p>
              <ul className="mt-3 flex flex-col gap-1">
                {weeds.broadleaf.functions.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-ink-soft">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center leading-relaxed text-primary-dark">
            {weeds.keyFormulation}
          </p>
          <p className="mt-6 text-lg font-bold text-primary-dark">{weeds.guardrail}</p>
          <p className="mt-3 leading-relaxed text-ink-soft">{weeds.managementNote}</p>
          <p className="mt-4 text-center font-medium text-primary-dark">{weeds.messageNote}</p>
          <p className="mt-4 text-sm text-ink-soft">{weeds.scopeCaveat}</p>
        </div>
      </Section>

      {/* BARE SOIL */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{bareSoil.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{bareSoil.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{bareSoil.occupationNote}</p>
          <p className="mt-6 text-center text-lg font-bold uppercase tracking-wide text-primary-dark">{bareSoil.objective}</p>
        </div>
      </Section>

      {/* DIVERSITY THROUGH TIME */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{diversityThroughTime.title}</h2>
          <p className="mt-4 text-ink-soft">{diversityThroughTime.intro}</p>

          <div className="mt-6">
            <FlowSequence steps={diversityThroughTime.sequence} />
          </div>
          <p className="mt-4 text-center text-sm text-ink-soft">{diversityThroughTime.cropInCropNote}</p>

          <p className="mt-6 leading-relaxed text-ink-soft">{diversityThroughTime.continuityBody}</p>

          <h3 className="mt-8 text-lg font-bold text-primary-dark">{diversityThroughTime.inheritance.title}</h3>
          <p className="mt-3 leading-relaxed text-ink-soft">{diversityThroughTime.inheritance.body}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {diversityThroughTime.inheritance.statement}
          </p>
          <p className="mt-3 text-sm text-ink-soft">{diversityThroughTime.inheritance.disturbanceLink}</p>

          <p className="mt-6 text-sm text-ink-soft">{diversityThroughTime.cropInCropCaveat}</p>
        </div>
      </Section>

      {/* DECOMPOSITION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{decomposition.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{decomposition.body}</p>
          <p className="mt-4 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">
            {decomposition.distinction}
          </p>
        </div>
      </Section>

      {/* SOIL ARCHITECTURE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{soilArchitecture.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{soilArchitecture.body}</p>
          <p className="mt-4 text-ink-soft">This connects with:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {soilArchitecture.connectedTo.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {c}
              </span>
            ))}
          </div>
          <div className="mt-6">
            <FlowSequence steps={soilArchitecture.feedbackLoop} />
          </div>
        </div>
      </Section>

      {/* WATER RELATIONSHIP */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterRelationship.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterRelationship.body}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {waterRelationship.statement}
          </p>
          <Link href={waterRelationship.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {waterRelationship.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* MICROCLIMATE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{microclimate.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{microclimate.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{microclimate.boundary}</p>
          <p className="mt-4 text-sm text-ink-soft">{microclimate.scopeNote}</p>
        </div>
      </Section>

      {/* NUTRIENT ACQUISITION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{nutrientAcquisition.title}</h2>
          <p className="mt-4 text-ink-soft">{nutrientAcquisition.intro}</p>
          <p className="mt-4 text-ink-soft">Biological complexity broadens acquisition through:</p>
          <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {nutrientAcquisition.pathways.map((p) => (
              <li key={p} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{nutrientAcquisition.objective}</p>
          <p className="mt-4 text-sm text-ink-soft">{nutrientAcquisition.caveat}</p>
        </div>
      </Section>

      {/* NUTRIENT DENSITY VS DIVERSITY */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{nutrientDensityDiversity.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{nutrientDensityDiversity.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{nutrientDensityDiversity.mechanismNote}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{nutrientDensityDiversity.density.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{nutrientDensityDiversity.density.body}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{nutrientDensityDiversity.diversity.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{nutrientDensityDiversity.diversity.body}</p>
            </div>
          </div>

          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {nutrientDensityDiversity.evidenceBoundary}
          </p>
          <Link
            href={nutrientDensityDiversity.validationLinkHref}
            className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            {nutrientDensityDiversity.validationLinkLabel} →
          </Link>
        </div>
      </Section>

      {/* RESILIENCE AND STABILITY */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{resilience.title}</h2>
          <p className="mt-4 text-center text-lg font-medium text-primary-dark">{resilience.body}</p>

          <h3 className="mt-8 text-lg font-bold text-primary-dark">{resilience.stabilityTitle}</h3>
          <ul className="mt-4 flex flex-col gap-1">
            {resilience.dynamism.map((d) => (
              <li key={d} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-4 leading-relaxed text-ink-soft">{resilience.stabilityDefinition}</p>
          <p className="mt-4 text-center text-lg font-bold text-primary-dark">{resilience.statement}</p>
        </div>
      </Section>

      {/* FOUR PRINCIPLES */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">The Four PQNK Principles Are Biodiversity Habitat Rules</h2>
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

      {/* MAXIMUM BIODIVERSITY ≠ DISORDER */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{notDisorder.title}</h2>
          <p className="mt-4 text-center text-lg font-medium text-primary-dark">{notDisorder.definition}</p>
          <p className="mt-4 text-ink-soft">{notDisorder.notAbandonment}</p>
          <p className="mt-4 text-ink-soft">The Production Manager still manages:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {notDisorder.managementList.map((m) => (
              <span key={m} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {m}
              </span>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {notDisorder.statement}
          </p>
        </div>
      </Section>

      {/* BIODIVERSITY DURING TRANSITION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{duringTransition.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{duringTransition.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{duringTransition.interventionNote}</p>
          <p className="mt-4 text-center text-lg font-medium text-primary-dark">"{duringTransition.question}"</p>
          <Link href={duringTransition.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {duringTransition.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* SIGNS OF RETURNING BIODIVERSITY */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{returningSigns.title}</h2>
          <p className="mt-4 text-ink-soft">{returningSigns.intro}</p>
          <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {returningSigns.signs.map((s) => (
              <li key={s} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {returningSigns.closing}
          </p>
        </div>
      </Section>

      {/* DIAGNOSTIC HIERARCHY */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{diagnosticHierarchy.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{diagnosticHierarchy.intro}</p>
          <div className="mt-8">
            <StageProgression stages={diagnosticHierarchy.sequence.map((s, i) => ({ number: i + 1, name: s.label, body: s.body }))} />
          </div>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {diagnosticHierarchy.centralStatement}
          </p>
        </div>
      </Section>

      {/* NOT A PURCHASED INPUT */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{notPurchasedInput.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{notPurchasedInput.body}</p>
          <p className="mt-4 text-lg font-medium text-primary-dark">{notPurchasedInput.distinction}</p>
          <p className="mt-4 text-center text-lg font-bold text-primary-dark">"{notPurchasedInput.firstQuestion}"</p>
          <p className="mt-4 text-center text-ink-soft">{notPurchasedInput.closing}</p>
        </div>
      </Section>

      {/* LIVING SYSTEM LOOP */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{livingSystemLoop.title}</h2>
          <div className="mt-10">
            <ProductionLoop steps={livingSystemLoop.steps} closingLabel={livingSystemLoop.closingLabel} />
          </div>
        </div>
      </Section>

      {/* STABILITY ENGINE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{stabilityEngine.title}</h2>
          <div className="mt-6 flex flex-col gap-2 text-ink-soft">
            <p>{stabilityEngine.roles.soil}</p>
            <p>{stabilityEngine.roles.plants}</p>
            <p>{stabilityEngine.roles.water}</p>
            <p className="font-medium text-primary-dark">{stabilityEngine.roles.biodiversity}</p>
          </div>
          <p className="mt-6 text-ink-soft">Biodiversity simultaneously participates in:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {stabilityEngine.functions.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-bold text-primary-dark">{stabilityEngine.conclusion}</p>
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

      {/* FOUR COMPONENT SYNTHESIS */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{fourComponentSynthesis.title}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {fourComponentSynthesis.components.map((c) => (
              <div key={c.name} className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary-dark">{c.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{c.role}</p>
              </div>
            ))}
          </div>
          <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-1">
            {fourComponentSynthesis.dependencies.map((d) => (
              <li key={d} className="text-ink-soft">
                {d}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-primary-dark">
            {fourComponentSynthesis.statement}
          </p>
        </div>
      </Section>

      {/* FUTURE SCIENCE PATHWAYS */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">From Components to Production Functions</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-ink-soft">{futurePathwaysNote}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {futurePathways.map((t) => (
              <FutureTopicCard key={t.slug} name={t.name} tagline={t.tagline} summary={t.summary} />
            ))}
          </div>
        </div>
      </Section>

      {/* CLOSING PROPOSITION */}
      <Section className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <div className="absolute inset-0 bg-primary-dark" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="leading-relaxed text-cream/95">{closingProposition.intro}</p>
            <p className="mt-4 text-lg font-semibold text-accent-light">{closingProposition.question}</p>

            <div className="mt-8 flex flex-col gap-1 border-t border-cream/15 pt-6 text-cream/90">
              {closingProposition.relationships.map((r) => (
                <p key={r}>{r}</p>
              ))}
            </div>

            <p className="mt-8 text-lg font-medium text-cream/95">{closingProposition.fieldStatement}</p>

            <p className="mt-8 border-t border-cream/15 pt-6 text-lg font-semibold text-accent-light">
              {closingProposition.finalProposition}
            </p>
            <p className="mt-4 text-cream/80">{closingProposition.closingMovement}</p>
          </div>
        </div>
      </Section>

      <RelatedKnowledgeModule domainSlug="biodiversity" />

      {/* CONTINUE THE SCIENCE */}
      <Section muted>
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

            <div className="flex flex-col rounded-2xl border-2 border-primary bg-primary/5 p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">Current page</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark">Biodiversity</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">The Stability Engine of the Living Production System</p>
            </div>

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

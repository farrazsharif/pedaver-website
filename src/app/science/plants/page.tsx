import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";
import StageProgression from "@/components/science/StageProgression";
import ScienceApplicationNote from "@/components/science/ScienceApplicationNote";
import FutureTopicCard from "@/components/science/FutureTopicCard";
import ProductionLoop from "@/components/science/ProductionLoop";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  hero,
  plantMass,
  photosynthesis,
  twoWorlds,
  roots,
  exudates,
  rhizosphere,
  mycorrhizae,
  nutrientAccess,
  proportion,
  nutrientDenseFood,
  densityVsDiversity,
  notFertilizer,
  nitrogen,
  waterTransport,
  transpiration,
  waterCycleParticipation,
  canopy,
  residue,
  cropAfterCrop,
  biodiversityProtection,
  plantHealth,
  habitatPrinciples,
  scienceApplication,
  soilPlantReciprocity,
  productionLoop,
  productionLoopClosing,
  centralProposition,
} from "@/lib/content/sciencePlants";

export const metadata: Metadata = buildMetadata({
  title: "PQNK Plant Science — The Biological Production Engine | Pedaver",
  description:
    "Why the plant is an active biological engineer, not a passive recipient of inputs: photosynthesis, roots, the rhizosphere, mycorrhizae, nutrient acquisition and how plant metabolism connects production to food composition.",
  path: "/science/plants",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: hero.title,
  description:
    "Why the plant is an active biological engineer, not a passive recipient of inputs: photosynthesis, roots, the rhizosphere, mycorrhizae, nutrient acquisition and how plant metabolism connects production to food composition.",
  url: `${SITE_URL}/science/plants`,
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

export default function SciencePlantsPage() {
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

      {/* WHERE PLANT MASS COMES FROM */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{plantMass.title}</h2>
          {plantMass.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
          <p className="mt-4 text-lg font-medium text-primary-dark">{plantMass.proposition}</p>

          <div className="mt-8 rounded-xl border border-border bg-card p-6">
            <p className="text-sm text-ink-soft">{plantMass.figures.intro}</p>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              {plantMass.figures.items.map((f) => (
                <div key={f.label}>
                  <p className="text-2xl font-extrabold text-primary">{f.value}</p>
                  <p className="mt-1 text-xs text-ink-soft">{f.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-ink-soft">{plantMass.figures.note}</p>
          </div>
          <Link href={plantMass.paperLinkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {plantMass.paperLinkLabel} →
          </Link>
        </div>
      </Section>

      {/* PHOTOSYNTHESIS */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{photosynthesis.title}</h2>
          {photosynthesis.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{photosynthesis.proposition}</p>
        </div>
      </Section>

      {/* THE PLANT CONNECTS TWO WORLDS */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{twoWorlds.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{twoWorlds.canopyIntro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{twoWorlds.rootIntro}</p>

          <div className="mt-8 flex flex-col gap-6">
            <FlowSequence steps={twoWorlds.flowOne} />
            <FlowSequence steps={twoWorlds.flowTwo} />
          </div>

          <p className="mt-8 text-center text-lg font-medium text-primary-dark">{twoWorlds.proposition}</p>
        </div>
      </Section>

      {/* ROOTS ARE NOT DRINKING STRAWS */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{roots.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{roots.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{roots.retentionNote}</p>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {roots.proposition}
          </p>
        </div>
      </Section>

      {/* ROOT EXUDATES */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{exudates.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{exudates.body}</p>
          <p className="mt-4 text-lg font-medium text-primary-dark">{exudates.reversal}</p>
          <div className="mt-8">
            <FlowSequence steps={exudates.flow} />
          </div>
        </div>
      </Section>

      {/* RHIZOSPHERE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{rhizosphere.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{rhizosphere.body}</p>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{rhizosphere.proposition}</p>
        </div>
      </Section>

      {/* MYCORRHIZAE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{mycorrhizae.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{mycorrhizae.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{mycorrhizae.disturbanceLink}</p>
          <p className="mt-4 text-lg font-medium text-primary-dark">{mycorrhizae.proposition}</p>
          <p className="mt-4 text-sm text-ink-soft">{mycorrhizae.caveat}</p>
        </div>
      </Section>

      {/* NUTRIENT ACQUISITION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{nutrientAccess.title}</h2>
          <div className="mt-4 flex items-center justify-center gap-3 text-center text-sm font-semibold text-primary-dark">
            <span className="rounded-full border border-border bg-card px-3 py-1.5">{nutrientAccess.distinction.left}</span>
            <span aria-hidden="true">≠</span>
            <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5">{nutrientAccess.distinction.right}</span>
          </div>
          <p className="mt-6 leading-relaxed text-ink-soft">{nutrientAccess.body}</p>
        </div>
      </Section>

      {/* PROPORTION MATTERS */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{proportion.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{proportion.body}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {proportion.approvedFormulation}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{proportion.closing}</p>
        </div>
      </Section>

      {/* NUTRIENT-DENSE AND DIVERSE FOOD */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{nutrientDenseFood.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{nutrientDenseFood.intro}</p>

          <div className="mt-8 flex flex-col items-stretch gap-2">
            {nutrientDenseFood.chain.map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-full max-w-md rounded-lg border border-border bg-card px-5 py-3 text-center text-sm font-semibold text-primary-dark">
                  {step}
                </div>
                {i < nutrientDenseFood.chain.length - 1 && (
                  <svg width="16" height="20" viewBox="0 0 16 20" className="my-1 text-ink-soft/50" aria-hidden="true">
                    <path d="M8 0 L8 14 M2 9 L8 15 L14 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-lg font-medium text-primary-dark">{nutrientDenseFood.bridge}</p>
          <p className="mt-4 rounded-xl border border-border bg-card p-5 leading-relaxed text-ink-soft">
            {nutrientDenseFood.evidenceBoundary}
          </p>
        </div>
      </Section>

      {/* DENSITY VS DIVERSITY */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{densityVsDiversity.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{densityVsDiversity.density.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{densityVsDiversity.density.body}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{densityVsDiversity.diversity.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{densityVsDiversity.diversity.body}</p>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-ink-soft">{densityVsDiversity.body}</p>

          <div className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5">
            {densityVsDiversity.evidenceChain.map((line, i) => (
              <p key={i} className="text-center font-medium text-primary-dark">
                {line}
              </p>
            ))}
          </div>
          <Link href={densityVsDiversity.validationLinkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {densityVsDiversity.validationLinkLabel} →
          </Link>
        </div>
      </Section>

      {/* PLANT NUTRITION IS NOT FERTILIZER NUTRITION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{notFertilizer.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{notFertilizer.fertilization.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{notFertilizer.fertilization.body}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{notFertilizer.plantNutrition.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{notFertilizer.plantNutrition.body}</p>
            </div>
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{notFertilizer.proposition}</p>
          <p className="mt-4 rounded-xl border border-border bg-card p-5 leading-relaxed text-ink-soft">
            {notFertilizer.closing}
          </p>
        </div>
      </Section>

      {/* NITROGEN */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{nitrogen.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{nitrogen.body}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {nitrogen.approvedFormulation}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{nitrogen.closing}</p>
        </div>
      </Section>

      {/* WATER IS THE TRANSPORT MEDIUM */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterTransport.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterTransport.body}</p>
          <p className="mt-4 text-center text-lg font-medium text-primary-dark">{waterTransport.requirement}</p>
          <Link href={waterTransport.resourceLinkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {waterTransport.resourceLinkLabel} →
          </Link>
        </div>
      </Section>

      {/* TRANSPIRATION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{transpiration.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{transpiration.body}</p>
          <div className="mt-6 flex items-center justify-center gap-3 text-center text-sm font-semibold text-primary-dark">
            <span className="rounded-full border border-border bg-card px-3 py-1.5">{transpiration.distinction.left}</span>
            <span aria-hidden="true">≠</span>
            <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5">{transpiration.distinction.right}</span>
          </div>
          <p className="mt-4 text-sm text-ink-soft">{transpiration.precisionNote}</p>
        </div>
      </Section>

      {/* PLANTS PARTICIPATE IN THE WATER CYCLE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterCycleParticipation.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterCycleParticipation.body}</p>
          <p className="mt-4 text-sm text-ink-soft">{waterCycleParticipation.pointerNote}</p>
        </div>
      </Section>

      {/* CANOPY */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{canopy.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{canopy.body}</p>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{canopy.proposition}</p>
        </div>
      </Section>

      {/* CROP RESIDUE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{residue.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{residue.body}</p>
          <div className="mt-8">
            <FlowSequence steps={residue.flow} />
          </div>
          <p className="mt-6 text-sm text-ink-soft">{residue.closedLoopNote}</p>
        </div>
      </Section>

      {/* CROP AFTER CROP */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{cropAfterCrop.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{cropAfterCrop.body}</p>
          <p className="mt-4 text-sm text-ink-soft">{cropAfterCrop.caveat}</p>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{cropAfterCrop.closing}</p>
        </div>
      </Section>

      {/* BIODIVERSITY AND PROTECTION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{biodiversityProtection.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{biodiversityProtection.body}</p>
          <p className="mt-4 text-sm text-ink-soft">{biodiversityProtection.caveat}</p>
        </div>
      </Section>

      {/* PLANT HEALTH IS A SYSTEM OUTCOME */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{plantHealth.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{plantHealth.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{plantHealth.wiltingIntro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{plantHealth.wiltingCauses}</p>

          <div className="mt-8">
            <StageProgression stages={plantHealth.sequence.map((s, i) => ({ number: i + 1, name: s.label, body: s.body }))} />
          </div>
        </div>
      </Section>

      {/* FOUR PRINCIPLES */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">The Four Principles Create the Plant's Habitat</h2>
          <div className="mx-auto mt-6 grid max-w-2xl gap-4 text-start sm:grid-cols-2">
            {habitatPrinciples.map((p) => (
              <div key={p.name}>
                <p className="font-bold text-primary-dark">{p.name}</p>
                <p className="text-sm text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* SCIENCE VS APPLICATION */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">Science vs. Field Application</h2>
          <div className="mt-8">
            <ScienceApplicationNote science={scienceApplication.science} application={scienceApplication.application} />
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{scienceApplication.closing}</p>
        </div>
      </Section>

      {/* SOIL-PLANT RECIPROCITY */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{soilPlantReciprocity.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{soilPlantReciprocity.body}</p>
          <div className="mt-6 flex flex-col gap-2 text-center">
            <p className="rounded-lg border border-border bg-card p-4 font-medium text-primary-dark">{soilPlantReciprocity.relationship.left}</p>
            <p className="rounded-lg border border-border bg-card p-4 font-medium text-primary-dark">{soilPlantReciprocity.relationship.right}</p>
          </div>
          <p className="mt-4 text-center text-lg font-medium text-primary-dark">{soilPlantReciprocity.closing}</p>
          <div className="mt-6 text-center">
            <Link href={soilPlantReciprocity.soilLinkHref} className="text-sm font-semibold text-primary underline underline-offset-4">
              {soilPlantReciprocity.soilLinkLabel} →
            </Link>
          </div>
        </div>
      </Section>

      {/* THE BIOLOGICAL PRODUCTION ENGINE — CENTRAL VISUAL */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">The Biological Production Engine</h2>
          <div className="mt-10">
            <ProductionLoop steps={productionLoop} closingLabel={productionLoopClosing} />
          </div>
        </div>
      </Section>

      {/* CENTRAL PROPOSITION */}
      <Section className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <div className="absolute inset-0 bg-primary-dark" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-cream/95">{centralProposition.intro}</p>
            <div className="mt-8 flex flex-col gap-1 border-t border-cream/15 pt-6 text-cream/90">
              {centralProposition.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <p className="mt-8 text-lg font-semibold text-accent-light">{centralProposition.final}</p>
          </div>
        </div>
      </Section>

      {/* CONNECTION TO THE WIDER PQNK SCIENCE SYSTEM */}
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

            <div className="flex flex-col rounded-2xl border-2 border-primary bg-primary/5 p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">Current page</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark">Plants</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">The Biological Production Engine</p>
            </div>

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

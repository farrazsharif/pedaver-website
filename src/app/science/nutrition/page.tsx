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
  biologicalProcess,
  presenceVsAvailability,
  mineralReservoir,
  mineralFunction,
  rootsAcquisition,
  rhizosphereExchange,
  plantsFeedBiology,
  microbialTransformation,
  fungiExploration,
  waterCarrier,
  aeration,
  soilStructureAccess,
  decompositionRecycling,
  rootRetentionNutrition,
  nitrogen,
  biodiversityPathways,
  proportionAndDemand,
  deficiencySymptom,
  substitutionVsSupplementation,
  transitionalNP,
  withdrawalGuardrail,
  photosynthesisReprise,
  fourComponentConvergence,
  acquisitionToMetabolism,
  plantManufacturesFood,
  densityDiversity,
  nutritionCausalChain,
  scienceEvidenceValidation,
  sensoryOutcomes,
  nutritionAndHealth,
  nutritionAndCropProtection,
  nutritionAndWater,
  nutritionAndBiodiversity,
  habitatPrinciples,
  scienceApplication,
  productionManagerWatches,
  functionalRecovery,
  centralProposition,
  transitionVisual,
  closedLoopNotIsolation,
  livingNutritionLoop,
  closingProposition,
} from "@/lib/content/scienceNutrition";

export const metadata: Metadata = buildMetadata({
  title: "PQNK Nutrition Science — From Mineral Presence to Biological Availability | Pedaver",
  description:
    "Why plant nutrition is a biological process rather than a fertilizer program: nutrient presence vs. availability, roots and rhizosphere, microbial and fungal transformation, agrochemical effects on soil biology, and the causal chain from living soil to nutrient-dense produce.",
  path: "/science/nutrition",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: hero.title,
  description:
    "Why plant nutrition is a biological process rather than a fertilizer program: nutrient presence vs. availability, roots and rhizosphere, microbial and fungal transformation, agrochemical effects on soil biology, and the causal chain from living soil to nutrient-dense produce.",
  url: `${SITE_URL}/science/nutrition`,
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

export default function ScienceNutritionPage() {
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

      {/* PLANT NUTRITION IS A BIOLOGICAL PROCESS */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{biologicalProcess.title}</h2>
          {biologicalProcess.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* NUTRIENT PRESENCE VS AVAILABILITY */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{presenceVsAvailability.title}</h2>
          <p className="mt-4 text-ink-soft">{presenceVsAvailability.intro}</p>
          <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {presenceVsAvailability.factors.map((f) => (
              <li key={f} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {presenceVsAvailability.statement}
          </p>
        </div>
      </Section>

      {/* SOIL AS MINERAL RESERVOIR */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{mineralReservoir.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{mineralReservoir.body}</p>
          <p className="mt-4 text-center text-lg font-medium text-primary-dark">{mineralReservoir.statement}</p>
          <p className="mt-4 text-ink-soft">PQNK seeks to restore:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {mineralReservoir.restoreList.map((r) => (
              <span key={r} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {r}
              </span>
            ))}
          </div>
          <p className="mt-4 leading-relaxed text-ink-soft">{mineralReservoir.objective}</p>
        </div>
      </Section>

      {/* MINERAL FUNCTION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{mineralFunction.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{mineralFunction.body}</p>
          <Link href={mineralFunction.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {mineralFunction.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* ROOTS AS ACQUISITION ORGANS */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{rootsAcquisition.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{rootsAcquisition.intro}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {rootsAcquisition.statement}
          </p>
          <p className="mt-4 text-sm text-ink-soft">{rootsAcquisition.restrictionNote}</p>
        </div>
      </Section>

      {/* RHIZOSPHERE EXCHANGE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{rhizosphereExchange.title}</h2>
          <p className="mt-4 text-ink-soft">{rhizosphereExchange.intro}</p>
          <div className="mt-6 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-ink-soft/60 line-through">{rhizosphereExchange.simplePath}</p>
            <p className="text-lg font-bold text-primary-dark">{rhizosphereExchange.actualPath}</p>
          </div>
          <p className="mt-6 text-ink-soft">This exchange involves:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {rhizosphereExchange.participants.map((p) => (
              <span key={p} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {p}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* PLANTS FEED BIOLOGY */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{plantsFeedBiology.title}</h2>
          <div className="mt-8">
            <VerticalChain steps={[...plantsFeedBiology.loop, plantsFeedBiology.loopClosingLabel]} />
          </div>
          <div className="mt-8 flex flex-col gap-1 text-center text-ink-soft">
            {plantsFeedBiology.reciprocalLines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </div>
      </Section>

      {/* MICROORGANISMS TRANSFORM NUTRIENTS + AGROCHEMICAL/WEEDICIDE */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{microbialTransformation.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{microbialTransformation.intro}</p>

          <h3 className="mt-10 text-lg font-bold text-primary-dark">{microbialTransformation.damageHeading}</h3>
          <p className="mt-3 leading-relaxed text-ink-soft">{microbialTransformation.damageIntro}</p>

          <h3 className="mt-8 text-lg font-bold text-primary-dark">{microbialTransformation.weedicideHeading}</h3>
          <p className="mt-3 leading-relaxed text-ink-soft">{microbialTransformation.weedicideIntro}</p>
          <ul className="mt-4 flex flex-col gap-2">
            {microbialTransformation.pathways.map((p, i) => (
              <li key={i} className="flex gap-3 text-ink-soft">
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-card border border-border text-xs font-bold text-primary-dark">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">{microbialTransformation.variabilityNote}</p>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {microbialTransformation.formulation}
          </p>

          <h3 className="mt-10 text-lg font-bold text-primary-dark">{microbialTransformation.whyWeedsHeading}</h3>
          <p className="mt-3 leading-relaxed text-ink-soft">{microbialTransformation.whyWeedsBody}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-soft/70">Conventional Question</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">"{microbialTransformation.questionContrast.conventional}"</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">PQNK Question</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">"{microbialTransformation.questionContrast.pqnk}"</p>
            </div>
          </div>

          <Link
            href={microbialTransformation.biodiversityLinkHref}
            className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            {microbialTransformation.biodiversityLinkLabel} →
          </Link>

          <p className="mt-6 text-sm leading-relaxed text-ink-soft">{microbialTransformation.transitionGuardrail}</p>

          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-center font-medium text-primary-dark">
            {microbialTransformation.closingStatement}
          </p>
        </div>
      </Section>

      {/* FUNGI */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{fungiExploration.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{fungiExploration.body}</p>
          <p className="mt-4 text-sm text-ink-soft">{fungiExploration.notInputNote}</p>
          <p className="mt-2 text-sm text-ink-soft">{fungiExploration.disturbanceNote}</p>
        </div>
      </Section>

      {/* WATER CARRIER */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterCarrier.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{waterCarrier.body}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {waterCarrier.statement}
          </p>
          <Link href={waterCarrier.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {waterCarrier.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* AERATION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{aeration.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{aeration.body}</p>
          <p className="mt-4 text-sm text-ink-soft">{aeration.principleLink}</p>
          <p className="mt-4 text-center text-lg font-medium text-primary-dark">{aeration.statement}</p>
        </div>
      </Section>

      {/* SOIL STRUCTURE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{soilStructureAccess.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {soilStructureAccess.factors.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">
            {soilStructureAccess.statement}
          </p>
        </div>
      </Section>

      {/* DECOMPOSITION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{decompositionRecycling.title}</h2>
          <div className="mt-6">
            <FlowSequence steps={decompositionRecycling.chain} />
          </div>
          <p className="mt-6 text-sm text-ink-soft">{decompositionRecycling.caution}</p>
        </div>
      </Section>

      {/* ROOT RETENTION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{rootRetentionNutrition.title}</h2>
          <p className="mt-4 text-ink-soft">{rootRetentionNutrition.intro}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-center text-ink-soft">{rootRetentionNutrition.physical}</div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-center text-ink-soft">{rootRetentionNutrition.nutritional}</div>
          </div>
        </div>
      </Section>

      {/* NITROGEN */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{nitrogen.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{nitrogen.body}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {nitrogen.statement}
          </p>
          <p className="mt-4 text-sm text-ink-soft">{nitrogen.caveat}</p>
        </div>
      </Section>

      {/* BIODIVERSITY PATHWAYS */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{biodiversityPathways.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{biodiversityPathways.body}</p>
          <Link href={biodiversityPathways.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {biodiversityPathways.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* PROPORTION AND DEMAND */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{proportionAndDemand.title}</h2>
          <p className="mt-4 text-ink-soft">{proportionAndDemand.proportionIntro}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {proportionAndDemand.approvedFormulation}
          </p>
          <p className="mt-6 text-ink-soft">{proportionAndDemand.demandIntro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {proportionAndDemand.demandStages.map((d) => (
              <span key={d} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {d}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-soft">{proportionAndDemand.demandNote}</p>
        </div>
      </Section>

      {/* DEFICIENCY SYMPTOM + DIAGNOSTIC HIERARCHY */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{deficiencySymptom.title}</h2>
          <p className="mt-4 text-ink-soft">{deficiencySymptom.intro}</p>
          <p className="mt-4 text-ink-soft">Possible causes include:</p>
          <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {deficiencySymptom.causes.map((c) => (
              <li key={c} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <StageProgression stages={deficiencySymptom.sequence.map((s, i) => ({ number: i + 1, name: s.label, body: s.body }))} />
          </div>
        </div>
      </Section>

      {/* SUBSTITUTION VS SUPPLEMENTATION */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{substitutionVsSupplementation.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{substitutionVsSupplementation.substitution.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{substitutionVsSupplementation.substitution.body}</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="font-bold text-primary-dark">{substitutionVsSupplementation.supplementation.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{substitutionVsSupplementation.supplementation.body}</p>
            </div>
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">"{substitutionVsSupplementation.question}"</p>
        </div>
      </Section>

      {/* TRANSITIONAL NP */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{transitionalNP.title}</h2>
          <ul className="mt-4 flex flex-col gap-2">
            {transitionalNP.points.map((p) => (
              <li key={p} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-soft">{transitionalNP.scopeNote}</p>
        </div>
      </Section>

      {/* FERTILIZER WITHDRAWAL GUARDRAIL */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{withdrawalGuardrail.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{withdrawalGuardrail.body}</p>
          <p className="mt-4 text-lg font-medium text-primary-dark">{withdrawalGuardrail.objective}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {withdrawalGuardrail.statement}
          </p>
        </div>
      </Section>

      {/* PHOTOSYNTHESIS REPRISE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{photosynthesisReprise.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{photosynthesisReprise.body}</p>
          <Link href={photosynthesisReprise.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {photosynthesisReprise.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* FOUR COMPONENT CONVERGENCE */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{fourComponentConvergence.title}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {fourComponentConvergence.components.map((c) => (
              <div key={c.name} className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary-dark">{c.name}</p>
                <p className="mt-1 text-sm text-ink-soft">{c.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-lg font-medium text-primary-dark">{fourComponentConvergence.statement}</p>
        </div>
      </Section>

      {/* ACQUISITION TO METABOLISM */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{acquisitionToMetabolism.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{acquisitionToMetabolism.body}</p>
          <p className="mt-4 text-sm text-ink-soft">{acquisitionToMetabolism.caution}</p>
        </div>
      </Section>

      {/* PLANT MANUFACTURES FOOD */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{plantManufacturesFood.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{plantManufacturesFood.body}</p>
          <p className="mt-4 rounded-xl border border-border bg-card p-5 text-center font-medium text-primary-dark">
            {plantManufacturesFood.environment}
          </p>
        </div>
      </Section>

      {/* NUTRIENT DENSITY VS DIVERSITY */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{densityDiversity.title}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{densityDiversity.density.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{densityDiversity.density.body}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="font-bold text-primary-dark">{densityDiversity.diversity.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{densityDiversity.diversity.body}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-ink-soft">{densityDiversity.caution}</p>
        </div>
      </Section>

      {/* NUTRITION CAUSAL CHAIN */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{nutritionCausalChain.title}</h2>
          <div className="mt-8">
            <VerticalChain steps={nutritionCausalChain.chain} />
          </div>
          <div className="mt-8">
            <FlowSequence steps={nutritionCausalChain.evidenceChain} />
          </div>
          <p className="mt-6 text-center text-sm text-ink-soft">{nutritionCausalChain.boundaryNote}</p>
        </div>
      </Section>

      {/* SCIENCE / EVIDENCE / VALIDATION */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{scienceEvidenceValidation.title}</h2>
          <div className="mt-6 flex flex-col gap-1 text-ink-soft">
            {scienceEvidenceValidation.lines.map((l) => (
              <p key={l} className="font-medium text-primary-dark">
                {l}
              </p>
            ))}
          </div>
          <Link href={scienceEvidenceValidation.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {scienceEvidenceValidation.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* SENSORY OUTCOMES */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{sensoryOutcomes.title}</h2>
          <p className="mt-4 text-ink-soft">Influenced through compounds such as:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {sensoryOutcomes.compounds.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {c}
              </span>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">{sensoryOutcomes.boundary}</p>
          <p className="mt-4 text-sm text-ink-soft">{sensoryOutcomes.scopeNote}</p>
        </div>
      </Section>

      {/* NUTRITION AND PLANT HEALTH */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{nutritionAndHealth.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {nutritionAndHealth.connections.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {c}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-soft">{nutritionAndHealth.caution}</p>
          <div className="mt-6 flex items-center justify-center gap-3 text-center text-sm font-semibold text-primary-dark">
            <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1.5">{nutritionAndHealth.framing.functional}</span>
            <span aria-hidden="true">≠</span>
            <span className="rounded-full border border-border bg-card px-3 py-1.5">{nutritionAndHealth.framing.loading}</span>
          </div>
        </div>
      </Section>

      {/* NUTRITION AND CROP PROTECTION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{nutritionAndCropProtection.title}</h2>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {nutritionAndCropProtection.statement}
          </p>
          <p className="mt-4 text-sm text-ink-soft">{nutritionAndCropProtection.caution}</p>
        </div>
      </Section>

      {/* NUTRITION AND WATER */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{nutritionAndWater.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {nutritionAndWater.factors.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <Link href={nutritionAndWater.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {nutritionAndWater.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* NUTRITION AND BIODIVERSITY */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{nutritionAndBiodiversity.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{nutritionAndBiodiversity.body}</p>
          <Link href={nutritionAndBiodiversity.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {nutritionAndBiodiversity.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* FOUR PRINCIPLES */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">The Four Principles Protect Nutrient Cycling</h2>
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
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">Science Is Universal — Application Is Local</h2>
          <div className="mt-8">
            <ScienceApplicationNote science={scienceApplication.science} application={scienceApplication.application} />
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{scienceApplication.closing}</p>
        </div>
      </Section>

      {/* WHAT THE PRODUCTION MANAGER WATCHES */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{productionManagerWatches.title}</h2>
          <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {productionManagerWatches.observations.map((o) => (
              <li key={o} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {o}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {productionManagerWatches.caution}
          </p>
        </div>
      </Section>

      {/* FUNCTIONAL RECOVERY */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{functionalRecovery.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {functionalRecovery.factors.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{functionalRecovery.statement}</p>
        </div>
      </Section>

      {/* CENTRAL NUTRITION PROPOSITION */}
      <Section className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <div className="absolute inset-0 bg-primary-dark" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-cream/95">{centralProposition.statement}</p>
            <div className="mt-8 flex flex-col gap-1 border-t border-cream/15 pt-6 text-cream/90">
              <p>{centralProposition.clarification}</p>
              <p className="text-lg font-semibold text-accent-light">{centralProposition.objective}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* TRANSITION VISUAL */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">From Substitution to Supplementation to Biological Function</h2>
          <div className="mt-8 flex flex-col items-stretch gap-2">
            {transitionVisual.map((stage, i) => (
              <div key={stage.name} className="flex flex-col items-center">
                <div className="w-full rounded-xl border border-border bg-card px-5 py-4 text-center">
                  <p className="text-sm font-bold uppercase tracking-wide text-primary-dark">{stage.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{stage.body}</p>
                </div>
                {i < transitionVisual.length - 1 && (
                  <svg width="16" height="20" viewBox="0 0 16 20" className="my-1 text-ink-soft/50" aria-hidden="true">
                    <path d="M8 0 L8 14 M2 9 L8 15 L14 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link href="/science/transition" className="text-sm font-semibold text-primary underline underline-offset-4">
              Continue with the PQNK Transition Model →
            </Link>
          </div>
        </div>
      </Section>

      {/* CLOSED LOOP NOT ISOLATION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{closedLoopNotIsolation.title}</h2>
          <ul className="mt-4 flex flex-col gap-1">
            {closedLoopNotIsolation.entries.map((e) => (
              <li key={e} className="text-ink-soft">
                {e}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{closedLoopNotIsolation.statement}</p>
        </div>
      </Section>

      {/* LIVING NUTRITION LOOP */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{livingNutritionLoop.title}</h2>
          <div className="mt-10">
            <ProductionLoop steps={livingNutritionLoop.steps} closingLabel={livingNutritionLoop.closingLabel} />
          </div>
          <p className="mx-auto mt-8 max-w-xl text-center text-lg font-medium text-primary-dark">{livingNutritionLoop.statement}</p>
        </div>
      </Section>

      {/* CLOSING PROPOSITION */}
      <Section muted className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <div className="absolute inset-0 bg-primary-dark" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="leading-relaxed text-cream/95">{closingProposition.intro}</p>
            <div className="mt-8 flex flex-col gap-1 border-t border-cream/15 pt-6 text-cream/90">
              {closingProposition.body.map((b) => (
                <p key={b}>{b}</p>
              ))}
            </div>
            <p className="mt-8 border-t border-cream/15 pt-6 text-lg font-semibold text-accent-light">
              {closingProposition.finalProposition}
            </p>
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

            <div className="flex flex-col rounded-2xl border-2 border-primary bg-primary/5 p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">Current page</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark">Nutrition</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">From Mineral Presence to Biological Availability</p>
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

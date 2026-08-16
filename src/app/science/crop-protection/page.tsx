import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";
import StageProgression from "@/components/science/StageProgression";
import ScienceApplicationNote from "@/components/science/ScienceApplicationNote";
import ProductionLoop from "@/components/science/ProductionLoop";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  hero,
  centralProposition,
  pestsPartOfEcosystem,
  recyclingAndCondition,
  suckingInsects,
  nitrogenPestPressure,
  lundgrenCorrection,
  biologicalRegulation,
  btSection,
  fieldExperienceTwoPercent,
  tenPercentThreshold,
  chemicalException,
  weedsEnemyToSignal,
  rootsCoexistence,
  sunlightIssue,
  rowOrientation,
  weedicideException,
  agrochemicalEffects,
  weedsRescueWorkers,
  occupyEcologicalSpace,
  cropProtectionLoop,
  habitatPrinciples,
  scienceApplication,
  finalProposition,
} from "@/lib/content/scienceCropProtection";

export const metadata: Metadata = buildMetadata({
  title: "PQNK Crop Protection Science — Biological Regulation Instead of Routine Suppression | Pedaver",
  description:
    "Why PQNK crop protection begins before the pest arrives: pest presence vs. economic damage, biological regulation, the Bt and 1,700-species corrections, weeds as an ecological signal, and the narrow transitional case for weedicide.",
  path: "/science/crop-protection",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: hero.title,
  description:
    "Why PQNK crop protection begins before the pest arrives: pest presence vs. economic damage, biological regulation, the Bt and 1,700-species corrections, weeds as an ecological signal, and the narrow transitional case for weedicide.",
  url: `${SITE_URL}/science/crop-protection`,
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

export default function ScienceCropProtectionPage() {
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

      {/* CENTRAL PROPOSITION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{centralProposition.title}</h2>
          {centralProposition.body.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
          <div className="mt-6 flex flex-col gap-1 text-center text-ink-soft">
            <p>{centralProposition.questionNot}</p>
            <p className="text-lg font-medium text-primary-dark">{centralProposition.questionBut}</p>
          </div>
        </div>
      </Section>

      {/* PESTS PART OF ECOSYSTEM */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{pestsPartOfEcosystem.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{pestsPartOfEcosystem.body}</p>
          <p className="mt-4 text-sm text-ink-soft">{pestsPartOfEcosystem.caveat}</p>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-bold text-primary-dark">
            {pestsPartOfEcosystem.statement}
          </p>
          <div className="mt-8">
            <FlowSequence steps={pestsPartOfEcosystem.hierarchy} />
          </div>
        </div>
      </Section>

      {/* RECYCLING AND PLANT CONDITION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{recyclingAndCondition.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{recyclingAndCondition.body}</p>
          <p className="mt-4 text-ink-soft">{recyclingAndCondition.conditionIntro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {recyclingAndCondition.conditionFactors.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{recyclingAndCondition.signalNote}</p>
          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">
            {recyclingAndCondition.boundary}
          </p>
        </div>
      </Section>

      {/* SUCKING INSECTS */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{suckingInsects.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{suckingInsects.formulation}</p>
          <p className="mt-4 text-lg font-bold text-primary-dark">{suckingInsects.guardrail}</p>
          <p className="mt-4 text-ink-soft">Plant response depends on:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {suckingInsects.dependsOn.map((d) => (
              <span key={d} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {d}
              </span>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            "{suckingInsects.question}"
          </p>
        </div>
      </Section>

      {/* NITROGEN AND PEST PRESSURE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{nitrogenPestPressure.title}</h2>
          <p className="mt-4 text-ink-soft">{nitrogenPestPressure.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{nitrogenPestPressure.body}</p>

          <div className="mt-8">
            <VerticalChain steps={nitrogenPestPressure.chain} />
          </div>

          <p className="mt-8 text-center text-lg font-bold text-primary-dark">{nitrogenPestPressure.fertilizerDecisionStatement}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{nitrogenPestPressure.pqnkPosition}</p>

          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">
            {nitrogenPestPressure.qualification}
          </p>

          <p className="mt-6 leading-relaxed text-ink-soft">{nitrogenPestPressure.distinctionIntro}</p>
          <p className="mt-2 leading-relaxed text-ink-soft">{nitrogenPestPressure.distinctionBody}</p>

          <div className="mt-8">
            <FlowSequence steps={nitrogenPestPressure.systemFlow} />
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
            <Link
              href={nitrogenPestPressure.nutritionLinkHref}
              className="text-sm font-semibold text-primary underline underline-offset-4"
            >
              {nitrogenPestPressure.nutritionLinkLabel} →
            </Link>
            <Link
              href={nitrogenPestPressure.plantsLinkHref}
              className="text-sm font-semibold text-primary underline underline-offset-4"
            >
              {nitrogenPestPressure.plantsLinkLabel} →
            </Link>
          </div>
        </div>
      </Section>

      {/* LUNDGREN CORRECTION */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{lundgrenCorrection.title}</h2>
          <p className="mt-4 rounded-xl border border-border bg-card p-5 text-center text-ink-soft/70 line-through">
            {lundgrenCorrection.wrongVersion}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{lundgrenCorrection.correction}</p>

          <div className="mt-8 flex items-center justify-center gap-3 text-center text-lg font-bold text-primary-dark">
            <span className="rounded-full border border-border bg-card px-4 py-2">{lundgrenCorrection.keyDistinctionLeft}</span>
            <span aria-hidden="true">≠</span>
            <span className="rounded-full border border-accent/30 bg-accent/5 px-4 py-2">{lundgrenCorrection.keyDistinctionRight}</span>
          </div>
          <p className="mt-4 text-center text-sm text-ink-soft">{lundgrenCorrection.keyDistinctionNote}</p>

          <p className="mt-8 text-ink-soft">This species diversity may include:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {lundgrenCorrection.includes.map((i) => (
              <span key={i} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {i}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-soft">{lundgrenCorrection.notAllPredators}</p>

          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{lundgrenCorrection.lesson}</p>
          <p className="mt-4 text-center text-lg font-bold text-primary-dark">"{lundgrenCorrection.rhetoricalQuestion}"</p>
          <p className="mt-4 text-sm text-ink-soft">{lundgrenCorrection.broadSpectrumNote}</p>
        </div>
      </Section>

      {/* BIOLOGICAL REGULATION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{biologicalRegulation.title}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {biologicalRegulation.mechanisms.map((m) => (
              <span key={m} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {m}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-ink-soft">{biologicalRegulation.guardrail}</p>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-bold text-primary-dark">
            {biologicalRegulation.statement}
          </p>
          <p className="mt-4 text-center text-sm text-ink-soft">{biologicalRegulation.systemNote}</p>
        </div>
      </Section>

      {/* BT SECTION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{btSection.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{btSection.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{btSection.mechanism}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {btSection.distinctions.map((d) => (
              <div key={d.name} className="rounded-xl border border-border bg-card p-5">
                <p className="font-bold text-primary-dark">{d.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {btSection.significance}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{btSection.objective}</p>
          <p className="mt-4 text-sm text-ink-soft">{btSection.caveat}</p>
        </div>
      </Section>

      {/* 2% FIELD EXPERIENCE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{fieldExperienceTwoPercent.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{fieldExperienceTwoPercent.body}</p>
          <p className="mt-4 rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-ink-soft">
            {fieldExperienceTwoPercent.labelNote}
          </p>
        </div>
      </Section>

      {/* 10% THRESHOLD */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{tenPercentThreshold.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{tenPercentThreshold.body}</p>
          <p className="mt-4 text-lg font-bold text-primary-dark">{tenPercentThreshold.statement}</p>
          <p className="mt-2 text-ink-soft">{tenPercentThreshold.clarification}</p>

          <div className="mt-8">
            <StageProgression stages={tenPercentThreshold.sequence.map((s, i) => ({ number: i + 1, name: s.label, body: s.body }))} />
          </div>

          <p className="mt-6 text-center text-sm text-ink-soft">{tenPercentThreshold.experienceNote}</p>
        </div>
      </Section>

      {/* CHEMICAL EXCEPTION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{chemicalException.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{chemicalException.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{chemicalException.transitionNote}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{chemicalException.goal}</p>
          <p className="mt-4 text-sm font-medium text-primary-dark">{chemicalException.guardrail}</p>
        </div>
      </Section>

      {/* WEEDS - ENEMY TO SIGNAL */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{weedsEnemyToSignal.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{weedsEnemyToSignal.conventional}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{weedsEnemyToSignal.pqnkPremise}</p>
          <p className="mt-4 text-ink-soft">Nutrient acquisition connects instead to:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {weedsEnemyToSignal.connectedTo.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {c}
              </span>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {weedsEnemyToSignal.statement}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{weedsEnemyToSignal.ecosystemNote}</p>
          <ul className="mt-4 flex flex-col gap-1">
            {weedsEnemyToSignal.guardrails.map((g) => (
              <li key={g} className="text-sm text-ink-soft">
                {g}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ROOTS COEXISTENCE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{rootsCoexistence.title}</h2>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {rootsCoexistence.statement}
          </p>
          <p className="mt-6 text-ink-soft">Roots can:</p>
          <ul className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            {rootsCoexistence.capabilities.map((c) => (
              <li key={c} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink-soft">{rootsCoexistence.caveat}</p>
        </div>
      </Section>

      {/* SUNLIGHT ISSUE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{sunlightIssue.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{sunlightIssue.intro}</p>
          <p className="mt-4 text-ink-soft">A weed becomes problematic when its canopy:</p>
          <ul className="mt-3 flex flex-col gap-1">
            {sunlightIssue.problemConditions.map((c) => (
              <li key={c} className="flex gap-2 text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-lg font-bold text-primary-dark">{sunlightIssue.statement}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-sm text-ink-soft">{sunlightIssue.belowGround}</div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-sm text-ink-soft">{sunlightIssue.aboveGround}</div>
          </div>
        </div>
      </Section>

      {/* ROW ORIENTATION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{rowOrientation.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{rowOrientation.body}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{rowOrientation.purpose}</p>
          <p className="mt-4 text-sm text-ink-soft">{rowOrientation.guardrail}</p>
        </div>
      </Section>

      {/* WEEDICIDE EXCEPTION */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{weedicideException.title}</h2>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {weedicideException.scope}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{weedicideException.example}</p>
          <p className="mt-4 text-ink-soft">{weedicideException.reasonNot}</p>
          <p className="mt-2 font-medium text-primary-dark">{weedicideException.reasonIs}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{weedicideException.disappearingNote}</p>
          <p className="mt-4 text-sm font-medium text-primary-dark">{weedicideException.guardrail}</p>
        </div>
      </Section>

      {/* AGROCHEMICAL EFFECTS */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{agrochemicalEffects.title}</h2>
          <p className="mt-4 text-ink-soft">{agrochemicalEffects.intro}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {agrochemicalEffects.consequences.map((c) => (
              <span key={c} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {c}
              </span>
            ))}
          </div>
          <p className="mt-6 leading-relaxed text-ink-soft">{agrochemicalEffects.herbicideNote}</p>
          <ul className="mt-4 flex flex-col gap-1">
            {agrochemicalEffects.guardrails.map((g) => (
              <li key={g} className="text-sm font-medium text-primary-dark">
                {g}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-ink-soft">Effects vary with:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {agrochemicalEffects.variesWith.map((v) => (
              <span key={v} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {v}
              </span>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-center font-medium text-primary-dark">
            {agrochemicalEffects.argument}
          </p>
          <Link href={agrochemicalEffects.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {agrochemicalEffects.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* WEEDS AS RESCUE WORKERS */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{weedsRescueWorkers.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{weedsRescueWorkers.body}</p>
          <Link href={weedsRescueWorkers.linkHref} className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            {weedsRescueWorkers.linkLabel} →
          </Link>
        </div>
      </Section>

      {/* OCCUPY ECOLOGICAL SPACE */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{occupyEcologicalSpace.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{occupyEcologicalSpace.body}</p>
          <p className="mt-4 text-ink-soft">PQNK therefore uses:</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {occupyEcologicalSpace.strategies.map((s) => (
              <span key={s} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {s}
              </span>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{occupyEcologicalSpace.statement}</p>
        </div>
      </Section>

      {/* CROP PROTECTION LOOP */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">{cropProtectionLoop.title}</h2>
          <div className="mt-10">
            <ProductionLoop steps={cropProtectionLoop.steps} closingLabel={cropProtectionLoop.closingLabel} />
          </div>
        </div>
      </Section>

      {/* FOUR PRINCIPLES */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">The Four Principles Protect Biological Regulation</h2>
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

      {/* FINAL PROPOSITION */}
      <Section className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <div className="absolute inset-0 bg-primary-dark" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-cream/95">{finalProposition.statement}</p>
            <div className="mt-8 flex flex-col gap-2 border-t border-cream/15 pt-6 text-cream/90">
              <p>{finalProposition.notObjective}</p>
              <p className="text-lg font-semibold text-accent-light">{finalProposition.objective}</p>
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

            <div className="flex flex-col rounded-2xl border-2 border-primary bg-primary/5 p-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-primary">Current page</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark">Crop Protection</h3>
              <p className="mt-1 text-sm font-medium italic text-ink-soft">Biological Regulation Instead of Routine Suppression</p>
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

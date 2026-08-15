import Link from "next/link";
import type { Metadata } from "next";
import Section from "@/components/Section";
import StageProgression from "@/components/science/StageProgression";
import ScienceApplicationNote from "@/components/science/ScienceApplicationNote";
import FutureTopicCard from "@/components/science/FutureTopicCard";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import {
  hero,
  notSubstitution,
  stages,
  stageVisualCaption,
  stageOne,
  stageTwo,
  correctiveOperations,
  correctiveClosing,
  turningPoint,
  stageThree,
  regenerationTimetable,
  supplementation,
  waterDuringTransition,
  functionalIndicators,
  indicatorsNote,
  stageFour,
  closedLoopManagement,
  principlesThroughTransition,
  principlesClosing,
  scienceApplication,
  notInputPackage,
  evidence,
  sciencePathway,
  closing,
} from "@/lib/content/scienceTransition";

export const metadata: Metadata = buildMetadata({
  title: "PQNK Transition — From Degraded Soil to a Sustained Closed Loop | Pedaver",
  description:
    "The science of moving an agricultural field from a degraded production system through corrective intervention and biological regeneration toward a sustained closed-loop production ecosystem.",
  path: "/science/transition",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: hero.title,
  description:
    "The science of moving an agricultural field from a degraded production system through corrective intervention and biological regeneration toward a sustained closed-loop production ecosystem.",
  url: `${SITE_URL}/science/transition`,
  author: { "@id": `${SITE_URL}/founder#person` },
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function ScienceTransitionPage() {
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

      {/* NOT INPUT SUBSTITUTION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{notSubstitution.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{notSubstitution.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{notSubstitution.statement}</p>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {notSubstitution.callout}
          </p>
          <p className="mt-4 leading-relaxed text-ink-soft">{notSubstitution.closing}</p>
        </div>
      </Section>

      {/* CENTRAL FOUR-STAGE VISUAL */}
      <Section muted>
        <div className="mx-auto max-w-5xl">
          <StageProgression stages={stages} />
          <p className="mx-auto mt-8 max-w-xl text-center text-ink-soft">{stageVisualCaption.body}</p>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg font-medium text-primary-dark">
            {stageVisualCaption.question}
          </p>
        </div>
      </Section>

      {/* STAGE ONE — DEGENERATIVE */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">1 · Degenerative</p>
          <h2 className="mt-2 text-2xl font-bold text-primary-dark sm:text-3xl">{stageOne.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{stageOne.intro}</p>

          <div className="mt-8 flex flex-col items-stretch gap-2">
            {stageOne.chain.map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-full max-w-md rounded-lg border border-border bg-card px-5 py-3 text-center text-sm font-semibold text-primary-dark">
                  {step}
                </div>
                {i < stageOne.chain.length - 1 && (
                  <svg width="16" height="20" viewBox="0 0 16 20" className="my-1 text-ink-soft/50" aria-hidden="true">
                    <path d="M8 0 L8 14 M2 9 L8 15 L14 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 text-ink-soft">
            <p className="leading-relaxed">{stageOne.bareSoil}</p>
            <p className="leading-relaxed">{stageOne.inundation}</p>
            <p className="leading-relaxed">{stageOne.conclusion}</p>
          </div>

          <p className="mt-6 rounded-xl border border-border bg-card p-5 text-ink-soft">{stageOne.diagnosisNote}</p>
        </div>
      </Section>

      {/* STAGE TWO — CORRECTIVE INTERVENTION */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">2 · Corrective Intervention</p>
          <h2 className="mt-2 text-2xl font-bold text-primary-dark sm:text-3xl">{stageTwo.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{stageTwo.intro}</p>
          <p className="mt-4 leading-relaxed text-ink-soft">{stageTwo.explanation}</p>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center text-lg font-medium text-primary-dark">
            {stageTwo.callout}
          </p>
        </div>
      </Section>

      {/* CORRECTIVE INTERVENTION — SCIENTIFIC LOGIC */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-bold text-primary-dark">The Established Transition Operations</h2>
          <div className="mt-6 flex flex-col gap-6">
            {correctiveOperations.map((op) => (
              <div key={op.name} className="border-s-2 border-accent/40 ps-4">
                <h3 className="font-bold text-primary-dark">{op.name}</h3>
                <p className="mt-1 leading-relaxed text-ink-soft">{op.body}</p>
                {(op.linkLabel || op.secondaryLinkLabel) && (
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                    {op.linkLabel && op.linkHref && (
                      <Link href={op.linkHref} className="text-sm font-semibold text-primary underline underline-offset-4">
                        {op.linkLabel} →
                      </Link>
                    )}
                    {op.secondaryLinkLabel && op.secondaryLinkHref && (
                      <Link
                        href={op.secondaryLinkHref}
                        className="text-sm font-semibold text-primary underline underline-offset-4"
                      >
                        {op.secondaryLinkLabel} →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 text-center font-medium text-primary-dark">{correctiveClosing}</p>
        </div>
      </Section>

      {/* THE TURNING POINT */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{turningPoint.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{turningPoint.intro}</p>
          <div className="mt-6 flex flex-col gap-4">
            {turningPoint.pairs.map((pair) => (
              <div key={pair.limit} className="rounded-xl border border-border bg-card p-5">
                <p className="text-ink">{pair.limit}</p>
                <p className="mt-1 text-ink-soft">{pair.cannot}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center text-lg font-medium text-primary-dark">
            {turningPoint.callout}
          </p>
        </div>
      </Section>

      {/* STAGE THREE — REGENERATIVE */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">3 · Regenerative</p>
          <h2 className="mt-2 text-2xl font-bold text-primary-dark sm:text-3xl">{stageThree.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{stageThree.intro}</p>
          <ul className="mt-6 flex flex-col gap-2">
            {stageThree.points.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-primary-dark font-medium">{stageThree.conclusion}</p>
        </div>
      </Section>

      {/* REGENERATION IS FUNCTION, NOT A CALENDAR */}
      <Section muted>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{regenerationTimetable.title}</h2>
          <p className="mt-4 text-ink-soft">Recovery depends upon:</p>
          <div className="mx-auto mt-4 flex max-w-lg flex-wrap justify-center gap-2">
            {regenerationTimetable.factors.map((f) => (
              <span key={f} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {f}
              </span>
            ))}
          </div>
          <p className="mt-6 leading-relaxed text-ink-soft">{regenerationTimetable.body}</p>
          <p className="mt-4 rounded-xl border border-accent/30 bg-accent/5 p-5 text-lg font-medium text-primary-dark">
            {regenerationTimetable.callout}
          </p>
        </div>
      </Section>

      {/* SUPPLEMENTATION DURING REGENERATION */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{supplementation.title}</h2>
          <div className="mt-4 flex flex-col gap-4 text-ink-soft">
            {supplementation.body.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{supplementation.question}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 text-center">
              <p className="font-semibold text-ink">{supplementation.distinction.left}</p>
              <p className="mt-1 text-sm text-ink-soft">{supplementation.distinction.leftLabel}</p>
            </div>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-center">
              <p className="font-semibold text-ink">{supplementation.distinction.right}</p>
              <p className="mt-1 text-sm text-ink-soft">{supplementation.distinction.rightLabel}</p>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-ink-soft">{supplementation.note}</p>
        </div>
      </Section>

      {/* WATER DURING TRANSITION */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{waterDuringTransition.title}</h2>
          <div className="mt-4 flex flex-col gap-4 text-ink-soft">
            {waterDuringTransition.intro.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-stretch gap-2">
            {waterDuringTransition.sequence.map((step, i) => (
              <div key={step.label} className="flex flex-col items-center">
                <div className="w-full rounded-xl border border-border bg-card px-5 py-4 text-center">
                  <p className="text-sm font-bold uppercase tracking-wide text-primary-dark">{step.label}</p>
                  <p className="mt-1 text-sm text-ink-soft">{step.body}</p>
                </div>
                {i < waterDuringTransition.sequence.length - 1 && (
                  <svg width="16" height="20" viewBox="0 0 16 20" className="my-1 text-ink-soft/50" aria-hidden="true">
                    <path d="M8 0 L8 14 M2 9 L8 15 L14 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <p className="mt-6 leading-relaxed text-ink-soft">{waterDuringTransition.wiltingNote}</p>

          <Link
            href={waterDuringTransition.resourceLinkHref}
            className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            {waterDuringTransition.resourceLinkLabel} →
          </Link>
        </div>
      </Section>

      {/* HOW DO WE KNOW REGENERATION IS OCCURRING? */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">Look for Returning Function</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {functionalIndicators.map((ind) => (
              <div key={ind.name} className="rounded-xl border border-border bg-card p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">{ind.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{ind.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-ink-soft">{indicatorsNote}</p>
        </div>
      </Section>

      {/* STAGE FOUR — SUSTAINED CLOSED LOOP */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">4 · Sustained Closed Loop</p>
          <h2 className="mt-2 text-2xl font-bold text-primary-dark sm:text-3xl">{stageFour.title}</h2>
          <p className="mt-4 rounded-xl border border-border bg-card p-5 text-ink">{stageFour.notIsolation}</p>
          <ul className="mt-4 flex flex-col gap-1">
            {stageFour.entriesExits.map((e) => (
              <li key={e} className="text-ink-soft">
                {e}
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-ink-soft">{stageFour.definition}</p>
          <ul className="mt-4 flex flex-col gap-2">
            {stageFour.changes.map((c) => (
              <li key={c} className="flex gap-3 leading-relaxed text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-lg font-medium text-primary-dark">{stageFour.managerRole}</p>
        </div>
      </Section>

      {/* CLOSED LOOP DOES NOT MEAN ABANDONMENT */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{closedLoopManagement.title}</h2>
          <p className="mt-4 text-ink-soft">{closedLoopManagement.intro}</p>
          <ul className="mx-auto mt-4 flex max-w-md flex-col gap-2">
            {closedLoopManagement.duties.map((d) => (
              <li key={d} className="flex gap-3 leading-relaxed text-ink-soft">
                <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-accent" aria-hidden="true" />
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center font-medium text-primary-dark">{closedLoopManagement.distinction}</p>
        </div>
      </Section>

      {/* THE FOUR PRINCIPLES THROUGH TRANSITION */}
      <Section muted>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">The Four Principles Through Transition</h2>
          <div className="mx-auto mt-6 grid max-w-2xl gap-4 text-start sm:grid-cols-2">
            {principlesThroughTransition.map((p) => (
              <div key={p.name}>
                <p className="font-bold text-primary-dark">{p.name}</p>
                <p className="text-sm text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-lg font-medium text-primary-dark">{principlesClosing}</p>
        </div>
      </Section>

      {/* SCIENCE VS FIELD APPLICATION */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">Science vs. Field Application</h2>
          <div className="mt-8">
            <ScienceApplicationNote science={scienceApplication.science} application={scienceApplication.application} />
          </div>
          <p className="mt-6 text-center text-lg font-medium text-primary-dark">{scienceApplication.closing}</p>
        </div>
      </Section>

      {/* TRANSITION IS NOT A NEW INPUT PACKAGE */}
      <Section muted>
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{notInputPackage.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{notInputPackage.intro}</p>
          <ul className="mt-6 flex flex-col gap-1">
            {notInputPackage.sequence.map((s) => (
              <li key={s} className="text-ink-soft">
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center text-lg font-medium text-primary-dark">
            {notInputPackage.callout}
          </p>
        </div>
      </Section>

      {/* EVIDENCE THROUGH TRANSITION */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{evidence.title}</h2>
          <p className="mt-4 text-ink-soft">Potential evidence pathways include:</p>
          <div className="mx-auto mt-4 flex max-w-lg flex-wrap justify-center gap-2">
            {evidence.pathways.map((p) => (
              <span key={p} className="rounded-full border border-border bg-card px-3 py-1 text-sm text-ink-soft">
                {p}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ink-soft">{evidence.statement}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/farmer-voices" className="text-sm font-semibold text-primary underline underline-offset-4">
              Explore Farmer Voices →
            </Link>
            <Link href="/papers" className="text-sm font-semibold text-primary underline underline-offset-4">
              Explore Knowledge Papers →
            </Link>
          </div>
        </div>
      </Section>

      {/* CONNECTION TO THE REST OF PQNK SCIENCE */}
      <Section muted>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">The Rest of PQNK Science</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {sciencePathway.map((topic) => (
              <FutureTopicCard key={topic.name} name={topic.name} summary={topic.question} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/science" className="text-sm font-semibold text-primary underline underline-offset-4">
              ← Back to PQNK Science
            </Link>
          </div>
        </div>
      </Section>

      {/* CLOSING */}
      <Section className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <div className="absolute inset-0 bg-primary-dark" />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">{closing.title}</h2>
            <div className="mt-5 flex flex-col gap-4 text-cream/95">
              {closing.intro.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-6 text-cream/90">{closing.notIntro}</p>
            <ul className="mt-2 flex flex-col gap-1 text-cream/90">
              {closing.notList.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <p className="mt-4 text-cream/95">{closing.notOutro}</p>
            <p className="mt-6 text-lg font-semibold text-accent-light">{closing.final}</p>
          </div>
        </div>
      </Section>
    </div>
  );
}

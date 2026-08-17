import Link from "next/link";
import Section from "@/components/Section";
import LivingSystemDiagram from "@/components/science/LivingSystemDiagram";
import ScienceApplicationNote from "@/components/science/ScienceApplicationNote";
import FutureTopicCard from "@/components/science/FutureTopicCard";
import { buildMetadata } from "@/lib/seo";
import {
  hero,
  inheritedSystem,
  coreComponents,
  centralIdea,
  productionFunctions,
  systemOutcomes,
  transition,
  productionArchitecture,
  scienceAndEvidence,
  oneScience,
  closing,
} from "@/lib/content/science";

export const metadata = buildMetadata({
  title: "PQNK Science — The Natural Ecosystem Science of Production Agriculture | Pedaver",
  description:
    "PQNK Science explains how soil, plants, water and biodiversity function together as one living production system, why agriculture disrupted it, and how PQNK restores it.",
  path: "/science",
});

export default function SciencePage() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{hero.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-extrabold text-primary-dark sm:text-4xl">{hero.title}</h1>
          <div className="mx-auto mt-6 flex max-w-2xl flex-col gap-4 text-start text-lg leading-relaxed text-ink-soft sm:text-center">
            {hero.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* THE SYSTEM WE INHERITED */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{inheritedSystem.title}</h2>
          <div className="mt-5 flex flex-col gap-4 text-ink-soft">
            {inheritedSystem.intro.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-stretch gap-2">
            {inheritedSystem.chain.map((step, i) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-full max-w-md rounded-lg border border-border bg-card px-5 py-3 text-center text-sm font-semibold text-primary-dark">
                  {step}
                </div>
                {i < inheritedSystem.chain.length - 1 && (
                  <svg width="16" height="20" viewBox="0 0 16 20" className="my-1 text-ink-soft/50" aria-hidden="true">
                    <path d="M8 0 L8 14 M2 9 L8 15 L14 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 text-lg font-medium leading-relaxed text-primary-dark">{inheritedSystem.closing}</p>
        </div>
      </Section>

      {/* NATURE'S PRODUCTION ENGINE */}
      <Section muted>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-primary-dark sm:text-3xl">Four Living Components. One System.</h2>

          <div className="mt-10">
            <LivingSystemDiagram components={coreComponents} />
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {coreComponents.map((c) => (
              <div key={c.slug} className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-bold uppercase tracking-wide text-primary-dark">{c.name}</h3>
                <p className="mt-1 text-sm font-medium italic text-ink-soft">{c.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{c.roleBody}</p>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-xl text-center text-lg font-medium text-primary-dark">
            None of these systems operates independently.
          </p>
        </div>
      </Section>

      {/* FOUR PRINCIPLES */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">
            PQNK Does Not Try to Manufacture Nature. It Stops Preventing Nature From Functioning.
          </h2>
          <div className="mx-auto mt-6 grid max-w-2xl gap-4 text-start sm:grid-cols-2">
            {[
              { name: "No Soil Disturbance", body: "Protect the physical and biological architecture." },
              { name: "No Inundation", body: "Maintain access to both water and oxygen." },
              { name: "Permanent Biological Cover", body: "Protect and continuously feed the soil environment." },
              {
                name: "Maximum Biodiversity",
                body: "Restore the biological relationships through which the ecosystem functions.",
              },
            ].map((p) => (
              <div key={p.name}>
                <p className="font-bold text-primary-dark">{p.name}</p>
                <p className="text-sm text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-xl text-ink-soft">
            These are not four independent techniques. They protect four dimensions of the same living production
            system.
          </p>
          <Link
            href="/#four-principles"
            className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
          >
            See the Four Principles in full →
          </Link>
        </div>
      </Section>

      {/* CENTRAL SCIENTIFIC IDEA */}
      <Section muted>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{centralIdea.title}</h2>
          <div className="mt-6 flex flex-col gap-4 text-start text-ink-soft">
            {centralIdea.body.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* EXPLORE THE LIVING SYSTEM */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">Explore the Living System</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {coreComponents.map((c) => {
              const ctaBySlug: Record<string, string> = {
                soil: "Explore Soil Science →",
                plants: "Explore Plant Science →",
                water: "Explore Water Science →",
                biodiversity: "Explore Biodiversity Science →",
              };
              const cta = ctaBySlug[c.slug];
              return cta ? (
                <Link
                  key={c.slug}
                  href={c.futureRoute}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
                  <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">{c.name}</h3>
                  <p className="mt-1 text-sm font-medium italic text-ink-soft">{c.exploreTitle}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{c.exploreSummary}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-accent">{cta}</span>
                </Link>
              ) : (
                <FutureTopicCard key={c.slug} name={c.name} tagline={c.exploreTitle} summary={c.exploreSummary} />
              );
            })}
          </div>
        </div>
      </Section>

      {/* WHAT THE LIVING SYSTEM DOES */}
      <Section muted>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">What the Living System Does</h2>
          <p className="mt-2 text-ink-soft">
            These are functions emerging from the living system, not additional foundational components.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {productionFunctions.map((t) => {
              const functionCtaBySlug: Record<string, string> = {
                nutrition: "Explore Nutrition Science →",
                "crop-protection": "Explore Crop Protection Science →",
              };
              const cta = functionCtaBySlug[t.slug];
              return cta ? (
                <Link
                  key={t.slug}
                  href={t.futureRoute}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
                  <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">{t.name}</h3>
                  <p className="mt-1 text-sm font-medium italic text-ink-soft">{t.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{t.summary}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-accent">{cta}</span>
                </Link>
              ) : (
                <FutureTopicCard key={t.slug} name={t.name} tagline={t.tagline} summary={t.summary} />
              );
            })}
          </div>
        </div>
      </Section>

      {/* RESTORING A DEGRADED FIELD — TRANSITION */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{transition.name}</p>
          <h2 className="mt-2 text-2xl font-bold text-primary-dark sm:text-3xl">{transition.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{transition.intro}</p>

          <div className="mt-8 flex flex-col items-stretch gap-2">
            {transition.stages.map((stage, i) => (
              <div key={stage.name} className="flex flex-col items-center">
                <div className="w-full rounded-xl border border-border bg-card px-5 py-4 text-center">
                  <p className="text-sm font-bold uppercase tracking-wide text-primary-dark">{stage.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{stage.body}</p>
                </div>
                {i < transition.stages.length - 1 && (
                  <svg width="16" height="20" viewBox="0 0 16 20" className="my-1 text-ink-soft/50" aria-hidden="true">
                    <path d="M8 0 L8 14 M2 9 L8 15 L14 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          <p className="mt-8 rounded-xl border border-accent/30 bg-accent/5 p-5 text-center font-medium text-primary-dark">
            {transition.closing}
          </p>

          <div className="mt-4 text-center">
            <Link href="/science/transition" className="text-sm font-semibold text-primary underline underline-offset-4">
              Read the Science of PQNK Transition →
            </Link>
          </div>
        </div>
      </Section>

      {/* ENGINEERING THE SCIENCE — PRODUCTION ARCHITECTURE */}
      <Section muted>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{productionArchitecture.name}</p>
          <h2 className="mt-2 text-2xl font-bold text-primary-dark sm:text-3xl">{productionArchitecture.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{productionArchitecture.intro}</p>
          <p className="mt-3 leading-relaxed text-ink-soft">{productionArchitecture.body}</p>

          <div className="mt-8">
            <ScienceApplicationNote
              science={productionArchitecture.scienceApplication.science}
              application={productionArchitecture.scienceApplication.application}
            />
          </div>

          <p className="mt-4 text-center text-sm font-semibold uppercase tracking-wide text-ink-soft/70">
            Science page coming soon
          </p>
        </div>
      </Section>

      {/* SYSTEM OUTCOMES */}
      <Section>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">System Outcomes</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {systemOutcomes.map((t) => {
              const outcomeCtaBySlug: Record<string, string> = {
                climate: "Explore Climate Science →",
                "food-quality": "Explore Food Quality Science →",
              };
              const cta = outcomeCtaBySlug[t.slug];
              return cta ? (
                <Link
                  key={t.slug}
                  href={t.futureRoute}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-accent">Read now</span>
                  <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">{t.name}</h3>
                  <p className="mt-1 text-sm font-medium italic text-ink-soft">{t.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">{t.summary}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-accent">{cta}</span>
                </Link>
              ) : (
                <FutureTopicCard key={t.slug} name={t.name} tagline={t.tagline} summary={t.summary} />
              );
            })}
          </div>
        </div>
      </Section>

      {/* SCIENCE AND EVIDENCE */}
      <Section muted>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{scienceAndEvidence.title}</h2>
          <div className="mx-auto mt-6 grid max-w-xl gap-4 text-start sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">Mechanism</p>
              <p className="mt-1 text-sm text-ink-soft">{scienceAndEvidence.mechanismLabel}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-accent">Evidence</p>
              <p className="mt-1 text-sm text-ink-soft">{scienceAndEvidence.evidenceLabel}</p>
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-ink-soft">{scienceAndEvidence.body}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/papers" className="text-sm font-semibold text-primary underline underline-offset-4">
              Explore Knowledge Papers →
            </Link>
            <Link href="/farmer-voices" className="text-sm font-semibold text-primary underline underline-offset-4">
              Explore Farmer Voices →
            </Link>
          </div>
        </div>
      </Section>

      {/* ONE SCIENCE, MANY CROPS */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark sm:text-3xl">{oneScience.title}</h2>
          <p className="mt-4 leading-relaxed text-ink-soft">{oneScience.body}</p>
          <Link href="/crops" className="mt-6 inline-block text-sm font-semibold text-primary underline underline-offset-4">
            Explore Crops & Solutions →
          </Link>
        </div>
      </Section>

      {/* CLOSING */}
      <Section muted className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <div className="absolute inset-0 bg-primary-dark" />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">{closing.title}</h2>
            <div className="mt-5 flex flex-col gap-4 text-cream/95">
              {closing.body.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <p className="mt-5 text-lg font-semibold text-accent-light">{closing.objective}</p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-2 border-t border-cream/15 pt-8 text-sm font-semibold text-cream/90">
              {closing.pathway.map((step, i) => (
                <span key={step} className="flex items-center gap-2">
                  {step}
                  {i < closing.pathway.length - 1 && <span aria-hidden="true">→</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

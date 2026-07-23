import dict from "@/lib/dictionaries";
import Section from "@/components/Section";

export default function AboutPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.about.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.about.intro}</p>
        </div>
      </section>

      <Section>
        <h2 className="text-center text-3xl font-bold text-primary-dark">{dict.about.missionTitle}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dict.about.missionPoints.map((point) => (
            <div key={point.title} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-primary">{point.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{point.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-primary-dark">{dict.about.founderTitle}</h2>
          <p className="mt-2 text-xl font-semibold text-accent">{dict.about.founderName}</p>
          <div className="mt-6 flex flex-col gap-4 text-ink-soft">
            {dict.about.founderBody.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-primary-dark">{dict.about.philosophyTitle}</h2>
          <div className="mt-6 flex flex-col gap-4 text-ink-soft">
            {dict.about.philosophyBody.map((paragraph, i) => (
              <p key={i} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

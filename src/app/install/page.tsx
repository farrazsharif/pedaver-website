import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Install Pedaver PQNK — Free, No App Store Needed",
  description:
    "Add Pedaver PQNK to your phone's home screen and use it like an app — no App Store, no Play Store, completely free.",
  path: "/install",
});

function StepList({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-5 flex flex-col gap-4">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-primary text-sm font-bold text-cream">
            {i + 1}
          </span>
          <span className="pt-0.5 text-ink-soft">{step}</span>
        </li>
      ))}
    </ol>
  );
}

export default function InstallPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <img src="/apple-icon.png" alt="Pedaver PQNK" className="mx-auto h-24 w-24 rounded-2xl shadow-md" />
          <h1 className="mt-6 text-4xl font-extrabold text-primary-dark">{dict.install.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.install.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-7">
            <h2 className="text-xl font-bold text-primary-dark">{dict.install.androidTitle}</h2>
            <StepList steps={dict.install.androidSteps} />
          </div>
          <div className="rounded-2xl border border-border bg-card p-7">
            <h2 className="text-xl font-bold text-primary-dark">{dict.install.iphoneTitle}</h2>
            <StepList steps={dict.install.iphoneSteps} />
          </div>
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark">{dict.install.resultTitle}</h2>
          <p className="mt-3 text-ink-soft">{dict.install.resultBody}</p>
          <p className="mt-8 text-sm text-ink-soft">{dict.install.translateNote}</p>
        </div>
      </Section>
    </div>
  );
}

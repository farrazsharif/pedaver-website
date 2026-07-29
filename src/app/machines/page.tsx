import Link from "next/link";
import dict from "@/lib/dictionaries";
import { machines, machinePhilosophy } from "@/lib/content/machines";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "PQNK Machines — Hardpan Breaking, Permanent Raised Beds & SIPP/VIPP Planters",
  description:
    "The engineering behind PQNK: why breaking the hardpan matters, how permanent raised beds are built to last, and how the SIPP and VIPP planters plant directly through thick organic mulch.",
  path: "/machines",
});

export default function MachinesPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.machines.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.machines.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <h2 className="text-2xl font-bold text-primary-dark">{dict.machines.philosophyTitle}</h2>
          {machinePhilosophy.map((paragraph, idx) => (
            <p key={idx} className="leading-relaxed text-ink-soft">
              {paragraph}
            </p>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {machines.map((machine) => (
            <article key={machine.slug} id={machine.slug} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-primary-dark">{machine.title}</h2>
              <p className="mt-2 text-sm font-medium italic text-ink-soft">{machine.summary}</p>
              {machine.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={machine.image}
                  alt={machine.title}
                  className="mt-4 w-full max-w-md rounded-xl border border-border object-cover shadow-sm"
                />
              )}
              <div className="mt-4 flex flex-col gap-3">
                {machine.body.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
              {machine.videoId && (
                <div className="mt-5 max-w-md overflow-hidden rounded-xl border border-border shadow-sm">
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${machine.videoId}`}
                      title={`${machine.title} — video`}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-primary-dark">{dict.machines.paperTitle}</h2>
          <p className="mx-auto max-w-xl text-ink-soft">{dict.machines.paperBody}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/papers/the-evolution-of-seed-placement"
              className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink shadow transition hover:bg-accent-light"
            >
              {dict.machines.paperButton}
            </Link>
            <Link
              href="/contact"
              className="inline-block rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary-dark transition hover:bg-primary/10"
            >
              {dict.machines.ctaButton}
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

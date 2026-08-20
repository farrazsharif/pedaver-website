import Link from "next/link";
import dict from "@/lib/dictionaries";
import { machines, machinePhilosophy, type Machine } from "@/lib/content/machines";
import Section from "@/components/Section";
import SectionViewTracker from "@/components/analytics/SectionViewTracker";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "PQNK Machines — Hardpan Breaking, Permanent Raised Beds & SIPP/VIPP Planters",
  description:
    "The engineering behind PQNK: why breaking the hardpan matters, how permanent raised beds are built to last, and how the SIPP and VIPP planters plant directly through thick organic mulch.",
  path: "/machines",
});

const CATEGORIES: { key: Machine["category"]; title: string; note: string }[] = [
  {
    key: "transition",
    title: "One-Time / Transition Engineering",
    note: "Used once, to correct inherited damage and establish permanent farm architecture — not repeated season after season.",
  },
  {
    key: "periodic",
    title: "Periodic Production Engineering",
    note: "Used every production cycle, working with the permanent architecture the transition machinery already established.",
  },
];

function MachineCard({ machine }: { machine: Machine }) {
  return (
    <article id={machine.slug} className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <SectionViewTracker
        targetId={machine.slug}
        contentType="machine"
        contentId={machine.slug}
        contentTitle={machine.title}
      />
      <h3 className="text-xl font-bold text-primary-dark">{machine.title}</h3>
      <p className="mt-1 text-sm font-medium italic text-ink-soft">{machine.summary}</p>
      <p className="mt-3 leading-relaxed text-ink-soft">{machine.overviewBlurb}</p>
      <Link
        href={`/machines/${machine.slug}`}
        className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
      >
        Read the full page →
      </Link>
    </article>
  );
}

export default function MachinesPage() {
  // Mirrors the machine cards already rendered below.
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "PQNK Machines — Hardpan Breaking, Permanent Raised Beds & SIPP/VIPP Planters",
    url: `${SITE_URL}/machines`,
    isPartOf: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: machines.length,
      itemListElement: machines.map((machine, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `${SITE_URL}/machines/${machine.slug}`,
        name: machine.title,
      })),
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
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

      {CATEGORIES.map((category) => {
        const items = machines.filter((m) => m.category === category.key);
        if (items.length === 0) return null;
        return (
          <Section key={category.key} muted={category.key === "transition"}>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-primary-dark">{category.title}</h2>
              <p className="mt-2 text-ink-soft">{category.note}</p>
              <div className="mt-8 flex flex-col gap-6">
                {items.map((machine) => (
                  <MachineCard key={machine.slug} machine={machine} />
                ))}
              </div>
            </div>
          </Section>
        );
      })}

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

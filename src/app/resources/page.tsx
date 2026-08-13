import Link from "next/link";
import dict from "@/lib/dictionaries";
import { resources, type Resource } from "@/lib/content/resources";
import Section from "@/components/Section";
import SectionViewTracker from "@/components/analytics/SectionViewTracker";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "PQNK Core Techniques — Hardpan, Raised Beds, Jantar & Mulch",
  description:
    "The core operational techniques through which PQNK's principles are implemented in the field: breaking the hardpan, correcting soil chemistry, permanent raised beds, Jantar cover cropping, mulch and no-till planting, and soil moisture management.",
  path: "/resources",
});

const CATEGORIES: { key: Resource["category"]; title: string; note: string }[] = [
  {
    key: "one-time",
    title: "One-Time Transition Operations",
    note: "Applied once, to correct inherited damage and establish the permanent system — not repeated season after season.",
  },
  {
    key: "permanent",
    title: "Permanent Production Practices",
    note: "Repeated every production cycle, for the life of the field, once the transition is complete.",
  },
];

function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article id={resource.slug} className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-sm">
      <SectionViewTracker
        targetId={resource.slug}
        contentType="resource"
        contentId={resource.slug}
        contentTitle={resource.title}
      />
      <h3 className="text-xl font-bold text-primary-dark">{resource.title}</h3>
      <p className="mt-1 text-sm font-medium italic text-ink-soft">{resource.oneSentenceDefinition}</p>
      <p className="mt-3 leading-relaxed text-ink-soft">{resource.overviewBlurb}</p>
      <Link
        href={`/resources/${resource.slug}`}
        className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-4"
      >
        {dict.resources.readMore} →
      </Link>
    </article>
  );
}

export default function ResourcesPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.resources.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.resources.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <h2 className="text-2xl font-bold text-primary-dark">{dict.resources.philosophyTitle}</h2>
          <p className="leading-relaxed text-ink-soft">{dict.resources.philosophyBody}</p>
        </div>
      </Section>

      {CATEGORIES.map((category) => {
        const items = resources.filter((r) => r.category === category.key);
        if (items.length === 0) return null;
        return (
          <Section key={category.key} muted={category.key === "one-time"}>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-primary-dark">{category.title}</h2>
              <p className="mt-2 text-ink-soft">{category.note}</p>
              <div className="mt-8 flex flex-col gap-6">
                {items.map((resource) => (
                  <ResourceCard key={resource.slug} resource={resource} />
                ))}
              </div>
            </div>
          </Section>
        );
      })}
    </div>
  );
}

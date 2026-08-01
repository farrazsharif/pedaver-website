import dict from "@/lib/dictionaries";
import { resources } from "@/lib/content/resources";
import Section from "@/components/Section";
import SectionViewTracker from "@/components/analytics/SectionViewTracker";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "PQNK Core Techniques — Hardpan, Raised Beds, Jantar & Mulch",
  description:
    "The six core PQNK techniques explained once: breaking the hardpan, correcting soil chemistry, raised beds, Jantar cover cropping, mulch planting, and moisture management.",
  path: "/resources",
});

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
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {resources.map((resource) => (
            <article key={resource.slug} id={resource.slug} className="scroll-mt-24">
              <SectionViewTracker
                targetId={resource.slug}
                contentType="resource"
                contentId={resource.slug}
                contentTitle={resource.title}
              />
              <h2 className="text-2xl font-bold text-primary-dark">{resource.title}</h2>
              <p className="mt-2 text-sm font-medium italic text-ink-soft">{resource.summary}</p>
              <div className="mt-4 flex flex-col gap-3">
                {resource.body.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>
    </div>
  );
}

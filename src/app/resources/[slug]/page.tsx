import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resources, getResourceBySlug } from "@/lib/content/resources";
import Section from "@/components/Section";
import ContentViewTracker from "@/components/analytics/ContentViewTracker";
import TrackedRelatedLink from "@/components/analytics/TrackedRelatedLink";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

const CATEGORY_LABEL = {
  "one-time": "One-Time Transition Operation",
  permanent: "Permanent Production Practice",
} as const;

/** Resources with a genuinely sequential procedure get HowTo; the rest, which primarily explain a PQNK concept, get TechArticle. */
const HOWTO_SLUGS = new Set(["soil-chemistry-correction", "mulch-and-no-till"]);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};

  return buildMetadata({
    title: `${resource.title} | PQNK Core Techniques | Pedaver`,
    description: resource.oneSentenceDefinition,
    path: `/resources/${slug}`,
  });
}

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const isHowTo = HOWTO_SLUGS.has(slug);
  const jsonLd = isHowTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: resource.title,
        description: resource.oneSentenceDefinition,
        url: `${SITE_URL}/resources/${slug}`,
        step: resource.pqnkTechnique.map((text, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          text,
        })),
      }
    : {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: resource.title,
        description: resource.oneSentenceDefinition,
        url: `${SITE_URL}/resources/${slug}`,
        author: { "@id": `${SITE_URL}/founder#person` },
        publisher: { "@id": `${SITE_URL}/#organization` },
      };

  return (
    <div>
      <ContentViewTracker contentType="resource" contentId={slug} contentTitle={resource.title} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <Link href="/resources" className="text-sm font-semibold text-primary underline underline-offset-4">
            ← All Core PQNK Techniques
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {CATEGORY_LABEL[resource.category]}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-primary-dark">{resource.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {resource.oneSentenceDefinition}
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <div>
            <h2 className="text-2xl font-bold text-primary-dark">Why It Exists</h2>
            <div className="mt-3 flex flex-col gap-4 text-ink-soft">
              {resource.whyItExists.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary-dark">The PQNK Technique</h2>
            <div className="mt-3 flex flex-col gap-4 text-ink-soft">
              {resource.pqnkTechnique.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-accent">One-Time or Permanent?</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{resource.oneTimeOrPermanent}</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-primary-dark">Universal Principle</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{resource.universalPrinciple}</p>
          </div>

          {resource.localImplementation && resource.localImplementation.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-primary-dark">Local Implementation</h2>
              <div className="mt-2 flex flex-col gap-3 text-ink-soft">
                {resource.localImplementation.map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </Section>

      {((resource.relatedMachinery?.length ?? 0) > 0 || (resource.furtherReading?.length ?? 0) > 0) && (
        <Section muted>
          <div className="mx-auto max-w-3xl">
            {resource.relatedMachinery && resource.relatedMachinery.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-primary-dark">Related Machinery</h2>
                <div className="mt-3 flex flex-wrap gap-3">
                  {resource.relatedMachinery.map((link) => (
                    <TrackedRelatedLink
                      key={link.href}
                      href={link.href}
                      fromType="resource"
                      fromId={slug}
                      toType="machine"
                      toId={link.href}
                      className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                    >
                      {link.label} →
                    </TrackedRelatedLink>
                  ))}
                </div>
              </div>
            )}

            {resource.furtherReading && resource.furtherReading.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-primary-dark">Further Reading</h2>
                <div className="mt-3 flex flex-wrap gap-3">
                  {resource.furtherReading.map((link) => (
                    <TrackedRelatedLink
                      key={link.href}
                      href={link.href}
                      fromType="resource"
                      fromId={slug}
                      toType="paper"
                      toId={link.href}
                      className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                    >
                      {link.label} →
                    </TrackedRelatedLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      )}
    </div>
  );
}

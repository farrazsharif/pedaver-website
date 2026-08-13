import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { machines, getMachineBySlug } from "@/lib/content/machines";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import TrackedVideo from "@/components/analytics/TrackedVideo";
import ContentViewTracker from "@/components/analytics/ContentViewTracker";
import TrackedRelatedLink from "@/components/analytics/TrackedRelatedLink";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateStaticParams() {
  return machines.map((machine) => ({ slug: machine.slug }));
}

const CATEGORY_LABEL = {
  transition: "One-Time / Transition Engineering",
  periodic: "Periodic Production Engineering",
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const machine = getMachineBySlug(slug);
  if (!machine) return {};

  return buildMetadata({
    title: `${machine.title} | PQNK Machines | Pedaver`,
    description: machine.summary,
    path: `/machines/${slug}`,
    image: machine.image ? `${SITE_URL}${machine.image}` : undefined,
  });
}

export default async function MachineDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const machine = getMachineBySlug(slug);
  if (!machine) notFound();

  const techArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: machine.title,
    description: machine.summary,
    url: `${SITE_URL}/machines/${slug}`,
    ...(machine.image ? { image: `${SITE_URL}${machine.image}` } : {}),
    author: { "@id": `${SITE_URL}/founder#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <div>
      <ContentViewTracker contentType="machine" contentId={slug} contentTitle={machine.title} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleJsonLd) }}
      />

      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <Link href="/machines" className="text-sm font-semibold text-primary underline underline-offset-4">
            ← All PQNK Machines
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            {CATEGORY_LABEL[machine.category]}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-primary-dark">{machine.title}</h1>
          {machine.fullName && !machine.title.includes(machine.fullName) && (
            <p className="mt-2 text-lg font-medium text-accent">
              {machine.shortName} — {machine.fullName}
            </p>
          )}
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{machine.summary}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {machine.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={machine.image}
              alt={machine.title}
              className="w-full max-w-md rounded-xl border border-border object-cover shadow-sm"
            />
          )}

          {machine.videoId && (
            <div className="max-w-md overflow-hidden rounded-xl border border-border shadow-sm">
              <VideoEmbed
                videoId={machine.videoId}
                title={`${machine.title} — video`}
                context="machine"
                contextId={machine.slug}
                className="aspect-video w-full"
              />
            </div>
          )}
          {machine.videoFile && (
            <div className="max-w-md overflow-hidden rounded-xl border border-border shadow-sm">
              <TrackedVideo
                src={machine.videoFile}
                contextType="machine"
                contextId={machine.slug}
                className="h-full w-full"
                ariaLabel={`${machine.title} — video`}
              />
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-primary-dark">Why It's Needed</h2>
            <div className="mt-3 flex flex-col gap-4 text-ink-soft">
              {machine.whyNeeded.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary-dark">Operating Principle</h2>
            <div className="mt-3 flex flex-col gap-4 text-ink-soft">
              {machine.operatingPrinciple.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-primary-dark">Relationship to PQNK</h2>
            <div className="mt-3 flex flex-col gap-4 text-ink-soft">
              {machine.pqnkRelationship.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {machine.engineeringCharacteristics && machine.engineeringCharacteristics.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-primary-dark">Engineering Characteristics</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {machine.engineeringCharacteristics.map((spec, i) => (
                  <li key={i} className="flex gap-2 leading-relaxed text-ink-soft">
                    <span aria-hidden="true" className="mt-0.5 text-accent">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-primary-dark">Field Operation</h2>
            <div className="mt-3 flex flex-col gap-4 text-ink-soft">
              {machine.fieldOperation.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {(machine.relatedConcepts.length > 0 || (machine.furtherReading?.length ?? 0) > 0) && (
        <Section muted>
          <div className="mx-auto max-w-3xl">
            {machine.relatedConcepts.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-primary-dark">Related PQNK Concepts</h2>
                <div className="mt-3 flex flex-wrap gap-3">
                  {machine.relatedConcepts.map((link) => (
                    <TrackedRelatedLink
                      key={link.href}
                      href={link.href}
                      fromType="machine"
                      fromId={machine.slug}
                      toType={link.href.startsWith("/machines") ? "machine" : "resource"}
                      toId={link.href}
                      className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10"
                    >
                      {link.label} →
                    </TrackedRelatedLink>
                  ))}
                </div>
              </div>
            )}

            {machine.furtherReading && machine.furtherReading.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-primary-dark">Further Reading</h2>
                <div className="mt-3 flex flex-wrap gap-3">
                  {machine.furtherReading.map((link) => (
                    <TrackedRelatedLink
                      key={link.href}
                      href={link.href}
                      fromType="machine"
                      fromId={machine.slug}
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

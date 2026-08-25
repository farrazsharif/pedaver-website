import Link from "next/link";
import type { Metadata } from "next";
import {
  fieldEvidence,
  getFieldEvidenceBySlug,
  formatFeNumber,
  getOtherFieldEvidenceByFarmer,
} from "@/lib/content/fieldEvidence";
import { getRelatedPapersForFieldEvidence } from "@/lib/content/crossLinks";
import { crops } from "@/lib/content/crops";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import ContentViewTracker from "@/components/analytics/ContentViewTracker";
import TrackedRelatedLink from "@/components/analytics/TrackedRelatedLink";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateStaticParams() {
  return fieldEvidence.map((fe) => ({ slug: fe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fe = getFieldEvidenceBySlug(slug);
  if (!fe) return {};

  return buildMetadata({
    title: `${fe.title} | Field Evidence | Pedaver`,
    description: fe.summary,
    path: `/field-evidence/${slug}`,
    type: "article",
  });
}

export default async function FieldEvidenceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fe = getFieldEvidenceBySlug(slug);
  if (!fe) notFound();

  const relatedPapers = getRelatedPapersForFieldEvidence(fe);
  const otherByFarmer = getOtherFieldEvidenceByFarmer(fe);
  const relatedCrop = fe.cropSlug ? crops.find((c) => c.slug === fe.cropSlug) : undefined;
  const cropLabel = fe.cropName ?? relatedCrop?.name;
  const placeLabel = [fe.location, fe.district && fe.district !== fe.location ? fe.district : undefined, fe.province, fe.country]
    .filter(Boolean)
    .join(", ");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: fe.title,
    description: fe.summary,
    url: `${SITE_URL}/field-evidence/${slug}`,
    author: fe.farmer ? { "@type": "Person", name: fe.farmer } : { "@id": `${SITE_URL}/founder#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Field Evidence", item: `${SITE_URL}/field-evidence` },
      { "@type": "ListItem", position: 3, name: fe.title, item: `${SITE_URL}/field-evidence/${slug}` },
    ],
  };

  return (
    <div>
      <ContentViewTracker contentType="field-evidence" contentId={slug} contentTitle={fe.title} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
            <Link href="/field-evidence" className="font-semibold text-primary underline underline-offset-4">
              ← Back to Field Evidence
            </Link>
          </nav>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
            {formatFeNumber(fe.feNumber)} · {fe.evidenceType}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-primary-dark">{fe.title}</h1>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-6">
            {fe.videoId ? (
              <VideoEmbed
                videoId={fe.videoId}
                title={fe.title}
                context="field-evidence"
                contextId={fe.slug}
              />
            ) : (
              fe.videoSourceUrl && (
                <a
                  href={fe.videoSourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
                >
                  Watch on {fe.videoSourceName ?? "YouTube"} →
                </a>
              )
            )}

            <blockquote className="rounded-xl border border-border bg-card p-6 text-lg italic leading-relaxed text-ink">
              &ldquo;{fe.quote ?? fe.summary}&rdquo;
            </blockquote>

            {fe.videoId && fe.videoSourceName && fe.videoSourceUrl && (
              <a
                href={fe.videoSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="-mt-4 inline-block text-xs font-semibold text-accent hover:text-accent-light"
              >
                Watch on {fe.videoSourceName} →
              </a>
            )}

            {fe.keyObservations && fe.keyObservations.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-primary-dark">Key Observations</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {fe.keyObservations.map((obs, i) => (
                    <li key={i} className="flex gap-2 text-ink-soft">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-accent">About This Record</h2>
              <dl className="mt-3 flex flex-col gap-3 text-sm">
                {fe.farmer && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Farmer</dt>
                    <dd className="mt-1 text-ink-soft">{fe.farmer}</dd>
                  </div>
                )}
                {cropLabel && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Crop</dt>
                    <dd className="mt-1 text-ink-soft">{cropLabel}</dd>
                  </div>
                )}
                {placeLabel && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Location</dt>
                    <dd className="mt-1 text-ink-soft">{placeLabel}</dd>
                  </div>
                )}
                {fe.pqnkYears !== undefined && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Years under PQNK</dt>
                    <dd className="mt-1 text-ink-soft">{fe.pqnkYears}</dd>
                  </div>
                )}
                {(fe.recordedDate || fe.year) && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Recorded</dt>
                    <dd className="mt-1 text-ink-soft">{fe.recordedDate ?? fe.year}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Evidence Type</dt>
                  <dd className="mt-1 text-ink-soft">{fe.evidenceType}</dd>
                </div>
                {fe.sourceAttribution && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Source</dt>
                    <dd className="mt-1 text-ink-soft">{fe.sourceAttribution}</dd>
                  </div>
                )}
              </dl>
            </div>

            {relatedCrop && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Related Crop</h2>
                <TrackedRelatedLink
                  href={`/crops/${relatedCrop.slug}`}
                  fromType="field-evidence"
                  fromId={fe.slug}
                  toType="crop"
                  toId={relatedCrop.slug}
                  className="mt-2 inline-block text-sm font-semibold text-primary-dark hover:text-primary"
                >
                  {relatedCrop.name} →
                </TrackedRelatedLink>
              </div>
            )}

            {relatedPapers.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Related Knowledge</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {relatedPapers.map((paper) => (
                    <li key={paper.slug}>
                      <TrackedRelatedLink
                        href={`/papers/${paper.slug}`}
                        fromType="field-evidence"
                        fromId={fe.slug}
                        toType="paper"
                        toId={paper.slug}
                        className="text-sm font-semibold text-primary-dark hover:text-primary"
                      >
                        {paper.title} →
                      </TrackedRelatedLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {otherByFarmer.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-accent">
                  More From {fe.farmer}
                </h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {otherByFarmer.map((other) => (
                    <li key={other.slug}>
                      <TrackedRelatedLink
                        href={`/field-evidence/${other.slug}`}
                        fromType="field-evidence"
                        fromId={fe.slug}
                        toType="field-evidence"
                        toId={other.slug}
                        className="text-sm font-semibold text-primary-dark hover:text-primary"
                      >
                        {formatFeNumber(other.feNumber)} · {other.title} →
                      </TrackedRelatedLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
}

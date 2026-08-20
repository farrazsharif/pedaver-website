import Link from "next/link";
import type { Metadata } from "next";
import dict from "@/lib/dictionaries";
import { papers, getPaperBySlug } from "@/lib/content/papers";
import { getRelatedCrops } from "@/lib/content/crossLinks";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import TrackedVideo from "@/components/analytics/TrackedVideo";
import ContentViewTracker from "@/components/analytics/ContentViewTracker";
import TrackedPdfLink from "@/components/analytics/TrackedPdfLink";
import TrackedExternalLink from "@/components/analytics/TrackedExternalLink";
import TrackedRelatedLink from "@/components/analytics/TrackedRelatedLink";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { getMetadata, REQUIRES_REVIEW, EXTERNAL_EVIDENCE } from "@/lib/content/knowledge/taxonomy";
import { getRelatedKnowledge } from "@/lib/content/knowledge/related";
import { getFarmerQuestionOrigin } from "@/lib/content/knowledge/farmerQuestions";
import FarmerQuestionBlock from "@/components/papers/FarmerQuestionBlock";

const SCIENCE_PAGE_LABELS: Record<string, string> = {
  "/science/soil": "Soil Science",
  "/science/plants": "Plant Science",
  "/science/water": "Water Science",
  "/science/biodiversity": "Biodiversity Science",
  "/science/nutrition": "Nutrition Science",
  "/science/crop-protection": "Crop Protection Science",
  "/science/climate": "Climate Science",
  "/science/food-quality": "Food Quality Science",
  "/science/production-architecture": "Production Architecture",
  "/science/transition": "Transition Science",
};

export async function generateStaticParams() {
  return papers.map((paper) => ({ slug: paper.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) return {};

  return buildMetadata({
    title: `${paper.title} | Pedaver`,
    description: paper.summary,
    path: `/papers/${slug}`,
    image: paper.heroImage ? `${SITE_URL}${paper.heroImage}` : undefined,
    type: "article",
  });
}

export default async function PaperDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);
  if (!paper) notFound();

  const relatedCrops = getRelatedCrops(paper);
  const meta = getMetadata(slug);
  const relatedKnowledge = getRelatedKnowledge(paper, meta, papers, getMetadata, 4);
  const farmerQuestionOrigin = getFarmerQuestionOrigin(slug);

  const scholarlyArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paper.title,
    description: paper.summary,
    author: { "@id": `${SITE_URL}/founder#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/papers/${slug}`,
    // datePublished always reflects paper.publishedDate as authored (this
    // is correct even for externally-cited papers, where it's the cited
    // work's own original date — see sitemap.ts for why lastmod handles
    // that case differently). No separate "last edited" signal exists yet,
    // so dateModified mirrors it rather than asserting a freshness claim
    // this data can't back up.
    datePublished: paper.publishedDate,
    dateModified: paper.publishedDate,
    ...(paper.heroImage ? { image: `${SITE_URL}${paper.heroImage}` } : {}),
  };

  return (
    <div>
      <ContentViewTracker contentType="paper" contentId={slug} contentTitle={paper.title} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticleJsonLd) }}
      />

      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <Link href="/papers" className="text-sm font-semibold text-primary underline underline-offset-4">
            ← {dict.papers.backToAll}
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">{paper.category}</p>
          <h1 className="mt-2 text-4xl font-extrabold text-primary-dark">{paper.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{paper.summary}</p>
        </div>
      </section>

      {farmerQuestionOrigin && <FarmerQuestionBlock origin={farmerQuestionOrigin} />}

      {meta?.authorityStatus === REQUIRES_REVIEW && (
        <div className="border-b border-amber-200 bg-amber-50">
          <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
            <p className="text-sm text-amber-900">
              <span className="font-semibold">PQNK Authenticated — Editorial Consistency Review Pending —</span>{" "}
              this paper&rsquo;s underlying PQNK knowledge is authenticated. Wording, terminology, and
              presentation consistency with the rest of the Pedaver knowledge system are still being
              finalized.
            </p>
          </div>
        </div>
      )}
      {meta?.authorityStatus === EXTERNAL_EVIDENCE && (
        <div className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6">
            <p className="text-sm text-slate-700">
              <span className="font-semibold">External Knowledge —</span> this paper is sourced from
              outside Pedaver/PQNK. It is presented as supporting evidence, not as PQNK's own approved
              doctrine.
            </p>
          </div>
        </div>
      )}

      {paper.heroImage && (
        <div>
          <div className="h-56 w-full overflow-hidden sm:h-72 lg:h-80">
            <img
              src={paper.heroImage}
              alt={paper.title}
              className="h-full w-full object-cover object-top"
            />
          </div>
          {paper.heroImageCaption && (
            <p className="mx-auto max-w-4xl px-4 pt-2 text-center text-xs text-ink-soft sm:px-6">
              {paper.heroImageCaption}
            </p>
          )}
        </div>
      )}

      {paper.videoFile && (
        <Section>
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold text-primary-dark">Watch the Mechanism</h2>
            <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <TrackedVideo
                src={paper.videoFile}
                contextType="paper"
                contextId={slug}
                className="aspect-video w-full"
                ariaLabel={`${paper.title} — video`}
              />
            </div>
          </div>
        </Section>
      )}

      {paper.videoIds && paper.videoIds.length > 0 && (() => {
        const videoIds = paper.videoIds!;
        return (
          <Section>
            <div className="mx-auto max-w-5xl">
              <h2 className="text-xl font-bold text-primary-dark">Watch the Full Story</h2>
              <p className="mt-2 text-sm text-ink-soft">
                The same record, narrated in {videoIds.length} parts.
              </p>
              <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {videoIds.map((videoId, i) => (
                  <div key={videoId} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
                    <VideoEmbed
                      videoId={videoId}
                      title={`${paper.title} — Part ${i + 1}`}
                      context="paper"
                      contextId={slug}
                      className="aspect-video w-full"
                    />
                    <p className="p-3 text-center text-xs font-semibold text-ink-soft">Part {i + 1} of {videoIds.length}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        );
      })()}

      <Section>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="text-xl font-bold text-primary-dark">Abstract</h2>
            <div className="mt-3 flex flex-col gap-4">
              {paper.abstract.map((paragraph, i) => (
                <p key={i} className="leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {paper.pdfPath ? (
              <TrackedPdfLink
                href={paper.pdfPath}
                contentId={slug}
                contentTitle={paper.title}
                className="inline-block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
              >
                {dict.papers.downloadPdf}
              </TrackedPdfLink>
            ) : paper.externalUrl ? (
              <div className="flex flex-col gap-2">
                <TrackedExternalLink
                  href={paper.externalUrl}
                  contentId={slug}
                  publisher={paper.externalPublisher}
                  className="inline-block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
                >
                  {dict.papers.viewOnPublisher}
                </TrackedExternalLink>
                {paper.externalPublisher && (
                  <p className="text-center text-xs text-ink-soft">
                    Published in {paper.externalPublisher}. Hosted by the publisher; not reproduced on this site.
                  </p>
                )}
              </div>
            ) : null}

            {meta && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-accent">About This Paper</h2>
                <dl className="mt-3 flex flex-col gap-3 text-sm">
                  {meta.crops.length > 0 && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Crop</dt>
                      <dd className="mt-1 text-ink-soft">{meta.crops.join(" · ")}</dd>
                    </div>
                  )}
                  {meta.fieldProblems.length > 0 && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Problem</dt>
                      <dd className="mt-1 text-ink-soft">{meta.fieldProblems.join(" · ")}</dd>
                    </div>
                  )}
                  {meta.scientificDomains.length > 0 && (
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Science</dt>
                      <dd className="mt-1 text-ink-soft">{meta.scientificDomains.join(" · ")}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Evidence</dt>
                    <dd className="mt-1 text-ink-soft">{meta.evidenceType}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Authority</dt>
                    <dd className="mt-1 text-ink-soft">{meta.authorityStatus}</dd>
                  </div>
                </dl>
              </div>
            )}

            {meta && meta.scienceLinks.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Related PQNK Science</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {meta.scienceLinks.map((link) => (
                    <li key={link.page}>
                      <TrackedRelatedLink
                        href={link.page}
                        fromType="paper"
                        fromId={slug}
                        toType="science"
                        toId={link.page}
                        className="text-sm font-semibold text-primary-dark hover:text-primary"
                      >
                        {SCIENCE_PAGE_LABELS[link.page] ?? link.page} →
                      </TrackedRelatedLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {paper.keyTakeaways.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-accent">{dict.papers.keyTakeawaysTitle}</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {paper.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex gap-2 text-sm text-ink-soft">
                      <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {relatedCrops.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Related Crops</h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {relatedCrops.map((crop) => (
                    <li key={crop.slug}>
                      <TrackedRelatedLink
                        href={`/crops/${crop.slug}`}
                        fromType="paper"
                        fromId={slug}
                        toType="crop"
                        toId={crop.slug}
                        className="text-sm font-semibold text-primary-dark hover:text-primary"
                      >
                        {crop.name} →
                      </TrackedRelatedLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Section>

      {relatedKnowledge.length > 0 && (
        <Section muted>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-bold text-primary-dark">Related Knowledge</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              {relatedKnowledge.map(({ paper: related, reason }) => (
                <TrackedRelatedLink
                  key={related.slug}
                  href={`/papers/${related.slug}`}
                  fromType="paper"
                  fromId={slug}
                  toType="paper"
                  toId={related.slug}
                  className="group flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">{reason}</p>
                  <h3 className="mt-1.5 text-base font-bold text-primary-dark group-hover:text-primary">
                    {related.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{related.summary}</p>
                </TrackedRelatedLink>
              ))}
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}

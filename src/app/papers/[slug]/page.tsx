import Link from "next/link";
import type { Metadata } from "next";
import dict from "@/lib/dictionaries";
import { papers, getPaperBySlug } from "@/lib/content/papers";
import { getRelatedCrops } from "@/lib/content/crossLinks";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import { buildMetadata, SITE_URL, SITE_NAME } from "@/lib/seo";

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

  const scholarlyArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paper.title,
    description: paper.summary,
    author: {
      "@type": "Person",
      name: "Asif Sharif",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/papers/${slug}`,
    ...(paper.heroImage ? { image: `${SITE_URL}${paper.heroImage}` } : {}),
  };

  return (
    <div>
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

      {paper.heroImage && (
        <div className="h-56 w-full overflow-hidden sm:h-72 lg:h-80">
          <img src={paper.heroImage} alt={paper.title} className="h-full w-full object-cover" />
        </div>
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
                    <div className="aspect-video w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={`${paper.title} — Part ${i + 1}`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
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
              <a
                href={paper.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
              >
                {dict.papers.downloadPdf}
              </a>
            ) : paper.externalUrl ? (
              <div className="flex flex-col gap-2">
                <a
                  href={paper.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
                >
                  {dict.papers.viewOnPublisher}
                </a>
                {paper.externalPublisher && (
                  <p className="text-center text-xs text-ink-soft">
                    Published in {paper.externalPublisher}. Hosted by the publisher; not reproduced on this site.
                  </p>
                )}
              </div>
            ) : null}

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
                      <Link
                        href={`/crops/${crop.slug}`}
                        className="text-sm font-semibold text-primary-dark hover:text-primary"
                      >
                        {crop.name} →
                      </Link>
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

import Link from "next/link";
import type { Metadata } from "next";
import dict from "@/lib/dictionaries";
import { crops, getCropBySlug } from "@/lib/content/crops";
import { getCropImage } from "@/lib/content/cropImages";
import { cropSeo } from "@/lib/content/cropSeo";
import { getRelatedPapers } from "@/lib/content/crossLinks";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateStaticParams() {
  return crops.map((crop) => ({ slug: crop.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const crop = getCropBySlug(slug);
  if (!crop) return {};

  const seo = cropSeo[slug];
  const image = getCropImage(slug);

  return buildMetadata({
    title: seo?.title ?? `${crop.name} Under PQNK | Pedaver`,
    description: seo?.description ?? crop.blurb,
    path: `/crops/${slug}`,
    image: image ? `${SITE_URL}${image}` : undefined,
    type: "article",
  });
}

export default async function CropDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const crop = getCropBySlug(slug);
  if (!crop) notFound();

  const bannerImage = getCropImage(slug);
  const relatedPapers = getRelatedPapers(crop);

  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <Link
            href="/crops"
            className="text-sm font-semibold text-primary underline underline-offset-4"
          >
            ← {dict.crops.backToAll}
          </Link>
          <h1 className="mt-4 text-4xl font-extrabold text-primary-dark">{crop.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">{crop.blurb}</p>
        </div>
      </section>

      {bannerImage && (
        <div className="h-56 w-full overflow-hidden sm:h-72 lg:h-80">
          <img src={bannerImage} alt={`${crop.name} grown under PQNK`} className="h-full w-full object-cover" />
        </div>
      )}

      {crop.overview ? (
        <Section>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2">
            <div className="flex flex-col gap-8">
              {crop.overview && (
                <div>
                  <h2 className="text-xl font-bold text-primary-dark">{dict.cropDetail.overviewTitle}</h2>
                  <p className="mt-2 text-ink-soft leading-relaxed">{crop.overview}</p>
                </div>
              )}
              {crop.practices && crop.practices.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-primary-dark">{dict.cropDetail.practicesTitle}</h2>
                  <ul className="mt-3 flex flex-col gap-2">
                    {crop.practices.map((practice, i) => (
                      <li key={i} className="flex gap-2 text-ink-soft">
                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                        <span>{practice}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {crop.results && (
                <div className="rounded-xl border border-border bg-card p-5">
                  <h2 className="text-sm font-bold uppercase tracking-wide text-accent">
                    {dict.cropDetail.resultsTitle}
                  </h2>
                  <p className="mt-2 italic text-ink-soft">{crop.results}</p>
                </div>
              )}
            </div>
            {crop.videoId && (
              <div>
                <h2 className="mb-3 text-xl font-bold text-primary-dark">{dict.cropDetail.videoTitle}</h2>
                <VideoEmbed videoId={crop.videoId} title={crop.videoTitle ?? crop.name} />
              </div>
            )}
          </div>
        </Section>
      ) : (
        <Section>
          <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-primary/30 bg-card p-8 text-center">
            <p className="text-ink-soft">{dict.crops.comingSoonNote}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                href="/videos"
                className="rounded-full border border-primary px-5 py-2 text-sm font-semibold text-primary hover:bg-primary/10"
              >
                {dict.videos.pageTitle}
              </Link>
              <Link
                href="/contact"
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-cream hover:bg-primary-dark"
              >
                {dict.contact.pageTitle}
              </Link>
            </div>
          </div>
        </Section>
      )}

      {relatedPapers.length > 0 && (
        <Section muted>
          <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-bold text-primary-dark">Related Knowledge Papers</h2>
            <p className="mt-1 text-sm text-ink-soft">
              The full science and field data behind {crop.name.toLowerCase()} under PQNK.
            </p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {relatedPapers.map((paper) => (
                <li key={paper.slug}>
                  <Link
                    href={`/papers/${paper.slug}`}
                    className="block rounded-xl border border-border bg-card p-4 text-sm font-semibold text-primary-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {paper.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}
    </div>
  );
}

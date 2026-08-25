import Link from "next/link";
import dict from "@/lib/dictionaries";
import { videos, officialChannel, founderChannel, workshopVideos } from "@/lib/content/videos";
import { fieldEvidence, formatFeNumber } from "@/lib/content/fieldEvidence";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import { buildMetadata } from "@/lib/seo";

// A handful of the most recently added Field Evidence records, as a light
// teaser linking through to the full library — not a duplicate listing.
// Static thumbnails, not embedded iframes: this page shouldn't grow an
// iframe per record as the library scales (see field-evidence/page.tsx).
const featuredFieldEvidence = [...fieldEvidence].sort((a, b) => b.feNumber - a.feNumber).slice(0, 4);

export const metadata = buildMetadata({
  title: "Knowledge & Testimonials — PQNK Lectures and Farmer Stories",
  description:
    "The founder's lectures and knowledge videos, and farmers documenting their own PQNK results, all in one place — plus links to our YouTube channels and Facebook page.",
  path: "/videos",
});

export default function VideosPage() {
  const officialVideos = videos.filter((v) => v.channel === "official");
  const founderVideos = videos.filter((v) => v.channel === "founder");

  const renderChannel = (
    title: string,
    channel: typeof officialChannel,
    channelVideos: typeof videos
  ) => (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-bold text-primary-dark">{title}</h3>
        <a
          href={channel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-accent underline underline-offset-4"
        >
          {dict.videos.visitChannelButton} →
        </a>
      </div>
      <p className="mt-1 text-sm text-ink-soft">
        {channel.subscribers} {dict.videos.subscribers} · {channel.videoCount} {dict.videos.videosCount}
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {channelVideos.map((video) => (
          <div key={video.videoId}>
            <VideoEmbed videoId={video.videoId} title={video.title} context="video-library" contextId={video.videoId} />
            <p className="mt-3 text-sm font-medium text-ink">{video.title}</p>
            {video.description && <p className="mt-1 text-sm text-ink-soft">{video.description}</p>}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.videos.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.videos.pageSubtitle}</p>
          <p className="mx-auto mt-6 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            {dict.videos.followTitle}
          </p>
          <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://www.facebook.com/Pedaver"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.6v8h3.6z" />
              </svg>
              {dict.videos.facebookLabel}
            </a>
            <a
              href={officialChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7C23 15.2 23 12 23 12zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
              </svg>
              YouTube — {officialChannel.name}
            </a>
            <a
              href={founderChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-primary-dark shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7C23 15.2 23 12 23 12zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
              </svg>
              YouTube — {founderChannel.name}
            </a>
          </div>
        </div>
      </section>

      <Section>
        <h2 className="text-2xl font-bold text-primary-dark">{dict.videos.lecturesTitle}</h2>
        <div className="mt-8 flex flex-col gap-12">
          {renderChannel(dict.videos.officialChannelTitle, officialChannel, officialVideos)}
          {renderChannel(dict.videos.founderChannelTitle, founderChannel, founderVideos)}
        </div>
      </Section>

      {workshopVideos.length > 0 && (
        <Section muted className="scroll-mt-24" id="workshops">
          <h2 className="text-2xl font-bold text-primary-dark">{dict.videos.workshopsTitle}</h2>
          <p className="mt-1 text-ink-soft">{dict.videos.workshopsSubtitle}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {workshopVideos.map((video) => (
              <div key={video.videoId}>
                <VideoEmbed videoId={video.videoId} title={video.title} context="video-library" contextId={video.videoId} />
                <p className="mt-3 text-sm font-medium text-ink">{video.title}</p>
                {video.description && <p className="mt-1 text-sm text-ink-soft">{video.description}</p>}
                <a
                  href={video.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs font-semibold text-accent hover:text-accent-light"
                >
                  {dict.videos.watchOn} {video.sourceName} →
                </a>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-primary-dark">{dict.videos.testimonialsTitle}</h2>
            <p className="mt-1 max-w-xl text-ink-soft">{dict.videos.testimonialsSubtitle}</p>
          </div>
          <Link
            href="/field-evidence"
            className="inline-block flex-none rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-cream shadow-sm hover:bg-primary-dark"
          >
            {dict.videos.testimonialsCta} →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {featuredFieldEvidence.map((fe) => (
            <Link
              key={fe.slug}
              href={`/field-evidence/${fe.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {fe.videoId ? (
                <div className="aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={`https://i.ytimg.com/vi/${fe.videoId}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="h-1.5 w-full bg-accent" aria-hidden="true" />
              )}
              <div className="p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">
                  {formatFeNumber(fe.feNumber)}
                </p>
                <p className="mt-1 text-sm font-semibold text-primary-dark group-hover:text-primary">{fe.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}

import Link from "next/link";
import dict from "@/lib/dictionaries";
import { videos, officialChannel, founderChannel, workshopVideos } from "@/lib/content/videos";
import { fieldEvidence, formatFeNumber } from "@/lib/content/fieldEvidence";
import Section from "@/components/Section";
import VideoBrowser, { type BrowserVideo } from "@/components/VideoBrowser";
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
  // Search + sort (2026-10-14): one browser over both channels and the workshop videos; "By channel" keeps the
  // original channel grouping, "Recent" (default) puts the newest video first.
  const browserVideos: BrowserVideo[] = [
    ...videos.map((v) => ({
      videoId: v.videoId,
      title: v.title,
      description: v.description,
      group: v.channel === "official" ? dict.videos.officialChannelTitle : dict.videos.founderChannelTitle,
    })),
    ...workshopVideos.map((v) => ({
      videoId: v.videoId,
      title: v.title,
      description: v.description,
      group: dict.videos.workshopsTitle,
      sourceName: v.sourceName,
      sourceUrl: v.sourceUrl,
    })),
  ];
  const channelGroup = (title: string, channel: typeof officialChannel) => ({
    title,
    note: `${channel.subscribers} ${dict.videos.subscribers} · ${channel.videoCount} ${dict.videos.videosCount}`,
    linkLabel: dict.videos.visitChannelButton,
    linkHref: channel.url,
  });
  const browserGroups = [
    channelGroup(dict.videos.officialChannelTitle, officialChannel),
    channelGroup(dict.videos.founderChannelTitle, founderChannel),
    { title: dict.videos.workshopsTitle, note: dict.videos.workshopsSubtitle },
  ];

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
        <div className="mt-8">
          <VideoBrowser
            videos={browserVideos}
            groups={browserGroups}
            groupedLabel="By channel"
            defaultMode="recent"
            searchId="videos-search"
          />
        </div>
      </Section>

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
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {featuredFieldEvidence.map((fe) => (
            <div key={fe.feNumber} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-accent">
                {formatFeNumber(fe.feNumber)}
              </p>
              <p className="mt-1 text-sm font-semibold text-primary-dark">{fe.title}</p>
              {fe.sourceUrl && (
                <a
                  href={fe.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-semibold text-accent hover:text-accent-light"
                >
                  Watch Video →
                </a>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

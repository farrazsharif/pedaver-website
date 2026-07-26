import Link from "next/link";
import dict from "@/lib/dictionaries";
import { videos, officialChannel, founderChannel } from "@/lib/content/videos";
import { farmerStories } from "@/lib/content/farmers";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import { buildMetadata } from "@/lib/seo";

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
            <VideoEmbed videoId={video.videoId} title={video.title} />
            <p className="mt-3 text-sm font-medium text-ink">{video.title}</p>
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
          <div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-semibold">
            <a
              href={officialChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light"
            >
              YouTube — {officialChannel.name} →
            </a>
            <a
              href={founderChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light"
            >
              YouTube — {founderChannel.name} →
            </a>
            <a
              href="https://www.facebook.com/Pedaver"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light"
            >
              {dict.videos.facebookLabel} →
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

      <Section muted>
        <h2 className="text-2xl font-bold text-primary-dark">{dict.videos.testimonialsTitle}</h2>
        <p className="mt-1 text-ink-soft">{dict.videos.testimonialsSubtitle}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {farmerStories.map((farmer) => (
            <div key={farmer.name} className="rounded-2xl border border-border bg-card p-6">
              {farmer.videoId && (
                <div className="mb-4">
                  <VideoEmbed videoId={farmer.videoId} title={`${farmer.name} — PQNK testimonial`} />
                  {farmer.videoSourceName && farmer.videoSourceUrl && (
                    <a
                      href={farmer.videoSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-xs font-semibold text-accent hover:text-accent-light"
                    >
                      Watch on {farmer.videoSourceName} →
                    </a>
                  )}
                </div>
              )}
              <p className="text-lg italic leading-relaxed text-ink">&ldquo;{farmer.quote}&rdquo;</p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="font-bold text-primary-dark">{farmer.name}</p>
                <p className="text-sm text-ink-soft">
                  {farmer.role}
                  {farmer.location ? ` · ${farmer.location}` : ""}
                </p>
                {farmer.cropSlug && (
                  <Link
                    href={`/crops/${farmer.cropSlug}`}
                    className="mt-2 inline-block text-sm font-semibold text-accent underline underline-offset-4"
                  >
                    {dict.videos.viewCrop} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

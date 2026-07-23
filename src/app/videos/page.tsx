import dict from "@/lib/dictionaries";
import { videos, officialChannel, founderChannel } from "@/lib/content/videos";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";

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
        <h2 className="text-2xl font-bold text-primary-dark">{title}</h2>
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
        </div>
      </section>

      <Section>{renderChannel(dict.videos.officialChannelTitle, officialChannel, officialVideos)}</Section>
      <Section muted>{renderChannel(dict.videos.founderChannelTitle, founderChannel, founderVideos)}</Section>
    </div>
  );
}

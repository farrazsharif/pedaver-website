import dict from "@/lib/dictionaries";
import { videoLibrary } from "@/lib/content/videoLibrary";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Video Library — PQNK Farmer Lectures & Field Guidance",
  description:
    "A topic-organized library of Urdu-language PQNK lectures and field guidance videos, covering land types, crops, machinery, and irrigation.",
  path: "/video-library",
});

export default function VideoLibraryPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.videoLibrary.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.videoLibrary.pageSubtitle}</p>
        </div>
      </section>

      {videoLibrary.map((category, i) => (
        <Section key={category.slug} muted={i % 2 === 1} className="scroll-mt-24" id={category.slug}>
          <h2 className="text-2xl font-bold text-primary-dark">{category.title}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {category.videos.map((video) => (
              <div key={video.videoId}>
                <VideoEmbed videoId={video.videoId} title={video.title} context="video-library" contextId={video.videoId} />
                <p className="mt-3 text-sm font-medium text-ink">{video.title}</p>
                <a
                  href={video.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs font-semibold text-accent hover:text-accent-light"
                >
                  {dict.videoLibrary.watchOn} {video.sourceName} →
                </a>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </div>
  );
}

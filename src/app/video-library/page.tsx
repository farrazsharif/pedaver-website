import dict from "@/lib/dictionaries";
import { videoLibrary } from "@/lib/content/videoLibrary";
import Section from "@/components/Section";
import VideoBrowser from "@/components/VideoBrowser";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Video Library — PQNK Farmer Lectures & Field Guidance",
  description:
    "A topic-organized library of Urdu-language PQNK lectures and field guidance videos, covering land types, crops, machinery, and irrigation.",
  path: "/video-library",
});

export default function VideoLibraryPage() {
  // Search + sort (2026-10-14): "By topic" keeps the PQNK learning-path order of videoLibrary.ts.
  const videos = videoLibrary.flatMap((category) =>
    category.videos.map((v) => ({
      videoId: v.videoId,
      title: v.title,
      group: category.title,
      sourceName: v.sourceName,
      sourceUrl: v.sourceUrl,
    }))
  );
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.videoLibrary.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.videoLibrary.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <VideoBrowser
          videos={videos}
          groups={videoLibrary.map((c) => ({ title: c.title }))}
          groupedLabel="By topic"
          defaultMode="grouped"
          searchId="video-library-search"
        />
      </Section>
    </div>
  );
}

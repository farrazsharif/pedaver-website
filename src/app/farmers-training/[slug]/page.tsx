import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import ShareButton from "@/components/ShareButton";
import TranslatedPageDownload from "@/components/TranslatedPageDownload";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { trainingSessions, getTrainingSession, timeToSeconds } from "@/lib/content/farmersTraining";
import type { ChapterBlock } from "@/lib/content/books";
import { buildChapterSpeech } from "@/lib/content/chapterSpeech";
import ReadAloud from "@/app/books/[bookId]/[chapterId]/ReadAloud";
import TrainingPlayer from "./TrainingPlayer";

export async function generateStaticParams() {
  return trainingSessions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const session = getTrainingSession(slug);
  if (!session) return {};
  return buildMetadata({
    title: `Farmers Training ${session.number}: ${session.title} | Pedaver`,
    description: session.summary,
    path: `/farmers-training/${slug}`,
    image: `https://i.ytimg.com/vi/${session.videoId}/hqdefault.jpg`,
    type: "article",
  });
}

export default async function TrainingSessionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = getTrainingSession(slug);
  if (!session) notFound();

  const fullTitle = `Farmers Training ${session.number}: ${session.title}`;
  // Read Aloud reads the transcript (headings and paragraphs), not the time marks.
  const blocks: ChapterBlock[] = session.sections.flatMap((s) => [
    { type: "heading" as const, text: s.heading },
    ...s.paragraphs.map((p) => ({ type: "paragraph" as const, runs: [{ text: p }] })),
  ]);
  const speech = buildChapterSpeech({ title: fullTitle, body: blocks });

  const videoJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: fullTitle,
    description: session.summary,
    thumbnailUrl: `https://i.ytimg.com/vi/${session.videoId}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${session.videoId}`,
    inLanguage: "ur",
    url: `${SITE_URL}/farmers-training/${slug}/`,
    hasPart: session.sections.map((s) => ({
      "@type": "Clip",
      name: s.heading,
      startOffset: timeToSeconds(s.time),
      url: `https://www.youtube.com/watch?v=${session.videoId}&t=${timeToSeconds(s.time)}`,
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }} />
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
          <Link href="/farmers-training" className="no-print text-sm font-semibold text-primary hover:underline">
            ← All training sessions
          </Link>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-accent">PQNK Farmers Training {session.number}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-primary-dark sm:text-4xl">{session.title}</h1>
          <p className="mt-4 text-lg text-ink-soft">{session.summary}</p>
          <p className="mt-3 text-sm text-ink-soft">
            Asif Sharif, Researcher and Developer of PQNK. Video in Urdu ({session.duration}), with an English transcript edited for
            reading. Use Translate at the top of the page to read it in your own language.
          </p>
        </div>
      </section>

      <Section>
        <TranslatedPageDownload />
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <TrainingPlayer videoId={session.videoId} title={fullTitle} sections={session.sections} />
          </div>

          <div className="no-print flex flex-col gap-6">
            <ReadAloud segments={speech} noun="transcript" />
            <ShareButton
              title={fullTitle}
              path={`/farmers-training/${slug}/`}
              className="rounded-full border border-primary px-6 py-3 text-center text-sm font-semibold text-primary transition hover:bg-primary/10"
            />
            <a
              href={`https://www.youtube.com/watch?v=${session.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
            >
              Watch on YouTube ({session.channelName})
            </a>
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-accent">In this session</h2>
              <ol className="mt-3 flex flex-col gap-2 text-sm">
                {session.sections.map((s) => (
                  <li key={s.time} className="flex gap-2">
                    <span className="flex-none font-mono text-ink-soft">{s.time}</span>
                    <span className="text-ink">{s.heading}</span>
                  </li>
                ))}
              </ol>
            </div>
            {session.related.length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Related on pedaver.com</h2>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  {session.related.map((r) => (
                    <li key={r.href}>
                      <Link href={r.href} className="font-medium text-primary hover:underline">
                        {r.label}
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

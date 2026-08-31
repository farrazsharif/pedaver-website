import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dict from "@/lib/dictionaries";
import {
  books,
  getBookById,
  getChapterByChapterId,
  getChapterDisplayNumber,
  getPartById,
  getAdjacentPublishedChapters,
  getPublishedChapters,
} from "@/lib/content/books";
import Section from "@/components/Section";
import ContentViewTracker from "@/components/analytics/ContentViewTracker";
import TrackedPdfLink from "@/components/analytics/TrackedPdfLink";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { buildChapterSpeech } from "@/lib/content/chapterSpeech";
import ChapterBody from "./ChapterBody";
import ReadAloud from "./ReadAloud";

// Only PUBLISHED chapters get a static page — an "in-preparation" chapter
// has no route at all, so it can never become a thin indexed page (see
// books.ts file note). Every book's unpublished chapters are simply absent
// from this list, and stay absent from the sitemap too.
export async function generateStaticParams() {
  return books.flatMap((book) =>
    getPublishedChapters(book).map((chapter) => ({ bookId: book.bookId, chapterId: chapter.chapterId }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookId: string; chapterId: string }>;
}): Promise<Metadata> {
  const { bookId, chapterId } = await params;
  const book = getBookById(bookId);
  if (!book) return {};
  const chapter = getChapterByChapterId(book, chapterId);
  if (!chapter || chapter.status !== "published") return {};

  return buildMetadata({
    title: `${chapter.title} | ${book.title}`,
    description: chapter.summary ?? book.description,
    path: `/books/${bookId}/${chapterId}`,
    type: "article",
    publishedTime: chapter.publishedDate,
  });
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ bookId: string; chapterId: string }>;
}) {
  const { bookId, chapterId } = await params;
  const book = getBookById(bookId);
  if (!book) notFound();
  const chapter = getChapterByChapterId(book, chapterId);
  // Same guard as generateStaticParams — an in-preparation chapter never renders, even by direct URL.
  if (!chapter || chapter.status !== "published") notFound();

  const number = getChapterDisplayNumber(book, chapterId);
  const part = getPartById(book, chapter.partId);
  const { prev, next } = getAdjacentPublishedChapters(book, chapterId);

  // Read Aloud (browser-native TTS) input — built from the structured chapter
  // blocks, never scraped from the DOM. Empty if the chapter has no body.
  const speechSegments = chapter.body
    ? buildChapterSpeech({ title: chapter.title, subtitle: chapter.subtitle, body: chapter.body })
    : [];

  const chapterJsonLd = {
    "@context": "https://schema.org",
    "@type": "Chapter",
    name: chapter.title,
    isPartOf: { "@type": "Book", name: book.title, url: `${SITE_URL}/books/${book.bookId}` },
    position: number,
    url: `${SITE_URL}/books/${book.bookId}/${chapterId}`,
    author: { "@id": `${SITE_URL}/founder#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    ...(chapter.publishedDate ? { datePublished: chapter.publishedDate } : {}),
    ...(chapter.modifiedDate ? { dateModified: chapter.modifiedDate } : {}),
  };

  return (
    <div>
      <ContentViewTracker contentType="book-chapter" contentId={`${bookId}/${chapterId}`} contentTitle={chapter.title} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(chapterJsonLd) }} />

      {/* Book identity — the umbrella every chapter page sits under. No book-wide
          Table of Contents here; that lives on the book landing page only. */}
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <Link href={`/books/${book.bookId}`} className="text-sm font-semibold text-primary underline underline-offset-4">
            ← {book.title}
          </Link>
          {book.subtitle && <p className="mt-1 text-sm italic text-ink-soft">{book.subtitle}</p>}

          {/* Part/Chapter identifiers — Arial, the frozen Style Standard's functional
              apparatus face, small and letter-spaced. Chapter number is dynamic/provisional
              (current manuscript position), never the chapter's permanent identity. */}
          <p
            className="mt-6 text-xs font-bold uppercase tracking-[0.15em]"
            style={{ fontFamily: "Arial, sans-serif", color: "#52B788" }}
          >
            {part?.title}
            {number !== undefined ? ` · Chapter ${number}` : ""}
          </p>
          <h1
            className="mt-2 text-4xl font-bold sm:text-5xl"
            style={{ fontFamily: "Georgia, serif", color: "#1A4731" }}
          >
            {chapter.title}
          </h1>
          {chapter.subtitle && (
            <p className="mt-2 text-lg italic text-ink-soft" style={{ fontFamily: "Georgia, serif" }}>
              {chapter.subtitle}
            </p>
          )}
          <p className="mt-4 text-xs text-ink-soft">
            {chapter.version && `Release ${chapter.version}`}
            {chapter.version && (chapter.modifiedDate ?? chapter.publishedDate) ? " · " : ""}
            {chapter.modifiedDate ?? chapter.publishedDate}
          </p>
        </div>
      </section>

      <Section>
        {speechSegments.length > 0 && (
          <div className="mx-auto mb-8 max-w-4xl">
            <ReadAloud segments={speechSegments} />
          </div>
        )}
        <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[1fr_auto]">
          <div className="min-w-0">
            {chapter.body && (
              <ChapterBody
                blocks={chapter.body}
                imageBase={`/books/${book.bookId}/${chapter.chapterId}`}
              />
            )}
          </div>

          {chapter.pdfPath && (
            <div className="lg:w-56">
              <TrackedPdfLink
                href={chapter.pdfPath}
                contentId={`${bookId}/${chapterId}`}
                contentTitle={chapter.title}
                className="inline-block w-full rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
              >
                {dict.books.downloadChapterPdf}
              </TrackedPdfLink>
            </div>
          )}
        </div>
      </Section>

      <div className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-4 py-8 text-center sm:flex-row sm:justify-between sm:px-6">
          <div className="sm:text-left">
            {prev ? (
              <Link href={`/books/${book.bookId}/${prev.chapterId}`} className="text-sm font-semibold text-primary hover:text-primary-dark">
                ← {dict.books.previousChapter}: {prev.title}
              </Link>
            ) : (
              <span />
            )}
          </div>
          <Link href={`/books/${book.bookId}`} className="text-sm font-semibold text-ink-soft hover:text-primary-dark">
            {dict.books.bookContents}
          </Link>
          <div className="sm:text-right">
            {next ? (
              <Link href={`/books/${book.bookId}/${next.chapterId}`} className="text-sm font-semibold text-primary hover:text-primary-dark">
                {dict.books.nextChapter}: {next.title} →
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

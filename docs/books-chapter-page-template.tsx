/**
 * TEMPLATE — not an active route. Individual PQNK Book chapter page,
 * fully written and ready, but deliberately kept OUTSIDE src/app so it is
 * not picked up as a route yet.
 *
 * WHY: Next.js's static export (`output: "export"`) requires every dynamic
 * route segment's generateStaticParams() to return at least one path —
 * zero is treated identically to "missing" and fails the production build
 * (`next build` throws "Page ... is missing generateStaticParams()").
 * Every chapter in books.ts is currently `status: "in-preparation"`, so
 * this page's generateStaticParams() (below, unchanged) would legitimately
 * return an empty array today, which breaks the build.
 *
 * TO ACTIVATE (once the first chapter's status flips to "published" in
 * src/lib/content/books.ts, with real `body`/`pdfPath` set):
 *   1. Copy this file to src/app/books/[bookId]/[chapterId]/page.tsx
 *   2. Delete this header comment (the rest of the file is the real page)
 *   3. Run `npm run build` — generateStaticParams will now return ≥1 real
 *      path and the build will succeed with no other changes needed.
 *
 * Nothing else in the architecture needs to change to support this — the
 * book landing page already links to `/books/{bookId}/{chapterId}` for any
 * chapter whose status is "published", and the sitemap already includes
 * published chapters only. This file is the only piece waiting on content.
 */
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

// Only PUBLISHED chapters get a static page — an "in-preparation" chapter
// has no route at all, so it can never become a thin indexed page (see
// books.ts file note and the task brief's explicit requirement on this).
// Every book currently has zero published chapters, so this returns an
// empty list and the [chapterId] route builds no pages yet — that's
// correct, not a bug: the architecture is ready for the first chapter the
// moment its status flips to "published" in books.ts, with no code change
// required here.
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
  // In-preparation chapters have no page — same guard as generateStaticParams,
  // kept here too so this never silently renders a chapter that isn't ready.
  if (!chapter || chapter.status !== "published") notFound();

  const number = getChapterDisplayNumber(book, chapterId);
  const part = getPartById(book, chapter.partId);
  const { prev, next } = getAdjacentPublishedChapters(book, chapterId);

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

      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
          <Link href={`/books/${book.bookId}`} className="text-sm font-semibold text-primary underline underline-offset-4">
            ← {book.title}
          </Link>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
            {part?.title}
            {number !== undefined ? ` · Chapter ${number}` : ""}
          </p>
          <h1 className="mt-2 text-4xl font-extrabold text-primary-dark">{chapter.title}</h1>
          {chapter.subtitle && <p className="mt-2 text-lg italic text-ink-soft">{chapter.subtitle}</p>}
          {chapter.summary && <p className="mt-4 max-w-2xl text-lg text-ink-soft">{chapter.summary}</p>}
          <p className="mt-4 text-xs text-ink-soft">
            {chapter.version && `Release ${chapter.version}`}
            {chapter.version && (chapter.modifiedDate ?? chapter.publishedDate) ? " · " : ""}
            {chapter.modifiedDate ?? chapter.publishedDate}
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-4">
            {chapter.body?.map((paragraph, i) => (
              <p key={i} className="leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>

          {chapter.pdfPath && (
            <div>
              <TrackedPdfLink
                href={chapter.pdfPath}
                contentId={`${bookId}/${chapterId}`}
                contentTitle={chapter.title}
                className="inline-block rounded-full bg-primary px-6 py-3 text-center text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
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

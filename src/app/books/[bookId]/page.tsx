import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dict from "@/lib/dictionaries";
import {
  books,
  getBookById,
  getChapterDisplayNumber,
  getAllPartsWithPublishedChapters,
} from "@/lib/content/books";
import Section from "@/components/Section";
import BookCoverImage from "@/components/books/BookCoverImage";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export async function generateStaticParams() {
  return books.map((book) => ({ bookId: book.bookId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ bookId: string }>;
}): Promise<Metadata> {
  const { bookId } = await params;
  const book = getBookById(bookId);
  if (!book) return {};

  return buildMetadata({
    title: `${book.title} | Pedaver`,
    description: book.description,
    path: `/books/${bookId}`,
  });
}

export default async function BookLandingPage({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  const book = getBookById(bookId);
  if (!book) notFound();

  // Public view shows every Part's title (the book's locked, stable
  // structure), but only ever lists chapters within a Part that are
  // PUBLISHED — the manuscript's full working structure (66 chapters, most
  // in-preparation) stays internal to books.ts, never listed by name here.
  // See getAllPartsWithPublishedChapters.
  const allPartsWithPublishedChapters = getAllPartsWithPublishedChapters(book);
  const hasAnyPublishedChapter = allPartsWithPublishedChapters.some((group) => group.chapters.length > 0);

  const bookJsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    ...(book.subtitle ? { alternateName: book.subtitle } : {}),
    description: book.description,
    url: `${SITE_URL}/books/${book.bookId}`,
    author: { "@id": `${SITE_URL}/founder#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bookJsonLd) }} />

      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:text-left">
          <Link href="/books" className="text-sm font-semibold text-primary underline underline-offset-4">
            ← {dict.books.backToBooks}
          </Link>
          <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:items-start">
            <BookCoverImage book={book} className="w-44 sm:w-56" />
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                {book.status === "complete" ? dict.books.statusComplete : dict.books.statusInProgress}
              </span>
              <h1 className="mt-4 text-4xl font-extrabold text-primary-dark">{book.title}</h1>
              {book.subtitle && <p className="mt-3 max-w-2xl text-lg italic text-ink-soft">{book.subtitle}</p>}
              <p className="mt-5 max-w-2xl text-ink-soft">{book.description}</p>
            </div>
          </div>
        </div>
      </section>

      {book.status !== "complete" && (
        <div className="border-b border-border bg-card">
          <div className="mx-auto max-w-3xl px-4 py-4 text-center sm:px-6">
            <p className="text-sm text-ink-soft">{dict.books.progressiveNote}</p>
          </div>
        </div>
      )}

      {book.completeBookPdfPath && (
        <Section>
          <div className="mx-auto max-w-2xl text-center">
            <a
              href={book.completeBookPdfPath}
              className="inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
            >
              {dict.books.downloadCompleteBook}
            </a>
          </div>
        </Section>
      )}

      <Section muted={!book.completeBookPdfPath}>
        <div className="mx-auto max-w-3xl">
          <h2 className="text-xl font-bold text-primary-dark">{dict.books.contentsTitle}</h2>

          <div className="mt-6 flex flex-col gap-8">
            {allPartsWithPublishedChapters.map(({ part, chapters }) => (
              <div key={part.partId}>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-sm font-bold uppercase tracking-wide text-accent">{part.title}</h3>
                  {chapters.length === 0 && (
                    <span className="rounded-full bg-ink-soft/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                      {dict.books.inPreparation}
                    </span>
                  )}
                </div>
                {part.subtitle && <p className="text-sm italic text-ink-soft">{part.subtitle}</p>}
                {chapters.length > 0 && (
                  <ol className="mt-3 flex flex-col gap-2">
                    {chapters.map((chapter) => {
                      const number = getChapterDisplayNumber(book, chapter.chapterId);
                      return (
                        <li key={chapter.chapterId} className="flex items-baseline gap-3 text-sm">
                          <span className="w-14 flex-none text-ink-soft/60">Ch. {number}</span>
                          <Link
                            href={`/books/${book.bookId}/${chapter.chapterId}`}
                            className="font-semibold text-primary-dark hover:text-primary"
                          >
                            {chapter.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
            ))}
          </div>
          {hasAnyPublishedChapter ? (
            <>
              <p className="mt-6 text-sm text-ink-soft">{dict.books.moreChaptersComingNote}</p>
              <p className="mt-2 text-xs text-ink-soft">{dict.books.chapterNumbersProvisionalNote}</p>
            </>
          ) : (
            <p className="mt-6 text-sm text-ink-soft">{dict.books.noChaptersYetNote}</p>
          )}
        </div>
      </Section>
    </div>
  );
}

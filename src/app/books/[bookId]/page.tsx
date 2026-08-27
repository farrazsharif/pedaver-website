import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dict from "@/lib/dictionaries";
import {
  books,
  getBookById,
  getChapterDisplayNumber,
  getPublishedPartsWithChapters,
} from "@/lib/content/books";
import Section from "@/components/Section";
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

  // Public view only ever shows Parts that contain at least one PUBLISHED
  // chapter, and only the published chapters within them — the manuscript's
  // full working structure (66 chapters, mostly in-preparation) stays
  // internal to books.ts, not on this page. See getPublishedPartsWithChapters.
  const publishedPartsWithChapters = getPublishedPartsWithChapters(book);

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
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6">
          <Link href="/books" className="text-sm font-semibold text-primary underline underline-offset-4">
            ← {dict.books.backToBooks}
          </Link>
          <span className="mx-auto mt-5 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            {book.status === "complete" ? dict.books.statusComplete : dict.books.statusInProgress}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold text-primary-dark">{book.title}</h1>
          {book.subtitle && <p className="mx-auto mt-3 max-w-2xl text-lg italic text-ink-soft">{book.subtitle}</p>}
          <p className="mx-auto mt-5 max-w-2xl text-ink-soft">{book.description}</p>
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

          {publishedPartsWithChapters.length === 0 ? (
            // Nothing published yet — a restrained note, not a list of 66
            // "In Preparation" placeholders. Unpublished chapters are never
            // shown individually on this page (see books.ts file header).
            <p className="mt-4 text-ink-soft">{dict.books.noChaptersYetNote}</p>
          ) : (
            <>
              <div className="mt-6 flex flex-col gap-8">
                {publishedPartsWithChapters.map(({ part, chapters }) => (
                  <div key={part.partId}>
                    <h3 className="text-sm font-bold uppercase tracking-wide text-accent">{part.title}</h3>
                    {part.subtitle && <p className="text-sm italic text-ink-soft">{part.subtitle}</p>}
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
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm text-ink-soft">{dict.books.moreChaptersComingNote}</p>
              <p className="mt-2 text-xs text-ink-soft">{dict.books.chapterNumbersProvisionalNote}</p>
            </>
          )}
        </div>
      </Section>
    </div>
  );
}

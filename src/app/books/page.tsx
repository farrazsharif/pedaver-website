import Link from "next/link";
import dict from "@/lib/dictionaries";
import { books, getPublishedChapters } from "@/lib/content/books";
import Section from "@/components/Section";
import BookCoverImage from "@/components/books/BookCoverImage";
import { buildMetadata } from "@/lib/seo";

// Books Library — the top-level index of all PQNK books. Only one book is
// active for progressive publication today (see books.ts), but this page
// maps over the `books` array rather than referencing that book by name,
// so a second, third, and fourth book need no redesign here — just a new
// entry in books.ts.
export const metadata = buildMetadata({
  title: "PQNK Books | Pedaver",
  description:
    "The PQNK book series: structured, systematic bodies of knowledge published chapter by chapter as each is completed and reviewed.",
  path: "/books",
});

export default function BooksPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.books.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.books.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-sm text-ink-soft">{dict.books.libraryNote}</p>

          <div className="mt-8 flex flex-col gap-6">
            {books.map((book) => {
              const publishedCount = getPublishedChapters(book).length;
              return (
                <Link
                  key={book.bookId}
                  href={`/books/${book.bookId}`}
                  className="group flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-start sm:gap-6 sm:p-8"
                >
                  <BookCoverImage book={book} className="w-32 sm:w-36" />
                  <div className="min-w-0 text-center sm:text-left">
                    <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                      {book.status === "complete" ? dict.books.statusComplete : dict.books.statusInProgress}
                    </span>
                    <h2 className="mt-3 text-2xl font-bold text-primary-dark group-hover:text-primary">
                      {book.title}
                    </h2>
                    {book.subtitle && <p className="mt-1 text-sm italic text-ink-soft">{book.subtitle}</p>}
                    <p className="mt-3 leading-relaxed text-ink-soft">{book.description}</p>
                    <p className="mt-4 text-sm font-semibold text-primary">
                      {publishedCount > 0
                        ? `${publishedCount} chapter${publishedCount === 1 ? "" : "s"} published →`
                        : "View book contents →"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}

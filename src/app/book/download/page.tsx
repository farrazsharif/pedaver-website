import Link from "next/link";
import type { Metadata } from "next";
import { getBookById } from "@/lib/content/books";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { mediaUrl } from "@/lib/mediaUrl";
import BookCoverImage from "@/components/books/BookCoverImage";
import StartDownload from "./StartDownload";

// The shareable download link for the complete PQNK book (2026-11-08, author: a pasted book link must show the
// cover). A direct PDF link can never carry a link preview, so this page carries the cover as its preview and
// opens the PDF as soon as it loads. Share pedaver.com/book/download for the PDF, pedaver.com/book for the book page.
const book = getBookById("natural-ecosystem-science")!;
const pdf = mediaUrl(book.completeBookPdfPath!);

export const metadata: Metadata = {
  ...buildMetadata({
    title: "PQNK: The Natural Ecosystem Science of Production Agriculture (free PDF)",
    description:
      "Download the complete First Edition by Asif Sharif, free: 601 pages, about 75 MB. The full natural-ecosystem science behind PQNK, from fifty-three years of field research.",
    path: "/book/download",
    image: `${SITE_URL}${book.shareImage}`,
  }),
  robots: { index: false, follow: true },
};

export default function BookDownloadPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-14 text-center sm:px-6">
      <StartDownload href={pdf} contentId={`${book.bookId}/complete-book`} title={book.title} />
      <div className="flex justify-center">
        <BookCoverImage book={book} className="w-44 sm:w-56" />
      </div>
      <h1 className="mt-6 text-2xl font-extrabold text-primary-dark">{book.title}</h1>
      <p className="mt-3 text-ink-soft">Your free PDF of the complete book is opening (601 pages, about 75 MB).</p>
      <a
        href={pdf}
        className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
      >
        If it does not open, tap here
      </a>
      <p className="mt-6 text-sm text-ink-soft">
        Or{" "}
        <Link href={`/books/${book.bookId}`} className="font-semibold text-primary underline underline-offset-4">
          read and listen online, chapter by chapter
        </Link>
        .
      </p>
    </section>
  );
}

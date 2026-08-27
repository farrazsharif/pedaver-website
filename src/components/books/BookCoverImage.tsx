import type { Book } from "@/lib/content/books";

/**
 * Renders a book's approved cover artwork at its exact aspect ratio (never
 * cropped or redesigned — see books.ts's `coverImage` field). Renders
 * nothing when a book has no cover yet, so Books 2-4 work before their own
 * cover exists. Reused by both /books (small, in the book's card) and
 * /books/{bookId} (larger, in the book's own hero) — one component, one
 * set of image rules, for every book.
 */
export default function BookCoverImage({
  book,
  className = "",
}: {
  book: Book;
  className?: string;
}) {
  if (!book.coverImage) return null;
  const { src, alt, width, height } = book.coverImage;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`flex-none rounded-lg border border-border object-cover shadow-sm ${className}`}
    />
  );
}

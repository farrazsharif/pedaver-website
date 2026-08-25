import Link from "next/link";
import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

// Restrained placeholder landing page: the four PQNK books are still being
// finalized (see project notes), so this deliberately does not invent
// titles, covers, download links or a publication date — just a
// structural home for the nav item that can hold them once ready.
export const metadata = buildMetadata({
  title: "PQNK Books | Pedaver",
  description:
    "A four-book series documenting the Natural Ecosystem Science of Production Agriculture — currently being finalized.",
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
        <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-primary/30 bg-card p-8 text-center">
          <p className="text-ink-soft">{dict.books.comingSoonNote}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/papers"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-cream hover:bg-primary-dark"
            >
              {dict.nav.papers}
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

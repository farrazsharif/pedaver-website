import Link from "next/link";
import Section from "@/components/Section";

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">404</p>
        <h1 className="mt-2 text-3xl font-extrabold text-primary-dark sm:text-4xl">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          The page you’re looking for doesn’t exist, or may have moved. Here are a few places to pick back up.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
          >
            Back to Home
          </Link>
          <Link
            href="/crops"
            className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Browse Crops
          </Link>
          <Link
            href="/papers"
            className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            Knowledge Papers
          </Link>
        </div>
      </div>
    </Section>
  );
}

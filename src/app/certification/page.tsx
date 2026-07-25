import Link from "next/link";
import dict from "@/lib/dictionaries";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "PQNK Certification — Verify Genuine PQNK Practice",
  description:
    "PQNK Certification confirms a farm is genuinely following PQNK practice. Learn how the validation process works and how to get certified.",
  path: "/certification",
});

export default function CertificationPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.certification.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.certification.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {dict.certification.sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-primary-dark">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft">{section.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-cream shadow transition hover:bg-primary-dark"
          >
            {dict.certification.cta}
          </Link>
        </div>
      </Section>
    </div>
  );
}

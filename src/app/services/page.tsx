import Link from "next/link";
import dict from "@/lib/dictionaries";
import { services } from "@/lib/content/services";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services — Broad-Acre Design, Staff Training, Production Management & Validation",
  description:
    "Pedaver's paid services: broad-acre PQNK project design & development, staff selection & training, production management, and produce validation & placement — turning barren land into a profitable PQNK production unit.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div>
      <section className="border-b border-border bg-primary-light/10">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h1 className="text-4xl font-extrabold text-primary-dark">{dict.services.pageTitle}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-ink-soft">{dict.services.pageSubtitle}</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          {services.map((service) => (
            <article key={service.slug} id={service.slug} className="scroll-mt-24">
              <h2 className="text-2xl font-bold text-primary-dark">{service.title}</h2>
              <p className="mt-2 text-sm font-medium italic text-ink-soft">{service.summary}</p>
              <div className="mt-4 flex flex-col gap-3">
                {service.body.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}

          <div className="mt-4 rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <h2 className="text-xl font-bold text-primary-dark">{dict.services.ctaTitle}</h2>
            <p className="mx-auto mt-2 max-w-xl text-ink-soft">{dict.services.ctaBody}</p>
            <Link
              href="/contact"
              className="mt-5 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink shadow transition hover:bg-accent-light"
            >
              {dict.services.ctaButton}
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}

import Link from "next/link";
import dict from "@/lib/dictionaries";
import { services } from "@/lib/content/services";
import Section from "@/components/Section";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Services — Free PQNK Knowledge & Paid Advisory Services",
  description:
    "PQNK knowledge is free and open source, with free workshops, YouTube, Facebook, and WhatsApp learning groups. Pedaver also offers paid advisory services: broad-acre PQNK project design & development, staff selection & training, production management, and produce validation & placement.",
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
        <div id="free-knowledge" className="mx-auto max-w-3xl rounded-2xl border border-primary-light/40 bg-primary-light/10 p-8 scroll-mt-24">
          <h2 className="text-2xl font-bold text-primary-dark">{dict.services.freeTitle}</h2>
          <div className="mt-4 flex flex-col gap-3">
            {dict.services.freeBody.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed text-ink-soft">
                {paragraph}
              </p>
            ))}
          </div>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-primary-dark">
            {dict.services.freeChannelsTitle}
          </h3>
          <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
            {dict.services.freeChannels.map((channel) => (
              <li key={channel.href}>
                <a
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-accent hover:text-accent-light"
                >
                  {channel.label} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section muted>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark">{dict.services.paidTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-soft">{dict.services.paidBody}</p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ink-soft">{dict.services.paidIntroNote}</p>
        </div>
      </Section>

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

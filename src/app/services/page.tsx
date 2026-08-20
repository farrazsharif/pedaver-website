import Link from "next/link";
import dict from "@/lib/dictionaries";
import { services } from "@/lib/content/services";
import { partnershipTitle, partnershipSubtitle, partnershipSections } from "@/lib/content/partnership";
import Section from "@/components/Section";
import TrackedExternalChannelLink from "@/components/analytics/TrackedExternalChannelLink";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const PAGE_TITLE = "PQNK Support Services — Soil, Water & Climate Restoration, Farmer Prosperity";
const PAGE_DESCRIPTION =
  "How Pedaver supports farmers, governments, NGOs and institutions applying PQNK to restore degraded soil, reduce irrigation water use, build climate resilience, cut input costs and improve farmer livelihoods — through free open knowledge, paid advisory services and institutional partnership.";

export const metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/services",
});

// Bridges the problems named in the partnership section to the PQNK science
// that addresses each one — genuine, existing pages, not manufactured links.
const RELATED_SCIENCE: { slug: string; name: string; note: string }[] = [
  { slug: "soil", name: "Soil", note: "Degraded structure, compaction and declining fertility" },
  { slug: "water", name: "Water", note: "Water scarcity, groundwater depletion and irrigation demand" },
  { slug: "climate", name: "Climate & the Agricultural Water Cycle", note: "Heat, drought and irregular rainfall" },
  { slug: "biodiversity", name: "Biodiversity", note: "Habitat loss and declining biological diversity" },
  { slug: "crop-protection", name: "Natural Crop Protection", note: "Pesticide dependence and pest pressure" },
  { slug: "nutrition", name: "Natural Plant Nutrition", note: "Fertilizer dependence and nutrient cycling" },
  { slug: "food-quality", name: "Food Quality & Human Nutrition", note: "Declining nutritional density" },
  { slug: "production-architecture", name: "PQNK Production Architecture", note: "Cost of production and mechanization" },
  { slug: "transition", name: "PQNK Transition", note: "Moving from degraded to regenerative production" },
];

export default function ServicesPage() {
  const servicesPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: `${SITE_URL}/services`,
    author: { "@id": `${SITE_URL}/founder#person` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: [
      { "@type": "Thing", name: "Soil degradation and restoration" },
      { "@type": "Thing", name: "Agricultural water scarcity" },
      { "@type": "Thing", name: "Climate resilience in farming" },
      { "@type": "Thing", name: "Farmer poverty and rural livelihoods" },
      { "@type": "Thing", name: "Food nutritional quality" },
      { "@type": "Thing", name: "Dependence on agrochemical inputs" },
    ],
    mentions: services.map((service) => ({ "@type": "Thing", name: service.title })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageJsonLd) }}
      />
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
                <TrackedExternalChannelLink
                  href={channel.href}
                  label={channel.label}
                  className="text-sm font-semibold text-accent hover:text-accent-light"
                >
                  {channel.label} →
                </TrackedExternalChannelLink>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section muted id="partner-with-pedaver" className="scroll-mt-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-primary-dark">{partnershipTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg font-medium text-ink-soft">{partnershipSubtitle}</p>
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-10">
          {partnershipSections.map((section, sIdx) => (
            <div key={sIdx}>
              {section.heading && (
                <h3 className="text-xl font-bold text-primary-dark">{section.heading}</h3>
              )}
              <div className={`flex flex-col gap-4 ${section.heading ? "mt-3" : ""}`}>
                {section.blocks.map((block, bIdx) => {
                  if (block.type === "paragraph") {
                    return (
                      <p key={bIdx} className="leading-relaxed text-ink-soft">
                        {block.text}
                      </p>
                    );
                  }
                  if (block.type === "bullets") {
                    return (
                      <ul key={bIdx} className="flex flex-col gap-2">
                        {block.items.map((item, iIdx) => (
                          <li key={iIdx} className="flex gap-2 text-ink-soft">
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <dl key={bIdx} className="flex flex-col gap-3">
                      {block.items.map((item, iIdx) => (
                        <div key={iIdx}>
                          <dt className="font-semibold text-primary-dark">{item.label}</dt>
                          <dd className="mt-0.5 leading-relaxed text-ink-soft">{item.text}</dd>
                        </div>
                      ))}
                    </dl>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <h3 className="text-xl font-bold text-primary-dark">Ready to Discuss a Partnership?</h3>
            <p className="mx-auto mt-2 max-w-xl text-ink-soft">
              Tell us about your region, institution and objectives, and we&rsquo;ll walk you through how PQNK can
              be adapted and implemented.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink shadow transition hover:bg-accent-light"
            >
              Discuss a Partnership
            </Link>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark">Explore the Science Behind These Problems</h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-soft">
            Each problem above is addressed in PQNK&rsquo;s own science, published in full and free to read.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RELATED_SCIENCE.map((topic) => (
            <Link
              key={topic.slug}
              href={`/science/${topic.slug}`}
              className="rounded-xl border border-border bg-cream p-5 transition hover:border-primary/40 hover:shadow-sm"
            >
              <h3 className="font-bold text-primary-dark">{topic.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{topic.note}</p>
            </Link>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
          <Link
            href="/papers"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            See the Field-Documented Evidence →
          </Link>
          <Link
            href="/crops"
            className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary/10"
          >
            See Results by Crop →
          </Link>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-primary-dark">{dict.services.paidTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-ink-soft">{dict.services.paidBody}</p>
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-10">
          {services.map((service) => (
            <article key={service.slug} id={service.slug} className="scroll-mt-24">
              <h3 className="text-2xl font-bold text-primary-dark">{service.title}</h3>
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
            <h3 className="text-xl font-bold text-primary-dark">{dict.services.ctaTitle}</h3>
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

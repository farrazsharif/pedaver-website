import Link from "next/link";
import dict from "@/lib/dictionaries";
import { flagshipCrops, getCropBySlug } from "@/lib/content/crops";
import { cropImages } from "@/lib/content/cropImages";
import { videos } from "@/lib/content/videos";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import HeroCarousel from "@/components/HeroCarousel";
import NewsletterForm from "@/components/NewsletterForm";
import SoilProfile from "@/components/SoilProfile";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pedaver — PQNK Natural Ecosystem Science for Production Agriculture",
  description:
    "Field-tested regenerative farming across 20+ crops in Pakistan. Lower input cost, restored soil, higher-quality yields — the PQNK system from Pedaver.",
  path: "",
});

// "What We Do" image cards — Frontier "Products & Services" pattern
const pillarCards = [
  { image: "/images/wheat-heads.jpg", href: "/crops" },
  { image: "/images/beds-prepared.jpg", href: "/resources" },
  { image: "/images/peaches.jpg", href: "/validation" },
];

const updateSlugs = ["sugarcane", "onion-garlic", "wheat"];

export default function HomePage() {
  const updateCrops = updateSlugs.map((slug) => getCropBySlug(slug)!).filter(Boolean);

  return (
    <div>
      {/* Hero carousel */}
      <HeroCarousel />

      {/* Intro / mission band */}
      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary-dark sm:text-4xl">{dict.home.introTitle}</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">{dict.home.introBody}</p>
          <Link
            href="/about"
            className="mt-7 inline-block rounded-full bg-primary px-7 py-3 text-sm font-semibold text-cream shadow-sm transition hover:bg-primary-dark"
          >
            {dict.home.introCta}
          </Link>
        </div>
      </Section>

      {/* The PQNK System — signature centerpiece */}
      <section className="bg-primary-dark text-cream">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-light">
              {dict.home.pqnk.eyebrow}
            </p>
            <h2 className="mt-5 text-6xl font-extrabold leading-none tracking-tight sm:text-8xl">
              {dict.home.pqnk.title}
            </h2>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-cream/60">
              {dict.home.pqnk.fullName}
            </p>
            <p className="mt-2 italic text-accent-light">{dict.home.pqnk.pronunciation}</p>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-cream/85">
              {dict.home.pqnk.statement}
            </p>
          </div>

          {/* The five principles */}
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {dict.home.pqnk.principles.map((principle, i) => (
              <div key={principle.name} className="rounded-2xl border border-cream/15 bg-cream/[0.06] p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/25 text-sm font-bold text-accent-light">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-base font-bold text-cream">{principle.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{principle.body}</p>
              </div>
            ))}
          </div>

          {/* Proof stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-cream/15 pt-12 md:grid-cols-4">
            {dict.home.pqnk.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-extrabold text-accent-light sm:text-5xl">{stat.value}</div>
                <div className="mt-2 text-sm text-cream/70">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/about"
              className="inline-block rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-ink shadow-sm transition hover:bg-accent-light"
            >
              {dict.home.pqnk.cta}
            </Link>
            <a
              href="/docs/PQNK-Pristine-Farming.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-cream/30 px-8 py-3.5 text-sm font-semibold text-cream transition hover:border-cream/60 hover:bg-cream/5"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 3v12m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download the PQNK Introduction (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* What We Do — image cards (Products & Services pattern) */}
      <Section muted>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-primary-dark">{dict.home.pillarsTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-ink-soft">{dict.home.pillarsSubtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {dict.home.pillars.map((pillar, i) => (
            <Link
              key={pillar.title}
              href={pillarCards[i].href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-cream shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={pillarCards[i].image}
                  alt={pillar.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-bold text-primary-dark group-hover:text-primary">{pillar.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{pillar.body}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent">{dict.home.learnMore} →</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* What is PQNK — photo + text split */}
      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-primary-dark">{dict.home.whatIsTitle}</h2>
            <p className="mt-2 text-base font-medium italic text-accent">{dict.home.whatIsPronunciation}</p>
            <div className="mt-6 flex flex-col gap-5 text-ink-soft">
              {dict.home.whatIsBody.map((paragraph, i) => (
                <p key={i} className="text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <div className="order-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:order-2">
            <SoilProfile className="h-full w-full" />
          </div>
        </div>
      </Section>

      {/* Editorial pull-quote — the PQNK field principle */}
      <Section muted className="!py-12">
        <figure className="mx-auto max-w-3xl text-center">
          <span
            aria-hidden="true"
            className="block text-6xl leading-none text-accent/40"
            style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
          >
            &ldquo;
          </span>
          <blockquote
            className="mt-2 text-2xl leading-snug text-primary-dark sm:text-3xl"
            style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
          >
            PQNK does not grow crops. PQNK grows soil that grows crops.
          </blockquote>
          <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
            The PQNK field principle
          </figcaption>
        </figure>
      </Section>

      {/* Flagship crops — product grid */}
      <Section muted>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-primary-dark">{dict.home.flagshipTitle}</h2>
          <p className="mt-2 text-ink-soft">{dict.home.flagshipSubtitle}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {flagshipCrops.map((crop) => (
            <Link
              key={crop.slug}
              href={`/crops/${crop.slug}`}
              className="group overflow-hidden rounded-2xl border border-border bg-cream shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={cropImages[crop.slug]}
                  alt={crop.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary-dark group-hover:text-primary">{crop.name}</h3>
                <p className="mt-2 text-sm text-ink-soft">{crop.blurb}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent">{dict.crops.viewGuide} →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/crops" className="text-sm font-semibold text-primary underline underline-offset-4">
            {dict.crops.pageTitle} →
          </Link>
        </div>
      </Section>

      {/* Validation highlight band (MyFarm-style) */}
      <Section>
        <div className="grid items-stretch overflow-hidden rounded-3xl border border-border bg-primary-dark text-cream md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">{dict.home.portalTitle}</h2>
            <p className="mt-4 max-w-md text-cream/80">{dict.home.portalBody}</p>
            <Link
              href="/validation"
              className="mt-7 inline-block w-fit rounded-full bg-accent px-7 py-3 text-sm font-semibold text-ink shadow-sm transition hover:bg-accent-light"
            >
              {dict.home.portalCta}
            </Link>
          </div>
          <div className="min-h-56 overflow-hidden">
            <img
              src="/images/beds-wet-skyline.jpg"
              alt="A PQNK field under preparation"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Latest From PQNK — news cards (Latest Updates pattern) */}
      <Section muted>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-primary-dark">{dict.home.updatesTitle}</h2>
            <p className="mt-2 text-ink-soft">{dict.home.updatesSubtitle}</p>
          </div>
          <Link href="/crops" className="text-sm font-semibold text-primary underline underline-offset-4">
            {dict.home.updatesViewAll} →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {updateCrops.map((crop) => (
            <Link
              key={crop.slug}
              href={`/crops/${crop.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={cropImages[crop.slug]}
                  alt={crop.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink">
                  {dict.home.updatesTag}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold text-primary-dark group-hover:text-primary">{crop.name}</h3>
                <p className="mt-2 flex-1 text-sm italic text-ink-soft">{crop.results}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent">{dict.crops.viewGuide} →</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Stats strip */}
      <Section>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {dict.home.statsItems.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-6 text-center">
              <div className="text-3xl font-extrabold text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-ink-soft">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Videos preview */}
      <Section muted>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-primary-dark">{dict.home.videoSectionTitle}</h2>
          <p className="mt-2 text-ink-soft">{dict.home.videoSectionSubtitle}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {videos.slice(0, 3).map((video) => (
            <div key={video.videoId}>
              <VideoEmbed videoId={video.videoId} title={video.title} />
              <p className="mt-3 text-sm font-medium text-ink">{video.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/videos" className="text-sm font-semibold text-primary underline underline-offset-4">
            {dict.videos.pageTitle} →
          </Link>
        </div>
      </Section>

      {/* Newsletter band */}
      <Section className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <img
            src="/images/seedlings-beds.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-dark/85" />
          <div className="relative flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold">{dict.home.newsletterTitle}</h2>
            <p className="mx-auto mt-3 max-w-xl text-cream/85">{dict.home.newsletterBody}</p>
            <NewsletterForm
              namePlaceholder={dict.home.newsletterNamePlaceholder}
              placeholder={dict.home.newsletterPlaceholder}
              consentLabel={dict.home.newsletterConsent}
              buttonLabel={dict.home.newsletterButton}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}

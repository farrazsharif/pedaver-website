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

// "What We Do" image cards — Frontier "Products & Services" pattern
const pillarCards = [
  { image: "/images/wheat-heads.jpg", href: "/crops" },
  { image: "/images/beds-prepared.jpg", href: "/resources" },
  { image: "/images/peaches.jpg", href: "/certification" },
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
                  alt=""
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
                  alt=""
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

      {/* Certification highlight band (MyFarm-style) */}
      <Section>
        <div className="grid items-stretch overflow-hidden rounded-3xl border border-border bg-primary-dark text-cream md:grid-cols-2">
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <h2 className="text-2xl font-bold sm:text-3xl">{dict.home.portalTitle}</h2>
            <p className="mt-4 max-w-md text-cream/80">{dict.home.portalBody}</p>
            <Link
              href="/certification"
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
                  alt=""
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

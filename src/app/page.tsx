import fs from "fs";
import path from "path";
import Link from "next/link";
import dict from "@/lib/dictionaries";
import { flagshipCrops } from "@/lib/content/crops";
import { cropImages } from "@/lib/content/cropImages";
import { videos } from "@/lib/content/videos";
import Section from "@/components/Section";
import VideoEmbed from "@/components/VideoEmbed";
import TrackedExternalChannelLink from "@/components/analytics/TrackedExternalChannelLink";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "PQNK Natural Ecosystem Science of Production Agriculture | Pedaver",
  description:
    "PQNK is the natural ecosystem science of production agriculture: four governing principles, a documented transition from degraded soil to a sustained closed loop, and field evidence across 20+ crops in Pakistan.",
  path: "",
});

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

function loadFarmerVoicePreview(count: number): string[] {
  const dir = path.join(process.cwd(), "public", "farmer-voices");
  const files = fs.readdirSync(dir).filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()));
  return files.sort().reverse().slice(0, count).map((f) => `/farmer-voices/${f}`);
}

const evidenceVideoIds = ["r1iN4iRsTmE", "xzORUOK79v4"];
const featuredVideoId = "X2HHUcARW_g";
const storyVideoId = "bpmGRdrccH4";

export default function HomePage() {
  const h = dict.home;
  const evidenceVideos = videos.filter((v) => evidenceVideoIds.includes(v.videoId));
  const featuredVideo = videos.find((v) => v.videoId === featuredVideoId);
  const storyVideo = videos.find((v) => v.videoId === storyVideoId);
  const voicePreview = loadFarmerVoicePreview(3);

  return (
    <div>
      {/* 1. HERO — establishes what PQNK is, not a crop-promotion carousel */}
      <section className="relative flex min-h-[520px] items-center overflow-hidden text-cream sm:min-h-[600px]">
        <img
          src="/images/wheat-field-sunrise.jpg"
          alt="A lush green PQNK wheat field at sunrise"
          className="absolute inset-0 h-full w-full object-cover brightness-110 saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/45 to-black/20" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6">
          <h1 className="mx-auto max-w-4xl leading-none">
            <span
              className="block text-7xl font-extrabold tracking-tight text-accent-light sm:text-9xl lg:text-[6.9rem]"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.5)" }}
            >
              {h.hero.eyebrow}
            </span>
            <span className="mt-5 block text-2xl font-bold leading-snug sm:text-3xl">{h.hero.title}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-cream/95">{h.hero.institutional}</p>
          <p className="mt-3 text-lg italic text-cream/90">{h.hero.supporting}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/science"
              className="inline-block rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-cream shadow-sm transition hover:bg-accent-light hover:text-ink"
            >
              {h.hero.ctaPrimary}
            </Link>
            <a
              href="#field-evidence"
              className="inline-block rounded-full border border-cream/40 px-8 py-3.5 text-base font-semibold text-cream transition hover:border-cream/70 hover:bg-cream/10"
            >
              {h.hero.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* WATCH THE STORY — the full PQNK narrative, prominently placed right after the hero */}
      {storyVideo && (
        <Section id="watch-the-story">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{h.story.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-bold text-primary-dark">{h.story.title}</h2>
            <p className="mt-4 text-lg text-ink-soft">{h.story.body}</p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <VideoEmbed
              videoId={storyVideo.videoId}
              title={storyVideo.title}
              context="video-library"
              contextId={storyVideo.videoId}
            />
          </div>
        </Section>
      )}

      {/* 2. WHERE SHOULD YOU GO NEXT — moved up from the foot of the page so a
          visitor can self-route by audience before reading the full
          narrative below, rather than only discovering it after scrolling
          past eight other sections. */}
      <Section id="knowledge-pathways" muted>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{h.pathways.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-primary-dark">{h.pathways.title}</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {h.pathways.cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">{card.audience}</span>
              <h3 className="mt-2 text-lg font-bold text-primary-dark group-hover:text-primary">{card.label}</h3>
              <p className="mt-2 flex-1 text-base leading-relaxed text-ink-soft">{card.body}</p>
              <span className="mt-4 inline-block text-base font-semibold text-accent">{card.cta} →</span>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <span className="text-base font-semibold text-ink-soft">{h.pathways.secondaryTitle}</span>
          {h.pathways.secondaryLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-base font-semibold text-primary underline underline-offset-4">
              {link.label}
            </Link>
          ))}
        </div>
      </Section>

      {/* 3. WHY PQNK WAS NECESSARY */}
      <Section id="why-necessary">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{h.whyNecessary.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-primary-dark sm:text-4xl">{h.whyNecessary.title}</h2>
          <p className="mt-4 text-lg text-ink-soft">{h.whyNecessary.intro}</p>
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-2 gap-y-3">
          {h.whyNecessary.chain.map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-card px-4 py-2 text-base font-medium text-ink">
                {step}
              </span>
              {i < h.whyNecessary.chain.length - 1 && (
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
              )}
            </span>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-base font-medium text-ink-soft">
          {h.whyNecessary.closing}
        </p>
      </Section>

      {/* 4. THE FOUR PRINCIPLES OF PQNK */}
      <section id="four-principles" className="bg-primary-dark text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent-light">
              {h.principles.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{h.principles.title}</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {h.principles.items.map((principle, i) => (
              <div key={principle.name} className="rounded-2xl border border-cream/15 bg-cream/[0.06] p-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/25 text-sm font-bold text-accent-light">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-bold text-cream">{principle.name}</h3>
                <p className="mt-2 text-base leading-relaxed text-cream/90">{principle.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/science" className="text-sm font-semibold text-accent-light underline underline-offset-4">
              Explore the Science Behind PQNK →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. THE PQNK JOURNEY */}
      <Section id="pqnk-journey" muted>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{h.journey.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-primary-dark">{h.journey.title}</h2>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-4">
          {h.journey.stages.map((stage, i) => (
            <div key={stage.title} className="relative rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary text-sm font-bold text-cream">
                  {i + 1}
                </div>
                <p className="text-sm font-semibold uppercase tracking-wide text-accent">{stage.label}</p>
              </div>
              <h3 className="mt-4 text-lg font-bold text-primary-dark">{stage.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">{stage.body}</p>
              {"steps" in stage && stage.steps && (
                <ul className="mt-3 space-y-1.5">
                  {stage.steps.map((step) => (
                    <li key={step} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                      <span aria-hidden="true" className="mt-0.5 text-accent">•</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/science/transition" className="text-sm font-semibold text-primary underline underline-offset-4">
            Understand the PQNK Transition →
          </Link>
        </div>
      </Section>

      {/* 6. WHAT PQNK CHANGES */}
      <Section id="what-changes">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{h.changes.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-primary-dark">{h.changes.title}</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {h.changes.areas.map((area) => (
            <div key={area.name} className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-bold text-primary-dark">{area.name}</h3>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">{area.body}</p>
              {"stat" in area && area.stat && (
                <p className="mt-4 border-t border-border pt-4">
                  <span className="block text-2xl font-extrabold text-primary">{area.stat}</span>
                  <span className="text-sm text-ink-soft">{area.statLabel}</span>
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <Link href="/science" className="text-base font-semibold text-primary underline underline-offset-4">
            Explore PQNK Science →
          </Link>
          <Link href="/machines" className="text-base font-semibold text-primary underline underline-offset-4">
            {h.changes.machinesNote} →
          </Link>
        </div>
      </Section>

      {/* 7. FIELD EVIDENCE */}
      <Section id="field-evidence" muted>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{h.evidence.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-primary-dark">{h.evidence.title}</h2>
          <p className="mt-4 text-lg text-ink-soft">{h.evidence.subtitle}</p>
        </div>

        {/* Quantified example + testimony */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-primary">
              {h.evidence.quantifiedType}
            </span>
            <div className="mt-4 text-4xl font-extrabold text-primary">{h.evidence.quantifiedValue}</div>
            <p className="mt-2 text-base leading-relaxed text-ink-soft">{h.evidence.quantifiedLabel}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8">
            <span className="inline-block rounded-full bg-accent/15 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-accent">
              {h.evidence.testimonyType}
            </span>
            <blockquote className="mt-4 text-lg font-medium leading-snug text-primary-dark">
              {h.evidence.testimonyQuote}
            </blockquote>
            <p className="mt-3 text-base text-ink-soft">{h.evidence.testimonyAttribution}</p>
          </div>
        </div>

        {/* Featured engineering video — silent, looping */}
        {featuredVideo && (
          <div className="mt-10">
            <h3 className="mb-4 flex items-center gap-3 text-base font-semibold uppercase tracking-wide text-ink-soft">
              {h.evidence.featuredVideoTitle}
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
                {h.evidence.videosType}
              </span>
            </h3>
            <VideoEmbed videoId={featuredVideo.videoId} title={featuredVideo.title} autoplay />
            <p className="mt-3 text-base font-medium text-ink">{featuredVideo.title}</p>
          </div>
        )}

        {/* Field documentation videos */}
        {evidenceVideos.length > 0 && (
          <div className="mt-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
              <h3 className="flex items-center gap-3 text-base font-semibold uppercase tracking-wide text-ink-soft">
                {h.evidence.videosTitle}
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-semibold text-primary">
                  {h.evidence.videosType}
                </span>
              </h3>
              <Link href="/video-library" className="text-base font-semibold text-primary underline underline-offset-4">
                {h.evidence.videosCta} →
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {evidenceVideos.map((video) => (
                <div key={video.videoId}>
                  <VideoEmbed videoId={video.videoId} title={video.title} />
                  <p className="mt-3 text-base font-medium text-ink">{video.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Farmer Voices preview */}
        {voicePreview.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-3 text-base font-semibold uppercase tracking-wide text-ink-soft">
                {h.evidence.farmerVoicesTitle}
                <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-sm font-semibold text-accent">
                  {h.evidence.farmerVoicesType}
                </span>
              </h3>
              <Link href="/farmer-voices" className="text-base font-semibold text-primary underline underline-offset-4">
                {h.evidence.farmerVoicesCta} →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {voicePreview.map((src) => (
                <Link
                  key={src}
                  href="/farmer-voices"
                  className="block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <img src={src} alt="A farmer's message from a PQNK WhatsApp learning group" className="h-40 w-full object-cover sm:h-48" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* 8. ONE PQNK SYSTEM, EVERY CROP */}
      <Section id="every-crop">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{h.everyCrop.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-bold text-primary-dark">{h.everyCrop.title}</h2>
          <p className="mt-4 text-lg text-ink-soft">{h.everyCrop.body}</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <p className="mt-2 text-base text-ink-soft">{crop.blurb}</p>
                <span className="mt-4 inline-block text-base font-semibold text-accent">{dict.crops.viewGuide} →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/crops" className="text-base font-semibold text-primary underline underline-offset-4">
            {h.everyCrop.viewAll} →
          </Link>
        </div>
      </Section>

      {/* 9. STAY CONNECTED */}
      <Section id="stay-connected" className="!py-0">
        <div className="relative overflow-hidden rounded-3xl px-6 py-14 text-cream sm:px-12">
          <img src="/images/cereal-green.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary-dark/90" />
          <div className="relative flex flex-col items-center text-center">
            <div className="grid grid-cols-2 gap-6 border-b border-cream/15 pb-10 md:grid-cols-4">
              {h.stayConnected.communityStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-extrabold text-accent-light sm:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-cream/90">{stat.label}</div>
                </div>
              ))}
            </div>

            <h2 className="mt-10 text-3xl font-bold">{h.stayConnected.title}</h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-cream/95">{h.stayConnected.body}</p>
            <TrackedExternalChannelLink
              href="https://wa.me/923250064442"
              label="WhatsApp — PQNK Learning Groups"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-sm font-semibold text-ink transition hover:bg-accent-light"
            >
              {h.stayConnected.whatsappButton}
            </TrackedExternalChannelLink>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-cream/15 pt-8">
              <span className="text-base font-semibold text-cream/90">{h.stayConnected.linksTitle}</span>
              {h.stayConnected.links.map((link) => (
                <Link key={link.href} href={link.href} className="text-base font-semibold text-accent-light underline underline-offset-4">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { VIDEO_DATES } from "@/lib/content/videoDates";
import { trackVideoEngage } from "@/lib/analytics";

/**
 * Search + sort for the two video pages (/videos and /video-library), added 2026-10-14 at the author's request
 * ("Video page should have search and sort tabs"). Same Recent | A-Z | Oldest pill pattern as the Knowledge Papers
 * and Knowledge Exchange libraries, plus a "By topic"/"By channel" tab that keeps each page's original grouping.
 * Search matches title, description and group name. Dates come from videoDates.ts.
 *
 * Cards show the video's picture with a play button; clicking opens a large player over the page (author, 2026-10-14:
 * "it should enlarge when playing so that one can see and read the speech to text"). The player opens with subtitles
 * on and an English / Urdu choice. YouTube decides which subtitle tracks exist: most videos have only automatic
 * English (or Hindi-script) captions, so the Urdu choice sets the player to Urdu and a tip shows how to pick
 * YouTube's "Auto-translate > Urdu". Only one player loads at a time, not one iframe per card.
 */
export interface BrowserVideo {
  videoId: string;
  title: string;
  description?: string;
  /** Group heading this video sits under in the grouped view (topic or channel). */
  group: string;
  /** Optional credit link shown under the title (e.g. "Watch on <channel> →"). */
  sourceName?: string;
  sourceUrl?: string;
}

export interface BrowserGroup {
  title: string;
  /** Optional small line under the heading (e.g. subscriber count) and link (e.g. the channel). */
  note?: string;
  linkLabel?: string;
  linkHref?: string;
}

type Mode = "grouped" | "recent" | "az" | "oldest";

const formatDate = (d?: string) =>
  d ? new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "";

function VideoCard({ v, showDate, onPlay }: { v: BrowserVideo; showDate: boolean; onPlay: (v: BrowserVideo) => void }) {
  const date = VIDEO_DATES[v.videoId];
  return (
    <div>
      <button
        type="button"
        onClick={() => onPlay(v)}
        aria-label={`Play video: ${v.title}`}
        className="group relative block aspect-video w-full overflow-hidden rounded-xl border border-border bg-black shadow-sm"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://i.ytimg.com/vi/${v.videoId}/hqdefault.jpg`}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-90 transition group-hover:scale-105 group-hover:opacity-100"
        />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-20 items-center justify-center rounded-2xl bg-red-600 shadow-lg transition group-hover:scale-110">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
      </button>
      {showDate && date && (
        <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">{formatDate(date)}</p>
      )}
      <p className={`${showDate && date ? "mt-1" : "mt-3"} text-sm font-medium text-ink`}>{v.title}</p>
      {v.description && <p className="mt-1 text-sm text-ink-soft">{v.description}</p>}
      {v.sourceUrl && v.sourceName && (
        <a
          href={v.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-block text-xs font-semibold text-accent hover:text-accent-light"
        >
          Watch on {v.sourceName} →
        </a>
      )}
    </div>
  );
}

function PlayerModal({ v, onClose }: { v: BrowserVideo; onClose: () => void }) {
  const [lang, setLang] = useState<"en" | "ur">("en");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  const src = `https://www.youtube.com/embed/${v.videoId}?autoplay=1&rel=0&cc_load_policy=1&cc_lang_pref=${lang}&hl=${lang}`;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={v.title}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 sm:p-6"
      onClick={onClose}
    >
      <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 flex items-start justify-between gap-3">
          <p className="text-sm font-semibold leading-snug text-cream sm:text-base">{v.title}</p>
          <button
            type="button"
            onClick={onClose}
            className="flex-none rounded-full bg-cream/15 px-3 py-1.5 text-sm font-semibold text-cream hover:bg-cream/25"
          >
            Close ✕
          </button>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
          <iframe
            key={lang}
            className="h-full w-full"
            src={src}
            title={v.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="mt-3 flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="inline-flex items-center gap-1 rounded-full bg-cream/10 p-1" role="group" aria-label="Subtitle language">
            <span className="px-2 text-xs font-semibold text-cream/80">Subtitles</span>
            {(
              [
                { code: "en" as const, label: "English" },
                { code: "ur" as const, label: "اردو" },
              ]
            ).map(({ code, label }) => (
              <button
                key={code}
                type="button"
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                  lang === code ? "bg-cream text-primary-dark" : "text-cream hover:bg-cream/15"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {lang === "ur" ? (
            <p dir="rtl" lang="ur" className="text-sm text-cream/85">
              اردو سب ٹائٹلز کے لیے: ویڈیو میں ⚙ سیٹنگز ← سب ٹائٹلز ← آٹو ٹرانسلیٹ ← اردو منتخب کریں
            </p>
          ) : (
            <p className="text-xs text-cream/75">
              Subtitles in another language: ⚙ Settings → Subtitles/CC → Auto-translate → choose the language. ⛶ for full screen.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VideoBrowser({
  videos,
  groups,
  groupedLabel,
  defaultMode = "grouped",
  searchId,
}: {
  videos: BrowserVideo[];
  groups: BrowserGroup[];
  /** Label of the grouped tab, e.g. "By topic" or "By channel". */
  groupedLabel: string;
  defaultMode?: Mode;
  searchId: string;
}) {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [query, setQuery] = useState("");
  const [playing, setPlaying] = useState<BrowserVideo | null>(null);
  const play = (v: BrowserVideo) => {
    setPlaying(v);
    trackVideoEngage(v.videoId, "video-library", v.videoId);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const found = q
      ? videos.filter((v) => [v.title, v.description ?? "", v.group].some((t) => t.toLowerCase().includes(q)))
      : videos;
    const byDate = (a: BrowserVideo, b: BrowserVideo) =>
      (VIDEO_DATES[b.videoId] ?? "").localeCompare(VIDEO_DATES[a.videoId] ?? "");
    if (mode === "recent") return [...found].sort(byDate);
    if (mode === "oldest") return [...found].sort((a, b) => -byDate(a, b));
    if (mode === "az") return [...found].sort((a, b) => a.title.localeCompare(b.title));
    return found;
  }, [videos, query, mode]);

  const tabs: { mode: Mode; label: string }[] = [
    { mode: "grouped", label: groupedLabel },
    { mode: "recent", label: "Recent" },
    { mode: "az", label: "A–Z" },
    { mode: "oldest", label: "Oldest" },
  ];

  return (
    <div>
      {playing && <PlayerModal v={playing} onClose={() => setPlaying(null)} />}
      <div className="mx-auto max-w-2xl">
        <label htmlFor={searchId} className="sr-only">
          Search videos
        </label>
        <div className="relative">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos: a crop, machine, topic or keyword…"
            className="w-full rounded-full border border-border bg-card py-3.5 pl-12 pr-4 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="mt-6 mb-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-sm text-ink-soft">
          {results.length} {results.length === 1 ? "video" : "videos"}
          {query.trim() ? " match" : ""}
        </p>
        <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-card p-1" role="group" aria-label="Sort videos">
          {tabs.map((t) => (
            <button
              key={t.mode}
              type="button"
              onClick={() => setMode(t.mode)}
              aria-pressed={mode === t.mode}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                mode === t.mode ? "bg-primary text-cream" : "text-ink-soft hover:text-primary-dark"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {results.length === 0 ? (
        <p className="py-10 text-center text-ink-soft">No videos match “{query}”.</p>
      ) : mode === "grouped" ? (
        <div className="flex flex-col gap-12">
          {groups.map((g) => {
            const inGroup = results.filter((v) => v.group === g.title);
            if (inGroup.length === 0) return null;
            return (
              <div key={g.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-xl font-bold text-primary-dark">{g.title}</h3>
                  {g.linkHref && g.linkLabel && (
                    <a
                      href={g.linkHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-accent underline underline-offset-4"
                    >
                      {g.linkLabel} →
                    </a>
                  )}
                </div>
                {g.note && <p className="mt-1 text-sm text-ink-soft">{g.note}</p>}
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {inGroup.map((v) => (
                    <VideoCard key={v.videoId} v={v} showDate={false} onPlay={play} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {results.map((v) => (
            <VideoCard key={v.videoId + v.group} v={v} showDate={mode !== "az"} onPlay={play} />
          ))}
        </div>
      )}
    </div>
  );
}

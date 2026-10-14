"use client";

import { useMemo, useState } from "react";
import VideoEmbed from "@/components/VideoEmbed";
import { VIDEO_DATES } from "@/lib/content/videoDates";

/**
 * Search + sort for the two video pages (/videos and /video-library), added 2026-10-14 at the author's request
 * ("Video page should have search and sort tabs"). Same Recent | A-Z | Oldest pill pattern as the Knowledge Papers
 * and Knowledge Exchange libraries, plus a "By topic"/"By channel" tab that keeps each page's original grouping.
 * Search matches title, description and group name. Dates come from videoDates.ts.
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

function VideoCard({ v, showDate }: { v: BrowserVideo; showDate: boolean }) {
  const date = VIDEO_DATES[v.videoId];
  return (
    <div>
      <VideoEmbed videoId={v.videoId} title={v.title} context="video-library" contextId={v.videoId} />
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
                    <VideoCard key={v.videoId} v={v} showDate={false} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {results.map((v) => (
            <VideoCard key={v.videoId + v.group} v={v} showDate={mode !== "az"} />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { FieldEvidence } from "@/lib/content/fieldEvidence";
import { formatFeNumber } from "@/lib/content/fieldEvidence";
import { searchFieldEvidence } from "@/lib/content/fieldEvidenceSearch";

interface Filters {
  q: string;
  evidenceType: string;
  crop: string;
  country: string;
}

const EMPTY_FILTERS: Filters = { q: "", evidenceType: "", crop: "", country: "" };

// Mirrors the Recent | A-Z | Oldest pattern from the Knowledge Paper
// library. "Recent" sorts by feNumber descending: FE numbers are assigned
// in arrival order and never renumbered (see fieldEvidence.ts), so feNumber
// order IS chronological arrival order — a real record-keeping fact this
// library can already guarantee, unlike a recordedDate that most entries
// (migrated farmer testimony without a known filming date) don't have.
type SortMode = "recent" | "az" | "oldest";
const DEFAULT_SORT: SortMode = "recent";
const VALID_SORTS: SortMode[] = ["recent", "az", "oldest"];

function readFiltersFromURL(): Filters {
  if (typeof window === "undefined") return EMPTY_FILTERS;
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get("q") ?? "",
    evidenceType: params.get("evidenceType") ?? "",
    crop: params.get("crop") ?? "",
    country: params.get("country") ?? "",
  };
}

function readSortFromURL(): SortMode {
  if (typeof window === "undefined") return DEFAULT_SORT;
  const raw = new URLSearchParams(window.location.search).get("sort");
  return VALID_SORTS.includes(raw as SortMode) ? (raw as SortMode) : DEFAULT_SORT;
}

function writeStateToURL(filters: Filters, sort: SortMode) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value) params.set(key, value);
  }
  if (sort !== DEFAULT_SORT) params.set("sort", sort);
  const qs = params.toString();
  const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  window.history.replaceState(null, "", url);
}

function displayCrop(fe: FieldEvidence): string | undefined {
  return fe.cropName ?? fe.cropSlug;
}

function EvidenceCard({ fe }: { fe: FieldEvidence }) {
  const cropLabel = displayCrop(fe);
  const placeLabel = [fe.location, fe.country].filter(Boolean).join(", ");
  return (
    <Link
      href={`/field-evidence/${fe.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {fe.videoId ? (
        <div className="aspect-video w-full flex-none overflow-hidden bg-black">
          {/* Static thumbnail, not an embedded iframe — this list can grow to
              thousands of records, so the player itself only mounts on the
              individual FE page (see [slug]/page.tsx). */}
          <img
            src={`https://i.ytimg.com/vi/${fe.videoId}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="h-1.5 w-full flex-none bg-accent" aria-hidden="true" />
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          {formatFeNumber(fe.feNumber)} · {fe.evidenceType}
        </p>
        <h2 className="mt-2 text-xl font-bold text-primary-dark group-hover:text-primary">{fe.title}</h2>
        <p className="mt-2 flex-1 text-sm italic leading-relaxed text-ink-soft">&ldquo;{fe.summary}&rdquo;</p>
        <div className="mt-4 flex flex-col gap-1 text-xs text-ink-soft">
          {fe.farmer && (
            <p>
              <span className="font-semibold text-ink">Farmer</span> · {fe.farmer}
            </p>
          )}
          {cropLabel && (
            <p>
              <span className="font-semibold text-ink">Crop</span> · {cropLabel}
            </p>
          )}
          {placeLabel && (
            <p>
              <span className="font-semibold text-ink">Location</span> · {placeLabel}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allLabel: string;
}) {
  return (
    <label className="flex flex-1 flex-col gap-1 text-left">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">{allLabel}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function FieldEvidenceBrowser({ records }: { records: FieldEvidence[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sortMode, setSortMode] = useState<SortMode>(DEFAULT_SORT);
  const [queryInput, setQueryInput] = useState("");
  const hydrated = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const restoringFromURL = useRef(false);

  useEffect(() => {
    const initial = readFiltersFromURL();
    restoringFromURL.current = true;
    setFilters(initial);
    setQueryInput(initial.q);
    setSortMode(readSortFromURL());
    hydrated.current = true;

    const hasSharedState = Object.values(initial).some((v) => v);
    if (hasSharedState) {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    writeStateToURL(filters, sortMode);
  }, [filters, sortMode]);

  useEffect(() => {
    const id = setTimeout(() => {
      setFilters((f) => {
        if (f.q === queryInput) return f;
        if (restoringFromURL.current) {
          restoringFromURL.current = false;
          return { ...f, q: queryInput };
        }
        return { ...f, q: queryInput };
      });
    }, 250);
    return () => clearTimeout(id);
  }, [queryInput]);

  const evidenceTypes = useMemo(
    () => Array.from(new Set(records.map((r) => r.evidenceType))).sort(),
    [records]
  );
  const cropOptions = useMemo(
    () => Array.from(new Set(records.map((r) => displayCrop(r)).filter((c): c is string => Boolean(c)))).sort(),
    [records]
  );
  const countryOptions = useMemo(
    () => Array.from(new Set(records.map((r) => r.country).filter((c): c is string => Boolean(c)))).sort(),
    [records]
  );

  const results = useMemo(() => {
    let pool = filters.q.trim() ? searchFieldEvidence(records, filters.q) : records;

    pool = pool.filter((fe) => {
      if (filters.evidenceType && fe.evidenceType !== filters.evidenceType) return false;
      if (filters.crop && displayCrop(fe) !== filters.crop) return false;
      if (filters.country && fe.country !== filters.country) return false;
      return true;
    });

    if (sortMode === "az") {
      return [...pool].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortMode === "oldest") {
      return [...pool].sort((a, b) => a.feNumber - b.feNumber);
    }
    return [...pool].sort((a, b) => b.feNumber - a.feNumber);
  }, [records, filters, sortMode]);

  const activeChips: { key: keyof Filters; label: string }[] = [
    filters.evidenceType && { key: "evidenceType" as const, label: `Type: ${filters.evidenceType}` },
    filters.crop && { key: "crop" as const, label: `Crop: ${filters.crop}` },
    filters.country && { key: "country" as const, label: `Country: ${filters.country}` },
  ].filter(Boolean) as { key: keyof Filters; label: string }[];

  function clearFilter(key: keyof Filters) {
    setFilters((f) => ({ ...f, [key]: "" }));
  }

  function clearAll() {
    setFilters(EMPTY_FILTERS);
    setQueryInput("");
  }

  return (
    <div ref={rootRef} className="scroll-mt-24">
      <div className="mx-auto max-w-2xl">
        <label className="sr-only" htmlFor="field-evidence-search">
          Search Field Evidence
        </label>
        <div className="relative">
          <svg
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
            id="field-evidence-search"
            type="search"
            value={queryInput}
            onChange={(e) => {
              restoringFromURL.current = false;
              setQueryInput(e.target.value);
            }}
            placeholder="FE-002, a farmer's name, a crop, a location…"
            className="w-full rounded-full border border-border bg-card py-3.5 pl-12 pr-4 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row">
          <SelectField
            label="By Evidence Type"
            value={filters.evidenceType}
            onChange={(v) => setFilters((f) => ({ ...f, evidenceType: v }))}
            options={evidenceTypes}
            allLabel="All types"
          />
          <SelectField
            label="By Crop"
            value={filters.crop}
            onChange={(v) => setFilters((f) => ({ ...f, crop: v }))}
            options={cropOptions}
            allLabel="All crops"
          />
          <SelectField
            label="By Country"
            value={filters.country}
            onChange={(v) => setFilters((f) => ({ ...f, country: v }))}
            options={countryOptions}
            allLabel="All countries"
          />
        </div>

        {(activeChips.length > 0 || filters.q) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {filters.q && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-light/20 px-3 py-1 text-xs font-medium text-primary-dark">
                Search: “{filters.q}”
                <button
                  type="button"
                  onClick={() => {
                    restoringFromURL.current = false;
                    setQueryInput("");
                  }}
                  aria-label="Clear search"
                  className="text-primary-dark/60 hover:text-primary-dark"
                >
                  ×
                </button>
              </span>
            )}
            {activeChips.map((chip) => (
              <span
                key={chip.key}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary-light/20 px-3 py-1 text-xs font-medium text-primary-dark"
              >
                {chip.label}
                <button
                  type="button"
                  onClick={() => clearFilter(chip.key)}
                  aria-label={`Clear ${chip.label}`}
                  className="text-primary-dark/60 hover:text-primary-dark"
                >
                  ×
                </button>
              </span>
            ))}
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-semibold text-accent underline underline-offset-2 hover:text-accent/80"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="mx-auto mt-8 max-w-6xl">
        <div className="mb-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-sm text-ink-soft">
            {results.length} {results.length === 1 ? "record" : "records"} match{results.length === 1 ? "es" : ""}
          </p>
          <div
            className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1"
            role="group"
            aria-label="Sort Field Evidence"
          >
            {(
              [
                { mode: "recent" as const, label: "Recent" },
                { mode: "az" as const, label: "A–Z" },
                { mode: "oldest" as const, label: "Oldest" },
              ]
            ).map(({ mode, label }) => (
              <button
                key={mode}
                type="button"
                onClick={() => setSortMode(mode)}
                aria-pressed={sortMode === mode}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  sortMode === mode ? "bg-primary text-cream" : "text-ink-soft hover:text-primary-dark"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {results.map((fe) => (
              <EvidenceCard key={fe.slug} fe={fe} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-semibold text-ink">No exact match for these filters.</p>
            <p className="mt-2 text-sm text-ink-soft">Try clearing a filter or searching a different word.</p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-cream hover:bg-primary-dark"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

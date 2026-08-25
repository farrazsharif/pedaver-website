"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FieldEvidence } from "@/lib/content/fieldEvidence";
import { formatFeNumber } from "@/lib/content/fieldEvidence";
import { searchFieldEvidence } from "@/lib/content/fieldEvidenceSearch";

interface Filters {
  q: string;
  evidenceType: string;
  cropOrTopic: string;
}

const EMPTY_FILTERS: Filters = { q: "", evidenceType: "", cropOrTopic: "" };

// Mirrors the Recent | A-Z | Oldest pattern from the Knowledge Paper
// library. "Recent" sorts by feNumber descending: FE numbers are assigned
// in arrival order and never renumbered (see fieldEvidence.ts), so feNumber
// order IS chronological arrival order — a fact this library can already
// guarantee, unlike a recorded date that most migrated testimony doesn't have.
type SortMode = "recent" | "az" | "oldest";
const DEFAULT_SORT: SortMode = "recent";
const VALID_SORTS: SortMode[] = ["recent", "az", "oldest"];

function readFiltersFromURL(): Filters {
  if (typeof window === "undefined") return EMPTY_FILTERS;
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get("q") ?? "",
    evidenceType: params.get("evidenceType") ?? "",
    cropOrTopic: params.get("cropOrTopic") ?? "",
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

// Plain text card, no thumbnail/embed — see fieldEvidence.ts: Pedaver stores
// the record, not the media. "Watch Video" links straight to the original
// on YouTube/Facebook; nothing loads until the visitor clicks it.
function EvidenceCard({ fe }: { fe: FieldEvidence }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-accent">
        {formatFeNumber(fe.feNumber)} · {fe.evidenceType}
        {fe.cropOrTopic ? ` · ${fe.cropOrTopic}` : ""}
      </p>
      <h2 className="mt-2 text-lg font-bold text-primary-dark">{fe.title}</h2>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{fe.summary}</p>
      {(fe.farmer || fe.location) && (
        <p className="mt-3 text-sm font-medium text-ink">
          {fe.farmer}
          {fe.farmer && fe.location ? " · " : ""}
          {fe.location}
        </p>
      )}
      {fe.sourceUrl && (
        <a
          href={fe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm font-semibold text-accent underline underline-offset-4 hover:text-accent-light"
        >
          Watch Video →
        </a>
      )}
    </div>
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
        restoringFromURL.current = false;
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
    () => Array.from(new Set(records.map((r) => r.cropOrTopic).filter((c): c is string => Boolean(c)))).sort(),
    [records]
  );

  const results = useMemo(() => {
    let pool = filters.q.trim() ? searchFieldEvidence(records, filters.q) : records;

    pool = pool.filter((fe) => {
      if (filters.evidenceType && fe.evidenceType !== filters.evidenceType) return false;
      if (filters.cropOrTopic && fe.cropOrTopic !== filters.cropOrTopic) return false;
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
    filters.cropOrTopic && { key: "cropOrTopic" as const, label: `Crop/Topic: ${filters.cropOrTopic}` },
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
            placeholder="FE-002, a farmer's name, a crop…"
            className="w-full rounded-full border border-border bg-card py-3.5 pl-12 pr-4 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-3xl">
        <div className="flex flex-col gap-4 sm:flex-row">
          <SelectField
            label="By Evidence Type"
            value={filters.evidenceType}
            onChange={(v) => setFilters((f) => ({ ...f, evidenceType: v }))}
            options={evidenceTypes}
            allLabel="All types"
          />
          <SelectField
            label="By Crop / Topic"
            value={filters.cropOrTopic}
            onChange={(v) => setFilters((f) => ({ ...f, cropOrTopic: v }))}
            options={cropOptions}
            allLabel="All crops/topics"
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

      <div className="mx-auto mt-8 max-w-5xl">
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
          <div className="grid gap-6 sm:grid-cols-2">
            {results.map((fe) => (
              <EvidenceCard key={fe.feNumber} fe={fe} />
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

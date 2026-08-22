"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dict from "@/lib/dictionaries";
import type { Paper } from "@/lib/content/papers";
import { formatKpNumber, formatLibraryDate, parseKpQuery } from "@/lib/content/papers";
import {
  getMetadata,
  CROPS_IN_USE,
  PRACTICES_IN_USE,
  PROBLEM_FAMILIES,
  SCIENTIFIC_DOMAINS,
  REQUIRES_REVIEW,
  EXTERNAL_EVIDENCE,
  problemsInFamily,
} from "@/lib/content/knowledge/taxonomy";
import { searchPapers } from "@/lib/content/knowledge/search";

interface Filters {
  q: string;
  crop: string;
  family: string;
  problem: string;
  domain: string;
  practice: string;
}

const EMPTY_FILTERS: Filters = { q: "", crop: "", family: "", problem: "", domain: "", practice: "" };

// Sorting is deliberately independent of Filters: it decides display order of
// whatever set the filters/search already produced, never which papers are in
// that set. "recent" (newest libraryDate first) is the default for the main
// browser — the separate Complete A-Z Index further down the page already
// covers alphabetical browsing on its own.
type SortMode = "recent" | "az" | "oldest";
const DEFAULT_SORT: SortMode = "recent";
const VALID_SORTS: SortMode[] = ["recent", "az", "oldest"];

function readFiltersFromURL(): Filters {
  if (typeof window === "undefined") return EMPTY_FILTERS;
  const params = new URLSearchParams(window.location.search);
  return {
    q: params.get("q") ?? "",
    crop: params.get("crop") ?? "",
    family: params.get("family") ?? "",
    problem: params.get("problem") ?? "",
    domain: params.get("domain") ?? "",
    practice: params.get("practice") ?? "",
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

function AuthorityBadge({ status }: { status: string }) {
  if (status === REQUIRES_REVIEW) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-800">
        Editorial Review Pending
      </span>
    );
  }
  if (status === EXTERNAL_EVIDENCE) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
        External Evidence
      </span>
    );
  }
  return null;
}

function PaperCard({ paper, sortMode }: { paper: Paper; sortMode: SortMode }) {
  const meta = getMetadata(paper.slug);
  const eyebrowDate = sortMode === "recent" || sortMode === "oldest";
  return (
    <Link
      href={`/papers/${paper.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      {/* Interim editorial state: hero images are deliberately off site-wide (cards
          and paper detail pages) while they're reviewed paper-by-paper (see project
          memory). This accent bar replaces the image slot so cards read as
          intentionally text-first rather than as missing an image. paper.heroImage
          itself is untouched — still set in data and still used for Open Graph/
          JSON-LD image metadata. */}
      <div className="h-1.5 w-full flex-none bg-accent" aria-hidden="true" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">
            {formatKpNumber(paper.kpNumber)} · {eyebrowDate ? formatLibraryDate(paper.libraryDate) : paper.category}
          </p>
          {meta && <AuthorityBadge status={meta.authorityStatus} />}
        </div>
        <h2 className="mt-2 text-xl font-bold text-primary-dark group-hover:text-primary">{paper.title}</h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{paper.summary}</p>

        {meta && (meta.crops.length > 0 || meta.fieldProblems.length > 0 || meta.scientificDomains.length > 0) && (
          <div className="mt-4 flex flex-col gap-1.5 text-xs text-ink-soft">
            {meta.crops.length > 0 && (
              <p>
                <span className="font-semibold text-ink">Crop</span> · {meta.crops.slice(0, 3).join(", ")}
              </p>
            )}
            {meta.fieldProblems.length > 0 && (
              <p>
                <span className="font-semibold text-ink">Problem</span> · {meta.fieldProblems.slice(0, 2).join(", ")}
              </p>
            )}
            {meta.scientificDomains.length > 0 && (
              <p>
                <span className="font-semibold text-ink">Science</span> · {meta.scientificDomains.slice(0, 3).join(", ")}
              </p>
            )}
          </div>
        )}

        <span className="mt-4 inline-block text-sm font-semibold text-accent">{dict.papers.readAbstract} →</span>
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

export default function PapersBrowser({ papers }: { papers: Paper[] }) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [sortMode, setSortMode] = useState<SortMode>(DEFAULT_SORT);
  const [queryInput, setQueryInput] = useState("");
  const hydrated = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Read shareable filter state from the URL once, on mount (client-only —
  // deliberately not next/navigation's useSearchParams, which would require a
  // Suspense boundary for this statically-exported site; see
  // AnalyticsClientRoot.tsx for why this codebase avoids that hook).
  // True only for the single queryInput commit produced by restoring a shared
  // URL on load — a URL with both `q` and filters is an intentional combined
  // search and must restore exactly as shared. Any real keystroke in the
  // search box (see the input's onChange below) clears this immediately, so
  // it can never suppress a genuine new search.
  const restoringFromURL = useRef(false);

  useEffect(() => {
    const initial = readFiltersFromURL();
    restoringFromURL.current = true;
    setFilters(initial);
    setQueryInput(initial.q);
    setSortMode(readSortFromURL());
    hydrated.current = true;

    // A shared/deep-linked search or filter URL should land with its
    // results already visible, not require scrolling past page content
    // above this component — most of that gap is now gone since search
    // sits right below the hero, but this guarantees it on shorter mobile
    // viewports too.
    const hasSharedState = Object.values(initial).some((v) => v);
    if (hasSharedState) {
      rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    writeStateToURL(filters, sortMode);
  }, [filters, sortMode]);

  // Debounce the search text -> filters.q so typing doesn't thrash the URL/history.
  // The search bar is the primary discovery mechanism: starting a new text search
  // clears any browse filters left over from earlier narrowing, so a query like
  // "corn" always runs across the full library rather than silently staying
  // AND-combined with a stale Crop/Problem/Science/Practice selection. Filters
  // may then be deliberately re-applied on top of the new results.
  useEffect(() => {
    const id = setTimeout(() => {
      setFilters((f) => {
        if (f.q === queryInput) return f;
        if (restoringFromURL.current) {
          restoringFromURL.current = false;
          return { ...f, q: queryInput };
        }
        return { q: queryInput, crop: "", family: "", problem: "", domain: "", practice: "" };
      });
    }, 250);
    return () => clearTimeout(id);
  }, [queryInput]);

  const familyProblems = useMemo(
    () => (filters.family ? problemsInFamily(filters.family) : []),
    [filters.family]
  );

  const results = useMemo(() => {
    // An explicit "KP-190" / "KP190" / "kp-190" query is a direct catalogue
    // lookup, not a concept search — resolve it straight from kpNumber and
    // skip the taxonomy/synonym matching engine entirely. A plain number
    // ("190") deliberately does NOT trigger this, so it doesn't interfere
    // with ordinary free-text search behavior.
    const kpLookup = filters.q.trim() ? parseKpQuery(filters.q) : null;
    if (kpLookup !== null) {
      const hit = papers.find((p) => p.kpNumber === kpLookup);
      return hit ? [hit] : [];
    }

    let pool = papers;

    if (filters.q.trim()) {
      const searchHits = searchPapers(papers, getMetadata, filters.q);
      pool = searchHits.map((r) => r.paper);
    }

    const filtered = pool.filter((paper) => {
      const meta = getMetadata(paper.slug);
      if (!meta) return false;
      if (filters.crop && !meta.crops.includes(filters.crop)) return false;
      if (filters.family && !meta.problemFamily.includes(filters.family)) return false;
      if (filters.problem && !meta.fieldProblems.includes(filters.problem)) return false;
      if (filters.domain && !meta.scientificDomains.includes(filters.domain)) return false;
      if (filters.practice && !meta.fieldPractices.includes(filters.practice)) return false;
      return true;
    });

    // Sorting is applied last, on top of whatever filtering/search already
    // narrowed the set — it never changes which papers are included, only
    // the order they're shown in, so it composes with every filter above.
    if (sortMode === "az") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortMode === "oldest") {
      return [...filtered].sort((a, b) => a.libraryDate.localeCompare(b.libraryDate) || a.kpNumber - b.kpNumber);
    }
    return [...filtered].sort((a, b) => b.libraryDate.localeCompare(a.libraryDate) || b.kpNumber - a.kpNumber);
  }, [papers, filters, sortMode]);

  const activeChips: { key: keyof Filters; label: string }[] = [
    filters.crop && { key: "crop" as const, label: `Crop: ${filters.crop}` },
    filters.family && { key: "family" as const, label: `Problem area: ${filters.family}` },
    filters.problem && { key: "problem" as const, label: `Problem: ${filters.problem}` },
    filters.domain && { key: "domain" as const, label: `Science: ${filters.domain}` },
    filters.practice && { key: "practice" as const, label: `Practice: ${filters.practice}` },
  ].filter(Boolean) as { key: keyof Filters; label: string }[];

  function clearFilter(key: keyof Filters) {
    setFilters((f) => {
      const next = { ...f, [key]: "" };
      if (key === "family") next.problem = ""; // clearing the family clears its detailed problem too
      return next;
    });
  }

  function clearAll() {
    setFilters(EMPTY_FILTERS);
    setQueryInput("");
  }

  return (
    <div ref={rootRef} className="scroll-mt-24">
      {/* Search */}
      <div className="mx-auto max-w-2xl">
        <label className="sr-only" htmlFor="knowledge-search">
          Search PQNK Knowledge Papers
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
            id="knowledge-search"
            type="search"
            value={queryInput}
            onChange={(e) => {
              restoringFromURL.current = false;
              setQueryInput(e.target.value);
            }}
            placeholder="What do you need to know? e.g. hardpan, wheat, waterlogging…"
            className="w-full rounded-full border border-border bg-card py-3.5 pl-12 pr-4 text-base text-ink shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Browse-by facets */}
      <div className="mx-auto mt-6 max-w-4xl">
        <div className="flex flex-col gap-4 sm:flex-row">
          <SelectField label="By Crop" value={filters.crop} onChange={(v) => setFilters((f) => ({ ...f, crop: v }))} options={CROPS_IN_USE} allLabel="All crops" />
          <SelectField label="By Science" value={filters.domain} onChange={(v) => setFilters((f) => ({ ...f, domain: v }))} options={SCIENTIFIC_DOMAINS} allLabel="All Science domains" />
          <SelectField label="By Field Practice" value={filters.practice} onChange={(v) => setFilters((f) => ({ ...f, practice: v }))} options={PRACTICES_IN_USE} allLabel="All practices" />
        </div>

        <div className="mt-4">
          <span className="text-xs font-semibold uppercase tracking-wide text-ink-soft">By Problem</span>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {PROBLEM_FAMILIES.map((fam) => {
              const isActive = filters.family === fam;
              return (
                <button
                  key={fam}
                  type="button"
                  onClick={() =>
                    setFilters((f) => ({ ...f, family: isActive ? "" : fam, problem: "" }))
                  }
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                    isActive
                      ? "border-primary bg-primary text-cream"
                      : "border-border bg-card text-ink-soft hover:border-primary hover:text-primary-dark"
                  }`}
                >
                  {fam}
                </button>
              );
            })}
          </div>

          {filters.family && familyProblems.length > 0 && (
            <div className="mt-3 rounded-xl border border-border bg-card p-3">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                Refine within {filters.family}
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {familyProblems.map((prob) => {
                  const isActive = filters.problem === prob;
                  return (
                    <button
                      key={prob}
                      type="button"
                      onClick={() => setFilters((f) => ({ ...f, problem: isActive ? "" : prob }))}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                        isActive
                          ? "border-accent bg-accent text-cream"
                          : "border-border bg-cream text-ink-soft hover:border-accent hover:text-accent"
                      }`}
                    >
                      {prob}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
              <span key={chip.key} className="inline-flex items-center gap-1.5 rounded-full bg-primary-light/20 px-3 py-1 text-xs font-medium text-primary-dark">
                {chip.label}
                <button type="button" onClick={() => clearFilter(chip.key)} aria-label={`Clear ${chip.label}`} className="text-primary-dark/60 hover:text-primary-dark">
                  ×
                </button>
              </span>
            ))}
            <button type="button" onClick={clearAll} className="text-xs font-semibold text-accent underline underline-offset-2 hover:text-accent/80">
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="mx-auto mt-8 max-w-6xl">
        <div className="mb-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-sm text-ink-soft">
            {results.length} {results.length === 1 ? "paper" : "papers"} match{results.length === 1 ? "es" : ""}
          </p>
          <div className="inline-flex items-center gap-1 rounded-full border border-border bg-card p-1" role="group" aria-label="Sort Knowledge Papers">
            {(
              [
                { mode: "recent" as const, label: "Recent" },
                { mode: "az" as const, label: "A–Z" },
                { mode: "oldest" as const, label: "Oldest First" },
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
            {results.map((paper) => (
              <PaperCard key={paper.slug} paper={paper} sortMode={sortMode} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-semibold text-ink">No exact match for these filters.</p>
            <p className="mt-2 text-sm text-ink-soft">
              Try clearing a filter, searching a different word, or browsing a Problem area above —
              nearby knowledge is often still useful.
            </p>
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

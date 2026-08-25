"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/dictionaries";
import { papers } from "@/lib/content/papers";
import { fieldEvidence, formatFeNumber } from "@/lib/content/fieldEvidence";
import TranslateWidget from "./TranslateWidget";
import { trackInternalSearch } from "@/lib/analytics";

interface SearchResult {
  label: string;
  sublabel: string;
  href: string;
  kind: "paper" | "field-evidence";
}

// Covers both evidence libraries — Knowledge Papers and Field Evidence —
// so a visitor typing a farmer's name, a crop, an FE number, or a paper
// title all get a jump suggestion without needing to know which library it
// lives in first (see /field-evidence's own README-style comment in
// fieldEvidence.ts). This index just gives quick as-you-type suggestions;
// each result carries its own href, so picking one always lands correctly
// regardless of type. Submitting without picking one (handleSearch below)
// hands off to whichever library's own full search is the better match.
const searchIndex: SearchResult[] = [
  ...papers.map((p) => ({
    label: p.title,
    sublabel: "Knowledge Paper",
    href: `/papers/${p.slug}/`,
    kind: "paper" as const,
  })),
  ...fieldEvidence.map((fe) => ({
    label: fe.title,
    sublabel: `Field Evidence · ${formatFeNumber(fe.feNumber)}`,
    href: `/field-evidence/${fe.slug}/`,
    kind: "field-evidence" as const,
  })),
];

function searchSite(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const starts: SearchResult[] = [];
  const contains: SearchResult[] = [];
  for (const item of searchIndex) {
    const label = item.label.toLowerCase();
    if (label.startsWith(q)) starts.push(item);
    else if (label.includes(q)) contains.push(item);
  }
  return [...starts, ...contains].slice(0, 8);
}

interface NavChild {
  label: string;
  href: string;
}
interface NavGroup {
  label: string;
  href: string;
  children?: NavChild[];
}

export default function Header({ dict }: { dict: Dictionary }) {
  const pathname = usePathname();
  const router = useRouter();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const groups: NavGroup[] = [
    { label: dict.nav.home, href: "/" },
    { label: dict.nav.science, href: "/science" },
    { label: dict.nav.papers, href: "/papers" },
    { label: dict.nav.fieldEvidence, href: "/field-evidence" },
    {
      label: dict.nav.crops,
      href: "/crops",
      children: [
        { label: dict.nav.allCrops, href: "/crops" },
        { label: dict.nav.machines, href: "/machines" },
        { label: dict.nav.resources, href: "/resources" },
      ],
    },
    {
      label: dict.nav.advisory,
      href: "/advisory",
      children: [
        { label: dict.nav.advisory, href: "/advisory" },
        { label: dict.nav.farmerVoices, href: "/farmer-voices" },
        { label: dict.nav.videoLibrary, href: "/video-library" },
      ],
    },
    {
      label: dict.nav.aboutGroup,
      href: "/about",
      children: [
        { label: dict.nav.about, href: "/about" },
        { label: dict.nav.founder, href: "/founder" },
        { label: dict.nav.services, href: "/services" },
        { label: dict.nav.validation, href: "/validation" },
      ],
    },
  ];

  // A group counts as active if its own href matches, or if any of its
  // dropdown children do — so "Crops & Machinery" highlights on /machines
  // and /resources too, not only on /crops itself.
  const hrefMatches = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
  const isActive = (group: NavGroup) =>
    hrefMatches(group.href) || (group.children?.some((c) => hrefMatches(c.href)) ?? false);

  const searchResults = searchSite(query);

  function goToResult(href: string) {
    setSearchOpen(false);
    setQuery("");
    router.push(href);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    trackInternalSearch(q.length, searchResults.length);
    setSearchOpen(false);
    setQuery("");
    // Hand off to the real full search rather than guessing a single local
    // match — but WHICH library's search depends on what the query looks
    // like: an explicit "FE-002"/"FE002" reference or a query whose best
    // local match is a Field Evidence record goes to /field-evidence; a
    // "KP-190" reference or anything else (the common case) goes to
    // /papers, which applies the full relevance-ranked search over the
    // whole Knowledge Paper library. A plain browser navigation (not
    // router.push) is deliberate: this statically-exported site has
    // trailingSlash:true, and client-side router.push has been observed to
    // drop the query string during that normalization, while a full
    // navigation always preserves it exactly and each browser reads it
    // straight from window.location.search on mount either way.
    const looksLikeFeRef = /^fe-?\d+$/i.test(q);
    const topResult = searchResults[0];
    const target = looksLikeFeRef || topResult?.kind === "field-evidence" ? "/field-evidence" : "/papers";
    window.location.href = `${target}/?q=${encodeURIComponent(q)}`;
  }

  return (
    <header className="sticky top-0 z-50 bg-cream/95 shadow-sm backdrop-blur">
      {/* Tier 1 — utility bar */}
      <div className="border-b-4 border-[#7cbf3f] bg-[#1c1c1e]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:py-1.5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <Link href="/" className="flex flex-none items-center" aria-label={`${dict.meta.siteName} home`}>
              <img
                src="/images/pedaver-logo-white.png"
                alt={`${dict.meta.siteName} — The Transformative Producer`}
                className="h-8 w-auto sm:h-14 lg:h-16"
              />
            </Link>
            <span className="h-6 w-px flex-none bg-white/15 sm:h-12" aria-hidden="true" />
            <Link href="/" className="flex flex-none items-center" aria-label="PQNK — The Science of Natural Farming">
              <img
                src="/images/pqnk-logo.png"
                alt="PQNK — The Science of Natural Farming"
                className="h-8 w-auto sm:h-14 lg:h-16"
              />
            </Link>
          </div>

          <div className="flex flex-none items-center gap-1 sm:gap-3">
            <TranslateWidget />

            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label={dict.nav.searchLabel}
              aria-expanded={searchOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-cream/80 transition hover:bg-white/10 hover:text-cream"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" />
              </svg>
            </button>

            <Link
              href="/contact"
              className="hidden text-sm font-medium text-cream/80 transition hover:text-cream sm:block"
            >
              {dict.nav.contact}
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={dict.nav.menuLabel}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-cream lg:hidden"
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="border-b border-border bg-card">
          <form onSubmit={handleSearch} className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-soft">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" strokeLinecap="round" />
            </svg>
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dict.nav.searchPlaceholder}
              className="w-full bg-transparent py-1 text-base text-ink placeholder:text-ink-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <button type="submit" className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-cream hover:bg-primary-dark">
              {dict.nav.searchLabel}
            </button>
          </form>

          {query.trim() && (
            <div className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
              {searchResults.length > 0 ? (
                <ul className="overflow-hidden rounded-xl border border-border">
                  {searchResults.map((result) => (
                    <li key={result.href}>
                      <button
                        type="button"
                        onClick={() => goToResult(result.href)}
                        className="flex w-full items-center justify-between gap-3 border-b border-border bg-card px-4 py-2.5 text-left text-sm last:border-b-0 hover:bg-primary/10"
                      >
                        <span className="font-medium text-ink">{result.label}</span>
                        <span className="flex-none text-xs font-semibold uppercase tracking-wide text-ink-soft">
                          {result.sublabel}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="px-1 text-sm text-ink-soft">
                  No Knowledge Paper titles match &ldquo;{query}&rdquo; — press Search to run a full search.
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tier 2 — main menu (desktop) */}
      <nav className="hidden lg:block">
        <div className="mx-auto flex max-w-6xl items-stretch gap-1 px-4 sm:px-6">
          {groups.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => group.children && setOpenGroup(group.label)}
              onMouseLeave={() => setOpenGroup(null)}
              onFocus={() => group.children && setOpenGroup(group.label)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenGroup(null);
              }}
            >
              <Link
                href={group.href}
                aria-current={isActive(group) ? "page" : undefined}
                aria-haspopup={group.children ? true : undefined}
                aria-expanded={group.children ? openGroup === group.label : undefined}
                className={`flex items-center gap-1 border-b-2 px-4 py-3.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary ${
                  isActive(group)
                    ? "border-accent text-primary-dark"
                    : "border-transparent text-ink-soft hover:border-accent/40 hover:text-primary-dark"
                }`}
              >
                {group.label}
                {group.children && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </Link>

              {group.children && openGroup === group.label && (
                <div className="absolute start-0 top-full z-50 min-w-52 overflow-hidden rounded-b-xl border border-border bg-card shadow-lg">
                  {group.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      aria-current={hrefMatches(child.href) ? "page" : undefined}
                      className={`block px-4 py-2.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary ${
                        hrefMatches(child.href)
                          ? "bg-primary/10 text-primary"
                          : "text-ink-soft hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Mobile drawer — groups with children collapse to a tap-to-expand
          accordion (closed by default) so the menu isn't one long flat
          scroll; groups without children navigate straight away. */}
      {mobileOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            {groups.map((group) => {
              const active = isActive(group);
              const expanded = mobileOpenGroup === group.label;
              return (
                <div key={group.label} className="border-b border-border py-1 last:border-b-0">
                  {group.children ? (
                    <button
                      type="button"
                      onClick={() => setMobileOpenGroup(expanded ? null : group.label)}
                      aria-expanded={expanded}
                      className={`flex w-full items-center justify-between gap-2 py-3 text-base font-semibold ${
                        active ? "text-primary" : "text-primary-dark"
                      }`}
                    >
                      {group.label}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className={`flex-none transition-transform ${expanded ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      href={group.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block py-3 text-base font-semibold ${active ? "text-primary" : "text-primary-dark"}`}
                    >
                      {group.label}
                    </Link>
                  )}
                  {group.children && expanded && (
                    <div className="mb-2 ms-1 flex flex-col gap-1 border-s-2 border-border ps-4">
                      {group.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className={`py-2.5 text-base ${
                            hrefMatches(child.href) ? "font-semibold text-primary" : "text-ink-soft hover:text-primary"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-base font-semibold ${
                  hrefMatches("/contact") ? "text-primary" : "text-primary-dark"
                }`}
              >
                {dict.nav.contact}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

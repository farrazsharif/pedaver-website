"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/dictionaries";
import { crops } from "@/lib/content/crops";
import { papers } from "@/lib/content/papers";
import { machines } from "@/lib/content/machines";
import TranslateWidget from "./TranslateWidget";

interface SearchResult {
  label: string;
  sublabel: string;
  href: string;
}

const searchIndex: SearchResult[] = [
  ...crops.map((c) => ({ label: c.name, sublabel: "Crop", href: `/crops/${c.slug}` })),
  ...papers.map((p) => ({ label: p.title, sublabel: "Knowledge Paper", href: `/papers/${p.slug}` })),
  ...machines.map((m) => ({ label: m.title, sublabel: "Machine", href: `/machines#${m.slug}` })),
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
  const [query, setQuery] = useState("");

  const groups: NavGroup[] = [
    { label: dict.nav.home, href: "/" },
    {
      label: dict.nav.aboutGroup,
      href: "/about",
      children: [
        { label: dict.nav.about, href: "/about" },
        { label: dict.nav.founder, href: "/founder" },
      ],
    },
    {
      label: dict.nav.crops,
      href: "/crops",
      children: [
        { label: dict.nav.allCrops, href: "/crops" },
        { label: dict.nav.resources, href: "/resources" },
      ],
    },
    { label: dict.nav.papers, href: "/papers" },
    { label: dict.nav.services, href: "/services" },
    { label: dict.nav.machines, href: "/machines" },
    { label: dict.nav.videos, href: "/videos" },
    { label: dict.nav.validation, href: "/validation" },
    { label: dict.nav.contact, href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  const searchResults = searchSite(query);

  function goToResult(href: string) {
    setSearchOpen(false);
    setQuery("");
    router.push(href);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    const [top] = searchResults;
    goToResult(top ? top.href : "/papers");
  }

  return (
    <header className="sticky top-0 z-50 bg-cream/95 shadow-sm backdrop-blur">
      {/* Tier 1 — utility bar */}
      <div className="border-b-4 border-[#7cbf3f] bg-[#1c1c1e]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/" className="flex items-center" aria-label={`${dict.meta.siteName} home`}>
              <img
                src="/images/pedaver-logo-white.png"
                alt={`${dict.meta.siteName} — The Transformative Producer`}
                className="h-14 w-auto sm:h-16"
              />
            </Link>
            <span className="h-10 w-px bg-white/15 sm:h-12" aria-hidden="true" />
            <Link href="/" className="flex items-center" aria-label="PQNK — The Science of Natural Farming">
              <img
                src="/images/pqnk-logo.png"
                alt="PQNK — The Science of Natural Farming"
                className="h-14 w-auto sm:h-16"
              />
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
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
              className="w-full bg-transparent py-1 text-base text-ink outline-none placeholder:text-ink-soft"
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
                <p className="px-1 text-sm text-ink-soft">No crops, papers, or machines match &ldquo;{query}&rdquo;.</p>
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
            >
              <Link
                href={group.href}
                className={`flex items-center gap-1 border-b-2 px-4 py-3.5 text-sm font-semibold transition ${
                  isActive(group.href)
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
                      className="block px-4 py-2.5 text-sm font-medium text-ink-soft transition hover:bg-primary/10 hover:text-primary"
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

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-border bg-card lg:hidden">
          <nav className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
            {groups.map((group) => (
              <div key={group.label} className="border-b border-border py-1 last:border-b-0">
                <Link
                  href={group.href}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2.5 text-sm font-semibold text-primary-dark"
                >
                  {group.label}
                </Link>
                {group.children && (
                  <div className="mb-2 ms-4 flex flex-col gap-1">
                    {group.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="py-1.5 text-sm text-ink-soft hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

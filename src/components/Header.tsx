"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/dictionaries";
import { crops } from "@/lib/content/crops";

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
    { label: dict.nav.videos, href: "/videos" },
    { label: dict.nav.certification, href: "/certification" },
    { label: dict.nav.contact, href: "/contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const match = crops.find((c) => c.name.toLowerCase().includes(q));
    setSearchOpen(false);
    setQuery("");
    router.push(match ? `/crops/${match.slug}` : "/crops");
  }

  return (
    <header className="sticky top-0 z-50 bg-cream/95 shadow-sm backdrop-blur">
      {/* Tier 1 — utility bar */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center" aria-label={`${dict.meta.siteName} home`}>
            <img
              src="/images/pedaver-logo-glow.png"
              alt={`${dict.meta.siteName} — The Transformative Producer`}
              className="h-12 w-auto sm:h-16"
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setSearchOpen((v) => !v)}
              aria-label={dict.nav.searchLabel}
              aria-expanded={searchOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition hover:bg-primary/10 hover:text-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" />
              </svg>
            </button>

            <Link
              href="/contact"
              className="hidden text-sm font-medium text-ink-soft transition hover:text-primary sm:block"
            >
              {dict.nav.contact}
            </Link>

            <Link
              href="/certification"
              className="hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-ink shadow-sm transition hover:bg-accent-light sm:inline-block"
            >
              {dict.nav.getCertified}
            </Link>

            {/* PQNK co-brand logo (top bar, right; hidden on small screens) */}
            <img
              src="/images/pqnk-logo.png"
              alt="PQNK — The Science of Natural Farming"
              className="hidden h-12 w-auto md:block lg:h-14"
            />

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={dict.nav.menuLabel}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-ink lg:hidden"
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
            <Link
              href="/certification"
              onClick={() => setMobileOpen(false)}
              className="mt-4 block rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-ink"
            >
              {dict.nav.getCertified}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

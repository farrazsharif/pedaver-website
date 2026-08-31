"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/dictionaries";
import TranslateWidget from "./TranslateWidget";

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
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);

  // Final nav architecture (2026-08-25): no top-level Farmer Advisory,
  // Farmer Voices, Video Library or Q&A tab — Knowledge Exchange
  // (still served at /field-evidence, see that page's own note on why the
  // URL didn't change) is the umbrella for all of those; /advisory,
  // /farmer-voices and /video-library remain live and linked from within
  // that page and the footer, just not from main nav.
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
    { label: dict.nav.books, href: "/books" },
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

  return (
    <header className="sticky top-0 z-50 bg-cream/95 shadow-sm backdrop-blur">
      {/* Tier 1 — utility bar: Translate | Ask | Contact. No generic
          site-wide search here by design (2026-08-25) — each knowledge
          library (Knowledge Papers, Knowledge Exchange) provides its own
          contextual search on its own page instead. */}
      <div className="border-b-4 border-[#7cbf3f] bg-[#1c1c1e]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 min-[900px]:py-1.5">
          <div className="flex min-w-0 items-center gap-2 sm:gap-4">
            <Link href="/" className="flex flex-none items-center" aria-label={`${dict.meta.siteName} home`}>
              <img
                src="/images/pedaver-logo-white.png"
                alt={`${dict.meta.siteName} — The Transformative Producer`}
                className="h-8 w-auto sm:h-14 min-[900px]:h-16"
              />
            </Link>
            <span className="h-6 w-px flex-none bg-white/15 sm:h-12" aria-hidden="true" />
            <Link href="/" className="flex flex-none items-center" aria-label="PQNK — The Science of Natural Farming">
              <img
                src="/images/pqnk-logo.png"
                alt="PQNK — The Science of Natural Farming"
                className="h-8 w-auto sm:h-14 min-[900px]:h-16"
              />
            </Link>
          </div>

          <div className="flex flex-none items-center gap-1 sm:gap-3">
            <TranslateWidget />

            <Link
              href="/ask"
              className="hidden text-sm font-medium text-cream/80 transition hover:text-cream sm:block"
            >
              {dict.nav.ask}
            </Link>

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
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-cream min-[900px]:hidden"
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

      {/* Tier 2 — main menu (desktop). Shows from 900px wide (was lg/1024px)
          so laptops and zoomed-in windows keep the full tab bar instead of
          collapsing to the hamburger; below 900px the 7-item bar can't fit
          on one line, so the mobile drawer takes over there. */}
      <nav className="hidden min-[900px]:block">
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
                className={`flex items-center gap-1 border-b-2 px-3.5 py-3.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary ${
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
        <div className="border-t border-border bg-card min-[900px]:hidden">
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
            <div className="flex flex-col pt-2">
              <Link
                href="/ask"
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-base font-semibold ${
                  hrefMatches("/ask") ? "text-primary" : "text-primary-dark"
                }`}
              >
                {dict.nav.ask}
              </Link>
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

import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import { officialChannel, founderChannel } from "@/lib/content/videos";

export default function Footer({ dict }: { dict: Dictionary }) {
  const year = new Date().getFullYear();

  const exploreLinks = [
    { label: dict.nav.about, href: "/about" },
    { label: dict.nav.founder, href: "/founder" },
    { label: dict.nav.crops, href: "/crops" },
    { label: dict.nav.resources, href: "/resources" },
    { label: dict.nav.papers, href: "/papers" },
  ];

  const workLinks = [
    { label: dict.nav.videos, href: "/videos" },
    { label: dict.nav.certification, href: "/certification" },
    { label: dict.nav.contact, href: "/contact" },
  ];

  return (
    <footer className="mt-24 bg-primary-dark text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <div className="inline-flex rounded-lg bg-cream px-4 py-3">
            <img
              src="/images/pedaver-logo-glow.png"
              alt={dict.meta.siteName}
              className="h-9 w-auto"
            />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">{dict.footer.tagline}</p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-light">{dict.footer.exploreTitle}</h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-cream/80 transition hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Work */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-light">{dict.footer.workTitle}</h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {workLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-cream/80 transition hover:text-cream">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-light">{dict.footer.followTitle}</h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            <li>
              <a href="https://www.facebook.com/Pedaver" target="_blank" rel="noopener noreferrer" className="text-cream/80 transition hover:text-cream">
                Facebook — Pedaver
              </a>
            </li>
            <li>
              <a href={officialChannel.url} target="_blank" rel="noopener noreferrer" className="text-cream/80 transition hover:text-cream">
                YouTube — {officialChannel.name}
              </a>
            </li>
            <li>
              <a href={founderChannel.url} target="_blank" rel="noopener noreferrer" className="text-cream/80 transition hover:text-cream">
                YouTube — {founderChannel.name}
              </a>
            </li>
            <li>
              <a href="mailto:pedaver@gmail.com" className="text-cream/80 transition hover:text-cream">
                pedaver@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Legal + socials */}
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6">
          <p className="text-xs text-cream/60">© {year} {dict.footer.rightsText}</p>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/Pedaver"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition hover:border-cream/50 hover:text-cream"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3V13h2.6v8h3.6z" />
              </svg>
            </a>
            <a
              href={officialChannel.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/80 transition hover:border-cream/50 hover:text-cream"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.7-1.7C19.4 5.2 12 5.2 12 5.2s-7.4 0-8.9.4A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.7 1.7c1.5.4 8.9.4 8.9.4s7.4 0 8.9-.4a2.5 2.5 0 0 0 1.7-1.7C23 15.2 23 12 23 12zM9.8 15.3V8.7l5.7 3.3-5.7 3.3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

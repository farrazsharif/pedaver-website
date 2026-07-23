"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { highlights } from "@/lib/content/highlights";

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % highlights.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[560px] items-end overflow-hidden text-cream sm:min-h-[640px]">
      {highlights.map((slide, i) => (
        <img
          key={slide.slug}
          src={slide.image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-24 sm:px-6 sm:pb-24">
        {highlights.map((slide, i) => (
          <div key={slide.slug} className={i === active ? "block" : "hidden"}>
            <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">{slide.title}</h1>
            <Link
              href={slide.href}
              className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink shadow transition hover:bg-accent-light"
            >
              {slide.cta}
            </Link>
          </div>
        ))}

        <div className="mt-10 flex gap-2">
          {highlights.map((slide, i) => (
            <button
              key={slide.slug}
              type="button"
              aria-label={`Slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-accent" : "w-4 bg-cream/40 hover:bg-cream/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { founderGallery } from "@/lib/content/founderGallery";

const flatPhotos = founderGallery.flatMap((group) => group.photos);

export default function FounderGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") setOpenIndex((i) => (i === null ? i : (i + 1) % flatPhotos.length));
      if (e.key === "ArrowLeft") setOpenIndex((i) => (i === null ? i : (i - 1 + flatPhotos.length) % flatPhotos.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex]);

  const active = openIndex === null ? null : flatPhotos[openIndex];

  return (
    <div className="mx-auto max-w-5xl">
      {founderGallery.map((group) => (
        <div key={group.era} className="mb-10">
          <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-border pb-2">
            <h3 className="text-lg font-bold text-primary-dark">{group.era}</h3>
            <p className="text-sm text-ink-soft">{group.note}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {group.photos.map((photo) => {
              const index = flatPhotos.findIndex((p) => p.slug === photo.slug);
              return (
                <button
                  key={photo.slug}
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm"
                >
                  <img
                    src={photo.image}
                    alt={photo.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-2 top-2 rounded-full bg-primary-dark/80 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-cream">
                    {photo.date}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/95 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
            className="absolute right-5 top-5 text-3xl leading-none text-cream/80 hover:text-cream"
          >
            &times;
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i - 1 + flatPhotos.length) % flatPhotos.length));
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 px-3 py-2 text-2xl text-cream hover:bg-cream/20 sm:left-6"
          >
            &#8249;
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              setOpenIndex((i) => (i === null ? i : (i + 1) % flatPhotos.length));
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 px-3 py-2 text-2xl text-cream hover:bg-cream/20 sm:right-6"
          >
            &#8250;
          </button>

          <figure
            className="max-h-[85vh] max-w-3xl overflow-hidden rounded-2xl bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={active.image} alt={active.caption} className="max-h-[70vh] w-full object-contain bg-primary-dark" />
            <figcaption className="p-4 text-center text-sm text-ink-soft">
              <span className="mr-2 font-semibold text-accent">{active.date}</span>
              {active.caption}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

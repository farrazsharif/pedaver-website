"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import dict from "@/lib/dictionaries";
import { PAPER_CATEGORIES, type Paper } from "@/lib/content/papers";

export default function PapersBrowser({ papers }: { papers: Paper[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const paper of papers) {
      map.set(paper.category, (map.get(paper.category) ?? 0) + 1);
    }
    return map;
  }, [papers]);

  const filteredPapers = useMemo(() => {
    if (activeCategory === "All") return papers;
    return papers.filter((paper) => paper.category === activeCategory);
  }, [papers, activeCategory]);

  const categories = ["All", ...PAPER_CATEGORIES];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          const count = category === "All" ? papers.length : counts.get(category) ?? 0;
          if (count === 0) return null;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "border-primary bg-primary text-cream"
                  : "border-border bg-card text-ink-soft hover:border-primary hover:text-primary-dark"
              }`}
            >
              {category}
              <span className={isActive ? "ml-1.5 text-cream/70" : "ml-1.5 text-ink-soft/50"}>({count})</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {filteredPapers.map((paper) => (
          <Link
            key={paper.slug}
            href={`/papers/${paper.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            {paper.heroImage && (
              <div className="h-44 w-full overflow-hidden">
                <img
                  src={paper.heroImage}
                  alt={paper.title}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">{paper.category}</p>
              <p className="mt-1 text-xs text-ink-soft/70">
                {dict.papers.publishedLabel}{" "}
                {new Date(paper.publishedDate).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
              </p>
              <h2 className="mt-2 text-xl font-bold text-primary-dark group-hover:text-primary">{paper.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{paper.summary}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent">{dict.papers.readAbstract} →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

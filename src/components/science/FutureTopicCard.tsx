/**
 * A Science topic that doesn't have a detail page yet. Deliberately
 * non-interactive (no href, no href="#") so it never reads as a dead link —
 * see the /science build report for the temporary-link strategy.
 */
export default function FutureTopicCard({
  name,
  tagline,
  summary,
}: {
  name: string;
  tagline?: string;
  summary: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-soft/70">Science page coming soon</p>
      <h3 className="mt-2 text-lg font-bold text-primary-dark">{name}</h3>
      {tagline && <p className="mt-1 text-sm font-medium italic text-ink-soft">{tagline}</p>}
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">{summary}</p>
    </div>
  );
}

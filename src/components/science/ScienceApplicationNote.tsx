/**
 * Distinguishes a universal scientific requirement from the local
 * engineering/field decision that satisfies it. Reused wherever a Science
 * page states a number or dimension, so readers never mistake a local
 * adaptation for a biological law.
 */
export default function ScienceApplicationNote({ science, application }: { science: string; application: string }) {
  return (
    <div className="grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-primary">Universal Science</p>
        <p className="mt-1 text-sm leading-relaxed text-ink">{science}</p>
      </div>
      <div className="sm:border-s sm:border-border sm:ps-4">
        <p className="text-xs font-bold uppercase tracking-wide text-accent">Field Application / Local Adaptation</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{application}</p>
      </div>
    </div>
  );
}

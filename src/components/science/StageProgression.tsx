interface Stage {
  number: number;
  name: string;
  body: string;
}

/**
 * A connected sequence of states (not independent cards) — horizontal with
 * connecting arrows on wider screens, vertical on mobile. Built for the
 * four-stage PQNK transition model but generic enough for any ordered
 * sequence a future Science page needs.
 */
export default function StageProgression({ stages }: { stages: Stage[] }) {
  return (
    <div>
      {/* Desktop / tablet: horizontal */}
      <div className="hidden items-stretch gap-2 sm:flex">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex flex-1 items-center gap-2">
            <div className="flex-1 rounded-xl border border-border bg-card p-5 text-center">
              <p className="text-xs font-bold text-accent">{stage.number}</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-primary-dark">{stage.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stage.body}</p>
            </div>
            {i < stages.length - 1 && (
              <svg width="20" height="16" viewBox="0 0 20 16" className="flex-none text-ink-soft/50" aria-hidden="true">
                <path d="M0 8 L14 8 M9 2 L15 8 L9 14" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="flex flex-col items-stretch gap-2 sm:hidden">
        {stages.map((stage, i) => (
          <div key={stage.name} className="flex flex-col items-center">
            <div className="w-full rounded-xl border border-border bg-card p-5 text-center">
              <p className="text-xs font-bold text-accent">{stage.number}</p>
              <p className="mt-1 text-sm font-bold uppercase tracking-wide text-primary-dark">{stage.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stage.body}</p>
            </div>
            {i < stages.length - 1 && (
              <svg width="16" height="20" viewBox="0 0 16 20" className="my-1 text-ink-soft/50" aria-hidden="true">
                <path d="M8 0 L8 14 M2 9 L8 15 L14 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * A vertical connected sequence that visually loops back to its starting
 * concept — for biological cycles where the last step feeds the first
 * again, rather than a one-way industrial production chain. Readable on
 * mobile by design (no circular multi-node SVG).
 */
export default function ProductionLoop({ steps, closingLabel }: { steps: string[]; closingLabel: string }) {
  return (
    <div className="flex flex-col items-stretch gap-2">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-col items-center">
          <div className="w-full max-w-md rounded-lg border border-border bg-card px-5 py-3 text-center text-sm font-semibold text-primary-dark">
            {step}
          </div>
          <svg width="16" height="20" viewBox="0 0 16 20" className="my-1 text-ink-soft/50" aria-hidden="true">
            <path d="M8 0 L8 14 M2 9 L8 15 L14 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      ))}
      <div className="w-full max-w-md rounded-lg border-2 border-accent bg-accent/10 px-5 py-3 text-center text-sm font-bold text-primary-dark">
        {closingLabel}
      </div>
      <svg width="20" height="20" viewBox="0 0 20 20" className="my-1 text-accent/70" aria-hidden="true">
        <path
          d="M14 4 A8 8 0 1 0 18 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          markerEnd="url(#loopArrow)"
        />
        <defs>
          <marker id="loopArrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="currentColor" />
          </marker>
        </defs>
      </svg>
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-accent">loops back to the start</p>
    </div>
  );
}

import type { CoreComponent } from "@/lib/content/science";

/**
 * Static (non-animated) cycle diagram showing that Soil, Plants, Water and
 * Biodiversity are one continuously interconnected system, not four
 * independent topics — the arrows loop all the way back to Soil.
 */
export default function LivingSystemDiagram({ components }: { components: CoreComponent[] }) {
  const [soil, plants, water, biodiversity] = components;
  const nodes = [
    { c: soil, x: 240, y: 56 },
    { c: plants, x: 424, y: 240 },
    { c: water, x: 240, y: 424 },
    { c: biodiversity, x: 56, y: 240 },
  ];

  return (
    <div className="mx-auto max-w-xl">
      <svg
        viewBox="-15 -15 510 510"
        role="img"
        aria-label="Soil, Plants, Water and Biodiversity form one continuous cycle: each feeds and rebuilds the next, looping back to Soil."
        className="mx-auto w-full max-w-md"
      >
        <defs>
          <marker id="cycleArrow" markerWidth="9" markerHeight="9" refX="6" refY="4.5" orient="auto">
            <path d="M0,0 L9,4.5 L0,9 Z" fill="var(--color-primary)" />
          </marker>
        </defs>

        {/* Soil -> Plants -> Water -> Biodiversity -> Soil */}
        <path
          d="M 275 91 A 210 210 0 0 1 389 205"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          markerEnd="url(#cycleArrow)"
        />
        <path
          d="M 389 275 A 210 210 0 0 1 275 389"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          markerEnd="url(#cycleArrow)"
        />
        <path
          d="M 205 389 A 210 210 0 0 1 91 275"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          markerEnd="url(#cycleArrow)"
        />
        <path
          d="M 91 205 A 210 210 0 0 1 205 91"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="2.5"
          markerEnd="url(#cycleArrow)"
        />

        <text x="240" y="233" textAnchor="middle" className="fill-ink-soft font-heading" fontSize="13">
          ONE
        </text>
        <text x="240" y="252" textAnchor="middle" className="fill-ink-soft font-heading" fontSize="13">
          LIVING SYSTEM
        </text>

        {nodes.map(({ c, x, y }) => (
          <g key={c.slug}>
            <circle cx={x} cy={y} r="50" fill="var(--color-primary-dark)" />
            <text
              x={x}
              y={y + 4}
              textAnchor="middle"
              className="fill-cream font-heading font-bold uppercase"
              fontSize="12"
            >
              {c.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

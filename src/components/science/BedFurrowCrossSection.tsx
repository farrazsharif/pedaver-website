/**
 * Proportionally accurate cross-section of the PQNK permanent bed/furrow
 * profile: 42" bed top, 18" furrow top, 8" furrow bottom, ~8" furrow depth
 * (scale: 3px per inch). Three beds / two furrows so the central bed reads
 * unambiguously as the full 42" protected zone, not the 18" furrow.
 * Purely schematic — proportions are accurate, decoration is not the point.
 */
export default function BedFurrowCrossSection() {
  const SCALE = 3;
  const BED = 42 * SCALE; // 126
  const FURROW_TOP = 18 * SCALE; // 54
  const FURROW_BOTTOM = 8 * SCALE; // 24
  const DEPTH = 8 * SCALE; // 24
  const SHOULDER = (FURROW_TOP - FURROW_BOTTOM) / 2; // 15

  const SURFACE_Y = 70; // bed-top elevation
  const FLOOR_Y = SURFACE_Y + DEPTH; // furrow-bottom elevation
  const SOIL_BOTTOM_Y = 190;
  const PAD = 20;

  const totalWidth = BED * 3 + FURROW_TOP * 2;
  const width = totalWidth + PAD * 2;
  const height = SOIL_BOTTOM_Y + 30;

  // Build the repeating surface outline: bed(126) - down(15,24) - floor(24) - up(15,24) - bed(126) - ... - bed(126)
  const surface: [number, number][] = [];
  let cx = PAD;
  surface.push([cx, SURFACE_Y]);
  cx += BED;
  surface.push([cx, SURFACE_Y]); // end of bed 1 top
  cx += SHOULDER;
  surface.push([cx, FLOOR_Y]); // down into furrow 1
  cx += FURROW_BOTTOM;
  surface.push([cx, FLOOR_Y]); // furrow 1 floor
  cx += SHOULDER;
  surface.push([cx, SURFACE_Y]); // up onto bed 2
  cx += BED;
  surface.push([cx, SURFACE_Y]); // end of bed 2 top
  cx += SHOULDER;
  surface.push([cx, FLOOR_Y]); // down into furrow 2
  cx += FURROW_BOTTOM;
  surface.push([cx, FLOOR_Y]); // furrow 2 floor
  cx += SHOULDER;
  surface.push([cx, SURFACE_Y]); // up onto bed 3
  cx += BED;
  surface.push([cx, SURFACE_Y]); // end of bed 3 top

  const surfacePath = surface.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
  const soilPath = `${surfacePath} L ${cx} ${SOIL_BOTTOM_Y} L ${PAD} ${SOIL_BOTTOM_Y} Z`;

  const bed1Center = PAD + BED / 2;
  const furrow1Center = PAD + BED + SHOULDER + FURROW_BOTTOM / 2;
  const bed2Center = PAD + BED + FURROW_TOP + BED / 2;
  const furrow2Center = PAD + BED * 2 + FURROW_TOP + SHOULDER + FURROW_BOTTOM / 2;
  const bed3Center = PAD + BED * 2 + FURROW_TOP * 2 + BED / 2;
  const bedCenters = [bed1Center, bed2Center, bed3Center];
  const furrowCenters = [furrow1Center, furrow2Center];

  const waterLevelY = FLOOR_Y - DEPTH / 2; // "approximately half furrow height"

  return (
    <div className="mx-auto w-full max-w-2xl">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Cross-section of the PQNK permanent bed and furrow profile: three 42-inch protected beds separated by two 18-inch-top, 8-inch-bottom, 8-inch-deep furrows carrying tractor traffic and irrigation water."
        className="w-full"
      >
        {/* soil body */}
        <path d={soilPath} fill="var(--color-card)" stroke="var(--color-border)" strokeWidth="1.5" />

        {/* furrow water, filled to roughly half furrow depth */}
        {furrowCenters.map((fc, i) => (
          <path
            key={`water-${i}`}
            d={`M ${fc - FURROW_BOTTOM / 2 - SHOULDER * ((FLOOR_Y - waterLevelY) / DEPTH)} ${waterLevelY} L ${fc - FURROW_BOTTOM / 2} ${FLOOR_Y} L ${fc + FURROW_BOTTOM / 2} ${FLOOR_Y} L ${fc + FURROW_BOTTOM / 2 + SHOULDER * ((FLOOR_Y - waterLevelY) / DEPTH)} ${waterLevelY} Z`}
            fill="var(--color-primary)"
            fillOpacity="0.28"
          />
        ))}

        {/* mulch hatch along each bed top */}
        {bedCenters.map((bc, i) => (
          <g key={`mulch-${i}`}>
            {Array.from({ length: 9 }).map((_, j) => {
              const mx = bc - BED / 2 + 8 + j * ((BED - 16) / 8);
              return (
                <line
                  key={j}
                  x1={mx - 5}
                  y1={SURFACE_Y - 3}
                  x2={mx + 5}
                  y2={SURFACE_Y - 3}
                  stroke="var(--color-accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
        ))}

        {/* crop row on each bed */}
        {bedCenters.map((bc, i) => (
          <g key={`crop-${i}`}>
            {[-1, 0, 1].map((k) => (
              <g key={k} transform={`translate(${bc + k * 30}, ${SURFACE_Y - 8})`}>
                <line x1="0" y1="0" x2="0" y2="-14" stroke="var(--color-primary)" strokeWidth="2" />
                <circle cx="0" cy="-16" r="4.5" fill="var(--color-primary)" />
              </g>
            ))}
          </g>
        ))}

        {/* roots beneath each bed, confined within the bed's footprint */}
        {bedCenters.map((bc, i) => (
          <g key={`roots-${i}`} stroke="var(--color-ink-soft, #8a8a8a)" strokeOpacity="0.55" strokeWidth="1.3" fill="none">
            <path d={`M ${bc} ${SURFACE_Y} L ${bc} ${SURFACE_Y + 45}`} />
            <path d={`M ${bc} ${SURFACE_Y + 18} L ${bc - 22} ${SURFACE_Y + 55}`} />
            <path d={`M ${bc} ${SURFACE_Y + 18} L ${bc + 22} ${SURFACE_Y + 55}`} />
            <path d={`M ${bc} ${SURFACE_Y + 32} L ${bc - 14} ${SURFACE_Y + 70}`} />
            <path d={`M ${bc} ${SURFACE_Y + 32} L ${bc + 14} ${SURFACE_Y + 70}`} />
          </g>
        ))}

        {/* tractor tyre resting in each furrow */}
        {furrowCenters.map((fc, i) => (
          <ellipse key={`tyre-${i}`} cx={fc} cy={FLOOR_Y - 2} rx="13" ry="15" fill="#2b2b2b" fillOpacity="0.85" />
        ))}

        {/* lateral infiltration arrows from furrow water into adjacent bed toe */}
        {furrowCenters.map((fc, i) => (
          <g key={`infil-${i}`} stroke="var(--color-primary)" strokeWidth="1.3" fill="none" markerEnd="url(#infilArrow)">
            <path d={`M ${fc - FURROW_BOTTOM / 2 - 2} ${FLOOR_Y - 4} q -14 -4 -18 -14`} />
            <path d={`M ${fc + FURROW_BOTTOM / 2 + 2} ${FLOOR_Y - 4} q 14 -4 18 -14`} />
          </g>
        ))}
        <defs>
          <marker id="infilArrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--color-primary)" />
          </marker>
        </defs>

        {/* dimension labels */}
        {bedCenters.map((bc, i) => (
          <text key={`bedlabel-${i}`} x={bc} y={height - 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--color-primary-dark)">
            42&quot; BED
          </text>
        ))}
        {furrowCenters.map((fc, i) => (
          <text key={`furrowlabel-${i}`} x={fc} y={height - 8} textAnchor="middle" fontSize="10" fontWeight="700" fill="var(--color-accent)">
            18&quot; FURROW
          </text>
        ))}
      </svg>

      <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs text-ink-soft">
        <span>■ Mulch on bed surface</span>
        <span>● Crop row</span>
        <span>Root branches confined to the bed</span>
        <span>■ Tractor tyre in furrow</span>
        <span>■ Furrow water, ≈ half furrow depth</span>
        <span>→ Lateral infiltration into the bed</span>
      </div>
    </div>
  );
}

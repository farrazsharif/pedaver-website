export default function PqnkBadge({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label="PQNK — The science of natural farming"
    >
      <defs>
        <radialGradient id="pqnkBadgeBg" cx="50%" cy="42%" r="65%">
          <stop offset="0%" stopColor="#232323" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>
      </defs>

      <circle cx="120" cy="120" r="116" fill="url(#pqnkBadgeBg)" stroke="#4a4a4a" strokeWidth="1.5" />
      <circle cx="120" cy="120" r="108" fill="none" stroke="#3a3a3a" strokeWidth="1" />

      <image href="/images/pqnk-leaf.png" x="76" y="38" width="88" height="102" preserveAspectRatio="xMidYMid meet" />

      <text
        x="120"
        y="188"
        textAnchor="middle"
        fontSize="42"
        fontWeight="800"
        letterSpacing="2"
        fill="#ffffff"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        PQNK
      </text>
    </svg>
  );
}

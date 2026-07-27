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

      <path id="pqnkBadgeArc" d="M 20,144 A 106,106 0 0 1 220,144" fill="none" />
      <text fontSize="10" fontWeight="600" letterSpacing="0.6" fill="#f2ede0">
        <textPath href="#pqnkBadgeArc" startOffset="50%" textAnchor="middle">
          THE SCIENCE OF NATURAL FARMING
        </textPath>
      </text>

      <image href="/images/pqnk-leaf.png" x="86" y="42" width="52" height="60" preserveAspectRatio="xMidYMid meet" />

      <text
        x="120"
        y="188"
        textAnchor="middle"
        fontSize="36"
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

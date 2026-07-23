// Hand-drawn soil cross-section: a plant with deep roots through four soil
// horizons, recolored to the Pedaver palette. Pure inline SVG, no images.
export default function SoilProfile({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Cross-section of soil showing a plant with deep roots reaching through four soil layers, with sun, earthworm and fungal threads."
      className={className}
    >
      <defs>
        <linearGradient id="pqnk-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eef4ea" />
          <stop offset="1" stopColor="#dcebe0" />
        </linearGradient>
      </defs>

      {/* sky + sun */}
      <rect x="0" y="0" width="300" height="150" fill="url(#pqnk-sky)" />
      <circle cx="248" cy="46" r="20" fill="#e0a868" />
      <g stroke="#e0a868" strokeWidth="2.4" strokeLinecap="round" opacity="0.7">
        <line x1="248" y1="10" x2="248" y2="20" />
        <line x1="248" y1="72" x2="248" y2="82" />
        <line x1="212" y1="46" x2="222" y2="46" />
        <line x1="274" y1="46" x2="284" y2="46" />
        <line x1="223" y1="21" x2="230" y2="28" />
        <line x1="266" y1="64" x2="273" y2="71" />
        <line x1="273" y1="21" x2="266" y2="28" />
        <line x1="230" y1="64" x2="223" y2="71" />
      </g>

      {/* soil horizons */}
      <rect x="0" y="150" width="300" height="55" fill="#6d4a2c" />
      <rect x="0" y="205" width="300" height="55" fill="#7d5734" />
      <rect x="0" y="260" width="300" height="55" fill="#8a6440" />
      <rect x="0" y="315" width="300" height="45" fill="#9a7a52" />
      <rect x="0" y="150" width="300" height="4" fill="#4f3a23" />

      {/* organic speckles */}
      <g fill="#4f3620" opacity="0.55">
        <circle cx="30" cy="172" r="2.4" />
        <circle cx="70" cy="188" r="1.8" />
        <circle cx="120" cy="176" r="2.2" />
        <circle cx="210" cy="184" r="2" />
        <circle cx="255" cy="170" r="2.5" />
        <circle cx="175" cy="196" r="1.6" />
      </g>
      <g fill="#6a4d2e" opacity="0.5">
        <circle cx="45" cy="232" r="2" />
        <circle cx="150" cy="244" r="2.4" />
        <circle cx="240" cy="230" r="1.8" />
        <circle cx="95" cy="288" r="2" />
        <circle cx="200" cy="296" r="2.2" />
        <circle cx="60" cy="330" r="1.8" />
        <circle cx="235" cy="336" r="2" />
      </g>

      {/* fungal threads (mycelium) */}
      <g stroke="#e8dcc6" strokeWidth="1" opacity="0.45" fill="none">
        <path d="M120 210 q-25 12 -48 6 M120 210 q10 22 -6 40 M120 210 q28 6 40 24" />
        <path d="M186 250 q22 8 34 -6 M186 250 q-8 20 -28 22" />
      </g>

      {/* roots */}
      <g stroke="#2f5233" fill="none" strokeLinecap="round">
        <path d="M150 150 C150 190 150 230 150 320" strokeWidth="4.5" />
        <path d="M150 196 C122 210 104 226 88 252" strokeWidth="2.6" />
        <path d="M150 214 C178 226 196 244 210 270" strokeWidth="2.6" />
        <path d="M150 250 C132 266 120 286 112 312" strokeWidth="2.2" />
        <path d="M150 264 C170 280 182 298 190 322" strokeWidth="2.2" />
        <path d="M150 300 C150 316 150 330 150 344" strokeWidth="2" />
        <g strokeWidth="1.3" opacity="0.8">
          <path d="M88 252 q-14 6 -20 18 M88 252 q-4 16 -14 22" />
          <path d="M210 270 q14 4 20 16 M210 270 q6 14 0 24" />
          <path d="M112 312 q-12 4 -16 14 M190 322 q12 2 16 12" />
        </g>
      </g>

      {/* stem + leaves */}
      <path d="M150 150 C150 120 150 100 150 78" stroke="#2f5233" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M150 120 C124 116 108 100 104 82 C126 84 144 98 150 120Z" fill="#2f5233" />
      <path d="M150 104 C176 100 192 86 196 68 C174 70 156 82 150 104Z" fill="#3e6a42" />
      <path d="M150 86 C150 74 156 64 168 58 C166 72 160 82 150 90Z" fill="#e0a868" />
      <circle cx="150" cy="74" r="7" fill="#c97c3d" />

      {/* earthworm */}
      <path d="M232 214 q10 -8 18 0 q8 8 -2 14 q-8 5 -4 14" stroke="#c98b8b" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* labels */}
      <g fontFamily="ui-monospace, Consolas, monospace" fontSize="9" letterSpacing="1.3">
        <text x="10" y="145" fill="#4f3a23">CANOPY · SUN</text>
        <text x="10" y="200" fill="#f0e6d4">TOPSOIL / O-HORIZON</text>
        <text x="10" y="255" fill="#f0e6d4">ROOT ZONE</text>
        <text x="10" y="310" fill="#f0e6d4">SUBSOIL</text>
        <text x="10" y="354" fill="#3a2c1c">MINERAL BASE</text>
      </g>
    </svg>
  );
}

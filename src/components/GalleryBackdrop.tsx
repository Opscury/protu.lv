type Props = {
  variant: 'projection' | 'wireframe'
}

/**
 * Sekciju fons. Zīmēts ar SVG, nevis fotoattēls — svars dažas
 * kilobaitu daļas, asums jebkurā izmērā, krāsa no palešu mainīgajiem.
 */
function GalleryBackdrop({ variant }: Props) {
  if (variant === 'projection') {
    return (
      <svg
        className="backdrop"
        viewBox="0 0 480 480"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <pattern
            id="bd-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path d="M40 0H0v40" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="480" height="480" fill="url(#bd-grid)" />

        <circle cx="240" cy="240" r="150" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="240" cy="240" r="92" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="240" cy="240" r="34" stroke="currentColor" strokeWidth="1.5" />

        <path d="M240 50v380M50 240h380" stroke="currentColor" strokeWidth="1" />

        <path d="M40 92V40h52M440 92V40h-52" stroke="currentColor" strokeWidth="2" />
        <path d="M40 388v52h52M440 388v52h-52" stroke="currentColor" strokeWidth="2" />
      </svg>
    )
  }

  return (
    <svg
      className="backdrop"
      viewBox="0 0 480 480"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Kreisā skice — zema detalizācija */}
      <rect x="40" y="70" width="180" height="250" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="58" y="92" width="144" height="30" rx="2" stroke="currentColor" />
      <rect x="58" y="136" width="96" height="8" rx="2" stroke="currentColor" />
      <rect x="58" y="156" width="128" height="8" rx="2" stroke="currentColor" />
      <rect x="58" y="176" width="72" height="8" rx="2" stroke="currentColor" />
      <rect x="58" y="208" width="66" height="66" rx="2" stroke="currentColor" />
      <rect x="136" y="208" width="66" height="66" rx="2" stroke="currentColor" />
      <rect x="58" y="288" width="80" height="20" rx="10" stroke="currentColor" />

      {/* Labā skice — augsta detalizācija */}
      <rect x="258" y="140" width="180" height="250" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <rect x="276" y="162" width="144" height="66" rx="2" stroke="currentColor" />
      <path d="M276 205l30-24 26 20 22-16 66 32" stroke="currentColor" />
      <circle cx="300" cy="180" r="7" stroke="currentColor" />
      <rect x="276" y="244" width="110" height="8" rx="2" stroke="currentColor" />
      <rect x="276" y="264" width="144" height="8" rx="2" stroke="currentColor" />
      <rect x="276" y="296" width="88" height="22" rx="11" stroke="currentColor" />

      {/* Savienojums starp skicēm — iterācija */}
      <path
        d="M224 200c22 0 14 44 32 44"
        stroke="currentColor"
        strokeDasharray="4 5"
      />

      {/* Kursors */}
      <path d="M352 322l0 30 7-8 5 11 5-2-5-11 10-1z" fill="currentColor" />
    </svg>
  )
}

export default GalleryBackdrop

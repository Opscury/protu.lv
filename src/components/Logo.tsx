type Props = {
  size?: number
  withWordmark?: boolean
  className?: string
}

/**
 * Lēcas gredzens — pamatzīme, kas atsaucas uz VIZIUM projekciju gaismu:
 * divi stari (--beam-a, --beam-b) šķērso gredzenu ap fokusa punktu.
 * Krāsas nāk no CSS mainīgajiem, tāpēc zīme paliek sinhronā ar --exhibit
 * un stariem, ja tie kādreiz mainās.
 */
function Logo({ size = 22, withWordmark = false, className }: Props) {
  const icon = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden={withWordmark}
      role={withWordmark ? undefined : 'img'}
    >
      {!withWordmark && <title>protu.lv</title>}
      <circle cx="24" cy="24" r="19" stroke="var(--exhibit)" strokeWidth="3.4" />
      <path
        d="M5 24A19 19 0 0 1 20.4 5.4"
        stroke="var(--beam-a)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M27.6 42.6A19 19 0 0 1 43 24"
        stroke="var(--beam-b)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="24" cy="24" r="4.4" fill="var(--exhibit)" />
    </svg>
  )

  if (!withWordmark) return <span className={className}>{icon}</span>

  return (
    <span className={`logo-lockup ${className ?? ''}`.trim()} role="img" aria-label="protu.lv">
      {icon}
      <span className="logo-word" aria-hidden="true">
        protu<span className="logo-tld">.lv</span>
      </span>
    </span>
  )
}

export default Logo

import type { CSSProperties } from 'react'

type Props = {
  /** 0–1: kur atrodas izvēlētā poga vadības panelī. */
  shift: number
}

/**
 * Gaismas slānis. Fiksēts pret skatlogu, tāpēc tam nav malu —
 * stari izgaist paši, nevis tiek nogriezti.
 */
function Atmosphere({ shift }: Props) {
  return (
    <div
      className="atmosphere"
      aria-hidden="true"
      style={{ '--beam-shift': `${shift}` } as CSSProperties}
    >
      <span className="beam beam-a" />
      <span className="beam beam-b" />
    </div>
  )
}

export default Atmosphere

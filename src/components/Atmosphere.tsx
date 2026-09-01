import type { CSSProperties } from 'react'
import heroBg from '../assets/hero-bg.jpg'

type Props = {
  /** 0–1: kur atrodas izvēlētā poga vadības panelī. */
  shift: number
}

/**
 * Gaismas slānis. Ligzdots .exhibit iekšienē, tāpēc aizņem tieši
 * varoņa sadaļas augstumu — nekad neizplūst zemāk. Platumā izlaužas
 * līdz pilnam skatloga malai, neskatoties uz .page polsterējumu.
 */
function Atmosphere({ shift }: Props) {
  return (
    <div
      className="atmosphere"
      aria-hidden="true"
      style={{ '--beam-shift': `${shift}` } as CSSProperties}
    >
      <div
        className="atmosphere-photo"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
    </div>
  )
}

export default Atmosphere

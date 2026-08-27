import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Skill } from '../types'

type Props = {
  skills: Skill[]
  email: string
}

const CYCLE_MS = 2600

function ExhibitHero({ skills, email }: Props) {
  const [active, setActive] = useState(0)
  const [handedOver, setHandedOver] = useState(false)

  // Piesaistes cikls: rullē pats, līdz apmeklētājs pieskaras.
  // Tad vadība paliek viņam.
  useEffect(() => {
    if (handedOver) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % skills.length)
    }, CYCLE_MS)

    return () => window.clearInterval(id)
  }, [handedOver, skills.length])

  function choose(i: number) {
    setActive(i)
    setHandedOver(true)
  }

  const current = skills[active]

  return (
    <header
      className="exhibit"
      style={
        {
          '--beam-shift': `${active / (skills.length - 1)}`,
        } as CSSProperties
      }
    >
      <div className="beams" aria-hidden="true">
        <span className="beam beam-a" />
        <span className="beam beam-b" />
      </div>

      <div className="exhibit-inner">
        <h1 className="statement">
          <span className="statement-verb">Protu</span>
          <span className="statement-object" key={current.id}>
            {current.label}
          </span>
        </h1>

        <div className="panel">
          <p className="panel-hint" id="panel-hint">
            Nospied, lai pabeigtu teikumu
          </p>

          <div
            className="panel-keys"
            role="group"
            aria-labelledby="panel-hint"
          >
            {skills.map((skill, i) => (
              <button
                key={skill.id}
                type="button"
                className="key"
                aria-pressed={i === active}
                onClick={() => choose(i)}
              >
                {skill.label}
              </button>
            ))}
          </div>

          <p className="panel-readout">{current.note}</p>
        </div>

        <p className="lead">
          Veidoju interaktīvas lietas — no zinātnes centra eksponātiem
          līdz mobilajām spēlēm un mājaslapām.
        </p>
        <p className="lead lead-en">
          I build interactive things — science centre exhibits, mobile
          games, websites.
        </p>

        <a className="mailto" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </header>
  )
}

export default ExhibitHero

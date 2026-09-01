import Atmosphere from './Atmosphere'
import { ui } from '../data/ui'
import type { Lang, Skill } from '../types'

type Props = {
  skills: Skill[]
  active: number
  onChoose: (index: number) => void
  lang: Lang
  shift: number
}

function ExhibitHero({ skills, active, onChoose, lang, shift }: Props) {
  const current = skills[active]
  const t = ui[lang]

  return (
    <header className="exhibit">
      <Atmosphere shift={shift} />
      <div className="exhibit-inner">
        <p className="eyebrow">{t.eyebrow}</p>
        <h1 className="statement">
          <span className="statement-verb">Protu</span>
          <span className="statement-object" key={current.id}>{current.label}</span>
        </h1>

        {t.gloss && <p className="gloss">{t.gloss}</p>}

        <div className="panel">
          {/* Norāde dzīvo aria-label, nevis uz ekrāna: pogas jau
              izskatās nospiežamas, bet ekrānlasītājam paskaidrojums
              joprojām ir vajadzīgs. */}
          <div className="panel-keys" role="group" aria-label={t.panelHint}>
            {skills.map((skill, i) => (
              <button
                key={skill.id}
                type="button"
                className="key"
                aria-pressed={i === active}
                onClick={() => onChoose(i)}
              >
                {skill.label}
              </button>
            ))}
          </div>

          <p className="panel-readout">{current.note[lang]}</p>
        </div>

        <p className="hero-lead">{t.heroLead}</p>

        <div className="hero-actions">
          <a className="action action-primary" href="#darbi">
            {t.workCta}
          </a>
          <a className="action action-secondary" href="#contact">
            {t.emailCta}
          </a>
        </div>

      </div>
    </header>
  )
}

export default ExhibitHero

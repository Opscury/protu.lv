import { builder, BUILDER_LOGIN, BUILDER_SIGNUP } from '../data/builder'
import type { Lang } from '../types'
import '../services.css'
import '../builder.css'

type Props = { lang: Lang }

/** protu.lv sākumlapas augša: bezmaksas portfolio veidotājs (Protu lapas, mans.protu.lv). */
function BuilderIntro({ lang }: Props) {
  const t = builder

  return (
    <article className="svc bld" id="portfolio" aria-labelledby="bld-title">
      <header className="svc-head">
        <p className="bld-eyebrow">{t.eyebrow[lang]}</p>
        <h1 className="svc-title" id="bld-title">{t.title[lang]}</h1>
        <p className="svc-lead">{t.lead[lang]}</p>
        <div className="bld-actions">
          <a className="action action-primary svc-cta" href={BUILDER_SIGNUP}>
            {t.cta[lang]}
          </a>
          <a className="bld-login" href={BUILDER_LOGIN}>
            {t.login[lang]}
          </a>
        </div>
        <p className="svc-cta-note">{t.note[lang]}</p>
      </header>

      <section className="svc-section" aria-labelledby="bld-steps">
        <h2 id="bld-steps">{t.stepsTitle[lang]}</h2>
        <ol className="bld-steps">
          {t.steps.map((s, i) => (
            <li key={s.title.en}>
              <span className="bld-step-no" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title[lang]}</h3>
              <p>{s.body[lang]}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="svc-section" aria-labelledby="bld-free">
        <h2 id="bld-free">{t.freeTitle[lang]}</h2>
        <ul className="svc-checks">
          {t.free.map((f) => (
            <li key={f.en}>{f[lang]}</li>
          ))}
        </ul>
      </section>

      <section className="svc-section" aria-labelledby="bld-calls">
        <h2 id="bld-calls">{t.callsTitle[lang]}</h2>
        <div>
          <p className="bld-calls-body">{t.callsBody[lang]}</p>
          <a className="bld-login" href="/konkursi/">{t.callsLink[lang]}</a>
        </div>
      </section>
    </article>
  )
}

export default BuilderIntro

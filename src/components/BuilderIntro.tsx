import { blogPage, postHref, publishedPosts } from '../data/blog'
import { builder, BUILDER_LOGIN, BUILDER_SIGNUP, type Shot } from '../data/builder'
import { SERVICES_PATH } from '../data/services'
import { onLinkClick } from '../router'
import type { Lang } from '../types'
import '../services.css'
import '../builder.css'

type Props = { lang: Lang }

/** Ekrānuzņēmums vai, kamēr tā nav, skaidri iezīmēts vietturis. */
function ShotFrame({ shot, lang, className }: { shot: Shot; lang: Lang; className?: string }) {
  if (shot.src) {
    return <img className={`bld-shot ${className ?? ''}`} src={shot.src} alt={shot.label[lang]} loading="lazy" />
  }
  return (
    <div className={`bld-shot bld-shot-empty ${className ?? ''}`} role="img" aria-label={shot.label[lang]}>
      <span>
        {builder.shotPlaceholder[lang]}
        <br />
        {shot.label[lang]}
      </span>
    </div>
  )
}

/** protu.lv sākumlapa: bezmaksas portfolio veidotājs (Protu lapas, mans.protu.lv). */
function BuilderIntro({ lang }: Props) {
  const t = builder

  return (
    <article className="svc bld" id="portfolio" aria-labelledby="bld-title">
      <header className="bld-hero">
        <div className="bld-hero-text">
          <p className="bld-eyebrow">{t.eyebrow[lang]}</p>
          <h1 className="svc-title" id="bld-title">{t.title[lang]}</h1>
          <p className="svc-lead">{t.lead[lang]}</p>
          <div className="bld-actions">
            <a className="action action-primary svc-cta" href={BUILDER_SIGNUP}>
              {t.cta[lang]}
            </a>
            <a className="bld-link" href={BUILDER_LOGIN}>
              {t.hasAccount[lang]}
            </a>
          </div>
          <p className="svc-cta-note">{t.note[lang]}</p>
        </div>

        {/* Paraksts: viens saturs → lapa + PDF. */}
        <figure className="bld-stage">
          <div className="bld-browser">
            <div className="bld-browser-bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <em>{lang === 'lv' ? 'vārds.protu.lv' : 'name.protu.lv'}</em>
            </div>
            <ShotFrame shot={t.heroSite} lang={lang} className="bld-shot-site" />
          </div>
          <div className="bld-pdf">
            <ShotFrame shot={t.heroPdf} lang={lang} className="bld-shot-pdf" />
            <span className="bld-pdf-tag" aria-hidden="true">PDF</span>
          </div>
          <figcaption>{t.heroCaption[lang]}</figcaption>
        </figure>
      </header>

      <section className="svc-section" aria-labelledby="bld-steps">
        <h2 id="bld-steps">{t.stepsTitle[lang]}</h2>
        <ol className="bld-steps">
          {t.steps.map((s, i) => (
            <li key={s.title.en}>
              <span className="bld-step-no" aria-hidden="true">{i + 1}</span>
              <h3>{s.title[lang]}</h3>
              <p>{s.body[lang]}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bld-fields" aria-labelledby="bld-fields">
        <div className="bld-fields-head">
          <h2 id="bld-fields">{t.fieldsTitle[lang]}</h2>
          <p>{t.fieldsLead[lang]}</p>
        </div>
        <ul className="bld-field-grid">
          {t.fields.map((f) => (
            <li key={f.name.en} className="bld-field">
              <ShotFrame shot={f.shot} lang={lang} />
              <h3>{f.name[lang]}</h3>
              <p className="bld-caption">{f.caption[lang]}</p>
              <p className="bld-layout">
                {t.layoutLabel[lang]}: {f.layout[lang]}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="svc-section" aria-labelledby="bld-free">
        <h2 id="bld-free">{t.freeTitle[lang]}</h2>
        <ul className="svc-checks bld-free">
          {t.free.map((f) => (
            <li key={f.en}>{f[lang]}</li>
          ))}
        </ul>
      </section>

      <section className="svc-section" aria-labelledby="bld-calls">
        <h2 id="bld-calls">{t.callsTitle[lang]}</h2>
        <div>
          <p className="bld-body">{t.callsBody[lang]}</p>
          <a className="bld-link" href="/konkursi/">
            {t.callsLink[lang]}
          </a>
        </div>
      </section>

      <section className="svc-section" aria-labelledby="bld-faq">
        <h2 id="bld-faq">{t.faqTitle[lang]}</h2>
        <div className="bld-faq">
          {t.faq.map((item) => (
            <details key={item.q.en}>
              <summary>{item.q[lang]}</summary>
              <p>{item.a[lang]}</p>
            </details>
          ))}
          {/* Padomi ir tikai latviski. */}
          {lang === 'lv' && publishedPosts.length > 0 && (
            <>
              <p className="bld-tips-label">{blogPage.title}</p>
              <ul className="bld-tips">
                {publishedPosts.slice(0, 3).map((post) => (
                  <li key={post.slug}>
                    <a className="bld-link" href={postHref(post.slug)} onClick={onLinkClick}>
                      {post.title}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <section className="bld-end" aria-labelledby="bld-end">
        <h2 id="bld-end">{t.endTitle[lang]}</h2>
        <a className="action action-primary svc-cta" href={BUILDER_SIGNUP}>
          {t.cta[lang]}
        </a>
        <p className="bld-custom">
          {t.customLine[lang]}{' '}
          <a className="bld-link" href={SERVICES_PATH} onClick={onLinkClick}>
            {t.customLink[lang]}
          </a>
        </p>
      </section>
    </article>
  )
}

export default BuilderIntro

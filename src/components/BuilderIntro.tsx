import { useEffect, useRef, useState } from 'react'
import { blogPage, postHref, publishedPosts } from '../data/blog'
import { builder, BUILDER_LOGIN, BUILDER_SIGNUP } from '../data/builder'
import { SERVICES_PATH } from '../data/services'
import { onLinkClick } from '../router'
import type { Lang } from '../types'
import '../services.css'
import '../builder.css'

type Props = { lang: Lang }

/** PDF lapa pirmajā skatā: pirmā lapa aiz vāka ar spēcīgu darbu. */
const HERO_PDF_PAGE: Record<string, number> = { marta: 2, kriss: 2, elina: 2, toms: 1 }
/** Pele ceļā uz pogu šķērso vārdus: tikai apstājoties uz vārda, tas mainās. */
const HOVER_INTENT_MS = 140

/** protu.lv sākumlapa: bezmaksas portfolio veidotājs (Protu lapas, mans.protu.lv). */
function BuilderIntro({ lang }: Props) {
  const t = builder
  const [picked, setPicked] = useState(t.samples[0].id)
  const sample = t.samples.find((s) => s.id === picked) ?? t.samples[0]
  const hoverTimer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(hoverTimer.current), [])

  return (
    <article className="svc bld" id="portfolio" aria-labelledby="bld-title">
      <header className="bld-hero">
        <div className="bld-verbs" role="group" aria-label={t.samplesLabel[lang]}>
          <span className="bld-protu">{t.protu[lang]}</span>
          {t.samples.map((s) => (
            <button
              key={s.id}
              type="button"
              className="bld-verb"
              aria-pressed={s.id === sample.id}
              onClick={() => setPicked(s.id)}
              onPointerEnter={(e) => {
                if (e.pointerType !== 'mouse') return
                window.clearTimeout(hoverTimer.current)
                hoverTimer.current = window.setTimeout(() => setPicked(s.id), HOVER_INTENT_MS)
              }}
              onPointerLeave={() => window.clearTimeout(hoverTimer.current)}
            >
              {s.verb[lang]}
            </button>
          ))}
          <p className="bld-verbs-hint">{t.samplesLabel[lang]}</p>
        </div>

        <div className="bld-offer">
          <h1 id="bld-title">{t.title[lang]}</h1>
          <p className="bld-lead">{t.lead[lang]}</p>
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

        {/* Paraksts: viens saturs → lapa + PDF. Attēli stāv kaudzē, lai maiņa nemirgo. */}
        <figure className="bld-stage">
          <div className="bld-stack">
            <div className="bld-browser">
              <div className="bld-browser-bar" aria-hidden="true">
                <span>{sample.address}</span>
              </div>
              <div className="bld-frames">
                {t.samples.map((s) => (
                  <img
                    key={s.id}
                    src={`/builder/${s.id}-site.webp`}
                    width={1920}
                    height={1200}
                    alt={s.id === sample.id ? s.siteAlt[lang] : ''}
                    data-active={s.id === sample.id || undefined}
                  />
                ))}
              </div>
            </div>
            <div className="bld-pdf">
              {t.samples.map((s) => (
                <img
                  key={s.id}
                  src={`/builder/${s.id}-pdf-${HERO_PDF_PAGE[s.id]}.webp`}
                  width={960}
                  height={679}
                  alt={s.id === sample.id ? s.pdfAlt[lang] : ''}
                  data-active={s.id === sample.id || undefined}
                />
              ))}
              <span className="bld-pdf-tag" aria-hidden="true">PDF</span>
            </div>
          </div>
          <figcaption>
            <p className="bld-caption">{sample.caption[lang]}</p>
            <p className="bld-sample-links">
              <a className="bld-link" href={`/piemeri/${sample.id}/`}>
                {t.sampleOpenSite[lang]}
              </a>
              <a className="bld-link" href={`/piemeri/${sample.id}.pdf`}>
                {t.sampleOpenPdf[lang]}
              </a>
            </p>
            <p className="bld-note">
              {sample.person} · {t.sampleLook[lang]}: {sample.look[lang]}. {t.sampleNote[lang]}
            </p>
          </figcaption>
        </figure>
      </header>

      <section className="bld-pdfs" aria-labelledby="bld-pdfs">
        <div className="bld-pdfs-head">
          <h2 id="bld-pdfs">{t.pdfTitle[lang]}</h2>
          <p>{t.pdfBody[lang]}</p>
          <div className="bld-pdf-facts">
            <p className="bld-pdf-meta">
              {sample.pdfFormat} · {sample.pdfPages} {t.pagesWord[lang]} · {sample.pdfSize[lang]}
            </p>
            <p className="bld-note">
              {sample.person}. {t.sampleNote[lang]}
            </p>
          </div>
        </div>
        <ol className="bld-pages" key={sample.id} tabIndex={0} aria-label={`${sample.person}, PDF`}>
          {Array.from({ length: sample.pdfPages }, (_, i) => (
            <li key={i}>
              <img src={`/builder/${sample.id}-pdf-${i}.webp`} width={960} height={679} alt="" />
            </li>
          ))}
        </ol>
      </section>

      <section className="bld-looks" aria-labelledby="bld-looks">
        <div className="bld-pdfs-head">
          <h2 id="bld-looks">{t.looksTitle[lang]}</h2>
          <p>{t.looksBody[lang]}</p>
        </div>
        <ul className="bld-look-grid">
          {t.samples.map((s) => (
            <li key={s.id}>
              <a href={`/piemeri/${s.id}/`}>
                <img src={`/builder/${s.id}-site.webp`} width={1920} height={1200} alt={s.siteAlt[lang]} loading="lazy" />
                <strong>{s.look[lang]}</strong>
                <span>{s.person}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="bld-note">{t.sampleNote[lang]}</p>
      </section>

      <section className="svc-section" aria-labelledby="bld-steps">
        <h2 id="bld-steps">{t.stepsTitle[lang]}</h2>
        <ol className="bld-steps">
          {t.steps.map((s) => (
            <li key={s.title.en}>
              <h3>{s.title[lang]}</h3>
              <p>{s.body[lang]}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="svc-section" aria-labelledby="bld-fields">
        <div>
          <h2 id="bld-fields">{t.fieldsTitle[lang]}</h2>
          <p className="bld-fields-lead">{t.fieldsLead[lang]}</p>
        </div>
        <ul className="bld-field-list">
          {t.fields.map((f) => (
            <li key={f.name.en}>
              <h3>{f.name[lang]}</h3>
              <p className="bld-caption">{f.caption[lang]}</p>
              <p className="bld-look">{f.look[lang]}</p>
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

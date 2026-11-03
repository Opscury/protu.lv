import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
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
/** Pavilkšana pa lenti: tik pikseļu, lai to neuztvertu kā pieskārienu. */
const SWIPE_PX = 40
/** Putekļi gaismas konusā: vieta (% no konusa), izmērs un cikla garums. Tikai rotājums. */
const MOTES = [
  [12, 62, 2, 19], [18, 34, 1.5, 23], [24, 78, 2, 17], [31, 52, 1, 27], [69, 46, 1.5, 21],
  [74, 70, 2, 18], [81, 38, 1, 25], [86, 64, 1.5, 22], [40, 88, 1, 29], [60, 84, 1.5, 24],
]

/** Stari konusā: leņķis (grādi), platums (% no konusa), šūpošanās cikls (s), aizture (s), spilgtums. */
const RAYS = [
  [-19, 5, 17, -3, 0.5], [-12, 7, 23, -11, 0.42], [-6, 4, 13, -7, 0.55], [-1, 8, 29, -2, 0.38],
  [5, 4.5, 19, -15, 0.5], [11, 6.5, 25, -6, 0.44], [18, 5, 21, -9, 0.5],
]

/**
 * Gaisma krīt no joslas vidus, tāpēc stars ar leņķi a trāpa elementam y pikseļu zemāk
 * pie x = centrs − tan(a)·y. CSS to rēķina pats; šeit tikai izmēra, kur kas atrodas.
 */
function placeLight(hero: HTMLElement) {
  const h = hero.getBoundingClientRect()
  const mid = h.left + h.width / 2
  hero.querySelectorAll<HTMLElement>('[data-ray]').forEach((el) => {
    const r = el.getBoundingClientRect()
    el.style.setProperty('--y', `${Math.round(r.top + r.height / 2 - h.top)}px`)
    el.style.setProperty('--cx', `${Math.round(mid - r.left)}px`)
  })
  // Vārds aiz "Protu" mainās, tāpēc tā atskaites punktu glabā virsrakstā.
  const verb = hero.querySelector<HTMLElement>('.lt-protu-verb')
  if (verb) hero.style.setProperty('--vx', `${Math.round(mid - verb.getBoundingClientRect().left)}px`)
  // Gaismā esošais rāmis vienmēr ir centrā; vajag tikai tā augšmalas dziļumu.
  const frame = hero.querySelector<HTMLElement>('.lt-slide[data-active] .lt-frame')
  if (frame) hero.style.setProperty('--fy', `${Math.round(frame.getBoundingClientRect().top - h.top)}px`)
}

/** Attālums no izvēlētā parauga lentē, apļveidā: -1 pa kreisi, 1 pa labi, 0 gaismā. */
function offsetOf(i: number, picked: number, n: number) {
  let o = (((i - picked) % n) + n) % n
  if (o > n / 2) o -= n
  return o
}

/** protu.lv sākumlapa: bezmaksas portfolio veidotājs (Protu lapas, mans.protu.lv). */
function BuilderIntro({ lang }: Props) {
  const t = builder
  const n = t.samples.length
  // Iepriekšējais paraugs: lai zinātu, kurš lentē pārlec no viena gala uz otru.
  const [{ pickedIndex, prevIndex }, setPick] = useState({ pickedIndex: 0, prevIndex: 0 })
  const sample = t.samples[pickedIndex]
  const verbRefs = useRef<(HTMLButtonElement | null)[]>([])
  const swipeX = useRef<number | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)

  // Gaismas ģeometrija: pēc izmēra maiņas un fontu ielādes; ārpus ekrāna stari apstājas.
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return
    const place = () => placeLight(hero)
    place()
    document.fonts?.ready.then(place)
    const ro = new ResizeObserver(place)
    ro.observe(hero)
    const io = new IntersectionObserver(([e]) => hero.toggleAttribute('data-off', !e.isIntersecting))
    io.observe(hero)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  // Cits vārds = cits virsraksta platums: pārmēra pēc katras izvēles.
  useEffect(() => {
    if (heroRef.current) placeLight(heroRef.current)
  }, [pickedIndex])
  // Paraugs, kas lentē pārlec no viena gala uz otru, nedrīkst slīdēt pāri gaismai.
  const offsets = t.samples.map((_, i) => offsetOf(i, pickedIndex, n))
  const jumps = offsets.map((o, i) => Math.abs(o - offsetOf(i, prevIndex, n)) > n / 2)

  const pick = (i: number, focus = false) => {
    const next = ((i % n) + n) % n
    setPick({ pickedIndex: next, prevIndex: pickedIndex })
    if (focus) verbRefs.current[next]?.focus()
  }

  return (
    <article className="svc bld" id="portfolio" aria-labelledby="bld-title">
      <header className="lt-hero" ref={heroRef}>
        <div className="lt-cone" aria-hidden="true">
          <div className="lt-rays">
            {RAYS.map(([a, w, d, dl, o], i) => (
              <i
                key={i}
                style={{ '--a': `${a}deg`, '--w': `${w}%`, '--d': `${d}s`, '--dl': `${dl}s`, '--o': o } as CSSProperties}
              />
            ))}
            <i className="lt-ray-lead" />
          </div>
          {MOTES.map(([x, y, size, dur], i) => (
            <span
              key={i}
              style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, animationDuration: `${dur}s`, animationDelay: `${-i * 2.3}s` }}
            />
          ))}
        </div>

        <p className="lt-protu" data-ray>
          {t.protu[lang]}{' '}
          <span className="lt-protu-verb" key={sample.id}>
            {sample.verb[lang]}
          </span>
        </p>
        <h1 id="bld-title" className="lt-title">
          {t.title[lang]}
        </h1>
        <a className="lt-cta" href={BUILDER_SIGNUP} data-ray>
          {t.cta[lang]}
        </a>

        {/* Lente: vārds un viņa lapa kustas kopā; izvēlētais pāris nonāk gaismā. */}
        <div
          className="lt-reel"
          role="group"
          aria-label={t.samplesLabel[lang]}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') pick(pickedIndex + 1, true)
            else if (e.key === 'ArrowLeft') pick(pickedIndex - 1, true)
            else return
            e.preventDefault()
          }}
          onPointerDown={(e) => {
            swipeX.current = e.clientX
          }}
          onPointerUp={(e) => {
            if (swipeX.current === null) return
            const dx = e.clientX - swipeX.current
            swipeX.current = null
            if (Math.abs(dx) > SWIPE_PX) pick(pickedIndex + (dx < 0 ? 1 : -1))
          }}
        >
          {t.samples.map((s, i) => {
            const active = i === pickedIndex
            const o = offsets[i]
            return (
              <div
                key={s.id}
                className="lt-slide"
                data-active={active || undefined}
                data-side={o < 0 ? 'left' : o > 0 ? 'right' : undefined}
                data-far={Math.abs(o) > 1 || undefined}
                data-jump={jumps[i] || undefined}
                style={{ '--o': o } as CSSProperties}
              >
                <p className="lt-addr" aria-hidden="true">
                  {s.address}
                </p>
                <div className="lt-frame" onClick={() => !active && pick(i)}>
                  <img
                    src={`/builder/${s.id}-site.webp`}
                    width={1920}
                    height={1200}
                    alt={active ? s.siteAlt[lang] : ''}
                    draggable={false}
                  />
                  <img
                    className="lt-pdf"
                    src={`/builder/${s.id}-pdf-${HERO_PDF_PAGE[s.id] ?? 1}.webp`}
                    width={960}
                    height={679}
                    alt={active ? s.pdfAlt[lang] : ''}
                    draggable={false}
                  />
                </div>
                <button
                  ref={(el) => {
                    verbRefs.current[i] = el
                  }}
                  type="button"
                  className="lt-verb"
                  aria-pressed={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => pick(i)}
                >
                  {s.verb[lang]}
                </button>
              </div>
            )
          })}
        </div>

        <div className="lt-sample">
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
        </div>
      </header>

      <div className="bld-intro">
        <p className="bld-lead">{t.lead[lang]}</p>
        <p className="bld-note">
          {t.note[lang]}{' '}
          <a className="bld-link" href={BUILDER_LOGIN}>
            {t.hasAccount[lang]}
          </a>
        </p>
      </div>

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

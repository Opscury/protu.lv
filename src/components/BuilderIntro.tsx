import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { currentOrientation, PORTRAIT_QUERY, RAYS_DEFAULTS } from '../lightRaysSettings'
import RaysTuner from './RaysTuner'
import { blogPage, postHref, publishedPosts } from '../data/blog'
import { builder, BUILDER_SIGNUP } from '../data/builder'
import { SERVICES_PATH } from '../data/services'
import { onLinkClick } from '../router'
import type { Lang } from '../types'
import '../services.css'
import '../builder.css'

type Props = { lang: Lang }

// Shader + ogl load in their own chunk, after the page.
const LightRays = lazy(() => import('./LightRays'))

/** PDF lapa pirmajā skatā: pirmā lapa aiz vāka ar spēcīgu darbu. */
const HERO_PDF_PAGE: Record<string, number> = { marta: 2, kriss: 2, elina: 2, toms: 1 }
/** Pavilkšana pa lenti: tik pikseļu, lai to neuztvertu kā pieskārienu. */
const SWIPE_PX = 40
/** Putekļi gaismas konusā: vieta (% no konusa), izmērs un cikla garums. Tikai rotājums. */
const MOTES = [
  [12, 62, 2, 19], [18, 34, 1.5, 23], [24, 78, 2, 17], [31, 52, 1, 27], [69, 46, 1.5, 21],
  [74, 70, 2, 18], [81, 38, 1, 25], [86, 64, 1.5, 22], [40, 88, 1, 29], [60, 84, 1.5, 24],
]

/** Attālums no izvēlētā parauga lentē, apļveidā: -1 pa kreisi, 1 pa labi, 0 gaismā. */
/** Placeholder for images that wait (invisible or below the fold): a 1×1 transparent GIF, no request. */
const BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

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
  const heroRef = useRef<HTMLElement>(null)
  const [rays, setRays] = useState(RAYS_DEFAULTS)
  const [orient, setOrient] = useState(currentOrientation)

  // Wide and tall screens each get their own light settings.
  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT_QUERY)
    const update = () => setOrient(currentOrientation())
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  // Images nobody can see yet (the far slide, the PDF cards of slides not in the light, the step
  // screenshots below the fold) wait until the page has loaded, so the first screenshot gets the bandwidth.
  const [warm, setWarm] = useState(false)
  const [howNear, setHowNear] = useState(false)
  const howRef = useRef<HTMLElement>(null)
  useEffect(() => {
    let idle = 0
    let timer = 0
    const go = () => {
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(() => setWarm(true), { timeout: 1500 })
      else timer = window.setTimeout(() => setWarm(true), 300)
    }
    if (document.readyState === 'complete') go()
    else window.addEventListener('load', go, { once: true })
    return () => {
      window.removeEventListener('load', go)
      if (idle) window.cancelIdleCallback(idle)
      window.clearTimeout(timer)
    }
  }, [])
  useEffect(() => {
    const el = howRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setHowNear(true)
        io.disconnect()
      },
      { rootMargin: '800px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const [raysOn, setRaysOn] = useState(false)
  const [raysLive, setRaysLive] = useState(false)

  // Light rays start once the page has loaded; reduced motion keeps the static cone.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Start after the page has loaded and the browser is idle, so the first view paints without it.
    const start = () => setRaysOn(true)
    let idle = 0
    let timer = 0
    const go = () => {
      if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(start, { timeout: 600 })
      else timer = window.setTimeout(start, 120)
    }
    if (document.readyState === 'complete') go()
    else window.addEventListener('load', go, { once: true })
    return () => {
      window.removeEventListener('load', go)
      if (idle) window.cancelIdleCallback(idle)
      window.clearTimeout(timer)
    }
  }, [])
  // Paraugs, kas lentē pārlec no viena gala uz otru, nedrīkst slīdēt pāri gaismai.
  const offsets = t.samples.map((_, i) => offsetOf(i, pickedIndex, n))
  const jumps = offsets.map((o, i) => Math.abs(o - offsetOf(i, prevIndex, n)) > n / 2)

  const pick = (i: number, focus = false) => {
    const next = ((i % n) + n) % n
    setPick({ pickedIndex: next, prevIndex: pickedIndex })
    setWarm(true)
    if (focus) verbRefs.current[next]?.focus()
  }

  return (
    <article className="svc bld" id="portfolio" aria-labelledby="bld-title">
      <header className="lt-hero" ref={heroRef} data-rays={raysLive || undefined}>
        {raysOn && (
          <Suspense fallback={null}>
            <LightRays
              settings={rays[orient]}
              target={heroRef}
              onReady={() => setRaysLive(true)}
              onFail={() => {
                // No WebGL after all: bring the static CSS cone back.
                document.documentElement.removeAttribute('data-rays')
                setRaysOn(false)
                setRaysLive(false)
              }}
            />
          </Suspense>
        )}
        <div className="lt-cone" aria-hidden="true">
          {MOTES.map(([x, y, size, dur], i) => (
            <span
              key={i}
              style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, animationDuration: `${dur}s`, animationDelay: `${-i * 2.3}s` }}
            />
          ))}
        </div>

        <p className="lt-protu">
          {t.protu[lang]}{' '}
          <span className="lt-protu-verb" key={sample.id}>
            {sample.verb[lang]}
          </span>
        </p>
        <h1 id="bld-title" className="lt-title">
          {t.title[lang]}
        </h1>
        <a className="lt-cta" href={BUILDER_SIGNUP}>
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
                    src={active || warm || Math.abs(o) <= 1 ? `/builder/${s.id}-site.webp` : BLANK}
                    srcSet={
                      active || warm || Math.abs(o) <= 1
                        ? `/builder/${s.id}-site-960.webp 960w, /builder/${s.id}-site.webp 1920w`
                        : undefined
                    }
                    sizes="(max-width: 48rem) 80vw, 40rem"
                    width={1920}
                    height={1200}
                    alt={active ? s.siteAlt[lang] : ''}
                    draggable={false}
                    fetchPriority={active ? 'high' : 'low'}
                  />
                  <img
                    className="lt-pdf"
                    src={active || warm ? `/builder/${s.id}-pdf-${HERO_PDF_PAGE[s.id] ?? 1}.webp` : BLANK}
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

      {/* Simplified 3 Nov 2026: below the hero only the steps (was: PDF strip, until 4 Nov), free plan, FAQ and the closing CTA.
          The intro, looks grid, steps, fields list and Konkursi block were cut as repeats of the hero;
          their texts are still in data/builder.ts if any come back. */}
      <section ref={howRef} className="bld-how" aria-labelledby="bld-how">
        <div className="bld-how-head">
          <h2 id="bld-how">{t.howTitle[lang]}</h2>
          <p>{t.howBody[lang]}</p>
        </div>
        <ol className="bld-how-strip" tabIndex={0} aria-label={t.howTitle[lang]}>
          {t.how.map((step, i) => (
            <li key={step.img} className="bld-how-step">
              <figure>
                <div className="bld-how-frame">
                  <img src={howNear ? `/builder/${step.img}.webp` : BLANK} width={1440} height={900} alt={step.alt[lang]} loading="lazy" decoding="async" />
                </div>
                <figcaption>
                  <span className="bld-how-num" aria-hidden="true">{i + 1}</span>
                  <strong>{step.title[lang]}</strong>
                  <span>
                    {step.body[lang]}
                    {step.meta && <code className="bld-how-meta">{step.meta}</code>}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
          <li className="bld-how-step bld-how-more">
            <figure>
              <div className="bld-how-frame">
                <img src={howNear ? `/builder/${t.howMore.img}.webp` : BLANK} width={1440} height={900} alt={t.howMore.alt[lang]} loading="lazy" decoding="async" />
              </div>
              <figcaption>
                <strong>{t.howMore.title[lang]}</strong>
                <span>{t.howMore.body[lang]}</span>
              </figcaption>
            </figure>
          </li>
        </ol>
        <p className="bld-note bld-how-note">{t.howNote[lang]}</p>
      </section>

      <section className="svc-section" aria-labelledby="bld-free">
        <h2 id="bld-free">{t.freeTitle[lang]}</h2>
        <ul className="svc-checks bld-free">
          {t.free.map((f) => (
            <li key={f.en}>{f[lang]}</li>
          ))}
        </ul>
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
          {t.callsTitle[lang]}{' '}
          <a className="bld-link" href="/konkursi/">
            {t.callsLink[lang]}
          </a>
        </p>
        <p className="bld-custom">
          {t.customLine[lang]}{' '}
          <a className="bld-link" href={SERVICES_PATH} onClick={onLinkClick}>
            {t.customLink[lang]}
          </a>
        </p>
      </section>
      {/* MODE, not DEV: NODE_ENV=production on Valdis's PC flips DEV off even in `npm run dev`. */}
      {import.meta.env.MODE === 'development' && <RaysTuner value={rays} orient={orient} onChange={setRays} />}
    </article>
  )
}

export default BuilderIntro

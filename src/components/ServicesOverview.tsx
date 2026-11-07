import { Fragment, lazy, Suspense, useEffect, useRef, useState } from 'react'
import BeforeAfter from './BeforeAfter'
import { FOLLOW_ON, serviceHref, services, servicesPage, type Price, type Service } from '../data/services'
import { metrics, shot, silva } from '../data/silva'
import { works } from '../data/works'
import { ui } from '../data/ui'
import { onLinkClick } from '../router'
import { LAMP_DEFAULTS, loadLampTuning } from '../serviceLampSettings'
import type { LampSettings } from '../serviceLampSettings'
import type { Lang } from '../types'
import '../services.css'
import '../silva-case.css'
import '../services-overview.css'

const ServiceLamp = lazy(() => import('./ServiceLamp'))
const LampTuner = import.meta.env.MODE === 'development' ? lazy(() => import('./LampTuner')) : null

const EMAIL = 'valdis@protu.lv'
const projects = services.filter((s) => s.slug !== FOLLOW_ON)
const followOn = services.find((s) => s.slug === FOLLOW_ON)
const rows: Service[] = followOn ? [...projects, followOn] : projects

/** "no €79 + €5/mēn": the words step back, the numbers carry the amber. */
function Price({ price, lang, id }: { price: Price; lang: Lang; id: string }) {
  return (
    <p className="svo-price" id={id}>
      {price.from && <span className="svo-price-word">{lang === 'lv' ? 'no ' : 'from '}</span>}
      {price.parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="svo-price-word"> + </span>}
          <span className="svo-price-num">€{part.amount}</span>
          {part.monthly && <span className="svo-price-word">{lang === 'lv' ? '/mēn' : '/month'}</span>}
        </Fragment>
      ))}
    </p>
  )
}

type LampState = 'off' | 'on' | 'failed'

/** /pakalpojumi/: a studio price list under one lamp, the case study that proves it, and an email to end on. */
function ServicesOverview({ lang }: { lang: Lang }) {
  const t = servicesPage
  const u = ui[lang]
  const board = useRef<HTMLDivElement>(null)
  const litEl = useRef<HTMLElement | null>(null)
  const rowEls = useRef<(HTMLLIElement | null)[]>([])
  const [lit, setLit] = useState<number | null>(null)
  const [lamp, setLamp] = useState<LampState>('off')
  // Dev only: the tuner remembers its values between reloads. Production always uses the defaults.
  const [tuning, setTuning] = useState<LampSettings>(() => (LampTuner ? loadLampTuning() : LAMP_DEFAULTS))
  const [phone, setPhone] = useState(false)
  const [workNear, setWorkNear] = useState(false)
  const work = useRef<HTMLElement>(null)
  const pointerIn = useRef(false)

  const light = (i: number | null) => {
    litEl.current = i === null ? null : rowEls.current[i]
    setLit(i)
  }

  // The lamp (WebGL) loads once the page is idle, never for reduced motion. Until then, and when
  // it can't run, the lit row shows the static fallback pool from CSS.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let cancelled = false
    const go = () => !cancelled && setLamp('on')
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(go, { timeout: 1200 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(id)
      }
    }
    const id = window.setTimeout(go, 600)
    return () => {
      cancelled = true
      window.clearTimeout(id)
    }
  }, [])

  // Phones have no hover: the row nearest the middle of the screen is the one in the light.
  useEffect(() => {
    const mq = window.matchMedia('(hover: none)')
    if (!mq.matches) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const i = rowEls.current.indexOf(entry.target as HTMLLIElement)
          if (i >= 0) light(i)
        }
      },
      { rootMargin: '-42% 0px -42% 0px' },
    )
    rowEls.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  // Narrow screens compare the phone screenshots; wide ones the desktop pages.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 40rem)')
    const sync = () => setPhone(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // The case screenshots load only when the section comes close, so they never compete with the
  // first view for bandwidth, and only one set (phone or desktop) is ever fetched.
  useEffect(() => {
    const el = work.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setWorkNear(true)
        io.disconnect()
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const anda = works.find((w) => w.id === 'anda')
  const silvaWork = works.find((w) => w.id === 'silva')
  const device = phone ? 'mobile' : 'desktop'

  return (
    <article className="svo">
      <header className="svo-head">
        <h1 className="svo-title">{t.title[lang]}</h1>
        <p className="svo-lead">{t.lead[lang]}</p>
      </header>

      <div
        ref={board}
        className="svo-board"
        data-active={lit !== null || undefined}
        data-lamp={lamp === 'on' || undefined}
      >
        {lamp === 'on' && (
          <Suspense fallback={null}>
            <ServiceLamp
              settings={tuning}
              board={board}
              lit={litEl}
              onFail={() => setLamp('failed')}
            />
          </Suspense>
        )}
        <ul
          className="svo-list"
          onPointerEnter={() => (pointerIn.current = true)}
          onPointerLeave={(e) => {
            pointerIn.current = false
            if (e.pointerType === 'mouse' && !e.currentTarget.contains(document.activeElement)) light(null)
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node) && !pointerIn.current) light(null)
          }}
        >
          {rows.map((service, i) => {
            const id = `svo-${service.slug}`
            return (
              <li
                key={service.slug}
                ref={(el) => {
                  rowEls.current[i] = el
                }}
                className={service.slug === FOLLOW_ON ? 'svo-row svo-row-after' : 'svo-row'}
                data-lit={lit === i || undefined}
                onPointerEnter={(e) => e.pointerType === 'mouse' && light(i)}
                onFocus={() => light(i)}
              >
                <h2 className="svo-problem">
                  <a
                    href={serviceHref(service.slug)}
                    onClick={onLinkClick}
                    aria-describedby={`${id}-scope ${id}-price`}
                  >
                    {service.problem[lang]}
                  </a>
                </h2>
                <span className="svo-leader" aria-hidden="true" />
                <Price price={service.cardPrice} lang={lang} id={`${id}-price`} />
                <p className="svo-scope" id={`${id}-scope`}>
                  {service.scope[lang]}
                </p>
                <span className="svo-go" aria-hidden="true" />
              </li>
            )
          })}
        </ul>
      </div>

      <section ref={work} className="svo-work" id="darbi" aria-labelledby="svo-work-title">
        <div className="svo-sec-head">
          <h2 id="svo-work-title">{u.works}</h2>
          <p>{u.clientWorksLead}</p>
        </div>

        <div className="svo-case">
          <div className="svo-case-text">
            <h3>{silva.title}</h3>
            <p className="svo-case-meta">
              {silva.label[lang]} · {silva.place.split(' · ')[0]} · <time dateTime="2026">2026</time>
            </p>
            <p className="svo-case-summary">{silva.summary[lang]}</p>
            <table className="svo-metrics">
              <caption>{metrics.title[lang]}</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">{metrics.metric[lang]}</span>
                  </th>
                  <th scope="col">bistro.lv</th>
                  <th scope="col">silva.protu.lv</th>
                </tr>
              </thead>
              <tbody>
                {metrics.rows
                  .filter((r) => r.label.en !== 'Accessibility' && r.label.en !== 'All images')
                  .map((r) => (
                    <tr key={r.label.en}>
                      <th scope="row">{r.label[lang]}</th>
                      <td>{r.old}</td>
                      <td>{r.new}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <p className="svo-case-images">{metrics.imagesLine[lang]}</p>
            <p className="svo-case-note">{silva.status[lang]}</p>
            <ul className="svo-case-links">
              {silvaWork && (
                <li>
                  <a href={silvaWork.href} onClick={onLinkClick}>
                    {silvaWork.cta[lang]}
                    <span className="sr-only">, {silva.title}</span>
                  </a>
                </li>
              )}
              <li>
                <a className="svo-addr" href="https://silva.protu.lv" target="_blank" rel="noreferrer">
                  silva.protu.lv
                  <span className="sr-only"> ({u.opensNew})</span>
                </a>
              </li>
            </ul>
          </div>

          <figure className="svo-case-media" data-device={device}>
            <div className="svo-frame">
              {workNear ? (
                <BeforeAfter
                  key={device}
                  before={shot('old', 'home', device)}
                  after={shot('new', 'home', device)}
                  beforeLabel={silva.before[lang]}
                  afterLabel={silva.after[lang]}
                  beforeAlt={`bistro.lv · ${lang === 'lv' ? 'sākumlapa' : 'home page'}`}
                  afterAlt={`silva.protu.lv · ${lang === 'lv' ? 'sākumlapa' : 'home page'}`}
                  sliderLabel={silva.sliderLabel[lang]}
                  device={device}
                  rest={phone ? 50 : 34}
                />
              ) : (
                <div className={`compare compare-${device}`} aria-hidden="true" />
              )}
            </div>
            <figcaption>{silva.compareHint[lang]}</figcaption>
          </figure>
        </div>

        {anda && (
          <div className="svo-case svo-case-second">
            <div className="svo-case-text">
              <h3>{anda.title}</h3>
              <p className="svo-case-meta">{anda.label[lang]}</p>
              <p className="svo-case-summary">{anda.blurb[lang]}</p>
              <ul className="svo-case-links">
                <li>
                  <a href={anda.href} onClick={onLinkClick}>
                    {anda.cta[lang]}
                    <span className="sr-only">, {anda.title}</span>
                  </a>
                </li>
                <li>
                  <a className="svo-addr" href="https://anda.protu.lv" target="_blank" rel="noreferrer">
                    anda.protu.lv
                    <span className="sr-only"> ({u.opensNew})</span>
                  </a>
                </li>
              </ul>
            </div>
            <a className="svo-case-media svo-frame" href={anda.href} onClick={onLinkClick} tabIndex={-1} aria-hidden="true">
              {workNear ? (
                <img src={anda.image} alt="" width={1440} height={900} loading="lazy" decoding="async" />
              ) : (
                <span className="svo-img-wait" />
              )}
            </a>
          </div>
        )}
      </section>

      <section className="svo-ways" aria-labelledby="svo-ways-title">
        <div className="svo-sec-head">
          <h2 id="svo-ways-title">{t.principlesTitle[lang]}</h2>
        </div>
        <ul>
          {t.principles.map((p) => (
            <li key={p.title.en}>
              <h3>{p.title[lang]}</h3>
              <p>{p.body[lang]}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="svo-close" id="contact" aria-labelledby="svo-close-title">
        <h2 id="svo-close-title">{u.contactTitle}</h2>
        <p>{u.contactLead}</p>
        <a className="svo-email" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </section>

      {LampTuner && lamp === 'on' && (
        <Suspense fallback={null}>
          <LampTuner value={tuning} onChange={setTuning} />
        </Suspense>
      )}
    </article>
  )
}

export default ServicesOverview

import { useEffect, useState } from 'react'
import BeforeAfter from './BeforeAfter'
import {
  anda,
  changes,
  comparePages,
  links,
  metrics,
  pages,
  processTitle,
  shot,
  steps,
  tags,
} from '../data/anda'
import type { Lang } from '../types'
import '../silva-case.css'

type Props = { lang: Lang }
type Device = 'desktop' | 'mobile'

/** Andas portfolio: tā pati gadījuma izpētes forma kā Silvai. */
function AndaCase({ lang }: Props) {
  const [page, setPage] = useState(comparePages[0].id)
  const [device, setDevice] = useState<Device>(() =>
    window.matchMedia('(max-width: 40rem)').matches ? 'mobile' : 'desktop',
  )
  const pageName = comparePages.find((p) => p.id === page)?.label[lang] ?? ''

  // Pārējo cilņu ekrānuzņēmumus ielādē fonā, lai pārslēdzot rāmis nav tukšs.
  useEffect(() => {
    const warm = () => {
      for (const p of comparePages)
        for (const d of ['desktop', 'mobile'])
          for (const s of ['old', 'new'] as const) new Image().src = shot(s, p.id, d)
    }
    const idle = window.requestIdleCallback
    if (idle) {
      const id = idle(warm, { timeout: 4000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(warm, 2500)
    return () => window.clearTimeout(id)
  }, [])

  return (
    <article className="case-study silva-case">
      <header className="silva-head">
        <div>
          <p className="case-label">{anda.label[lang]}</p>
          <h1 className="plaque-title silva-title">{anda.title}</h1>
          <dl className="plaque-spec">
            <dt className="sr-only">{lang === 'lv' ? 'Loma' : 'Role'}</dt>
            <dd>{anda.role[lang]}</dd>
            <dt className="sr-only">{lang === 'lv' ? 'Vieta un gads' : 'Place and year'}</dt>
            <dd>{anda.place}</dd>
          </dl>
          <p className="case-summary">{anda.summary[lang]}</p>
        </div>
        <p className="silva-status">{anda.status[lang]}</p>
      </header>

      <div className="silva-compare">
        <div className="silva-controls">
          <div className="silva-switch" role="group" aria-label={anda.pageLabel[lang]}>
            {comparePages.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={page === p.id}
                onClick={() => setPage(p.id)}
              >
                {p.label[lang]}
              </button>
            ))}
          </div>
          <div className="silva-switch" role="group" aria-label={anda.deviceLabel[lang]}>
            {(['desktop', 'mobile'] as const).map((d) => (
              <button
                key={d}
                type="button"
                aria-pressed={device === d}
                onClick={() => setDevice(d)}
              >
                {anda[d][lang]}
              </button>
            ))}
          </div>
        </div>

        <BeforeAfter
          key={`${page}-${device}`}
          device={device}
          before={shot('old', page, device)}
          after={shot('new', page, device)}
          beforeLabel={anda.before[lang]}
          afterLabel={anda.after[lang]}
          beforeAlt={`Canva — ${pageName}`}
          afterAlt={`anda.protu.lv — ${pageName}`}
          sliderLabel={anda.sliderLabel[lang]}
        />
        <p className="silva-hint">{anda.compareHint[lang]}</p>
      </div>

      <section className="silva-admin" aria-labelledby="anda-pages-title">
        <figure className="silva-admin-media">
          <img
            className="silva-admin-video"
            src="/work/anda/new-project-page.webp"
            alt={pages.alt[lang]}
            loading="lazy"
            decoding="async"
          />
          <figcaption>{pages.caption[lang]}</figcaption>
        </figure>
        <div className="silva-admin-text">
          <h4 id="anda-pages-title">{pages.title[lang]}</h4>
          <p>{pages.body[lang]}</p>
        </div>
      </section>

      <div className="silva-body">
        <ol className="silva-changes">
          {changes.map((c) => (
            <li key={c.title.en}>
              <h4>{c.title[lang]}</h4>
              <p>{c.body[lang]}</p>
            </li>
          ))}
        </ol>

        <aside className="silva-metrics">
          <h4>{metrics.title[lang]}</h4>
          <table>
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">{metrics.metric[lang]}</span></th>
                <th scope="col">{metrics.old}</th>
                <th scope="col">{metrics.rebuild[lang]}</th>
              </tr>
            </thead>
            <tbody>
              {metrics.rows.map((r) => (
                <tr key={r.label.en}>
                  <th scope="row">{r.label[lang]}</th>
                  <td>{r.old}</td>
                  <td className="silva-better">{r.new}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>{metrics.note[lang]}</p>
        </aside>
      </div>

      <div className="silva-steps">
        <h4>{processTitle[lang]}</h4>
        <ol>
          {steps.map((s) => (
            <li key={s.label.en} data-upcoming={s.upcoming || undefined}>
              <strong>{s.label[lang]}</strong>
              <span>{s.note[lang]}</span>
            </li>
          ))}
        </ol>
      </div>

      <footer className="silva-foot">
        <ul className="tags">
          {tags.map((tag) => <li key={tag.en} className="tag">{tag[lang]}</li>)}
        </ul>
        <ul className="plaque-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">{link.label[lang]}</a>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  )
}

export default AndaCase

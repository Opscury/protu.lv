import { useEffect, useLayoutEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import LanguageToggle from './components/LanguageToggle'
import ProjectCard from './components/ProjectCard'
import ProtuCanvas from './components/ProtuCanvas'
import SilvaCase from './components/SilvaCase'
import AndaCase from './components/AndaCase'
import WorkRow from './components/WorkRow'
import { certificates, projects } from './data/portfolio'
import { ui } from './data/ui'
import { caseIds, works } from './data/works'
import { inBrowser, onLinkClick, restoreScroll, usePath } from './router'
import type { Lang } from './types'
import './App.css'

const EMAIL = 'valdis@protu.lv'
const STORAGE_KEY = 'protu-lang'

/** Atceras iepriekšējo izvēli; pirmajā reizē skatās pārlūka valodu. */
function initialLang(): Lang {
  // Iepriekšrenderētās lapas ir latviski; angliski tās pārzīmē pārlūkā.
  if (!inBrowser) return 'lv'
  const requested = new URLSearchParams(window.location.search).get('lang')
  if (requested === 'lv' || requested === 'en') return requested
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'lv' || saved === 'en') return saved
  } catch {
    // Privātais režīms vai bloķēta krātuve — paliek pie pārlūka valodas.
  }
  return navigator.language.toLowerCase().startsWith('lv') ? 'lv' : 'en'
}

/** /darbi/silva → 'silva'; nezināms ceļš → null (rāda sākumlapu). */
function caseFromPath(path: string): string | null {
  const id = path.match(/^\/darbi\/([\w-]+)\/?$/)?.[1]
  return id && caseIds.includes(id) ? id : null
}

function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  // Ierakstītā prasme pirmajā skatā — darbu sarakstā iekrāso tās pierādījumu.
  const [skillId, setSkillId] = useState<string | null>(null)
  const path = usePath()
  const caseId = caseFromPath(path)
  const caseWork = works.find((w) => w.id === caseId)

  const t = ui[lang]

  // Sinhronizē valodu ar dokumentu: ekrānlasītāji un meklētāji
  // lasa lang atribūtu, lai zinātu, kā izrunāt un indeksēt tekstu.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Nav kur saglabāt — nekas slikts, nākamreiz atkal noteiks no pārlūka.
    }
    document.documentElement.lang = lang
    const url = new URL(window.location.href)
    if (lang === 'en') url.searchParams.set('lang', 'en')
    else url.searchParams.delete('lang')
    window.history.replaceState(window.history.state, '', url)
    document.title = caseWork
      ? `${caseWork.title} · ${ui[lang].caseStudy} · Valdis Viška`
      : ui[lang].documentTitle
    const description = caseWork ? caseWork.blurb[lang] : ui[lang].documentDescription
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute('content', lang === 'lv' ? 'lv_LV' : 'en_US')
  }, [lang, caseWork])

  // Lapas maiņa: atpakaļ uz to pašu vietu, uz #enkuru vai uz augšu.
  useLayoutEffect(restoreScroll, [path])

  // Sākumlapā enkuri strādā tieši; gadījuma lapā tie ved atpakaļ uz sākumu.
  const homeLink = (hash: string) =>
    caseId ? { href: `/${hash}`, onClick: onLinkClick } : { href: hash }

  const nextId = caseId ? caseIds[(caseIds.indexOf(caseId) + 1) % caseIds.length] : null
  const nextWork = works.find((w) => w.id === nextId)
  const vizium = projects.find((p) => p.id === 'vizium')

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <div className="bar">
        <a className="bar-mark" {...(caseId ? { href: '/', onClick: onLinkClick } : { href: '#top' })}>
          protu.lv
        </a>
        <div className="bar-center">
          <nav className="bar-nav" aria-label={t.navLabel}>
            <a {...homeLink('#darbi')}>{t.works}</a>
            <a {...homeLink('#sertifikati')}>{t.certificates}</a>
            <a href="#contact">{t.navContact}</a>
          </nav>
          <LanguageToggle lang={lang} label={t.langLabel} onChange={setLang} />
        </div>
        <div className="bar-end">
          <a className="bar-status" href="#contact">
            <span className="bar-status-dot" aria-hidden="true" />
            {t.statusMail}
          </a>
        </div>
      </div>

      <div id="top">
        {caseId ? (
          <main className="case-page" id="main">
            <a className="case-back" href="/#darbi" onClick={onLinkClick}>
              {t.backToWork}
            </a>
            {caseId === 'silva' && <SilvaCase lang={lang} />}
            {caseId === 'anda' && <AndaCase lang={lang} />}
            {caseId === 'vizium' && vizium && <ProjectCard project={vizium} lang={lang} />}
            {nextWork && nextWork.id !== caseId && (
              <a className="case-next" href={nextWork.href} onClick={onLinkClick}>
                {nextWork.title}
                <span>{t.nextWork}</span>
              </a>
            )}
          </main>
        ) : (
          <>
            <ProtuCanvas lang={lang} onSkill={setSkillId} />

            <main id="main">
              <section className="section" id="darbi" aria-labelledby="darbi-title">
                <div className="section-head">
                  <h2 id="darbi-title">{t.works}</h2>
                  <p>{t.worksLead}</p>
                </div>
                <ol className="work-list">
                  {works.map((work) => (
                    <WorkRow key={work.id} work={work} lang={lang} active={skillId} />
                  ))}
                </ol>
              </section>

              <section className="section" id="sertifikati" aria-labelledby="cert-title">
                <div className="section-head">
                  <h2 id="cert-title">{t.certificates}</h2>
                  <p>{t.certificatesLead}</p>
                </div>
                <ul className="cert-list">
                  {certificates.map((c) => (
                    <li key={c.id} className="cert">
                      <div className="cert-main">
                        <h3>{c.title}</h3>
                        <p>{c.summary[lang]}</p>
                      </div>
                      <p className="cert-meta">
                        {c.issuer}
                        <span>{c.issued}</span>
                      </p>
                      {c.credentialUrl && (
                        <a className="cert-verify" href={c.credentialUrl} target="_blank" rel="noreferrer">
                          {t.verify}
                          <span className="sr-only">, {c.title} ({t.opensNew})</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            </main>
          </>
        )}

        <ContactForm lang={lang} />

        <footer className="foot">
          <p>
            <strong>Valdis Viška</strong>
            <span>{t.availability}</span>
          </p>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </footer>
      </div>
    </>
  )
}

export default App

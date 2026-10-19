import { useEffect, useLayoutEffect, useState } from 'react'
import CertificateCard from './components/CertificateCard'
import ContactForm from './components/ContactForm'
import ExhibitHero from './components/ExhibitHero'
import Gallery from './components/Gallery'
import LanguageToggle from './components/LanguageToggle'
import Logo from './components/Logo'
import ProjectCard from './components/ProjectCard'
import SilvaCase from './components/SilvaCase'
import AndaCase from './components/AndaCase'
import WorkCard from './components/WorkCard'
import { certificates, projects, skills } from './data/portfolio'
import { ui } from './data/ui'
import { caseIds, works } from './data/works'
import { onLinkClick, restoreScroll, usePath } from './router'
import type { Lang } from './types'
import './App.css'

const EMAIL = 'valdis@protu.lv'
const CYCLE_MS = 2600
const STORAGE_KEY = 'protu-lang'

/** Atceras iepriekšējo izvēli; pirmajā reizē skatās pārlūka valodu. */
function initialLang(): Lang {
  const requested = new URLSearchParams(window.location.search).get('lang')
  if (requested === 'lv' || requested === 'en') return requested
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'lv' || saved === 'en') return saved
  return navigator.language.toLowerCase().startsWith('lv') ? 'lv' : 'en'
}

/** /darbi/silva → 'silva'; nezināms ceļš → null (rāda sākumlapu). */
function caseFromPath(path: string): string | null {
  const id = path.match(/^\/darbi\/([\w-]+)\/?$/)?.[1]
  return id && caseIds.includes(id) ? id : null
}

function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const [active, setActive] = useState(0)
  const [handedOver, setHandedOver] = useState(false)
  const path = usePath()
  const caseId = caseFromPath(path)
  const caseWork = works.find((w) => w.id === caseId)

  const t = ui[lang]

  // Sinhronizē valodu ar dokumentu: ekrānlasītāji un meklētāji
  // lasa lang atribūtu, lai zinātu, kā izrunāt un indeksēt tekstu.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    const url = new URL(window.location.href)
    if (lang === 'en') url.searchParams.set('lang', 'en')
    else url.searchParams.delete('lang')
    window.history.replaceState(window.history.state, '', url)
    document.title = caseWork
      ? `${caseWork.title} — ${ui[lang].caseStudy} · Valdis Viška`
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

  // Piesaistes cikls: rullē pats, līdz apmeklētājs pieskaras.
  // Tad vadība paliek viņam.
  useEffect(() => {
    if (handedOver || caseId) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % skills.length)
    }, CYCLE_MS)

    return () => window.clearInterval(id)
  }, [handedOver, caseId])

  function choose(i: number) {
    setActive(i)
    setHandedOver(true)
  }

  const shift = active / (skills.length - 1)

  // Sākumlapā enkuri strādā tieši; gadījuma lapā tie ved atpakaļ uz sākumu.
  const homeLink = (hash: string) =>
    caseId ? { href: `/${hash}`, onClick: onLinkClick } : { href: hash }

  const nextId = caseId ? caseIds[(caseIds.indexOf(caseId) + 1) % caseIds.length] : null
  const nextWork = works.find((w) => w.id === nextId)
  const vizium = projects.find((p) => p.id === 'vizium')

  return (
    <>
      <div className="page" id="top">
        <div className="rail">
          <a className="rail-mark" {...(caseId ? { href: '/', onClick: onLinkClick } : { href: '#top' })}>
            <Logo size={18} />
            protu.lv
          </a>
          <nav className="rail-nav" aria-label={t.navLabel}>
            <a {...homeLink('#darbi')}>{t.works}</a>
            <a {...homeLink('#sertifikati')}>{t.certificates}</a>
            <a href="#contact">{t.navContact}</a>
          </nav>
          <div className="rail-end">
            <span className="rail-meta">Valdis Viška · Latvija</span>
            <LanguageToggle
              lang={lang}
              label={t.langLabel}
              onChange={setLang}
            />
          </div>
        </div>

        {caseId ? (
          <main className="case-page gallery gallery-a" data-visible="true">
            <a className="case-back" href="/#darbi" onClick={onLinkClick}>
              {t.backToWork}
            </a>
            {caseId === 'silva' && <SilvaCase lang={lang} />}
            {caseId === 'anda' && <AndaCase lang={lang} />}
            {caseId === 'vizium' && vizium && <ProjectCard project={vizium} lang={lang} />}
            {nextWork && nextWork.id !== caseId && (
              <a className="case-next" href={nextWork.href} onClick={onLinkClick}>
                <span>{t.nextWork}</span>
                {nextWork.title}
              </a>
            )}
          </main>
        ) : (
          <>
            <ExhibitHero
              skills={skills}
              active={active}
              onChoose={choose}
              lang={lang}
              shift={shift}
            />

            <main className="galleries">
              <Gallery id="darbi" title={t.works} tone="a" backdrop="projection">
                {works.map((work) => (
                  <WorkCard key={work.id} work={work} lang={lang} />
                ))}
              </Gallery>

              <Gallery
                id="sertifikati"
                title={t.certificates}
                tone="b"
                backdrop="wireframe"
              >
                {certificates.map((certificate) => (
                  <CertificateCard
                    key={certificate.id}
                    certificate={certificate}
                    lang={lang}
                    verifyLabel={t.verify}
                  />
                ))}
              </Gallery>
            </main>
          </>
        )}

        <ContactForm lang={lang} />

        <footer className="colophon">
          <span>
            <span className="colophon-name">Valdis Viška</span>
            <span className="colophon-availability">{t.availability}</span>
          </span>
          <a className="colophon-mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </footer>
      </div>
    </>
  )
}

export default App

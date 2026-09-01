import { useEffect, useState } from 'react'
import CertificateCard from './components/CertificateCard'
import ContactForm from './components/ContactForm'
import ExhibitHero from './components/ExhibitHero'
import Gallery from './components/Gallery'
import LanguageToggle from './components/LanguageToggle'
import Logo from './components/Logo'
import ProjectCard from './components/ProjectCard'
import { certificates, projects, skills } from './data/portfolio'
import { ui } from './data/ui'
import type { Lang } from './types'
import './App.css'

const EMAIL = 'viska.valdis@gmail.com'
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

function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const [active, setActive] = useState(0)
  const [handedOver, setHandedOver] = useState(false)

  const t = ui[lang]

  // Sinhronizē valodu ar dokumentu: ekrānlasītāji un meklētāji
  // lasa lang atribūtu, lai zinātu, kā izrunāt un indeksēt tekstu.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    const url = new URL(window.location.href)
    if (lang === 'en') url.searchParams.set('lang', 'en')
    else url.searchParams.delete('lang')
    window.history.replaceState({}, '', url)
    document.title = ui[lang].documentTitle
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', ui[lang].documentDescription)
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute('content', ui[lang].documentDescription)
    document
      .querySelector('meta[property="og:locale"]')
      ?.setAttribute('content', lang === 'lv' ? 'lv_LV' : 'en_US')
  }, [lang])

  // Piesaistes cikls: rullē pats, līdz apmeklētājs pieskaras.
  // Tad vadība paliek viņam.
  useEffect(() => {
    if (handedOver) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % skills.length)
    }, CYCLE_MS)

    return () => window.clearInterval(id)
  }, [handedOver])

  function choose(i: number) {
    setActive(i)
    setHandedOver(true)
  }

  const shift = active / (skills.length - 1)

  return (
    <>
      <div className="page">
        <div className="rail">
          <span className="rail-mark">
            <Logo size={18} />
            protu.lv
          </span>
          <div className="rail-end">
            <span className="rail-meta">Valdis Viška · Latvija</span>
            <LanguageToggle
              lang={lang}
              label={t.langLabel}
              onChange={setLang}
            />
          </div>
        </div>

        <ExhibitHero
          skills={skills}
          active={active}
          onChoose={choose}
          lang={lang}
          shift={shift}
        />

        <main className="galleries">
          <Gallery id="darbi" title={t.works} tone="a" backdrop="projection">
            <p className="gallery-note">{t.selectedWorkNote}</p>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} lang={lang} />
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

import { useEffect, useLayoutEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import LanguageToggle from './components/LanguageToggle'
import ProjectCard from './components/ProjectCard'
import ProtuCanvas from './components/ProtuCanvas'
import ServicePage from './components/ServicePage'
import ServicesOverview from './components/ServicesOverview'
import SilvaCase from './components/SilvaCase'
import AndaCase from './components/AndaCase'
import BlogIndex from './components/BlogIndex'
import BlogPost from './components/BlogPost'
import WorkRow from './components/WorkRow'
import { BLOG_PATH, blogRoute } from './data/blog'

/** Atvērtie konkursi: atsevišķa lietotne (protu-admin), tāpēc parasta saite bez onLinkClick. */
const KONKURSI_PATH = '/konkursi/'
import { certificates, projects } from './data/portfolio'
import { ui } from './data/ui'
import { caseFromPath, caseIds, works } from './data/works'
import { SERVICES_PATH, serviceRoute } from './data/services'
import { inBrowser, navigate, onLinkClick, restoreScroll, usePath } from './router'
import { isPersonal, PROTU_URL, VALDIS_URL } from './site'
import { applyMeta, pageMeta } from './seo'
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

function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  // Ierakstītā prasme pirmajā skatā — darbu sarakstā iekrāso tās pierādījumu.
  const [skillId, setSkillId] = useState<string | null>(null)
  const path = usePath()
  const caseId = caseFromPath(path)
  // Pakalpojumi un blogs dzīvo tikai protu.lv; valdis.protu.lv tos nerāda.
  const route = isPersonal ? null : serviceRoute(path)
  const service = route?.service ?? null
  const blog = isPersonal ? null : blogRoute(path)
  // Kuru plānu lasītājs piesaka; der tikai tajā lapā, kur to izvēlējās.
  const [picked, setPicked] = useState<{ path: string; plan: string } | null>(null)
  const plan = picked?.path === path ? service?.plans.find((p) => p.id === picked.plan) : undefined
  const request = service ? (plan ? (plan.requestName ?? plan.name) : service.name) : undefined
  const subPage = Boolean(caseId || route || blog)
  // Blogs ir tikai latviski: tur lapa vienmēr ir LV, bet izvēlētā valoda paliek atmiņā.
  const pageLang: Lang = blog ? 'lv' : lang

  const t = ui[pageLang]

  // Sinhronizē valodu ar dokumentu: ekrānlasītāji un meklētāji
  // lasa lang atribūtu, lai zinātu, kā izrunāt un indeksēt tekstu.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // Nav kur saglabāt — nekas slikts, nākamreiz atkal noteiks no pārlūka.
    }
    document.documentElement.lang = pageLang
    const url = new URL(window.location.href)
    if (pageLang === 'en') url.searchParams.set('lang', 'en')
    else url.searchParams.delete('lang')
    window.history.replaceState(window.history.state, '', url)
    applyMeta(pageMeta(path, pageLang), pageLang)
  }, [lang, pageLang, path])

  // Blogā angļu versijas nav: EN ved uz angļu sākumlapu, nevis uz tukšu lapu.
  const changeLang = (next: Lang) => {
    setLang(next)
    if (blog && next === 'en') navigate('/')
  }

  // Lapas maiņa: atpakaļ uz to pašu vietu, uz #enkuru vai uz augšu.
  useLayoutEffect(restoreScroll, [path])

  // Sākumlapā enkuri strādā tieši; gadījuma lapā tie ved atpakaļ uz sākumu.
  const homeLink = (hash: string) =>
    subPage ? { href: `/${hash}`, onClick: onLinkClick } : { href: hash }

  const nextId = caseId ? caseIds[(caseIds.indexOf(caseId) + 1) % caseIds.length] : null
  const nextWork = works.find((w) => w.id === nextId)
  const vizium = projects.find((p) => p.id === 'vizium')

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <div className="bar">
        <a className="bar-mark" {...(subPage ? { href: '/', onClick: onLinkClick } : { href: '#top' })}>
          {isPersonal ? 'valdis.protu.lv' : 'protu.lv'}
        </a>
        <div className="bar-center">
          {isPersonal ? (
            <nav className="bar-nav" aria-label={t.navLabel}>
              <a {...homeLink('#darbi')}>{t.works}</a>
              <a {...homeLink('#sertifikati')}>{t.certificates}</a>
              <a href="#contact">{t.navContact}</a>
              <a href={PROTU_URL}>protu.lv</a>
            </nav>
          ) : (
            <nav className="bar-nav" aria-label={t.navLabel}>
              <a
                href={SERVICES_PATH}
                onClick={onLinkClick}
                aria-current={route ? (service ? 'true' : 'page') : undefined}
              >
                {t.services}
              </a>
              <a {...homeLink('#darbi')}>{t.works}</a>
              {pageLang === 'lv' && (
                <a href={BLOG_PATH} onClick={onLinkClick} aria-current={blog ? (blog.post ? 'true' : 'page') : undefined}>
                  {t.blog}
                </a>
              )}
              {pageLang === 'lv' && <a href={KONKURSI_PATH}>{t.konkursi}</a>}
              <a href="#contact">{t.navContact}</a>
              <a href={VALDIS_URL}>{t.aboutMe}</a>
            </nav>
          )}
          <LanguageToggle lang={pageLang} label={t.langLabel} onChange={changeLang} />
        </div>
        <div className="bar-end">
          <a className="bar-status" href="#contact">
            <span className="bar-status-dot" aria-hidden="true" />
            {t.statusMail}
          </a>
        </div>
      </div>

      <div id="top">
        {blog ? (
          <main className="case-page" id="main">
            {blog.post ? <BlogPost key={blog.post.slug} post={blog.post} /> : <BlogIndex />}
          </main>
        ) : route ? (
          <main className="case-page" id="main">
            {service ? (
              <ServicePage
                key={service.slug}
                service={service}
                lang={lang}
                onRequest={(id) => setPicked({ path, plan: id })}
              />
            ) : (
              <ServicesOverview lang={lang} />
            )}
          </main>
        ) : caseId ? (
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
            {isPersonal && <ProtuCanvas lang={lang} onSkill={setSkillId} />}

            <main id="main" className={isPersonal ? undefined : 'case-page'}>
              {/* protu.lv sākumlapa: pakalpojumi pirmie, līdz to aizstās portfolio veidotāja lapa. */}
              {!isPersonal && <ServicesOverview lang={lang} />}

              <section className="section" id="darbi" aria-labelledby="darbi-title">
                <div className="section-head">
                  <h2 id="darbi-title">{t.works}</h2>
                  <p>{isPersonal ? t.worksLead : t.clientWorksLead}</p>
                </div>
                <ol className="work-list">
                  {works.map((work) => (
                    <WorkRow key={work.id} work={work} lang={lang} active={skillId} />
                  ))}
                </ol>
              </section>

              {/* Sertifikāti ir CV daļa: tikai valdis.protu.lv. */}
              {isPersonal && (
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
              )}
            </main>
          </>
        )}

        <ContactForm lang={pageLang} request={request} />

        <footer className="foot">
          <p>
            <strong>Valdis Viška</strong>
            <span>{t.availability}</span>
          </p>
          {isPersonal ? (
            <nav className="foot-nav" aria-label={t.footNav}>
              <a href={PROTU_URL}>protu.lv</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </nav>
          ) : (
            <nav className="foot-nav" aria-label={t.footNav}>
              <a href={SERVICES_PATH} onClick={onLinkClick}>{t.services}</a>
              {pageLang === 'lv' && <a href={BLOG_PATH} onClick={onLinkClick}>{t.blog}</a>}
              {pageLang === 'lv' && <a href={KONKURSI_PATH}>{t.konkursi}</a>}
              <a href={VALDIS_URL}>{t.aboutMe}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </nav>
          )}
        </footer>
      </div>
    </>
  )
}

export default App

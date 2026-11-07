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
import BuilderIntro from './components/BuilderIntro'
import {
  builder,
  BUILDER_LOGIN,
  BUILDER_PRIVACY,
  BUILDER_REPORT,
  BUILDER_SIGNUP,
  BUILDER_TERMS,
} from './data/builder'
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
import { hydration } from './hydration'
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
  // Hydrating the Latvian prerender: the first render must be Latvian too; the effect below switches.
  const [lang, setLang] = useState<Lang>(() => (hydration.active ? 'lv' : initialLang()))

  // After hydration: the visitor's own language. Only text nodes change, so images are not redrawn.
  useEffect(() => {
    if (!hydration.active) return
    hydration.active = false
    const wanted = initialLang()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- must run after hydration, not during it
    if (wanted !== 'lv') setLang(wanted)
  }, [])
  // Ierakstītā prasme pirmajā skatā — darbu sarakstā iekrāso tās pierādījumu.
  const [skillId, setSkillId] = useState<string | null>(null)
  const path = usePath()
  // protu.lv šaurā ekrānā: saites izvēlnē, joslā paliek zīme un galvenā darbība.
  const [menuFor, setMenuFor] = useState<string | null>(null)
  const menuOpen = menuFor === path
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
    // index.html hid the prerendered Latvian text for a visitor who sees English: show it once it is English.
    if (pageLang !== 'lv') document.documentElement.classList.remove('lang-swap')
    document.documentElement.classList.remove('spa-fallback')
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

  // protu.lv: klientu darbi dzīvo pie pakalpojumiem; valdis.protu.lv: sākumlapā.
  const worksHref = isPersonal ? '/#darbi' : `${SERVICES_PATH}#darbi`
  const worksSection = (
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
  )
  // protu.lv sākumlapa ir veidotāja vitrīna: kontaktforma tur, kur kāds nolīgst Valdi.
  // Pakalpojumu pārskats beidzas ar e-pastu (viens skaidrs ceļš); forma ir pakalpojumu un darbu lapās.
  const showContact = isPersonal || Boolean(service || caseId)

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <div className={isPersonal ? 'bar' : 'bar bar-product'} data-menu={menuOpen || undefined}>
        <a className="bar-mark" {...(subPage ? { href: '/', onClick: onLinkClick } : { href: '#top' })}>
          {isPersonal ? 'valdis.protu.lv' : 'protu.lv'}
        </a>
        {!isPersonal && (
          <button
            type="button"
            className="bar-menu"
            aria-expanded={menuOpen}
            aria-controls="bar-links"
            aria-label={t.menu}
            onClick={() => setMenuFor(menuOpen ? null : path)}
          >
            {/* Three lines that fold into an X when the menu is open. */}
            <span className="bar-burger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        )}
        <div
          className="bar-center"
          id="bar-links"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setMenuFor(null)
          }}
          // Tapping any link closes the phone menu, including #anchors on the same page.
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('a')) setMenuFor(null)
          }}
        >
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
                {...(subPage ? { href: '/', onClick: onLinkClick } : { href: '#top' })}
                aria-current={subPage ? undefined : 'page'}
              >
                {t.portfolio}
              </a>
              {pageLang === 'lv' && <a href={KONKURSI_PATH}>{t.konkursi}</a>}
              {/* Padomi (blogs) nav galvenajā izvēlnē: tie ir kājenē un sākumlapā zem jautājumiem. */}
              <a
                href={SERVICES_PATH}
                onClick={onLinkClick}
                aria-current={route || caseId ? (service || caseId ? 'true' : 'page') : undefined}
              >
                {t.services}
              </a>
            </nav>
          )}
          <LanguageToggle lang={pageLang} label={t.langLabel} onChange={changeLang} />
          {!isPersonal && (
            <a className="bar-menu-login" href={BUILDER_LOGIN}>
              {builder.login[pageLang]}
            </a>
          )}
        </div>
        <div className="bar-end">
          {isPersonal ? (
            <a className="bar-status" href="#contact">
              <span className="bar-status-dot" aria-hidden="true" />
              {t.statusMail}
            </a>
          ) : (
            <>
              {/* Galvenā darbība dzīvo gaismā lapas vidū, nevis joslā. */}
              <a className="bar-login" href={BUILDER_LOGIN}>
                {builder.login[pageLang]}
              </a>
            </>
          )}
        </div>
      </div>

      <div id="top" className={isPersonal ? undefined : 'site-protu'}>
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
            <a className="case-back" href={worksHref} onClick={onLinkClick}>
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
              {/* protu.lv sākumlapa ir tikai portfolio veidotājs; pakalpojumi un darbi ir /pakalpojumi/. */}
              {isPersonal ? worksSection : <BuilderIntro lang={lang} />}

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

        {showContact && <ContactForm lang={pageLang} request={request} />}

        {isPersonal ? (
          <footer className="foot">
            <p>
              <strong>Valdis Viška</strong>
              <span>{t.availability}</span>
            </p>
            <nav className="foot-nav" aria-label={t.footNav}>
              <a href={PROTU_URL}>protu.lv</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </nav>
          </footer>
        ) : (
          <footer className="foot">
            <p>
              <strong>protu.lv</strong>
              <span>{t.footRun}</span>
            </p>
            <nav className="foot-nav" aria-label={t.footNav}>
              <a href={BUILDER_SIGNUP}>{builder.cta[pageLang]}</a>
              {pageLang === 'lv' && <a href={KONKURSI_PATH}>{t.konkursi}</a>}
              {pageLang === 'lv' && <a href={BLOG_PATH} onClick={onLinkClick}>{t.blog}</a>}
              <a href={SERVICES_PATH} onClick={onLinkClick}>{t.services}</a>
              <a href={VALDIS_URL}>{t.aboutMe}</a>
            </nav>
            <nav className="foot-nav foot-legal" aria-label={t.footLegal}>
              <a href={BUILDER_TERMS}>{t.terms}</a>
              <a href={BUILDER_PRIVACY}>{t.privacy}</a>
              <a href={BUILDER_REPORT}>{t.report}</a>
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </nav>
          </footer>
        )}
      </div>
    </>
  )
}

export default App

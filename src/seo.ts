import {
  SERVICES_PATH,
  serviceHref,
  serviceRoute,
  services,
  servicesPage,
  type Price,
  type Service,
} from './data/services'
import { ui } from './data/ui'
import { caseFromPath, caseIds, works } from './data/works'
import type { Lang } from './types'

/** Virsraksts, apraksts, kanoniskā adrese un JSON-LD katrai lapai.
 *  To pašu lieto pārlūkā (applyMeta) un būvēšanā (renderHead, sitemap). */

export const SITE = 'https://protu.lv'
/** Tas pats @id kā Person blokam index.html. */
const PERSON_ID = `${SITE}/#valdis`

export type PageMeta = {
  title: string
  description: string
  /** Ceļš bez valodas, piemēram /pakalpojumi/majaslapa/. */
  path: string
  jsonLd: object[]
}

/** Angļu versija ir tā pati adrese ar ?lang=en, tāpat kā visā vietnē. */
export const pageUrl = (path: string, lang: Lang) => `${SITE}${path}${lang === 'en' ? '?lang=en' : ''}`

const areaServed = [
  { '@type': 'City', name: 'Jelgava' },
  { '@type': 'AdministrativeArea', name: 'Zemgale' },
  { '@type': 'Country', name: 'Latvia' },
]

const provider = { '@type': 'Person', '@id': PERSON_ID, name: 'Valdis Viška', url: `${SITE}/` }

/** "no €400" → minPrice; "€15/mēn" → price ar mēneša vienību. */
function priceSpecification(price: Price) {
  const specs = price.parts.map((part) => ({
    '@type': part.monthly ? 'UnitPriceSpecification' : 'PriceSpecification',
    priceCurrency: 'EUR',
    ...(price.from ? { minPrice: part.amount } : { price: part.amount }),
    ...(part.monthly ? { unitCode: 'MON', unitText: 'month' } : {}),
  }))
  return specs.length === 1 ? specs[0] : specs
}

function serviceJsonLd(service: Service, lang: Lang) {
  const url = pageUrl(serviceHref(service.slug), lang)
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${SITE}${serviceHref(service.slug)}#service`,
      name: service.name[lang],
      description: service.seoDescription[lang],
      serviceType: service.serviceType,
      url,
      provider,
      areaServed,
      offers: service.plans.map((plan) => ({
        '@type': 'Offer',
        name: plan.name[lang],
        description: plan.solves[lang],
        url: `${url}#cena`,
        priceCurrency: 'EUR',
        ...(plan.price.from ? {} : { price: plan.price.parts[0].amount }),
        priceSpecification: priceSpecification(plan.price),
        areaServed,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'protu.lv', item: pageUrl('/', lang) },
        {
          '@type': 'ListItem',
          position: 2,
          name: servicesPage.title[lang],
          item: pageUrl(SERVICES_PATH, lang),
        },
        { '@type': 'ListItem', position: 3, name: service.name[lang], item: url },
      ],
    },
  ]
}

function overviewJsonLd(lang: Lang) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: servicesPage.title[lang],
      url: pageUrl(SERVICES_PATH, lang),
      itemListElement: services.map((service, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: service.name[lang],
        url: pageUrl(serviceHref(service.slug), lang),
      })),
    },
  ]
}

export function pageMeta(path: string, lang: Lang): PageMeta {
  const route = serviceRoute(path)
  if (route?.service) {
    const s = route.service
    return {
      title: `${s.seoTitle[lang]} · protu.lv`,
      description: s.seoDescription[lang],
      path: serviceHref(s.slug),
      jsonLd: serviceJsonLd(s, lang),
    }
  }
  if (route) {
    return {
      title: `${servicesPage.seoTitle[lang]} · protu.lv`,
      description: servicesPage.seoDescription[lang],
      path: SERVICES_PATH,
      jsonLd: overviewJsonLd(lang),
    }
  }
  const work = works.find((w) => w.id === caseFromPath(path))
  if (work) {
    return {
      title: `${work.title} · ${ui[lang].caseStudy} · Valdis Viška`,
      description: work.blurb[lang],
      path: work.href,
      jsonLd: [],
    }
  }
  return { title: ui[lang].documentTitle, description: ui[lang].documentDescription, path: '/', jsonLd: [] }
}

const LD_ID = 'page-ld'

/** Pārlūkā: atjauno galvas tagus pēc lapas vai valodas maiņas. */
export function applyMeta(meta: PageMeta, lang: Lang) {
  const url = pageUrl(meta.path, lang)
  const set = (selector: string, attr: string, value: string) =>
    document.querySelector(selector)?.setAttribute(attr, value)

  document.title = meta.title
  set('meta[name="description"]', 'content', meta.description)
  set('meta[property="og:title"]', 'content', meta.title)
  set('meta[property="og:description"]', 'content', meta.description)
  set('meta[property="og:url"]', 'content', url)
  set('meta[property="og:locale"]', 'content', lang === 'lv' ? 'lv_LV' : 'en_US')
  set('meta[property="og:locale:alternate"]', 'content', lang === 'lv' ? 'en_US' : 'lv_LV')
  set('meta[name="twitter:title"]', 'content', meta.title)
  set('meta[name="twitter:description"]', 'content', meta.description)
  set('link[rel="canonical"]', 'href', url)
  set('link[hreflang="lv"]', 'href', pageUrl(meta.path, 'lv'))
  set('link[hreflang="en"]', 'href', pageUrl(meta.path, 'en'))
  set('link[hreflang="x-default"]', 'href', pageUrl(meta.path, 'lv'))

  let script = document.getElementById(LD_ID)
  if (!meta.jsonLd.length) {
    script?.remove()
    return
  }
  if (!script) {
    script = document.createElement('script')
    script.id = LD_ID
    script.setAttribute('type', 'application/ld+json')
    document.head.append(script)
  }
  script.textContent = JSON.stringify(meta.jsonLd)
}

const escapeAttr = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** Būvēšanā: ieraksta tos pašus tagus gatavā dist/index.html kopijā. */
export function renderHead(template: string, meta: PageMeta, lang: Lang) {
  const url = pageUrl(meta.path, lang)
  const content = (attr: string, key: string, value: string) => (html: string) =>
    html.replace(
      new RegExp(`(<meta\\s+${attr}="${key}"\\s+content=")[^"]*(")`),
      `$1${escapeAttr(value)}$2`,
    )
  const href = (match: string, value: string) => (html: string) =>
    html.replace(new RegExp(`(<link\\s+${match}\\s+href=")[^"]*(")`), `$1${escapeAttr(value)}$2`)

  const steps = [
    (html: string) => html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(meta.title)}</title>`),
    content('name', 'description', meta.description),
    content('property', 'og:title', meta.title),
    content('property', 'og:description', meta.description),
    content('property', 'og:url', url),
    content('name', 'twitter:title', meta.title),
    content('name', 'twitter:description', meta.description),
    href('rel="canonical"', url),
    href('rel="alternate" hreflang="lv"', pageUrl(meta.path, 'lv')),
    href('rel="alternate" hreflang="en"', pageUrl(meta.path, 'en')),
    href('rel="alternate" hreflang="x-default"', pageUrl(meta.path, 'lv')),
    (html: string) =>
      meta.jsonLd.length
        ? html.replace(
            '</head>',
            `  <script id="${LD_ID}" type="application/ld+json">${JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c')}</script>\n  </head>`,
          )
        : html,
  ]
  return steps.reduce((html, step) => step(html), template)
}

/** Lapas, ko būvēšanā pārvērš statiskā HTML. */
export const prerenderPaths = [SERVICES_PATH, ...services.map((s) => serviceHref(s.slug))]

/** sitemap.xml ar abām valodām katrai adresei. */
export function sitemapXml() {
  const paths = ['/', ...caseIds.map((id) => `/darbi/${id}`), ...prerenderPaths]
  const xml = (s: string) => s.replace(/&/g, '&amp;')
  const entries = paths.flatMap((path) =>
    (['lv', 'en'] as const).map(
      (lang) => `  <url>
    <loc>${xml(pageUrl(path, lang))}</loc>
    <xhtml:link rel="alternate" hreflang="lv" href="${xml(pageUrl(path, 'lv'))}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${xml(pageUrl(path, 'en'))}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${xml(pageUrl(path, 'lv'))}"/>
  </url>`,
    ),
  )
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`
}

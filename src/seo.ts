import {
  SERVICES_PATH,
  serviceHref,
  serviceRoute,
  services,
  servicesPage,
  type Price,
  type Service,
} from './data/services'
import { allPosts, BLOG_PATH, blogPage, blogRoute, postHref, publishedPosts, type Post } from './data/blog'
import { ui } from './data/ui'
import { caseFromPath, caseIds, works } from './data/works'
import type { Lang } from './types'

/** Virsraksts, apraksts, kanoniskā adrese un JSON-LD katrai lapai.
 *  To pašu lieto pārlūkā (applyMeta) un būvēšanā (renderHead, sitemap). */

import { CLIENT_CASES, isPersonal, PERSON_ID, PROTU_URL, SITE, VALDIS_URL } from './site'

export { SITE }

export type PageMeta = {
  /** Cita vietne kanoniskajai adresei (valdis.protu.lv klientu darbi → protu.lv). */
  base?: string
  title: string
  description: string
  /** Ceļš bez valodas, piemēram /pakalpojumi/majaslapa/. */
  path: string
  jsonLd: object[]
  /** Tikai latviski (blogs): bez hreflang un og:locale:alternate, html lang vienmēr lv. */
  lvOnly?: boolean
  /** Melnraksts: lapa ir, bet meklētāji to neindeksē. */
  noindex?: boolean
  /** og:type; raksts ir "article", pārējās lapas "website". */
  ogType?: 'article'
}

/** Angļu versija ir tā pati adrese ar ?lang=en, tāpat kā visā vietnē. */
export const pageUrl = (path: string, lang: Lang, base: string = SITE) =>
  `${base}${path}${lang === 'en' ? '?lang=en' : ''}`

const areaServed = [
  { '@type': 'City', name: 'Jelgava' },
  { '@type': 'AdministrativeArea', name: 'Zemgale' },
  { '@type': 'Country', name: 'Latvia' },
]

const provider = { '@type': 'Person', '@id': PERSON_ID, name: 'Valdis Viška', url: `${VALDIS_URL}/` }

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

/** Autors ir tā pati persona, kas index.html Person blokā. */
const author = provider

function postJsonLd(post: Post) {
  const url = pageUrl(postHref(post.slug), 'lv')
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#post`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      inLanguage: 'lv',
      url,
      mainEntityOfPage: url,
      author,
      publisher: author,
      image: `${SITE}/og-image.svg`,
      isPartOf: { '@type': 'Blog', '@id': `${SITE}${BLOG_PATH}#blog` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'protu.lv', item: pageUrl('/', 'lv') },
        { '@type': 'ListItem', position: 2, name: blogPage.title, item: pageUrl(BLOG_PATH, 'lv') },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ]
}

function blogJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE}${BLOG_PATH}#blog`,
      name: blogPage.seoTitle,
      description: blogPage.seoDescription,
      url: pageUrl(BLOG_PATH, 'lv'),
      inLanguage: 'lv',
      author,
      blogPost: publishedPosts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: pageUrl(postHref(post.slug), 'lv'),
        datePublished: post.date,
      })),
    },
  ]
}

export function pageMeta(path: string, lang: Lang): PageMeta {
  const blog = blogRoute(path)
  if (blog?.post) {
    const post = blog.post
    return {
      title: `${post.title} · protu.lv`,
      description: post.description,
      path: postHref(post.slug),
      jsonLd: postJsonLd(post),
      lvOnly: true,
      ogType: 'article',
      noindex: post.draft,
    }
  }
  if (blog) {
    return {
      title: `${blogPage.seoTitle} · protu.lv`,
      description: blogPage.seoDescription,
      path: BLOG_PATH,
      jsonLd: blogJsonLd(),
      lvOnly: true,
    }
  }
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
      // Klientu darbi ir arī valdis.protu.lv, bet meklētājiem tie pieder protu.lv.
      base: CLIENT_CASES.includes(work.id) ? PROTU_URL : SITE,
    }
  }
  if (!isPersonal) {
    return { title: ui[lang].protuTitle, description: ui[lang].protuDescription, path: '/', jsonLd: [] }
  }
  return { title: ui[lang].documentTitle, description: ui[lang].documentDescription, path: '/', jsonLd: [] }
}

const LD_ID = 'page-ld'

/** Pārlūkā: atjauno galvas tagus pēc lapas vai valodas maiņas. */
export function applyMeta(meta: PageMeta, lang: Lang) {
  if (meta.lvOnly) lang = 'lv'
  const url = pageUrl(meta.path, lang, meta.base)
  const set = (selector: string, attr: string, value: string) =>
    document.querySelector(selector)?.setAttribute(attr, value)
  /** Tagu, kura blogā nav, izveido no jauna, kad atgriežas citā lapā. */
  const ensure = (tag: 'link' | 'meta', attrs: Record<string, string>, present: boolean) => {
    const [key, value] = Object.entries(attrs)[0]
    const el = document.head.querySelector(`${tag}[${key}="${value}"]`)
    if (!present) return el?.remove()
    if (el) return
    const created = document.createElement(tag)
    Object.entries(attrs).forEach(([k, v]) => created.setAttribute(k, v))
    document.querySelector('link[rel="canonical"]')?.after(created)
  }
  const alternates = !meta.lvOnly
  ;(['lv', 'en', 'x-default'] as const).forEach((hreflang) =>
    ensure('link', { hreflang, rel: 'alternate', href: '' }, alternates),
  )
  ensure('meta', { property: 'og:locale:alternate', content: '' }, alternates)
  ensure('meta', { name: 'robots', content: 'noindex' }, Boolean(meta.noindex))

  document.title = meta.title
  set('meta[name="description"]', 'content', meta.description)
  set('meta[property="og:title"]', 'content', meta.title)
  set('meta[property="og:description"]', 'content', meta.description)
  set('meta[property="og:url"]', 'content', url)
  set('meta[property="og:type"]', 'content', meta.ogType ?? 'website')
  set('meta[property="og:locale"]', 'content', lang === 'lv' ? 'lv_LV' : 'en_US')
  set('meta[property="og:locale:alternate"]', 'content', lang === 'lv' ? 'en_US' : 'lv_LV')
  set('meta[name="twitter:title"]', 'content', meta.title)
  set('meta[name="twitter:description"]', 'content', meta.description)
  set('link[rel="canonical"]', 'href', url)
  set('link[hreflang="lv"]', 'href', pageUrl(meta.path, 'lv', meta.base))
  set('link[hreflang="en"]', 'href', pageUrl(meta.path, 'en', meta.base))
  set('link[hreflang="x-default"]', 'href', pageUrl(meta.path, 'lv', meta.base))

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
  if (meta.lvOnly) lang = 'lv'
  const url = pageUrl(meta.path, lang, meta.base)
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
    content('property', 'og:type', meta.ogType ?? 'website'),
    content('name', 'twitter:title', meta.title),
    content('name', 'twitter:description', meta.description),
    href('rel="canonical"', url),
    href('rel="alternate" hreflang="lv"', pageUrl(meta.path, 'lv', meta.base)),
    href('rel="alternate" hreflang="en"', pageUrl(meta.path, 'en', meta.base)),
    href('rel="alternate" hreflang="x-default"', pageUrl(meta.path, 'lv', meta.base)),
    // Blogā nav angļu versijas: bez hreflang un og:locale:alternate.
    (html: string) =>
      meta.lvOnly
        ? html.replace(/^\s*<link rel="alternate" hreflang="[^"]*"[^>]*>\n/gm, '').replace(/^\s*<meta property="og:locale:alternate"[^>]*>\n/m, '')
        : html,
    (html: string) =>
      meta.noindex ? html.replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>') : html,
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

/** Lapas, ko būvēšanā pārvērš statiskā HTML. Melnraksti arī, lai tos var apskatīt pa tiešo adresi. */
export const prerenderPaths = isPersonal
  ? []
  : [SERVICES_PATH, ...services.map((s) => serviceHref(s.slug)), BLOG_PATH, ...allPosts.map((p) => postHref(p.slug))]

/** sitemap.xml: abas valodas katrai adresei, blogs tikai latviski.
 *  valdis.protu.lv: sākumlapa + savi darbi (klientu darbi ir protu.lv sitemap). */
export function sitemapXml() {
  const ownCases = caseIds.filter((id) => (isPersonal ? !CLIENT_CASES.includes(id) : true))
  const bilingual = [
    '/',
    ...ownCases.map((id) => `/darbi/${id}`),
    ...(isPersonal ? [] : [SERVICES_PATH, ...services.map((s) => serviceHref(s.slug))]),
  ]
  const xml = (s: string) => s.replace(/&/g, '&amp;')
  const entries = bilingual.flatMap((path) =>
    (['lv', 'en'] as const).map(
      (lang) => `  <url>
    <loc>${xml(pageUrl(path, lang))}</loc>
    <xhtml:link rel="alternate" hreflang="lv" href="${xml(pageUrl(path, 'lv'))}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${xml(pageUrl(path, 'en'))}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${xml(pageUrl(path, 'lv'))}"/>
  </url>`,
    ),
  )
  // Blogs ir tikai latviski: viena adrese bez valodu alternatīvām; melnraksti nav iekšā.
  const newest = publishedPosts.map((p) => p.updated ?? p.date).sort().at(-1)
  const blogPaths = isPersonal
    ? []
    : [
        { path: BLOG_PATH, lastmod: newest },
        ...publishedPosts.map((p) => ({ path: postHref(p.slug), lastmod: p.updated ?? p.date })),
      ]
  const blogEntries = blogPaths.map(
    ({ path, lastmod }) => `  <url>
    <loc>${xml(pageUrl(path, 'lv'))}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
  </url>`,
  )
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[...entries, ...blogEntries].join('\n')}
</urlset>
`
}

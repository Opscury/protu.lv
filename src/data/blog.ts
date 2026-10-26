import { formatPrice, portfolioExample, serviceHref, services } from './services'

/** Blogs: /blog/ un /blog/<slug>/. Tikai latviski.
 *  Katrs raksts ir viens .md fails mapē src/content/blog/ (kā pievienot: HOW-TO-ADD-A-POST.md).
 *  Faili, kas sākas ar _, ir paraugi un netiek publicēti. */

export const BLOG_PATH = '/blog/'
export const postHref = (slug: string) => `${BLOG_PATH}${slug}/`

const portfolio = services.find((s) => s.slug === 'portfolio')!

/** Noslēguma bloks raksta beigās. Rakstā `cta: portfolio` izvēlas, kuru rādīt.
 *  Jaunu (piemēram, /parbaude/) pievieno šeit, un tas uzreiz der rakstiem. */
export const blogCtas = {
  portfolio: {
    title: 'Vajag savu portfolio lapu?',
    // Cena un adrese nāk no pakalpojuma datiem, lai raksti nesola ko citu kā piedāvājuma lapa.
    text: `Uztaisu tev tīru portfolio lapu adresē vards.protu.lv par ${formatPrice(portfolio.cardPrice, 'lv')}.`,
    href: serviceHref(portfolio.slug),
    linkLabel: 'Skatīt portfolio piedāvājumu',
    example: { href: portfolioExample.liveHref, label: portfolioExample.liveLink.lv },
  },
} satisfies Record<string, BlogCta>

export type BlogCta = {
  title: string
  text: string
  href: string
  linkLabel: string
  /** Dzīvs piemērs, atveras jaunā cilnē. */
  example?: { href: string; label: string }
}

export type CtaId = keyof typeof blogCtas

export type Post = {
  slug: string
  title: string
  description: string
  /** GGGG-MM-DD */
  date: string
  /** Ja raksts vēlāk būtiski mainīts, GGGG-MM-DD. */
  updated?: string
  cta: CtaId
  /** Melnraksts: lapa tiek uzbūvēta, bet nav sarakstā, sitemap un meklētājos. */
  draft: boolean
  /** Markdown teksts bez galvas. */
  body: string
}

const DATE = /^\d{4}-\d{2}-\d{2}$/

/** Nolasa faila galvu (--- … ---) un pārbauda laukus; kļūda aptur būvēšanu ar skaidru ziņu. */
export function parsePost(file: string, raw: string): Post {
  const fail = (msg: string): never => {
    throw new Error(`Blogs: ${file}: ${msg}`)
  }
  // Windows rindu beigas un BOM, kā arī komentāri pirms galvas (VIETTURIS atzīme).
  const text = raw.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').replace(/^(\s*<!--[\s\S]*?-->)*\s*/, '')
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) fail('trūkst galvas starp --- rindām')
  const [, head, body] = m!

  const fields: Record<string, string> = {}
  for (const line of head.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (!kv) fail(`nesaprotama galvas rinda: "${line}"`)
    fields[kv![1]] = kv![2].trim().replace(/^(["'])(.*)\1$/, '$2')
  }

  const need = (key: string) => fields[key] || fail(`trūkst lauka "${key}"`)
  const slug = need('slug')
  const expected = file.replace(/^.*\//, '').replace(/\.md$/, '')
  if (slug !== expected) fail(`slug "${slug}" nesakrīt ar faila nosaukumu "${expected}.md"`)
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) fail('slug drīkst saturēt tikai a–z, 0–9 un defises')
  const date = need('date')
  if (!DATE.test(date)) fail('date jābūt formā GGGG-MM-DD')
  const updated = fields.updated || undefined
  if (updated && !DATE.test(updated)) fail('updated jābūt formā GGGG-MM-DD')
  const cta = need('cta')
  if (!(cta in blogCtas)) fail(`nezināms cta "${cta}" (var: ${Object.keys(blogCtas).join(', ')})`)
  const draft = (fields.draft ?? 'false').toLowerCase()
  if (draft !== 'true' && draft !== 'false') fail('draft jābūt true vai false')

  return {
    slug,
    title: need('title'),
    description: need('description'),
    date,
    updated,
    cta: cta as CtaId,
    draft: draft === 'true',
    body: body.trim(),
  }
}

const files = import.meta.glob<string>(['../content/blog/*.md', '!../content/blog/_*.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

/** Visi raksti, jaunākais pirmais (arī melnraksti). */
export const allPosts: Post[] = Object.entries(files)
  .map(([file, raw]) => parsePost(file, raw))
  .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title, 'lv'))

/** Sarakstam un sitemap: bez melnrakstiem. Izstrādes režīmā rāda arī tos, lai var apskatīt. */
export const publishedPosts = allPosts.filter((p) => !p.draft)
export const listedPosts = import.meta.env.DEV ? allPosts : publishedPosts

/** /blog/ → saraksts; /blog/<slug>/ → raksts; citādi null. Nezināms slug rāda sarakstu. */
export function blogRoute(path: string): { post: Post | null } | null {
  const m = path.match(/^\/blog(?:\/([\w-]+))?\/?$/)
  if (!m) return null
  return { post: allPosts.find((p) => p.slug === m[1]) ?? null }
}

const MONTHS = [
  'janvāris', 'februāris', 'marts', 'aprīlis', 'maijs', 'jūnijs',
  'jūlijs', 'augusts', 'septembris', 'oktobris', 'novembris', 'decembris',
]

/** 2026-10-26 → "2026. gada 26. oktobris" (bez Intl, lai būvēšanā un pārlūkā sakrīt). */
export function formatDate(date: string) {
  const [y, m, d] = date.split('-').map(Number)
  return `${y}. gada ${d}. ${MONTHS[m - 1]}`
}

export const blogPage = {
  title: 'Blogs',
  lead:
    'Raksti māksliniekiem, fotogrāfiem, ilustratoriem un dizaineriem: kā parādīt savus darbus, ' +
    'lai tos saprot un atrod klienti.',
  seoTitle: 'Blogs radošajiem: portfolio un darbu rādīšana',
  seoDescription:
    'Praktiski raksti latviski māksliniekiem, fotogrāfiem, ilustratoriem un dizaineriem par portfolio, ' +
    'Instagram, Behance un to, kā parādīt darbus klientiem.',
  empty: 'Pirmie raksti drīzumā.',
  all: 'Visi raksti',
  read: 'Lasīt',
  draft: 'Melnraksts: nav sarakstā, sitemap un meklētājos',
}

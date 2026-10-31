/** Viens kods, divas vietnes:
 *  - protu.lv          → bizness: pakalpojumi, klientu darbi, blogs, konkursi (vēlāk portfolio veidotājs)
 *  - valdis.protu.lv   → Valdis kā izstrādātājs: hero, visi darbi, sertifikāti, CV kontakts
 *  Kuru būvēt, nosaka VITE_SITE (npm run build / npm run build:valdis). */

export type SiteKind = 'protu' | 'valdis'

export const SITE_KIND: SiteKind = import.meta.env.VITE_SITE === 'valdis' ? 'valdis' : 'protu'
export const isPersonal = SITE_KIND === 'valdis'

export const PROTU_URL = 'https://protu.lv'
export const VALDIS_URL = 'https://valdis.protu.lv'

/** Šīs vietnes saknes adrese (kanoniskajām saitēm, sitemap). */
export const SITE = isPersonal ? VALDIS_URL : PROTU_URL

/** Persona dzīvo personīgajā vietnē; protu.lv uz to atsaucas kā dibinātāju. */
export const PERSON_ID = `${VALDIS_URL}/#valdis`

/** Klientu gadījuma izpētes ir biznesa pierādījums: kanoniski uz protu.lv. */
export const CLIENT_CASES = ['silva', 'anda']

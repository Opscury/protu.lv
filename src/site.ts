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
export const CLIENT_CASES = ['anda', 'silva']

/** Share image (og:image). protu.lv has a PNG, because Facebook, WhatsApp and LinkedIn do not show SVG;
 *  it is drawn by scripts/make-og.py. valdis.protu.lv still has the old SVG card. */
export const OG_IMAGE = isPersonal ? `${VALDIS_URL}/og-image.svg` : `${PROTU_URL}/og-protu.png`
export const OG_IMAGE_ALT = isPersonal
  ? 'protu.lv, the portfolio of Valdis Viška, web developer'
  : 'protu.lv: portfolio lapa un pieteikuma PDF, bez maksas'

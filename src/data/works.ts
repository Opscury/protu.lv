import type { Localized } from '../types'

/** Sākumlapas kartītes. Pilnā gadījuma izpēte dzīvo /darbi/<id>. */

export type Work = {
  id: string
  title: string
  label: Localized
  spec: string
  blurb: Localized
  image: string
  imageAlt: Localized
  /** Iekšēja lapa (/darbi/…) vai ārēja saite. */
  href: string
  external?: boolean
  cta: Localized
  side?: boolean
}

export const works: Work[] = [
  {
    id: 'silva',
    title: 'Bistro Silva',
    label: { lv: 'Gadījuma izpēte · koncepts', en: 'Case study · concept' },
    spec: 'React · Django · VPS',
    blurb: {
      lv:
        'Pārbūvēju ģimenes bistro mājaslapu: no WordPress tēmas uz ātru React ' +
        'vietni ar admin paneli, ko darbinieki saprot bez instrukcijas.',
      en:
        'I rebuilt a family bistro’s website, moving it from a WordPress theme ' +
        'to a fast React site with an admin panel the staff use without a manual.',
    },
    image: '/work/silva/new-home-desktop.webp',
    imageAlt: { lv: 'Jaunā Bistro Silva sākumlapa', en: 'The rebuilt Bistro Silva home page' },
    href: '/darbi/silva',
    cta: { lv: 'Skatīt gadījuma izpēti', en: 'Read the case study' },
  },
  {
    id: 'anda',
    title: 'Anda Viška · portfolio',
    label: { lv: 'Gadījuma izpēte · klienta darbs', en: 'Case study · client work' },
    spec: 'HTML · CSS · JS · VPS',
    blurb: {
      lv:
        'Pārnesu spēļu mākslinieces portfolio no Canva uz viņas pašas domēnu. ' +
        'Pasteļkrāsas palika, struktūra kļuva skaidrāka, un katram projektam tagad ir sava lapa.',
      en:
        'I moved a game artist’s portfolio from Canva to her own domain. ' +
        'Her pastel colours stayed, the structure got clearer, and every project now has its own page.',
    },
    image: '/work/anda/new-home-desktop.webp',
    imageAlt: { lv: 'Andas Viškas jaunā portfolio sākumlapa', en: 'Anda Viška’s new portfolio home page' },
    href: '/darbi/anda',
    cta: { lv: 'Skatīt gadījuma izpēti', en: 'Read the case study' },
  },
  {
    id: 'vizium',
    title: 'VIZIUM',
    label: { lv: 'Gadījuma izpēte', en: 'Case study' },
    spec: 'Unity · C# · OVERLY · 2022',
    blurb: {
      lv: 'Interaktīvi eksponāti Ventspils zinātnes centram: projekcijas, simulatori un saskarnes.',
      en: 'Interactive exhibits for the Ventspils science centre: projections, simulators and interfaces.',
    },
    image: '/work/vizium/vizium-10.webp',
    imageAlt: { lv: 'VIZIUM ekspozīcijas interjers', en: 'VIZIUM exhibition interior' },
    href: '/darbi/vizium',
    cta: { lv: 'Skatīt gadījuma izpēti', en: 'Read the case study' },
  },
  {
    id: 'senciems',
    title: 'Senciems',
    label: { lv: 'Blakusprojekts · spēle', en: 'Side project · game' },
    spec: 'Phaser 3 · TypeScript',
    blurb: {
      lv: 'Gads senā latviešu ciemā, izstāstīts caur tā svētkiem. Point-and-click spēle pārlūkā.',
      en: 'A year in an old Latvian village, told through its festivals. A point-and-click browser game.',
    },
    image: '/work/senciems/senciems-poster.webp',
    imageAlt: { lv: 'Senciems, ciema skats', en: 'Senciems, the village' },
    href: 'https://senciems.protu.lv',
    external: true,
    cta: { lv: 'Spēlēt', en: 'Play it' },
    side: true,
  },
]

/** Pilno lapu secība — "nākamais darbs" saitei. */
export const caseIds = works.filter((w) => !w.external).map((w) => w.id)

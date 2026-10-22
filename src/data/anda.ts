import type { Localized } from '../types'

/** Andas portfolio gadījuma izpēte: dati vienuviet, komponente tikai attēlo. */

export type ComparePage = { id: string; label: Localized }

export const comparePages: ComparePage[] = [
  { id: 'home', label: { lv: 'Sākumlapa', en: 'Home' } },
  { id: 'project', label: { lv: 'Projekts', en: 'Project' } },
  { id: 'more', label: { lv: '3D modelēšana', en: '3D modelling' } },
]

export const shot = (site: 'old' | 'new', page: string, device: string) =>
  `/work/anda/${site}-${page}-${device}.webp`

export const anda = {
  label: { lv: 'Gadījuma izpēte · klienta darbs', en: 'Case study · client work' },
  title: 'Anda Viška · portfolio',
  role: {
    lv: 'Dizains, izstrāde, serveris',
    en: 'Design, development, hosting',
  },
  place: 'Latvija · 2026',
  summary: {
    lv:
      'Pārnesu spēļu mākslinieces portfolio no Canva uz viņas pašas domēnu. ' +
      'Klientes vēlme: „lai izskatās profesionālāk, bet ar pasteļkrāsām”. ' +
      'Personība palika tā pati, struktūra kļuva skaidrāka, un sākumlapa ' +
      'tagad ir 16 reizes vieglāka. Pašlaik vietne ir otrajā versijā, komiksa stilā.',
    en:
      'I moved a game artist’s portfolio from Canva to her own domain. ' +
      'The brief: “make it look more professional, but keep the pastel ' +
      'colours”. The personality stayed, the structure got clearer, and ' +
      'the home page is now 16 times lighter. The site is on its second version, in a comic-book style.',
  },
  status: {
    lv:
      'Publicēts: anda.protu.lv. Vispirms Canva vietni pārnesu uz savu serveri ' +
      'kā precīzu kopiju, tad uztaisīju maketu. Anda apstiprināja virzienu ' +
      'pēc pirmā skata. Otrā versija pārvērta sākumlapu par komiksa lapu.',
    en:
      'Live at anda.protu.lv. First I moved the Canva site to my server as an ' +
      'exact copy, then made a mockup. Anda approved the direction on first look. ' +
      'The second version turned the home page into a comic page.',
  },
  compareHint: {
    lv: 'Velc robežu: pa kreisi vecā Canva vietne, pa labi jaunā.',
    en: 'Drag the divider: the old Canva site on the left, the new one on the right.',
  },
  before: { lv: 'Pirms · Canva', en: 'Before · Canva' },
  after: { lv: 'Pēc · anda.protu.lv', en: 'After · anda.protu.lv' },
  sliderLabel: {
    lv: 'Salīdzinājuma robeža starp veco un jauno versiju',
    en: 'Divider between the old and new version',
  },
  desktop: { lv: 'Dators', en: 'Desktop' },
  mobile: { lv: 'Telefons', en: 'Phone' },
  pageLabel: { lv: 'Lapa', en: 'Page' },
  deviceLabel: { lv: 'Ierīce', en: 'Device' },
}

export const changes: { title: Localized; body: Localized }[] = [
  {
    title: { lv: 'Darbi vairs nav paslēpti', en: 'No more hidden work' },
    body: {
      lv:
        'Puse projektu bija otrā lapā aiz vienas pogas apakšā. Tagad visi ' +
        'seši ir paneļos sākumlapā, un katram ir sava lapa ar lomu, komandu un ' +
        'rīkiem. Zīmējumi un studijas ir galerijā, kur attēlu var atvērt lielāku.',
      en:
        'Half the projects sat on a second page behind one button at the ' +
        'bottom. Now all six are panels on the home page, and each has its own ' +
        'page with role, team and tools. Drawings and studies sit in a gallery ' +
        'where any image opens larger.',
    },
  },
  {
    title: { lv: 'Komiksa lapa', en: 'A comic page' },
    body: {
      lv:
        'Sākumlapa ir viena komiksa lapa: biezas kontūras, rastra punkti un ' +
        'katram projektam savs panelis savā pasteļtonī. Makeoober ir lielākais ' +
        'panelis centrā, un kontaktos ir Andas pašas zīmēts tēls.',
      en:
        'The home page is one comic page: heavy outlines, halftone dots and a ' +
        'panel per project, each in its own pastel tint. Makeoober is the big ' +
        'centre panel, and the contact section has a character Anda drew herself.',
    },
  },
  {
    title: { lv: 'Teksts, ko var izlasīt', en: 'Text you can read' },
    body: {
      lv:
        'Sīko slīprakstu un kontūrburtu virsrakstu vietā ir viens fonts, Roboto ' +
        'Condensed, taisnajā un slīprakstā, ar latviešu burtiem un mitināts uz ' +
        'sava servera. Lighthouse pieejamība 93 → 100.',
      en:
        'Small italics and outlined headings replaced by one family, Roboto ' +
        'Condensed, upright and italic, with Latvian letters and self-hosted. ' +
        'Lighthouse accessibility 93 → 100.',
    },
  },
  {
    title: { lv: 'Viegla un sava', en: 'Light, and her own' },
    body: {
      lv:
        'Attēli ir WebP formātā, un sākumlapa no 20,6 MB kļuva par 1,25 MB. ' +
        'Bez Canva skriptiem, uz mana VPS ar HTTPS; vecās Canva saites ' +
        'pāradresētas uz jaunajām lapām.',
      en:
        'The images are WebP, and the home page went from 20.6 MB to 1.25 MB. ' +
        'No Canva scripts, running on my VPS with HTTPS; old Canva links ' +
        'redirect to the new pages.',
    },
  },
]

export const tags: Localized[] = [
  { lv: 'HTML', en: 'HTML' },
  { lv: 'CSS', en: 'CSS' },
  { lv: 'JavaScript', en: 'JavaScript' },
  { lv: 'Python (ģenerators)', en: 'Python (generator)' },
  { lv: 'WebP', en: 'WebP' },
  { lv: 'VPS · Nginx', en: 'VPS · Nginx' },
]

export const links = [
  {
    label: { lv: 'Skatīt jauno vietni', en: 'View the new site' },
    href: 'https://anda.protu.lv',
  },
  {
    label: { lv: 'Vecā Canva vietne', en: 'The old Canva site' },
    href: 'https://portfolioanda.my.canva.site/anda-viska/',
  },
]

/** Lighthouse 12.2, mobilais profils, sākumlapa, 22.10.2026 (2 mērījumi; veiktspēja 70 un 72). */
export const metrics = {
  title: { lv: 'Sākumlapa, mērīts', en: 'Home page, measured' },
  metric: { lv: 'Rādītājs', en: 'Metric' },
  old: 'Canva',
  rebuild: { lv: 'Jaunā', en: 'Rebuild' },
  rows: [
    { label: { lv: 'Lapas svars', en: 'Page weight' }, old: '20,6 MB', new: '1,25 MB' },
    { label: { lv: 'Pieprasījumi', en: 'Requests' }, old: '160', new: '24' },
    { label: { lv: 'Lielākais saturs redzams', en: 'Largest paint (LCP)' }, old: '23,5 s', new: '6,7 s' },
    { label: { lv: 'Veiktspēja', en: 'Performance' }, old: '55', new: '70–72' },
    { label: { lv: 'Pieejamība', en: 'Accessibility' }, old: '93', new: '100' },
    { label: { lv: 'SEO', en: 'SEO' }, old: '45', new: '100' },
  ],
  note: {
    lv:
      'Lighthouse, mobilais profils. Jaunā versija mērīta dzīvajā vietnē ' +
      '22.10.2026, divreiz; veiktspēja bija 70 un 72.',
    en:
      'Lighthouse, mobile profile. The new version was measured on the live ' +
      'site on 22 Oct 2026, twice; performance came out at 70 and 72.',
  },
}

export const pages = {
  title: { lv: 'Katram darbam sava lapa', en: 'Every project gets a page' },
  body: {
    lv:
      'Darba devējs, kas atver Spider Meadow, uzreiz redz, ko tieši Anda ' +
      'darīja: visu spēles mākslu, flīzes un zirnekļa animāciju, komandā ar ' +
      'programmētāju. Zemāk ir spēles attēli.',
    en:
      'An employer who opens Spider Meadow sees straight away what exactly ' +
      'Anda did: all the game art, tiles and the spider’s animation, in a team ' +
      'with a programmer. The game images follow below.',
  },
  caption: {
    lv: 'Spider Meadow projekta lapa jaunajā vietnē.',
    en: 'The Spider Meadow project page on the new site.',
  },
  alt: {
    lv: 'Spider Meadow projekta lapa: apraksts, loma un spēles attēli',
    en: 'Spider Meadow project page: description, role and game images',
  },
}

export const steps: { label: Localized; note: Localized; upcoming?: boolean }[] = [
  {
    label: { lv: 'Precīza kopija', en: 'Faithful copy' },
    note: { lv: 'Canva vietne 1:1 uz sava servera', en: 'The Canva site 1:1 on my server' },
  },
  {
    label: { lv: 'Makets', en: 'Mockup' },
    note: { lv: 'Sākumlapa un viens projekts, apstiprināts', en: 'Home and one project, approved' },
  },
  {
    label: { lv: 'Visa vietne', en: 'Full site' },
    note: { lv: '6 projektu lapas, galerija, par mani', en: '6 project pages, gallery, about' },
  },
  {
    label: { lv: 'Publicēts', en: 'Live' },
    note: { lv: 'anda.protu.lv ar HTTPS', en: 'anda.protu.lv with HTTPS' },
  },
  {
    label: { lv: 'Otrā versija', en: 'Second version' },
    note: { lv: 'Komiksa stils', en: 'Comic-book style' },
  },
]

export const processTitle = { lv: 'Kā tas tapa', en: 'How it was built' }

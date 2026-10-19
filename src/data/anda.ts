import type { Localized } from '../types'

/** Andas portfolio gadījuma izpēte: dati vienuviet, komponente tikai attēlo. */

export type ComparePage = { id: string; label: Localized }

export const comparePages: ComparePage[] = [
  { id: 'home', label: { lv: 'Sākumlapa', en: 'Home' } },
  { id: 'project', label: { lv: 'Projekts', en: 'Project' } },
  { id: 'more', label: { lv: 'Visi darbi', en: 'All work' } },
]

export const shot = (site: 'old' | 'new', page: string, device: string) =>
  `/work/anda/${site}-${page}-${device}.webp`

export const anda = {
  label: { lv: 'Gadījuma izpēte · klienta darbs', en: 'Case study · client work' },
  title: 'Anda Viška — portfolio',
  role: {
    lv: 'Dizains, izstrāde, serveris',
    en: 'Design, development, hosting',
  },
  place: 'Latvija · 2026',
  summary: {
    lv:
      'Spēļu mākslinieces portfolio pārnešana no Canva uz pašas domēnu. ' +
      'Klientes vēlme: „lai izskatās profesionālāk, bet ar pasteļkrāsām”. ' +
      'Rezultāts — tā pati personība, skaidra struktūra un vietne, kas ' +
      'ielādējas 45 reizes vieglāk.',
    en:
      'Moving a game artist’s portfolio from Canva to her own domain. ' +
      'The brief: “make it look more professional, but keep the pastel ' +
      'colours”. The result — the same personality, a clear structure and ' +
      'a site that loads 45 times lighter.',
  },
  status: {
    lv:
      'Publicēts: anda.protu.lv. Vispirms Canva vietni pārnesu uz savu serveri ' +
      'kā precīzu kopiju, tad uztaisīju maketu — Anda apstiprināja virzienu ' +
      'pēc pirmā skata.',
    en:
      'Live at anda.protu.lv. First the Canva site moved to my server as an ' +
      'exact copy, then a mockup — Anda approved the direction on first look.',
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
        'seši ir kartītēs sākumlapā, un katram ir sava lapa ar lomu, komandu, ' +
        'rīkiem un galeriju, kur attēlu var atvērt pilnā izmērā.',
      en:
        'Half the projects sat on a second page behind one button at the ' +
        'bottom. Now all six are cards on the home page, and each has its own ' +
        'page with role, team, tools and a gallery that opens images full size.',
    },
  },
  {
    title: { lv: 'Pasteļi kā sistēma', en: 'Pastels as a system' },
    body: {
      lv:
        'Gradienta fona vietā — mierīga gaiša pamatne un katram projektam ' +
        'savs pasteļtonis. Viļņoto laukumu vietā dekors ir Andas pašas tēli, ' +
        'tāpēc personība paliek, bet troksnis pazūd.',
      en:
        'Instead of a gradient behind everything — a calm light base and one ' +
        'pastel tint per project. Her own characters replace the wavy blobs as ' +
        'decoration, so the personality stays and the noise goes.',
    },
  },
  {
    title: { lv: 'Teksts, ko var izlasīt', en: 'Text you can read' },
    body: {
      lv:
        'Sīku slīprakstu kontūrburtu virsrakstu vietā — divi fonti normālā ' +
        'izmērā ar latviešu burtiem, mitināti uz sava servera. Lighthouse ' +
        'pieejamība 93 → 100.',
      en:
        'Small italics and outlined headings replaced by two fonts at a normal ' +
        'size, with Latvian letters, self-hosted. Lighthouse accessibility ' +
        '93 → 100.',
    },
  },
  {
    title: { lv: 'Viegla un sava', en: 'Light, and her own' },
    body: {
      lv:
        'Attēli pārveidoti WebP — visa vietne no ~128 MB uz 4,6 MB. ' +
        'Bez Canva skriptiem, uz mana VPS ar HTTPS; vecās Canva saites ' +
        'pāradresētas uz jaunajām lapām.',
      en:
        'Images converted to WebP — the whole site from ~128 MB to 4.6 MB. ' +
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

/** Lighthouse, mobilais profils, sākumlapa, 19.10.2026 (2 mērījumi, vienādi). */
export const metrics = {
  title: { lv: 'Sākumlapa, mērīts', en: 'Home page, measured' },
  metric: { lv: 'Rādītājs', en: 'Metric' },
  old: 'Canva',
  rebuild: { lv: 'Jaunā', en: 'Rebuild' },
  rows: [
    { label: { lv: 'Lapas svars', en: 'Page weight' }, old: '20,6 MB', new: '0,45 MB' },
    { label: { lv: 'Pieprasījumi', en: 'Requests' }, old: '160', new: '13' },
    { label: { lv: 'Lielākais saturs redzams', en: 'Largest paint (LCP)' }, old: '23,5 s', new: '2,6 s' },
    { label: { lv: 'Veiktspēja', en: 'Performance' }, old: '55', new: '97' },
    { label: { lv: 'Pieejamība', en: 'Accessibility' }, old: '93', new: '100' },
    { label: { lv: 'SEO', en: 'SEO' }, old: '45', new: '100' },
  ],
  note: {
    lv:
      'Lighthouse, mobilais profils, 19.10.2026, divi mērījumi ar vienādu ' +
      'rezultātu. Jaunā versija mērīta bez servera saspiešanas, tāpēc ' +
      'dzīvajā vietnē tā ir vēl vieglāka.',
    en:
      'Lighthouse, mobile profile, 19 Oct 2026, two runs with the same result. ' +
      'The rebuild was measured without server compression, so the live site ' +
      'is lighter still.',
  },
}

export const pages = {
  title: { lv: 'Katram darbam sava lapa', en: 'Every project gets a page' },
  body: {
    lv:
      'Darba devējs, kas atver Spider Meadow, uzreiz redz, ko tieši Anda ' +
      'darīja: visu spēles mākslu, flīzes un zirnekļa animāciju, komandā ar ' +
      'programmētāju. Zemāk — tēli, kukaiņi un pasaules priekšmeti kā ' +
      'kārtīga asset lapa, nevis kolāža.',
    en:
      'An employer who opens Spider Meadow sees straight away what exactly ' +
      'Anda did: all the game art, tiles and the spider’s animation, in a team ' +
      'with a programmer. Below — characters, bugs and world items laid out ' +
      'as a proper asset sheet, not a collage.',
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
    note: { lv: 'Sākumlapa un viens projekts — apstiprināts', en: 'Home and one project — approved' },
  },
  {
    label: { lv: 'Visa vietne', en: 'Full site' },
    note: { lv: '6 projektu lapas, galerija, par mani', en: '6 project pages, gallery, about' },
  },
  {
    label: { lv: 'Publicēts', en: 'Live' },
    note: { lv: 'anda.protu.lv ar HTTPS', en: 'anda.protu.lv with HTTPS' },
  },
]

export const processTitle = { lv: 'Kā tas tapa', en: 'How it was built' }

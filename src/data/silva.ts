import type { Localized } from '../types'

/** Bistro Silva gadījuma izpēte: dati vienuviet, komponente tikai attēlo. */

export type ComparePage = { id: string; label: Localized }

export const comparePages: ComparePage[] = [
  { id: 'home', label: { lv: 'Sākumlapa', en: 'Home' } },
  { id: 'bistro', label: { lv: 'Bistro', en: 'Bistro' } },
  { id: 'konditoreja', label: { lv: 'Konditoreja', en: 'Bakery' } },
]

export const shot = (site: 'old' | 'new', page: string, device: string) =>
  `/work/silva/${site}-${page}-${device}.webp`

export const silva = {
  label: { lv: 'Gadījuma izpēte · koncepts', en: 'Case study · concept' },
  title: 'Bistro Silva',
  role: {
    lv: 'Izstrāde, satura pārvaldība, serveris',
    en: 'Development, content admin, hosting',
  },
  place: 'Jelgava · 2026',
  summary: {
    lv:
      'Ģimenes bistro, konditorejas un banketu zāles mājaslapas pārbūve — ' +
      'no WordPress tēmas uz ātru React vietni ar paša veidotu satura ' +
      'pārvaldību, ko darbinieki saprot bez instrukcijas.',
    en:
      'Rebuilding the website of a family bistro, bakery and banquet venue — ' +
      'from a WordPress theme to a fast React site with a custom content ' +
      'admin the staff can use without a manual.',
  },
  status: {
    lv:
      'Koncepts, nevis gala versija. Publiskā vietne joprojām ir bistro.lv. ' +
      'Gala dizainu pabeigsim, balstoties uz Silvas zīmola izpēti, kas ' +
      'top kā zīmola dizaina maģistra darbs.',
    en:
      'A concept, not the final version — bistro.lv is still the public site. ' +
      'The final design will be completed on the basis of brand research ' +
      'for Silva, currently under way as a brand design master’s project.',
  },
  compareHint: {
    lv: 'Velc robežu: pa kreisi pašreizējā bistro.lv, pa labi jaunā versija.',
    en: 'Drag the divider: current bistro.lv on the left, the rebuild on the right.',
  },
  before: { lv: 'Pirms · bistro.lv', en: 'Before · bistro.lv' },
  after: { lv: 'Pēc · silva.protu.lv', en: 'After · silva.protu.lv' },
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
    title: { lv: 'Viena vizuālā valoda', en: 'One visual system' },
    body: {
      lv:
        'Visas septiņas lapas pārzīmētas vienā stilā, kas izaudzis no ' +
        'konditorejas lapas. Logotips un struktūra paliek — klientam ' +
        'pazīstama vietne, tikai sakārtota.',
      en:
        'All seven pages redrawn in one style grown out of the bakery page. ' +
        'The logo and structure stay — a site the owners recognise, just ' +
        'put in order.',
    },
  },
  {
    title: { lv: 'Katalogs kā dati', en: 'The catalogue as data' },
    body: {
      lv:
        '118 konditorejas produkti 10 kategorijās pārnesti strukturētos ' +
        'datos. Pa ceļam salaboti 9 no 10 izvēlnes enkuriem, kas vecajā ' +
        'vietnē nekur neveda.',
      en:
        '118 bakery products in 10 categories moved into structured data. ' +
        'Along the way, 9 of the 10 menu anchors that led nowhere on the old ' +
        'site were fixed.',
    },
  },
  {
    title: { lv: 'Vieglāki attēli', en: 'Lighter images' },
    body: {
      lv:
        '317 attēli samazināti un pārveidoti WebP formātā — kopā no ' +
        '202 MB uz 31 MB, bez redzama kvalitātes zuduma.',
      en:
        '317 images resized and converted to WebP — from 202 MB down to ' +
        '31 MB in total, with no visible loss of quality.',
    },
  },
  {
    title: { lv: 'Saturu maina paši', en: 'Staff edit it themselves' },
    body: {
      lv:
        'Nedēļas ēdienkarti darbinieki nomaina latviskā Django admin ' +
        'panelī. Grupai redzams tikai tas, kas jāmaina — bez zvana ' +
        'izstrādātājam.',
      en:
        'Staff replace the weekly lunch menu in a Latvian-language Django ' +
        'admin. Their group sees only what they need to change — no call ' +
        'to the developer.',
    },
  },
  {
    title: { lv: 'Savs serveris', en: 'Own server' },
    body: {
      lv:
        'Vietne un admin panelis darbojas uz mana VPS: Nginx, HTTPS, ' +
        'izvietošana ar vienu komandu un ikdienas datubāzes rezerves kopijas.',
      en:
        'The site and admin run on my own VPS: Nginx, HTTPS, one-command ' +
        'deploys and nightly database backups.',
    },
  },
]

export const tags: Localized[] = [
  { lv: 'React', en: 'React' },
  { lv: 'React Router', en: 'React Router' },
  { lv: 'Vite', en: 'Vite' },
  { lv: 'Django', en: 'Django' },
  { lv: 'Django admin', en: 'Django admin' },
  { lv: 'VPS · Nginx', en: 'VPS · Nginx' },
  { lv: 'WebP', en: 'WebP' },
]

export const links = [
  {
    label: { lv: 'Skatīt jauno versiju', en: 'View the rebuild' },
    href: 'https://silva.protu.lv',
  },
  {
    label: { lv: 'Pašreizējā bistro.lv', en: 'Current bistro.lv' },
    href: 'https://bistro.lv',
  },
]

/** Lighthouse, mobilais profils, sākumlapa, 16.10.2026 (3 mērījumi, vienādi). */
export const metrics = {
  title: { lv: 'Sākumlapa, mērīts', en: 'Home page, measured' },
  metric: { lv: 'Rādītājs', en: 'Metric' },
  rebuild: { lv: 'Jaunā', en: 'Rebuild' },
  rows: [
    { label: { lv: 'Lapas svars', en: 'Page weight' }, old: '7,3 MB', new: '1,7 MB' },
    { label: { lv: 'Pieprasījumi', en: 'Requests' }, old: '31', new: '21' },
    { label: { lv: 'Pieejamība', en: 'Accessibility' }, old: '93', new: '96' },
    { label: { lv: 'Visi attēli kopā', en: 'All images' }, old: '202 MB', new: '31 MB' },
  ],
  note: {
    lv: 'Lighthouse, mobilais profils, 16.10.2026. Attēlu apjoms — pirms un pēc konvertēšanas.',
    en: 'Lighthouse, mobile profile, 16 Oct 2026. Image total — before and after conversion.',
  },
}

import type { Lang } from '../types'

/** Protu lapas (portfolio veidotājs) dzīvo mans.protu.lv; protu.lv sākumlapa uz to ved. */
export const BUILDER_URL = 'https://mans.protu.lv'
export const BUILDER_SIGNUP = `${BUILDER_URL}/registreties/`
export const BUILDER_LOGIN = `${BUILDER_URL}/ieiet/`

type T = Record<Lang, string>

export const builder: {
  eyebrow: T
  title: T
  lead: T
  cta: T
  login: T
  note: T
  stepsTitle: T
  steps: { title: T; body: T }[]
  freeTitle: T
  free: T[]
  callsTitle: T
  callsBody: T
  callsLink: T
  customTitle: T
} = {
  eyebrow: { lv: 'Protu lapas · agrīnā versija', en: 'Protu lapas · early version' },
  title: {
    lv: 'Portfolio lapa un pieteikuma PDF. Bez maksas.',
    en: 'A portfolio site and an application PDF. Free.',
  },
  lead: {
    lv: 'Ieliec savus darbus vienreiz. No tiem top tava lapa vārds.protu.lv un PDF konkursiem, rezidencēm un studiju pieteikumiem, pārbaudīts pēc tā, ko prasa konkrētais pieteikums.',
    en: 'Add your work once. It becomes your site at name.protu.lv and a PDF for open calls, residencies and school applications, checked against what that application asks for. The editor is in Latvian.',
  },
  cta: { lv: 'Izveidot savu lapu', en: 'Create your site' },
  login: { lv: 'Man jau ir konts', en: 'I already have an account' },
  note: {
    lv: 'Pirmo publicēšanu pārbaudu pats, parasti 24 stundu laikā. Tā protu.lv paliek tīra no krāpniekiem.',
    en: 'I check every first publish myself, usually within 24 hours. That keeps protu.lv free of scam pages.',
  },
  stepsTitle: { lv: 'Kā tas strādā', en: 'How it works' },
  steps: [
    {
      title: { lv: 'Izvēlies savu jomu', en: 'Pick your field' },
      body: {
        lv: 'Glezniecība, foto, dizains, arhitektūra, kino, mūzika, literatūra un citas. Joma nosaka izkārtojumu, darbu aprakstu laukus un CV sadaļas.',
        en: 'Painting, photography, design, architecture, film, music, writing and more. Your field sets the layout, the caption fields and the CV sections.',
      },
    },
    {
      title: { lv: 'Ieliec darbus', en: 'Add your work' },
      body: {
        lv: 'Attēli bez krāsu nobīdes, video no YouTube vai Vimeo, teksti ar precīzām rindām. Latviski un angliski blakus.',
        en: 'Images without colour shifts, video from YouTube or Vimeo, text with exact line breaks. Latvian and English side by side.',
      },
    },
    {
      title: { lv: 'Publicē un iesniedz', en: 'Publish and apply' },
      body: {
        lv: 'Lapa vārds.protu.lv un katram pieteikumam savs darbu komplekts ar PDF, CV un JPG paku.',
        en: 'A site at name.protu.lv, and for each application its own set of works with a PDF, a CV and a JPG pack.',
      },
    },
  ],
  freeTitle: { lv: 'Bezmaksas plānā', en: 'On the free plan' },
  free: [
    { lv: '6 projekti, katrā līdz 15 darbiem', en: '6 projects, up to 15 works each' },
    { lv: '3 pieteikumu komplekti sezonā', en: '3 application sets per season' },
    { lv: 'Tava adrese vārds.protu.lv', en: 'Your own address at name.protu.lv' },
    { lv: 'Visu var eksportēt jebkurā brīdī', en: 'Export everything at any time' },
    { lv: 'Bezmaksas limiti nekad nesamazinās', en: 'Free limits never go down' },
    { lv: 'Tavi darbi netiek izmantoti AI apmācībai', en: 'Your work is never used to train AI' },
  ],
  callsTitle: { lv: 'Kur to iesniegt?', en: 'Where to send it?' },
  callsBody: {
    lv: 'Atvērtie konkursi: rezidences, stipendijas, plenēri un konkursi Latvijā, katrs pārbaudīts un ar saiti uz oficiālo lapu.',
    en: 'Open calls: residencies, grants and competitions in Latvia, each checked and linked to the official page (in Latvian).',
  },
  callsLink: { lv: 'Skatīt konkursus', en: 'See open calls' },
  customTitle: { lv: 'Vai lapa, kas taisīta tieši tev', en: 'Or a site made just for you' },
}

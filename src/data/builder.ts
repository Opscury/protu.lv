import type { Lang } from '../types'

/** Protu lapas (portfolio veidotājs) dzīvo mans.protu.lv; protu.lv sākumlapa ir tā vitrīna. */
export const BUILDER_URL = 'https://mans.protu.lv'
export const BUILDER_SIGNUP = `${BUILDER_URL}/registreties/`
export const BUILDER_LOGIN = `${BUILDER_URL}/ieiet/`
export const BUILDER_TERMS = `${BUILDER_URL}/noteikumi/`
export const BUILDER_PRIVACY = `${BUILDER_URL}/privatums/`
export const BUILDER_REPORT = `${BUILDER_URL}/zinot/`

type T = Record<Lang, string>

/** Ekrānuzņēmums. Kamēr src nav, rāda vietturi ar label tekstu.
 *  Īstu attēlu: ieliec failu public/builder/ un ieraksti src: '/builder/fails.webp'. */
export type Shot = { src?: string; label: T }

export type Field = {
  name: T
  /** Izkārtojums, ko joma iestata pēc noklusējuma (Protu lapas: Galerija, Kino, Stāsts, Grāmata). */
  layout: T
  /** Darba paraksta paraugs, kā to saliek šīs jomas lauki. */
  caption: T
  shot: Shot
}

export const builder = {
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
  login: { lv: 'Ieiet', en: 'Log in' },
  hasAccount: { lv: 'Man jau ir konts', en: 'I already have an account' },
  note: {
    lv: 'Pirmo publicēšanu pārbaudu pats, parasti 24 stundu laikā.',
    en: 'I check every first publish myself, usually within 24 hours.',
  },
  heroSite: {
    label: { lv: 'Portfolio lapa · vārds.protu.lv', en: 'Portfolio site · name.protu.lv' },
  } as Shot,
  heroPdf: {
    label: { lv: 'Pieteikuma PDF', en: 'Application PDF' },
  } as Shot,
  heroCaption: {
    lv: 'Viens saturs, divi rezultāti: lapa, ko vari iedot jebkuram, un PDF, ko vari iesniegt.',
    en: 'One source, two results: a site you can send anyone and a PDF you can submit.',
  },

  stepsTitle: { lv: 'Kā tas strādā', en: 'How it works' },
  steps: [
    {
      title: { lv: 'Izvēlies savu jomu', en: 'Pick your field' },
      body: {
        lv: 'Joma nosaka izkārtojumu, darbu paraksta laukus un CV sadaļas. Vēlāk vari mainīt.',
        en: 'Your field sets the layout, the caption fields and the CV sections. You can change it later.',
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
      title: { lv: 'Publicē un piesakies', en: 'Publish and apply' },
      body: {
        lv: 'Lapa iet tiešsaistē vārds.protu.lv. Katram pieteikumam saliec savu darbu komplektu un lejupielādē PDF, CV un JPG paku.',
        en: 'Your site goes live at name.protu.lv. For each application, pick a set of works and download a PDF, a CV and a JPG pack.',
      },
    },
  ],

  fieldsTitle: { lv: 'Tavai jomai, nevis tikai gleznotājiem', en: 'Built for your field, not just painters' },
  fieldsLead: {
    lv: 'Fotogrāfam vajag sēriju un tirāžu, arhitektam platību un statusu, tulkotājam valodu pāri. Katra joma saņem savus laukus un savu izkārtojumu.',
    en: 'A photographer needs series and edition, an architect area and status, a translator the language pair. Each field gets its own fields and its own layout.',
  },
  fields: [
    {
      name: { lv: 'Glezniecība un grafika', en: 'Painting and printmaking' },
      layout: { lv: 'Galerija', en: 'Gallery' },
      caption: { lv: 'Eļļa uz audekla, 80 × 100 cm, 2025', en: 'Oil on canvas, 80 × 100 cm, 2025' },
      shot: { label: { lv: 'glezniecība', en: 'painting' } },
    },
    {
      name: { lv: 'Fotogrāfija', en: 'Photography' },
      layout: { lv: 'Galerija', en: 'Gallery' },
      caption: { lv: 'Sērija «Krasts», Pāvilosta, 2024, tirāža 5', en: 'Series “Shore”, Pāvilosta, 2024, edition of 5' },
      shot: { label: { lv: 'fotogrāfija', en: 'photography' } },
    },
    {
      name: { lv: 'Dizains', en: 'Design' },
      layout: { lv: 'Stāsts', en: 'Story' },
      caption: { lv: 'Zīmola identitāte, loma: vadošā dizainere, 2025', en: 'Brand identity, role: lead designer, 2025' },
      shot: { label: { lv: 'dizains', en: 'design' } },
    },
    {
      name: { lv: 'Arhitektūra', en: 'Architecture' },
      layout: { lv: 'Stāsts', en: 'Story' },
      caption: { lv: 'Dzīvojamā māja, Jelgava, 240 m², realizēts', en: 'Family house, Jelgava, 240 m², built' },
      shot: { label: { lv: 'arhitektūra', en: 'architecture' } },
    },
    {
      name: { lv: 'Kino un animācija', en: 'Film and animation' },
      layout: { lv: 'Kino', en: 'Cinema' },
      caption: { lv: 'Stop-motion, 6 min, režisore, 2025', en: 'Stop-motion, 6 min, director, 2025' },
      shot: { label: { lv: 'kino', en: 'film' } },
    },
    {
      name: { lv: 'Tekstils un mode', en: 'Textiles and fashion' },
      layout: { lv: 'Kino', en: 'Cinema' },
      caption: { lv: 'Vilna, adījums, kolekcija R/Z 2025', en: 'Wool, knit, AW 2025 collection' },
      shot: { label: { lv: 'tekstils', en: 'textiles' } },
    },
    {
      name: { lv: 'Mūzika un skaņa', en: 'Music and sound' },
      layout: { lv: 'Grāmata', en: 'Book' },
      caption: { lv: 'Kamerkorim, 12 min, pirmatskaņojums Rīgā, 2025', en: 'For chamber choir, 12 min, premiered in Rīga, 2025' },
      shot: { label: { lv: 'mūzika', en: 'music' } },
    },
    {
      name: { lv: 'Rakstniecība un tulkošana', en: 'Writing and translation' },
      layout: { lv: 'Grāmata', en: 'Book' },
      caption: { lv: 'Tulkojums no franču, «Dienas Grāmata», 2024', en: 'Translated from French, Dienas Grāmata, 2024' },
      shot: { label: { lv: 'rakstniecība', en: 'writing' } },
    },
  ] as Field[],
  layoutLabel: { lv: 'Izkārtojums', en: 'Layout' },
  shotPlaceholder: { lv: 'ekrānuzņēmums', en: 'screenshot' },

  freeTitle: { lv: 'Bezmaksas plānā', en: 'On the free plan' },
  free: [
    { lv: '6 projekti, katrā līdz 15 darbiem', en: '6 projects, up to 15 works each' },
    { lv: '3 pieteikumu komplekti sezonā', en: '3 application sets per season' },
    { lv: 'Tava adrese vārds.protu.lv', en: 'Your own address at name.protu.lv' },
    { lv: 'Visu var eksportēt jebkurā brīdī', en: 'Export everything at any time' },
    { lv: 'Bezmaksas limiti nekad nesamazinās', en: 'Free limits never go down' },
    { lv: 'Tavi darbi netiek izmantoti AI apmācībai', en: 'Your work is never used to train AI' },
  ] as T[],

  callsTitle: { lv: 'Kur to iesniegt?', en: 'Where to send it?' },
  callsBody: {
    lv: 'Atvērtie konkursi: rezidences, stipendijas, plenēri un konkursi Latvijā, katrs pārbaudīts un ar saiti uz oficiālo lapu.',
    en: 'Open calls: residencies, grants and competitions in Latvia, each checked and linked to the official page (in Latvian).',
  },
  callsLink: { lv: 'Skatīt konkursus', en: 'See open calls' },

  faqTitle: { lv: 'Bieži jautājumi', en: 'Questions' },
  faq: [
    {
      q: { lv: 'Vai tiešām bez maksas?', en: 'Is it really free?' },
      a: {
        lv: 'Jā. Bezmaksas plānam ir limiti, un tie nekad nesamazinās. Vēlāk būs arī maksas plāns ar vairāk vietas. Par jebkurām izmaiņām paziņošu 60 dienas iepriekš.',
        en: 'Yes. The free plan has limits, and they never go down. A paid plan with more room comes later. Any change is announced 60 days ahead.',
      },
    },
    {
      q: { lv: 'Kāpēc pirmo publicēšanu pārbaudi pats?', en: 'Why do you check the first publish?' },
      a: {
        lv: 'Visas lapas dzīvo zem protu.lv. Viena krāpnieku lapa var nonākt melnajos sarakstos un sabojāt adresi visiem. Pirmo reizi paskatos pats, parasti 24 stundu laikā. Pēc tam izmaiņas iet tiešsaistē uzreiz.',
        en: 'Every site lives under protu.lv, and one scam page can get the whole domain blocklisted. I look at your first publish myself, usually within 24 hours. After that, changes go live right away.',
      },
    },
    {
      q: { lv: 'Kas var izveidot lapu?', en: 'Who can sign up?' },
      a: {
        lv: 'Ikviens no 16 gadu vecuma: studenti, reflektanti, mākslinieki, dizaineri, arhitekti, mūziķi, rakstnieki.',
        en: 'Anyone aged 16 or over: students, applicants, artists, designers, architects, musicians, writers.',
      },
    },
    {
      q: { lv: 'Vai varu paņemt savus darbus līdzi?', en: 'Can I take my work with me?' },
      a: {
        lv: 'Jā. Konta iestatījumos vari lejupielādēt visu, ko esi ielicis, un dzēst kontu jebkurā brīdī.',
        en: 'Yes. In your account settings you can download everything you added and delete your account at any time.',
      },
    },
    {
      q: { lv: 'Vai var savu domēnu?', en: 'Can I use my own domain?' },
      a: {
        lv: 'Pagaidām nē, adrese ir vārds.protu.lv. Ja vajag lapu ar savu domēnu un dizainu tieši tev, to taisu pēc pasūtījuma.',
        en: 'Not yet, the address is name.protu.lv. If you need your own domain and a design made just for you, I build that to order.',
      },
    },
  ],

  endTitle: { lv: 'Sāc ar vienu projektu. Pārējo pieliksi vēlāk.', en: 'Start with one project. Add the rest later.' },

  customLine: { lv: 'Gribi, lai lapu uztaisu es?', en: 'Want me to build it for you?' },
  customLink: { lv: 'Pakalpojumi', en: 'Services' },
}

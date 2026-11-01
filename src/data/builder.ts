import type { Lang } from '../types'

/** Protu lapas (portfolio veidotājs) dzīvo mans.protu.lv; protu.lv sākumlapa ir tā vitrīna. */
export const BUILDER_URL = 'https://mans.protu.lv'
export const BUILDER_SIGNUP = `${BUILDER_URL}/registreties/`
export const BUILDER_LOGIN = `${BUILDER_URL}/ieiet/`
export const BUILDER_TERMS = `${BUILDER_URL}/noteikumi/`
export const BUILDER_PRIVACY = `${BUILDER_URL}/privatums/`
export const BUILDER_REPORT = `${BUILDER_URL}/zinot/`

type T = Record<Lang, string>

export type Field = {
  name: T
  /** Izskats, ko joma iestata pēc noklusējuma (protu-lapas: portfolio/disciplines.py). */
  look: T
  /** Darba paraksta paraugs, kā to saliek šīs jomas lauki. */
  caption: T
}

/** Īsta Protu lapu izvade ar izdomātu personu un AI ģenerētiem darbiem.
 *  Faili: public/builder/<id>-*.webp (ekrānuzņēmumi), public/piemeri/<id>/ (lapa), public/piemeri/<id>.pdf. */
export type Sample = {
  id: string
  /** Vārds aiz «Protu»: protu gleznot. */
  verb: T
  address: string
  person: string
  look: T
  caption: T
  /** Pieteikuma PDF: lappušu skaits, izmērs un faila lielums, kā tos uzrāda ģenerētais fails. */
  pdfPages: number
  pdfFormat: string
  pdfSize: T
  siteAlt: T
  pdfAlt: T
}

export const builder = {
  samplesLabel: { lv: 'Izvēlies, ko proti', en: 'Pick what you do' },
  protu: { lv: 'Protu', en: 'I can' },
  samples: [
    {
      id: 'marta',
      verb: { lv: 'gleznot', en: 'paint' },
      address: 'marta.protu.lv',
      person: 'Marta Zvirgzde',
      look: { lv: 'Papīrs', en: 'Papīrs (paper)' },
      caption: { lv: 'Kūts martā. Eļļa uz audekla, 80 × 100 cm, 2025', en: 'Oil on canvas, 80 × 100 cm, 2025' },
      pdfPages: 6,
      pdfFormat: 'A4',
      pdfSize: { lv: '1,6 MB', en: '1.6 MB' },
      siteAlt: { lv: 'Piemēra lapa: gleznotājas darbu rinda uz silta papīra toņa', en: 'Sample site: a painter’s works in a row on a warm paper tone' },
      pdfAlt: { lv: 'Piemēra PDF lapa ar sarkanas kūts gleznu un parakstu', en: 'Sample PDF page with a painting of a red barn and its caption' },
    },
    {
      id: 'kriss',
      verb: { lv: 'fotografēt', en: 'photograph' },
      address: 'kriss.protu.lv',
      person: 'Krišs Vītols',
      look: { lv: 'Tumsa', en: 'Tumsa (dark)' },
      caption: { lv: 'Sērija «Krasts», Pāvilosta, 2024, tirāža 5', en: 'Series “Shore”, Pāvilosta, 2024, edition of 5' },
      pdfPages: 6,
      pdfFormat: 'A4',
      pdfSize: { lv: '2,6 MB', en: '2.6 MB' },
      siteAlt: { lv: 'Piemēra lapa: melnbalta krasta fotogrāfija visā platumā uz tumša fona', en: 'Sample site: a full-width black and white coast photo on a dark ground' },
      pdfAlt: { lv: 'Piemēra PDF lapa ar melnbaltu laivas fotogrāfiju', en: 'Sample PDF page with a black and white photo of a boat' },
    },
    {
      id: 'elina',
      verb: { lv: 'projektēt', en: 'design' },
      address: 'elina.protu.lv',
      person: 'Elīna Rudzīte',
      look: { lv: 'Žurnāls', en: 'Žurnāls (magazine)' },
      caption: { lv: 'Māja pie bērziem, Jelgava, 240 m², realizēts', en: 'House by the birches, Jelgava, 240 m², built' },
      pdfPages: 6,
      pdfFormat: 'A3',
      pdfSize: { lv: '3,9 MB', en: '3.9 MB' },
      siteAlt: { lv: 'Piemēra lapa: arhitektes vārds lielos burtos un tumša koka māja', en: 'Sample site: an architect’s name in large type beside a dark timber house' },
      pdfAlt: { lv: 'Piemēra PDF lapa ar tumšu koka māju krēslā', en: 'Sample PDF page with a dark timber house at dusk' },
    },
    {
      id: 'toms',
      verb: { lv: 'rakstīt', en: 'write' },
      address: 'toms.protu.lv',
      person: 'Toms Apinis',
      look: { lv: 'Grāmata', en: 'Grāmata (book)' },
      caption: { lv: 'Klusā osta, tulkojums FR → LV, 2024', en: 'Klusā osta, translated FR → LV, 2024' },
      pdfPages: 3,
      pdfFormat: 'A4',
      pdfSize: { lv: '0,5 MB', en: '0.5 MB' },
      siteAlt: { lv: 'Piemēra lapa: tulkotāja vārds klasiskā burtveidolā un grāmatas vāks', en: 'Sample site: a translator’s name in a classic typeface and a book cover' },
      pdfAlt: { lv: 'Piemēra PDF lapa ar grāmatas vāku', en: 'Sample PDF page with a book cover' },
    },
  ] as Sample[],
  sampleLook: { lv: 'Izskats', en: 'Look' },
  sampleOpenSite: { lv: 'Atvērt piemēra lapu', en: 'Open the sample site' },
  sampleOpenPdf: { lv: 'Atvērt PDF', en: 'Open the PDF' },
  sampleNote: {
    lv: 'Īsta Protu lapu izvade. Persona ir izdomāta, darbi ir ģenerēti ar AI.',
    en: 'Real Protu lapas output. The person is invented and the work is AI-generated.',
  },
  pagesWord: { lv: 'lpp.', en: 'pages' },
  pdfTitle: { lv: 'Tie paši darbi, gatavi iesniegšanai', en: 'The same work, ready to submit' },
  pdfBody: {
    lv: 'Katram pieteikumam izvēlies darbus un secību. PDF tiek pārbaudīts pēc tā, ko prasa konkrētais pieteikums, arī pēc faila lieluma.',
    en: 'For each application, pick the works and their order. The PDF is checked against what that application asks for, including file size.',
  },
  title: {
    lv: 'Portfolio lapa un pieteikuma PDF. Bez maksas.',
    en: 'A portfolio site and an application PDF. Free.',
  },
  lead: {
    lv: 'Ieliec savus darbus vienreiz. No tiem top tava lapa vards.protu.lv un PDF konkursiem, rezidencēm un studiju pieteikumiem, pārbaudīts pēc tā, ko prasa konkrētais pieteikums.',
    en: 'Add your work once. It becomes your site at name.protu.lv and a PDF for open calls, residencies and school applications, checked against what that application asks for. The editor is in Latvian.',
  },
  cta: { lv: 'Izveidot savu lapu', en: 'Create your site' },
  login: { lv: 'Ieiet', en: 'Log in' },
  hasAccount: { lv: 'Man jau ir konts', en: 'I already have an account' },
  note: {
    lv: 'Agrīnā versija. Pirmo publicēšanu pārbaudu pats, parasti 24 stundu laikā.',
    en: 'Early version. I check every first publish myself, usually within 24 hours.',
  },

  looksTitle: { lv: 'Izskats nāk līdzi tavai jomai', en: 'The look comes with your field' },
  looksBody: {
    lv: 'Katra joma sāk ar sev piemērotu izskatu. Vēlāk vari to nomainīt, un darbi paliek tie paši.',
    en: 'Each field starts with a look that suits it. You can change it at any time, and your work stays the same.',
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
        lv: 'Lapa iet tiešsaistē vards.protu.lv. Katram pieteikumam saliec savu darbu komplektu un lejupielādē PDF, CV un JPG paku.',
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
      look: { lv: 'Papīrs', en: 'Papīrs (paper)' },
      caption: { lv: 'Eļļa uz audekla, 80 × 100 cm, 2025', en: 'Oil on canvas, 80 × 100 cm, 2025' },
    },
    {
      name: { lv: 'Fotogrāfija', en: 'Photography' },
      look: { lv: 'Tumsa', en: 'Tumsa (dark)' },
      caption: { lv: 'Sērija «Krasts», Pāvilosta, 2024, tirāža 5', en: 'Series “Shore”, Pāvilosta, 2024, edition of 5' },
    },
    {
      name: { lv: 'Dizains', en: 'Design' },
      look: { lv: 'Žurnāls', en: 'Žurnāls (magazine)' },
      caption: { lv: 'Zīmola identitāte, loma: vadošā dizainere, 2025', en: 'Brand identity, role: lead designer, 2025' },
    },
    {
      name: { lv: 'Arhitektūra', en: 'Architecture' },
      look: { lv: 'Žurnāls', en: 'Žurnāls (magazine)' },
      caption: { lv: 'Dzīvojamā māja, Jelgava, 240 m², realizēts', en: 'Family house, Jelgava, 240 m², built' },
    },
    {
      name: { lv: 'Kino un animācija', en: 'Film and animation' },
      look: { lv: 'Tumsa', en: 'Tumsa (dark)' },
      caption: { lv: 'Stop-motion, 6 min, režisore, 2025', en: 'Stop-motion, 6 min, director, 2025' },
    },
    {
      name: { lv: 'Tekstils un mode', en: 'Textiles and fashion' },
      look: { lv: 'Papīrs', en: 'Papīrs (paper)' },
      caption: { lv: 'Vilna, adījums, kolekcija R/Z 2025', en: 'Wool, knit, AW 2025 collection' },
    },
    {
      name: { lv: 'Mūzika un skaņa', en: 'Music and sound' },
      look: { lv: 'Grāmata', en: 'Grāmata (book)' },
      caption: { lv: 'Kamerkorim, 12 min, pirmatskaņojums Rīgā, 2025', en: 'For chamber choir, 12 min, premiered in Rīga, 2025' },
    },
    {
      name: { lv: 'Rakstniecība un tulkošana', en: 'Writing and translation' },
      look: { lv: 'Grāmata', en: 'Grāmata (book)' },
      caption: { lv: 'Tulkojums no franču, «Dienas Grāmata», 2024', en: 'Translated from French, Dienas Grāmata, 2024' },
    },
  ] as Field[],

  freeTitle: { lv: 'Bezmaksas plānā', en: 'On the free plan' },
  free: [
    { lv: '6 projekti, katrā līdz 15 darbiem', en: '6 projects, up to 15 works each' },
    { lv: '3 pieteikumu komplekti sezonā', en: '3 application sets per season' },
    { lv: 'Tava adrese vards.protu.lv', en: 'Your own address at name.protu.lv' },
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
        lv: 'Pagaidām nē, adrese ir vards.protu.lv. Ja vajag lapu ar savu domēnu un dizainu tieši tev, to taisu pēc pasūtījuma.',
        en: 'Not yet, the address is name.protu.lv. If you need your own domain and a design made just for you, I build that to order.',
      },
    },
  ],

  endTitle: { lv: 'Sāc ar vienu projektu. Pārējo pieliksi vēlāk.', en: 'Start with one project. Add the rest later.' },

  customLine: { lv: 'Gribi, lai lapu uztaisu es?', en: 'Want me to build it for you?' },
  customLink: { lv: 'Pakalpojumi', en: 'Services' },
}

import type { Lang } from '../types'

type Strings = {
  documentTitle: string
  documentDescription: string
  skip: string
  /** Ievadlauka pieejamais nosaukums: "Protu ___". */
  inputLabel: string
  tryHint: string
  /** Kad ierakstītais nesakrīt ne ar vienu prasmi. */
  noMatch: string
  noMatchLink: string
  intro: string
  /** Paskaidro zīmola vārdu tiem, kas nerunā latviski. */
  gloss: string | null
  statusMail: string
  opensNew: string
  provesLabel: string
  works: string
  worksLead: string
  certificates: string
  certificatesLead: string
  langLabel: string
  verify: string
  navLabel: string
  navContact: string
  services: string
  /** Kājenes saišu grupas nosaukums ekrānlasītājiem. */
  footNav: string
  /** Virs formas, kad atnāc no pakalpojuma pieteikuma pogas. */
  contactRequest: string
  contactTopic: string
  topics: { site: string; job: string; other: string }
  caseStudy: string
  backToWork: string
  nextWork: string
  availability: string
  contactTitle: string
  contactLead: string
  /** Virsraksts virs tiešās e-pasta adreses. */
  contactDirect: string
  /** Piezīme, ka pasta serveris ir paša uzstādīts un uzturēts. */
  selfHosted: string
  contactName: string
  contactEmail: string
  contactMessage: string
  contactSend: string
  contactSending: string
  contactSuccess: string
  contactError: string
  previousImage: string
  nextImage: string
  imageOf: string
}

export const ui: Record<Lang, Strings> = {
  lv: {
    documentTitle: 'Valdis Viška · protu.lv',
    documentDescription:
      'Uztaisu mājaslapu no idejas līdz serverim: dizainu, kodu, hostingu un pastu. React, Django, Python, Unity.',
    skip: 'Pāriet uz saturu',
    inputLabel: 'Protu… Ieraksti prasmi, un redzēsi darbu, kas to pierāda',
    tryHint: 'Ieraksti, ko vajag: React, serverus, dizainu, Unity, pastu…',
    noMatch: 'Šo vēl neprotu.',
    noMatchLink: 'Uzraksti, varbūt iemācos.',
    intro: 'Esmu Valdis. Uztaisu mājaslapu no idejas līdz serverim un pēc tam pats to uzturu.',
    gloss: null,
    statusMail: 'pasts uz paša servera',
    opensNew: 'atveras jaunā cilnē',
    provesLabel: 'Ko šis darbs pierāda',
    works: 'Darbi',
    worksLead: 'Klientu vietnes, zinātnes centra eksponāti un viena spēle.',
    certificates: 'Sertifikāti',
    certificatesLead: 'Ko esmu mācījies, ar saiti, kur to pārbaudīt.',
    langLabel: 'Valoda',
    verify: 'Pārbaudīt',
    navLabel: 'Sadaļas',
    navContact: 'Kontakti',
    services: 'Pakalpojumi',
    footNav: 'Saites',
    contactRequest: 'Pieteikums',
    contactTopic: 'Par ko?',
    topics: { site: 'Mājaslapa vai projekts', job: 'Darba piedāvājums', other: 'Cits' },
    caseStudy: 'Gadījuma izpēte',
    backToWork: 'Visi darbi',
    nextWork: 'Nākamais darbs',
    availability: 'Strādāju Latvijā un attālināti.',
    contactTitle: 'Sazināmies',
    contactLead: 'Pastāsti īsi par projektu vai ideju. Atbildu pats.',
    contactDirect: 'Vai raksti tieši',
    selfHosted:
      'Šī adrese darbojas uz mana paša pasta servera. Tas ir Stalwart, ko uzstādīju un uzturu savā VPS, ar SPF, DKIM un DMARC.',
    contactName: 'Vārds',
    contactEmail: 'E-pasts',
    contactMessage: 'Ziņa',
    contactSend: 'Sūtīt ziņu',
    contactSending: 'Sūta…',
    contactSuccess: 'Paldies! Ziņa ir nosūtīta.',
    contactError: 'Ziņu neizdevās nosūtīt. Lūdzu, mēģini vēlreiz vai raksti e-pastu.',
    previousImage: 'Iepriekšējais attēls',
    nextImage: 'Nākamais attēls',
    imageOf: 'Attēls',
  },
  en: {
    documentTitle: 'Valdis Viška · protu.lv',
    documentDescription:
      'I build websites from the idea to the server: design, code, hosting and email. React, Django, Python, Unity.',
    skip: 'Skip to content',
    inputLabel: 'Protu… Type a skill to see the work that proves it',
    tryHint: 'Type what you need: React, servers, design, Unity, email…',
    noMatch: 'Don’t know that one yet.',
    noMatchLink: 'Tell me, maybe I’ll learn it.',
    intro: 'I’m Valdis. I build a website from the idea to the server, then keep it running myself.',
    gloss: '“protu” is Latvian for “I know how to”',
    statusMail: 'mail on my own server',
    opensNew: 'opens in a new tab',
    provesLabel: 'What this work proves',
    works: 'Work',
    worksLead: 'Client sites, science-centre exhibits and one game.',
    certificates: 'Certificates',
    certificatesLead: 'What I’ve studied, each with a link to verify it.',
    langLabel: 'Language',
    verify: 'Verify',
    navLabel: 'Sections',
    navContact: 'Contact',
    services: 'Services',
    footNav: 'Links',
    contactRequest: 'Request',
    contactTopic: 'What about?',
    topics: { site: 'Website or project', job: 'Job opportunity', other: 'Something else' },
    caseStudy: 'Case study',
    backToWork: 'All work',
    nextWork: 'Next project',
    availability: 'Working in Latvia and remotely.',
    contactTitle: 'Let’s talk',
    contactLead: 'Tell me a little about the project or idea. I answer myself.',
    contactDirect: 'Or write directly',
    selfHosted:
      'This address runs on my own mail server: Stalwart, which I set up and maintain on my VPS, with SPF, DKIM and DMARC.',
    contactName: 'Name',
    contactEmail: 'Email',
    contactMessage: 'Message',
    contactSend: 'Send message',
    contactSending: 'Sending…',
    contactSuccess: 'Thanks, your message has been sent.',
    contactError: 'The message could not be sent. Please try again or email directly.',
    previousImage: 'Previous image',
    nextImage: 'Next image',
    imageOf: 'Image',
  },
}

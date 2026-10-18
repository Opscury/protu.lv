import type { Lang } from '../types'

type Strings = {
  documentTitle: string
  documentDescription: string
  eyebrow: string
  heroTitle: string
  heroLead: string
  workCta: string
  emailCta: string
  panelHint: string
  skillsLabel: string
  lead: string
  /** Paskaidro zīmola vārdu tiem, kas nerunā latviski. */
  gloss: string | null
  works: string
  certificates: string
  langLabel: string
  verify: string
  navLabel: string
  navContact: string
  contactTopic: string
  topics: { site: string; job: string; other: string }
  scope: string
  contribution: string
  outcome: string
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
    documentTitle: 'Valdis Viška — interaktīvu lietu izstrādātājs',
    documentDescription:
      'Interaktīvu pieredžu izstrādātājs: React, TypeScript, Django, Python, Unity, C# un UX.',
    eyebrow: 'Interaktīvu pieredžu izstrādātājs',
    heroTitle: 'Veidoju pieredzes, kurās cilvēki piedalās.',
    heroLead:
      'No zinātnes centra eksponātiem līdz digitāliem produktiem — savienoju tehnisku precizitāti ar saprotamu lietotāja pieredzi.',
    workCta: 'Skatīt atlasītos darbus',
    emailCta: 'Sazināties par iespējām',
    panelHint: 'Nospied, lai pabeigtu teikumu',
    skillsLabel: 'Tehniskie virzieni',
    lead:
      'Veidoju interaktīvas lietas — no zinātnes centra eksponātiem ' +
      'līdz mobilajām spēlēm un mājaslapām.',
    gloss: null,
    works: 'Darbi',
    certificates: 'Sertifikāti',
    langLabel: 'Valoda',
    verify: 'Pārbaudīt īstumu',
    navLabel: 'Sadaļas',
    navContact: 'Kontakti',
    contactTopic: 'Par ko?',
    topics: { site: 'Mājaslapa vai projekts', job: 'Darba piedāvājums', other: 'Cits' },
    scope: 'Apjoms',
    contribution: 'Mans ieguldījums',
    outcome: 'Rezultāts',
    caseStudy: 'Gadījuma izpēte',
    backToWork: 'Visi darbi',
    nextWork: 'Nākamais darbs',
    availability: 'Atvērts jaunām iespējām Latvijā un attālināti.',
    contactTitle: 'Sazināmies',
    contactLead: 'Pastāsti īsi par iespēju, komandu vai projektu.',
    contactDirect: 'Vai raksti tieši',
    selfHosted:
      'Šī adrese darbojas uz mana paša pasta servera — Stalwart, ko pats uzstādīju un uzturu savā VPS, ar SPF, DKIM un DMARC.',
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
    documentTitle: 'Valdis Viška — interactive developer',
    documentDescription:
      'Interactive-experience developer working across React, TypeScript, Django, Python, Unity, C# and UX.',
    eyebrow: 'Interactive-experience developer',
    heroTitle: 'I build experiences people can take part in.',
    heroLead:
      'From science-centre exhibits to digital products, I combine technical craft with clear user experience.',
    workCta: 'View selected work',
    emailCta: 'Discuss an opportunity',
    panelHint: 'Press to complete the sentence',
    skillsLabel: 'Technical directions',
    lead:
      'I build interactive things — science centre exhibits, ' +
      'mobile games and websites.',
    gloss: '“protu” — Latvian for “I know how to”',
    works: 'Work',
    certificates: 'Certificates',
    langLabel: 'Language',
    verify: 'Verify credential',
    navLabel: 'Sections',
    navContact: 'Contact',
    contactTopic: 'What about?',
    topics: { site: 'Website or project', job: 'Job opportunity', other: 'Something else' },
    scope: 'Scope',
    contribution: 'My contribution',
    outcome: 'Outcome',
    caseStudy: 'Case study',
    backToWork: 'All work',
    nextWork: 'Next project',
    availability: 'Open to opportunities in Latvia and remotely.',
    contactTitle: 'Let’s talk',
    contactLead: 'Tell me a little about the opportunity, team or project.',
    contactDirect: 'Or write directly',
    selfHosted:
      'This address runs on my own mail server — Stalwart, set up and maintained by me on my own VPS, with SPF, DKIM and DMARC.',
    contactName: 'Name',
    contactEmail: 'Email',
    contactMessage: 'Message',
    contactSend: 'Send message',
    contactSending: 'Sending…',
    contactSuccess: 'Thank you — your message has been sent.',
    contactError: 'The message could not be sent. Please try again or email directly.',
    previousImage: 'Previous image',
    nextImage: 'Next image',
    imageOf: 'Image',
  },
}

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
  selectedWorkNote: string
  sideProject: string
  sideProjectLink: string
  scope: string
  contribution: string
  outcome: string
  caseStudy: string
  availability: string
  contactTitle: string
  contactLead: string
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
    selectedWorkNote:
      'Divi dokumentēti darbi. Vēl citiem tiek gatavoti publicējami stāsti.',
    sideProject:
      'Blakus darbam — «Vecās Varas», īss point-and-click gabals par ' +
      'latviešu folkloru. Phaser 3 un TypeScript, spēlējams pārlūkā.',
    sideProjectLink: 'Spēlēt',
    scope: 'Apjoms',
    contribution: 'Mans ieguldījums',
    outcome: 'Rezultāts',
    caseStudy: 'Gadījuma izpēte',
    availability: 'Atvērts jaunām iespējām Latvijā un attālināti.',
    contactTitle: 'Sazināmies',
    contactLead: 'Pastāsti īsi par iespēju, komandu vai projektu.',
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
    selectedWorkNote:
      'Two documented projects so far. Further publishable case studies are being prepared.',
    sideProject:
      'On the side — Vecās Varas, a short point-and-click piece drawn from ' +
      'Latvian folklore. Phaser 3 and TypeScript, playable in the browser.',
    sideProjectLink: 'Play it',
    scope: 'Scope',
    contribution: 'My contribution',
    outcome: 'Outcome',
    caseStudy: 'Case study',
    availability: 'Open to opportunities in Latvia and remotely.',
    contactTitle: 'Let’s talk',
    contactLead: 'Tell me a little about the opportunity, team or project.',
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

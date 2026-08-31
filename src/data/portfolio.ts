import type { Certificate, Project, Skill } from '../types'

export const skills: Skill[] = [
  {
    id: 'react',
    label: 'React',
    note: {
      lv: 'Komponentes, hooks, stāvokļa pārvaldība',
      en: 'Components, hooks, state management',
    },
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    note: {
      lv: 'Tipizēti dati — kļūdas pamana redaktors, nevis lietotājs',
      en: 'Typed data — the editor catches mistakes, not the user',
    },
  },
  {
    id: 'unity',
    label: 'Unity',
    note: {
      lv: 'Interaktīvas instalācijas un mobilās spēles',
      en: 'Interactive installations and mobile games',
    },
  },
  {
    id: 'csharp',
    label: 'C#',
    note: {
      lv: 'Spēļu loģika, eksponātu vadība, iekšējie rīki',
      en: 'Game logic, exhibit control, internal tools',
    },
  },
  {
    id: 'uiux',
    label: 'UI/UX',
    note: {
      lv: 'Lietotāju izpēte, prototipi Figma, lietojamības testi',
      en: 'User research, Figma prototypes, usability testing',
    },
  },
  {
    id: 'css',
    label: 'CSS',
    note: {
      lv: 'Izkārtojumi, animācijas, pieejamība',
      en: 'Layouts, animation, accessibility',
    },
  },
]

export const projects: Project[] = [
  {
    id: 'vizium',
    title: 'VIZIUM',
    role: {
      lv: 'Unity izstrādātājs · OVERLY',
      en: 'Unity developer · OVERLY',
    },
    place: 'Ventspils',
    period: '2022',
    summary: {
      lv:
        'Interaktīvo eksponātu izstrāde Ventspils zinātnes centram VIZIUM.',
      en:
        'Interactive exhibit development for the VIZIUM science centre in Ventspils.',
    },
    scope: {
      lv: 'Vairākas tehnoloģiskas instalācijas zinātnes centra ekspozīcijās.',
      en: 'Multiple technology-led installations within a science-centre exhibition.',
    },
    contribution: [
      {
        lv: 'Strādāju OVERLY programmēšanas komandā pie Unity un C# risinājumiem.',
        en: 'Worked within OVERLY’s programming team on Unity and C# solutions.',
      },
      {
        lv: 'Savienoju multimediju projekcijas, simulatorus un interaktīvas saskarnes.',
        en: 'Brought together multimedia projections, simulators and interactive interfaces.',
      },
      {
        lv: 'Veidoju risinājumus eksponātiem par fiziku, matemātiku un viedajām tehnoloģijām.',
        en: 'Built for exhibits spanning physics, mathematics and smart technology.',
      },
    ],
    outcome: {
      lv: 'Apmeklētājiem paredzētas instalācijas kļuva par daļu no VIZIUM daudznozaru ekspozīcijas.',
      en: 'Visitor-facing installations became part of VIZIUM’s multidisciplinary exhibition.',
    },
    tags: [
      { lv: 'Unity', en: 'Unity' },
      { lv: 'C#', en: 'C#' },
      { lv: 'Interaktīvās instalācijas', en: 'Interactive installations' },
      { lv: 'Multimediji', en: 'Multimedia' },
    ],
    images: [
      {
        src: 'https://www.dja.lv/img/projects/vizium-10.jpg',
        alt: { lv: 'VIZIUM ekspozīcijas interjers', en: 'VIZIUM exhibition interior' },
      },
      {
        src: 'https://www.dja.lv/img/projects/vizium-15.jpg',
        alt: { lv: 'Interaktīvs eksponāts VIZIUM centrā', en: 'Interactive exhibit at VIZIUM' },
      },
      {
        src: 'https://www.dja.lv/img/projects/vizium-12.jpg',
        alt: { lv: 'VIZIUM zinātnes centra instalācija', en: 'Installation at the VIZIUM science centre' },
      },
      {
        src: 'https://www.dja.lv/img/projects/vizium-17.jpg',
        alt: { lv: 'Apmeklētāji VIZIUM ekspozīcijā', en: 'Visitors in the VIZIUM exhibition' },
      },
    ],
    links: [
      {
        label: { lv: 'Projekta apraksts', en: 'Project overview' },
        href: 'https://www.dja.lv/projects/vizium/',
      },
    ],
  },
]

export const certificates: Certificate[] = [
  {
    id: 'google-ux',
    title: 'Google UX Design',
    issuer: 'Google · Coursera',
    issued: '2026',
    summary: {
      lv:
        'Septiņu kursu programma: UX pamati, lietotāju izpēte, ' +
        'wireframing, augstas detalizācijas prototipi Figma, ' +
        'lietojamības testēšana un dinamisku saskarņu veidošana.',
      en:
        'A seven-course programme: UX foundations, user research, ' +
        'wireframing, high-fidelity prototyping in Figma, usability ' +
        'testing and building dynamic user interfaces.',
    },
    credentialUrl:
      'https://coursera.org/verify/professional-cert/AFX29DBDVPIG',
  },
]

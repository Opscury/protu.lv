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
    id: 'django',
    label: 'Django',
    note: {
      lv: 'REST API, datubāzes un admin panelis, ko saprot arī klients',
      en: 'REST APIs, databases and an admin panel the client can actually use',
    },
  },
  {
    id: 'python',
    label: 'Python',
    note: {
      lv: 'Servera loģika, datu apstrāde, skripti',
      en: 'Server logic, data handling, scripts',
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
  {
    id: 'uiux',
    label: 'UI/UX',
    note: {
      lv: 'Lietotāju izpēte, prototipi Figma, lietojamības testi',
      en: 'User research, Figma prototypes, usability testing',
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
        src: '/work/vizium/vizium-10.webp',
        alt: { lv: 'VIZIUM ekspozīcijas interjers', en: 'VIZIUM exhibition interior' },
      },
      {
        src: '/work/vizium/vizium-15.webp',
        alt: { lv: 'Interaktīvs eksponāts VIZIUM centrā', en: 'Interactive exhibit at VIZIUM' },
      },
      {
        src: '/work/vizium/vizium-12.webp',
        alt: { lv: 'VIZIUM zinātnes centra instalācija', en: 'Installation at the VIZIUM science centre' },
      },
      {
        src: '/work/vizium/vizium-17.webp',
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
    id: 'meta-backend',
    title: 'Meta Back-End Developer',
    issuer: 'Meta · Coursera',
    issued: '2026',
    summary: {
      lv:
        'Deviņu kursu programma: Python programmēšana, versiju kontrole ' +
        'ar Git, relāciju datubāzes un SQL, Django ietvars, REST API ' +
        'ar Django REST Framework, pilna steka savienošana, noslēguma ' +
        'projekts un sagatavošanās tehniskajām intervijām.',
      en:
        'A nine-course programme: programming in Python, version control ' +
        'with Git, relational databases and SQL, the Django framework, ' +
        'REST APIs with Django REST Framework, wiring up the full stack, ' +
        'a back-end capstone and coding interview preparation.',
    },
    credentialUrl:
      'https://coursera.org/share/9ebbee4c7908cba52f62fa4c6fa9bff7',
  },
  {
    id: 'meta-fullstack',
    title: 'Meta Full Stack Developer',
    issuer: 'Meta · Coursera',
    issued: '2026',
    summary: {
      lv:
        'Desmit kursu specializācija no priekšgala līdz serverim: ' +
        'HTML, CSS un JavaScript, React un Advanced React, Python, ' +
        'datubāzes, Django tīmekļa lietotnes ar lietotāju autentifikāciju ' +
        'un API izstrāde.',
      en:
        'A ten-course specialisation from front end to server: HTML, ' +
        'CSS and JavaScript, React and Advanced React, Python, databases, ' +
        'Django web apps with user authentication and building APIs.',
    },
    credentialUrl:
      'https://coursera.org/share/6da3254ec4620620034db2e7ad690579',
  },
  {
    id: 'meta-frontend',
    title: 'Meta Front-End Developer',
    issuer: 'Meta · Coursera',
    issued: '2026',
    summary: {
      lv:
        'Deviņu kursu programma: HTML un CSS padziļināti, ' +
        'JavaScript programmēšana, versiju kontrole ar Git, ' +
        'React no pamatiem līdz hooks, konteksta un testu rakstīšanai, ' +
        'UX/UI principi un noslēguma projekts.',
      en:
        'A nine-course programme: HTML and CSS in depth, programming ' +
        'with JavaScript, version control with Git, React from the ' +
        'basics through hooks, context and testing, UX/UI principles ' +
        'and a front-end capstone build.',
    },
    credentialUrl:
      'https://coursera.org/share/7d9e174663e34cb190619a8da36cc664',
  },
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

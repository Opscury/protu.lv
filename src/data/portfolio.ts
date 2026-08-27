import type { Certificate, Project, Skill } from '../types'

export const skills: Skill[] = [
  {
    id: 'react',
    label: 'React',
    note: 'Komponentes, hooks, stāvokļa pārvaldība',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    note: 'Tipizēti dati, kļūdas pamana redaktors, nevis lietotājs',
  },
  {
    id: 'unity',
    label: 'Unity',
    note: 'Interaktīvas instalācijas un mobilās spēles',
  },
  {
    id: 'csharp',
    label: 'C#',
    note: 'Spēļu loģika, eksponātu vadība, iekšējie rīki',
  },
  {
    id: 'uiux',
    label: 'UI/UX',
    note: 'Lietotāju izpēte, prototipi Figma, lietojamības testi',
  },
  {
    id: 'css',
    label: 'CSS',
    note: 'Izkārtojumi, animācijas, pieejamība',
  },
]

export const projects: Project[] = [
  {
    id: 'vizium',
    title: 'VIZIUM',
    role: 'Unity izstrādātājs · OVERLY',
    place: 'Ventspils',
    period: '2022',
    summary:
      'Interaktīvo eksponātu izstrāde Ventspils zinātnes centram. ' +
      'OVERLY programmēšanas komandā strādāju pie vairākām ' +
      'tehnoloģiskām instalācijām, kas apvieno multimediju ' +
      'projekcijas, simulatorus un interaktīvas saskarnes. ' +
      'Ekspozīciju veido vairākas galerijas — no fizikas un ' +
      'matemātikas līdz viedajām tehnoloģijām un cilvēka pašizjūtai.',
    tags: ['Unity', 'C#', 'Interaktīvās instalācijas', 'Multimediji'],
    links: [
      {
        label: 'Projekta apraksts',
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
    summary:
      'Septiņu kursu programma: UX pamati, lietotāju izpēte, ' +
      'wireframing, augstas detalizācijas prototipi Figma, ' +
      'lietojamības testēšana un dinamisku saskarņu veidošana.',
    credentialUrl:
      'https://coursera.org/verify/professional-cert/AFX29DBDVPIG',
  },
]

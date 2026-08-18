import type { Certificate, Project } from '../types'

export const projects: Project[] = [
  {
    id: 'vizium',
    title: 'VIZIUM',
    role: 'Unity izstrādātājs · OVERLY',
    period: '2022',
    summary:
      'Interaktīvo eksponātu izstrāde Ventspils zinātnes centram VIZIUM. ' +
      'Kā Unity izstrādātājs OVERLY komandā strādāju pie vairākām ' +
      'tehnoloģiskām instalācijām, kas apvieno multimediju projekcijas, ' +
      'simulatorus un interaktīvas saskarnes. Ekspozīciju veido vairākas ' +
      'galerijas — no fizikas un matemātikas līdz viedajām tehnoloģijām ' +
      'un cilvēka pašizjūtai.',
    tags: ['Unity', 'C#', 'Interaktīvās instalācijas', 'Multimediji'],
    links: [
      {
        label: 'Projekta apraksts (DJA)',
        href: 'https://www.dja.lv/projects/vizium/',
      },
    ],
  },
]

export const certificates: Certificate[] = [
  {
    id: 'google-ux',
    title: 'Google UX Design Professional Certificate',
    issuer: 'Google · Coursera',
    issued: '2026. gada jūlijs',
    summary:
      'Septiņu kursu programma: UX pamati, lietotāju izpēte, ' +
      'wireframing un zemas detalizācijas prototipi, augstas ' +
      'detalizācijas dizains un prototipēšana Figma, lietojamības ' +
      'testēšana, kā arī dinamisku lietotāja saskarņu veidošana ' +
      'tīmekļa vietnēm.',
    credentialUrl:
      'https://coursera.org/verify/professional-cert/AFX29DBDVPIG',
  },
]

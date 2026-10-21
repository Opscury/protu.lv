import type { Localized } from '../types'

/**
 * "Protu ___" — ko protu, un kurš darbs to pierāda.
 * Katrai prasmei: vārds, ko ieraksta ievadlaukā (lv/en), sinonīmi, ko
 * apmeklētājs varētu rakstīt pats, un pierādījumi — viens teikums uz
 * katru darbu, kas šo prasmi parāda.
 */

export type NodeId = 'silva' | 'anda' | 'vizium' | 'senciems' | 'mail'

export type Skill = {
  id: string
  word: Localized
  /** Mazajiem burtiem, bez garumzīmēm — salīdzina pēc prefiksa. */
  aliases: string[]
  proof: Partial<Record<NodeId, Localized>>
}

export const skills: Skill[] = [
  {
    id: 'react',
    word: { lv: 'React', en: 'React' },
    aliases: ['react', 'reactjs', 'frontend', 'front-end', 'jsx'],
    proof: {
      silva: { lv: 'Silva · React + paša admin panelis', en: 'Silva · React + custom admin' },
    },
  },
  {
    id: 'servers',
    word: { lv: 'serverus', en: 'servers' },
    aliases: ['serveri', 'serverus', 'serveris', 'server', 'servers', 'vps', 'hostings', 'hosting', 'linux', 'devops'],
    proof: {
      silva: { lv: 'Silva · uz mana VPS', en: 'Silva · on my own VPS' },
      anda: { lv: 'Anda · uz mana servera', en: 'Anda · on my server' },
      mail: { lv: 'paša pasta serveris', en: 'my own mail server' },
    },
  },
  {
    id: 'django',
    word: { lv: 'Django', en: 'Django' },
    aliases: ['django', 'backend', 'back-end', 'api', 'rest'],
    proof: {
      silva: { lv: 'Silva · Django admin bez instrukcijas', en: 'Silva · Django admin, no manual needed' },
    },
  },
  {
    id: 'design',
    word: { lv: 'dizainu', en: 'design' },
    aliases: ['dizains', 'dizainu', 'design', 'figma', 'ui', 'ux', 'uiux'],
    proof: {
      anda: { lv: 'Anda · no Canva uz savu domēnu', en: 'Anda · Canva → her own domain' },
      silva: { lv: 'Silva · admin bez instrukcijas', en: 'Silva · admin with no manual' },
    },
  },
  {
    id: 'unity',
    word: { lv: 'Unity', en: 'Unity' },
    aliases: ['unity', 'c#', 'csharp', 'c sharp', 'eksponati', 'exhibits', 'instalacijas', 'installations'],
    proof: {
      vizium: { lv: 'VIZIUM · eksponāti ar OVERLY', en: 'VIZIUM · exhibits, with OVERLY' },
    },
  },
  {
    id: 'mail',
    word: { lv: 'pastu', en: 'email' },
    aliases: ['pasts', 'pastu', 'epasts', 'e-pasts', 'mail', 'email', 'e-mail', 'smtp', 'dkim', 'spf', 'dmarc', 'stalwart'],
    proof: {
      mail: { lv: 'SPF · DKIM · DMARC', en: 'SPF · DKIM · DMARC' },
    },
  },
  {
    id: 'typescript',
    word: { lv: 'TypeScript', en: 'TypeScript' },
    aliases: ['typescript', 'ts', 'javascript', 'js', 'phaser'],
    proof: {
      senciems: { lv: 'Senciems · Phaser 3 + TypeScript', en: 'Senciems · Phaser 3 + TypeScript' },
    },
  },
  {
    id: 'python',
    word: { lv: 'Python', en: 'Python' },
    aliases: ['python', 'py'],
    proof: {
      silva: { lv: 'Silva · Python + Django serveris', en: 'Silva · Python + Django back end' },
    },
  },
  {
    id: 'css',
    word: { lv: 'CSS', en: 'CSS' },
    aliases: ['css', 'html', 'html5', 'sass', 'layout'],
    proof: {
      anda: { lv: 'Anda · tīrs HTML, CSS, JS', en: 'Anda · plain HTML, CSS, JS' },
      silva: { lv: 'Silva · katram ekrānam', en: 'Silva · fits every screen' },
    },
  },
  {
    id: 'games',
    word: { lv: 'spēles', en: 'games' },
    aliases: ['speles', 'spele', 'games', 'game', 'gamedev'],
    proof: {
      senciems: { lv: 'Senciems · spēle pārlūkā', en: 'Senciems · a browser game' },
    },
  },
]

/** Automātiskās rakstīšanas secība: plašākais pierādījums vispirms. */
export const cycle = ['react', 'servers', 'django', 'design', 'unity', 'mail', 'typescript']

const fold = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()

/** Atrod prasmi pēc ievadītā teksta: precīzs vārds vai sinonīma sākums. */
export function findSkill(input: string): Skill | null {
  const q = fold(input)
  if (q.length < 2) return null
  return (
    skills.find((s) => fold(s.word.lv) === q || fold(s.word.en) === q || s.aliases.includes(q)) ??
    skills.find((s) => s.aliases.some((a) => a.startsWith(q))) ??
    null
  )
}

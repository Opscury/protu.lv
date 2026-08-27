export type Link = {
  label: string
  href: string
}

export type Skill = {
  id: string
  label: string
  /** Ko tieši es ar to daru — parādās vadības panelī. */
  note: string
}

export type Project = {
  id: string
  title: string
  role: string
  place: string
  period: string
  summary: string
  tags: string[]
  links?: Link[]
}

export type Certificate = {
  id: string
  title: string
  issuer: string
  issued: string
  summary: string
  credentialUrl?: string
}

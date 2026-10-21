export type Lang = 'lv' | 'en'

/** Teksts abās valodās. Ja kāda trūkst, TypeScript nekompilēsies. */
export type Localized = Record<Lang, string>

export type Link = {
  label: Localized
  href: string
}

export type ProjectImage = {
  src: string
  alt: Localized
}

export type Project = {
  id: string
  title: string
  role: Localized
  place: string
  period: string
  summary: Localized
  scope: Localized
  contribution: Localized[]
  outcome: Localized
  tags: Localized[]
  images?: ProjectImage[]
  links?: Link[]
}

export type Certificate = {
  id: string
  title: string
  issuer: string
  issued: string
  summary: Localized
  credentialUrl?: string
}

export type Link = {
  label: string
  href: string
}

export type Project = {
  id: string
  title: string
  role: string
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

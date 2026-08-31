import type { Certificate, Lang } from '../types'

type Props = {
  certificate: Certificate
  lang: Lang
  verifyLabel: string
}

function CertificateCard({ certificate, lang, verifyLabel }: Props) {
  return (
    <article className="plaque">
      <h3 className="plaque-title">{certificate.title}</h3>

      <dl className="plaque-spec">
        <dt className="sr-only">Issuer</dt>
        <dd>{certificate.issuer}</dd>
        <dt className="sr-only">Year</dt>
        <dd>{certificate.issued}</dd>
      </dl>

      <p className="plaque-body">{certificate.summary[lang]}</p>

      {certificate.credentialUrl && (
        <ul className="plaque-links">
          <li>
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noreferrer"
            >
              {verifyLabel}
            </a>
          </li>
        </ul>
      )}
    </article>
  )
}

export default CertificateCard

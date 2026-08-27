import type { Certificate } from '../types'

type Props = {
  certificate: Certificate
}

function CertificateCard({ certificate }: Props) {
  return (
    <article className="plaque">
      <h3 className="plaque-title">{certificate.title}</h3>

      <dl className="plaque-spec">
        <dt className="sr-only">Izsniedzējs</dt>
        <dd>{certificate.issuer}</dd>
        <dt className="sr-only">Gads</dt>
        <dd>{certificate.issued}</dd>
      </dl>

      <p className="plaque-body">{certificate.summary}</p>

      {certificate.credentialUrl && (
        <ul className="plaque-links">
          <li>
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noreferrer"
            >
              Pārbaudīt īstumu
            </a>
          </li>
        </ul>
      )}
    </article>
  )
}

export default CertificateCard

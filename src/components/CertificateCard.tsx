import type { Certificate } from '../types'

type Props = {
  certificate: Certificate
}

function CertificateCard({ certificate }: Props) {
  return (
    <article className="card">
      <header className="card-head">
        <h3 className="card-title">{certificate.title}</h3>
        <p className="card-meta">
          {certificate.issuer} · {certificate.issued}
        </p>
      </header>

      <p className="card-body">{certificate.summary}</p>

      {certificate.credentialUrl && (
        <ul className="card-links">
          <li>
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noreferrer"
            >
              Apskatīt sertifikātu
            </a>
          </li>
        </ul>
      )}
    </article>
  )
}

export default CertificateCard

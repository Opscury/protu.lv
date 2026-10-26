import { formatPrice, serviceHref, services, servicesPage } from '../data/services'
import { onLinkClick } from '../router'
import type { Lang } from '../types'
import '../services.css'

type Props = { lang: Lang }

/** /pakalpojumi/: kartīte katram pakalpojumam ar vienu teikumu un cenu. */
function ServicesOverview({ lang }: Props) {
  const t = servicesPage

  return (
    <article className="svc">
      <header className="svc-head">
        <h1 className="svc-title">{t.title[lang]}</h1>
        <p className="svc-lead">{t.lead[lang]}</p>
      </header>

      <ul className="svc-cards">
        {services.map((service) => (
          <li key={service.slug} className="svc-card">
            <h2>
              <a href={serviceHref(service.slug)} onClick={onLinkClick}>
                {service.name[lang]}
              </a>
            </h2>
            <p>{service.pitch[lang]}</p>
            <p className="svc-card-price">{formatPrice(service.cardPrice, lang)}</p>
            <span className="svc-card-more" aria-hidden="true">{t.see[lang]}</span>
          </li>
        ))}
      </ul>

      <section className="svc-section" aria-labelledby="svc-principles">
        <h2 id="svc-principles">{t.principlesTitle[lang]}</h2>
        <ul className="svc-principles">
          {t.principles.map((p) => (
            <li key={p.title.en}>
              <h3>{p.title[lang]}</h3>
              <p>{p.body[lang]}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

export default ServicesOverview

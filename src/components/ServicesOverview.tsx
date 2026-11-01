import { formatPrice, serviceHref, services, servicesPage } from '../data/services'
import { onLinkClick } from '../router'
import type { Lang } from '../types'
import '../services.css'

type Props = { lang: Lang; under?: boolean; eyebrow?: string }

/** /pakalpojumi/: kartīte katram pakalpojumam ar vienu teikumu un cenu.
 *  under: sākumlapā zem portfolio veidotāja, tāpēc h2, nevis lapas h1. */
function ServicesOverview({ lang, under = false, eyebrow }: Props) {
  const t = servicesPage
  const Title = under ? 'h2' : 'h1'

  return (
    <article className={under ? 'svc svc-under' : 'svc'} id={under ? 'pakalpojumi' : undefined}>
      <header className="svc-head">
        {eyebrow && <p className="bld-eyebrow">{eyebrow}</p>}
        <Title className="svc-title">{t.title[lang]}</Title>
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

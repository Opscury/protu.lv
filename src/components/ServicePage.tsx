import { Fragment } from 'react'
import {
  formatPrice,
  portfolioExample,
  serviceHref,
  services,
  servicesPage,
  SERVICES_PATH,
  type Price,
  type Service,
} from '../data/services'
import { onLinkClick } from '../router'
import type { Lang } from '../types'
import '../services.css'

type Props = {
  service: Service
  lang: Lang
  /** Pieteikuma poga: forma lapas apakšā saņem izvēlēto plānu. */
  onRequest: (planId: string) => void
}

/** Cena ar mazu "no" un "/mēn", lai skaitlis ir tas, ko redz pirmo. */
function PriceTag({ price, lang }: { price: Price; lang: Lang }) {
  return (
    <p className="svc-price">
      {price.from && <span className="svc-price-small">{lang === 'lv' ? 'no ' : 'from '}</span>}
      {price.parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="svc-price-small"> + </span>}
          <span className="svc-price-amount">€{part.amount}</span>
          {part.monthly && <span className="svc-price-small">{lang === 'lv' ? '/mēn' : '/month'}</span>}
        </Fragment>
      ))}
    </p>
  )
}

function ServicePage({ service, lang, onRequest }: Props) {
  const t = servicesPage
  const next = services[(services.indexOf(service) + 1) % services.length]
  const id = (part: string) => `${service.slug}-${part}`

  return (
    <article className="svc">
      <header className="svc-head">
        <h1 className="svc-title">{service.name[lang]}</h1>
        <p className="svc-lead">{service.lead[lang]}</p>
        <p className="svc-from">{formatPrice(service.cardPrice, lang)}</p>
      </header>

      <section className="svc-section" aria-labelledby={id('for')}>
        <h2 id={id('for')}>{t.audienceTitle[lang]}</h2>
        <ul className="svc-list">
          {service.audience.map((item) => <li key={item.en}>{item[lang]}</li>)}
        </ul>
      </section>

      <section className="svc-section" aria-labelledby={id('includes')}>
        <h2 id={id('includes')}>{t.includesTitle[lang]}</h2>
        <ul className="svc-checks">
          {service.includes.map((item) => <li key={item.en}>{item[lang]}</li>)}
        </ul>
      </section>

      {service.honest && (
        <section className="svc-section" aria-labelledby={id('honest')}>
          <h2 id={id('honest')}>{service.honest.title[lang]}</h2>
          <p className="svc-honest">{service.honest.body[lang]}</p>
        </section>
      )}

      <section className="svc-section svc-section-price" id="cena" aria-labelledby={id('price')}>
        <h2 id={id('price')}>{t.priceTitle[lang]}</h2>
        <div>
          <ul className="svc-plans">
            {service.plans.map((plan) => (
              <li key={plan.id} className="svc-plan">
                <h3>{plan.name[lang]}</h3>
                <p className="svc-plan-solves">{plan.solves[lang]}</p>
                <PriceTag price={plan.price} lang={lang} />
                {plan.priceNote && <p className="svc-plan-note">{plan.priceNote[lang]}</p>}
                <ul className="svc-checks svc-checks-tight">
                  {plan.includes.map((item) => <li key={item.en}>{item[lang]}</li>)}
                </ul>
                <a
                  className="action action-primary svc-cta"
                  href="#contact"
                  onClick={() => onRequest(plan.id)}
                  data-umami-event={`cta-${service.slug}`}
                  data-umami-event-plan={plan.id}
                >
                  {plan.cta[lang]}
                </a>
              </li>
            ))}
          </ul>
          <p className="svc-cta-note">{t.ctaNote[lang]}</p>
        </div>
      </section>

      {service.slug === 'portfolio' && (
        <section className="svc-section" aria-labelledby={id('example')}>
          <h2 id={id('example')}>{portfolioExample.title[lang]}</h2>
          <div className="svc-example">
            <a className="svc-example-media" href={portfolioExample.caseHref} onClick={onLinkClick} tabIndex={-1} aria-hidden="true">
              <img
                src={portfolioExample.image}
                alt=""
                width={1440}
                height={900}
                loading="lazy"
                decoding="async"
              />
            </a>
            <div>
              <p>{portfolioExample.body[lang]}</p>
              <ul className="plaque-links">
                <li>
                  <a href={portfolioExample.caseHref} onClick={onLinkClick}>
                    {portfolioExample.caseLink[lang]}
                  </a>
                </li>
                <li>
                  <a href={portfolioExample.liveHref} target="_blank" rel="noreferrer">
                    {portfolioExample.liveLink[lang]}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="svc-section" aria-labelledby={id('steps')}>
        <h2 id={id('steps')}>{t.stepsTitle[lang]}</h2>
        <ol className="svc-steps">
          {service.steps.map((step) => (
            <li key={step.title.en}>
              <h3>{step.title[lang]}</h3>
              <p>{step.body[lang]}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="svc-section" aria-labelledby={id('faq')}>
        <h2 id={id('faq')}>{t.faqTitle[lang]}</h2>
        <div className="svc-faq">
          {service.faqs.map((faq) => (
            <details key={faq.q.en}>
              <summary>{faq.q[lang]}</summary>
              <p>{faq.a[lang]}</p>
            </details>
          ))}
        </div>
      </section>

      <nav className="svc-foot" aria-label={t.title[lang]}>
        <a className="case-back" href={SERVICES_PATH} onClick={onLinkClick}>
          {t.all[lang]}
        </a>
        <a className="case-next" href={serviceHref(next.slug)} onClick={onLinkClick}>
          {next.name[lang]}
          <span>{t.next[lang]}</span>
        </a>
      </nav>
    </article>
  )
}

export default ServicePage

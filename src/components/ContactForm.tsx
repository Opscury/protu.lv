import { type FormEvent, useState } from 'react'
import { ui } from '../data/ui'
import type { Lang, Localized } from '../types'

type Props = {
  lang: Lang
  /** Pakalpojums vai plāns, ko lasītājs piesaka (no pakalpojuma lapas pogas). */
  request?: Localized
}
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgaeogwv'
// Pašhostēts pasts (Stalwart uz netcup VPS, mail.protu.lv).
const CONTACT_EMAIL = 'valdis@protu.lv'

function ContactForm({ lang, request }: Props) {
  const t = ui[lang]
  const [status, setStatus] = useState<'idle' | 'submitting' | 'succeeded' | 'failed'>('idle')
  // Tēma nonāk e-pasta tēmas rindā — uzreiz redzams, vai raksta klients vai darba devējs.
  const [picked, setTopic] = useState<keyof typeof t.topics | null>(null)
  // Pakalpojuma lapā tēma jau ir zināma: mājaslapa vai projekts.
  const topic = picked ?? (request ? 'site' : null)
  // Tēmas rinda vienmēr latviski, lai pastkastē viegli atrast.
  const requestSubject = request && topic === 'site' ? `Pieteikums: ${request.lv}` : null
  const mailto = `mailto:${CONTACT_EMAIL}${
    request ? `?subject=${encodeURIComponent(`Pieteikums: ${request.lv}`)}` : ''
  }`

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('submitting')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Form submission failed')
      form.reset()
      setTopic(null)
      setStatus('succeeded')
    } catch {
      setStatus('failed')
    }
  }

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-intro">
        <h2 id="contact-title">{t.contactTitle}</h2>
        <p className="contact-lead">{t.contactLead}</p>
        <div className="contact-direct">
          <span>{t.contactDirect}</span>
          <a className="mailto" href={mailto}>
            {CONTACT_EMAIL}
          </a>
          <p className="self-hosted">
            <span className="self-hosted-dot" aria-hidden="true" />
            {t.selfHosted}
          </p>
        </div>
      </div>

      <form className="contact-form" onSubmit={submit}>
        {request && (
          <p className="contact-request">
            {t.contactRequest}: <strong>{request[lang]}</strong>
          </p>
        )}
        <fieldset className="contact-topic">
          <legend>{t.contactTopic}</legend>
          {(Object.keys(t.topics) as (keyof typeof t.topics)[]).map((key) => (
            <label key={key}>
              <input
                type="radio"
                name="topic"
                value={ui.lv.topics[key]}
                checked={topic === key}
                onChange={() => setTopic(key)}
                required
              />
              <span>{t.topics[key]}</span>
            </label>
          ))}
        </fieldset>
        {topic && (
          <input
            type="hidden"
            name="_subject"
            value={requestSubject ?? `protu.lv · ${ui.lv.topics[topic]}`}
          />
        )}
        {request && <input type="hidden" name="service" value={request.lv} />}
        <label>
          <span>{t.contactName}</span>
          <input required name="name" autoComplete="name" />
        </label>
        <label>
          <span>{t.contactEmail}</span>
          <input required type="email" name="email" autoComplete="email" />
        </label>
        <label>
          <span>{t.contactMessage}</span>
          <textarea required name="message" rows={6} />
        </label>
        <div className="contact-actions">
          <button className="action action-primary" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? t.contactSending : t.contactSend}
          </button>
        </div>
        <p className={`contact-status ${status}`} aria-live="polite">
          {status === 'succeeded' && t.contactSuccess}
          {status === 'failed' && t.contactError}
        </p>
      </form>
    </section>
  )
}

export default ContactForm

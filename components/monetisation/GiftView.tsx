'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BrandLockup } from '@/components/editorial/ui'
import { WHATSAPP_URL } from '@/lib/constants'
import { GIFT_CARDS } from '@/lib/monetisation'
import { GIFT_COPY } from '@/lib/view-copy'

const FOIL = 'linear-gradient(124deg, #8A7044 0%, #C9B27E 27%, #F1E6C8 42%, #B39660 57%, #80683C 83%)'

export function GiftView({ locale }: { locale: 'en' | 'fr' }) {
  const t = GIFT_COPY[locale]
  const fr = locale === 'fr'
  const [amount, setAmount] = useState<(typeof GIFT_CARDS)[number]['id']>('300')
  const [recipient, setRecipient] = useState('')
  const [message, setMessage] = useState('')
  const [from, setFrom] = useState('')
  const [date, setDate] = useState('')
  const selected = GIFT_CARDS.find((card) => card.id === amount) ?? GIFT_CARDS[1]
  const price = fr ? selected.labelFr : selected.labelEn
  const pay = fr ? 'Payer' : 'Pay'

  const steps = fr
    ? [
        { n: '01', title: 'Choisir un bon', body: '150 €, 300 € ou 500 €. Paiement en ligne.' },
        { n: '02', title: 'L’offrir', body: 'Un dîner privé, cuisiné chez eux sur la Côte d’Azur ou à Monaco.' },
        { n: '03', title: 'Convenir de la date', body: 'La date et le menu se décident ensuite.' },
        { n: '04', title: 'À table', body: 'Les préférences alimentaires et les allergies sont prises en compte sur demande.' },
      ]
    : [
        { n: '01', title: 'Choose a card', body: '€150, €300 or €500. Pay online.' },
        { n: '02', title: 'Give it', body: 'A private dinner, cooked in their home on the Côte d’Azur or in Monaco.' },
        { n: '03', title: 'Agree the date', body: 'The date and the menu are agreed afterwards.' },
        { n: '04', title: 'At the table', body: 'Dietary preferences and allergies are accommodated on request.' },
      ]

  return (
    <div className="ed ed-gift">
      <section className="ed-gift-hero" aria-labelledby="gift-title">
        <p className="ed-gift-eyebrow">{t.eyebrow}</p>
        <p className="ed-mono ed-gift-aside">
          {fr ? 'Bons cadeaux de Noël' : 'Christmas gift cards'}
          <br />
          {fr ? '150 € · 300 € · 500 €' : '€150 · €300 · €500'}
        </p>
        <h1 id="gift-title">
          <span>{fr ? 'Un dîner privé,' : 'A private dinner,'}</span>
          <span className="ed-italic">{fr ? 'offert.' : 'given.'}</span>
        </h1>
        <p className="ed-mono ed-gift-price-note">
          {fr ? '150 €, 300 € ou 500 €.' : '€150, €300 or €500.'}
          <br />
          {fr ? 'Paiement en ligne.' : 'Pay online.'}
        </p>
        <div className="ed-gift-hero-actions">
          <a className="ed-pill ed-pill-filled" href="#gift-cards">
            <span>{fr ? 'Choisir un bon' : 'Choose a card'}</span>
            <span className="ed-arrow" aria-hidden="true">→</span>
          </a>
          <Link className="ed-pill ed-pill-outline" href={t.enquireHref}>
            <span>{t.enquire}</span>
            <span className="ed-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="ed-gift-stage" data-placeholder="gift-hero">
          <BrandLockup className="ed-lockup-gift" />
          <p>{fr ? 'Un dîner, offert' : 'A dinner, given'}</p>
        </div>
      </section>

      <div className="ed-marquee ed-gift-marquee">
        <div className="ed-marquee-track">
          {[0, 1].map((copyIndex) => (
            <p key={copyIndex} className="ed-marquee-set" aria-hidden={copyIndex === 1}>
              {(fr
                ? ['Bons cadeaux', '150 €', '300 €', '500 €', 'Paiement en ligne', 'Côte d’Azur & Monaco', 'Un dîner, offert']
                : ['Gift cards', '€150', '€300', '€500', 'Pay online', "Côte d'Azur & Monaco", 'A dinner, given']
              ).map((item, index) => (
                <span key={`${copyIndex}-${item}`} className={index % 2 ? 'ed-gift-brass' : undefined}>
                  {item}
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <section className="ed-gift-cards" id="gift-cards" aria-labelledby="gift-cards-title">
        <div className="ed-gift-split">
          <div>
            <p className="ed-kicker">
              <span>01</span>
              <i aria-hidden="true" />
              <span className="ed-kicker-name">{fr ? 'Bons cadeaux' : 'Gift cards'}</span>
            </p>
            <h2 id="gift-cards-title">
              {fr ? 'Bons ' : 'Gift '}
              <em>{fr ? 'cadeaux' : 'cards'}</em>
            </h2>
          </div>
          <p className="ed-mono ed-gift-intro">{t.lede} {fr ? '150 €, 300 € ou 500 €. Paiement en ligne.' : '€150, €300 or €500. Pay online.'}</p>
        </div>
        <div className="ed-gift-row">
          {GIFT_CARDS.map((card) => {
            const label = fr ? card.labelFr : card.labelEn
            return (
              <article key={card.id}>
                <GiftCard locale={locale} value={label} number={`N° 0${card.id}`} />
                <div className="ed-gift-buy">
                  <p>
                    <span>{fr ? 'Bon cadeau' : 'Gift card'}</span>
                    <strong>{label}</strong>
                  </p>
                  <a className={`ed-pill ${card.id === '300' ? 'ed-pill-filled' : 'ed-pill-outline'}`} href={card.stripe} target="_blank" rel="noopener noreferrer">
                    <span>{label} · {pay}</span>
                    <span className="ed-arrow" aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="ed-gift-panel" aria-labelledby="gift-choose-title">
        <div>
          <p className="ed-kicker">
            <span>02</span>
            <i aria-hidden="true" />
            <span className="ed-kicker-name">{fr ? 'Choisir un bon' : 'Choose a card'}</span>
          </p>
          <p className="ed-script">{fr ? 'Offert' : 'Given'}</p>
          <GiftCard locale={locale} value={price} number={`N° 0${selected.id}`} message={message} from={from} large />
          <p className="ed-mono ed-gift-preview">
            <span>{fr ? 'Aperçu' : 'Preview'}</span>
            <span>{price} · {fr ? 'Bon cadeau' : 'Gift card'}</span>
          </p>
        </div>
        <form
          className="ed-gift-form"
          onSubmit={(event) => {
            event.preventDefault()
            window.open(selected.stripe, '_blank', 'noopener,noreferrer')
          }}
        >
          <h2 id="gift-choose-title">
            {fr ? 'Choisir un ' : 'Choose a '}
            <em>{fr ? 'bon' : 'card'}</em>
          </h2>
          <fieldset>
            <legend>{fr ? 'Montant' : 'Amount'}</legend>
            <div className="ed-gift-amounts">
              {GIFT_CARDS.map((card) => {
                const label = fr ? card.labelFr : card.labelEn
                const on = card.id === amount
                return (
                  <button key={card.id} type="button" className={`ed-pill ${on ? 'ed-pill-filled' : 'ed-pill-outline'}`} aria-pressed={on} onClick={() => setAmount(card.id)}>
                    {label}
                  </button>
                )
              })}
            </div>
          </fieldset>
          <label className="ed-gift-field">
            <span>{fr ? 'Nom du destinataire' : 'Recipient name'}</span>
            <input value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder={fr ? 'Son nom' : 'Their name'} autoComplete="name" />
            <small>{fr ? 'Requis' : 'Required'}</small>
          </label>
          <label className="ed-gift-field">
            <span>{fr ? 'Message' : 'Message'}</span>
            <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder={fr ? 'Quelques mots pour la carte' : 'A few words for the card'} />
            <small>{fr ? 'Facultatif' : 'Optional'}</small>
          </label>
          <label className="ed-gift-field">
            <span>{fr ? 'De la part de' : 'From'}</span>
            <input value={from} onChange={(event) => setFrom(event.target.value)} placeholder={fr ? 'Votre nom' : 'Your name'} autoComplete="name" />
            <small>{fr ? 'Requis' : 'Required'}</small>
          </label>
          <label className="ed-gift-field">
            <span>{fr ? 'Date de remise' : 'Delivery date'}</span>
            <input value={date} onChange={(event) => setDate(event.target.value)} placeholder={fr ? 'Choisir une date' : 'Choose a date'} inputMode="numeric" />
            <small>dd / mm / yyyy</small>
          </label>
          <div className="ed-gift-total">
            <p>
              <span>{fr ? 'Total' : 'Total'}</span>
              <strong>{price}</strong>
            </p>
            <button className="ed-pill ed-pill-filled" type="submit">
              <span>{fr ? 'Payer en ligne' : 'Pay online'}</span>
              <span className="ed-arrow" aria-hidden="true">→</span>
            </button>
          </div>
          <p className="ed-mono ed-gift-note">
            {fr
              ? 'La date et le menu se décident ensuite. Les préférences et les allergies sont prises en compte sur demande. Le paiement ouvre le lien Stripe du montant choisi. Le message reste sur cette page.'
              : 'The date and the menu are agreed afterwards. Preferences and allergies are accommodated on request. Payment opens the Stripe link for the chosen amount. The message stays on this page.'}
          </p>
        </form>
      </section>

      <section className="ed-gift-steps" aria-labelledby="gift-how-title">
        <div className="ed-gift-split">
          <div>
            <p className="ed-kicker">
              <span>03</span>
              <i aria-hidden="true" />
              <span className="ed-kicker-name">{fr ? 'Le déroulement' : 'How it works'}</span>
            </p>
            <h2 id="gift-how-title">
              {fr ? 'Comment ' : 'How it '}
              <em>{fr ? 'ça se passe' : 'works'}</em>
            </h2>
          </div>
          <p className="ed-mono ed-gift-intro">{t.lede}</p>
        </div>
        <ol>
          {steps.map((step) => (
            <li key={step.n}>
              <span>{step.n}</span>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ed-gift-close" aria-labelledby="gift-close-title">
        <p className="ed-kicker">
          <span>04</span>
          <i aria-hidden="true" />
          <span className="ed-kicker-name">{fr ? 'Demande' : 'Enquire'}</span>
        </p>
        <h2 id="gift-close-title">
          {fr ? 'Une question sur un ' : 'Questions about a '}
          <em>{fr ? 'cadeau ?' : 'gift?'}</em>
        </h2>
        <div className="ed-gift-close-actions">
          <Link className="ed-pill ed-pill-filled" href={t.enquireHref}>
            <span>{t.enquire}</span>
            <span className="ed-arrow" aria-hidden="true">→</span>
          </Link>
          <a className="ed-caps" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            {fr ? 'Message WhatsApp' : 'Message on WhatsApp'}
          </a>
        </div>
        <p className="ed-gift-mega" aria-hidden="true">
          {fr ? 'Un dîner, ' : 'A dinner, '}
          <em>{fr ? 'offert' : 'given'}</em>
        </p>
      </section>
    </div>
  )
}

function GiftCard({
  locale,
  value,
  number,
  message,
  from,
  large = false,
}: {
  locale: 'en' | 'fr'
  value: string
  number: string
  message?: string
  from?: string
  large?: boolean
}) {
  const fr = locale === 'fr'
  return (
    <div className={`ed-card ${large ? 'ed-card-lg' : ''}`}>
      <div className="ed-card-top">
        <BrandLockup className="ed-lockup-card" label="" />
        <p>
          <span>{fr ? 'Bon cadeau' : 'Gift card'}</span>
          <span>{number}</span>
        </p>
      </div>
      <div className="ed-card-bottom">
        <div className="ed-card-value">
          <strong style={{ backgroundImage: FOIL }}>{value}</strong>
          <p>
            {message ? message : fr ? 'Un dîner privé,' : 'A private dinner,'}
            <br />
            {from ? from : fr ? 'offert' : 'given'}
          </p>
        </div>
        <i aria-hidden="true" style={{ backgroundImage: FOIL }} />
        <p className="ed-card-foot">
          <span>Côte d&apos;Azur · Monaco</span>
          <span>{fr ? 'Noël' : 'Christmas'}</span>
        </p>
      </div>
    </div>
  )
}

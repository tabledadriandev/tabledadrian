'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LemonSymbol, LineIcon } from '@/components/editorial/ui'
import { WHATSAPP_URL } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { useLocale, withLocale } from '@/lib/i18n'

function contactSchema(locale: 'en' | 'fr') {
  const messages = locale === 'fr'
    ? {
        name: 'Indiquez votre nom',
        email: 'Indiquez un e-mail valide',
        date: 'Indiquez la date',
        guests: 'Indiquez le nombre de convives',
        location: 'Indiquez le lieu',
      }
    : {
        name: 'Please enter your name',
        email: 'Please enter a valid email',
        date: 'Please enter the event date',
        guests: 'Please enter the number of guests',
        location: 'Please enter the location',
      }
  return z.object({
    name: z.string().min(2, messages.name),
    email: z.string().email(messages.email),
    phone: z.string().optional(),
    eventDate: z.string().trim().min(1, messages.date),
    location: z.string().trim().min(2, messages.location),
    serviceType: z.string().optional(),
    guests: z.preprocess(
      (value) => (value === '' || value === undefined || value === null || Number.isNaN(value) ? undefined : Number(value)),
      z.number({ required_error: messages.guests, invalid_type_error: messages.guests }).int().min(1, messages.guests).max(200)
    ),
    budget: z.string().optional(),
    dietaryRequirements: z.string().optional(),
    message: z.string().max(4000).optional(),
    website: z.string().optional(),
  })
}

type ContactFormData = z.infer<ReturnType<typeof contactSchema>>

const ENQUIRY_PRESET = {
  en: {
    gift: {
      service: 'gift',
      message: 'I would like to give a private dinner. Please tell me how a voucher works.',
      note: 'This enquiry is for a gift voucher. No payment is taken on this form.',
    },
    masterclass: {
      service: 'masterclass',
      message: 'I would like an at-home cooking class or a chef’s table evening.',
      note: 'This enquiry is for a cooking class or a chef’s table.',
    },
    'chefs-table': {
      service: 'chefs-table',
      message: 'I would like a small-group tasting evening, a chef’s table.',
      note: 'This enquiry is for a chef’s table.',
    },
    corporate: {
      service: 'corporate',
      message: 'I would like a quote for a corporate dinner or another event.',
      note: 'This enquiry is for a corporate or event package.',
    },
    dinner: {
      service: 'dinner-party',
      message: 'I would like to book a private chef for a dinner in my kitchen.',
      note: 'This enquiry is for a private chef.',
    },
  },
  fr: {
    gift: {
      service: 'gift',
      message: 'Je souhaite offrir un dîner privé. Dites-moi comment le bon fonctionne.',
      note: 'Cette demande concerne un bon cadeau. Aucun paiement n’est pris sur ce formulaire.',
    },
    masterclass: {
      service: 'masterclass',
      message: 'Je souhaite un cours de cuisine à domicile ou une table du chef.',
      note: 'Cette demande concerne un cours ou une table du chef.',
    },
    'chefs-table': {
      service: 'chefs-table',
      message: 'Je souhaite une dégustation en petit groupe, une table du chef.',
      note: 'Cette demande concerne une table du chef.',
    },
    corporate: {
      service: 'corporate',
      message: 'Je souhaite un devis pour un dîner d’entreprise ou un autre événement.',
      note: 'Cette demande concerne une formule entreprise ou événement.',
    },
    dinner: {
      service: 'dinner-party',
      message: 'Je souhaite réserver un chef privé pour un dîner dans ma cuisine.',
      note: 'Cette demande concerne un chef privé.',
    },
  },
} as const

const SERVICES = [
  { value: 'dinner-party', en: 'Private dinner', fr: 'Dîner privé' },
  { value: 'meal-prep', en: 'Weekly meals', fr: 'Repas de la semaine' },
  { value: 'special', en: 'Celebration', fr: 'Célébration' },
  { value: 'corporate', en: 'Corporate', fr: 'Entreprise' },
  { value: 'gift', en: 'Gift', fr: 'Cadeau' },
  { value: 'masterclass', en: 'Class', fr: 'Cours' },
  { value: 'chefs-table', en: "Chef's table", fr: 'Table du chef' },
] as const

type Summary = {
  eventDate: string
  guests: number
  location: string
  serviceType?: string
}

export function ContactForm() {
  const locale = useLocale()
  const fr = locale === 'fr'
  const t = copy[locale]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [summary, setSummary] = useState<Summary | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)
  const [intentNote, setIntentNote] = useState<string | null>(null)
  const startedAt = useRef(Date.now())

  const labels = fr
    ? {
        name: '01 · Nom',
        email: '02 · E-mail',
        phone: '03 · Téléphone',
        location: '04 · Lieu',
        date: '05 · Date',
        guests: '06 · Convives',
        occasion: '07 · Occasion',
        dietary: '08 · Régime et allergies',
        details: '09 · Précisions',
        required: 'Requis',
        optional: 'Facultatif',
        choose: 'Un seul',
        range: '1 – 200',
        sent: 'Demande envoyée',
        thanks: 'Merci —',
        replyName: 'Adrian répondra personnellement.',
        reply: 'Réponse sous 24 heures',
        fees: 'Honoraires sur demande · €',
        head: "Demande · Table d'Adrian",
        dateLabel: 'Date',
        guestsLabel: 'Convives',
        locationLabel: 'Lieu',
        occasionLabel: 'Occasion',
        whatsapp: 'Message sur WhatsApp',
        menus: 'Voir les menus',
        sending: 'Envoi',
        another: 'Envoyer une autre demande',
      }
    : {
        name: '01 · Name',
        email: '02 · Email',
        phone: '03 · Phone',
        location: '04 · Location',
        date: '05 · Date',
        guests: '06 · Guests',
        occasion: '07 · Occasion',
        dietary: '08 · Dietary requirements',
        details: '09 · Additional details',
        required: 'Required',
        optional: 'Optional',
        choose: 'Choose one',
        range: '1 – 200',
        sent: 'Enquiry sent',
        thanks: 'Thank you —',
        replyName: 'Adrian will reply personally.',
        reply: 'Reply within 24 hours',
        fees: 'Fees on request · €',
        head: "Enquiry · Table d'Adrian",
        dateLabel: 'Event date',
        guestsLabel: 'Guests',
        locationLabel: 'Location',
        occasionLabel: 'Occasion',
        whatsapp: 'Message on WhatsApp',
        menus: 'View the menus',
        sending: 'Sending',
        another: 'Send another enquiry',
      }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema(locale)),
    defaultValues: { guests: 2, budget: 'on-request', serviceType: '' },
  })

  const guests = Number(watch('guests') || 2)
  const serviceType = watch('serviceType') || ''

  useEffect(() => {
    const intent = new URLSearchParams(window.location.search).get('intent')
    if (!intent) return
    const preset = ENQUIRY_PRESET[locale][intent as keyof (typeof ENQUIRY_PRESET)['en']]
    if (!preset) return
    setValue('serviceType', preset.service)
    setValue('message', preset.message)
    setIntentNote(preset.note)
  }, [locale, setValue])

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      })
      const payload = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setServerError(payload.error || (fr ? 'L’envoi a échoué. Écrivez-nous par e-mail.' : 'Something went wrong. Please email us instead.'))
        return
      }
      setSummary({
        eventDate: data.eventDate,
        guests: Number(data.guests),
        location: data.location,
        serviceType: data.serviceType,
      })
      reset({ guests: 2, budget: 'on-request', serviceType: '' })
      startedAt.current = Date.now()
    } catch {
      setServerError(fr ? 'L’envoi a échoué. Écrivez à adrian@tabledadrian.com.' : 'We could not send that. Please email adrian@tabledadrian.com.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const occasion = SERVICES.find((item) => item.value === summary?.serviceType)

  return (
    <form className="ed-reserve" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="ed-reserve-head">
        <p>{labels.head}</p>
        <LemonSymbol className="ed-symbol-sm" />
        <p>{labels.fees}</p>
      </div>
      <input type="hidden" value="on-request" {...register('budget')} />
      <div className="ed-hp" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {summary ? (
        <div className="ed-reserve-success">
          <img src="/editorial/contact-terrace.webp" alt={fr ? 'Table de terrasse au crépuscule' : 'Terrace table set at dusk'} />
          <p className="ed-reserve-kicker">{labels.sent}</p>
          <h2>
            {labels.thanks}
            <em>{labels.replyName}</em>
          </h2>
          <p className="ed-mono">{labels.reply}</p>
          <dl>
            <div>
              <dt>{labels.dateLabel}</dt>
              <dd>{summary.eventDate}</dd>
            </div>
            <div>
              <dt>{labels.guestsLabel}</dt>
              <dd>{summary.guests}</dd>
            </div>
            <div>
              <dt>{labels.locationLabel}</dt>
              <dd>{summary.location}</dd>
            </div>
            <div>
              <dt>{labels.occasionLabel}</dt>
              <dd>{occasion ? (fr ? occasion.fr : occasion.en) : '—'}</dd>
            </div>
          </dl>
          <div className="ed-reserve-actions">
            <a className="ed-pill ed-pill-outline" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <span>{labels.whatsapp}</span>
              <span className="ed-arrow" aria-hidden="true">→</span>
            </a>
            <Link className="ed-caps" href={withLocale('/menus', locale)}>
              {labels.menus}
            </Link>
          </div>
          <button type="button" className="ed-caps" onClick={() => setSummary(null)}>
            {labels.another}
          </button>
        </div>
      ) : (
        <>
          {intentNote ? <p className="ed-reserve-note">{intentNote}</p> : null}
          <div className="ed-reserve-grid">
            <Field id="name" label={labels.name} hint={labels.required} error={errors.name?.message}>
              <input id="name" {...register('name')} type="text" autoComplete="name" aria-invalid={!!errors.name} />
            </Field>
            <Field id="email" label={labels.email} hint={labels.required} error={errors.email?.message}>
              <input id="email" {...register('email')} type="email" autoComplete="email" aria-invalid={!!errors.email} />
            </Field>
            <Field id="phone" label={labels.phone} hint={labels.optional} error={errors.phone?.message}>
              <input id="phone" {...register('phone')} type="tel" autoComplete="tel" />
            </Field>
            <Field id="location" label={labels.location} hint={labels.required} error={errors.location?.message}>
              <input
                id="location"
                {...register('location')}
                type="text"
                autoComplete="address-level2"
                placeholder={fr ? 'Antibes, une villa, un yacht' : 'Antibes, a villa, a yacht'}
                aria-invalid={!!errors.location}
              />
            </Field>
            <Field id="eventDate" label={labels.date} hint={labels.required} error={errors.eventDate?.message} icon="calendar">
              <input id="eventDate" {...register('eventDate')} type="text" placeholder="dd / mm / yyyy" aria-invalid={!!errors.eventDate} />
            </Field>
            <div className={`ed-field ${errors.guests ? 'is-error' : ''}`}>
              <div className="ed-field-label">
                <label htmlFor="guests">{labels.guests}</label>
                <span>{labels.range}</span>
              </div>
              <div className="ed-stepper">
                <button
                  type="button"
                  aria-label={fr ? 'Moins de convives' : 'Fewer guests'}
                  onClick={() => setValue('guests', Math.max(1, guests - 1), { shouldValidate: true })}
                >
                  <LineIcon name="minus" size={12} />
                </button>
                <input id="guests" {...register('guests')} inputMode="numeric" aria-invalid={!!errors.guests} />
                <button
                  type="button"
                  aria-label={fr ? 'Plus de convives' : 'More guests'}
                  onClick={() => setValue('guests', Math.min(200, guests + 1), { shouldValidate: true })}
                >
                  <LineIcon name="plus" size={12} />
                </button>
              </div>
              {errors.guests ? <p>{errors.guests.message}</p> : null}
            </div>
          </div>

          <fieldset className="ed-chips">
            <div className="ed-field-label">
              <legend>{labels.occasion}</legend>
              <span>{labels.choose}</span>
            </div>
            <div>
              {SERVICES.map((item) => {
                const on = serviceType === item.value
                return (
                  <button key={item.value} type="button" className={on ? 'is-on' : undefined} aria-pressed={on} onClick={() => setValue('serviceType', on ? '' : item.value)}>
                    {fr ? item.fr : item.en}
                  </button>
                )
              })}
            </div>
            <input type="hidden" {...register('serviceType')} />
          </fieldset>

          <label className="ed-area" htmlFor="dietaryRequirements">
            <span className="ed-field-label">
              <span>{labels.dietary}</span>
              <span>{labels.optional}</span>
            </span>
            <textarea id="dietaryRequirements" {...register('dietaryRequirements')} rows={3} />
          </label>
          <label className="ed-area" htmlFor="message">
            <span className="ed-field-label">
              <span>{labels.details}</span>
              <span>{labels.optional}</span>
            </span>
            <textarea id="message" {...register('message')} rows={3} />
          </label>

          {serverError ? <p className="ed-reserve-error">{serverError}</p> : null}
          <div className="ed-reserve-submit">
            <button className="ed-pill ed-pill-filled" type="submit" disabled={isSubmitting}>
              <span>{isSubmitting ? labels.sending : t.bookCta}</span>
              <span className="ed-arrow" aria-hidden="true">→</span>
            </button>
            <p>
              <span>{labels.reply}</span>
              <span>{t.quoteNote}</span>
            </p>
          </div>
        </>
      )}
    </form>
  )
}

function Field({
  id,
  label,
  hint,
  error,
  icon,
  children,
}: {
  id: string
  label: string
  hint: string
  error?: string
  icon?: 'calendar'
  children: React.ReactNode
}) {
  return (
    <div className={`ed-field ${error ? 'is-error' : ''}`}>
      <div className="ed-field-label">
        <label htmlFor={id}>{label}</label>
        <span>{hint}</span>
      </div>
      <div className="ed-field-control">
        {children}
        {icon ? <LineIcon name={icon} size={20} /> : null}
      </div>
      {error ? <p>{error}</p> : null}
    </div>
  )
}

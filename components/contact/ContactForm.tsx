'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'
import { WhatsAppEnquiry } from '@/components/contact/WhatsAppLink'
import { CONTACT_INFO, INSTAGRAM_URL } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { useLocale } from '@/lib/i18n'

function contactSchema(locale: 'en' | 'fr') {
  const copy = locale === 'fr'
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
    name: z.string().min(2, copy.name),
    email: z.string().email(copy.email),
    phone: z.string().optional(),
    eventDate: z.string().trim().min(1, copy.date),
    location: z.string().trim().min(2, copy.location),
    serviceType: z.string().optional(),
    guests: z.preprocess(
      (value) => (value === '' || value === undefined || value === null || Number.isNaN(value) ? undefined : Number(value)),
      z.number({ required_error: copy.guests, invalid_type_error: copy.guests }).int().min(1, copy.guests).max(200)
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

export function ContactForm() {
  const locale = useLocale()
  const t = copy[locale]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [intentNote, setIntentNote] = useState<string | null>(null)
  const startedAt = useRef(Date.now())

  const labels = locale === 'fr'
    ? {
        name: 'Nom',
        email: 'E-mail',
        phone: 'Téléphone',
        date: 'Date de l’événement',
        guests: 'Convives',
        location: 'Lieu',
        service: 'Type de service',
        serviceEmpty: 'Choisir un service',
        dietary: 'Régime et allergies',
        details: 'Précisions',
        detailsPlaceholder: 'Ce que vous voulez ajouter',
        reply: 'Réponse sous 24 heures',
        sending: 'Envoi',
        sent: 'Message envoyé',
      }
    : {
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        date: 'Event date',
        guests: 'Guests',
        location: 'Location',
        service: 'Service type',
        serviceEmpty: 'Select a service',
        dietary: 'Dietary requirements',
        details: 'Additional details',
        detailsPlaceholder: 'Tell us about your table',
        reply: 'Reply within 24 hours',
        sending: 'Sending',
        sent: 'Message sent',
      }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema(locale)),
  })

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
        setServerError(payload.error || 'Something went wrong. Please email us instead.')
        return
      }
      setIsSuccess(true)
      reset()
      startedAt.current = Date.now()
      setTimeout(() => setIsSuccess(false), 6000)
    } catch {
      setServerError('We could not send that. Please email adrian@tabledadrian.com.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      variants={fadeInUp}
      onSubmit={handleSubmit(onSubmit)}
      className="surface relative space-y-6 p-6 sm:p-8"
      noValidate
    >
      {intentNote ? <p className="text-sm text-foreground-muted">{intentNote}</p> : null}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          {labels.name} <span className="text-primary">*</span>
        </label>
        <input
          id="name"
          {...register('name')}
          type="text"
          autoComplete="name"
          className="field"
          placeholder="Your name"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          {labels.email} <span className="text-primary">*</span>
        </label>
        <input
          id="email"
          {...register('email')}
          type="email"
          autoComplete="email"
          className="field"
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          {labels.phone}
        </label>
        <input
          id="phone"
          {...register('phone')}
          type="tel"
          autoComplete="tel"
          className="field"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="eventDate" className="mb-2 block text-sm font-medium">
            {labels.date} <span className="text-primary">*</span>
          </label>
          <input id="eventDate" {...register('eventDate')} type="text" placeholder="08/08/2008" className="field" aria-invalid={!!errors.eventDate} />
          {errors.eventDate && <p className="mt-1 text-sm text-destructive">{errors.eventDate.message}</p>}
        </div>
        <div>
          <label htmlFor="guests" className="mb-2 block text-sm font-medium">
            {labels.guests} <span className="text-primary">*</span>
          </label>
          <input id="guests" {...register('guests')} type="number" min="1" max="200" className="field" placeholder="6" aria-invalid={!!errors.guests} />
          {errors.guests && <p className="mt-1 text-sm text-destructive">{errors.guests.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="location" className="mb-2 block text-sm font-medium">
          {labels.location} <span className="text-primary">*</span>
        </label>
        <input
          id="location"
          {...register('location')}
          type="text"
          autoComplete="address-level2"
          className="field"
          placeholder={locale === 'fr' ? 'Antibes, une villa, un yacht' : 'Antibes, a villa, a yacht'}
          aria-invalid={!!errors.location}
        />
        {errors.location && <p className="mt-1 text-sm text-destructive">{errors.location.message}</p>}
      </div>

      <div>
        <label htmlFor="serviceType" className="mb-2 block text-sm font-medium">
          {labels.service}
        </label>
        <select id="serviceType" {...register('serviceType')} className="field">
          <option value="">{labels.serviceEmpty}</option>
          <option value="dinner-party">Private dinner party</option>
          <option value="gift">Gift voucher</option>
          <option value="masterclass">Cooking class</option>
          <option value="chefs-table">Chef&apos;s table</option>
          <option value="meal-prep">Weekly meal prep</option>
          <option value="corporate">Corporate event</option>
          <option value="special">Special occasion</option>
        </select>
      </div>

      <div>
        <p className="text-sm text-foreground-muted">{t.quoteNote}</p>
        <input type="hidden" value="on-request" {...register('budget')} />
      </div>

      <div>
        <label htmlFor="dietaryRequirements" className="mb-2 block text-sm font-medium">
          {labels.dietary}
        </label>
        <textarea
          id="dietaryRequirements"
          {...register('dietaryRequirements')}
          rows={2}
          className="field"
          placeholder="Dietary preferences and allergies, on request"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          {labels.details}
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={4}
          className="field"
          placeholder={labels.detailsPlaceholder}
        />
      </div>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-ink-foreground transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Sending</span>
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle size={20} />
            <span>Message sent</span>
          </>
        ) : (
          <span>{t.bookCta}</span>
        )}
      </button>
      <p className="text-center text-sm text-foreground-muted">{labels.reply}</p>
      <WhatsAppEnquiry />
      <p className="text-center text-sm text-foreground-muted">
        {t.bookingIntro}{' '}
        <a href={`mailto:${CONTACT_INFO.email}`} className="text-foreground underline underline-offset-4">
          {CONTACT_INFO.email}
        </a>
        {' · '}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground underline underline-offset-4"
        >
          {t.instagramLabel} {t.instagramHandle}
        </a>
      </p>
    </motion.form>
  )
}

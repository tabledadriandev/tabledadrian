'use client'

import { useState } from 'react'
import { CONTACT_INFO } from '@/lib/constants'

const COPY = {
  en: {
    title: 'The journal, by email',
    label: 'Email',
    placeholder: 'you@email.com',
    button: 'Send a note',
    subject: "Journal, Table d'Adrian",
    bodyLead: 'Please add this address to the journal list:',
  },
  fr: {
    title: 'Le journal, par email',
    label: 'Email',
    placeholder: 'vous@email.com',
    button: 'Envoyer un mot',
    subject: "Journal, Table d'Adrian",
    bodyLead: "Merci d'ajouter cette adresse à la liste du journal :",
  },
} as const

export function NewsletterForm({
  locale,
  id,
  compact = false,
}: {
  locale: 'en' | 'fr'
  id: string
  compact?: boolean
}) {
  const t = COPY[locale]
  const [email, setEmail] = useState('')

  return (
    <form
      className={compact ? 'b2-news is-compact' : 'b2-news'}
      onSubmit={(event) => {
        event.preventDefault()
        const subject = encodeURIComponent(t.subject)
        const body = encodeURIComponent(`${t.bodyLead} ${email}`)
        window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`
      }}
    >
      <p className="disp">{t.title}</p>
      <label htmlFor={id}>{t.label}</label>
      <div className="b2-news-row">
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="field"
          placeholder={t.placeholder}
        />
        <button type="submit" className="btn ink">
          {t.button}
        </button>
      </div>
    </form>
  )
}

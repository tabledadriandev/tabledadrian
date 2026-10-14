'use client'

import { useState } from 'react'
import { CONTACT_INFO } from '@/lib/constants'

const COPY = {
  en: {
    title: 'The journal, by email',
    note: 'No mailing list is connected. Sending opens a note to the kitchen.',
    label: 'Email',
    placeholder: 'you@email.com',
    button: 'Send a note',
    subject: "Journal, Table d'Adrian",
    bodyLead: 'Please add this address to the journal list:',
  },
  fr: {
    title: 'Le journal, par email',
    note: 'Aucune liste n’est connectée. L’envoi ouvre un message pour la cuisine.',
    label: 'Email',
    placeholder: 'vous@email.com',
    button: 'Envoyer un mot',
    subject: "Journal, Table d'Adrian",
    bodyLead: 'Merci d’ajouter cette adresse à la liste du journal :',
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
      className={compact ? 'flex flex-wrap items-end gap-3' : 'mt-12 border-t border-border pt-8'}
      onSubmit={(event) => {
        event.preventDefault()
        const subject = encodeURIComponent(t.subject)
        const body = encodeURIComponent(`${t.bodyLead} ${email}`)
        window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`
      }}
    >
      <div className={compact ? 'min-w-[14rem] flex-1' : 'max-w-xl'}>
        <p className={compact ? 'text-sm text-foreground' : 'font-display text-3xl tracking-tight'}>{t.title}</p>
        <p className="mt-1 text-sm text-foreground-muted">{t.note}</p>
        <label htmlFor={id} className="mt-3 block text-[11px] uppercase tracking-caps text-foreground-subtle">
          {t.label}
        </label>
        <input
          id={id}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="field mt-1 w-full max-w-md"
          placeholder={t.placeholder}
        />
      </div>
      <button type="submit" className="inline-flex h-11 items-center bg-ink px-5 text-sm text-ink-foreground">
        {t.button}
      </button>
    </form>
  )
}

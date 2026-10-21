'use client'

import { ContactForm } from '@/components/contact/ContactForm'
import { ContactInfo } from '@/components/contact/ContactInfo'
import { EdHero, EdPage } from '@/components/editorial/Page'
import { copy } from '@/lib/copy'
import { useLocale } from '@/lib/i18n'

export default function ContactPage() {
  const locale = useLocale()
  const t = copy[locale]
  return (
    <EdPage className="ed-contact">
      <EdHero
        kicker={t.contactEyebrow}
        title={locale === 'fr' ? 'Parlez-nous' : 'Tell us about'}
        italic={locale === 'fr' ? 'de la table' : 'the table'}
        lede={t.contactDescription}
        figure={{ id: 'contact-hero', label: t.contactEyebrow }}
      />
      <section className="ed-page-section ed-page-split">
        <ContactForm />
        <ContactInfo />
      </section>
    </EdPage>
  )
}

'use client'

import { ContactForm } from '@/components/contact/ContactForm'
import { LineIcon } from '@/components/editorial/ui'
import { CONTACT_INFO, GOOGLE_REVIEW_URL, INSTAGRAM_URL, WHATSAPP_URL } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { useLocale } from '@/lib/i18n'

const STEPS = {
  en: [
    'Conversation about the table',
    'Menu written and confirmed',
    'Cook, serve, leave the kitchen as we found it',
    'A note afterwards, if you wish',
  ],
  fr: [
    'Une conversation sur la table',
    'Le menu écrit et confirmé',
    'Cuisiner, servir, laisser la cuisine comme nous l’avons trouvée',
    'Un mot ensuite, si vous le souhaitez',
  ],
} as const

export default function ContactPage() {
  const locale = useLocale()
  const fr = locale === 'fr'
  const t = copy[locale]
  const review = fr ? 'Laissez-nous un avis Google' : 'Leave us a Google review'

  return (
    <div className="ed ed-contact">
      <header className="ed-contact-head">
        <div className="ed-contact-kicker">
          <p className="ed-kicker">
            <span>08</span>
            <i aria-hidden="true" />
            <span className="ed-kicker-name">{fr ? 'Contact' : 'Contact'}</span>
          </p>
          <p className="ed-mono">Private chef · Côte d&apos;Azur &amp; Monaco</p>
        </div>
        <div className="ed-contact-title">
          <h1>
            <span>{fr ? 'Parlez-nous' : 'Tell us about'}</span>
            <em>{fr ? 'de votre table.' : 'your table.'}</em>
          </h1>
          <div>
            <p>{fr ? 'La date, les convives, le lieu, et ce que vous aimez ou évitez. Adrian répond personnellement, sous 24 heures.' : 'Dates, guests, the place, and anything you love or avoid. Adrian replies personally, within 24 hours.'}</p>
            <p className="ed-mono">{t.contactDescription}</p>
          </div>
        </div>
      </header>

      <section className="ed-contact-enquiry" aria-labelledby="enquiry-title">
        <h2 id="enquiry-title" className="sr-only">{fr ? 'Demande' : 'Enquiry'}</h2>
        <ContactForm />
        <aside>
          <div className="ed-direct">
            <p>{fr ? 'Écrire directement' : 'Write directly'}</p>
            <a href={`mailto:${CONTACT_INFO.email}`}>
              <span><LineIcon name="mail" size={16} /> Email <span aria-hidden="true">→</span></span>
              <strong>{CONTACT_INFO.email}</strong>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <span><LineIcon name="instagram" size={16} /> Instagram DM <span aria-hidden="true">→</span></span>
              <strong>@tabledadrian</strong>
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <span><LineIcon name="whatsapp" size={16} /> WhatsApp <span aria-hidden="true">→</span></span>
              <strong>{fr ? 'Message sur WhatsApp' : 'Message on WhatsApp'}</strong>
            </a>
          </div>
          <div className="ed-service-area">
            <div className="ed-field-label">
              <p>{fr ? 'Zone' : 'Service area'}</p>
              <p>Côte d&apos;Azur &amp; Monaco</p>
            </div>
            <div className="ed-map" aria-hidden="true">
              <span className="ed-map-coast" />
              <span className="ed-map-north"><LineIcon name="north" size={14} /> N</span>
              <span className="ed-map-scale" />
              <span className="ed-map-km">10 km</span>
              <span className="ed-map-city is-cannes">Cannes</span>
              <span className="ed-map-city is-antibes">Antibes</span>
              <span className="ed-map-city is-nice">Nice</span>
              <span className="ed-map-city is-monaco">Monaco</span>
            </div>
          </div>
          <div className="ed-contact-review">
            <p>{t.googleReview.footer}</p>
            <a className="ed-caps" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
              {review}
            </a>
          </div>
        </aside>
      </section>

      <section className="ed-contact-process">
        <img src="/editorial/contact-linen.webp" alt={fr ? 'Carte de réservation et stylo sur le lin' : 'Reservation card and pen on linen'} />
        <div>
          <p className="ed-kicker">
            <span>09</span>
            <i aria-hidden="true" />
            <span className="ed-kicker-name">{fr ? 'Réservation' : 'Booking'}</span>
          </p>
          <ol>
            {STEPS[locale].map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  )
}

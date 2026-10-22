import Image from 'next/image'
import { Pill, SectionLabel } from '@/components/editorial/ui'
import { CONTACT_INFO } from '@/lib/constants'
import { PARTNERS_COPY } from '@/lib/view-copy'

const PHOTOS = [
  { src: '/editorial/partners-tools.webp', alt: 'Whetstone, linen apron and kitchen tools by a stone sink' },
  { src: '/editorial/partners-market.webp', alt: 'Mediterranean market table of tomatoes, lemons and herbs' },
  { src: '/editorial/partners-table.webp', alt: 'Caviar on a mother-of-pearl spoon over crushed ice' },
  { src: '/editorial/partners-vines.webp', alt: 'Provençal vineyard rows at golden hour' },
]

export function PartnersView({ locale }: { locale: 'en' | 'fr' }) {
  const t = PARTNERS_COPY[locale]
  const contact = locale === 'fr' ? '/fr/contact' : '/contact'
  return (
    <article className="ed-partners">
      <header>
        <div>
          <SectionLabel index="01">{t.kicker}</SectionLabel>
          <h1>
            {locale === 'fr' ? 'Dossier' : 'A media'} <em>{locale === 'fr' ? 'presse' : 'kit'}</em>
          </h1>
        </div>
        <p>{t.lede}</p>
        <div className="ed-worked">
          <span>{locale === 'fr' ? 'A travaillé avec' : 'Worked with'}</span>
          <p>Eden-Roc <i>·</i> amfAR <i>·</i> Dior</p>
        </div>
      </header>
      <section className="ed-audience">
        <div>
          <span>{t.audienceTitle}</span>
          <span>{locale === 'fr' ? 'Les chiffres ne sont pas publiés ici' : 'Figures are not published here'}</span>
        </div>
        <h2>{t.audience}</h2>
        <div className="ed-creds">
          <p>Adrian Stefan</p>
          <p><strong>EHL</strong><span>{locale === 'fr' ? 'Formation suisse' : 'Swiss-trained'}</span></p>
          <p><strong>10+</strong><span>{locale === 'fr' ? 'Ans' : 'Years'}</span></p>
          <p><strong>Stanford</strong><span>Nutrition certificate</span></p>
        </div>
      </section>
      <section className="ed-ways">
        <div className="ed-ways-head">
          <div>
            <SectionLabel index="02">{t.optionsTitle}</SectionLabel>
            <h2>
              {locale === 'fr' ? 'Façons de' : 'Ways to'} <em>{locale === 'fr' ? 'travailler ensemble' : 'work together'}</em>
            </h2>
          </div>
          <p>{locale === 'fr' ? 'Quatre façons' : 'Four ways'}</p>
        </div>
        {t.options.map((option, index) => (
          <article key={option.title} className={index % 2 ? 'is-flip' : ''}>
            <div className="ed-photo">
              <Image src={PHOTOS[index].src} alt={PHOTOS[index].alt} fill sizes="(max-width: 1100px) 100vw, 656px" />
            </div>
            <div>
              <p>No. {String(index + 1).padStart(2, '0')}</p>
              <h3>{option.title}</h3>
              <i aria-hidden="true" />
              <p>{option.text}</p>
            </div>
          </article>
        ))}
      </section>
      <section className="ed-forest ed-partners-close">
        <p className="ed-band-kicker">{locale === 'fr' ? 'Partenariats' : 'Partnerships'}</p>
        <h2>
          {t.contact.split(' ').slice(0, -1).join(' ')} <em>{t.contact.split(' ').slice(-1)}</em>
        </h2>
        <p className="ed-script">{locale === 'fr' ? 'Le menu reste celui d’Adrian.' : 'The menu stays Adrian’s.'}</p>
        <div>
          <Pill href={contact} tone="light">{t.contact}</Pill>
          <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
        </div>
      </section>
    </article>
  )
}

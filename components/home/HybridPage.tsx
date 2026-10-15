'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GALLERY } from '@/data/gallery'
import { FaqSection } from '@/components/seo/FaqSection'
import { CONTACT_INFO, INSTAGRAM_URL } from '@/lib/constants'
import { FAQ } from '@/lib/faq'
import { copy } from '@/lib/copy'
import { useLocale, withLocale } from '@/lib/i18n'

const STRIP = [
  'langoustine',
  'pea-risotto',
  'lobster-claw',
  'burrata-peach',
  'seabass',
  'zucchini-carpaccio',
  'duck-breast',
  'rose-tartlets',
  'wellington',
  'salmon-tartare',
]
  .map((id) => GALLERY.find((plate) => plate.id === id))
  .filter((plate): plate is (typeof GALLERY)[number] => Boolean(plate))

export function HybridPage() {
  const locale = useLocale()
  const t = copy[locale]
  const h = t.hybrid
  const contactHref = withLocale('/contact', locale)

  return (
    <div className="hybrid-home">
      <section className="hybrid-hero hybrid-hero-olive container" aria-labelledby="hero-title">
        <figure className="hero-olive" aria-hidden="true">
          <Image
            src="/gallery/hero-olive.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={75}
          />
        </figure>
        <div className="hybrid-hero-copy">
          <p className="hybrid-kicker">{h.kicker}</p>
          <h1 id="hero-title" className="hybrid-title">
            <span>{h.titleA}</span>
            <span>{h.titleB}</span>
          </h1>
          <p className="hybrid-lede">{h.lede}</p>
          <div className="hybrid-hero-actions">
            <a className="enquire-pill" href="#enquire">
              {h.cta}
            </a>
            <p className="credential-pill">{h.credential}</p>
          </div>
        </div>

      </section>

      <section id="experiences" className="container hybrid-offers" aria-labelledby="experiences-title">
        <h2 id="experiences-title" className="sr-only">
          {h.offersTitle}
        </h2>
        <div className="offer-stack">
          {h.offers.map((offer, index) => (
            <article key={offer.n} className="offer-panel" style={{ ['--i' as string]: index }}>
              <div className="offer-copy">
                <p className="offer-index">{offer.n}</p>
                <h3>{offer.title}</h3>
                <p>{offer.body}</p>
              </div>
              <div className="offer-photo">
                <Image src={offer.image} alt={offer.alt} fill sizes="(max-width: 800px) 92vw, 460px" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="hybrid-library" aria-labelledby="library-title">
        <div className="container hybrid-center" id="chef">
          <p className="hybrid-kicker">{h.libraryKicker}</p>
          <h2 id="library-title" className="hybrid-title hybrid-title-center">
            {h.libraryTitle}
          </h2>
          <p className="hybrid-lede hybrid-lede-center">{h.libraryBody}</p>
        </div>
        <div className="plate-strip" aria-label={h.libraryTitle}>
          <div className="plate-strip-track">
            {[0, 1].map((copyIndex) => (
              <ul key={copyIndex} className="plate-strip-group" aria-hidden={copyIndex === 1 ? true : undefined}>
                {STRIP.map((plate) => (
                  <li key={`${copyIndex}-${plate.id}`}>
                    <Image
                      src={plate.src}
                      alt={copyIndex === 0 ? plate.caption : ''}
                      width={480}
                      height={320}
                      sizes="220px"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <section id="enquire" className="hybrid-begin container" aria-labelledby="begin-title">
        <div className="hybrid-center" id="contact">
          <p className="hybrid-kicker">{h.beginKicker}</p>
          <h2 id="begin-title" className="hybrid-title hybrid-title-center">
            {h.beginTitle}
          </h2>
          <div className="plan-row">
            <Link className="plan-card" href={contactHref}>
              <span>{h.dinnerLabel}</span>
              <strong>{h.dinnerFigure}</strong>
              <small>{h.dinnerNote}</small>
            </Link>
            <Link className="plan-card" href={contactHref}>
              <span>{h.weeklyLabel}</span>
              <strong>{h.weeklyFigure}</strong>
              <small>{h.weeklyNote}</small>
            </Link>
          </div>
          <p className="begin-note">
            {h.beginNote}{' '}
            <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
          </p>
          <div className="route-row">
            <Link className="route-link" href={contactHref}>
              {h.formLabel}
            </Link>
            <a className="route-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              {t.instagramLabel}
            </a>
            <a className="route-link" href={`mailto:${CONTACT_INFO.email}`}>
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>
      </section>
      <FaqSection title={locale === 'fr' ? 'Questions' : 'Questions'} items={FAQ[locale]} />
    </div>
  )
}

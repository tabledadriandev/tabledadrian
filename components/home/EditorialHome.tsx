'use client'

import Image from 'next/image'
import Link from 'next/link'
import { GALLERY } from '@/data/gallery'
import { CONTACT_INFO, GOOGLE_REVIEW_URL, INSTAGRAM_URL, WHATSAPP_URL } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { STANFORD_CREDENTIAL, credentials } from '@/lib/credentials'
import { FAQ } from '@/lib/faq'
import { useLocale, withLocale } from '@/lib/i18n'
import { faqJsonLd } from '@/lib/schema'
import { BOOK_BUNDLE, BOOK_PRICE, GIFT_CARDS } from '@/lib/monetisation'
import { BrandLockup, Callout, CapsLink, LemonSymbol, Pill, SectionLabel } from '@/components/editorial/ui'

const PLATE_IDS = ['duck-breast', 'langoustine', 'burrata-peach', 'squid-ink-pasta', 'rose-tartlets', 'salmon-tartare'] as const

const PHOTOS = {
  hero: { src: '/editorial/hero.webp', w: 1520, h: 1080, alt: 'A plated dinner on a dark table.' },
  hands: { src: '/editorial/chef-hands-plating.webp', w: 1440, h: 1840, alt: 'Hands arranging a plate of food.' },
  dinner: { src: '/editorial/tile-private-dinner.webp', w: 842, h: 1200, alt: 'A long dining table set for a private dinner.' },
  weekly: { src: '/editorial/tile-weekly-meals.webp', w: 842, h: 1200, alt: 'A bowl of food on a kitchen counter.' },
  celebrations: { src: '/editorial/tile-celebrations.webp', w: 842, h: 1200, alt: 'A formal dinner table set for a celebration.' },
  mise: { src: '/editorial/chef-mise-en-place.webp', w: 1040, h: 1240, alt: 'A cook preparing ingredients at a counter.' },
  gift: { src: '/editorial/gift-card-linen.webp', w: 1288, h: 1040, alt: 'A wrapped gift and a card on linen.' },
  books: { src: '/editorial/recipe-books.webp', w: 1288, h: 1040, alt: 'An open cookbook on a wooden table.' },
} as const

export function EditorialHome() {
  const locale = useLocale()
  const t = copy[locale]
  const h = t.hybrid
  const fr = locale === 'fr'
  const contact = withLocale('/contact', locale)
  const giftPrices = GIFT_CARDS.map((card) => (fr ? card.labelFr : card.labelEn)).join(fr ? ', ' : ', ')
  const bookEach = fr ? BOOK_PRICE.fr : BOOK_PRICE.en
  const bookAll = fr ? BOOK_BUNDLE.priceFr : BOOK_BUNDLE.priceEn
  const plates = PLATE_IDS.flatMap((id) => {
    const plate = GALLERY.find((item) => item.id === id)
    return plate ? [plate] : []
  })

  const marquee = fr
    ? ['Formation suisse, EHL', '10+ ans', STANFORD_CREDENTIAL, '2 à 25 convives', 'Villa · Yacht · Événement', 'Antibes · Monaco']
    : ['Swiss-trained, EHL', '10+ years', STANFORD_CREDENTIAL, '2–25 guests', 'Villa · Yacht · Event', 'Antibes · Monaco']

  const places = [
    { href: '/villa-chef', en: 'At your villa', fr: 'Dans votre villa' },
    { href: '/yacht-chef', en: 'On your yacht', fr: 'Sur votre yacht' },
    { href: '/events-and-weddings', en: 'For your events', fr: 'Pour vos événements' },
  ]

  const stats = [
    { value: 'EHL', caption: fr ? 'Formation\nsuisse' : 'Swiss-trained' },
    { value: '10+', caption: fr ? 'ans en\ncuisines exigeantes' : 'years in\ndemanding kitchens' },
    { value: 'Stanford', caption: 'Nutrition\ncertificate' },
    { value: '2–25', caption: fr ? 'convives par\ndîner privé' : 'guests per\nprivate dinner' },
  ]

  return (
    <div className="ed">
      <section className="ed-hero" aria-labelledby="hero-title">
        <p className="ed-hero-kicker">{h.kicker}</p>
        <div className="ed-hero-head">
          <p className="ed-mono ed-hero-side">
            {fr ? 'Chef privé' : 'Private chef'}
            <br />
            Côte d&apos;Azur &amp; Monaco
          </p>
          <h1 id="hero-title">
            <span>{h.titleA}</span>
            <span className="ed-italic">{h.titleB}</span>
          </h1>
          <p className="ed-mono ed-hero-side ed-hero-side-right">
            {fr ? 'Cuisiné dans votre cuisine' : 'Cooked in your kitchen'}
            <br />
            {fr ? 'par Adrian Stefan' : 'by Adrian Stefan'}
          </p>
        </div>
        <div className="ed-hero-stage">
          <Callout direction="left" lines={fr ? ['Produits du marché,', 'ce matin-là'] : ['Market produce,', 'that morning']} />
          <div className="ed-hero-photo">
            <Image src={PHOTOS.hero.src} alt={PHOTOS.hero.alt} fill priority sizes="(max-width: 800px) 100vw, 760px" />
          </div>
          <div className="ed-hero-actions">
            <Pill href={contact} tone="filled">
              {h.cta}
            </Pill>
            <Pill href={INSTAGRAM_URL} external>
              {fr ? 'DM Instagram' : 'Instagram DM'}
            </Pill>
            <Callout direction="right" lines={fr ? ['Dressé dans votre', 'cuisine, pas la nôtre'] : ['Plated in your', 'kitchen, not ours']} />
          </div>
        </div>
        <p className="ed-mega" aria-hidden="true">
          Table d&apos;Adrian
        </p>
      </section>

      <div className="ed-marquee">
        <div className="ed-marquee-track">
          {[0, 1].map((copyIndex) => (
            <p key={copyIndex} className="ed-marquee-set" aria-hidden={copyIndex === 1}>
              {marquee.map((item) => (
                <span key={`${copyIndex}-${item}`}>
                  {item}
                  <span className="ed-dot" aria-hidden="true"> · </span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <section className="ed-intro">
        <div className="ed-intro-copy">
          <h2 className="ed-statement">
            <span className="ed-statement-row">
              <em>{fr ? 'Longévité' : 'Longevity'}</em>
              <CapsLink href={withLocale(places[0].href, locale)}>{fr ? places[0].fr : places[0].en}</CapsLink>
            </span>
            <span>{fr ? 'en cuisine, tenue' : 'cuisine, cooked'}</span>
            <span className="ed-statement-row ed-statement-aside">
              <span className="ed-statement-rest">{fr ? 'avec une précision' : 'with fine-dining'}</span>
              <CapsLink href={withLocale(places[1].href, locale)}>{fr ? places[1].fr : places[1].en}</CapsLink>
            </span>
            <span className="ed-statement-row">
              <span>{fr ? 'gastronomique.' : 'precision.'}</span>
              <CapsLink href={withLocale(places[2].href, locale)}>{fr ? places[2].fr : places[2].en}</CapsLink>
            </span>
          </h2>
          <p className="ed-lede">{h.lede}</p>
          <CapsLink href={withLocale('/services', locale)}>{fr ? 'Découvrir les expériences' : 'Discover the experiences'}</CapsLink>
          <BrandLockup className="ed-lockup-intro" />
        </div>
        <div className="ed-intro-photo">
          <Image src={PHOTOS.hands.src} alt={PHOTOS.hands.alt} fill sizes="(max-width: 800px) 100vw, 50vw" />
          <p className="ed-intro-tag">{fr ? 'Directement du marché' : 'Direct from the market'}</p>
          <p className="ed-intro-word">Riviera</p>
        </div>
      </section>

      <section className="ed-experiences" aria-labelledby="experiences-title">
        <SectionLabel index="01">{h.offersTitle}</SectionLabel>
        <p id="experiences-title" className="ed-experiences-line">
          {t.heroLede}
        </p>
        <LemonSymbol className="ed-symbol-md" />
        <div className="ed-tiles">
          {[
            { photo: PHOTOS.dinner, offer: h.offers[0], sub: `${h.dinnerFigure} ${h.dinnerNote}` },
            { photo: PHOTOS.weekly, offer: h.offers[1], sub: h.offers[1].body },
            { photo: PHOTOS.celebrations, offer: h.offers[2], sub: h.offers[2].body },
          ].map(({ photo, offer, sub }) => (
            <article key={offer.n} className="ed-tile">
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 800px) 100vw, 33vw" />
              <div className="ed-tile-copy">
                <p>{offer.title}</p>
                <p className="ed-italic">{sub}</p>
              </div>
              <Pill href={withLocale('/services', locale)} tone="light">
                {fr ? 'Découvrir' : 'Discover'}
              </Pill>
            </article>
          ))}
        </div>
      </section>

      <section className="ed-chef" id="about" aria-labelledby="about-title">
        <div className="ed-chef-grid">
          <div>
            <SectionLabel index="02">{h.navChef}</SectionLabel>
            <h2 id="about-title">
              {fr ? 'À propos' : 'About'}
              <br />
              <em>{fr ? 'du chef' : 'the Chef'}</em>
            </h2>
            <div className="ed-chef-photo">
              <Image src={PHOTOS.mise.src} alt={PHOTOS.mise.alt} fill sizes="(max-width: 800px) 100vw, 520px" />
            </div>
          </div>
          <div className="ed-chef-copy">
            <div className="ed-chef-cols">
              <p>{h.libraryBody}</p>
              <p>{t.aboutSecond}</p>
            </div>
            <CapsLink href={contact}>{h.cta}</CapsLink>
            <blockquote>
              <p>{credentials[locale].about.split('. ').slice(1).join('. ')}</p>
            </blockquote>
            <p className="ed-script">Adrian Stefan</p>
          </div>
        </div>
        <dl className="ed-stats">
          {stats.map((stat) => (
            <div key={stat.value}>
              <dt>{stat.value}</dt>
              <dd>
                {stat.caption.split('\n').map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="ed-plates" aria-labelledby="plates-title">
        <div className="ed-plates-head">
          <div>
            <SectionLabel index="03">{fr ? 'Depuis la galerie' : 'From the gallery'}</SectionLabel>
            <h2 id="plates-title">
              {fr ? 'Des assiettes,' : 'Plates,'}
              <br />
              <em>{fr ? 'pas des promesses.' : 'not promises.'}</em>
            </h2>
          </div>
          <div>
            <p>
              {fr ? 'Six assiettes de la galerie.' : 'Six plates from the gallery.'}
              <br />
              {fr ? 'Les photographies restent sur cette page.' : 'The photographs stay on that page.'}
            </p>
            <CapsLink href={withLocale('/gallery', locale)}>{fr ? 'Ouvrir la galerie' : 'Open the gallery'}</CapsLink>
          </div>
        </div>
        <ol className="ed-plate-list">
          {plates.map((plate, index) => (
            <li key={plate.id}>
              <Link href={withLocale('/gallery', locale)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{plate.title}</strong>
                <em>{plate.caption}</em>
                <span className="ed-arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="ed-shop" aria-label={fr ? 'Cadeaux et livres' : 'Gifts and books'}>
        <article>
          <div className="ed-shop-photo">
            <Image src={PHOTOS.gift.src} alt={PHOTOS.gift.alt} fill sizes="(max-width: 800px) 100vw, 644px" />
          </div>
          <p className="ed-script">{fr ? 'Pour quelqu’un que vous aimez,' : 'For someone you love,'}</p>
          <h2>{fr ? 'Un dîner, emballé.' : 'A dinner, wrapped.'}</h2>
          <p>
            {fr
              ? `Bons cadeaux de Noël à ${giftPrices}. Paiement en ligne.`
              : `Christmas gift cards at ${giftPrices.replace(/, ([^,]+)$/, ' or $1')}. Pay online.`}
          </p>
          <Pill href={withLocale('/gift', locale)} tone="brass">
            {fr ? 'Choisir un bon cadeau' : 'Choose a gift card'}
          </Pill>
        </article>
        <article className="ed-shop-offset">
          <div className="ed-shop-photo">
            <Image src={PHOTOS.books.src} alt={PHOTOS.books.alt} fill sizes="(max-width: 800px) 100vw, 644px" />
          </div>
          <p className="ed-script">{fr ? 'Pour cuisiner à la maison,' : 'To cook at home,'}</p>
          <h2>{fr ? 'Quatre livres de recettes.' : 'Four recipe e-books.'}</h2>
          <p>
            {fr
              ? `${bookEach} l’un, ou les quatre pour ${bookAll}. Les plats de la table, écrits pour votre cuisine.`
              : `${bookEach} each, or all four for ${bookAll}. The dishes from the table, written for your kitchen.`}
          </p>
          <Pill href={withLocale('/shop/recipe-books', locale)} tone="brass">
            {fr ? 'Voir les livres' : 'Browse the books'}
          </Pill>
        </article>
      </section>

      <section className="review-note ed-worked" aria-labelledby="worked-title">
        <p id="worked-title">{fr ? 'Événements' : 'Worked with'}</p>
        <p className="ed-worked-names">Eden-Roc · amfAR · Dior</p>
        <p>
          <span>{t.googleReview.body}</span>
          <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener">
            {fr ? 'Laissez-nous un avis Google' : 'Leave a Google review'}
          </a>
        </p>
      </section>

      <section className="ed-enquiry ed-on-dark" id="enquire" aria-labelledby="enq-title">
        <LemonSymbol className="ed-symbol-lg" />
        <h2 id="enq-title">
          {fr ? 'Parlez-nous' : 'Tell us about'}
          <br />
          <em>{fr ? 'de votre table.' : 'your table.'}</em>
        </h2>
        <p>{h.beginNote}</p>
        <div className="ed-enquiry-actions">
          <Pill href={contact} tone="brass">
            {h.formLabel}
          </Pill>
          <Pill href={WHATSAPP_URL} tone="light" external>
            WhatsApp
          </Pill>
          <Pill href={INSTAGRAM_URL} tone="light" external>
            {fr ? 'DM Instagram' : 'Instagram DM'}
          </Pill>
          <a className="ed-enquiry-mail" href={`mailto:${CONTACT_INFO.email}`}>
            {CONTACT_INFO.email}
          </a>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ[locale])) }} />
    </div>
  )
}

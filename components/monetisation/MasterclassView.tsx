import Image from 'next/image'
import Link from 'next/link'
import { CONTACT_INFO } from '@/lib/constants'

const CLASS_PHOTOS = {
  hero: {
    src: '/gallery/langoustine.jpeg',
    alt: 'Seared langoustine with broad beans and a butter sauce',
    altFr: 'Langoustine saisie, fèves et beurre',
    caption: 'Fig. 01 · Langoustine',
    captionFr: 'Fig. 01 · Langoustine',
  },
  home: {
    src: '/gallery/seabass.jpeg',
    alt: 'Crisp-skinned seabass with herb oil',
    altFr: 'Bar à la peau croustillante et huile aux herbes',
  },
  table: {
    src: '/gallery/duck-breast.jpeg',
    alt: 'Rosy duck breast with shimeji and a reduced jus',
    altFr: 'Magret rosé, shimeji et jus réduit',
  },
  book: {
    src: '/gallery/burrata-peach.jpeg',
    alt: 'Burrata with peach and tomato',
    altFr: 'Burrata, pêche et tomate',
  },
} as const

function ClassPhoto({ id, locale, priority = false }: { id: keyof typeof CLASS_PHOTOS; locale: 'en' | 'fr'; priority?: boolean }) {
  const photo = CLASS_PHOTOS[id]
  return (
    <div className="ed-class-photo">
      <Image
        src={photo.src}
        alt={locale === 'fr' ? photo.altFr : photo.alt}
        fill
        priority={priority}
        sizes="(min-width: 1100px) 640px, 100vw"
      />
    </div>
  )
}

const COPY = {
  en: {
    eyebrow: 'Classes',
    h1a: 'A class at',
    h1b: 'the table',
    lede: 'An at-home cooking class, or a small-group tasting evening. Cooked with you, on the Côte d’Azur and in Monaco.',
    cta: 'Enquire about a class',
    href: '/contact?intent=masterclass',
    learnA: 'What you learn',
    learnB: 'In your kitchen',
    statement: ['One dish, ', 'the method,', 'and the shopping', 'for it.'],
    script: 'The household is the class.',
    formatsTitle: ['Cooked with you,', 'or served to you.'],
    formatsNote: 'Fees are on request, quoted in €.',
    formats: [
      {
        kicker: 'Format I',
        where: 'At home',
        title: ['At-home', 'cooking class'],
        text: 'Adrian cooks with you in your kitchen. One dish, the method, and the shopping for it. The household is the class.',
        specs: [
          ['Where', 'Your kitchen'],
          ['What', 'One dish, the method, the shopping'],
          ['Who', 'The household'],
          ['Region', 'Côte d’Azur & Monaco'],
        ],
      },
      {
        kicker: 'Format II',
        where: 'Evening',
        title: ['Chef’s', 'table'],
        text: 'A small-group tasting evening. A short menu, served where you are gathered. The number of guests is agreed when you enquire.',
        specs: [
          ['Format', 'A small-group tasting evening'],
          ['Menu', 'A short menu'],
          ['Where', 'Served where you are gathered'],
          ['Guests', 'Agreed when you enquire'],
        ],
      },
    ],
    bookKicker: '03 — Booking',
    bookTitle: ['Write with a', 'preferred date.'],
    steps: [
      'Write with a preferred date.',
      'The evening is confirmed once the quote is accepted.',
      'Fees are on request, quoted in €.',
    ],
    megaA: 'À ',
    megaB: 'table',
    marquee: ['At-home cooking class', 'Chef’s table', 'Côte d’Azur & Monaco', 'Fees on request', 'Quoted in €', 'Write with a preferred date', 'The household is the class'],
    stats: [
      ['I.', 'One dish'],
      ['II.', 'The method'],
      ['III.', 'The shopping'],
    ],
  },
  fr: {
    eyebrow: 'Cours',
    h1a: 'Un cours à',
    h1b: 'la table',
    lede: 'Un cours de cuisine à domicile, ou une dégustation en petit groupe. Avec vous, sur la Côte d’Azur et à Monaco.',
    cta: 'Demander un cours',
    href: '/fr/contact?intent=masterclass',
    learnA: 'Ce que vous apprenez',
    learnB: 'Dans votre cuisine',
    statement: ['Un plat, ', 'la méthode,', 'et les courses', 'pour le faire.'],
    script: 'La maison est le cours.',
    formatsTitle: ['Cuisiné avec vous,', 'ou servi pour vous.'],
    formatsNote: 'Honoraires sur demande, en €.',
    formats: [
      {
        kicker: 'Format I',
        where: 'À domicile',
        title: ['Cours de cuisine', 'à domicile'],
        text: 'Adrian cuisine avec vous, dans votre cuisine. Un plat, la méthode, et les courses. La maison est le cours.',
        specs: [
          ['Où', 'Votre cuisine'],
          ['Quoi', 'Un plat, la méthode, les courses'],
          ['Qui', 'La maison'],
          ['Région', 'Côte d’Azur & Monaco'],
        ],
      },
      {
        kicker: 'Format II',
        where: 'Soirée',
        title: ['Table', 'du chef'],
        text: 'Une dégustation en petit groupe. Un menu court, servi là où vous êtes réunis. Le nombre de convives se décide à la demande.',
        specs: [
          ['Format', 'Une dégustation en petit groupe'],
          ['Menu', 'Un menu court'],
          ['Où', 'Servi là où vous êtes réunis'],
          ['Convives', 'Se décide à la demande'],
        ],
      },
    ],
    bookKicker: '03 — Réservation',
    bookTitle: ['Écrivez avec une', 'date souhaitée.'],
    steps: [
      'Écrivez avec une date souhaitée.',
      'La soirée est confirmée une fois le devis accepté.',
      'Honoraires sur demande, en €.',
    ],
    megaA: 'À ',
    megaB: 'table',
    marquee: ['Cours de cuisine à domicile', 'Table du chef', 'Côte d’Azur & Monaco', 'Honoraires sur demande', 'En €', 'Une date souhaitée', 'La maison est le cours'],
    stats: [
      ['I.', 'Un plat'],
      ['II.', 'La méthode'],
      ['III.', 'Les courses'],
    ],
  },
} as const

export function MasterclassView({ locale }: { locale: 'en' | 'fr' }) {
  const t = COPY[locale]
  return (
    <div className="ed ed-class">
      <section className="ed-class-hero" aria-labelledby="class-title">
        <div className="ed-class-head">
          <div>
            <p className="ed-kicker">
              <span>01</span>
              <i aria-hidden="true" />
              <span className="ed-kicker-name">{t.eyebrow}</span>
            </p>
            <h1 id="class-title">
              <span>{t.h1a}</span>
              <span className="ed-italic">{t.h1b}</span>
            </h1>
          </div>
          <div className="ed-class-intro">
            <p>{t.lede}</p>
            <Link className="ed-pill ed-pill-filled" href={t.href}>
              <span>{t.cta}</span>
              <span className="ed-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <ClassPhoto id="hero" locale={locale} priority />
        <p className="ed-class-caption">
          <span>{locale === 'fr' ? CLASS_PHOTOS.hero.captionFr : CLASS_PHOTOS.hero.caption}</span>
          <span>Côte d’Azur · Monaco</span>
        </p>
      </section>

      <div className="ed-marquee">
        <div className="ed-marquee-track">
          {[0, 1].map((copyIndex) => (
            <p key={copyIndex} className="ed-marquee-set" aria-hidden={copyIndex === 1}>
              {t.marquee.map((item) => (
                <span key={`${copyIndex}-${item}`}>
                  {item}
                  <span className="ed-dot" aria-hidden="true"> · </span>
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <section className="ed-class-learn" aria-labelledby="class-learn-title">
        <div className="ed-class-learn-links">
          <a className="ed-caps" href="#formats">{t.learnA}</a>
          <a className="ed-caps" href="#formats">{t.learnB}</a>
        </div>
        <h2 id="class-learn-title">
          <span>{t.statement[0]}<em>{t.statement[1]}</em></span>
          <span>{t.statement[2]}</span>
          <span className="ed-italic">{t.statement[3]}</span>
        </h2>
        <dl>
          {t.stats.map(([value, caption]) => (
            <div key={value}>
              <dt>{value}</dt>
              <dd>{caption}</dd>
            </div>
          ))}
        </dl>
        <p className="ed-script">{t.script}</p>
      </section>

      <section className="ed-class-formats" id="formats" aria-labelledby="class-formats-title">
        <div className="ed-class-formats-head">
          <div>
            <p className="ed-kicker">
              <span>02</span>
              <i aria-hidden="true" />
              <span className="ed-kicker-name">{locale === 'fr' ? 'Formats' : 'Formats'}</span>
            </p>
            <h2 id="class-formats-title">
              <span>{t.formatsTitle[0]}</span>
              <span className="ed-italic">{t.formatsTitle[1]}</span>
            </h2>
          </div>
          <p>{t.formatsNote}</p>
        </div>
        <div className="ed-class-cols">
          {t.formats.map((format, index) => (
            <article key={format.kicker} className={index === 1 ? 'ed-class-offset' : undefined}>
              <ClassPhoto id={index === 0 ? 'home' : 'table'} locale={locale} />
              <p className="ed-class-meta">
                <span>{format.kicker}</span>
                <span>{format.where}</span>
              </p>
              <h3>
                <span>{format.title[0]}</span>
                <span className="ed-italic">{format.title[1]}</span>
              </h3>
              <p>{format.text}</p>
              <dl>
                {format.specs.map(([label, value]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <Link className="ed-caps" href={t.href}>{locale === 'fr' ? 'Demander' : 'Enquire'}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="ed-class-book ed-on-dark" aria-labelledby="class-book-title">
        <div className="ed-class-book-row">
          <div>
            <p>{t.bookKicker}</p>
            <h2 id="class-book-title">
              <span>{t.bookTitle[0]}</span>
              <span className="ed-italic">{t.bookTitle[1]}</span>
            </h2>
            <ol>
              {t.steps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="ed-class-book-actions">
              <Link className="ed-pill ed-pill-light" href={t.href}>
                <span>{t.cta}</span>
                <span className="ed-arrow" aria-hidden="true">→</span>
              </Link>
              <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
            </div>
          </div>
          <ClassPhoto id="book" locale={locale} />
        </div>
        <p className="ed-class-mega" aria-hidden="true">
          {t.megaA}<em>{t.megaB}</em>
        </p>
      </section>
    </div>
  )
}

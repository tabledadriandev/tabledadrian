import Image from 'next/image'
import Link from 'next/link'
import { LemonSymbol, Pill, SectionLabel } from '@/components/editorial/ui'
import type { Locale } from '@/lib/copy'
import { credentials } from '@/lib/credentials'
import { WHATSAPP_URL } from '@/lib/constants'
import { toLocalePath } from '@/lib/routes'

type Tile = { n: string; title: string; body: string; meta: string; href: string; label: string; src: string; alt: string }

const COPY = {
  en: {
    metaLeft: ['Experiences', 'Côte d’Azur & Monaco'],
    metaRight: ['From Monaco', 'to Saint-Tropez'],
    title: 'Private chef',
    titleEm: 'services',
    script: 'cooked in your kitchen',
    lede: 'Private dinners, villa weeks, yacht galleys and celebrations, cooked in your kitchen on the Côte d’Azur and in Monaco.',
    enquire: 'Enquire',
    whatsapp: 'Message on WhatsApp',
    offersIndex: '01',
    offersLabel: 'The offers',
    offersTitle: 'Three ways to',
    offersEm: 'set the table',
    offersNote: 'Every menu is composed around your guests and the season’s market. Adrian replies personally.',
    marquee: ['Private dinners', 'Weekly meals', 'Celebrations & corporate', 'Villa chef', 'Yacht chef', 'Events & weddings', 'Free travel 30 km'],
    band: '02 · Villa · Yacht · Events',
    bandTitle: 'Also on ',
    bandEm: 'this coast',
    bandBody: 'Villa weeks on the peninsula, galley cooking at anchor or underway, and wedding weekends cooked in the house kitchen.',
    howIndex: '03',
    howLabel: 'How it works',
    howTitle: 'From enquiry',
    howMid: 'to ',
    howEm: 'your table',
    placesIndex: '04',
    placesLabel: 'Where we cook',
    placesTitle: 'Côte d’Azur ',
    placesEm: '& Monaco',
    placesNote: 'Free travel within 30 km of Antibes',
    closeTitle: 'Book your',
    closeEm: 'experience',
    closeNote: 'Fees on request, quoted in € · Adrian replies personally',
    stats: [
      ['2–25', 'guests per table, on request'],
      ['10+', 'years in fine kitchens'],
      ['30 km', 'free travel from Antibes'],
      ['EHL', 'Swiss-trained; Nutrition, Stanford'],
    ] as [string, string][],
  },
  fr: {
    metaLeft: ['Expériences', 'Côte d’Azur et Monaco'],
    metaRight: ['De Monaco', 'à Saint-Tropez'],
    title: 'Chef privé',
    titleEm: 'services',
    script: 'cuisiné dans votre cuisine',
    lede: 'Dîners privés, semaines en villa, offices de yacht et célébrations, cuisinés dans votre cuisine sur la Côte d’Azur et à Monaco.',
    enquire: 'Demander',
    whatsapp: 'Message sur WhatsApp',
    offersIndex: '01',
    offersLabel: 'Les offres',
    offersTitle: 'Trois façons de',
    offersEm: 'mettre la table',
    offersNote: 'Chaque menu se compose autour de vos convives et du marché de saison. Adrian répond personnellement.',
    marquee: ['Dîners privés', 'Repas de la semaine', 'Célébrations et entreprises', 'Chef en villa', 'Chef de yacht', 'Événements et mariages', 'Déplacement offert 30 km'],
    band: '02 · Villa · Yacht · Événements',
    bandTitle: 'Aussi sur ',
    bandEm: 'cette côte',
    bandBody: 'Semaines en villa sur la presqu’île, cuisine en office au mouillage ou en navigation, et week-ends de mariage cuisinés dans la cuisine de la maison.',
    howIndex: '03',
    howLabel: 'Comment cela se passe',
    howTitle: 'De la demande',
    howMid: 'à ',
    howEm: 'votre table',
    placesIndex: '04',
    placesLabel: 'Où nous cuisinons',
    placesTitle: 'Côte d’Azur ',
    placesEm: 'et Monaco',
    placesNote: 'Déplacement offert dans un rayon de 30 km d’Antibes',
    closeTitle: 'Réservez votre',
    closeEm: 'expérience',
    closeNote: 'Honoraires sur demande, devis en € · Adrian répond personnellement',
    stats: [
      ['2–25', 'convives par table, sur demande'],
      ['10+', 'années en cuisine'],
      ['30 km', 'déplacement offert depuis Antibes'],
      ['EHL', 'Formation suisse ; Nutrition, Stanford'],
    ] as [string, string][],
  },
} as const

function tiles(locale: Locale): { offers: Tile[]; coast: Tile[] } {
  const enquire = COPY[locale].enquire
  if (locale === 'fr') {
    return {
      offers: [
        {
          n: '01',
          title: 'Dîners privés',
          body: 'Menus en plusieurs services, composés autour de vos convives et du marché de saison.',
          meta: '2–25 convives, sur demande',
          href: '/contact',
          label: enquire,
          src: '/editorial/exp-dinners.webp',
          alt: 'A long candlelit table set for dinner beside the sea',
        },
        {
          n: '02',
          title: 'Repas de la semaine',
          body: 'Des dîners calmes, de niveau restaurant, à la maison, semaine après semaine.',
          meta: 'Déplacement offert dans un rayon de 30 km d’Antibes',
          href: '/contact',
          label: enquire,
          src: '/editorial/exp-weekly.webp',
          alt: 'A plated fish course on a set dining table',
        },
        {
          n: '03',
          title: 'Célébrations et entreprises',
          body: 'Anniversaires, dîners de conseil et étapes, cuisinés sur place.',
          meta: 'Honoraires sur demande, devis en €',
          href: '/contact',
          label: enquire,
          src: '/editorial/exp-celebrations.webp',
          alt: 'A celebration table with candles and flowers',
        },
      ],
      coast: [
        {
          n: '04',
          title: 'Chef en villa',
          body: 'Petit-déjeuner, déjeuner et dîner pendant une semaine, avec les courses du matin.',
          meta: 'Cannes · Cap Ferrat · Ramatuelle',
          href: '/villa-chef',
          label: 'Chef en villa',
          src: '/editorial/exp-villa.webp',
          alt: 'A plated dish on a terrace table at dusk',
        },
        {
          n: '05',
          title: 'Chef de yacht',
          body: 'Cuisine d’office pour les personnes à bord, au mouillage ou en navigation.',
          meta: '2–25 convives · Antibes à Saint-Tropez',
          href: '/yacht-chef',
          label: 'Chef de yacht',
          src: '/editorial/exp-yacht.webp',
          alt: 'A yacht deck set for dinner at sea',
        },
        {
          n: '06',
          title: 'Événements et mariages',
          body: 'Week-ends de mariage ou listes plus longues, avec un devis sur mesure, sur demande.',
          meta: 'Menu convenu par écrit',
          href: '/events-and-weddings',
          label: 'Événements et mariages',
          src: '/editorial/exp-events.webp',
          alt: 'A long wedding table under the trees',
        },
      ],
    }
  }
  return {
    offers: [
      {
        n: '01',
        title: 'Private dinners',
        body: 'Multi-course menus composed around your guests and the season’s market.',
        meta: '2–25 guests, on request',
        href: '/contact',
        label: enquire,
        src: '/editorial/exp-dinners.webp',
        alt: 'A long candlelit table set for dinner beside the sea',
      },
      {
        n: '02',
        title: 'Weekly meals',
        body: 'Quiet, restaurant-quality dinners at home, week after week.',
        meta: 'Free travel within 30 km of Antibes',
        href: '/contact',
        label: enquire,
        src: '/editorial/exp-weekly.webp',
        alt: 'A plated fish course on a set dining table',
      },
      {
        n: '03',
        title: 'Celebrations & corporate',
        body: 'Anniversaries, board dinners and milestones, cooked on site.',
        meta: 'Fees on request, quoted in €',
        href: '/contact',
        label: enquire,
        src: '/editorial/exp-celebrations.webp',
        alt: 'A celebration table with candles and flowers',
      },
    ],
    coast: [
      {
        n: '04',
        title: 'Villa chef',
        body: 'Breakfast, lunch and dinner for a week, with ingredients bought that morning.',
        meta: 'Cannes · Cap Ferrat · Ramatuelle',
        href: '/villa-chef',
        label: 'Villa chef',
        src: '/editorial/exp-villa.webp',
        alt: 'A plated dish on a terrace table at dusk',
      },
      {
        n: '05',
        title: 'Yacht chef',
        body: 'Galley cooking for the people on board, at anchor or underway.',
        meta: '2–25 guests · Antibes to Saint-Tropez',
        href: '/yacht-chef',
        label: 'Yacht chef',
        src: '/editorial/exp-yacht.webp',
        alt: 'A yacht deck set for dinner at sea',
      },
      {
        n: '06',
        title: 'Events & weddings',
        body: 'Wedding weekends or larger guest lists, with a tailored quote on request.',
        meta: 'Menu agreed in writing',
        href: '/events-and-weddings',
        label: 'Events & weddings',
        src: '/editorial/exp-events.webp',
        alt: 'A long wedding table under the trees',
      },
    ],
  }
}

function steps(locale: Locale) {
  if (locale === 'fr') {
    return [
      ['01', 'Demander', 'Par formulaire, WhatsApp, DM Instagram (@tabledadrian) ou adrian@tabledadrian.com. Indiquez l’occasion, le nombre de convives, les notes alimentaires et une date si elle est connue. Réponse sous 24 heures.'],
      ['02', 'Devis', 'Les honoraires sont sur demande et devisés en € — il n’y a pas de tarif publié. Le menu est convenu par écrit ; la date est retenue une fois le devis accepté.'],
      ['03', 'Marché', 'Les courses se font le matin même. Les menus suivent le goût, la saison et le marché ; allergies et préférences passent sur la liste.'],
      ['04', 'À table', 'Adrian cuisine dans votre cuisine. Courses, service et rangement s’arrangent avec la réservation, sur demande.'],
    ]
  }
  return [
    ['01', 'Enquire', 'By form, WhatsApp, Instagram DM (@tabledadrian) or adrian@tabledadrian.com. Share the occasion, number of guests, dietary notes and a date if known. Replies within 24 hours.'],
    ['02', 'Quote', 'Fees are on request and quoted in € — there is no published tariff. The menu is agreed in writing; the date is held once the quote is accepted.'],
    ['03', 'Market', 'Ingredients are bought that morning. Menus follow taste, the season and the market; allergies and preferences go onto the shopping list.'],
    ['04', 'At the table', 'Adrian cooks in your kitchen. Shopping, service and clearing are arranged with the booking, on request.'],
  ]
}

function placesRows(locale: Locale) {
  if (locale === 'fr') {
    return [
      ['01', 'Nice', 'Matins de marché et dîners au-dessus de la Baie des Anges.', '/private-chef-nice'],
      ['02', 'Cannes', 'Séjours de week-end et tables de saison du Festival.', '/private-chef-cannes'],
      ['03', 'Antibes', 'Cap d’Antibes et le port, cuisinés dans la cuisine de la maison.', '/private-chef-antibes'],
      ['04', 'Monaco', 'Cuisines d’appartement compactes à Monte-Carlo.', '/private-chef-monaco'],
      ['05', 'Saint-Tropez', 'Semaines en villa sur la presqu’île et à Ramatuelle.', '/private-chef-saint-tropez'],
      ['06', 'Saint-Jean-Cap-Ferrat', 'Cuisines de villa entre Nice et Monaco.', '/private-chef-saint-jean-cap-ferrat'],
    ]
  }
  return [
    ['01', 'Nice', 'Market mornings and dinners above the Baie des Anges.', '/private-chef-nice'],
    ['02', 'Cannes', 'Weekend stays and Festival-season tables.', '/private-chef-cannes'],
    ['03', 'Antibes', 'Cap d’Antibes and the port, cooked in the house kitchen.', '/private-chef-antibes'],
    ['04', 'Monaco', 'Compact apartment kitchens in Monte-Carlo.', '/private-chef-monaco'],
    ['05', 'Saint-Tropez', 'Villa weeks on the peninsula and in Ramatuelle.', '/private-chef-saint-tropez'],
    ['06', 'Saint-Jean-Cap-Ferrat', 'Villa kitchens between Nice and Monaco.', '/private-chef-saint-jean-cap-ferrat'],
  ]
}

function ExperienceTile({ tile, locale }: { tile: Tile; locale: Locale }) {
  const href = tile.href.startsWith('http') ? tile.href : toLocalePath(tile.href, locale)
  return (
    <article className="ed-xp-tile">
      <div className="ed-photo">
        <Image src={tile.src} alt={tile.alt} fill sizes="(min-width: 1100px) 421px, 100vw" />
      </div>
      <div className="ed-xp-shade" aria-hidden="true" />
      <div className="ed-xp-tile-top">
        <p>{tile.n}</p>
        <i aria-hidden="true" />
        <p>{tile.title}</p>
      </div>
      <div className="ed-xp-tile-bot">
        <p>{tile.body}</p>
        <p>{tile.meta}</p>
        <Pill href={href} tone="light">
          {tile.label}
        </Pill>
      </div>
    </article>
  )
}

export function ServicesView({ locale }: { locale: Locale }) {
  const t = COPY[locale]
  const cred = credentials[locale]
  const contact = toLocalePath('/contact', locale)
  const { offers, coast } = tiles(locale)
  const how =
    locale === 'fr'
      ? `${cred.ehl}, ${cred.years} et un ${cred.stanford}. La cuisine est la vôtre ; ce qui s’y prépare est une cuisine de longévité — de saison et méditerranéenne, jamais une allégation médicale.`
      : `${cred.ehl}, ${cred.years} and a ${cred.stanford}. The kitchen is yours; the cooking is longevity cuisine — seasonal and Mediterranean, never a medical claim.`

  return (
    <div className="ed-xp">
      <header className="ed-xp-hero">
        <p className="ed-xp-meta">
          {t.metaLeft[0]}
          <br />
          {t.metaLeft[1]}
        </p>
        <p className="ed-xp-meta is-right">
          {t.metaRight[0]}
          <br />
          {t.metaRight[1]}
        </p>
        <h1>
          {t.title}
          <em>{t.titleEm}</em>
        </h1>
        <p className="ed-script ed-xp-script">{t.script}</p>
        <p className="ed-xp-lede">{t.lede}</p>
        <div className="ed-xp-actions">
          <Pill href={contact} tone="filled">
            {t.enquire}
          </Pill>
          <Pill href={WHATSAPP_URL} tone="outline" external>
            {t.whatsapp}
          </Pill>
        </div>
      </header>

      <section className="ed-xp-offers">
        <div className="ed-xp-head">
          <div>
            <SectionLabel index={t.offersIndex}>{t.offersLabel}</SectionLabel>
            <h2>
              {t.offersTitle}
              <em>{t.offersEm}</em>
            </h2>
          </div>
          <p>{t.offersNote}</p>
        </div>
        <i className="ed-xp-rule" aria-hidden="true" />
        <div className="ed-xp-tiles">
          {offers.map((tile) => (
            <ExperienceTile key={tile.n} tile={tile} locale={locale} />
          ))}
        </div>
      </section>

      <div className="ed-xp-marquee">
        {t.marquee.map((item, index) => (
          <p key={item}>
            {index > 0 ? <span aria-hidden="true">·</span> : null}
            {item}
          </p>
        ))}
      </div>

      <section className="ed-xp-band ed-on-dark">
        <p>{t.band}</p>
        <h2>
          {t.bandTitle}
          <em>{t.bandEm}</em>
        </h2>
        <p>{t.bandBody}</p>
        <div className="ed-xp-tiles">
          {coast.map((tile) => (
            <ExperienceTile key={tile.n} tile={tile} locale={locale} />
          ))}
        </div>
      </section>

      <section className="ed-xp-how">
        <div className="ed-xp-how-split">
          <div>
            <SectionLabel index={t.howIndex}>{t.howLabel}</SectionLabel>
            <h2>
              {t.howTitle}
              <span>
                {t.howMid}
                <em>{t.howEm}</em>
              </span>
            </h2>
            <p>{how}</p>
          </div>
          <ol>
            {steps(locale).map(([n, title, body]) => (
              <li key={n}>
                <span>{n}</span>
                <i aria-hidden="true" />
                <strong>{title}</strong>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </div>
        <ul className="ed-xp-stats">
          {t.stats.map(([value, caption]) => (
            <li key={value}>
              <strong>{value}</strong>
              <span>{caption}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="ed-xp-places">
        <div className="ed-xp-head">
          <div>
            <SectionLabel index={t.placesIndex}>{t.placesLabel}</SectionLabel>
            <h2>
              {t.placesTitle}
              <em>{t.placesEm}</em>
            </h2>
          </div>
          <p>{t.placesNote}</p>
        </div>
        <div className="ed-xp-place-grid">
          {placesRows(locale).map(([n, title, body, href]) => (
            <Link key={n} className="ed-row" href={toLocalePath(href, locale)}>
              <div className="ed-row-head">
                <span>{n}</span>
                <p>{title}</p>
              </div>
              <p className="ed-row-body">{body}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="ed-xp-close">
        <LemonSymbol className="ed-symbol-xl" />
        <h2>
          {t.closeTitle}
          <em>{t.closeEm}</em>
        </h2>
        <p>{t.closeNote}</p>
        <div className="ed-xp-actions">
          <Pill href={contact} tone="filled">
            {t.enquire}
          </Pill>
          <Pill href={WHATSAPP_URL} tone="outline" external>
            {t.whatsapp}
          </Pill>
        </div>
      </section>
    </div>
  )
}

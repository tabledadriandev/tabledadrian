import Image from 'next/image'
import Link from 'next/link'
import { BrandLockup, Callout, CapsLink, Pill, SectionLabel } from '@/components/editorial/ui'
import type { Locale } from '@/lib/copy'
import { credentials } from '@/lib/credentials'
import { WHATSAPP_URL } from '@/lib/constants'
import { faqJsonLd } from '@/lib/schema'
import { toLocalePath } from '@/lib/routes'

export type PlaceId = 'villa' | 'yacht' | 'events'

type Row = { n: string; title: string; body?: string; href?: string }
type Place = {
  long?: boolean
  metaLeft: [string, string]
  metaRight: [string, string]
  title: string
  subtitle: string
  book: string
  hero: { src: string; alt: string }
  callouts: [
    { lines: [string, string]; direction: 'left' | 'right' },
    { lines: [string, string]; direction: 'left' | 'right' },
  ]
  mega: string
  splitIndex: string
  splitLabel: string
  before: string
  em: string
  after: string
  bodies: [string, string]
  links: { href: string; label: string }[]
  side: { src: string; alt: string; caption: string; word: string }
  columns: { index: string; label: string; title: string; titleEm: string; rows: Row[] }[]
  questions: { q: string; a: string }[]
  closeKicker: string
}

const CLOSE_BODY = {
  en: 'Enquire by form, Instagram DM (@tabledadrian) or adrian@tabledadrian.com. Include the occasion, number of guests, dietary notes and a date if known.',
  fr: "Écrivez par formulaire, en DM Instagram (@tabledadrian) ou à adrian@tabledadrian.com. Indiquez l'occasion, le nombre de convives, les notes alimentaires et une date si elle est connue.",
} as const

const QUESTIONS = {
  en: { label: 'Questions', title: 'Before you', em: 'enquire' },
  fr: { label: 'Questions', title: 'Avant de', em: 'demander' },
} as const

const BOOK = { en: 'Book your experience', fr: 'Réserver votre expérience' } as const
const WHATSAPP = { en: 'Message on WhatsApp', fr: 'Message sur WhatsApp' } as const
const CLOSE_TITLE = { en: ['Book your', 'experience'], fr: ['Réservez votre', 'expérience'] } as const

function places(locale: Locale): Record<PlaceId, Place> {
  if (locale === 'fr') {
    return {
      villa: {
        metaLeft: ['Chef en villa', 'Côte d’Azur et Monaco'],
        metaRight: ['Une semaine dans votre villa', 'Cannes · Cap Ferrat · Ramatuelle'],
        title: 'Chef en villa,',
        subtitle: 'Côte d’Azur et Monaco',
        book: BOOK.fr,
        hero: { src: '/editorial/villa-terrace.webp', alt: 'Villa terrace dinner at dusk' },
        callouts: [
          { lines: ['Le dîner se décide', 'chaque matin au marché'], direction: 'left' },
          { lines: ['Cuisiné dans la', 'cuisine de la villa'], direction: 'right' },
        ],
        mega: 'Chef en villa',
        splitIndex: '01',
        splitLabel: 'La semaine en villa',
        before: 'Petit-déjeuner, un déjeuner tardif si vous le souhaitez, et ',
        em: 'le dîner décidé chaque matin',
        after: ' au marché local.',
        bodies: [
          'Un chef dans votre villa pour une semaine. Votre cuisine est utilisée, et les courses font partie du quotidien. Préférences et allergies sont prises en compte sur demande.',
          'Cuisine de longévité — de saison et méditerranéenne, jamais une allégation médicale. Vivre dans la maison pendant la semaine en villa fait partie du service.',
        ],
        links: [
          { href: '/menus', label: 'Voir les menus' },
          { href: '/yacht-chef', label: 'Chef de yacht' },
          { href: '/events-and-weddings', label: 'Événements et mariages' },
        ],
        side: {
          src: '/editorial/villa-market.webp',
          alt: 'Market basket in the morning',
          caption: 'Courses du matin',
          word: 'Ramatuelle',
        },
        columns: [
          {
            index: '02',
            label: 'Maisons où nous cuisinons',
            title: 'Maisons où',
            titleEm: 'nous cuisinons',
            rows: [
              { n: '01', title: 'Les collines au-dessus de Cannes', body: 'Séjours de week-end et tables de saison du Festival.', href: '/private-chef-cannes' },
              { n: '02', title: 'Cap Ferrat', body: 'Cuisines de villa entre Nice et Monaco.', href: '/private-chef-saint-jean-cap-ferrat' },
              { n: '03', title: 'Ramatuelle', body: 'Semaines en villa sur la presqu’île, près de Saint-Tropez.', href: '/private-chef-saint-tropez' },
            ],
          },
          {
            index: '03',
            label: 'Aussi sur cette côte',
            title: 'Aussi sur',
            titleEm: 'cette côte',
            rows: [
              { n: '01', title: 'Chef de yacht', body: 'Cuisine d’office pour les personnes à bord, au mouillage ou en navigation.', href: '/yacht-chef' },
              { n: '02', title: 'Événements et mariages', body: 'Week-ends de mariage ou listes plus longues, avec un devis sur mesure, sur demande.', href: '/events-and-weddings' },
              { n: '03', title: 'Dîners privés', body: 'Tables de 2 à 25 convives, de Monaco à Saint-Tropez.', href: '/private-chef-cote-d-azur' },
            ],
          },
        ],
        questions: [
          { q: 'Que coûte une semaine en villa ?', a: 'Les honoraires sont sur demande et devisés en €. Aucun tarif par personne n’est publié.' },
          { q: 'Que fait le chef ?', a: 'Il cuisine dans votre cuisine. Courses, service et rangement s’arrangent avec la réservation, sur demande.' },
          { q: 'Combien de temps à l’avance réserver ?', a: 'Le délai est sur demande. Réservez tôt pour l’été, le Festival de Cannes et le Grand Prix.' },
          { q: 'Les menus peuvent-ils suivre un régime ?', a: 'Oui, sur demande. Les menus suivent le goût et les préférences, pas un avis médical.' },
        ],
        closeKicker: 'Chef en villa · Honoraires sur demande, devis en €',
      },
      yacht: {
        metaLeft: ['Chef de yacht', 'Côte d’Azur et Monaco'],
        metaRight: ['2–25 convives', 'Au mouillage ou en navigation'],
        title: 'Chef de yacht,',
        subtitle: 'Côte d’Azur et Monaco',
        book: BOOK.fr,
        hero: { src: '/editorial/yacht-deck.webp', alt: 'Yacht deck table set for dinner at sea' },
        callouts: [
          { lines: ['Tartare de saumon,', 'dressé pour le dîner en mer'], direction: 'left' },
          { lines: ['Dîner quand le', 'bateau est à l’arrêt'], direction: 'right' },
        ],
        mega: 'Chef de yacht',
        splitIndex: '01',
        splitLabel: 'L’office',
        before: 'Petit-déjeuner, ',
        em: 'déjeuner en navigation',
        after: ', et dîner dans le carré quand le bateau est à l’arrêt.',
        bodies: [
          'Le chef cuisine pour les personnes à bord et tient l’office à l’écart, que le bateau navigue ou soit amarré à Antibes, Monaco ou Saint-Tropez.',
          'L’avitaillement, le menu et les notes alimentaires sont convenus par écrit avant le départ. Allergies et préférences passent sur la liste de courses.',
        ],
        links: [
          { href: '/menus', label: 'Voir les menus' },
          { href: '/villa-chef', label: 'Chef en villa' },
          { href: '/events-and-weddings', label: 'Événements et mariages' },
        ],
        side: {
          src: '/editorial/yacht-tagliatelle.webp',
          alt: 'Squid-ink tagliatelle',
          caption: 'Tagliatelles à l’encre',
          word: 'Office',
        },
        columns: [
          {
            index: '02',
            label: 'Assiettes',
            title: 'Assiettes de',
            titleEm: 'l’office',
            rows: [
              { n: '01', title: 'Bar', body: 'Cuisine méditerranéenne de saison, du marché.' },
              { n: '02', title: 'Tartare de saumon', body: 'Les menus suivent le goût et les produits de saison.' },
              { n: '03', title: 'Tagliatelles à l’encre', body: 'Allergies et préférences passent sur la liste de courses.' },
            ],
          },
          {
            index: '03',
            label: 'Où le bateau se tient',
            title: 'Où le bateau',
            titleEm: 'se tient d’habitude',
            rows: [
              { n: '01', title: 'Antibes', href: '/private-chef-antibes' },
              { n: '02', title: 'Monaco', href: '/private-chef-monaco' },
              { n: '03', title: 'Cannes', href: '/private-chef-cannes' },
              { n: '04', title: 'Villefranche-sur-Mer' },
              { n: '05', title: 'Saint-Tropez', href: '/private-chef-saint-tropez' },
            ],
          },
        ],
        questions: [
          { q: 'Combien de convives à bord ?', a: 'De 2 à 25 convives.' },
          { q: 'Comment les honoraires sont-ils devisés ?', a: 'Sur demande, en €. Il n’y a pas de tarif publié.' },
          { q: 'Des villas aussi bien que des yachts ?', a: 'Oui. Sur un yacht, le chef travaille dans l’office, sur demande.' },
          { q: 'Comment demander ?', a: 'Par formulaire, WhatsApp, Instagram ou e-mail. Réponse sous 24 heures.' },
        ],
        closeKicker: 'Chef de yacht · Une soirée ou une semaine à bord',
      },
      events: {
        long: true,
        metaLeft: ['Événements et mariages', 'Côte d’Azur'],
        metaRight: ['Menu convenu par écrit', 'avant que la date soit retenue'],
        title: 'Événements et mariages,',
        subtitle: 'Côte d’Azur',
        book: 'Demander pour un événement',
        hero: { src: '/editorial/events-table.webp', alt: 'Long wedding table under olive trees' },
        callouts: [
          { lines: ['Cuisiné dans la', 'cuisine de la maison'], direction: 'left' },
          { lines: ['Fleurs et photo', 'restent à vos prestataires'], direction: 'right' },
        ],
        mega: 'Mariages',
        splitIndex: '01',
        splitLabel: 'La célébration',
        before: 'Un week-end de mariage, un anniversaire, ou ',
        em: 'un dîner pour une liste plus longue.',
        after: '',
        bodies: [
          'Le menu est convenu par écrit, la date est retenue une fois le devis accepté, et la cuisine se fait dans la cuisine de la maison.',
          'Fleurs, photographie et service du vin restent à vos prestataires si vous le souhaitez. La cuisine couvre le repas. Préférences et allergies sont prises en compte sur demande.',
        ],
        links: [
          { href: '/menus', label: 'Voir les menus' },
          { href: '/villa-chef', label: 'Chef en villa' },
          { href: '/yacht-chef', label: 'Chef de yacht' },
        ],
        side: {
          src: '/editorial/events-setting.webp',
          alt: 'Wedding place setting',
          caption: 'Menu convenu par écrit',
          word: 'Mougins',
        },
        columns: [
          {
            index: '02',
            label: 'Forfaits entreprises et événements',
            title: 'Forfaits',
            titleEm: 'entreprises et événements',
            rows: [
              { n: '01', title: 'Week-end de mariage', body: 'Un menu de week-end cuisiné dans la cuisine de la maison. Fleurs et photographie restent à vos prestataires.' },
              { n: '02', title: 'Dîner de célébration', body: 'Un anniversaire ou une plus longue table, le menu convenu par écrit avant que la date soit retenue.' },
              { n: '03', title: 'Dîner d’entreprise', body: 'Un dîner de conseil ou une table client, la cuisine couvrant le repas.' },
              { n: '04', title: 'Déjeuner de liste', body: 'Une table de jour, quand la soirée n’est pas le sujet.' },
            ],
          },
          {
            index: '03',
            label: 'Où les célébrations ont lieu',
            title: 'Où les célébrations',
            titleEm: 'se tiennent d’habitude',
            rows: [
              { n: '01', title: 'Cannes', href: '/private-chef-cannes' },
              { n: '02', title: 'Antibes', href: '/private-chef-antibes' },
              { n: '03', title: 'Mougins' },
              { n: '04', title: 'Monaco', href: '/private-chef-monaco' },
              { n: '05', title: 'Saint-Tropez', href: '/private-chef-saint-tropez' },
              { n: '06', title: 'Nice', href: '/private-chef-nice' },
            ],
          },
        ],
        questions: [
          { q: 'Que cela coûte-t-il ?', a: 'Les honoraires sont sur demande, en €. Chaque forfait est devisé pour la date et la liste ; il n’y a pas de tarif par personne.' },
          { q: 'Combien de temps à l’avance réserver ?', a: 'Le délai est sur demande. Réservez tôt pour l’été, le Festival de Cannes et le Grand Prix.' },
          { q: 'Que couvre la cuisine ?', a: 'Le chef cuisine dans votre cuisine. Courses, service et rangement s’arrangent sur demande.' },
          { q: 'Les menus peuvent-ils suivre un régime ?', a: 'Sur demande. Les menus suivent le goût et les préférences, pas un avis médical.' },
        ],
        closeKicker: 'Événements et mariages · Devis pour la date et la liste',
      },
    }
  }

  return {
    villa: {
      metaLeft: ['Villa chef', 'Côte d’Azur & Monaco'],
      metaRight: ['A week in your villa', 'Cannes · Cap Ferrat · Ramatuelle'],
      title: 'Villa chef,',
      subtitle: 'Côte d’Azur and Monaco',
      book: BOOK.en,
      hero: { src: '/editorial/villa-terrace.webp', alt: 'Villa terrace dinner at dusk' },
      callouts: [
        { lines: ['Dinner planned each', 'morning at the market'], direction: 'left' },
        { lines: ['Cooked in your', 'villa kitchen'], direction: 'right' },
      ],
      mega: 'Villa chef',
      splitIndex: '01',
      splitLabel: 'The villa week',
      before: 'Breakfast, a late lunch if wanted, and ',
      em: 'dinner planned each morning',
      after: ' from the local market.',
      bodies: [
        'A chef cooking in your villa for a week. Your kitchen is used, and shopping is part of the daily routine. Dietary preferences and allergies are accommodated on request.',
        'Longevity cuisine — seasonal and Mediterranean, never a medical claim. Living in the home for a villa week is part of the service.',
      ],
      links: [
        { href: '/menus', label: 'View the menus' },
        { href: '/yacht-chef', label: 'Yacht chef' },
        { href: '/events-and-weddings', label: 'Events & weddings' },
      ],
      side: {
        src: '/editorial/villa-market.webp',
        alt: 'Market basket in the morning',
        caption: 'Ingredients bought that morning',
        word: 'Ramatuelle',
      },
      columns: [
        {
          index: '02',
          label: 'Houses we cook in',
          title: 'Houses we',
          titleEm: 'cook in',
          rows: [
            { n: '01', title: 'The hills above Cannes', body: 'Weekend stays and Festival-season tables.', href: '/private-chef-cannes' },
            { n: '02', title: 'Cap Ferrat', body: 'Villa kitchens between Nice and Monaco.', href: '/private-chef-saint-jean-cap-ferrat' },
            { n: '03', title: 'Ramatuelle', body: 'Villa weeks on the peninsula, near Saint-Tropez.', href: '/private-chef-saint-tropez' },
          ],
        },
        {
          index: '03',
          label: 'Also on this coast',
          title: 'Also on',
          titleEm: 'this coast',
          rows: [
            { n: '01', title: 'Yacht chef', body: 'Galley cooking for the people on board, at anchor or underway.', href: '/yacht-chef' },
            { n: '02', title: 'Events & weddings', body: 'Wedding weekends or larger guest lists, with a tailored quote on request.', href: '/events-and-weddings' },
            { n: '03', title: 'Private dinners', body: 'Tables for 2–25 guests, from Monaco to Saint-Tropez.', href: '/private-chef-cote-d-azur' },
          ],
        },
      ],
      questions: [
        { q: 'What does a villa week cost?', a: 'Fees are on request and quoted in €. No per-person rate is published.' },
        { q: 'What does the chef do?', a: 'Cooks in your kitchen. Shopping, service and clearing are arranged with the booking, on request.' },
        { q: 'How far ahead should I book?', a: 'Lead time is on request. Book early for summer, the Festival de Cannes and the Grand Prix.' },
        { q: 'Can menus meet dietary needs?', a: 'Yes, on request. Menus follow taste and preference, not medical advice.' },
      ],
      closeKicker: 'Villa chef · Fees on request, quoted in €',
    },
    yacht: {
      metaLeft: ['Yacht chef', 'Côte d’Azur & Monaco'],
      metaRight: ['2–25 guests', 'At anchor or underway'],
      title: 'Yacht chef,',
      subtitle: 'Côte d’Azur and Monaco',
      book: BOOK.en,
      hero: { src: '/editorial/yacht-deck.webp', alt: 'Yacht deck table set for dinner at sea' },
      callouts: [
        { lines: ['Salmon tartare,', 'set for dinner at sea'], direction: 'left' },
        { lines: ['Dinner when the', 'boat is stationary'], direction: 'right' },
      ],
      mega: 'Yacht chef',
      splitIndex: '01',
      splitLabel: 'The galley',
      before: 'Breakfast, ',
      em: 'lunch underway',
      after: ', and dinner in the saloon when the boat is stationary.',
      bodies: [
        'The chef cooks for the people on board and keeps the galley out of the way, whether the boat is moving or docked in Antibes, Monaco or Saint-Tropez.',
        'Provisioning, the menu and dietary notes are agreed in writing before departure. Allergies and preferences go onto the shopping list.',
      ],
      links: [
        { href: '/menus', label: 'View the menus' },
        { href: '/villa-chef', label: 'Villa chef' },
        { href: '/events-and-weddings', label: 'Events & weddings' },
      ],
      side: {
        src: '/editorial/yacht-tagliatelle.webp',
        alt: 'Squid-ink tagliatelle',
        caption: 'Squid-ink tagliatelle',
        word: 'Galley',
      },
      columns: [
        {
          index: '02',
          label: 'Plates',
          title: 'Plates from',
          titleEm: 'the galley',
          rows: [
            { n: '01', title: 'Seabass', body: 'Seasonal Mediterranean cooking, from the market.' },
            { n: '02', title: 'Salmon tartare', body: 'Menus follow taste and seasonal availability.' },
            { n: '03', title: 'Squid-ink tagliatelle', body: 'Allergies and preferences go onto the shopping list.' },
          ],
        },
        {
          index: '03',
          label: 'Where the boat usually sits',
          title: 'Where the boat',
          titleEm: 'usually sits',
          rows: [
            { n: '01', title: 'Antibes', href: '/private-chef-antibes' },
            { n: '02', title: 'Monaco', href: '/private-chef-monaco' },
            { n: '03', title: 'Cannes', href: '/private-chef-cannes' },
            { n: '04', title: 'Villefranche-sur-Mer' },
            { n: '05', title: 'Saint-Tropez', href: '/private-chef-saint-tropez' },
          ],
        },
      ],
      questions: [
        { q: 'How many guests on board?', a: '2 to 25 guests.' },
        { q: 'How are fees quoted?', a: 'On request, in €. There is no published tariff.' },
        { q: 'Villas as well as yachts?', a: 'Yes. On yachts, the chef works in the galley, on request.' },
        { q: 'How do I enquire?', a: 'By form, WhatsApp, Instagram or email. Replies are sent within 24 hours.' },
      ],
      closeKicker: 'Yacht chef · One evening or a week on board',
    },
    events: {
      long: true,
      metaLeft: ['Events & weddings', 'Côte d’Azur'],
      metaRight: ['Menu agreed in writing', 'before the date is held'],
      title: 'Events and weddings,',
      subtitle: 'Côte d’Azur',
      book: 'Enquire about an event',
      hero: { src: '/editorial/events-table.webp', alt: 'Long wedding table under olive trees' },
      callouts: [
        { lines: ['Cooked in the', 'house kitchen'], direction: 'left' },
        { lines: ['Florals and photography', 'stay with your suppliers'], direction: 'right' },
      ],
      mega: 'Weddings',
      splitIndex: '01',
      splitLabel: 'The celebration',
      before: 'A wedding weekend, a birthday, or ',
      em: 'a dinner for a longer guest list.',
      after: '',
      bodies: [
        'The menu is agreed in writing, the date is held once the quote is accepted, and the cooking happens in the house kitchen.',
        'Florals, photography and wine service stay with your own suppliers if you want them. The kitchen covers the food. Dietary preferences and allergies are accommodated on request.',
      ],
      links: [
        { href: '/menus', label: 'View the menus' },
        { href: '/villa-chef', label: 'Villa chef' },
        { href: '/yacht-chef', label: 'Yacht chef' },
      ],
      side: {
        src: '/editorial/events-setting.webp',
        alt: 'Wedding place setting',
        caption: 'Menu agreed in writing',
        word: 'Mougins',
      },
      columns: [
        {
          index: '02',
          label: 'Corporate and event packages',
          title: 'Corporate and',
          titleEm: 'event packages',
          rows: [
            { n: '01', title: 'Wedding weekend', body: 'A weekend menu cooked in the house kitchen. Florals and photography stay with your own suppliers.' },
            { n: '02', title: 'Celebration dinner', body: 'A birthday or longer table, with the menu agreed in writing before the date is held.' },
            { n: '03', title: 'Corporate dinner', body: 'A board dinner or client table, with the kitchen covering the food.' },
            { n: '04', title: 'Guest-list lunch', body: 'A daytime table, for when the evening isn’t the point.' },
          ],
        },
        {
          index: '03',
          label: 'Where celebrations are held',
          title: 'Where celebrations',
          titleEm: 'are usually held',
          rows: [
            { n: '01', title: 'Cannes', href: '/private-chef-cannes' },
            { n: '02', title: 'Antibes', href: '/private-chef-antibes' },
            { n: '03', title: 'Mougins' },
            { n: '04', title: 'Monaco', href: '/private-chef-monaco' },
            { n: '05', title: 'Saint-Tropez', href: '/private-chef-saint-tropez' },
            { n: '06', title: 'Nice', href: '/private-chef-nice' },
          ],
        },
      ],
      questions: [
        { q: 'What does it cost?', a: 'Fees are on request, in €. Each package is quoted for the date and guest list; there is no per-person tariff.' },
        { q: 'How far ahead should I book?', a: 'Lead time is on request. Book early for summer, the Festival de Cannes and the Grand Prix.' },
        { q: 'What does the kitchen cover?', a: 'The chef cooks in your kitchen. Shopping, service and clearing are arranged on request.' },
        { q: 'Can menus meet dietary needs?', a: 'Handled on request. Menus follow taste and preference, not medical advice.' },
      ],
      closeKicker: 'Events & weddings · Quoted for the date and guest list',
    },
  }
}

function DetailRow({ row, locale }: { row: Row; locale: Locale }) {
  const head = (
    <>
      <div className="ed-row-head">
        <span>{row.n}</span>
        <p>{row.title}</p>
      </div>
      {row.body ? <p className="ed-row-body">{row.body}</p> : null}
    </>
  )
  if (!row.href) return <div className="ed-row">{head}</div>
  return (
    <Link className="ed-row" href={toLocalePath(row.href, locale)}>
      {head}
    </Link>
  )
}

export function PlaceExperience({ id, locale }: { id: PlaceId; locale: Locale }) {
  const page = places(locale)[id]
  const contact = toLocalePath('/contact', locale)
  const cred = credentials[locale]
  const q = QUESTIONS[locale]
  const [closeA, closeB] = CLOSE_TITLE[locale]

  return (
    <div className="ed-place">
      <header className={`ed-place-hero${page.long ? ' is-long' : ''}`}>
        <div className="ed-place-metas">
          <p>
            {page.metaLeft[0]}
            <br />
            {page.metaLeft[1]}
          </p>
          <p className="is-right">
            {page.metaRight[0]}
            <br />
            {page.metaRight[1]}
          </p>
        </div>
        <div className="ed-place-title">
          <h1>{page.title}</h1>
          <p>{page.subtitle}</p>
        </div>
        <div className="ed-place-actions">
          <Pill href={contact} tone="filled">
            {page.book}
          </Pill>
          <Pill href={WHATSAPP_URL} tone="outline" external>
            {WHATSAPP[locale]}
          </Pill>
        </div>
        <p className="ed-place-cred">
          {cred.ehl}
          <br />
          {cred.years}
          <br />
          {cred.stanford}
        </p>
        <div className="ed-place-hero-photo">
          <Image src={page.hero.src} alt={page.hero.alt} fill priority sizes="(min-width: 1100px) 760px, 100vw" />
          <Callout lines={page.callouts[0].lines} direction={page.callouts[0].direction} />
          <Callout lines={page.callouts[1].lines} direction={page.callouts[1].direction} />
        </div>
        <p className="ed-place-mega" aria-hidden="true">
          {page.mega}
        </p>
      </header>

      <section className="ed-place-split">
        <div className="ed-place-copy">
          <SectionLabel index={page.splitIndex}>{page.splitLabel}</SectionLabel>
          <h2>
            {page.before}
            <em>{page.em}</em>
            {page.after}
          </h2>
          <div className="ed-place-bodies">
            <p>{page.bodies[0]}</p>
            <p>{page.bodies[1]}</p>
          </div>
          <div className="ed-place-links">
            {page.links.map((link) => (
              <CapsLink key={link.href} href={toLocalePath(link.href, locale)}>
                {link.label}
              </CapsLink>
            ))}
          </div>
          <BrandLockup />
        </div>
        <div className="ed-place-side">
          <div className="ed-photo">
            <Image src={page.side.src} alt={page.side.alt} fill sizes="(min-width: 1100px) 50vw, 100vw" />
          </div>
          <div className="ed-place-side-shade" aria-hidden="true" />
          <p className="ed-place-side-cap">{page.side.caption}</p>
          <p className="ed-place-side-word">{page.side.word}</p>
        </div>
      </section>

      <section className="ed-place-details">
        {page.columns.map((column) => (
          <article key={column.index}>
            <SectionLabel index={column.index}>{column.label}</SectionLabel>
            <h2>
              {column.title}
              <em>{column.titleEm}</em>
            </h2>
            <div>
              {column.rows.map((row) => (
                <DetailRow key={row.n + row.title} row={row} locale={locale} />
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="ed-place-qa">
        <div>
          <SectionLabel index="04">{q.label}</SectionLabel>
          <h2>
            {q.title}
            <em>{q.em}</em>
          </h2>
        </div>
        <div className="ed-place-qa-grid">
          {page.questions.map((item) => (
            <article key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(page.questions)) }} />
      </section>

      <section className="ed-place-close ed-on-dark">
        <p>{page.closeKicker}</p>
        <h2>
          {closeA}
          <em>{closeB}</em>
        </h2>
        <p>{CLOSE_BODY[locale]}</p>
        <div>
          <Pill href={contact} tone="light">
            {page.book}
          </Pill>
          <Pill href={WHATSAPP_URL} tone="brass" external>
            {WHATSAPP[locale]}
          </Pill>
        </div>
      </section>
    </div>
  )
}

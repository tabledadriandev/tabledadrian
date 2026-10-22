import Image from 'next/image'
import Link from 'next/link'
import { Pill } from '@/components/editorial/ui'
import { MENUS } from '@/data/menus'
import type { Locale } from '@/lib/copy'
import { WHATSAPP_URL } from '@/lib/constants'
import { toLocalePath } from '@/lib/routes'

const FACE: Record<string, { en: string; fr: string; dirEn: string; dirFr: string; italic?: boolean }> = {
  france: { en: 'France', fr: 'France', dirEn: 'Regional France', dirFr: 'France régionale' },
  italy: { en: 'Italy', fr: 'Italie', dirEn: 'Italy', dirFr: 'Italie' },
  mediterranean: { en: 'Mediterranean', fr: 'Méditerranée', dirEn: 'Mediterranean', dirFr: 'Méditerranée' },
  coastal: { en: 'Coastal', fr: 'Côtier', dirEn: 'The sea', dirFr: 'La mer' },
  asia: { en: 'Asia', fr: 'Asie', dirEn: 'Asia', dirFr: 'Asie' },
  'asia-ii': { en: 'Asia II', fr: 'Asia II', dirEn: 'Asia', dirFr: 'Asie' },
  'latin-america': { en: 'Latin America', fr: 'Amérique latine', dirEn: 'Latin America', dirFr: 'Amérique latine' },
  seasonal: { en: 'Seasonal', fr: 'De saison', dirEn: 'The market', dirFr: 'Le marché' },
  celebration: { en: 'Celebration', fr: 'Célébration', dirEn: 'Occasions', dirFr: 'Occasions' },
  world: { en: 'World', fr: 'Monde', dirEn: 'Elsewhere', dirFr: 'Ailleurs' },
  collection: { en: 'The collection', fr: 'La collection', dirEn: 'Signature', dirFr: 'Signature', italic: true },
}

const COPY = {
  en: {
    kicker: 'Menus',
    title: 'Open a book.',
    titleEm: 'We will write yours.',
    lede: 'Each collection holds five menus. Choose a direction, then we tailor every course to your guests, the season and the kitchen.',
    metaLeft: ['Menus', 'Côte d’Azur & Monaco'],
    noteLabel: 'How menus are written',
    notes: [
      'Pick a direction from the index. Every course is then tailored to your guests, the season and the kitchen.',
      'Dietary preferences and allergies are accommodated on request. Menus follow taste and preference, not medical advice.',
    ],
    contents: 'Contents',
    axis: 'Collection · Direction',
    each: 'in each',
    enquire: 'Enquire',
    whatsapp: 'Message on WhatsApp',
    script: 'cooked in your kitchen',
    closeTitle: 'Choose a',
    closeEm: 'direction',
    closeBody: 'Then we tailor every course to your guests, the season and the kitchen.',
    menusWord: (n: number) => (n === 5 ? 'Five menus' : `${n} menus`),
    collectionsWord: (n: number) => (n === 11 ? 'Eleven collections' : `${n} collections`),
  },
  fr: {
    kicker: 'Menus',
    title: 'Ouvrez un livre.',
    titleEm: 'Nous écrirons le vôtre.',
    lede: 'Chaque collection tient cinq menus. Choisissez une direction, puis chaque service s’écrit pour vos convives, la saison et la cuisine.',
    metaLeft: ['Menus', 'Côte d’Azur et Monaco'],
    noteLabel: 'Comment les menus s’écrivent',
    notes: [
      'Choisissez une direction dans l’index. Chaque service est ensuite écrit pour vos convives, la saison et la cuisine.',
      'Préférences et allergies sont prises en compte sur demande. Les menus suivent le goût et les préférences, pas un avis médical.',
    ],
    contents: 'Sommaire',
    axis: 'Collection · Direction',
    each: 'dans chacune',
    enquire: 'Demander',
    whatsapp: 'Message sur WhatsApp',
    script: 'cuisiné dans votre cuisine',
    closeTitle: 'Choisissez une',
    closeEm: 'direction',
    closeBody: 'Puis chaque service s’écrit pour vos convives, la saison et la cuisine.',
    menusWord: (n: number) => (n === 5 ? 'Cinq menus' : `${n} menus`),
    collectionsWord: (n: number) => (n === 11 ? 'Onze collections' : `${n} collections`),
  },
} as const

export function MenusIndex({ locale }: { locale: Locale }) {
  const t = COPY[locale]
  const contact = toLocalePath('/contact', locale)
  const perBook = MENUS[0]?.menus.length ?? 0
  const menusLabel = t.menusWord(perBook)
  const collectionsLabel = t.collectionsWord(MENUS.length)

  return (
    <div className="ed-menus">
      <header className="ed-menus-hero">
        <p className="ed-menus-meta">
          {t.metaLeft[0]}
          <br />
          {t.metaLeft[1]}
        </p>
        <p className="ed-menus-meta is-right">
          {MENUS.length} collections
          <br />
          {menusLabel} {locale === 'fr' ? 'chacune' : 'each'}
        </p>
        <p className="ed-kicker ed-menus-kicker">
          <span>{t.kicker}</span>
          <i aria-hidden="true" />
          <span className="ed-kicker-name">{collectionsLabel}</span>
        </p>
        <h1>
          {t.title}
          <em>{t.titleEm}</em>
        </h1>
        <p className="ed-menus-lede">{t.lede}</p>
      </header>

      <section className="ed-menus-index">
        <aside>
          <div className="ed-photo">
            <Image
              src="/editorial/menus-notebook.webp"
              alt="An open notebook of handwritten menus on a linen table"
              fill
              priority
              sizes="(min-width: 1100px) 420px, 100vw"
            />
          </div>
          <p>{t.noteLabel}</p>
          {t.notes.map((note) => (
            <p key={note}>{note}</p>
          ))}
        </aside>
        <div>
          <header>
            <h2>{t.contents}</h2>
            <p>{t.axis}</p>
          </header>
          <ol>
            {MENUS.map((collection, index) => {
              const face = FACE[collection.id]
              const title = face ? (locale === 'fr' ? face.fr : face.en) : collection.title
              const direction = face ? (locale === 'fr' ? face.dirFr : face.dirEn) : collection.region
              const count = t.menusWord(collection.menus.length)
              const number = String(index + 1).padStart(2, '0')
              return (
                <li key={collection.id}>
                  <Link href={`/menus/${collection.id}`}>
                    <span>{number}</span>
                    <span className={face?.italic ? 'is-italic' : undefined}>{title}</span>
                    <i aria-hidden="true" />
                    <span>
                      {direction} · {count}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ol>
          <footer>
            <p>
              {collectionsLabel} · {menusLabel} {t.each}
            </p>
            <Pill href={contact} tone="outline">
              {t.enquire}
            </Pill>
          </footer>
        </div>
      </section>

      <section className="ed-menus-close">
        <p className="ed-script">{t.script}</p>
        <h2>
          {t.closeTitle}
          <em>{t.closeEm}</em>
        </h2>
        <p>{t.closeBody}</p>
        <div>
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

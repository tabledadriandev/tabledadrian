import Link from 'next/link'
import Image from 'next/image'
import { CapsLink, EmLast, LemonSymbol, Pill } from '@/components/editorial/ui'
import type { ArticleBlock } from '@/lib/article-blocks'
import type { JournalCard } from '@/lib/journal-index'
import { Inline } from './Inline'

const UI = {
  en: {
    journal: 'Journal',
    by: 'Written by',
    name: 'Adrian Stefan',
    cred: 'Swiss-trained (EHL), Nutrition certificate, Stanford',
    line: "Table d'Adrian · 10+ years in professional kitchens · Private chef, Côte d'Azur & Monaco",
    byline: "By Adrian Stefan, Table d'Adrian",
    book: 'Book a private chef',
    cooked: 'Have this cooked in',
    kitchen: 'your kitchen.',
    cook: "Cook with me on the Côte d'Azur.",
    keep: 'Keep',
    reading: 'reading',
    read: 'min read',
    href: '/contact',
  },
  fr: {
    journal: 'Journal',
    by: 'Écrit par',
    name: 'Adrian Stefan',
    cred: 'formation suisse (EHL), Nutrition certificate, Stanford',
    line: "Table d'Adrian · 10+ ans dans des cuisines professionnelles · Chef privé, Côte d'Azur et Monaco",
    byline: "Par Adrian Stefan, Table d'Adrian",
    book: 'Réserver un chef privé',
    cooked: 'Le faire cuisiner dans',
    kitchen: 'votre cuisine.',
    cook: "Cuisinez avec moi sur la Côte d'Azur.",
    keep: 'Continuer',
    reading: 'la lecture',
    read: 'min de lecture',
    href: '/fr/contact',
  },
} as const

export function EditorialArticle({
  locale,
  category,
  number,
  title,
  standfirst,
  date,
  readMin,
  image,
  blocks,
  related,
  indexHref,
  indexLabel,
  note,
}: {
  locale: 'en' | 'fr'
  category: string
  number: string
  title: string
  standfirst: string
  date: string
  readMin?: number
  image?: string
  blocks: ArticleBlock[]
  related: JournalCard[]
  indexHref: string
  indexLabel: string
  note?: string
}) {
  const t = UI[locale]
  return (
    <article className="ed-story">
      <header className="ed-story-head">
        <p className="ed-story-crumb">
          <Link href={indexHref}>{t.journal}</Link>
          <span> / {category}</span>
          <span className="ed-story-no">No. {number}</span>
        </p>
        <h1>
          <EmLast text={title} />
        </h1>
        <div className="ed-story-stand">
          <p>{standfirst}</p>
          <p className="ed-story-meta">
            <span>
              {date}
              {readMin ? ` · ${readMin} ${t.read}` : ''}
            </span>
            <span>{t.byline}</span>
            <span>EN / FR</span>
          </p>
        </div>
      </header>
      {image ? (
        <div className="ed-story-hero ed-photo">
          <Image src={image} alt={title} fill priority sizes="(max-width: 1100px) 100vw, 1312px" />
        </div>
      ) : null}
      <div className="ed-story-body">
        <div className="ed-story-main">
          {blocks.map((block, index) => {
            if (block.type === 'h2') {
              return (
                <h2 key={index}>
                  <EmLast text={block.text} />
                </h2>
              )
            }
            if (block.type === 'h3') return <h3 key={index}>{block.text}</h3>
            if (block.type === 'ul') {
              return (
                <ul key={index}>
                  {block.items.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">·</span>
                      <Inline text={item} />
                    </li>
                  ))}
                </ul>
              )
            }
            if (block.type === 'ol') {
              return (
                <ol key={index}>
                  {block.items.map((item, itemIndex) => (
                    <li key={`${item.lead}-${itemIndex}`}>
                      <span>{itemIndex + 1}</span>
                      <div>
                        {item.lead ? <strong>{item.lead}</strong> : null}
                        <Inline text={item.body} />
                      </div>
                    </li>
                  ))}
                </ol>
              )
            }
            if (block.type === 'quote') {
              return (
                <blockquote key={index}>
                  <p>“{block.text.replace(/^["“]|["”]$/g, '')}”</p>
                </blockquote>
              )
            }
            if (block.drop) {
              const letter = block.text.trim().charAt(0)
              const rest = block.text.trim().slice(1)
              return (
                <p key={index} className="ed-drop">
                  <span>{letter}</span>
                  <Inline text={rest} />
                </p>
              )
            }
            return (
              <p key={index}>
                <Inline text={block.text} />
              </p>
            )
          })}
        </div>
        <aside className="ed-story-aside">
          <p>No. {number}</p>
          <p>{category}</p>
          <p>{date}</p>
          {readMin ? (
            <p>
              {readMin} {t.read}
            </p>
          ) : null}
          {note ? <p>{note}</p> : null}
        </aside>
      </div>
      <div className="ed-author">
        <LemonSymbol />
        <div>
          <p>{t.by}</p>
          <p>
            <em>{t.name}</em> — {t.cred}
          </p>
          <p>{t.line}</p>
        </div>
      </div>
      <section className="ed-forest">
        <div>
          <p className="ed-band-kicker">{t.book}</p>
          <h2>
            {t.cooked} <em>{t.kitchen}</em>
          </h2>
          <p>{t.cook}</p>
        </div>
        <Pill href={t.href} tone="light">
          {t.book}
        </Pill>
      </section>
      {related.length ? (
        <section className="ed-related">
          <div className="ed-split-head">
            <h2>
              {t.keep} <em>{t.reading}</em>
            </h2>
            <CapsLink href={indexHref}>{indexLabel}</CapsLink>
          </div>
          <div className="ed-cards">
            {related.map((item) => (
              <Link key={item.key} href={item.href} className="ed-typecard">
                <span>
                  <span>{item.category}</span>
                  <span>{item.date}</span>
                </span>
                <strong>{item.number}</strong>
                <em>{item.title}</em>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}

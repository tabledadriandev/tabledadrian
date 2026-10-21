'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CapsLink, SectionLabel } from '@/components/editorial/ui'
import type { JournalCard } from '@/lib/journal-index'

const UI = {
  en: {
    kicker: 'Journal',
    title: 'Journal',
    script: 'Notes',
    lede: "Notes on private dinners, the Côte d'Azur season, and how the cooking is done.",
    filter: 'Filter',
    all: 'All',
    read: 'Read the article',
    from: 'From the market &',
    season: 'the season',
    features: 'Features',
    inThis: 'In this',
    issue: 'issue',
    contents: 'Contents',
    rest: 'The rest of the',
    journal: 'journal',
    more: 'more',
    numbered: 'Numbered as on the site',
  },
  fr: {
    kicker: 'Journal',
    title: 'Journal',
    script: 'Notes',
    lede: 'Notes sur les dîners privés, la saison sur la Côte d’Azur, et la façon de cuisiner.',
    filter: 'Filtre',
    all: 'Tout',
    read: 'Lire l’article',
    from: 'Du marché &',
    season: 'de la saison',
    features: 'À la une',
    inThis: 'Dans ce',
    issue: 'numéro',
    contents: 'Sommaire',
    rest: 'Le reste du',
    journal: 'journal',
    more: 'autres',
    numbered: 'Numérotés comme sur le site',
  },
} as const

export function JournalIndexView({ items, locale }: { items: JournalCard[]; locale: 'en' | 'fr' }) {
  const t = UI[locale]
  const categories = useMemo(() => Array.from(new Set(items.map((item) => item.category))), [items])
  const [filter, setFilter] = useState('all')
  const visible = filter === 'all' ? items : items.filter((item) => item.category === filter)
  const lead = visible[0]
  const features = visible.slice(1, 4)
  const toc = visible.slice(4, 12)
  const rest = visible.slice(12)
  const columns = 4
  const cols: JournalCard[][] = Array.from({ length: columns }, () => [])
  rest.forEach((item, index) => cols[index % columns].push(item))

  return (
    <div className="ed-lib">
      <header className="ed-mast">
        <div className="ed-mast-top">
          <SectionLabel index="06">{t.kicker}</SectionLabel>
          <p>
            {items.length} {locale === 'fr' ? 'articles' : 'articles'} · EN / FR
          </p>
        </div>
        <div className="ed-mast-title">
          <h1>{t.title}</h1>
          <div>
            <p className="ed-script">{t.script}</p>
            <p>{t.lede}</p>
          </div>
        </div>
        <div className="ed-filters" role="toolbar" aria-label={t.filter}>
          <span>{t.filter}</span>
          <button type="button" className={filter === 'all' ? 'is-on' : ''} onClick={() => setFilter('all')}>
            {t.all}
          </button>
          {categories.map((category) => (
            <button key={category} type="button" className={filter === category ? 'is-on' : ''} onClick={() => setFilter(category)}>
              {category}
            </button>
          ))}
        </div>
      </header>

      {lead ? (
        <section className="ed-lead">
          {lead.image ? (
            <Link href={lead.href} className="ed-photo ed-lead-photo">
              <Image src={lead.image} alt={lead.title} fill priority sizes="(max-width: 1100px) 100vw, 800px" />
            </Link>
          ) : (
            <Link href={lead.href} className="ed-typecard ed-lead-card">
              <span>
                <span>{lead.category}</span>
                <span>{lead.date}</span>
              </span>
              <strong>{lead.number}</strong>
              <em>{lead.title}</em>
            </Link>
          )}
          <div>
            <p className="ed-lead-meta">
              <span>
                No. {lead.number} · {lead.category}
              </span>
              <span>{lead.date}</span>
            </p>
            <h2>
              <Link href={lead.href}>{lead.title}</Link>
            </h2>
            <p>{lead.excerpt}</p>
            <blockquote>{lead.quote}</blockquote>
            <CapsLink href={lead.href}>{t.read}</CapsLink>
          </div>
        </section>
      ) : null}

      {features.length ? (
        <section className="ed-features">
          <div className="ed-split-head">
            <h2>
              {t.from} <em>{t.season}</em>
            </h2>
            <SectionLabel index="02">{t.features}</SectionLabel>
          </div>
          <div className="ed-feature-grid">
            {features.map((item, index) =>
              item.image && index < 2 ? (
                <Link key={item.key} href={item.href} className="ed-feature">
                  <span className="ed-photo">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 1100px) 100vw, 420px" />
                  </span>
                  <span className="ed-caption">
                    <span>
                      {item.category} · {item.date}
                    </span>
                    <strong>{item.title}</strong>
                    <em>{item.excerpt}</em>
                  </span>
                </Link>
              ) : (
                <Link key={item.key} href={item.href} className="ed-typecard">
                  <span>
                    <span>{item.category}</span>
                    <span>{item.date}</span>
                  </span>
                  <strong>{item.number}</strong>
                  <em>{item.title}</em>
                </Link>
              ),
            )}
          </div>
        </section>
      ) : null}

      {toc.length ? (
        <section className="ed-toc">
          <div className="ed-split-head">
            <h2>
              {t.inThis} <em>{t.issue}</em>
            </h2>
            <SectionLabel index="03">{t.contents}</SectionLabel>
          </div>
          <ol>
            {toc.map((item) => (
              <li key={item.key}>
                <Link href={item.href}>
                  <span>{item.number}</span>
                  <strong>{item.title}</strong>
                  <em>{item.category}</em>
                  <span>{item.date}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {rest.length ? (
        <section className="ed-az">
          <div className="ed-split-head">
            <h2>
              {t.rest} <em>{t.journal}</em>
            </h2>
            <p>
              {rest.length} {t.more} · {t.numbered}
            </p>
          </div>
          <div className="ed-az-grid">
            {cols.map((col, index) => (
              <ul key={index}>
                {col.map((item) => (
                  <li key={item.key}>
                    <Link href={item.href}>
                      <span>{item.number}</span>
                      <strong>{item.title}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}

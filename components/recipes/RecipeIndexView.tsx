'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CapsLink, SectionLabel } from '@/components/editorial/ui'

export type RecipeCard = {
  key: string
  href: string
  title: string
  intro: string
  cuisine: string
  course: string
  servings: number
  prep: number
  cook: number
  free: boolean
  image?: string
  alt: string
}

const UI = {
  en: {
    kicker: 'Recipes',
    title: 'Recipes',
    lede: "Dishes by Adrian Stefan, Table d'Adrian. Five recipes are complete. The others keep the ingredients on the page; the method is in Sola.",
    onPage: 'recipes on the page',
    written: 'written in full',
    cuisine: 'Cuisine',
    all: 'All',
    complete: 'recipes are',
    completeEm: 'complete.',
    full: 'Written in full',
    read: 'Read the recipe',
    index: 'The recipes',
    az: 'A to Z',
    showing: 'Showing',
    of: 'of',
    solaNote: 'The method for the others is in Sola',
    sola: 'Cook it with Sola',
    show: 'Show all',
    recipes: 'recipes',
  },
  fr: {
    kicker: 'Recettes',
    title: 'Recettes',
    lede: "Les plats d'Adrian Stefan, Table d'Adrian. Cinq recettes sont entières. Les autres montrent les ingrédients ; la méthode est dans Sola.",
    onPage: 'recettes sur la page',
    written: 'entières',
    cuisine: 'Cuisine',
    all: 'Tout',
    complete: 'recettes sont',
    completeEm: 'entières.',
    full: 'Recette entière',
    read: 'Lire la recette',
    index: 'Les recettes',
    az: 'de A à Z',
    showing: 'Affichage',
    of: 'sur',
    solaNote: 'La méthode des autres est dans Sola',
    sola: 'La cuisiner avec Sola',
    show: 'Tout afficher',
    recipes: 'recettes',
  },
} as const

export function RecipeIndexView({ items, locale }: { items: RecipeCard[]; locale: 'en' | 'fr' }) {
  const t = UI[locale]
  const cuisines = useMemo(() => Array.from(new Set(items.map((item) => item.cuisine).filter(Boolean))).sort(), [items])
  const [cuisine, setCuisine] = useState('all')
  const [expanded, setExpanded] = useState(false)
  const visible = cuisine === 'all' ? items : items.filter((item) => item.cuisine === cuisine)
  const free = visible.filter((item) => item.free)
  const lead = free[0]
  const restFree = free.slice(1)
  const letters = new Map<string, RecipeCard[]>()
  for (const item of [...visible].sort((a, b) => a.title.localeCompare(b.title, locale))) {
    const letter = item.title.trim().charAt(0).toLocaleUpperCase(locale) || '#'
    const group = letters.get(letter) || []
    group.push(item)
    letters.set(letter, group)
  }
  const groups = Array.from(letters.entries())
  const flat = groups.flatMap(([, rows]) => rows)
  const shown = expanded ? flat : flat.slice(0, 48)
  const shownGroups = new Map<string, RecipeCard[]>()
  for (const item of shown) {
    const letter = item.title.trim().charAt(0).toLocaleUpperCase(locale) || '#'
    const group = shownGroups.get(letter) || []
    group.push(item)
    shownGroups.set(letter, group)
  }
  const cols: [string, RecipeCard[]][][] = [[], [], [], []]
  const load = [0, 0, 0, 0]
  for (const entry of shownGroups.entries()) {
    const slot = load.indexOf(Math.min(...load))
    cols[slot].push(entry)
    load[slot] += entry[1].length
  }
  const sola = locale === 'fr' ? '/fr/sola' : '/sola'

  return (
    <div className="ed-lib">
      <header className="ed-mast">
        <div className="ed-mast-top">
          <SectionLabel index="06">{t.kicker}</SectionLabel>
          <p>
            {items.length} {t.recipes} · EN / FR
          </p>
        </div>
        <div className="ed-mast-title is-recipe">
          <h1>{t.title}</h1>
          <div>
            <p>{t.lede}</p>
            <div className="ed-stats">
              <p><strong>{items.length}</strong><span>{t.onPage}</span></p>
              <p><strong>{items.filter((item) => item.free).length}</strong><span>{t.written}</span></p>
            </div>
          </div>
        </div>
        <div className="ed-filters" role="toolbar" aria-label={t.cuisine}>
          <span>{t.cuisine}</span>
          <button type="button" className={cuisine === 'all' ? 'is-on' : ''} onClick={() => setCuisine('all')}>{t.all}</button>
          {cuisines.map((name) => (
            <button key={name} type="button" className={cuisine === name ? 'is-on' : ''} onClick={() => setCuisine(name)}>
              {name}
            </button>
          ))}
        </div>
      </header>

      {lead ? (
        <section className="ed-features">
          <div className="ed-split-head">
            <h2>
              {free.length} {t.complete} <em>{t.completeEm}</em>
            </h2>
            <SectionLabel index="01">{t.full}</SectionLabel>
          </div>
          <div className="ed-lead">
            {lead.image ? (
              <Link href={lead.href} className="ed-photo ed-lead-photo">
                <Image src={lead.image} alt={lead.alt || lead.title} fill priority sizes="(max-width: 1100px) 100vw, 760px" />
              </Link>
            ) : (
              <Link href={lead.href} className="ed-typecard ed-lead-card"><strong>01</strong><em>{lead.title}</em></Link>
            )}
            <div>
              <p className="ed-lead-meta">
                <span>No. 01 · {lead.cuisine} · {lead.course}</span>
                <span>{locale === 'fr' ? 'Pour' : 'Serves'} {lead.servings}</span>
              </p>
              <h3><Link href={lead.href}>{lead.title}</Link></h3>
              <p>{lead.intro}</p>
              <p className="ed-times">
                <span>{lead.prep} min {locale === 'fr' ? 'préparation' : 'prep'}</span>
                <span>{lead.cook} min {locale === 'fr' ? 'cuisson' : 'cook'}</span>
              </p>
              <CapsLink href={lead.href}>{t.read}</CapsLink>
            </div>
          </div>
          {restFree.length ? (
            <div className="ed-cards">
              {restFree.map((item, index) => (
                <Link key={item.key} href={item.href} className="ed-typecard">
                  <span><span>{item.cuisine}</span><span>{t.full}</span></span>
                  <strong>{String(index + 2).padStart(2, '0')}</strong>
                  <em>{item.title}</em>
                </Link>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="ed-az">
        <div className="ed-split-head">
          <h2>
            {t.index} <em>{t.az}</em>
          </h2>
        </div>
        <div className="ed-az-grid">
          {cols.map((col, index) => (
            <div key={index}>
              {col.map(([letter, rows]) => (
                <div key={letter} className="ed-letter">
                  <p>{letter}</p>
                  <ul>
                    {rows.map((item) => (
                      <li key={item.key}>
                        <Link href={item.href}>
                          <strong>{item.title}</strong>
                          <span>{item.cuisine}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="ed-more">
          <p>
            {t.showing} {shown.length} {t.of} {flat.length} · {t.solaNote}
          </p>
          <CapsLink href={sola}>{t.sola}</CapsLink>
          {flat.length > 48 && !expanded ? (
            <button type="button" className="ed-pill ed-pill-outline" onClick={() => setExpanded(true)}>
              <span>{t.show} {flat.length} {t.recipes}</span>
            </button>
          ) : null}
        </div>
      </section>
    </div>
  )
}

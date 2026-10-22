'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import { Pill, SectionLabel } from '@/components/editorial/ui'
import { WHATSAPP_URL } from '@/lib/constants'
import { GALLERY } from '@/data/gallery'
import { toLocalePath } from '@/lib/routes'

const FR: Record<string, { title: string; caption: string }> = {
  'sushi-platter': {
    title: 'Plateau de sushis',
    caption: 'Une sélection composée, de l’avocat au thon.',
  },
  'avocado-rolls': {
    title: 'Makis à l’avocat',
    caption: 'Crème fraîche, aneth et crackers de crevette.',
  },
  'ravioli-asparagus': {
    title: 'Raviolis, asperges',
    caption: 'Raviolis de soie sous une mousse légère, pointes d’asperges.',
  },
  wellington: {
    title: 'Wellington',
    caption: 'Feuilletage, duxelles, purée de petits pois et légumes d’été.',
  },
  'lobster-claw': {
    title: 'Homard',
    caption: 'Une pince, oignon pickles, câpre et une sauce blanche discrète.',
  },
  'duck-breast': {
    title: 'Magret de canard',
    caption: 'Magret rosé, shimeji, jeune carotte et jus réduit.',
  },
  langoustine: {
    title: 'Langoustine',
    caption: 'Queue saisie, fèves, poivron rouge et beurre.',
  },
  'chicken-pea-puree': {
    title: 'Poulet, deux purées',
    caption: 'Poulet rôti, petits pois et sauce blanche, un brin de thym.',
  },
  'zucchini-carpaccio': {
    title: 'Carpaccio de courgette',
    caption: 'Courgette émincée, sauge, citron et crème aux herbes.',
  },
  'roasted-roots': {
    title: 'Racines rôties',
    caption: 'Carotte, échalote et rondelles rôties sur marbre.',
  },
  'rose-tartlets': {
    title: 'Tartelettes roses',
    caption: 'Coques aux fruits rouges, crème fouettée, pétales séchés.',
  },
  'honeycomb-dessert': {
    title: 'Nid d’abeille',
    caption: 'Un treillis de sucre sur la crème, une goutte de miel.',
  },
  'burrata-peach': {
    title: 'Burrata, pêche, tomate',
    caption: 'Salade de fin d’été dans un bol en noyer.',
  },
  'pea-risotto': {
    title: 'Risotto de petits pois',
    caption: 'Basilic, pignons, un bol de vert.',
  },
  'tuna-sushi': {
    title: 'Makis de thon',
    caption: 'Thon rose, cerise et un plateau de sushis.',
  },
  'squid-ink-pasta': {
    title: 'Tagliatelles à l’encre',
    caption: 'Poulpe, asperges, une assiette bleue.',
  },
  'salmon-tartare': {
    title: 'Tartare de saumon',
    caption: 'Crème d’avocat, tuile aux herbes, pétales d’échalote.',
  },
  seabass: {
    title: 'Bar',
    caption: 'Peau croustillante, huile aux herbes, une tuile verte.',
  },
  'leek-salad': {
    title: 'Poireau, basilic',
    caption: 'Poireau blanc émincé, basilic, un filet d’huile.',
  },
  'glazed-carrots': {
    title: 'Carottes glacées',
    caption: 'Rondelles, une goutte d’huile.',
  },
}

const COPY = {
  en: {
    kicker: 'Gallery',
    title: 'The plates',
    titleEm: 'from the pass.',
    lede: 'Photographs from dinners Adrian has cooked on the Côte d’Azur and in Monaco. Open a plate.',
    open: 'Open photograph',
    close: 'Close',
    enquire: 'Enquire about a dinner',
    whatsapp: 'Message on WhatsApp',
    closeTitle: 'A plate,',
    closeEm: 'then a table.',
  },
  fr: {
    kicker: 'Galerie',
    title: 'Les assiettes',
    titleEm: 'du service.',
    lede: 'Photographies des dîners qu’Adrian a cuisinés sur la Côte d’Azur et à Monaco. Ouvrez une assiette.',
    open: 'Ouvrir la photographie',
    close: 'Fermer',
    enquire: 'Demander un dîner',
    whatsapp: 'Message sur WhatsApp',
    closeTitle: 'Une assiette,',
    closeEm: 'puis une table.',
  },
} as const

export function GalleryView({ locale }: { locale: 'en' | 'fr' }) {
  const t = COPY[locale]
  const fr = locale === 'fr'
  const [activeId, setActiveId] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const contact = toLocalePath('/contact', locale)
  const active = GALLERY.find((plate) => plate.id === activeId) ?? null
  const activeCopy = active ? (fr && FR[active.id] ? FR[active.id] : { title: active.title, caption: active.caption }) : null

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (active && !dialog.open) dialog.showModal()
    if (!active && dialog.open) dialog.close()
  }, [active])

  return (
    <div className="ed ed-gallery">
      <header className="ed-gallery-hero">
        <SectionLabel index="04">{t.kicker}</SectionLabel>
        <p className="ed-gallery-count">
          {String(GALLERY.length).padStart(2, '0')} {fr ? 'photographies' : 'photographs'} · Côte d’Azur · Monaco
        </p>
        <h1 id="gallery-title">
          {t.title}
          <em>{t.titleEm}</em>
        </h1>
        <p className="ed-lede">{t.lede}</p>
      </header>

      <ol className="ed-gallery-grid">
        {GALLERY.map((plate, index) => {
          const copy = fr && FR[plate.id] ? FR[plate.id] : { title: plate.title, caption: plate.caption }
          const number = String(index + 1).padStart(2, '0')
          return (
            <li key={plate.id}>
              <button type="button" onClick={() => setActiveId(plate.id)} aria-haspopup="dialog">
                <span className="ed-photo">
                  <Image src={plate.src} alt="" fill sizes="(min-width: 1100px) 640px, 100vw" />
                </span>
                <span className="ed-gallery-meta">
                  <span>Fig. {number}</span>
                  <strong>{copy.title}</strong>
                  <em>{copy.caption}</em>
                </span>
                <span className="sr-only">{t.open}</span>
              </button>
            </li>
          )
        })}
      </ol>

      <section className="ed-gallery-close" aria-labelledby="gallery-close-title">
        <SectionLabel index="05">{fr ? 'Demande' : 'Enquire'}</SectionLabel>
        <h2 id="gallery-close-title">
          {t.closeTitle} <em>{t.closeEm}</em>
        </h2>
        <div>
          <Pill href={contact} tone="filled">
            {t.enquire}
          </Pill>
          <Pill href={WHATSAPP_URL} external>
            {t.whatsapp}
          </Pill>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="ed-gallery-dialog"
        aria-labelledby={titleId}
        onClose={() => setActiveId(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveId(null)
        }}
      >
        {active && activeCopy ? (
          <figure>
            <img src={active.src} alt={activeCopy.title} />
            <figcaption>
              <strong id={titleId}>{activeCopy.title}</strong>
              <span>{activeCopy.caption}</span>
            </figcaption>
            <button type="button" onClick={() => setActiveId(null)}>
              {t.close}
            </button>
          </figure>
        ) : null}
      </dialog>
    </div>
  )
}

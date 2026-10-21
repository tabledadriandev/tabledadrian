import type { Metadata } from 'next'
import Link from 'next/link'
import { EdFigure, EdPage } from '@/components/editorial/Page'
import { Pill, SectionLabel } from '@/components/editorial/ui'
import { EventPackages } from '@/components/monetisation/EventPackages'
import { FaqSection } from '@/components/seo/FaqSection'
import { GALLERY } from '@/data/gallery'
import { credentials } from '@/lib/credentials'
import type { Locale } from '@/lib/copy'
import { copy } from '@/lib/copy'
import { FAQ, landingFaq } from '@/lib/faq'
import {
  getLocation,
  locationIdFromSlug,
  siblingLocations,
  type LocationId,
} from '@/lib/locations'
import { localeAlternates } from '@/lib/routes'
import { ogImageForLocale } from '@/lib/site'

const UI = {
  en: {
    faq: 'Questions',
    also: 'Also on this coast',
    book: copy.en.bookCta,
    contact: '/contact',
    plates: 'Plates',
    gallery: '/gallery',
  },
  fr: {
    faq: 'Questions',
    also: 'Aussi sur cette côte',
    book: copy.fr.bookCta,
    contact: '/fr/contact',
    plates: 'Assiettes',
    gallery: '/fr/gallery',
  },
} as const

const LANDING_PLATES: Partial<Record<LocationId, string[]>> = {
  antibes: ['duck-breast', 'langoustine', 'leek-salad'],
  cannes: ['rose-tartlets', 'burrata-peach', 'lobster-claw'],
  monaco: ['lobster-claw', 'seabass', 'wellington'],
  'saint-tropez': ['honeycomb-dessert', 'tuna-sushi', 'salmon-tartare'],
  'saint-jean-cap-ferrat': ['langoustine', 'seabass', 'pea-risotto'],
  yacht: ['seabass', 'salmon-tartare', 'squid-ink-pasta'],
}

const FIGURES: Partial<Record<LocationId, { src: string; label: string }>> = {
  hub: { src: '/editorial/tile-private-dinner.webp', label: 'Private dinner' },
  villa: { src: '/editorial/tile-weekly-meals.webp', label: 'Weekly meals' },
  events: { src: '/editorial/tile-celebrations.webp', label: 'Celebrations' },
}

export function locationMetadata(id: LocationId, locale: Locale): Metadata {
  const page = getLocation(id, locale)
  const enPath = locale === 'en' ? page.path : page.pairPath
  const frPath = locale === 'fr' ? page.path : page.pairPath
  return {
    title: page.title,
    description: page.description,
    alternates: localeAlternates(page.path, enPath, frPath),
    openGraph: {
      title: page.title,
      description: page.description,
      locale: locale === 'fr' ? 'fr_FR' : 'en_GB',
      url: page.path,
      alternateLocale: locale === 'fr' ? ['en_GB'] : ['fr_FR'],
      images: [ogImageForLocale(locale)],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [ogImageForLocale(locale).url],
    },
  }
}

export function locationFromSlug(slug: string, locale: Locale) {
  const id = locationIdFromSlug(slug)
  if (!id) return null
  return getLocation(id, locale)
}

export function LocationScreen({ id, locale }: { id: LocationId; locale: Locale }) {
  const page = getLocation(id, locale)
  const chef = credentials[locale]
  const ui = UI[locale]
  const others = siblingLocations(id, locale)
  const plates = (LANDING_PLATES[id] || [])
    .map((plateId) => GALLERY.find((item) => item.id === plateId))
    .filter((item): item is (typeof GALLERY)[number] => Boolean(item))
  const faq = LANDING_PLATES[id] ? landingFaq(locale, page.name) : FAQ[locale]
  const figure = FIGURES[id]

  return (
    <EdPage>
      <header className="ed-page-hero">
        <div className="ed-page-head">
          <div>
            <SectionLabel index="01">{locale === 'fr' ? 'Chef privé' : 'Private chef'}</SectionLabel>
            <h1>
              <span>{page.h1}</span>
            </h1>
          </div>
          <div className="ed-page-intro">
            <p>{page.lede}</p>
            <Pill href={ui.contact} tone="filled">{ui.book}</Pill>
          </div>
        </div>
        <p className="ed-facts">
          <span>{chef.ehl}</span>
          <span>{chef.years}</span>
          <span>{chef.stanford}</span>
        </p>
        <EdFigure
          id={`location/${id}`}
          label={figure?.label || page.name}
          src={figure?.src}
        />
      </header>

      <section className="ed-page-section">
        <div className="ed-body">
          {page.body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      {id === 'events' ? <EventPackages locale={locale} /> : null}

      {plates.length ? (
        <section className="ed-page-section" aria-labelledby="location-plates">
          <h2 id="location-plates">
            <span>{ui.plates}</span>
          </h2>
          <ul className="ed-index">
            {plates.map((plate, index) => (
              <li key={plate.id}>
                <Link href={ui.gallery}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{plate.title}</strong>
                  <em>{plate.caption}</em>
                  <span className="ed-arrow" aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="ed-page-section" aria-labelledby="location-nearby">
        <h2 id="location-nearby">
          <span>{page.nearbyTitle}</span>
        </h2>
        <ul className="ed-nearby">
          {page.nearby.map((place) => (
            <li key={place}>{place}</li>
          ))}
        </ul>
        <p className="ed-note">{page.nearbyNote}</p>
        <nav aria-label={ui.also}>
          <p className="ed-kicker">
            <span className="ed-kicker-name">{ui.also}</span>
          </p>
          <ul className="ed-links">
            {others.map((item) => (
              <li key={item.path}>
                <Link className="ed-caps" href={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <FaqSection title={ui.faq} items={faq} />

      <section className="ed-class-book ed-on-dark">
        <div className="ed-page-head">
          <h2>
            <span className="ed-italic">{page.lede}</span>
          </h2>
          <Pill href={ui.contact} tone="light">{ui.book}</Pill>
        </div>
      </section>
    </EdPage>
  )
}

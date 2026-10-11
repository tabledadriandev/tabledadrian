import type { Metadata } from 'next'
import Link from 'next/link'
import { DishPhoto } from '@/components/media/DishPhoto'
import { Button } from '@/components/ui/Button'
import { FaqSection } from '@/components/seo/FaqSection'
import { credentials } from '@/lib/credentials'
import type { Locale } from '@/lib/copy'
import { copy } from '@/lib/copy'
import {
  getLocation,
  locationFaq,
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
  },
  fr: {
    faq: 'Questions',
    also: 'Aussi sur cette c\u00f4te',
    book: copy.fr.bookCta,
    contact: '/fr/contact',
  },
} as const

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
  const faq = locationFaq(page)

  return (
    <article>
      <header className="bg-ink pb-16 pt-32 text-ink-foreground sm:pb-20 sm:pt-36">
        <div className="container">
          <h1 className="hero-display max-w-5xl">{page.h1}</h1>
          <p className="hero-lede">{page.lede}</p>
          <p className="hero-facts">
            <span>{chef.ehl}</span>
            <span>{chef.years}</span>
            <span>{chef.stanford}</span>
          </p>
        </div>
      </header>

      <div className="bg-background pb-20 pt-16 sm:pt-20">
        <div className="container">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              {page.body.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="mt-6 max-w-[62ch] text-base leading-relaxed text-foreground-muted first:mt-0 sm:text-lg">
                  {paragraph}
                </p>
              ))}
              <div className="mt-10">
                <Button href={ui.contact} variant="ink">
                  {ui.book}
                </Button>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <DishPhoto src={page.imageSrc} alt={page.imageAlt} fill sizes="(max-width: 1024px) 100vw, 40vw" />
                <span className="hero-rim" />
              </div>
            </div>
          </div>

          <section className="mt-20 border-t border-border pt-12 sm:mt-24" aria-labelledby="location-nearby">
            <h2 id="location-nearby" className="display text-3xl sm:text-4xl">
              {page.nearbyTitle}
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {page.nearby.map((place) => (
                <li key={place} className="border-t border-border pt-3 text-sm text-foreground">
                  {place}
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[62ch] text-sm leading-relaxed text-foreground-subtle">{page.nearbyNote}</p>
          </section>

          <nav className="mt-16 border-t border-border pt-12" aria-label={ui.also}>
            <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">{ui.also}</p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              {others.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="text-sm text-foreground underline-offset-4 hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <FaqSection title={ui.faq} items={faq} />
        </div>
      </div>

      <section className="bg-ink py-16 text-ink-foreground sm:py-20">
        <div className="container flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <p className="max-w-xl font-display text-3xl italic leading-snug sm:text-4xl">{page.lede}</p>
          <Button href={ui.contact} variant="light">
            {ui.book}
          </Button>
        </div>
      </section>
    </article>
  )
}

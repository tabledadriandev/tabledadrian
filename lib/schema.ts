import { CONTACT_INFO, INSTAGRAM_URL } from '@/lib/constants'
import { STANFORD_CREDENTIAL } from '@/lib/credentials'
import { OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site'
import type { FaqItem } from '@/lib/faq'

const image = `${SITE_URL}${OG_IMAGE.url}`
const telephone = CONTACT_INFO.phone.replace(/\s/g, '')

export const personId = `${SITE_URL}/#adrian`
export const businessId = `${SITE_URL}/#business`

export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: 'Adrian Stefan',
        jobTitle: 'Private chef',
        description: `Swiss-trained (EHL). 10+ years. ${STANFORD_CREDENTIAL}.`,
        url: SITE_URL,
        image,
        email: CONTACT_INFO.email,
        telephone,
        worksFor: { '@id': businessId },
        sameAs: [INSTAGRAM_URL],
        knowsAbout: ['Private chef', 'Longevity cuisine', 'Chef priv\u00e9', 'Chef \u00e0 domicile'],
      },
      {
        '@type': ['FoodEstablishment', 'LocalBusiness'],
        '@id': businessId,
        name: SITE_NAME,
        alternateName: "Table d'Adrian private chef",
        description:
          "Table d'Adrian is Adrian Stefan's private chef service on the C\u00f4te d'Azur and in Monaco, based in Antibes.",
        url: SITE_URL,
        image,
        email: CONTACT_INFO.email,
        telephone,
        founder: { '@id': personId },
        employee: { '@id': personId },
        areaServed: [
          { '@type': 'AdministrativeArea', name: "C\u00f4te d'Azur" },
          { '@type': 'City', name: 'Monaco' },
          { '@type': 'City', name: 'Nice' },
          { '@type': 'City', name: 'Cannes' },
          { '@type': 'City', name: 'Antibes' },
          { '@type': 'City', name: 'Saint-Tropez' },
        ],
        sameAs: [INSTAGRAM_URL],
        servesCuisine: ['French', 'Mediterranean', 'Longevity'],
        currenciesAccepted: 'EUR',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Antibes',
          addressRegion: "Provence-Alpes-C\u00f4te d'Azur",
          addressCountry: 'FR',
        },
      },
    ],
  }
}

export function localBusinessJsonLd() {
  const graph = siteJsonLd()['@graph'] as Array<Record<string, unknown>>
  const business = graph.find((node) => Array.isArray(node['@type']))
  if (!business) return null
  return {
    '@context': 'https://schema.org',
    ...business,
    '@type': 'LocalBusiness',
  }
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export function isoDuration(minutes: number) {
  const safe = Math.max(0, Math.round(minutes))
  const hours = Math.floor(safe / 60)
  const mins = safe % 60
  if (!hours && !mins) return 'PT0M'
  return `PT${hours ? `${hours}H` : ''}${mins ? `${mins}M` : ''}`
}

export function recipeJsonLd(input: {
  name: string
  description: string
  image: string
  path: string
  prepMin: number
  cookMin: number
  yield: string
  cuisine: string
  category: string
  ingredients: string[]
  instructions: string[]
  free: boolean
  datePublished: string
}) {
  const image = input.image.startsWith('http') ? input.image : `${SITE_URL}${input.image}`
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: input.name,
    description: input.description,
    image: [image],
    author: { '@type': 'Person', '@id': personId, name: 'Adrian Stefan' },
    datePublished: input.datePublished,
    prepTime: isoDuration(input.prepMin),
    cookTime: isoDuration(input.cookMin),
    totalTime: isoDuration(input.prepMin + input.cookMin),
    recipeYield: input.yield,
    recipeCuisine: input.cuisine,
    recipeCategory: input.category,
    recipeIngredient: input.ingredients,
    recipeInstructions: input.instructions.map((text, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text,
    })),
    mainEntityOfPage: `${SITE_URL}${input.path}`,
    isAccessibleForFree: input.free,
  }
  if (!input.free) {
    schema.isAccessibleForFree = false
    schema.hasPart = {
      '@type': 'WebPageElement',
      isAccessibleForFree: false,
      cssSelector: '.paywall',
    }
  }
  return schema
}

export function articleJsonLd(input: {
  headline: string
  description: string
  image: string
  path: string
  datePublished: string
  locale: 'en' | 'fr'
}) {
  const image = input.image.startsWith('http') ? input.image : `${SITE_URL}${input.image}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    image: [image],
    author: { '@type': 'Person', '@id': personId, name: 'Adrian Stefan' },
    publisher: { '@id': businessId },
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    inLanguage: input.locale === 'fr' ? 'fr' : 'en',
    mainEntityOfPage: `${SITE_URL}${input.path}`,
  }
}

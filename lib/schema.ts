import { CONTACT_INFO, INSTAGRAM_URL } from '@/lib/constants'
import { STANFORD_CREDENTIAL } from '@/lib/credentials'
import { OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site'

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
        description:
          `Private chef and longevity cook. EHL Swiss trained, ${STANFORD_CREDENTIAL}, 10+ years in fine kitchens.`,
        url: SITE_URL,
        image,
        email: CONTACT_INFO.email,
        telephone,
        worksFor: { '@id': businessId },
        sameAs: [INSTAGRAM_URL],
        knowsAbout: ['Private chef', 'Longevity cuisine', 'Nutrition', 'Chef à domicile'],
      },
      {
        '@type': ['LocalBusiness', 'FoodService'],
        '@id': businessId,
        name: SITE_NAME,
        alternateName: "Table d'Adrian private chef",
        description:
          "Table d'Adrian is Adrian Stefan's private chef and longevity cuisine service on the Côte d'Azur and in Monaco.",
        url: SITE_URL,
        image,
        email: CONTACT_INFO.email,
        telephone,
        founder: { '@id': personId },
        employee: { '@id': personId },
        areaServed: [
          { '@type': 'AdministrativeArea', name: "Côte d'Azur" },
          { '@type': 'City', name: 'Monaco' },
          { '@type': 'AdministrativeArea', name: 'French Riviera' },
        ],
        sameAs: [INSTAGRAM_URL],
        servesCuisine: ['French', 'Mediterranean', 'Longevity'],
        priceRange: '€€€',
        currenciesAccepted: 'EUR, GBP',
        address: {
          '@type': 'PostalAddress',
          addressRegion: "Provence-Alpes-Côte d'Azur",
          addressCountry: 'FR',
        },
      },
    ],
  }
}

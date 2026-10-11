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
        '@type': ['LocalBusiness', 'FoodService'],
        '@id': businessId,
        name: SITE_NAME,
        alternateName: "Table d'Adrian private chef",
        description:
          "Table d'Adrian is Adrian Stefan's private chef service on the C\u00f4te d'Azur and in Monaco.",
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
          addressRegion: "Provence-Alpes-C\u00f4te d'Azur",
          addressCountry: 'FR',
        },
      },
    ],
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

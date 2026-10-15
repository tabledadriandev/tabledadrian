import { readFileSync } from 'fs'
import { join } from 'path'
import { createElement } from 'react'
import { TextDecoder, TextEncoder } from 'util'
import { FAQ } from '@/lib/faq'
import { townFaq, type TownId } from '@/lib/location-faq'
import { LOCATIONS, getLocation, locationFaq, locationIdFromSlug } from '@/lib/locations'
import { LOCALE_PAIRS, localeAlternates, toLocalePath } from '@/lib/routes'
import { businessId, faqJsonLd, personId, siteJsonLd } from '@/lib/schema'
import { FOOTER_LINKS, NAVIGATION, SOCIAL_LINKS } from '@/lib/constants'
import { OG_EN, OG_FR, OG_IMAGE_EN, OG_IMAGE_FR, SITE_DESCRIPTION, SITE_URL, ogImageForLocale } from '@/lib/site'
import { copy } from '@/lib/copy'
import { LocationScreen } from '@/components/seo/LocationView'

const FORBIDDEN = [/london/i, /£/, /gbp/i, /aggregateRating/i, /reviewCount/i, /500\+/, /99\.7/, /4\.97/]
const MICHELIN = [/michelin/i, /\u00e9toil\u00e9/i, /etoil\u00e9/i, /starred/i]
const HEALTH = [/anti-aging/i, /boosts immunity/i, /heals/i, /detox/i, /adds years/i, /clinically/i]

describe('locale pairs', () => {
  it('maps location slugs between English and French', () => {
    expect(toLocalePath('/private-chef-monaco', 'fr')).toBe('/fr/chef-prive-monaco')
    expect(toLocalePath('/fr/chef-prive-cote-d-azur', 'en')).toBe('/private-chef-cote-d-azur')
    expect(toLocalePath('/contact', 'fr')).toBe('/fr/contact')
    expect(toLocalePath('/', 'fr')).toBe('/fr')
  })

  it('emits en, fr and x-default alternates with a self-canonical', () => {
    const alt = localeAlternates('/private-chef-nice', '/private-chef-nice', '/fr/chef-prive-nice')
    expect(alt.canonical).toBe('/private-chef-nice')
    expect(alt.languages).toEqual({
      en: '/private-chef-nice',
      fr: '/fr/chef-prive-nice',
      'x-default': '/private-chef-nice',
    })
  })

  it('covers the hub and five towns', () => {
    const en = LOCALE_PAIRS.map(([path]) => path)
    expect(en).toEqual(expect.arrayContaining([
      '/private-chef-cote-d-azur',
      '/private-chef-monaco',
      '/private-chef-nice',
      '/private-chef-cannes',
      '/private-chef-antibes',
      '/private-chef-saint-tropez',
    ]))
  })

  it('maps hyphenated location URLs onto the known slugs', () => {
    expect(locationIdFromSlug('cote-d-azur')).toBe('hub')
    expect(locationIdFromSlug('monaco')).toBe('monaco')
    expect('private-chef-monaco'.slice('private-chef-'.length)).toBe('monaco')
    expect('chef-prive-cote-d-azur'.slice('chef-prive-'.length)).toBe('cote-d-azur')
  })
})

describe('location copy', () => {
  it('has eighteen distinct records', () => {
    expect(LOCATIONS).toHaveLength(18)
    expect(locationIdFromSlug('cote-d-azur')).toBe('hub')
    expect(getLocation('monaco', 'en').h1).toBe('Private chef Monaco')
    expect(getLocation('monaco', 'fr').h1).toMatch(/Chef priv/)
  })

  it('does not find-and-replace the city name across town pages', () => {
    const englishTowns = LOCATIONS.filter((item) => item.locale === 'en' && item.id !== 'hub')
    const openings = englishTowns.map((item) => item.body[0])
    expect(new Set(openings).size).toBe(openings.length)
    expect(openings.join(' ')).toMatch(/compact kitchen/i)
    expect(openings.join(' ')).toMatch(/Cours Saleya|market/i)
    expect(openings.join(' ')).toMatch(/weekend|Festival/i)
    expect(openings.join(' ')).toMatch(/Cap d'Antibes|peninsula/i)
    expect(openings.join(' ')).toMatch(/St Tropez|Ramatuelle|peninsula/i)
  })

  it('keeps Antibes from claiming a local base', () => {
    const page = getLocation('antibes', 'en')
    expect(page.body.join(' ')).toMatch(/does not claim that Table d'Adrian is based in Antibes/)
  })

  it('avoids London, sterling, review counts and health claims', () => {
    const blob = JSON.stringify(LOCATIONS)
    FORBIDDEN.forEach((pattern) => expect(blob).not.toMatch(pattern))
    HEALTH.forEach((pattern) => expect(blob).not.toMatch(pattern))
  })
})

describe('FAQ', () => {
  it('keeps eighteen questions in each language', () => {
    expect(FAQ.en).toHaveLength(18)
    expect(FAQ.fr).toHaveLength(18)
  })

  it('answers prices as on request and names the booking routes', () => {
    const cost = FAQ.en.find((item) => item.q.includes('French Riviera'))
    expect(cost?.a).toMatch(/on request/)
    expect(cost?.a).toMatch(/\u20ac/)
    const hire = FAQ.en.find((item) => item.q.includes('How to hire'))
    expect(hire?.a).toMatch(/adrian@tabledadrian.com/)
    expect(hire?.a).toMatch(/@tabledadrian/)
  })

  it('does not make health claims', () => {
    const blob = JSON.stringify(FAQ)
    HEALTH.forEach((pattern) => expect(blob).not.toMatch(pattern))
    expect(blob).toMatch(/not medical/)
  })
})

describe('JSON-LD', () => {
  it('describes an Antibes FoodEstablishment linked to the person', () => {
    const graph = siteJsonLd()['@graph'] as Array<Record<string, unknown>>
    const person = graph.find((node) => node['@type'] === 'Person') as Record<string, unknown>
    const business = graph.find((node) => Array.isArray(node['@type'])) as Record<string, unknown>
    expect(person.name).toBe('Adrian Stefan')
    expect(person.description).toMatch(/Swiss-trained \(EHL\)/)
    expect(person.description).toMatch(/10\+ years/)
    expect(person.description).toMatch(/Nutrition certificate, Stanford/)
    expect(person.sameAs).toEqual(['https://www.instagram.com/tabledadrian/'])
    expect(business['@type']).toEqual(['FoodEstablishment', 'LocalBusiness'])
    expect(business['@id']).toBe(businessId)
    expect(business.url).toBe(SITE_URL)
    expect(business.founder).toEqual({ '@id': personId })
    expect(person['@id']).toBe(personId)
    expect((person.worksFor as { '@id': string })['@id']).toBe(businessId)
    expect(JSON.stringify(business.areaServed)).toMatch(/C\u00f4te d'Azur/)
    expect(JSON.stringify(business.areaServed)).toMatch(/Monaco/)
    expect(JSON.stringify(business.areaServed)).toMatch(/Nice/)
    expect(JSON.stringify(business.areaServed)).toMatch(/Cannes/)
    expect(JSON.stringify(business.areaServed)).toMatch(/Antibes/)
    expect(JSON.stringify(business.areaServed)).toMatch(/Saint-Tropez/)
    expect(business.sameAs).toEqual(['https://www.instagram.com/tabledadrian/'])
    const address = business.address as Record<string, string>
    expect(address['@type']).toBe('PostalAddress')
    expect(address.addressLocality).toBe('Antibes')
    expect(address.addressRegion).toBe("Provence-Alpes-C\u00f4te d'Azur")
    expect(address.addressCountry).toBe('FR')
    expect(address).not.toHaveProperty('streetAddress')
    expect(business).not.toHaveProperty('priceRange')
    expect(business).not.toHaveProperty('aggregateRating')
    expect(JSON.stringify(graph)).not.toMatch(/linkedin/i)
    expect(JSON.stringify(graph)).not.toMatch(/london/i)
    expect(JSON.stringify(graph)).not.toMatch(/£/)
    expect(JSON.stringify(graph)).not.toMatch(/aggregateRating|reviewCount|streetAddress|priceRange/)
  })

  it('builds FAQPage markup that repeats the visible questions', () => {
    const items = locationFaq(getLocation('cannes', 'fr'))
    const page = faqJsonLd(items)
    expect(page['@context']).toBe('https://schema.org')
    expect(page['@type']).toBe('FAQPage')
    const entities = page.mainEntity as Array<Record<string, unknown>>
    expect(entities).toHaveLength(items.length)
    entities.forEach((entity, index) => {
      expect(entity['@type']).toBe('Question')
      expect(entity.name).toBe(items[index].q)
      const answer = entity.acceptedAnswer as Record<string, string>
      expect(answer['@type']).toBe('Answer')
      expect(answer.text).toBe(items[index].a)
    })
  })
})

const TOWNS: TownId[] = ['monaco', 'nice', 'cannes', 'antibes', 'saint-tropez']

describe('town FAQs', () => {
  it('gives each town its own English and French questions', () => {
    TOWNS.forEach((id) => {
      const en = locationFaq(getLocation(id, 'en'))
      const fr = locationFaq(getLocation(id, 'fr'))
      expect(en.length).toBeGreaterThanOrEqual(6)
      expect(fr).toHaveLength(en.length)
      expect(en.map((item) => item.q).join(' ')).not.toBe(fr.map((item) => item.q).join(' '))
      expect(townFaq(id, 'en')).toEqual(en)
    })
    const openings = TOWNS.map((id) => locationFaq(getLocation(id, 'en'))[3].a)
    expect(new Set(openings).size).toBe(openings.length)
  })

  it('keeps prices on request and names the booking routes', () => {
    TOWNS.forEach((id) => {
      const en = locationFaq(getLocation(id, 'en')).map((item) => item.a).join(' ')
      const fr = locationFaq(getLocation(id, 'fr')).map((item) => item.a).join(' ')
      expect(en).toMatch(/on request/)
      expect(en).toMatch(/adrian@tabledadrian.com/)
      expect(en).toMatch(/@tabledadrian/)
      expect(en).toMatch(/no published per-person/)
      expect(fr).toMatch(/sur demande/)
      expect(fr).toMatch(/pas de tarif publi/)
    })
    expect(locationFaq(getLocation('monaco', 'en')).map((item) => item.a).join(' ')).toMatch(/Grand Prix/)
    expect(locationFaq(getLocation('nice', 'en')).map((item) => item.a).join(' ')).toMatch(/Cours Saleya/)
    expect(locationFaq(getLocation('cannes', 'en')).map((item) => item.a).join(' ')).toMatch(/Festival/)
    expect(locationFaq(getLocation('antibes', 'en')).map((item) => item.a).join(' ')).toMatch(/Cap d'Antibes/)
    expect(locationFaq(getLocation('saint-tropez', 'en')).map((item) => item.a).join(' ')).toMatch(/Ramatuelle/)
  })

  it('renders the questions and FAQPage JSON-LD on the server', async () => {
    Object.assign(global, { TextEncoder, TextDecoder })
    const { renderToStaticMarkup } = await import('react-dom/server')
    const html = renderToStaticMarkup(createElement(LocationScreen, { id: 'monaco', locale: 'en' }))
    const items = locationFaq(getLocation('monaco', 'en'))
    items.forEach((item) => {
      expect(html).toContain(item.q)
      expect(html).toContain(item.a)
    })
    expect(html).toContain('application/ld+json')
    expect(html).toContain('FAQPage')
    expect(html).not.toContain('aggregateRating')
  })
})

describe('llms.txt', () => {
  const text = readFileSync(join(process.cwd(), 'public/llms.txt'), 'utf8')

  it('describes the chef, the coast, Antibes, and the booking routes', () => {
    expect(text).toMatch(/private chef/)
    expect(text).toMatch(/longevity cuisine/)
    expect(text).toMatch(/fine-dining precision/)
    expect(text).toMatch(/C\u00f4te d'Azur/)
    expect(text).toMatch(/Monaco/)
    expect(text).toMatch(/based in Antibes/)
    expect(text).toMatch(/Swiss-trained \(EHL\)/)
    expect(text).toMatch(/10\+ years/)
    expect(text).toMatch(/Nutrition certificate, Stanford/)
    expect(text).toMatch(/@tabledadrian/)
    expect(text).toMatch(/adrian@tabledadrian.com/)
    expect(text).toMatch(/enquiry form/)
  })

  it('lists the English and French pages and states no prices', () => {
    ;[
      'https://www.tabledadrian.com/',
      'https://www.tabledadrian.com/fr',
      'https://www.tabledadrian.com/private-chef-monaco',
      'https://www.tabledadrian.com/fr/chef-prive-monaco',
      'https://www.tabledadrian.com/private-chef-nice',
      'https://www.tabledadrian.com/fr/chef-prive-nice',
      'https://www.tabledadrian.com/private-chef-cannes',
      'https://www.tabledadrian.com/fr/chef-prive-cannes',
      'https://www.tabledadrian.com/private-chef-antibes',
      'https://www.tabledadrian.com/fr/chef-prive-antibes',
      'https://www.tabledadrian.com/private-chef-saint-tropez',
      'https://www.tabledadrian.com/fr/chef-prive-saint-tropez',
      'https://www.tabledadrian.com/private-chef-cote-d-azur',
      'https://www.tabledadrian.com/fr/chef-prive-cote-d-azur',
      'https://www.tabledadrian.com/contact',
      'https://www.tabledadrian.com/fr/contact',
    ].forEach((url) => expect(text).toContain(url))
    expect(text).not.toMatch(/\/sola/)
    expect(text).not.toMatch(/€|£|\$\d/)
    expect(text).toMatch(/no prices/)
    HEALTH.forEach((pattern) => expect(text).not.toMatch(pattern))
  })
})

describe('social and share cards', () => {
  it('keeps Instagram only', () => {
    expect(SOCIAL_LINKS).toEqual({ instagram: 'https://www.instagram.com/tabledadrian/' })
    expect(JSON.stringify(SOCIAL_LINKS)).not.toMatch(/linkedin/i)
  })

  it('uses the designer lockup cards for EN and FR', () => {
    expect(OG_IMAGE_EN.url).toBe('/og_tabledadrian_en.jpg')
    expect(OG_IMAGE_FR.url).toBe('/og_tabledadrian_fr.jpg')
    expect(ogImageForLocale('en')).toBe(OG_IMAGE_EN)
    expect(ogImageForLocale('fr')).toBe(OG_IMAGE_FR)
    expect(OG_EN.locale).toBe('en_GB')
    expect(OG_FR.locale).toBe('fr_FR')
    expect(OG_EN.title).not.toMatch(/london/i)
    expect(OG_FR.title).not.toMatch(/london/i)
    expect(OG_EN.title).not.toMatch(/europe/i)
    expect(OG_FR.title).not.toMatch(/europe/i)
  })
})

describe('credential lock', () => {
  it('does not claim Michelin training or stars', () => {
    const blob = [
      JSON.stringify(copy),
      SITE_DESCRIPTION,
      JSON.stringify(siteJsonLd()),
      JSON.stringify(LOCATIONS),
      JSON.stringify(FAQ),
      JSON.stringify(TOWNS.flatMap((id) => [...townFaq(id, 'en'), ...townFaq(id, 'fr')])),
      readFileSync(join(process.cwd(), 'public/llms.txt'), 'utf8'),
    ].join('\n')
    MICHELIN.forEach((pattern) => expect(blob).not.toMatch(pattern))
    expect(copy.en.heroLede).toMatch(/Swiss-trained technique and nutrition science, brought into your home/)
    expect(copy.en.footerBlurb).toMatch(/Swiss-trained \(EHL\)/)
    expect(copy.en.footerBlurb).toMatch(/Nutrition certificate, Stanford/)
  })

  it('labels the on-request menus route Enquire / Tarifs sur demande', () => {
    expect(NAVIGATION.some((item) => item.href === '/pricing' && item.name === 'Enquire')).toBe(true)
    expect(FOOTER_LINKS.some((item) => item.href === '/pricing' && item.name === 'Enquire')).toBe(true)
    expect(copy.en.navPricing).toBe('Enquire')
    expect(copy.fr.navPricing).toBe('Tarifs sur demande')
  })
})

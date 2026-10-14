import type { Locale } from '@/lib/copy'
import slugs from '@/data/library/slugs.json'
import journalSlugs from '@/data/library/journal-slugs.json'

type SlugPair = { slug: string; slugFr: string }

const recipeSlugPairs = slugs as SlugPair[]
const journalSlugPairs = journalSlugs as SlugPair[]

export const LOCALE_PAIRS = [
  ['/', '/fr'],
  ['/pricing', '/fr/pricing'],
  ['/contact', '/fr/contact'],
  ['/recipes', '/fr/recettes'],
  ['/articles', '/fr/articles'],
  ['/menus', '/fr/menus'],
  ['/gallery', '/fr/gallery'],
  ['/privacy', '/fr/confidentialite'],
  ['/terms', '/fr/conditions'],
  ['/private-chef-cote-d-azur', '/fr/chef-prive-cote-d-azur'],
  ['/private-chef-monaco', '/fr/chef-prive-monaco'],
  ['/private-chef-nice', '/fr/chef-prive-nice'],
  ['/private-chef-cannes', '/fr/chef-prive-cannes'],
  ['/private-chef-antibes', '/fr/chef-prive-antibes'],
  ['/private-chef-saint-tropez', '/fr/chef-prive-saint-tropez'],
  ['/yacht-chef', '/fr/chef-de-yacht'],
  ['/villa-chef', '/fr/chef-en-villa'],
  ['/events-and-weddings', '/fr/evenements-et-mariages'],
  ['/services', '/fr/services'],
  ['/gift', '/fr/cadeau'],
  ['/masterclass', '/fr/cours-de-cuisine'],
  ['/chefs-kitchen', '/fr/cuisine-du-chef'],
  ['/shop/recipe-books', '/fr/livres-de-recettes'],
  ['/plans', '/fr/programmes'],
  ['/plans/blood-sugar', '/fr/programmes/glycemie'],
  ['/plans/hormones', '/fr/programmes/hormones'],
  ['/plans/heart', '/fr/programmes/coeur'],
  ['/plans/gut', '/fr/programmes/intestin'],
  ['/plans/training', '/fr/programmes/entrainement'],
  ['/partners', '/fr/partenaires'],
] as const

export type EnPath = (typeof LOCALE_PAIRS)[number][0]
export type FrPath = (typeof LOCALE_PAIRS)[number][1]

const UNTRANSLATED = [/^\/nutrition$/, /^\/bmi$/, /^\/sola(\/|$)/]

export function pairForPath(pathname: string): readonly [string, string] | undefined {
  const path = pathname.split('#')[0].split('?')[0]
  return LOCALE_PAIRS.find(([en, fr]) => path === en || path === fr)
}

function hashOf(pathname: string) {
  const index = pathname.indexOf('#')
  return index === -1 ? '' : pathname.slice(index)
}

function pathOnly(pathname: string) {
  return pathname.split('#')[0].split('?')[0]
}

export function toLocalePath(pathname: string, locale: Locale): string {
  const hash = hashOf(pathname)
  const path = pathOnly(pathname)

  const pair = pairForPath(path)
  if (pair) return (locale === 'fr' ? pair[1] : pair[0]) + hash

  const recipeEn = path.match(/^\/recipes\/([^/]+)$/)
  if (recipeEn) {
    const hit = recipeSlugPairs.find((item) => item.slug === recipeEn[1])
    if (locale === 'fr') return hit ? `/fr/recettes/${hit.slugFr}` : '/fr/recettes'
    return path
  }

  const recipeFr = path.match(/^\/fr\/recettes\/([^/]+)$/)
  if (recipeFr) {
    const hit = recipeSlugPairs.find((item) => item.slugFr === recipeFr[1])
    if (locale === 'en') return hit ? `/recipes/${hit.slug}` : '/recipes'
    return path
  }

  const articleEn = path.match(/^\/articles\/([^/]+)$/)
  if (articleEn) {
    const hit = journalSlugPairs.find((item) => item.slug === articleEn[1])
    if (locale === 'fr') return hit ? `/fr/articles/${hit.slugFr}` : '/fr/articles'
    return path
  }

  const articleFr = path.match(/^\/fr\/articles\/([^/]+)$/)
  if (articleFr) {
    const hit = journalSlugPairs.find((item) => item.slugFr === articleFr[1])
    if (locale === 'en') return hit ? `/articles/${hit.slug}` : '/articles'
    return path
  }

  if (locale === 'fr') {
    if (path === '/fr' || path.startsWith('/fr/')) return path + hash
    if (UNTRANSLATED.some((pattern) => pattern.test(path))) return path + hash
    if (path.startsWith('/#')) return `/fr${path.slice(1)}`
    return path + hash
  }

  if (path === '/fr') return '/' + hash
  if (path.startsWith('/fr/')) {
    const stripped = path.slice(3)
    const known = pairForPath(stripped.startsWith('/') ? stripped : `/${stripped}`)
    if (known) return known[0] + hash
    return (stripped.startsWith('/') ? stripped : `/${stripped}`) + hash
  }
  return path + hash
}

export function localeAlternates(canonicalPath: string, enPath: string, frPath: string) {
  return {
    canonical: canonicalPath,
    languages: {
      en: enPath,
      fr: frPath,
      'x-default': enPath,
    },
  }
}

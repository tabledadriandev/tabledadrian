import type { Locale } from '@/lib/copy'

export const LOCALE_PAIRS = [
  ['/', '/fr'],
  ['/pricing', '/fr/pricing'],
  ['/contact', '/fr/contact'],
  ['/private-chef-cote-d-azur', '/fr/chef-prive-cote-d-azur'],
  ['/private-chef-monaco', '/fr/chef-prive-monaco'],
  ['/private-chef-nice', '/fr/chef-prive-nice'],
  ['/private-chef-cannes', '/fr/chef-prive-cannes'],
  ['/private-chef-antibes', '/fr/chef-prive-antibes'],
  ['/private-chef-saint-tropez', '/fr/chef-prive-saint-tropez'],
] as const

export type EnPath = (typeof LOCALE_PAIRS)[number][0]
export type FrPath = (typeof LOCALE_PAIRS)[number][1]

export function pairForPath(pathname: string): readonly [string, string] | undefined {
  return LOCALE_PAIRS.find(([en, fr]) => pathname === en || pathname === fr)
}

export function toLocalePath(pathname: string, locale: Locale): string {
  const pair = pairForPath(pathname)
  if (pair) return locale === 'fr' ? pair[1] : pair[0]
  if (locale === 'fr') {
    if (pathname === '/fr' || pathname.startsWith('/fr/')) return pathname
    if (pathname === '/') return '/fr'
    if (pathname.startsWith('/#')) return `/fr${pathname.slice(1)}`
    return `/fr${pathname}`
  }
  if (pathname === '/fr') return '/'
  if (pathname.startsWith('/fr/')) return pathname.slice(3)
  return pathname
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

import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/copy'

export function localeFromPath(pathname: string | null): Locale {
  if (!pathname) return 'en'
  return pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : 'en'
}

export function useLocale(): Locale {
  return localeFromPath(usePathname())
}

export function withLocale(href: string, locale: Locale): string {
  if (locale === 'en') return href
  if (href.startsWith('/sola')) return href
  if (href === '/') return '/fr'
  if (href.startsWith('/#')) return `/fr${href.slice(1)}`
  return `/fr${href}`
}

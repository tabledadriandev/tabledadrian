import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/copy'
import { toLocalePath } from '@/lib/routes'

export function localeFromPath(pathname: string | null): Locale {
  if (!pathname) return 'en'
  return pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : 'en'
}

export function useLocale(): Locale {
  return localeFromPath(usePathname())
}

export function withLocale(href: string, locale: Locale): string {
  if (href.startsWith('/sola')) return href
  return toLocalePath(href, locale)
}

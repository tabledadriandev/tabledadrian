'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CONTACT_INFO, FOOTER_LINKS, INSTAGRAM_URL } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { useLocale, withLocale } from '@/lib/i18n'
import { offerNavLabel } from '@/lib/monetisation'
import { toLocalePath } from '@/lib/routes'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { LemonBox } from '@/components/b2/ui'
import { GoogleReviewFooter } from '@/components/layout/GoogleReview'
import { B2_NAV } from './MaisonNav'

/* Mockup B footer card: brand · four links · place line. A quiet second row keeps every route, theme and language reachable. */
export function MaisonFooter() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = copy[locale]
  const year = new Date().getFullYear()
  const extra = FOOTER_LINKS.filter((f) => !['/gallery', '/#about', '/services', '/pricing'].includes(f.href))
  return (
    <div className="wrap">
      <footer className="b2-foot">
        <div className="b2-foot-row">
          <Link href={withLocale('/', locale)} className="brand">
            <LemonBox />
            Table d&apos;Adrian
          </Link>
          <div className="links">
            {B2_NAV[locale].map((l) => (
              <Link key={l.href} href={withLocale(l.href, locale)}>{l.label}</Link>
            ))}
          </div>
          <span className="m">Antibes · Côte d&apos;Azur &amp; Monaco · © {year}</span>
        </div>
        <GoogleReviewFooter />
        <div className="b2-foot-sub">
          <div className="sublinks">
            {extra.map((item) => (
              <Link key={item.href} href={withLocale(item.href, locale)}>{offerNavLabel(item.href, item.name, locale)}</Link>
            ))}
            <Link href="/sola">Sola</Link>
            <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">{t.instagramHandle}</a>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
          <div className="b2-foot-tools">
            <span className="b2-lang">
              <Link href={toLocalePath(pathname, 'en')} hrefLang="en" lang="en" aria-current={locale === 'en' ? 'true' : undefined}>EN</Link>
              <Link href={toLocalePath(pathname, 'fr')} hrefLang="fr" lang="fr" aria-current={locale === 'fr' ? 'true' : undefined}>FR</Link>
            </span>
            <ThemeToggle />
          </div>
        </div>
      </footer>
    </div>
  )
}

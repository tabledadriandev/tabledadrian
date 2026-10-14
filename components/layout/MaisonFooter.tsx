'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NewsletterForm } from '@/components/monetisation/NewsletterForm'
import { CONTACT_INFO, FOOTER_LINKS, INSTAGRAM_URL } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { useLocale, withLocale } from '@/lib/i18n'
import { offerNavLabel } from '@/lib/monetisation'
import { toLocalePath } from '@/lib/routes'

export function MaisonFooter() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = copy[locale]
  const year = new Date().getFullYear()
  const dot = '\u00B7'

  return (
    <footer className="maison-footer">
      <div className="container pb-4">
        <NewsletterForm locale={locale} id="journal-email-footer" compact />
      </div>
      <div className="container maison-footer-row">
        <p>
          {'\u00A9'} {year} Table d&apos;Adrian {dot} Antibes {dot} Monaco {dot} C{'\u00F4'}te d&apos;Azur
        </p>
        <p className="maison-footer-contact">
          <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            {t.instagramHandle}
          </a>
        </p>
      </div>
      <div className="container maison-footer-links">
        {FOOTER_LINKS.map((item) => (
          <Link key={item.href} href={withLocale(item.href, locale)}>
            {item.href === '/pricing' ? t.navPricing : offerNavLabel(item.href, item.name, locale)}
          </Link>
        ))}
        <Link href="/sola">Sola</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href={toLocalePath(pathname, 'en')} hrefLang="en" lang="en">
          EN
        </Link>
        <Link href={toLocalePath(pathname, 'fr')} hrefLang="fr" lang="fr">
          FR
        </Link>
      </div>
    </footer>
  )
}

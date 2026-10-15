'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FOOTER_LINKS } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { useLocale, withLocale } from '@/lib/i18n'
import { offerNavLabel } from '@/lib/monetisation'
import { Arrow, LemonBox } from '@/components/b2/ui'

export const B2_NAV = {
  en: [
    { href: '/services', label: 'Experiences' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/#about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  fr: [
    { href: '/services', label: 'Expériences' },
    { href: '/gallery', label: 'Galerie' },
    { href: '/#about', label: 'À propos' },
    { href: '/contact', label: 'Contact' },
  ],
}

/* Mockup B header: one 64px card pill — lemon brand, dotted-divider links, gold Enquire button. */
export function MaisonNav() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = copy[locale]
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [pathname])
  const links = B2_NAV[locale]
  return (
    <header className="b2-head">
      <div className="wrap">
      <div className="pill">
        <Link href={withLocale('/', locale)} className="brand">
          <LemonBox />
          Table d&apos;Adrian
        </Link>
        <nav className="b2-nav" aria-label="Primary">
          {links.map((l, i) => (
            <span key={l.href} className="b2-nav-item">
              {i > 0 ? <i aria-hidden="true" /> : null}
              <Link href={withLocale(l.href, locale)} aria-current={pathname === withLocale(l.href, locale) ? 'page' : undefined}>
                {l.label}
              </Link>
            </span>
          ))}
        </nav>
        <div className="b2-head-r">
          <button
            type="button"
            className="b2-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="b2-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span />
          </button>
          <Link className="btn ember" href={withLocale('/contact', locale)}>
            {t.hybrid.navEnquire} <Arrow />
          </Link>
        </div>
      </div>
      {open ? (
        <div id="b2-menu" className="b2-sheet">
          {[...links, ...FOOTER_LINKS.filter((f) => !['/gallery', '/#about', '/services', '/pricing'].includes(f.href)).map((f) => ({ href: f.href, label: offerNavLabel(f.href, f.name, locale) }))].map((l) => (
            <Link key={l.href} href={withLocale(l.href, locale)}>
              {l.label} <Arrow />
            </Link>
          ))}
        </div>
      ) : null}
      </div>
    </header>
  )
}

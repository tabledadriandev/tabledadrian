'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CONTACT_INFO, GOOGLE_REVIEW_URL, INSTAGRAM_URL, WHATSAPP_URL } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { useLocale, withLocale } from '@/lib/i18n'
import { toLocalePath } from '@/lib/routes'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { BrandLockup } from './ui'

type Item = { href: string; en: string; fr: string }

const GROUPS: { en: string; fr: string; items: Item[] }[] = [
  {
    en: 'Visit',
    fr: 'Visiter',
    items: [
      { href: '/services', en: 'Experiences', fr: 'Expériences' },
      { href: '/gallery', en: 'Gallery', fr: 'Galerie' },
      { href: '/menus', en: 'Menus', fr: 'Menus' },
      { href: '/#about', en: 'About', fr: 'À propos' },
    ],
  },
  {
    en: 'Read',
    fr: 'Lire',
    items: [
      { href: '/articles', en: 'Journal', fr: 'Journal' },
      { href: '/recipes', en: 'Recipes', fr: 'Recettes' },
      { href: '/shop/recipe-books', en: 'Books', fr: 'Livres' },
      { href: '/masterclass', en: 'Classes', fr: 'Cours' },
    ],
  },
  {
    en: 'More',
    fr: 'Encore',
    items: [
      { href: '/gift', en: 'Gift cards', fr: 'Bons cadeaux' },
      { href: '/plans', en: 'Plans', fr: 'Programmes' },
      { href: '/partners', en: 'Partners', fr: 'Partenaires' },
      { href: '/chefs-kitchen', en: 'Kitchen', fr: 'Cuisine' },
      { href: '/sola', en: 'Sola', fr: 'Sola' },
      { href: '/contact', en: 'Contact', fr: 'Contact' },
    ],
  },
]

export function menuItems() {
  return GROUPS.flatMap((group) => group.items)
}

function MenuIcon() {
  return (
    <span className="ed-menu-icon" aria-hidden="true">
      <i />
      <i />
    </span>
  )
}

function CloseIcon() {
  return (
    <span className="ed-close-icon" aria-hidden="true">
      <i />
      <i />
    </span>
  )
}

export function EditorialNav() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = copy[locale].hybrid
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const menuLabel = locale === 'fr' ? 'Menu' : 'Menu'
  const openLabel = locale === 'fr' ? 'Ouvrir le menu' : 'Open menu'
  const closeLabel = locale === 'fr' ? 'Fermer le menu' : 'Close menu'

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const flat = menuItems()

  return (
    <>
      <header className="ed-header">
        <button
          type="button"
          className="ed-menu-btn"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? closeLabel : openLabel}
          onClick={() => setOpen((value) => !value)}
        >
          <MenuIcon />
          <span className="ed-menu-word">{menuLabel}</span>
        </button>
        <Link href={withLocale('/', locale)} className="ed-header-logo" aria-label="Table d'Adrian">
          <BrandLockup label="" />
        </Link>
        <div className="ed-header-actions">
          <p className="ed-lang">
            <Link href={toLocalePath(pathname || '/', 'en')} hrefLang="en" lang="en" aria-current={locale === 'en' ? 'true' : undefined}>
              EN
            </Link>
            <span aria-hidden="true"> / </span>
            <Link href={toLocalePath(pathname || '/', 'fr')} hrefLang="fr" lang="fr" aria-current={locale === 'fr' ? 'true' : undefined}>
              FR
            </Link>
          </p>
          <Link className="ed-pill ed-pill-outline ed-header-enquire" href={withLocale('/contact', locale)}>
            <span>{t.navEnquire}</span>
            <span className="ed-arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </header>
      {open ? (
        <div className="ed-overlay ed-on-dark" id="site-menu" role="dialog" aria-modal="true" aria-labelledby={titleId}>
          <div className="ed-overlay-bar">
            <button type="button" className="ed-menu-btn" onClick={() => setOpen(false)} aria-label={closeLabel}>
              <CloseIcon />
              <span className="ed-menu-word">{locale === 'fr' ? 'Fermer' : 'Close'}</span>
            </button>
            <p id={titleId} className="sr-only">
              {menuLabel}
            </p>
            <p className="ed-lang">
              <Link href={toLocalePath(pathname || '/', 'en')} hrefLang="en" lang="en" aria-current={locale === 'en' ? 'true' : undefined}>
                EN
              </Link>
              <span aria-hidden="true"> / </span>
              <Link href={toLocalePath(pathname || '/', 'fr')} hrefLang="fr" lang="fr" aria-current={locale === 'fr' ? 'true' : undefined}>
                FR
              </Link>
            </p>
          </div>
          <nav className="ed-overlay-nav" aria-label={menuLabel}>
            {GROUPS.map((group) => (
              <div key={group.en} className="ed-overlay-col">
                <p className="ed-overlay-label">{locale === 'fr' ? group.fr : group.en}</p>
                <ol>
                  {group.items.map((item) => {
                    const number = String(flat.findIndex((entry) => entry.href === item.href) + 1).padStart(2, '0')
                    return (
                      <li key={item.href}>
                        <Link href={withLocale(item.href, locale)}>
                          <span className="ed-overlay-index">{number}</span>
                          <span className="ed-overlay-name">{locale === 'fr' ? item.fr : item.en}</span>
                        </Link>
                      </li>
                    )
                  })}
                </ol>
              </div>
            ))}
          </nav>
          <div className="ed-overlay-foot">
            <ThemeToggle variant="editorial" />
            <Link className="ed-pill ed-pill-brass" href={withLocale('/contact', locale)} onClick={() => setOpen(false)}>
              <span>{t.navEnquire}</span>
              <span className="ed-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      ) : null}
    </>
  )
}

export function EditorialFooter() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = copy[locale]
  const year = new Date().getFullYear()
  const reviewLabel = locale === 'fr' ? 'Laissez-nous un avis Google' : 'Leave a Google review'

  return (
    <footer className="ed-footer ed-on-dark">
      <div className="ed-footer-top">
        <div className="ed-footer-brand">
          <Link href={withLocale('/', locale)} aria-label="Table d'Adrian">
            <BrandLockup className="ed-lockup-footer" label="" />
          </Link>
          <p className="ed-footer-sign">
            À table,
            <br />
            <em>{locale === 'fr' ? 'sur la Riviera.' : 'on the Riviera.'}</em>
          </p>
        </div>
        <div className="ed-footer-cols">
          {GROUPS.map((group) => (
            <div key={group.en}>
              <p>{locale === 'fr' ? group.fr : group.en}</p>
              <ul>
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={withLocale(item.href, locale)}>{locale === 'fr' ? item.fr : item.en}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p>Contact</p>
            <ul>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                  {t.instagramHandle}
                </a>
              </li>
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li>Antibes · Monaco</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="b2-foot-review ed-foot-review">
        <p>{t.googleReview.footer}</p>
        <a className="ed-caps" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener">
          {reviewLabel}
        </a>
      </div>
      <div className="ed-footer-base">
        <p>
          Table d&apos;Adrian · {locale === 'fr' ? 'Chef privé' : 'Private chef'}, Côte d&apos;Azur &amp; Monaco · © {year}
        </p>
        <p className="ed-footer-meta">
          <Link href={withLocale('/privacy', locale)}>{locale === 'fr' ? 'Confidentialité' : 'Privacy'}</Link>
          <span aria-hidden="true"> · </span>
          <Link href={withLocale('/terms', locale)}>{locale === 'fr' ? 'Conditions' : 'Terms'}</Link>
          <span aria-hidden="true"> · </span>
          <Link href={toLocalePath(pathname || '/', 'en')} hrefLang="en" lang="en">
            EN
          </Link>
          <span aria-hidden="true"> / </span>
          <Link href={toLocalePath(pathname || '/', 'fr')} hrefLang="fr" lang="fr">
            FR
          </Link>
          <ThemeToggle variant="editorial" />
        </p>
      </div>
    </footer>
  )
}

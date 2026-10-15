'use client'

import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { copy, type Locale } from '@/lib/copy'
import { useLocale, withLocale } from '@/lib/i18n'
import { Arrow, LemonBox } from '@/components/b2/ui'

type NavItem = { href: string; en: string; fr: string }

const PRIMARY: NavItem[] = [
  { href: '/services', en: 'Experiences', fr: 'Expériences' },
  { href: '/gallery', en: 'Gallery', fr: 'Galerie' },
  { href: '/#about', en: 'About', fr: 'À propos' },
  { href: '/contact', en: 'Contact', fr: 'Contact' },
]

const MORE: NavItem[] = [
  { href: '/menus', en: 'Menus', fr: 'Menus' },
  { href: '/shop/recipe-books', en: 'Recipe books', fr: 'Livres de recettes' },
  { href: '/recipes', en: 'Recipes', fr: 'Recettes' },
  { href: '/plans', en: 'Plans', fr: 'Programmes' },
  { href: '/articles', en: 'Journal', fr: 'Journal' },
  { href: '/gift', en: 'Gift', fr: 'Cadeau' },
  { href: '/partners', en: 'Partners', fr: 'Partenaires' },
  { href: '/sola', en: 'Sola', fr: 'Sola' },
  { href: '/masterclass', en: 'Classes', fr: 'Cours' },
  { href: '/chefs-kitchen', en: 'Kitchen', fr: 'Cuisine' },
]

export function navLinks(locale: Locale) {
  return [...PRIMARY, ...MORE].map((item) => ({ href: item.href, label: item[locale] }))
}

/** The four links in the footer’s main row. */
export const B2_NAV = {
  en: PRIMARY.map((item) => ({ href: item.href, label: item.en })),
  fr: PRIMARY.map((item) => ({ href: item.href, label: item.fr })),
}

function Chevron() {
  return (
    <svg className="b2-chevron" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
      <path d="M1.5 3.5 5 7 8.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

/* Mockup B header: one 64px card pill — lemon brand, dotted-divider links, gold Enquire button. */
export function MaisonNav() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = copy[locale]
  const links = navLinks(locale)
  const primary = links.slice(0, PRIMARY.length)
  const more = links.slice(PRIMARY.length)
  const exploreLabel = locale === 'fr' ? 'Explorer' : 'Explore'
  const panelId = useId()
  const popRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const hoverLock = useRef(false)
  const focusFirst = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    setMoreOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!moreOpen) return
    const close = (event: PointerEvent) => {
      if (!popRef.current?.contains(event.target as Node)) setMoreOpen(false)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [moreOpen])

  useEffect(() => {
    if (!moreOpen || !focusFirst.current) return
    focusFirst.current = false
    popRef.current?.querySelector('a')?.focus()
  }, [moreOpen])

  function moveFocus(delta: number) {
    const items = Array.from(popRef.current?.querySelectorAll<HTMLAnchorElement>('a') ?? [])
    if (!items.length) return
    const current = items.findIndex((item) => item === document.activeElement)
    const next = items[(current + delta + items.length) % items.length]
    next.focus()
  }

  function onExploreKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusFirst.current = document.activeElement === buttonRef.current || !moreOpen
      setMoreOpen(true)
      if (moreOpen) moveFocus(1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!moreOpen) {
        focusFirst.current = true
        setMoreOpen(true)
      } else {
        moveFocus(-1)
      }
    } else if (event.key === 'Escape') {
      setMoreOpen(false)
      buttonRef.current?.focus()
    } else if (event.key === 'Home' && moreOpen) {
      event.preventDefault()
      popRef.current?.querySelector('a')?.focus()
    } else if (event.key === 'End' && moreOpen) {
      event.preventDefault()
      const items = popRef.current?.querySelectorAll('a')
      ;(items?.[items.length - 1] as HTMLAnchorElement | undefined)?.focus()
    }
  }

  return (
    <header className="b2-head">
      <div className="wrap">
        <div className="pill">
          <Link href={withLocale('/', locale)} className="brand">
            <LemonBox />
            Table d&apos;Adrian
          </Link>
          <nav className="b2-nav" aria-label="Primary">
            {primary.map((item, i) => (
              <span key={item.href} className="b2-nav-item">
                {i > 0 ? <i aria-hidden="true" /> : null}
                <Link href={withLocale(item.href, locale)} aria-current={pathname === withLocale(item.href, locale) ? 'page' : undefined}>
                  {item.label}
                </Link>
              </span>
            ))}
            <span className="b2-nav-item">
              <i aria-hidden="true" />
              <div
                className={`b2-more${moreOpen ? ' is-open' : ''}`}
                ref={popRef}
                onMouseEnter={() => {
                  if (!hoverLock.current) setMoreOpen(true)
                }}
                onMouseLeave={() => {
                  hoverLock.current = false
                  setMoreOpen(false)
                }}
                onKeyDown={onExploreKeyDown}
              >
                <button
                  ref={buttonRef}
                  type="button"
                  className="b2-more-btn"
                  aria-expanded={moreOpen}
                  aria-haspopup="true"
                  aria-controls={panelId}
                  onClick={() => {
                    setMoreOpen((open) => {
                      hoverLock.current = open
                      return !open
                    })
                  }}
                >
                  {exploreLabel}
                  <Chevron />
                </button>
                {moreOpen ? (
                  <div id={panelId} className="b2-more-panel" role="group" aria-label={exploreLabel}>
                    {more.map((item) => (
                      <Link
                        key={item.href}
                        href={withLocale(item.href, locale)}
                        aria-current={pathname === withLocale(item.href, locale) ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </span>
          </nav>
          <div className="b2-head-r">
            <button
              type="button"
              className="b2-burger"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="b2-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span /><span />
            </button>
            <Link className="btn ember" href={withLocale('/contact', locale)}>
              {t.hybrid.navEnquire} <Arrow />
            </Link>
          </div>
        </div>
        {menuOpen ? (
          <div id="b2-menu" className="b2-sheet">
            {links.map((item) => (
              <Link key={item.href} href={withLocale(item.href, locale)}>
                {item.label} <Arrow />
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  )
}

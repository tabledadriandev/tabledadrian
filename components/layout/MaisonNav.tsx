'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { FOOTER_LINKS, WELLNESS_LINKS } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { useLocale, withLocale } from '@/lib/i18n'
import { offerNavLabel } from '@/lib/monetisation'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export function MaisonNav() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = copy[locale]
  const h = t.hybrid
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const chef = withLocale('/#chef', locale)
  const experiences = withLocale('/#experiences', locale)
  const enquire = withLocale('/#enquire', locale)

  return (
    <header className="maison-nav">
      <nav className="nav-pill" aria-label="Primary">
        <Link href={withLocale('/', locale)} className="nav-word" aria-label="Table d'Adrian">
          Table d&apos;Adrian
        </Link>
        <div className="nav-links-desktop">
          <a href={chef}>{h.navChef}</a>
          <a href={experiences}>{h.navExperiences}</a>
          <details className="nav-index">
            <summary>{h.navIndex}</summary>
            <div className="nav-index-panel">
              {FOOTER_LINKS.map((item) => (
                <Link key={item.href} href={withLocale(item.href, locale)}>
                  {item.href === '/pricing' ? t.navPricing : offerNavLabel(item.href, item.name, locale)}
                </Link>
              ))}
              {WELLNESS_LINKS.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.name}
                </Link>
              ))}
              <Link href="/sola">Sola</Link>
            </div>
          </details>
          <a href={enquire}>{h.navEnquire}</a>
        </div>
        <div className="nav-tools">
          <ThemeToggle />
          <button
            type="button"
            className="nav-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="maison-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      {open ? (
        <div id="maison-menu" className="nav-sheet">
          <a href={chef} onClick={() => setOpen(false)}>
            {h.navChef}
          </a>
          <a href={experiences} onClick={() => setOpen(false)}>
            {h.navExperiences}
          </a>
          <a href={enquire} onClick={() => setOpen(false)}>
            {h.navEnquire}
          </a>
          {FOOTER_LINKS.map((item) => (
            <Link key={item.href} href={withLocale(item.href, locale)} onClick={() => setOpen(false)}>
              {item.href === '/pricing' ? t.navPricing : offerNavLabel(item.href, item.name, locale)}
            </Link>
          ))}
          <Link href="/sola" onClick={() => setOpen(false)}>
            Sola
          </Link>
        </div>
      ) : null}
    </header>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { NAVIGATION, CONTACT_INFO } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { useLocale, withLocale } from '@/lib/i18n'
import { AppBadges } from '@/components/app/AppBadges'
import { BrandMark } from '@/components/brand/BrandMark'
import { Magnetic } from '@/components/motion/Magnetic'
import { cn } from '@/lib/utils'
import { MaisonNav } from '@/components/layout/MaisonNav'

const ease = [0.76, 0, 0.24, 1] as const

export function Navbar() {
  const pathname = usePathname()
  if (pathname.startsWith('/sola')) return <LegacyNavbar />
  return <MaisonNav />
}

function LegacyNavbar() {
  const pathname = usePathname()
  const locale = useLocale()
  const t = copy[locale]
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWide, setIsWide] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)')
    const sync = () => setIsWide(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!isMobileMenuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isMobileMenuOpen])

  const isHome = pathname === '/' || pathname === '/fr'
  const onDark = isMobileMenuOpen || (isHome && !isScrolled)
  const lockupOnInk = isMobileMenuOpen || (isHome && !isScrolled && isWide)
  const textBase = onDark ? 'text-ink-foreground' : 'text-foreground'
  const textMuted = onDark
    ? 'text-ink-foreground/75 hover:text-ink-foreground'
    : 'text-foreground-muted hover:text-foreground'

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[65] transition-colors duration-500',
          isScrolled && !isMobileMenuOpen ? 'nav-scrolled' : 'bg-transparent'
        )}
      >
        <nav className="container flex items-center justify-between py-4 sm:py-5" aria-label="Primary">
          <Link
            href={withLocale('/', locale)}
            className={cn('group flex flex-col leading-none', textBase)}
            aria-label="Table d'Adrian"
          >
            <BrandMark onDark={lockupOnInk} />
            <span className={cn('mt-1 text-[10px] uppercase tracking-caps', onDark ? 'text-gold' : 'text-foreground-subtle')}>
              Private chef
            </span>
          </Link>

          <div className="nav-links hidden items-center lg:flex">
            {NAVIGATION.map((group) =>
              group.items ? (
                <div key={group.name} className="group relative">
                  <button
                    className={cn('nav-link px-3 py-2 text-[11px] uppercase tracking-caps transition-colors', textMuted)}
                    aria-haspopup="menu"
                  >
                    {group.name}
                  </button>
                  <div className="invisible absolute left-1/2 top-full z-50 w-80 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="border border-border bg-background p-2 text-foreground shadow-lift">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-start justify-between gap-3 px-3 py-3 transition-colors hover:bg-background-secondary"
                        >
                          <span>
                            <span className="flex items-center gap-2 text-sm">
                              {item.name}
                              {item.badge && (
                                <span className="border border-gold/50 px-1.5 py-0.5 text-[9px] uppercase tracking-caps text-foreground">
                                  {item.badge}
                                </span>
                              )}
                            </span>
                            {item.description && (
                              <span className="mt-1 block text-xs text-foreground-muted">{item.description}</span>
                            )}
                          </span>
                          <ArrowUpRight size={14} className="mt-1 shrink-0" />
                        </Link>
                      ))}
                      <p className="border-t border-border px-3 py-3 text-[11px] text-foreground-subtle">
                        Both tools are demos. The full experience lives in our app.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={group.name}
                  href={withLocale(group.href!, locale)}
                  aria-current={pathname === withLocale(group.href!, locale) ? 'page' : undefined}
                  className={cn('nav-link px-3 py-2 text-[11px] uppercase tracking-caps transition-colors', textMuted)}
                >
                  {group.href === '/pricing' ? t.navPricing : group.name}
                </Link>
              )
            )}
            <Magnetic className="ml-3">
              <Link
                href={withLocale('/contact', locale)}
                className={cn(
                  'nav-book inline-flex h-10 items-center px-4 text-[11px] uppercase tracking-caps',
                  onDark ? 'bg-ink-foreground text-ink' : 'bg-ink text-ink-foreground'
                )}
              >
                {t.bookCta}
              </Link>
            </Magnetic>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className={cn('-mr-2 p-2 lg:hidden', textBase)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-ink-foreground lg:hidden"
          >
            <div className="container flex-1 overflow-y-auto pb-12 pt-28">
              <ul>
                {NAVIGATION.map((group, index) => (
                  <motion.li
                    key={group.name}
                    initial={{ y: 28, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 12, opacity: 0 }}
                    transition={{ delay: 0.12 + index * 0.05, duration: 0.55, ease }}
                  >
                    {group.items ? (
                      <div className="border-t border-white/10 py-3">
                        <p className="text-[10px] uppercase tracking-caps text-gold">{group.name}</p>
                        {group.items.map((item) => (
                          <Link key={item.href} href={item.href} className="flex items-baseline justify-between py-2">
                            <span className="lh-display font-display text-4xl italic">{item.name}</span>
                            {item.badge && (
                              <span className="text-[10px] uppercase tracking-caps text-gold">{item.badge}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link href={withLocale(group.href!, locale)} className="lh-display block border-t border-white/10 py-3 font-display text-5xl italic">
                        {group.href === '/pricing' ? t.navPricing : group.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-8 space-y-6 border-t border-white/10 pt-8"
              >
                <Link href={withLocale('/contact', locale)} className="inline-flex h-12 items-center bg-ink-foreground px-6 text-sm text-ink">
                  {t.bookCta}
                </Link>
                <AppBadges tone="light" size="sm" />
                <p className="text-sm text-ink-foreground/70">
                  <a className="block hover:text-ink-foreground" href={`mailto:${CONTACT_INFO.email}`}>
                    {CONTACT_INFO.email}
                  </a>
                  <a className="mt-1 block hover:text-ink-foreground" href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>
                    {CONTACT_INFO.phone}
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

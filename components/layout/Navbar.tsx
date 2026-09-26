'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react'
import { NAVIGATION, CONTACT_INFO } from '@/lib/constants'
import { AppBadges } from '@/components/app/AppBadges'
import { cn } from '@/lib/utils'

export function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu on navigation and lock body scroll while it is open.
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  // The homepage hero is dark, so the bar is light-on-dark until you scroll.
  const onDark = pathname === '/' && !isScrolled
  const textBase = onDark ? 'text-ink-foreground' : 'text-foreground'
  const textMuted = onDark ? 'text-ink-foreground/70 hover:text-ink-foreground' : 'text-foreground-muted hover:text-foreground'

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          isScrolled ? 'glass py-3 shadow-soft' : 'bg-transparent py-5 sm:py-6'
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="container flex items-center justify-between" aria-label="Primary">
          <Link href="/" className={cn('group flex items-baseline gap-2', textBase)}>
            <span className="font-display text-2xl font-medium tracking-tight sm:text-[1.7rem]">
              Table d&apos;Adrian
            </span>
            <span
              className={cn(
                'hidden text-[10px] uppercase tracking-caps sm:inline',
                onDark ? 'text-ink-foreground/50' : 'text-foreground-subtle'
              )}
            >
              Private chef
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            {NAVIGATION.map((group) =>
              group.items ? (
                <div key={group.name} className="group relative">
                  <button
                    className={cn(
                      'flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                      textMuted
                    )}
                    aria-haspopup="menu"
                  >
                    {group.name}
                    <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                  </button>
                  <div className="invisible absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="surface overflow-hidden p-2 text-foreground">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-start justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-background-secondary"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{item.name}</span>
                              {item.badge && (
                                <span className="rounded-full bg-gold-soft px-2 py-0.5 text-[10px] font-medium uppercase tracking-caps text-ink">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="mt-1 text-xs text-foreground-muted">{item.description}</p>
                            )}
                          </div>
                          <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-foreground-subtle" />
                        </Link>
                      ))}
                      <div className="mx-2 mt-2 border-t border-border pt-3 pb-1">
                        <p className="px-2 text-[11px] text-foreground-subtle">
                          Both tools are demos. The full experience lives in our app.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={group.name}
                  href={group.href!}
                  className={cn('rounded-full px-3.5 py-2 text-sm font-medium transition-colors', textMuted)}
                >
                  {group.name}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className={cn(
                'ml-3 inline-flex h-10 items-center rounded-full px-5 text-sm font-medium transition-all duration-300 hover:-translate-y-px',
                onDark
                  ? 'bg-ink-foreground text-ink hover:bg-white'
                  : 'bg-ink text-ink-foreground hover:bg-ink-soft'
              )}
            >
              Book your experience
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className={cn('-mr-2 rounded-full p-2 lg:hidden', textBase)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-ink text-ink-foreground lg:hidden"
          >
            <div className="container flex-1 overflow-y-auto pb-10 pt-28">
              <ul className="space-y-1">
                {NAVIGATION.map((group, i) => (
                  <motion.li
                    key={group.name}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    {group.items ? (
                      <div className="pt-4">
                        <p className="mb-2 text-[11px] uppercase tracking-caps text-ink-foreground/50">{group.name}</p>
                        <ul className="space-y-1">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className="flex items-center justify-between rounded-xl py-3 font-display text-3xl"
                              >
                                <span>{item.name}</span>
                                {item.badge && (
                                  <span className="rounded-full bg-gold px-2.5 py-1 font-body text-[10px] font-medium uppercase tracking-caps text-ink">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link href={group.href!} className="block py-3 font-display text-4xl">
                        {group.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10 space-y-6 border-t border-white/10 pt-8"
              >
                <Link
                  href="/contact"
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-ink-foreground text-base font-medium text-ink"
                >
                  Book your experience
                </Link>
                <div>
                  <p className="mb-3 text-[11px] uppercase tracking-caps text-ink-foreground/50">Get the app</p>
                  <AppBadges tone="light" size="sm" />
                </div>
                <div className="text-sm text-ink-foreground/60">
                  <a href={`mailto:${CONTACT_INFO.email}`} className="block hover:text-ink-foreground">
                    {CONTACT_INFO.email}
                  </a>
                  <a href={`tel:${CONTACT_INFO.phone}`} className="mt-1 block hover:text-ink-foreground">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

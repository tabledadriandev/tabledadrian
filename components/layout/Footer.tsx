'use client'

import Link from 'next/link'
import { Instagram, Linkedin } from 'lucide-react'
import { SOCIAL_LINKS, CONTACT_INFO, FOOTER_LINKS, WELLNESS_LINKS } from '@/lib/constants'
import { AppBadges } from '@/components/app/AppBadges'
import { getLenis } from '@/lib/lenis'

const socials = [
  { href: SOCIAL_LINKS.instagram, label: 'Instagram', Icon: Instagram },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', Icon: Linkedin },
]

export function Footer() {
  const scrollToTop = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative bg-ink text-ink-foreground">
      <div className="container pb-10 pt-16 sm:pt-20">
        <p className="footer-wordmark" aria-hidden="true">
          Table d&apos;Adrian
        </p>
        <div className="mt-8 grid gap-12 border-t border-white/15 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="max-w-sm text-sm leading-relaxed text-ink-foreground/80">
              Michelin-trained private chef and nutrition-certified cook. Private dinners, weekly meal
              preparation and longevity menus in London and across Europe.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-ink-foreground/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-caps text-gold">Explore</p>
            <ul className="mt-4 space-y-2">
              {FOOTER_LINKS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-caps text-gold">Wellness</p>
            <ul className="mt-4 space-y-2">
              {WELLNESS_LINKS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-foreground">
                    {item.name}
                    {item.badge ? <span className="ml-2 text-[10px] uppercase tracking-caps text-gold">{item.badge}</span> : null}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#app" className="text-sm text-ink-foreground/80 hover:text-ink-foreground">
                  The app
                </Link>
              </li>
              <li>
                <Link href="/sola" className="text-sm text-ink-foreground/80 hover:text-ink-foreground">
                  Sola
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-caps text-gold">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-foreground/80">
              <li>
                <a className="hover:text-ink-foreground" href={`mailto:${CONTACT_INFO.email}`}>
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a className="hover:text-ink-foreground" href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="text-xs text-ink-foreground/65">{CONTACT_INFO.responseTime}</li>
            </ul>
            <div className="mt-6">
              <AppBadges tone="light" size="sm" />
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-ink-foreground/65 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Table d&apos;Adrian. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="underline-offset-4 hover:text-ink-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="underline-offset-4 hover:text-ink-foreground hover:underline">
              Terms
            </Link>
            <button type="button" onClick={scrollToTop} className="uppercase tracking-caps hover:text-gold">
              Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

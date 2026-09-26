'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUp, Instagram, Linkedin } from 'lucide-react'
import { SOCIAL_LINKS, CONTACT_INFO, FOOTER_LINKS, WELLNESS_LINKS } from '@/lib/constants'
import { AppBadges } from '@/components/app/AppBadges'
import { fadeInUp, staggerContainer } from '@/lib/animations'

const socials = [
  { href: SOCIAL_LINKS.instagram, label: 'Instagram', Icon: Instagram },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn', Icon: Linkedin },
]

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative bg-ink text-ink-foreground">
      <div className="container py-16 sm:py-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid gap-12 lg:grid-cols-12"
        >
          {/* Brand */}
          <motion.div variants={fadeInUp} className="lg:col-span-5">
            <p className="font-display text-3xl">Table d&apos;Adrian</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-foreground/75">
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ink-foreground/70 transition-colors hover:border-white/30 hover:text-ink-foreground"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-caps text-ink-foreground/70">Explore</p>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-ink-foreground/75 transition-colors hover:text-ink-foreground">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp} className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-caps text-ink-foreground/70">Wellness</p>
            <ul className="mt-5 space-y-3">
              {WELLNESS_LINKS.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="inline-flex items-center gap-2 text-sm text-ink-foreground/75 transition-colors hover:text-ink-foreground">
                    {item.name}
                    {item.badge && (
                      <span className="rounded-full border border-white/15 px-1.5 py-0.5 text-[9px] uppercase tracking-caps text-ink-foreground/60">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#app" className="text-sm text-ink-foreground/75 transition-colors hover:text-ink-foreground">
                  The app
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact + app */}
          <motion.div variants={fadeInUp} className="lg:col-span-3">
            <p className="text-[11px] uppercase tracking-caps text-ink-foreground/70">Contact</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-ink-foreground/75 transition-colors hover:text-ink-foreground">
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-ink-foreground/75 transition-colors hover:text-ink-foreground">
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="text-xs text-ink-foreground/70">{CONTACT_INFO.responseTime}</li>
            </ul>
            <div className="mt-8">
              <p className="mb-3 text-[11px] uppercase tracking-caps text-ink-foreground/70">Get the app</p>
              <AppBadges tone="light" size="sm" />
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-ink-foreground/70 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Table d&apos;Adrian. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="underline-offset-4 transition-colors hover:text-ink-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="underline-offset-4 transition-colors hover:text-ink-foreground hover:underline">
              Terms
            </Link>
          </div>
        </div>
      </div>

      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lift transition-colors hover:bg-background-secondary sm:bottom-8 sm:right-8"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </motion.button>
    </footer>
  )
}

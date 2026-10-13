'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Instagram } from 'lucide-react'
import { SOCIAL_LINKS, CONTACT_INFO, FOOTER_LINKS, WELLNESS_LINKS, INSTAGRAM_URL } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { useLocale, withLocale } from '@/lib/i18n'
import { locationNav } from '@/lib/locations'
import { toLocalePath } from '@/lib/routes'
import { AppBadges } from '@/components/app/AppBadges'
import { getLenis } from '@/lib/lenis'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap'
import { getMotionCaps } from '@/lib/motion-caps'
import { DustField } from '@/components/motion/DustField'
import { MaisonFooter } from '@/components/layout/MaisonFooter'

export function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/sola')) return <LegacyFooter />
  return <MaisonFooter />
}

const socials = [
  { href: SOCIAL_LINKS.instagram, label: 'Instagram', Icon: Instagram },
]

function LegacyFooter() {
  const root = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const locale = useLocale()
  const t = copy[locale]
  const locations = locationNav(locale)

  useGSAP(
    () => {
      const footer = root.current
      const main = document.getElementById('main')
      const wordmark = footer?.querySelector<HTMLElement>('.footer-wordmark')
      if (!footer || !main || !wordmark) return
      const caps = getMotionCaps()
      const html = document.documentElement
      const sola = pathname.startsWith('/sola')

      const fits = () =>
        !sola && window.innerWidth >= 1024 && footer.offsetHeight <= window.innerHeight - 24
      const sync = () => html.classList.toggle('footer-reveal', fits())
      sync()
      const ro = new ResizeObserver(() => {
        const before = html.classList.contains('footer-reveal')
        sync()
        if (before !== html.classList.contains('footer-reveal')) ScrollTrigger.refresh()
      })
      ro.observe(footer)
      window.addEventListener('resize', sync)

      const cleanups: Array<() => void> = [
        () => {
          ro.disconnect()
          window.removeEventListener('resize', sync)
          html.classList.remove('footer-reveal')
        },
      ]
      if (caps.reduce || sola) return () => cleanups.forEach((fn) => fn())

      const split = SplitText.create(wordmark, { type: 'chars', charsClass: 'footer-char' })
      const intro = gsap.from(split.chars, {
        yPercent: 110,
        rotate: 9,
        autoAlpha: 0,
        transformOrigin: '0% 100%',
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.035,
        paused: true,
      })

      if (html.classList.contains('footer-reveal')) {
        gsap.fromTo(
          '.footer-inner',
          { yPercent: -22 },
          {
            yPercent: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: main,
              start: 'bottom bottom',
              end: () => `bottom ${window.innerHeight - footer.offsetHeight}px`,
              scrub: true,
              invalidateOnRefresh: true,
              refreshPriority: -5,
            },
          }
        )
        gsap.fromTo(
          '.footer-shade',
          { opacity: 0.85 },
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: main,
              start: 'bottom bottom',
              end: () => `bottom ${window.innerHeight - footer.offsetHeight * 0.4}px`,
              scrub: true,
              invalidateOnRefresh: true,
              refreshPriority: -5,
            },
          }
        )
      }
      ScrollTrigger.create(
        html.classList.contains('footer-reveal')
          ? {
              trigger: main,
              start: () => `bottom ${window.innerHeight - footer.offsetHeight * 0.55}px`,
              once: true,
              refreshPriority: -5,
              onEnter: () => intro.play(),
            }
          : { trigger: wordmark, start: 'top 88%', once: true, refreshPriority: -5, onEnter: () => intro.play() }
      )

      if (caps.tier === 'full') {
        const lifts = split.chars.map((char) => ({
          char: char as HTMLElement,
          y: gsap.quickTo(char, 'y', { duration: 0.6, ease: 'power3.out' }),
        }))
        const onMove = (event: PointerEvent) => {
          lifts.forEach(({ char, y }) => {
            const rect = char.getBoundingClientRect()
            const dx = event.clientX - (rect.left + rect.width / 2)
            const dy = event.clientY - (rect.top + rect.height / 2)
            const pull = Math.max(0, 1 - Math.hypot(dx, dy * 0.6) / 220)
            y(-pull * pull * 26)
          })
        }
        const onLeave = () => lifts.forEach(({ y }) => y(0))
        wordmark.addEventListener('pointermove', onMove)
        wordmark.addEventListener('pointerleave', onLeave)
        cleanups.push(() => {
          wordmark.removeEventListener('pointermove', onMove)
          wordmark.removeEventListener('pointerleave', onLeave)
        })
      }
      cleanups.push(() => split.revert())
      return () => cleanups.forEach((fn) => fn())
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: true }
  )

  const scrollToTop = () => {
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer ref={root} className="site-footer relative overflow-hidden bg-ink text-ink-foreground">
      <DustField density={46} className="opacity-70" />
      <div className="footer-inner container relative pb-10 pt-16 sm:pt-20">
        <p className="footer-wordmark" aria-hidden="true">
          Table d&apos;Adrian
        </p>
        <div className="mt-8 grid gap-12 border-t border-white/15 pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-sm text-sm leading-relaxed text-ink-foreground/80">
              {t.footerBlurb}
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
                <li key={item.href}>
                  <Link href={withLocale(item.href, locale)} className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-foreground">
                    {item.href === '/pricing' ? t.navPricing : item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-caps text-gold">Riviera</p>
            <ul className="mt-4 space-y-2">
              {locations.map((item) => (
                <li key={item.path}>
                  <Link href={item.path} className="text-sm text-ink-foreground/80 transition-colors hover:text-ink-foreground">
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
          <div className="lg:col-span-2">
            <p className="text-[11px] uppercase tracking-caps text-gold">Contact</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-foreground/80">
              <li>
                <Link className="hover:text-ink-foreground" href={locale === 'fr' ? '/fr/contact' : '/contact'}>
                  {t.bookCta}
                </Link>
              </li>
              <li>
                <a className="hover:text-ink-foreground" href={`mailto:${CONTACT_INFO.email}`}>
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-ink-foreground"
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.instagramLabel} {t.instagramHandle}
                </a>
              </li>
              <li>
                <a className="hover:text-ink-foreground" href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}>
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li className="flex gap-3 text-xs text-ink-foreground/65">
                <Link href={toLocalePath(pathname, 'en')} className={locale === 'en' ? 'text-ink-foreground' : ''}>
                  EN
                </Link>
                <Link href={toLocalePath(pathname, 'fr')} className={locale === 'fr' ? 'text-ink-foreground' : ''}>
                  FR
                </Link>
              </li>
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
      <span className="footer-shade" aria-hidden="true" />
    </footer>
  )
}

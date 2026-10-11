'use client'

import { ArrowRight } from 'lucide-react'
import { CONTACT_INFO, INSTAGRAM_URL } from '@/lib/constants'
import { copy } from '@/lib/copy'
import { useLocale } from '@/lib/i18n'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/motion/Magnetic'
import { DustField } from '@/components/motion/DustField'
import { FloatingCloche } from '@/components/motion/FloatingCloche'
import { Garnish, type GarnishItem } from '@/components/motion/Garnish'

const garnish: GarnishItem[] = [
  { kind: 'flake', x: '8%', y: '14%', size: 30, depth: 0.8, rotate: 24, lite: true },
  { kind: 'flake', x: '58%', y: '8%', size: 18, depth: 0.4, rotate: -30 },
  { kind: 'petal-b', x: '90%', y: '86%', size: 58, depth: 0.95, rotate: -40 },
]

export function Contact() {
  const locale = useLocale()
  const t = copy[locale]
  return (
    <section id="contact" className="contact-stage relative overflow-hidden bg-ink text-ink-foreground">
      <DustField density={70} />
      <Garnish items={garnish} />
      <FloatingCloche className="contact-cloche" />
      <div className="container relative flex min-h-[80svh] flex-col justify-end py-20 sm:py-28">
        <h2 className="display max-w-5xl text-5xl sm:text-7xl lg:text-[6.5rem]" data-split="chars">
          Shall we cook for your table?
        </h2>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-foreground/80 sm:text-lg">
          Tell Adrian about the occasion, the guests and any dietary notes. A reply typically
          arrives within a day.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center" data-rise="24">
          <Magnetic>
            <Button href={locale === 'fr' ? '/fr/contact' : '/contact'} variant="light" size="lg">
              {t.bookCta}
              <ArrowRight size={18} />
            </Button>
          </Magnetic>
          <a className="maison-link" href={`mailto:${CONTACT_INFO.email}`}>
            {CONTACT_INFO.email}
          </a>
          <a className="maison-link" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            {t.instagramHandle}
          </a>
        </div>
      </div>
    </section>
  )
}

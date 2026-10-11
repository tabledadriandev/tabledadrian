'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { gsap, useGSAP } from '@/lib/gsap'
import { ABOUT_IMAGE } from '@/data/gallery'

const facts = [
  ['EHL', 'Swiss diploma'],
  ['Stanford', 'Nutrition'],
  ['15+', 'Years'],
  ['100+', 'Households'],
] as const

export function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.about-copy > *', {
          y: 28,
          duration: 0.9,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.about-copy', start: 'top 80%' },
        })
        gsap.to('.about-shift', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section id="about" ref={root} className="grain section-pad bg-background">
      <div className="container">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="about-frame relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink">
              <div className="about-shift absolute inset-x-0 -top-[8%] h-[116%]">
                <Image
                  src={ABOUT_IMAGE.src}
                  alt="Beef Wellington with pea puree and roasted vegetables, plated by Table d'Adrian"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />
              </div>
              <span className="hero-rim" />
            </div>
          </div>

          <div className="about-copy lg:col-span-6 lg:col-start-7">
            <h2 className="display text-[2.6rem] leading-[0.92] sm:text-6xl lg:text-[4.6rem]">
              Two disciplines, <em className="italic text-gold">one</em> table.
            </h2>
            <p className="mt-8 max-w-[62ch] text-base leading-relaxed text-foreground-muted sm:text-lg">
              Adrian trained at EHL, the Swiss hospitality school, and spent fifteen years in demanding
              kitchens across Europe before adding a Stanford certification in health and nutrition.
              That pairing is the whole idea: food with the precision of a fine-dining pass and the
              intent of a nutritionist.
            </p>
            <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-foreground-muted sm:text-lg">
              Whether it is a celebration for twenty or a week of quiet dinners for two, each menu is
              written from scratch around your preferences, allergies and the season&apos;s market.
            </p>
            <blockquote className="mt-10 max-w-xl border-t border-border pt-6">
              <p className="font-display text-3xl italic leading-snug text-foreground sm:text-4xl">
                &ldquo;Good food should make you feel better tomorrow, not just tonight.&rdquo;
              </p>
              <footer className="mt-4 text-[11px] uppercase tracking-caps text-foreground-subtle">
                Chef Adrian
              </footer>
            </blockquote>
            <p className="about-facts">
              {facts.map(([value, label]) => (
                <span key={label}>
                  <strong>{value}</strong> {label}
                </span>
              ))}
            </p>
            <div className="mt-10">
              <Button href="/contact" variant="outline">
                Start a conversation
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/motion/Magnetic'
import { Garnish, type GarnishItem } from '@/components/motion/Garnish'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'
import { ABOUT_IMAGE } from '@/data/gallery'

const facts = [
  ['EHL', 'Swiss diploma'],
  ['Stanford', 'Nutrition'],
  ['10+', 'Years'],
  ['100+', 'Households'],
] as const

const garnish: GarnishItem[] = [
  { kind: 'basil', x: '38%', y: '6%', size: 128, depth: 0.95, rotate: -18, lite: true },
  { kind: 'line-citrus', x: '-3%', y: '58%', size: 150, depth: 0.25, rotate: 12 },
  { kind: 'petal-b', x: '91%', y: '14%', size: 64, depth: 0.7, rotate: 30, lite: true },
  { kind: 'flake', x: '47%', y: '72%', size: 34, depth: 0.85, rotate: -20 },
  { kind: 'flake', x: '84%', y: '64%', size: 20, depth: 0.4, rotate: 40 },
  { kind: 'line-sprig', x: '93%', y: '78%', size: 70, depth: 0.55, rotate: -14 },
  { kind: 'salt', x: '6%', y: '10%', size: 26, depth: 0.5, rotate: 8 },
]

export function About() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.about-copy > :not(h2)', {
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
        const quote = root.current?.querySelector<HTMLElement>('.about-quote p')
        if (quote) {
          const words = SplitText.create(quote, { type: 'words', wordsClass: 'about-word' })
          gsap.fromTo(
            words.words,
            { opacity: 0.16 },
            {
              opacity: 1,
              ease: 'none',
              stagger: 0.1,
              scrollTrigger: { trigger: quote, start: 'top 82%', end: 'bottom 48%', scrub: true },
            }
          )
          return () => words.revert()
        }
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section id="about" ref={root} className="grain section-pad relative bg-background" data-tone="in">
      <Garnish items={garnish} />
      <div className="container relative">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="about-frame relative lg:col-span-5">
            <span className="about-offset" data-speed="0.18" aria-hidden="true" />
            <div className="relative aspect-[4/5] overflow-hidden bg-ink" data-reveal="up" data-distort data-cursor="View">
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
            <h2 className="display text-[2.6rem] sm:text-6xl lg:text-[4.6rem]" data-split="chars">
              Two disciplines, <em className="italic text-gold">one</em> table.
            </h2>
            <p className="mt-8 max-w-[62ch] text-base leading-relaxed text-foreground-muted sm:text-lg">
              Adrian trained at EHL, the Swiss hospitality school, and spent ten years in demanding
              kitchens before adding a Stanford certification in health and nutrition.
              That pairing is the whole idea: food with the precision of a fine-dining pass and the
              intent of a nutritionist.
            </p>
            <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-foreground-muted sm:text-lg">
              Whether it is a celebration for twenty or a week of quiet dinners for two, each menu is
              written from scratch around your preferences, allergies and the season&apos;s market.
            </p>
            <blockquote className="about-quote relative mt-10 max-w-xl pt-6">
              <span className="absolute inset-x-0 top-0 h-px bg-border" data-rule aria-hidden="true" />
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
                  <strong data-count>{value}</strong> {label}
                </span>
              ))}
            </p>
            <div className="mt-10">
              <Magnetic>
                <Button href="/contact" variant="outline">
                  Start a conversation
                  <ArrowRight size={16} />
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

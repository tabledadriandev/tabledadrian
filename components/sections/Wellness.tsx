'use client'

import Link from 'next/link'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { Garnish, type GarnishItem } from '@/components/motion/Garnish'

const tools = [
  {
    href: '/nutrition',
    badge: 'Demo',
    title: 'Longevity Coach',
    description: 'A preview of daily tracking, macros and chef-led recommendations.',
  },
  {
    href: '/bmi',
    badge: 'Demo',
    title: 'BMI Calculator',
    description: "A quick health snapshot, with guidance from Adrian's kitchen.",
  },
  {
    href: '/#app',
    badge: 'Coming soon',
    title: 'The full app',
    description: 'Meal logging, a longevity score and recipes matched to you.',
  },
]

const garnish: GarnishItem[] = [
  { kind: 'line-sprig', x: '86%', y: '6%', size: 96, depth: 0.45, rotate: 18, lite: true },
  { kind: 'flake', x: '72%', y: '22%', size: 30, depth: 0.85, rotate: -16 },
  { kind: 'salt', x: '93%', y: '44%', size: 24, depth: 0.6, rotate: 12 },
  { kind: 'line-leaf', x: '64%', y: '2%', size: 52, depth: 0.2, rotate: -40 },
]

export function Wellness() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.wellness-row', {
          y: 32,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: root.current, start: 'top 75%' },
        })
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section id="wellness" ref={root} className="section-pad relative bg-background-secondary" data-tone="out">
      <Garnish items={garnish} />
      <div className="container relative">
        <div className="max-w-3xl">
          <h2 className="display text-4xl sm:text-6xl" data-split="chars">
            Try a taste of the <em className="italic text-gold">app</em>.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg">
            The Longevity Coach and BMI tools on this site are demos. Download the Table d&apos;Adrian
            app when it launches for the complete experience.
          </p>
        </div>
        <div className="relative mt-12">
          <span className="absolute inset-x-0 top-0 h-px bg-border" data-rule aria-hidden="true" />
          {tools.map((tool) => (
            <Link key={tool.title} href={tool.href} className="wellness-row group">
              <span className="wellness-rule" data-rule aria-hidden="true" />
              <span className="wellness-badge">{tool.badge}</span>
              <span>
                <span className="wellness-title lh-display block font-display text-3xl sm:text-5xl">{tool.title}</span>
                <span className="mt-2 block max-w-md text-sm leading-relaxed text-foreground-muted">
                  {tool.description}
                </span>
              </span>
              <ArrowUpRight className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

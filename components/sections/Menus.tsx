'use client'

import { useEffect, useRef, useState } from 'react'
import { DishPhoto } from '@/components/media/DishPhoto'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MENUS } from '@/data/menus'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/motion/Magnetic'
import { Garnish, type GarnishItem } from '@/components/motion/Garnish'
import { gsap } from '@/lib/gsap'

const garnish: GarnishItem[] = [
  { kind: 'petal-c', x: '40%', y: '30%', size: 44, depth: 0.9, rotate: 18, lite: true },
  { kind: 'line-petal', x: '94%', y: '8%', size: 56, depth: 0.35, rotate: -22 },
  { kind: 'flake', x: '44%', y: '86%', size: 26, depth: 0.75, rotate: -8 },
  { kind: 'line-citrus', x: '86%', y: '84%', size: 96, depth: 0.25, rotate: 20 },
]

export function Menus() {
  const [active, setActive] = useState(0)
  const covers = useRef<HTMLDivElement>(null)
  const previous = useRef(0)
  const layer = useRef(2)

  useEffect(() => {
    const stack = covers.current
    if (!stack || previous.current === active) return
    const down = active > previous.current
    previous.current = active
    const plate = stack.querySelectorAll<HTMLElement>('.menu-cover')[active]
    const title = stack.querySelector<HTMLElement>('.menu-cover-title')
    if (!plate) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    layer.current += 1
    gsap.set(plate, { zIndex: layer.current })
    if (reduce) {
      gsap.fromTo(plate, { opacity: 0 }, { opacity: 1, duration: 0.3, overwrite: true })
      return
    }
    gsap.fromTo(
      plate,
      { clipPath: down ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut', overwrite: true }
    )
    const img = plate.querySelector('img')
    if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.4, ease: 'expo.out', overwrite: true })
    if (title) gsap.fromTo(title, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 })
  }, [active])

  const current = MENUS[active] ?? MENUS[0]

  return (
    <section id="menus" className="section-pad relative bg-background" data-tone="in out">
      <Garnish items={garnish} />
      <div className="container relative">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="display text-4xl sm:text-6xl" data-split="chars">
              A menu for the evening, not a catalogue.
            </h2>
            <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-foreground-muted">
              France, Italy, the coast, Asia. Each book is a starting point. Adrian rewrites it for
              your guests.
            </p>
          </div>
          <Magnetic>
            <Button href="/menus" variant="ink">
              All menus
              <ArrowRight size={16} />
            </Button>
          </Magnetic>
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          <div
            ref={covers}
            className="menu-covers relative min-h-[22rem] overflow-hidden bg-ink lg:col-span-5 lg:min-h-[36rem]"
            data-reveal="iris"
            data-distort
          >
            {MENUS.map((menu, index) => (
              <div key={menu.id} className={index === active ? 'menu-cover is-on' : 'menu-cover'}>
                <DishPhoto
                  src={menu.cover}
                  alt={index === active ? menu.title : ''}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            ))}
            <span className="hero-rim" />
            <p className="menu-cover-title lh-display absolute bottom-6 left-6 right-6 font-display text-3xl text-ink-foreground">
              {current.title}
            </p>
          </div>
          <ul className="lg:col-span-7" data-rise="28">
            {MENUS.map((menu, index) => (
              <li key={menu.id} className="relative">
                <span className="menu-rule" data-rule aria-hidden="true" />
                <Link
                  href={`/menus/${menu.id}`}
                  className={`menu-index ${index === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  data-cursor="Open"
                >
                  <span>{menu.region}</span>
                  <strong>{menu.title}</strong>
                  <em>{menu.description}</em>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MENUS } from '@/data/menus'
import { Button } from '@/components/ui/Button'

export function Menus() {
  const [active, setActive] = useState(0)
  const current = MENUS[active] ?? MENUS[0]

  return (
    <section id="menus" className="section-pad bg-background">
      <div className="container">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="display text-4xl leading-[0.95] sm:text-6xl">
              A menu for the evening, not a catalogue.
            </h2>
            <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-foreground-muted">
              France, Italy, the coast, Asia. Each book is a starting point. Adrian rewrites it for
              your guests.
            </p>
          </div>
          <Button href="/menus" variant="ink">
            All menus
            <ArrowRight size={16} />
          </Button>
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-12">
          <div className="relative min-h-[22rem] overflow-hidden bg-ink lg:col-span-5 lg:min-h-[36rem]">
            <Image
              key={current.cover}
              src={current.cover}
              alt={current.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <span className="hero-rim" />
            <p className="absolute bottom-6 left-6 right-6 font-display text-3xl text-ink-foreground">
              {current.title}
            </p>
          </div>
          <ul className="lg:col-span-7">
            {MENUS.map((menu, index) => (
              <li key={menu.id}>
                <Link
                  href={`/menus/${menu.id}`}
                  className={`menu-index ${index === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
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

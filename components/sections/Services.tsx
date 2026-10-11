'use client'

import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

export function Services() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('.service-row')
        const setActive = (index: number) => {
          rows.forEach((row, i) => row.classList.toggle('is-active', i === index))
        }
        setActive(0)
        ScrollTrigger.create({
          trigger: root.current,
          start: 'top top',
          end: '+=1800',
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.min(rows.length - 1, Math.floor(self.progress * rows.length))
            setActive(index)
          },
        })
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section id="services" ref={root} className="services-pin bg-background text-foreground">
      <div className="container flex min-h-[100svh] flex-col justify-center py-28">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <h2 className="display text-4xl leading-[0.95] sm:text-5xl">
              Culinary experiences, written for the occasion.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground-muted">
              From an intimate dinner to a week of quiet meals at home, every menu is composed
              around your guests, your kitchen and the season.
            </p>
          </div>
          <Button href="/pricing" variant="outline">
            See pricing
            <ArrowRight size={16} />
          </Button>
        </div>
        <div>
          <ol className="service-stage">
            {SERVICES.map((service, index) => (
              <li key={service.title} className={index === 0 ? 'service-row is-active' : 'service-row'}>
                <a href="/contact" className="service-hit">
                  <span className="service-index" aria-hidden="true">{service.title}</span>
                  <span className="service-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <span className="service-enquire">
                      Enquire <ArrowRight size={14} />
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

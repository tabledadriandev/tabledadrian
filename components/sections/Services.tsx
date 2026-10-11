'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

const PLATES = [
  {
    src: '/gallery/langoustine.jpeg',
    alt: 'Seared langoustine with broad beans and a butter sauce, plated by Table d\'Adrian',
  },
  {
    src: '/gallery/chicken-pea-puree.jpeg',
    alt: 'Roast chicken with pea puree and thyme, plated by Table d\'Adrian',
  },
  {
    src: '/gallery/duck-breast.jpeg',
    alt: 'Rosy duck breast with shimeji and a reduced jus, plated by Table d\'Adrian',
  },
  {
    src: '/gallery/rose-tartlets.jpeg',
    alt: 'Berry rose tartlets with whipped cream, plated by Table d\'Adrian',
  },
]

export function Services() {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const rows = gsap.utils.toArray<HTMLElement>('.service-row')
        const plates = gsap.utils.toArray<HTMLElement>('.service-visual-plate')
        const tabs = gsap.utils.toArray<HTMLElement>('.service-tab')
        const setActive = (index: number) => {
          rows.forEach((row, i) => {
            const on = i === index
            row.classList.toggle('is-active', on)
            row.setAttribute('aria-hidden', on ? 'false' : 'true')
            row.querySelector('a')?.setAttribute('tabindex', on ? '0' : '-1')
          })
          plates.forEach((plate, i) => plate.classList.toggle('is-on', i === index))
          tabs.forEach((tab, i) => tab.classList.toggle('is-on', i === index))
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
        return () => {
          rows.forEach((row) => {
            row.removeAttribute('aria-hidden')
            row.querySelector('a')?.removeAttribute('tabindex')
          })
        }
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section id="services" ref={root} className="services-pin bg-background text-foreground">
      <div className="service-shell container flex min-h-[100svh] flex-col justify-center py-24 lg:py-0">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <h2 className="display text-4xl sm:text-5xl">
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
        <div className="service-board">
          <div>
            <div className="service-copy-stack">
              {SERVICES.map((service, index) => (
                <div key={service.title} className={index === 0 ? 'service-row is-active' : 'service-row'}>
                  <a href="/contact" className="service-hit">
                    <span className="service-mobile-plate">
                      <Image
                        src={PLATES[index].src}
                        alt={PLATES[index].alt}
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                      <span className="hero-rim" />
                    </span>
                    <span className="service-copy">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <span className="service-enquire">
                        Enquire <ArrowRight size={14} />
                      </span>
                    </span>
                  </a>
                </div>
              ))}
            </div>
            <div className="service-tabs">
              {SERVICES.map((service, index) => (
                <a
                  key={service.title}
                  href="/contact"
                  className={index === 0 ? 'service-tab is-on' : 'service-tab'}
                >
                  {service.title}
                </a>
              ))}
            </div>
          </div>
          <div className="service-visual" aria-hidden="true">
            {PLATES.map((plate, index) => (
              <div
                key={plate.src}
                className={index === 0 ? 'service-visual-plate is-on' : 'service-visual-plate'}
              >
                <Image
                  src={plate.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  loading="eager"
                  className="object-cover"
                />
                <span className="hero-rim" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

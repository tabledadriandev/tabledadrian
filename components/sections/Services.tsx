'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/constants'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/motion/Magnetic'
import { Garnish, type GarnishItem } from '@/components/motion/Garnish'
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

const garnish: GarnishItem[] = [
  { kind: 'petal-a', x: '49%', y: '64%', size: 92, depth: 0.95, rotate: -24 },
  { kind: 'thyme', x: '93%', y: '18%', size: 62, depth: 0.8, rotate: 22 },
  { kind: 'line-leaf', x: '52%', y: '14%', size: 74, depth: 0.3, rotate: -32 },
  { kind: 'flake', x: '90%', y: '80%', size: 28, depth: 0.65, rotate: 14 },
  { kind: 'salt', x: '57%', y: '86%', size: 22, depth: 0.45, rotate: -10 },
  { kind: 'flake', x: '3%', y: '24%', size: 18, depth: 0.35, rotate: 36, lite: true },
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
        let current = 0
        let layer = 2
        const setActive = (index: number) => {
          if (index !== current) {
            const plate = plates[index]
            const img = plate?.querySelector('img')
            const down = index > current
            current = index
            layer += 1
            if (plate) {
              gsap.set(plate, { zIndex: layer })
              gsap.fromTo(
                plate,
                { clipPath: down ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' },
                { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.05, ease: 'expo.inOut', overwrite: true }
              )
            }
            if (img) gsap.fromTo(img, { scale: 1.28 }, { scale: 1.06, duration: 1.6, ease: 'expo.out', overwrite: true })
          }
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
        gsap.set(plates[0], { zIndex: layer })
        gsap.fromTo(
          '.service-frame',
          { y: 50, x: 18 },
          {
            y: -50,
            x: -6,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: '+=1800', scrub: true },
          }
        )
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
    <section id="services" ref={root} className="services-pin relative bg-background text-foreground">
      <Garnish items={garnish} className="service-garnish" />
      <div className="service-shell container relative flex min-h-[100svh] flex-col justify-center py-24 lg:py-0">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <h2 className="display text-4xl sm:text-5xl" data-split="chars">
              Culinary experiences, written for the occasion.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-foreground-muted">
              From an intimate dinner to a week of quiet meals at home, every menu is composed
              around your guests, your kitchen and the season.
            </p>
          </div>
          <Magnetic>
            <Button href="/pricing" variant="outline">
              See pricing
              <ArrowRight size={16} />
            </Button>
          </Magnetic>
        </div>
        <div className="service-board">
          <div>
            <div className="service-copy-stack">
              {SERVICES.map((service, index) => (
                <div key={service.title} className={index === 0 ? 'service-row is-active' : 'service-row'}>
                  <a href="/contact" className="service-hit">
                    <span className="service-mobile-plate" data-reveal="up">
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
          <div className="service-visual" aria-hidden="true" data-distort>
            <span className="service-frame" />
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

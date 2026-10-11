'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GALLERY } from '@/data/gallery'
import { gsap, useGSAP } from '@/lib/gsap'

export function Gallery() {
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const row = track.current
        const pin = root.current
        if (!row || !pin) return
        const tween = gsap.to(row, {
          x: () => -(row.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: pin,
            start: 'top top',
            end: () => `+=${row.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        gsap.utils.toArray<HTMLElement>('.plate').forEach((plate) => {
          const image = plate.querySelector('img')
          if (!image) return
          gsap.fromTo(
            image,
            { scale: 1.16 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: plate,
                containerAnimation: tween,
                start: 'left right',
                end: 'center center',
                scrub: true,
              },
            }
          )
        })
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section id="gallery" ref={root} className="gallery-pin bg-ink text-ink-foreground">
      <div className="flex min-h-[100svh] flex-col justify-center overflow-hidden py-24">
        <div className="container mb-8 flex flex-col items-start justify-between gap-6 md:mb-10 md:flex-row md:items-end">
          <h2 className="display max-w-xl text-4xl sm:text-6xl">
            Plates from Adrian&apos;s table.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/gallery" className="maison-link">
              Full gallery <ArrowRight size={14} />
            </Link>
            <Link href="/menus" className="maison-link is-quiet">
              The menus
            </Link>
          </div>
        </div>
        <div ref={track} className="plate-track">
          {GALLERY.map((image) => (
            <figure key={image.id} className="plate">
              <div className="plate-frame">
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  sizes="(max-width: 768px) 82vw, 42vw"
                  className="object-cover"
                />
                <figcaption>
                  <span>{image.title}</span>
                  <small>{image.caption}</small>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

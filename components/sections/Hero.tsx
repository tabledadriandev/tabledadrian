'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/motion/Magnetic'
import { Garnish, type GarnishItem } from '@/components/motion/Garnish'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap'
import { HERO_IMAGE } from '@/data/gallery'

const HeroPlate = dynamic(() => import('@/components/motion/HeroPlate'), { ssr: false })

const garnish: GarnishItem[] = [
  { kind: 'basil', x: '53%', y: '64%', size: 112, depth: 0.95, rotate: 28 },
  { kind: 'flake', x: '44%', y: '18%', size: 26, depth: 0.7, rotate: -18 },
  { kind: 'flake', x: '9%', y: '88%', size: 16, depth: 0.4, rotate: 40, lite: true },
  { kind: 'petal-b', x: '47%', y: '38%', size: 64, depth: 0.55, rotate: -30 },
]

function useWebGLPlate() {
  const [state, setState] = useState({ enabled: false, mobile: false })

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 767px)').matches
    const nav = navigator as Navigator & {
      deviceMemory?: number
      connection?: { saveData?: boolean }
    }
    const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4
    const lowCores = (navigator.hardwareConcurrency || 8) < 4
    let gl = false
    try {
      const canvas = document.createElement('canvas')
      gl = Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
    } catch {
      gl = false
    }
    if (reduce || nav.connection?.saveData || lowMemory || lowCores || !gl) return

    const start = () => setState({ enabled: true, mobile })
    const idle = window.requestIdleCallback?.(start, { timeout: 900 })
    const timer = idle === undefined ? window.setTimeout(start, 500) : undefined
    return () => {
      if (idle !== undefined) window.cancelIdleCallback?.(idle)
      if (timer !== undefined) window.clearTimeout(timer)
    }
  }, [])

  return state
}

export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const plateRef = useRef<HTMLDivElement>(null)
  const webgl = useWebGLPlate()

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      let split: SplitText | null = null
      let cancelled = false

      const intro = () => {
        if (cancelled || reduce || !titleRef.current) return
        split = SplitText.create(titleRef.current, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
        })
        gsap.from(split.lines, {
          yPercent: 112,
          duration: 1.2,
          stagger: 0.08,
          ease: 'power4.out',
          delay: 0.45,
        })
        gsap.from('.hero-rise', {
          y: 24,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          delay: 1.05,
          ease: 'power3.out',
        })
      }

      const fontsReady = document.fonts?.ready.then(intro) ?? Promise.resolve(intro())

      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        if (!plateRef.current || !rootRef.current) return
        gsap.fromTo(
          plateRef.current.querySelector('.hero-media'),
          { scale: 1.14 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top top',
              end: '+=55%',
              pin: true,
              scrub: 0.7,
              anticipatePin: 1,
            },
          }
        )
      })

      return () => {
        cancelled = true
        void fontsReady
        split?.revert()
        mm.revert()
      }
    },
    { scope: rootRef }
  )

  useEffect(() => {
    const onLoad = () => ScrollTrigger.refresh()
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])

  return (
    <section ref={rootRef} className="hero-stage bg-ink text-ink-foreground">
      <div className="hero-layout">
        <div className="hero-copy hero-cta-pad">
          <h1 ref={titleRef} className="hero-display">
            Dinner,
            <br />
            composed
            <br />
            around
            <br />
            <em>your</em> table.
          </h1>
          <p className="hero-lede hero-rise">
            Michelin-trained technique and nutrition science, brought into your home. From an
            intimate dinner for two to a table of twenty-five, every menu is written for the people
            eating it.
          </p>
          <div className="hero-rise mt-8">
            <Magnetic>
              <Button href="/contact" variant="light" size="lg">
                Book your experience
                <ArrowRight size={18} />
              </Button>
            </Magnetic>
          </div>
          <p className="hero-facts hero-rise">
            <span>Côte d&apos;Azur &amp; Monaco</span>
            <span>10+ years in fine kitchens</span>
            <span>EHL Swiss hospitality diploma</span>
            <span>Stanford nutrition certified</span>
          </p>
        </div>

        <div ref={plateRef} className="hero-plate">
          <div className="hero-media">
            <picture>
              <source media="(max-width: 767px)" srcSet="/gallery/hero-800.avif" type="image/avif" />
              <source media="(max-width: 767px)" srcSet="/gallery/hero-800.webp" type="image/webp" />
              <source media="(min-width: 768px)" srcSet="/gallery/hero-1128.avif" type="image/avif" />
              <source media="(min-width: 768px)" srcSet="/gallery/hero-1128.webp" type="image/webp" />
              {/* Static AVIF/WebP so the LCP image skips the optimizer hop. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/gallery/hero-1128.webp"
                alt="Burrata with sliced tomato and peach in a walnut bowl, plated by Table d'Adrian"
                width={1128}
                height={1600}
                fetchPriority="high"
                decoding="sync"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </picture>
            {webgl.enabled ? <HeroPlate src={HERO_IMAGE.src} mobile={webgl.mobile} /> : <span className="gold-shimmer" />}
            <span className="hero-rim" />
          </div>
        </div>
      </div>
      <Garnish items={garnish} className="hero-garnish" />
      <a href="#about" className="hero-scroll" aria-label="Scroll to About">
        <span>Scroll</span>
        <i />
      </a>
    </section>
  )
}

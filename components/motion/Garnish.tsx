'use client'

import { useId, useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { getMotionCaps } from '@/lib/motion-caps'
import { onScrollVelocity } from '@/lib/scroll-velocity'
import { cn } from '@/lib/utils'
import { GarnishArt, PHOTO_GARNISH, type GarnishKind } from './garnish-art'

export interface GarnishItem {
  kind: GarnishKind
  x: string
  y: string
  size: number
  /** 0 sits far behind the page, 1 floats right in front of the reader. */
  depth: number
  rotate?: number
  /** Kept on phones and low-power devices. */
  lite?: boolean
}

export function Garnish({ items, className }: { items: GarnishItem[]; className?: string }) {
  const root = useRef<HTMLDivElement>(null)
  const uid = useId().replace(/:/g, '')

  useGSAP(
    () => {
      const layer = root.current
      if (!layer) return
      const caps = getMotionCaps()
      const nodes = gsap.utils.toArray<HTMLElement>('.garnish-item', layer).filter((n) => n.offsetParent !== null)
      const strokes = gsap.utils.toArray<SVGPathElement>('.garnish-svg [pathLength]', layer)

      if (caps.reduce) {
        gsap.from(nodes, {
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.05,
          scrollTrigger: { trigger: layer, start: 'top 85%', once: true, refreshPriority: -1 },
        })
        return
      }

      gsap.set(strokes, { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.to(strokes, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: 'power2.inOut',
        stagger: 0.04,
        scrollTrigger: { trigger: layer, start: 'top 80%', once: true, refreshPriority: -1 },
      })

      nodes.forEach((node) => {
        const depth = Number(node.dataset.depth || 0.5)
        gsap.fromTo(
          node,
          { y: depth * 160 },
          {
            y: -depth * 160,
            ease: 'none',
            scrollTrigger: {
              trigger: layer,
              start: 'top bottom',
              end: 'bottom top',
              scrub: caps.tier === 'full' ? 0.6 : true,
              refreshPriority: -1,
            },
          }
        )
      })
      gsap.from(nodes, {
        autoAlpha: 0,
        scale: 0.6,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: layer, start: 'top 85%', once: true, refreshPriority: -1 },
      })

      let visible = false
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting
          layer.classList.toggle('is-live', visible)
        },
        { rootMargin: '120px' }
      )
      io.observe(layer)

      if (caps.tier !== 'full') return () => io.disconnect()

      const tilts = nodes.map((node) => {
        const tilt = node.querySelector<HTMLElement>('.garnish-tilt')!
        const depth = Number(node.dataset.depth || 0.5)
        return {
          depth,
          x: gsap.quickTo(tilt, 'x', { duration: 1.1, ease: 'power3.out' }),
          y: gsap.quickTo(tilt, 'y', { duration: 1.1, ease: 'power3.out' }),
          rx: gsap.quickTo(tilt, 'rotationX', { duration: 1.2, ease: 'power3.out' }),
          ry: gsap.quickTo(tilt, 'rotationY', { duration: 1.2, ease: 'power3.out' }),
          rz: gsap.quickTo(node, 'rotation', { duration: 0.9, ease: 'power3.out' }),
        }
      })

      const onMove = (event: PointerEvent) => {
        if (!visible) return
        const nx = event.clientX / window.innerWidth - 0.5
        const ny = event.clientY / window.innerHeight - 0.5
        tilts.forEach((t) => {
          t.x(nx * -60 * t.depth)
          t.y(ny * -40 * t.depth)
          t.ry(nx * 34 * t.depth)
          t.rx(ny * -28 * t.depth)
        })
      }
      window.addEventListener('pointermove', onMove, { passive: true })
      const stopVelocity = onScrollVelocity((v) => {
        if (!visible) return
        const k = gsap.utils.clamp(-1, 1, v / 2200)
        tilts.forEach((t) => t.rz(k * 22 * t.depth))
      })

      return () => {
        io.disconnect()
        window.removeEventListener('pointermove', onMove)
        stopVelocity()
      }
    },
    { scope: root }
  )

  return (
    <div ref={root} className={cn('garnish-layer', className)} aria-hidden="true">
      {items.map((item, index) => {
        const photo = PHOTO_GARNISH[item.kind]
        return (
          <span
            key={`${item.kind}-${index}`}
            className="garnish-item"
            data-depth={item.depth}
            data-lite={item.lite ? '1' : '0'}
            data-photo={photo ? '1' : '0'}
            style={
              {
                left: item.x,
                top: item.y,
                width: item.size,
                '--garnish-blur': item.depth < 0.35 ? '1.6px' : item.depth > 0.92 ? '0.8px' : '0px',
                '--garnish-rotate': `${item.rotate ?? 0}deg`,
                '--garnish-duration': `${8 + ((index * 37) % 7)}s`,
                '--garnish-delay': `${-((index * 53) % 9)}s`,
              } as React.CSSProperties
            }
          >
            <span className="garnish-tilt">
              <span className="garnish-float">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo.src} width={photo.w} height={photo.h} alt="" loading="lazy" decoding="async" />
                ) : (
                  <GarnishArt kind={item.kind} id={`${uid}-${index}`} />
                )}
              </span>
            </span>
          </span>
        )
      })}
    </div>
  )
}

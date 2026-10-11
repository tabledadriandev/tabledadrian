'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { getMotionCaps } from '@/lib/motion-caps'
import { onScrollVelocity } from '@/lib/scroll-velocity'
import { cn } from '@/lib/utils'

function Mark() {
  return (
    <svg viewBox="0 0 24 24" className="marquee-mark" aria-hidden="true">
      <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" />
    </svg>
  )
}

/** A line of credentials or dish names whose pace follows scroll velocity. */
export function Marquee({
  items,
  tone = 'ivory',
  className,
}: {
  items: readonly string[]
  tone?: 'ivory' | 'ink'
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = root.current
      const track = el?.querySelector<HTMLElement>('.marquee-track')
      if (!el || !track) return
      const caps = getMotionCaps()
      if (caps.reduce) return

      const loop = gsap.to(track, { xPercent: -50, duration: 46, ease: 'none', repeat: -1 })
      loop.pause()
      const skew = gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3.out' })
      let speed = 1
      let direction = 1
      const io = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) loop.play()
        else loop.pause()
      })
      io.observe(el)
      const stop = onScrollVelocity((v) => {
        if (loop.paused()) return
        if (Math.abs(v) > 40) direction = v > 0 ? 1 : -1
        const target = direction * (1 + Math.min(Math.abs(v) / 220, 7))
        speed += (target - speed) * 0.12
        loop.timeScale(speed)
        if (caps.tier === 'full') skew(gsap.utils.clamp(-9, 9, -v / 320))
      })
      return () => {
        io.disconnect()
        stop()
      }
    },
    { scope: root }
  )

  const row = (copy: number) => (
    <div className="marquee-group" key={copy} aria-hidden={copy > 0 ? true : undefined}>
      {items.map((item, i) => (
        <span key={`${copy}-${item}`} className={i % 2 ? 'marquee-item is-outline' : 'marquee-item'}>
          {item}
          <Mark />
        </span>
      ))}
    </div>
  )

  return (
    <div ref={root} className={cn('marquee', tone === 'ink' ? 'is-ink' : 'is-ivory', className)}>
      <div className="marquee-track">
        {row(0)}
        {row(1)}
      </div>
    </div>
  )
}

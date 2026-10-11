'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    document.documentElement.classList.add('has-fine-cursor')
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' })
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' })
    const xDot = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' })
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' })

    const onMove = (event: PointerEvent) => {
      xRing(event.clientX)
      yRing(event.clientY)
      xDot(event.clientX)
      yDot(event.clientY)
    }

    const onOver = (event: Event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const hot = target.closest('a, button, [data-cursor], summary, label')
      ring.classList.toggle('is-hot', Boolean(hot))
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver)
    return () => {
      document.documentElement.classList.remove('has-fine-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}

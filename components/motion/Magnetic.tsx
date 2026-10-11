'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { cn } from '@/lib/utils'

export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      if (Math.hypot(dx, dy) < 110) {
        xTo(dx * strength)
        yTo(dy * strength)
      } else {
        xTo(0)
        yTo(0)
      }
    }
    const reset = () => {
      xTo(0)
      yTo(0)
    }

    const parent = el.parentElement ?? el
    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', reset)
    return () => {
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', reset)
    }
  }, [strength])

  return (
    <span ref={ref} className={cn('inline-flex will-change-transform', className)}>
      {children}
    </span>
  )
}

'use client'

import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { gsap, SplitText, useGSAP } from '@/lib/gsap'

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  onInk?: boolean
  className?: string
  as?: 'h1' | 'h2'
  animate?: boolean
  /** Hands the heading to the page-wide MotionDirector for a per-character or per-line rise. */
  split?: 'chars' | 'lines'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  onInk = false,
  className,
  as = 'h2',
  animate = true,
  split,
}: SectionHeadingProps) {
  const Heading = as
  const root = useRef<HTMLDivElement>(null)
  const isCenter = align === 'center'

  useGSAP(
    () => {
      if (!animate) return
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      const heading = root.current?.querySelector('h1, h2')
      if (!heading) return
      let lines: SplitText | null = null
      let cancelled = false
      const run = () => {
        if (cancelled) return
        lines = SplitText.create(heading, { type: 'lines', mask: 'lines', linesClass: 'split-line' })
        gsap.from(lines.lines, {
          yPercent: 110,
          duration: 1,
          stagger: 0.06,
          ease: 'power4.out',
          scrollTrigger: { trigger: heading, start: 'top 85%' },
        })
      }
      document.fonts?.ready.then(run)
      return () => {
        cancelled = true
        lines?.revert()
      }
    },
    { scope: root }
  )

  return (
    <div
      ref={root}
      className={cn('max-w-3xl', isCenter ? 'mx-auto text-center' : 'text-left', onInk && 'on-ink', className)}
    >
      <Heading
        data-split={split}
        className={cn(
          'display',
          as === 'h1' ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl' : 'text-3xl sm:text-4xl md:text-5xl',
          onInk ? 'text-ink-foreground' : 'text-foreground'
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          data-rise={split ? '20' : undefined}
          className={cn(
            'mt-5 text-pretty text-base leading-relaxed sm:text-lg',
            isCenter && 'mx-auto max-w-2xl',
            onInk ? 'text-ink-foreground/80' : 'text-foreground-muted'
          )}
        >
          {description}
        </p>
      )}
      {eyebrow && (
        <p className={cn('label-line', isCenter && 'justify-center')}>
          <span>{eyebrow}</span>
        </p>
      )}
    </div>
  )
}

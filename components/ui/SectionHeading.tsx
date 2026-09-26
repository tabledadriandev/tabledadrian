'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface SectionHeadingProps {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'left' | 'center'
  onInk?: boolean
  className?: string
  as?: 'h1' | 'h2'
  animate?: boolean
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
}: SectionHeadingProps) {
  const Heading = as
  const isCenter = align === 'center'

  return (
    <motion.div
      variants={staggerContainer}
      initial={animate ? 'hidden' : false}
      whileInView={animate ? 'visible' : undefined}
      animate={animate ? undefined : 'visible'}
      viewport={{ once: true, margin: '-80px' }}
      className={cn(
        'max-w-3xl',
        isCenter ? 'mx-auto text-center' : 'text-left',
        onInk && 'on-ink',
        className
      )}
    >
      {eyebrow && (
        <motion.span
          variants={fadeInUp}
          className={cn('eyebrow mb-5', isCenter && 'eyebrow-center justify-center')}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.div variants={fadeInUp}>
        <Heading
          className={cn(
            'display',
            as === 'h1'
              ? 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
              : 'text-3xl sm:text-4xl md:text-5xl',
            onInk ? 'text-ink-foreground' : 'text-foreground'
          )}
        >
          {title}
        </Heading>
      </motion.div>
      {description && (
        <motion.p
          variants={fadeInUp}
          className={cn(
            'mt-5 text-base sm:text-lg leading-relaxed text-pretty',
            isCenter && 'mx-auto max-w-2xl',
            onInk ? 'text-ink-foreground/70' : 'text-foreground-muted'
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

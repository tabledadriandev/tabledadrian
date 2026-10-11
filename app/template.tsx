'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { MotionDirector } from '@/components/motion/MotionDirector'
import { isCurtainCovering } from '@/components/motion/PageCurtain'

let hasPainted = false

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  const entry = useRef<{ first: boolean; curtain: boolean } | null>(null)
  if (entry.current === null) {
    entry.current = { first: !hasPainted, curtain: isCurtainCovering() }
    if (typeof window !== 'undefined') hasPainted = true
  }
  const { first, curtain } = entry.current

  return (
    <>
      {first || curtain ? (
        children
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0.25 : 0.45, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
      <MotionDirector firstPaint={first} curtain={curtain} />
    </>
  )
}

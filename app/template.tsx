'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

let hasPainted = false

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()
  const animate = useRef<boolean | null>(null)
  if (animate.current === null) {
    animate.current = hasPainted
    if (typeof window !== 'undefined') hasPainted = true
  }

  if (!animate.current) return <>{children}</>

  return (
    <>
      {reduced ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      ) : (
        <>
          <motion.div
            className="page-wipe"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.02 }}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0.01 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.28, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </>
      )}
    </>
  )
}

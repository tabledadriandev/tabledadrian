'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [hoverText, setHoverText] = useState('')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target
      if (!target || !(target instanceof Element)) {
        setIsHovering(false)
        setHoverText('')
        return
      }

      // Now we know target is an Element, so closest is safe to use
      const isLink = target.tagName === 'A' || target.closest('a')
      const isButton = target.tagName === 'BUTTON' || target.closest('button')
      const isImage = target.tagName === 'IMG' || target.closest('img')

      if (isLink || isButton) {
        setIsHovering(true)
        setHoverText('Click')
      } else if (isImage) {
        setIsHovering(true)
        setHoverText('View')
      } else {
        setIsHovering(false)
        setHoverText('')
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseenter', handleMouseEnter, true)

    // Check if device has touch (mobile)
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (hasTouch) {
      return // Don't show custom cursor on mobile
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
    }
  }, [])

  // Hide on mobile
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      initial={{ scale: 0 }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        x: mousePosition.x - (isHovering ? 30 : 8),
        y: mousePosition.y - (isHovering ? 30 : 8),
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
      }}
    >
      <div className="relative">
        <div
          className={`w-4 h-4 rounded-full border-2 border-primary transition-all duration-300 ${
            isHovering ? 'bg-primary/20' : 'bg-transparent'
          }`}
        />
        {isHovering && hoverText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary text-xs font-medium whitespace-nowrap"
          >
            {hoverText}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

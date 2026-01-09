'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ChefHat } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center space-y-8"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-4">
          <ChefHat size={48} className="text-primary" />
        </div>
        <h1 className="text-6xl font-display font-bold">404</h1>
        <h2 className="text-2xl font-display font-semibold">Page Not Found</h2>
        <p className="text-foreground-muted max-w-md mx-auto">
          The page you're looking for seems to have wandered off the menu. 
          Let's get you back to the main course.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-background rounded-full font-medium hover:bg-primary/90 transition-all"
        >
          <Home size={20} />
          <span>Return Home</span>
        </Link>
      </motion.div>
    </div>
  )
}

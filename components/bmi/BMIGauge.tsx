'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface BMICategory {
  range: [number, number]
  label: string
  color: string
  icon?: React.ComponentType<{ size?: number; className?: string }>
  description?: string
}

const categories: BMICategory[] = [
  {
    range: [0, 18.5],
    label: 'Underweight',
    color: '#3B82F6',
  },
  {
    range: [18.5, 25],
    label: 'Normal',
    color: '#10B981',
  },
  {
    range: [25, 30],
    label: 'Overweight',
    color: '#F59E0B',
  },
  {
    range: [30, Infinity],
    label: 'Obese',
    color: '#EF4444',
  },
]

interface BMIGaugeProps {
  bmi: number
  category: BMICategory | string
}

export function BMIGauge({ bmi, category }: BMIGaugeProps) {
  // Handle both string (label) and full category object
  const categoryObj: BMICategory | null = typeof category === 'string'
    ? categories.find(cat => cat.label === category) || categories[1] // Default to Normal if not found
    : category

  const [animatedBMI, setAnimatedBMI] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = bmi / steps
    let current = 0
    let step = 0

    const timer = setInterval(() => {
      step++
      current += increment
      if (step >= steps) {
        setAnimatedBMI(bmi)
        clearInterval(timer)
      } else {
        setAnimatedBMI(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [bmi])

  if (!categoryObj) {
    return null
  }

  // Calculate angle for gauge (0-180 degrees, BMI range 15-40)
  const minBMI = 15
  const maxBMI = 40
  const normalizedBMI = Math.max(minBMI, Math.min(maxBMI, animatedBMI))
  const percentage = (normalizedBMI - minBMI) / (maxBMI - minBMI)

  const radius = 120
  const circumference = Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage * circumference)

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-32 mb-8">
        {/* Background arc */}
        <svg className="w-full h-full" viewBox="0 0 250 130">
          <path
            d="M 25 125 A 100 100 0 0 1 225 125"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Animated arc */}
          <motion.path
            d="M 25 125 A 100 100 0 0 1 225 125"
            fill="none"
            stroke={categoryObj.color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
        {/* BMI Value */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="text-5xl font-display font-bold"
            style={{ color: categoryObj.color }}
          >
            {animatedBMI.toFixed(1)}
          </motion.div>
          <div className="text-sm text-foreground-muted mt-1">BMI</div>
        </div>
      </div>
      {/* Category Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="px-6 py-2 rounded-lg text-sm font-medium"
        style={{
          backgroundColor: `${categoryObj.color}20`,
          color: categoryObj.color,
        }}
      >
        {categoryObj.label}
      </motion.div>
    </div>
  )
}

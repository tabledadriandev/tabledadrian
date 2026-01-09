'use client'

import { motion } from 'framer-motion'
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface BMICategory {
  range: [number, number]
  label: string
  color: string
  icon: typeof CheckCircle
  description: string
}

const categories: BMICategory[] = [
  {
    range: [0, 18.5],
    label: 'Underweight',
    color: '#3B82F6',
    icon: CheckCircle,
    description: 'Consider consulting with a nutritionist to develop a healthy weight gain plan.',
  },
  {
    range: [18.5, 25],
    label: 'Normal',
    color: '#10B981',
    icon: CheckCircle,
    description: 'Maintain your healthy lifestyle with balanced nutrition and regular exercise.',
  },
  {
    range: [25, 30],
    label: 'Overweight',
    color: '#F59E0B',
    icon: AlertTriangle,
    description: 'Focus on portion control, nutrient-dense foods, and increased physical activity.',
  },
  {
    range: [30, Infinity],
    label: 'Obese',
    color: '#EF4444',
    icon: XCircle,
    description: 'Consult with healthcare professionals for a comprehensive weight management plan.',
  },
]

interface BMIResultsProps {
  bmi: number
  category: BMICategory | string
}

export function BMIResults({ bmi, category }: BMIResultsProps) {
  // Handle both string (label) and full category object
  const categoryObj: BMICategory | null = typeof category === 'string'
    ? categories.find(cat => cat.label === category) || categories[1] // Default to Normal if not found
    : category

  if (!categoryObj) {
    return null
  }

  const Icon = categoryObj.icon

  // Calculate ideal weight range (BMI 18.5-25)
  // Using average height of 175cm for calculation
  const avgHeightM = 1.75
  const minIdealWeight = 18.5 * avgHeightM * avgHeightM
  const maxIdealWeight = 25 * avgHeightM * avgHeightM

  // Estimate daily calories (simplified)
  const estimatedCalories = Math.round(bmi * 20 + 1500)

  const tips = [
    'Focus on whole, nutrient-dense foods',
    'Maintain regular meal times',
    'Stay hydrated throughout the day',
    'Incorporate regular physical activity',
    'Get adequate sleep (7-9 hours)',
  ]

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Category Info */}
      <motion.div
        variants={fadeInUp}
        className="bg-white border border-foreground/10 rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${categoryObj.color}20` }}
          >
            <Icon size={24} style={{ color: categoryObj.color }} />
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold">{categoryObj.label}</h3>
            <p className="text-sm text-foreground-muted">BMI Range: {categoryObj.range[0]} - {categoryObj.range[1] === Infinity ? '∞' : categoryObj.range[1]}</p>
          </div>
        </div>
        <p className="text-foreground-muted">{categoryObj.description}</p>
      </motion.div>

      {/* Health Info */}
      <motion.div
        variants={fadeInUp}
        className="bg-white border border-foreground/10 rounded-xl p-6 space-y-4 shadow-sm"
      >
        <h3 className="text-xl font-display font-semibold mb-4">Health Information</h3>
        <div>
          <p className="text-sm text-foreground-muted mb-1">Ideal Weight Range</p>
          <p className="text-lg font-semibold">
            {minIdealWeight.toFixed(1)} - {maxIdealWeight.toFixed(1)} kg
          </p>
        </div>
        <div>
          <p className="text-sm text-foreground-muted mb-1">Estimated Daily Calories</p>
          <p className="text-lg font-semibold">{estimatedCalories} kcal</p>
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        variants={fadeInUp}
        className="md:col-span-2 bg-white border border-foreground/10 rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-xl font-display font-semibold mb-4">Chef Adrian's Nutrition Tips</h3>
        <ul className="space-y-2">
          {tips.map((tip, index) => (
            <li key={index} className="flex items-start space-x-3">
              <CheckCircle size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground-muted">{tip}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'

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

interface BMICalculatorProps {
  onResult?: (data: { bmi: number; category: string }) => void
}

export function BMICalculator({ onResult }: BMICalculatorProps) {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [heightInches, setHeightInches] = useState('')
  const [, setBmi] = useState<number | null>(null)
  const [, setCategory] = useState<BMICategory | null>(null)

  const calculateBMI = () => {
    let weightKg: number
    let heightM: number

    if (unit === 'metric') {
      weightKg = parseFloat(weight)
      heightM = parseFloat(height) / 100 // cm to meters
    } else {
      const weightLbs = parseFloat(weight)
      const heightFt = parseFloat(height)
      const heightIn = parseFloat(heightInches) || 0
      weightKg = weightLbs * 0.453592
      heightM = (heightFt * 0.3048) + (heightIn * 0.0254)
    }

    if (weightKg > 0 && heightM > 0) {
      const calculatedBMI = weightKg / (heightM * heightM)
      setBmi(calculatedBMI)

      const foundCategory = categories.find(
        (cat) => calculatedBMI >= cat.range[0] && calculatedBMI < cat.range[1]
      )
      const selectedCategory = foundCategory || categories[0]
      setCategory(selectedCategory)
      
      if (onResult) {
        onResult({
          bmi: calculatedBMI,
          category: selectedCategory.label,
        })
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    calculateBMI()
  }

  return (
    <div className="space-y-8">
      {/* Unit Toggle */}
      <motion.div
        variants={fadeInUp}
        className="flex items-center justify-center space-x-4"
      >
        <button
          onClick={() => setUnit('metric')}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
            unit === 'metric'
              ? 'bg-ink text-ink-foreground'
              : 'border border-border bg-card text-foreground-muted hover:text-foreground'
          }`}
        >
          Metric (kg/cm)
        </button>
        <button
          onClick={() => setUnit('imperial')}
          className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
            unit === 'imperial'
              ? 'bg-ink text-ink-foreground'
              : 'border border-border bg-card text-foreground-muted hover:text-foreground'
          }`}
        >
          Imperial (lb/ft)
        </button>
      </motion.div>

      {/* Calculator Form */}
      <motion.form
        variants={fadeInUp}
        onSubmit={handleSubmit}
        className="surface space-y-6 p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Weight {unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === 'metric' ? '70' : '154'}
              className="field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              Height {unit === 'metric' ? '(cm)' : '(ft)'}
            </label>
            {unit === 'metric' ? (
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="175"
                className="field"
                required
              />
            ) : (
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="5"
                  className="field flex-1"
                  required
                />
                <input
                  type="number"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  placeholder="10"
                  className="field flex-1"
                  required
                />
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Calculate BMI
        </button>
      </motion.form>
    </div>
  )
}

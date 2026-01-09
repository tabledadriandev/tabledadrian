'use client'

import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/animations'

interface Nutrition {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  sugar?: number
}

interface NutritionFactsProps {
  nutrition: Nutrition
}

export function NutritionFacts({ nutrition }: NutritionFactsProps) {
  const macros = [
    { label: 'Calories', value: nutrition.calories, unit: 'kcal', color: 'bg-primary' },
    { label: 'Protein', value: nutrition.protein, unit: 'g', color: 'bg-blue-500' },
    { label: 'Carbs', value: nutrition.carbs, unit: 'g', color: 'bg-yellow-500' },
    { label: 'Fat', value: nutrition.fat, unit: 'g', color: 'bg-red-500' },
  ]

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white border border-foreground/10 rounded-xl p-6 shadow-sm"
    >
      <h2 className="text-2xl font-display font-semibold mb-6">Nutrition Facts</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {macros.map((macro, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-display font-bold mb-1">{macro.value}</div>
            <div className="text-sm text-foreground-muted mb-2">{macro.unit}</div>
            <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${macro.color}`}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              />
            </div>
            <div className="text-xs text-foreground-subtle mt-1">{macro.label}</div>
          </div>
        ))}
      </div>
      {(nutrition.fiber || nutrition.sugar) && (
        <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4 text-sm">
          {nutrition.fiber && (
            <div>
              <span className="text-foreground-muted">Fiber: </span>
              <span className="font-semibold">{nutrition.fiber}g</span>
            </div>
          )}
          {nutrition.sugar && (
            <div>
              <span className="text-foreground-muted">Sugar: </span>
              <span className="font-semibold">{nutrition.sugar}g</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Plus } from 'lucide-react'
import { FoodLog, useNutritionStore } from '@/lib/stores/nutrition-store'

interface QuickAddProps {
  onFoodSelected: (
    food: {
      name: string
      calories: number
      protein: number
      carbs: number
      fat: number
      fiber?: number
      sugar?: number
      sodium?: number
    },
    quantity: number,
    unit: string,
    mealType: FoodLog['mealType'],
    photoUrl?: string,
    barcode?: string
  ) => void
}

const QUICK_FOODS = [
  { name: 'Apple', calories: 52, protein: 0.3, carbs: 14, fat: 0.2, defaultQty: 1, unit: 'piece' },
  { name: 'Banana', calories: 89, protein: 1.1, carbs: 23, fat: 0.3, defaultQty: 1, unit: 'piece' },
  { name: 'Egg', calories: 70, protein: 6, carbs: 0.6, fat: 5, defaultQty: 1, unit: 'piece' },
  { name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, defaultQty: 100, unit: 'g' },
  { name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 50, defaultQty: 30, unit: 'g' },
  { name: 'Oatmeal', calories: 68, protein: 2.4, carbs: 12, fat: 1.4, defaultQty: 100, unit: 'g' },
  { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, defaultQty: 100, unit: 'g' },
  { name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 12, defaultQty: 100, unit: 'g' },
]

export function QuickAdd({ onFoodSelected }: QuickAddProps) {
  const [mealType, setMealType] = useState<FoodLog['mealType']>('snack')
  const foodLogs = useNutritionStore((state) => state.foodLogs)
  
  // Get recent foods (last 10 unique)
  const recentFoods = Array.from(
    new Set(foodLogs.slice(-10).map((log) => log.foodName))
  )
    .slice(0, 5)
    .map((name) => {
      const log = foodLogs.find((l) => l.foodName === name)
      return log
        ? {
            name: log.foodName,
            calories: (log.calories / log.quantity) * 100,
            protein: (log.protein / log.quantity) * 100,
            carbs: (log.carbs / log.quantity) * 100,
            fat: (log.fat / log.quantity) * 100,
            defaultQty: log.quantity,
            unit: log.unit,
          }
        : null
    })
    .filter(Boolean) as typeof QUICK_FOODS

  const handleQuickAdd = (food: typeof QUICK_FOODS[0]) => {
    onFoodSelected(
      {
        name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
      },
      food.defaultQty,
      food.unit,
      mealType
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">Meal Type</label>
        <div className="grid grid-cols-4 gap-2">
          {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setMealType(type)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${mealType === type
                  ? 'bg-primary text-background'
                  : 'bg-background border border-border hover:border-primary'
                }
              `}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {recentFoods.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Clock size={18} className="text-foreground-muted" />
            <h3 className="font-semibold">Recent Foods</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {recentFoods.map((food) => (
              <motion.button
                key={food.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuickAdd(food)}
                className="p-3 bg-white border border-foreground/10 rounded-lg text-left hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{food.name}</span>
                  <Plus size={16} className="text-primary" />
                </div>
                <p className="text-xs text-foreground-muted">
                  {food.calories} cal
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-3">Quick Add</h3>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_FOODS.map((food) => (
            <motion.button
              key={food.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickAdd(food)}
              className="p-3 bg-background-elevated border border-border rounded-lg text-left hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{food.name}</span>
                <Plus size={16} className="text-primary" />
              </div>
              <p className="text-xs text-foreground-muted">
                {food.calories} cal • {food.protein}g protein
              </p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

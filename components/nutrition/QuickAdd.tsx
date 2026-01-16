'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Plus, Leaf, Zap, Heart } from 'lucide-react'
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

// Longevity-focused quick foods with accurate nutrition data
const LONGEVITY_FOODS = [
  // Proteins
  { name: 'Wild Salmon', calories: 208, protein: 20, carbs: 0, fat: 13, fiber: 0, defaultQty: 150, unit: 'g', category: 'protein', benefit: 'Omega-3' },
  { name: 'Pasture Eggs', calories: 147, protein: 13, carbs: 0.7, fat: 10, fiber: 0, defaultQty: 2, unit: 'eggs', category: 'protein', benefit: 'Choline' },
  { name: 'Sardines', calories: 208, protein: 25, carbs: 0, fat: 11, fiber: 0, defaultQty: 100, unit: 'g', category: 'protein', benefit: 'B12' },
  { name: 'Greek Yogurt', calories: 97, protein: 9, carbs: 3.6, fat: 5, fiber: 0, defaultQty: 170, unit: 'g', category: 'protein', benefit: 'Probiotics' },
  
  // Healthy Fats
  { name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, defaultQty: 100, unit: 'g', category: 'fat', benefit: 'Potassium' },
  { name: 'Almonds', calories: 579, protein: 21, carbs: 22, fat: 50, fiber: 12, defaultQty: 30, unit: 'g', category: 'fat', benefit: 'Vitamin E' },
  { name: 'Walnuts', calories: 654, protein: 15, carbs: 14, fat: 65, fiber: 7, defaultQty: 30, unit: 'g', category: 'fat', benefit: 'ALA Omega-3' },
  { name: 'Olive Oil', calories: 884, protein: 0, carbs: 0, fat: 100, fiber: 0, defaultQty: 15, unit: 'ml', category: 'fat', benefit: 'Polyphenols' },
  
  // Superfoods
  { name: 'Blueberries', calories: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2.4, defaultQty: 150, unit: 'g', category: 'superfood', benefit: 'Antioxidants' },
  { name: 'Broccoli Sprouts', calories: 35, protein: 2, carbs: 5.6, fat: 0.5, fiber: 2.3, defaultQty: 50, unit: 'g', category: 'superfood', benefit: 'Sulforaphane' },
  { name: 'Dark Chocolate 85%', calories: 599, protein: 8, carbs: 46, fat: 43, fiber: 11, defaultQty: 30, unit: 'g', category: 'superfood', benefit: 'Flavanols' },
  { name: 'Matcha', calories: 3, protein: 0.3, carbs: 0.4, fat: 0, fiber: 0.4, defaultQty: 2, unit: 'g', category: 'superfood', benefit: 'EGCG' },
  
  // Complex Carbs
  { name: 'Sweet Potato', calories: 86, protein: 1.6, carbs: 20, fat: 0.1, fiber: 3, defaultQty: 150, unit: 'g', category: 'carb', benefit: 'Beta-Carotene' },
  { name: 'Quinoa', calories: 120, protein: 4.4, carbs: 21, fat: 1.9, fiber: 2.8, defaultQty: 185, unit: 'g', category: 'carb', benefit: 'Complete Protein' },
  { name: 'Steel-Cut Oats', calories: 379, protein: 13, carbs: 68, fat: 6.5, fiber: 10, defaultQty: 40, unit: 'g', category: 'carb', benefit: 'Beta-Glucan' },
  { name: 'Lentils', calories: 116, protein: 9, carbs: 20, fat: 0.4, fiber: 8, defaultQty: 198, unit: 'g', category: 'carb', benefit: 'Fiber' },
  
  // Vegetables
  { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, defaultQty: 100, unit: 'g', category: 'vegetable', benefit: 'Nitrates' },
  { name: 'Kale', calories: 49, protein: 4.3, carbs: 9, fat: 0.9, fiber: 3.6, defaultQty: 100, unit: 'g', category: 'vegetable', benefit: 'Vitamin K' },
  { name: 'Broccoli', calories: 34, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, defaultQty: 150, unit: 'g', category: 'vegetable', benefit: 'Sulforaphane' },
  { name: 'Garlic', calories: 149, protein: 6.4, carbs: 33, fat: 0.5, fiber: 2.1, defaultQty: 3, unit: 'cloves', category: 'vegetable', benefit: 'Allicin' },
  
  // Fermented
  { name: 'Kimchi', calories: 15, protein: 1.1, carbs: 2.4, fat: 0.5, fiber: 1.6, defaultQty: 100, unit: 'g', category: 'fermented', benefit: 'Probiotics' },
  { name: 'Sauerkraut', calories: 19, protein: 0.9, carbs: 4.3, fat: 0.1, fiber: 2.9, defaultQty: 100, unit: 'g', category: 'fermented', benefit: 'Probiotics' },
  { name: 'Bone Broth', calories: 31, protein: 5, carbs: 1.7, fat: 0.2, fiber: 0, defaultQty: 240, unit: 'ml', category: 'fermented', benefit: 'Collagen' },
  { name: 'Kefir', calories: 61, protein: 3.3, carbs: 4.5, fat: 3.5, fiber: 0, defaultQty: 240, unit: 'ml', category: 'fermented', benefit: 'Probiotics' },
]

const categoryIcons: Record<string, typeof Leaf> = {
  protein: Heart,
  fat: Zap,
  superfood: Leaf,
  carb: Zap,
  vegetable: Leaf,
  fermented: Heart,
}

const categoryLabels: Record<string, string> = {
  protein: 'Proteins',
  fat: 'Healthy Fats',
  superfood: 'Superfoods',
  carb: 'Complex Carbs',
  vegetable: 'Vegetables',
  fermented: 'Fermented',
}

export function QuickAdd({ onFoodSelected }: QuickAddProps) {
  const [mealType, setMealType] = useState<FoodLog['mealType']>('snack')
  const [activeCategory, setActiveCategory] = useState<string>('all')
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
            fiber: log.fiber ? (log.fiber / log.quantity) * 100 : 0,
            defaultQty: log.quantity,
            unit: log.unit,
            category: 'recent',
            benefit: 'Recently logged'
          }
        : null
    })
    .filter(Boolean) as typeof LONGEVITY_FOODS

  const handleQuickAdd = (food: typeof LONGEVITY_FOODS[0]) => {
    onFoodSelected(
      {
        name: food.name,
        calories: food.calories,
        protein: food.protein,
        carbs: food.carbs,
        fat: food.fat,
        fiber: food.fiber,
      },
      food.defaultQty,
      food.unit,
      mealType
    )
  }

  const categories = ['all', 'protein', 'fat', 'superfood', 'carb', 'vegetable', 'fermented']
  
  const filteredFoods = activeCategory === 'all' 
    ? LONGEVITY_FOODS 
    : LONGEVITY_FOODS.filter(f => f.category === activeCategory)

  return (
    <div className="space-y-6">
      {/* Meal Type Selection */}
      <div>
        <label className="block text-sm font-medium mb-3">Meal Type</label>
        <div className="grid grid-cols-4 gap-2">
          {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setMealType(type)}
              className={`
                px-3 py-2 rounded-xl text-sm font-medium transition-all
                ${mealType === type
                  ? 'bg-primary text-white'
                  : 'bg-foreground/5 border border-foreground/10 hover:border-primary'
                }
              `}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium mb-3">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${activeCategory === cat
                  ? 'bg-primary text-white'
                  : 'bg-foreground/5 text-foreground-muted hover:bg-foreground/10'
                }
              `}
            >
              {cat === 'all' ? 'All' : categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Foods */}
      {recentFoods.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Clock size={16} className="text-foreground-muted" />
            <h3 className="font-semibold text-sm">Recent Foods</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {recentFoods.map((food) => (
              <motion.button
                key={food.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuickAdd(food)}
                className="p-3 bg-white border border-foreground/10 rounded-xl text-left hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm truncate">{food.name}</span>
                  <Plus size={14} className="text-primary flex-shrink-0" />
                </div>
                <p className="text-xs text-foreground-muted">
                  {Math.round(food.calories * food.defaultQty / 100)} cal
                </p>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Longevity Foods Grid */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Leaf size={16} className="text-green-500" />
          <h3 className="font-semibold text-sm">Longevity Foods</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
          {filteredFoods.map((food) => {
            const Icon = categoryIcons[food.category] || Leaf
            return (
              <motion.button
                key={food.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleQuickAdd(food)}
                className="p-3 bg-foreground/5 border border-foreground/10 rounded-xl text-left hover:border-primary transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon size={12} className="text-green-500 flex-shrink-0" />
                    <span className="font-medium text-sm truncate">{food.name}</span>
                  </div>
                  <Plus size={14} className="text-primary flex-shrink-0 ml-1" />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-foreground-muted">
                    {Math.round(food.calories * food.defaultQty / 100)} cal | {food.protein}g P
                  </p>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  {food.benefit}
                </p>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Loader2 } from 'lucide-react'
import { FoodLog } from '@/lib/stores/nutrition-store'
import { createClient } from '@/lib/supabase/client'

// Mock food database - In production, use a real food database API
const MOCK_FOODS = [
  { id: '1', name: 'Grilled Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74 },
  { id: '2', name: 'Salmon Fillet', calories: 206, protein: 22, carbs: 0, fat: 12, fiber: 0, sugar: 0, sodium: 44 },
  { id: '3', name: 'Brown Rice (cooked)', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, fiber: 1.8, sugar: 0.4, sodium: 5 },
  { id: '4', name: 'Broccoli (steamed)', calories: 35, protein: 2.8, carbs: 7, fat: 0.4, fiber: 2.6, sugar: 1.5, sodium: 33 },
  { id: '5', name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15, fiber: 7, sugar: 0.7, sodium: 7 },
  { id: '6', name: 'Greek Yogurt', calories: 59, protein: 10, carbs: 3.6, fat: 0.4, fiber: 0, sugar: 3.6, sodium: 36 },
  { id: '7', name: 'Quinoa (cooked)', calories: 120, protein: 4.4, carbs: 22, fat: 1.9, fiber: 2.8, sugar: 0.9, sodium: 7 },
  { id: '8', name: 'Sweet Potato (baked)', calories: 90, protein: 2, carbs: 21, fat: 0.2, fiber: 3.3, sugar: 7, sodium: 36 },
]

interface FoodSearchProps {
  onFoodSelected: (
    food: any,
    quantity: number,
    unit: string,
    mealType: FoodLog['mealType'],
    photoUrl?: string,
    barcode?: string
  ) => void
}

export function FoodSearch({ onFoodSelected }: FoodSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedFood, setSelectedFood] = useState<any>(null)
  const [quantity, setQuantity] = useState(100)
  const [unit, setUnit] = useState('g')
  const [mealType, setMealType] = useState<FoodLog['mealType']>('lunch')

  useEffect(() => {
    if (query.length > 2) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        const filtered = MOCK_FOODS.filter((food) =>
          food.name.toLowerCase().includes(query.toLowerCase())
        )
        setResults(filtered)
        setLoading(false)
      }, 300)
    } else {
      setResults([])
    }
  }, [query])

  const handleSelect = (food: any) => {
    setSelectedFood(food)
    setQuery(food.name)
    setResults([])
  }

  const handleSubmit = () => {
    if (selectedFood) {
      onFoodSelected(selectedFood, quantity, unit, mealType)
      setSelectedFood(null)
      setQuery('')
      setQuantity(100)
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 500K+ foods..."
          className="w-full pl-12 pr-4 py-4 bg-white border border-foreground/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {loading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-primary" size={20} />
        )}
      </div>

      {/* Search Results */}
      {results.length > 0 && !selectedFood && (
        <div className="max-h-64 overflow-y-auto space-y-2">
          {results.map((food) => (
            <motion.button
              key={food.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => handleSelect(food)}
              className="w-full p-4 bg-white border border-foreground/10 rounded-xl text-left hover:border-primary transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{food.name}</p>
                  <p className="text-sm text-foreground-muted">
                    {food.calories} cal • {food.protein}g protein • {food.carbs}g carbs • {food.fat}g fat
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Selected Food Form */}
      {selectedFood && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 p-4 bg-white rounded-xl border border-foreground/10 shadow-sm"
        >
          <div>
            <h3 className="font-semibold mb-1">{selectedFood.name}</h3>
            <p className="text-sm text-foreground-muted">
              {selectedFood.calories} cal per 100g
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-2 bg-white border border-foreground/10 rounded-lg"
                min="1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-foreground/10 rounded-lg"
              >
                <option value="g">g</option>
                <option value="oz">oz</option>
                <option value="cup">cup</option>
                <option value="piece">piece</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Meal</label>
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

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-foreground-muted mb-2">Estimated Nutrition:</p>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div>
                <span className="text-foreground-muted">Calories</span>
                <p className="font-semibold">
                  {Math.round((selectedFood.calories * quantity) / 100)}
                </p>
              </div>
              <div>
                <span className="text-foreground-muted">Protein</span>
                <p className="font-semibold">
                  {((selectedFood.protein * quantity) / 100).toFixed(1)}g
                </p>
              </div>
              <div>
                <span className="text-foreground-muted">Carbs</span>
                <p className="font-semibold">
                  {((selectedFood.carbs * quantity) / 100).toFixed(1)}g
                </p>
              </div>
              <div>
                <span className="text-foreground-muted">Fat</span>
                <p className="font-semibold">
                  {((selectedFood.fat * quantity) / 100).toFixed(1)}g
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Add to Log
          </button>
        </motion.div>
      )}
    </div>
  )
}

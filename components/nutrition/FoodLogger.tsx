'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Camera, Scan, Clock, X } from 'lucide-react'
import { FoodSearch } from './FoodSearch'
import { FoodPhotoAI } from './FoodPhotoAI'
import { BarcodeScanner } from './BarcodeScanner'
import { QuickAdd } from './QuickAdd'
import { useNutritionStore, FoodLog } from '@/lib/stores/nutrition-store'

type LogMethod = 'search' | 'photo' | 'barcode' | 'quick'

interface FoodLoggerProps {
  onLogAdded?: () => void
}

export function FoodLogger({ onLogAdded }: FoodLoggerProps) {
  const [activeMethod, setActiveMethod] = useState<LogMethod>('search')
  const [isOpen, setIsOpen] = useState(false)
  const addFoodLog = useNutritionStore((state) => state.addFoodLog)

  const handleFoodSelected = (
    food: {
      name: string
      calories: number
      protein: number
      carbs: number
      fat: number
      fiber?: number
      sugar?: number
      sodium?: number
      vitamins?: Record<string, number>
      minerals?: Record<string, number>
    },
    quantity: number,
    unit: string,
    mealType: FoodLog['mealType'],
    photoUrl?: string,
    barcode?: string
  ) => {
    const log: FoodLog = {
      id: `log-${Date.now()}-${Math.random()}`,
      foodName: food.name,
      quantity,
      unit,
      calories: (food.calories * quantity) / 100, // Assuming per 100g
      protein: (food.protein * quantity) / 100,
      carbs: (food.carbs * quantity) / 100,
      fat: (food.fat * quantity) / 100,
      fiber: food.fiber ? (food.fiber * quantity) / 100 : undefined,
      sugar: food.sugar ? (food.sugar * quantity) / 100 : undefined,
      sodium: food.sodium ? (food.sodium * quantity) / 100 : undefined,
      vitamins: food.vitamins,
      minerals: food.minerals,
      timestamp: new Date().toISOString(),
      mealType,
      photoUrl,
      barcode,
    }

    addFoodLog(log)
    setIsOpen(false)
    onLogAdded?.()
  }

  const methods = [
    { id: 'search' as LogMethod, label: 'Search', icon: Search },
    { id: 'photo' as LogMethod, label: 'Photo AI', icon: Camera },
    { id: 'barcode' as LogMethod, label: 'Barcode', icon: Scan },
    { id: 'quick' as LogMethod, label: 'Quick Add', icon: Clock },
  ]

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 rounded-xl bg-primary text-white shadow-2xl flex items-center justify-center z-50"
        aria-label="Add food"
      >
        <Search size={24} />
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false)
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-4xl bg-white border border-foreground/10 rounded-xl shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-display font-bold">Log Food</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-background-elevated rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Method Tabs */}
        <div className="flex items-center border-b border-border bg-background-elevated">
          {methods.map((method) => {
            const Icon = method.icon
            return (
              <button
                key={method.id}
                onClick={() => setActiveMethod(method.id)}
                className={`
                  flex-1 flex items-center justify-center space-x-2 px-4 py-4 transition-all
                  ${activeMethod === method.id
                    ? 'bg-card border-b-2 border-primary text-primary'
                    : 'text-foreground-muted hover:text-foreground hover:bg-card/50'
                  }
                `}
              >
                <Icon size={18} />
                <span className="font-medium">{method.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeMethod === 'search' && (
            <FoodSearch onFoodSelected={handleFoodSelected} />
          )}
          {activeMethod === 'photo' && (
            <FoodPhotoAI onFoodSelected={handleFoodSelected} />
          )}
          {activeMethod === 'barcode' && (
            <BarcodeScanner onFoodSelected={handleFoodSelected} />
          )}
          {activeMethod === 'quick' && (
            <QuickAdd onFoodSelected={handleFoodSelected} />
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

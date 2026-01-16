'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, Camera, Scan, Clock, X, Plus } from 'lucide-react'
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
  const contentRef = useRef<HTMLDivElement>(null)

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

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
      calories: (food.calories * quantity) / 100,
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
    { id: 'photo' as LogMethod, label: 'Photo', icon: Camera },
    { id: 'barcode' as LogMethod, label: 'Barcode', icon: Scan },
    { id: 'quick' as LogMethod, label: 'Quick', icon: Clock },
  ]

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 w-14 h-14 sm:w-16 sm:h-16 rounded-md bg-primary text-white shadow-xl flex items-center justify-center z-50 hover:bg-primary/90 transition-colors"
        aria-label="Add food"
      >
        <Plus size={24} />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Modal */}
      <div className="absolute inset-0 sm:inset-4 md:inset-8 lg:inset-12 flex items-center justify-center pointer-events-none">
        <div 
          className="w-full h-full sm:h-auto sm:max-h-full bg-white sm:rounded-md shadow-2xl pointer-events-auto flex flex-col overflow-hidden"
          style={{ maxWidth: '900px', maxHeight: 'calc(100vh - 64px)' }}
        >
          {/* Fixed Header */}
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-200 bg-white">
            <div>
              <h2 className="text-lg sm:text-xl font-display font-bold text-gray-900">Log Food</h2>
              <p className="text-xs sm:text-sm text-gray-500">Track your nutrition</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Fixed Tabs */}
          <div className="flex-shrink-0 flex border-b border-gray-200 bg-gray-50">
            {methods.map((method) => {
              const Icon = method.icon
              const isActive = activeMethod === method.id
              return (
                <button
                  key={method.id}
                  onClick={() => setActiveMethod(method.id)}
                  className={`
                    flex-1 flex items-center justify-center gap-1.5 px-2 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-white text-primary border-b-2 border-primary -mb-px'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={16} />
                  <span>{method.label}</span>
                </button>
              )
            })}
          </div>

          {/* Scrollable Content */}
          <div 
            ref={contentRef}
            className="flex-1 overflow-y-auto overscroll-contain bg-white"
            style={{ minHeight: 0 }}
          >
            <div className="p-4 sm:p-6">
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
          </div>
        </div>
      </div>
    </div>
  )
}

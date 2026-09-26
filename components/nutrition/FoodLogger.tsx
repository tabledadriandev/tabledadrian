'use client'

import { useState, useEffect } from 'react'
import { Search, Camera, Scan, Clock, X } from 'lucide-react'
import { FoodSearch } from './FoodSearch'
import { QuickAdd } from './QuickAdd'
import { useNutritionStore, FoodLog } from '@/lib/stores/nutrition-store'
import { AppDownloadModal } from '@/components/app/AppDownloadModal'
import { cn } from '@/lib/utils'

type LogMethod = 'search' | 'photo' | 'barcode' | 'quick'

interface FoodLoggerProps {
  onLogAdded?: () => void
  demo?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function FoodLogger({ onLogAdded, demo = false, open, onOpenChange }: FoodLoggerProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isOpen = open ?? internalOpen
  const setIsOpen = onOpenChange ?? setInternalOpen

  const [activeMethod, setActiveMethod] = useState<LogMethod>('search')
  const [appOpen, setAppOpen] = useState(false)
  const [lockedFeature, setLockedFeature] = useState('Photo logging')
  const addFoodLog = useNutritionStore((state) => state.addFoodLog)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
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
    addFoodLog({
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
    })
    setIsOpen(false)
    onLogAdded?.()
  }

  const methods = [
    { id: 'search' as LogMethod, label: 'Search', icon: Search, locked: false },
    { id: 'photo' as LogMethod, label: 'Photo', icon: Camera, locked: demo },
    { id: 'barcode' as LogMethod, label: 'Barcode', icon: Scan, locked: demo },
    { id: 'quick' as LogMethod, label: 'Quick', icon: Clock, locked: false },
  ]

  const selectMethod = (method: (typeof methods)[number]) => {
    if (method.locked) {
      setLockedFeature(method.id === 'photo' ? 'Photo logging' : 'Barcode scanning')
      setAppOpen(true)
      return
    }
    setActiveMethod(method.id)
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 z-[60]">
        <button
          type="button"
          className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          aria-label="Close log food"
          onClick={() => setIsOpen(false)}
        />

        <div className="absolute inset-0 flex items-end justify-center p-0 sm:items-center sm:p-6">
          <div className="flex h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-card shadow-lift sm:h-auto sm:max-h-[85vh] sm:rounded-3xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="font-display text-2xl">Log a meal</h2>
                <p className="text-xs text-foreground-muted">
                  {demo ? 'Demo · search and quick-add are available here' : 'Track your nutrition'}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-foreground-muted hover:bg-foreground/5 hover:text-foreground"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex border-b border-border bg-background-secondary">
              {methods.map((method) => {
                const Icon = method.icon
                const isActive = activeMethod === method.id && !method.locked
                return (
                  <button
                    key={method.id}
                    onClick={() => selectMethod(method)}
                    className={cn(
                      'relative flex flex-1 items-center justify-center gap-1.5 px-2 py-3 text-xs font-medium sm:text-sm',
                      isActive ? 'bg-card text-primary' : 'text-foreground-muted hover:text-foreground'
                    )}
                  >
                    <Icon size={16} />
                    <span>{method.label}</span>
                    {method.locked && (
                      <span className="absolute right-1 top-1 rounded-full bg-gold-soft px-1.5 py-px text-[8px] uppercase tracking-caps text-ink">
                        App
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-5">
              {activeMethod === 'search' && <FoodSearch onFoodSelected={handleFoodSelected} />}
              {activeMethod === 'quick' && <QuickAdd onFoodSelected={handleFoodSelected} />}
            </div>
          </div>
        </div>
      </div>
      <AppDownloadModal open={appOpen} onOpenChange={setAppOpen} feature={lockedFeature} />
    </>
  )
}

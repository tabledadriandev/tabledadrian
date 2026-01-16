'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Scan, Loader2, AlertCircle } from 'lucide-react'
import { Html5Qrcode } from 'html5-qrcode'
import { FoodLog } from '@/lib/stores/nutrition-store'

interface FoodData {
  name: string
  brand?: string
  barcode?: string
  nutrition: {
    calories: number
    protein: number
    carbs: number
    fat: number
    fiber?: number
    sugar?: number
    sodium?: number
  }
  servingSize?: number
  servingUnit?: string
}

interface BarcodeScannerProps {
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

export function BarcodeScanner({ onFoodSelected }: BarcodeScannerProps) {
  const [scanning, setScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [scannedCode, setScannedCode] = useState<string | null>(null)
  const [foodData, setFoodData] = useState<FoodData | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [unit, setUnit] = useState('piece')
  const [mealType, setMealType] = useState<FoodLog['mealType']>('snack')
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const scannerId = 'barcode-scanner'

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [])

  const startScanning = async () => {
    try {
      setError(null)
      setScanning(true)

      const html5QrCode = new Html5Qrcode(scannerId)
      scannerRef.current = html5QrCode

      await html5QrCode.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          handleBarcodeScanned(decodedText)
          html5QrCode.stop()
          setScanning(false)
        },
        () => {
          // Ignore scanning errors
        }
      )
    } catch {
      setError('Failed to start camera')
      setScanning(false)
    }
  }

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop()
        scannerRef.current = null
      } catch (err) {
        // Ignore stop errors
      }
    }
    setScanning(false)
  }

  const handleBarcodeScanned = async (barcode: string) => {
    setScannedCode(barcode)
    
    try {
      // In production, call your backend API or food database API
      // const response = await fetch(`/api/food/barcode/${barcode}`)
      // const data = await response.json()

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock food data - replace with actual API response
      const mockFood = {
        name: 'Organic Greek Yogurt',
        brand: 'Brand Name',
        barcode,
        nutrition: {
          calories: 130,
          protein: 15,
          carbs: 9,
          fat: 5,
          fiber: 0,
          sugar: 6,
          sodium: 65,
        },
        servingSize: 170,
        servingUnit: 'g',
      }

      setFoodData(mockFood)
    } catch {
      setError('Food not found in database')
    }
  }

  const handleManualEntry = () => {
    setScannedCode('manual')
    setFoodData({
      name: '',
      nutrition: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
      },
    })
  }

  const handleSubmit = () => {
    if (foodData) {
      onFoodSelected(
        {
          name: foodData.name || 'Custom Food',
          ...foodData.nutrition,
        },
        quantity,
        unit,
        mealType,
        undefined,
        scannedCode || undefined
      )
      // Reset
      setScannedCode(null)
      setFoodData(null)
      setQuantity(1)
    }
  }

  return (
    <div className="space-y-6">
      {!scannedCode && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-display font-semibold mb-2">
              Scan Barcode
            </h3>
            <p className="text-foreground-muted">
              Point your camera at a product barcode
            </p>
          </div>

          <div className="relative aspect-square bg-foreground/5 rounded-xl overflow-hidden">
            <div id={scannerId} className="w-full h-full" />
            {!scanning && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Scan size={48} className="text-foreground-muted mx-auto" />
                  <p className="text-foreground-muted">
                    Camera will activate when you start scanning
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            {!scanning ? (
              <>
                <button
                  onClick={startScanning}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
                >
                  <Scan size={18} />
                  <span>Start Scanning</span>
                </button>
                <button
                  onClick={handleManualEntry}
                  className="flex-1 px-4 py-3 border border-border rounded-lg hover:border-primary transition-colors"
                >
                  Enter Manually
                </button>
              </>
            ) : (
              <button
                onClick={stopScanning}
                className="w-full px-4 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Stop Scanning
              </button>
            )}
          </div>
        </div>
      )}

      {scannedCode && !foodData && (
        <div className="text-center py-12 space-y-4">
          <Loader2 size={48} className="text-primary animate-spin mx-auto" />
          <div>
            <h3 className="text-xl font-display font-semibold mb-2">
              Looking up product...
            </h3>
            <p className="text-foreground-muted">
              Barcode: {scannedCode}
            </p>
          </div>
        </div>
      )}

      {foodData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 p-4 bg-white rounded-xl border border-foreground/10 shadow-sm"
        >
          <div>
            <h3 className="font-semibold mb-1">{foodData.name}</h3>
            {foodData.brand && (
              <p className="text-sm text-foreground-muted">{foodData.brand}</p>
            )}
            {scannedCode && scannedCode !== 'manual' && (
              <p className="text-xs text-foreground-subtle mt-1">
                Barcode: {scannedCode}
              </p>
            )}
          </div>

          {scannedCode === 'manual' && (
            <div>
              <label className="block text-sm font-medium mb-2">Food Name</label>
              <input
                type="text"
                value={foodData.name}
                onChange={(e) =>
                  setFoodData({ ...foodData, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-white border border-foreground/10 rounded-lg"
                placeholder="Enter food name"
              />
            </div>
          )}

          <div className="grid grid-cols-4 gap-2 text-sm pt-4 border-t border-border">
            <div>
              <span className="text-foreground-muted block">Calories</span>
              <p className="font-semibold">{foodData.nutrition.calories}</p>
            </div>
            <div>
              <span className="text-foreground-muted block">Protein</span>
              <p className="font-semibold">{foodData.nutrition.protein}g</p>
            </div>
            <div>
              <span className="text-foreground-muted block">Carbs</span>
              <p className="font-semibold">{foodData.nutrition.carbs}g</p>
            </div>
            <div>
              <span className="text-foreground-muted block">Fat</span>
              <p className="font-semibold">{foodData.nutrition.fat}g</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-2 bg-white border border-foreground/10 rounded-lg"
                min="0.1"
                step="0.1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Unit</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-foreground/10 rounded-lg"
              >
                <option value="piece">piece</option>
                <option value="g">g</option>
                <option value="oz">oz</option>
                <option value="cup">cup</option>
                <option value="ml">ml</option>
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

          <div className="flex space-x-4 pt-4 border-t border-border">
            <button
              onClick={() => {
                setScannedCode(null)
                setFoodData(null)
              }}
              className="flex-1 px-4 py-3 border border-border rounded-lg hover:border-primary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Add to Log
            </button>
          </div>
        </motion.div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3">
          <AlertCircle className="text-red-500" size={20} />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
    </div>
  )
}

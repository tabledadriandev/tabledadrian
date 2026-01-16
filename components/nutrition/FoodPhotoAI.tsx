'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Camera, Upload, Loader2, AlertCircle } from 'lucide-react'
import Webcam from 'react-webcam'
import { FoodLog } from '@/lib/stores/nutrition-store'

interface FoodPhotoAIProps {
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

export function FoodPhotoAI({ onFoodSelected }: FoodPhotoAIProps) {
  interface AnalysisResult {
    foodName: string
    confidence: number
    estimatedPortion?: number
    nutrition: {
      calories: number
      protein: number
      carbs: number
      fat: number
      fiber?: number
      sugar?: number
      sodium?: number
    }
    items?: Array<{ name: string; quantity: number; unit: string }>
  }


  const [step, setStep] = useState<'upload' | 'capture' | 'analyzing' | 'result'>('upload')
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [quantity, setQuantity] = useState(100)
  const [mealType, setMealType] = useState<FoodLog['mealType']>('lunch')
  const webcamRef = useRef<Webcam>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const analyzeImage = useCallback(async (_imageBase64: string) => {
    setError(null)

    try {
      // In production, call your backend API or Lovable AI Gateway
      // const supabase = createClient()
      // const { data, error } = await supabase.functions.invoke('analyze-food-photo', {
      //   body: { image: imageBase64 }
      // })

      // Simulate AI analysis
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock result - replace with actual API response
      const mockResult: AnalysisResult = {
        foodName: 'Grilled Chicken Breast with Vegetables',
        confidence: 0.92,
        estimatedPortion: 150,
        nutrition: {
          calories: 247,
          protein: 46.5,
          carbs: 8,
          fat: 5.4,
          fiber: 3,
          sugar: 4,
          sodium: 111,
        },
        items: [
          { name: 'Chicken Breast', quantity: 120, unit: 'g' },
          { name: 'Broccoli', quantity: 100, unit: 'g' },
          { name: 'Carrots', quantity: 50, unit: 'g' },
        ],
      }

      setAnalysisResult(mockResult)
      setStep('result')
    } catch {
      setError('Failed to analyze image. Please try again.')
      setStep('upload')
    }
  }, [])

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        setImage(imageSrc)
        setStep('analyzing')
        analyzeImage(imageSrc)
      }
    }
  }, [analyzeImage])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageSrc = reader.result as string
        setImage(imageSrc)
        setStep('analyzing')
        analyzeImage(imageSrc)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleConfirm = () => {
    if (analysisResult) {
      onFoodSelected(
        {
          name: analysisResult.foodName,
          ...analysisResult.nutrition,
        },
        quantity,
        'g',
        mealType,
        image || undefined
      )
      // Reset
      setStep('upload')
      setImage(null)
      setAnalysisResult(null)
      setQuantity(100)
    }
  }

  return (
    <div className="space-y-6">
      {step === 'upload' && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-display font-semibold mb-2">
              Snap or Upload Food Photo
            </h3>
            <p className="text-foreground-muted">
              AI will identify the food and estimate portions
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setStep('capture')}
              className="p-8 border-2 border-dashed border-foreground/10 rounded-xl hover:border-primary transition-colors flex flex-col items-center justify-center space-y-3"
            >
              <Camera size={32} className="text-primary" />
              <span className="font-medium">Take Photo</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-8 border-2 border-dashed border-foreground/10 rounded-xl hover:border-primary transition-colors flex flex-col items-center justify-center space-y-3"
            >
              <Upload size={32} className="text-primary" />
              <span className="font-medium">Upload Photo</span>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {step === 'capture' && (
        <div className="space-y-4">
          <div className="relative aspect-video bg-foreground/5 rounded-xl overflow-hidden">
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setStep('upload')}
              className="flex-1 px-4 py-3 border border-border rounded-lg hover:border-primary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={capturePhoto}
              className="flex-1 px-4 py-3 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors"
            >
              Capture
            </button>
          </div>
        </div>
      )}

      {step === 'analyzing' && (
        <div className="text-center py-12 space-y-4">
          <Loader2 size={48} className="text-primary animate-spin mx-auto" />
          <div>
            <h3 className="text-xl font-display font-semibold mb-2">
              Analyzing your food...
            </h3>
            <p className="text-foreground-muted">
              AI is identifying foods and estimating portions
            </p>
          </div>
          {image && (
            <div className="mt-6 max-w-xs mx-auto rounded-lg overflow-hidden">
              <img src={image} alt="Captured" className="w-full" />
            </div>
          )}
        </div>
      )}

      {step === 'result' && analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {image && (
            <div className="rounded-xl overflow-hidden">
              <img src={image} alt="Food" className="w-full" />
            </div>
          )}

          <div className="p-4 bg-white rounded-xl border border-foreground/10 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{analysisResult.foodName}</h3>
              <span className="text-sm text-foreground-muted">
                {Math.round(analysisResult.confidence * 100)}% confidence
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-sm mt-4 pt-4 border-t border-border">
              <div>
                <span className="text-foreground-muted block">Calories</span>
                <p className="font-semibold">{analysisResult.nutrition.calories}</p>
              </div>
              <div>
                <span className="text-foreground-muted block">Protein</span>
                <p className="font-semibold">{analysisResult.nutrition.protein}g</p>
              </div>
              <div>
                <span className="text-foreground-muted block">Carbs</span>
                <p className="font-semibold">{analysisResult.nutrition.carbs}g</p>
              </div>
              <div>
                <span className="text-foreground-muted block">Fat</span>
                <p className="font-semibold">{analysisResult.nutrition.fat}g</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
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
            </div>

            <button
              onClick={handleConfirm}
              className="w-full mt-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
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

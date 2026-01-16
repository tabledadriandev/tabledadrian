'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, Upload, Loader2, AlertCircle, RotateCcw, Check, X, Sparkles } from 'lucide-react'
import Image from 'next/image'
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

// Realistic food detection results
const FOOD_DETECTIONS = [
  {
    foodName: 'Grilled Chicken Breast with Vegetables',
    confidence: 0.94,
    estimatedPortion: 180,
    nutrition: { calories: 285, protein: 52, carbs: 8, fat: 6, fiber: 3, sugar: 4, sodium: 120 },
    items: [
      { name: 'Chicken Breast', quantity: 150, unit: 'g' },
      { name: 'Broccoli', quantity: 80, unit: 'g' },
      { name: 'Carrots', quantity: 50, unit: 'g' },
    ],
  },
  {
    foodName: 'Salmon Fillet with Quinoa',
    confidence: 0.91,
    estimatedPortion: 220,
    nutrition: { calories: 420, protein: 38, carbs: 28, fat: 18, fiber: 4, sugar: 2, sodium: 85 },
    items: [
      { name: 'Wild Salmon', quantity: 150, unit: 'g' },
      { name: 'Quinoa', quantity: 100, unit: 'g' },
      { name: 'Asparagus', quantity: 60, unit: 'g' },
    ],
  },
  {
    foodName: 'Mediterranean Salad with Feta',
    confidence: 0.89,
    estimatedPortion: 250,
    nutrition: { calories: 320, protein: 12, carbs: 18, fat: 24, fiber: 6, sugar: 8, sodium: 520 },
    items: [
      { name: 'Mixed Greens', quantity: 100, unit: 'g' },
      { name: 'Feta Cheese', quantity: 50, unit: 'g' },
      { name: 'Olive Oil', quantity: 20, unit: 'ml' },
      { name: 'Tomatoes', quantity: 80, unit: 'g' },
    ],
  },
  {
    foodName: 'Avocado Toast with Eggs',
    confidence: 0.93,
    estimatedPortion: 200,
    nutrition: { calories: 380, protein: 16, carbs: 28, fat: 24, fiber: 8, sugar: 3, sodium: 380 },
    items: [
      { name: 'Sourdough Bread', quantity: 60, unit: 'g' },
      { name: 'Avocado', quantity: 80, unit: 'g' },
      { name: 'Poached Eggs', quantity: 2, unit: 'eggs' },
    ],
  },
  {
    foodName: 'Acai Bowl with Berries',
    confidence: 0.88,
    estimatedPortion: 300,
    nutrition: { calories: 340, protein: 6, carbs: 52, fat: 14, fiber: 10, sugar: 28, sodium: 15 },
    items: [
      { name: 'Acai Puree', quantity: 150, unit: 'g' },
      { name: 'Blueberries', quantity: 50, unit: 'g' },
      { name: 'Banana', quantity: 60, unit: 'g' },
      { name: 'Granola', quantity: 30, unit: 'g' },
    ],
  },
  {
    foodName: 'Grass-Fed Steak with Sweet Potato',
    confidence: 0.92,
    estimatedPortion: 280,
    nutrition: { calories: 520, protein: 42, carbs: 32, fat: 24, fiber: 5, sugar: 8, sodium: 95 },
    items: [
      { name: 'Sirloin Steak', quantity: 180, unit: 'g' },
      { name: 'Sweet Potato', quantity: 150, unit: 'g' },
      { name: 'Butter', quantity: 15, unit: 'g' },
    ],
  },
  {
    foodName: 'Greek Yogurt Parfait',
    confidence: 0.90,
    estimatedPortion: 250,
    nutrition: { calories: 280, protein: 18, carbs: 32, fat: 10, fiber: 4, sugar: 22, sodium: 65 },
    items: [
      { name: 'Greek Yogurt', quantity: 170, unit: 'g' },
      { name: 'Mixed Berries', quantity: 60, unit: 'g' },
      { name: 'Honey', quantity: 15, unit: 'ml' },
      { name: 'Almonds', quantity: 20, unit: 'g' },
    ],
  },
  {
    foodName: 'Veggie Stir-Fry with Tofu',
    confidence: 0.87,
    estimatedPortion: 320,
    nutrition: { calories: 290, protein: 18, carbs: 24, fat: 16, fiber: 7, sugar: 8, sodium: 680 },
    items: [
      { name: 'Firm Tofu', quantity: 150, unit: 'g' },
      { name: 'Mixed Vegetables', quantity: 200, unit: 'g' },
      { name: 'Sesame Oil', quantity: 15, unit: 'ml' },
    ],
  },
]

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

export function FoodPhotoAI({ onFoodSelected }: FoodPhotoAIProps) {
  const [step, setStep] = useState<'upload' | 'capture' | 'analyzing' | 'result'>('upload')
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [quantity, setQuantity] = useState(100)
  const [mealType, setMealType] = useState<FoodLog['mealType']>('lunch')
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('environment')
  const [stream, setStream] = useState<MediaStream | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Start camera
  const startCamera = useCallback(async () => {
    try {
      setError(null)
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: cameraFacing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
      setStep('capture')
    } catch (err) {
      console.error('Camera error:', err)
      setError('Unable to access camera. Please check permissions or try uploading a photo instead.')
    }
  }, [cameraFacing])

  // Stop camera
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
  }, [stream])

  // Switch camera
  const switchCamera = useCallback(() => {
    stopCamera()
    setCameraFacing(prev => prev === 'user' ? 'environment' : 'user')
  }, [stopCamera])

  // Restart camera when facing changes
  useEffect(() => {
    if (step === 'capture') {
      startCamera()
    }
    return () => {
      stopCamera()
    }
  }, [cameraFacing])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  const analyzeImage = useCallback(async () => {
    setError(null)
    setStep('analyzing')

    try {
      // Simulate AI analysis with realistic delay
      await new Promise((resolve) => setTimeout(resolve, 1500 + Math.random() * 1000))

      // Pick a random food detection result
      const randomResult = FOOD_DETECTIONS[Math.floor(Math.random() * FOOD_DETECTIONS.length)]
      
      setAnalysisResult(randomResult)
      setQuantity(randomResult.estimatedPortion || 100)
      setStep('result')
    } catch {
      setError('Failed to analyze image. Please try again.')
      setStep('upload')
    }
  }, [])

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageSrc = canvas.toDataURL('image/jpeg', 0.8)
        setImage(imageSrc)
        stopCamera()
        analyzeImage()
      }
    }
  }, [analyzeImage, stopCamera])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageSrc = reader.result as string
        setImage(imageSrc)
        analyzeImage()
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

  const handleReset = () => {
    stopCamera()
    setStep('upload')
    setImage(null)
    setAnalysisResult(null)
    setError(null)
  }

  return (
    <div className="space-y-6">
      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />

      {step === 'upload' && (
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Sparkles size={32} className="text-primary" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">
              AI Food Recognition
            </h3>
            <p className="text-foreground-muted">
              Take a photo or upload an image and our AI will identify the food and estimate nutrition
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={startCamera}
              className="p-8 sm:p-12 border-2 border-dashed border-foreground/20 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center space-y-4 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Camera size={32} className="text-primary" />
              </div>
              <div className="text-center">
                <span className="font-semibold block mb-1">Take Photo</span>
                <span className="text-sm text-foreground-muted">Use your camera</span>
              </div>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-8 sm:p-12 border-2 border-dashed border-foreground/20 rounded-2xl hover:border-primary hover:bg-primary/5 transition-all flex flex-col items-center justify-center space-y-4 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Upload size={32} className="text-primary" />
              </div>
              <div className="text-center">
                <span className="font-semibold block mb-1">Upload Photo</span>
                <span className="text-sm text-foreground-muted">From your device</span>
              </div>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            aria-label="Upload food photo"
          />
        </div>
      )}

      {step === 'capture' && (
        <div className="space-y-4">
          <div className="relative aspect-[4/3] bg-black rounded-2xl overflow-hidden">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Camera overlay guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 sm:w-80 sm:h-80 border-2 border-white/50 rounded-2xl" />
            </div>
            {/* Switch camera button */}
            <button
              onClick={switchCamera}
              className="absolute top-4 right-4 p-3 bg-black/50 rounded-xl text-white hover:bg-black/70 transition-colors"
              aria-label="Switch camera"
              title="Switch camera"
            >
              <RotateCcw size={20} />
            </button>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-3 border border-foreground/20 rounded-xl hover:border-foreground/40 transition-colors flex items-center justify-center gap-2"
            >
              <X size={18} />
              Cancel
            </button>
            <button
              onClick={capturePhoto}
              className="flex-1 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Camera size={18} />
              Capture
            </button>
          </div>
        </div>
      )}

      {step === 'analyzing' && (
        <div className="text-center py-12 space-y-6">
          <div className="relative w-24 h-24 mx-auto">
            <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
            <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={32} className="text-primary" />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-display font-semibold mb-2">
              Analyzing your food...
            </h3>
            <p className="text-foreground-muted">
              AI is identifying foods and estimating portions
            </p>
          </div>
          {image && (
            <div className="mt-6 max-w-xs mx-auto rounded-xl overflow-hidden shadow-lg">
              <Image src={image} alt="Captured food" width={320} height={240} className="w-full" />
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
          {/* Image Preview */}
          {image && (
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <Image src={image} alt="Food" width={800} height={400} className="w-full max-h-48 object-cover" />
              <div className="absolute top-3 right-3 px-3 py-1.5 bg-green-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
                <Check size={14} />
                {Math.round(analysisResult.confidence * 100)}% match
              </div>
            </div>
          )}

          {/* Detection Result */}
          <div className="p-5 bg-white rounded-xl border border-foreground/10 shadow-sm space-y-4">
            <div>
              <h3 className="font-display font-bold text-lg">{analysisResult.foodName}</h3>
              <p className="text-sm text-foreground-muted mt-1">
                Estimated portion: {analysisResult.estimatedPortion}g
              </p>
            </div>

            {/* Detected Items */}
            {analysisResult.items && analysisResult.items.length > 0 && (
              <div className="p-3 bg-foreground/5 rounded-xl">
                <p className="text-xs font-medium text-foreground-muted mb-2">Detected Items:</p>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.items.map((item, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-white rounded-lg border border-foreground/10">
                      {item.name} ({item.quantity}{item.unit})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Nutrition */}
            <div className="grid grid-cols-4 gap-3 p-3 bg-foreground/5 rounded-xl">
              <div className="text-center">
                <p className="text-lg font-bold text-primary">{analysisResult.nutrition.calories}</p>
                <p className="text-xs text-foreground-muted">Calories</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-amber-500">{analysisResult.nutrition.protein}g</p>
                <p className="text-xs text-foreground-muted">Protein</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-blue-500">{analysisResult.nutrition.carbs}g</p>
                <p className="text-xs text-foreground-muted">Carbs</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-green-500">{analysisResult.nutrition.fat}g</p>
                <p className="text-xs text-foreground-muted">Fat</p>
              </div>
            </div>

            {/* Quantity Adjustment */}
            <div>
              <label htmlFor="photo-quantity" className="block text-sm font-medium mb-2">Adjust Quantity (g)</label>
              <input
                id="photo-quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 bg-foreground/5 border border-foreground/10 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                min="1"
                aria-label="Quantity in grams"
              />
            </div>

            {/* Meal Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Meal Type</label>
              <div className="grid grid-cols-4 gap-2">
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setMealType(type)}
                    className={`
                      px-3 py-2.5 rounded-xl text-sm font-medium transition-all
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

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleReset}
                className="flex-1 py-3 border border-foreground/20 rounded-xl font-medium hover:bg-foreground/5 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Check size={18} />
                Add to Log
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm text-red-700 font-medium">Camera Error</p>
            <p className="text-sm text-red-600 mt-1">{error}</p>
          </div>
        </div>
      )}
    </div>
  )
}

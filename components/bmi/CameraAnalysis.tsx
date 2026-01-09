'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, ArrowLeft, Loader2, AlertCircle } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'

interface CameraAnalysisProps {
  onAnalysisComplete: (data: any) => void
  userHeight?: number
  userAge?: number
  userGender?: string
}

export function CameraAnalysis({ onAnalysisComplete, userHeight, userAge, userGender }: CameraAnalysisProps) {
  const [step, setStep] = useState<'instructions' | 'capture' | 'analyzing' | 'error'>('instructions')
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const webcamRef = useRef<any>(null)

  const captureImage = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot()
      if (imageSrc) {
        setCapturedImage(imageSrc)
        setStep('analyzing')
        analyzeWithAI(imageSrc)
      }
    }
  }, [])

  const analyzeWithAI = async (imageBase64: string) => {
    setAnalyzing(true)
    setError(null)

    try {
      // Simulate AI analysis - Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock analysis result
      const mockResult = {
        bmi: 24.5,
        category: 'Normal',
        bodyFatEstimate: { low: 18, high: 22 },
        bodyType: 'Mesomorph',
        muscleAssessment: 'Good muscle definition visible',
        nutritionFocus: ['High protein', 'Balanced macros', 'Strength training support'],
        recommendations: [
          'Maintain current caloric intake with focus on quality',
          'Continue strength training routine',
          'Consider adding more omega-3 rich foods',
        ],
        disclaimer: 'This is an AI-generated estimate and should not replace professional medical advice.',
      }

      onAnalysisComplete(mockResult)
    } catch (err) {
      setError('Analysis failed. Please try manual entry.')
      setStep('error')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {step === 'instructions' && (
          <motion.div
            key="instructions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-card border border-border rounded-lg p-8 text-center space-y-6"
          >
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Camera size={32} className="text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold mb-2">AI Body Analysis</h3>
              <p className="text-foreground-muted mb-4">
                Get an instant body composition estimate using AI vision technology
              </p>
            </div>
            <div className="text-left bg-background-elevated rounded-lg p-4 space-y-2 text-sm">
              <p className="font-medium mb-2">How it works:</p>
              <ul className="space-y-1 text-foreground-muted list-disc list-inside">
                <li>Stand in front of a plain background</li>
                <li>Wear form-fitting clothing for best results</li>
                <li>Ensure good lighting</li>
                <li>Your image is analyzed securely and never stored</li>
              </ul>
            </div>
            <button
              onClick={() => setStep('capture')}
              className="px-8 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
            >
              Start Body Scan
            </button>
            <p className="text-xs text-foreground-subtle">
              Your privacy is protected. Images are processed locally and never saved.
            </p>
          </motion.div>
        )}

        {step === 'capture' && (
          <motion.div
            key="capture"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-card border border-border rounded-lg p-6 space-y-4"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setStep('instructions')}
                className="flex items-center space-x-2 text-foreground-muted hover:text-foreground transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back</span>
              </button>
              <h3 className="text-lg font-display font-semibold">Position Yourself</h3>
              <div className="w-20" /> {/* Spacer */}
            </div>

            <div className="relative aspect-[3/4] bg-background-elevated rounded-lg overflow-hidden">
              {/* Webcam would go here - using placeholder for now */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Camera size={48} className="text-foreground-muted mx-auto" />
                  <p className="text-foreground-muted">
                    Camera access required
                    <br />
                    <span className="text-sm">Please allow camera permissions</span>
                  </p>
                </div>
              </div>

              {/* Pose overlay guide */}
              <div className="absolute inset-0 pointer-events-none border-4 border-dashed border-primary/30 rounded-lg m-4" />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setStep('instructions')}
                className="flex-1 px-6 py-3 border border-border rounded-lg hover:border-primary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={captureImage}
                className="flex-1 px-6 py-3 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors"
              >
                Capture
              </button>
            </div>
          </motion.div>
        )}

        {step === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card border border-border rounded-lg p-12 text-center space-y-6"
          >
            {capturedImage && (
              <div className="w-32 h-48 mx-auto rounded-lg overflow-hidden">
                <img src={capturedImage} alt="Captured" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="space-y-4">
              <Loader2 size={48} className="text-primary animate-spin mx-auto" />
              <div>
                <h3 className="text-xl font-display font-semibold mb-2">Analyzing body composition...</h3>
                <p className="text-foreground-muted">
                  Our AI is processing your image to estimate body fat percentage and composition
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-red-500/20 rounded-lg p-8 text-center space-y-4"
          >
            <AlertCircle size={48} className="text-red-500 mx-auto" />
            <div>
              <h3 className="text-xl font-display font-semibold mb-2">Analysis Failed</h3>
              <p className="text-foreground-muted mb-4">{error || 'Something went wrong'}</p>
            </div>
            <button
              onClick={() => setStep('instructions')}
              className="px-6 py-3 bg-primary text-background rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

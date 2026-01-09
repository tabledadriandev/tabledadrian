'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Camera } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { BMICalculator } from '@/components/bmi/BMICalculator'
import { CameraAnalysis } from '@/components/bmi/CameraAnalysis'
import { BMIGauge } from '@/components/bmi/BMIGauge'
import { BMIResults } from '@/components/bmi/BMIResults'

export default function BMIPage() {
  const [mode, setMode] = useState<'manual' | 'camera'>('manual')
  const [result, setResult] = useState<any>(null)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Calculator size={32} className="text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
              Health & Wellness Calculator
            </h1>
            <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
              Calculate your BMI and receive personalized dietary recommendations 
              from Chef Adrian's nutrition expertise.
            </p>
          </motion.div>

          {/* Mode Toggle */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center space-x-4 mb-8"
          >
            <button
              onClick={() => setMode('manual')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                mode === 'manual'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-foreground/10 text-foreground-muted hover:border-foreground/20'
              }`}
            >
              <Calculator size={18} />
              <span>Manual Entry</span>
            </button>
            <button
              onClick={() => setMode('camera')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${
                mode === 'camera'
                  ? 'bg-primary text-white'
                  : 'bg-white border border-foreground/10 text-foreground-muted hover:border-foreground/20'
              }`}
            >
              <Camera size={18} />
              <span>AI Body Scan</span>
            </button>
          </motion.div>

          {/* Calculator or Camera */}
          {mode === 'manual' ? (
            <BMICalculator onResult={(data) => setResult(data)} />
          ) : (
            <CameraAnalysis onAnalysisComplete={(data) => setResult(data)} />
          )}

          {/* Results Display */}
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 space-y-8"
            >
              <BMIGauge bmi={result.bmi} category={result.category} />
              <BMIResults bmi={result.bmi} category={result.category} />
              
              {result.disclaimer && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-sm text-yellow-400">
                  <p>{result.disclaimer}</p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

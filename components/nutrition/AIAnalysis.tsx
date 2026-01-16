'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, AlertTriangle, Lightbulb } from 'lucide-react'
import { useNutritionStore } from '@/lib/stores/nutrition-store'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts'
import { fadeInUp } from '@/lib/animations'

export function AIAnalysis() {
  const profile = useNutritionStore((state) => state.profile)
  const foodLogs = useNutritionStore((state) => state.foodLogs)
  const dailyCalories = useNutritionStore((state) => state.dailyCalories)
  const dailyMacros = useNutritionStore((state) => state.dailyMacros)
  interface AnalysisData {
    feedback: Array<{ type: string; message: string; icon: string }>
    warnings: Array<{ type: string; message: string; severity: string }>
    suggestions: Array<{ type: string; message: string; icon: string }>
    macroBalance: { protein: number; carbs: number; fat: number }
    micronutrients: Array<{ name: string; amount: number; unit: string; status: string }>
  }

  const [analysis, setAnalysis] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(false)

  const analyzeNutrition = useCallback(async () => {
    setLoading(true)
    
    // Simulate AI analysis - In production, call your backend API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const today = new Date().toISOString().split('T')[0]
    const todayLogs = foodLogs.filter(
      (log) => new Date(log.timestamp).toISOString().split('T')[0] === today
    )

    const totalSodium = todayLogs.reduce((sum, log) => sum + (log.sodium || 0), 0)
    const totalFiber = todayLogs.reduce((sum, log) => sum + (log.fiber || 0), 0)
    const totalSugar = todayLogs.reduce((sum, log) => sum + (log.sugar || 0), 0)

    // Generate personalized feedback based on profile
    const feedback: Array<{ type: string; message: string; icon: string }> = []
    const warnings: Array<{ type: string; message: string; severity: string }> = []
    const suggestions: Array<{ type: string; message: string; icon: string }> = []

    if (!profile) {
      setLoading(false)
      return
    }

    // Check goals
    if (profile.goals.includes('lose-weight') && dailyCalories > 2000) {
      warnings.push({
        type: 'calories',
        message: `You've consumed ${dailyCalories} calories today. For weight loss, aim for 1500-1800 cal.`,
        severity: 'medium',
      })
    }

    if (profile.goals.includes('gain-muscle') && dailyMacros.protein < 100) {
      suggestions.push({
        type: 'protein',
        message: 'Add more protein! Aim for 120-150g daily for muscle gain. Try adding chicken, fish, or Greek yogurt.',
        icon: '💪',
      })
    }

    // Check health conditions
    if (profile.healthConditions.includes('hypertension') && totalSodium > 2000) {
      warnings.push({
        type: 'sodium',
        message: `High sodium intake (${Math.round(totalSodium)}mg). You're at ${Math.round((totalSodium / 2300) * 100)}% of daily limit for blood pressure management.`,
        severity: 'high',
      })
    }

    if (profile.healthConditions.includes('diabetes') && totalSugar > 50) {
      warnings.push({
        type: 'sugar',
        message: `Sugar intake is ${Math.round(totalSugar)}g. For diabetes management, aim for <30g daily.`,
        severity: 'high',
      })
    }

    // Positive feedback
    if (dailyMacros.protein >= 80 && profile.goals.includes('gain-muscle')) {
      feedback.push({
        type: 'protein',
        message: 'Excellent protein intake! Perfect for muscle building.',
        icon: '✅',
      })
    }

    if (totalFiber >= 25) {
      feedback.push({
        type: 'fiber',
        message: 'Great fiber intake! This supports digestion and heart health.',
        icon: '✅',
      })
    }

    // Macro balance
    const proteinPercent = (dailyMacros.protein * 4 / dailyCalories) * 100
    const carbsPercent = (dailyMacros.carbs * 4 / dailyCalories) * 100
    const fatPercent = (dailyMacros.fat * 9 / dailyCalories) * 100

    if (proteinPercent < 15) {
      suggestions.push({
        type: 'balance',
        message: 'Increase protein to 20-30% of calories for better satiety and muscle maintenance.',
        icon: '💡',
      })
    }

    setAnalysis({
      feedback,
      warnings,
      suggestions,
      macroBalance: {
        protein: proteinPercent,
        carbs: carbsPercent,
        fat: fatPercent,
      },
      micronutrients: [
        { name: 'Vitamin A', amount: 85, unit: 'IU', status: 'good' },
        { name: 'Vitamin C', amount: 120, unit: 'mg', status: 'excellent' },
        { name: 'Vitamin D', amount: 45, unit: 'IU', status: 'low' },
        { name: 'Iron', amount: 75, unit: 'mg', status: 'good' },
        { name: 'Calcium', amount: 90, unit: 'mg', status: 'good' },
      ],
    })

    setLoading(false)
  }, [foodLogs, profile, dailyCalories, dailyMacros])

  useEffect(() => {
    if (foodLogs.length > 0 && profile) {
      analyzeNutrition()
    }
  }, [foodLogs, profile, analyzeNutrition])

  const macroData = analysis
    ? [
        { name: 'Protein', value: analysis.macroBalance.protein, color: '#F59E0B' },
        { name: 'Carbs', value: analysis.macroBalance.carbs, color: '#3B82F6' },
        { name: 'Fat', value: analysis.macroBalance.fat, color: '#10B981' },
      ]
    : []

  const vitaminData = [
    { name: 'Vitamin A', value: 85, goal: 100 },
    { name: 'Vitamin C', value: 120, goal: 100 },
    { name: 'Vitamin D', value: 45, goal: 100 },
    { name: 'Iron', value: 75, goal: 100 },
    { name: 'Calcium', value: 90, goal: 100 },
  ]

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-foreground-muted">Analyzing your nutrition...</p>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="text-center py-12 text-foreground-muted">
        Log some foods to see personalized AI analysis
      </div>
    )
  }

  return (
    <motion.div variants={fadeInUp} className="space-y-6">
      {/* Macro Balance Chart */}
      <div className="bg-white border border-foreground/10 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-display font-semibold mb-4">Macro Balance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={macroData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {macroData.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2">
            {macroData.map((macro) => (
              <div key={macro.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: macro.color }}
                  />
                  <span className="text-sm">{macro.name}</span>
                </div>
                <span className="font-semibold">{macro.value.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Positive Feedback */}
      {analysis.feedback.length > 0 && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle2 className="text-green-500" size={20} />
            <h4 className="font-semibold text-green-400">Great Choices!</h4>
          </div>
          {analysis.feedback.map((item) => (
            <p key={item.type} className="text-sm text-green-300">
              {item.icon} {item.message}
            </p>
          ))}
        </div>
      )}

      {/* Warnings */}
      {analysis.warnings.length > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="text-yellow-500" size={20} />
            <h4 className="font-semibold text-yellow-400">Heads Up</h4>
          </div>
          {analysis.warnings.map((item) => (
            <p key={item.type} className="text-sm text-yellow-300">
              {item.message}
            </p>
          ))}
        </div>
      )}

      {/* Suggestions */}
      {analysis.suggestions.length > 0 && (
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 space-y-2">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="text-blue-500" size={20} />
            <h4 className="font-semibold text-blue-400">Suggestions</h4>
          </div>
          {analysis.suggestions.map((item) => (
            <p key={item.type} className="text-sm text-blue-300">
              {item.icon} {item.message}
            </p>
          ))}
        </div>
      )}

      {/* Vitamins & Minerals */}
      <div className="bg-white border border-foreground/10 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-display font-semibold mb-4">Vitamins & Minerals</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={vitaminData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#3B82F6" name="Current" />
            <Bar dataKey="goal" fill="#10B981" name="Goal" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

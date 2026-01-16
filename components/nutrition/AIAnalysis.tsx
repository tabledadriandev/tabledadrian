'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  Flame,
  Zap,
  Moon,
  Sun,
  Droplets,
  Brain,
  Shield,
  Activity
} from 'lucide-react'
import { useNutritionStore } from '@/lib/stores/nutrition-store'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { fadeInUp } from '@/lib/animations'

interface LongevityAnalysis {
  longevityScore: number
  inflammationScore: number
  omega3to6Ratio: number
  glycemicLoadAvg: number
  micronutrientScores: {
    vitaminD: number
    magnesium: number
    omega3: number
    zinc: number
    b12: number
    selenium: number
  }
  feedback: Array<{ type: string; message: string; icon: 'check' | 'alert' | 'tip' }>
  warnings: Array<{ type: string; message: string; severity: 'low' | 'medium' | 'high' }>
  suggestions: Array<{ type: string; message: string; priority: number }>
  macroBalance: { protein: number; carbs: number; fat: number }
  fastingInsight: {
    lastMealTime: string | null
    hoursElapsed: number
    autophagy: boolean
    recommendation: string
  }
  circadianScore: number
}

export function AIAnalysis() {
  const profile = useNutritionStore((state) => state.profile)
  const foodLogs = useNutritionStore((state) => state.foodLogs)
  const dailyCalories = useNutritionStore((state) => state.dailyCalories)
  const dailyMacros = useNutritionStore((state) => state.dailyMacros)

  const [analysis, setAnalysis] = useState<LongevityAnalysis | null>(null)
  const [loading, setLoading] = useState(false)

  const analyzeNutrition = useCallback(async () => {
    setLoading(true)
    
    // Simulate AI analysis processing
    await new Promise((resolve) => setTimeout(resolve, 800))

    const today = new Date().toISOString().split('T')[0]
    const todayLogs = foodLogs.filter(
      (log) => new Date(log.timestamp).toISOString().split('T')[0] === today
    )

    // Calculate totals from logs
    const totalSodium = todayLogs.reduce((sum, log) => sum + (log.sodium || 0), 0)
    const totalFiber = todayLogs.reduce((sum, log) => sum + (log.fiber || 0), 0)
    const totalSugar = todayLogs.reduce((sum, log) => sum + (log.sugar || 0), 0)

    // Generate personalized longevity feedback
    const feedback: Array<{ type: string; message: string; icon: 'check' | 'alert' | 'tip' }> = []
    const warnings: Array<{ type: string; message: string; severity: 'low' | 'medium' | 'high' }> = []
    const suggestions: Array<{ type: string; message: string; priority: number }> = []

    if (!profile) {
      setLoading(false)
      return
    }

    // Calculate inflammation score based on food choices (-10 to +10)
    let inflammationScore = 0
    todayLogs.forEach(() => {
      // Simplified: assume average anti-inflammatory diet
      inflammationScore -= 1
    })
    inflammationScore = Math.max(-10, Math.min(10, inflammationScore))

    // Estimate omega-3 to omega-6 ratio (optimal is 1:3 or better)
    const estimatedOmega3 = todayLogs.length * 200 // Rough estimate
    const estimatedOmega6 = todayLogs.length * 800
    const omega3to6Ratio = estimatedOmega6 > 0 ? estimatedOmega3 / estimatedOmega6 : 0

    // Calculate glycemic load average
    const glycemicLoadAvg = dailyCalories > 0 ? (totalSugar / dailyCalories) * 100 : 0

    // Micronutrient scoring (0-100 based on RDA)
    const micronutrientScores = {
      vitaminD: Math.min(100, todayLogs.length * 15), // Simplified
      magnesium: Math.min(100, (dailyMacros.protein * 2)),
      omega3: Math.min(100, omega3to6Ratio * 300),
      zinc: Math.min(100, dailyMacros.protein * 2),
      b12: Math.min(100, todayLogs.length * 20),
      selenium: Math.min(100, dailyMacros.protein * 3),
    }

    // Calculate overall longevity score (0-100)
    const avgMicronutrient = Object.values(micronutrientScores).reduce((a, b) => a + b, 0) / 6
    const inflammationBonus = inflammationScore <= -5 ? 20 : inflammationScore <= 0 ? 10 : 0
    const fiberBonus = totalFiber >= 25 ? 15 : totalFiber >= 15 ? 8 : 0
    const proteinScore = dailyMacros.protein >= 80 ? 15 : dailyMacros.protein >= 50 ? 10 : 5
    
    const longevityScore = Math.min(100, Math.round(
      (avgMicronutrient * 0.4) + inflammationBonus + fiberBonus + proteinScore
    ))

    // Fasting analysis
    const lastLog = todayLogs.length > 0 
      ? todayLogs[todayLogs.length - 1]
      : null
    const lastMealTime = lastLog ? new Date(lastLog.timestamp) : null
    const hoursElapsed = lastMealTime 
      ? (Date.now() - lastMealTime.getTime()) / (1000 * 60 * 60)
      : 0

    const fastingInsight = {
      lastMealTime: lastMealTime ? lastMealTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : null,
      hoursElapsed: Math.round(hoursElapsed * 10) / 10,
      autophagy: hoursElapsed >= 16,
      recommendation: hoursElapsed >= 16 
        ? 'Excellent! You are in the autophagy window. Cellular cleanup is active.'
        : hoursElapsed >= 12 
          ? 'Good progress. Continue fasting for autophagy activation.'
          : 'Consider extending your fasting window for longevity benefits.'
    }

    // Circadian score based on meal timing
    const mealTimes = todayLogs.map(log => new Date(log.timestamp).getHours())
    const earlyMeals = mealTimes.filter(h => h >= 7 && h <= 9).length
    const lateMeals = mealTimes.filter(h => h >= 20).length
    const circadianScore = Math.max(0, 100 - (lateMeals * 20) + (earlyMeals * 10))

    // Generate longevity-focused feedback
    if (longevityScore >= 80) {
      feedback.push({
        type: 'longevity',
        message: 'Outstanding! Your nutrition today strongly supports longevity and cellular health.',
        icon: 'check'
      })
    }

    if (inflammationScore <= -5) {
      feedback.push({
        type: 'inflammation',
        message: 'Anti-inflammatory balance achieved. Your food choices support reduced chronic inflammation.',
        icon: 'check'
      })
    }

    if (totalFiber >= 25) {
      feedback.push({
        type: 'fiber',
        message: 'Excellent fiber intake. This supports gut microbiome diversity and metabolic health.',
        icon: 'check'
      })
    }

    if (dailyMacros.protein >= 80 && profile.goals.includes('gain-muscle')) {
      feedback.push({
        type: 'protein',
        message: 'Strong protein intake for muscle preservation and longevity.',
        icon: 'check'
      })
    }

    // Warnings based on health conditions
    if (profile.healthConditions.includes('hypertension') && totalSodium > 2000) {
      warnings.push({
        type: 'sodium',
        message: `Sodium intake is ${Math.round(totalSodium)}mg. For cardiovascular longevity, aim for less than 2000mg daily.`,
        severity: 'high'
      })
    }

    if (profile.healthConditions.includes('diabetes') && totalSugar > 50) {
      warnings.push({
        type: 'sugar',
        message: `Sugar intake is ${Math.round(totalSugar)}g. For metabolic health and longevity, maintain below 30g daily.`,
        severity: 'high'
      })
    }

    if (glycemicLoadAvg > 15) {
      warnings.push({
        type: 'glycemic',
        message: 'High glycemic load detected. Consider lower-GI alternatives for better blood sugar stability.',
        severity: 'medium'
      })
    }

    if (lateMeals > 0) {
      warnings.push({
        type: 'circadian',
        message: 'Late evening eating detected. This may disrupt circadian rhythm and metabolic health.',
        severity: 'medium'
      })
    }

    // Longevity suggestions
    if (micronutrientScores.vitaminD < 50) {
      suggestions.push({
        type: 'vitaminD',
        message: 'Vitamin D is crucial for longevity. Add fatty fish (salmon, sardines) or consider morning sunlight exposure.',
        priority: 1
      })
    }

    if (micronutrientScores.magnesium < 60) {
      suggestions.push({
        type: 'magnesium',
        message: 'Magnesium supports 300+ enzymatic reactions. Add dark chocolate, almonds, or spinach.',
        priority: 2
      })
    }

    if (omega3to6Ratio < 0.25) {
      suggestions.push({
        type: 'omega',
        message: 'Optimize omega-3 to omega-6 ratio for reduced inflammation. Prioritize wild salmon, sardines, and walnuts.',
        priority: 1
      })
    }

    if (totalFiber < 25) {
      suggestions.push({
        type: 'fiber',
        message: 'Increase fiber for gut health and longevity. Add vegetables, legumes, and chia seeds.',
        priority: 2
      })
    }

    if (!todayLogs.some(log => log.foodName.toLowerCase().includes('broccoli') || log.foodName.toLowerCase().includes('cruciferous'))) {
      suggestions.push({
        type: 'sulforaphane',
        message: 'Add cruciferous vegetables (broccoli, broccoli sprouts) for sulforaphane and NRF2 pathway activation.',
        priority: 3
      })
    }

    // Macro balance
    const totalMacroCalories = (dailyMacros.protein * 4) + (dailyMacros.carbs * 4) + (dailyMacros.fat * 9)
    const proteinPercent = totalMacroCalories > 0 ? (dailyMacros.protein * 4 / totalMacroCalories) * 100 : 25
    const carbsPercent = totalMacroCalories > 0 ? (dailyMacros.carbs * 4 / totalMacroCalories) * 100 : 45
    const fatPercent = totalMacroCalories > 0 ? (dailyMacros.fat * 9 / totalMacroCalories) * 100 : 30

    setAnalysis({
      longevityScore,
      inflammationScore,
      omega3to6Ratio,
      glycemicLoadAvg,
      micronutrientScores,
      feedback,
      warnings,
      suggestions: suggestions.sort((a, b) => a.priority - b.priority),
      macroBalance: {
        protein: proteinPercent,
        carbs: carbsPercent,
        fat: fatPercent,
      },
      fastingInsight,
      circadianScore,
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

  const micronutrientData = analysis
    ? [
        { name: 'Vit D', value: analysis.micronutrientScores.vitaminD, goal: 100 },
        { name: 'Mag', value: analysis.micronutrientScores.magnesium, goal: 100 },
        { name: 'Omega-3', value: analysis.micronutrientScores.omega3, goal: 100 },
        { name: 'Zinc', value: analysis.micronutrientScores.zinc, goal: 100 },
        { name: 'B12', value: analysis.micronutrientScores.b12, goal: 100 },
        { name: 'Selenium', value: analysis.micronutrientScores.selenium, goal: 100 },
      ]
    : []

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-foreground-muted font-body">Analyzing your longevity nutrition...</p>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="bg-white border border-foreground/10 rounded-xl p-8 shadow-sm text-center">
        <Brain size={48} className="mx-auto mb-4 text-foreground-muted" />
        <h3 className="font-display font-semibold text-lg mb-2">AI Longevity Analysis</h3>
        <p className="text-foreground-muted font-body">
          Log some foods to receive personalized longevity insights and biohacking recommendations.
        </p>
      </div>
    )
  }

  const getLongevityScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-yellow-500'
    if (score >= 40) return 'text-orange-500'
    return 'text-red-500'
  }

  const getLongevityScoreLabel = (score: number) => {
    if (score >= 80) return 'Optimal'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Needs Improvement'
  }

  return (
    <motion.div variants={fadeInUp} className="space-y-6">
      {/* Longevity Score Card */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-xl">Longevity Score</h3>
            <p className="text-sm text-foreground-muted">Today's healthspan optimization</p>
          </div>
          <div className="text-right">
            <p className={`text-4xl font-display font-bold ${getLongevityScoreColor(analysis.longevityScore)}`}>
              {analysis.longevityScore}
            </p>
            <p className="text-sm text-foreground-muted">{getLongevityScoreLabel(analysis.longevityScore)}</p>
          </div>
        </div>
        
        {/* Score Progress Bar */}
        <div className="h-3 bg-white rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-500"
            initial={{ width: 0 }}
            animate={{ width: `${analysis.longevityScore}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Flame size={16} className={analysis.inflammationScore <= -3 ? 'text-green-500' : 'text-orange-500'} />
            </div>
            <p className="text-xs text-foreground-muted">Inflammation</p>
            <p className="font-bold">{analysis.inflammationScore > 0 ? '+' : ''}{analysis.inflammationScore}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Droplets size={16} className={analysis.omega3to6Ratio >= 0.25 ? 'text-blue-500' : 'text-orange-500'} />
            </div>
            <p className="text-xs text-foreground-muted">O3:O6 Ratio</p>
            <p className="font-bold">1:{Math.round(1/analysis.omega3to6Ratio) || '?'}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Zap size={16} className={analysis.glycemicLoadAvg <= 10 ? 'text-green-500' : 'text-yellow-500'} />
            </div>
            <p className="text-xs text-foreground-muted">Glycemic Load</p>
            <p className="font-bold">{analysis.glycemicLoadAvg.toFixed(1)}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Sun size={16} className={analysis.circadianScore >= 70 ? 'text-yellow-500' : 'text-gray-400'} />
            </div>
            <p className="text-xs text-foreground-muted">Circadian</p>
            <p className="font-bold">{analysis.circadianScore}%</p>
          </div>
        </div>
      </div>

      {/* Fasting & Autophagy Card */}
      <div className="bg-white border border-foreground/10 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Moon size={20} className="text-indigo-500" />
          <h3 className="font-display font-semibold text-lg">Fasting & Autophagy</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-foreground-muted mb-1">Last Meal</p>
            <p className="font-bold text-lg">
              {analysis.fastingInsight.lastMealTime || 'No meals logged'}
            </p>
          </div>
          <div>
            <p className="text-sm text-foreground-muted mb-1">Fasting Duration</p>
            <p className="font-bold text-lg">
              {analysis.fastingInsight.hoursElapsed.toFixed(1)} hours
            </p>
          </div>
        </div>
        <div className={`mt-4 p-3 rounded-lg ${analysis.fastingInsight.autophagy ? 'bg-green-50' : 'bg-amber-50'}`}>
          <div className="flex items-center gap-2 mb-1">
            {analysis.fastingInsight.autophagy ? (
              <Shield size={16} className="text-green-600" />
            ) : (
              <Activity size={16} className="text-amber-600" />
            )}
            <span className={`font-medium text-sm ${analysis.fastingInsight.autophagy ? 'text-green-700' : 'text-amber-700'}`}>
              {analysis.fastingInsight.autophagy ? 'Autophagy Active' : 'Building Towards Autophagy'}
            </span>
          </div>
          <p className={`text-sm ${analysis.fastingInsight.autophagy ? 'text-green-600' : 'text-amber-600'}`}>
            {analysis.fastingInsight.recommendation}
          </p>
        </div>
      </div>

      {/* Macro Balance & Micronutrients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Macro Balance Chart */}
        <div className="bg-white border border-foreground/10 rounded-xl p-6 shadow-sm">
          <h3 className="font-display font-semibold text-lg mb-4">Macro Balance</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={120} height={120}>
              <PieChart>
                <Pie
                  data={macroData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={55}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {macroData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {macroData.map((macro) => (
                <div key={macro.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: macro.color }}
                    />
                    <span className="text-sm">{macro.name}</span>
                  </div>
                  <span className="font-semibold">{macro.value.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Micronutrients Chart */}
        <div className="bg-white border border-foreground/10 rounded-xl p-6 shadow-sm">
          <h3 className="font-display font-semibold text-lg mb-4">Key Micronutrients</h3>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={micronutrientData} layout="vertical">
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis type="category" dataKey="name" width={60} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#3B82F6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Positive Feedback */}
      {analysis.feedback.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="text-green-600" size={20} />
            <h4 className="font-display font-semibold text-green-800">Longevity Wins</h4>
          </div>
          <div className="space-y-2">
            {analysis.feedback.map((item, index) => (
              <p key={index} className="text-sm text-green-700 flex items-start gap-2">
                <CheckCircle2 size={14} className="mt-0.5 flex-shrink-0" />
                {item.message}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Warnings */}
      {analysis.warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-amber-600" size={20} />
            <h4 className="font-display font-semibold text-amber-800">Health Alerts</h4>
          </div>
          <div className="space-y-2">
            {analysis.warnings.map((item, index) => (
              <p key={index} className="text-sm text-amber-700 flex items-start gap-2">
                <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                {item.message}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Longevity Suggestions */}
      {analysis.suggestions.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="text-blue-600" size={20} />
            <h4 className="font-display font-semibold text-blue-800">Longevity Optimization</h4>
          </div>
          <div className="space-y-2">
            {analysis.suggestions.map((item, index) => (
              <p key={index} className="text-sm text-blue-700 flex items-start gap-2">
                <Lightbulb size={14} className="mt-0.5 flex-shrink-0" />
                {item.message}
              </p>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

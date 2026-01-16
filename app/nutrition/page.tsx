'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Target, 
  Droplet, 
  Apple, 
  Clock, 
  Zap,
  Sunrise,
  Sun,
  Moon,
  Coffee,
  Leaf,
  Activity,
  Flame
} from 'lucide-react'
import { OnboardingQuestionnaire } from '@/components/nutrition/OnboardingQuestionnaire'
import { FoodLogger } from '@/components/nutrition/FoodLogger'
import { AIAnalysis } from '@/components/nutrition/AIAnalysis'
import { Recommendations } from '@/components/nutrition/Recommendations'
import { Achievements } from '@/components/nutrition/Achievements'
import { useNutritionStore } from '@/lib/stores/nutrition-store'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { formatDate } from '@/lib/utils'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

export default function NutritionCoachPage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const profile = useNutritionStore((state) => state.profile)
  const foodLogs = useNutritionStore((state) => state.foodLogs)
  const dailyCalories = useNutritionStore((state) => state.dailyCalories)
  const dailyMacros = useNutritionStore((state) => state.dailyMacros)
  const currentStreak = useNutritionStore((state) => state.currentStreak)

  useEffect(() => {
    if (!profile) {
      setShowOnboarding(true)
    }
  }, [profile])

  const today = new Date().toISOString().split('T')[0]
  const todayLogs = foodLogs.filter(
    (log) => new Date(log.timestamp).toISOString().split('T')[0] === today
  )

  const macroData = [
    { name: 'Protein', value: dailyMacros.protein, color: '#F59E0B' },
    { name: 'Carbs', value: dailyMacros.carbs, color: '#3B82F6' },
    { name: 'Fat', value: dailyMacros.fat, color: '#10B981' },
  ]

  // Calculate additional metrics
  const totalFiber = todayLogs.reduce((sum, log) => sum + (log.fiber || 0), 0)
  const totalSugar = todayLogs.reduce((sum, log) => sum + (log.sugar || 0), 0)
  const totalSodium = todayLogs.reduce((sum, log) => sum + (log.sodium || 0), 0)
  const caloriesRemaining = Math.max(0, 2000 - dailyCalories)
  const caloriesPercentage = Math.min(100, (dailyCalories / 2000) * 100)

  // Meal breakdown
  const mealBreakdown = {
    breakfast: todayLogs.filter(log => log.mealType === 'breakfast'),
    lunch: todayLogs.filter(log => log.mealType === 'lunch'),
    dinner: todayLogs.filter(log => log.mealType === 'dinner'),
    snack: todayLogs.filter(log => log.mealType === 'snack'),
  }

  const mealCalories = {
    breakfast: mealBreakdown.breakfast.reduce((sum, log) => sum + log.calories, 0),
    lunch: mealBreakdown.lunch.reduce((sum, log) => sum + log.calories, 0),
    dinner: mealBreakdown.dinner.reduce((sum, log) => sum + log.calories, 0),
    snack: mealBreakdown.snack.reduce((sum, log) => sum + log.calories, 0),
  }

  // Meal icons mapping
  const mealIcons = {
    breakfast: Sunrise,
    lunch: Sun,
    dinner: Moon,
    snack: Coffee,
  }

  if (showOnboarding) {
    return (
      <OnboardingQuestionnaire
        onComplete={() => {
          setShowOnboarding(false)
        }}
      />
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 mb-4 sm:mb-6">
              <Leaf size={28} className="text-primary sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-3 sm:mb-4">
              Longevity Coach
            </h1>
            <p className="text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto px-4">
              Your personalized nutrition companion for optimal healthspan and wellness
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <motion.div
              variants={fadeInUp}
              className="bg-white border border-foreground/10 rounded-xl p-4 sm:p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-foreground-muted">Calories</span>
                <Target size={18} className="text-primary sm:w-5 sm:h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-display font-bold">{Math.round(dailyCalories)}</p>
              <p className="text-xs text-foreground-muted mt-1">of 2000 goal</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white border border-foreground/10 rounded-xl p-4 sm:p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-foreground-muted">Protein</span>
                <TrendingUp size={18} className="text-primary sm:w-5 sm:h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-display font-bold">{Math.round(dailyMacros.protein)}g</p>
              <p className="text-xs text-foreground-muted mt-1">of 100g goal</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white border border-foreground/10 rounded-xl p-4 sm:p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-foreground-muted">Streak</span>
                <Flame size={18} className="text-orange-500 sm:w-5 sm:h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-display font-bold">{currentStreak}</p>
              <p className="text-xs text-foreground-muted mt-1">days in a row</p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white border border-foreground/10 rounded-xl p-4 sm:p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-foreground-muted">Logged</span>
                <Activity size={18} className="text-green-500 sm:w-5 sm:h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-display font-bold">{todayLogs.length}</p>
              <p className="text-xs text-foreground-muted mt-1">foods today</p>
            </motion.div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Daily Macros Chart */}
            <motion.div
              variants={fadeInUp}
              className="lg:col-span-2 bg-white border border-foreground/10 rounded-xl p-4 sm:p-6 shadow-sm"
            >
              <h2 className="text-lg sm:text-xl font-display font-semibold mb-4 sm:mb-6">Today's Nutrition</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="flex justify-center">
                  <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                      <Pie
                        data={macroData}
                        cx="50%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {macroData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {macroData.map((macro) => (
                    <div key={macro.name} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-3 h-3 sm:w-4 sm:h-4 rounded"
                            style={{ backgroundColor: macro.color }}
                          />
                          <span className="font-medium text-sm sm:text-base">{macro.name}</span>
                        </div>
                        <span className="font-bold text-sm sm:text-base">{macro.value.toFixed(1)}g</span>
                      </div>
                      <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, (macro.value / 100) * 100)}%`,
                            backgroundColor: macro.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calories Progress */}
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-foreground/5 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Zap size={16} className="text-primary sm:w-5 sm:h-5" />
                    <span className="font-medium text-sm sm:text-base">Calories</span>
                  </div>
                  <span className="font-bold text-base sm:text-lg">
                    {Math.round(dailyCalories)} / 2000
                  </span>
                </div>
                <div className="h-2.5 sm:h-3 bg-white rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary/60"
                    initial={{ width: 0 }}
                    animate={{ width: `${caloriesPercentage}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-xs sm:text-sm">
                  <span className="text-foreground-muted">
                    {caloriesRemaining > 0 ? `${Math.round(caloriesRemaining)} remaining` : 'Goal reached'}
                  </span>
                  <span className="text-foreground-muted">
                    {Math.round(caloriesPercentage)}%
                  </span>
                </div>
              </div>

              {/* Additional Nutrients */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-3 sm:p-4 bg-foreground/5 rounded-xl">
                  <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1">
                    <Apple size={14} className="text-green-500 sm:w-4 sm:h-4" />
                    <span className="text-xs text-foreground-muted">Fiber</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold">{totalFiber.toFixed(1)}g</p>
                  <p className="text-xs text-foreground-muted">of 25g goal</p>
                </div>
                <div className="p-3 sm:p-4 bg-foreground/5 rounded-xl">
                  <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1">
                    <Droplet size={14} className="text-blue-500 sm:w-4 sm:h-4" />
                    <span className="text-xs text-foreground-muted">Sugar</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold">{totalSugar.toFixed(1)}g</p>
                  <p className="text-xs text-foreground-muted">of 50g limit</p>
                </div>
                <div className="p-3 sm:p-4 bg-foreground/5 rounded-xl">
                  <div className="flex items-center space-x-1.5 sm:space-x-2 mb-1">
                    <Clock size={14} className="text-orange-500 sm:w-4 sm:h-4" />
                    <span className="text-xs text-foreground-muted">Sodium</span>
                  </div>
                  <p className="text-base sm:text-lg font-bold">{Math.round(totalSodium)}mg</p>
                  <p className="text-xs text-foreground-muted">of 2300mg limit</p>
                </div>
              </div>

              {/* Meal Breakdown */}
              <div className="border-t border-foreground/10 pt-4">
                <h3 className="text-xs sm:text-sm font-semibold mb-3 text-foreground-muted">Meal Breakdown</h3>
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {[
                    { label: 'Breakfast', calories: mealCalories.breakfast, key: 'breakfast' as const },
                    { label: 'Lunch', calories: mealCalories.lunch, key: 'lunch' as const },
                    { label: 'Dinner', calories: mealCalories.dinner, key: 'dinner' as const },
                    { label: 'Snacks', calories: mealCalories.snack, key: 'snack' as const },
                  ].map((meal) => {
                    const Icon = mealIcons[meal.key]
                    return (
                      <div key={meal.label} className="text-center p-2 sm:p-3 bg-foreground/5 rounded-xl">
                        <div className="flex justify-center mb-1">
                          <Icon size={18} className="text-primary sm:w-5 sm:h-5" />
                        </div>
                        <p className="text-xs text-foreground-muted mb-0.5 sm:mb-1">{meal.label}</p>
                        <p className="text-xs sm:text-sm font-bold">{Math.round(meal.calories)}</p>
                        <p className="text-xs text-foreground-muted">cal</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div variants={fadeInUp}>
              <Achievements />
            </motion.div>
          </div>

          {/* AI Analysis */}
          <motion.div variants={fadeInUp} className="mb-6 sm:mb-8">
            <AIAnalysis />
          </motion.div>

          {/* Recommendations */}
          <motion.div variants={fadeInUp} className="mb-6 sm:mb-8">
            <div className="bg-white border border-foreground/10 rounded-xl p-4 sm:p-6 shadow-sm">
              <h2 className="text-lg sm:text-xl font-display font-semibold mb-4">
                Personalized Recommendations
              </h2>
              <Recommendations />
            </div>
          </motion.div>

          {/* Today's Food Log */}
          <motion.div variants={fadeInUp}>
            <div className="bg-white border border-foreground/10 rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-display font-semibold">
                  Today's Food Log
                </h2>
                <span className="text-xs sm:text-sm text-foreground-muted">
                  {formatDate(new Date())}
                </span>
              </div>
              {todayLogs.length === 0 ? (
                <div className="text-center py-8 sm:py-12 text-foreground-muted">
                  <Activity size={40} className="mx-auto mb-3 sm:mb-4 opacity-50" />
                  <p className="mb-2 text-sm sm:text-base">No foods logged today</p>
                  <p className="text-xs sm:text-sm">Tap the search button to start tracking</p>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {todayLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 sm:p-4 bg-foreground/5 rounded-xl flex items-center justify-between"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm sm:text-base truncate">{log.foodName}</p>
                        <p className="text-xs sm:text-sm text-foreground-muted">
                          {log.quantity} {log.unit} · {log.mealType}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-3">
                        <p className="font-semibold text-sm sm:text-base">{Math.round(log.calories)} cal</p>
                        <p className="text-xs text-foreground-muted">
                          P: {log.protein.toFixed(0)}g · C: {log.carbs.toFixed(0)}g · F: {log.fat.toFixed(0)}g
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Food Logger Button */}
      <FoodLogger />
    </div>
  )
}

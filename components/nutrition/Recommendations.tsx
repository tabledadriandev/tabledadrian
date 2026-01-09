'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Utensils, Heart, Zap } from 'lucide-react'
import { useNutritionStore } from '@/lib/stores/nutrition-store'
import { fadeInUp } from '@/lib/animations'

interface Recommendation {
  type: 'eat-more' | 'avoid' | 'meal-suggestion' | 'activity'
  title: string
  description: string
  icon: any
  foods?: string[]
  reason: string
}

export function Recommendations() {
  const profile = useNutritionStore((state) => state.profile)
  const foodLogs = useNutritionStore((state) => state.foodLogs)
  const dailyMacros = useNutritionStore((state) => state.dailyMacros)
  const dailyCalories = useNutritionStore((state) => state.dailyCalories)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  useEffect(() => {
    if (profile) {
      generateRecommendations()
    }
  }, [profile, foodLogs, dailyMacros, dailyCalories])

  const generateRecommendations = () => {
    const recs: Recommendation[] = []

    // Foods to eat more of based on goals
    if (profile?.goals.includes('gain-muscle')) {
      recs.push({
        type: 'eat-more',
        title: 'High-Protein Foods',
        description: 'Boost your protein intake for muscle building',
        icon: TrendingUp,
        foods: ['Chicken Breast', 'Salmon', 'Greek Yogurt', 'Eggs', 'Quinoa'],
        reason: 'You need 120-150g protein daily for optimal muscle growth',
      })
    }

    if (profile?.goals.includes('heart-health')) {
      recs.push({
        type: 'eat-more',
        title: 'Heart-Healthy Foods',
        description: 'Rich in omega-3s and antioxidants',
        icon: Heart,
        foods: ['Salmon', 'Avocado', 'Nuts', 'Olive Oil', 'Dark Leafy Greens'],
        reason: 'These foods support cardiovascular health',
      })
    }

    if (profile?.goals.includes('boost-energy')) {
      recs.push({
        type: 'eat-more',
        title: 'Energy-Boosting Foods',
        description: 'Sustained energy without crashes',
        icon: Zap,
        foods: ['Oatmeal', 'Bananas', 'Sweet Potatoes', 'Nuts', 'Dark Chocolate'],
        reason: 'Complex carbs and healthy fats provide steady energy',
      })
    }

    // Foods to avoid based on conditions
    if (profile?.healthConditions.includes('hypertension')) {
      recs.push({
        type: 'avoid',
        title: 'High-Sodium Foods',
        description: 'Limit these to manage blood pressure',
        icon: TrendingDown,
        foods: ['Processed Meats', 'Canned Soups', 'Fast Food', 'Salted Snacks'],
        reason: 'Keep sodium under 2000mg daily for blood pressure control',
      })
    }

    if (profile?.healthConditions.includes('diabetes')) {
      recs.push({
        type: 'avoid',
        title: 'High-Sugar Foods',
        description: 'Avoid blood sugar spikes',
        icon: TrendingDown,
        foods: ['Soda', 'Candy', 'White Bread', 'Pastries', 'Fruit Juice'],
        reason: 'Limit added sugars to <30g daily for blood sugar management',
      })
    }

    if (profile?.allergies.length > 0 && !profile.allergies.includes('none')) {
      recs.push({
        type: 'avoid',
        title: 'Allergens to Avoid',
        description: 'Based on your allergy profile',
        icon: TrendingDown,
        foods: profile.allergies.map((a) => a.charAt(0).toUpperCase() + a.slice(1)),
        reason: 'Important to avoid these allergens for your safety',
      })
    }

    // Meal suggestions
    const today = new Date().toISOString().split('T')[0]
    const todayLogs = foodLogs.filter(
      (log) => new Date(log.timestamp).toISOString().split('T')[0] === today
    )
    const hasBreakfast = todayLogs.some((log) => log.mealType === 'breakfast')
    const hasLunch = todayLogs.some((log) => log.mealType === 'lunch')
    const hasDinner = todayLogs.some((log) => log.mealType === 'dinner')

    if (!hasBreakfast) {
      recs.push({
        type: 'meal-suggestion',
        title: 'Breakfast Suggestion',
        description: 'Start your day right',
        icon: Utensils,
        foods: ['Greek Yogurt with Berries', 'Oatmeal with Nuts', 'Scrambled Eggs with Avocado'],
        reason: 'A protein-rich breakfast helps maintain energy and reduces cravings',
      })
    }

    if (!hasLunch && new Date().getHours() >= 12) {
      recs.push({
        type: 'meal-suggestion',
        title: 'Lunch Suggestion',
        description: 'Balanced midday meal',
        icon: Utensils,
        foods: ['Grilled Chicken Salad', 'Quinoa Bowl with Vegetables', 'Salmon with Sweet Potato'],
        reason: 'A balanced lunch with protein and complex carbs sustains energy',
      })
    }

    if (!hasDinner && new Date().getHours() >= 18) {
      recs.push({
        type: 'meal-suggestion',
        title: 'Dinner Suggestion',
        description: 'Nutritious evening meal',
        icon: Utensils,
        foods: ['Baked Salmon with Vegetables', 'Lean Protein with Quinoa', 'Stir-fry with Brown Rice'],
        reason: 'A lighter dinner supports better sleep and digestion',
      })
    }

    // Activity suggestions
    if (dailyCalories > 2000 && profile?.goals.includes('lose-weight')) {
      recs.push({
        type: 'activity',
        title: 'Activity Suggestion',
        description: 'Balance your calorie intake',
        icon: Zap,
        foods: ['30-minute walk', '20-minute HIIT workout', 'Yoga session'],
        reason: `You've consumed ${dailyCalories} calories. A 30-minute walk would burn ~150 calories.`,
      })
    }

    setRecommendations(recs)
  }

  if (!profile) {
    return (
      <div className="text-center py-12 text-foreground-muted">
        Complete your nutrition profile to see personalized recommendations
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12 text-foreground-muted">
        No recommendations at this time
      </div>
    )
  }

  return (
    <motion.div variants={fadeInUp} className="space-y-4">
      {recommendations.map((rec, index) => {
        const Icon = rec.icon
        const isPositive = rec.type === 'eat-more' || rec.type === 'meal-suggestion' || rec.type === 'activity'
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`
              p-6 rounded-xl border-2
              ${isPositive
                ? 'bg-green-500/10 border-green-500/20'
                : 'bg-red-500/10 border-red-500/20'
              }
            `}
          >
            <div className="flex items-start space-x-4">
              <div className={`
                p-3 rounded-lg
                ${isPositive ? 'bg-green-500/20' : 'bg-red-500/20'}
              `}>
                <Icon
                  size={24}
                  className={isPositive ? 'text-green-400' : 'text-red-400'}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{rec.title}</h3>
                <p className="text-sm text-foreground-muted mb-3">
                  {rec.description}
                </p>
                {rec.foods && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {rec.foods.map((food, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white border border-foreground/10 rounded-lg text-sm"
                      >
                        {food}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-foreground-subtle italic">
                  💡 {rec.reason}
                </p>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

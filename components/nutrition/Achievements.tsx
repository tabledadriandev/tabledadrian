'use client'

import { motion } from 'framer-motion'
import { Trophy, Flame, Target, Star, Award } from 'lucide-react'
import { useNutritionStore } from '@/lib/stores/nutrition-store'
import { fadeInUp } from '@/lib/animations'

const ACHIEVEMENT_DEFINITIONS = [
  {
    id: 'first-log',
    name: 'First Steps',
    description: 'Log your first food',
    icon: Star,
    condition: (logs: number) => logs >= 1,
  },
  {
    id: 'streak-3',
    name: 'Getting Started',
    description: '3-day logging streak',
    icon: Flame,
    condition: (streak: number) => streak >= 3,
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    description: '7-day logging streak',
    icon: Trophy,
    condition: (streak: number) => streak >= 7,
  },
  {
    id: 'streak-30',
    name: 'Monthly Master',
    description: '30-day logging streak',
    icon: Award,
    condition: (streak: number) => streak >= 30,
  },
  {
    id: 'protein-goal',
    name: 'Protein Power',
    description: 'Hit protein goal 5 days',
    icon: Target,
    condition: (proteinDays: number) => proteinDays >= 5,
  },
]

export function Achievements() {
  const foodLogs = useNutritionStore((state) => state.foodLogs)
  const currentStreak = useNutritionStore((state) => state.currentStreak)
  const achievements = useNutritionStore((state) => state.achievements)

  // Calculate achievements
  const unlockedAchievements = ACHIEVEMENT_DEFINITIONS.filter((def) => {
    const unlocked = achievements.find((a) => a.id === def.id)
    if (unlocked) return true

    if (def.id === 'first-log') {
      return def.condition(foodLogs.length)
    }
    if (def.id.startsWith('streak-')) {
      return def.condition(currentStreak)
    }
    // Add more conditions as needed
    return false
  })

  const lockedAchievements = ACHIEVEMENT_DEFINITIONS.filter(
    (def) => !unlockedAchievements.includes(def)
  )

  return (
    <motion.div variants={fadeInUp} className="space-y-6">
      <div>
        <h3 className="text-lg font-display font-semibold mb-4">Achievements</h3>
        
        {unlockedAchievements.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-foreground-muted mb-3">Unlocked</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {unlockedAchievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 rounded-xl text-center"
                  >
                    <Icon size={32} className="text-primary mx-auto mb-2" />
                    <p className="font-semibold text-sm">{achievement.name}</p>
                    <p className="text-xs text-foreground-muted mt-1">
                      {achievement.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

        {lockedAchievements.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-foreground-muted mb-3">Locked</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {lockedAchievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={achievement.id}
                    className="p-4 bg-background-elevated border border-border rounded-xl text-center opacity-50"
                  >
                    <Icon size={32} className="text-foreground-muted mx-auto mb-2" />
                    <p className="font-semibold text-sm">{achievement.name}</p>
                    <p className="text-xs text-foreground-muted mt-1">
                      {achievement.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {unlockedAchievements.length === 0 && lockedAchievements.length === 0 && (
          <div className="text-center py-8 text-foreground-muted">
            No achievements available yet
          </div>
        )}
      </div>

      {/* Streak Display */}
      <div className="bg-white border border-foreground/10 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground-muted mb-1">Current Streak</p>
            <p className="text-3xl font-bold text-primary">{currentStreak}</p>
            <p className="text-xs text-foreground-subtle mt-1">days in a row</p>
          </div>
          <div className="text-right">
            <Flame size={48} className="text-primary/50" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

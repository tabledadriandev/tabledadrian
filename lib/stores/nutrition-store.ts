import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface NutritionProfile {
  goals: string[]
  healthConditions: string[]
  allergies: string[]
  intolerances: string[]
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
  lifestyle: string[]
  foodPreferences: string[]
  foodDislikes: string[]
  dietaryRestrictions: string[]
  createdAt?: string
  updatedAt?: string
}

export interface FoodLog {
  id: string
  foodId?: string
  foodName: string
  quantity: number
  unit: string
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  sugar?: number
  sodium?: number
  vitamins?: Record<string, number>
  minerals?: Record<string, number>
  timestamp: string
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  photoUrl?: string
  barcode?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: string
  category: 'streak' | 'nutrition' | 'logging' | 'milestone'
}

export interface NutritionState {
  profile: NutritionProfile | null
  foodLogs: FoodLog[]
  achievements: Achievement[]
  currentStreak: number
  longestStreak: number
  lastLogDate: string | null
  dailyCalories: number
  dailyMacros: {
    protein: number
    carbs: number
    fat: number
  }
  setProfile: (profile: NutritionProfile) => void
  addFoodLog: (log: FoodLog) => void
  removeFoodLog: (logId: string) => void
  addAchievement: (achievement: Achievement) => void
  updateStreak: () => void
  resetDailyStats: () => void
  clearAll: () => void
}

export const useNutritionStore = create<NutritionState>()(
  persist(
    (set) => ({
      profile: null,
      foodLogs: [],
      achievements: [],
      currentStreak: 0,
      longestStreak: 0,
      lastLogDate: null,
      dailyCalories: 0,
      dailyMacros: {
        protein: 0,
        carbs: 0,
        fat: 0,
      },

      setProfile: (profile) => set({ profile }),

      addFoodLog: (log) => {
        const today = new Date().toISOString().split('T')[0]
        const logDate = new Date(log.timestamp).toISOString().split('T')[0]
        
        set((state) => {
          const newLogs = [...state.foodLogs, log]
          const todayLogs = newLogs.filter(
            (l) => new Date(l.timestamp).toISOString().split('T')[0] === today
          )
          
          const dailyCalories = todayLogs.reduce((sum, l) => sum + l.calories, 0)
          const dailyMacros = todayLogs.reduce(
            (acc, l) => ({
              protein: acc.protein + l.protein,
              carbs: acc.carbs + l.carbs,
              fat: acc.fat + l.fat,
            }),
            { protein: 0, carbs: 0, fat: 0 }
          )

          // Update streak
          let newStreak = state.currentStreak
          let newLongestStreak = state.longestStreak
          
          if (logDate === today) {
            if (state.lastLogDate) {
              const lastDate = new Date(state.lastLogDate)
              const todayDate = new Date()
              const daysDiff = Math.floor(
                (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
              )
              
              if (daysDiff === 1) {
                newStreak = state.currentStreak + 1
                newLongestStreak = Math.max(newLongestStreak, newStreak)
              } else if (daysDiff > 1) {
                newStreak = 1
              }
            } else {
              newStreak = 1
            }
          }

          return {
            foodLogs: newLogs,
            dailyCalories,
            dailyMacros,
            currentStreak: newStreak,
            longestStreak: newLongestStreak,
            lastLogDate: logDate,
          }
        })
      },

      removeFoodLog: (logId) => {
        const today = new Date().toISOString().split('T')[0]
        
        set((state) => {
          const newLogs = state.foodLogs.filter((l) => l.id !== logId)
          const todayLogs = newLogs.filter(
            (l) => new Date(l.timestamp).toISOString().split('T')[0] === today
          )
          
          const dailyCalories = todayLogs.reduce((sum, l) => sum + l.calories, 0)
          const dailyMacros = todayLogs.reduce(
            (acc, l) => ({
              protein: acc.protein + l.protein,
              carbs: acc.carbs + l.carbs,
              fat: acc.fat + l.fat,
            }),
            { protein: 0, carbs: 0, fat: 0 }
          )

          return {
            foodLogs: newLogs,
            dailyCalories,
            dailyMacros,
          }
        })
      },

      addAchievement: (achievement) => {
        set((state) => ({
          achievements: [...state.achievements, achievement],
        }))
      },

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0]
        set((state) => {
          if (state.lastLogDate === today) {
            return state
          }
          
          const lastDate = state.lastLogDate
            ? new Date(state.lastLogDate)
            : null
          const todayDate = new Date()
          
          if (lastDate) {
            const daysDiff = Math.floor(
              (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
            )
            
            if (daysDiff === 1) {
              const newStreak = state.currentStreak + 1
              return {
                currentStreak: newStreak,
                longestStreak: Math.max(state.longestStreak, newStreak),
                lastLogDate: today,
              }
            } else if (daysDiff > 1) {
              return {
                currentStreak: 1,
                lastLogDate: today,
              }
            }
          }
          
          return state
        })
      },

      resetDailyStats: () => {
        set({
          dailyCalories: 0,
          dailyMacros: { protein: 0, carbs: 0, fat: 0 },
        })
      },

      clearAll: () => {
        set({
          profile: null,
          foodLogs: [],
          achievements: [],
          currentStreak: 0,
          longestStreak: 0,
          lastLogDate: null,
          dailyCalories: 0,
          dailyMacros: { protein: 0, carbs: 0, fat: 0 },
        })
      },
    }),
    {
      name: 'nutrition-storage',
    }
  )
)

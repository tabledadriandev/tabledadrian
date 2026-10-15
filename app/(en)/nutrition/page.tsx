'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Target,
  TrendingUp,
  Flame,
  Activity,
  Zap,
  Apple,
  Droplet,
  Clock,
  Sunrise,
  Sun,
  Moon,
  Coffee,
} from 'lucide-react'
import { FoodLogger } from '@/components/nutrition/FoodLogger'
import { DemoBanner } from '@/components/app/DemoBanner'
import { DemoLock } from '@/components/app/DemoLock'
import { AppDownloadSection } from '@/components/app/AppDownloadSection'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useNutritionStore } from '@/lib/stores/nutrition-store'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { formatDate } from '@/lib/utils'

const mealIcons = {
  breakfast: Sunrise,
  lunch: Sun,
  dinner: Moon,
  snack: Coffee,
}

export default function NutritionCoachPage() {
  const [loggerOpen, setLoggerOpen] = useState(false)
  const foodLogs = useNutritionStore((state) => state.foodLogs)
  const dailyCalories = useNutritionStore((state) => state.dailyCalories)
  const dailyMacros = useNutritionStore((state) => state.dailyMacros)
  const currentStreak = useNutritionStore((state) => state.currentStreak)

  const today = new Date().toISOString().split('T')[0]
  const todayLogs = foodLogs.filter(
    (log) => new Date(log.timestamp).toISOString().split('T')[0] === today
  )

  const totalFiber = todayLogs.reduce((sum, log) => sum + (log.fiber || 0), 0)
  const totalSugar = todayLogs.reduce((sum, log) => sum + (log.sugar || 0), 0)
  const totalSodium = todayLogs.reduce((sum, log) => sum + (log.sodium || 0), 0)
  const caloriesRemaining = Math.max(0, 2000 - dailyCalories)
  const caloriesPercentage = Math.min(100, (dailyCalories / 2000) * 100)

  const mealCalories = {
    breakfast: todayLogs.filter((l) => l.mealType === 'breakfast').reduce((s, l) => s + l.calories, 0),
    lunch: todayLogs.filter((l) => l.mealType === 'lunch').reduce((s, l) => s + l.calories, 0),
    dinner: todayLogs.filter((l) => l.mealType === 'dinner').reduce((s, l) => s + l.calories, 0),
    snack: todayLogs.filter((l) => l.mealType === 'snack').reduce((s, l) => s + l.calories, 0),
  }

  const macros = [
    { name: 'Protein', value: dailyMacros.protein, goal: 100, color: 'bg-primary' },
    { name: 'Carbs', value: dailyMacros.carbs, goal: 250, color: 'bg-gold' },
    { name: 'Fat', value: dailyMacros.fat, goal: 70, color: 'bg-ink' },
  ]

  return (
    <>
      <div className="bg-background pb-8 pt-28 sm:pt-32">
        <div className="container max-w-6xl">
          <DemoBanner label="This is a preview of the Longevity Coach" />

          <SectionHeading
            as="h1"
            eyebrow="Wellness · Demo"
            title={
              <>
                Longevity Coach
              </>
            }
            description="Log a meal, see your macros, get a feel for the product. Photo logging, a personal longevity score and chef-matched recipes live in the app."
            className="mt-10"
            animate={false}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-12"
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
              {[
                { label: 'Calories', value: Math.round(dailyCalories), hint: 'of 2000', icon: Target },
                { label: 'Protein', value: `${Math.round(dailyMacros.protein)}g`, hint: 'of 100g', icon: TrendingUp },
                { label: 'Streak', value: currentStreak, hint: 'days in a row', icon: Flame },
                { label: 'Logged', value: todayLogs.length, hint: 'foods today', icon: Activity },
              ].map((stat) => (
                <motion.div key={stat.label} variants={fadeInUp} className="surface p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground-muted sm:text-sm">{stat.label}</span>
                    <stat.icon size={16} className="text-primary" />
                  </div>
                  <p className="mt-2 font-display text-2xl sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-foreground-subtle">{stat.hint}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3 lg:gap-6">
              <motion.div variants={fadeInUp} className="surface p-5 sm:p-7 lg:col-span-2">
                <h2 className="font-display text-2xl">Today&apos;s nutrition</h2>

                <div className="mt-6 space-y-4">
                  {macros.map((macro) => (
                    <div key={macro.name}>
                      <div className="mb-1.5 flex items-center justify-between text-sm">
                        <span className="font-medium">{macro.name}</span>
                        <span className="text-foreground-muted">
                          {macro.value.toFixed(0)}g / {macro.goal}g
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-border">
                        <div
                          className={`h-full ${macro.color}`}
                          style={{ width: `${Math.min(100, (macro.value / macro.goal) * 100)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-background-secondary p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-sm font-medium">
                      <Zap size={16} className="text-primary" />
                      Calories
                    </span>
                    <span className="font-display text-xl">{Math.round(dailyCalories)} / 2000</span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-card">
                    <div className="h-full bg-primary" style={{ width: `${caloriesPercentage}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-foreground-muted">
                    {caloriesRemaining > 0
                      ? `${Math.round(caloriesRemaining)} remaining`
                      : 'Daily goal reached'}
                  </p>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { icon: Apple, label: 'Fiber', value: `${totalFiber.toFixed(1)}g`, hint: 'of 25g' },
                    { icon: Droplet, label: 'Sugar', value: `${totalSugar.toFixed(1)}g`, hint: 'of 50g' },
                    { icon: Clock, label: 'Sodium', value: `${Math.round(totalSodium)}mg`, hint: 'of 2300mg' },
                  ].map((n) => (
                    <div key={n.label} className="rounded-2xl bg-background-secondary p-3 sm:p-4">
                      <n.icon size={14} className="text-primary" />
                      <p className="mt-2 text-xs text-foreground-subtle">{n.label}</p>
                      <p className="font-display text-lg">{n.value}</p>
                      <p className="text-[11px] text-foreground-subtle">{n.hint}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-4 gap-2 border-t border-border pt-5">
                  {(
                    [
                      ['Breakfast', mealCalories.breakfast, 'breakfast'],
                      ['Lunch', mealCalories.lunch, 'lunch'],
                      ['Dinner', mealCalories.dinner, 'dinner'],
                      ['Snacks', mealCalories.snack, 'snack'],
                    ] as const
                  ).map(([label, calories, key]) => {
                    const Icon = mealIcons[key]
                    return (
                      <div key={label} className="rounded-2xl bg-background-secondary p-2 text-center sm:p-3">
                        <Icon size={16} className="mx-auto text-primary" />
                        <p className="mt-1 text-[11px] text-foreground-subtle">{label}</p>
                        <p className="text-sm font-medium">{Math.round(calories)}</p>
                      </div>
                    )
                  })}
                </div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <DemoLock feature="Longevity score & insights">
                  <div className="surface h-full min-h-[320px] p-6">
                    <p className="text-[11px] uppercase tracking-caps text-foreground-subtle">Score</p>
                    <p className="mt-2 font-display text-6xl">82</p>
                    <p className="mt-3 text-sm text-foreground-muted">
                      Excellent omega balance. Add leafy greens at dinner and keep the evening meal earlier.
                    </p>
                    <ul className="mt-6 space-y-3 text-sm">
                      <li className="rounded-xl bg-background-secondary px-4 py-3">Anti-inflammatory day</li>
                      <li className="rounded-xl bg-background-secondary px-4 py-3">Glycemic load: moderate</li>
                      <li className="rounded-xl bg-background-secondary px-4 py-3">Micronutrient gaps: K, Mg</li>
                    </ul>
                  </div>
                </DemoLock>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="surface mt-6 p-5 sm:p-7">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-display text-2xl">Today&apos;s food log</h2>
                  <p className="mt-1 text-sm text-foreground-muted">{formatDate(new Date())}</p>
                </div>
                <button
                  onClick={() => setLoggerOpen(true)}
                  className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-ink-foreground transition-colors hover:bg-ink-soft"
                >
                  Log a meal
                </button>
              </div>

              {todayLogs.length === 0 ? (
                <div className="mt-8 rounded-2xl bg-background-secondary px-6 py-12 text-center">
                  <Activity size={32} className="mx-auto text-foreground-subtle" />
                  <p className="mt-3 text-sm text-foreground-muted">Nothing logged yet in this demo.</p>
                  <p className="mt-1 text-xs text-foreground-subtle">
                    Search or quick-add a food to see the dashboard move.
                  </p>
                </div>
              ) : (
                <ul className="mt-6 space-y-2">
                  {todayLogs.map((log) => (
                    <li
                      key={log.id}
                      className="flex items-center justify-between rounded-2xl bg-background-secondary px-4 py-3"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium">{log.foodName}</p>
                        <p className="text-xs capitalize text-foreground-muted">
                          {log.quantity} {log.unit} · {log.mealType}
                        </p>
                      </div>
                      <div className="ml-4 shrink-0 text-right">
                        <p className="text-sm font-medium">{Math.round(log.calories)} kcal</p>
                        <p className="text-xs text-foreground-subtle">
                          P {log.protein.toFixed(0)} · C {log.carbs.toFixed(0)} · F {log.fat.toFixed(0)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-6">
              <DemoLock feature="Photo & barcode logging" blur="md">
                <div className="surface grid gap-4 p-6 sm:grid-cols-2">
                  <div className="rounded-2xl bg-background-secondary p-8 text-center">
                    <p className="font-display text-2xl">Snap a plate</p>
                    <p className="mt-2 text-sm text-foreground-muted">AI identifies the dish and logs macros.</p>
                  </div>
                  <div className="rounded-2xl bg-background-secondary p-8 text-center">
                    <p className="font-display text-2xl">Scan a barcode</p>
                    <p className="mt-2 text-sm text-foreground-muted">Packaged foods, instantly counted.</p>
                  </div>
                </div>
              </DemoLock>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <FoodLogger demo open={loggerOpen} onOpenChange={setLoggerOpen} />
      <AppDownloadSection />
    </>
  )
}

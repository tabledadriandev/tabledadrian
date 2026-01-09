'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, Heart, Activity, Utensils, X, CheckCircle2, 
  ArrowRight, ArrowLeft, Sparkles 
} from 'lucide-react'
import { useNutritionStore, NutritionProfile } from '@/lib/stores/nutrition-store'
import { fadeInUp, staggerContainer } from '@/lib/animations'

interface Question {
  id: string
  title: string
  subtitle: string
  icon: any
  type: 'multi-select' | 'single-select' | 'text'
  options?: { label: string; value: string; icon?: string }[]
  field: keyof NutritionProfile
}

const QUESTIONS: Question[] = [
  {
    id: 'goals',
    title: 'What are your primary goals?',
    subtitle: 'Select all that apply',
    icon: Target,
    type: 'multi-select',
    options: [
      { label: 'Lose Weight', value: 'lose-weight' },
      { label: 'Gain Muscle', value: 'gain-muscle' },
      { label: 'Boost Energy', value: 'boost-energy' },
      { label: 'Improve Longevity', value: 'longevity' },
      { label: 'Better Digestion', value: 'digestion' },
      { label: 'Heart Health', value: 'heart-health' },
      { label: 'Mental Clarity', value: 'mental-clarity' },
      { label: 'Athletic Performance', value: 'athletic-performance' },
    ],
    field: 'goals',
  },
  {
    id: 'health-conditions',
    title: 'Any health conditions to consider?',
    subtitle: 'This helps us personalize your recommendations',
    icon: Heart,
    type: 'multi-select',
    options: [
      { label: 'Diabetes', value: 'diabetes' },
      { label: 'Heart Disease', value: 'heart-disease' },
      { label: 'High Blood Pressure', value: 'hypertension' },
      { label: 'IBS', value: 'ibs' },
      { label: 'Kidney Disease', value: 'kidney-disease' },
      { label: 'Autoimmune', value: 'autoimmune' },
      { label: 'PCOS', value: 'pcos' },
      { label: 'None', value: 'none' },
    ],
    field: 'healthConditions',
  },
  {
    id: 'activity-level',
    title: 'How active are you?',
    subtitle: 'This affects your calorie needs',
    icon: Activity,
    type: 'single-select',
    options: [
      { label: 'Sedentary (little/no exercise)', value: 'sedentary' },
      { label: 'Light (1-3 days/week)', value: 'light' },
      { label: 'Moderate (3-5 days/week)', value: 'moderate' },
      { label: 'Active (6-7 days/week)', value: 'active' },
      { label: 'Very Active (2x/day or intense)', value: 'very-active' },
    ],
    field: 'activityLevel',
  },
  {
    id: 'allergies',
    title: 'Food Allergies?',
    subtitle: 'Select all that apply',
    icon: X,
    type: 'multi-select',
    options: [
      { label: 'Peanuts', value: 'peanuts' },
      { label: 'Tree Nuts', value: 'tree-nuts' },
      { label: 'Shellfish', value: 'shellfish' },
      { label: 'Fish', value: 'fish' },
      { label: 'Eggs', value: 'eggs' },
      { label: 'Dairy', value: 'dairy' },
      { label: 'Soy', value: 'soy' },
      { label: 'Wheat', value: 'wheat' },
      { label: 'None', value: 'none' },
    ],
    field: 'allergies',
  },
  {
    id: 'intolerances',
    title: 'Food Intolerances?',
    subtitle: 'Select all that apply',
    icon: X,
    type: 'multi-select',
    options: [
      { label: 'Lactose', value: 'lactose' },
      { label: 'Gluten', value: 'gluten' },
      { label: 'FODMAP', value: 'fodmap' },
      { label: 'Histamine', value: 'histamine' },
      { label: 'None', value: 'none' },
    ],
    field: 'intolerances',
  },
  {
    id: 'preferences',
    title: 'Food Preferences',
    subtitle: 'What do you love to eat?',
    icon: Utensils,
    type: 'multi-select',
    options: [
      { label: 'Mediterranean', value: 'mediterranean' },
      { label: 'Asian', value: 'asian' },
      { label: 'Mexican', value: 'mexican' },
      { label: 'Italian', value: 'italian' },
      { label: 'Vegetarian', value: 'vegetarian' },
      { label: 'Vegan', value: 'vegan' },
      { label: 'Keto', value: 'keto' },
      { label: 'Paleo', value: 'paleo' },
      { label: 'Raw Foods', value: 'raw' },
    ],
    field: 'foodPreferences',
  },
  {
    id: 'dislikes',
    title: 'Food Dislikes',
    subtitle: 'What would you rather avoid?',
    icon: X,
    type: 'multi-select',
    options: [
      { label: 'Spicy Foods', value: 'spicy' },
      { label: 'Seafood', value: 'seafood' },
      { label: 'Mushrooms', value: 'mushrooms' },
      { label: 'Olives', value: 'olives' },
      { label: 'Cilantro', value: 'cilantro' },
      { label: 'None', value: 'none' },
    ],
    field: 'foodDislikes',
  },
]

interface OnboardingQuestionnaireProps {
  onComplete: () => void
}

export function OnboardingQuestionnaire({ onComplete }: OnboardingQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<NutritionProfile>>({
    goals: [],
    healthConditions: [],
    allergies: [],
    intolerances: [],
    foodPreferences: [],
    foodDislikes: [],
    dietaryRestrictions: [],
    lifestyle: [],
  })
  const setProfile = useNutritionStore((state) => state.setProfile)

  const currentQuestion = QUESTIONS[currentStep]
  const progress = ((currentStep + 1) / QUESTIONS.length) * 100
  const isLastStep = currentStep === QUESTIONS.length - 1

  const handleSelect = (value: string) => {
    const field = currentQuestion.field
    
    if (currentQuestion.type === 'single-select') {
      setAnswers((prev) => ({
        ...prev,
        [field]: value,
      }))
    } else {
      const currentValues = (answers[field] as string[]) || []
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
      
      // Handle "None" option - if selected, clear others
      if (value === 'none') {
        setAnswers((prev) => ({
          ...prev,
          [field]: ['none'],
        }))
      } else {
        setAnswers((prev) => ({
          ...prev,
          [field]: newValues.filter((v) => v !== 'none'),
        }))
      }
    }
  }

  const handleNext = () => {
    if (isLastStep) {
      // Complete onboarding
      const profile: NutritionProfile = {
        goals: (answers.goals as string[]) || [],
        healthConditions: (answers.healthConditions as string[]) || [],
        allergies: (answers.allergies as string[]) || [],
        intolerances: (answers.intolerances as string[]) || [],
        activityLevel: (answers.activityLevel as NutritionProfile['activityLevel']) || 'moderate',
        lifestyle: (answers.lifestyle as string[]) || [],
        foodPreferences: (answers.foodPreferences as string[]) || [],
        foodDislikes: (answers.foodDislikes as string[]) || [],
        dietaryRestrictions: (answers.dietaryRestrictions as string[]) || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      setProfile(profile)
      onComplete()
    } else {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  const currentValues = answers[currentQuestion.field] as string[] | string | undefined
  const isSelected = (value: string) => {
    if (currentQuestion.type === 'single-select') {
      return currentValues === value
    }
    return (currentValues as string[])?.includes(value)
  }

  const canProceed = () => {
    if (currentQuestion.type === 'single-select') {
      return !!currentValues
    }
    return Array.isArray(currentValues) && currentValues.length > 0
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-24 sm:pt-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="w-full max-w-2xl"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-foreground-muted">
              Step {currentStep + 1} of {QUESTIONS.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-foreground/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-primary/60"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white border border-foreground/10 rounded-xl p-8 shadow-xl"
          >
            {/* Question Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4"
              >
                <currentQuestion.icon size={32} className="text-primary" />
              </motion.div>
              <h2 className="text-3xl font-display font-bold mb-2">
                {currentQuestion.title}
              </h2>
              <p className="text-foreground-muted">{currentQuestion.subtitle}</p>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {currentQuestion.options?.map((option, index) => {
                const selected = isSelected(option.value)
                
                return (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSelect(option.value)}
                    className={`
                      relative p-4 rounded-xl border-2 transition-all text-left
                      ${selected
                        ? 'border-primary bg-primary/10 text-foreground'
                        : 'border-foreground/10 bg-foreground/5 text-foreground-muted hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                      {selected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                        >
                          <CheckCircle2 size={16} className="text-background" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all
                  ${currentStep === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-foreground/5'
                  }
                `}
              >
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={`
                  flex items-center space-x-2 px-8 py-3 rounded-xl font-medium transition-all
                  ${canProceed()
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'opacity-50 cursor-not-allowed bg-foreground/5'
                  }
                `}
              >
                <span>{isLastStep ? 'Complete' : 'Next'}</span>
                {isLastStep ? (
                  <Sparkles size={18} />
                ) : (
                  <ArrowRight size={18} />
                )}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

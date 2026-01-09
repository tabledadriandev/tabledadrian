'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, ChefHat, CheckCircle } from 'lucide-react'
import { Recipe } from '@/data/recipes'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { NutritionFacts } from './NutritionFacts'

interface RecipeDetailProps {
  recipe: Recipe
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const [servingMultiplier, setServingMultiplier] = useState(1)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Hero Image */}
          <motion.div
            variants={fadeInUp}
            className="aspect-video bg-foreground/5 rounded-xl overflow-hidden mb-8"
          >
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent-burgundy/20 flex items-center justify-center">
              <span className="text-foreground-muted">{recipe.title}</span>
            </div>
          </motion.div>

          {/* Title & Meta */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-display font-bold">{recipe.title}</h1>
            <p className="text-lg text-foreground-muted">{recipe.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock size={16} />
                <span>Prep: {recipe.prepTime} min | Cook: {recipe.cookTime} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={16} />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="flex items-center space-x-2">
                <ChefHat size={16} />
                <span className="capitalize">{recipe.difficulty}</span>
              </div>
            </div>
          </motion.div>

          {/* Ingredients */}
          <motion.div variants={fadeInUp} className="bg-white border border-foreground/10 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-display font-semibold">Ingredients</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-foreground-muted">Servings:</span>
                <select
                  value={servingMultiplier}
                  onChange={(e) => setServingMultiplier(Number(e.target.value))}
                  className="px-3 py-1 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value={1}>1x</option>
                  <option value={2}>2x</option>
                  <option value={4}>4x</option>
                </select>
              </div>
            </div>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground-muted">
                    {(ingredient.amount * servingMultiplier).toFixed(1)} {ingredient.unit} {ingredient.item}
                    {ingredient.notes && (
                      <span className="text-foreground-subtle text-sm"> ({ingredient.notes})</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Instructions */}
          <motion.div variants={fadeInUp} className="bg-white border border-foreground/10 rounded-xl p-6 shadow-sm">
            <h2 className="text-2xl font-display font-semibold mb-6">Instructions</h2>
            <ol className="space-y-6">
              {recipe.instructions.map((instruction) => (
                <li key={instruction.step} className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-semibold">{instruction.step}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground-muted mb-2">{instruction.text}</p>
                    {instruction.duration && (
                      <p className="text-sm text-foreground-subtle">⏱ {instruction.duration} minutes</p>
                    )}
                    {instruction.tip && (
                      <p className="text-sm text-primary mt-1">💡 Tip: {instruction.tip}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </motion.div>

          {/* Nutrition */}
          <NutritionFacts nutrition={recipe.nutrition} />

          {/* Chef Notes */}
          {recipe.chefNotes && (
            <motion.div variants={fadeInUp} className="bg-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-display font-semibold mb-2 text-primary">Chef's Notes</h3>
              <p className="text-foreground-muted">{recipe.chefNotes}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

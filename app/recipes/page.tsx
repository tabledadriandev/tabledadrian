'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Clock, Users, ChefHat, Filter } from 'lucide-react'
import { recipes } from '@/data/recipes'
import { HealthFilter } from '@/components/recipes/HealthFilter'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [showHealthFilter, setShowHealthFilter] = useState(false)

  const categories = ['all', 'appetizer', 'main', 'dessert', 'healthy', 'quick']
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Health condition filtering
    let matchesHealth = true
    if (selectedConditions.length > 0) {
      matchesHealth = selectedConditions.some((conditionId) => {
        // Recipe is suitable for this condition
        const isSuitable = recipe.suitableFor?.includes(conditionId)
        // Recipe is not explicitly marked as not suitable
        const isNotExcluded = !recipe.notSuitableFor?.includes(conditionId)
        return isSuitable && isNotExcluded
      })
    }
    
    return matchesCategory && matchesSearch && matchesHealth
  })

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4"
          >
            Recipe Collection
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            Curated by Chef Adrian. Explore our exclusive collection of recipes, from signature dishes to healthy meal prep ideas.
          </motion.p>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeInUp}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white border border-foreground/10 text-foreground-muted hover:border-foreground/20'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 max-w-md px-4 py-3 bg-white border border-foreground/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={() => setShowHealthFilter(!showHealthFilter)}
              className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center space-x-2 ${
                showHealthFilter || selectedConditions.length > 0
                  ? 'bg-primary text-white'
                  : 'bg-white border border-foreground/10 text-foreground hover:border-foreground/20'
              }`}
            >
              <Filter size={18} />
              <span>Health Filters</span>
              {selectedConditions.length > 0 && (
                <span className="bg-background/20 text-background px-2 py-0.5 rounded-full text-xs">
                  {selectedConditions.length}
                </span>
              )}
            </button>
          </div>

          {/* Health Filter Panel */}
          {showHealthFilter && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border border-foreground/10 rounded-xl p-6 mt-4 shadow-sm"
            >
              <HealthFilter
                selectedConditions={selectedConditions}
                onConditionsChange={setSelectedConditions}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-center text-foreground-muted">
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
        </div>

        {/* Recipe Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white border border-foreground/10 rounded-xl overflow-hidden hover:border-foreground/20 transition-all shadow-sm hover:shadow-md"
            >
              <Link href={`/recipes/${recipe.slug}`}>
                <div className="aspect-video bg-background-elevated flex items-center justify-center">
                  <span className="text-foreground-muted text-sm">{recipe.title}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-display font-semibold mb-2">{recipe.title}</h3>
                  <p className="text-foreground-muted text-sm mb-4 line-clamp-2">{recipe.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-foreground-subtle">
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{recipe.prepTime + recipe.cookTime} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>{recipe.servings} servings</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ChefHat size={16} />
                      <span className="capitalize">{recipe.difficulty}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

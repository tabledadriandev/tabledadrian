'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Users, ChefHat, Filter } from 'lucide-react'
import { recipes } from '@/data/recipes'
import { HealthFilter } from '@/components/recipes/HealthFilter'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { cn } from '@/lib/utils'

export default function RecipesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedConditions, setSelectedConditions] = useState<string[]>([])
  const [showHealthFilter, setShowHealthFilter] = useState(false)

  const categories = ['all', 'appetizer', 'main', 'dessert', 'healthy', 'quick']
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory
    const matchesSearch =
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())

    let matchesHealth = true
    if (selectedConditions.length > 0) {
      matchesHealth = selectedConditions.some((conditionId) => {
        const isSuitable = recipe.suitableFor?.includes(conditionId)
        const isNotExcluded = !recipe.notSuitableFor?.includes(conditionId)
        return isSuitable && isNotExcluded
      })
    }

    return matchesCategory && matchesSearch && matchesHealth
  })

  return (
    <div className="bg-background pb-20 pt-28 sm:pt-32">
      <div className="container">
        <SectionHeading
          as="h1"
          eyebrow="Kitchen notes"
          title="Recipes from the table"
          description="Dishes Adrian cooks for private clients: seasonal, precise, and written so you can make them at home."
          animate={false}
        />

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="mt-10">
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors',
                  selectedCategory === category
                    ? 'bg-ink text-ink-foreground'
                    : 'border border-border bg-card text-foreground-muted hover:text-foreground'
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-4 flex flex-col items-center justify-center gap-3 md:flex-row"
          >
            <input
              type="search"
              placeholder="Search recipes…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="field max-w-md"
            />
            <button
              onClick={() => setShowHealthFilter(!showHealthFilter)}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium',
                showHealthFilter || selectedConditions.length > 0
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-card text-foreground'
              )}
            >
              <Filter size={16} />
              Health filters
              {selectedConditions.length > 0 && (
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">{selectedConditions.length}</span>
              )}
            </button>
          </motion.div>

          {showHealthFilter && (
            <div className="surface mx-auto mt-4 max-w-3xl p-6">
              <HealthFilter
                selectedConditions={selectedConditions}
                onConditionsChange={setSelectedConditions}
              />
            </div>
          )}
        </motion.div>

        <p className="mb-8 mt-8 text-center text-sm text-foreground-muted">
          {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''}
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe, index) => (
            <motion.article
              key={recipe.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04, duration: 0.5 }}
            >
              <Link href={`/recipes/${recipe.slug}`} className="group surface block overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-background-secondary">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="photo object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-2xl leading-tight group-hover:text-primary">{recipe.title}</h2>
                  <p className="mt-2 line-clamp-2 text-sm text-foreground-muted">{recipe.description}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-foreground-subtle">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={14} /> {recipe.prepTime + recipe.cookTime} min
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users size={14} /> {recipe.servings}
                    </span>
                    <span className="inline-flex items-center gap-1 capitalize">
                      <ChefHat size={14} /> {recipe.difficulty}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

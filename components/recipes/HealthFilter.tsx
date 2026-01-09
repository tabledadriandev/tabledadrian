'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { healthCategories, allConditions } from '@/data/health-conditions'
import { cn } from '@/lib/utils'

interface HealthFilterProps {
  selectedConditions: string[]
  onConditionsChange: (conditions: string[]) => void
}

export function HealthFilter({ selectedConditions, onConditionsChange }: HealthFilterProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCondition = (conditionId: string) => {
    if (selectedConditions.includes(conditionId)) {
      onConditionsChange(selectedConditions.filter((id) => id !== conditionId))
    } else {
      onConditionsChange([...selectedConditions, conditionId])
    }
  }

  const removeCondition = (conditionId: string) => {
    onConditionsChange(selectedConditions.filter((id) => id !== conditionId))
  }

  const getConditionById = (id: string) => allConditions.find((c) => c.id === id)

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {selectedConditions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedConditions.map((conditionId) => {
            const condition = getConditionById(conditionId)
            if (!condition) return null
            return (
              <button
                key={conditionId}
                onClick={() => removeCondition(conditionId)}
                className="flex items-center space-x-2 px-3 py-1.5 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition-colors"
              >
                <span>{condition.name}</span>
                <X size={14} />
              </button>
            )
          })}
          <button
            onClick={() => onConditionsChange([])}
            className="px-3 py-1.5 text-foreground-muted hover:text-foreground text-sm underline"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Category Accordions */}
      <div className="space-y-2">
        {Object.entries(healthCategories).map(([key, category]) => (
          <div key={key} className="border border-foreground/10 rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setExpandedCategory(expandedCategory === key ? null : key)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-foreground/5 transition-colors"
            >
              <span className="font-medium">{category.label}</span>
              <span className={cn(
                'text-primary transition-transform',
                expandedCategory === key && 'rotate-180'
              )}>
                ▼
              </span>
            </button>
            {expandedCategory === key && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-4 py-3 space-y-2 bg-foreground/5"
              >
                {category.conditions.map((condition) => (
                  <button
                    key={condition.id}
                    onClick={() => toggleCondition(condition.id)}
                    className={cn(
                      'w-full text-left px-3 py-2 rounded text-sm transition-colors',
                      selectedConditions.includes(condition.id)
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'hover:bg-background border border-transparent'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{condition.name}</div>
                        <div className="text-xs text-foreground-muted mt-0.5">
                          {condition.description}
                        </div>
                      </div>
                      {condition.severity === 'critical' && (
                        <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded ml-2">
                          Critical
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useId, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import { LineIcon } from '@/components/editorial/ui'
import { copy } from '@/lib/copy'
import { useLocale } from '@/lib/i18n'
import { applyTheme, readThemeChoice, type ThemeChoice } from './theme'

const OPTIONS: { value: ThemeChoice; icon: typeof Sun; mark: 'sun' | 'moon' | 'system' }[] = [
  { value: 'light', icon: Sun, mark: 'sun' },
  { value: 'dark', icon: Moon, mark: 'moon' },
  { value: 'system', icon: Monitor, mark: 'system' },
]

export function ThemeToggle({ variant = 'legacy' }: { variant?: 'legacy' | 'editorial' }) {
  const locale = useLocale()
  const labels = copy[locale].hybrid
  const [choice, setChoice] = useState<ThemeChoice | null>(null)
  const radioName = useId()

  useEffect(() => {
    setChoice(readThemeChoice())
  }, [])

  const names: Record<ThemeChoice, string> = {
    light: labels.themeLight,
    dark: labels.themeDark,
    system: labels.themeSystem,
  }

  if (variant === 'editorial') {
    return (
      <fieldset className="ed-theme">
        <legend className="sr-only">{labels.themeLegend}</legend>
        {OPTIONS.map(({ value, mark }) => {
          const selected = (choice ?? 'system') === value
          return (
            <label key={value} className={selected ? 'is-on' : undefined}>
              <input
                type="radio"
                name={radioName}
                value={value}
                checked={selected}
                onChange={() => {
                  setChoice(value)
                  applyTheme(value)
                }}
              />
              <LineIcon name={mark} size={16} />
              <span>{names[value]}</span>
            </label>
          )
        })}
      </fieldset>
    )
  }

  return (
    <fieldset className="theme-toggle">
      <legend className="sr-only">{labels.themeLegend}</legend>
      {OPTIONS.map(({ value, icon: Icon }) => {
        const selected = (choice ?? 'system') === value
        return (
          <label key={value} className={selected ? 'is-on' : undefined}>
            <input
              type="radio"
              name="tda-theme"
              value={value}
              checked={selected}
              onChange={() => {
                setChoice(value)
                applyTheme(value)
              }}
            />
            <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
            <span className="sr-only">{names[value]}</span>
          </label>
        )
      })}
    </fieldset>
  )
}

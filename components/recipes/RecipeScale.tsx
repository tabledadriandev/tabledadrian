'use client'

import { useMemo, useState, type ReactNode } from 'react'
import { parseIngredients, scaleQuantity, SERVING_OPTIONS } from '@/lib/scale-quantity'

export function RecipeScale({
  lines,
  base,
  locale,
  prep,
  cook,
  intro,
  actions,
  photo,
  method,
}: {
  lines: string[]
  base: number
  locale: 'en' | 'fr'
  prep: number
  cook: number
  intro: string
  actions: ReactNode
  photo: ReactNode
  method: ReactNode
}) {
  const initial = SERVING_OPTIONS.includes(base as (typeof SERVING_OPTIONS)[number]) ? base : 6
  const [serves, setServes] = useState(initial)
  const ratio = serves / (base || serves)
  const groups = useMemo(() => parseIngredients(lines), [lines])
  const fr = locale === 'fr'
  const labels = fr
    ? { serves: 'Pour', prep: 'min préparation', cook: 'min cuisson', people: 'personnes', ingredients: 'Ingrédients', for: 'Pour' }
    : { serves: 'Serves', prep: 'min prep', cook: 'min cook', people: 'serves', ingredients: 'Ingredients', for: 'For' }

  return (
    <>
      <div className="ed-recipe-hero">
        <div>
          <p className="ed-recipe-intro">{intro}</p>
          <div className="ed-recipe-facts">
            <p><strong>{prep}</strong><span>{labels.prep}</span></p>
            <p><strong>{cook}</strong><span>{labels.cook}</span></p>
            <p><strong>{serves}</strong><span>{labels.people}</span></p>
          </div>
          <div className="ed-servings">
            <span>{labels.serves}</span>
            <div role="group" aria-label={labels.serves}>
              {SERVING_OPTIONS.map((option) => (
                <button key={option} type="button" aria-pressed={serves === option} onClick={() => setServes(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>
          {actions}
        </div>
        {photo}
      </div>
      <div className="ed-recipe-body">
        <div className="ed-ingredients">
          <div className="ed-split-head">
            <h2>{labels.ingredients}</h2>
            <p>
              {labels.for} {serves}
            </p>
          </div>
          {groups.map((group) => (
            <div key={group.label || group.rows[0]?.name}>
              {group.label ? <h3>{group.label}</h3> : <span className="ed-rule" />}
              <ul>
                {group.rows.map((row) => {
                  const qty = row.qty ? scaleQuantity(row.qty, ratio) : ''
                  const name = row.qty ? row.name : scaleQuantity(row.name, ratio)
                  return (
                    <li key={`${group.label}-${row.name}`}>
                      <span>{name}</span>
                      <i aria-hidden="true" />
                      {qty ? <span>{qty}</span> : null}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
        {method}
      </div>
    </>
  )
}

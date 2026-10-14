import { DISCLAIMER, OFFER_BOOKS, OFFER_PLANS, PLAN_CREDENTIAL } from '@/lib/offer-copy'
import { LOCALE_PAIRS } from '@/lib/routes'
import { PARTNER_STATS, PLAN_SLOTS, RECIPE_BOOK_SLOTS } from '@/lib/monetisation'
import { libraryRecipes } from '@/lib/library'

const BANNED = /\b(treats?|cures?|improves?|lowers?|balances?|heals?|detox|anti-aging|clinically|reverses|prevents|boosts?)\b/i
const BANNED_FR = /amélior|réduit|abaisse|équilibre|guérit|soigne|\btraite\b/i

describe('offer placeholders', () => {
  it('lists the new paths for hreflang and the sitemap', () => {
    expect(LOCALE_PAIRS).toEqual(expect.arrayContaining([
      ['/shop/recipe-books', '/fr/livres-de-recettes'],
      ['/plans', '/fr/programmes'],
      ['/plans/blood-sugar', '/fr/programmes/glycemie'],
      ['/plans/hormones', '/fr/programmes/hormones'],
      ['/plans/heart', '/fr/programmes/coeur'],
      ['/plans/gut', '/fr/programmes/intestin'],
      ['/plans/training', '/fr/programmes/entrainement'],
      ['/partners', '/fr/partenaires'],
    ]))
  })

  it('leaves book and plan prices empty', () => {
    for (const slot of [...Object.values(RECIPE_BOOK_SLOTS), ...Object.values(PLAN_SLOTS)]) {
      expect(slot.price).toBeNull()
      expect(slot.stripe).toBeNull()
    }
  })

  it('hides partner stats when none are set', () => {
    expect(PARTNER_STATS.filter((item) => item.value.trim())).toHaveLength(0)
  })

  it('links every sample meal and book recipe to the library', () => {
    const slugs = new Set(libraryRecipes.map((recipe) => recipe.slug))
    for (const book of OFFER_BOOKS) {
      book.recipes.forEach((slug) => expect(slugs.has(slug)).toBe(true))
    }
    for (const plan of OFFER_PLANS) {
      plan.meals.forEach((meal) => expect(slugs.has(meal.slug)).toBe(true))
    }
  })

  it('keeps plan copy free of outcome claims and states the disclaimer', () => {
    const blob = JSON.stringify(OFFER_PLANS) + DISCLAIMER.en + DISCLAIMER.fr
    expect(blob).not.toMatch(BANNED)
    expect(blob).not.toMatch(BANNED_FR)
    expect(DISCLAIMER.en).toBe(
      'Not medical advice. Talk to your doctor before changing your diet or training, especially if you have a medical condition or take medication.',
    )
    expect(PLAN_CREDENTIAL).toBe('Nutrition certificate, Stanford')
    expect(blob).not.toMatch(/Swiss-trained|EHL/)
  })
})

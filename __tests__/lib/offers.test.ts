import { DISCLAIMER, OFFER_BOOKS, OFFER_PLANS, PLAN_CREDENTIAL } from '@/lib/offer-copy'
import { LOCALE_PAIRS } from '@/lib/routes'
import { GIFT_CARDS, PARTNER_STATS, PLAN_PRICE, PLAN_SLOTS, PRODUCTS_LIVE, RECIPE_BOOK_SLOTS, BOOK_PRICE } from '@/lib/monetisation'
import { libraryRecipes } from '@/lib/library'

const BANNED = /\b(treats?|cures?|improves?|lowers?|balances?|heals?|detox|anti-aging|clinically|reverses|prevents|boosts?)\b/i
const BANNED_FR = /amélior|réduit|abaisse|équilibre|guérit|soigne|\btraite\b/i

describe('offer placeholders', () => {
  it('lists the new paths for hreflang and the sitemap', () => {
    expect(LOCALE_PAIRS).toEqual(expect.arrayContaining([
      ['/shop/recipe-books', '/fr/livres-de-recettes'],
      ['/plans', '/fr/programmes'],
      ['/plans/steady-energy-menu', '/fr/programmes/menu-energie-stable'],
      ['/plans/hormone-aware-kitchen', '/fr/programmes/cuisine-attentive-aux-hormones'],
      ['/plans/heart-smart-riviera-table', '/fr/programmes/table-riviera-coeur-leger'],
      ['/plans/gut', '/fr/programmes/intestin'],
      ['/plans/training', '/fr/programmes/entrainement'],
      ['/partners', '/fr/partenaires'],
    ]))
  })

  it('stores book and plan prices and Stripe links, and keeps the PDF sale on', () => {
    expect(PRODUCTS_LIVE).toBe(true)
    expect(BOOK_PRICE).toEqual({ en: '€14.90', fr: '€14,90' })
    expect(PLAN_PRICE).toEqual({ en: '€29.90', fr: '€29,90' })
    expect(GIFT_CARDS.map((card) => card.eur)).toEqual([150, 300, 500])
    for (const card of GIFT_CARDS) {
      expect(card.stripe).toMatch(/^https:\/\/buy\.stripe\.com\//)
    }
    for (const slot of Object.values(RECIPE_BOOK_SLOTS)) {
      expect(slot.priceEn).toBe('€14.90')
      expect(slot.priceFr).toBe('€14,90')
      expect(slot.stripe).toMatch(/^https:\/\/buy\.stripe\.com\//)
    }
    for (const slot of Object.values(PLAN_SLOTS)) {
      expect(slot.priceEn).toBe('€29.90')
      expect(slot.priceFr).toBe('€29,90')
      expect(slot.stripe).toMatch(/^https:\/\/buy\.stripe\.com\//)
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

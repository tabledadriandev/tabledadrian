import { render, screen } from '@testing-library/react'
import fs from 'fs'
import path from 'path'
import { RecipeArticle } from '@/components/recipes/RecipeArticle'
import { libraryRecipes, type LibraryRecipe } from '@/lib/library'

function categoryOf(recipe: LibraryRecipe) {
  return [recipe.cuisine, recipe.course].filter(Boolean).join(' · ')
}

describe('recipe detail hero', () => {
  it('gives every recipe one serif title on its own cover, in English and French', () => {
    for (const recipe of libraryRecipes) {
      for (const locale of ['en', 'fr'] as const) {
        const title = locale === 'fr' ? recipe.titleFr : recipe.title
        const intro = locale === 'fr' ? recipe.introFr : recipe.intro
        const { container, unmount } = render(<RecipeArticle recipe={recipe} locale={locale} />)
        const headings = screen.getAllByRole('heading', { level: 1 })
        expect(headings).toHaveLength(1)
        expect(headings[0]).toHaveTextContent(title)
        expect(headings[0]).toHaveClass('ra-hero-title')
        expect(headings[0].className).not.toMatch(/font-display/)
        expect(screen.getAllByText(title)).toHaveLength(1)
        expect(screen.getByText(intro).closest('.ra-hero')).toBeTruthy()
        expect(screen.getByText(categoryOf(recipe)).closest('.ra-hero')).toBeTruthy()
        expect(container.querySelector('.brand-cover, .cover-word, .ra-kicker, .ra-title')).toBeNull()
        const hero = container.querySelector('.ra-hero')
        expect(hero).toBeTruthy()
        expect(hero).toHaveClass('is-cream')
        expect(hero?.querySelector('img')).toBeNull()
        expect(container.querySelector(`[data-placeholder="recipe/${recipe.slug}"]`)).toBeTruthy()
        unmount()
      }
    }
  })

  it('does not paint the title as separate cream bars', () => {
    const css = fs.readFileSync(path.join(process.cwd(), 'app/design.css'), 'utf8')
    expect(css).not.toMatch(/\.ra-kicker,\s*\.tda \.ra-title/)
    expect(css).toMatch(/\.tda \.ra-hero-title \{[^}]*Cover Serif/)
    expect(css).toMatch(/\.tda \.ra-hero-title \{[^}]*text-transform:\s*none/)
  })
})

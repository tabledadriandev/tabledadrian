import { render, screen } from '@testing-library/react'
import { SeasonPush } from '@/components/season/SeasonPush'
import { ServicesView } from '@/components/seo/ServicesView'

describe('Christmas gift push', () => {
  it('links the home strip to the live vouchers and the recipe books', () => {
    render(<SeasonPush locale="en" />)
    const gift = screen.getByRole('link', { name: /Christmas gift cards/ })
    expect(gift).toHaveAttribute('href', '/gift')
    expect(gift).toHaveTextContent('€150, €300 or €500. Pay online.')
    expect(screen.getByRole('link', { name: 'Recipe e-books — from €14.90' })).toHaveAttribute('href', '/shop/recipe-books')
  })

  it('uses the French paths and the same prices', () => {
    render(<SeasonPush locale="fr" />)
    expect(screen.getByRole('link', { name: /Bons cadeaux de Noël/ })).toHaveAttribute('href', '/fr/cadeau')
    expect(screen.getByRole('link', { name: 'Livres de recettes — dès 14,90 €' })).toHaveAttribute('href', '/fr/livres-de-recettes')
  })

  it('places the strip on the services page', () => {
    render(<ServicesView locale="en" />)
    expect(screen.getByRole('link', { name: /Christmas gift cards/ })).toHaveAttribute('href', '/gift')
    expect(screen.getByRole('link', { name: /Gift a dinner/ })).toHaveTextContent('Choose a €150, €300 or €500 card and pay online.')
  })
})

import fs from 'fs'
import path from 'path'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MaisonNav, navLinks } from '@/components/layout/MaisonNav'

const mockNav = { path: '/' }

jest.mock('next/navigation', () => ({
  usePathname: () => mockNav.path,
  useRouter() {
    return { push: jest.fn(), replace: jest.fn(), prefetch: jest.fn(), back: jest.fn() }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

const HREFS = [
  '/services',
  '/gallery',
  '/#about',
  '/contact',
  '/menus',
  '/shop/recipe-books',
  '/recipes',
  '/plans',
  '/articles',
  '/gift',
  '/partners',
  '/sola',
  '/masterclass',
  '/chefs-kitchen',
]

const EN = [
  'Experiences',
  'Gallery',
  'About',
  'Contact',
  'Menus',
  'Recipe books',
  'Recipes',
  'Plans',
  'Journal',
  'Gift',
  'Partners',
  'Sola',
  'Classes',
  'Kitchen',
]

const FR = [
  'Expériences',
  'Galerie',
  'À propos',
  'Contact',
  'Menus',
  'Livres de recettes',
  'Recettes',
  'Programmes',
  'Journal',
  'Cadeau',
  'Partenaires',
  'Sola',
  'Cours',
  'Cuisine',
]

function hrefsIn(root: HTMLElement) {
  return within(root).getAllByRole('link').map((link) => link.getAttribute('href'))
}

beforeEach(() => {
  mockNav.path = '/'
})

describe('navLinks', () => {
  it('lists the same pages in English and French', () => {
    const en = navLinks('en')
    const fr = navLinks('fr')
    expect(en.map((item) => item.href)).toEqual(HREFS)
    expect(fr.map((item) => item.href)).toEqual(HREFS)
    expect(en.map((item) => item.label)).toEqual(EN)
    expect(fr.map((item) => item.label)).toEqual(FR)
  })
})

describe('MaisonNav', () => {
  it('keeps Enquire and opens every page from the menu', async () => {
    const user = userEvent.setup()
    render(<MaisonNav />)

    expect(screen.getByRole('link', { name: 'Enquire' })).toHaveAttribute('href', '/contact')
    const menu = screen.getByRole('button', { name: 'Open menu' })
    expect(menu).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('link', { name: 'Kitchen' })).not.toBeInTheDocument()

    await user.click(menu)
    expect(menu).toHaveAttribute('aria-expanded', 'true')
    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByRole('link', { name: /Experiences/ })).toHaveAttribute('href', '/services')
    expect(within(dialog).getByRole('link', { name: /Books/ })).toHaveAttribute('href', '/shop/recipe-books')
    expect(within(dialog).queryByRole('link', { name: /Kitchen/ })).not.toBeInTheDocument()
    expect(within(dialog).queryByRole('link', { name: /Sola/ })).not.toBeInTheDocument()
    const overlayHrefs = hrefsIn(dialog).filter((href) => href && !href.startsWith('/fr') && href !== '/')
    for (const href of ['/services', '/gallery', '/menus', '/articles', '/recipes', '/shop/recipe-books', '/gift', '/masterclass', '/plans', '/partners', '/contact']) {
      expect(overlayHrefs).toContain(href)
    }

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('uses the French labels and paths in the menu', async () => {
    mockNav.path = '/fr'
    const user = userEvent.setup()
    render(<MaisonNav />)

    expect(screen.getByRole('link', { name: 'Demande' })).toHaveAttribute('href', '/fr/contact')
    await user.click(screen.getByRole('button', { name: 'Ouvrir le menu' }))
    const dialog = screen.getByRole('dialog')
    const overlayHrefs = hrefsIn(dialog)
    for (const href of ['/fr/services', '/fr/gallery', '/fr/menus', '/fr/articles', '/fr/recettes', '/fr/livres-de-recettes', '/fr/cadeau', '/fr/cours-de-cuisine', '/fr/programmes', '/fr/partenaires', '/fr/contact']) {
      expect(overlayHrefs).toContain(href)
    }
    expect(within(dialog).getByRole('link', { name: /Programmes/ })).toHaveAttribute('href', '/fr/programmes')
    expect(within(dialog).getByRole('link', { name: /Livres/ })).toHaveAttribute('href', '/fr/livres-de-recettes')
    expect(within(dialog).queryByRole('link', { name: /Cuisine/ })).not.toBeInTheDocument()
  })
})

describe('desktop nav breakpoint', () => {
  it('shows the burger only after the base hide rule, once the pill no longer fits', () => {
    const css = fs.readFileSync(path.join(process.cwd(), 'app/design.css'), 'utf8')
    const hide = css.indexOf('.tda .b2-burger { display: none;')
    const show = css.indexOf('.tda .b2-burger { display: grid;')
    expect(hide).toBeGreaterThan(-1)
    expect(show).toBeGreaterThan(hide)
    expect(css).toContain('@media (max-width: 1080px)')
  })
})

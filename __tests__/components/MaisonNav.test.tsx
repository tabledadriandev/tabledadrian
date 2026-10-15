import fs from 'fs'
import path from 'path'
import { fireEvent, render, screen, within } from '@testing-library/react'
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

const FR_HREFS = [
  '/fr/services',
  '/fr/gallery',
  '/fr#about',
  '/fr/contact',
  '/fr/menus',
  '/fr/livres-de-recettes',
  '/fr/recettes',
  '/fr/programmes',
  '/fr/articles',
  '/fr/cadeau',
  '/fr/partenaires',
  '/fr/sola',
  '/fr/cours-de-cuisine',
  '/fr/cuisine-du-chef',
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
  it('keeps Enquire and opens the extra pages from Explore', async () => {
    const user = userEvent.setup()
    render(<MaisonNav />)

    expect(screen.getByRole('link', { name: 'Enquire' })).toHaveAttribute('href', '/contact')
    const explore = screen.getByRole('button', { name: 'Explore' })
    expect(explore).toHaveAttribute('aria-expanded', 'false')
    expect(explore).toHaveAttribute('aria-haspopup', 'true')
    expect(screen.queryByRole('link', { name: 'Recipe books' })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'Sola' })).not.toBeInTheDocument()

    explore.focus()
    await user.keyboard('{ArrowDown}')
    expect(explore).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('link', { name: 'Menus' })).toHaveFocus()
    expect(screen.getByRole('link', { name: 'Recipe books' })).toHaveAttribute('href', '/shop/recipe-books')
    expect(screen.getByRole('link', { name: 'Plans' })).toHaveAttribute('href', '/plans')
    expect(screen.getByRole('link', { name: 'Journal' })).toHaveAttribute('href', '/articles')
    expect(screen.getByRole('link', { name: 'Gift' })).toHaveAttribute('href', '/gift')
    expect(screen.getByRole('link', { name: 'Partners' })).toHaveAttribute('href', '/partners')
    expect(screen.getByRole('link', { name: 'Sola' })).toHaveAttribute('href', '/sola')
    expect(screen.getByRole('link', { name: 'Classes' })).toHaveAttribute('href', '/masterclass')
    expect(screen.getByRole('link', { name: 'Kitchen' })).toHaveAttribute('href', '/chefs-kitchen')

    await user.keyboard('{Escape}')
    expect(explore).toHaveAttribute('aria-expanded', 'false')
    expect(explore).toHaveFocus()
    expect(screen.queryByRole('link', { name: 'Sola' })).not.toBeInTheDocument()
  })

  it('opens on hover and closes on click while the pointer stays inside', async () => {
    const user = userEvent.setup()
    render(<MaisonNav />)
    const explore = screen.getByRole('button', { name: 'Explore' })
    fireEvent.mouseEnter(explore.parentElement as HTMLElement)
    expect(explore).toHaveAttribute('aria-expanded', 'true')
    await user.click(explore)
    expect(explore).toHaveAttribute('aria-expanded', 'false')
    fireEvent.mouseEnter(explore.parentElement as HTMLElement)
    expect(explore).toHaveAttribute('aria-expanded', 'false')
    fireEvent.mouseLeave(explore.parentElement as HTMLElement)
    fireEvent.mouseEnter(explore.parentElement as HTMLElement)
    expect(explore).toHaveAttribute('aria-expanded', 'true')
    fireEvent.pointerDown(document.body)
    expect(explore).toHaveAttribute('aria-expanded', 'false')
  })

  it('lists the same pages in the mobile sheet as in the desktop nav', async () => {
    const user = userEvent.setup()
    render(<MaisonNav />)
    const explore = screen.getByRole('button', { name: 'Explore' })
    explore.focus()
    await user.keyboard('{ArrowDown}')
    const desktop = document.querySelector('nav.b2-nav') as HTMLElement
    const desktopHrefs = hrefsIn(desktop)
    await user.click(screen.getByRole('button', { name: 'Open menu' }))

    const sheet = document.getElementById('b2-menu') as HTMLElement
    const sheetHrefs = hrefsIn(sheet)
    expect(sheetHrefs).toEqual(HREFS)
    expect([...desktopHrefs].sort()).toEqual([...sheetHrefs].sort())
    expect(within(sheet).getAllByRole('link').map((link) => link.textContent?.trim())).toEqual(EN)
  })

  it('uses the French labels and paths on both navs', async () => {
    mockNav.path = '/fr'
    const user = userEvent.setup()
    render(<MaisonNav />)

    expect(screen.getByRole('link', { name: 'Demande' })).toHaveAttribute('href', '/fr/contact')
    const explore = screen.getByRole('button', { name: 'Explorer' })
    explore.focus()
    await user.keyboard('{ArrowDown}')
    const desktop = document.querySelector('nav.b2-nav') as HTMLElement
    expect(hrefsIn(desktop).sort()).toEqual([...FR_HREFS].sort())
    expect(within(desktop).getByRole('link', { name: 'Programmes' })).toHaveAttribute('href', '/fr/programmes')
    expect(within(desktop).getByRole('link', { name: 'Livres de recettes' })).toHaveAttribute('href', '/fr/livres-de-recettes')

    await user.click(screen.getByRole('button', { name: 'Open menu' }))
    const sheet = document.getElementById('b2-menu') as HTMLElement
    expect(hrefsIn(sheet)).toEqual(FR_HREFS)
    expect(within(sheet).getAllByRole('link').map((link) => link.textContent?.trim())).toEqual(FR)
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

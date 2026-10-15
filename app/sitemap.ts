import type { MetadataRoute } from 'next'
import { articles } from '@/data/articles'
import { journal } from '@/data/library/journal'
import { libraryRecipes } from '@/lib/library'
import { MENUS } from '@/data/menus'
import { LOCALE_PAIRS } from '@/lib/routes'
import { SITE_URL } from '@/lib/site'

const REVISED = new Date('2026-10-14')
const LEGAL = new Date('2026-09-26')

function entry(path: string, lastModified: Date, priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${path === '/' ? '/' : path}`,
    lastModified,
    changeFrequency: path === '/' || path === '/fr' ? 'weekly' : 'monthly',
    priority,
  }
}

export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }, { id: 2 }]
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  if (id === 1) {
    return libraryRecipes.flatMap((recipe) => [
      entry(`/recipes/${recipe.slug}`, new Date(recipe.updated), 0.6),
      entry(`/fr/recettes/${recipe.slugFr}`, new Date(recipe.updated), 0.6),
    ])
  }

  if (id === 2) {
    const fresh = journal.flatMap((post) => [
      entry(`/articles/${post.slug}`, new Date(post.publishedAt), 0.5),
      entry(`/fr/articles/${post.slugFr}`, new Date(post.publishedAt), 0.5),
    ])
    const earlier = articles.map((article) => entry(`/articles/${article.slug}`, new Date(article.publishedAt), 0.45))
    return [...fresh, ...earlier]
  }

  const pages = LOCALE_PAIRS.flatMap(([en, fr]) => [en, fr])
  const menuPaths = MENUS.flatMap((collection) => [
    `/menus/${collection.id}`,
    ...collection.menus.map((menu) => `/menus/${collection.id}/${menu.slug}`),
  ])

  return [
    ...pages.map((path) => entry(path, path.includes('confidentialite') || path.includes('conditions') || path === '/privacy' || path === '/terms' ? LEGAL : REVISED, path === '/' || path === '/fr' ? 1 : 0.7)),
    ...menuPaths.map((path) => entry(path, REVISED, 0.5)),
  ]
}

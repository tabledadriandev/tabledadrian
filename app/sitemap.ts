import type { MetadataRoute } from 'next'
import { recipes } from '@/data/recipes'
import { articles } from '@/data/articles'
import { MENUS } from '@/data/menus'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticRoutes = [
    '',
    '/menus',
    '/gallery',
    '/recipes',
    '/articles',
    '/pricing',
    '/contact',
    '/nutrition',
    '/bmi',
    '/privacy',
    '/terms',
  ].map((path) => ({
    url: `${SITE_URL}${path || '/'}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  })) satisfies MetadataRoute.Sitemap

  const recipeRoutes = recipes.map((recipe) => ({
    url: `${SITE_URL}/recipes/${recipe.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  const menuRoutes = MENUS.flatMap((collection) => [
    {
      url: `${SITE_URL}/menus/${collection.id}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    ...collection.menus.map((menu) => ({
      url: `${SITE_URL}/menus/${collection.id}/${menu.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ])

  return [...staticRoutes, ...recipeRoutes, ...articleRoutes, ...menuRoutes]
}

import type { MetadataRoute } from 'next'
import { recipes } from '@/data/recipes'
import { articles } from '@/data/articles'
import { MENUS } from '@/data/menus'
import { LOCALE_PAIRS } from '@/lib/routes'
import { SITE_URL } from '@/lib/site'

const LOCATION_PATHS = LOCALE_PAIRS.flatMap(([en, fr]) =>
  en.startsWith('/private-chef-') || fr.startsWith('/fr/chef-prive-') ? [en, fr] : []
)

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
    '/fr',
    '/fr/pricing',
    '/fr/contact',
    ...LOCATION_PATHS,
  ].map((path) => ({
    url: `${SITE_URL}${path || '/'}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority:
      path === ''
        ? 1
        : path === '/private-chef-cote-d-azur' || path === '/fr/chef-prive-cote-d-azur'
          ? 0.8
          : path.startsWith('/private-chef-') || path.startsWith('/fr/chef-prive-')
            ? 0.75
            : 0.7,
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

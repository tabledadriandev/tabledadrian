import type { MetadataRoute } from 'next'
import { articles } from '@/data/articles'
import { journal } from '@/data/library/journal'
import { MENUS } from '@/data/menus'
import { libraryRecipes } from '@/lib/library'
import { LOCALE_PAIRS } from '@/lib/routes'
import { SITE_URL } from '@/lib/site'

const REVISED = new Date('2026-10-17')
const LEGAL = new Date('2026-09-26')

function abs(path: string) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

function paired(
  en: string,
  fr: string,
  lastModified: Date,
  priority: number,
): MetadataRoute.Sitemap {
  const languages = { en: abs(en), fr: abs(fr), 'x-default': abs(en) }
  return [en, fr].map((path) => ({
    url: abs(path),
    lastModified,
    changeFrequency: path === '/' || path === '/fr' ? 'weekly' : 'monthly',
    priority: path === '/' || path === '/fr' ? 1 : priority,
    alternates: { languages },
  }))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = LOCALE_PAIRS.flatMap(([en, fr]) => {
    const legal = en === '/privacy' || en === '/terms'
    return paired(en, fr, legal ? LEGAL : REVISED, en === '/' ? 1 : 0.7)
  })

  const menus = MENUS.flatMap((collection) => [
    {
      url: abs(`/menus/${collection.id}`),
      lastModified: REVISED,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    ...collection.menus.map((menu) => ({
      url: abs(`/menus/${collection.id}/${menu.slug}`),
      lastModified: REVISED,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ])

  const recipes = libraryRecipes.flatMap((recipe) =>
    paired(`/recipes/${recipe.slug}`, `/fr/recettes/${recipe.slugFr}`, new Date(recipe.updated), 0.6),
  )

  const posts = journal.flatMap((post) =>
    paired(`/articles/${post.slug}`, `/fr/articles/${post.slugFr}`, new Date(post.publishedAt), 0.5),
  )

  const journalSlugs = new Set(journal.map((post) => post.slug))
  const earlier = articles
    .filter((article) => !journalSlugs.has(article.slug))
    .map((article) => ({
      url: abs(`/articles/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.45,
    }))

  const seen = new Set<string>()
  return [...pages, ...menus, ...recipes, ...posts, ...earlier].filter((item) => {
    if (seen.has(item.url)) return false
    seen.add(item.url)
    return true
  })
}

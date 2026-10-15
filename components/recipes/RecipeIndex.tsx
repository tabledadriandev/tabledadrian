import { RECIPES_COPY, recipeItems } from '@/lib/view-copy'
import { Band, Bento } from '@/components/b2/Tiles'

export function RecipeIndex({ locale }: { locale: 'en' | 'fr' }) {
  const c = RECIPES_COPY[locale]
  const items = recipeItems(locale).map((r) => ({ key: r.slug, href: r.href, title: r.name, text: r.full ? `${r.cuisine} · ${r.full}` : r.cuisine, src: r.src, alt: r.alt }))
  return (
    <div className="wrap b2-page">
      <Band kicker="Table d'Adrian" title={c.title} text={c.lede} />
      <Bento items={items.map((it, i) => ({ ...it, tag: String(i + 1).padStart(2, '0') }))} label={c.title} />
    </div>
  )
}

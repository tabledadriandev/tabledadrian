/** Keep titles near 50–60 characters and descriptions inside 120–155. */

const BRAND = " | Table d'Adrian"

export function dishTitle(dish: string, locale: 'en' | 'fr') {
  const word = locale === 'fr' ? 'recette' : 'recipe'
  const withWord = `${dish} ${word}${BRAND}`
  if (withWord.length >= 50 && withWord.length <= 60) return withWord
  if (withWord.length < 50) {
    const longer = locale === 'fr' ? `${dish}, recette du chef${BRAND}` : `${dish}, a chef's recipe${BRAND}`
    if (longer.length <= 60) return longer
    return withWord
  }
  const plain = `${dish}${BRAND}`
  if (plain.length <= 60) return plain
  const room = 60 - BRAND.length
  return `${dish.slice(0, room).trim()}${BRAND}`
}

export function metaDescription(text: string, locale: 'en' | 'fr') {
  const clean = text.replace(/\s+/g, ' ').trim()
  const credit = locale === 'fr' ? " Recette d'Adrian Stefan, Table d'Adrian." : " Recipe by Adrian Stefan, Table d'Adrian."
  let value = clean
  if (value.length < 120) {
    const joined = `${value.replace(/[. ]+$/, '.')}${credit}`
    value = joined
  }
  if (value.length <= 155 && value.length >= 120) return value
  if (value.length < 120) {
    const pad = locale === 'fr' ? ' Table privee, Cote d\'Azur.' : ' Private table, Cote d\'Azur.'
    value = `${value.replace(/[. ]+$/, '.')}${pad}`
  }
  if (value.length <= 155) return value
  const cut = value.slice(0, 154)
  const space = cut.lastIndexOf(' ')
  const trimmed = (space > 90 ? cut.slice(0, space) : cut).replace(/[.,;: ]+$/, '')
  return `${trimmed}.`
}

/** Branded cover helpers. Gallery files never leave the gallery. */

export const COVER_OG = {
  en: '/og_tabledadrian_en.jpg',
  fr: '/og_tabledadrian_fr.jpg',
} as const

const SMALL = new Set([
  'the', 'a', 'an', 'of', 'and', 'for', 'on', 'in',
  'un', 'une', 'le', 'la', 'les', 'des', 'du', 'de', 'et', 'au', 'aux', 'en', 'sur',
])

export function stockSrc(src?: string | null) {
  if (!src || src.includes('/gallery/')) return null
  return src
}

export function coverVariant(key: string) {
  let n = 0
  for (let i = 0; i < key.length; i += 1) n = (n + key.charCodeAt(i) * (i + 3)) % 4
  return n
}

export function splitCover(title: string) {
  const parts = title
    .replace(/[|–—:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
  let i = 0
  while (i < parts.length - 1 && (/^menu$/i.test(parts[i]) || /^\d+[.]?$/.test(parts[i]))) i += 1
  const rest = parts.slice(i)
  let start = 0
  while (start < rest.length - 1 && SMALL.has(rest[start].toLowerCase().replace(/[,.’']/g, ''))) start += 1
  const raw = rest[start].replace(/[,.]$/, '')
  const word = raw.charAt(0).toUpperCase() + raw.slice(1)
  const italic = [...rest.slice(0, start), ...rest.slice(start + 1)].join(' ')
  return { word, italic }
}

export type IngredientRow = { name: string; qty: string }
export type IngredientGroup = { label: string | null; rows: IngredientRow[] }

const DASH = /\s+[—–]\s+/

export function parseIngredients(lines: string[]): IngredientGroup[] {
  const groups: IngredientGroup[] = []
  let current: IngredientGroup = { label: null, rows: [] }
  const flush = () => {
    if (current.label || current.rows.length) groups.push(current)
    current = { label: null, rows: [] }
  }
  for (const line of lines) {
    const parts = line.split(DASH)
    if (parts.length >= 2) {
      const qty = parts.pop()!.trim()
      const left = parts.join(' — ').trim()
      const colon = left.indexOf(':')
      if (colon > 0 && colon < 36) {
        flush()
        current = { label: left.slice(0, colon).trim(), rows: [{ name: left.slice(colon + 1).trim(), qty }] }
      } else {
        current.rows.push({ name: left, qty })
      }
      continue
    }
    const colon = line.indexOf(':')
    if (colon > 0 && colon < 36) {
      flush()
      current = { label: line.slice(0, colon).trim(), rows: [{ name: line.slice(colon + 1).trim(), qty: '' }] }
      continue
    }
    current.rows.push({ name: line.trim(), qty: '' })
  }
  flush()
  return groups
}

export function scaleQuantity(text: string, ratio: number) {
  if (!text || ratio === 1) return text
  return text.replace(/(\d+(?:[.,]\d+)?)/g, (raw) => {
    const n = Number(raw.replace(',', '.')) * ratio
    if (!Number.isFinite(n)) return raw
    const rounded = Math.round(n * 100) / 100
    const out = Number.isInteger(rounded) ? String(rounded) : String(rounded)
    return raw.includes(',') ? out.replace('.', ',') : out
  })
}

export const SERVING_OPTIONS = [3, 6, 12] as const

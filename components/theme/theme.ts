export const THEME_KEY = 'tda-theme'

export type ThemeChoice = 'light' | 'dark' | 'system'

export function isThemeChoice(value: string | null): value is ThemeChoice {
  return value === 'light' || value === 'dark' || value === 'system'
}

export function resolveTheme(choice: ThemeChoice): 'light' | 'dark' {
  if (choice === 'dark') return 'dark'
  if (choice === 'light') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function readThemeChoice(): ThemeChoice {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    return isThemeChoice(stored) ? stored : 'system'
  } catch {
    return 'system'
  }
}

/** Apply the maison theme. Sola keeps a light color-scheme so its room does not invert. */
export function applyTheme(choice: ThemeChoice) {
  const root = document.documentElement
  const resolved = resolveTheme(choice)
  root.dataset.theme = choice
  root.dataset.resolved = resolved
  const sola = root.dataset.brand === 'sola'
  root.style.colorScheme = !sola && resolved === 'dark' ? 'dark' : 'light'
  try {
    localStorage.setItem(THEME_KEY, choice)
  } catch {
    /* private mode */
  }
}

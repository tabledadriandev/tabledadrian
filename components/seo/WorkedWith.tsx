type Locale = 'en' | 'fr'

/** Text-only credit. No logos. */
export function WorkedWith({ locale }: { locale: Locale }) {
  const label = locale === 'fr' ? 'Événements' : 'Worked with'
  return (
    <p className="worked-with">
      <span>{label}</span>
      Eden-Roc · amfAR · Dior
    </p>
  )
}

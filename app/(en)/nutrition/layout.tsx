import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Longevity Coach - Demo',
  description:
    "Preview the Table d'Adrian Longevity Coach. Log a meal, see your macros, then download the app for the full experience.",
  alternates: { canonical: '/nutrition' },
  robots: { index: false, follow: true },
}

export default function NutritionLayout({ children }: { children: React.ReactNode }) {
  return children
}

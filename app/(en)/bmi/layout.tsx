import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BMI Calculator - Demo',
  description:
    "A quick BMI snapshot from Table d'Adrian. For daily tracking and chef-led guidance, download the app.",
  alternates: { canonical: '/bmi' },
  robots: { index: false, follow: true },
}

export default function BmiLayout({ children }: { children: React.ReactNode }) {
  return children
}

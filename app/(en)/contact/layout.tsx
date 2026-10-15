import type { Metadata } from 'next'
import { localeAlternates } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Book your experience',
  description:
    'Enquire for a private dinner, weekly meals or a celebration on the Côte d\'Azur and in Monaco. Form, Instagram DM @tabledadrian, or adrian@tabledadrian.com.',
  alternates: localeAlternates('/contact', '/contact', '/fr/contact'),
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}

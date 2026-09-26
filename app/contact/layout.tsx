import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book your experience',
  description:
    "Enquire about a private dinner, weekly meals or a celebration. Tell Adrian the occasion, guests and dietary notes.",
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}

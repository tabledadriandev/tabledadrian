import type { Metadata } from 'next'
import './globals.css'

// This layout applies to all website routes: /, /coin, /app-download
// It imports website CSS for the main website

export const metadata: Metadata = {
  title: "Table d'Adrian - Luxury Private Chef Services | Personal Chef London",
  description: "Luxury private chef services by Table d'Adrian. Professional personal chef for private events, dinner parties, weekly meal prep. Michelin-trained chef serving London & Europe.",
}

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}


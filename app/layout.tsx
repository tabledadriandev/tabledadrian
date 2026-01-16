import type { Metadata } from "next"
import { Libre_Baskerville, Inter } from "next/font/google"
import "./globals.css"
import { SmoothScroll } from "@/components/layout/SmoothScroll"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Table d'Adrian - Luxury Private Chef Services | Personal Chef London",
  description: "Luxury private chef services by Table d'Adrian. Professional personal chef for private events, dinner parties, weekly meal prep. Michelin-trained chef serving London & Europe.",
  keywords: "private chef, personal chef, luxury chef services, private chef london, private chef for events, private chef cost, hire private chef, bespoke culinary experiences, private chef meal planning, corporate chef services",
  authors: [{ name: "Table d'Adrian" }],
  creator: "Table d'Adrian",
  publisher: "Table d'Adrian",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://tabledadrian.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://tabledadrian.com',
    title: "Table d'Adrian - Luxury Private Chef Services",
    description: "Personalized Culinary Excellence. Experience Michelin-worthy dining in the comfort of your home.",
    siteName: "Table d'Adrian",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Table d'Adrian - Luxury Private Chef Services",
    description: "Personalized Culinary Excellence. Experience Michelin-worthy dining in the comfort of your home.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`scroll-smooth ${libreBaskerville.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Table d'Adrian",
              "description": "Luxury private chef services",
              "image": "https://tabledadrian.com/logo.jpg",
              "telephone": "+33615963046",
              "email": "adrian@tabledadrian.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "London",
                "addressCountry": "GB"
              },
              "priceRange": "£££",
              "servesCuisine": "French, International"
            })
          }}
        />
      </head>
      <body className="antialiased font-body">
        <SmoothScroll>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}

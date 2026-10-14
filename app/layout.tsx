import type { Metadata, Viewport } from "next"
import { headers } from "next/headers"
import { Bodoni_Moda, Hanken_Grotesk, Source_Serif_4 } from "next/font/google"
import "./globals.css"
import { SmoothScroll } from "@/components/layout/SmoothScroll"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { CustomCursor } from "@/components/layout/CustomCursor"
import { Preloader } from "@/components/motion/Preloader"
import { BrandSync } from "@/components/motion/BrandSync"
import { PageCurtain } from "@/components/motion/PageCurtain"
import { ProgressThread } from "@/components/motion/ProgressThread"
import { HoverDistort } from "@/components/motion/HoverDistort"
import { ConsentProvider } from "@/components/consent/ConsentProvider"
import { ThemeSync } from "@/components/theme/ThemeSync"
import { CookieBanner } from "@/components/consent/CookieBanner"
import { AnalyticsGate } from "@/components/consent/AnalyticsGate"
import { OG_EN, OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL, THEME_COLOR } from "@/lib/site"
import { localeAlternates } from "@/lib/routes"
import { localBusinessJsonLd, siteJsonLd } from "@/lib/schema"
import { SolaBanner } from "@/components/layout/SolaBanner"

const display = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: false,
})

const body = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const sola = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-sola',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "Table d'Adrian | Private Chef and Longevity Cuisine | Côte d'Azur and Monaco",
    template: "%s | Table d'Adrian",
  },
  description: SITE_DESCRIPTION,
  keywords: "private chef, personal chef, private chef Côte d'Azur, private chef Monaco, luxury chef services, private chef for events, hire private chef, longevity cuisine, private chef meal planning",
  authors: [{ name: "Table d'Adrian" }],
  creator: "Table d'Adrian",
  publisher: "Table d'Adrian",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: localeAlternates('/', '/', '/fr'),
  openGraph: {
    type: 'website',
    locale: OG_EN.locale,
    url: SITE_URL,
    title: OG_EN.title,
    description: OG_EN.description,
    siteName: SITE_NAME,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_EN.title,
    description: OG_EN.description,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = headers().get('x-pathname') || '/'
  const lang = pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : 'en'
  const business = localBusinessJsonLd()

  return (
    <html lang={lang} className={`${display.variable} ${body.variable} ${sola.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon-16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content={THEME_COLOR} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var p=location.pathname;var sola=p==="/sola"||p.indexOf("/sola/")===0;document.documentElement.dataset.brand=sola?"sola":"maison";document.documentElement.lang=(p==="/fr"||p.indexOf("/fr/")===0)?"fr":"en";var stored=null;try{stored=localStorage.getItem("tda-theme")}catch(err){}var choice=stored==="light"||stored==="dark"||stored==="system"?stored:"system";document.documentElement.dataset.theme=choice;var systemDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var dark=choice==="dark"||(choice==="system"&&systemDark);document.documentElement.dataset.resolved=dark?"dark":"light";document.documentElement.style.colorScheme=!sola&&dark?"dark":"light";var dismissed=false;try{dismissed=localStorage.getItem("tda-sola-banner")==="dismissed"}catch(err){}document.documentElement.dataset.solaBanner=dismissed?"0":"1"}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLd()),
          }}
        />
        {business ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(business),
            }}
          />
        ) : null}
      </head>
      <body className="antialiased font-body bg-background text-foreground">
        <SolaBanner />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-ink-foreground"
        >
          {lang === 'fr' ? 'Aller au contenu' : 'Skip to content'}
        </a>
        <ConsentProvider>
          <ThemeSync />
          <BrandSync />
          <Preloader />
          <CustomCursor />
          <SmoothScroll>
            <Navbar />
            <main id="main" className="site-main min-h-screen">
              {children}
            </main>
            <Footer />
            <ProgressThread />
            <HoverDistort />
            <PageCurtain />
          </SmoothScroll>
          <CookieBanner />
          <AnalyticsGate />
        </ConsentProvider>
      </body>
    </html>
  )
}

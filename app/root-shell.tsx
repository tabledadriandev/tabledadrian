import type { Metadata, Viewport } from "next"
import Script from "next/script"
import localFont from "next/font/local"
import { DM_Mono, Instrument_Sans, Instrument_Serif, Pinyon_Script, Source_Serif_4 } from "next/font/google"
import "./globals.css"
import "./design.css"
import "./editorial.css"
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
import { WhatsAppFloat } from "@/components/contact/WhatsAppLink"

const GA_ID = "G-NH43C2N8ND"

const jostDisplay = localFont({
  src: './fonts/Jost-Variable.woff',
  weight: '100 900',
  variable: '--font-display',
  display: 'swap',
})

const jostBody = localFont({
  src: './fonts/Jost-Variable.woff',
  weight: '100 900',
  variable: '--font-body',
  display: 'swap',
})

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const body = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const mono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm',
  display: 'swap',
})

const script = Pinyon_Script({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
})

const sola = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-sola',
  display: 'swap',
})

export const baseMetadata: Metadata = {
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
  viewportFit: 'cover',
}

export function RootShell({ children, lang }: { children: React.ReactNode; lang: 'en' | 'fr' }) {
  const business = localBusinessJsonLd()

  return (
    <html lang={lang} className={`${jostDisplay.variable} ${jostBody.variable} ${display.variable} ${body.variable} ${mono.variable} ${script.variable} ${sola.variable}`} suppressHydrationWarning>
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
            __html: `try{var p=location.pathname;document.documentElement.dataset.brand=(p==="/sola"||p.indexOf("/sola/")===0||p==="/fr/sola"||p.indexOf("/fr/sola/")===0)?"sola":"maison";document.documentElement.lang=(p==="/fr"||p.indexOf("/fr/")===0)?"fr":"en";var stored=null;try{stored=localStorage.getItem("tda-theme")}catch(err){}var choice=stored==="light"||stored==="dark"||stored==="system"?stored:"system";document.documentElement.dataset.theme=choice;var systemDark=window.matchMedia("(prefers-color-scheme: dark)").matches;var dark=choice==="dark"||(choice==="system"&&systemDark);document.documentElement.dataset.resolved=dark?"dark":"light";document.documentElement.style.colorScheme=document.documentElement.dataset.brand==="sola"?"light":(dark?"dark":"light");var dismissed=false;try{dismissed=localStorage.getItem("tda-sola-banner")==="dismissed"}catch(err){}document.documentElement.dataset.solaBanner=dismissed||p==="/sola"||p.indexOf("/sola/")===0||p==="/fr/sola"||p.indexOf("/fr/sola/")===0?"0":"1"}catch(e){}`,
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
      <body className="tda antialiased font-body bg-background text-foreground">
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
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
          <WhatsAppFloat />
        </ConsentProvider>
      </body>
    </html>
  )
}

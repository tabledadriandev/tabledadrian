import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
// Import website CSS in root layout for global styles
import './globals.css'
import ScrollToTop from '@/components/ScrollToTop'
import ScrollProgress from '@/components/ScrollProgress'
import SkipLink from '@/components/SkipLink'
import InstallPWA from '@/components/InstallPWA'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Table d'Adrian",
  },
  title: "Table d'Adrian - Luxury Private Chef Services | Personal Chef London",
  description: "Luxury private chef services by Table d'Adrian. Professional personal chef for private events, dinner parties, weekly meal prep. Michelin-trained chef serving London & Europe.",
  keywords: "private chef, personal chef, luxury chef services, private chef london, private chef for events, private chef cost, hire private chef, bespoke culinary experiences, private chef meal planning, corporate chef services",
  authors: [{ name: 'Table d\'Adrian' }],
  creator: 'Table d\'Adrian',
  publisher: 'Table d\'Adrian',
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
    title: "Table d'Adrian - Luxury Private Chef Services",
    description: "Bespoke culinary experiences by professional private chef. Personal dining, events, weekly meal prep. Book your luxury chef experience today.",
    url: 'https://tabledadrian.com',
    siteName: 'Table d\'Adrian',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Table d\'Adrian - Luxury Private Chef Services',
      }
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Table d'Adrian - Private Chef Services",
    description: "Luxury private chef for exclusive events & personal dining",
    creator: '@tabledadrian',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.ico', type: 'image/x-icon' },
      { url: '/icon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/icon.ico', sizes: '180x180', type: 'image/x-icon' },
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'link:preconnect:https://fonts.gstatic.com': '',
    'link:preconnect:https://fonts.googleapis.com': '',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#D4AF37" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Table d'Adrian" />
      </head>
      <body className="font-sans bg-bg-primary text-text-primary antialiased">
        <SkipLink />
        <ScrollProgress />
        <ScrollToTop />
        <InstallPWA />
        <style
          // Block printing of pages that should not be printed (e.g. whitepaper)
          // This is a global rule but is primarily intended to protect sensitive views.
          dangerouslySetInnerHTML={{
            __html: `
              @media print {
                body { 
                  display: none !important;
                }
              }
            `,
          }}
        />
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered:', registration);
                    })
                    .catch((error) => {
                      console.log('SW registration failed:', error);
                    });
                });
              }
              
              // Retry failed chunk loads
              if (typeof window !== 'undefined') {
                // Override webpack chunk loading to handle errors gracefully
                const originalChunkLoadError = window.__nextChunkLoadError;
                window.__nextChunkLoadError = function(err) {
                  const chunkPath = err.message.match(/Loading chunk (\\S+) failed/)?.[1];
                  if (chunkPath) {
                    console.warn('Chunk load failed, retrying:', chunkPath);
                    // Retry after a short delay
                    setTimeout(() => {
                      window.location.reload();
                    }, 1000);
                  }
                  if (originalChunkLoadError) {
                    originalChunkLoadError(err);
                  }
                };
                
                // Catch webpack chunk loading errors
                window.addEventListener('error', function(e) {
                  if (e.message && e.message.includes('chunk') && e.message.includes('failed')) {
                    console.warn('Chunk loading error detected, reloading...');
                    setTimeout(() => {
                      window.location.reload();
                    }, 1500);
                  }
                }, true);
                
                // Catch unhandled promise rejections for chunk loading
                window.addEventListener('unhandledrejection', function(e) {
                  if (e.reason && e.reason.message && e.reason.message.includes('chunk')) {
                    console.warn('Chunk loading promise rejection, reloading...');
                    setTimeout(() => {
                      window.location.reload();
                    }, 1500);
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}

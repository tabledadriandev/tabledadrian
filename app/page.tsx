import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Wellness } from '@/components/sections/Wellness'
import { Testimonials } from '@/components/sections/Testimonials'
import { Gallery } from '@/components/sections/Gallery'
import { Menus } from '@/components/sections/Menus'
import { AppDownloadSection } from '@/components/app/AppDownloadSection'
import { Contact } from '@/components/sections/Contact'
import { Marquee } from '@/components/motion/Marquee'
import { GALLERY } from '@/data/gallery'
import { credentials } from '@/lib/credentials'

const CREDENTIALS = [
  'Michelin-trained technique',
  credentials.en.ehl,
  credentials.en.stanford,
  credentials.en.years,
  "Côte d'Azur & Monaco",
  'Tables of two to twenty-five',
]

export default function Home() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/gallery/hero-800.avif"
        type="image/avif"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/gallery/hero-1128.avif"
        type="image/avif"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      <Hero />
      <About />
      <Marquee items={CREDENTIALS} />
      <Services />
      <Wellness />
      <Testimonials />
      <Gallery />
      <Marquee items={GALLERY.map((plate) => plate.title)} tone="ink" />
      <Menus />
      <AppDownloadSection />
      <Contact />
    </>
  )
}

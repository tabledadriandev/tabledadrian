import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Wellness } from '@/components/sections/Wellness'
import { Testimonials } from '@/components/sections/Testimonials'
import { Gallery } from '@/components/sections/Gallery'
import { Menus } from '@/components/sections/Menus'
import { AppDownloadSection } from '@/components/app/AppDownloadSection'
import { Contact } from '@/components/sections/Contact'

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
      <Services />
      <Wellness />
      <Testimonials />
      <Gallery />
      <Menus />
      <AppDownloadSection />
      <Contact />
    </>
  )
}

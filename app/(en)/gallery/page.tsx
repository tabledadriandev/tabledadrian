'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { DishPhoto } from '@/components/media/DishPhoto'
import { GALLERY } from '@/data/gallery'
import { EdHero, EdPage } from '@/components/editorial/Page'

export default function GalleryPage() {
  const [active, setActive] = useState<(typeof GALLERY)[number] | null>(null)
  const french = (usePathname() || '').startsWith('/fr')

  return (
    <EdPage>
      <EdHero
        kicker={french ? 'Galerie' : 'Gallery'}
        title={french ? 'Les' : 'From the'}
        italic={french ? 'assiettes' : 'pass'}
        lede={french ? 'Des assiettes qu’Adrian a envoyées à table. Ouvrez une image.' : 'Plates Adrian has sent to the table. Open a picture.'}
      />
      <div className="ed-gallery">
        {GALLERY.map((image) => (
          <button key={image.id} type="button" onClick={() => setActive(image)}>
            <DishPhoto src={image.src} alt={image.caption} width={800} height={1100} />
            <figcaption>
              <span>{image.title}</span>
            </figcaption>
          </button>
        ))}
      </div>
      {active ? (
        <div className="ed-lightbox" role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
          <button type="button" onClick={() => setActive(null)}>{french ? 'Fermer' : 'Close'}</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <DishPhoto src={active.src} alt={active.caption} width={1200} height={1600} />
            <figcaption>
              <strong>{active.title}</strong>
              <span>{active.caption}</span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </EdPage>
  )
}

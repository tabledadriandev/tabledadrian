import { faqJsonLd } from '@/lib/schema'
import type { FaqItem } from '@/lib/faq'

export function FaqSection({
  title,
  items,
}: {
  title: string
  items: FaqItem[]
}) {
  if (items.length === 0) return null

  return (
    <section className="ed-page-section ed-faq" aria-labelledby="location-faq">
      <h2 id="location-faq">
        <span>{title}</span>
      </h2>
      <div className="mt-10 max-w-3xl">
        {items.map((item) => (
          <details key={item.q} className="group border-t border-border py-5 open:border-foreground/20">
            <summary className="cursor-pointer list-none font-display text-xl leading-snug text-foreground sm:text-2xl [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-6">
                <span>{item.q}</span>
                <span aria-hidden="true" className="mt-1 text-sm text-foreground-subtle transition-transform group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-foreground-muted">{item.a}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }}
      />
    </section>
  )
}

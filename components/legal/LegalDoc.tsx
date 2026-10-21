import type { ReactNode } from 'react'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function LegalDoc({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <div className="bg-background pb-20 pt-28 sm:pt-32">
      <div className="container">
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          animate={false}
          className="[&_h1]:text-4xl sm:[&_h1]:text-5xl"
        />
        <p className="mt-4 text-center text-xs text-foreground-muted">Last updated {updated}</p>
        <article className="legal mx-auto mt-12 max-w-2xl space-y-5 text-base leading-relaxed text-foreground-muted">
          {children}
        </article>
      </div>
    </div>
  )
}

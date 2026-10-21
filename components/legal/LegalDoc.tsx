import type { ReactNode } from 'react'
import { EdPage } from '@/components/editorial/Page'
import { SectionLabel } from '@/components/editorial/ui'

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
    <EdPage>
      <article className="ed-page-prose ed-legal">
        <SectionLabel index="01">{eyebrow}</SectionLabel>
        <h1>
          <span>{title}</span>
        </h1>
        <p className="ed-facts">Last updated {updated}</p>
        <div className="ed-body legal">{children}</div>
      </article>
    </EdPage>
  )
}

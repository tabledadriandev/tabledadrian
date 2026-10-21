import { BrandLockup } from '@/components/editorial/ui'

export function BookCover({
  id,
  title,
  number,
  countLabel,
  kind,
}: {
  id: string
  title: string
  number: string
  countLabel: string
  kind: string
}) {
  return (
    <article className="ed-cover">
      <p>
        <span>{number}</span>
        <span>{kind}</span>
      </p>
      <i aria-hidden="true" />
      <img src={`/editorial/covers/${id}.webp`} alt="" />
      <h3>{title}</h3>
      <p className="ed-cover-count">{countLabel}</p>
      <i aria-hidden="true" />
      <BrandLockup className="ed-lockup-cover" label="" />
    </article>
  )
}

import Link from 'next/link'

export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (link) {
          const [label, href] = [link[1], link[2]]
          if (href.startsWith('/')) return <Link key={index} href={href}>{label}</Link>
          return <a key={index} href={href}>{label}</a>
        }
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>
        if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>
        return <span key={index}>{part}</span>
      })}
    </>
  )
}

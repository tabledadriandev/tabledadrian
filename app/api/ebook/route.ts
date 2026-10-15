import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import { authorizeDownload } from '@/lib/ebooks'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const decision = await authorizeDownload(url.searchParams.get('session_id') || '', url.searchParams.get('b') || '')
  if (!decision.ok) {
    const body = decision.status === 404 ? 'Your book is on its way by email. adrian@tabledadrian.com' : 'Forbidden'
    return new NextResponse(body, {
      status: decision.status,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'private, no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    })
  }

  const bytes = new Uint8Array(await readFile(decision.file))
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${decision.slug}.pdf"`,
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  })
}

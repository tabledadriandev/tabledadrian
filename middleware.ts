import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import slugs from '@/data/library/slugs.json'

type SlugPair = { slug: string; slugFr: string }

const recipeSlugPairs = slugs as SlugPair[]

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  return NextResponse.redirect(url, 308)
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (path === '/fr/privacy') return redirectTo(request, '/fr/confidentialite')
  if (path === '/fr/terms') return redirectTo(request, '/fr/conditions')
  if (path === '/fr/nutrition') return redirectTo(request, '/nutrition')
  if (path === '/fr/bmi') return redirectTo(request, '/bmi')
  if (path === '/fr/recipes') return redirectTo(request, '/fr/recettes')

  const legacyRecipe = path.match(/^\/fr\/recipes\/([^/]+)$/)
  if (legacyRecipe) {
    const hit = recipeSlugPairs.find((item) => item.slug === legacyRecipe[1] || item.slugFr === legacyRecipe[1])
    return redirectTo(request, hit ? `/fr/recettes/${hit.slugFr}` : '/fr/recettes')
  }

  if (process.env.NODE_ENV === 'production') {
    const proto = request.headers.get('x-forwarded-proto')
    if (proto === 'http') {
      const url = request.nextUrl.clone()
      url.protocol = 'https:'
      return NextResponse.redirect(url, 301)
    }
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', path)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf)$).*)'],
}

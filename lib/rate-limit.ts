/**
 * Rate limiter for form/POST endpoints: 5 requests per 60s per IP (sliding window).
 *
 * Default store is in-memory, which on Vercel is per function instance — good enough
 * to stop casual abuse. For a global limit across instances, set
 * UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN (Upstash via the Vercel
 * Marketplace); the limiter then uses Upstash's REST API with no extra dependency.
 * A Vercel Firewall rate-limit rule (POST /api/*, 5 req/60s per IP, action 429)
 * can be added on top at the edge.
 */
export const RATE_LIMIT = { limit: 5, windowMs: 60_000 }
export const RATE_LIMIT_MESSAGE = 'Too many attempts. Please wait a minute and try again, or email adrian@tabledadrian.com.'

const hits = new Map<string, number[]>()

export function clientIp(headers: Headers) {
  return headers.get('x-real-ip') || headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

function memoryLimit(key: string, now = Date.now()) {
  const { limit, windowMs } = RATE_LIMIT
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  const ok = recent.length < limit
  if (ok) recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k)
  }
  const retryAfter = ok ? 0 : Math.ceil((windowMs - (now - recent[0])) / 1000)
  return { ok, remaining: Math.max(0, limit - recent.length), retryAfter }
}

async function upstashLimit(key: string) {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  const windowS = Math.ceil(RATE_LIMIT.windowMs / 1000)
  const bucket = `rl:${key}:${Math.floor(Date.now() / RATE_LIMIT.windowMs)}`
  try {
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify([['INCR', bucket], ['EXPIRE', bucket, String(windowS)]]),
      cache: 'no-store',
    })
    const [[, count]] = (await res.json()).map((r: { result: number }) => [null, r.result])
    const ok = count <= RATE_LIMIT.limit
    return { ok, remaining: Math.max(0, RATE_LIMIT.limit - count), retryAfter: ok ? 0 : windowS }
  } catch {
    return null
  }
}

export async function rateLimit(scope: string, headers: Headers) {
  const key = `${scope}:${clientIp(headers)}`
  return (await upstashLimit(key)) ?? memoryLimit(key)
}

export function tooManyResponse(retryAfter: number) {
  return new Response(JSON.stringify({ error: RATE_LIMIT_MESSAGE }), {
    status: 429,
    headers: { 'Content-Type': 'application/json', 'Retry-After': String(retryAfter || 60) },
  })
}

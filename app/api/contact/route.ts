import { NextResponse } from 'next/server'
import { z } from 'zod'
import { deliverEnquiry } from '@/lib/contact-mail'

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  eventDate: z.string().trim().max(40).optional().or(z.literal('')),
  serviceType: z.string().trim().max(60).optional().or(z.literal('')),
  guests: z.coerce.number().int().min(1).max(200).optional(),
  budget: z.string().trim().max(40).optional().or(z.literal('')),
  dietaryRequirements: z.string().trim().max(1000).optional().or(z.literal('')),
  message: z.string().trim().min(10).max(4000),
  website: z.string().optional(),
  startedAt: z.number().int().positive(),
})

const recent = new Map<string, number>()

function tooMany(ip: string) {
  const now = Date.now()
  const last = recent.get(ip) ?? 0
  if (now - last < 30_000) return true
  recent.set(ip, now)
  return false
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'

  if (tooMany(ip)) {
    return NextResponse.json({ error: 'Please wait a moment before sending again.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please check the form and try again.' }, { status: 400 })
  }

  const data = parsed.data

  if (data.website) {
    return NextResponse.json({ ok: true })
  }

  if (Date.now() - data.startedAt < 2000) {
    return NextResponse.json({ error: 'Please take a moment to complete the form.' }, { status: 400 })
  }

  try {
    await deliverEnquiry({
      name: data.name,
      email: data.email,
      phone: data.phone,
      eventDate: data.eventDate,
      serviceType: data.serviceType,
      guests: data.guests,
      budget: data.budget,
      dietaryRequirements: data.dietaryRequirements,
      message: data.message,
    })
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'send'
    if (reason === 'unconfigured') {
      return NextResponse.json(
        { error: 'Please email adrian@tabledadrian.com and we will write back.' },
        { status: 503 }
      )
    }
    return NextResponse.json(
      { error: 'We could not send that just now. Please email adrian@tabledadrian.com.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}

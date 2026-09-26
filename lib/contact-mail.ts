type Enquiry = {
  name: string
  email: string
  phone?: string
  eventDate?: string
  serviceType?: string
  guests?: number
  budget?: string
  dietaryRequirements?: string
  message: string
}

const TO = process.env.CONTACT_TO_EMAIL || 'adrian@tabledadrian.com'
const FROM =
  process.env.CONTACT_FROM_EMAIL || "Table d'Adrian <beth.t@example.com>"

function lines(data: Enquiry) {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone && `Phone: ${data.phone}`,
    data.eventDate && `Date: ${data.eventDate}`,
    data.serviceType && `Service: ${data.serviceType}`,
    data.guests && `Guests: ${data.guests}`,
    data.budget && `Budget: ${data.budget}`,
    data.dietaryRequirements && `Dietary: ${data.dietaryRequirements}`,
    '',
    data.message,
  ]
    .filter(Boolean)
    .join('\n')
}

async function sendResend(data: Enquiry) {
  const key = process.env.RESEND_API_KEY
  if (!key) return false

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM,
      to: [TO],
      reply_to: data.email,
      subject: `Table enquiry from ${data.name}`,
      text: lines(data),
    }),
  })

  if (!res.ok) {
    throw new Error('resend')
  }
  return true
}

async function sendWebhook(data: Enquiry) {
  const webhook = process.env.CONTACT_WEBHOOK_URL
  if (!webhook) return false

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error('webhook')
  }
  return true
}

export async function deliverEnquiry(data: Enquiry) {
  const sentResend = await sendResend(data)
  if (sentResend) return
  const sentWebhook = await sendWebhook(data)
  if (sentWebhook) return
  throw new Error('unconfigured')
}

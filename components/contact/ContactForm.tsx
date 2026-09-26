'use client'

import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  serviceType: z.string().optional(),
  guests: z.preprocess(
    (value) => (value === '' || value === undefined || Number.isNaN(value) ? undefined : Number(value)),
    z.number().min(1, 'At least one guest').max(200).optional()
  ),
  budget: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  message: z.string().min(10, 'Please add a few more details'),
  website: z.string().optional(),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const startedAt = useRef(Date.now())

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      })
      const payload = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) {
        setServerError(payload.error || 'Something went wrong. Please email us instead.')
        return
      }
      setIsSuccess(true)
      reset()
      startedAt.current = Date.now()
      setTimeout(() => setIsSuccess(false), 6000)
    } catch {
      setServerError('We could not send that. Please email adrian@tabledadrian.com.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      variants={fadeInUp}
      onSubmit={handleSubmit(onSubmit)}
      className="surface relative space-y-6 p-6 sm:p-8"
      noValidate
    >
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Name <span className="text-primary">*</span>
        </label>
        <input
          id="name"
          {...register('name')}
          type="text"
          autoComplete="name"
          className="field"
          placeholder="Your name"
          aria-invalid={!!errors.name}
        />
        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email <span className="text-primary">*</span>
        </label>
        <input
          id="email"
          {...register('email')}
          type="email"
          autoComplete="email"
          className="field"
          placeholder="your@email.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          Phone
        </label>
        <input
          id="phone"
          {...register('phone')}
          type="tel"
          autoComplete="tel"
          className="field"
          placeholder="+33 6 12 34 56 78"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="eventDate" className="mb-2 block text-sm font-medium">
            Event date
          </label>
          <input id="eventDate" {...register('eventDate')} type="text" placeholder="08/08/2008" className="field" />
        </div>
        <div>
          <label htmlFor="guests" className="mb-2 block text-sm font-medium">
            Number of guests
          </label>
          <input id="guests" {...register('guests')} type="number" min="1" max="200" className="field" placeholder="6" />
          {errors.guests && <p className="mt-1 text-sm text-destructive">{errors.guests.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="serviceType" className="mb-2 block text-sm font-medium">
          Service type
        </label>
        <select id="serviceType" {...register('serviceType')} className="field">
          <option value="">Select a service</option>
          <option value="dinner-party">Private dinner party</option>
          <option value="meal-prep">Weekly meal prep</option>
          <option value="corporate">Corporate event</option>
          <option value="special">Special occasion</option>
        </select>
      </div>

      <div>
        <label htmlFor="budget" className="mb-2 block text-sm font-medium">
          Budget range
        </label>
        <select id="budget" {...register('budget')} className="field">
          <option value="">Select budget range</option>
          <option value="150-300">£150 to £300</option>
          <option value="350-600">£350 to £600</option>
          <option value="700+">£700+</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div>
        <label htmlFor="dietaryRequirements" className="mb-2 block text-sm font-medium">
          Dietary requirements
        </label>
        <textarea
          id="dietaryRequirements"
          {...register('dietaryRequirements')}
          rows={2}
          className="field"
          placeholder="Vegetarian, gluten-free, allergies"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">
          Additional details <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          {...register('message')}
          rows={4}
          className="field"
          placeholder="Tell us about your table"
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
      </div>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-ink-foreground transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Sending</span>
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle size={20} />
            <span>Message sent</span>
          </>
        ) : (
          <span>Book your experience</span>
        )}
      </button>
      <p className="text-center text-sm text-foreground-muted">
        Or write to{' '}
        <a href="mailto:adrian@tabledadrian.com" className="text-foreground underline underline-offset-4">
          adrian@tabledadrian.com
        </a>
      </p>
    </motion.form>
  )
}

'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle } from 'lucide-react'
import { fadeInUp } from '@/lib/animations'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  eventDate: z.string().optional(),
  serviceType: z.string().optional(),
  guests: z.number().min(1).optional(),
  budget: z.string().optional(),
  dietaryRequirements: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSuccess(true)
    reset()
    setTimeout(() => setIsSuccess(false), 5000)
  }

  return (
    <motion.form
      variants={fadeInUp}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-foreground/10 rounded-xl p-8 space-y-6 shadow-sm"
    >
      <div>
        <label className="block text-sm font-medium mb-2">
          Name <span className="text-primary">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          className="w-full px-4 py-3 bg-white border border-foreground/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Email <span className="text-primary">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          className="w-full px-4 py-3 bg-white border border-foreground/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Phone</label>
        <input
          {...register('phone')}
          type="tel"
          className="w-full px-4 py-3 bg-white border border-foreground/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="+33 6 12 34 56 78"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Event Date</label>
          <input
            {...register('eventDate')}
            type="text"
            placeholder="08/08/2008"
            className="w-full px-4 py-3 bg-white border border-foreground/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Number of Guests</label>
          <input
            {...register('guests', { valueAsNumber: true })}
            type="number"
            min="1"
            className="w-full px-4 py-3 bg-white border border-foreground/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="6"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Service Type</label>
        <select
          {...register('serviceType')}
          className="w-full px-4 py-3 bg-white border border-foreground/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select a service</option>
          <option value="dinner-party">Private Dinner Party</option>
          <option value="meal-prep">Weekly Meal Prep</option>
          <option value="corporate">Corporate Event</option>
          <option value="special">Special Occasion</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Budget Range</label>
        <select
          {...register('budget')}
          className="w-full px-4 py-3 bg-white border border-foreground/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select budget range</option>
          <option value="150-300">£150 - £300</option>
          <option value="350-600">£350 - £600</option>
          <option value="700+">£700+</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Dietary Requirements</label>
        <textarea
          {...register('dietaryRequirements')}
          rows={2}
          className="w-full px-4 py-3 bg-white border border-foreground/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Vegetarian, Gluten-free, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Additional Details <span className="text-primary">*</span>
        </label>
        <textarea
          {...register('message')}
          rows={4}
          className="w-full px-4 py-3 bg-white border border-foreground/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Tell us about your event..."
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || isSuccess}
        className="w-full px-6 py-4 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Submitting...</span>
          </>
        ) : isSuccess ? (
          <>
            <CheckCircle size={20} />
            <span>Message Sent!</span>
          </>
        ) : (
          <span>Send Message</span>
        )}
      </button>
    </motion.form>
  )
}

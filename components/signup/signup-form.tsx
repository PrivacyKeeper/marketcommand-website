'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, CheckCircle2, MapPin, Loader2 } from 'lucide-react'

type Props = {
  type: 'organizer' | 'vendor'
}

export default function SignupForm({ type }: Props) {
  const isOrg = type === 'organizer'

  const heroTitle = isOrg ? "I'm an Organizer" : "I'm a Vendor"
  const heroBlurb = isOrg
    ? 'Tell us about your market or event. We\u2019ll be in touch about early access for organizers ($59/month).'
    : 'Join the early-access list. MarketCommand is 100% free for vendors. We\u2019ll let you know the moment we\u2019re live in your area.'

  const accentBadge = isOrg
    ? 'bg-amber-100 text-amber-700'
    : 'bg-emerald-100 text-emerald-700'
  const orgFieldLabel = isOrg ? 'Event or market name' : 'Business name'

  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const fd = new FormData(e.currentTarget)
    const payload = {
      type,
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone'),
      organization: fd.get('organization'),
      location: fd.get('location'),
      details: fd.get('details'),
      website: fd.get('website'), // honeypot
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data?.error || 'Something went wrong. Please try again.')
      } else {
        setDone(true)
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-gray-900">MarketCommand</span>
          </Link>
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${accentBadge} text-sm font-medium mb-4`}>
          {isOrg ? 'For Event Organizers' : 'For Vendors — 100% Free'}
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-3">
          {heroTitle}
        </h1>
        <p className="text-gray-600 text-lg mb-10">{heroBlurb}</p>

        {done ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Thanks — we got it!</h2>
            <p className="text-gray-700 mb-6">
              Your request has been sent to the MarketCommand team. We\u2019ll be in touch at the email you provided.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Phone (optional)" name="phone" type="tel" />
              <Field label={orgFieldLabel} name="organization" required={isOrg} />
            </div>
            <Field label="Location (city, state)" name="location" />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {isOrg ? 'Tell us about your event' : 'What do you sell?'}
              </label>
              <textarea
                name="details"
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-colors"
                placeholder={
                  isOrg
                    ? 'Estimated # of vendors, event frequency, location details, anything else helpful…'
                    : 'Product categories, where you currently sell, anything else helpful…'
                }
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-all disabled:opacity-60 ${
                isOrg
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-amber-500/20'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/20'
              }`}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                </>
              ) : (
                <>Submit request</>
              )}
            </button>
            <p className="text-xs text-gray-500">
              By submitting, you agree to be contacted by the MarketCommand team. See our{' '}
              <Link href="/legal/privacy" className="underline hover:text-gray-700">
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        )}
      </main>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required = false,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 focus:border-gray-900 focus:ring-1 focus:ring-gray-900 outline-none transition-colors"
      />
    </div>
  )
}

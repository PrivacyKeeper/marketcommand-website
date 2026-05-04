import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = process.env.CONTACT_TO_EMAIL || 'support@marketcommand.pro'
const FROM = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'

// Simple in-memory rate limit per IP (best-effort; resets on cold start)
const hits = new Map<string, { count: number; ts: number }>()
const WINDOW = 60 * 60 * 1000 // 1 hour
const MAX = 5

function rateLimited(ip: string) {
  const now = Date.now()
  const rec = hits.get(ip)
  if (!rec || now - rec.ts > WINDOW) {
    hits.set(ip, { count: 1, ts: now })
    return false
  }
  rec.count += 1
  return rec.count > MAX
}

function esc(s: string) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'
    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
    }

    const body = await req.json()
    const {
      type, // 'organizer' | 'vendor'
      name,
      email,
      phone,
      organization,
      location,
      details,
      website, // honeypot
    } = body || {}

    if (website) {
      // honeypot tripped — pretend success
      return NextResponse.json({ ok: true })
    }

    if (!type || !['organizer', 'vendor'].includes(type)) {
      return NextResponse.json({ error: 'Invalid form type.' }, { status: 400 })
    }
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
    }

    const subject =
      type === 'organizer'
        ? `New Organizer Early Access Request — ${name}`
        : `New Vendor Early Access Request — ${name}`

    const orgLabel = type === 'organizer' ? 'Event / Market name' : 'Business name'

    const rows = [
      ['Type', type === 'organizer' ? 'Organizer' : 'Vendor'],
      ['Name', name],
      ['Email', email],
      ['Phone', phone || '—'],
      [orgLabel, organization || '—'],
      ['Location', location || '—'],
      ['Details', details || '—'],
      ['Submitted from IP', ip],
    ]

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#111;max-width:560px">
        <h2 style="margin:0 0 16px;color:#b45309">${esc(subject)}</h2>
        <table style="border-collapse:collapse;width:100%">
          ${rows
            .map(
              ([k, v]) => `
            <tr>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;width:40%;vertical-align:top">${esc(k)}</td>
              <td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${esc(v)}</td>
            </tr>`
            )
            .join('')}
        </table>
        <p style="margin-top:24px;color:#999;font-size:12px">
          Sent from the MarketCommand early-access form (marketcommand.pro)
        </p>
      </div>
    `

    const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

    const { error } = await resend.emails.send({
      from: `MarketCommand <${FROM}>`,
      to: [TO],
      replyTo: email,
      subject,
      html,
      text,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Contact route error:', e)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}

import Link from 'next/link'
import { MapPin } from 'lucide-react'

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-950 text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold">
              <span className="text-white">Market</span>
              <span className="text-amber-400">Command</span>
            </span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-8">
          <Link href="/" className="text-sm text-emerald-700 hover:text-emerald-800 transition-colors">
            ← Back to home
          </Link>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-950 tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-gray-500">Last updated: {lastUpdated}</p>

        <div className="mt-10 legal-content text-gray-700 leading-relaxed">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-10 mt-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; 2026 MarketCommand. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/legal/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

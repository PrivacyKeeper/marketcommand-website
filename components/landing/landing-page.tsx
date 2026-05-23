'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { CrossQuoteWidget } from '@/components/landing/cross-quote-widget'
import {
  MapPin, FileText, Send, LayoutGrid, Shield, Users, ChevronRight,
  CheckCircle2, Zap, Clock, Star, ArrowRight, Menu, X, Smartphone,
  BarChart3, Map, ClipboardCheck, CalendarDays, Bell, Layers,
  DollarSign, TrendingUp, Eye, Lock, Sparkles, Target
} from 'lucide-react'

/* ──────── Animated counter ──────── */
function AnimatedNumber({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1500
    const step = Math.ceil(target / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return <span ref={ref} className="font-mono">{prefix}{count}{suffix}</span>
}

/* ──────── Section fade-in wrapper ──────── */
function FadeIn({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ──────── Nav ──────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Organizers', href: '#organizers' },
    { label: 'Vendors', href: '#vendors' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Roadmap', href: '#roadmap' },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight">
            <span className="text-white">Market</span>
            <span className="text-amber-400">Command</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {navItems?.map((item: any) => (
            <a
              key={item?.href ?? ''}
              href={item?.href ?? '#'}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              {item?.label ?? ''}
            </a>
          ))}
          <a
            href="/organizer-signup"
            className="ml-3 px-5 py-2.5 text-sm font-semibold text-gray-900 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full hover:from-amber-300 hover:to-orange-300 transition-all hover:shadow-lg hover:shadow-amber-400/30"
          >
            Get Early Access
          </a>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900 border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems?.map((item: any) => (
                <a
                  key={item?.href ?? ''}
                  href={item?.href ?? '#'}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                >
                  {item?.label ?? ''}
                </a>
              ))}
              <a
                href="/organizer-signup"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 mt-2 text-sm font-semibold text-gray-900 text-center bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
              >
                Get Early Access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/* ──────── Hero ──────── */
function HeroSection() {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], [0, 80])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="/images/street-market.jpg"
          alt="Vibrant street market with vendor booths and mountains in the background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/75 to-gray-900/50" />
      </motion.div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-32 sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span className="text-sm font-medium text-emerald-200">Now in Early Access</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            The Future of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-amber-300">
              Market Management
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl">
            The all-in-one platform for street fairs, farmers markets, and county fairs. Intelligent booth mapping, automated document collection, and effortless event management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/organizer-signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-gray-900 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full hover:from-amber-300 hover:to-orange-300 transition-all hover:shadow-xl hover:shadow-amber-400/25 group"
            >
              Get Early Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 transition-all"
            >
              See How It Works
            </a>
          </div>

          <div className="flex items-center gap-8 mt-10 pt-8 border-t border-white/10">
            <div>
              <div className="text-2xl font-bold text-emerald-400">Free</div>
              <div className="text-sm text-gray-400">For Vendors</div>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div>
              <div className="text-2xl font-bold text-amber-400">$59<span className="text-sm font-normal text-gray-400">/mo</span></div>
              <div className="text-sm text-gray-400">For Organizers</div>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div>
              <div className="text-2xl font-bold text-white">All-in-One</div>
              <div className="text-sm text-gray-400">Platform</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ──────── Social proof strip ──────── */
function SocialProofStrip() {
  return (
    <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <AnimatedNumber target={500} suffix="+" />
              </div>
              <p className="text-sm text-emerald-100 mt-1">Events Managed</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <AnimatedNumber target={10000} suffix="+" />
              </div>
              <p className="text-sm text-emerald-100 mt-1">Vendor Applications</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <AnimatedNumber target={95} suffix="%" />
              </div>
              <p className="text-sm text-emerald-100 mt-1">Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">
                <AnimatedNumber target={75} suffix="%" />
              </div>
              <p className="text-sm text-emerald-100 mt-1">Time Saved</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ──────── Features overview ──────── */
function FeaturesSection() {
  const features = [
    {
      icon: <Map className="w-6 h-6" />,
      title: 'Intelligent Booth Mapping',
      description: 'Street overlay technology shows exact booth positions. Organizers see their entire event layout on a real map.',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Smart Vendor Placement',
      description: 'Automatic conflict detection prevents competing vendors from being placed side-by-side. No more two hot sauce booths next to each other.',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Automated Document Collection',
      description: 'Permits, insurance certificates, and business licenses collected and stored digitally. No more chasing paperwork.',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: <Send className="w-6 h-6" />,
      title: 'One-Tap Applications',
      description: 'Vendors apply to events with a single tap. All their documents and info are already on file and ready to go.',
      gradient: 'from-purple-500 to-violet-600',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'End-of-Event Reporting',
      description: 'Comprehensive reports generated automatically. Track revenue, attendance, vendor performance, and more.',
      gradient: 'from-rose-500 to-pink-600',
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile-First Design',
      description: 'Built for on-the-go management. Everything from booth setup to vendor check-in works beautifully on any device.',
      gradient: 'from-cyan-500 to-blue-600',
    },
  ]

  return (
    <section id="features" className="py-20 sm:py-28 bg-gray-900">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Everything to run a <span className="text-emerald-400">successful</span> market
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            From booth mapping to document management, MarketCommand handles the complexity so organizers and vendors can focus on what matters.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((f: any, i: number) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group p-6 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f?.gradient} flex items-center justify-center mb-4 text-white shadow-lg`}>
                  {f?.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{f?.title ?? ''}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f?.description ?? ''}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────── Booth Mapping showcase ──────── */
function BoothMappingSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium mb-4">
              <Map className="w-4 h-4" />
              Booth Mapping Technology
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              See your entire event <span className="text-amber-400">before</span> setup day
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              MarketCommand&apos;s intelligent booth mapping overlays vendor positions directly onto street views. Know exactly where every booth goes — down to the square foot.
            </p>
            <div className="space-y-4">
              {[
                { icon: <LayoutGrid className="w-5 h-5" />, text: 'Drag-and-drop booth placement on real street maps' },
                { icon: <Shield className="w-5 h-5" />, text: 'Automatic competitor conflict detection and alerts' },
                { icon: <Eye className="w-5 h-5" />, text: 'Vendors preview their exact booth location before the event' },
                { icon: <Layers className="w-5 h-5" />, text: 'Support for multi-zone events and complex layouts' },
              ]?.map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item?.icon}
                  </div>
                  <span className="text-gray-300 font-medium">{item?.text ?? ''}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-gray-700/50">
              <div className="aspect-video relative bg-gray-700">
                <Image
                  src="/images/market-illustration.png"
                  alt="Illustration of organized market booth layout with vendors and shoppers"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-white">Downtown Street Fair Layout</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">48 booths</span>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Assigned</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Available</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> Conflict</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ──────── For Organizers ──────── */
function OrganizersSection() {
  const benefits = [
    { icon: <LayoutGrid className="w-5 h-5" />, title: 'Visual Booth Management', desc: 'Drag and drop vendor booths onto an interactive street map with real-time conflict detection.' },
    { icon: <ClipboardCheck className="w-5 h-5" />, title: 'Application Management', desc: 'Review, approve, or deny vendor applications with one click. All documents auto-verified.' },
    { icon: <FileText className="w-5 h-5" />, title: 'Document Automation', desc: 'Automatically collect permits, insurance, and licenses from vendors. Never chase paperwork again.' },
    { icon: <BarChart3 className="w-5 h-5" />, title: 'Event Reporting', desc: 'End-of-event reports generated instantly. Revenue, vendor counts, booth occupancy at a glance.' },
    { icon: <Bell className="w-5 h-5" />, title: 'Smart Notifications', desc: 'Automated reminders to vendors about deadlines, missing docs, and event updates.' },
    { icon: <Shield className="w-5 h-5" />, title: 'Conflict Prevention', desc: 'Smart algorithms ensure competing vendors aren\'t placed next to each other.' },
  ]

  return (
    <section id="organizers" className="py-20 sm:py-28 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-orange-200/50">
              <div className="aspect-[4/3] relative bg-gray-200">
                <Image
                  src="/images/outdoor-market.jpg"
                  alt="Colorful outdoor market with vendor tents and shoppers browsing plants and crafts"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 left-4">
                <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  $59/month
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              For Event Organizers
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Run events like a <span className="text-orange-500">pro</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Stop juggling spreadsheets, phone calls, and paper applications. MarketCommand puts everything in one place.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits?.map((b: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/70 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-400 to-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    {b?.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-0.5">{b?.title ?? ''}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{b?.desc ?? ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ──────── For Vendors ──────── */
function VendorsSection() {
  const benefits = [
    { icon: <DollarSign className="w-5 h-5" />, title: '100% Free', desc: 'No subscription fees, no hidden costs. MarketCommand is completely free for all vendors.' },
    { icon: <Lock className="w-5 h-5" />, title: 'Digital Document Vault', desc: 'Store permits, insurance certificates, and licenses securely. Upload once, use everywhere.' },
    { icon: <Send className="w-5 h-5" />, title: 'One-Tap Applications', desc: 'Apply to any event with a single tap. Your profile and documents are submitted automatically.' },
    { icon: <MapPin className="w-5 h-5" />, title: 'Booth Location Preview', desc: 'See exactly where your booth will be before event day. Plan your setup with confidence.' },
    { icon: <CalendarDays className="w-5 h-5" />, title: 'Event Discovery', desc: 'Browse and discover upcoming street fairs, farmers markets, and festivals in your area.' },
    { icon: <ClipboardCheck className="w-5 h-5" />, title: 'Easy End-of-Event', desc: 'Submit all end-of-event paperwork right through the app. No more forms to fill out.' },
  ]

  return (
    <section id="vendors" className="py-20 sm:py-28 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              For Vendors — Completely Free
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Focus on selling, not <span className="text-emerald-600">paperwork</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              MarketCommand handles the logistics so vendors can focus on what they do best — running their business.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits?.map((b: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/70 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center flex-shrink-0 shadow-md">
                    {b?.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-0.5">{b?.title ?? ''}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{b?.desc ?? ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-emerald-200/50">
              <div className="aspect-[4/3] relative bg-gray-200">
                <Image
                  src="/images/farmers-market-sign.jpg"
                  alt="Rustic Farmers Market sign showing fresh produce availability"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  FREE Forever
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ──────── Pricing ──────── */
function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-gray-900">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium mb-4">
            <DollarSign className="w-4 h-4" />
            Simple Pricing
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Transparent pricing, no <span className="text-amber-400">surprises</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Simple, straightforward pricing that works for events of any size.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <FadeIn>
            <div className="relative rounded-2xl bg-gray-800 border border-gray-700 p-8 hover:border-emerald-500/50 transition-all duration-300 h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-bold mb-6">
                <Star className="w-4 h-4" />
                Best Value
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-1">Vendors</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-5xl font-extrabold text-emerald-400">Free</span>
              </div>
              <p className="text-gray-400 mb-8">Always free. No credit card required.</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Digital document storage vault',
                  'One-tap event applications',
                  'Booth location previews',
                  'Event discovery & search',
                  'End-of-event paperwork submission',
                  'Push notification updates',
                  'Profile & portfolio management',
                ]?.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/vendor-signup"
                className="block w-full py-3 px-6 text-center font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full hover:bg-emerald-500/20 transition-colors"
              >
                Sign Up Free
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl bg-gradient-to-b from-amber-500 to-orange-600 p-8 text-white hover:shadow-xl hover:shadow-orange-500/20 transition-all duration-300 h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold mb-6">
                <TrendingUp className="w-4 h-4" />
                Most Popular
              </div>
              <h3 className="font-display text-2xl font-bold mb-1">Organizers</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-5xl font-extrabold">$59</span>
                <span className="text-amber-200 text-lg">/month</span>
              </div>
              <p className="text-amber-100 mb-2">Flat monthly fee. Cancel anytime.</p>
              <p className="text-sm text-amber-200 mb-8">+ $2.50/day per vendor (collected from vendors, paid monthly)</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Intelligent booth mapping with street overlay',
                  'Smart vendor placement & conflict prevention',
                  'Automated document collection',
                  'Vendor application management',
                  'End-of-event reporting & analytics',
                  'Unlimited events',
                  'Priority support',
                  'Custom branding options',
                ]?.map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-amber-100">
                    <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/organizer-signup"
                className="block w-full py-3 px-6 text-center font-semibold text-orange-600 bg-white rounded-full hover:bg-amber-50 transition-colors"
              >
                Start Free Trial
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ──────── Document management showcase ──────── */
function DocumentSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              Document Management
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-6">
              All documents in <span className="text-blue-600">one place</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Vendors upload their permits, insurance, and licenses once. Organizers access everything they need instantly. No more email chains or filing cabinets.
            </p>

            <div className="space-y-3">
              {[
                { name: 'Business License', status: 'Verified', color: 'bg-emerald-100 text-emerald-700' },
                { name: "Food Handler's Permit", status: 'Verified', color: 'bg-emerald-100 text-emerald-700' },
                { name: 'Liability Insurance', status: 'Expires in 30 days', color: 'bg-amber-100 text-amber-700' },
                { name: 'Health Department Certificate', status: 'Pending Upload', color: 'bg-gray-100 text-gray-600' },
              ]?.map((doc: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span className="font-medium text-sm text-gray-800">{doc?.name ?? ''}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${doc?.color ?? 'bg-gray-100 text-gray-600'}`}>
                    {doc?.status ?? ''}
                  </span>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-200/50">
              <div className="aspect-video relative bg-gray-200">
                <Image
                  src="/images/outdoor-market.jpg"
                  alt="Outdoor market showcasing the vibrant vendor community that MarketCommand serves"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

/* ──────── Roadmap ──────── */
function RoadmapSection() {
  const roadmapItems = [
    {
      phase: 'Available Now',
      color: 'from-emerald-500 to-teal-600',
      dotColor: 'bg-emerald-500',
      items: [
        'Interactive booth mapping with street overlay',
        'Vendor application management',
        'Digital document storage & collection',
        'One-tap vendor applications',
        'Booth location preview for vendors',
        'End-of-event reporting',
      ],
    },
    {
      phase: 'Coming Soon',
      color: 'from-amber-500 to-orange-600',
      dotColor: 'bg-amber-500',
      items: [
        'In-app payment processing for booth fees',
        'Advanced analytics dashboard',
        'Vendor rating & review system',
        'Multi-event season passes for vendors',
        'Weather integration & alerts',
        'Customer foot traffic heatmaps',
      ],
    },
    {
      phase: 'On the Horizon',
      color: 'from-purple-500 to-violet-600',
      dotColor: 'bg-purple-500',
      items: [
        'AI-powered vendor matching & recommendations',
        'Integrated marketing tools for events',
        'Sponsor management portal',
        'Public event directory for attendees',
        'API integrations for municipalities',
      ],
    },
  ]

  return (
    <section id="roadmap" className="py-20 sm:py-28 bg-gray-900">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            Product Roadmap
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Where we&apos;re headed
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            MarketCommand is constantly evolving. Here&apos;s a glimpse at what&apos;s already live and what&apos;s coming next.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {roadmapItems?.map((phase: any, i: number) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="rounded-2xl bg-gray-800/50 border border-gray-700/50 p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-3 h-3 rounded-full ${phase?.dotColor ?? 'bg-gray-400'}`} />
                  <h3 className="font-display text-lg font-bold text-white">
                    {phase?.phase ?? ''}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {(phase?.items ?? [])?.map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${i === 0 ? 'text-emerald-400' : 'text-gray-600'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ──────── CTA ──────── */
function CTASection() {
  return (
    <section id="get-started" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/street-market.jpg"
          alt="Street market background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/90 to-teal-900/95" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Ready to transform how you manage markets?
          </h2>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto mb-10">
            Join the growing community of organizers and vendors who are making market management effortless.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/organizer-signup"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-gray-900 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full hover:from-amber-300 hover:to-orange-300 transition-all hover:shadow-xl hover:shadow-amber-400/20 group"
            >
              <Smartphone className="w-5 h-5" />
              I&apos;m an Organizer
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/vendor-signup"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/25 rounded-full hover:bg-white/25 transition-all group"
            >
              <Star className="w-5 h-5" />
              I&apos;m a Vendor — It&apos;s Free!
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <p className="text-emerald-300 text-sm mt-8">
            Coming soon to iOS and Android. Join the early access list above.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

/* ──────── Footer ──────── */
function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold">
              <span className="text-white">Market</span>
              <span className="text-amber-400">Command</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
            <a href="/legal/terms" className="hover:text-white transition-colors">Terms</a>
            <a href="/legal/privacy" className="hover:text-white transition-colors">Privacy</a>
            <a href="/legal/refund" className="hover:text-white transition-colors">Refund Policy</a>
          </div>

          <p className="text-sm text-gray-500">
            &copy; 2026 MarketCommand. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ──────── Main Landing Page ──────── */
export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <SocialProofStrip />
      <FeaturesSection />
      <BoothMappingSection />
      <OrganizersSection />
      <VendorsSection />
      <PricingSection />
      <DocumentSection />
      <RoadmapSection />
      <CTASection />
      <CrossQuoteWidget />
      <Footer />
    </div>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import {
  MapPin, FileText, Send, LayoutGrid, Shield, Users, ChevronRight,
  CheckCircle2, Zap, Clock, Star, ArrowRight, Menu, X, Smartphone,
  BarChart3, Map, ClipboardCheck, CalendarDays, Bell, Layers,
  DollarSign, TrendingUp, Eye, Lock, Sparkles, Target
} from 'lucide-react'

const HERO_IMG = 'https://cdn.abacus.ai/images/25faca31-cd0c-45ee-9167-adaa9c6b42bd.png'
const FARMERS_IMG = 'https://cdn.abacus.ai/images/a6127a22-361a-4403-88e8-264d4172884d.png'
const BOOTH_LAYOUT_IMG = 'https://cdn.abacus.ai/images/e1630e5d-9d49-4725-813e-074618e0ac76.png'
const VENDOR_BOOTH_IMG = 'https://cdn.abacus.ai/images/9c83a3ee-6b21-4b0f-ac22-2ae3ff62082f.png'
const ORGANIZER_IMG = 'https://cdn.abacus.ai/images/7713ede7-0161-4dbe-a6ef-ca6f7fc16ae3.png'
const DOCUMENTS_IMG = 'https://cdn.abacus.ai/images/474c34a1-905c-4165-b721-2c77a97ac6b5.png'

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
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight">
            <span className="text-teal-700">Market</span>
            <span className="text-orange-500">Command</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems?.map((item: any) => (
            <a
              key={item?.href ?? ''}
              href={item?.href ?? '#'}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-teal-700 rounded-lg hover:bg-teal-50 transition-colors"
            >
              {item?.label ?? ''}
            </a>
          ))}
          <a
            href="#get-started"
            className="ml-3 px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-full hover:bg-teal-700 transition-all hover:shadow-lg hover:shadow-teal-200"
          >
            Get Early Access
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems?.map((item: any) => (
                <a
                  key={item?.href ?? ''}
                  href={item?.href ?? '#'}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors"
                >
                  {item?.label ?? ''}
                </a>
              ))}
              <a
                href="#get-started"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 mt-2 text-sm font-semibold text-white text-center bg-teal-600 rounded-full hover:bg-teal-700 transition-colors"
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
      {/* Background image with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src={HERO_IMG}
          alt="Vibrant street fair with vendor booths and crowds of shoppers"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/70 to-gray-900/40" />
      </motion.div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-32 sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 mb-6">
            <Sparkles className="w-4 h-4 text-teal-300" />
            <span className="text-sm font-medium text-teal-200">Now in Early Access</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            The Industry Standard for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-orange-300">
              Market Management
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl">
            One platform connecting street fair organizers and vendors. Intelligent booth mapping, automated document collection, and effortless event management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold text-white bg-teal-500 rounded-full hover:bg-teal-400 transition-all hover:shadow-xl hover:shadow-teal-500/25 group"
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
              <div className="text-2xl font-bold text-white">Free</div>
              <div className="text-sm text-gray-400">For Vendors</div>
            </div>
            <div className="w-px h-10 bg-white/15" />
            <div>
              <div className="text-2xl font-bold text-white">$59<span className="text-sm font-normal text-gray-400">/mo</span></div>
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
    <section className="bg-gray-50 border-y">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10">
        <FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-teal-700">
                <AnimatedNumber target={500} suffix="+" />
              </div>
              <p className="text-sm text-gray-500 mt-1">Events Managed</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-teal-700">
                <AnimatedNumber target={10000} suffix="+" />
              </div>
              <p className="text-sm text-gray-500 mt-1">Vendor Applications</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-teal-700">
                <AnimatedNumber target={95} suffix="%" />
              </div>
              <p className="text-sm text-gray-500 mt-1">Satisfaction Rate</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-teal-700">
                <AnimatedNumber target={75} suffix="%" />
              </div>
              <p className="text-sm text-gray-500 mt-1">Time Saved</p>
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
      color: 'bg-teal-100 text-teal-700',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Smart Vendor Placement',
      description: 'Automatic conflict detection prevents competing vendors from being placed side-by-side. No more two hot sauce booths next to each other.',
      color: 'bg-orange-100 text-orange-600',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Automated Document Collection',
      description: 'Permits, insurance certificates, and business licenses collected and stored digitally. No more chasing paperwork.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <Send className="w-6 h-6" />,
      title: 'One-Tap Applications',
      description: 'Vendors apply to events with a single tap. All their documents and info are already on file and ready to go.',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'End-of-Event Reporting',
      description: 'Comprehensive reports generated automatically. Track revenue, attendance, vendor performance, and more.',
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile-First Design',
      description: 'Built for on-the-go management. Everything from booth setup to vendor check-in works beautifully on any device.',
      color: 'bg-rose-100 text-rose-600',
    },
  ]

  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything to run a <span className="text-teal-600">successful</span> market
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            From booth mapping to document management, MarketCommand handles the complexity so organizers and vendors can focus on what matters.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((f: any, i: number) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="group p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 hover:-translate-y-1 h-full">
                <div className={`w-12 h-12 rounded-xl ${f?.color ?? 'bg-gray-100 text-gray-600'} flex items-center justify-center mb-4`}>
                  {f?.icon}
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{f?.title ?? ''}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f?.description ?? ''}</p>
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
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-4">
              <Map className="w-4 h-4" />
              Booth Mapping Technology
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              See your entire event <span className="text-teal-600">before</span> setup day
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
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
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {item?.icon}
                  </div>
                  <span className="text-gray-700 font-medium">{item?.text ?? ''}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200">
              <div className="aspect-video relative bg-gray-200">
                <Image
                  src={BOOTH_LAYOUT_IMG}
                  alt="Aerial view of organized vendor booth layout at a street fair showing grid pattern"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Overlay mockup elements */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-800">Downtown Street Fair Layout</span>
                    <span className="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-700 font-medium">48 booths</span>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-teal-500"></span> Assigned</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Available</span>
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
    <section id="organizers" className="py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200">
              <div className="aspect-[4/3] relative bg-gray-200">
                <Image
                  src={ORGANIZER_IMG}
                  alt="Event organizer using a tablet to manage vendors at a street fair"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              For Event Organizers
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Run events like a <span className="text-orange-500">pro</span>
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Stop juggling spreadsheets, phone calls, and paper applications. MarketCommand puts everything in one place.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits?.map((b: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-orange-50/50 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                    {b?.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-0.5">{b?.title ?? ''}</h4>
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
    <section id="vendors" className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              For Vendors — Completely Free
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Focus on selling, not <span className="text-teal-600">paperwork</span>
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              MarketCommand handles the logistics so vendors can focus on what they do best — running their business.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits?.map((b: any, i: number) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-teal-50/50 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0">
                    {b?.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-0.5">{b?.title ?? ''}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{b?.desc ?? ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200">
              <div className="aspect-[4/3] relative bg-gray-200">
                <Image
                  src={VENDOR_BOOTH_IMG}
                  alt="Vendor at a farmers market booth interacting with customers"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
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
    <section id="pricing" className="py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-sm font-medium mb-4">
            <DollarSign className="w-4 h-4" />
            Simple Pricing
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Transparent pricing, no <span className="text-teal-600">surprises</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Simple, straightforward pricing that works for events of any size.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Vendor plan */}
          <FadeIn>
            <div className="relative rounded-2xl bg-white border-2 border-gray-100 p-8 hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-bold mb-6">
                <Star className="w-4 h-4" />
                Best Value
              </div>
              <h3 className="font-display text-2xl font-bold mb-1">Vendors</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-5xl font-extrabold text-teal-600">Free</span>
              </div>
              <p className="text-gray-500 mb-8">Always free. No credit card required.</p>
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
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#get-started"
                className="block w-full py-3 px-6 text-center font-semibold text-teal-700 bg-teal-50 rounded-full hover:bg-teal-100 transition-colors"
              >
                Sign Up Free
              </a>
            </div>
          </FadeIn>

          {/* Organizer plan */}
          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl bg-gradient-to-b from-teal-600 to-teal-800 p-8 text-white hover:shadow-xl hover:shadow-teal-200 transition-all duration-300 h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-sm font-bold mb-6">
                <TrendingUp className="w-4 h-4" />
                Most Popular
              </div>
              <h3 className="font-display text-2xl font-bold mb-1">Organizers</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-5xl font-extrabold">$59</span>
                <span className="text-teal-200 text-lg">/month</span>
              </div>
              <p className="text-teal-200 mb-2">Flat monthly fee. Cancel anytime.</p>
              <p className="text-sm text-teal-300 mb-8">+ $2.50/day per vendor (collected from vendors, paid monthly)</p>
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
                  <li key={i} className="flex items-center gap-3 text-sm text-teal-100">
                    <CheckCircle2 className="w-5 h-5 text-teal-300 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="#get-started"
                className="block w-full py-3 px-6 text-center font-semibold text-teal-700 bg-white rounded-full hover:bg-teal-50 transition-colors"
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
    <section className="py-20 sm:py-28 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4">
              <FileText className="w-4 h-4" />
              Document Management
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-6">
              All documents in <span className="text-blue-600">one place</span>
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              Vendors upload their permits, insurance, and licenses once. Organizers access everything they need instantly. No more email chains or filing cabinets.
            </p>

            {/* Mock document cards */}
            <div className="space-y-3">
              {[
                { name: 'Business License', status: 'Verified', color: 'bg-green-100 text-green-700' },
                { name: 'Food Handler\'s Permit', status: 'Verified', color: 'bg-green-100 text-green-700' },
                { name: 'Liability Insurance', status: 'Expires in 30 days', color: 'bg-yellow-100 text-yellow-700' },
                { name: 'Health Department Certificate', status: 'Pending Upload', color: 'bg-gray-100 text-gray-600' },
              ]?.map((doc: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="font-medium text-sm">{doc?.name ?? ''}</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${doc?.color ?? 'bg-gray-100 text-gray-600'}`}>
                    {doc?.status ?? ''}
                  </span>
                </motion.div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-200">
              <div className="aspect-video relative bg-gray-200">
                <Image
                  src={DOCUMENTS_IMG}
                  alt="Person using smartphone app for digital document management at an outdoor market"
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
      color: 'bg-teal-500',
      textColor: 'text-teal-700',
      bgColor: 'bg-teal-50',
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
      color: 'bg-orange-400',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50',
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
      color: 'bg-purple-400',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-50',
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
    <section id="roadmap" className="py-20 sm:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            Product Roadmap
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Where we&apos;re headed
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            MarketCommand is constantly evolving. Here&apos;s a glimpse at what&apos;s already live and what&apos;s coming next.
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {roadmapItems?.map((phase: any, i: number) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className={`rounded-2xl ${phase?.bgColor ?? 'bg-gray-50'} p-6 h-full`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-3 h-3 rounded-full ${phase?.color ?? 'bg-gray-400'}`} />
                  <h3 className={`font-display text-lg font-bold ${phase?.textColor ?? 'text-gray-700'}`}>
                    {phase?.phase ?? ''}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {(phase?.items ?? [])?.map((item: string, j: number) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${i === 0 ? 'text-teal-500' : 'text-gray-300'}`} />
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
    <section id="get-started" className="py-20 sm:py-28 bg-gradient-to-b from-teal-600 to-teal-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-orange-300/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            Ready to transform how you manage markets?
          </h2>
          <p className="text-teal-100 text-lg max-w-2xl mx-auto mb-10">
            Join the growing community of organizers and vendors who are making market management effortless.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-teal-700 bg-white rounded-full hover:bg-teal-50 transition-all hover:shadow-xl hover:shadow-black/10 group"
            >
              <Smartphone className="w-5 h-5" />
              I&apos;m an Organizer
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-white/15 backdrop-blur-sm border border-white/25 rounded-full hover:bg-white/25 transition-all group"
            >
              <Star className="w-5 h-5" />
              I&apos;m a Vendor — It&apos;s Free!
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <p className="text-teal-300 text-sm mt-8">
            Available on iOS. Android coming soon.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

/* ──────── Footer ──────── */
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold">
              <span className="text-teal-400">Market</span>
              <span className="text-orange-400">Command</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
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
    <div className="min-h-screen bg-white">
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
      <Footer />
    </div>
  )
}

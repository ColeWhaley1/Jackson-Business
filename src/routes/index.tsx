import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: JacksonSite,
})

const services = [
  {
    icon: '🚗',
    name: 'Car Wash',
    price: '$15',
    description: 'Hand wash, rinse, and dry. Your car will be sparkling clean!',
  },
  {
    icon: '🌿',
    name: 'Weed Pulling / Garden Cleanup',
    price: '$20',
    description: 'I\'ll clear out weeds and tidy up your garden beds.',
  },
  {
    icon: '🌱',
    name: 'Lawn Mowing',
    price: '$25',
    description: 'A clean, even mow that makes your yard look great.',
  },
  {
    icon: '🏃',
    name: 'General Errands / Odd Jobs',
    price: '$10/hr',
    description: 'Need something done? I\'m on it — from trips to the store to light hauling.',
  },
]

const reasons = [
  {
    icon: '✅',
    title: 'Reliable',
    description: 'I show up on time, every time. My word is my reputation.',
  },
  {
    icon: '📍',
    title: 'Local',
    description: 'I live right in the neighborhood — no travel fees, no strangers.',
  },
  {
    icon: '💰',
    title: 'Affordable',
    description: 'Fair prices that save you money without cutting corners.',
  },
  {
    icon: '🌟',
    title: 'Supports a Young Entrepreneur',
    description: 'Hiring me helps a hardworking teen learn real-world skills and build a future.',
  },
]

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-white/90 hover:text-yellow-300 font-semibold transition-colors duration-200 text-sm md:text-base"
    >
      {children}
    </a>
  )
}

function ServiceCard({ icon, name, price, description }: typeof services[0]) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center gap-3 border-t-4 border-yellow-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
      <span className="text-5xl">{icon}</span>
      <h3 className="text-xl font-bold text-navy-900">{name}</h3>
      <p className="text-gray-600 text-sm flex-1">{description}</p>
      <span className="text-3xl font-extrabold text-blue-900">{price}</span>
    </div>
  )
}

function ReasonCard({ icon, title, description }: typeof reasons[0]) {
  return (
    <div className="flex gap-4 items-start bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/20">
      <span className="text-3xl mt-0.5">{icon}</span>
      <div>
        <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
        <p className="text-blue-100 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function JacksonSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Sticky Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-blue-900 shadow-lg' : 'bg-blue-900/95'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => scrollTo('hero')}
            className="text-yellow-400 font-extrabold text-xl tracking-tight hover:text-yellow-300 transition-colors"
          >
            ⚡ Jackson's Services
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-8">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#why">Why Hire Me?</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute top-full right-4 mt-1 bg-blue-800 rounded-xl shadow-xl py-2 min-w-[160px] border border-white/10">
                {['services', 'why', 'contact'].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="block w-full text-left px-5 py-3 text-white/90 hover:bg-white/10 hover:text-yellow-300 font-semibold text-sm capitalize transition-colors"
                  >
                    {id === 'why' ? 'Why Hire Me?' : id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        className="pt-16 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white"
      >
        <div className="max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="inline-block bg-yellow-400 text-blue-900 font-extrabold text-sm px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
            Your Neighborhood's Go-To Guy 🙌
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Quality Services,<br />
            <span className="text-yellow-400">Fair Prices,</span><br />
            Right Next Door.
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed max-w-xl mx-auto">
            Hey, I'm <strong className="text-white">Jackson</strong> — a hardworking teen in your neighborhood ready to
            help with lawn care, car washing, errands, and more. Fast, friendly, and affordable.
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-extrabold text-lg px-10 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            Text Me to Schedule! 📱
          </a>
        </div>

        {/* Wave divider */}
        <div className="overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" className="w-full fill-gray-50" preserveAspectRatio="none" height="60">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* About */}
      <section className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-5">About Me 👋</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          I'm Jackson, a teenager who lives right in this neighborhood. I started offering services
          because I love staying busy, meeting people, and earning my own way. I take pride in every
          job I do — big or small — and my goal is always to leave you completely satisfied.
          I'm honest, punctual, and I'll treat your property like it's my own. When you hire me,
          you're not just getting a service — you're investing in a local kid's future. 💪
        </p>
      </section>

      {/* Services */}
      <section id="services" className="bg-blue-50 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-3">Services & Pricing 💼</h2>
            <p className="text-gray-500 text-lg">Simple, upfront pricing. No surprises.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <ServiceCard key={s.name} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire Me */}
      <section
        id="why"
        className="py-16 px-6 bg-gradient-to-br from-blue-800 to-blue-900"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Why Hire Me? 🏆</h2>
            <p className="text-blue-200 text-lg">Here's what sets me apart from the rest.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {reasons.map((r) => (
              <ReasonCard key={r.title} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 px-6 bg-gray-50">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">Ready to Get Started? 🚀</h2>
          <p className="text-gray-600 text-lg mb-10 leading-relaxed">
            Reaching out is easy! Just send a text or give me a call and we'll set up a time that works for you.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
            <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold mb-3">Call or Text Jackson</p>
            <a
              href="tel:+15712053378"
              className="text-4xl md:text-5xl font-extrabold text-blue-900 hover:text-blue-700 transition-colors block mb-2"
            >
              (571) 205-3378
            </a>
            <p className="text-gray-400 text-sm">Available Mon–Sat · Usually responds within the hour</p>
          </div>

          <a
            href="sms:+15712053378"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-extrabold text-xl px-12 py-5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 w-full sm:w-auto"
          >
            📱 Text Me to Schedule!
          </a>

          <p className="mt-8 text-gray-400 text-sm">
            Not sure what you need? Just text "HELP" and I'll figure it out with you!
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-blue-300 text-center py-6 px-4">
        <p className="font-bold text-white mb-1">⚡ Jackson's Neighborhood Services</p>
        <p className="text-sm">Serving your community with pride · <a href="tel:+15712053378" className="hover:text-yellow-400 transition-colors">(571) 205-3378</a></p>
      </footer>
    </div>
  )
}

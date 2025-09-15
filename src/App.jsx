import React from 'react'
import { motion } from 'framer-motion'
import { Music2, Mic2, PartyPopper, Calendar, Phone, Mail, MapPin, Instagram, Star, Play, Volume2, CheckCircle2, Download, MessageSquare } from 'lucide-react'
import XIcon from './icons/XIcon.jsx'

function Preloader() {
  const [hide, setHide] = React.useState(false)
  React.useEffect(() => {
    const done = () => setTimeout(() => setHide(true), 300)
    if (document.readyState === 'complete') { done() }
    else { window.addEventListener('load', done, { once: true }) }
    return () => window.removeEventListener('load', done)
  }, [])
  return (
    <div id="preloader" className={hide ? 'hidden' : ''}>
      <div className="text-center">
        <img src="/logo-neon.png" alt="DJ DAVE B" className="h-14 w-auto mx-auto neon-glow rounded mb-4"/>
        <div className="equalizer"><span></span><span></span><span></span><span></span><span></span></div>
      </div>
    </div>
  )
}

const GOOGLE_CAL_URL = "https://calendar.google.com/calendar/embed?src=fa3cbc55de9d5a87e95d168708033d4c44a6bdd99e0d6158816adf34e68288b3%40group.calendar.google.com&ctz=America%2FLos_Angeles";

function playBuzz() {
  const el = document.getElementById('buzz-audio');
  if (el) {
    el.currentTime = 0;
    el.play().catch(()=>{});
  }
}

export default function App() {

  const [buzzOn, setBuzzOn] = React.useState(() => {
    try { return localStorage.getItem('buzzOn') === '1' } catch { return false }
  })
  const audioRef = React.useRef(null)
  const playBuzz = React.useCallback(() => {
    const a = audioRef.current
    if (!a) return
    // user-gesture policies: only play if user enabled
    if (buzzOn) {
      a.currentTime = 0
      a.play().catch(()=>{})
    }
  }, [buzzOn])
  React.useEffect(() => {
    try { localStorage.setItem('buzzOn', buzzOn ? '1' : '0') } catch {}
  }, [buzzOn])
  // Sync to Party bounce shortly after mount
  React.useEffect(() => {
    if (buzzOn) {
      const id = setTimeout(() => playBuzz(), 200) // roughly aligned to bounce start
      return () => clearTimeout(id)
    }
  }, [buzzOn, playBuzz])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'packages', label: 'Packages' },
    { id: 'media', label: 'Media' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'presskit', label: 'Press Kit' },
    { id: 'contact', label: 'Contact' },
  ]
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <audio ref={audioRef} src="/buzz.wav" preload="auto" />
      <audio id="buzz-audio" src="/neon-buzz.mp3" preload="auto"></audio>
      <Preloader />

      <header className="sticky top-0 z-50 border-b bg-neutral-950/70 backdrop-blur neon-ring">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={()=>scrollTo('home')} className="flex items-center gap-3">
              <img src="/logo-neon.png" alt="DJ DAVE B neon logo" className="h-10 w-auto neon-glow rounded" />
              <span className="font-semibold tracking-wide neon-text">DJ DAVE B</span>
            </button>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map(n => (
                <button key={n.id} onClick={()=>scrollTo(n.id)} className="text-sm text-white/80 hover:text-white hover:underline underline-offset-8">{n.label}</button>
              ))}
              <a href="#contact" onClick={(e)=>{e.preventDefault(); scrollTo('contact')}} className="px-4 py-2 rounded text-neutral-900 text-sm font-semibold bg-white hover:bg-white/90 neon-ring">Book</a>
            <button onClick={()=>setBuzzOn(v=>!v)} className="px-3 py-2 rounded border neon-border text-xs">{buzzOn ? "🔊 Buzz On" : "🔈 Buzz Off"}</button>
            </nav>
          </div>
        </div>
      </header>

      <section id="home" className="relative border-b">
        <div className="absolute inset-0 -z-10">
          <video className="absolute inset-0 w-full h-full object-cover opacity-40" autoPlay muted loop playsInline src="/hero.mp4" poster="/hero.jpg" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85" />
          <img src="/party-watermark.png" alt="Party watermark" className="absolute inset-0 m-auto w-[50%] max-w-xl opacity-10 pointer-events-none select-none" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="grid md:grid-cols-12 gap-10 items-end">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="md:col-span-8">
              <p className="text-sm uppercase tracking-[0.25em] text-white/70">Seattle • Eastside • PNW</p>
              <h1 onClick={playBuzz} className="mt-3 text-5xl sm:text-6xl font-extrabold leading-[1.05] flex flex-wrap gap-3 cursor-pointer">
  <span className="headline-block">LET’S GET THIS</span>
  <span className="headline-party party-bounce" onAnimationStart={playBuzz}>Party</span>
  <span className="headline-block">STARTED</span>
</h1>
              <p className="mt-4 text-white/80 max-w-2xl">High-energy DJ sets, pro KJ rotation, and polished MC work for weddings, bars, private events, and corporate parties.</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href="#contact" onClick={(e)=>{e.preventDefault(); scrollTo('contact')}} className="px-5 py-3 rounded font-semibold text-neutral-900 neon-gradient">Check Availability</a>
                <a href="#media" onClick={(e)=>{e.preventDefault(); scrollTo('media')}} className="px-5 py-3 rounded border neon-border">Watch/Listen</a>
              </div>
            </motion.div>
            {/* Right column: big neon logo */}
            <div className="hidden md:block md:col-span-4">
              <img src="/logo-neon.png" alt="DJ DAVE B neon logo large" className="w-full max-w-md ml-auto neon-glow rounded" />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold heading-script neon-cyan flicker">>Services</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[
              { icon: Music2, title: 'DJ Sets', desc: 'Beat‑matched mixes across Top 40, Hip‑Hop, EDM, throwbacks, and custom crates for your vibe.' },
              { icon: Mic2, title: 'Karaoke Hosting', desc: 'Pro KJ hosting with fast sign‑ups, great rotation management, and hype that boosts confidence.' },
              { icon: PartyPopper, title: 'MC & Events', desc: 'Clear announcements, timeline flow, and professional sound for weddings & corporate functions.' },
            ].map((card, idx) => (
              <div key={idx} className="rounded-xl border bg-neutral-900 p-6 neon-border">
                <card.icon className="h-7 w-7 text-cyan-300" />
                <h3 className="mt-4 text-xl font-semibold">{card.title}</h3>
                <p className="mt-2 text-white/70">{card.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Pro‑grade sound & wireless mics</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Custom playlists & do‑not‑play lists</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300" /> Early setup & punctual teardown</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packages" className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="text-3xl sm:text-4xl font-bold heading-script neon-cyan flicker">>Packages</h2>
            <a href="#contact" onClick={(e)=>{e.preventDefault(); scrollTo('contact');}} className="px-4 py-2 rounded border neon-border">Request a Quote</a>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {[{
              name: 'Karaoke Night',
              price: '$350+',
              blurb: '3‑hour bar/venue karaoke',
              features: ['KJ hosting & rotation', '2 wireless mics', 'On‑screen lyrics & sign‑ups'],
              highlight: false,
            },{
              name: 'Club / Private Party',
              price: '$600+',
              blurb: 'Up to 4 hours of live DJing',
              features: ['Pro PA system', 'Custom crate for your vibe', 'MC announcements'],
              highlight: true,
            },{
              name: 'Wedding / Corporate',
              price: '$1200+',
              blurb: 'Ceremony + Reception MC/DJ',
              features: ['Timeline coordination', 'Wireless lapel & handheld mics', 'Cocktail & dinner sets', ],
              highlight: false,
            }].map((tier, i) => (
              <div key={i} className={`rounded-xl border bg-neutral-900 p-6 neon-border ${tier.highlight ? 'neon-ring' : ''}`}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                  <span className="text-2xl font-extrabold bg-clip-text text-transparent neon-gradient">{tier.price}</span>
                </div>
                <p className="mt-2 text-white/70">{tier.blurb}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {tier.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-cyan-300"/>{f}</li>
                  ))}
                </ul>
                <div className="mt-6">
                  <a href="#contact" onClick={(e)=>{e.preventDefault(); scrollTo('contact');}} className="w-full block text-center px-4 py-2 rounded font-semibold text-neutral-900 neon-gradient">Book {tier.name}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="media" className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-6">
            <h2 className="text-3xl sm:text-4xl font-bold heading-script neon-cyan flicker">>Media</h2>
            <a href="#presskit" onClick={(e)=>{e.preventDefault(); scrollTo('presskit');}} className="inline-flex items-center gap-2 px-4 py-2 rounded border neon-border"><Download className="h-4 w-4 text-cyan-300"/> Press Kit</a>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden border bg-neutral-900 aspect-video grid place-items-center neon-border">
              <Play className="h-10 w-10 text-cyan-300"/>
            </div>
            <div className="rounded-xl overflow-hidden border bg-neutral-900 aspect-video grid place-items-center neon-border">
              <Volume2 className="h-10 w-10 text-cyan-300"/>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 text-white/80">
            <a href="https://twitter.com/DaveBTheDJ" target="_blank" className="inline-flex items-center gap-2 hover:text-cyan-300"><XIcon className="h-5 w-5 text-cyan-300"/> X @DaveBTheDJ</a>
            <a href="https://instagram.com/DaveBTheDJ" target="_blank" className="inline-flex items-center gap-2 hover:text-cyan-300"><Instagram className="h-5 w-5 text-cyan-300"/> Instagram</a>
          </div>
        </div>
      </section>

      <section id="calendar" className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold heading-script neon-cyan flicker">>Availability</h2>
          <p className="mt-2 text-white/70">Public hold dates and upcoming gigs. Ask about your date below.</p>
          <div className="mt-6 rounded-xl border bg-neutral-900 p-4 neon-border">
<div className="aspect-video rounded overflow-hidden neon-border">
  <iframe 
    src="https://calendar.google.com/calendar/embed?src=en.usa%23holiday%40group.v.calendar.google.com&ctz=America%2FLos_Angeles" 
    style={{border:0}} 
    width="100%" 
    height="100%" 
    frameBorder="0" 
    scrolling="no"
  ></iframe>
</div>
</div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold heading-script neon-cyan flicker">>Testimonials</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[
              { quote: 'Dave kept the floor packed all night. Seamless transitions and read the room perfectly.', name: 'Alicia R.', meta: 'Wedding Client' },
              { quote: 'Best karaoke rotation I\'ve seen—fast, fair, and super fun.', name: 'Jamal K.', meta: 'Bar Manager' },
              { quote: 'Professional MC work and great communication leading up to our event.', name: 'Teresa M.', meta: 'Corporate Event' },
            ].map((t, i) => (
              <div key={i} className="rounded-xl border bg-neutral-900 p-6 neon-border">
                <div className="flex items-center gap-1 text-cyan-300">
                  {Array.from({ length: 5 }).map((_, idx) => (<Star key={idx} className="h-4 w-4 fill-current"/>))}
                </div>
                <p className="mt-4 text-white/90">“{t.quote}”</p>
                <p className="mt-4 text-sm text-white/70">— {t.name}, {t.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="presskit" className="py-20 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold heading-script neon-cyan flicker">>Press Kit</h2>
          <div className="mt-6 flex gap-6">
            <img src="/card-front.png" alt="Business Card Front" className="w-48 rounded border neon-border"/>
            <img src="/card-back.png" alt="Business Card Back" className="w-48 rounded border neon-border"/>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
            <a className="rounded border neon-border px-4 py-3" href="/card-front.png" download>Business Card (Front)</a>
            <a className="rounded border neon-border px-4 py-3" href="/card-back.png" download>Business Card (Back)</a>
            <a className="rounded border neon-border px-4 py-3" href="#">Logo (PNG)</a>
            <a className="rounded border neon-border px-4 py-3" href="#">One‑Sheet (PDF)</a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl sm:text-4xl font-bold heading-script neon-cyan flicker">>Contact</h2>
              <p className="mt-2 text-white/70">Tell me about your event and I'll get you a quote fast.</p>
              <div className="mt-6 space-y-3 text-white/80">
                <p className="flex items-center gap-2"><Phone className="h-5 w-5 text-cyan-300"/> <a href="tel:+12063218047" className="hover:text-cyan-300">(206) 321‑8047</a></p>
                <p className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-cyan-300"/> <a href="sms:+12063218047" className="hover:text-cyan-300">Text to Book</a></p>
                <p className="flex items-center gap-2"><Mail className="h-5 w-5 text-cyan-300"/> <a href="mailto:davebthedj@gmail.com" className="hover:text-cyan-300">davebthedj@gmail.com</a></p>
                <p className="flex items-center gap-2"><MapPin className="h-5 w-5 text-cyan-300"/> Seattle • Eastside • PNW</p>
              </div>
              <div className="mt-6">
                <p className="text-sm text-white/70 mb-2">Scan to text me directly:</p>
                <img src="/qr.png" alt="QR Code to text Dave B The DJ" className="w-40 h-40 qr-neon" />
                <div className="mt-3">
                  <a href="/qr.png" download className="inline-flex items-center gap-2 px-3 py-2 rounded border neon-border text-sm">
                    <Download className="h-4 w-4 text-cyan-300"/> Download QR Code
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <form className="rounded border bg-neutral-900 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 neon-border">
                <input className="w-full rounded bg-neutral-800 border border-white/10 px-4 py-3" placeholder="Name" />
                <input className="w-full rounded bg-neutral-800 border border-white/10 px-4 py-3" placeholder="Email" type="email" />
                <input className="w-full rounded bg-neutral-800 border border-white/10 px-4 py-3" placeholder="Phone" />
                <input className="w-full rounded bg-neutral-800 border border-white/10 px-4 py-3" placeholder="Event Date" type="date" />
                <input className="w-full rounded bg-neutral-800 border border-white/10 px-4 py-3 sm:col-span-2" placeholder="Venue / City" />
                <textarea className="w-full rounded bg-neutral-800 border border-white/10 px-4 py-3 sm:col-span-2" placeholder="Tell me about your event (type, hours, vibe, must-plays)"></textarea>
                <button type="button" className="sm:col-span-2 px-5 py-3 rounded font-semibold text-neutral-900 neon-gradient">Send Inquiry</button>
                <p className="sm:col-span-2 text-xs text-white/60">This demo form doesn't submit yet. We can wire it to your email, Airtable, or a booking CRM.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-10">
        <div className="py-6 flex justify-center">
          <div className="equalizer footer-eq"><span></span><span></span><span></span><span></span><span></span></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/70">
            <p>© {new Date().getFullYear()} DJ DAVE B. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-cyan-300">Privacy</a>
              <a href="#" className="hover:text-cyan-300">Terms</a>
              <a href="#home" onClick={(e)=>{e.preventDefault(); scrollTo('home');}} className="hover:text-cyan-300">Back to top</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

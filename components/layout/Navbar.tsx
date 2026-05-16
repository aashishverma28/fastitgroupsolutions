"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import gsap from "gsap"

export function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
      gsap.to(".mobile-menu", { y: 0, opacity: 1, duration: 0.6, ease: "power4.out" })
      gsap.fromTo(".mobile-link", 
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" }
      )
    } else {
      document.body.style.overflow = "auto"
      gsap.to(".mobile-menu", { y: "-100%", opacity: 0, duration: 0.5, ease: "power4.in" })
    }
  }, [isMenuOpen])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])
  
  if (pathname.startsWith("/admin")) return null

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white">
        <div className="container mx-auto px-6 py-6 flex justify-between items-center">
          <Link href="/" className="font-display font-bold text-2xl tracking-tighter relative z-[60]">
            FASTIT.
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-widest uppercase">
            <Link href="/about" className="hover:text-[#E8156D] transition-colors">About</Link>
            <Link href="/services" className="hover:text-[#E8156D] transition-colors">Services</Link>
            <Link href="/demo" className="hover:text-[#E8156D] transition-colors">Demo</Link>
            <Link href="/work" className="hover:text-[#E8156D] transition-colors">Work</Link>
            <Link href="/blog" className="hover:text-[#E8156D] transition-colors">Blog</Link>
            <Link href="/contact" className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-all">Let's Talk</Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
          >
            <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div className="mobile-menu fixed inset-0 z-50 bg-[#0A0A0A] translate-y-[-100%] opacity-0 flex flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-8 text-4xl font-display font-bold text-white uppercase tracking-tighter">
          <Link href="/about" className="mobile-link hover:text-[#E8156D]">About</Link>
          <Link href="/services" className="mobile-link hover:text-[#E8156D]">Services</Link>
          <Link href="/demo" className="mobile-link hover:text-[#E8156D]">Demo</Link>
          <Link href="/work" className="mobile-link hover:text-[#E8156D]">Work</Link>
          <Link href="/blog" className="mobile-link hover:text-[#E8156D]">Blog</Link>
          <Link href="/contact" className="mobile-link text-[#E8156D] border-t border-white/10 pt-8 w-full text-center">Let's Talk</Link>
        </div>
        
        <div className="absolute bottom-12 flex flex-col items-center gap-4 text-gray-500 font-body text-xs tracking-widest uppercase">
          <span>Dergaon · Assam</span>
          <div className="flex gap-6">
            <span>In</span>
            <span>X</span>
            <span>Ig</span>
          </div>
        </div>
      </div>
    </>
  )
}

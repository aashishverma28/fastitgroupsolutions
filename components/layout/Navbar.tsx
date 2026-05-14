"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()
  
  if (pathname.startsWith("/admin")) return null

  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="font-display font-bold text-2xl tracking-tighter">
          FASTIT.
        </Link>
        
        <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-widest uppercase">
          <Link href="/about" className="hover:text-[#E8156D] transition-colors">About</Link>
          <Link href="/services" className="hover:text-[#E8156D] transition-colors">Services</Link>
          <Link href="/work" className="hover:text-[#E8156D] transition-colors">Work</Link>
          <Link href="/blog" className="hover:text-[#E8156D] transition-colors">Blog</Link>
          <Link href="/contact" className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-all">Let's Talk</Link>
        </div>
      </div>
    </nav>
  )
}

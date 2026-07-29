"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Footer() {
  const pathname = usePathname()
  
  if (pathname.startsWith("/sysadmin")) return null

  return (
    <footer className="w-full bg-[#0A0A0A] text-white py-20 px-6 border-t border-white/10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="mb-6">
            <Image 
              src="/logo.png" 
              alt="FASTIT Logo" 
              width={180} 
              height={50} 
              className="h-10 w-auto object-contain brightness-0 invert" 
            />
          </div>
          <p className="font-body text-gray-400 max-w-sm">
            Engineering digital realities from the heart of Assam. We build resilient software and beautiful web experiences.
          </p>
          <div className="mt-8 flex gap-4">
            {/* Social links placeholder */}
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">In</div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">X</div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">Ig</div>
          </div>
        </div>
        
        <div>
          <h3 className="font-display font-bold text-xl mb-6">Links</h3>
          <ul className="space-y-4 font-body text-gray-400">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
            <li><Link href="/work" className="hover:text-white transition-colors">Our Work</Link></li>
            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-display font-bold text-xl mb-6">Offices</h3>
          <p className="font-body text-gray-400 mb-4">
            <strong className="text-white">Corporate:</strong><br/>
            Near Bapuji Mandir, Dergaon<br/>
            Assam — 785614
          </p>
          <p className="font-body text-gray-400">
            <strong className="text-white">Registered:</strong><br/>
            Rangamamati, Dergaon<br/>
            Assam — 785614
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-body">
        <p>&copy; {new Date().getFullYear()} Fastit Group of Solutions. All rights reserved.</p>
        <p className="mt-4 md:mt-0 flex items-center gap-2">
          Made with <span className="text-[#E8156D]">❤</span> in Assam
        </p>
      </div>
    </footer>
  )
}

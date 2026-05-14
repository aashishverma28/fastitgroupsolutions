"use client"

import { useEffect, useRef } from "react"
import { revealHeadline } from "@/lib/animations"
import { MagneticButton } from "@/components/ui/MagneticButton"

export default function Contact() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (headlineRef.current) revealHeadline(headlineRef.current)
  }, [])

  return (
    <main className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden pt-32 pb-20 text-white">
      <div className="container mx-auto px-6">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-bold leading-tight mb-20 max-w-4xl">
          Let's build something <span className="font-hand text-[#FFD93D] italic">remarkable.</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Conversational Form */}
          <div className="bg-[#141414] p-10 md:p-14 rounded-3xl border border-white/10">
            <h3 className="text-2xl font-display font-bold mb-8">Start the conversation</h3>
            <form className="font-display text-2xl md:text-3xl leading-[2] text-gray-400">
              Hi Fastit, my name is{" "}
              <input type="text" placeholder="Your Name" className="bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-700 outline-none w-48 text-center mx-2 focus:border-[#E8156D] transition-colors" />
              and I represent{" "}
              <input type="text" placeholder="Company" className="bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-700 outline-none w-48 text-center mx-2 focus:border-[#E8156D] transition-colors" />.
              <br className="hidden md:block" />
              I'm looking for help with{" "}
              <select className="bg-transparent border-b-2 border-gray-600 text-white outline-none w-56 text-center mx-2 focus:border-[#E8156D] transition-colors appearance-none cursor-pointer">
                <option value="" disabled selected>Select service</option>
                <option value="web" className="text-black">Web Development</option>
                <option value="app" className="text-black">Mobile App</option>
                <option value="design" className="text-black">UI/UX Design</option>
              </select>.
              <br className="hidden md:block" />
              You can reach me at{" "}
              <input type="email" placeholder="Email Address" className="bg-transparent border-b-2 border-gray-600 text-white placeholder-gray-700 outline-none w-64 text-center mx-2 focus:border-[#E8156D] transition-colors" />.
              
              <div className="mt-16">
                <MagneticButton className="bg-[#E8156D] text-white px-10 py-5 text-lg hover:bg-white hover:text-black">
                  Send Inquiry
                </MagneticButton>
              </div>
            </form>
          </div>
          
          {/* Office Details */}
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#E8156D] mb-4">Corporate Office</h3>
              <p className="font-body text-xl text-gray-300 leading-relaxed">
                Near Bapuji Mandir<br />
                Dergaon, Golaghat<br />
                Assam — 785614<br />
                India
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#A8D8EA] mb-4">Registered Office</h3>
              <p className="font-body text-xl text-gray-300 leading-relaxed">
                Rangamamati<br />
                Dergaon, Golaghat<br />
                Assam — 785614<br />
                India
              </p>
            </div>
            
            <div className="pt-8 border-t border-white/10">
              <a href="mailto:hello@fastitgroup.com" className="text-3xl font-display font-bold hover:text-[#E8156D] transition-colors block mb-2">hello@fastitgroup.com</a>
              <a href="tel:+910000000000" className="text-3xl font-display font-bold hover:text-[#E8156D] transition-colors">+91 000 000 0000</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

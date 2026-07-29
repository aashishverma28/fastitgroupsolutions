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
    <main className="relative w-full min-h-screen bg-[#050505] overflow-hidden pt-44 pb-20 text-white">
      {/* Glow Blur */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#FFD93D]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-extrabold leading-none uppercase tracking-tighter mb-24 max-w-4xl">
          Let's build something <span className="text-[#FFD93D] italic font-light lowercase">remarkable.</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Conversational Form */}
          <div className="bg-white/[0.02] border border-white/5 backdrop-blur-xl p-10 md:p-14 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-8">Start the conversation</h3>
            <form className="font-display text-2xl md:text-3xl leading-[2] text-white/50">
              Hi Fastit, my name is{" "}
              <input type="text" placeholder="Your Name" className="bg-transparent border-b-2 border-white/20 text-white placeholder-white/10 outline-none w-48 text-center mx-2 focus:border-[#E8156D] transition-colors" />
              and I represent{" "}
              <input type="text" placeholder="Company" className="bg-transparent border-b-2 border-white/20 text-white placeholder-white/10 outline-none w-48 text-center mx-2 focus:border-[#E8156D] transition-colors" />.
              <br className="hidden md:block" />
              I'm looking for help with{" "}
              <select className="bg-transparent border-b-2 border-white/20 text-white outline-none w-56 text-center mx-2 focus:border-[#E8156D] transition-colors appearance-none cursor-pointer">
                <option value="" disabled selected className="bg-[#050505] text-white/30">Select service</option>
                <option value="web" className="bg-[#050505] text-white">Web Development</option>
                <option value="app" className="bg-[#050505] text-white">Mobile App</option>
                <option value="design" className="bg-[#050505] text-white">UI/UX Design</option>
              </select>.
              <br className="hidden md:block" />
              You can reach me at{" "}
              <input type="email" placeholder="Email Address" className="bg-transparent border-b-2 border-white/20 text-white placeholder-white/10 outline-none w-64 text-center mx-2 focus:border-[#E8156D] transition-colors" />.
              
              <div className="mt-16">
                <MagneticButton className="bg-white text-black px-10 py-5 text-base font-bold rounded-full hover:scale-105 hover:bg-[#E8156D] hover:text-white transition-all shadow-xl">
                  Send Inquiry
                </MagneticButton>
              </div>
            </form>
          </div>
          
          {/* Office Details */}
          <div className="flex flex-col gap-12 justify-center">
            <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8156D] mb-4">Corporate Office</h3>
              <p className="font-body text-lg text-white/60 leading-relaxed">
                Near Bapuji Mandir<br />
                Dergaon, Golaghat, Assam — 785614<br />
                India
              </p>
            </div>
            <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8D8EA] mb-4">Registered Office</h3>
              <p className="font-body text-lg text-white/60 leading-relaxed">
                Rangamamati<br />
                Dergaon, Golaghat, Assam — 785614<br />
                India
              </p>
            </div>
            
            <div className="pt-8 border-t border-white/5">
              <a href="mailto:hello@fastitgroup.com" className="text-2xl md:text-3xl font-display font-bold text-white hover:text-[#E8156D] transition-colors block mb-2">hello@fastitgroup.com</a>
              <a href="tel:+910000000000" className="text-2xl md:text-3xl font-display font-bold text-white hover:text-[#E8156D] transition-colors">+91 000 000 0000</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

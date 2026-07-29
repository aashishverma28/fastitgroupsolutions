"use client"

import { useEffect, useRef } from "react"
import { revealHeadline } from "@/lib/animations"
import { MagneticButton } from "@/components/ui/MagneticButton"

export default function Careers() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (headlineRef.current) revealHeadline(headlineRef.current)
  }, [])

  return (
    <main className="relative w-full min-h-screen bg-[#050505] overflow-hidden pt-44 pb-20 text-white">
      {/* Background Decorative Grid & Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#A8D8EA]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-extrabold leading-none uppercase tracking-tighter mb-24">
          Join the <span className="text-[#A8D8EA] italic font-light lowercase">Rebellion.</span>
        </h1>
        
        <div className="max-w-3xl mb-24">
          <p className="text-xl font-body text-white/60 leading-relaxed">
            We are always looking for restless creators, meticulous engineers, and people who are uncomfortable with the status quo. If you want to build things that matter, right here from Assam, we should talk.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-8">Open Positions</h3>
          
          <div className="group bg-white/[0.02] border border-white/5 backdrop-blur-xl p-8 rounded-[24px] flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-crosshair">
            <div>
              <h4 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-2">Senior Next.js Engineer</h4>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[#E8156D]">
                <span>Dergaon (On-site)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/10 self-center" />
                <span>Full-time</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <MagneticButton className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-[#E8156D] hover:text-white transition-all shadow-xl text-sm">
                Apply Now
              </MagneticButton>
            </div>
          </div>
          
          <div className="group bg-white/[0.02] border border-white/5 backdrop-blur-xl p-8 rounded-[24px] flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-crosshair">
            <div>
              <h4 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-2">Creative UI/UX Designer</h4>
              <div className="flex gap-4 text-xs font-bold uppercase tracking-[0.2em] text-[#A8D8EA]">
                <span>Dergaon / Hybrid</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/10 self-center" />
                <span>Full-time</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <MagneticButton className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-[#E8156D] hover:text-white transition-all shadow-xl text-sm">
                Apply Now
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

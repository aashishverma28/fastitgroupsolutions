"use client"

import { useEffect, useRef } from "react"
import { revealHeadline, initCardTilt, staggerCards } from "@/lib/animations"

const services = [
  { id: "01", title: "Web Development", desc: "Next.js & React architectures built for scale and speed.", color: "#E8156D" },
  { id: "02", title: "Mobile Apps", desc: "Cross-platform solutions that feel truly native.", color: "#FFD93D" },
  { id: "03", title: "UI/UX Design", desc: "Interfaces that humans actually want to interact with.", color: "#A8D8EA" },
  { id: "04", title: "Cloud Systems", desc: "Bulletproof infrastructure and serverless deployments.", color: "#0A0A0A" },
]

export default function Services() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headlineRef.current) revealHeadline(headlineRef.current)
    
    if (gridRef.current) {
      const cards = gridRef.current.children
      staggerCards(cards as any)
      Array.from(cards).forEach(card => initCardTilt(card as HTMLElement))
    }
  }, [])

  return (
    <main className="relative w-full min-h-screen bg-[#050505] overflow-hidden pt-44 pb-20 text-white">
      {/* Decorative Blur */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#E8156D]/5 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6">
        <h1 ref={headlineRef} className="text-4xl sm:text-6xl md:text-8xl font-display font-extrabold leading-none uppercase tracking-tighter mb-24">
          We don't just write code.
          <br /><span className="text-white/30 italic font-light lowercase">We engineer solutions.</span>
        </h1>
        
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc) => (
            <div key={svc.id} className="relative group bg-white/[0.02] border border-white/5 backdrop-blur-xl p-10 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-crosshair">
              {/* Card Shine Element */}
              <div className="card-shine absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col h-full">
                <span className="font-display text-7xl font-black opacity-20 mb-8" style={{ color: svc.color }}>{svc.id}</span>
                <h3 className="text-3xl font-display font-bold mb-4 text-white uppercase tracking-tight">{svc.title}</h3>
                <p className="text-white/60 font-body text-lg leading-relaxed">{svc.desc}</p>
                
                <div className="mt-12 flex items-center gap-4 text-sm font-bold uppercase tracking-widest group-hover:pl-4 transition-all duration-300" style={{ color: svc.color }}>
                  Explore
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

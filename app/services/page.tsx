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
    <main className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden pt-32 pb-20 text-white">
      <div className="container mx-auto px-6">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-bold leading-tight mb-20">
          We don't just write code.
          <br /><span className="font-hand text-[#A8D8EA] italic">We engineer solutions.</span>
        </h1>
        
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((svc) => (
            <div key={svc.id} className="relative group p-10 rounded-3xl bg-[#141414] border border-white/10 overflow-hidden cursor-crosshair">
              {/* Card Shine Element */}
              <div className="card-shine absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10 flex flex-col h-full">
                <span className="font-display text-6xl font-black opacity-10 mb-8" style={{ color: svc.color }}>{svc.id}</span>
                <h3 className="text-3xl font-display font-bold mb-4">{svc.title}</h3>
                <p className="text-gray-400 font-body text-lg leading-relaxed">{svc.desc}</p>
                
                <div className="mt-12 flex items-center gap-4 text-sm font-bold uppercase tracking-widest group-hover:pl-4 transition-all duration-300" style={{ color: svc.color }}>
                  Explore
                  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

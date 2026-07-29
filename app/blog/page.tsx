"use client"

import { useEffect, useRef } from "react"
import { revealHeadline, staggerCards } from "@/lib/animations"

export default function Blog() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headlineRef.current) revealHeadline(headlineRef.current)
    if (listRef.current) staggerCards(listRef.current.children as any)
  }, [])

  return (
    <main className="relative w-full min-h-screen bg-[#050505] overflow-hidden pt-44 pb-20 text-white">
      {/* Background Decorative Grid & Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none" />
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#E8156D]/5 blur-[150px] rounded-full pointer-events-none bg-glow-gpu" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-extrabold leading-none uppercase tracking-tighter mb-24">
          Thoughts from <br /> 
          <span className="text-[#E8156D] italic font-light lowercase">Assam.</span>
        </h1>
        
        <div ref={listRef} className="space-y-12">
          {[1, 2, 3].map((_, i) => (
            <article key={i} className="group border-b border-white/5 pb-12 cursor-pointer transition-colors duration-300">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Thumbnail placeholder */}
                <div className="w-full md:w-1/3 aspect-[4/3] bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#E8156D]/20 to-[#A8D8EA]/10 group-hover:scale-105 transition-transform duration-700" />
                </div>
                {/* Description */}
                <div className="w-full md:w-2/3">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
                    <span>Engineering</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8156D]" />
                    <span>May 14, 2026</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 uppercase tracking-tight group-hover:text-[#E8156D] transition-colors leading-tight">
                    Building resilient edge functions for high-traffic apps.
                  </h3>
                  <p className="text-lg text-white/60 font-body leading-relaxed mb-6">
                    How we solved the IP blocking constraints for Mutunes using distributed edge extraction networks and headless routing.
                  </p>
                  <span className="text-sm font-bold tracking-widest uppercase border-b-2 border-white/20 pb-1 group-hover:border-[#E8156D] group-hover:text-white transition-colors duration-300">Read Article</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

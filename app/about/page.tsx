"use client"

import { useEffect, useRef } from "react"
import { AboutScene } from "@/components/3d/AboutScene"
import { revealHeadline, initParallax, staggerCards } from "@/lib/animations"

export default function About() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headlineRef.current) revealHeadline(headlineRef.current)
    initParallax()
    if (statsRef.current) staggerCards(statsRef.current.children as any)
  }, [])

  return (
    <main className="relative w-full min-h-screen bg-[#FAF9F7] overflow-hidden pt-32 pb-20 text-[#0A0A0A]">
      <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none">
        <AboutScene />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl lg:text-[110px] font-display font-bold leading-[0.9] tracking-tight mb-12">
          Rooted in <span className="font-hand text-[#E8156D] italic">Assam.</span>
          <br />Built for the World.
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <div data-parallax="15" className="bg-white p-10 rounded-3xl border border-gray-100 shadow-xl">
            <h3 className="font-display text-3xl font-bold mb-6 text-[#0A0A0A]">Our Story</h3>
            <p className="font-body text-lg text-gray-700 leading-relaxed mb-6">
              Founded in Dergaon, Fastit Group of Solutions started with a simple belief: world-class technology shouldn't be restricted to massive metro cities. We built a team of exceptional talent right here in Golaghat, proving that great code knows no geographical bounds.
            </p>
            <p className="font-body text-lg text-gray-700 leading-relaxed">
              We focus on building resilient software, beautiful web experiences, and scalable applications that solve real human problems. No jargon, just results.
            </p>
          </div>
          
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            <div className="bg-[#E8156D] text-white p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-lg">
              <span className="text-6xl font-display font-bold mb-2">50+</span>
              <span className="font-body text-sm uppercase tracking-widest opacity-80">Projects Delivered</span>
            </div>
            <div className="bg-[#FFD93D] text-[#0A0A0A] p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-lg">
              <span className="text-6xl font-display font-bold mb-2">100%</span>
              <span className="font-body text-sm uppercase tracking-widest opacity-80">In-house Talent</span>
            </div>
            <div className="bg-[#A8D8EA] text-[#0A0A0A] p-8 rounded-3xl flex flex-col justify-center items-center text-center shadow-lg col-span-2">
              <span className="text-4xl font-display font-bold mb-2">Zero Templates</span>
              <span className="font-body text-sm uppercase tracking-widest opacity-80">Every line of code crafted with intent</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

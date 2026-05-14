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
    <main className="relative w-full min-h-screen bg-[#FAF9F7] overflow-hidden pt-32 pb-20 text-[#0A0A0A]">
      <div className="container mx-auto px-6 max-w-5xl">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-bold leading-tight mb-20">
          Thoughts from <br /> <span className="font-hand text-[#E8156D] italic">Assam.</span>
        </h1>
        
        <div ref={listRef} className="space-y-12">
          {[1, 2, 3].map((_, i) => (
            <article key={i} className="group border-b border-gray-200 pb-12 cursor-pointer">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-full md:w-1/3 aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-[#A8D8EA] group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="w-full md:w-2/3">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
                    <span>Engineering</span>
                    <span className="w-1 h-1 rounded-full bg-[#E8156D]" />
                    <span>May 14, 2026</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 group-hover:text-[#E8156D] transition-colors">
                    Building resilient edge functions for high-traffic apps.
                  </h3>
                  <p className="text-lg text-gray-600 font-body leading-relaxed mb-6">
                    How we solved the IP blocking constraints for Mutunes using distributed edge extraction networks and headless routing.
                  </p>
                  <span className="text-sm font-bold tracking-widest uppercase border-b-2 border-[#0A0A0A] pb-1 group-hover:border-[#E8156D]">Read Article</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

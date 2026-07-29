"use client"

import { useEffect, useRef } from "react"
import { revealHeadline, initCardTilt, staggerCards } from "@/lib/animations"
import Link from "next/link"

const projects = [
  { 
    id: 1, 
    title: "Fastit Music India", 
    category: "Music Distribution & Tech", 
    link: "https://fastitmusic.in",
    description: "The premier music distribution and digital infrastructure partner for independent artists and labels across India.",
    color: "#E8156D" 
  }
]

export default function Work() {
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
      {/* Ambient Blur */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#E8156D]/5 blur-[150px] rounded-full pointer-events-none bg-glow-gpu" />

      <div className="container mx-auto px-6">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-extrabold leading-none uppercase tracking-tighter mb-24">
          Selected <span className="text-[#E8156D] italic font-light lowercase">Works.</span>
        </h1>
        
        <div ref={gridRef} className="max-w-5xl mx-auto">
          {projects.map((proj) => (
            <div key={proj.id} className="group relative bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-[40px] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8)] hover:border-white/10 transition-all duration-500">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* 2D BROWSER MOCKUP PREVIEW */}
                <div className="relative h-[400px] lg:h-[600px] bg-gradient-to-br from-[#101010] to-[#050505] border-b lg:border-b-0 lg:border-r border-white/5 flex items-center justify-center p-8 overflow-hidden">
                  {/* Glowing background */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#E8156D]/10 blur-[80px] rounded-full pointer-events-none bg-glow-gpu" />

                  {/* Browser frame */}
                  <div className="w-full max-w-md bg-[#0D0D0D] border border-white/10 rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative z-10 flex flex-col h-[280px] lg:h-[420px]">
                    {/* Header bar */}
                    <div className="bg-white/[0.02] border-b border-white/5 px-4 py-3 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                      </div>
                      <div className="bg-black/30 rounded-lg px-6 py-1 text-[10px] text-white/30 font-satoshi font-semibold tracking-wider flex items-center gap-1.5 select-none max-w-[200px] truncate">
                        fastitmusic.in
                      </div>
                      <div className="w-10" /> {/* Spacer */}
                    </div>
                    {/* Content */}
                    <div className="flex-1 w-full bg-[#050505] overflow-hidden relative">
                      <iframe 
                        src="https://fastitmusic.in" 
                        className="w-full h-full border-none select-none pointer-events-none"
                        title="Fastit Music India Preview"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-8 left-8 bg-[#E8156D] text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest z-10 shadow-[0_5px_15px_rgba(232,21,109,0.4)] animate-pulse">
                    Live Platform
                  </div>
                </div>

                {/* PROJECT DETAILS */}
                <div className="p-10 lg:p-20 flex flex-col justify-center">
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#E8156D] mb-6">{proj.category}</span>
                  <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight mb-8 leading-none">{proj.title}</h2>
                  <p className="text-lg text-white/60 font-body leading-relaxed mb-12">
                    {proj.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href={proj.link}
                      target="_blank"
                      className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-[#E8156D] hover:text-white transition-all duration-500 shadow-xl"
                    >
                      Visit Website
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>

              </div>
              
              {/* Background Glow */}
              <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#E8156D] opacity-[0.05] blur-[120px] pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

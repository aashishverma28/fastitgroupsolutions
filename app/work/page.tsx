"use client"

import { useEffect, useRef } from "react"
import { revealHeadline, initCardTilt, staggerCards } from "@/lib/animations"

const projects = [
  { id: 1, title: "Mutunes Audio", category: "App Development", size: "col-span-1 md:col-span-2 row-span-2", color: "#E8156D" },
  { id: 2, title: "Roommate Harmony", category: "Web Platform", size: "col-span-1", color: "#FFD93D" },
  { id: 3, title: "Sinaki Hub", category: "Mobile App", size: "col-span-1", color: "#A8D8EA" },
  { id: 4, title: "Tea Estate Portal", category: "Enterprise", size: "col-span-1 md:col-span-2", color: "#FAF9F7" },
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
    <main className="relative w-full min-h-screen bg-[#0F0F0F] overflow-hidden pt-32 pb-20 text-white">
      <div className="container mx-auto px-6">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-bold leading-tight mb-20">
          Selected <span className="font-hand text-[#FFD93D] italic">Works.</span>
        </h1>
        
        {/* Broken Grid Portfolio */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((proj, i) => (
            <div 
              key={proj.id} 
              className={`relative group rounded-3xl overflow-hidden cursor-crosshair border border-white/10 ${proj.size}`}
              style={{
                transform: i === 1 ? 'rotate(-2deg)' : 'none' // Unexpected design decision
              }}
              data-cursor="view"
            >
              <div className="card-shine absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20" />
              <div className="absolute inset-0 bg-[#1A1A1A] group-hover:scale-105 transition-transform duration-700" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: proj.color }}>{proj.category}</span>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white">{proj.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

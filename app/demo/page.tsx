"use client"

import { useEffect, useRef, useState } from "react"
import { revealHeadline, staggerCards, initCardTilt } from "@/lib/animations"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"
import { Loader2 } from "lucide-react"

interface DemoProject {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  demo_link: string
}

export default function DemoPage() {
  const [demos, setDemos] = useState<DemoProject[]>([])
  const [loading, setLoading] = useState(true)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchDemos = async () => {
      const { data, error } = await supabase
        .from('demo_projects')
        .select('*')
        .order('order_index', { ascending: true })
      
      if (!error && data) {
        setDemos(data)
      }
      setLoading(false)
    }
    fetchDemos()
  }, [])

  useEffect(() => {
    if (!loading) {
      if (headlineRef.current) revealHeadline(headlineRef.current)
      if (gridRef.current) {
        const cards = gridRef.current.children
        staggerCards(cards as any)
        Array.from(cards).forEach(card => initCardTilt(card as HTMLElement))
      }
    }
  }, [loading])

  return (
    <main className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden pt-44 pb-20">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.4] pointer-events-none" />

      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div>
            <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-extrabold leading-[0.9] tracking-tighter uppercase mb-8">
              Explore Our <br />
              <span className="text-[#E8156D] italic font-light lowercase">Prototypes.</span>
            </h1>
            <p className="text-xl text-white/55 max-w-lg font-body leading-relaxed">
              A curated collection of internal experiments, client demos, and concept designs that push the boundaries of IT solutions.
            </p>
          </div>
          <div className="relative h-[300px] lg:h-[450px] flex items-center justify-center">
            {/* Glowing background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E8156D]/10 blur-[80px] rounded-full pointer-events-none bg-glow-gpu" />
            
            {/* Grid graphic */}
            <div className="w-full max-w-sm aspect-[4/3] bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden relative z-10 flex flex-col p-8 items-center justify-center shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0 bg-grid-pattern opacity-40" />
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-black/25">
                  <svg className="w-8 h-8 text-[#E8156D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="font-display font-bold text-xl text-white uppercase tracking-wider mb-2">Fastit Labs</h3>
                <p className="text-white/40 text-xs font-satoshi tracking-widest uppercase">Internal Research & Development</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Grid */}
      <section className="container mx-auto px-6 relative z-10">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6 text-white/20">
            <Loader2 className="w-16 h-16 animate-spin text-[#E8156D]" />
            <p className="font-display text-xl font-bold tracking-widest uppercase">Fetching Prototypes...</p>
          </div>
        ) : demos.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-[40px] bg-white/5">
             <p className="text-white/40 text-xl font-display">New demos are currently being uploaded.</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {demos.map((demo) => (
              <div key={demo.id} className="group relative rounded-[30px] overflow-hidden bg-white/[0.02] border border-white/5 backdrop-blur-xl flex flex-col hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 cursor-crosshair">
                <div className="card-shine absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-[300px] sm:h-[400px] overflow-hidden bg-white/5">
                  {demo.image_url && (
                    <Image 
                      src={demo.image_url} 
                      alt={demo.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-8 lg:p-12 relative z-10">
                  <span className="text-[#E8156D] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                    {demo.category}
                  </span>
                  <h3 className="text-3xl font-display font-bold text-white uppercase tracking-tight mb-4">{demo.title}</h3>
                  <p className="text-white/65 text-lg leading-relaxed mb-8">
                    {demo.description}
                  </p>
                  <Link 
                    href={demo.demo_link || "#"} 
                    target="_blank"
                    className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-[#E8156D] transition-colors"
                  >
                    View Prototype
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Background Decorative Elements */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#E8156D]/10 blur-[150px] rounded-full pointer-events-none bg-glow-gpu" />
      <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-[#A8D8EA]/5 blur-[150px] rounded-full pointer-events-none bg-glow-gpu" />
    </main>
  )
}

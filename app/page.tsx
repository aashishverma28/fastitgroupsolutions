"use client"

import { useEffect, useRef } from "react"
import { HeroScene } from "@/components/3d/HeroScene"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { revealHeadline, glitchText, initColorMorph, staggerCards } from "@/lib/animations"
import Link from "next/link"
import DynamicServices from "@/components/cms/DynamicServices"
import DynamicTeamBoard from "@/components/cms/DynamicTeamBoard"

import { Marquee } from "@/components/ui/Marquee"

export default function Home() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const glitchRef = useRef<HTMLSpanElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reveal headline
    if (headlineRef.current) {
      revealHeadline(headlineRef.current)
    }

    // Hover glitch effect
    const glitchEl = glitchRef.current
    if (glitchEl) {
      glitchEl.addEventListener("mouseenter", () => glitchText(glitchEl))
    }

    // Color morphing backgrounds
    initColorMorph()

    // Staggered cards
    if (gridRef.current) {
      const cards = gridRef.current.children
      staggerCards(cards as any)
    }

    return () => {
      if (glitchEl) {
        glitchEl.replaceWith(glitchEl.cloneNode(true)) // Remove listeners simply
      }
    }
  }, [])

  return (
    <main className="relative w-full">
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO SECTION (DARK)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="hero" className="relative w-full h-screen flex flex-col justify-center overflow-hidden bg-[#0A0A0A]">
        {/* 3D Background */}
        <HeroScene />
        
        {/* Content Overlay */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full pointer-events-none">
          <div className="max-w-4xl pt-20">
            <div className="flex items-center gap-3 mb-6 opacity-80" data-parallax="5">
              <span className="w-2 h-2 rounded-full bg-[#E8156D] animate-pulse" />
              <span className="font-display tracking-widest text-[10px] md:text-xs text-white uppercase font-bold">
                DERGAON · ASSAM · INDIA
              </span>
            </div>
            
            <h1 
              ref={headlineRef}
              className="text-4xl sm:text-6xl md:text-8xl lg:text-[110px] font-display font-bold text-white leading-[0.9] tracking-tight mb-8"
            >
              We Build
              <br />
              <span className="text-[#E8156D] italic font-light font-hand mr-4">Digital</span>
              <span ref={glitchRef} className="cursor-crosshair pointer-events-auto transition-colors hover:text-[#A8D8EA]">
                Realities.
              </span>
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-300 font-body max-w-2xl font-light leading-relaxed mb-10" data-parallax="-10">
              Fastit Group of Solutions isn't just an IT agency. We engineer human-centric software, immersive web experiences, and scalable applications from the heart of Assam to the world.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 pointer-events-auto">
              <MagneticButton href="/work" className="bg-[#E8156D] text-white px-8 py-4 text-sm md:text-base hover:bg-white hover:text-[#0A0A0A]">
                Explore Our Work
              </MagneticButton>
              <MagneticButton href="/contact" className="bg-transparent border border-white/20 text-white px-8 py-4 text-sm md:text-base hover:border-white">
                Start a Project
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-[10px] text-white tracking-widest uppercase font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MARQUEE SECTION (DARK BRIDGE)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <Marquee />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SERVICES PREVIEW (LIGHT)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="services" className="relative w-full py-32 bg-[#FAF9F7] text-[#0A0A0A]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-tight max-w-2xl">
              Engineering <span className="font-hand text-[#E8156D] font-normal text-5xl sm:text-6xl md:text-8xl italic">Solutions</span> that matter.
            </h2>
            <Link href="/services" className="text-sm font-bold tracking-widest uppercase border-b-2 border-[#0A0A0A] pb-1 hover:text-[#E8156D] hover:border-[#E8156D] transition-colors">
              View All Capabilities
            </Link>
          </div>

          <DynamicServices />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HONEST BOARD (Unique to Fastit)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="honest-board" className="relative w-full py-40 bg-[#F2E8D9] overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="text-center max-w-3xl mb-16">
            <h2 className="text-5xl md:text-7xl font-hand text-black font-bold rotate-[-2deg] mb-6">
              Straight from the desk in Dergaon.
            </h2>
            <p className="text-xl font-body text-gray-800">
              We aren't a faceless corporation. We are a team of passionate humans who care deeply about the pixels we push and the code we ship. No templates. No shortcuts.
            </p>
          </div>
          
          <div className="relative w-full flex flex-col items-center">
            <div className="w-full max-w-5xl min-h-[400px] border-4 border-amber-900/10 rounded-3xl bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] shadow-inner p-8 flex flex-col items-center justify-center relative">
               <div className="w-4 h-4 rounded-full bg-red-500 absolute -top-2 left-1/2 -translate-x-1/2 shadow-sm" />
               <div className="text-center max-w-xl">
                  <h3 className="font-display font-bold text-3xl mb-4 text-black">The Fastit Promise</h3>
                  <ul className="font-hand text-3xl space-y-4 text-black italic">
                    <li>~ Honest timelines.</li>
                    <li>~ Transparent pricing.</li>
                    <li>~ Work we are insanely proud of.</li>
                  </ul>
               </div>
            </div>

            {/* Dynamic Members will appear here */}
            <DynamicTeamBoard />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA SECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cta" className="relative w-full py-40 bg-[#E8156D] text-white overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl sm:text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter mb-8 leading-[0.85]">
            Ready to <br/> <span className="font-hand lowercase italic font-normal text-6xl sm:text-7xl md:text-[120px] tracking-normal">start?</span>
          </h2>
          <p className="text-xl md:text-2xl font-body max-w-xl mx-auto mb-12 opacity-90">
            Drop by our office in Dergaon, or let's jump on a call. Your next big idea deserves the right team.
          </p>
          <MagneticButton href="/contact" className="bg-white text-[#E8156D] px-10 py-5 text-lg shadow-2xl hover:scale-105 hover:bg-[#FFD93D] hover:text-black">
            Let's Talk
          </MagneticButton>
        </div>
      </section>
    </main>
  )
}

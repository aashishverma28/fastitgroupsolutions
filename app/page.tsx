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
      <Marquee items={[
        "Web Development",
        "App Development",
        "UI/UX Design",
        "Cloud Solutions",
        "Digital Strategy",
        "Custom Software",
        "E-Commerce",
        "Product Engineering",
        "SEO Optimization",
        "Brand Identity"
      ]} />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SERVICES PREVIEW (DARK)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="services" className="relative w-full py-32 bg-[#050505] text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-none max-w-2xl uppercase tracking-tighter">
              Engineering <span className="text-[#E8156D] italic font-light">Solutions</span> <br/>that matter.
            </h2>
            <Link href="/services" className="text-xs font-bold tracking-widest uppercase border-b border-white/20 pb-2 hover:text-[#E8156D] hover:border-[#E8156D] transition-colors">
              View All Capabilities
            </Link>
          </div>

          <DynamicServices />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HONEST BOARD (Unique to Fastit)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="honest-board" className="relative w-full py-40 bg-[#080808] overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="text-center max-w-3xl mb-24">
            <h2 className="text-5xl md:text-7xl font-display font-black text-white uppercase tracking-tighter mb-6 leading-none">
              The Collective <br/>
              <span className="text-white/30 italic">from Dergaon.</span>
            </h2>
            <p className="text-lg md:text-xl font-body text-white/60 max-w-2xl mx-auto leading-relaxed">
              We aren't a faceless corporation. We are a team of passionate humans who care deeply about the pixels we push and the code we ship. No templates. No shortcuts.
            </p>
          </div>
          
          <div className="relative w-full flex flex-col items-center">
            {/* Sleek Glass Fastit Promise */}
            <div className="w-full max-w-5xl bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-[40px] p-12 md:p-20 shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
               <div className="max-w-md">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8156D] mb-3 block">OUR COMMITMENT</span>
                  <h3 className="font-display font-black text-4xl md:text-5xl text-white uppercase tracking-tighter">The Fastit Promise</h3>
                  <p className="text-white/40 font-body text-base mt-4 leading-relaxed">
                    We believe in building long-term relationships through absolute integrity and world-class software engineering.
                  </p>
               </div>
               <div className="flex-1 w-full md:pl-12">
                  <ul className="space-y-6 font-display text-lg md:text-xl text-white font-bold uppercase tracking-tight">
                    <li className="flex items-center gap-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E8156D] animate-pulse shadow-[0_0_10px_rgba(232,21,109,0.8)]" />
                      <span>Honest Timelines.</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#FFD93D] animate-pulse shadow-[0_0_10px_rgba(255,217,61,0.8)]" />
                      <span>Transparent Pricing.</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#A8D8EA] animate-pulse shadow-[0_0_10px_rgba(168,216,234,0.8)]" />
                      <span>Work We Are Insanely Proud Of.</span>
                    </li>
                  </ul>
               </div>
               {/* Ambient Glow */}
               <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#E8156D]/5 blur-[80px] rounded-full group-hover:bg-[#E8156D]/10 transition-all duration-700 pointer-events-none" />
            </div>

            {/* Dynamic Members will appear here */}
            <DynamicTeamBoard />
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CTA SECTION
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="cta" className="relative w-full py-40 bg-[#050505] text-white overflow-hidden border-t border-white/5 flex items-center justify-center">
        {/* Glow Blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E8156D]/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-5xl sm:text-6xl md:text-9xl font-display font-black uppercase tracking-tighter mb-8 leading-[0.85]">
            Ready to <br/> <span className="text-white/30 italic font-light">start?</span>
          </h2>
          <p className="text-lg md:text-xl font-body max-w-xl mx-auto mb-12 text-white/60 leading-relaxed">
            Drop by our office in Dergaon, or let's jump on a call. Your next big idea deserves the right team.
          </p>
          <MagneticButton href="/contact" className="bg-white text-black px-10 py-5 text-base font-bold rounded-full hover:scale-105 hover:bg-[#E8156D] hover:text-white shadow-2xl transition-all">
            Let's Talk
          </MagneticButton>
        </div>
      </section>
    </main>
  )
}

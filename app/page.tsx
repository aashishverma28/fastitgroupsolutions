"use client"

import { useEffect, useRef } from "react"
import { HeroScene } from "@/components/3d/HeroScene"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { revealHeadline, glitchText, initColorMorph, staggerCards } from "@/lib/animations"
import Link from "next/link"

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

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100" data-cursor="view">
              <div className="w-16 h-16 rounded-full bg-[#E8156D]/10 flex items-center justify-center mb-8 text-[#E8156D] group-hover:scale-110 transition-transform">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Web & App Dev</h3>
              <p className="text-gray-600 font-body leading-relaxed">High-performance React/Next.js platforms and cross-platform mobile applications tailored to your business needs.</p>
            </div>

            {/* Service Card 2 */}
            <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100" data-cursor="view">
              <div className="w-16 h-16 rounded-full bg-[#FFD93D]/20 flex items-center justify-center mb-8 text-[#D4AF00] group-hover:scale-110 transition-transform">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Creative Design</h3>
              <p className="text-gray-600 font-body leading-relaxed">Immersive 3D experiences, cinematic UI/UX, and brand identities that don't look like everyone else.</p>
            </div>

            {/* Service Card 3 */}
            <div className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100" data-cursor="view">
              <div className="w-16 h-16 rounded-full bg-[#A8D8EA]/30 flex items-center justify-center mb-8 text-[#2B8EB5] group-hover:scale-110 transition-transform">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM12 8v4l3 3"/></svg>
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Cloud & DevOps</h3>
              <p className="text-gray-600 font-body leading-relaxed">Scalable cloud architectures, serverless deployments, and bulletproof infrastructure management.</p>
            </div>
          </div>
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
          
          <div className="relative w-full max-w-5xl min-h-[600px] md:h-[600px] border-4 border-amber-900/10 rounded-3xl bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] shadow-inner p-8 flex flex-col md:block gap-8">
            {/* Note 1 */}
            <div className="relative md:absolute top-0 left-0 md:top-10 md:left-10 bg-[#FFD93D] p-6 shadow-lg md:rotate-3 w-full md:w-64 hover:rotate-0 transition-transform duration-300">
              <div className="w-4 h-4 rounded-full bg-red-500 absolute -top-2 left-1/2 -translate-x-1/2 shadow-sm" />
              <p className="font-hand text-2xl leading-tight text-black">Client: "Can we make it pop?"<br/><br/>Us: *Adds 10,000 WebGL particles*</p>
            </div>

            {/* Note 2 */}
            <div className="relative md:absolute bottom-0 right-0 md:bottom-20 md:right-10 bg-[#A8D8EA] p-6 shadow-lg md:-rotate-6 w-full md:w-72 hover:rotate-0 transition-transform duration-300">
              <div className="w-4 h-4 rounded-full bg-blue-500 absolute -top-2 left-1/2 -translate-x-1/2 shadow-sm" />
              <p className="font-hand text-2xl leading-tight text-black">Reminder:<br/>Quality over quantity. We build apps that people actually enjoy using.</p>
            </div>

            {/* Note 3 */}
            <div className="relative md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-[#FAF9F7] p-8 shadow-2xl md:-rotate-1 w-full md:w-[400px] hover:scale-105 transition-transform duration-500">
              <div className="w-4 h-4 rounded-full bg-zinc-800 absolute -top-2 left-1/2 -translate-x-1/2 shadow-sm" />
              <h3 className="font-display font-bold text-2xl mb-2 text-black">The Fastit Promise:</h3>
              <ul className="font-hand text-2xl space-y-2 text-black">
                <li>1. Honest timelines.</li>
                <li>2. Transparent pricing.</li>
                <li>3. Work we are insanely proud of.</li>
              </ul>
            </div>
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

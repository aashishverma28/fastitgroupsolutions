"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!headlineRef.current) return

    const split = new SplitText(headlineRef.current, { type: "words,chars" })
    
    gsap.fromTo(split.chars, 
      { y: 100, opacity: 0, rotateX: -90 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        stagger: 0.02, 
        duration: 1.2, 
        ease: "expo.out",
        delay: 0.5 
      }
    )

    gsap.fromTo(subtextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.5 }
    )

    // Background parallax
    const handleScroll = () => {
      const scroll = window.scrollY
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${scroll * 0.4}px)`
        contentRef.current.style.opacity = `${1 - scroll / 700}`
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={containerRef} id="about-hero" className="relative w-full h-[120vh] bg-[#050505] overflow-hidden">
      {/* 2D Background Grid & Glow */}
      <div className="absolute inset-0 bg-grid-pattern z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#E8156D]/5 via-[#FFD93D]/5 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Content Overlay */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none pt-20"
      >
        <div className="container mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
             <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#E8156D]">
               Est. 2024 · Dergaon
             </span>
          </div>

          <h1 
            ref={headlineRef}
            className="text-[12vw] md:text-[10vw] font-display font-extrabold leading-[0.8] tracking-tighter text-white uppercase mix-blend-difference"
          >
            Real <span className="text-[#E8156D]">Humans.</span><br/>
            Real <span className="italic font-light text-[#FFD93D]">Tech.</span>
          </h1>

          <p 
            ref={subtextRef}
            className="mt-12 text-lg md:text-2xl text-white/40 font-body max-w-2xl mx-auto leading-relaxed"
          >
            Fastit Group of Solutions is more than code. We are a narrative of persistence, built in the heart of Assam, engineering the next generation of digital infrastructure.
          </p>
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute top-[20%] left-[10%] w-32 h-32 border border-white/5 rounded-full animate-float-slow opacity-20 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-48 h-48 border border-[#E8156D]/10 rounded-full animate-float-slower opacity-20 pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="text-[10px] text-white tracking-[0.4em] uppercase font-bold">Explore</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -20px) rotate(10deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, 30px) rotate(-15deg); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 12s ease-in-out infinite; }
      `}</style>
    </section>
  )
}

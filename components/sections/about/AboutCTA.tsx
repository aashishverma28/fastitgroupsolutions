"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Link from "next/link"
import { initMagnetic } from "@/lib/animations"

export function AboutCTA() {
  const containerRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      initMagnetic(buttonRef.current)
    }

    gsap.fromTo(containerRef.current?.querySelectorAll('.animate-item') || [],
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true
        }
      }
    )
  }, [])

  return (
    <section ref={containerRef} className="bg-[#E8156D] py-[160px] px-6 text-white text-center relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] border-[40px] border-white rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] border-[40px] border-white rounded-full" />
      </div>

      <div className="container mx-auto relative z-10">
        <span className="animate-item block font-satoshi font-bold text-[14px] uppercase tracking-[0.2em] mb-8 opacity-80">
          NEXT STEP
        </span>
        <h2 className="animate-item font-display font-extrabold text-[48px] md:text-[92px] leading-[0.95] mb-12">
          Ready to build<br />something real?
        </h2>
        <p className="animate-item font-satoshi text-[18px] md:text-[21px] text-white/80 max-w-[600px] mx-auto mb-16 leading-relaxed">
          Whether you're in Dergaon or Dallas, we bring the same honesty, speed, and craftsmanship to every project. Let's talk about yours.
        </p>

        <div className="animate-item flex justify-center">
          <Link 
            href="/contact" 
            ref={buttonRef}
            className="inline-flex items-center gap-4 bg-white text-[#E8156D] px-10 py-5 rounded-full font-satoshi font-bold text-[18px] hover:scale-105 transition-transform duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
          >
            Start a Project
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

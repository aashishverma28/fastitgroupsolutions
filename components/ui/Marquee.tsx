"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

const MARQUEE_ITEMS = [
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
]

export function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const track = trackRef.current
    const items = track.children
    const totalWidth = track.scrollWidth / 2 // Since we duplicate items

    const tl = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: 30,
      ease: "none",
      repeat: -1,
    })

    const onMouseEnter = () => gsap.to(tl, { timeScale: 0.35, duration: 0.5 })
    const onMouseLeave = () => gsap.to(tl, { timeScale: 1, duration: 0.5 })

    containerRef.current.addEventListener("mouseenter", onMouseEnter)
    containerRef.current.addEventListener("mouseleave", onMouseLeave)

    return () => {
      tl.kill()
      containerRef.current?.removeEventListener("mouseenter", onMouseEnter)
      containerRef.current?.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full bg-[#0A0A0A] py-8 md:py-12 overflow-hidden border-y border-white/5"
    >
      <div 
        ref={trackRef}
        className="flex whitespace-nowrap items-center"
      >
        {/* First set of items */}
        {MARQUEE_ITEMS.map((item, i) => (
          <div key={`m1-${i}`} className="flex items-center">
            <span className="font-display text-4xl md:text-7xl font-bold text-white/20 px-8 hover:text-[#E8156D] transition-colors duration-500 uppercase tracking-tighter">
              {item}
            </span>
            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E8156D] opacity-40 mx-4" />
          </div>
        ))}
        {/* Duplicated set for infinite effect */}
        {MARQUEE_ITEMS.map((item, i) => (
          <div key={`m2-${i}`} className="flex items-center">
            <span className="font-display text-4xl md:text-7xl font-bold text-white/20 px-8 hover:text-[#E8156D] transition-colors duration-500 uppercase tracking-tighter">
              {item}
            </span>
            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E8156D] opacity-40 mx-4" />
          </div>
        ))}
      </div>
    </div>
  )
}

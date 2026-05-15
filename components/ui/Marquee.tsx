"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface MarqueeProps {
  items: string[]
  speed?: number
  className?: string
  bg?: string
  textColor?: string
}

export function Marquee({ 
  items, 
  speed = 30, 
  className = "", 
  bg = "bg-[#0A0A0A]", 
  textColor = "text-white/20" 
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return

    const track = trackRef.current
    const totalWidth = track.scrollWidth / 2

    const tl = gsap.to(track, {
      x: `-=${totalWidth}`,
      duration: speed,
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
  }, [items, speed])

  return (
    <div 
      ref={containerRef}
      className={`relative w-full ${bg} py-8 md:py-12 overflow-hidden border-y border-white/5 ${className}`}
    >
      <div 
        ref={trackRef}
        className="flex whitespace-nowrap items-center"
      >
        {/* Double the items for seamless loop */}
        {[...items, ...items].map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center">
            <span className={`font-display text-4xl md:text-7xl font-bold ${textColor} px-8 hover:text-[#E8156D] transition-colors duration-500 uppercase tracking-tighter`}>
              {item}
            </span>
            <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#E8156D] opacity-40 mx-4" />
          </div>
        ))}
      </div>
    </div>
  )
}

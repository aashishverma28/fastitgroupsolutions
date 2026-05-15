"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const lens = useRef<HTMLDivElement>(null)
  const outer = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  
  const pos = useRef({ x: 0, y: 0 })
  const vel = useRef({ x: 0, y: 0 })
  const lensPos = useRef({ x: 0, y: 0 })
  const outerPos = useRef({ x: 0, y: 0 })
  
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 768
      setIsDesktop(desktop)
      if (desktop) {
        document.body.style.cursor = "none"
      } else {
        document.body.style.cursor = "auto"
      }
    }

    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    
    if (window.innerWidth < 768) return

    const move = (e: MouseEvent) => {
      // Calculate velocity for squash/stretch
      vel.current.x = e.clientX - pos.current.x
      vel.current.y = e.clientY - pos.current.y
      pos.current = { x: e.clientX, y: e.clientY }
      
      gsap.to(dot.current, { 
        x: e.clientX, y: e.clientY, 
        duration: 0.1, 
        ease: "power3.out" 
      })
    }

    const render = () => {
      // Lerp for lens
      lensPos.current.x += (pos.current.x - lensPos.current.x) * 0.15
      lensPos.current.y += (pos.current.y - lensPos.current.y) * 0.15
      
      // Lerp for outer (slower for depth)
      outerPos.current.x += (pos.current.x - outerPos.current.x) * 0.08
      outerPos.current.y += (pos.current.y - outerPos.current.y) * 0.08

      // Velocity-based tilting & stretching
      const rotation = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI)
      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2)
      const scaleX = 1 + Math.min(speed / 100, 0.35)
      const scaleY = 1 - Math.min(speed / 150, 0.2)

      if (lens.current) {
        gsap.set(lens.current, { 
          x: lensPos.current.x, 
          y: lensPos.current.y,
          rotation: rotation,
          scaleX: scaleX,
          scaleY: scaleY
        })
      }
      
      if (outer.current) {
        gsap.set(outer.current, { 
          x: outerPos.current.x, 
          y: outerPos.current.y,
          rotation: rotation * 0.5,
          scale: 1 + Math.min(speed / 200, 0.1)
        })
      }

      // Decay velocity
      vel.current.x *= 0.9
      vel.current.y *= 0.9

      requestAnimationFrame(render)
    }
    
    const raf = requestAnimationFrame(render)

    // Interaction Listeners
    const handleMouseEnter = () => {
      gsap.to(lens.current, { 
        scale: 2.2, 
        backgroundColor: "rgba(232, 21, 109, 0.08)", 
        borderColor: "rgba(232, 21, 109, 0.4)",
        duration: 0.4, 
        ease: "power3.out" 
      })
      gsap.to(dot.current, { scale: 0, opacity: 0, duration: 0.2 })
    }

    const handleMouseLeave = () => {
      gsap.to(lens.current, { 
        scale: 1, 
        backgroundColor: "rgba(255, 255, 255, 0.05)", 
        borderColor: "rgba(255, 255, 255, 0.2)",
        duration: 0.4, 
        ease: "elastic.out(1, 0.5)" 
      })
      gsap.to(dot.current, { scale: 1, opacity: 1, duration: 0.3 })
    }

    const handleViewEnter = () => {
      gsap.to(lens.current, { 
        scale: 3, 
        backgroundColor: "#E8156D", 
        borderColor: "#E8156D", 
        duration: 0.5, 
        ease: "back.out(1.7)" 
      })
      gsap.to(label.current, { opacity: 1, scale: 1, duration: 0.3, delay: 0.1 })
    }

    const handleViewLeave = () => {
      gsap.to(label.current, { opacity: 0, scale: 0.5, duration: 0.2 })
      handleMouseLeave()
    }

    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    document.querySelectorAll("[data-cursor='view']").forEach(el => {
      el.addEventListener("mouseenter", handleViewEnter)
      el.addEventListener("mouseleave", handleViewLeave)
    })

    window.addEventListener("click", () => {
      gsap.timeline()
        .to(lens.current, { scale: 0.8, duration: 0.1 })
        .to(lens.current, { scale: 1, duration: 0.4, ease: "elastic.out(1, 0.3)" })
    })

    window.addEventListener("mousemove", move)
    
    return () => {
      document.body.style.cursor = "auto"
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", move)
      window.removeEventListener("resize", checkDesktop)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <>
      {/* 1. Sharp Dot (The "Tip") */}
      <div 
        ref={dot} 
        className="fixed w-1.5 h-1.5 bg-[#E8156D] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference shadow-[0_0_10px_#E8156D]" 
      />
      
      {/* 2. Glassmorphic Lens (3D Feel) */}
      <div 
        ref={lens} 
        className="fixed w-10 h-10 rounded-full border border-white/20 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 backdrop-blur-[6px] bg-white/5 flex items-center justify-center transition-colors duration-300"
        style={{ boxShadow: "inset 0 0 15px rgba(255,255,255,0.1), 0 10px 30px rgba(0,0,0,0.2)" }}
      >
        <span ref={label} className="text-[9px] font-bold text-white opacity-0 scale-50 tracking-widest uppercase">VIEW</span>
      </div>
      
      {/* 3. Outer Depth Ring */}
      <div 
        ref={outer} 
        className="fixed w-14 h-14 rounded-full border-[0.5px] border-white/10 pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2"
      />
    </>
  )
}

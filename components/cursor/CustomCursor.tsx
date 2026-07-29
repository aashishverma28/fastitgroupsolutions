"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const core = useRef<HTMLDivElement>(null)
  const aura = useRef<HTMLDivElement>(null)
  const ripple = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  
  const mouse = useRef({ x: 0, y: 0 })
  const vel = useRef({ x: 0, y: 0 })
  
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      const desktop = window.innerWidth >= 1024
      setIsDesktop(desktop)
      document.body.style.cursor = desktop ? "none" : "auto"
    }

    checkDesktop()
    window.addEventListener("resize", checkDesktop)
    
    if (window.innerWidth < 1024) return

    // QuickTo setters for high performance and zero lag
    const coreX = gsap.quickTo(core.current, "x", { duration: 0.08, ease: "power3" })
    const coreY = gsap.quickTo(core.current, "y", { duration: 0.08, ease: "power3" })
    const auraX = gsap.quickTo(aura.current, "x", { duration: 0.45, ease: "power4.out" })
    const auraY = gsap.quickTo(aura.current, "y", { duration: 0.45, ease: "power4.out" })

    const move = (e: MouseEvent) => {
      // Calculate velocity for stretching
      vel.current.x = e.clientX - mouse.current.x
      vel.current.y = e.clientY - mouse.current.y
      mouse.current = { x: e.clientX, y: e.clientY }
      
      coreX(e.clientX)
      coreY(e.clientY)
      auraX(e.clientX)
      auraY(e.clientY)
    }

    const render = () => {
      // Velocity-based stretching/squashing for a liquid feel
      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2)
      const rotation = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI)
      const stretch = 1 + Math.min(speed / 180, 0.35)
      const squash = 1 - Math.min(speed / 220, 0.15)

      if (aura.current && speed > 0.1) {
        gsap.set(aura.current, {
          rotation: rotation,
          scaleX: stretch,
          scaleY: squash,
        })
      }

      // Smoothly decay velocity
      vel.current.x *= 0.82
      vel.current.y *= 0.82

      requestAnimationFrame(render)
    }
    
    const raf = requestAnimationFrame(render)

    // Event Delegation Handlers for High Performance (No MutationObservers)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      
      const interactable = target.closest("a, button, [role='button'], input, textarea, select")
      const viewable = target.closest("[data-cursor='view']")
      
      if (interactable) {
        gsap.to(aura.current, { 
          width: 80,
          height: 80,
          backgroundColor: "rgba(232, 21, 109, 0.12)",
          borderColor: "rgba(232, 21, 109, 0.5)",
          borderWidth: "1.5px",
          backdropFilter: "blur(8px)",
          duration: 0.35, 
          ease: "power3.out" 
        })
        gsap.to(core.current, { 
          scale: 0.5, 
          opacity: 0.3,
          backgroundColor: "#fff",
          duration: 0.3 
        })
      } else if (viewable) {
        gsap.to(aura.current, { 
          width: 100,
          height: 100,
          backgroundColor: "#E8156D",
          borderColor: "#E8156D",
          duration: 0.4, 
          ease: "power4.out"
        })
        gsap.to(label.current, { opacity: 1, scale: 1, duration: 0.3 })
        gsap.to(core.current, { opacity: 0, scale: 0, duration: 0.2 })
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      
      const interactable = target.closest("a, button, [role='button'], input, textarea, select")
      const viewable = target.closest("[data-cursor='view']")
      
      if (interactable || viewable) {
        gsap.to(aura.current, { 
          width: 48,
          height: 48,
          backgroundColor: "rgba(255, 255, 255, 0.03)",
          borderColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "1px",
          backdropFilter: "blur(4px)",
          duration: 0.4, 
          ease: "power3.out"
        })
        gsap.to(label.current, { opacity: 0, scale: 0.5, duration: 0.2 })
        gsap.to(core.current, { 
          scale: 1, 
          opacity: 1,
          backgroundColor: "#E8156D",
          duration: 0.25 
        })
      }
    }

    const handleClick = () => {
      if (!ripple.current) return
      
      const tl = gsap.timeline()
      gsap.set(ripple.current, { 
        x: mouse.current.x, 
        y: mouse.current.y, 
        scale: 0, 
        opacity: 1 
      })
      
      tl.to(ripple.current, {
        scale: 6,
        opacity: 0,
        duration: 0.75,
        ease: "power2.out"
      })
      
      gsap.to(aura.current, {
        scale: 0.75,
        duration: 0.08,
        onComplete: () => {
          gsap.to(aura.current, { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.3)" })
        }
      })
    }

    window.addEventListener("click", handleClick)
    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mouseout", handleMouseOut)
    
    return () => {
      document.body.style.cursor = "auto"
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", move)
      window.removeEventListener("resize", checkDesktop)
      window.removeEventListener("click", handleClick)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mouseout", handleMouseOut)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  return (
    <>
      {/* 1. Sharp Precision Core */}
      <div 
        ref={core} 
        className="fixed top-0 left-0 w-2 h-2 bg-[#E8156D] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference shadow-[0_0_15px_rgba(232,21,109,0.8)]" 
      />
      
      {/* 2. Glassmorphic Liquid Aura */}
      <div 
        ref={aura} 
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-white/20 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 backdrop-blur-[4px] bg-white/5 flex items-center justify-center will-change-transform"
        style={{ 
          boxShadow: "inset 0 0 20px rgba(255,255,255,0.05), 0 10px 40px rgba(0,0,0,0.3)",
          transition: "width 0.3s cubic-bezier(0.25, 1, 0.5, 1), height 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s, border-color 0.3s"
        }}
      >
        <span ref={label} className="text-[10px] font-black text-white opacity-0 scale-50 tracking-[0.3em] uppercase pointer-events-none select-none">VIEW</span>
      </div>
      
      {/* 3. High-Intensity Click Ripple */}
      <div 
        ref={ripple}
        className="fixed top-0 left-0 w-16 h-16 border border-[#E8156D]/40 rounded-full pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0"
      />
    </>
  )
}

"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring_pos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.innerWidth < 768) return
    document.body.style.cursor = "none"

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.06, ease: "power4.out" })
    }

    const lerp = () => {
      ring_pos.current.x += (pos.current.x - ring_pos.current.x) * 0.11
      ring_pos.current.y += (pos.current.y - ring_pos.current.y) * 0.11
      gsap.set(ring.current, { x: ring_pos.current.x, y: ring_pos.current.y })
      requestAnimationFrame(lerp)
    }
    const raf = requestAnimationFrame(lerp)

    // Link hover
    document.querySelectorAll("a,button").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(ring.current, { scale: 1.7, backgroundColor: "rgba(232,21,109,0.12)", borderColor: "#E8156D", duration: 0.3, ease: "power2.out" })
        gsap.to(dot.current, { scale: 0, opacity: 0, duration: 0.2 })
      })
      el.addEventListener("mouseleave", () => resetCursor())
    })

    // Image/card hover — shows "VIEW"
    document.querySelectorAll("[data-cursor='view']").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(ring.current, { scale: 2.4, backgroundColor: "#E8156D", borderColor: "#E8156D", duration: 0.38, ease: "back.out(1.5)" })
        gsap.to(dot.current, { scale: 0, opacity: 0, duration: 0.2 })
        gsap.to(label.current, { opacity: 1, scale: 1, duration: 0.25, delay: 0.1 })
      })
      el.addEventListener("mouseleave", () => {
        gsap.to(label.current, { opacity: 0, scale: 0.8, duration: 0.18 })
        resetCursor()
      })
    })

    // Click pulse
    window.addEventListener("click", () => {
      gsap.timeline()
        .to(ring.current, { scale: 1.8, opacity: 0.5, duration: 0.18, ease: "power2.out" })
        .to(ring.current, { scale: 1, opacity: 1, duration: 0.45, ease: "elastic.out(1, 0.4)" })
    })

    const resetCursor = () => {
      gsap.to(ring.current, { scale: 1, backgroundColor: "transparent", borderColor: "#E8156D", duration: 0.42, ease: "elastic.out(1, 0.4)" })
      gsap.to(dot.current, { scale: 1, opacity: 1, duration: 0.28 })
    }

    window.addEventListener("mousemove", move)
    return () => {
      document.body.style.cursor = "auto"
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", move)
    }
  }, [])

  return (
    <>
      <div ref={dot} style={{ position:"fixed", width:8, height:8, backgroundColor:"#E8156D", borderRadius:"50%", pointerEvents:"none", zIndex:99999, transform:"translate(-50%,-50%)", mixBlendMode:"difference" }} />
      <div ref={ring} style={{ position:"fixed", width:40, height:40, border:"1.5px solid #E8156D", borderRadius:"50%", pointerEvents:"none", zIndex:99998, transform:"translate(-50%,-50%)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <span ref={label} style={{ fontSize:9, fontFamily:"Satoshi", fontWeight:700, color:"white", opacity:0, transform:"scale(0.8)", letterSpacing:"0.06em" }}>VIEW</span>
      </div>
    </>
  )
}

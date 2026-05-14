"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import gsap from "gsap"

export function PageTransition() {
  const overlay = useRef<HTMLDivElement>(null)
  const wordmark = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Page enters — overlay wipes upward to reveal
    gsap.timeline()
      .set(overlay.current, { clipPath: "inset(0% 0% 0% 0%)", display: "flex" })
      .to(wordmark.current, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })
      .to(overlay.current, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.75, ease: "power4.inOut", delay: 0.25,
      })
      .to(wordmark.current, { opacity: 0, y: -20, duration: 0.2 }, "-=0.4")
      .set(overlay.current, { display: "none" })
  }, [pathname])

  return (
    <div
      ref={overlay}
      id="page-overlay"
      style={{
        position: "fixed", inset: 0, zIndex: 99999,
        backgroundColor: "#E8156D",
        display: "none",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        ref={wordmark}
        style={{
          opacity: 0,
          transform: "translateY(20px)",
          color: "white",
          fontFamily: "Clash Display",
          fontWeight: 700,
          fontSize: 36,
          letterSpacing: "-0.02em",
          textAlign: "center",
        }}
      >
        Fastit
        <div style={{ fontSize: 13, fontWeight: 400, letterSpacing: "0.12em", opacity: 0.65, marginTop: 4 }}>
          DERGAON · ASSAM · INDIA
        </div>
      </div>
    </div>
  )
}

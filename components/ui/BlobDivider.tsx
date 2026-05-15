"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

interface BlobDividerProps {
  fromColor: string
  toColor: string
}

export function BlobDivider({ fromColor, toColor }: BlobDividerProps) {
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return

    const shapes = [
      "M0,64 C120,40 240,88 360,64 C480,40 600,0 720,32 C840,64 960,128 1080,112 C1200,96 1320,0 1440,32 L1440,160 L0,160 Z",
      "M0,96 C180,128 360,64 540,64 C720,64 900,128 1080,96 C1260,64 1380,32 1440,64 L1440,160 L0,160 Z",
      "M0,32 C120,64 240,128 360,96 C480,64 600,32 720,64 C840,96 960,128 1080,96 C1200,64 1320,32 1440,64 L1440,160 L0,160 Z"
    ]

    let i = 0
    const morph = () => {
      i = (i + 1) % shapes.length
      gsap.to(pathRef.current, {
        attr: { d: shapes[i] },
        duration: 4,
        ease: "power1.inOut",
        onComplete: morph
      })
    }

    morph()
  }, [])

  return (
    <div 
      className="relative w-full h-24 -mt-12 z-20 pointer-events-none" 
      style={{ backgroundColor: fromColor }}
    >
      <svg
        className="absolute bottom-0 w-full h-full"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d="M0,64 C120,40 240,88 360,64 C480,40 600,0 720,32 C840,64 960,128 1080,112 C1200,96 1320,0 1440,32 L1440,160 L0,160 Z"
          fill={toColor}
        />
      </svg>
    </div>
  )
}

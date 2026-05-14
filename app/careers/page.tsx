"use client"

import { useEffect, useRef } from "react"
import { revealHeadline } from "@/lib/animations"
import { MagneticButton } from "@/components/ui/MagneticButton"

export default function Careers() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (headlineRef.current) revealHeadline(headlineRef.current)
  }, [])

  return (
    <main className="relative w-full min-h-screen bg-[#FAF9F7] overflow-hidden pt-32 pb-20 text-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-bold leading-tight mb-20">
          Join the <span className="font-hand text-[#A8D8EA] italic">Rebellion.</span>
        </h1>
        
        <div className="max-w-3xl mb-20">
          <p className="text-2xl font-body text-gray-700 leading-relaxed">
            We are always looking for restless creators, meticulous engineers, and people who are uncomfortable with the status quo. If you want to build things that matter, right here from Assam, we should talk.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl">
          <h3 className="text-2xl font-display font-bold mb-8">Open Positions</h3>
          
          <div className="group bg-white p-8 rounded-3xl border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center hover:border-[#E8156D] transition-colors cursor-crosshair">
            <div>
              <h4 className="text-2xl font-display font-bold mb-2">Senior Next.js Engineer</h4>
              <div className="flex gap-4 text-sm font-bold uppercase tracking-widest text-gray-500">
                <span>Dergaon (On-site)</span>
                <span>Full-time</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <MagneticButton className="bg-[#0A0A0A] text-white px-8 py-3 hover:bg-[#E8156D]">
                Apply Now
              </MagneticButton>
            </div>
          </div>
          
          <div className="group bg-white p-8 rounded-3xl border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center hover:border-[#E8156D] transition-colors cursor-crosshair">
            <div>
              <h4 className="text-2xl font-display font-bold mb-2">Creative UI/UX Designer</h4>
              <div className="flex gap-4 text-sm font-bold uppercase tracking-widest text-gray-500">
                <span>Dergaon / Hybrid</span>
                <span>Full-time</span>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <MagneticButton className="bg-[#0A0A0A] text-white px-8 py-3 hover:bg-[#E8156D]">
                Apply Now
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

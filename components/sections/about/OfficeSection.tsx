"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function OfficeSection() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cardsRef.current) return

    const cards = cardsRef.current.querySelectorAll('.office-card')
    
    gsap.fromTo(cards,
      { opacity: 0, scale: 0.9, y: 40 },
      {
        opacity: 1, scale: 1, y: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
          once: true
        }
      }
    )
  }, [])

  return (
    <section id="offices" className="bg-[#050505] py-[140px] px-6 md:px-20 relative overflow-hidden">
      {/* Decorative text background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[200px] md:text-[400px] text-white/[0.01] whitespace-nowrap pointer-events-none select-none z-0">
        DERGAON
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-[700px] mb-20">
          <span className="block font-satoshi font-semibold text-[12px] text-[#E8156D] uppercase tracking-[0.15em] mb-4">
            OUR LOCATIONS
          </span>
          <h2 className="font-display font-extrabold text-[48px] md:text-[72px] text-white uppercase tracking-tighter leading-tight mb-8">
            Two offices.<br />One town.
          </h2>
          <p className="font-satoshi text-[18px] text-white/60 leading-relaxed">
            We're not just 'online.' We are physically present in the heart of our community. If you're in Dergaon, you can find us at either of these two spots.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Office 1 */}
          <div className="office-card group bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-[30px] p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500">
            <div className="w-12 h-12 bg-[#E8156D] rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-[#E8156D]/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 21H21" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M5 21V7L13 3V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M19 21V11L13 11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 7H11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 11H11" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <path d="M9 15H11" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="block font-satoshi font-bold text-[13px] text-[#E8156D] uppercase tracking-widest mb-2">Corporate Office</span>
            <h3 className="font-display font-bold text-[28px] text-white uppercase tracking-tight mb-4">Near Bapuji Mandir</h3>
            <p className="font-satoshi text-[16px] text-white/60 leading-relaxed mb-8">
              Ward No. 04, Near Bapuji Mandir,<br />
              Dergaon, Dist. Golaghat,<br />
              Assam, 785614
            </p>
            <div className="flex items-center gap-2 font-satoshi font-semibold text-[14px] text-white group-hover:text-[#E8156D] transition-colors">
              <span>Main Hub</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Office 2 */}
          <div className="office-card group bg-white/[0.02] border border-white/5 backdrop-blur-xl rounded-[30px] p-10 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500">
            <div className="w-12 h-12 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-black/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V12L15 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="block font-satoshi font-bold text-[13px] text-[#A8D8EA] uppercase tracking-widest mb-2">Registered Office</span>
            <h3 className="font-display font-bold text-[28px] text-white uppercase tracking-tight mb-4">Rangamamati</h3>
            <p className="font-satoshi text-[16px] text-white/60 leading-relaxed mb-8">
              Rangamamati, Ward No. 03,<br />
              Dergaon, Dist. Golaghat,<br />
              Assam, 785614
            </p>
            <div className="flex items-center gap-2 font-satoshi font-semibold text-[14px] text-white group-hover:text-[#A8D8EA] transition-colors">
              <span>Legal Home</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

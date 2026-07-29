"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function AboutTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  const events = [
    { year: "2024", title: "The Spark", description: "Aashish Verma founds Fastit Group of Solutions from Rangamamati, Dergaon while studying CSE." },
    { year: "2024", title: "Local Impact", description: "First 5 local businesses in Golaghat district move their operations online with Fastit." },
    { year: "2024", title: "Expansion", description: "Corporate office established near Bapuji Mandir to house a growing team of local talent." },
    { year: "Future", title: "Beyond Boundaries", description: "Proving that world-class software can be built from any corner of Northeast India." }
  ]

  useEffect(() => {
    if (!containerRef.current) return

    const items = containerRef.current.querySelectorAll('.timeline-item')
    const line = containerRef.current.querySelector('.timeline-line')

    gsap.fromTo(line,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 70%",
          scrub: true
        }
      }
    )

    items.forEach((item, i) => {
      const dot = item.querySelector('.timeline-dot')
      const content = item.querySelector('.timeline-content')

      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            once: true
          }
        }
      )

      gsap.fromTo(content,
        { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            once: true
          }
        }
      )
    })
  }, [])

  return (
    <section className="bg-[#050505] py-[140px] px-6 overflow-hidden border-t border-white/5">
      <div className="container mx-auto">
        <div className="text-center mb-24">
          <span className="block font-satoshi font-semibold text-[12px] text-[#E8156D] uppercase tracking-[0.15em] mb-4">
            OUR JOURNEY
          </span>
          <h2 className="font-display font-extrabold text-[48px] md:text-[72px] text-white uppercase tracking-tighter">
            The Story So Far.
          </h2>
        </div>

        <div ref={containerRef} className="relative max-w-[900px] mx-auto pt-10">
          {/* Vertical Line */}
          <div className="timeline-line absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full bg-[#E8156D]/20 origin-top" />

          {events.map((event, index) => (
            <div key={index} className={`timeline-item relative flex items-center mb-24 last:mb-0 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Content */}
              <div className={`timeline-content w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <span className="font-display font-bold text-[32px] text-[#E8156D] block mb-2">{event.year}</span>
                <h3 className="font-display font-bold text-[22px] text-white uppercase tracking-tight mb-3">{event.title}</h3>
                <p className="font-satoshi text-[16px] text-white/60 leading-relaxed">{event.description}</p>
              </div>

              {/* Dot */}
              <div className="timeline-dot absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#E8156D] rounded-full border-4 border-[#050505] shadow-[0_0_0_4px_rgba(232,21,109,0.15)] z-10" />

              {/* Empty Spacer */}
              <div className="w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

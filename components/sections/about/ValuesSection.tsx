"use client"

import { useState, useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface ValueItemProps {
  number: string
  title: string
  description: string
  isOpen: boolean
  onClick: () => void
}

function ValueItem({ number, title, description, isOpen, onClick }: ValueItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      gsap.to(contentRef.current, { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" })
    } else {
      gsap.to(contentRef.current, { height: 0, opacity: 0, duration: 0.5, ease: "power3.inOut" })
    }
  }, [isOpen])

  return (
    <div 
      className={`group border-b border-white/10 cursor-pointer transition-colors duration-500 ${isOpen ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
      onClick={onClick}
    >
      <div className="container mx-auto px-6 md:px-20 py-10 md:py-14 flex flex-col md:flex-row md:items-center gap-6 md:gap-20">
        {/* Number */}
        <div className={`font-display font-bold text-[18px] transition-colors duration-500 ${isOpen ? 'text-[#E8156D]' : 'text-white/30'}`}>
          {number}
        </div>
        
        {/* Title */}
        <div className="flex-1">
          <h3 className={`font-display font-bold text-[32px] md:text-[54px] leading-none transition-all duration-500 ${isOpen ? 'text-white' : 'text-white/40 group-hover:text-white/60'}`}>
            {title}
          </h3>
          
          {/* Description (Expandable) */}
          <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
            <p className="font-satoshi text-[18px] text-white/50 leading-relaxed max-w-[700px] pt-8">
              {description}
            </p>
          </div>
        </div>

        {/* Arrow */}
        <div className={`w-12 h-12 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 ${isOpen ? 'rotate-180 bg-[#E8156D] border-[#E8156D]' : 'group-hover:border-white/40'}`}>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L7 7L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export function ValuesSection() {
  const [openIndex, setOpenIndex] = useState(0)
  const headerRef = useRef<HTMLDivElement>(null)

  const values = [
    {
      number: "01",
      title: "Hard-Truth Honesty.",
      description: "We don't overpromise. We don't hide mistakes. If a project is falling behind, we tell you. If a feature is unnecessary, we tell you. We believe our clients are smart enough to handle the truth, and we're honest enough to give it."
    },
    {
      number: "02",
      title: "Dergaon-Rooted Pride.",
      description: "We don't try to look like we're from Silicon Valley. We are from Dergaon, Assam. We are proud of our roots, our local talent, and our contribution to the economy of our home region."
    },
    {
      number: "03",
      title: "Zero-Jargon Clarity.",
      description: "Our job isn't to sound smart. Our job is to make your business grow. We talk in terms of results, timelines, and impact — not technical acronyms that make clients feel excluded."
    },
    {
      number: "04",
      title: "Craft Over Templates.",
      description: "Templates are for hobbies. We build for businesses. Every line of code, every pixel, every database entry is built specifically for the client we are serving."
    }
  ]

  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          once: true
        }
      }
    )
  }, [])

  return (
    <section id="values" className="bg-[#0A0A0A] py-[140px] text-white">
      <div ref={headerRef} className="container mx-auto px-6 md:px-20 mb-20">
        <span className="block font-satoshi font-semibold text-[12px] text-[#E8156D] uppercase tracking-[0.15em] mb-4">
          OUR VALUES
        </span>
        <h2 className="font-display font-extrabold text-[48px] md:text-[72px] leading-tight">
          What we <span className="italic text-[#E8156D]">actually</span> care about.
        </h2>
      </div>

      <div className="border-t border-white/10">
        {values.map((value, index) => (
          <ValueItem 
            key={index}
            {...value}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(index)}
          />
        ))}
      </div>
    </section>
  )
}

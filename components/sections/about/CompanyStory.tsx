"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


export function CompanyStory() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const parts = containerRef.current.querySelectorAll('.story-part')
    
    parts.forEach((part) => {
      const number = part.querySelector('.part-number')
      const paragraphs = part.querySelectorAll('.body-text p, .standalone-statement')
      const underline = part.querySelector('.hand-drawn-underline')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: part,
          start: "top 75%",
          once: true
        }
      })

      tl.fromTo(number,
        { opacity: 0, scale: 1.2 },
        { opacity: 0.15, scale: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(paragraphs,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        "-=0.5"
      )

      if (underline) {
        tl.fromTo(underline,
          { strokeDashoffset: 1000 },
          { strokeDashoffset: 0, duration: 1, ease: "power2.inOut" },
          "-=0.3"
        )
      }
    })
  }, [])

  return (
    <section id="about-snap" ref={containerRef} className="bg-[#050505] py-[140px] px-6 md:px-20 text-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-24">
          <span className="block font-satoshi font-semibold text-[12px] text-[#E8156D] uppercase tracking-[0.15em] mb-4">
            THE STORY
          </span>
          <h2 className="relative flex flex-col font-display font-extrabold text-[60px] md:text-[88px] leading-none uppercase tracking-tighter">
            <span>How Fastit</span>
            <span className="text-[#E8156D] italic font-light lowercase relative">
              Came to Be.
              <div className="absolute bottom-[-10px] left-0 w-32 h-[3px] bg-gradient-to-r from-[#E8156D] to-transparent shadow-[0_0_10px_rgba(232,21,109,0.8)] rounded-full" />
            </span>
          </h2>
        </div>

        {/* Part 1 — The Beginning */}
        <div className="story-part grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 mb-[160px]">
          <div>
            <span className="part-number block font-display font-extrabold text-[120px] text-[#E8156D] opacity-[0.15] leading-none">01</span>
            <h3 className="font-display font-bold text-[32px] uppercase tracking-tight mt-4 text-white">The Beginning</h3>
          </div>
          <div className="body-text font-satoshi text-[18px] text-white/60 leading-[1.85] max-w-[640px] space-y-6">
            <p>
              It started with a simple observation. Most businesses in Northeast India — especially in towns like Dergaon, Jorhat, Golaghat, Tezpur — were operating in a digital gap.
            </p>
            <p>
              They had real products. Real services. Real customers who were increasingly spending time online. But their digital presence didn't reflect the quality of what they actually offered.
            </p>
            <p>
              Not because they didn't care. But because good digital help was either too expensive, too far away, or too disconnected from the reality of doing business in this part of the country.
            </p>
            <p>
              Aashish Verma saw this gap from where he was — a computer science student in Golaghat — and decided that gap was exactly where he should build.
            </p>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mb-[140px]" />

        {/* Part 2 — The Name */}
        <div className="story-part grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 mb-[160px]">
          <div className="body-text order-2 lg:order-1 font-satoshi text-[18px] text-white/60 leading-[1.85] max-w-[640px] space-y-6">
            <p>
              The name Fastit Group of Solutions carries a deliberate message.
            </p>
            <p>
              Fast — because in the digital world, speed matters. Projects should move quickly. Decisions should be made efficiently. Clients shouldn't wait months to see results.
            </p>
            <p>
              It — because technology is at the heart of everything the company does. Not as a buzzword. Not as a selling point. But as the actual craft.
            </p>
            
            {/* NAME BREAKDOWN VISUAL */}
            <div className="flex flex-col md:flex-row gap-6 my-12">
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                <div className="text-[#E8156D] font-display font-bold text-[22px] mb-2 uppercase tracking-tight">Fast.</div>
                <p className="text-[13px] text-white/40 leading-relaxed">Speed. Efficiency. Momentum.</p>
              </div>
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                <div className="text-[#FFD93D] font-display font-bold text-[22px] mb-2 uppercase tracking-tight">it.</div>
                <p className="text-[13px] text-white/40 leading-relaxed">Technology at the core.</p>
              </div>
              <div className="flex-1 bg-white/[0.02] border border-white/5 p-6 rounded-2xl">
                <div className="text-[#A8D8EA] font-display font-bold text-[18px] mb-2 uppercase tracking-tight">Solutions.</div>
                <p className="text-[13px] text-white/40 leading-relaxed">Complete. Not partial.</p>
              </div>
            </div>

            <p>
              Group of Solutions — because no real digital problem has just one answer. A business doesn't need 'a website.' It needs a complete digital strategy — and a team that understands that.
            </p>
            <p>
              Together, the name reflects what the company actually is: A fast-moving, technology-first, solutions-oriented group of people who take their work seriously and their clients' goals even more so.
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <span className="part-number block font-display font-extrabold text-[120px] text-[#FFD93D] opacity-[0.15] leading-none">02</span>
            <h3 className="font-display font-bold text-[32px] uppercase tracking-tight mt-4 text-white">Why 'Fastit'?</h3>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent mb-[140px]" />

        {/* Part 3 — Why Dergaon? */}
        <div className="story-part grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 relative">
          <div>
            <span className="part-number block font-display font-extrabold text-[120px] text-[#A8D8EA] opacity-[0.15] leading-none">03</span>
            <h3 className="font-display font-bold text-[32px] uppercase tracking-tight mt-4 text-white">Why Dergaon?</h3>
          </div>
          <div className="body-text font-satoshi text-[18px] text-white/60 leading-[1.85] max-w-[640px] space-y-6">
            <p>
              People sometimes ask us why we didn't set up in Guwahati. Or why we didn't move to Bangalore like so many tech professionals from Northeast India eventually do. The answer is honest and simple:
            </p>
            
            <div className="standalone-statement font-display font-extrabold text-[28px] md:text-[32px] text-white uppercase tracking-tighter my-8 relative inline-block bg-white/[0.02] border border-white/5 px-8 py-5 rounded-[24px]">
              Because Dergaon needs it more.
              <div className="absolute -bottom-[2px] left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#FFD93D] to-transparent shadow-[0_0_10px_rgba(255,217,61,0.8)]" />
            </div>

            <p>
              Guwahati has IT companies. Bangalore has thousands. But Dergaon — and the hundreds of towns like it across Assam and Northeast India — has real businesses with real needs and not enough people who understand both technology and the local context well enough to actually help.
            </p>
            <p>
              We understand both. We know what it means to run a business in this region. We know the language — literally and figuratively. We know the challenges.
            </p>
            <p>
              Our registered office is in Rangamamati, Dergaon. Our corporate office is near Bapuji Mandir, Dergaon. Both in the same town. Both in Golaghat district. Both in Assam.
            </p>
            <p className="font-semibold text-[#E8156D] uppercase tracking-wider text-sm mt-8 block">
              That's not an accident. That's a commitment.
            </p>
          </div>

          {/* Decorative 2D Glow Spot */}
          <div className="absolute right-0 bottom-0 w-[200px] h-[200px] bg-[#E8156D]/5 blur-[60px] rounded-full pointer-events-none hidden lg:block" />
        </div>
      </div>
    </section>
  )
}

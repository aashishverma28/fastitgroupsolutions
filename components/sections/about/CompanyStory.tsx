"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Canvas } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"

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
    <section id="about-snap" ref={containerRef} className="bg-[#0F0F0F] py-[140px] px-6 md:px-20 text-white">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="mb-24">
          <span className="block font-satoshi font-semibold text-[12px] text-[#E8156D] uppercase tracking-[0.15em] mb-4">
            THE STORY
          </span>
          <h2 className="relative flex flex-col font-display font-extrabold text-[60px] md:text-[88px] leading-none">
            <span>How Fastit</span>
            <span className="italic bg-gradient-to-r from-[#E8156D] to-[#FF4D94] bg-clip-text text-transparent relative">
              Came to Be.
              <svg className="absolute -bottom-4 left-0 w-full h-4 hand-drawn-underline" viewBox="0 0 500 20" fill="none" preserveAspectRatio="none">
                <path d="M5 15 Q 125 5, 250 15 T 495 5" stroke="#FFD93D" strokeWidth="4" strokeLinecap="round" strokeDasharray="1000" strokeDashoffset="1000" />
              </svg>
            </span>
          </h2>
        </div>

        {/* Part 1 — The Beginning */}
        <div className="story-part grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 mb-[160px]">
          <div>
            <span className="part-number block font-display font-extrabold text-[120px] text-[#E8156D] opacity-[0.15] leading-none">01</span>
            <h3 className="font-display font-semibold text-[32px] mt-4">The Beginning</h3>
          </div>
          <div className="body-text font-satoshi text-[18px] text-white/65 leading-[1.85] max-w-[640px] space-y-6">
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

        <div className="w-full h-[1px] bg-white/10 mb-[140px]" />

        {/* Part 2 — The Name */}
        <div className="story-part grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 mb-[160px]">
          <div className="body-text order-2 lg:order-1 font-satoshi text-[18px] text-white/65 leading-[1.85] max-w-[640px] space-y-6">
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
              <div className="flex-1">
                <div className="bg-[#E8156D] text-white font-display font-bold text-[20px] px-6 py-2.5 rounded-full inline-block mb-3">Fast</div>
                <p className="text-[13px] text-white/50">Speed. Efficiency. Momentum.</p>
              </div>
              <div className="flex-1">
                <div className="bg-[#FFD93D] text-black font-display font-bold text-[20px] px-6 py-2.5 rounded-full inline-block mb-3">it</div>
                <p className="text-[13px] text-white/50">Technology at the core.</p>
              </div>
              <div className="flex-1">
                <div className="border border-white/30 text-white font-display font-bold text-[20px] px-6 py-2.5 rounded-full inline-block mb-3">Group of Solutions</div>
                <p className="text-[13px] text-white/50">Complete. Not partial.</p>
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
            <h3 className="font-display font-semibold text-[32px] mt-4">Why 'Fastit'?</h3>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-[140px]" />

        {/* Part 3 — Why Dergaon? */}
        <div className="story-part grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 relative">
          <div>
            <span className="part-number block font-display font-extrabold text-[120px] text-[#A8D8EA] opacity-[0.15] leading-none">03</span>
            <h3 className="font-display font-semibold text-[32px] mt-4">Why Dergaon?</h3>
          </div>
          <div className="body-text font-satoshi text-[18px] text-white/65 leading-[1.85] max-w-[640px] space-y-6">
            <p>
              People sometimes ask us why we didn't set up in Guwahati. Or why we didn't move to Bangalore like so many tech professionals from Northeast India eventually do. The answer is honest and simple:
            </p>
            
            <div className="standalone-statement font-display font-bold text-[30px] md:text-[36px] text-[#E8156D] my-8 relative inline-block">
              Because Dergaon needs it more.
              <svg className="absolute -inset-4 w-[110%] h-[140%] pointer-events-none" viewBox="0 0 350 80">
                <ellipse cx="175" cy="40" rx="170" ry="35" stroke="#FFD93D" strokeWidth="2" fill="none" strokeDasharray="1000" strokeDashoffset="1000" className="hand-drawn-underline" />
              </svg>
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
            <p className="font-semibold text-white">
              That's not an accident. That's a commitment.
            </p>
          </div>

          {/* 3D ELEMENT FOR THIS SECTION */}
          <div className="absolute right-0 bottom-0 w-[150px] h-[200px] hidden lg:block pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} color="#E8156D" />
              <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
                <mesh>
                  <coneGeometry args={[1, 2, 32]} />
                  <MeshDistortMaterial color="#E8156D" speed={2} distort={0.2} />
                </mesh>
              </Float>
              <pointLight position={[0, -2, 0]} intensity={2} color="#E8156D" />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { initCardTilt } from "@/lib/animations"
import { Canvas } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"

import Image from "next/image"

export function FounderSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const rightCardRef = useRef<HTMLDivElement>(null)
  const stickyNotesRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    // Entrance animations
    const ctx = gsap.context(() => {
      // Right card slide in
      gsap.fromTo(rightCardRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightCardRef.current,
            start: "top 80%",
            once: true,
          }
        }
      )

      // Staggered paragraphs
      const paragraphs = leftColRef.current?.querySelectorAll('p, blockquote, .highlight-box')
      if (paragraphs) {
        gsap.fromTo(paragraphs,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 70%",
              once: true,
            }
          }
        )
      }

      // Sticky notes rotation on scroll
      stickyNotesRef.current.forEach((note) => {
        if (!note) return
        gsap.to(note, {
          rotation: "+=2",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        })
      })
    }, sectionRef)

    // Init 3D tilt
    if (rightCardRef.current) {
      initCardTilt(rightCardRef.current.querySelector('.main-card') as HTMLElement)
    }

    return () => ctx.revert()
  }, [])

  return (
    <section id="founder" ref={sectionRef} className="relative bg-[#050505] py-[160px] px-6 md:px-20 overflow-hidden">
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-20">
        {/* Left Column — Story */}
        <div ref={leftColRef} className="relative z-10">
          <span className="block font-satoshi font-semibold text-[12px] text-[#E8156D] uppercase tracking-[0.15em] mb-8">
            THE FOUNDER
          </span>

          <blockquote className="relative border-l-4 border-[#E8156D] pl-7 mb-12 max-w-[580px]">
            <p className="font-cormorant italic text-[32px] md:text-[36px] text-white leading-[1.5]">
              "I am a BTech student in Golaghat, Assam. I looked around and asked one question — why isn't great software being built here? I didn't find a good answer. So I stopped looking and started building."
            </p>
            <cite className="block not-italic mt-6">
              <span className="block font-satoshi font-semibold text-[16px] text-white">— Aashish Verma</span>
              <span className="block font-satoshi font-normal text-[14px] text-[#E8156D]">Founder, Fastit Group of Solutions</span>
            </cite>
          </blockquote>

          <div className="space-y-6 font-satoshi text-[18px] text-white/60 leading-[1.85] max-w-[580px]">
            <p>
              Aashish Verma is not the typical founder story. There was no big city startup. No venture capital pitch deck. No co-working space in Bangalore with a ping-pong table.
            </p>
            <p>
              There is a BTech CSE student, sitting in Golaghat, Assam — studying at Birangana Sati Sadhani Rajyik Vishwavidyalaya — who looks at the digital landscape of Northeast India and feels something between frustration and determination.
            </p>
            <p>
              The frustration? That businesses in Assam — good, hardworking, legitimate businesses — were being left behind digitally. Not because they didn't want to grow. But because the people who could help them grow weren't here.
            </p>
            <p>
              The determination? To do something about it. Aashish didn't wait to graduate. He didn't wait for the perfect moment, the perfect team, or the perfect office.
            </p>
            <p>
              He started Fastit Group of Solutions from Dergaon, Golaghat — while still pursuing his degree — because he understood something most people take years to figure out: The best time to solve a real problem is when you can see it clearly. And he could see it clearly.
            </p>

            <div className="highlight-box bg-white/[0.02] border-l-4 border-[#E8156D] rounded-r-lg p-6 my-8 text-[17px] font-medium text-white/90">
              "Northeast India had talent. It had businesses that needed digital solutions. What it didn't have was a company that combined both — with the quality and seriousness that clients actually deserved."
            </div>

            <p>
              What makes Aashish different from most young founders isn't just the ambition — it's the approach. He built Fastit Group of Solutions on a foundation of something almost unfashionable in the startup world: Honesty.
            </p>
            <p>
              No overpromising. No hiding behind corporate language. No making clients feel like they need a translator to understand what's happening with their project.
            </p>
            <p>
              Aashish is studying Computer Science and Engineering at Birangana Sati Sadhani Rajyik Vishwavidyalaya in Golaghat, Assam — and building a software company at the same time. He'll tell you that one feeds the other.
            </p>
            <p>
              The academic foundation gives him depth. The real-world work gives him perspective that no classroom can fully provide. And being from Golaghat, Assam — that gives him something neither a degree nor a job can give: A reason to build something that actually matters for the place he calls home.
            </p>

            <div className="pt-12">
              <p className="font-display font-semibold text-[26px] text-white leading-[1.4] uppercase tracking-tight">
                "Northeast India has always had brilliant people. We just needed someone to build the right stage for them. That's what Fastit is — a stage. And we're just getting started."
              </p>
              <p className="font-satoshi font-medium text-[15px] text-[#E8156D] mt-4">— Aashish Verma, Founder</p>
            </div>
          </div>
        </div>

        {/* Right Column — Founder Visual Card */}
        <div className="relative flex items-center justify-center">
          <div ref={rightCardRef} className="lg:sticky lg:top-[150px] w-full max-w-[380px]">
            <div className="main-card relative aspect-[3/4] bg-white/[0.02] border border-white/5 backdrop-blur-xl p-4 rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.8)] group overflow-hidden">
              {/* Photo Container */}
              <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                <Image 
                  src="/founder.jpg" 
                  alt="Aashish Verma" 
                  fill 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Ambient glow inside card */}
              <div className="absolute -left-16 -top-16 w-32 h-32 bg-[#E8156D]/10 blur-[30px] rounded-full pointer-events-none" />
            </div>
            
            {/* Floating Info Tag */}
            <div className="mt-8 flex flex-col gap-2 px-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8156D]">FOUNDER & CEO</span>
              <h4 className="font-display font-black text-2xl text-white uppercase tracking-tight">Aashish Verma</h4>
              <p className="text-white/40 font-satoshi text-xs tracking-wider uppercase">BTech CSE · Class of 2029</p>
              <span className="text-[10px] font-bold text-[#FFD93D] tracking-widest uppercase mt-4">📍 Golaghat, Assam</span>
            </div>
            
            {/* 3D FLOATING OBJECT */}
            <div className="absolute top-1/2 -right-[120px] -translate-y-1/2 w-[140px] h-[140px] z-10 pointer-events-none">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Float speed={3} rotationIntensity={1.5} floatIntensity={1.5}>
                  <mesh rotation={[1, 1, 1]}>
                    <boxGeometry args={[1.2, 1.2, 1.2]} />
                    <MeshDistortMaterial 
                      color="#E8156D" 
                      speed={2.2} 
                      distort={0.4}
                    />
                  </mesh>
                </Float>
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

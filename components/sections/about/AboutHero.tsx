"use client"

import { useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { 
  MeshDistortMaterial, 
  MeshTransmissionMaterial, 
  Float, 
  Sparkles, 
  Text,
  Environment,
  ContactShadows
} from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { revealHeadline } from "@/lib/animations"

function Scene() {
  const blobRef = useRef<THREE.Mesh>(null!)
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    blobRef.current.rotation.y = time * 0.1
    ringRef.current.rotation.x = time * 0.2
    ringRef.current.rotation.y = time * 0.1
    ringRef.current.rotation.z = time * 0.15
  })

  return (
    <>
      <color attach="background" args={["#0A0A0A"]} />
      <ambientLight intensity={0.15} />
      
      {/* Object 1 — Large morphing blob */}
      <mesh ref={blobRef} position={[4, 0, -2]}>
        <sphereGeometry args={[3, 64, 64]} />
        <MeshDistortMaterial 
          color="#E8156D" 
          distort={0.5} 
          speed={1.5} 
          emissive="#E8156D"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Object 2 — Glass sphere */}
      <Float speed={2} floatIntensity={0.8}>
        <mesh position={[-4, 1, 0]}>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshTransmissionMaterial 
            transmission={0.95}
            color="#A8D8EA"
            thickness={1}
            roughness={0}
          />
        </mesh>
      </Float>

      {/* Object 3 — Particle field */}
      <Sparkles 
        count={500} 
        size={2} 
        scale={[15, 15, 15]} 
        color="#E8156D" 
        opacity={0.6}
        speed={0.5}
      />

      {/* Object 4 — Yellow orbiting ring */}
      <mesh ref={ringRef} position={[0, 0, -5]}>
        <torusGeometry args={[5, 0.03, 16, 100]} />
        <meshStandardMaterial color="#FFD93D" emissive="#FFD93D" emissiveIntensity={0.5} />
      </mesh>

      {/* Lighting */}
      <pointLight position={[4, 3, 2]} intensity={3} color="#E8156D" />
      <pointLight position={[-3, -2, 3]} intensity={2} color="#FFD93D" />
      <pointLight position={[0, -3, -1]} intensity={1.5} color="#A8D8EA" />
      
      <Environment preset="city" />
    </>
  )
}

export function AboutHero() {
  const pillRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Pill Animation
    gsap.fromTo(pillRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.3 }
    )

    // Headline Animation
    if (headlineRef.current) {
      const split = new SplitText(headlineRef.current, { type: "words" })
      const words = split.words
      
      words.forEach(word => {
        const wrapper = document.createElement('span')
        wrapper.style.display = 'inline-block'
        wrapper.style.overflow = 'hidden'
        wrapper.style.verticalAlign = 'bottom'
        word.parentNode?.insertBefore(wrapper, word)
        wrapper.appendChild(word)
      })

      gsap.fromTo(words,
        { y: "110%", opacity: 0, rotateX: -40 },
        {
          y: "0%", opacity: 1, rotateX: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.06,
          delay: 0.5,
        }
      )
    }

    // Subtext Animation
    gsap.fromTo(subtextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 1.2 }
    )
  }, [])

  return (
    <section id="hero" className="relative w-full h-[100svh] bg-[#0A0A0A] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center max-w-[900px]">
        {/* Location Pill */}
        <div 
          ref={pillRef}
          className="inline-flex items-center px-[18px] py-[6px] rounded-full bg-[#E8156D]/15 border border-[#E8156D]/30 text-[#E8156D] font-satoshi font-medium text-[13px] mb-8 animate-pulse-glow"
        >
          📍 Dergaon, Golaghat, Assam · India
        </div>

        <h1 ref={headlineRef} className="flex flex-col gap-0">
          <span className="block font-display font-extrabold text-[60px] md:text-[100px] text-white leading-[0.92]">
            We're from
          </span>
          <span className="block font-display font-extrabold text-[100px] md:text-[160px] text-[#E8156D] leading-[0.88]">
            Dergaon.
          </span>
          <span className="block font-display font-normal text-[50px] md:text-[80px] text-white/50 leading-[1.2]">
            And we're just
          </span>
          <span className="block font-display font-extrabold italic text-[50px] md:text-[80px] bg-gradient-to-r from-[#E8156D] to-[#FFD93D] bg-clip-text text-transparent">
            getting started.
          </span>
        </h1>

        <p ref={subtextRef} className="font-satoshi font-normal text-[19px] text-white/55 leading-[1.8] max-w-[640px] mx-auto mt-8">
          Fastit Group of Solutions is a software, web, and app development company built from the ground up in Dergaon, Golaghat, Assam — by people who believe that where you build from doesn't limit what you can build.
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-[1px] h-[60px] bg-gradient-to-b from-transparent to-[#E8156D]/80 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-line" />
        </div>
        <span className="mt-4 font-satoshi font-medium text-[11px] tracking-[0.15em] text-white/35 uppercase">
          scroll
        </span>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(232,21,109,0); }
          50% { box-shadow: 0 0 16px rgba(232,21,109,0.4); }
        }
        .animate-pulse-glow {
          animation: pulse-glow 2.5s ease infinite;
        }
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scroll-line {
          animation: scroll-line 1.8s ease infinite;
        }
      `}</style>
    </section>
  )
}

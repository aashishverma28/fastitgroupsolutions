"use client"

import { useEffect, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Float, Environment, ContactShadows, MeshTransmissionMaterial } from "@react-three/drei"
import * as THREE from "three"
import { revealHeadline, initCardTilt, staggerCards } from "@/lib/animations"
import Link from "next/link"

function ProjectPreview3D() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.1
    meshRef.current.rotation.y = Math.cos(time * 0.5) * 0.1
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <boxGeometry args={[3, 2, 0.1]} />
          <MeshTransmissionMaterial 
            transmission={0.9} 
            thickness={0.5} 
            roughness={0.1} 
            chromaticAberration={0.06}
            anisotropy={0.1}
            distortion={0.1}
            color="#E8156D"
          />
          {/* Inner content simulation */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshStandardMaterial color="#000000" emissive="#E8156D" emissiveIntensity={0.2} />
          </mesh>
        </mesh>
      </Float>
      <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
      <Environment preset="city" />
    </>
  )
}

const projects = [
  { 
    id: 1, 
    title: "Fastit Music India", 
    category: "Music Distribution & Tech", 
    link: "https://fastitmusic.in",
    description: "The premier music distribution and digital infrastructure partner for independent artists and labels across India.",
    color: "#E8156D" 
  }
]

export default function Work() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (headlineRef.current) revealHeadline(headlineRef.current)
    if (gridRef.current) {
      const cards = gridRef.current.children
      staggerCards(cards as any)
      Array.from(cards).forEach(card => initCardTilt(card as HTMLElement))
    }
  }, [])

  return (
    <main className="relative w-full min-h-screen bg-[#0F0F0F] overflow-hidden pt-32 pb-20 text-white">
      <div className="container mx-auto px-6">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-bold leading-tight mb-20">
          Selected <span className="font-hand text-[#E8156D] italic">Works.</span>
        </h1>
        
        <div ref={gridRef} className="max-w-5xl mx-auto">
          {projects.map((proj) => (
            <div key={proj.id} className="group relative bg-[#1A1A1A] rounded-[40px] overflow-hidden border border-white/5 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* 3D PREVIEW SECTION */}
                <div className="relative h-[400px] lg:h-[600px] bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A]">
                  <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <Suspense fallback={null}>
                      <ProjectPreview3D />
                    </Suspense>
                  </Canvas>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-8 left-8 bg-[#E8156D] text-white px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest z-10 animate-pulse">
                    Live Platform
                  </div>
                </div>

                {/* PROJECT DETAILS */}
                <div className="p-10 lg:p-20 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-white/5">
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#E8156D] mb-6">{proj.category}</span>
                  <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">{proj.title}</h2>
                  <p className="text-lg md:text-xl text-white/50 font-body leading-relaxed mb-12">
                    {proj.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <Link 
                      href={proj.link}
                      target="_blank"
                      className="inline-flex items-center gap-3 bg-[#E8156D] text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all duration-500"
                    >
                      Visit Website
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>

              </div>
              
              {/* Background Glow */}
              <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#E8156D] opacity-[0.05] blur-[120px] pointer-events-none" />
            </div>
          ))}
        </div>
        
        {/* Secondary Info */}
        <div className="mt-32 text-center max-w-2xl mx-auto">
          <p className="text-white/30 font-body italic text-lg">
            More projects are being curated. At Fastit, we believe in showing only what we're ready to stand behind 100%.
          </p>
        </div>
      </div>
    </main>
  )
}

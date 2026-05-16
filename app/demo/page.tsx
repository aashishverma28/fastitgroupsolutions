"use client"

import { useEffect, useRef, Suspense, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, MeshTransmissionMaterial, ContactShadows } from "@react-three/drei"
import * as THREE from "three"
import { revealHeadline, staggerCards, initCardTilt } from "@/lib/animations"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"
import { Loader2 } from "lucide-react"

function DemoScene() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
    meshRef.current.rotation.y = Math.cos(time * 0.2) * 0.1
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[2, 0]} />
          <MeshTransmissionMaterial 
            backside
            samples={4}
            thickness={2}
            chromaticAberration={0.1}
            anisotropy={0.1}
            distortion={0.1}
            distortionScale={0.1}
            temporalDistortion={0.1}
            transmission={0.95}
            color="#E8156D"
          />
        </mesh>
      </Float>
      <ContactShadows position={[0, -3.5, 0]} opacity={0.3} scale={15} blur={3} far={4} />
      <Environment preset="city" />
    </>
  )
}

interface DemoProject {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  demo_link: string
}

export default function DemoPage() {
  const [demos, setDemos] = useState<DemoProject[]>([])
  const [loading, setLoading] = useState(true)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchDemos = async () => {
      const { data, error } = await supabase
        .from('demo_projects')
        .select('*')
        .order('order_index', { ascending: true })
      
      if (!error && data) {
        setDemos(data)
      }
      setLoading(false)
    }
    fetchDemos()
  }, [])

  useEffect(() => {
    if (!loading) {
      if (headlineRef.current) revealHeadline(headlineRef.current)
      if (gridRef.current) {
        const cards = gridRef.current.children
        staggerCards(cards as any)
        Array.from(cards).forEach(card => initCardTilt(card as HTMLElement))
      }
    }
  }, [loading])

  return (
    <main className="relative w-full min-h-screen bg-[#080808] text-white overflow-hidden pt-32 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-32 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div>
            <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-8">
              Explore Our <br />
              <span className="font-hand text-[#E8156D] italic">Prototypes.</span>
            </h1>
            <p className="text-xl text-white/50 max-w-lg font-body leading-relaxed">
              A curated collection of internal experiments, client demos, and concept designs that push the boundaries of IT solutions.
            </p>
          </div>
          <div className="h-[400px] lg:h-[600px] relative">
            <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
              <Suspense fallback={null}>
                <DemoScene />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </section>

      {/* Demo Grid */}
      <section className="container mx-auto px-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6 text-white/20">
            <Loader2 className="w-16 h-16 animate-spin text-[#E8156D]" />
            <p className="font-display text-xl font-bold tracking-widest uppercase">Fetching Prototypes...</p>
          </div>
        ) : demos.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-[40px] bg-white/5">
             <p className="text-white/40 text-xl font-display">New demos are currently being uploaded.</p>
          </div>
        ) : (
          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {demos.map((demo) => (
              <div key={demo.id} className="group relative rounded-[30px] overflow-hidden bg-[#111] border border-white/5 flex flex-col cursor-crosshair">
                <div className="card-shine absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative h-[300px] sm:h-[400px] overflow-hidden bg-white/5">
                  {demo.image_url && (
                    <Image 
                      src={demo.image_url} 
                      alt={demo.title} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />
                </div>

                <div className="p-8 lg:p-12 relative z-10">
                  <span className="text-[#E8156D] text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                    {demo.category}
                  </span>
                  <h3 className="text-3xl font-display font-bold mb-4">{demo.title}</h3>
                  <p className="text-white/40 text-lg leading-relaxed mb-8">
                    {demo.description}
                  </p>
                  <Link 
                    href={demo.demo_link || "#"} 
                    target="_blank"
                    className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest group-hover:text-[#E8156D] transition-colors"
                  >
                    View Prototype
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14m-7-7l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Background Decorative Elements */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#E8156D]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-[#A8D8EA]/5 blur-[150px] rounded-full pointer-events-none" />
    </main>
  )
}

"use client"

import { useEffect, useRef, Suspense, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { 
  MeshDistortMaterial, 
  MeshTransmissionMaterial, 
  Float, 
  Sparkles, 
  Environment,
  Text,
  Center,
  PerspectiveCamera,
  ContactShadows
} from "@react-three/drei"
import * as THREE from "three"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"

function InteractiveCrystal() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Smooth rotation
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.y * 0.5 + time * 0.1, 0.1)
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.x * 0.5 + time * 0.15, 0.1)
    
    // Subtle float
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.2
  })

  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Core Crystal */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[2, 0]} />
          <MeshTransmissionMaterial 
            backside
            samples={16}
            resolution={512}
            transmission={1}
            roughness={0.1}
            thickness={2}
            ior={1.5}
            chromaticAberration={0.1}
            anisotropy={0.1}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            color="#E8156D"
          />
        </mesh>
      </Float>

      {/* Orbiting Blobs */}
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[4, 2, -3]}>
          <sphereGeometry args={[1, 32, 32]} />
          <MeshDistortMaterial color="#FFD93D" speed={2} distort={0.4} />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-5, -1, -2]}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial color="#A8D8EA" speed={1.5} distort={0.6} />
        </mesh>
      </Float>

      {/* Background Glows */}
      <Sparkles count={200} scale={[20, 20, 20]} size={2} speed={0.4} color="#E8156D" />
      <Sparkles count={100} scale={[15, 15, 15]} size={4} speed={0.2} color="#FFD93D" />
    </group>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#0A0A0A"]} />
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
      <pointLight position={[-10, -10, -10]} color="#E8156D" intensity={1} />
      
      <Suspense fallback={null}>
        <InteractiveCrystal />
        <Environment preset="night" />
        <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
      </Suspense>
    </>
  )
}

export function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!headlineRef.current) return

    const split = new SplitText(headlineRef.current, { type: "words,chars" })
    
    gsap.fromTo(split.chars, 
      { y: 100, opacity: 0, rotateX: -90 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0, 
        stagger: 0.02, 
        duration: 1.2, 
        ease: "expo.out",
        delay: 0.5 
      }
    )

    gsap.fromTo(subtextRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.5 }
    )

    // Background parallax
    const handleScroll = () => {
      const scroll = window.scrollY
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${scroll * 0.4}px)`
        contentRef.current.style.opacity = `${1 - scroll / 700}`
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={containerRef} id="about-hero" className="relative w-full h-[120vh] bg-[#0A0A0A] overflow-hidden">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 2]}>
          <Scene />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div 
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none pt-20"
      >
        <div className="container mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
             <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[#E8156D]">
               Est. 2024 · Dergaon
             </span>
          </div>

          <h1 
            ref={headlineRef}
            className="text-[12vw] md:text-[10vw] font-display font-extrabold leading-[0.8] tracking-tighter text-white uppercase mix-blend-difference"
          >
            Real <span className="text-[#E8156D]">Humans.</span><br/>
            Real <span className="italic font-hand text-[15vw] md:text-[12vw] text-[#FFD93D] lowercase">Tech.</span>
          </h1>

          <p 
            ref={subtextRef}
            className="mt-12 text-lg md:text-2xl text-white/40 font-body max-w-2xl mx-auto leading-relaxed"
          >
            Fastit Group of Solutions is more than code. We are a narrative of persistence, built in the heart of Assam, engineering the next generation of digital infrastructure.
          </p>
        </div>
      </div>

      {/* Floating UI Elements */}
      <div className="absolute top-[20%] left-[10%] w-32 h-32 border border-white/5 rounded-full animate-float-slow opacity-20 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-48 h-48 border border-[#E8156D]/10 rounded-full animate-float-slower opacity-20 pointer-events-none" />

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <span className="text-[10px] text-white tracking-[0.4em] uppercase font-bold">Explore</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(20px, -20px) rotate(10deg); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-30px, 30px) rotate(-15deg); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 12s ease-in-out infinite; }
      `}</style>
    </section>
  )
}

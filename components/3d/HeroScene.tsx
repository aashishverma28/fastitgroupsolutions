"use client"

import { Suspense, useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Float,
  Environment,
  Sparkles,
  PointMaterial,
} from "@react-three/drei"
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"
import * as THREE from "three"
import gsap from "gsap"
import { getPerformanceTier, TIER_CONFIG } from "@/lib/performance"

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// THE MAIN ORB — Breathing morphing centerpiece
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function MainOrb() {
  const mesh = useRef<THREE.Mesh>(null)
  const mat = useRef<any>(null)
  const mouse = useRef({ x: 0, y: 0 })
  
  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener("mousemove", onMouse)
    return () => window.removeEventListener("mousemove", onMouse)
  }, [])
  
  useFrame(({ clock }) => {
    if (!mesh.current || !mat.current) return
    const t = clock.elapsedTime
    
    mesh.current.rotation.x = t * 0.12
    mesh.current.rotation.y = t * 0.18
    
    // Smooth mouse follow
    mesh.current.position.x = THREE.MathUtils.lerp(
      mesh.current.position.x, mouse.current.x * 0.6, 0.04
    )
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y, mouse.current.y * 0.4, 0.04
    )
    
    // Breathing
    const breathe = 1 + Math.sin(t * 0.7) * 0.025
    mesh.current.scale.setScalar(breathe)
    
    // Material pulse
    mat.current.distort = 0.35 + Math.sin(t * 1.1) * 0.12
  })
  
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={mesh} castShadow>
        <sphereGeometry args={[1.6, 128, 128]} />
        <MeshDistortMaterial
          ref={mat}
          color="#E8156D"
          roughness={0.08}
          metalness={0.25}
          distort={0.35}
          speed={1.8}
          emissive="#E8156D"
          emissiveIntensity={0.25}
          transparent
          opacity={0.95}
        />
      </mesh>
    </Float>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GLASS RING — Refractive torus orbiting the orb
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function GlassRing() {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock: c }) => {
    if (!ref.current) return
    ref.current.rotation.x = c.elapsedTime * 0.25
    ref.current.rotation.y = c.elapsedTime * 0.4
    ref.current.rotation.z = c.elapsedTime * 0.15
  })
  
  return (
    <Float speed={1.8} floatIntensity={0.4}>
      <mesh ref={ref}>
        <torusGeometry args={[2.6, 0.07, 16, 100]} />
        <MeshTransmissionMaterial
          backside
          samples={12}
          thickness={0.4}
          chromaticAberration={0.06}
          distortion={0.08}
          temporalDistortion={0.15}
          color="#A8D8EA"
          transmission={0.95}
          ior={1.5}
          roughness={0.04}
          attenuationColor="#FFE0EE"
          attenuationDistance={0.4}
        />
      </mesh>
    </Float>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ORBITAL SHARDS — 8 geometric shapes orbiting
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function OrbitalShards() {
  const shards = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      radius: 3.2 + (i % 3) * 0.4,
      speed: 0.2 + i * 0.03,
      scale: 0.12 + (i % 4) * 0.04,
      color: ["#E8156D","#FFD93D","#FAF9F7","#A8D8EA"][i % 4],
      shape: ["box","sphere","torus"][i % 3],
      yOffset: (i - 4) * 0.3,
    }))
  , [])
  
  return (
    <>
      {shards.map((s, i) => (
        <Shard key={i} {...s} />
      ))}
    </>
  )
}

function Shard({ angle, radius, speed, scale, color, shape, yOffset }: any) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock: c }) => {
    if (!ref.current) return
    const t = c.elapsedTime
    ref.current.position.x = Math.cos(t * speed + angle) * radius
    ref.current.position.z = Math.sin(t * speed + angle) * radius * 0.5
    ref.current.position.y = yOffset + Math.sin(t * speed * 1.3 + angle) * 0.5
    ref.current.rotation.x += 0.012 * speed
    ref.current.rotation.y += 0.018 * speed
  })
  
  return (
    <Float speed={speed * 3} floatIntensity={0.2}>
      <mesh ref={ref} scale={scale}>
        {shape === "box" && <boxGeometry args={[1,1,1]} />}
        {shape === "sphere" && <sphereGeometry args={[1,16,16]} />}
        {shape === "torus" && <torusGeometry args={[1,0.4,8,24]} />}
        <meshStandardMaterial
          color={color}
          roughness={0.15}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.12}
        />
      </mesh>
    </Float>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DYNAMIC LIGHTS — Orbiting colored lights
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function DynamicLights() {
  const pink = useRef<THREE.PointLight>(null)
  const yellow = useRef<THREE.PointLight>(null)
  const blue = useRef<THREE.PointLight>(null)
  
  useFrame(({ clock: c }) => {
    const t = c.elapsedTime
    if (pink.current) {
      pink.current.position.x = Math.sin(t * 0.4) * 4
      pink.current.position.y = Math.cos(t * 0.35) * 3
      pink.current.intensity = 3 + Math.sin(t * 1.2) * 0.5
    }
    if (yellow.current) {
      yellow.current.position.x = -Math.sin(t * 0.4) * 4
      yellow.current.position.z = Math.cos(t * 0.28) * 3
      yellow.current.intensity = 2 + Math.cos(t) * 0.4
    }
    if (blue.current) {
      blue.current.position.y = Math.sin(t * 0.3) * 3
      blue.current.position.z = -Math.cos(t * 0.25) * 2
    }
  })
  
  return (
    <>
      <ambientLight intensity={0.2} color="#FAF9F7" />
      <directionalLight position={[5,5,5]} intensity={1.2} castShadow />
      <pointLight ref={pink} color="#E8156D" distance={12} decay={2} intensity={3} />
      <pointLight ref={yellow} color="#FFD93D" distance={10} decay={2} intensity={2} />
      <pointLight ref={blue} position={[0,-3,-2]} color="#A8D8EA" distance={8} decay={2} intensity={1.5} />
      <Environment preset="city" />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CINEMATIC CAMERA — Zooms in on load + subtle sway
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CinematicCamera() {
  const { camera } = useThree()
  
  useEffect(() => {
    camera.position.set(0, 0, 14)
    gsap.to(camera.position, {
      z: 5.5, y: 0.5,
      duration: 2.8,
      ease: "power3.out",
      delay: 0.2,
    })
  }, [camera])
  
  useFrame(({ clock: c }) => {
    const t = c.elapsedTime
    camera.position.x = Math.sin(t * 0.08) * 0.25
    camera.rotation.z = Math.sin(t * 0.06) * 0.004
  })
  
  return null
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POST PROCESSING — Cinematic grade
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CinematicGrade() {
  return (
    <EffectComposer>
      <Bloom intensity={1.4} luminanceThreshold={0.55} luminanceSmoothing={0.9} mipmapBlur radius={0.85} />
      <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0007, 0.0007] as any} radialModulation={false} modulationOffset={0} />
      <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
      <Vignette offset={0.25} darkness={0.65} eskil={false} blendFunction={BlendFunction.NORMAL} />
    </EffectComposer>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN EXPORT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export function HeroScene() {
  const tier = getPerformanceTier()
  const config = TIER_CONFIG[tier]

  if (!config.enable3D) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 72 }}
      dpr={config.dpr}
      shadows={config.shadows}
      gl={{
        antialias: config.antialias,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
        alpha: true,
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none"
      }}
    >
      <Suspense fallback={null}>
        <CinematicCamera />
        <DynamicLights />
        <MainOrb />
        <GlassRing />
        <OrbitalShards />
        {config.particles > 0 && (
          <>
            <Sparkles count={Math.floor(config.particles * 0.83)} scale={[14,9,9]} size={1.2} speed={0.35} color="#E8156D" opacity={0.55} />
            <Sparkles count={Math.floor(config.particles * 0.33)} scale={[12,7,7]} size={1.8} speed={0.25} color="#FFD93D" opacity={0.45} />
            <Sparkles count={Math.floor(config.particles * 0.5)} scale={[16,11,11]} size={0.9} speed={0.18} color="#FAF9F7" opacity={0.35} />
          </>
        )}
        {config.postProcessing && <CinematicGrade />}
      </Suspense>
    </Canvas>
  )
}

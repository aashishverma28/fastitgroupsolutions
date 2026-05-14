"use client"

import { Canvas } from "@react-three/fiber"
import { Environment, Float, Sparkles } from "@react-three/drei"
import { Suspense } from "react"
import { getPerformanceTier, TIER_CONFIG } from "@/lib/performance"

export function AboutScene() {
  const tier = getPerformanceTier()
  const config = TIER_CONFIG[tier]

  if (!config.enable3D) return null

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={config.dpr}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none"
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="dawn" />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={[-2, 1, -2]}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#FFD93D" roughness={0.2} metalness={0.8} />
          </mesh>
        </Float>

        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
          <mesh position={[2, -1, -1]}>
            <icosahedronGeometry args={[1.5, 0]} />
            <meshStandardMaterial color="#A8D8EA" roughness={0.1} metalness={0.5} wireframe />
          </mesh>
        </Float>

        {config.particles > 0 && (
          <Sparkles count={config.particles} scale={10} size={2} speed={0.4} opacity={0.2} color="#E8156D" />
        )}
      </Suspense>
    </Canvas>
  )
}

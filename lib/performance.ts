// lib/performance.ts
// Scale 3D quality based on device capability

export type Tier = "ultra" | "high" | "medium" | "low" | "none"

export function getPerformanceTier(): Tier {
  if (typeof window === "undefined") return "high"
  
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
  if (prefersReduced) return "none"
  
  const w = window.innerWidth
  if (w < 480) return "low"
  if (w < 768) return "low"
  if (w < 1024) return "medium"
  
  // Check GPU via canvas
  const canvas = document.createElement("canvas")
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")
  if (!gl) return "low"
  
  const ext = (gl as WebGLRenderingContext).getExtension(
    "WEBGL_debug_renderer_info"
  )
  if (ext) {
    const renderer = (gl as WebGLRenderingContext)
      .getParameter(ext.UNMASKED_RENDERER_WEBGL)
      .toLowerCase()
    if (
      renderer.includes("intel") && 
      !renderer.includes("iris")
    ) return "medium"
    if (renderer.includes("mesa")) return "medium"
  }
  
  // Check device memory if available
  const nav = navigator as any
  if (nav.deviceMemory && nav.deviceMemory < 4) return "medium"
  
  return "ultra"
}

export const TIER_CONFIG = {
  ultra: {
    enable3D: true,
    dpr: [1, 2] as [number, number],
    particles: 300,
    postProcessing: true,
    bloom: true,
    chromaticAberration: true,
    shadows: true,
    geometrySegments: 128,
    antialias: true,
  },
  high: {
    enable3D: true,
    dpr: [1, 2] as [number, number],
    particles: 200,
    postProcessing: true,
    bloom: true,
    chromaticAberration: false,
    shadows: true,
    geometrySegments: 64,
    antialias: true,
  },
  medium: {
    enable3D: true,
    dpr: [1, 1.5] as [number, number],
    particles: 80,
    postProcessing: false,
    bloom: false,
    chromaticAberration: false,
    shadows: false,
    geometrySegments: 32,
    antialias: false,
  },
  low: {
    enable3D: false,
    dpr: [1, 1] as [number, number],
    particles: 0,
    postProcessing: false,
    bloom: false,
    chromaticAberration: false,
    shadows: false,
    geometrySegments: 16,
    antialias: false,
  },
  none: {
    enable3D: false,
    dpr: [1, 1] as [number, number],
    particles: 0,
    postProcessing: false,
    bloom: false,
    chromaticAberration: false,
    shadows: false,
    geometrySegments: 16,
    antialias: false,
  },
}

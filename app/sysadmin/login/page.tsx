"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react"
import gsap from "gsap"
import Image from "next/image"
import Link from "next/link"

export default function AdminLogin() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const formRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) router.push("/sysadmin")
    }
    checkUser()

    // Reveal animations
    gsap.fromTo(logoRef.current, 
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
    gsap.fromTo(formRef.current,
      { y: 40, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1, delay: 0.2, ease: "power4.out" }
    )
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Map username to internal email
    let loginEmail = username
    if (username.toLowerCase() === "mainadmin") {
      loginEmail = "mainadmin@fastitgroup.in"
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password,
      })

      if (error) throw error
      
      router.push("/sysadmin")
    } catch (err: any) {
      setError(err.message || "Failed to sign in")
      // Shake animation on error
      gsap.to(formRef.current, { x: 10, duration: 0.1, repeat: 5, yoyo: true })
      gsap.to(formRef.current, { x: 0, duration: 0.1, delay: 0.6 })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden flex items-center justify-center p-6">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#E8156D]/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#FFD93D]/5 blur-[120px] animate-pulse delay-700" />
      
      <div className="w-full max-w-md relative z-10">
        <div ref={logoRef} className="flex flex-col items-center mb-12">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/logo.png" 
              alt="FASTIT Logo" 
              width={160} 
              height={50} 
              className="h-10 w-auto object-contain brightness-0 invert" 
            />
            <span className="text-xs tracking-widest uppercase opacity-40 border-l border-white/20 pl-3">Admin</span>
          </Link>
        </div>

        <div 
          ref={formRef}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] shadow-2xl relative overflow-hidden group"
        >
          {/* Decorative shine */}
          <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] group-hover:left-[100%] transition-all duration-1000 pointer-events-none" />

          <h1 className="text-3xl font-display font-bold text-white mb-2">Welcome Back.</h1>
          <p className="text-gray-400 font-body mb-8">Enter your username to access the portal.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Username</label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within/input:text-[#E8156D] transition-colors" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Mainadmin"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-body focus:outline-none focus:border-[#E8156D] focus:ring-1 focus:ring-[#E8156D]/50 transition-all placeholder:opacity-30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Password</label>
                <Link href="#" className="text-[10px] uppercase font-bold text-gray-600 hover:text-[#E8156D] transition-colors">Forgot?</Link>
              </div>
              <div className="relative group/input">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within/input:text-[#E8156D] transition-colors" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-body focus:outline-none focus:border-[#E8156D] focus:ring-1 focus:ring-[#E8156D]/50 transition-all placeholder:opacity-30"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm py-3 px-4 rounded-xl font-body">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#E8156D] hover:bg-white hover:text-black text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In 
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-12 text-gray-600 text-sm font-body">
          &copy; {new Date().getFullYear()} Fastit Group. For authorized personnel only.
        </p>
      </div>
    </main>
  )
}

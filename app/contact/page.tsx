"use client"

import { useState, useEffect, useRef } from "react"
import { revealHeadline } from "@/lib/animations"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { supabase } from "@/lib/supabase"

export default function Contact() {
  const headlineRef = useRef<HTMLHeadingElement>(null)

  const [name, setName] = useState("")
  const [company, setCompany] = useState("")
  const [service, setService] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [submittedName, setSubmittedName] = useState("")

  useEffect(() => {
    if (headlineRef.current) revealHeadline(headlineRef.current)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email) {
      setStatus("error")
      setErrorMessage("Please fill in both your name and email address.")
      return
    }
    setLoading(true)
    setStatus("idle")
    setErrorMessage("")

    try {
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            name,
            company: company || null,
            service: service || null,
            email
          }
        ])

      if (error) throw error

      setSubmittedName(name)
      setStatus("success")

      const tempFields = {
        name,
        company: company || null,
        service: service || null,
        email
      }

      setName("")
      setCompany("")
      setService("")
      setEmail("")

      // Dispatch confirmation email asynchronously (fails gracefully in sandbox if unverified)
      fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tempFields)
      }).then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          console.warn("Email confirmation dispatch failed:", errData.error || res.statusText)
        } else {
          console.log("Email confirmation dispatched successfully.")
        }
      }).catch((err) => {
        console.warn("Email confirmation dispatch network error:", err)
      })

    } catch (err: any) {
      console.error("Error sending inquiry:", err)
      setStatus("error")
      setErrorMessage(err.message || "Failed to send inquiry. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative w-full min-h-screen bg-[#050505] overflow-hidden pt-44 pb-20 text-white">
      {/* Glow Blur */}
      <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-[#FFD93D]/5 blur-[150px] rounded-full pointer-events-none bg-glow-gpu" />

      <div className="container mx-auto px-6">
        <h1 ref={headlineRef} className="text-6xl md:text-8xl font-display font-extrabold leading-none uppercase tracking-tighter mb-24 max-w-4xl">
          Let's build something <span className="text-[#FFD93D] italic font-light lowercase">remarkable.</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Conversational Form */}
          <div className="bg-white/[0.02] border border-white/5 backdrop-blur-xl p-10 md:p-14 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-8">Start the conversation</h3>
            
            {status === "success" ? (
              <div className="space-y-6 py-12 text-center">
                <div className="w-16 h-16 bg-[#4ADE80]/10 text-[#4ADE80] rounded-full flex items-center justify-center mx-auto text-2xl animate-bounce">
                  ✓
                </div>
                <h4 className="text-3xl font-display font-black uppercase text-white tracking-tighter">Inquiry Transmitted!</h4>
                <p className="text-gray-400 font-body text-base max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="text-[#FFD93D] font-bold">{submittedName}</span>. Your request has been successfully queued. Our architects will contact you shortly.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD93D] hover:underline transition-colors pt-4 block mx-auto cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="font-display text-2xl md:text-3xl leading-[2] text-white/50">
                Hi Fastit, my name is{" "}
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name" 
                  required
                  className="bg-transparent border-b-2 border-white/20 text-white placeholder-white/10 outline-none w-48 text-center mx-2 focus:border-[#E8156D] transition-colors" 
                />
                and I represent{" "}
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company" 
                  className="bg-transparent border-b-2 border-white/20 text-white placeholder-white/10 outline-none w-48 text-center mx-2 focus:border-[#E8156D] transition-colors" 
                />.
                <br className="hidden md:block" />
                I'm looking for help with{" "}
                <select 
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  required
                  className="bg-transparent border-b-2 border-white/20 text-white outline-none w-56 text-center mx-2 focus:border-[#E8156D] transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-[#050505] text-white/30">Select service</option>
                  <option value="Web Development" className="bg-[#050505] text-white">Web Development</option>
                  <option value="Mobile App" className="bg-[#050505] text-white">Mobile App</option>
                  <option value="UI/UX Design" className="bg-[#050505] text-white">UI/UX Design</option>
                </select>.
                <br className="hidden md:block" />
                You can reach me at{" "}
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address" 
                  required
                  className="bg-transparent border-b-2 border-white/20 text-white placeholder-white/10 outline-none w-64 text-center mx-2 focus:border-[#E8156D] transition-colors" 
                />.
                
                {status === "error" && (
                  <p className="text-sm font-body text-red-500 mt-6">{errorMessage}</p>
                )}

                <div className="mt-16">
                  <MagneticButton 
                    type="submit"
                    disabled={loading}
                    className="bg-white text-black px-10 py-5 text-base font-bold rounded-full hover:scale-105 hover:bg-[#E8156D] hover:text-white transition-all shadow-xl disabled:opacity-50"
                  >
                    {loading ? "Transmitting..." : "Send Inquiry"}
                  </MagneticButton>
                </div>
              </form>
            )}
          </div>
          
          {/* Office Details */}
          <div className="flex flex-col gap-12 justify-center">
            <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#E8156D] mb-4">Corporate Office</h3>
              <p className="font-body text-lg text-white/60 leading-relaxed">
                Near Bapuji Mandir<br />
                Dergaon, Golaghat, Assam — 785614<br />
                India
              </p>
            </div>
            <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8D8EA] mb-4">Registered Office</h3>
              <p className="font-body text-lg text-white/60 leading-relaxed">
                Rangamamati<br />
                Dergaon, Golaghat, Assam — 785614<br />
                India
              </p>
            </div>
            
            <div className="pt-8 border-t border-white/5">
              <a href="mailto:hello@fastitgroup.in" className="text-2xl md:text-3xl font-display font-bold text-white hover:text-[#E8156D] transition-colors block mb-2">hello@fastitgroup.in</a>
              <a href="tel:+910000000000" className="text-2xl md:text-3xl font-display font-bold text-white hover:text-[#E8156D] transition-colors">+91 000 000 0000</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

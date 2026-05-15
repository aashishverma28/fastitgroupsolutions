"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Loader2, LogOut, LayoutDashboard, Users, FileText, Settings } from "lucide-react"
import Link from "next/link"

export default function Admin() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/admin/login")
      } else {
        setUser(session.user)
        setLoading(false)
      }
    }
    checkUser()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#E8156D] animate-spin" />
      </div>
    )
  }

  return (
    <main className="relative w-full min-h-screen bg-[#0A0A0A] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-8 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="font-display font-bold text-2xl tracking-tighter mb-12">FASTIT.</div>
          <nav className="space-y-4">
            <Link href="/admin" className="flex items-center gap-3 text-[#E8156D] font-bold p-3 bg-white/5 rounded-xl transition-all">
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-3 text-gray-400 hover:text-white font-bold p-3 transition-all">
              <Users size={20} /> Team
            </Link>
            <Link href="#" className="flex items-center gap-3 text-gray-400 hover:text-white font-bold p-3 transition-all">
              <FileText size={20} /> Reports
            </Link>
            <Link href="#" className="flex items-center gap-3 text-gray-400 hover:text-white font-bold p-3 transition-all">
              <Settings size={20} /> Settings
            </Link>
          </nav>
        </div>
        
        <button onClick={handleLogout} className="flex items-center gap-3 text-gray-500 hover:text-red-400 transition-colors p-3 font-bold">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8 md:p-12">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-display font-bold">Admin Portal</h1>
            <p className="text-gray-400 mt-1">Logged in as {user?.email}</p>
          </div>
          <div className="md:hidden">
             <button onClick={handleLogout} className="text-red-400 font-bold">Logout</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] hover:border-[#E8156D]/30 transition-all">
             <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Total Users</h3>
             <div className="text-4xl font-display font-bold">1,284</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] hover:border-[#FFD93D]/30 transition-all">
             <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Active Projects</h3>
             <div className="text-4xl font-display font-bold">14</div>
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-[32px] hover:border-[#A8D8EA]/30 transition-all">
             <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Revenue</h3>
             <div className="text-4xl font-display font-bold">₹24.8L</div>
          </div>
        </div>
      </section>
    </main>
  )
}

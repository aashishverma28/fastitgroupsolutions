"use client"

import { ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  Menu,
  Bell,
  Search,
  Globe,
  Folder
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { gsap } from "gsap"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const [userName, setUserName] = useState<string>("Admin")

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/sysadmin/login")
      } else {
        setUserName(session.user.email?.split('@')[0] || "Admin")
      }
    }
    checkUser()
  }, [router])

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/sysadmin" },
    { name: "Services", icon: Briefcase, href: "/sysadmin/services" },
    { name: "Our Work", icon: Folder, href: "/sysadmin/work" },
    { name: "Demo Projects", icon: Globe, href: "/sysadmin/demos" },
    { name: "Team Board", icon: Users, href: "/sysadmin/board" },
    { name: "Site Settings", icon: Settings, href: "/sysadmin/settings" },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/sysadmin/login")
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white flex overflow-hidden relative font-satoshi">
      {/* Background Texture & Glows */}
      <div className="absolute inset-0 bg-grain pointer-events-none opacity-20" />
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#E8156D]/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-[#FFD93D]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-80" : "w-24"
        } relative z-50 p-6 flex flex-col transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]`}
      >
        <div className="flex-1 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[40px] flex flex-col overflow-hidden relative shadow-2xl">
          {/* Logo Area */}
          <div className="p-8 mb-4">
            <Link href="/sysadmin" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E8156D] to-[#FFD93D] flex-shrink-0 group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-[#E8156D]/20" />
              {isSidebarOpen && (
                <div className="flex flex-col">
                  <span className="font-display font-black text-2xl tracking-tighter leading-none">FASTIT</span>
                  <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-gray-500 mt-1">Admin Studio</span>
                </div>
              )}
            </Link>
          </div>

          {/* Nav Items */}
          <nav className="flex-1 px-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`flex items-center gap-4 p-4 rounded-3xl transition-all group relative ${
                    isActive 
                    ? "text-white" 
                    : "text-gray-500 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-3xl z-0" />
                  )}
                  <div className={`relative z-10 w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                    isActive ? "bg-[#E8156D] shadow-lg shadow-[#E8156D]/30" : "bg-white/5 group-hover:bg-white/10"
                  }`}>
                    <item.icon className={`w-5 h-5 ${isActive ? "text-white" : "group-hover:text-[#E8156D]"}`} />
                  </div>
                  {isSidebarOpen && (
                    <span className="relative z-10 font-display font-bold text-sm tracking-wide">
                      {item.name}
                    </span>
                  )}
                  {isActive && isSidebarOpen && (
                    <div className="ml-auto relative z-10 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Bottom Area */}
          <div className="p-4 border-t border-white/5">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-4 p-4 rounded-3xl text-gray-500 hover:text-white hover:bg-white/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-red-500/10 transition-all">
                <LogOut className="w-5 h-5 group-hover:text-red-500" />
              </div>
              {isSidebarOpen && <span className="font-display font-bold text-sm">Sign Out</span>}
            </button>
          </div>
        </div>

        {/* Toggle Button Inside */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-24 bg-white text-black rounded-full p-2 border border-black shadow-xl hover:scale-110 active:scale-95 transition-all z-50"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-700 ${!isSidebarOpen ? "rotate-180" : ""}`} />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative h-screen">
        {/* Top Header */}
        <header className="h-28 flex items-center justify-between px-12 z-40">
          <div className="flex flex-col">
            <h2 className="font-hand text-[#E8156D] text-2xl lowercase leading-none mb-1">
              {new Date().getHours() < 12 ? "good morning" : new Date().getHours() < 18 ? "good afternoon" : "good evening"}
            </h2>
            <h1 className="font-display font-black text-4xl tracking-tighter uppercase">
              {menuItems.find(i => i.href === pathname)?.name || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative max-w-xs hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
              <input 
                type="text" 
                placeholder="Find anything..."
                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-[#E8156D]/50 focus:bg-white/[0.05] transition-all"
              />
            </div>

            <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 p-2 rounded-[30px]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center font-black text-[#E8156D] shadow-inner">
                {userName[0]?.toUpperCase()}
              </div>
              <div className="pr-4 hidden sm:block">
                <p className="text-xs font-black leading-none uppercase tracking-tighter">{userName}</p>
                <p className="text-[8px] text-[#E8156D] font-bold uppercase tracking-[0.2em] mt-1">Authorized Hub</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto px-12 pb-12 custom-scrollbar relative z-10">
          <div className="min-h-full">
            {children}
          </div>
          
          {/* Footer Personal Touch */}
          <footer className="mt-20 pt-8 border-t border-white/5 flex items-center justify-between opacity-30 hover:opacity-100 transition-opacity">
            <p className="text-[10px] font-bold uppercase tracking-widest">© {new Date().getFullYear()} Fastit Group. Crafted for Humans.</p>
            <div className="flex items-center gap-4">
               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               <span className="text-[10px] font-bold uppercase tracking-widest">System Operational</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}

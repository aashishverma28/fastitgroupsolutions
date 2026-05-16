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
  Globe
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
        router.push("/admin/login")
      } else {
        setUserName(session.user.email?.split('@')[0] || "Admin")
      }
    }
    checkUser()
  }, [router])

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Services", icon: Briefcase, href: "/admin/services" },
    { name: "Demo Projects", icon: Globe, href: "/admin/demos" },
    { name: "Team Board", icon: Users, href: "/admin/board" },
    { name: "Site Settings", icon: Settings, href: "/admin/settings" },
  ]

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? "w-72" : "w-20"
        } bg-[#0F0F0F] border-r border-white/5 transition-all duration-500 ease-expo flex flex-col relative z-50`}
      >
        {/* Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute -right-3 top-10 bg-[#E8156D] rounded-full p-1 border border-white/20 hover:scale-110 transition-transform z-50"
        >
          <ChevronLeft className={`w-4 h-4 transition-transform duration-500 ${!isSidebarOpen ? "rotate-180" : ""}`} />
        </button>

        {/* Logo Area */}
        <div className="p-8 mb-8">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#E8156D] to-[#FFD93D] flex-shrink-0" />
            {isSidebarOpen && (
              <span className="font-display font-bold text-xl tracking-tighter overflow-hidden whitespace-nowrap">
                FASTIT.
              </span>
            )}
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all group ${
                  isActive 
                  ? "bg-white/10 text-white border border-white/10" 
                  : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-[#E8156D]" : "group-hover:text-[#E8156D]"}`} />
                {isSidebarOpen && <span className="font-body font-medium">{item.name}</span>}
                {isActive && isSidebarOpen && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E8156D]" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Area */}
        <div className="p-4 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-4 rounded-2xl text-gray-500 hover:text-[#E8156D] hover:bg-[#E8156D]/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="font-body font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative h-screen">
        {/* Top Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-40">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search resources..."
                className="w-full bg-white/5 border border-white/5 rounded-full py-2 pl-12 pr-4 text-sm focus:outline-none focus:border-white/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E8156D]" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">{userName}</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[#E8156D]">
                {userName[0]?.toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  )
}

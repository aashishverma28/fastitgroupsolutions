"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  Plus
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    services: 0,
    team: 0,
    recentActions: []
  })

  useEffect(() => {
    const fetchStats = async () => {
      const [servicesRes, teamRes] = await Promise.all([
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('team_members').select('*', { count: 'exact', head: true })
      ])

      setStats({
        services: servicesRes.count || 0,
        team: teamRes.count || 0,
        recentActions: []
      })
    }
    fetchStats()
  }, [])

  const statCards = [
    { title: "Total Services", value: stats.services, icon: Briefcase, color: "text-[#E8156D]", bg: "bg-[#E8156D]/10" },
    { title: "Board Members", value: stats.team, icon: Users, color: "text-[#FFD93D]", bg: "bg-[#FFD93D]/10" },
    { title: "Active Inquiries", value: "0", icon: TrendingUp, color: "text-[#4ADE80]", bg: "bg-[#4ADE80]/10" },
    { title: "Last Updated", value: "Just now", icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10" },
  ]

  return (
    <AdminLayout>
      <div className="space-y-12 max-w-7xl mx-auto pt-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="max-w-xl">
            <p className="font-hand text-white/40 text-3xl lowercase mb-2">studio overview</p>
            <h1 className="text-6xl font-display font-black tracking-tighter text-white uppercase leading-[0.8]">
              Command <br />
              <span className="text-white/20 italic">Intelligence</span>
            </h1>
            <p className="text-gray-500 font-body text-lg mt-6 leading-relaxed">
              The heartbeat of Fastit Group. Monitor your digital ecosystem, manage your collective, and refine your public archives.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-white/20 border border-white/10 px-8 py-4 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Ecosystem Pulse: Synchronized
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statCards.map((stat, i) => (
            <div key={i} className="group relative bg-white/[0.03] border border-white/5 p-10 rounded-[40px] hover:border-white/10 transition-all duration-500 overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-700 group-hover:text-white transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">{stat.title}</p>
              <h3 className="text-4xl font-display font-black text-white uppercase tracking-tighter">{stat.value}</h3>
              
              {/* Subtle background glow */}
              <div className="absolute bottom-[-20%] right-[-10%] w-32 h-32 opacity-0 group-hover:opacity-100 bg-white/5 blur-[40px] rounded-full transition-opacity duration-700" />
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-8">
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-tighter">Direct Inputs</h2>
            <div className="space-y-4">
              <Link href="/sysadmin/services" className="flex items-center justify-between p-6 rounded-[30px] bg-white/[0.03] border border-white/5 hover:bg-white hover:text-black transition-all group">
                <div className="flex items-center gap-5">
                  <div className="bg-[#E8156D] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-[#E8156D]/20">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-display font-bold uppercase tracking-widest text-[10px]">Add Offering</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/sysadmin/work" className="flex items-center justify-between p-6 rounded-[30px] bg-white/[0.03] border border-white/5 hover:bg-white hover:text-black transition-all group">
                <div className="flex items-center gap-5">
                  <div className="bg-purple-500 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/20 text-white">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-display font-bold uppercase tracking-widest text-[10px]">Add Work Project</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/sysadmin/board" className="flex items-center justify-between p-6 rounded-[30px] bg-white/[0.03] border border-white/5 hover:bg-white hover:text-black transition-all group">
                <div className="flex items-center gap-5">
                  <div className="bg-[#FFD93D] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-[#FFD93D]/20 text-black">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-display font-bold uppercase tracking-widest text-[10px]">Onboard Architect</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link href="/sysadmin/demos" className="flex items-center justify-between p-6 rounded-[30px] bg-white/[0.03] border border-white/5 hover:bg-white hover:text-black transition-all group">
                <div className="flex items-center gap-5">
                  <div className="bg-blue-400 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-400/20 text-black">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-display font-bold uppercase tracking-widest text-[10px]">Archive Demo</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Site Status */}
          <div className="lg:col-span-2 group relative bg-white/[0.03] border border-white/5 rounded-[50px] p-12 overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-3xl font-display font-black mb-10 text-white uppercase tracking-tighter">Studio Ecosystem Status</h2>
                <div className="space-y-8">
                  <div className="flex items-center justify-between p-6 bg-white/[0.03] rounded-3xl border border-white/5 group/item hover:border-white/10 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.5)]" />
                      <div className="flex flex-col">
                        <span className="font-display font-bold text-white uppercase tracking-widest text-xs">Supabase Nexus</span>
                        <span className="text-[10px] text-gray-500 font-body">Data streaming active and encrypted</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-green-500 font-black uppercase tracking-[0.2em] bg-green-500/5 px-4 py-2 rounded-full border border-green-500/10">Synchronized</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-6 bg-white/[0.03] rounded-3xl border border-white/5 group/item hover:border-white/10 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                      <div className="flex flex-col">
                        <span className="font-display font-bold text-white uppercase tracking-widest text-xs">Current Manifest</span>
                        <span className="text-[10px] text-gray-500 font-body">v1.5.0-immersion</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em] bg-blue-500/5 px-4 py-2 rounded-full border border-blue-500/10">Production Ready</span>
                  </div>
                </div>
             </div>
             {/* Abstract background shape */}
             <div className="absolute top-[-30%] right-[-20%] w-96 h-96 bg-[#E8156D]/5 blur-[100px] rounded-full group-hover:bg-[#E8156D]/10 transition-all duration-1000" />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

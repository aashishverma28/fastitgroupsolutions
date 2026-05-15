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
      <div className="space-y-10 max-w-7xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-display font-bold mb-2 text-white">Overview</h1>
          <p className="text-gray-500 font-body">Welcome back to the command center.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-[32px] hover:border-white/10 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-3xl font-display font-bold mt-1 text-white">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-xl font-display font-bold text-white">Quick Actions</h2>
            <div className="space-y-4">
              <Link href="/admin/services" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                <div className="bg-[#E8156D] p-2 rounded-xl">
                  <Plus className="w-4 h-4 text-white" />
                </div>
                <span className="font-body font-medium text-white">Add New Service</span>
              </Link>
              <Link href="/admin/board" className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                <div className="bg-[#FFD93D] p-2 rounded-xl text-black">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="font-body font-medium text-white">Add Board Member</span>
              </Link>
            </div>
          </div>

          {/* Site Status */}
          <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-[40px] p-8 overflow-hidden relative">
             <div className="relative z-10">
                <h2 className="text-2xl font-display font-bold mb-6 text-white">Site Status</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="font-body font-medium text-white">Supabase Connection</span>
                    </div>
                    <span className="text-xs text-green-500 font-bold uppercase tracking-widest">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="font-body font-medium text-white">Current Build</span>
                    </div>
                    <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">v1.2.0-stable</span>
                  </div>
                </div>
             </div>
             {/* Abstract background shape */}
             <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#E8156D]/10 blur-[80px] rounded-full" />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

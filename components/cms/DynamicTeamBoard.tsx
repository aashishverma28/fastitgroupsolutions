"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Link2, User } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  role: string
  image_url: string
  bio: string
  linkedin_url: string
}

export default function DynamicTeamBoard() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMembers = async () => {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('order_index', { ascending: true })
      
      if (!error && data) setMembers(data)
      setLoading(false)
    }
    fetchMembers()
  }, [])

  if (loading || members.length === 0) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 w-full max-w-6xl px-6">
      {members.map((member, i) => (
        <div 
          key={member.id} 
          className="group relative bg-white/[0.02] border border-white/5 backdrop-blur-xl p-8 rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
        >
           {/* Card background ambient glow */}
           <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-[#FFD93D]/5 blur-[30px] rounded-full group-hover:bg-[#FFD93D]/10 transition-all duration-500 pointer-events-none" />
           
           <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/5 overflow-hidden flex-shrink-0 relative border border-white/10 group-hover:border-[#FFD93D]/50 transition-colors duration-500">
                {member.image_url ? (
                  <img 
                    src={member.image_url} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/30">
                    <User className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white uppercase tracking-tight">{member.name}</h3>
                <p className="font-satoshi font-semibold text-xs text-[#FFD93D] uppercase tracking-widest mt-1">{member.role}</p>
              </div>
           </div>

           <p className="font-satoshi text-white/60 leading-relaxed text-sm italic mb-8">"{member.bio}"</p>
           
           {member.linkedin_url && (
             <a 
              href={member.linkedin_url} 
              target="_blank" 
              className="inline-flex items-center gap-2 text-white/40 hover:text-[#FFD93D] transition-colors duration-300 font-satoshi text-xs font-bold uppercase tracking-wider"
             >
               <Link2 className="w-3.5 h-3.5" />
               <span>Connect</span>
             </a>
           )}
        </div>
      ))}
    </div>
  )
}

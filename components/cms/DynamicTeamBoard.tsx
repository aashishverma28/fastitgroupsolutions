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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full max-w-6xl px-6">
      {members.map((member, i) => (
        <div 
          key={member.id} 
          className="bg-[#FAF9F7] p-8 shadow-xl relative transition-all hover:scale-105 hover:rotate-1"
          style={{ rotate: `${(i % 2 === 0 ? 1 : -1) * (i + 1)}deg` }}
        >
           <div className="w-3 h-3 rounded-full bg-zinc-400 absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-sm" />
           
           <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-zinc-200 overflow-hidden flex-shrink-0">
                {member.image_url ? (
                  <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-400">
                    <User className="w-6 h-6" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-hand text-2xl font-bold text-black leading-none mb-1">{member.name}</h3>
                <p className="font-hand text-lg text-zinc-500">{member.role}</p>
              </div>
           </div>

           <p className="font-hand text-xl text-zinc-700 leading-tight mb-4">"{member.bio}"</p>
           
           {member.linkedin_url && (
             <a 
              href={member.linkedin_url} 
              target="_blank" 
              className="inline-flex items-center gap-2 text-[#0077b5] hover:opacity-80 transition-opacity"
             >
               <Link2 className="w-4 h-4" />
               <span className="font-hand text-lg font-bold underline decoration-dotted">Connect</span>
             </a>
           )}
        </div>
      ))}
    </div>
  )
}

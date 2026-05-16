"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2,
  X,
  Check,
  Users,
  Link2
} from "lucide-react"
import { supabase } from "@/lib/supabase"

interface TeamMember {
  id: string
  name: string
  role: string
  image_url: string
  bio: string
  linkedin_url: string
  order_index: number
}

export default function TeamBoardPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState<Partial<TeamMember> | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .order('order_index', { ascending: true })
    
    if (!error && data) setMembers(data)
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    const memberData = {
      ...currentMember,
      order_index: currentMember?.order_index || members.length
    }

    let error
    if (currentMember?.id) {
      const { error: err } = await supabase
        .from('team_members')
        .update(memberData)
        .eq('id', currentMember.id)
      error = err
    } else {
      const { error: err } = await supabase
        .from('team_members')
        .insert([memberData])
      error = err
    }

    if (!error) {
      await fetchMembers()
      setIsModalOpen(false)
      setCurrentMember(null)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this board member?")) return
    
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id)
    
    if (!error) fetchMembers()
  }

  return (
    <AdminLayout>
      <div className="space-y-12 max-w-7xl mx-auto pt-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="max-w-xl">
            <p className="font-hand text-[#FFD93D] text-3xl lowercase mb-2">the souls behind</p>
            <h1 className="text-6xl font-display font-black tracking-tighter text-white uppercase leading-[0.8]">
              Honest <br />
              <span className="text-white/20 italic">Architects</span>
            </h1>
            <p className="text-gray-500 font-body text-lg mt-6 leading-relaxed">
              Curate the collective of minds driving Fastit. These are the individuals who craft the future with their hands and hearts.
            </p>
          </div>
          <button 
            onClick={() => {
              setCurrentMember({ name: "", role: "", bio: "" })
              setIsModalOpen(true)
            }}
            className="group relative bg-[#FFD93D] text-black px-10 py-5 rounded-[30px] font-display font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_-10px_rgba(255,217,61,0.2)]"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" /> Add Architect
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6 text-gray-500">
            <div className="relative">
              <div className="w-20 h-20 border-2 border-white/5 rounded-full animate-ping" />
              <Loader2 className="w-10 h-10 animate-spin text-[#FFD93D] absolute inset-0 m-auto" />
            </div>
            <p className="font-display font-bold uppercase tracking-[0.3em] text-xs">Summoning the Board...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-[50px] py-40 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto mb-8 rotate-12 transition-transform">
              <Users className="w-10 h-10 text-gray-700" />
            </div>
            <h3 className="text-3xl font-display font-black text-white mb-4 uppercase tracking-tighter">The Board is empty</h3>
            <p className="text-gray-500 font-body text-lg mb-10 max-w-sm mx-auto">It seems you haven't introduced the architects of Fastit yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {members.map((member, index) => (
              <div key={member.id} className="group relative bg-white/[0.03] border border-white/5 rounded-[40px] p-8 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-[32px] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 group-hover:rotate-2 shadow-2xl">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    ) : (
                      <Users className="w-8 h-8 text-white/10" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FFD93D] mb-1 block">Level {String(index + 1).padStart(2, '0')}</span>
                    <h3 className="text-2xl font-display font-black text-white leading-none uppercase tracking-tighter mb-2">{member.name}</h3>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{member.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-400 font-body text-sm leading-relaxed line-clamp-3 mb-8 h-12">{member.bio}</p>
                
                <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        setCurrentMember(member)
                        setIsModalOpen(true)
                      }}
                      className="w-10 h-10 bg-white/5 hover:bg-white text-gray-500 hover:text-black rounded-2xl flex items-center justify-center transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(member.id)}
                      className="w-10 h-10 bg-white/5 hover:bg-red-500 text-gray-500 hover:text-white rounded-2xl flex items-center justify-center transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" className="w-10 h-10 bg-[#0077b5]/10 text-[#0077b5] rounded-2xl flex items-center justify-center hover:bg-[#0077b5] hover:text-white transition-all">
                      <Link2 className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Decorative glow */}
                <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-[#FFD93D]/5 blur-[50px] rounded-full group-hover:bg-[#FFD93D]/10 transition-all duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-[#080808]/90 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
          <div className="bg-[#111] border border-white/10 w-full max-w-2xl rounded-[50px] relative z-10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col">
            <div className="p-10 border-b border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">
                  {currentMember?.id ? "Refine Architect" : "New Architect"}
                </h2>
                <p className="text-gray-500 font-body text-sm mt-1">Introduce a face of the collective.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 hover:bg-white/5 rounded-full flex items-center justify-center transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Full Name</label>
                  <input 
                    type="text" 
                    value={currentMember?.name || ""}
                    onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
                    required
                    placeholder="e.g. Sahan Mazumder"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white font-display font-bold text-lg focus:outline-none focus:border-[#FFD93D] transition-all placeholder:text-white/10"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Designation (Role)</label>
                  <input 
                    type="text" 
                    value={currentMember?.role || ""}
                    onChange={(e) => setCurrentMember({ ...currentMember, role: e.target.value })}
                    required
                    placeholder="e.g. Lead Architect"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white font-display font-bold text-lg focus:outline-none focus:border-[#FFD93D] transition-all placeholder:text-white/10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Professional Narrative (Bio)</label>
                <textarea 
                  value={currentMember?.bio || ""}
                  onChange={(e) => setCurrentMember({ ...currentMember, bio: e.target.value })}
                  rows={3}
                  placeholder="Tell us about their expertise and spirit..."
                  className="w-full bg-white/[0.03] border border-white/5 rounded-3xl p-5 text-white text-sm focus:outline-none focus:border-[#FFD93D] transition-all resize-none placeholder:text-white/10 leading-relaxed"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Digital Presence (LinkedIn)</label>
                <input 
                  type="url" 
                  value={currentMember?.linkedin_url || ""}
                  onChange={(e) => setCurrentMember({ ...currentMember, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-[#FFD93D] transition-all placeholder:text-white/10"
                />
              </div>

              <div className="pt-8 flex items-center justify-between">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-white transition-colors"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="bg-[#FFD93D] text-black px-10 py-5 rounded-3xl font-display font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,217,61,0.3)]"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {currentMember?.id ? "Update Profile" : "Onboard Architect"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

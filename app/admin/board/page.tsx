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
      <div className="space-y-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-white">Honest Board</h1>
            <p className="text-gray-500 font-body">Manage the faces of FASTIT.</p>
          </div>
          <button 
            onClick={() => {
              setCurrentMember({ name: "", role: "", bio: "" })
              setIsModalOpen(true)
            }}
            className="bg-[#FFD93D] hover:bg-[#E5C337] text-black px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 w-fit"
          >
            <Plus className="w-5 h-5" /> Add Member
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
            <Loader2 className="w-12 h-12 animate-spin text-[#FFD93D]" />
            <p className="font-display font-medium">Fetching board members...</p>
          </div>
        ) : members.length === 0 ? (
          <div className="bg-white/5 border border-dashed border-white/10 rounded-[40px] py-24 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">No members found</h3>
            <p className="text-gray-500 font-body mb-8">Add the core team to the Honest Board.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {members.map((member) => (
              <div key={member.id} className="bg-white/5 border border-white/5 rounded-[32px] p-8 hover:border-white/10 transition-all group relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <Users className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-display font-bold text-white">{member.name}</h3>
                    <p className="text-gray-500 text-sm">{member.role}</p>
                  </div>
                </div>
                
                <p className="text-gray-400 font-body text-sm line-clamp-2 mb-6">{member.bio}</p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        setCurrentMember(member)
                        setIsModalOpen(true)
                      }}
                      className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(member.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" className="text-[#0077b5] hover:scale-110 transition-transform">
                      <Link2 className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-[#0F0F0F] border border-white/10 w-full max-w-xl rounded-[40px] relative z-10 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-white">
                {currentMember?.id ? "Edit Member" : "Add Member"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Name</label>
                  <input 
                    type="text" 
                    value={currentMember?.name || ""}
                    onChange={(e) => setCurrentMember({ ...currentMember, name: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#FFD93D] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Role</label>
                  <input 
                    type="text" 
                    value={currentMember?.role || ""}
                    onChange={(e) => setCurrentMember({ ...currentMember, role: e.target.value })}
                    required
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#FFD93D] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Bio</label>
                <textarea 
                  value={currentMember?.bio || ""}
                  onChange={(e) => setCurrentMember({ ...currentMember, bio: e.target.value })}
                  rows={3}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#FFD93D] transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">LinkedIn URL</label>
                <input 
                  type="url" 
                  value={currentMember?.linkedin_url || ""}
                  onChange={(e) => setCurrentMember({ ...currentMember, linkedin_url: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#FFD93D] transition-all"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-2xl font-bold text-gray-500 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={saving}
                  className="bg-[#FFD93D] hover:bg-[#E5C337] disabled:opacity-50 text-black px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-[0_10px_40px_-10px_rgba(255,217,61,0.2)]"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                  {currentMember?.id ? "Update Member" : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

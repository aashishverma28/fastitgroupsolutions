"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit2, 
  Trash2, 
  ExternalLink,
  Loader2,
  X,
  Check,
  Briefcase
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { gsap } from "gsap"

interface Service {
  id: string
  title: string
  description: string
  icon: string
  image_url: string
  order_index: number
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentService, setCurrentService] = useState<Partial<Service> | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true })
    
    if (!error && data) setServices(data)
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    const serviceData = {
      ...currentService,
      order_index: currentService?.order_index || services.length
    }

    let error
    if (currentService?.id) {
      const { error: err } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', currentService.id)
      error = err
    } else {
      const { error: err } = await supabase
        .from('services')
        .insert([serviceData])
      error = err
    }

    if (!error) {
      await fetchServices()
      setIsModalOpen(false)
      setCurrentService(null)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return
    
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)
    
    if (!error) fetchServices()
  }

  return (
    <AdminLayout>
      <div className="space-y-12 max-w-7xl mx-auto pt-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="max-w-xl">
            <p className="font-hand text-[#E8156D] text-3xl lowercase mb-2">our offerings</p>
            <h1 className="text-6xl font-display font-black tracking-tighter text-white uppercase leading-[0.8]">
              Business <br />
              <span className="text-white/20 italic">Architectures</span>
            </h1>
            <p className="text-gray-500 font-body text-lg mt-6 leading-relaxed">
              Define the core value propositions of Fastit. These services represent our commitment to technical excellence and human-centric design.
            </p>
          </div>
          <button 
            onClick={() => {
              setCurrentService({ title: "", description: "", icon: "Briefcase" })
              setIsModalOpen(true)
            }}
            className="group relative bg-white text-black px-10 py-5 rounded-[30px] font-display font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)]"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" /> Create Service
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6 text-gray-500">
            <div className="relative">
              <div className="w-20 h-20 border-2 border-white/5 rounded-full animate-ping" />
              <Loader2 className="w-10 h-10 animate-spin text-[#E8156D] absolute inset-0 m-auto" />
            </div>
            <p className="font-display font-bold uppercase tracking-[0.3em] text-xs">Loading Architectures...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-[50px] py-40 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto mb-8 rotate-12 group-hover:rotate-0 transition-transform">
              <Briefcase className="w-10 h-10 text-gray-700" />
            </div>
            <h3 className="text-3xl font-display font-black text-white mb-4 uppercase tracking-tighter">No active offerings</h3>
            <p className="text-gray-500 font-body text-lg mb-10 max-w-sm mx-auto">You haven't defined any services yet. Start by creating your first offering.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <div key={service.id} className="group relative bg-white/[0.03] border border-white/5 rounded-[40px] p-10 hover:border-white/20 transition-all duration-500 overflow-hidden">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 bg-[#E8156D]/10 text-[#E8156D] rounded-[24px] flex items-center justify-center transition-all group-hover:bg-[#E8156D] group-hover:text-white group-hover:rotate-6 shadow-xl group-hover:shadow-[#E8156D]/30">
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => {
                        setCurrentService(service)
                        setIsModalOpen(true)
                      }}
                      className="w-10 h-10 bg-white/5 hover:bg-white text-gray-500 hover:text-black rounded-2xl flex items-center justify-center transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)}
                      className="w-10 h-10 bg-white/5 hover:bg-red-500 text-gray-500 hover:text-white rounded-2xl flex items-center justify-center transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2 block">Service Archive #{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-3xl font-display font-black text-white leading-tight uppercase tracking-tighter mb-4 group-hover:text-[#E8156D] transition-colors">{service.title}</h3>
                  <p className="text-gray-500 font-body text-sm leading-relaxed line-clamp-4">{service.description}</p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-8">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-600 mb-1">Priority Order</span>
                    <span className="text-xs font-black text-white">{service.order_index}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-600 mb-1">Catalog ID</span>
                    <span className="text-[10px] font-black text-white/40 uppercase">{service.id.split('-')[0]}</span>
                  </div>
                </div>

                {/* Decorative blob */}
                <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-[#E8156D]/5 blur-[60px] rounded-full group-hover:bg-[#E8156D]/10 transition-all duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-[#080808]/90 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
          <div className="bg-[#111] border border-white/10 w-full max-w-2xl rounded-[50px] relative z-10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col">
            <div className="p-10 border-b border-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">
                  {currentService?.id ? "Refine Offering" : "New Service"}
                </h2>
                <p className="text-gray-500 font-body text-sm mt-1">Define how Fastit creates value.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 hover:bg-white/5 rounded-full flex items-center justify-center transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-10 space-y-8 overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Service Title</label>
                <input 
                  type="text" 
                  value={currentService?.title || ""}
                  onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                  required
                  placeholder="e.g. Next-Gen Web Architecture"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white font-display font-bold text-lg focus:outline-none focus:border-[#E8156D] transition-all placeholder:text-white/10"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Value Proposition</label>
                <textarea 
                  value={currentService?.description || ""}
                  onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                  required
                  placeholder="Describe the essence of this service..."
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-3xl p-5 text-white text-sm focus:outline-none focus:border-[#E8156D] transition-all resize-none placeholder:text-white/10 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Visual Symbol (Icon)</label>
                  <input 
                    type="text" 
                    value={currentService?.icon || ""}
                    onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
                    placeholder="Briefcase"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-[#E8156D] transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Display Priority</label>
                  <input 
                    type="number" 
                    value={currentService?.order_index || 0}
                    onChange={(e) => setCurrentService({ ...currentService, order_index: parseInt(e.target.value) })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-[#E8156D] transition-all"
                  />
                </div>
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
                  className="bg-[#E8156D] text-white px-10 py-5 rounded-3xl font-display font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(232,21,109,0.4)]"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {currentService?.id ? "Update Architecture" : "Commit to Market"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

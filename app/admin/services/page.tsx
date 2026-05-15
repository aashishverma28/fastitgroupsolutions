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
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-white">Services</h1>
            <p className="text-gray-500 font-body">Manage what you offer to the world.</p>
          </div>
          <button 
            onClick={() => {
              setCurrentService({ title: "", description: "", icon: "Briefcase" })
              setIsModalOpen(true)
            }}
            className="bg-[#E8156D] hover:bg-[#C1125A] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 w-fit"
          >
            <Plus className="w-5 h-5" /> Add Service
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-2 rounded-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search services..."
              className="w-full bg-transparent border-none py-3 pl-12 pr-4 text-white font-body focus:outline-none"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
            <Loader2 className="w-12 h-12 animate-spin text-[#E8156D]" />
            <p className="font-display font-medium">Loading your services...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="bg-white/5 border border-dashed border-white/10 rounded-[40px] py-24 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">No services found</h3>
            <p className="text-gray-500 font-body mb-8">Start by adding your first business service.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="bg-white/5 border border-white/5 rounded-[32px] p-8 hover:border-white/10 transition-all group relative overflow-hidden">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 bg-[#E8156D]/10 text-[#E8156D] rounded-2xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setCurrentService(service)
                        setIsModalOpen(true)
                      }}
                      className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(service.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-500 font-body text-sm line-clamp-3 mb-6">{service.description}</p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-600">
                  <span>Order: {service.order_index}</span>
                  <div className="w-1 h-1 rounded-full bg-gray-700" />
                  <span>ID: {service.id.split('-')[0]}</span>
                </div>

                {/* Abstract background shape */}
                <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-[#E8156D]/5 blur-[40px] rounded-full group-hover:bg-[#E8156D]/10 transition-all" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-[#0F0F0F] border border-white/10 w-full max-w-xl rounded-[40px] relative z-10 overflow-hidden">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-white">
                {currentService?.id ? "Edit Service" : "Add Service"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Service Title</label>
                <input 
                  type="text" 
                  value={currentService?.title || ""}
                  onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                  required
                  placeholder="e.g. Web Development"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#E8156D] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Description</label>
                <textarea 
                  value={currentService?.description || ""}
                  onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                  required
                  placeholder="What does this service entail?"
                  rows={4}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#E8156D] transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Icon Name</label>
                  <input 
                    type="text" 
                    value={currentService?.icon || ""}
                    onChange={(e) => setCurrentService({ ...currentService, icon: e.target.value })}
                    placeholder="Briefcase"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#E8156D] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Display Order</label>
                  <input 
                    type="number" 
                    value={currentService?.order_index || 0}
                    onChange={(e) => setCurrentService({ ...currentService, order_index: parseInt(e.target.value) })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#E8156D] transition-all"
                  />
                </div>
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
                  className="bg-[#E8156D] hover:bg-[#C1125A] disabled:opacity-50 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-[0_10px_40px_-10px_rgba(232,21,109,0.3)]"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                  {currentService?.id ? "Update Service" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

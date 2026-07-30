"use client"

import { useState, useEffect, useRef } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2,
  X,
  Check,
  Globe,
  Upload,
  Image as ImageIcon,
  ExternalLink
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"

interface DemoProject {
  id: string
  title: string
  description: string
  category: string
  image_url: string
  demo_link: string
  order_index: number
}

export default function DemosPage() {
  const [demos, setDemos] = useState<DemoProject[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentDemo, setCurrentDemo] = useState<Partial<DemoProject> | null>(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchDemos()
  }, [])

  const fetchDemos = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('demo_projects')
      .select('*')
      .order('order_index', { ascending: true })
    
    if (!error && data) setDemos(data)
    setLoading(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Limit file size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `demos/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('projects')
      .upload(filePath, file)

    if (uploadError) {
      console.error("Upload error:", uploadError)
      alert("Error uploading image: " + uploadError.message)
      setUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage
      .from('projects')
      .getPublicUrl(filePath)

    setCurrentDemo(prev => ({ ...prev, image_url: publicUrl }))
    setUploading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    
    const demoData = {
      ...currentDemo,
      order_index: currentDemo?.order_index ?? demos.length
    }

    let error
    if (currentDemo?.id) {
      const { error: err } = await supabase
        .from('demo_projects')
        .update(demoData)
        .eq('id', currentDemo.id)
      error = err
    } else {
      const { error: err } = await supabase
        .from('demo_projects')
        .insert([demoData])
      error = err
    }

    if (!error) {
      await fetchDemos()
      setIsModalOpen(false)
      setCurrentDemo(null)
    } else {
      alert("Error saving project: " + error.message)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this demo project?")) return
    
    const { error } = await supabase
      .from('demo_projects')
      .delete()
      .eq('id', id)
    
    if (!error) fetchDemos()
  }

  return (
    <AdminLayout>
      <div className="space-y-12 max-w-7xl mx-auto pt-4">
        {/* Header with quick stats or intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="max-w-xl">
            <p className="font-hand text-[#E8156D] text-3xl lowercase mb-2">curating excellence</p>
            <h1 className="text-6xl font-display font-black tracking-tighter text-white uppercase leading-[0.8]">
              Prototype <br />
              <span className="text-white/20 italic">Archives</span>
            </h1>
            <p className="text-gray-500 font-body text-lg mt-6 leading-relaxed">
              Managing the visual prototypes that showcase our technical boundary-pushing. Each entry here is a window into our creative process.
            </p>
          </div>
          <button 
            onClick={() => {
              setCurrentDemo({ title: "", description: "", category: "Product Design", demo_link: "#", image_url: "" })
              setIsModalOpen(true)
            }}
            className="group relative bg-white text-black px-10 py-5 rounded-[30px] font-display font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)]"
          >
            <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" /> New Project
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6 text-gray-500">
            <div className="relative">
              <div className="w-20 h-20 border-2 border-white/5 rounded-full animate-ping" />
              <Loader2 className="w-10 h-10 animate-spin text-[#E8156D] absolute inset-0 m-auto" />
            </div>
            <p className="font-display font-bold uppercase tracking-[0.3em] text-xs">Opening Archives...</p>
          </div>
        ) : demos.length === 0 ? (
          <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-[50px] py-40 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto mb-8 rotate-12 group-hover:rotate-0 transition-transform">
              <Globe className="w-10 h-10 text-gray-700" />
            </div>
            <h3 className="text-3xl font-display font-black text-white mb-4 uppercase tracking-tighter">The archives are empty</h3>
            <p className="text-gray-500 font-body text-lg mb-10 max-w-sm mx-auto">No prototypes have been cataloged yet. Start building your portfolio.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {demos.map((demo, index) => (
              <div key={demo.id} className="group relative bg-white/[0.03] border border-white/5 rounded-[40px] overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col lg:flex-row h-full lg:h-72">
                {/* Image Section */}
                <div className="relative w-full lg:w-80 h-64 lg:h-full bg-white/5 flex-shrink-0 overflow-hidden">
                  {demo.image_url ? (
                    <Image 
                      src={demo.image_url} 
                      alt={demo.title} 
                      fill 
                      className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/10">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent lg:from-black/40" />
                  
                  {/* Quick Actions Overlay */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => {
                        setCurrentDemo(demo)
                        setIsModalOpen(true)
                      }}
                      className="w-10 h-10 bg-white text-black rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(demo.id)}
                      className="w-10 h-10 bg-red-500 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-xl"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-8 flex flex-col flex-1">
                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#E8156D] bg-[#E8156D]/10 px-3 py-1 rounded-full">{demo.category}</span>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">#{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-2xl font-display font-black text-white leading-tight uppercase tracking-tighter group-hover:text-[#E8156D] transition-colors line-clamp-1">{demo.title}</h3>
                  </div>
                  
                  <p className="text-gray-500 text-sm font-body leading-relaxed line-clamp-2 mb-6">{demo.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-6">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold uppercase tracking-widest text-gray-600 mb-1">Index Order</span>
                      <span className="text-xs font-black text-white">{demo.order_index}</span>
                    </div>
                    <a 
                      href={demo.demo_link} 
                      target="_blank" 
                      className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors group/link"
                    >
                      Live Preview <ExternalLink className="w-3 h-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
          <div className="absolute inset-0 bg-[#080808]/90 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
          <div className="bg-[#111] border border-white/10 w-full max-w-4xl rounded-[50px] relative z-10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row max-h-[90vh]">
            {/* Left: Image Side */}
            <div className="w-full md:w-1/2 bg-white/[0.02] border-r border-white/5 p-8 flex flex-col">
               <div className="mb-8">
                 <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">
                   {currentDemo?.id ? "Refine Project" : "New Archive"}
                 </h2>
                 <p className="text-gray-500 font-body text-sm mt-2">Upload a visual representation of your work.</p>
               </div>

               <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 relative bg-white/[0.03] border-2 border-dashed border-white/10 rounded-[40px] overflow-hidden cursor-pointer hover:border-[#E8156D]/50 transition-all flex flex-col items-center justify-center gap-6 group"
              >
                {uploading ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-[#E8156D]" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Uploading...</p>
                  </div>
                ) : currentDemo?.image_url ? (
                  <>
                    <Image src={currentDemo.image_url} alt="Preview" fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center">
                        <Upload className="w-6 h-6" />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-20 h-20 rounded-[30px] bg-white/5 flex items-center justify-center group-hover:bg-[#E8156D]/10 transition-colors">
                      <Upload className="w-8 h-8 text-white/20 group-hover:text-[#E8156D]" />
                    </div>
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest text-center px-8 leading-relaxed">Drop your mockup here or click to browse</p>
                  </>
                )}
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>

            {/* Right: Form Side */}
            <form onSubmit={handleSave} className="flex-1 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col">
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Project Identity</label>
                    <input 
                      type="text" 
                      value={currentDemo?.title || ""}
                      onChange={(e) => setCurrentDemo({ ...currentDemo, title: e.target.value })}
                      required
                      placeholder="e.g. Spectral Interface"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-white font-display font-bold text-lg focus:outline-none focus:border-[#E8156D] focus:bg-white/[0.06] transition-all placeholder:text-white/10"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Classification</label>
                      <input 
                        type="text" 
                        value={currentDemo?.category || ""}
                        onChange={(e) => setCurrentDemo({ ...currentDemo, category: e.target.value })}
                        required
                        placeholder="e.g. R&D"
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-[#E8156D] transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Order Index</label>
                      <input 
                        type="number" 
                        value={currentDemo?.order_index || 0}
                        onChange={(e) => setCurrentDemo({ ...currentDemo, order_index: parseInt(e.target.value) })}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-[#E8156D] transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Access Point (URL)</label>
                  <input 
                    type="text" 
                    value={currentDemo?.demo_link || ""}
                    onChange={(e) => setCurrentDemo({ ...currentDemo, demo_link: e.target.value })}
                    placeholder="https://prototype.fastitgroup.in/..."
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-[#E8156D] transition-all placeholder:text-white/10"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">The Narrative</label>
                  <textarea 
                    value={currentDemo?.description || ""}
                    onChange={(e) => setCurrentDemo({ ...currentDemo, description: e.target.value })}
                    required
                    placeholder="Describe the soul of this project..."
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-3xl p-5 text-white text-sm focus:outline-none focus:border-[#E8156D] transition-all resize-none placeholder:text-white/10 leading-relaxed"
                  />
                </div>
              </div>

              <div className="mt-12 flex items-center justify-between">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-white transition-colors"
                >
                  Discard
                </button>
                <button 
                  type="submit"
                  disabled={saving || uploading}
                  className="bg-[#E8156D] text-white px-10 py-5 rounded-3xl font-display font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-[0_20px_40px_-10px_rgba(232,21,109,0.4)]"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  {currentDemo?.id ? "Update Entry" : "Commit to Archives"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

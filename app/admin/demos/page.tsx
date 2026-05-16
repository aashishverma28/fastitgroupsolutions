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
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display font-bold text-white">Demo Projects</h1>
            <p className="text-gray-500 font-body">Manage the interactive prototypes shown on the Demo page.</p>
          </div>
          <button 
            onClick={() => {
              setCurrentDemo({ title: "", description: "", category: "Product Design", demo_link: "#", image_url: "" })
              setIsModalOpen(true)
            }}
            className="bg-[#E8156D] hover:bg-[#C1125A] text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 w-fit"
          >
            <Plus className="w-5 h-5" /> Add Project
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
            <Loader2 className="w-12 h-12 animate-spin text-[#E8156D]" />
            <p className="font-display font-medium">Loading your demos...</p>
          </div>
        ) : demos.length === 0 ? (
          <div className="bg-white/5 border border-dashed border-white/10 rounded-[40px] py-24 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">No demo projects found</h3>
            <p className="text-gray-500 font-body mb-8">Start by adding your first prototype showcase.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demos.map((demo) => (
              <div key={demo.id} className="bg-white/5 border border-white/5 rounded-[32px] overflow-hidden hover:border-white/10 transition-all group relative">
                {/* Image Preview */}
                <div className="relative h-48 bg-white/5">
                  {demo.image_url ? (
                    <Image src={demo.image_url} alt={demo.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <ImageIcon className="w-10 h-10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => {
                        setCurrentDemo(demo)
                        setIsModalOpen(true)
                      }}
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(demo.id)}
                      className="p-3 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8156D]">{demo.category}</span>
                    <h3 className="text-lg font-display font-bold text-white line-clamp-1">{demo.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm font-body line-clamp-2">{demo.description}</p>
                  
                  <div className="pt-4 flex items-center justify-between border-t border-white/5 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                    <span>Order: {demo.order_index}</span>
                    <a href={demo.demo_link} target="_blank" className="flex items-center gap-1 hover:text-white">
                      Link <ExternalLink className="w-3 h-3" />
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-[#0F0F0F] border border-white/10 w-full max-w-2xl rounded-[40px] relative z-10 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-2xl font-display font-bold text-white">
                {currentDemo?.id ? "Edit Project" : "Add Demo Project"}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-6">
              {/* Image Upload Area */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Project Image</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="relative h-64 bg-white/5 border-2 border-dashed border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-[#E8156D]/50 transition-all flex flex-col items-center justify-center gap-4"
                >
                  {uploading ? (
                    <Loader2 className="w-10 h-10 animate-spin text-[#E8156D]" />
                  ) : currentDemo?.image_url ? (
                    <>
                      <Image src={currentDemo.image_url} alt="Preview" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-gray-700" />
                      <p className="text-gray-500 text-sm font-body">Click to upload project mockup</p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Project Title</label>
                  <input 
                    type="text" 
                    value={currentDemo?.title || ""}
                    onChange={(e) => setCurrentDemo({ ...currentDemo, title: e.target.value })}
                    required
                    placeholder="e.g. Music Dashboard"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#E8156D] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Category</label>
                  <input 
                    type="text" 
                    value={currentDemo?.category || ""}
                    onChange={(e) => setCurrentDemo({ ...currentDemo, category: e.target.value })}
                    required
                    placeholder="e.g. SaaS Design"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#E8156D] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Demo Link (URL)</label>
                <input 
                  type="text" 
                  value={currentDemo?.demo_link || ""}
                  onChange={(e) => setCurrentDemo({ ...currentDemo, demo_link: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#E8156D] transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Description</label>
                <textarea 
                  value={currentDemo?.description || ""}
                  onChange={(e) => setCurrentDemo({ ...currentDemo, description: e.target.value })}
                  required
                  placeholder="Tell us about this project..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-white focus:outline-none focus:border-[#E8156D] transition-all resize-none"
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
                  disabled={saving || uploading}
                  className="bg-[#E8156D] hover:bg-[#C1125A] disabled:opacity-50 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-[0_10px_40px_-10px_rgba(232,21,109,0.3)]"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
                  {currentDemo?.id ? "Update Project" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

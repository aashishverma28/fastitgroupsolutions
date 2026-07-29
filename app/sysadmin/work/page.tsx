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
  Folder, 
  ExternalLink 
} from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Project {
  id: string
  title: string
  description: string
  category: string
  link: string
  color: string
  created_at: string
}

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<Partial<Project> | null>(null)
  const [saving, setSaving] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (!error && data) setProjects(data)
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const projectData = {
      title: currentProject?.title || "",
      description: currentProject?.description || "",
      category: currentProject?.category || "",
      link: currentProject?.link || "",
      color: currentProject?.color || "#E8156D"
    }

    let error
    if (currentProject?.id) {
      const { error: err } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', currentProject.id)
      error = err
    } else {
      const { error: err } = await supabase
        .from('projects')
        .insert([projectData])
      error = err
    }

    if (!error) {
      await fetchProjects()
      setIsModalOpen(false)
      setCurrentProject(null)
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (!error) fetchProjects()
  }

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="space-y-12 max-w-7xl mx-auto pt-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="max-w-xl">
            <p className="font-hand text-[#E8156D] text-3xl lowercase mb-2">selected works</p>
            <h1 className="text-6xl font-display font-black tracking-tighter text-white uppercase leading-[0.8]">
              Manage <br />
              <span className="text-white/20 italic">Projects</span>
            </h1>
            <p className="text-gray-500 font-body text-lg mt-6 leading-relaxed">
              Curate the flagship portfolio projects showcased on the main Work page.
            </p>
          </div>
          <button 
            onClick={() => {
              setCurrentProject({ color: "#E8156D" })
              setIsModalOpen(true)
            }}
            className="flex items-center gap-3 bg-[#E8156D] hover:bg-white hover:text-black text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg text-xs uppercase tracking-widest self-start md:self-end"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-3xl max-w-md">
          <Search className="w-5 h-5 text-gray-600" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-white text-sm w-full focus:outline-none placeholder:text-gray-600"
          />
        </div>

        {/* Projects List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#E8156D]" />
            <span className="text-xs uppercase tracking-widest font-bold">Loading Portfolio...</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-[40px] text-gray-500">
            <p className="text-sm font-bold uppercase tracking-widest">No projects found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group relative bg-white/[0.02] border border-white/5 p-8 rounded-[35px] hover:border-white/10 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-black"
                      style={{ backgroundColor: project.color || '#E8156D' }}
                    >
                      <Folder className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setCurrentProject(project)
                          setIsModalOpen(true)
                        }}
                        className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(project.id)}
                        className="p-3 bg-white/5 hover:bg-red-500/10 rounded-xl text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 block mb-1">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight mb-4">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed font-body mb-8">
                    {project.description}
                  </p>
                </div>

                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#E8156D] hover:text-white transition-colors"
                  >
                    Preview Link <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal Form */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0B0B0B] border border-white/10 rounded-[40px] max-w-xl w-full p-8 md:p-10 relative overflow-hidden shadow-2xl">
              <button 
                onClick={() => {
                  setIsModalOpen(false)
                  setCurrentProject(null)
                }}
                className="absolute top-6 right-6 p-3 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter mb-8">
                {currentProject?.id ? "Modify Project" : "Add Project"}
              </h2>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Title</label>
                  <input 
                    type="text" 
                    required
                    value={currentProject?.title || ""}
                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                    placeholder="e.g., Fastit Music India"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-body focus:outline-none focus:border-[#E8156D] focus:ring-1 focus:ring-[#E8156D]/50 transition-all placeholder:opacity-20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Category</label>
                    <input 
                      type="text" 
                      required
                      value={currentProject?.category || ""}
                      onChange={(e) => setCurrentProject({ ...currentProject, category: e.target.value })}
                      placeholder="e.g., Music Distribution & Tech"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-body focus:outline-none focus:border-[#E8156D] focus:ring-1 focus:ring-[#E8156D]/50 transition-all placeholder:opacity-20"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Accent Color</label>
                    <div className="flex gap-4 items-center">
                      <input 
                        type="color" 
                        value={currentProject?.color || "#E8156D"}
                        onChange={(e) => setCurrentProject({ ...currentProject, color: e.target.value })}
                        className="w-12 h-14 bg-transparent border-none cursor-pointer rounded-2xl overflow-hidden"
                      />
                      <input 
                        type="text" 
                        value={currentProject?.color || "#E8156D"}
                        onChange={(e) => setCurrentProject({ ...currentProject, color: e.target.value })}
                        placeholder="#E8156D"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-body focus:outline-none focus:border-[#E8156D] focus:ring-1 focus:ring-[#E8156D]/50 transition-all placeholder:opacity-20"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Website URL</label>
                  <input 
                    type="url" 
                    value={currentProject?.link || ""}
                    onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })}
                    placeholder="https://fastitmusic.in"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-body focus:outline-none focus:border-[#E8156D] focus:ring-1 focus:ring-[#E8156D]/50 transition-all placeholder:opacity-20"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Description</label>
                  <textarea 
                    required
                    rows={4}
                    value={currentProject?.description || ""}
                    onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                    placeholder="Briefly describe the project scope and tech stack..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white font-body focus:outline-none focus:border-[#E8156D] focus:ring-1 focus:ring-[#E8156D]/50 transition-all placeholder:opacity-20 resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={saving}
                  className="w-full bg-[#E8156D] hover:bg-white hover:text-black text-white font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Check className="w-4 h-4" /> Save Project
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { 
  Inbox, 
  Trash2, 
  Loader2, 
  Mail, 
  Building, 
  User, 
  Calendar,
  ExternalLink
} from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Inquiry {
  id: string
  name: string
  company: string | null
  service: string | null
  email: string
  created_at: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (!error && data) setInquiries(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return
    
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id)
    
    if (!error) {
      setInquiries(inquiries.filter(i => i.id !== id))
    } else {
      alert("Failed to delete inquiry: " + error.message)
    }
  }

  const getServiceBadgeStyles = (service: string | null) => {
    if (!service) return "bg-white/5 text-gray-400 border border-white/10"
    
    const s = service.toLowerCase()
    if (s.includes("web")) {
      return "bg-blue-500/10 text-blue-400 border border-blue-500/20"
    } else if (s.includes("app") || s.includes("mobile")) {
      return "bg-purple-500/10 text-purple-400 border border-purple-500/20"
    } else if (s.includes("design") || s.includes("ui") || s.includes("ux")) {
      return "bg-[#E8156D]/10 text-[#E8156D] border border-[#E8156D]/20"
    }
    
    return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
  }

  return (
    <AdminLayout>
      <div className="space-y-12 max-w-7xl mx-auto pt-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="max-w-xl">
            <p className="font-hand text-[#E8156D] text-3xl lowercase mb-2">incoming signals</p>
            <h1 className="text-6xl font-display font-black tracking-tighter text-white uppercase leading-[0.8]">
              Client <br />
              <span className="text-white/20 italic">Inquiries</span>
            </h1>
            <p className="text-gray-500 font-body text-lg mt-6 leading-relaxed">
              Real-time proposals and messages received from the Fastit studio contact interface. Respond swiftly to synchronize opportunities.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-white/20 border border-white/10 px-8 py-4 rounded-full">
            Queue Size: {inquiries.length} Inquir{inquiries.length === 1 ? 'y' : 'ies'}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6 text-gray-500">
            <div className="relative">
              <div className="w-20 h-20 border-2 border-white/5 rounded-full animate-ping" />
              <Loader2 className="w-10 h-10 animate-spin text-[#E8156D] absolute inset-0 m-auto" />
            </div>
            <p className="font-display font-bold uppercase tracking-[0.3em] text-xs">Accessing Signal Stream...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white/[0.02] border border-dashed border-white/10 rounded-[50px] py-40 text-center">
            <div className="w-24 h-24 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto mb-8 rotate-12 transition-transform">
              <Inbox className="w-10 h-10 text-gray-700" />
            </div>
            <h3 className="text-3xl font-display font-black text-white mb-4 uppercase tracking-tighter">No active signals</h3>
            <p className="text-gray-500 font-body text-lg mb-10 max-w-sm mx-auto">There are no contact inquiries currently stored in the database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {inquiries.map((inquiry, index) => (
              <div 
                key={inquiry.id} 
                className="group relative bg-white/[0.03] border border-white/5 rounded-[40px] p-10 hover:border-white/20 transition-all duration-500 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card Top Metadata & Controls */}
                  <div className="flex items-start justify-between mb-8">
                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full ${getServiceBadgeStyles(inquiry.service)}`}>
                      {inquiry.service || "Unspecified Service"}
                    </span>
                    <button 
                      onClick={() => handleDelete(inquiry.id)}
                      className="w-10 h-10 bg-white/5 hover:bg-red-500 text-gray-500 hover:text-white rounded-2xl flex items-center justify-center transition-all cursor-pointer"
                      title="Archive Inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                        <User className="w-4 h-4" />
                      </div>
                      <h3 className="text-2xl font-display font-black text-white leading-none uppercase tracking-tighter">
                        {inquiry.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                        <Building className="w-4 h-4" />
                      </div>
                      <p className="text-gray-400 font-body text-base">
                        {inquiry.company ? (
                          <>Represents <span className="text-white font-semibold">{inquiry.company}</span></>
                        ) : (
                          <span className="italic text-gray-600">Independent Client</span>
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                        <Mail className="w-4 h-4" />
                      </div>
                      <a 
                        href={`mailto:${inquiry.email}`} 
                        className="text-gray-400 hover:text-[#E8156D] font-body text-base flex items-center gap-2 transition-colors duration-300"
                      >
                        {inquiry.email}
                        <ExternalLink className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Footer Details */}
                <div className="flex items-center justify-between border-t border-white/5 pt-8 mt-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {new Date(inquiry.created_at).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-gray-600 block mb-1">Signal Hash</span>
                    <span className="text-[10px] font-black text-white/40 uppercase font-mono">{inquiry.id.split('-')[0]}</span>
                  </div>
                </div>

                {/* Decorative hover glow */}
                <div className="absolute bottom-[-10%] right-[-10%] w-40 h-40 bg-white/5 blur-[60px] rounded-full group-hover:bg-white/[0.08] transition-all duration-700 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

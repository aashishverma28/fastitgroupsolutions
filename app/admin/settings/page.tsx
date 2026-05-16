"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/AdminLayout"
import { 
  Save,
  Loader2,
  Check,
  Phone,
  Mail,
  MapPin,
  Globe,
  Camera,
  Share2,
  Send
} from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Setting {
  id: string
  key: string
  value: string
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
    
    if (!error && data) {
      const settingsMap: Record<string, string> = {}
      data.forEach(s => settingsMap[s.key] = s.value)
      setSettings(settingsMap)
    }
    setLoading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const upsertData = Object.entries(settings).map(([key, value]) => ({
      key,
      value
    }))

    const { error } = await supabase
      .from('site_settings')
      .upsert(upsertData, { onConflict: 'key' })

    if (!error) {
      setMessage("Settings saved successfully!")
      setTimeout(() => setMessage(null), 3000)
    }
    setSaving(false)
  }

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return (
  return (
    <AdminLayout>
      <div className="space-y-12 max-w-4xl mx-auto pt-4 pb-32">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="max-w-xl">
            <p className="font-hand text-blue-400 text-3xl lowercase mb-2">the configuration</p>
            <h1 className="text-6xl font-display font-black tracking-tighter text-white uppercase leading-[0.8]">
              Studio <br />
              <span className="text-white/20 italic">Parameters</span>
            </h1>
            <p className="text-gray-500 font-body text-lg mt-6 leading-relaxed">
              Fine-tune the global presence of Fastit. These variables dictate how the world interacts with our digital identity.
            </p>
          </div>
          {message && (
            <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-6 py-3 rounded-2xl animate-bounce">
              <Check className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">{message}</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-6 text-gray-500">
            <div className="relative">
              <div className="w-20 h-20 border-2 border-white/5 rounded-full animate-ping" />
              <Loader2 className="w-10 h-10 animate-spin text-blue-400 absolute inset-0 m-auto" />
            </div>
            <p className="font-display font-bold uppercase tracking-[0.3em] text-xs">Accessing Parameters...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-12">
            {/* Contact Information */}
            <div className="bg-white/[0.03] border border-white/5 rounded-[50px] p-12 space-y-10 relative overflow-hidden group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-400/10 text-blue-400 rounded-2xl flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Communication</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Direct Message (Email)</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-blue-400 transition-colors" />
                    <input 
                      type="email" 
                      value={settings['contact_email'] || ""}
                      onChange={(e) => updateSetting('contact_email', e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-display font-bold focus:outline-none focus:border-blue-400 transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Signal Line (Phone)</label>
                  <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-blue-400 transition-colors" />
                    <input 
                      type="text" 
                      value={settings['contact_phone'] || ""}
                      onChange={(e) => updateSetting('contact_phone', e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-display font-bold focus:outline-none focus:border-blue-400 transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Physical Coordinates (Address)</label>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-6 w-5 h-5 text-gray-600 group-focus-within:text-blue-400 transition-colors" />
                  <textarea 
                    value={settings['contact_address'] || ""}
                    onChange={(e) => updateSetting('contact_address', e.target.value)}
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-3xl py-6 pl-14 pr-6 text-white font-body text-sm focus:outline-none focus:border-blue-400 transition-all resize-none placeholder:text-white/10 leading-relaxed"
                  />
                </div>
              </div>

              {/* Decorative blob */}
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-400/5 blur-[80px] rounded-full group-hover:bg-blue-400/10 transition-all duration-700 pointer-events-none" />
            </div>

            {/* Social Media */}
            <div className="bg-white/[0.03] border border-white/5 rounded-[50px] p-12 space-y-10 relative overflow-hidden group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#E8156D]/10 text-[#E8156D] rounded-2xl flex items-center justify-center">
                  <Camera className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-display font-black text-white uppercase tracking-tighter">Digital Resonance</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Visual Feed (Instagram)</label>
                  <div className="relative group">
                    <Camera className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-[#E8156D] transition-colors" />
                    <input 
                      type="url" 
                      value={settings['social_instagram'] || ""}
                      onChange={(e) => updateSetting('social_instagram', e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-display font-bold focus:outline-none focus:border-[#E8156D] transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Network Point (Facebook)</label>
                  <div className="relative group">
                    <Share2 className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-blue-600 transition-colors" />
                    <input 
                      type="url" 
                      value={settings['social_facebook'] || ""}
                      onChange={(e) => updateSetting('social_facebook', e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 text-white font-display font-bold focus:outline-none focus:border-blue-600 transition-all placeholder:text-white/10"
                    />
                  </div>
                </div>
              </div>

              {/* Decorative blob */}
              <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-[#E8156D]/5 blur-[80px] rounded-full group-hover:bg-[#E8156D]/10 transition-all duration-700 pointer-events-none" />
            </div>

            {/* Floating Save Button */}
            <div className="fixed bottom-12 right-12 z-[100]">
              <button 
                type="submit"
                disabled={saving}
                className="group bg-white text-black px-12 py-6 rounded-[40px] font-display font-black uppercase tracking-widest text-xs flex items-center gap-4 transition-all shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 transition-transform group-hover:scale-110" />}
                Persist Parameters
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  )
}
    </AdminLayout>
  )
}

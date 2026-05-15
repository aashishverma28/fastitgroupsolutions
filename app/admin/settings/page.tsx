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
    <AdminLayout>
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-display font-bold text-white">Settings</h1>
            <p className="text-gray-500 font-body">Global configuration for your website.</p>
          </div>
          {message && (
            <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-2 rounded-xl animate-bounce">
              <Check className="w-4 h-4" />
              <span className="text-sm font-bold uppercase tracking-widest">{message}</span>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-500">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            <p className="font-display font-medium">Loading settings...</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8 pb-24">
            {/* Contact Information */}
            <div className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-8">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                <Globe className="w-6 h-6 text-blue-400" /> Contact Info
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Business Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input 
                      type="email" 
                      value={settings['contact_email'] || ""}
                      onChange={(e) => updateSetting('contact_email', e.target.value)}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input 
                      type="text" 
                      value={settings['contact_phone'] || ""}
                      onChange={(e) => updateSetting('contact_phone', e.target.value)}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Office Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-600" />
                  <textarea 
                    value={settings['contact_address'] || ""}
                    onChange={(e) => updateSetting('contact_address', e.target.value)}
                    rows={3}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-400 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/5 border border-white/5 rounded-[40px] p-10 space-y-8">
              <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                <Camera className="w-6 h-6 text-[#E8156D]" /> Social Links
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Instagram</label>
                  <div className="relative">
                    <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input 
                      type="url" 
                      value={settings['social_instagram'] || ""}
                      onChange={(e) => updateSetting('social_instagram', e.target.value)}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#E8156D] transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Facebook</label>
                  <div className="relative">
                    <Share2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                    <input 
                      type="url" 
                      value={settings['social_facebook'] || ""}
                      onChange={(e) => updateSetting('social_facebook', e.target.value)}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Save Button */}
            <div className="fixed bottom-10 right-10 z-[100]">
              <button 
                type="submit"
                disabled={saving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 transition-all shadow-[0_20px_50px_-10px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Save All Settings
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  )
}

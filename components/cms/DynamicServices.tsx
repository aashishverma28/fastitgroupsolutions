"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Briefcase, Code, Palette, Cloud, Database, Cpu, Globe, Layout, Shield } from "lucide-react"

const IconMap: Record<string, any> = {
  Briefcase, Code, Palette, Cloud, Database, Cpu, Globe, Layout, Shield
}

interface Service {
  id: string
  title: string
  description: string
  icon: string
  image_url: string
}

export default function DynamicServices() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true })
      
      if (!error && data) setServices(data)
      setLoading(false)
    }
    fetchServices()
  }, [])

  if (loading) return null

  // Fallback to defaults if DB is empty
  const displayServices = services.length > 0 ? services : [
    { id: '1', title: 'Web & App Dev', description: 'High-performance React/Next.js platforms and cross-platform mobile applications.', icon: 'Code' },
    { id: '2', title: 'Creative Design', description: 'Immersive 3D experiences, cinematic UI/UX, and brand identities.', icon: 'Palette' },
    { id: '3', title: 'Cloud & DevOps', description: 'Scalable cloud architectures, serverless deployments, and infrastructure management.', icon: 'Cloud' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayServices.map((service, i) => {
        const Icon = IconMap[service.icon] || Briefcase
        return (
          <div 
            key={service.id} 
            className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-gray-100" 
            data-cursor="view"
          >
            <div className="w-16 h-16 rounded-full bg-[#E8156D]/10 flex items-center justify-center mb-8 text-[#E8156D] group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
            <p className="text-gray-600 font-body leading-relaxed">{service.description}</p>
          </div>
        )
      })}
    </div>
  )
}

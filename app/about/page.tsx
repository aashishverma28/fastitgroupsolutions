import { Metadata } from "next"
import { AboutHero } from "@/components/sections/about/AboutHero"
import { FounderSection } from "@/components/sections/about/FounderSection"
import { CompanyStory } from "@/components/sections/about/CompanyStory"
import { ValuesSection } from "@/components/sections/about/ValuesSection"
import { OfficeSection } from "@/components/sections/about/OfficeSection"
import { AboutTimeline } from "@/components/sections/about/AboutTimeline"
import { AboutCTA } from "@/components/sections/about/AboutCTA"
import { BlobDivider } from "@/components/ui/BlobDivider"

export const metadata: Metadata = {
  title: "About Us | Fastit Group of Solutions — Real People, Real Tech from Dergaon, Assam",
  description: "Meet Aashish Verma and the team behind Fastit Group of Solutions. We are building world-class software, web, and app experiences from Dergaon, Golaghat, Assam.",
  openGraph: {
    title: "The Human Story of Fastit Group of Solutions",
    description: "From a BTech student in Golaghat to a software group in Dergaon. Read our story.",
    images: [{ url: "/logo.png" }]
  }
}

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-hidden bg-[#FAF9F7]">
      {/* 01. HERO SECTION */}
      <AboutHero />

      {/* 02. FOUNDER SECTION */}
      <FounderSection />

      {/* DIVIDER: Transition from Founder (Light) to Company (Dark) */}
      <BlobDivider fromColor="#FAF9F7" toColor="#0F0F0F" />

      {/* 03. COMPANY STORY */}
      <CompanyStory />

      {/* DIVIDER: Transition from Company (Dark) to Values (Darker) */}
      <div className="h-[1px] w-full bg-white/5" />

      {/* 04. VALUES SECTION */}
      <ValuesSection />

      {/* DIVIDER: Transition from Values (Dark) to Offices (Light) */}
      <BlobDivider fromColor="#0A0A0A" toColor="#FAF9F7" />

      {/* 05. OFFICES SECTION */}
      <OfficeSection />

      {/* 06. TIMELINE SECTION */}
      <AboutTimeline />

      {/* 07. CTA SECTION */}
      <AboutCTA />
    </main>
  )
}

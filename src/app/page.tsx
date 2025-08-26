"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero"
import { BenefitsSection } from "@/components/sections/benefits"
import { ProcessSection } from "@/components/sections/process"
import { PricingSection } from "@/components/sections/pricing"
import { FAQSection } from "@/components/sections/faq"
import { AboutSection } from "@/components/sections/about"
import { CTASection } from "@/components/sections/cta"
import { FooterSection } from "@/components/sections/footer"
import { FloatingAvailabilityBadge } from "@/components/floating-availability-badge"
import { FAQChatWidget } from "@/components/faq-chat-widget"
import { useBookingShortcut } from "@/hooks/use-booking-shortcut"

export default function Home() {
  useBookingShortcut()
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <BenefitsSection />
        <ProcessSection />
        <PricingSection />
        <FAQSection />
        <AboutSection />
        <CTASection />
      </main>
      <FooterSection />
      <FloatingAvailabilityBadge />
      <FAQChatWidget />
    </div>
  )
}

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/sections/hero"
import { BenefitsSection } from "@/components/sections/benefits"
import { ProcessSection } from "@/components/sections/process"
import { WorkSection } from "@/components/sections/work"
import { PricingSection } from "@/components/sections/pricing"
import { FAQSection } from "@/components/sections/faq"
import { CTASection } from "@/components/sections/cta"
import { FooterSection } from "@/components/sections/footer"
import { FloatingAvailabilityBadge } from "@/components/floating-availability-badge"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <BenefitsSection />
        <ProcessSection />
        <WorkSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <FooterSection />
      <FloatingAvailabilityBadge />
    </div>
  )
}

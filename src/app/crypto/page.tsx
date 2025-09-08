import { Navigation } from "@/components/navigation"
import { CryptoHeroSection } from "@/components/sections/crypto-hero"
import { CryptoBenefitsSection } from "@/components/sections/crypto-benefits"
import { ProcessSection } from "@/components/sections/process"
import { ReviewsSection } from "@/components/sections/reviews"
import { CryptoPricingSection } from "@/components/sections/crypto-pricing"
import { FAQSection } from "@/components/sections/faq"
import { AboutSection } from "@/components/sections/about"
import { CTASection } from "@/components/sections/cta"
import { FooterSection } from "@/components/sections/footer"
import { FloatingAvailabilityBadge } from "@/components/floating-availability-badge"
import { FAQChatWidget } from "@/components/faq-chat-widget"
import { CryptoPageClient } from "@/components/crypto-page-client"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Meme Coin & Crypto Token Websites | Fast, Secure, Crypto-Friendly | Convert Labs",
  description: "Get a high-converting website for your meme coin or crypto token. Fast delivery, secure payments, crypto accepted. Built for the crypto community.",
  keywords: "meme coin website, crypto token website, cryptocurrency website design, crypto landing page, meme coin marketing, token website, crypto web design, blockchain website",
  openGraph: {
    title: "Meme Coin & Crypto Token Websites | Convert Labs",
    description: "High-converting websites for meme coins and crypto tokens. Fast delivery, secure payments, crypto accepted.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meme Coin & Crypto Token Websites | Convert Labs",
    description: "High-converting websites for meme coins and crypto tokens. Fast delivery, secure payments, crypto accepted.",
  }
}

export default function CryptoPage() {
  return (
    <CryptoPageClient>
      <div className="min-h-screen">
        <Navigation />
        <main>
          <CryptoHeroSection />
          <CryptoBenefitsSection />
          <ProcessSection />
          <ReviewsSection />
          <CryptoPricingSection />
          <FAQSection />
          <AboutSection />
          <CTASection />
        </main>
        <FooterSection />
        <FloatingAvailabilityBadge />
        <FAQChatWidget />
      </div>
    </CryptoPageClient>
  )
}

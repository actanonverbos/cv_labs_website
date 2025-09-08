"use client"

import { 
  Zap, 
  Shield, 
  Bitcoin, 
  Rocket, 
  Users, 
  TrendingUp 
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"

const cryptoBenefits = [
  {
    icon: Zap,
    title: "Lightning Fast Launch",
    description: "Get your meme coin or token website live in days, not weeks. Perfect for time-sensitive launches and market opportunities."
  },
  {
    icon: Shield,
    title: "Secure & Trustworthy",
    description: "Built with security best practices. SSL certificates, secure hosting, and clean code that builds trust with your community."
  },
  {
    icon: Bitcoin,
    title: "Crypto Payments Accepted",
    description: "Pay with Bitcoin, Ethereum, or your favorite crypto. We understand the crypto ecosystem and make payments seamless."
  },
  {
    icon: Rocket,
    title: "Meme Coin Optimized",
    description: "Designed specifically for meme coins and tokens. We know what converts in the crypto space and what your community expects."
  },
  {
    icon: Users,
    title: "Community Focused",
    description: "Built to engage your crypto community. Social integration, tokenomics display, and community-driven design elements."
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimized",
    description: "Every element designed to convert visitors into holders. Proven patterns that work in the crypto and DeFi space."
  }
]

export function CryptoBenefitsSection() {
  return (
    <section id="benefits" className="py-20 md:py-28 bg-background">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            <StaggeredText 
              className="block"
              highlightWords={["Crypto"]}
              delay={0.2}
              staggerDelay={0.08}
            >
              Why Choose Our Crypto Website Service?
            </StaggeredText>
          </h2>
          <ScrollReveal delay={0.4}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              We understand the crypto space. Fast launches, secure payments, and designs that convert your community into holders.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {cryptoBenefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <ScrollReveal key={benefit.title} delay={0.6 + (index * 0.1)}>
                <Card className="p-6 bg-card border border-[hsl(var(--border))] rounded-2xl h-full">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </Card>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

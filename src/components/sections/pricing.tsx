"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const mainTiers = [
  {
    name: "Website Design",
    badge: "Figma Design",
    price: "€3000+",
    description: "Perfect for SaaS founders who need a high-converting landing page fast",
    features: [
      { icon: "📄", text: "Single Page" },
      { icon: "🎬", text: "Motion design" },
      { icon: "🔄", text: "Unlimited revisions" },
      { icon: "🎨", text: "Personalized branding" },
      { icon: "🎯", text: "Full Figma Design" }
    ],
    cta: "Get Started",
    ctaVariant: "default" as const,
    popular: false
  },
  {
    name: "Product Design",
    price: "€200/page",
    description: "World-class product design for SaaS to go with the website",
    features: [
      { icon: "👥", text: "User-Centered Approach" },
      { icon: "🎯", text: "Pixel-Perfect Visuals" },
      { icon: "⚡", text: "Fast Turnaround" },
      { icon: "📈", text: "Conversion-Driven" },
      { icon: "🤝", text: "Collaborative Process" }
    ],
    cta: "Get Started",
    ctaVariant: "default" as const,
    popular: false
  }
]

const enterpriseTier = {
  name: "Enterprise",
  price: "Custom Quote",
  description: "A bigger brand? no problem, your big idea will need more than 1 page",
  features: [
    { icon: "⭐", text: "Priority support" },
    { icon: "🔧", text: "Custom projects" },
    { icon: "📄", text: "Multiple site pages" },
    { icon: "👥", text: "Working with your team" },
    { icon: "⚡", text: "Framer or Code build" }
  ],
  cta: "Apply now"
}

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-20 bg-muted/5">
      <div className="container-tight">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Simple & Transparent Pricing
          </h2>
        </div>

        {/* Main Tiers - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {mainTiers.map((tier) => (
            <Card 
              key={tier.name}
              className="relative p-6 bg-card border border-border rounded-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold">
                  {tier.name}
                </h3>
                {tier.badge && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs eyebrow bg-muted/50 text-muted-foreground">
                      {tier.badge}
                    </Badge>
                    <div className="flex gap-1">
                      <span className="text-sm">🎯</span>
                      <span className="text-sm">⚡</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold mb-2">
                  {tier.price}
                </div>
                <p className="text-sm text-muted-foreground leading-normal">
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <span className="text-sm">{feature.icon}</span>
                    <span className="text-sm text-foreground">{feature.text}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-2">
                <Button 
                  className="w-full px-4 py-2 text-sm font-medium bg-white text-black hover:bg-gray-100 rounded-lg border-0"
                  asChild
                >
                  <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">
                    {tier.cta}
                  </Link>
                </Button>
                
                <Button 
                  variant="ghost"
                  className="w-full px-4 py-2 text-sm font-medium bg-transparent hover:bg-white/10 rounded-lg text-muted-foreground hover:text-foreground"
                  asChild
                >
                  <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">
                    Or Book a Call
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Enterprise Tier - Full Width */}
        <Card className="p-6 bg-card border border-border rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                {enterpriseTier.name}
              </h3>
              <div className="text-3xl font-bold mb-2">
                {enterpriseTier.price}
              </div>
              <p className="text-sm text-muted-foreground mb-6 leading-normal">
                {enterpriseTier.description}
              </p>
              <Button 
                className="px-4 py-2 text-sm font-medium bg-white text-black hover:bg-gray-100 rounded-lg border-0 w-full md:w-auto"
                asChild
              >
                <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">
                  {enterpriseTier.cta}
                </Link>
              </Button>
            </div>
            
            <div>
              <ul className="space-y-2">
                {enterpriseTier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2">
                    <span className="text-sm">{feature.icon}</span>
                    <span className="text-sm text-foreground">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            All plans include a 30-day money-back guarantee. 
            <Link href="#faq" className="text-primary hover:underline ml-1">
              See our FAQ for details
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

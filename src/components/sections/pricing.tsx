"use client"

import * as React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Palette, 
  Zap, 
  Calendar, 
  Clock, 
  Edit3, 
  Users, 
  BarChart3,
  MessageCircle,
  Send,
  ArrowRight
} from "lucide-react"

const pricingTiers = [
  {
    name: "Landing Page",
    price: "$1750",
    description: "A custom-designed landing page, built in Framer with motion design and a fast, no-fuss delivery.",
    features: [
      { icon: Palette, text: "Custom Design" },
      { icon: Zap, text: "Motion Design Included" },
      { icon: Calendar, text: "Async weekly updates" },
      { icon: Clock, text: "Fast Turnaround (2 Weeks)" },
      { icon: Edit3, text: "Copywriting upon request" },
      { icon: Users, text: "Strategy Call" },
      { icon: BarChart3, text: "Built in Framer" }
    ],
    badges: ["⚡ FAST DELIVERY", "🔵 NO-CODE FRIENDLY", "🔄 ASYNC-FRIENDLY", "🎯 FRAMER"]
  },
  {
    name: "Landing Page + Copy",
    price: "$2500",
    description: "A high-impact landing page, designed to convert and fully written to match your brand voice.",
    features: [
      { icon: Palette, text: "Custom Design" },
      { icon: Zap, text: "Motion Design Included" },
      { icon: Calendar, text: "Async weekly updates" },
      { icon: Clock, text: "Fast Turnaround (2 Weeks)" },
      { icon: Edit3, text: "Copywriting upon request" },
      { icon: Users, text: "Strategy Call" },
      { icon: BarChart3, text: "Built in Framer" }
    ],
    badges: ["⚡ FAST DELIVERY", "🔵 NO-CODE FRIENDLY", "🔄 ASYNC-FRIENDLY", "🎯 FRAMER"]
  }
]

export function PricingSection() {
  const [badgeRef, setBadgeRef] = React.useState<HTMLElement | null>(null)
  
  React.useEffect(() => {
    // Set up mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          
          if (badgeRef) {
            badgeRef.style.setProperty('--badge-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
            badgeRef.style.setProperty('--badge-text', isDark ? '#ffffff' : '#020817')
            badgeRef.style.setProperty('--badge-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
            badgeRef.style.setProperty('--dot-color', isDark ? '#ffffff' : '#020817')
          }
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [badgeRef])

  return (
    <section id="pricing" className="py-16 md:py-20 bg-background">
      <div className="container-tight">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Badge 
              variant="secondary" 
              className="rounded-md px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-200 eyebrow inline-flex items-center gap-2"
              style={{
                backgroundColor: 'var(--badge-bg, rgba(0, 0, 0, 0.1))',
                color: 'var(--badge-text, #020817)',
                borderColor: 'var(--badge-border, rgba(0, 0, 0, 0.2))',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
              ref={(el) => {
                if (el) {
                  setBadgeRef(el)
                  
                  // Set initial colors
                  const isDark = document.documentElement.classList.contains('dark')
                  el.style.setProperty('--badge-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
                  el.style.setProperty('--badge-text', isDark ? '#ffffff' : '#020817')
                  el.style.setProperty('--badge-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
                  el.style.setProperty('--dot-color', isDark ? '#ffffff' : '#020817')
                }
              }}
            >
              <div className="relative flex items-center justify-center">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: 'var(--dot-color, #020817)' }}
                ></div>
              </div>
              PRICING & PACKAGES
            </Badge>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Transparent Pricing. No Surprises
          </h2>
        </div>

        {/* Top badges row */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Badge variant="secondary" className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-md">
            ⚡ FRIENDLY
          </Badge>
          <Badge variant="secondary" className="text-xs px-3 py-1 bg-blue-600 text-white rounded-md">
            🔵 ASYNC-FRIENDLY
          </Badge>
          <Badge variant="secondary" className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-md">
            🎯 FRAMER EXPERT
          </Badge>
          <Badge variant="secondary" className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-md">
            💰 FLAT PRICING
          </Badge>
          <Badge variant="secondary" className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-md">
            👤 USD
          </Badge>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.name}
              className="relative p-6 bg-card border border-border rounded-2xl"
            >
              {/* Title and Price */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">
                  {tier.name}
                </h3>
                <div className="text-3xl font-bold mb-2">
                  {tier.price}
                </div>
                <p className="text-sm text-muted-foreground leading-normal">
                  {tier.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, featureIndex) => {
                  const IconComponent = feature.icon
                  return (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                        <IconComponent className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-foreground">{feature.text}</span>
                    </li>
                  )
                })}
              </ul>
            </Card>
          ))}
        </div>

        {/* Questions Section as Card */}
        <Card className="p-8 bg-card border border-border rounded-2xl text-center">
          <h3 className="text-xl font-semibold mb-4">
            Have questions or need help choosing?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Want to move forward or have a few questions first? We're just one click away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2 justify-center"
              asChild
            >
              <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">
                Book a call
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            
            <Button 
              variant="outline"
              className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 justify-center"
              asChild
            >
              <Link href="#" target="_blank" rel="noopener noreferrer">
                Telegram
                <Send className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ticker } from "@/components/ticker"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"
import { 
  Palette, 
  Zap, 
  Calendar, 
  Clock, 
  Edit3, 
  Users, 
  BarChart3,
  Send,
  ArrowRight
} from "lucide-react"

// Extend HTMLElement to include cleanup function
interface HTMLElementWithCleanup extends HTMLElement {
  _cleanup?: () => void
}

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
  const [bookButtonRef, setBookButtonRef] = React.useState<HTMLElementWithCleanup | null>(null)
  const [telegramButtonRef, setTelegramButtonRef] = React.useState<HTMLElementWithCleanup | null>(null)
  
  React.useEffect(() => {
    // Set up mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          
          // Update button colors when theme changes
          if (bookButtonRef) {
            bookButtonRef.style.setProperty('--button-bg', isDark ? '#ffffff' : '#000000')
            bookButtonRef.style.setProperty('--button-text', isDark ? '#000000' : '#ffffff')
          }
          
          if (telegramButtonRef) {
            telegramButtonRef.style.setProperty('--button-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
            telegramButtonRef.style.setProperty('--button-text', isDark ? '#ffffff' : '#020817')
            telegramButtonRef.style.setProperty('--button-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
          }
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => {
      observer.disconnect()
      // Cleanup event listeners when component unmounts
      if (bookButtonRef && bookButtonRef._cleanup) {
        bookButtonRef._cleanup()
      }
      if (telegramButtonRef && telegramButtonRef._cleanup) {
        telegramButtonRef._cleanup()
      }
    }
  }, [bookButtonRef, telegramButtonRef])

  return (
    <section id="pricing" className="py-16 md:py-20 bg-background">
      <div className="container-tight">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            <StaggeredText 
              highlightWords={["Surprises"]}
              delay={0.2}
              staggerDelay={0.2}
            >
              Transparent Pricing. No Surprises
            </StaggeredText>
          </h2>
          <ScrollReveal delay={1.0}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Clear, upfront pricing with no hidden fees. Choose the package that fits your needs and budget.
            </p>
          </ScrollReveal>
        </div>

        {/* Ticker */}
        <ScrollReveal delay={0.1}>
          <div className="mb-8">
            <Ticker />
          </div>
        </ScrollReveal>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {pricingTiers.map((tier, index) => (
            <ScrollReveal key={tier.name} delay={0.2 + (index * 0.1)}>
              <Card 
                className="relative p-6 bg-card border border-border rounded-2xl"
              >
              {/* Title and Price */}
              <div className="mb-4">
                <h3 className="text-xl font-medium mb-2">
                  {tier.name}
                </h3>
                <div className="text-3xl font-bold mb-3">
                  {tier.price}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => {
                  const IconComponent = feature.icon
                  return (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-foreground flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature.text}</span>
                    </li>
                  )
                })}
              </ul>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Questions Section as Card */}
        <ScrollReveal delay={0.4}>
          <Card className="p-6 bg-card border border-border rounded-2xl text-center">
          <h3 className="text-lg font-medium mb-2">
            Have questions or need help choosing?
          </h3>
          <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
            Want to move forward or have a few questions first? We&apos;re just one click away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="ghost"
              className="px-6 py-3 text-base font-medium rounded-lg border-0 transition-all duration-200 hover:opacity-90"
              asChild
              style={{
                backgroundColor: 'var(--button-bg, #000000)',
                color: 'var(--button-text, #ffffff)',
              }}
              ref={(el) => {
                if (el) {
                  const elementWithCleanup = el as HTMLElementWithCleanup
                  setBookButtonRef(elementWithCleanup)
                  
                  // Set CSS custom properties based on theme
                  const isDark = document.documentElement.classList.contains('dark')
                  el.style.setProperty('--button-bg', isDark ? '#ffffff' : '#000000')
                  el.style.setProperty('--button-text', isDark ? '#000000' : '#ffffff')
                  
                  // Add hover event listeners for better contrast
                  const handleMouseEnter = () => {
                    const isDark = document.documentElement.classList.contains('dark')
                    el.style.backgroundColor = isDark ? '#f3f4f6' : '#1f2937'
                  }
                  
                  const handleMouseLeave = () => {
                    const isDark = document.documentElement.classList.contains('dark')
                    el.style.backgroundColor = isDark ? '#ffffff' : '#000000'
                  }
                  
                  el.addEventListener('mouseenter', handleMouseEnter)
                  el.addEventListener('mouseleave', handleMouseLeave)
                  
                  // Store cleanup function
                  elementWithCleanup._cleanup = () => {
                    el.removeEventListener('mouseenter', handleMouseEnter)
                    el.removeEventListener('mouseleave', handleMouseLeave)
                  }
                }
              }}
            >
              <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">
                Book an Intro Call
              </Link>
            </Button>
            
            <Button 
              variant="ghost"
              className="px-6 py-3 text-base font-medium rounded-lg backdrop-blur-sm transition-all duration-200"
              asChild
              style={{
                backgroundColor: 'var(--button-bg, rgba(0, 0, 0, 0.1))',
                color: 'var(--button-text, #020817)',
                borderColor: 'var(--button-border, rgba(0, 0, 0, 0.2))',
                borderWidth: '1px',
                borderStyle: 'solid'
              }}
              ref={(el) => {
                if (el) {
                  const elementWithCleanup = el as HTMLElementWithCleanup
                  setTelegramButtonRef(elementWithCleanup)
                  
                  // Set initial colors
                  const isDark = document.documentElement.classList.contains('dark')
                  el.style.setProperty('--button-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
                  el.style.setProperty('--button-text', isDark ? '#ffffff' : '#020817')
                  el.style.setProperty('--button-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
                  
                  // Add hover event listeners for better contrast
                  const handleMouseEnter = () => {
                    const isDark = document.documentElement.classList.contains('dark')
                    el.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
                    el.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'
                  }
                  
                  const handleMouseLeave = () => {
                    const isDark = document.documentElement.classList.contains('dark')
                    el.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                    el.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
                  }
                  
                  el.addEventListener('mouseenter', handleMouseEnter)
                  el.addEventListener('mouseleave', handleMouseLeave)
                  
                  // Store cleanup function
                  elementWithCleanup._cleanup = () => {
                    el.removeEventListener('mouseenter', handleMouseEnter)
                    el.removeEventListener('mouseleave', handleMouseLeave)
                  }
                }
              }}
            >
              <Link href="/#work">
                View Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  Palette, 
  Zap, 
  Calendar, 
  Clock, 
  Edit3, 
  Users, 
  BarChart3,
  Send,
  ArrowRight,
  Star,
  Code
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
  const [tier1ButtonRef, setTier1ButtonRef] = React.useState<HTMLElementWithCleanup | null>(null)
  const [tier2ButtonRef, setTier2ButtonRef] = React.useState<HTMLElementWithCleanup | null>(null)
  
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
          
          if (tier1ButtonRef) {
            tier1ButtonRef.style.setProperty('--button-bg', isDark ? '#ffffff' : '#000000')
            tier1ButtonRef.style.setProperty('--button-text', isDark ? '#000000' : '#ffffff')
          }
          
          if (tier2ButtonRef) {
            tier2ButtonRef.style.setProperty('--button-bg', isDark ? '#ffffff' : '#000000')
            tier2ButtonRef.style.setProperty('--button-text', isDark ? '#000000' : '#ffffff')
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
      if (tier1ButtonRef && tier1ButtonRef._cleanup) {
        tier1ButtonRef._cleanup()
      }
      if (tier2ButtonRef && tier2ButtonRef._cleanup) {
        tier2ButtonRef._cleanup()
      }
    }
  }, [bookButtonRef, telegramButtonRef, tier1ButtonRef, tier2ButtonRef])

  return (
    <section id="pricing" className="py-16 md:py-20 bg-background">
      <div className="container-tight">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            <StaggeredText 
              highlightWords={["Surprises"]}
              delay={0.2}
              staggerDelay={0.1}
            >
              Transparent Pricing. No Surprises
            </StaggeredText>
          </h2>
          <ScrollReveal delay={0.4}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Clear, upfront pricing with no hidden fees. Choose the package that fits your needs and budget.
            </p>
          </ScrollReveal>
        </div>



        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {pricingTiers.map((tier, index) => (
            <ScrollReveal key={tier.name} delay={0.6 + (index * 0.1)}>
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

              {/* CTA Button */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost"
                    className="w-full px-6 py-3 text-base font-medium rounded-lg border-0 transition-all duration-200 hover:opacity-90"
                    asChild
                    style={{
                      backgroundColor: 'var(--button-bg, #000000)',
                      color: 'var(--button-text, #ffffff)',
                    }}
                    ref={(el) => {
                      if (el) {
                        const elementWithCleanup = el as HTMLElementWithCleanup
                        if (index === 0) {
                          setTier1ButtonRef(elementWithCleanup)
                        } else {
                          setTier2ButtonRef(elementWithCleanup)
                        }
                        
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
                      Book a Call
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="flex items-center gap-2">
                    <span>Press</span>
                    <kbd className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-muted border border-border rounded">
                      B
                    </kbd>
                    <span>to book</span>
                  </div>
                </TooltipContent>
              </Tooltip>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        {/* Custom Quote Section as Card */}
        <ScrollReveal delay={0.8}>
          <Card className="p-6 bg-card border border-border rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left side - Content */}
              <div>
                <h3 className="text-2xl font-medium mb-3">
                  Custom Solution
                </h3>
                <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                  Need something unique? Let's build a tailored solution that perfectly fits your business needs and goals.
                </p>
                
                <Button 
                  variant="ghost"
                  className="px-6 py-3 text-base font-medium rounded-lg border-0 transition-all duration-200 hover:opacity-90 w-full md:w-auto"
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
                    Apply now
                  </Link>
                </Button>
              </div>

              {/* Right side - Features */}
              <div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">Priority support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">Custom projects</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">Multiple site pages</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">Working with your team</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Code className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">Custom Web app</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BarChart3 className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">Framer or Code build</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  )
}

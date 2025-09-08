"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
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
  Star,
  Code,
  Bitcoin,
  Shield
} from "lucide-react"

// Extend HTMLElement to include cleanup function
interface HTMLElementWithCleanup extends HTMLElement {
  _cleanup?: () => void
}

const cryptoPricingTiers = [
  {
    name: "Meme Coin Landing Page",
    price: "$1750",
    cryptoPrice: "~0.025 BTC",
    description: "A custom-designed landing page for your meme coin or token, built fast with crypto-friendly features.",
    features: [
      { icon: Palette, text: "Custom Crypto Design" },
      { icon: Zap, text: "Motion Design Included" },
      { icon: Calendar, text: "Async weekly updates" },
      { icon: Clock, text: "Fast Turnaround (2 Weeks)" },
      { icon: Edit3, text: "Tokenomics Display" },
      { icon: Users, text: "Community Integration" },
      { icon: Bitcoin, text: "Crypto Payment Ready" }
    ],
    badges: ["⚡ FAST DELIVERY", "₿ CRYPTO ACCEPTED", "🚀 MEME OPTIMIZED", "🔒 SECURE"]
  },
  {
    name: "Full Token Website + Copy",
    price: "$2500",
    cryptoPrice: "~0.036 BTC",
    description: "Complete website with professional copywriting, tokenomics, roadmap, and everything your token needs.",
    features: [
      { icon: Palette, text: "Custom Crypto Design" },
      { icon: Zap, text: "Motion Design Included" },
      { icon: Calendar, text: "Async weekly updates" },
      { icon: Clock, text: "Fast Turnaround (2 Weeks)" },
      { icon: Edit3, text: "Professional Copywriting" },
      { icon: Users, text: "Community Strategy" },
      { icon: BarChart3, text: "Tokenomics & Roadmap" }
    ],
    badges: ["⚡ FAST DELIVERY", "₿ CRYPTO ACCEPTED", "📝 COPY INCLUDED", "🔒 SECURE"]
  }
]

export function CryptoPricingSection() {
  const [bookButtonRef, setBookButtonRef] = React.useState<HTMLElementWithCleanup | null>(null)
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
      if (tier1ButtonRef && tier1ButtonRef._cleanup) {
        tier1ButtonRef._cleanup()
      }
      if (tier2ButtonRef && tier2ButtonRef._cleanup) {
        tier2ButtonRef._cleanup()
      }
    }
  }, [bookButtonRef, tier1ButtonRef, tier2ButtonRef])

  return (
    <section id="pricing" className="py-16 md:py-20 bg-background">
      <div className="container-tight">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            <StaggeredText 
              className="block"
              highlightWords={["Crypto"]}
              delay={0.2}
              staggerDelay={0.08}
            >
              Transparent Crypto-Friendly Pricing
            </StaggeredText>
          </h2>
          <ScrollReveal delay={0.4}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance mb-8">
              Pay with Crypto. Clear, upfront pricing with no hidden fees. Built for the web3 community.
            </p>
          </ScrollReveal>

          {/* Payment Methods */}
          <ScrollReveal delay={0.5}>
            <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
              <span className="text-sm text-muted-foreground">Crypto payments accepted:</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-2 py-1 bg-orange-500/10 border border-orange-500/20 rounded-md">
                  <Image src="/crypto/Bitcoin.png" alt="Bitcoin" width={12} height={12} className="rounded-full" />
                  <span className="text-xs font-medium text-orange-500">BTC</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-600/10 border border-blue-600/20 rounded-md">
                  <Image src="/crypto/usdc.png" alt="USDC" width={12} height={12} className="rounded-full" />
                  <span className="text-xs font-medium text-blue-600">USDC</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md">
                  <Image src="/crypto/Base_square_blue.svg" alt="Base" width={12} height={12} className="rounded-sm" />
                  <span className="text-xs font-medium text-blue-500">BASE</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-500/10 border border-purple-500/20 rounded-md">
                  <Image src="/crypto/Solana_logo.png" alt="Solana" width={12} height={12} className="rounded-full" />
                  <span className="text-xs font-medium text-purple-500">SOL</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {cryptoPricingTiers.map((tier, index) => (
            <ScrollReveal key={tier.name} delay={0.6 + (index * 0.1)}>
              <Card 
                className="relative p-6 bg-card border border-border rounded-2xl"
              >
              {/* Title and Price */}
              <div className="mb-4">
                <h3 className="text-xl font-medium mb-2">
                  {tier.name}
                </h3>
                <div className="mb-3">
                  <div className="text-3xl font-bold">
                    {tier.price}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Bitcoin className="h-3 w-3" />
                    <span>{tier.cryptoPrice}</span>
                  </div>
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
                    <Link href="https://t.me/collect_0x" target="_blank" rel="noopener noreferrer">
                      Get Started
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="flex items-center gap-2">
                    <span>Press</span>
                    <kbd className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-muted border border-border rounded">
                      B
                    </kbd>
                    <span>to contact</span>
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
                  Custom Crypto Solution
                </h3>
                <p className="text-muted-foreground text-base mb-6 leading-relaxed">
                  Need a full DeFi platform, NFT marketplace, or complex tokenomics? Let&apos;s build something unique for your crypto project.
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
                  <Link href="https://t.me/collect_0x" target="_blank" rel="noopener noreferrer">
                    Apply now
                  </Link>
                </Button>
              </div>

              {/* Right side - Features */}
              <div>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Star className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">Priority crypto support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Zap className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">DeFi integrations</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">Multi-page crypto sites</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">Community features</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Code className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">Smart contract integration</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-foreground flex-shrink-0" />
                    <span className="text-sm text-foreground">Security audited</span>
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

"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Zap, Shield, Bitcoin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// Extend HTMLElement to include cleanup function
interface HTMLElementWithCleanup extends HTMLElement {
  _cleanup?: () => void
}

// Crypto/meme coin focused portfolio images
const cryptoPortfolioImages = [
  "Mockup - Miggles Meme generator.png",
  "Mockup - Vibes.codes 3.png",
  "Mockup - Vibes.codes.png",
  "Mockup - Sakatomo Studio 1.png",
  "Mockup - Sakatomo Studio 2.png",
  "Mockup - Sakatomo Studio 3.png",
  "Lina Mockup - 1.png",
  "Lina Mockup - 2.png",
  "Lina Mockup - 3.png",
  "Mockup - Newsletter 2 Sign up template.png",
  "Mockup - Newsletter Sign up template.png",
  "Mockup - Modern Newsletter Sign up.png"
]

export function CryptoHeroSection() {
  const [bookButtonRef, setBookButtonRef] = React.useState<HTMLElementWithCleanup | null>(null)
  const [viewButtonRef, setViewButtonRef] = React.useState<HTMLElementWithCleanup | null>(null)

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
            bookButtonRef.style.backgroundColor = isDark ? '#ffffff' : '#000000'
          }
          
          if (viewButtonRef) {
            viewButtonRef.style.setProperty('--button-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
            viewButtonRef.style.setProperty('--button-text', isDark ? '#ffffff' : '#020817')
            viewButtonRef.style.setProperty('--button-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
            viewButtonRef.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            viewButtonRef.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
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
      if (bookButtonRef && bookButtonRef._cleanup) {
        bookButtonRef._cleanup()
      }
      if (viewButtonRef && viewButtonRef._cleanup) {
        viewButtonRef._cleanup()
      }
    }
  }, [bookButtonRef, viewButtonRef])

  return (
    <section id="hero" className="pt-16 md:pt-24 pb-8 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Social Proof */}
          <ScrollReveal delay={0.1}>
            <div className="flex items-center justify-center gap-4 mb-8">
              {/* Avatar Row */}
              <div className="flex items-center -space-x-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-background cursor-pointer group">
                  <Image
                    src="/reviews/Degen.jpg"
                    alt="Degen review"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="48px"
                  />
                </div>
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-background cursor-pointer group">
                  <Image
                    src="/reviews/0xForce.jpg"
                    alt="0xForce review"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="48px"
                  />
                </div>
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 border-2 border-background cursor-pointer group">
                  <Image
                    src="/reviews/Younes On Sol.jpg"
                    alt="Younes On Sol review"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="48px"
                  />
                </div>
              </div>
              
              {/* Stars and Text */}
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-4 w-4 fill-white text-white animate-in fade-in slide-in-from-bottom-2 duration-500" 
                      style={{
                        animationDelay: `${300 + (i * 100)}ms`,
                        animationFillMode: 'both'
                      }}
                    />
                  ))}
                  <span 
                    className="ml-2 text-sm text-muted-foreground font-medium animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{
                      animationDelay: '800ms',
                      animationFillMode: 'both'
                    }}
                  >
                    5/5
                  </span>
                </div>
                <p 
                  className="text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{
                    animationDelay: '900ms',
                    animationFillMode: 'both'
                  }}
                >
                  5/5 From Crypto Founders
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Crypto badges */}
          <ScrollReveal delay={0.15}>
            <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                <Zap className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">Fast Launch</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full">
                <Shield className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-500">Secure</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full">
                <Image src="/crypto/usdc.png" alt="USDC" width={16} height={16} className="rounded-full" />
                <span className="text-sm font-medium text-blue-500">Crypto Payment</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Main headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 text-balance leading-tight tracking-tight">
            <StaggeredText 
              className="block"
              highlightWords={["Meme", "Coins"]}
              delay={0.2}
              staggerDelay={0.08}
            >
              High-Converting Websites for Meme Coins & Crypto Tokens
            </StaggeredText>
          </h1>

          {/* Subheadline */}
          <ScrollReveal delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed font-normal">
              Launch your meme coin or crypto token with a website that converts. 
              Fast delivery, crypto payments accepted. Built for the web3 community.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <Tooltip>
                <TooltipTrigger asChild>
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
                        
                        const isDark = document.documentElement.classList.contains('dark')
                        el.style.setProperty('--button-bg', isDark ? '#ffffff' : '#000000')
                        el.style.setProperty('--button-text', isDark ? '#000000' : '#ffffff')
                        
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
                        
                        elementWithCleanup._cleanup = () => {
                          el.removeEventListener('mouseenter', handleMouseEnter)
                          el.removeEventListener('mouseleave', handleMouseLeave)
                        }
                      }
                    }}
                  >
                    <Link href="https://t.me/collect_0x" target="_blank" rel="noopener noreferrer">
                      Get Your Crypto Site
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="flex items-center gap-2">
                    <span>Press</span>
                    <kbd className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-muted border border-border rounded">
                      B
                    </kbd>
                    <span>to contact</span>
                  </div>
                </TooltipContent>
              </Tooltip>
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
                    setViewButtonRef(elementWithCleanup)
                    
                    const isDark = document.documentElement.classList.contains('dark')
                    el.style.setProperty('--button-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
                    el.style.setProperty('--button-text', isDark ? '#ffffff' : '#020817')
                    el.style.setProperty('--button-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
                    
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
                    
                    elementWithCleanup._cleanup = () => {
                      el.removeEventListener('mouseenter', handleMouseEnter)
                      el.removeEventListener('mouseleave', handleMouseLeave)
                    }
                  }
                }}
              >
                <Link href="#pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Urgency text */}
          <ScrollReveal delay={0.45}>
            <div className="flex justify-center items-center gap-2 mb-16">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="absolute w-2 h-2 rounded-full bg-green-500 animate-radar-ping"></div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Limited crypto slots available this month
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
      
      {/* Portfolio Images - Single Column */}
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-6 mt-8">
          {cryptoPortfolioImages.map((imageName, index) => (
            <ScrollReveal key={imageName} delay={0.05 * index} y={20}>
              <div className="rounded-xl overflow-hidden bg-muted/50 shadow-lg relative aspect-[4/3]">
                <Image
                  src={`/portfolio/${imageName}`}
                  alt={`Crypto project ${index + 1}`}
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

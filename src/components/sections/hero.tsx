"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"
import * as Avatar from "@radix-ui/react-avatar"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

// Extend HTMLElement to include cleanup function
interface HTMLElementWithCleanup extends HTMLElement {
  _cleanup?: () => void
}


// Portfolio images from the public/portfolio directory - only PNG files that exist
const portfolioImages = [
  "Lina Mockup - 1.png",
  "Lina Mockup - 2.png",
  "Lina Mockup - 3.png",
  "Lina Mockup - 4.png",
  "Lina Mockup - 5.png",
  "Lina Mockup - 6.png",
  "Mockup - Miggles Meme generator.png",
  "Mockup - Newsletter Sign up template.png",
  "Mockup - Modern Newsletter Sign up.png",
  "Mockup - Sakatomo Studio 1.png",
  "Mockup - Sakatomo Studio 2.png",
  "Mockup - Sakatomo Studio 3.png"
]



export function HeroSection() {
  const [bookButtonRef, setBookButtonRef] = React.useState<HTMLElementWithCleanup | null>(null)
  const [viewButtonRef, setViewButtonRef] = React.useState<HTMLElementWithCleanup | null>(null)


  const [badgeRef, setBadgeRef] = React.useState<HTMLElement | null>(null)
  
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
            // Reset background color to default when theme changes
            bookButtonRef.style.backgroundColor = isDark ? '#ffffff' : '#000000'
          }
          
          if (viewButtonRef) {
            viewButtonRef.style.setProperty('--button-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
            viewButtonRef.style.setProperty('--button-text', isDark ? '#ffffff' : '#020817')
            viewButtonRef.style.setProperty('--button-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
            // Reset background color and border to default when theme changes
            viewButtonRef.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
            viewButtonRef.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'
          }
          
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
    
    return () => {
      observer.disconnect()
      // Cleanup event listeners when component unmounts
      if (bookButtonRef && bookButtonRef._cleanup) {
        bookButtonRef._cleanup()
      }
      if (viewButtonRef && viewButtonRef._cleanup) {
        viewButtonRef._cleanup()
      }
    }
  }, [bookButtonRef, viewButtonRef, badgeRef])

  return (
    <section id="hero" className="pt-16 md:pt-24 pb-8 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Social Proof */}
          <ScrollReveal delay={0.1}>
            <div className="flex items-center justify-center gap-4 mb-8">
              {/* Avatar Row */}
              <div className="flex items-center -space-x-4">
                <Avatar.Root className="inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full bg-slate-100 align-middle border-2 border-background">
                  <Avatar.Fallback className="text-slate-700 leading-1 flex h-full w-full items-center justify-center bg-white text-[16px] font-semibold">
                    A
                  </Avatar.Fallback>
                </Avatar.Root>
                <Avatar.Root className="inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full bg-slate-100 align-middle border-2 border-background">
                  <Avatar.Fallback className="text-slate-700 leading-1 flex h-full w-full items-center justify-center bg-white text-[16px] font-semibold">
                    B
                  </Avatar.Fallback>
                </Avatar.Root>
                <Avatar.Root className="inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full bg-slate-100 align-middle border-2 border-background">
                  <Avatar.Fallback className="text-slate-700 leading-1 flex h-full w-full items-center justify-center bg-white text-[16px] font-semibold">
                    C
                  </Avatar.Fallback>
                </Avatar.Root>
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
                  5/5 From 20+ Founders
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Main headline */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 text-balance leading-tight tracking-tight">
            <StaggeredText 
              highlightWords={["Drive", "Results"]}
              delay={0.2}
              staggerDelay={0.2}
            >
              High-Converting Landing Pages That Drive Results
            </StaggeredText>
          </h1>

          {/* Subheadline */}
          <ScrollReveal delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed font-normal">
              Get a conversion-optimized landing page that turns visitors into customers. 
              Fast launches, revenue-first UX, and performance-focused design.
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
                </TooltipTrigger>
                <TooltipContent side="top">
                  <div className="flex items-center gap-2">
                    <span>Press</span>
                    <kbd className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-muted border border-border rounded">
                      B
                    </kbd>
                    <span>to book</span>
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
          </ScrollReveal>

          {/* Urgency text */}
          <ScrollReveal delay={0.45}>
            <div className="flex justify-center items-center gap-2 mb-16">
              <div className="relative flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <div className="absolute w-2 h-2 rounded-full bg-green-500 animate-radar-ping"></div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Limited slots available this month
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
      
      {/* Portfolio Images - Single Column */}
      <ScrollReveal delay={0.6}>
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6 mt-8">
            {portfolioImages.map((imageName, index) => (
              <div
                key={imageName}
                className="rounded-xl overflow-hidden bg-muted/50 shadow-lg"
              >
                <img
                  src={`/portfolio/${imageName}`}
                  alt={`Portfolio project ${index + 1}`}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}


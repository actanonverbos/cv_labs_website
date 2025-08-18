"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"

export function HeroSection() {
  const [bookButtonRef, setBookButtonRef] = React.useState<HTMLElement | null>(null)
  const [viewButtonRef, setViewButtonRef] = React.useState<HTMLElement | null>(null)
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
          }
          
          if (viewButtonRef) {
            viewButtonRef.style.setProperty('--button-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
            viewButtonRef.style.setProperty('--button-text', isDark ? '#ffffff' : '#020817')
            viewButtonRef.style.setProperty('--button-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
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
    
    return () => observer.disconnect()
  }, [bookButtonRef, viewButtonRef, badgeRef])

  return (
    <section id="top" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow pill */}
          <ScrollReveal delay={0.1}>
            <div className="flex justify-center mb-6">
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
                  <div 
                    className="absolute w-2 h-2 rounded-full animate-radar-ping"
                    style={{ backgroundColor: 'var(--dot-color, #020817)' }}
                  ></div>
                </div>
                Limited slots available this month
              </Badge>
            </div>
          </ScrollReveal>

          {/* Main headline */}
          <ScrollReveal delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight tracking-tight">
              High-Converting Landing Pages That{" "}
              <span className="text-primary">Drive Results</span>
            </h1>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal delay={0.3}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed font-medium">
              Get a conversion-optimized landing page that turns visitors into customers. 
              Fast launches, revenue-first UX, and performance-focused design.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                variant="ghost"
                className="px-6 py-3 text-base font-medium rounded-lg border-0"
                asChild
                style={{
                  backgroundColor: 'var(--button-bg, #000000)',
                  color: 'var(--button-text, #ffffff)',
                }}
                ref={(el) => {
                  if (el) {
                    setBookButtonRef(el)
                    
                    // Set CSS custom properties based on theme
                    const isDark = document.documentElement.classList.contains('dark')
                    el.style.setProperty('--button-bg', isDark ? '#ffffff' : '#000000')
                    el.style.setProperty('--button-text', isDark ? '#000000' : '#ffffff')
                  }
                }}
              >
                <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">
                  Book an Intro Call
                </Link>
              </Button>
              <Button 
                variant="ghost"
                className="px-6 py-3 text-base font-medium rounded-lg backdrop-blur-sm"
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
                    setViewButtonRef(el)
                    
                    // Set initial colors
                    const isDark = document.documentElement.classList.contains('dark')
                    el.style.setProperty('--button-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
                    el.style.setProperty('--button-text', isDark ? '#ffffff' : '#020817')
                    el.style.setProperty('--button-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
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

          {/* Preview Screenshot */}
          <ScrollReveal delay={0.5}>
            <div className="relative max-w-5xl mx-auto">
              <Card className="p-2 bg-card/50 backdrop-blur border border-border shadow-2xl rounded-3xl overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background rounded-2xl overflow-hidden">
                {/* Placeholder for screenshot - will be replaced with actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xl">CV</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-primary/20 rounded-full max-w-xs mx-auto"></div>
                      <div className="h-3 bg-primary/10 rounded-full max-w-sm mx-auto"></div>
                      <div className="h-3 bg-primary/10 rounded-full max-w-md mx-auto"></div>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <div className="h-8 w-20 bg-primary/30 rounded-full"></div>
                      <div className="h-8 w-24 bg-primary/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"></div>
                </div>
                </Card>
              
              {/* Background glow */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl"></div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

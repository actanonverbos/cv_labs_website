"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"

// Extend HTMLElement to include cleanup function
interface HTMLElementWithCleanup extends HTMLElement {
  _cleanup?: () => void
}

export function CTASection() {
  const [bookButtonRef, setBookButtonRef] = React.useState<HTMLElementWithCleanup | null>(null)
  
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
    }
  }, [bookButtonRef])

  return (
    <section id="cta" className="pt-8 md:pt-12 pb-8 bg-background">
      <div className="container">
        <Card className="py-16 md:py-20 text-center bg-card border border-border rounded-2xl">
          <div className="max-w-2xl mx-auto px-8">
            <h2 className="text-3xl md:text-4xl font-medium mb-4 text-balance leading-tight tracking-tight">
              <StaggeredText 
                highlightWords={["Ready"]}
                delay={0.2}
                staggerDelay={0.2}
              >
                Ready to get started?
              </StaggeredText>
            </h2>
            
            <ScrollReveal delay={0.3}>
              <p className="text-muted-foreground mb-8 text-balance leading-relaxed">
                Let&apos;s build your high-converting landing page together.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <Button 
                variant="ghost"
                className="px-8 py-3 text-base font-medium rounded-lg border-0 transition-all duration-200 hover:opacity-90 mb-4"
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
            </ScrollReveal>

            <ScrollReveal delay={0.45}>
              <div className="flex justify-center items-center gap-2">
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
        </Card>
      </div>
    </section>
  )
}

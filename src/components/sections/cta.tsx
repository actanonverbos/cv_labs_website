"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

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
    <section id="cta" className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container-tight">
        <Card className="mx-auto p-8 md:p-12 text-center bg-card border border-border rounded-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 text-balance">
            Ready to Build Your High-Converting Landing Page?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed">
            Join hundreds of successful businesses who&apos;ve transformed their online presence with our conversion-focused approach.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
            
            <div className="text-sm text-muted-foreground">
              <span className="block sm:inline">Free 30-minute consultation</span>
              <span className="hidden sm:inline mx-2">•</span>
              <span className="block sm:inline">No commitment required</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">2-3 weeks</div>
                <div className="text-sm text-muted-foreground">Average delivery</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">300%+</div>
                <div className="text-sm text-muted-foreground">Average conversion lift</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">30 days</div>
                <div className="text-sm text-muted-foreground">Money-back guarantee</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

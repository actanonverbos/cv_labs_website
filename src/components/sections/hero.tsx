"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Carousel } from "@/components/ui/carousel"

// Portfolio images from the public/portfolio directory
const portfolioImages = [
  "1.avif",
  "4.avif", 
  "chat with ai miggles.avif",
  "Electra hero.png",
  "electra website.avif",
  "gold market pro live analysis cards.png",
  "land rover concept.avif",
  "lina link in bio.avif",
  "miggles meme generator.avif",
  "newsletter.png",
  "newsletter.webp",
  "ski mask dog.avif",
  "T9FMGI2dngpBtJQH5Xeiqx7x8ZQ.avif",
  "vibes codes.avif",
  "waitpro.avif"
]

// Generate portfolio items from images
const portfolioItems = portfolioImages.map((imageName, index) => {
  // Clean up the image name to create a title
  const title = imageName
    .replace(/\.(avif|png|webp|jpg|jpeg)$/i, '') // Remove extension
    .split(/[\s\-_]+/) // Split on spaces, hyphens, underscores
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Title case
    .join(' ')
    .replace(/^\d+\s*/, '') // Remove leading numbers
    .trim()

  // Generate some variety in stats and descriptions
  const stats = ["+340% conversions", "+220% sign-ups", "+180% sales", "+290% leads", "+410% enrollments", "+260% registrations", "+320% orders", "+250% listings", "+380% users", "+290% bookings", "+150% engagement", "+200% retention"]
  const descriptions = [
    "Modern web application with conversion-focused design",
    "User-friendly interface optimizing customer experience", 
    "Responsive platform built for maximum engagement",
    "Professional landing page driving business results",
    "Interactive web solution with seamless user flow",
    "Custom-designed platform for optimal performance",
    "Conversion-optimized design with modern aesthetics",
    "Strategic web presence boosting brand visibility",
    "Intuitive interface designed for user satisfaction",
    "Performance-driven website maximizing conversions"
  ]

  return {
    id: (index + 1).toString(),
    title: title || `Portfolio Project ${index + 1}`,
    description: descriptions[index % descriptions.length],
    image: `/portfolio/${imageName}`,
    stat: stats[index % stats.length],
    tags: ["Web Design", "UI/UX", "Development"]
  }
})

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

        </div>
      </div>
      
      {/* Portfolio Carousel - Full Width */}
      <ScrollReveal delay={0.5}>
        <div className="relative w-full -mt-20">
          <Carousel 
            items={portfolioItems}
            autoScrollInterval={5000}
            className="w-full"
          />
          
          {/* Background glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl"></div>
        </div>
      </ScrollReveal>
    </section>
  )
}


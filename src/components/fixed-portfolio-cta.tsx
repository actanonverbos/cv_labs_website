"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const portfolioImages = [
  {
    src: "/portfolio/Lina Mockup - 1.png",
    alt: "Lina Project Mockup",
    title: "Lina"
  },
  {
    src: "/portfolio/Mockup - Vibes.codes.png",
    alt: "Vibes.codes Project",
    title: "Vibes.codes"
  },
  {
    src: "/portfolio/Mockup - Sakatomo Studio 1.png",
    alt: "Sakatomo Studio Project",
    title: "Sakatomo"
  }
]

export function FixedPortfolioCTA() {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)
  const [isVisible, setIsVisible] = React.useState(false)
  const [ctaRef, setCtaRef] = React.useState<HTMLElement | null>(null)





  // Auto-rotate images
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % portfolioImages.length)
    }, 4000) // Change image every 4 seconds

    return () => clearInterval(interval)
  }, [])

  // Handle scroll visibility
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const headerHeight = 80 // Approximate header height
      
      // Check if we're past the header
      const pastHeader = scrollY > headerHeight
      
      // Check if the blog CTA section or related articles section is visible
      const blogCtaSection = document.querySelector('[data-blog-cta]')
      const relatedArticlesSection = document.querySelector('[data-related-articles]')
      let blogCtaVisible = false
      let relatedArticlesVisible = false
      
      if (blogCtaSection) {
        const rect = blogCtaSection.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Consider the section visible if any part of it is in the viewport
        blogCtaVisible = rect.top < windowHeight && rect.bottom > 0
      }
      
      if (relatedArticlesSection) {
        const rect = relatedArticlesSection.getBoundingClientRect()
        const windowHeight = window.innerHeight
        
        // Consider the section visible if any part of it is in the viewport
        relatedArticlesVisible = rect.top < windowHeight && rect.bottom > 0
      }
      
      // Show CTA only if past header and neither blog CTA nor related articles sections are visible
      setIsVisible(pastHeader && !blogCtaVisible && !relatedArticlesVisible)
    }

    window.addEventListener('scroll', handleScroll)
    
    // Check initial scroll position
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Theme observer for dynamic styling (matches homepage badge)
  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          
          if (ctaRef) {
            ctaRef.style.setProperty('--cta-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
            ctaRef.style.setProperty('--cta-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
            ctaRef.style.setProperty('--cta-text', isDark ? '#ffffff' : '#020817')
          }
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [ctaRef])



  return (
    <div 
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 ease-in-out hidden md:block ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div 
        className="rounded-2xl backdrop-blur-sm shadow-lg border overflow-hidden w-[304px] max-w-[calc(100vw-2rem)]"
        style={{
          backgroundColor: 'var(--cta-bg, rgba(0, 0, 0, 0.1))',
          borderColor: 'var(--cta-border, rgba(0, 0, 0, 0.2))',
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
        ref={(el) => {
          if (el) {
            setCtaRef(el)
            
            // Set initial colors to match homepage badge
            const isDark = document.documentElement.classList.contains('dark')
            el.style.setProperty('--cta-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
            el.style.setProperty('--cta-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
            el.style.setProperty('--cta-text', isDark ? '#ffffff' : '#020817')
          }
        }}
      >
        {/* Title */}
        <div className="px-4 pt-3 pb-2">
          <h3 className="text-lg font-semibold text-center" style={{ color: 'var(--cta-text, #020817)' }}>
            New Templates
          </h3>
        </div>

        {/* Image Carousel */}
        <div className="relative aspect-[4/3] bg-muted mx-4 rounded-xl overflow-hidden">
          <Image
            src={portfolioImages[currentImageIndex].src}
            alt={portfolioImages[currentImageIndex].alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 304px, 304px"
            quality={95}
            priority
            unoptimized
          />
          



        </div>

        {/* Content */}
        <div className="p-3">
          <Button 
            variant="default"
            className="w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200"
            style={{
              backgroundColor: 'var(--button-bg, #000000)',
              color: 'var(--button-text, #ffffff)',
            }}
            ref={(el) => {
              if (el) {
                // Set initial colors to match hero button
                const isDark = document.documentElement.classList.contains('dark')
                el.style.setProperty('--button-bg', isDark ? '#ffffff' : '#000000')
                el.style.setProperty('--button-text', isDark ? '#000000' : '#ffffff')
                
                // Add hover event listeners
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
              }
            }}
            asChild
          >
            <Link href="/templates">
              Preview
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

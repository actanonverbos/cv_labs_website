"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"

export function FloatingAvailabilityBadge() {
  const [badgeRef, setBadgeRef] = React.useState<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = React.useState(false)
  
  React.useEffect(() => {
    // Set up mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          
          if (badgeRef) {
            badgeRef.style.setProperty('--badge-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
            badgeRef.style.setProperty('--badge-text', isDark ? '#ffffff' : '#020817')
            badgeRef.style.setProperty('--badge-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
          }
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [badgeRef])

  React.useEffect(() => {
    // Set up scroll listener to show/hide badge
    const handleScroll = () => {
      const scrollY = window.scrollY
      const headerHeight = 80 // Approximate header height
      
      setIsVisible(scrollY > headerHeight)
    }

    window.addEventListener('scroll', handleScroll)
    
    // Check initial scroll position
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ease-in-out ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <Badge 
        variant="secondary" 
        className="rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-200 eyebrow inline-flex items-center gap-2 shadow-lg"
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
          }
        }}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <div className="absolute w-2 h-2 rounded-full bg-green-500 animate-radar-ping"></div>
        </div>
        2 Spots left in August
      </Badge>
    </div>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Work", href: "/#work", sectionId: "work" },
  { name: "Process", href: "/#process", sectionId: "process" },
  { name: "Pricing", href: "/#pricing", sectionId: "pricing" },
  { name: "Blog", href: "/blog", sectionId: "blog" },
  { name: "FAQ", href: "/#faq", sectionId: "faq" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("top")
  const [getStartedButtonRef, setGetStartedButtonRef] = React.useState<HTMLElement | null>(null)
  const [mobileGetStartedButtonRef, setMobileGetStartedButtonRef] = React.useState<HTMLElement | null>(null)
  const activeNavRefs = React.useRef<Map<string, HTMLElement>>(new Map())

  React.useEffect(() => {
    // Check current pathname
    const checkPathname = () => {
      const pathname = window.location.pathname
      if (pathname === '/templates' || pathname.startsWith('/templates/')) {
        setActiveSection("templates")
        return true
      }
      if (pathname === '/blog' || pathname.startsWith('/blog/')) {
        setActiveSection("blog")
        return true
      }
      return false
    }

    // If we're on templates page, don't set up scroll listener
    if (checkPathname()) return

    const handleScroll = () => {
      const sections = navItems.map(item => item.sectionId).filter(id => id !== "blog")
      const scrollPosition = window.scrollY + 100 // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    // Set initial active section for homepage
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Listen for route changes
    const handleRouteChange = () => {
      if (!checkPathname()) {
        // We're back on homepage, restart scroll detection
        handleScroll()
      }
    }
    
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  // Set up mutation observer to watch for theme changes
  React.useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          
          // Update Get Started buttons
          if (getStartedButtonRef) {
            getStartedButtonRef.style.setProperty('--button-bg', isDark ? '#ffffff' : '#000000')
            getStartedButtonRef.style.setProperty('--button-text', isDark ? '#000000' : '#ffffff')
          }
          
          if (mobileGetStartedButtonRef) {
            mobileGetStartedButtonRef.style.setProperty('--button-bg', isDark ? '#ffffff' : '#000000')
            mobileGetStartedButtonRef.style.setProperty('--button-text', isDark ? '#000000' : '#ffffff')
          }
          
          // Update active navigation items
          activeNavRefs.current.forEach((element) => {
            element.style.setProperty('--nav-bg', isDark ? '#ffffff' : '#000000')
            element.style.setProperty('--nav-text', isDark ? '#000000' : '#ffffff')
          })
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [getStartedButtonRef, mobileGetStartedButtonRef])

  // Helper function to set nav colors
  const setNavColors = React.useCallback((el: HTMLElement) => {
    const isDark = document.documentElement.classList.contains('dark')
    el.style.setProperty('--nav-bg', isDark ? '#ffffff' : '#000000')
    el.style.setProperty('--nav-text', isDark ? '#000000' : '#ffffff')
  }, [])

  // Helper function to set hover colors
  const setHoverColors = React.useCallback((el: HTMLElement, isHovering: boolean) => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isHovering) {
      el.style.setProperty('--nav-hover-bg', isDark ? '#ffffff' : '#000000')
      el.style.setProperty('--nav-hover-text', isDark ? '#000000' : '#ffffff')
      el.style.backgroundColor = 'var(--nav-hover-bg)'
      el.style.color = 'var(--nav-hover-text)'
    } else {
      el.style.backgroundColor = ''
      el.style.color = ''
    }
  }, [])

  const getStartedRefCallback = React.useCallback((el: HTMLElement | null) => {
    if (el && el !== getStartedButtonRef) {
      setGetStartedButtonRef(el)
      
      // Set initial colors
      const isDark = document.documentElement.classList.contains('dark')
      el.style.setProperty('--button-bg', isDark ? '#ffffff' : '#000000')
      el.style.setProperty('--button-text', isDark ? '#000000' : '#ffffff')
    }
  }, [getStartedButtonRef])

  const mobileGetStartedRefCallback = React.useCallback((el: HTMLElement | null) => {
    if (el && el !== mobileGetStartedButtonRef) {
      setMobileGetStartedButtonRef(el)
      
      // Set initial colors
      const isDark = document.documentElement.classList.contains('dark')
      el.style.setProperty('--button-bg', isDark ? '#ffffff' : '#000000')
      el.style.setProperty('--button-text', isDark ? '#000000' : '#ffffff')
    }
  }, [mobileGetStartedButtonRef])

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <div className="container">
        <div className="grid grid-cols-3 h-16 items-center">
          {/* Logo - Left */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center">
              <span className="font-medium text-xl">Convert Labs</span>
            </Link>
          </div>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.sectionId
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium eyebrow transition-all duration-200 ease-in-out rounded-lg",
                      isActive
                        ? ""
                        : "text-muted-foreground"
                    )}
                    style={isActive ? {
                      backgroundColor: 'var(--nav-bg, #000000)',
                      color: 'var(--nav-text, #ffffff)'
                    } : {}}
                    onMouseEnter={!isActive ? (e) => setHoverColors(e.currentTarget, true) : undefined}
                    onMouseLeave={!isActive ? (e) => setHoverColors(e.currentTarget, false) : undefined}
                    ref={isActive ? (el) => {
                      if (el) {
                        activeNavRefs.current.set(item.sectionId, el)
                        setNavColors(el)
                      } else {
                        activeNavRefs.current.delete(item.sectionId)
                      }
                    } : undefined}
                  >
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Desktop CTA & Theme Toggle - Right */}
          <div className="hidden md:flex items-center justify-end space-x-3">
            <Button 
              asChild 
              variant="frosted"
              className="px-4 py-2 text-sm font-medium rounded-lg"
            >
              <Link href="/templates">Templates</Link>
            </Button>
            <Button 
              asChild 
              variant="ghost"
              className="px-4 py-2 text-sm font-medium rounded-lg border-0"
              style={{
                backgroundColor: 'var(--button-bg, #000000)',
                color: 'var(--button-text, #ffffff)',
              }}
              ref={getStartedRefCallback}
            >
              <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">Get Started</Link>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center justify-end space-x-2 col-span-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden relative z-50 p-2 hover:bg-accent hover:text-accent-foreground"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-6 w-6 text-foreground" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="px-0 py-0 !bg-background [&>button]:hidden sm:max-w-[320px]"
                style={{ 
                  backgroundColor: 'hsl(var(--background))', 
                  opacity: '1 !important',
                  backdropFilter: 'none'
                }}
              >
                {/* Custom header with aligned close button */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
                  <span className="font-medium text-lg">Menu</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 p-2 hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-6 w-6 text-foreground" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                
                <div className="flex flex-col space-y-4 px-6 py-6">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.sectionId
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "px-4 py-3 text-lg font-medium eyebrow transition-all duration-200 ease-in-out rounded-lg",
                          isActive
                            ? ""
                            : "text-muted-foreground"
                        )}
                        style={isActive ? {
                          backgroundColor: 'var(--nav-bg, #000000)',
                          color: 'var(--nav-text, #ffffff)'
                        } : {}}
                        onMouseEnter={!isActive ? (e) => setHoverColors(e.currentTarget, true) : undefined}
                        onMouseLeave={!isActive ? (e) => setHoverColors(e.currentTarget, false) : undefined}
                        ref={isActive ? (el) => {
                          if (el) {
                            activeNavRefs.current.set(`mobile-${item.sectionId}`, el)
                            setNavColors(el)
                          } else {
                            activeNavRefs.current.delete(`mobile-${item.sectionId}`)
                          }
                        } : undefined}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                  <div className="pt-6 mt-6 border-t border-border/30 space-y-4">
                    <Button 
                      asChild 
                      variant="frosted"
                      className="w-full px-6 py-3 text-base font-medium rounded-lg"
                    >
                      <Link href="/templates" onClick={() => setIsOpen(false)}>
                        Templates
                      </Link>
                    </Button>
                    <Button 
                      asChild 
                      variant="ghost"
                      className="w-full px-6 py-3 text-base font-medium rounded-lg border-0"
                      style={{
                        backgroundColor: 'var(--button-bg, #000000)',
                        color: 'var(--button-text, #ffffff)',
                      }}
                      ref={mobileGetStartedRefCallback}
                    >
                      <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

import { cn } from "@/lib/utils"

const navItems = [
  { name: "Work", href: "/#hero", sectionId: "hero" },
  { name: "Benefits", href: "/#benefits", sectionId: "benefits" },
  { name: "Process", href: "/#process", sectionId: "process" },
  { name: "Reviews", href: "/#reviews", sectionId: "reviews" },
  { name: "Pricing", href: "/#pricing", sectionId: "pricing" },
  { name: "FAQ", href: "/#faq", sectionId: "faq" },
  { name: "Blog", href: "/blog", sectionId: "blog" },
]

const industriesItems = [
  { name: "Crypto & Meme Coins", href: "/crypto", description: "Websites for crypto tokens and meme coins" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)
  const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("top")
  const [getStartedButtonRef, setGetStartedButtonRef] = React.useState<HTMLElement | null>(null)
  const [mobileGetStartedButtonRef, setMobileGetStartedButtonRef] = React.useState<HTMLElement | null>(null)
  const activeNavRefs = React.useRef<Map<string, HTMLElement>>(new Map())
  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

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
      if (pathname === '/crypto' || pathname.startsWith('/crypto/')) {
        setActiveSection("industries")
        return true
      }
      return false
    }

    // If we're on templates page, don't set up scroll listener
    if (checkPathname()) return

    const handleScroll = () => {
      const sections = navItems.map(item => item.sectionId).filter(id => id !== "blog")
      const scrollPosition = window.scrollY + 200 // Increased offset for better detection
      
      let activeSection = sections[0] // Default to first section

      // Find the section that's currently in view
      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i])
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          const sectionBottom = sectionTop + sectionHeight

          // Check if scroll position is within this section
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            activeSection = sections[i]
            break
          }
          // If we're past this section, it could be the active one
          else if (scrollPosition >= sectionTop) {
            activeSection = sections[i]
          }
        }
      }

      setActiveSection(activeSection)
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

  // Set up initial dark mode styles (site is always dark)
  React.useEffect(() => {
    // Update Get Started buttons for dark mode
    if (getStartedButtonRef) {
      getStartedButtonRef.style.setProperty('--button-bg', '#ffffff')
      getStartedButtonRef.style.setProperty('--button-text', '#000000')
    }
    
    if (mobileGetStartedButtonRef) {
      mobileGetStartedButtonRef.style.setProperty('--button-bg', '#ffffff')
      mobileGetStartedButtonRef.style.setProperty('--button-text', '#000000')
    }
    
    // Update active navigation items for dark mode
    activeNavRefs.current.forEach((element) => {
      element.style.setProperty('--nav-bg', '#ffffff')
      element.style.setProperty('--nav-text', '#000000')
    })
  }, [getStartedButtonRef, mobileGetStartedButtonRef])

  // Helper function to set nav colors (always dark mode)
  const setNavColors = React.useCallback((el: HTMLElement) => {
    el.style.setProperty('--nav-bg', '#ffffff')
    el.style.setProperty('--nav-text', '#000000')
  }, [])

  // Helper function to set hover colors (always dark mode)
  const setHoverColors = React.useCallback((el: HTMLElement, isHovering: boolean) => {
    if (isHovering) {
      el.style.setProperty('--nav-hover-bg', '#ffffff')
      el.style.setProperty('--nav-hover-text', '#000000')
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
      
      // Set initial colors for dark mode
      el.style.setProperty('--button-bg', '#ffffff')
      el.style.setProperty('--button-text', '#000000')
    }
  }, [getStartedButtonRef])

  const mobileGetStartedRefCallback = React.useCallback((el: HTMLElement | null) => {
    if (el && el !== mobileGetStartedButtonRef) {
      setMobileGetStartedButtonRef(el)
      
      // Set initial colors for dark mode
      el.style.setProperty('--button-bg', '#ffffff')
      el.style.setProperty('--button-text', '#000000')
    }
  }, [mobileGetStartedButtonRef])

  // Dropdown hover handlers
  const handleDropdownMouseEnter = React.useCallback(() => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setIsDropdownOpen(true)
  }, [])

  const handleDropdownMouseLeave = React.useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false)
    }, 150) // Small delay to prevent flickering
  }, [])

  // Mobile industries dropdown handler
  const handleMobileIndustriesToggle = React.useCallback(() => {
    setIsMobileIndustriesOpen(prev => !prev)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <div className="container">
        <div className="grid grid-cols-3 h-12 md:h-14 items-center">
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
              
              {/* Industries Dropdown */}
              <div 
                className="relative"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium eyebrow transition-all duration-200 ease-in-out rounded-lg flex items-center gap-1",
                    activeSection === "industries"
                      ? ""
                      : "text-muted-foreground"
                  )}
                  style={activeSection === "industries" ? {
                    backgroundColor: 'var(--nav-bg, #000000)',
                    color: 'var(--nav-text, #ffffff)'
                  } : {}}
                  onMouseEnter={activeSection !== "industries" ? (e) => setHoverColors(e.currentTarget, true) : undefined}
                  onMouseLeave={activeSection !== "industries" ? (e) => setHoverColors(e.currentTarget, false) : undefined}
                  ref={activeSection === "industries" ? (el) => {
                    if (el) {
                      activeNavRefs.current.set("industries", el)
                      setNavColors(el)
                    } else {
                      activeNavRefs.current.delete("industries")
                    }
                  } : undefined}
                >
                  Industries
                  <ChevronDown className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    isDropdownOpen ? "rotate-180" : ""
                  )} />
                </button>
                
                {/* Dropdown Content */}
                {isDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-[400px] border rounded-md shadow-lg z-50 animate-in fade-in-0 zoom-in-95 duration-200 backdrop-blur-md"
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                      borderWidth: '1px',
                      borderStyle: 'solid'
                    }}
                  >
                    <div className="p-4 space-y-2">
                      {industriesItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-all duration-200"
                          onMouseEnter={(e) => setHoverColors(e.currentTarget, true)}
                          onMouseLeave={(e) => setHoverColors(e.currentTarget, false)}
                        >
                          <div className="text-sm font-medium leading-none">{item.name}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {item.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  asChild 
                  variant="ghost"
                  className="px-4 py-2 text-sm font-medium rounded-lg border-0 transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--button-bg, #000000)',
                    color: 'var(--button-text, #ffffff)',
                  }}
                  ref={getStartedRefCallback}
                  onMouseEnter={(e) => {
                    const isDark = document.documentElement.classList.contains('dark')
                    e.currentTarget.style.backgroundColor = isDark ? '#f3f4f6' : '#1f2937'
                  }}
                  onMouseLeave={(e) => {
                    const isDark = document.documentElement.classList.contains('dark')
                    e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : '#000000'
                  }}
                >
                  <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">Book a Call</Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <div className="flex items-center gap-2">
                  <span>Press</span>
                  <kbd className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-muted border border-border rounded">
                    B
                  </kbd>
                  <span>to book</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center justify-end col-span-2">
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
                className="bg-white dark:bg-card border-border backdrop-blur-none text-foreground"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Navigate to different sections of the website
                </SheetDescription>
                {/* Custom header with title */}
                <div className="flex items-center justify-between p-6 pt-4 border-b border-border/30">
                  <span className="font-medium text-lg">Menu</span>
                </div>
                
                <div className="flex flex-col space-y-4 p-6">
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
                  
                  {/* Industries Section */}
                  <div className="space-y-2">
                    <button 
                      onClick={handleMobileIndustriesToggle}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 text-lg font-medium eyebrow transition-all duration-200 ease-in-out rounded-lg",
                        activeSection === "industries"
                          ? ""
                          : "text-muted-foreground"
                      )}
                      style={activeSection === "industries" ? {
                        backgroundColor: 'var(--nav-bg, #000000)',
                        color: 'var(--nav-text, #ffffff)'
                      } : {}}
                      onMouseEnter={activeSection !== "industries" ? (e) => setHoverColors(e.currentTarget, true) : undefined}
                      onMouseLeave={activeSection !== "industries" ? (e) => setHoverColors(e.currentTarget, false) : undefined}
                      ref={activeSection === "industries" ? (el) => {
                        if (el) {
                          activeNavRefs.current.set(`mobile-industries`, el)
                          setNavColors(el)
                        } else {
                          activeNavRefs.current.delete(`mobile-industries`)
                        }
                      } : undefined}
                    >
                      <span>Industries</span>
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isMobileIndustriesOpen ? "rotate-180" : ""
                      )} />
                    </button>
                    {isMobileIndustriesOpen && (
                      <div className="space-y-1 animate-in slide-in-from-top-2 duration-200">
                        {industriesItems.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-8 py-2 text-base text-muted-foreground hover:text-foreground transition-colors rounded-lg"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          asChild 
                          variant="ghost"
                          className="w-full px-6 py-3 text-base font-medium rounded-lg border-0 transition-all duration-200"
                          style={{
                            backgroundColor: 'var(--button-bg, #000000)',
                            color: 'var(--button-text, #ffffff)',
                          }}
                          ref={mobileGetStartedRefCallback}
                          onMouseEnter={(e) => {
                            const isDark = document.documentElement.classList.contains('dark')
                            e.currentTarget.style.backgroundColor = isDark ? '#f3f4f6' : '#1f2937'
                          }}
                          onMouseLeave={(e) => {
                            const isDark = document.documentElement.classList.contains('dark')
                            e.currentTarget.style.backgroundColor = isDark ? '#ffffff' : '#000000'
                          }}
                        >
                          <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                            Book a Call
                          </Link>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <div className="flex items-center gap-2">
                          <span>Press</span>
                          <kbd className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-primary-foreground bg-muted border border-border rounded">
                            B
                          </kbd>
                          <span>to book</span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
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

"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Work", href: "#work", sectionId: "work" },
  { name: "Process", href: "#process", sectionId: "process" },
  { name: "Pricing", href: "#pricing", sectionId: "pricing" },
  { name: "Blog", href: "/blog", sectionId: "blog" },
  { name: "FAQ", href: "#faq", sectionId: "faq" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("top")

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
                      "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black",
                      isActive
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "text-muted-foreground"
                    )}
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
              className="px-4 py-2 text-sm font-medium bg-white text-black hover:bg-gray-100 rounded-lg border-0"
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
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-2 mt-8">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.sectionId
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "px-4 py-3 text-lg font-medium eyebrow transition-all duration-200 ease-in-out rounded-lg",
                          "hover:bg-white hover:text-black hover:shadow-sm dark:hover:bg-white dark:hover:text-black",
                          isActive
                            ? "bg-white text-black shadow-sm dark:bg-white dark:text-black"
                            : "text-muted-foreground"
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )
                  })}
                  <div className="pt-4 border-t border-border space-y-3">
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
                      className="w-full px-6 py-3 text-base font-medium bg-white text-black hover:bg-gray-100 rounded-lg border-0"
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

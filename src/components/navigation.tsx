"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "/#top", sectionId: "top" },
  { name: "Work", href: "#work", sectionId: "work" },
  { name: "Process", href: "#process", sectionId: "process" },
  { name: "Pricing", href: "#pricing", sectionId: "pricing" },
  { name: "Templates", href: "/templates", sectionId: "templates" },
  { name: "FAQ", href: "#faq", sectionId: "faq" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState("top")

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.sectionId)
      const scrollPosition = window.scrollY + 100 // Offset for header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    // Set initial active section
    handleScroll()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-medium text-xl">Convert Labs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium eyebrow transition-all duration-200 ease-in-out rounded-lg",
                    "hover:bg-white hover:text-black hover:shadow-sm dark:hover:bg-white dark:hover:text-black",
                    isActive
                      ? "bg-white text-black shadow-sm dark:bg-white dark:text-black"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button 
              asChild 
              className="px-6 py-2 text-sm font-medium bg-white text-black hover:bg-gray-100 rounded-lg border-0"
            >
              <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
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
                  <div className="pt-4 border-t border-border">
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

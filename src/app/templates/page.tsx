"use client"

import * as React from "react"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { ScrollReveal } from "@/components/scroll-reveal"

import { FooterSection } from "@/components/sections/footer"
import { FAQChatWidget } from "@/components/faq-chat-widget"
import { client, TEMPLATES_QUERY } from "@/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"

type Template = {
  _id: string
  title: string
  subtitle: string
  description: string
  category: string
  badge: "FREE" | "PREMIUM"
  price: number
  features: string[]
  previewImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  demoUrl?: string
  downloadUrl: string
  slug: { current: string }
}

async function getTemplates(): Promise<Template[]> {
  return await client.fetch(TEMPLATES_QUERY)
}

function TemplatesBadge() {
  const [badgeRef, setBadgeRef] = React.useState<HTMLElement | null>(null)
  
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
  }, [badgeRef])

  return (
    <div className="flex justify-center mb-6">
      <Badge 
        variant="secondary" 
        className="rounded-lg px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-200 eyebrow inline-flex items-center gap-2"
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
        Premium templates available now
      </Badge>
    </div>
  )
}

// Fallback templates for when CMS is empty
const fallbackTemplates = [
  {
    _id: "1",
    title: "INBOX PULSE",
    subtitle: "The Tech Edge You Need, Delivered Weekly",
    description: "Say hello to CreatorLink — your new favorite link-in-bio template, built in Framer with a mobile-first design and creators in mind.",
    image: "/api/placeholder/600/400",
    badge: "FREE" as const,
    category: "Newsletter",
    price: 0,
    features: ["Lightning Fast Setup", "One-Click Import", "Custom Built Components", "Easy Setup Guide"],
    downloadUrl: "https://cal.com/isaac-cullinane/1-1",
    slug: { current: "inbox-pulse" }
  },
  {
    _id: "2",
    title: "CREATORLINK", 
    subtitle: "Connect Your Audience Everywhere",
    description: "Say hello to CreatorLink — your new favorite link-in-bio template, built in Framer with a mobile-first design and creators in mind.",
    image: "/api/placeholder/600/400", 
    badge: "FREE" as const,
    category: "Link in Bio",
    price: 0,
    features: ["Mobile Responsive", "Analytics Ready", "Custom Branding", "Social Integration"],
    downloadUrl: "https://cal.com/isaac-cullinane/1-1",
    slug: { current: "creatorlink" }
  },
  {
    _id: "3",
    title: "WAITPRO",
    subtitle: "Professional Waitlist Landing Page", 
    description: "Get Early Access to the most beautiful waitlist template. Perfect for launching your next big idea and building anticipation.",
    image: "/api/placeholder/600/400",
    badge: "FREE" as const,
    category: "Waitlist",
    price: 0,
    features: ["Email Collection", "Social Sharing", "Analytics", "Mobile Optimized"],
    downloadUrl: "https://cal.com/isaac-cullinane/1-1",
    slug: { current: "waitpro" }
  },
  {
    _id: "4",
    title: "SKILLSET",
    subtitle: "Framer Landing Page Template",
    description: "Unlock Your Financial Freedom with Framer. Fast Track Leads, Earn Track Record, and Build the Portfolio.",
    image: "/api/placeholder/600/400",
    badge: "FREE" as const, 
    category: "Landing Page",
    price: 0,
    features: ["No Code", "Highly Scalable", "Ready to Use", "Plug and Play Template"],
    downloadUrl: "https://cal.com/isaac-cullinane/1-1",
    slug: { current: "skillset" }
  }
]

export default function TemplatesPage() {
  const [templates, setTemplates] = React.useState<Template[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchTemplates() {
      try {
        const fetchedTemplates = await getTemplates()
        setTemplates(fetchedTemplates)
      } catch (error) {
        console.error('Error fetching templates:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchTemplates()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main>
          <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-background">
            <div className="container">
              <div className="max-w-4xl mx-auto text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded-md w-48 mx-auto mb-6"></div>
                  <div className="h-16 bg-muted rounded-md w-96 mx-auto mb-6"></div>
                  <div className="h-6 bg-muted rounded-md w-80 mx-auto"></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              {/* Eyebrow pill */}
              <ScrollReveal delay={0.1}>
                <TemplatesBadge />
              </ScrollReveal>

              {/* Main headline */}
              <ScrollReveal delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-balance leading-tight tracking-tight">
                  Launch Your Website In <span className="text-primary">Days, Not Weeks</span>
                </h1>
              </ScrollReveal>

              {/* Subheadline */}
              <ScrollReveal delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed font-medium">
                  Custom Framer Templates built to save you time and money without sacrificing quality
                </p>
              </ScrollReveal>


            </div>
          </div>
        </section>



        {/* Templates Grid */}
        <section id="templates" className="pt-8 pb-20 md:pt-12 md:pb-28 bg-muted/5">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(templates.length > 0 ? templates : fallbackTemplates).map((template, index) => (
                <ScrollReveal key={template._id || template.title} delay={0.1 * (index + 1)}>
                  <div className="group overflow-hidden">
                    {/* Header with Title, Category, and Price */}
                    <div className="p-0 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {/* Title */}
                          <h3 className="text-xl font-bold leading-tight">
                            {template.title}
                          </h3>
                          
                          {/* Category */}
                          <Badge variant="outline" className="text-xs px-2 py-1 uppercase font-medium bg-transparent">
                            {template.category}
                          </Badge>
                        </div>
                        
                        {/* Badge/Price */}
                        <Badge 
                          variant="secondary"
                          className={`font-semibold text-xs px-2 py-1 flex-shrink-0 ${
                            template.badge === "FREE" 
                              ? "bg-green-100 text-green-700 border-green-200" 
                              : "bg-orange-100 text-orange-700 border-orange-200"
                          }`}
                        >
                          {template.badge}
                        </Badge>
                      </div>
                    </div>

                    {/* Template Preview */}
                    {'previewImage' in template && template.previewImage ? (
                      <Link href={template.slug?.current ? `/templates/${template.slug.current}` : template.downloadUrl || "https://cal.com/isaac-cullinane/1-1"} className="block">
                        <div className="relative overflow-hidden rounded-xl">
                          <Image
                            src={urlFor(template.previewImage).width(800).height(600).url()}
                            alt={template.previewImage.alt || template.title}
                            width={800}
                            height={600}
                            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                            <Button variant="secondary" size="sm" className="hover-scale pointer-events-none">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Template
                            </Button>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <Link href={template.slug?.current ? `/templates/${template.slug.current}` : template.downloadUrl || "https://cal.com/isaac-cullinane/1-1"} className="block">
                        <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden rounded-xl">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center space-y-3">
                              <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                                  <span className="text-primary-foreground font-bold text-sm">{template.title.slice(0, 2)}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="h-2 bg-primary/20 rounded-full w-32 mx-auto"></div>
                                <div className="h-2 bg-primary/10 rounded-full w-24 mx-auto"></div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Overlay on hover */}
                          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                            <Button variant="secondary" size="sm" className="hover-scale pointer-events-none">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Template
                            </Button>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                </ScrollReveal>
              ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
      <FAQChatWidget />
    </div>
  )
}

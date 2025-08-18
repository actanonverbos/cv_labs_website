"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
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
    description: "Get the latest tech trends, AI breakthroughs, and industry insights delivered weekly to your inbox.",
    image: "/api/placeholder/600/400",
    badge: "FREE" as const,
    category: "Newsletter",
    price: 0,
    features: ["Lightning Fast", "One-Click Import", "Custom Built", "Easy Setup"],
    downloadUrl: "https://cal.com/isaac-cullinane/1-1",
    slug: { current: "inbox-pulse" }
  },
  {
    _id: "2",
    title: "CREATORLINK", 
    subtitle: "Connect Your Audience Everywhere",
    description: "Beautiful link-in-bio pages that convert visitors into followers and customers.",
    image: "/api/placeholder/600/400", 
    badge: "FREE" as const,
    category: "Link in Bio",
    price: 0,
    features: ["Mobile Optimized", "Analytics Ready", "Custom Branding", "Social Integration"],
    downloadUrl: "https://cal.com/isaac-cullinane/1-1",
    slug: { current: "creatorlink" }
  },
  {
    _id: "3",
    title: "PORTFOLIO PRO",
    subtitle: "Showcase Your Work Professionally", 
    description: "Modern portfolio templates designed to impress clients and land your dream projects.",
    image: "/api/placeholder/600/400",
    badge: "PREMIUM" as const,
    category: "Portfolio",
    price: 49,
    features: ["Responsive Design", "Project Galleries", "Contact Forms", "SEO Optimized"],
    downloadUrl: "https://cal.com/isaac-cullinane/1-1",
    slug: { current: "portfolio-pro" }
  },
  {
    _id: "4",
    title: "STARTUP LAUNCH",
    subtitle: "Launch Your Startup in Days",
    description: "Complete startup landing page with pricing, features, and conversion optimization built-in.",
    image: "/api/placeholder/600/400",
    badge: "PREMIUM" as const, 
    category: "Startup",
    price: 79,
    features: ["Conversion Focused", "Payment Integration", "A/B Testing", "Analytics"],
    downloadUrl: "https://cal.com/isaac-cullinane/1-1",
    slug: { current: "startup-launch" }
  },
  {
    _id: "5",
    title: "AGENCY SUITE",
    subtitle: "Professional Agency Presence",
    description: "Multi-page agency website with team pages, case studies, and client testimonials.",
    image: "/api/placeholder/600/400",
    badge: "PREMIUM" as const,
    category: "Agency",
    price: 99,
    features: ["Multi-page", "Team Profiles", "Case Studies", "Client Portal"],
    downloadUrl: "https://cal.com/isaac-cullinane/1-1",
    slug: { current: "agency-suite" }
  },
  {
    _id: "6",
    title: "E-COMMERCE STARTER",
    subtitle: "Start Selling Online Today",
    description: "Complete e-commerce solution with product catalogs, shopping cart, and payment processing.",
    image: "/api/placeholder/600/400",
    badge: "PREMIUM" as const,
    category: "E-commerce",
    price: 149,
    features: ["Shopping Cart", "Payment Gateway", "Inventory Management", "Order Tracking"],
    downloadUrl: "https://cal.com/isaac-cullinane/1-1",
    slug: { current: "ecommerce-starter" }
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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight tracking-tight">
                  Launch Your Website In{" "}
                  <span className="text-primary">Days, Not Weeks</span>
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
            <div className="text-center mb-16">
              <ScrollReveal delay={0.1}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Choose Your Perfect Template
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Professional templates designed for conversion and built with modern technology
                </p>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(templates.length > 0 ? templates : fallbackTemplates).map((template, index) => (
                <ScrollReveal key={template._id || template.title} delay={0.1 * (index + 1)}>
                  <Card className="group overflow-hidden bg-card border border-border rounded-2xl">
                    {/* Template Preview */}
                    {'previewImage' in template && template.previewImage ? (
                      <div className="aspect-video relative overflow-hidden">
                        <Image
                          src={urlFor(template.previewImage).width(600).height(400).url()}
                          alt={template.previewImage.alt || template.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button variant="secondary" size="sm" className="hover-scale">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Template
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
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
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Button variant="secondary" size="sm" className="hover-scale">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Template
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        {/* Badge */}
                        <Badge 
                          variant="secondary"
                          className={`font-semibold ${
                            template.badge === "FREE" 
                              ? "bg-green-100 text-green-700 border-green-200" 
                              : "bg-primary/10 text-primary border-primary/20"
                          }`}
                        >
                          {template.badge}
                        </Badge>

                        {/* Price */}
                        <div className="text-lg font-bold">
                          {'price' in template && template.price !== undefined 
                            ? (template.price === 0 ? 'Free' : `$${template.price}`)
                            : 'Free'
                          }
                        </div>
                      </div>

                      {/* Title and description */}
                      <h3 className="text-xl font-semibold mb-3">
                        {template.title}
                      </h3>
                      <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                        {template.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {template.features.slice(0, 3).map((feature) => (
                          <Badge 
                            key={feature}
                            variant="outline"
                            className="text-xs border-border hover:bg-primary/5"
                          >
                            {feature}
                          </Badge>
                        ))}
                        {template.features.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{template.features.length - 3} more
                          </Badge>
                        )}
                      </div>

                      {/* CTA Button */}
                      <Button 
                        className="w-full px-4 py-2 text-sm font-medium bg-white text-black hover:bg-gray-100 rounded-lg border-0"
                        asChild
                      >
                        <Link href={template.slug?.current ? `/templates/${template.slug.current}` : template.downloadUrl || "https://cal.com/isaac-cullinane/1-1"}>
                          View Template
                        </Link>
                      </Button>
                    </div>
                  </Card>
                </ScrollReveal>
              ))}
            </div>

            {/* CTA to get started */}
            <div className="text-center mt-16">
              <ScrollReveal delay={0.6}>
                <Button 
                  variant="frosted"
                  className="px-6 py-3 text-base font-medium rounded-lg"
                  asChild
                >
                  <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">
                    Ready to Get Started?
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

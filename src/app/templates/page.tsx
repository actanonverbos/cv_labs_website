"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"

const templates = [
  {
    title: "INBOX PULSE",
    subtitle: "The Tech Edge You Need, Delivered Weekly",
    description: "Get the latest tech trends, AI breakthroughs, and industry insights delivered weekly to your inbox.",
    image: "/api/placeholder/600/400",
    badge: "FREE",
    category: "Newsletter",
    features: ["Lightning Fast", "One-Click Import", "Custom Built", "Easy Setup"]
  },
  {
    title: "CREATORLINK", 
    subtitle: "Connect Your Audience Everywhere",
    description: "Beautiful link-in-bio pages that convert visitors into followers and customers.",
    image: "/api/placeholder/600/400", 
    badge: "FREE",
    category: "Link in Bio",
    features: ["Mobile Optimized", "Analytics Ready", "Custom Branding", "Social Integration"]
  },
  {
    title: "PORTFOLIO PRO",
    subtitle: "Showcase Your Work Professionally", 
    description: "Modern portfolio templates designed to impress clients and land your dream projects.",
    image: "/api/placeholder/600/400",
    badge: "PREMIUM",
    category: "Portfolio",
    features: ["Responsive Design", "Project Galleries", "Contact Forms", "SEO Optimized"]
  },
  {
    title: "STARTUP LAUNCH",
    subtitle: "Launch Your Startup in Days",
    description: "Complete startup landing page with pricing, features, and conversion optimization built-in.",
    image: "/api/placeholder/600/400",
    badge: "PREMIUM", 
    category: "Startup",
    features: ["Conversion Focused", "Payment Integration", "A/B Testing", "Analytics"]
  },
  {
    title: "AGENCY SUITE",
    subtitle: "Professional Agency Presence",
    description: "Multi-page agency website with team pages, case studies, and client testimonials.",
    image: "/api/placeholder/600/400",
    badge: "PREMIUM",
    category: "Agency", 
    features: ["Multi-page", "Team Profiles", "Case Studies", "Client Portal"]
  },
  {
    title: "E-COMMERCE STARTER",
    subtitle: "Start Selling Online Today",
    description: "Complete e-commerce solution with product catalogs, shopping cart, and payment processing.",
    image: "/api/placeholder/600/400",
    badge: "PREMIUM",
    category: "E-commerce",
    features: ["Shopping Cart", "Payment Gateway", "Inventory Management", "Order Tracking"]
  }
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              {/* Eyebrow pill */}
              <ScrollReveal delay={0.1}>
                <div className="flex justify-center mb-6">
                  <Badge 
                    variant="secondary" 
                    className="rounded-2xl px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm text-primary border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-200 eyebrow inline-flex items-center gap-2"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <div className="absolute w-2 h-2 bg-white rounded-full animate-radar-ping"></div>
                    </div>
                    Premium templates available now
                  </Badge>
                </div>
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
        <section id="templates" className="py-20 md:py-28 bg-muted/5">
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
              {templates.map((template, index) => (
                <ScrollReveal key={template.title} delay={0.1 * (index + 1)}>
                  <Card className="group overflow-hidden bg-card border border-border rounded-2xl">
                    {/* Template Preview */}
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

                    <div className="p-6">
                      {/* Badge */}
                      <Badge 
                        variant="secondary"
                        className={`mb-4 font-semibold ${
                          template.badge === "FREE" 
                            ? "bg-green-100 text-green-700 border-green-200" 
                            : "bg-primary/10 text-primary border-primary/20"
                        }`}
                      >
                        {template.badge}
                      </Badge>

                      {/* Title and description */}
                      <h3 className="text-xl font-semibold mb-3">
                        {template.title}
                      </h3>
                      <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                        {template.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature) => (
                          <Badge 
                            key={feature}
                            variant="outline"
                            className="text-xs border-border hover:bg-primary/5"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>
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

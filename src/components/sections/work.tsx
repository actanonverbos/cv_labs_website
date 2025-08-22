"use client"

import Link from "next/link"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"

const portfolioItems = [
  {
    title: "TechStart SaaS Landing",
    description: "B2B SaaS platform targeting enterprise customers",
    image: "/portfolio-1.jpg", // Placeholder - will need actual images
    stat: "+340% conversions",
    tags: ["SaaS", "B2B", "Enterprise"],
    link: "#"
  },
  {
    title: "FinanceFlow App",
    description: "Personal finance app focusing on young professionals",
    image: "/portfolio-2.jpg", // Placeholder - will need actual images  
    stat: "+220% sign-ups",
    tags: ["FinTech", "Mobile App", "B2C"],
    link: "#"
  },
  {
    title: "EcoCommerce Store", 
    description: "Sustainable products e-commerce platform",
    image: "/portfolio-3.jpg", // Placeholder - will need actual images
    stat: "+180% sales",
    tags: ["E-commerce", "Sustainability", "Retail"],
    link: "#"
  },
  {
    title: "MedTech Solutions",
    description: "Healthcare technology for medical practitioners", 
    image: "/portfolio-4.jpg", // Placeholder - will need actual images
    stat: "+290% leads",
    tags: ["Healthcare", "B2B", "Technology"],
    link: "#"
  },
  {
    title: "EduPlatform Online",
    description: "Online learning platform for skill development",
    image: "/portfolio-5.jpg", // Placeholder - will need actual images
    stat: "+410% enrollments", 
    tags: ["Education", "E-learning", "B2C"],
    link: "#"
  },
  {
    title: "CryptoTrader Pro",
    description: "Cryptocurrency trading platform and tools",
    image: "/portfolio-6.jpg", // Placeholder - will need actual images
    stat: "+260% registrations",
    tags: ["Crypto", "Trading", "FinTech"],
    link: "#"
  }
]

export function WorkSection() {
  return (
    <section id="work" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            <StaggeredText 
              highlightWords={["Work"]}
              delay={0.2}
              staggerDelay={0.2}
            >
              Selected Work
            </StaggeredText>
          </h2>
          <ScrollReveal delay={0.6}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              Real results from real clients. See how we&apos;ve helped businesses across industries achieve their conversion goals.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {portfolioItems.map((item) => (
            <Card 
              key={item.title}
              className="group overflow-hidden bg-card border border-border rounded-2xl"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm">CV</span>
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
                    View Case Study
                  </Button>
                </div>
              </div>

              <div className="p-6">
                {/* Stats badge */}
                <Badge 
                  variant="secondary"
                  className="mb-4 bg-primary/10 text-primary border-primary/20 font-semibold"
                >
                  {item.stat}
                </Badge>

                {/* Title and description */}
                <h3 className="text-xl font-medium mb-3">
                  {item.title}
                </h3>
                <p className="text-base text-muted-foreground mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="outline"
                      className="text-xs border-border hover:bg-primary/5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA to view more work */}
        <div className="text-center">
          <Button 
            variant="frosted"
            className="px-6 py-3 text-base font-medium rounded-lg"
            asChild
          >
            <Link href="/#pricing" className="flex items-center">
              Ready to Get Started?
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

"use client"

import { 
  Zap, 
  TrendingUp, 
  Gauge, 
  Search, 
  BarChart3, 
  Puzzle 
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"

const benefits = [
  {
    icon: Zap,
    title: "Faster Launches",
    description: "Get your landing page live in days, not months. Our streamlined process eliminates delays and gets you to market quickly."
  },
  {
    icon: TrendingUp,
    title: "Revenue-First UX",
    description: "Every element is designed to convert. We focus on user psychology and proven conversion patterns to maximize your ROI."
  },
  {
    icon: Gauge,
    title: "High-Performance",
    description: "Lightning-fast loading times and optimal Core Web Vitals. Your visitors won't wait, and neither should you."
  },
  {
    icon: Search,
    title: "SEO Essentials",
    description: "Built-in SEO optimization from day one. Proper meta tags, schema markup, and search engine friendly structure."
  },
  {
    icon: BarChart3,
    title: "Analytics-Ready",
    description: "Comprehensive tracking setup included. Monitor conversions, user behavior, and optimize based on real data."
  },
  {
    icon: Puzzle,
    title: "Easy to Extend",
    description: "Clean, maintainable code that grows with your business. Add features and scale without technical debt."
  }
]

export function BenefitsSection() {
  return (
    <section id="benefits" className="py-20 md:py-28 bg-background">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            <StaggeredText 
              className="block"
              highlightWords={["Service?"]}
              delay={0.2}
              staggerDelay={0.08}
            >
              Why Choose Our Landing Page Service?
            </StaggeredText>
          </h2>
          <ScrollReveal delay={0.4}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              We combine design expertise with conversion optimization to deliver pages that don&apos;t just look good—they perform.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <ScrollReveal key={benefit.title} delay={0.6 + (index * 0.1)}>
                <Card className="p-6 bg-card border border-[hsl(var(--border))] rounded-2xl h-full">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </Card>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

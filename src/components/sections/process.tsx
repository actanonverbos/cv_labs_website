"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "We start with a deep dive into your business, target audience, and goals. Understanding your unique value proposition is crucial for creating a page that converts."
  },
  {
    number: "02", 
    title: "Wireframe",
    description: "We create detailed wireframes that map out the user journey and conversion flow. Every element is strategically placed to guide visitors toward your desired action."
  },
  {
    number: "03",
    title: "Design & Build", 
    description: "Our team brings the wireframes to life with stunning visuals and seamless functionality. We focus on both aesthetics and performance optimization."
  },
  {
    number: "04",
    title: "Launch & Iterate",
    description: "After thorough testing, we launch your page and monitor its performance. We provide insights and recommendations for continuous improvement."
  }
]

function ProcessBadge({ stepNumber }: { stepNumber: string }) {
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
    <Badge 
      variant="secondary" 
              className="rounded-xl px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-200 eyebrow mb-4 w-fit"
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
      STEP {stepNumber}
    </Badge>
  )
}

export function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-28 bg-muted/5">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            <StaggeredText 
              highlightWords={["Process"]}
              delay={0.2}
              staggerDelay={0.1}
            >
              Our Proven Process
            </StaggeredText>
          </h2>
          <ScrollReveal delay={0.4}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              A systematic approach that ensures your landing page is built for maximum conversions from day one.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:grid-rows-2 md:items-stretch">
          {processSteps.map((step, index) => (
            <ScrollReveal key={step.number} delay={0.6 + (index * 0.1)}>
              <div className="relative h-full flex">
                <Card className="p-6 bg-card border border-border h-full flex-1">
                <div className="flex flex-col h-full">
                  {/* Step badge */}
                  <ProcessBadge stepNumber={step.number} />
                  
                  {/* Step title */}
                  <h3 className="text-xl font-medium mb-3">
                    {step.title}
                  </h3>
                  
                  {/* Step description */}
                  <p className="text-base text-muted-foreground leading-relaxed flex-grow">
                    {step.description}
                  </p>
                </div>
                </Card>

                {/* Connection line for desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent translate-x-0 z-0" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

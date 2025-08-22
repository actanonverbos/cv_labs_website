"use client"

import { Card } from "@/components/ui/card"
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

export function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-28 bg-muted/5">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            <StaggeredText 
              highlightWords={["Process"]}
              delay={0.2}
              staggerDelay={0.2}
            >
              Our Proven Process
            </StaggeredText>
          </h2>
          <ScrollReveal delay={0.8}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              A systematic approach that ensures your landing page is built for maximum conversions from day one.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {processSteps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.1}>
              <div className="relative">
                <Card className="p-8 md:p-10 bg-card border border-border rounded-2xl h-full">
                <div className="text-center">
                  {/* Step number */}
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Step title */}
                  <h3 className="text-2xl font-medium mb-4">
                    {step.title}
                  </h3>
                  
                  {/* Step description */}
                  <p className="text-base text-muted-foreground leading-relaxed">
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

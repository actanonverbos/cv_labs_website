"use client"

import * as React from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"

const reviews = [
  {
    name: "0xForce",
    industry: "Web3",
    image: "/reviews/0xForce.jpg",
    review: "Results were always above expectations. Convert Labs helped me remove the pain of working with numerous different people. He helped deliver fast and respected deadlines."
  },
  {
    name: "ComfyRelax", 
    industry: "Web3",
    image: "/reviews/comfyRelax.jpg",
    review: "I have worked with Isaac multiple times and he is always responsive, professional and kind. His work is top tier and he understands the needs of his clients really well."
  },
  {
    name: "Younes On Sol",
    industry: "Web3", 
    image: "/reviews/Younes On Sol.jpg",
    review: "He was quick and has a great eye for design. We needed a new website and PFP generator and both came out top notch."
  },
  {
    name: "Boujee_101",
    industry: "Web3",
    image: "/reviews/boujee_101.jpeg", 
    review: "Working with Isaac is truly a pleasure. He delivers work promptly, maintaining a direct and efficient approach without any wasted time."
  },
  {
    name: "Jonathon",
    industry: "",
    image: "/reviews/jonathon.jpg",
    review: "I recently needed to publish a landing page using Framer. I had only worked with Figma for design and Wordpress for content management. Isaac quickly provided me with all the tools I needed to publish my website, I look forward to working with Isaac on future projects!"
  },
  {
    name: "Degen", 
    industry: "",
    image: "/reviews/Degen.jpg",
    review: "Convert Labs built the website for our meme coin. We hired Isaac a couple weeks ago and he's been a valuable asset since - taking our ideas and pushing them further than we'd imagined."
  }
]

function ReviewBadge({ industry }: { industry: string }) {
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

  if (!industry) return null

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
      {industry.toUpperCase()}
    </Badge>
  )
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28 bg-muted/5">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium mb-4">
            <StaggeredText 
              highlightWords={["Reviews"]}
              delay={0.2}
              staggerDelay={0.2}
            >
              Client Reviews
            </StaggeredText>
          </h2>
          <ScrollReveal delay={0.8}>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              See what our clients have to say about working with Convert Labs and the results we&apos;ve delivered.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ScrollReveal key={review.name} delay={index * 0.1}>
              <Card className="p-6 bg-card border border-border h-full">
                <div className="flex flex-col h-full">
                  {/* Industry badge */}
                  <ReviewBadge industry={review.industry} />
                  
                  {/* Review text */}
                  <blockquote className="text-base text-muted-foreground leading-relaxed flex-grow mb-6">
                    &ldquo;{review.review}&rdquo;
                  </blockquote>
                  
                  {/* Client info */}
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                      <Image
                        src={review.image}
                        alt={`${review.name} profile`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{review.name}</p>
                      {review.industry && (
                        <p className="text-sm text-muted-foreground">{review.industry}</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

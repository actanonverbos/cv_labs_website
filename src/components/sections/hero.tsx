"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/scroll-reveal"

export function HeroSection() {
  return (
    <section id="top" className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow pill */}
          <ScrollReveal delay={0.1}>
            <div className="flex justify-center mb-6">
              <Badge 
                variant="secondary" 
                className="rounded-2xl px-4 py-2 text-sm font-medium bg-black/10 backdrop-blur-sm text-foreground border border-black/20 hover:bg-black/15 dark:bg-white/10 dark:text-primary dark:border-white/20 dark:hover:bg-white/15 transition-all duration-200 eyebrow inline-flex items-center gap-2"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 bg-foreground dark:bg-white rounded-full"></div>
                  <div className="absolute w-2 h-2 bg-foreground dark:bg-white rounded-full animate-radar-ping"></div>
                </div>
                Limited slots available this month
              </Badge>
            </div>
          </ScrollReveal>

          {/* Main headline */}
          <ScrollReveal delay={0.2}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight tracking-tight">
              High-Converting Landing Pages That{" "}
              <span className="text-primary">Drive Results</span>
            </h1>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal delay={0.3}>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed font-medium">
              Get a conversion-optimized landing page that turns visitors into customers. 
              Fast launches, revenue-first UX, and performance-focused design.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                variant="default"
                className="px-6 py-3 text-base font-medium bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-100 rounded-lg border-0"
                asChild
              >
                <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">
                  Book an Intro Call
                </Link>
              </Button>
              <Button 
                variant="frosted"
                className="px-6 py-3 text-base font-medium rounded-lg"
                asChild
              >
                <Link href="#work">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          {/* Preview Screenshot */}
          <ScrollReveal delay={0.5}>
            <div className="relative max-w-5xl mx-auto">
              <Card className="p-2 bg-card/50 backdrop-blur border border-border shadow-2xl rounded-3xl overflow-hidden">
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background rounded-2xl overflow-hidden">
                {/* Placeholder for screenshot - will be replaced with actual image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-xl">CV</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-primary/20 rounded-full max-w-xs mx-auto"></div>
                      <div className="h-3 bg-primary/10 rounded-full max-w-sm mx-auto"></div>
                      <div className="h-3 bg-primary/10 rounded-full max-w-md mx-auto"></div>
                    </div>
                    <div className="flex gap-2 justify-center">
                      <div className="h-8 w-20 bg-primary/30 rounded-full"></div>
                      <div className="h-8 w-24 bg-primary/20 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"></div>
                </div>
                </Card>
              
              {/* Background glow */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 blur-3xl"></div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

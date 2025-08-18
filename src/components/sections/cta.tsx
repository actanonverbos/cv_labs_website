"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function CTASection() {
  return (
    <section id="cta" className="py-20 md:py-28 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="container-tight">
        <Card className="mx-auto p-8 md:p-12 text-center bg-card border border-border rounded-2xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Build Your High-Converting Landing Page?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed">
            Join hundreds of successful businesses who&apos;ve transformed their online presence with our conversion-focused approach.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              className="px-6 py-3 text-base font-medium bg-white text-black hover:bg-gray-100 rounded-lg border-0"
              asChild
            >
              <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">
                Book an Intro Call
              </Link>
            </Button>
            
            <div className="text-sm text-muted-foreground">
              <span className="block sm:inline">Free 30-minute consultation</span>
              <span className="hidden sm:inline mx-2">•</span>
              <span className="block sm:inline">No commitment required</span>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">2-3 weeks</div>
                <div className="text-sm text-muted-foreground">Average delivery</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">300%+</div>
                <div className="text-sm text-muted-foreground">Average conversion lift</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary mb-1">30 days</div>
                <div className="text-sm text-muted-foreground">Money-back guarantee</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

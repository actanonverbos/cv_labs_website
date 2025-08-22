"use client"

import { ScrollReveal } from "@/components/scroll-reveal"

export function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-muted/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-8 text-balance leading-tight">
              Built for founders. Designed to convert.
            </h2>
          </ScrollReveal>

          <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
            <ScrollReveal delay={0.2}>
              <p>
                Hi, I&apos;m Isaac — a designer and developer helping startups turn ideas into traction.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p>
                I specialize in building high-converting landing pages with sharp design, strategic copy, and fast turnarounds.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p>
                Over the past few years, I&apos;ve worked with early-stage teams, solo founders, and creators to ship pages that actually perform — not just look good.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <p className="font-medium text-foreground">
                Everything I build is clear, focused, and designed to convert.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <p className="text-base md:text-lg">
                Working async with clients around the world.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}

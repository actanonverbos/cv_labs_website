"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 bg-background">
      <div className="container-tight">
        <div className="text-left mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-2">
            <StaggeredText 
              highlightWords={["convert."]}
              delay={0.2}
              staggerDelay={0.1}
            >
              Built for founders. Designed to convert.
            </StaggeredText>
          </h2>
        </div>

        <div className="max-w-3xl">
          <div className="flex flex-col space-y-6">
            {/* Avatar */}
            <ScrollReveal delay={0.3}>
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden">
                <Image
                  src="/avatar.avif"
                  alt="Isaac - Designer and Developer"
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>
            </ScrollReveal>

            {/* Introduction - Each paragraph animates individually */}
            <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl text-left">
              <ScrollReveal delay={0.4}>
                <p>
                  Hi, I&apos;m <span className="text-foreground font-medium">Isaac</span> — a designer and developer helping startups turn ideas into traction.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.5}>
                <p>
                  I specialize in building high-converting landing pages with sharp design, strategic copy, and fast turnarounds.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.6}>
                <p>
                  Over the past few years, I&apos;ve worked with early-stage teams, solo founders, and creators to ship pages that actually perform — not just look good.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.7}>
                <p>
                  Everything I build is <span className="text-foreground font-medium">clear</span>, <span className="text-foreground font-medium">focused</span>, and <span className="text-foreground font-medium">designed to convert</span>.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.8}>
                <p className="text-sm text-muted-foreground/80 pt-2">
                  Working async with clients around the world.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
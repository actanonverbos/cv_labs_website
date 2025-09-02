"use client"

import Link from "next/link"
import { Mail, Youtube } from "lucide-react"
import { X } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"
import { motion } from "framer-motion"

const footerLinks = {
  company: [
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "Pricing", href: "#pricing" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "#" },
    { name: "Refund Policy", href: "#" },
  ],
  support: [
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "https://cal.com/isaac-cullinane/1-1" },
    { name: "Book a Call", href: "https://cal.com/isaac-cullinane/1-1" },
    { name: "Support", href: "mailto:support@convertlabs.cloud" },
  ]
}

const socialLinks = [
  { name: "X", href: "https://x.com/isaac_cullinane", icon: X },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCUrw7rsQTWcmVPty72E5NIw", icon: Youtube },
  { name: "Email", href: "mailto:hello@convertlabs.cloud", icon: Mail },
]

export function FooterSection() {
  return (
    <footer className="bg-black border-t border-border overflow-hidden">
      {/* Main footer content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Logo and tagline */}
          <div className="lg:col-span-2">
            <ScrollReveal delay={0.2}>
              <Link href="/" className="flex items-center mb-4">
                <span className="font-medium text-xl">
                  <StaggeredText 
                    highlightWords={["Convert"]}
                    delay={0.1}
                    staggerDelay={0.1}
                  >
                    Convert Labs
                  </StaggeredText>
                </span>
              </Link>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
                We create high-converting landing pages that turn your visitors into customers. 
                Fast, beautiful, and optimized for results.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <div className="flex space-x-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors hover-scale"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="sr-only">{link.name}</span>
                    </Link>
                  )
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Company links */}
          <div>
            <ScrollReveal delay={0.3}>
              <h3 className="font-medium mb-4">
                <StaggeredText 
                  delay={0.1}
                  staggerDelay={0.1}
                >
                  Company
                </StaggeredText>
              </h3>
            </ScrollReveal>
            <ScrollReveal delay={0.5}>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Support links */}
          <div>
            <ScrollReveal delay={0.35}>
              <h3 className="font-medium mb-4">
                <StaggeredText 
                  delay={0.1}
                  staggerDelay={0.1}
                >
                  Support
                </StaggeredText>
              </h3>
            </ScrollReveal>
            <ScrollReveal delay={0.55}>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          {/* Legal links */}
          <div>
            <ScrollReveal delay={0.4}>
              <h3 className="font-medium mb-4">
                <StaggeredText 
                  delay={0.1}
                  staggerDelay={0.1}
                >
                  Legal
                </StaggeredText>
              </h3>
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8">
          <ScrollReveal delay={0.4}>
            <div className="border-t border-border mb-8"></div>
          </ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <ScrollReveal delay={0.5}>
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} CV Labs. All rights reserved.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.6}>
              <p className="text-muted-foreground text-sm mt-4 md:mt-0">
                Made with ❤️ for businesses that want to grow.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
      
      {/* Large "Convert" text section - separate space below footer content */}
      <div className="relative h-40 md:h-48 lg:h-56 flex items-start justify-center -mt-4">
        <motion.div
          className="text-[12rem] md:text-[18rem] lg:text-[24rem] font-bold leading-none tracking-tight pointer-events-none select-none flex"
          style={{ 
            fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Oxygen", "Ubuntu", "Cantarell", sans-serif',
            fontWeight: 700,
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {"Convert".split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 50,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              style={{ 
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </footer>
  )
}

"use client"

import Link from "next/link"
import { Mail, Twitter, Linkedin, Github } from "lucide-react"

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
    { name: "Support", href: "mailto:support@cvlabs.dev" },
  ]
}

const socialLinks = [
  { name: "Twitter", href: "https://twitter.com/cvlabs", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/cvlabs", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/cvlabs", icon: Github },
  { name: "Email", href: "mailto:hello@cvlabs.dev", icon: Mail },
]

export function FooterSection() {
  return (
    <footer className="bg-black border-t border-border overflow-hidden">
      {/* Main footer content */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {/* Logo and tagline */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-4">
              <span className="font-medium text-xl">Convert Labs</span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              We create high-converting landing pages that turn your visitors into customers. 
              Fast, beautiful, and optimized for results.
            </p>
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
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-medium mb-4">Company</h3>
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
          </div>

          {/* Support links */}
          <div>
            <h3 className="font-medium mb-4">Support</h3>
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
          </div>

          {/* Legal links */}
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
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
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} CV Labs. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">
            Made with ❤️ for businesses that want to grow.
          </p>
        </div>
      </div>
      
      {/* Large "Convert" text section - separate space below footer content */}
      <div className="relative h-40 md:h-48 lg:h-56 flex items-start justify-center -mt-4">
        <span 
          className="text-[12rem] md:text-[18rem] lg:text-[24rem] font-bold leading-none tracking-tight pointer-events-none select-none"
          style={{ 
            fontFamily: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Oxygen", "Ubuntu", "Cantarell", sans-serif',
            fontWeight: 700,
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, transparent 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          Convert
        </span>
      </div>
    </footer>
  )
}

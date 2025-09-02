"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { StaggeredText } from "@/components/staggered-text"

const faqs = [
  {
    question: "Who do you work with?",
    answer: "I work with early-stage startups, solo founders, and teams across SaaS, AI, Web3, and service-based businesses. If you're building something smart and need to launch or automate it — I can help."
  },
  {
    question: "When can we start?",
    answer: "Usually within a week. I work with a small number of clients at a time to keep turnaround fast and attention focused."
  },
  {
    question: "How do we stay in touch?",
    answer: "Async-first: Telegram, Notion, email — whatever works for you. I'll send structured updates and Looms where needed. No endless calls necessary."
  },
  {
    question: "Do you offer support after launch?",
    answer: "Yes — you can add a support plan post-launch or request one-off updates when needed. Hosting, tweaks, automation extensions — it's flexible."
  },
  {
    question: "Can you build a site if I already have copy?",
    answer: "Yes — if you already have final copy, I can jump straight into design and development. That option starts at $1,750."
  }
]

export function FAQSection() {
  const [openItem, setOpenItem] = React.useState<string>("item-0")

  return (
    <section id="faq" className="py-16 md:py-20 bg-background">
      <div className="container-tight">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-2">
            <StaggeredText 
              className="block"
              highlightWords={["Answers"]}
              delay={0.2}
              staggerDelay={0.08}
            >
              Got Questions? We&apos;ve Got Answers
            </StaggeredText>
          </h2>
        </div>

        <div className="mx-auto">
          <Accordion 
            type="single" 
            value={openItem}
            onValueChange={setOpenItem}
            collapsible
            className="space-y-3"
          >
            {faqs.map((faq, index) => (
              <ScrollReveal key={index} delay={0.6 + (index * 0.1)}>
                <div 
                  className="bg-card rounded-2xl overflow-hidden hover:!bg-black/15 dark:hover:!bg-white/15 transition-colors duration-200 ease-in-out cursor-pointer"
                >
                <AccordionItem 
                  value={`item-${index}`}
                  className="border-0 bg-transparent"
                >
                <AccordionTrigger className="text-left py-4 px-6 hover:no-underline">
                  <span className="text-lg font-medium text-foreground">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-0">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
                </AccordionItem>
                </div>
              </ScrollReveal>
            ))}
          </Accordion>
        </div>

        <ScrollReveal delay={0.8}>
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Still have questions? <a href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Book a free consultation call →</a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

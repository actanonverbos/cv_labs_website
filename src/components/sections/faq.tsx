"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does it take?",
    answer: "Most projects are completed within 2-3 weeks from the initial discovery call. This includes design, development, content optimization, and one round of revisions. Rush delivery is available for an additional fee if you need it faster."
  },
  {
    question: "Do you handle development too?",
    answer: "Yes! We provide end-to-end service from design to deployment. Our team handles all the technical aspects including coding, hosting setup, analytics integration, and performance optimization so you don&apos;t have to worry about anything."
  },
  {
    question: "How do we start?",
    answer: "Simply book a discovery call using the button above. We'll discuss your goals, target audience, and requirements. After that, we'll send you a detailed proposal and timeline. Once approved, we begin with the discovery phase immediately."
  },
  {
    question: "Who do you work with?",
    answer: "We work with startups, small to medium businesses, and established companies across all industries. Our clients range from SaaS companies and e-commerce stores to professional services and non-profits. We adapt our approach to fit your specific market and audience."
  },
  {
    question: "What's the payment like?",
    answer: "We require 50% upfront to begin work and 50% upon completion and approval. For larger projects over £5,000, we can arrange a 3-payment schedule. We accept bank transfers, credit cards, and PayPal for your convenience."
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes! We provide 30 days of free support after launch for any bugs or minor adjustments. We also offer ongoing maintenance packages for regular updates, security monitoring, and performance optimization at competitive rates."
  },
  {
    question: "Are there refunds?",
    answer: "We offer a 30-day money-back guarantee if you&apos;re not satisfied with the final result. However, this only applies if we haven&apos;t met the agreed-upon requirements in our initial proposal. We&apos;re confident in our work and want you to be completely happy."
  }
]

export function FAQSection() {
  const [openItem, setOpenItem] = React.useState<string>("item-0")

  return (
    <section id="faq" className="py-16 md:py-20 bg-background">
      <div className="container-tight">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-medium mb-2">
            Got Questions? We&apos;ve Got Answers
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
              <div 
                key={index}
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
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Still have questions? <a href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">Book a free consultation call →</a>
          </p>
        </div>
      </div>
    </section>
  )
}

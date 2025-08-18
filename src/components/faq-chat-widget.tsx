"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, Send, Calendar, Eye, DollarSign, ArrowLeft } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  actions?: Array<{
    label: string
    href: string
    icon?: React.ReactNode
    variant?: 'default' | 'outline'
  }>
}

const faqs: FAQ[] = [
  {
    id: '1',
    question: "💰 How much do your services cost?",
    answer: "Great question! Our pricing starts from £1,497 for essential landing pages and goes up to £4,997 for premium packages. Each includes design, development, and optimization.",
    actions: [
      {
        label: "View Pricing",
        href: "#pricing",
        icon: <DollarSign className="w-4 h-4" />,
        variant: 'default'
      }
    ]
  },
  {
    id: '2',
    question: "👀 Can I see examples of your work?",
    answer: "Absolutely! We've helped hundreds of businesses create high-converting landing pages. Check out our portfolio to see real results.",
    actions: [
      {
        label: "View Our Work",
        href: "#work",
        icon: <Eye className="w-4 h-4" />,
        variant: 'default'
      }
    ]
  },
  {
    id: '3',
    question: "⏱️ How long does the process take?",
    answer: "Most projects are completed within 2-3 weeks from our initial discovery call. This includes design, development, content optimization, and one round of revisions.",
    actions: [
      {
        label: "Book a Call",
        href: "https://cal.com/isaac-cullinane/1-1",
        icon: <Calendar className="w-4 h-4" />,
        variant: 'default'
      }
    ]
  },
  {
    id: '4',
    question: "⚙️ Do you handle development too?",
    answer: "Yes! We provide end-to-end service from design to deployment. Our team handles all technical aspects including coding, hosting setup, and analytics integration."
  },
  {
    id: '5',
    question: "📦 What's included in your service?",
    answer: "Every project includes custom design, responsive development, performance optimization, analytics setup, and 30 days of free support after launch."
  },
  {
    id: '6',
    question: "💳 What's the payment structure?",
    answer: "We require 50% upfront to begin work and 50% upon completion. For larger projects over £5,000, we can arrange a 3-payment schedule. We accept bank transfers, credit cards, and PayPal."
  },
  {
    id: '7',
    question: "🔄 Do you offer ongoing support?",
    answer: "Yes! We provide 30 days of free support after launch for any bugs or minor adjustments. We also offer ongoing maintenance packages for regular updates and optimization."
  },
  {
    id: '8',
    question: "🚀 How do I get started?",
    answer: "Simply book a discovery call or message me on Telegram for quick questions. We'll discuss your goals and provide a detailed proposal.",
    actions: [
      {
        label: "Book Free Call",
        href: "https://cal.com/isaac-cullinane/1-1",
        icon: <Calendar className="w-4 h-4" />,
        variant: 'default'
      },
      {
        label: "Message on Telegram",
        href: "https://t.me/collect_0x",
        icon: <Send className="w-4 h-4" />,
        variant: 'outline'
      }
    ]
  }
]

export function FAQChatWidget() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedFaq, setSelectedFaq] = React.useState<FAQ | null>(null)
  const [showContact, setShowContact] = React.useState(false)
  const [chatMessages, setChatMessages] = React.useState<Array<{id: string, text: string, type: 'bot' | 'user', actions?: FAQ['actions']}>>([])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      // Reset to initial state when opening
      setSelectedFaq(null)
      setShowContact(false)
      setChatMessages([{
        id: 'welcome',
        text: "Hi there! 👋 I'm here to help answer your questions. What would you like to know?",
        type: 'bot'
      }])
    }
  }

  const handleContactClick = () => {
    setShowContact(true)
    setSelectedFaq(null)
  }

  const handleQuestionClick = (faq: FAQ) => {
    // Add user question to chat
    const userMessage = {
      id: `user-${faq.id}`,
      text: faq.question,
      type: 'user' as const
    }
    
    // Add bot response to chat
    const botMessage = {
      id: `bot-${faq.id}`,
      text: faq.answer,
      type: 'bot' as const,
      actions: faq.actions
    }

    setChatMessages([userMessage, botMessage])
    setSelectedFaq(faq)
  }

  const handleBackToQuestions = () => {
    setSelectedFaq(null)
    setShowContact(false)
    setChatMessages([{
      id: 'welcome',
      text: "Hi there! 👋 I'm here to help answer your questions. What would you like to know?",
      type: 'bot'
    }])
  }

  React.useEffect(() => {
    if (isOpen && chatMessages.length === 0) {
      setChatMessages([{
        id: 'welcome',
        text: "Hi there! 👋 I'm here to help answer your questions. What would you like to know?",
        type: 'bot'
      }])
    }
  }, [isOpen, chatMessages.length])

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Chat Window */}
        {isOpen && (
          <Card className="mb-4 w-80 md:w-96 h-[500px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">CV Labs Assistant</h3>
                  <p className="text-xs opacity-90">Usually replies instantly</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggle}
                className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto bg-background">
              {showContact ? (
                /* Contact Page */
                <div className="p-4 space-y-6">
                  {/* Contact Message */}
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-2xl bg-card border border-border text-foreground rounded-bl-sm">
                      <p className="text-sm leading-relaxed">
                        Ready to get started? Choose how you&apos;d like to get in touch:
                      </p>
                    </div>
                  </div>

                  {/* Contact Options */}
                  <div className="space-y-4">
                    <div className="bg-card border border-border rounded-2xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Book a Call</h4>
                          <p className="text-xs text-muted-foreground">Free 30-minute consultation</p>
                        </div>
                      </div>
                      <Button
                        asChild
                        className="w-full text-base font-medium px-6 py-3 rounded-lg"
                        style={{
                          backgroundColor: '#000000',
                          color: '#ffffff',
                        }}
                      >
                        <Link 
                          href="https://cal.com/isaac-cullinane/1-1" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Book an Intro Call
                        </Link>
                      </Button>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Send className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">Quick Message</h4>
                          <p className="text-xs text-muted-foreground">Get instant response</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        asChild
                        className="w-full text-base font-medium px-6 py-3 rounded-lg backdrop-blur-sm"
                        style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.1)',
                          color: '#020817',
                          borderColor: 'rgba(0, 0, 0, 0.2)',
                          borderWidth: '1px',
                          borderStyle: 'solid'
                        }}
                      >
                        <Link 
                          href="https://t.me/collect_0x" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          Message on Telegram
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Back Button for Contact Page */}
                  <div className="p-4 border-t border-border bg-card">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBackToQuestions}
                      className="w-full text-center justify-center px-6 py-3 rounded-lg backdrop-blur-sm"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        color: '#020817',
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                        borderWidth: '1px',
                        borderStyle: 'solid'
                      }}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Questions
                    </Button>
                  </div>
                </div>
              ) : !selectedFaq ? (
                /* Question Selection */
                <div className="p-4 space-y-4">
                  {/* Welcome Message */}
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-2xl bg-card border border-border text-foreground rounded-bl-sm">
                      <p className="text-sm leading-relaxed">
                        Hi there! 👋 I&apos;m here to help answer your questions. What would you like to know?
                      </p>
                    </div>
                  </div>

                  {/* Question Buttons */}
                  <div className="space-y-2">
                    {faqs.map((faq) => (
                      <Button
                        key={faq.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuestionClick(faq)}
                        className="w-full text-left justify-start text-sm h-auto p-3 whitespace-normal bg-muted/20 hover:bg-muted/40 border border-border/50"
                      >
                        {faq.question}
                      </Button>
                    ))}
                  </div>

                  {/* Contact CTA */}
                  <div className="mt-6">
                    <div className="text-center mb-4">
                      <p className="text-sm text-muted-foreground">
                        Ready to get started?
                      </p>
                    </div>
                    <Button
                      onClick={handleContactClick}
                      className="w-full text-base font-medium px-6 py-3 rounded-lg"
                      style={{
                        backgroundColor: '#000000',
                        color: '#ffffff',
                      }}
                    >
                      Contact
                    </Button>
                  </div>
                </div>
              ) : (
                /* Chat View */
                <div className="flex flex-col h-full">
                  {/* Chat Messages */}
                  <div className="flex-1 p-4 space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'bot' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-2xl ${
                            message.type === 'bot'
                              ? 'bg-card border border-border text-foreground rounded-bl-sm'
                              : 'bg-primary text-primary-foreground rounded-br-sm'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {message.text}
                          </p>
                          {message.actions && (
                            <div className="mt-4 pt-3 border-t border-border/50">
                              <p className="text-xs text-muted-foreground mb-3">
                                Ready to get started?
                              </p>
                              <Button
                                onClick={handleContactClick}
                                className="w-full text-xs font-medium px-4 py-2 rounded-lg"
                                style={{
                                  backgroundColor: '#ffffff',
                                  color: '#000000',
                                }}
                              >
                                Contact
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Back Button at Bottom */}
                  <div className="p-4 border-t border-border bg-card">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBackToQuestions}
                      className="w-full text-center justify-center px-6 py-3 rounded-lg backdrop-blur-sm"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        color: '#020817',
                        borderColor: 'rgba(0, 0, 0, 0.2)',
                        borderWidth: '1px',
                        borderStyle: 'solid'
                      }}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Questions
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Toggle Button - Only show when chat is closed */}
        {!isOpen && (
          <div className="relative">
            <Button
              onClick={handleToggle}
              size="lg"
              className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl border-2 border-primary-foreground/10 hover:shadow-primary/25 hover:border-primary-foreground/20 transition-all duration-300 hover:scale-105 relative z-10"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            
            {/* Pulsing Ring Animation */}
            <div className="absolute inset-0 rounded-full bg-primary animate-radar-ping opacity-75 pointer-events-none"></div>
          </div>
        )}
      </div>
    </>
  )
}

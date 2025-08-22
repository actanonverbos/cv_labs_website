import { client, TEMPLATE_QUERY } from '@/lib/sanity'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollReveal } from '@/components/scroll-reveal'
import { FooterSection } from '@/components/sections/footer'
import { FAQChatWidget } from '@/components/faq-chat-widget'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Download, Check } from 'lucide-react'
import { notFound } from 'next/navigation'

type Template = {
  _id: string
  title: string
  subtitle: string
  description: string
  longDescription?: string
  category: string
  badge: "FREE" | "PREMIUM"
  price: number
  features: string[]
  previewImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  additionalImages?: Array<{
    asset: {
      _ref: string
    }
    alt?: string
    caption?: string
  }>
  demoUrl?: string
  downloadUrl: string
  techStack?: string[]
  includedFiles?: string[]
  slug: { current: string }
}

async function getTemplate(slug: string): Promise<Template | null> {
  try {
    const template = await client.fetch(TEMPLATE_QUERY, { slug })
    return template || null
  } catch (error) {
    console.error('Error fetching template:', error)
    return null
  }
}

// Fallback function for when Sanity template is not found
function getFallbackTemplate(slug: string): Template | null {
  const fallbackTemplates = [
    {
      _id: "1",
      title: "INBOX PULSE",
      subtitle: "The Tech Edge You Need, Delivered Weekly",
      description: "Get the latest tech trends, AI breakthroughs, and industry insights delivered weekly to your inbox.",
      longDescription: "INBOX PULSE is a comprehensive newsletter template designed for tech enthusiasts and industry professionals. This template includes everything you need to create a professional weekly newsletter that keeps your audience engaged with the latest technology trends, AI breakthroughs, and industry insights.\n\nThe template features a clean, modern design that's optimized for both desktop and mobile reading. It includes customizable sections for featured articles, quick tech tips, industry news roundup, and sponsor highlights.",
      category: "newsletter",
      badge: "FREE" as const,
      price: 0,
      features: ["Lightning Fast Setup", "One-Click Import", "Custom Built Components", "Easy Setup Guide", "Mobile Responsive", "Email Integration"],
      downloadUrl: "https://cal.com/isaac-cullinane/1-1",
      techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      includedFiles: ["Newsletter template", "Email components", "Setup guide", "Style customization"],
      slug: { current: "inbox-pulse" }
    }
  ]
  
  return fallbackTemplates.find(t => t.slug.current === slug) || null
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let template = await getTemplate(slug)
  
  // If no template found in Sanity, try fallback
  if (!template) {
    template = getFallbackTemplate(slug)
  }

  if (!template) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container">
            <div className="max-w-7xl mx-auto">
              <ScrollReveal delay={0.1}>
                <Button 
                  variant="frosted"
                  className="mb-12"
                  asChild
                >
                  <Link href="/templates">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Templates
                  </Link>
                </Button>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                {/* Template Preview - Two Images Stacked */}
                <div className="space-y-6">
                  <ScrollReveal delay={0.2}>
                    {template.previewImage ? (
                      <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-2xl">
                        <Image
                          src={urlFor(template.previewImage).width(600).height(450).url()}
                          alt={template.previewImage.alt || template.title}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 via-primary/10 to-background rounded-2xl flex items-center justify-center shadow-2xl">
                        <div className="text-center space-y-3">
                          <div className="w-24 h-24 mx-auto rounded-3xl bg-primary/20 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
                              <span className="text-primary-foreground font-bold text-lg">{template.title.slice(0, 2)}</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="h-3 bg-primary/20 rounded-full w-48 mx-auto"></div>
                            <div className="h-3 bg-primary/10 rounded-full w-36 mx-auto"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </ScrollReveal>

                  {/* Second Image */}
                  <ScrollReveal delay={0.3}>
                    {template.additionalImages && template.additionalImages.length > 0 ? (
                      <div className="aspect-[4/3] relative overflow-hidden rounded-2xl shadow-2xl">
                        <Image
                          src={urlFor(template.additionalImages[0]).width(600).height(450).url()}
                          alt={template.additionalImages[0].alt || `${template.title} screenshot`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-[4/3] bg-gradient-to-br from-muted/20 via-muted/10 to-background rounded-2xl flex items-center justify-center shadow-2xl">
                        <div className="text-center space-y-3">
                          <div className="w-16 h-16 mx-auto rounded-2xl bg-muted/30 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center">
                              <span className="text-muted-foreground font-bold text-sm">+</span>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">Additional Preview</p>
                        </div>
                      </div>
                    )}
                  </ScrollReveal>
                </div>

                {/* Template Info */}
                <div className="space-y-8 pt-4">
                  <ScrollReveal delay={0.2}>
                    <div className="space-y-6">
                      <h1 className="text-4xl md:text-5xl font-medium leading-tight tracking-tight">
                        {template.title}
                      </h1>
                      
                      <div className="flex items-center gap-3 flex-wrap">
                        <Badge 
                          variant="secondary"
                          className={`font-semibold text-xs px-3 py-1.5 ${
                            template.badge === "FREE" 
                              ? "bg-green-100 text-green-700 border-green-200" 
                              : "bg-orange-100 text-orange-700 border-orange-200"
                          }`}
                        >
                          {template.badge}
                        </Badge>
                        <Badge variant="outline" className="text-xs px-3 py-1.5 uppercase font-medium">
                          {template.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs px-3 py-1.5 uppercase font-medium">
                          POPULAR
                        </Badge>
                      </div>

                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {template.subtitle}
                      </p>

                      <div className="space-y-4">
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {template.description}
                        </p>
                        
                        {template.longDescription && (
                          <div className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">
                            {template.longDescription}
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-base font-semibold">Compatible with:</h3>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">⚡</span>
                          </div>
                          <span className="text-base text-muted-foreground font-medium">Framer</span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Action Buttons */}
                  <ScrollReveal delay={0.3}>
                    <div className="space-y-4">
                      <Button 
                        className="w-full px-8 py-4 text-base font-semibold bg-white text-black hover:bg-gray-100 rounded-xl border-0 shadow-sm"
                        asChild
                      >
                        <Link href={template.downloadUrl} target="_blank" rel="noopener noreferrer">
                          {template.price === 0 ? 'Instant Access - $0' : `Access Template - $${template.price}`}
                          <span className="ml-3">→</span>
                        </Link>
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className="w-full px-8 py-4 text-base font-semibold rounded-xl border-2"
                        asChild
                      >
                        <Link href={template.demoUrl || template.downloadUrl} target="_blank" rel="noopener noreferrer">
                          Preview
                          <span className="ml-3">→</span>
                        </Link>
                      </Button>
                    </div>
                  </ScrollReveal>


                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Templates */}
        <section className="py-20 bg-muted/5">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal delay={0.1}>
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">More Templates</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover other high-quality templates to accelerate your next project
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Template 1 */}
                <ScrollReveal delay={0.2}>
                  <Link href="/templates/creatorlink" className="group">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">CL</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">CREATORLINK</h3>
                          <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">FREE</div>
                        </div>
                        <div className="text-xs text-muted-foreground uppercase mb-2">Link in Bio</div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>

                {/* Template 2 */}
                <ScrollReveal delay={0.3}>
                  <Link href="/templates/skillset" className="group">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">SK</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">SKILLSET</h3>
                          <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">FREE</div>
                        </div>
                        <div className="text-xs text-muted-foreground uppercase mb-2">Landing Page</div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>

                {/* Template 3 */}
                <ScrollReveal delay={0.4}>
                  <Link href="/templates/inbox-pulse" className="group">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">IP</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">INBOX PULSE</h3>
                          <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">FREE</div>
                        </div>
                        <div className="text-xs text-muted-foreground uppercase mb-2">Newsletter</div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal delay={0.1}>
                <div className="p-8 bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-primary/20 rounded-2xl">
                  <h3 className="text-2xl font-semibold mb-4">Need a Custom Template?</h3>
                  <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                    Looking for something specific? We create custom templates tailored to your exact needs and brand requirements.
                  </p>
                  <Button 
                    variant="default"
                    asChild
                  >
                    <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">
                      Get Custom Template
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
      <FAQChatWidget />
    </div>
  )
}


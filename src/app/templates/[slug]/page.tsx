import { client, TEMPLATE_QUERY } from '@/lib/sanity'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ScrollReveal } from '@/components/scroll-reveal'
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
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal delay={0.1}>
                <Button 
                  variant="frosted"
                  className="mb-8"
                  asChild
                >
                  <Link href="/templates">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Templates
                  </Link>
                </Button>
              </ScrollReveal>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Template Preview */}
                <div className="space-y-6">
                  <ScrollReveal delay={0.2}>
                    {template.previewImage ? (
                      <div className="aspect-video relative overflow-hidden rounded-2xl">
                        <Image
                          src={urlFor(template.previewImage).width(800).height(450).url()}
                          alt={template.previewImage.alt || template.title}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background rounded-2xl flex items-center justify-center">
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

                  {/* Additional Images */}
                  {template.additionalImages && template.additionalImages.length > 0 && (
                    <ScrollReveal delay={0.3}>
                      <div className="grid grid-cols-2 gap-4">
                        {template.additionalImages.slice(0, 4).map((image, index) => (
                          <div key={index} className="aspect-video relative overflow-hidden rounded-xl">
                            <Image
                              src={urlFor(image).width(400).height(225).url()}
                              alt={image.alt || `${template.title} screenshot ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </ScrollReveal>
                  )}
                </div>

                {/* Template Info */}
                <div className="space-y-8">
                  <ScrollReveal delay={0.2}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant="secondary"
                          className={`font-semibold ${
                            template.badge === "FREE" 
                              ? "bg-green-100 text-green-700 border-green-200" 
                              : "bg-primary/10 text-primary border-primary/20"
                          }`}
                        >
                          {template.badge}
                        </Badge>
                        <Badge variant="outline">
                          {template.category}
                        </Badge>
                      </div>

                      <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                        {template.title}
                      </h1>
                      
                      <p className="text-xl text-muted-foreground leading-relaxed">
                        {template.subtitle}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="text-3xl font-bold">
                          {template.price === 0 ? 'Free' : `$${template.price}`}
                        </div>
                        {template.price > 0 && (
                          <span className="text-muted-foreground">One-time purchase</span>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Action Buttons */}
                  <ScrollReveal delay={0.3}>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button 
                        className="flex-1 px-6 py-3 text-base font-medium bg-white text-black hover:bg-gray-100 rounded-lg border-0"
                        asChild
                      >
                        <Link href={template.downloadUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="w-4 h-4 mr-2" />
                          {template.price === 0 ? 'Download Free' : 'Purchase Template'}
                        </Link>
                      </Button>
                      
                      {template.demoUrl && (
                        <Button 
                          variant="frosted"
                          className="px-6 py-3 text-base font-medium rounded-lg"
                          asChild
                        >
                          <Link href={template.demoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                    </div>
                  </ScrollReveal>

                  {/* Features */}
                  <ScrollReveal delay={0.4}>
                    <Card className="p-6 bg-card border border-border rounded-2xl">
                      <h3 className="text-lg font-semibold mb-4">What&apos;s Included</h3>
                      <div className="space-y-3">
                        {template.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </ScrollReveal>

                  {/* Tech Stack */}
                  {template.techStack && template.techStack.length > 0 && (
                    <ScrollReveal delay={0.5}>
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {template.techStack.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </ScrollReveal>
                  )}

                  {/* Included Files */}
                  {template.includedFiles && template.includedFiles.length > 0 && (
                    <ScrollReveal delay={0.6}>
                      <div>
                        <h3 className="text-lg font-semibold mb-3">Included Files</h3>
                        <ul className="space-y-2">
                          {template.includedFiles.map((file, index) => (
                            <li key={index} className="flex items-center gap-2 text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              {file}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </ScrollReveal>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        {template.longDescription && (
          <section className="py-20 bg-muted/5">
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <ScrollReveal delay={0.1}>
                  <div className="prose prose-lg max-w-none">
                    <h2 className="text-2xl font-semibold mb-6">About This Template</h2>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {template.longDescription}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        )}

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
    </div>
  )
}

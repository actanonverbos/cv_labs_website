import { client, POST_QUERY } from '@/lib/sanity'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { FooterSection } from '@/components/sections/footer'
import { FAQChatWidget } from '@/components/faq-chat-widget'
import { FixedPortfolioCTA } from '@/components/fixed-portfolio-cta'
import { ReadingProgress } from '@/components/reading-progress'
import { PortableText, type PortableTextBlock } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

type Post = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  mainImage?: {
    asset: {
      _ref: string
    }
    alt?: string
  }
  categories: string[]
  author: {
    name: string
    image?: {
      asset: {
        _ref: string
      }
    }
  }
  body: PortableTextBlock[]
}

async function getPost(slug: string): Promise<Post | null> {
  return await client.fetch(POST_QUERY, { slug })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <ReadingProgress />
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <ScrollReveal delay={0.1}>
                <Button 
                  variant="frosted"
                  className="mb-8"
                  asChild
                >
                  <Link href="/blog">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Blog
                  </Link>
                </Button>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="text-center mb-8">
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {post.categories.map((category) => (
                        <Badge 
                          key={category}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-balance leading-tight tracking-tight">
                    {post.title}
                  </h1>

                  <div className="flex items-center justify-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      {post.author.image && (
                        <Image
                          src={urlFor(post.author.image).width(32).height(32).url()}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      )}
                      <span>{post.author.name}</span>
                    </div>
                    <span>•</span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
              </ScrollReveal>

              {/* Featured Image */}
              {post.mainImage && (
                <ScrollReveal delay={0.3}>
                  <div className="aspect-video relative overflow-hidden rounded-2xl mb-12">
                    <Image
                      src={urlFor(post.mainImage).width(1200).height(600).url()}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-0 pb-20 md:pb-28">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <ScrollReveal delay={0.4}>
                <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                  <PortableText 
                    value={post.body}
                    components={{
                      types: {
                        image: ({ value }) => (
                          <div className="my-8">
                            <Image
                              src={urlFor(value).width(800).height(400).url()}
                              alt={value.alt || 'Blog image'}
                              width={800}
                              height={400}
                              className="rounded-xl"
                            />
                            {value.caption && (
                              <p className="text-sm text-muted-foreground mt-2 text-center">
                                {value.caption}
                              </p>
                            )}
                          </div>
                        ),
                      },
                      block: {
                        normal: ({ children }) => (
                          <p className="mb-6 text-lg leading-relaxed text-foreground/90">
                            {children}
                          </p>
                        ),
                        h1: ({ children }) => (
                          <h1 className="text-3xl md:text-4xl font-semibold mb-8 mt-12 tracking-tight text-foreground">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl md:text-3xl font-semibold mb-6 mt-10 tracking-tight text-foreground">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl md:text-2xl font-semibold mb-4 mt-8 tracking-tight text-foreground">
                            {children}
                          </h3>
                        ),
                      },
                      marks: {
                        strong: ({ children }) => (
                          <strong className="font-semibold text-foreground">
                            {children}
                          </strong>
                        ),
                        link: ({ children, value }) => (
                          <a
                            href={value.href}
                            target={value.blank ? '_blank' : undefined}
                            rel={value.blank ? 'noopener noreferrer' : undefined}
                            className="text-primary hover:underline font-medium transition-colors"
                          >
                            {children}
                          </a>
                        ),
                      },
                    }}
                  />
                </div>
              </ScrollReveal>

              {/* CTA */}
              <ScrollReveal delay={0.5}>
                <div data-blog-cta className="mt-16 p-8 bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-primary/20 rounded-2xl text-center">
                  <h3 className="text-xl font-semibold mb-4">Ready to Build Your High-Converting Website?</h3>
                  <p className="text-muted-foreground mb-6">
                    Let&apos;s discuss how we can help transform your online presence with conversion-focused design.
                  </p>
                  <Button 
                    variant="default"
                    asChild
                  >
                    <Link href="https://cal.com/isaac-cullinane/1-1" target="_blank" rel="noopener noreferrer">
                      Book a Free Consultation
                    </Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Related Blog Posts */}
        <section data-related-articles className="py-20 bg-muted/5">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <ScrollReveal delay={0.1}>
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Related Articles</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover more insights and strategies to grow your business
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Blog Post 1 */}
                <ScrollReveal delay={0.2}>
                  <Link href="/blog/getting-started" className="group">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">CV</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">Design</div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Getting Started with High-Converting Landing Pages</h3>
                        <div className="text-sm text-muted-foreground">
                          <span>Convert Labs</span> • <span>Dec 15, 2024</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>

                {/* Blog Post 2 */}
                <ScrollReveal delay={0.3}>
                  <Link href="/blog/design-principles" className="group">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">CV</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">Strategy</div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">5 Design Principles for Better Conversions</h3>
                        <div className="text-sm text-muted-foreground">
                          <span>Convert Labs</span> • <span>Dec 10, 2024</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>

                {/* Blog Post 3 */}
                <ScrollReveal delay={0.4}>
                  <Link href="/blog/optimization-tips" className="group">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center space-y-3">
                            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                              <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground font-bold text-sm">CV</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded font-semibold">Tips</div>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Website Optimization Tips That Actually Work</h3>
                        <div className="text-sm text-muted-foreground">
                          <span>Convert Labs</span> • <span>Dec 5, 2024</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
      <FAQChatWidget />
      <FixedPortfolioCTA />
    </div>
  )
}

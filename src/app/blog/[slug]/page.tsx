import { client, POST_QUERY } from '@/lib/sanity'
import { Navigation } from '@/components/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollReveal } from '@/components/scroll-reveal'
import { PortableText } from '@portabletext/react'
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
  body: any[]
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

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight tracking-tight">
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
                      marks: {
                        link: ({ children, value }) => (
                          <a
                            href={value.href}
                            target={value.blank ? '_blank' : undefined}
                            rel={value.blank ? 'noopener noreferrer' : undefined}
                            className="text-primary hover:underline"
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
                <div className="mt-16 p-8 bg-gradient-to-br from-primary/5 via-background to-primary/10 border border-primary/20 rounded-2xl text-center">
                  <h3 className="text-xl font-semibold mb-4">Ready to Build Your High-Converting Website?</h3>
                  <p className="text-muted-foreground mb-6">
                    Let's discuss how we can help transform your online presence with conversion-focused design.
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
      </main>
    </div>
  )
}

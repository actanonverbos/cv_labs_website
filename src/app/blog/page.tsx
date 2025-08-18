"use client"

import * as React from 'react'
import { client, POSTS_QUERY } from '@/lib/sanity'
import { Navigation } from '@/components/navigation'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollReveal } from '@/components/scroll-reveal'
import { urlFor } from '@/sanity/lib/image'
import { type PortableTextBlock } from '@portabletext/react'
import Link from 'next/link'
import Image from 'next/image'

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
  author: string
  body: PortableTextBlock[]
}

async function getPosts(): Promise<Post[]> {
  return await client.fetch(POSTS_QUERY)
}

function BlogBadge() {
  const [badgeRef, setBadgeRef] = React.useState<HTMLElement | null>(null)
  
  React.useEffect(() => {
    // Set up mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          
          if (badgeRef) {
            badgeRef.style.setProperty('--badge-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
            badgeRef.style.setProperty('--badge-text', isDark ? '#ffffff' : '#020817')
            badgeRef.style.setProperty('--badge-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
            badgeRef.style.setProperty('--dot-color', isDark ? '#ffffff' : '#020817')
          }
        }
      })
    })
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [badgeRef])

  return (
    <div className="flex justify-center mb-6">
      <Badge 
        variant="secondary" 
        className="rounded-md px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all duration-200 eyebrow inline-flex items-center gap-2"
        style={{
          backgroundColor: 'var(--badge-bg, rgba(0, 0, 0, 0.1))',
          color: 'var(--badge-text, #020817)',
          borderColor: 'var(--badge-border, rgba(0, 0, 0, 0.2))',
          borderWidth: '1px',
          borderStyle: 'solid'
        }}
        ref={(el) => {
          if (el) {
            setBadgeRef(el)
            
            // Set initial colors
            const isDark = document.documentElement.classList.contains('dark')
            el.style.setProperty('--badge-bg', isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)')
            el.style.setProperty('--badge-text', isDark ? '#ffffff' : '#020817')
            el.style.setProperty('--badge-border', isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
            el.style.setProperty('--dot-color', isDark ? '#ffffff' : '#020817')
          }
        }}
      >
        <div className="relative flex items-center justify-center">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--dot-color, #020817)' }}
          ></div>
          <div 
            className="absolute w-2 h-2 rounded-full animate-radar-ping"
            style={{ backgroundColor: 'var(--dot-color, #020817)' }}
          ></div>
        </div>
        Latest insights and updates
      </Badge>
    </div>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = React.useState<Post[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchPosts() {
      try {
        const fetchedPosts = await getPosts()
        setPosts(fetchedPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main>
          <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-background">
            <div className="container">
              <div className="max-w-4xl mx-auto text-center">
                <div className="animate-pulse">
                  <div className="h-8 bg-muted rounded-md w-48 mx-auto mb-6"></div>
                  <div className="h-16 bg-muted rounded-md w-96 mx-auto mb-6"></div>
                  <div className="h-6 bg-muted rounded-md w-80 mx-auto"></div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-background">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <ScrollReveal delay={0.1}>
                <BlogBadge />
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight tracking-tight">
                  Convert Labs{" "}
                  <span className="text-primary">Blog</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance leading-relaxed font-medium">
                  Insights, tips, and strategies for building high-converting websites and growing your business online
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pt-8 pb-20 md:pt-12 md:pb-28 bg-muted/5">
          <div className="container">
            {posts.length === 0 ? (
              <div className="text-center">
                <ScrollReveal delay={0.1}>
                  <div className="max-w-md mx-auto">
                    <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
                    <p className="text-muted-foreground">
                      We&apos;re working on some great content for you. Check back soon for our latest insights and tips!
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <ScrollReveal key={post._id} delay={0.1 * (index + 1)}>
                    <Link href={`/blog/${post.slug.current}`}>
                      <Card className="group overflow-hidden bg-card border border-border rounded-2xl hover:shadow-xl transition-all duration-300">
                        {/* Featured Image */}
                        {post.mainImage ? (
                          <div className="aspect-video relative overflow-hidden">
                            <Image
                              src={urlFor(post.mainImage).width(600).height(400).url()}
                              alt={post.mainImage.alt || post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-primary/20 via-primary/10 to-background relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="text-center space-y-3">
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                                  <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-sm">CV</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="h-2 bg-primary/20 rounded-full w-32 mx-auto"></div>
                                  <div className="h-2 bg-primary/10 rounded-full w-24 mx-auto"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="p-6">
                          {/* Categories */}
                          {post.categories && post.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {post.categories.slice(0, 2).map((category) => (
                                <Badge 
                                  key={category}
                                  variant="secondary"
                                  className="text-xs bg-primary/10 text-primary border-primary/20"
                                >
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Title */}
                          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>

                          {/* Meta */}
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>{post.author}</span>
                            <time dateTime={post.publishedAt}>
                              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </time>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

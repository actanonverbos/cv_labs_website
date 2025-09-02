import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from '../../sanity/env'
import { BlogPostInput, GeneratedContent, UnsplashImage, SanityImageAsset } from './types'

// Generate unique key for Sanity arrays
const generateKey = () => Math.random().toString(36).substring(2, 15)

// Create a client with write permissions
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false
})

export const uploadImageToSanity = async (image: UnsplashImage): Promise<SanityImageAsset> => {
  try {
    // Download the image
    const response = await fetch(image.url)
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`)
    }

    const imageBuffer = await response.arrayBuffer()
    
    // Upload to Sanity
    const asset = await client.assets.upload('image', Buffer.from(imageBuffer), {
      filename: `unsplash-${image.id}.jpg`
    })

    return {
      _id: asset._id,
      url: asset.url
    }
  } catch (error) {
    console.error('Error uploading image to Sanity:', error)
    throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const createBlogPost = async (
  input: BlogPostInput,
  content: GeneratedContent,
  imageAsset?: SanityImageAsset,
  config: { publishImmediately: boolean; defaultAuthor?: string; defaultCategory?: string } = { publishImmediately: false }
): Promise<string> => {
  try {
    // Find or create author
    const authorId = await findOrCreateAuthor(input.author_name || config.defaultAuthor || 'Convert Labs Team')
    
    // Find or create category
    const categoryIds = await findOrCreateCategories([input.category || config.defaultCategory || 'Web Design'])

    // Convert markdown content to Sanity's block content
    const bodyBlocks = convertMarkdownToBlocks(content.content)

    const postData = {
      _type: 'post',
      title: content.title,
      slug: {
        _type: 'slug',
        current: content.slug
      },
      author: {
        _type: 'reference',
        _ref: authorId
      },
      categories: categoryIds.map(id => ({
        _key: generateKey(),
        _type: 'reference',
        _ref: id
      })),
      publishedAt: config.publishImmediately ? new Date().toISOString() : undefined,
      body: bodyBlocks,
      ...(imageAsset && {
        mainImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          },
          alt: content.title
        }
      })
    }

    const result = await client.create(postData)
    return result._id
  } catch (error) {
    console.error('Error creating blog post in Sanity:', error)
    throw new Error(`Blog post creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

const findOrCreateAuthor = async (authorName: string): Promise<string> => {
  try {
    // Check if author exists
    const existingAuthor = await client.fetch(
      `*[_type == "author" && name == $name][0]`,
      { name: authorName }
    )

    if (existingAuthor) {
      return existingAuthor._id
    }

    // Create new author
    const newAuthor = await client.create({
      _type: 'author',
      name: authorName,
      slug: {
        _type: 'slug',
        current: authorName.toLowerCase().replace(/\s+/g, '-')
      },
      bio: [
        {
          _key: generateKey(),
          _type: 'block',
          children: [
            {
              _key: generateKey(),
              _type: 'span',
              text: `${authorName} is a content contributor at Convert Labs, specializing in web design and development insights.`
            }
          ]
        }
      ]
    })

    return newAuthor._id
  } catch (error) {
    console.error('Error finding/creating author:', error)
    throw error
  }
}

const findOrCreateCategories = async (categoryNames: string[]): Promise<string[]> => {
  const categoryIds: string[] = []

  for (const categoryName of categoryNames) {
    try {
      // Check if category exists
      const existingCategory = await client.fetch(
        `*[_type == "category" && title == $title][0]`,
        { title: categoryName }
      )

      if (existingCategory) {
        categoryIds.push(existingCategory._id)
      } else {
        // Create new category
        const newCategory = await client.create({
          _type: 'category',
          title: categoryName,
          slug: {
            _type: 'slug',
            current: categoryName.toLowerCase().replace(/\s+/g, '-')
          },
          description: `Articles about ${categoryName.toLowerCase()}`
        })
        categoryIds.push(newCategory._id)
      }
    } catch (error) {
      console.error(`Error finding/creating category "${categoryName}":`, error)
    }
  }

  return categoryIds
}

const convertMarkdownToBlocks = (markdown: string): Array<{
  _key: string;
  _type: string;
  style?: string;
  children: Array<{ _key: string; _type: string; text: string; marks?: string[] }>;
  markDefs?: Array<{ _key: string; _type: string; href: string }>;
}> => {
  // Enhanced markdown to Sanity blocks conversion
  const lines = markdown.split('\n')
  const blocks: Array<{
    _key: string;
    _type: string;
    style?: string;
    children: Array<{ _key: string; _type: string; text: string; marks?: string[] }>;
    markDefs?: Array<{ _key: string; _type: string; href: string }>;
  }> = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmedLine = line.trim()
    
    // Skip empty lines but add spacing between blocks
    if (!trimmedLine) {
      continue
    }

    if (trimmedLine.startsWith('# ')) {
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h1',
        children: [{ _key: generateKey(), _type: 'span', text: trimmedLine.substring(2) }]
      })
    } else if (trimmedLine.startsWith('## ')) {
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h2',
        children: [{ _key: generateKey(), _type: 'span', text: trimmedLine.substring(3) }]
      })
    } else if (trimmedLine.startsWith('### ')) {
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'h3',
        children: [{ _key: generateKey(), _type: 'span', text: trimmedLine.substring(4) }]
      })
    } else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      // Handle bullet points - convert to proper list items
      const content = trimmedLine.substring(2)
      const children = parseInlineMarkdown(content)
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        children: [
          { _key: generateKey(), _type: 'span', text: '• ' },
          ...children
        ]
      })
    } else if (/^\d+\.\s/.test(trimmedLine)) {
      // Handle numbered lists
      const children = parseInlineMarkdown(trimmedLine)
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        children
      })
    } else {
      // Regular paragraph - parse inline markdown
      const result = parseInlineMarkdownWithLinks(trimmedLine)
      blocks.push({
        _key: generateKey(),
        _type: 'block',
        style: 'normal',
        children: result.children,
        ...(result.markDefs.length > 0 && { markDefs: result.markDefs })
      })
    }
  }

  return blocks
}

// Parse inline markdown (bold, italic) within text
const parseInlineMarkdown = (text: string): Array<{ _key: string; _type: string; text: string; marks?: string[] }> => {
  const children: Array<{ _key: string; _type: string; text: string; marks?: string[] }> = []
  
  // Split by bold patterns (**text**)
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  
  for (const part of parts) {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Bold text
      children.push({
        _key: generateKey(),
        _type: 'span',
        text: part.substring(2, part.length - 2),
        marks: ['strong']
      })
    } else if (part) {
      // Regular text
      children.push({
        _key: generateKey(),
        _type: 'span',
        text: part
      })
    }
  }
  
  return children
}

// Parse inline markdown including links
const parseInlineMarkdownWithLinks = (text: string): {
  children: Array<{ _key: string; _type: string; text: string; marks?: string[] }>;
  markDefs: Array<{ _key: string; _type: string; href: string }>;
} => {
  const children: Array<{ _key: string; _type: string; text: string; marks?: string[] }> = []
  const markDefs: Array<{ _key: string; _type: string; href: string }> = []
  
  // First handle links [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let match
  
  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index)
      const beforeChildren = parseInlineMarkdown(beforeText)
      children.push(...beforeChildren)
    }
    
    // Add the link
    const linkKey = generateKey()
    markDefs.push({
      _key: linkKey,
      _type: 'link',
      href: match[2]
    })
    
    children.push({
      _key: generateKey(),
      _type: 'span',
      text: match[1],
      marks: [linkKey]
    })
    
    lastIndex = linkRegex.lastIndex
  }
  
  // Add remaining text after last link
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex)
    const remainingChildren = parseInlineMarkdown(remainingText)
    children.push(...remainingChildren)
  }
  
  // If no links were found, just parse for bold/italic
  if (children.length === 0) {
    children.push(...parseInlineMarkdown(text))
  }
  
  return { children, markDefs }
}

export const checkSanityConnection = async (): Promise<boolean> => {
  try {
    await client.fetch('*[_type == "post"][0]')
    return true
  } catch (error) {
    console.error('Sanity connection check failed:', error)
    return false
  }
}

export const validateSanityToken = (): boolean => {
  return !!process.env.SANITY_API_TOKEN
}

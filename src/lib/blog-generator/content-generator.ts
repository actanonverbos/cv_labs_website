import OpenAI from 'openai'
import slugify from 'slugify'
import { BlogPostInput, GeneratedContent } from './types'

const getOpenAIClient = () => {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
}

const BRAND_VOICE = `
You are a content writer for Convert Labs, a premium web design and development agency that specializes in creating high-converting websites. 

Brand Voice Guidelines:
- Professional yet approachable tone
- Focus on practical, actionable advice
- Emphasize conversion optimization and business results
- Use data-driven insights when possible
- Write for business owners and marketing professionals
- Avoid overly technical jargon unless necessary
- Include specific examples and case studies when relevant
`

const BLOG_POST_PROMPT = `
${BRAND_VOICE}

Create a comprehensive, SEO-optimized blog post with the following specifications:

Headline: {headline}
Key Points to Cover: {key_points}
Category: {category}

Requirements:
1. Write a compelling, SEO-friendly blog post of 800-1200 words
2. Use proper heading structure (H1, H2, H3)
3. Include actionable tips and practical advice
4. Optimize for the target keyword derived from the headline
5. Write in a conversational yet professional tone
6. Include a strong introduction that hooks the reader
7. End with a clear call-to-action related to Convert Labs services
8. Use bullet points and numbered lists where appropriate
9. Include relevant statistics or data points when possible

Format your response as JSON with the following structure:
{
  "title": "SEO-optimized title (60 characters or less)",
  "content": "ONLY the blog post content in markdown format - no metadata, no title repetition, just the article body starting with an introduction",
  "metaDescription": "Compelling meta description (150-160 characters)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}

IMPORTANT: The "content" field should contain ONLY the blog article body. Do not include the title, meta description, or tags in the content field.

Make sure the content is original, valuable, and aligns with Convert Labs' mission of helping businesses create high-converting websites.
`

// Extract only the blog content, removing any JSON metadata that might be included
const extractContentOnly = (content: string): string => {
  // If content is a JSON string, extract just the content field
  try {
    const parsed = JSON.parse(content)
    if (parsed.content) {
      return parsed.content
    }
  } catch {
    // Not JSON, continue with original content
  }

  // Remove any JSON-like structures from the beginning
  let cleanContent = content
  
  // Remove title if it appears at the start
  cleanContent = cleanContent.replace(/^"title":\s*"[^"]*",?\s*\n?/gim, '')
  
  // Remove metaDescription if it appears
  cleanContent = cleanContent.replace(/"metaDescription":\s*"[^"]*",?\s*\n?/gim, '')
  
  // Remove tags if they appear
  cleanContent = cleanContent.replace(/"tags":\s*\[[^\]]*\],?\s*\n?/gim, '')
  
  // Remove JSON wrapper characters
  cleanContent = cleanContent.replace(/^{\s*"content":\s*"/gim, '')
  cleanContent = cleanContent.replace(/"\s*}$/gim, '')
  
  // Remove any remaining JSON syntax
  cleanContent = cleanContent.replace(/^{[^}]*}/gim, '')
  
  return cleanContent.trim()
}

export const generateBlogContent = async (input: BlogPostInput): Promise<GeneratedContent> => {
  try {
    const prompt = BLOG_POST_PROMPT
      .replace('{headline}', input.headline)
      .replace('{key_points}', input.key_points)
      .replace('{category}', input.category || 'Web Design & Development')

    const openai = getOpenAIClient()
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert content writer and SEO specialist for Convert Labs, a premium web design agency.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Parse the JSON response
    let parsedContent
    try {
      parsedContent = JSON.parse(response)
      
      // Validate that we have the expected structure
      if (!parsedContent.content || !parsedContent.title) {
        throw new Error('Invalid JSON structure')
      }
      
      console.log('Parsed content structure:', {
        hasTitle: !!parsedContent.title,
        hasContent: !!parsedContent.content,
        contentType: typeof parsedContent.content,
        contentPreview: parsedContent.content?.substring(0, 100) + '...'
      })
      
      // Check if the content field contains JSON instead of clean content
      if (typeof parsedContent.content === 'string' && parsedContent.content.includes('"title"')) {
        console.warn('Content field contains JSON metadata, extracting clean content...')
        parsedContent.content = extractContentOnly(parsedContent.content)
      }
      
    } catch (error) {
      // If JSON parsing fails, try to extract content manually
      console.warn('Failed to parse JSON response, attempting manual extraction')
      console.log('Raw response:', response)
      
      // Try to extract just the content field from the JSON string
      const contentMatch = response.match(/"content":\s*"([^"]*(?:\\.[^"]*)*)"/)
      if (contentMatch) {
        parsedContent = {
          title: input.headline,
          content: contentMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'),
          metaDescription: `Learn about ${input.headline.toLowerCase()} with Convert Labs' expert insights and practical tips.`,
          tags: input.key_points.split(',').map(point => point.trim().toLowerCase()).slice(0, 5)
        }
      } else {
        parsedContent = {
          title: input.headline,
          content: response,
          metaDescription: `Learn about ${input.headline.toLowerCase()} with Convert Labs' expert insights and practical tips.`,
          tags: input.key_points.split(',').map(point => point.trim().toLowerCase()).slice(0, 5)
        }
      }
    }

    // Generate slug from title
    const slug = slugify(parsedContent.title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g
    })

    return {
      title: parsedContent.title,
      slug,
      content: parsedContent.content,
      metaDescription: parsedContent.metaDescription,
      tags: parsedContent.tags || []
    }
  } catch (error) {
    console.error('Error generating blog content:', error)
    throw new Error(`Content generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export const validateApiKey = (): boolean => {
  return !!process.env.OPENAI_API_KEY
}

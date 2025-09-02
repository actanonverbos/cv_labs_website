import { createApi } from 'unsplash-js'
import { UnsplashImage } from './types'

const getUnsplashClient = () => {
  return createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY || ''
  })
}

export const fetchImageForBlogPost = async (headline: string, keyPoints: string): Promise<UnsplashImage | null> => {
  try {
    if (!process.env.UNSPLASH_ACCESS_KEY) {
      console.warn('Unsplash API key not configured, skipping image fetch')
      return null
    }

    // Create search query from headline and key points
    const searchTerms = extractSearchTerms(headline, keyPoints)
    const query = searchTerms.slice(0, 3).join(' ') // Use top 3 terms

    console.log(`Searching Unsplash for: "${query}"`)

    const unsplash = getUnsplashClient()
    const result = await unsplash.search.getPhotos({
      query,
      page: 1,
      perPage: 10,
      orientation: 'landscape',
      contentFilter: 'high'
    })

    if (result.errors) {
      console.error('Unsplash API errors:', result.errors)
      return null
    }

    const photos = result.response?.results
    if (!photos || photos.length === 0) {
      console.warn(`No images found for query: "${query}"`)
      return null
    }

    // Select the best image (first one is usually most relevant)
    const selectedPhoto = photos[0]

    // Generate alt text based on photo description or headline
    const altText = selectedPhoto.alt_description || 
                   selectedPhoto.description || 
                   `Image related to ${headline}`

    return {
      id: selectedPhoto.id,
      url: selectedPhoto.urls.regular,
      downloadUrl: selectedPhoto.links.download_location,
      altText,
      photographer: selectedPhoto.user.name,
      photographerUrl: selectedPhoto.user.links.html
    }
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error)
    return null
  }
}

const extractSearchTerms = (headline: string, keyPoints: string): string[] => {
  const text = `${headline} ${keyPoints}`.toLowerCase()
  
  // Remove common stop words and extract meaningful terms
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'how', 'what', 'why', 'when', 'where', 'who', 'which', 'that', 'this', 'these', 'those',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'tips', 'guide', 'best'
  ])

  const words = text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word))
    .filter((word, index, arr) => arr.indexOf(word) === index) // Remove duplicates

  // Prioritize certain keywords for web design/development content
  const priorityKeywords = [
    'design', 'development', 'website', 'web', 'ui', 'ux', 'responsive', 'mobile',
    'conversion', 'seo', 'optimization', 'performance', 'accessibility', 'user',
    'business', 'marketing', 'digital', 'technology', 'code', 'programming'
  ]

  const priorityWords = words.filter(word => 
    priorityKeywords.some(keyword => word.includes(keyword) || keyword.includes(word))
  )

  const regularWords = words.filter(word => 
    !priorityKeywords.some(keyword => word.includes(keyword) || keyword.includes(word))
  )

  return [...priorityWords, ...regularWords].slice(0, 5)
}

export const validateUnsplashApiKey = (): boolean => {
  return !!process.env.UNSPLASH_ACCESS_KEY
}

export const triggerDownload = async (downloadUrl: string): Promise<void> => {
  try {
    // Trigger download to comply with Unsplash API guidelines
    const unsplash = getUnsplashClient()
    await unsplash.photos.trackDownload({ downloadLocation: downloadUrl })
  } catch (error) {
    console.warn('Failed to track download:', error)
  }
}

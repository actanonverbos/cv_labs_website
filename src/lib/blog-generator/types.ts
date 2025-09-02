export interface BlogPostInput {
  headline: string
  key_points: string
  category?: string
  author_name?: string
}

export interface GeneratedContent {
  title: string
  slug: string
  content: string
  metaDescription: string
  tags: string[]
}

export interface UnsplashImage {
  id: string
  url: string
  downloadUrl: string
  altText: string
  photographer: string
  photographerUrl: string
}

export interface SanityImageAsset {
  _id: string
  url: string
}

export interface BlogGenerationJob {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  totalPosts: number
  processedPosts: number
  currentStep: string
  error?: string
  results: BlogGenerationResult[]
  createdAt: Date
}

export interface BlogGenerationResult {
  input: BlogPostInput
  success: boolean
  sanityId?: string
  error?: string
  generatedContent?: GeneratedContent
  image?: UnsplashImage
}

export interface BlogGenerationConfig {
  publishImmediately: boolean
  defaultAuthor?: string
  defaultCategory?: string
  brandVoice?: string
  seoOptimization: boolean
}

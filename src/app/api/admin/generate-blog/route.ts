import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { parseCSVContent, validateCSVStructure } from '@/lib/blog-generator/csv-parser'
import { generateBlogContent } from '@/lib/blog-generator/content-generator'
import { fetchImageForBlogPost } from '@/lib/blog-generator/image-fetcher'
import { uploadImageToSanity, createBlogPost } from '@/lib/blog-generator/sanity-uploader'
import { BlogGenerationJob, BlogGenerationResult, BlogGenerationConfig, BlogPostInput } from '@/lib/blog-generator/types'

// Store active jobs in memory (in production, use Redis or database)
const activeJobs = new Map<string, BlogGenerationJob>()

export async function POST(request: NextRequest) {
  // Check authentication
  const user = requireAuth(request)
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const formData = await request.formData()
    const csvFile = formData.get('csvFile') as File
    const configData = formData.get('config') as string

    if (!csvFile) {
      return NextResponse.json(
        { error: 'CSV file is required' },
        { status: 400 }
      )
    }

    const config: BlogGenerationConfig = configData ? JSON.parse(configData) : {
      publishImmediately: false,
      seoOptimization: true
    }

    // Read and validate CSV
    const csvContent = await csvFile.text()
    const validation = validateCSVStructure(csvContent)
    
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Invalid CSV structure', details: validation.errors },
        { status: 400 }
      )
    }

    // Parse CSV
    const blogPosts = await parseCSVContent(csvContent)
    
    if (blogPosts.length === 0) {
      return NextResponse.json(
        { error: 'No valid blog posts found in CSV' },
        { status: 400 }
      )
    }

    // Create job
    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const job: BlogGenerationJob = {
      id: jobId,
      status: 'pending',
      progress: 0,
      totalPosts: blogPosts.length,
      processedPosts: 0,
      currentStep: 'Starting...',
      results: [],
      createdAt: new Date()
    }

    activeJobs.set(jobId, job)

    // Start processing in background
    processBlogGeneration(jobId, blogPosts, config).catch(error => {
      console.error('Blog generation error:', error)
      const job = activeJobs.get(jobId)
      if (job) {
        job.status = 'failed'
        job.error = error.message
      }
    })

    return NextResponse.json({
      success: true,
      jobId,
      totalPosts: blogPosts.length
    })
  } catch (error) {
    console.error('Blog generation request error:', error)
    return NextResponse.json(
      { error: 'Failed to start blog generation' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Check authentication
  const user = requireAuth(request)
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { searchParams } = new URL(request.url)
  const jobId = searchParams.get('jobId')

  if (!jobId) {
    return NextResponse.json(
      { error: 'Job ID is required' },
      { status: 400 }
    )
  }

  const job = activeJobs.get(jobId)
  if (!job) {
    return NextResponse.json(
      { error: 'Job not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(job)
}

async function processBlogGeneration(
  jobId: string,
  blogPosts: BlogPostInput[],
  config: BlogGenerationConfig
) {
  const job = activeJobs.get(jobId)
  if (!job) return

  job.status = 'processing'
  job.currentStep = 'Processing blog posts...'

  for (let i = 0; i < blogPosts.length; i++) {
    const blogPost = blogPosts[i]
    const result: BlogGenerationResult = {
      input: blogPost,
      success: false
    }

    try {
      job.currentStep = `Processing "${blogPost.headline}" (${i + 1}/${blogPosts.length})`
      
      // Generate content
      const generatedContent = await generateBlogContent(blogPost)
      result.generatedContent = generatedContent

      // Fetch image
      let imageAsset
      try {
        const image = await fetchImageForBlogPost(blogPost.headline, blogPost.key_points)
        if (image) {
          imageAsset = await uploadImageToSanity(image)
          result.image = image
        }
      } catch (imageError) {
        console.warn(`Image processing failed for "${blogPost.headline}":`, imageError)
        // Continue without image
      }

      // Create blog post in Sanity
      const sanityId = await createBlogPost(
        blogPost,
        generatedContent,
        imageAsset,
        {
          publishImmediately: config.publishImmediately,
          defaultAuthor: config.defaultAuthor,
          defaultCategory: config.defaultCategory
        }
      )

      result.success = true
      result.sanityId = sanityId
    } catch (error) {
      console.error(`Error processing blog post "${blogPost.headline}":`, error)
      result.error = error instanceof Error ? error.message : 'Unknown error'
    }

    job.results.push(result)
    job.processedPosts = i + 1
    job.progress = Math.round((job.processedPosts / job.totalPosts) * 100)
  }

  job.status = 'completed'
  job.currentStep = 'Completed'
  job.progress = 100

  // Clean up job after 1 hour
  setTimeout(() => {
    activeJobs.delete(jobId)
  }, 60 * 60 * 1000)
}

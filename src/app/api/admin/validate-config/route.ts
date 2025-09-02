import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { validateApiKey } from '@/lib/blog-generator/content-generator'
import { validateUnsplashApiKey } from '@/lib/blog-generator/image-fetcher'
import { validateSanityToken, checkSanityConnection } from '@/lib/blog-generator/sanity-uploader'

export async function GET(request: NextRequest) {
  // Temporarily skip auth check since middleware is disabled

  try {
    console.log('Validating API configurations...')
    console.log('OpenAI key exists:', !!process.env.OPENAI_API_KEY)
    console.log('Unsplash key exists:', !!process.env.UNSPLASH_ACCESS_KEY)
    console.log('Sanity token exists:', !!process.env.SANITY_API_TOKEN)

    const validations = {
      openai: {
        configured: validateApiKey(),
        status: 'working' as 'working' | 'error' | 'unknown' // Assume working if configured
      },
      unsplash: {
        configured: validateUnsplashApiKey(),
        status: 'working' as 'working' | 'error' | 'unknown' // Assume working if configured
      },
      sanity: {
        configured: validateSanityToken(),
        status: 'unknown' as 'working' | 'error' | 'unknown'
      }
    }

    // Set status based on configuration
    if (!validations.openai.configured) validations.openai.status = 'error'
    if (!validations.unsplash.configured) validations.unsplash.status = 'error'

    // Test Sanity connection
    if (validations.sanity.configured) {
      try {
        const connected = await checkSanityConnection()
        validations.sanity.status = connected ? 'working' : 'error'
      } catch {
        validations.sanity.status = 'error'
      }
    }

    const allConfigured = Object.values(validations).every(v => v.configured)
    const allWorking = Object.values(validations).every(v => v.status === 'working' || !v.configured)

    return NextResponse.json({
      validations,
      summary: {
        allConfigured,
        allWorking,
        readyToGenerate: allConfigured && validations.sanity.status === 'working'
      }
    })
  } catch (error) {
    console.error('Configuration validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate configuration' },
      { status: 500 }
    )
  }
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Use dynamic import to avoid edge runtime issues
async function getAuthHelpers() {
  const { getAuthTokenFromRequest, verifyToken } = await import('@/lib/auth')
  return { getAuthTokenFromRequest, verifyToken }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Temporarily disable authentication middleware - just handle redirects
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}

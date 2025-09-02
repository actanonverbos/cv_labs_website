import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

// Admin credentials - must be set in environment variables for production
const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH
const JWT_SECRET = process.env.JWT_SECRET

// Validate required environment variables
if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
  console.warn('⚠️  Missing required environment variables for admin authentication:')
  if (!ADMIN_USERNAME) console.warn('  - ADMIN_USERNAME')
  if (!ADMIN_PASSWORD_HASH) console.warn('  - ADMIN_PASSWORD_HASH')
  if (!JWT_SECRET) console.warn('  - JWT_SECRET')
}

export interface AdminUser {
  username: string
  role: 'admin'
}

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12)
}

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}

export const generateToken = (user: AdminUser): string => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required')
  }
  
  return jwt.sign(
    { username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export const verifyToken = (token: string): AdminUser | null => {
  if (!JWT_SECRET) {
    console.error('JWT_SECRET environment variable is required for token verification')
    return null
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & AdminUser
    return { username: decoded.username, role: decoded.role }
  } catch {
    return null
  }
}

export const authenticateAdmin = async (username: string, password: string): Promise<AdminUser | null> => {
  // Check if environment variables are configured
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH) {
    console.error('❌ Admin authentication not configured - missing environment variables')
    return null
  }

  // Verify username matches
  if (username !== ADMIN_USERNAME) {
    return null
  }

  // Verify password against hash
  const isValidPassword = await verifyPassword(password, ADMIN_PASSWORD_HASH)
  if (!isValidPassword) {
    return null
  }

  return { username, role: 'admin' }
}

export const getAuthTokenFromRequest = (request: NextRequest): string | null => {
  // Check Authorization header
  const authHeader = request.headers.get('Authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }

  // Check cookie
  const tokenCookie = request.cookies.get('admin-token')
  return tokenCookie?.value || null
}

export const requireAuth = (request: NextRequest): AdminUser | null => {
  const token = getAuthTokenFromRequest(request)
  if (!token) {
    return null
  }

  return verifyToken(token)
}

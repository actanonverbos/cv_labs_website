import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

// Admin credentials - in production, store these securely in environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$12$6l0yiILX0xJi8DEM0rFSgeg8YsWaeQifUxIGiugxnM7P6/O.WLWmy' // 'admin123' hashed - WORKING HASH
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production'

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
  return jwt.sign(
    { username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export const verifyToken = (token: string): AdminUser | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload & AdminUser
    return { username: decoded.username, role: decoded.role }
  } catch {
    return null
  }
}

export const authenticateAdmin = async (username: string, password: string): Promise<AdminUser | null> => {
  // Temporary simple auth - CHANGE THIS IN PRODUCTION
  if (username === 'admin' && password === 'admin123') {
    return { username, role: 'admin' }
  }
  
  return null
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

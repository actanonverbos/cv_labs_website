import csv from 'csv-parser'
import { Readable } from 'stream'
import { BlogPostInput } from './types'

export const parseCSVContent = async (csvContent: string): Promise<BlogPostInput[]> => {
  return new Promise((resolve, reject) => {
    const results: BlogPostInput[] = []
    
    const stream = Readable.from([csvContent])
    
    stream
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_')
      }))
      .on('data', (data) => {
        // Validate required fields
        if (!data.headline || data.headline.trim() === '') {
          console.warn('Skipping row with missing headline:', data)
          return
        }

        if (!data.key_points || data.key_points.trim() === '') {
          console.warn('Skipping row with missing key_points:', data)
          return
        }

        results.push({
          headline: data.headline.trim(),
          key_points: data.key_points.trim(),
          category: data.category?.trim() || undefined,
          author_name: data.author_name?.trim() || undefined
        })
      })
      .on('end', () => {
        if (results.length === 0) {
          reject(new Error('No valid blog posts found in CSV. Please ensure your CSV has "headline" and "key_points" columns.'))
        } else {
          resolve(results)
        }
      })
      .on('error', (error) => {
        reject(new Error(`CSV parsing error: ${error.message}`))
      })
  })
}

export const validateCSVStructure = (csvContent: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (!csvContent || csvContent.trim() === '') {
    errors.push('CSV content is empty')
    return { isValid: false, errors }
  }

  const lines = csvContent.trim().split('\n')
  
  if (lines.length < 2) {
    errors.push('CSV must have at least a header row and one data row')
    return { isValid: false, errors }
  }

  const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''))
  
  if (!headers.includes('headline')) {
    errors.push('CSV must have a "headline" column')
  }
  
  if (!headers.includes('key_points')) {
    errors.push('CSV must have a "key_points" column')
  }

  return { isValid: errors.length === 0, errors }
}

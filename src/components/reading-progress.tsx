'use client'

import { useEffect, useState } from 'react'

export const ReadingProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      
      // Find the blog content container (the prose section)
      const blogContent = document.querySelector('.prose')
      
      if (!blogContent) {
        // Fallback to full document if blog content not found
        const docHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
        setProgress(Math.min(Math.max(scrollPercent, 0), 100))
        return
      }
      
      // Calculate based on blog content only
      const contentTop = blogContent.offsetTop
      const contentHeight = blogContent.offsetHeight
      const contentBottom = contentTop + contentHeight
      
      // Progress starts when we reach the blog content
      if (scrollTop < contentTop) {
        setProgress(0)
        return
      }
      
      // Progress reaches 100% when we finish reading the blog content
      if (scrollTop + window.innerHeight >= contentBottom) {
        setProgress(100)
        return
      }
      
      // Calculate progress within the blog content area
      const contentScrolled = scrollTop - contentTop
      const totalContentToRead = contentHeight - window.innerHeight
      const scrollPercent = totalContentToRead > 0 ? (contentScrolled / totalContentToRead) * 100 : 100
      
      setProgress(Math.min(Math.max(scrollPercent, 0), 100))
    }

    // Update progress on scroll
    window.addEventListener('scroll', updateProgress, { passive: true })
    
    // Initial calculation with a slight delay
    setTimeout(updateProgress, 100)

    return () => {
      window.removeEventListener('scroll', updateProgress)
    }
  }, [])

  return (
    <>
      {/* Progress bar positioned at bottom of navigation */}
      <div className="fixed top-12 md:top-14 left-0 right-0 z-40 h-0.5 pointer-events-none">
        <div 
          className="h-full bg-white"
          style={{ 
            width: `${progress}%`
          }}
        />
      </div>
    </>
  )
}

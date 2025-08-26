"use client"

import { useEffect } from "react"

export function useBookingShortcut() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log('Key pressed:', event.key) // Debug log
      
      if (event.key.toLowerCase() === 'b' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        console.log('B key detected') // Debug log
        
        // Check if user is not typing in an input field
        const activeElement = document.activeElement
        if (activeElement && (
          activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          (activeElement as HTMLElement).isContentEditable
        )) {
          console.log('Ignoring B key - user is typing in input field')
          return
        }
        
        event.preventDefault()
        
        // Find any booking button on the page and click it
        const bookingButtons = document.querySelectorAll('a[href="https://cal.com/isaac-cullinane/1-1"]')
        console.log('Found booking buttons:', bookingButtons.length) // Debug log
        
        if (bookingButtons.length > 0) {
          console.log('Clicking booking button') // Debug log
          ;(bookingButtons[0] as HTMLAnchorElement).click()
        }
      }
    }

    console.log('Booking shortcut hook initialized') // Debug log
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
}

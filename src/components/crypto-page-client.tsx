"use client"

import { useBookingShortcut } from "@/hooks/use-booking-shortcut"

export function CryptoPageClient({ children }: { children: React.ReactNode }) {
  useBookingShortcut()
  return <>{children}</>
}

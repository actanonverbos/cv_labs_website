"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  y = 8,
  className = ""
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // cubic-bezier(0.16,1,0.3,1)
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

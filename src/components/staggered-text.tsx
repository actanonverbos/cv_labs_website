"use client"

import { motion } from "framer-motion"

interface StaggeredTextProps {
  children: string
  className?: string
  highlightWords?: string[]
  highlightClassName?: string
  delay?: number
  staggerDelay?: number
}

export function StaggeredText({ 
  children, 
  className = "",
  highlightWords = [],
  highlightClassName = "text-primary",
  delay = 0,
  staggerDelay = 0.2
}: StaggeredTextProps) {
  const words = children.split(" ")
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }
  
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  return (
    <motion.span
      className={`staggered-text-container ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.includes(word)
        const isLast = index === words.length - 1
        
        return (
          <span key={index}>
            <motion.span
              variants={wordVariants}
              className={`animated-word ${isHighlighted ? highlightClassName : ""}`}
            >
              {word}
            </motion.span>
            {!isLast && " "}
          </span>
        )
      })}
    </motion.span>
  )
}

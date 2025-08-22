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
      y: 16,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  }

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.includes(word)
        const isLast = index === words.length - 1
        
        return (
          <motion.span
            key={index}
            variants={wordVariants}
            className={`inline-block ${isHighlighted ? highlightClassName : ""}`}
          >
            {word}
            {!isLast && <span className="inline-block w-[0.25em]"> </span>}
          </motion.span>
        )
      })}
    </motion.span>
  )
}

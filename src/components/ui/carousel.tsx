"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CarouselItem {
  id: string
  title: string
  description: string
  image: string
  stat?: string
  tags?: string[]
}

interface CarouselProps {
  items: CarouselItem[]
  autoScrollInterval?: number
  className?: string
}

export function Carousel({ 
  items, 
  autoScrollInterval = 5000, 
  className 
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAutoScrolling, setIsAutoScrolling] = React.useState(true)
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null)

  // Auto scroll
  React.useEffect(() => {
    if (!isAutoScrolling || items.length === 0) return

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, autoScrollInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoScrolling, autoScrollInterval, items.length])



  if (items.length === 0) {
    return <div>No items to display</div>
  }

  return (
    <div className={cn("relative w-full", className)}>
      {/* Carousel Container */}
      <div className="relative h-[400px] overflow-hidden">
        <motion.div
          className="flex h-full"
          animate={{
            x: `-${currentIndex * 100}%`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full md:w-1/3 h-full flex-shrink-0 flex items-center justify-center px-0.5"
            >
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-2 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === index
                ? "bg-primary w-8"
                : "bg-primary/30 hover:bg-primary/50"
            )}
            onClick={() => {
              setIsAutoScrolling(false)
              setCurrentIndex(index)
              setTimeout(() => setIsAutoScrolling(true), 5000)
            }}
          />
        ))}
      </div>
    </div>
  )
}
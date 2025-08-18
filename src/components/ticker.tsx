"use client"

import * as React from "react"
import { 
  DollarSign, 
  CheckCircle, 
  Zap, 
  Code, 
  MessageCircle, 
  Framer,
  Tag,
  Heart
} from "lucide-react"

const tickerItems = [
  { icon: DollarSign, text: "USDC ACCEPTED" },
  { icon: CheckCircle, text: "CONVERSION-FOCUSED" },
  { icon: Zap, text: "FAST DELIVERY" },
  { icon: Code, text: "NO-CODE FRIENDLY" },
  { icon: MessageCircle, text: "ASYNC-FRIENDLY" },
  { icon: Framer, text: "FRAMER EXPERT" },
  { icon: Tag, text: "FLAT PRICING" },
  { icon: Heart, text: "ONGOING SUPPORT" },
]

export function Ticker() {
  return (
    <div className="w-full overflow-hidden bg-muted/30 py-3 border-y border-border/50">
      <div className="flex animate-scroll">
        {/* First set of items */}
        <div className="flex items-center gap-8 px-4">
          {tickerItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={`first-${index}`} className="flex items-center gap-2 whitespace-nowrap">
                <IconComponent className="w-4 h-4 text-foreground" />
                <span className="label text-foreground">{item.text}</span>
              </div>
            )
          })}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex items-center gap-8 px-4">
          {tickerItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div key={`second-${index}`} className="flex items-center gap-2 whitespace-nowrap">
                <IconComponent className="w-4 h-4 text-foreground" />
                <span className="label text-foreground">{item.text}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import { 
  Edit3, 
  Zap, 
  Sun, 
  MousePointer, 
  Layers
} from "lucide-react"

const tickerItems = [
  { icon: Edit3, text: "EASILY CUSTOMIZABLE" },
  { icon: Zap, text: "LIGHTNING FAST" },
  { icon: Sun, text: "LIGHT & DARK MODES" },
  { icon: MousePointer, text: "ONE-CLICK IMPORT" },
  { icon: Layers, text: "CUSTOM BUILT" },
]

export function Ticker() {
  return (
    <div className="w-full overflow-hidden bg-muted/30 py-3 border-y border-border/50 ticker-container">
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

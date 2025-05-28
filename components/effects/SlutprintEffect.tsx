"use client"

import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import type { SlutprintEffect as SlutprintEffectType } from "@/types/zine"

interface SlutprintEffectProps {
  effect: SlutprintEffectType
}

export function SlutprintEffect({ effect }: SlutprintEffectProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const slutprintElement = (
    <div
      key={effect.id}
      className="slutprint-dot"
      style={{
        position: "fixed",
        width: "4px",
        height: "4px",
        background: "var(--red-hanky)",
        borderRadius: "50%",
        top: `${effect.y}px`,
        left: `${effect.x}px`,
        pointerEvents: "none",
        zIndex: 1000,
        animation: "slutprint-fade 3s ease-out forwards",
      }}
    />
  )

  return createPortal(slutprintElement, document.body)
}

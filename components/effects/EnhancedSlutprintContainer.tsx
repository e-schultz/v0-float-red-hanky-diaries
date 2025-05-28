"use client"

import { createPortal } from "react-dom"
import { useEffect, useState, memo } from "react"
import { useZineStore } from "@/lib/state-manager"

interface SlutprintEffectProps {
  effect: {
    id: string
    x: number
    y: number
    timestamp: number
    variant?: string
  }
}

const SlutprintEffect = memo(function SlutprintEffect({ effect }: SlutprintEffectProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const slutprintElement = (
    <div
      key={effect.id}
      className={`slutprint-dot ${effect.variant ? `variant-${effect.variant}` : ""}`}
      style={{
        top: `${effect.y}px`,
        left: `${effect.x}px`,
      }}
    />
  )

  return createPortal(slutprintElement, document.body)
})

export const EnhancedSlutprintContainer = memo(function EnhancedSlutprintContainer() {
  const { activeEffects, effectsEnabled } = useZineStore()

  if (!effectsEnabled) return null

  return (
    <>
      {activeEffects.map((effect) => (
        <SlutprintEffect key={effect.id} effect={effect} />
      ))}
    </>
  )
})

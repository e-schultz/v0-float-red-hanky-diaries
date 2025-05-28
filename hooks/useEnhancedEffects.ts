"use client"

import type React from "react"

import { useCallback } from "react"
import { useZineStore } from "@/lib/state-manager"

export function useEnhancedEffects() {
  const { activeEffects, effectsEnabled, addEffect, removeEffect, toggleEffects } = useZineStore()

  const generateEffect = useCallback(
    (options?: {
      x?: number
      y?: number
      variant?: "default" | "gold" | "blue" | "pink"
    }) => {
      if (!effectsEnabled) return null

      const effect = {
        id: `effect-${Date.now()}-${Math.random()}`,
        x: options?.x ?? Math.random() * window.innerWidth,
        y: options?.y ?? Math.random() * window.innerHeight,
        timestamp: Date.now(),
        variant: options?.variant ?? "default",
      }

      addEffect(effect)
      return effect
    },
    [addEffect, effectsEnabled],
  )

  const generateClickEffect = useCallback(
    (event: React.MouseEvent) => {
      return generateEffect({
        x: event.clientX,
        y: event.clientY,
        variant: "blue",
      })
    },
    [generateEffect],
  )

  const generateRandomEffect = useCallback(() => {
    const variants = ["default", "gold", "blue", "pink"] as const
    const variant = variants[Math.floor(Math.random() * variants.length)]

    return generateEffect({ variant })
  }, [generateEffect])

  return {
    effects: activeEffects,
    effectsEnabled,
    generateEffect,
    generateClickEffect,
    generateRandomEffect,
    removeEffect,
    toggleEffects,
  }
}

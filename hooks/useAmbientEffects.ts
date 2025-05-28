"use client"

import { useState, useEffect, useCallback } from "react"
import type { SlutprintEffect } from "@/types/zine"
import { ZINE_CONFIG } from "@/lib/zine-config"

export function useAmbientEffects() {
  const [effects, setEffects] = useState<SlutprintEffect[]>([])

  const generateEffect = useCallback(() => {
    const newEffect: SlutprintEffect = {
      id: `slutprint-${Date.now()}-${Math.random()}`,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      timestamp: Date.now(),
    }

    setEffects((prev) => [...prev, newEffect])

    // Remove effect after lifetime expires
    setTimeout(() => {
      setEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id))
    }, ZINE_CONFIG.effects.slutprintLifetime)

    return newEffect
  }, [])

  const triggerEffect = useCallback(() => {
    generateEffect()
  }, [generateEffect])

  // Ambient effect generation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < ZINE_CONFIG.effects.ambientChance) {
        generateEffect()
      }
    }, ZINE_CONFIG.animationTimings.ambientGeneration)

    return () => clearInterval(interval)
  }, [generateEffect])

  return {
    effects,
    triggerEffect,
  }
}

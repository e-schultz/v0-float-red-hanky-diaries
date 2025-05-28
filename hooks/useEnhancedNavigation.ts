"use client"

import { useCallback } from "react"
import { useZineStore } from "@/lib/state-manager"

export function useEnhancedNavigation() {
  const {
    currentPage,
    setCurrentPage,
    getNavigationState,
    canNavigateNext,
    canNavigatePrevious,
    addEffect,
    effectsEnabled,
  } = useZineStore()

  const generateNavigationEffect = useCallback(() => {
    if (!effectsEnabled) return

    const effect = {
      id: `nav-effect-${Date.now()}-${Math.random()}`,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      timestamp: Date.now(),
    }

    addEffect(effect)
  }, [addEffect, effectsEnabled])

  const goToPage = useCallback(
    (pageNumber: number) => {
      if (pageNumber >= 1 && pageNumber <= getNavigationState().totalPages) {
        setCurrentPage(pageNumber)
        generateNavigationEffect()
        return true
      }
      return false
    },
    [setCurrentPage, getNavigationState, generateNavigationEffect],
  )

  const nextPage = useCallback(() => {
    if (canNavigateNext()) {
      return goToPage(currentPage + 1)
    }
    return false
  }, [currentPage, canNavigateNext, goToPage])

  const previousPage = useCallback(() => {
    if (canNavigatePrevious()) {
      return goToPage(currentPage - 1)
    }
    return false
  }, [currentPage, canNavigatePrevious, goToPage])

  return {
    ...getNavigationState(),
    goToPage,
    nextPage,
    previousPage,
  }
}

"use client"

import { useState, useCallback } from "react"
import type { NavigationState } from "@/types/zine"
import { ZINE_CONFIG } from "@/lib/zine-config"

export function useZineNavigation() {
  const [currentPage, setCurrentPage] = useState(1)

  const navigationState: NavigationState = {
    currentPage,
    totalPages: ZINE_CONFIG.totalPages,
    canGoNext: currentPage < ZINE_CONFIG.totalPages,
    canGoPrevious: currentPage > 1,
  }

  const goToPage = useCallback((pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= ZINE_CONFIG.totalPages) {
      setCurrentPage(pageNumber)

      // Log interaction for slutprint tracking
      console.log(`🔮 Page transition: ${pageNumber}`)

      return true
    }
    return false
  }, [])

  const nextPage = useCallback(() => {
    if (navigationState.canGoNext) {
      return goToPage(currentPage + 1)
    }
    return false
  }, [currentPage, navigationState.canGoNext, goToPage])

  const previousPage = useCallback(() => {
    if (navigationState.canGoPrevious) {
      return goToPage(currentPage - 1)
    }
    return false
  }, [currentPage, navigationState.canGoPrevious, goToPage])

  return {
    ...navigationState,
    goToPage,
    nextPage,
    previousPage,
  }
}

"use client"

import { useEffect } from "react"

interface UseKeyboardNavigationProps {
  onNext: () => void
  onPrevious: () => void
  enabled?: boolean
}

export function useKeyboardNavigation({ onNext, onPrevious, enabled = true }: UseKeyboardNavigationProps) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        onNext()
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        onPrevious()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onNext, onPrevious, enabled])
}

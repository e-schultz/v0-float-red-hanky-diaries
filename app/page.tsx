"use client"

import { useEffect, useState, memo } from "react"
import { PageIndicator } from "@/components/page-indicator"
import { Navigation } from "@/components/navigation"
import { ZineContainer } from "@/components/zine-container"
import { ZinePageRenderer } from "@/components/zine/ZinePageRenderer"
import { EnhancedSlutprintContainer } from "@/components/effects/EnhancedSlutprintContainer"
import { useEnhancedNavigation } from "@/hooks/useEnhancedNavigation"
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation"
import { useEnhancedEffects } from "@/hooks/useEnhancedEffects"
import { useZineStore } from "@/lib/state-manager"
import { applyTheme, applyFontSize } from "@/lib/theme-manager"
import { ZINE_CONTENT } from "@/data/zine-content"

const ZineApp = memo(function ZineApp() {
  const navigation = useEnhancedNavigation()
  const { generateRandomEffect } = useEnhancedEffects()
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | null>(null)

  const { theme, fontSize, keyboardNavigationEnabled, animationsEnabled } = useZineStore()

  // Apply theme and font size on mount and changes
  useEffect(() => {
    applyTheme(theme)
    applyFontSize(fontSize)
  }, [theme, fontSize])

  // Apply animations class to body
  useEffect(() => {
    document.body.classList.toggle("animations-disabled", !animationsEnabled)
  }, [animationsEnabled])

  useKeyboardNavigation({
    onNext: () => {
      if (navigation.nextPage()) {
        setSlideDirection("next")
        generateRandomEffect()
      }
    },
    onPrevious: () => {
      if (navigation.previousPage()) {
        setSlideDirection("prev")
        generateRandomEffect()
      }
    },
    enabled: keyboardNavigationEnabled,
  })

  // Initialize logging
  useEffect(() => {
    console.log("🔥 Red Hanky Popper Zine initialized")
    console.log("📖 Bottom epistemology SPA loaded")
    console.log("✨ Enhanced state management active")
  }, [])

  const handleNext = () => {
    if (navigation.nextPage()) {
      setSlideDirection("next")
      generateRandomEffect()
    }
  }

  const handlePrevious = () => {
    if (navigation.previousPage()) {
      setSlideDirection("prev")
      generateRandomEffect()
    }
  }

  // Clear slide direction after animation
  useEffect(() => {
    if (slideDirection) {
      const timer = setTimeout(() => setSlideDirection(null), 500)
      return () => clearTimeout(timer)
    }
  }, [slideDirection])

  return (
    <ZineContainer>
      <PageIndicator currentPage={navigation.currentPage} totalPages={navigation.totalPages} />

      {ZINE_CONTENT.map((page) => (
        <ZinePageRenderer
          key={page.id}
          page={page}
          isActive={page.id === navigation.currentPage}
          slideDirection={page.id === navigation.currentPage ? slideDirection : null}
        />
      ))}

      <Navigation
        currentPage={navigation.currentPage}
        totalPages={navigation.totalPages}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />

      <EnhancedSlutprintContainer />
    </ZineContainer>
  )
})

export default function Home() {
  return <ZineApp />
}

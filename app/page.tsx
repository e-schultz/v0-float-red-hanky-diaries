"use client"

import { useEffect, useState, memo } from "react"
import { PageIndicator } from "@/components/page-indicator"
import { Navigation } from "@/components/navigation"
import { ZineContainer } from "@/components/zine-container"
import { ZinePageRenderer } from "@/components/zine/ZinePageRenderer"
import { EnhancedSlutprintContainer } from "@/components/effects/EnhancedSlutprintContainer"
import { DynamicMetaUpdater } from "@/components/social/DynamicMetaUpdater"
import { SettingsPanel } from "@/components/settings/SettingsPanel"
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

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
      {/* Meta tag updater for social sharing */}
      <DynamicMetaUpdater />

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

      {/* Settings button */}
      <button
        className="fixed top-4 left-4 z-[1000] bg-void-black bg-opacity-80 p-2 rounded-full border border-red-hanky hover:border-flesh-pink transition-colors"
        onClick={() => setIsSettingsOpen(true)}
        aria-label="Open settings"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-shimmer-white"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      </button>

      <EnhancedSlutprintContainer />

      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </ZineContainer>
  )
})

export default function Home() {
  return <ZineApp />
}

"use client"

import { useState } from "react"
import { useZineStore } from "@/lib/state-manager"
import { THEMES, type ThemeName, applyTheme, applyFontSize } from "@/lib/theme-manager"
import { SocialCardPreview } from "@/components/social/SocialCardPreview"

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const {
    theme,
    fontSize,
    effectsEnabled,
    animationsEnabled,
    keyboardNavigationEnabled,
    setTheme,
    setFontSize,
    toggleEffects,
    toggleAnimations,
    toggleKeyboardNavigation,
  } = useZineStore()

  const [isSocialPreviewOpen, setIsSocialPreviewOpen] = useState(false)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[1500] p-4">
      <div className="bg-void-black border-2 border-red-hanky rounded-lg max-w-md w-full overflow-hidden">
        <div className="p-4 border-b border-red-hanky flex justify-between items-center">
          <h2 className="text-xl font-bold text-red-hanky">Settings</h2>
          <button
            onClick={onClose}
            className="text-shimmer-white hover:text-red-hanky transition-colors"
            aria-label="Close settings"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Theme Selection */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-popper-gold">Theme</h3>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(THEMES) as ThemeName[]).map((themeName) => (
                <button
                  key={themeName}
                  className={`p-3 rounded border ${
                    theme === themeName
                      ? "border-red-hanky bg-red-hanky bg-opacity-20"
                      : "border-gray-700 hover:border-popper-gold"
                  }`}
                  onClick={() => {
                    setTheme(themeName)
                    applyTheme(themeName)
                  }}
                >
                  <span className="block text-center text-sm">{THEMES[themeName].name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-popper-gold">Font Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {["small", "medium", "large"].map((size) => (
                <button
                  key={size}
                  className={`p-3 rounded border ${
                    fontSize === size
                      ? "border-red-hanky bg-red-hanky bg-opacity-20"
                      : "border-gray-700 hover:border-popper-gold"
                  }`}
                  onClick={() => {
                    setFontSize(size as "small" | "medium" | "large")
                    applyFontSize(size as "small" | "medium" | "large")
                  }}
                >
                  <span className="block text-center text-sm capitalize">{size}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Settings */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-popper-gold">Features</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Visual Effects</span>
                <button
                  className={`w-12 h-6 rounded-full relative ${effectsEnabled ? "bg-red-hanky" : "bg-gray-700"}`}
                  onClick={toggleEffects}
                  aria-pressed={effectsEnabled}
                  role="switch"
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      effectsEnabled ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>Animations</span>
                <button
                  className={`w-12 h-6 rounded-full relative ${animationsEnabled ? "bg-red-hanky" : "bg-gray-700"}`}
                  onClick={toggleAnimations}
                  aria-pressed={animationsEnabled}
                  role="switch"
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      animationsEnabled ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span>Keyboard Navigation</span>
                <button
                  className={`w-12 h-6 rounded-full relative ${
                    keyboardNavigationEnabled ? "bg-red-hanky" : "bg-gray-700"
                  }`}
                  onClick={toggleKeyboardNavigation}
                  aria-pressed={keyboardNavigationEnabled}
                  role="switch"
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      keyboardNavigationEnabled ? "left-7" : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Social Card Preview */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-popper-gold">Social Sharing</h3>
            <button
              className="w-full py-2 px-4 bg-float-blue bg-opacity-20 border border-float-blue rounded hover:bg-opacity-30 transition-colors"
              onClick={() => setIsSocialPreviewOpen(true)}
            >
              Preview Social Media Card
            </button>
          </div>
        </div>
      </div>

      <SocialCardPreview isOpen={isSocialPreviewOpen} onClose={() => setIsSocialPreviewOpen(false)} />
    </div>
  )
}

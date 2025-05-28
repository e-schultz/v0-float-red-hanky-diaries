"use client"

export const THEMES = {
  default: {
    name: "Default",
    colors: {
      redHanky: "#cc0000",
      popperGold: "#ffd700",
      voidBlack: "#000000",
      shimmerWhite: "#ffffff",
      floatBlue: "#60a5fa",
      fleshPink: "#ff69b4",
      ethicsGreen: "#00ff88",
    },
  },
  "high-contrast": {
    name: "High Contrast",
    colors: {
      redHanky: "#ff0000",
      popperGold: "#ffff00",
      voidBlack: "#000000",
      shimmerWhite: "#ffffff",
      floatBlue: "#0080ff",
      fleshPink: "#ff00ff",
      ethicsGreen: "#00ff00",
    },
  },
  minimal: {
    name: "Minimal",
    colors: {
      redHanky: "#666666",
      popperGold: "#999999",
      voidBlack: "#000000",
      shimmerWhite: "#ffffff",
      floatBlue: "#888888",
      fleshPink: "#aaaaaa",
      ethicsGreen: "#777777",
    },
  },
} as const

export type ThemeName = keyof typeof THEMES

export function applyTheme(themeName: ThemeName) {
  const theme = THEMES[themeName]
  const root = document.documentElement

  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`
    root.style.setProperty(cssVar, value)
  })

  root.setAttribute("data-theme", themeName)
}

export function applyFontSize(size: "small" | "medium" | "large") {
  const root = document.documentElement
  const sizeMap = {
    small: "0.9",
    medium: "1.0",
    large: "1.2",
  }

  root.style.setProperty("--font-scale", sizeMap[size])
  root.setAttribute("data-font-size", size)
}

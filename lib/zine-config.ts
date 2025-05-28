import type { ZineConfig } from "@/types/zine"

export const ZINE_CONFIG: ZineConfig = {
  totalPages: 5,
  animationTimings: {
    pageTransition: 500,
    slutprintFade: 3000,
    ambientGeneration: 1000,
  },
  effects: {
    ambientChance: 0.05, // 5% chance per interval
    slutprintLifetime: 3000,
  },
}

export const CSS_VARIABLES = {
  colors: {
    redHanky: "#cc0000",
    popperGold: "#ffd700",
    voidBlack: "#000000",
    shimmerWhite: "#ffffff",
    floatBlue: "#60a5fa",
    fleshPink: "#ff69b4",
    ethicsGreen: "#00ff88",
  },
} as const

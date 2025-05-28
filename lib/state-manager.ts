"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { NavigationState, SlutprintEffect } from "@/types/zine"
import { ZINE_CONFIG } from "./zine-config"

interface ZineState {
  // Navigation state
  currentPage: number
  visitedPages: Set<number>
  navigationHistory: number[]

  // Effects state
  activeEffects: SlutprintEffect[]
  effectsEnabled: boolean

  // UI state
  animationsEnabled: boolean
  keyboardNavigationEnabled: boolean

  // Preferences
  theme: "default" | "high-contrast" | "minimal"
  fontSize: "small" | "medium" | "large"

  // Actions
  setCurrentPage: (page: number) => void
  addVisitedPage: (page: number) => void
  addEffect: (effect: SlutprintEffect) => void
  removeEffect: (effectId: string) => void
  toggleEffects: () => void
  toggleAnimations: () => void
  toggleKeyboardNavigation: () => void
  setTheme: (theme: ZineState["theme"]) => void
  setFontSize: (size: ZineState["fontSize"]) => void
  resetState: () => void

  // Computed values
  getNavigationState: () => NavigationState
  canNavigateNext: () => boolean
  canNavigatePrevious: () => boolean
}

const initialState = {
  currentPage: 1,
  visitedPages: new Set([1]),
  navigationHistory: [1],
  activeEffects: [],
  effectsEnabled: true,
  animationsEnabled: true,
  keyboardNavigationEnabled: true,
  theme: "default" as const,
  fontSize: "medium" as const,
}

export const useZineStore = create<ZineState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setCurrentPage: (page: number) => {
        if (page < 1 || page > ZINE_CONFIG.totalPages) return

        set((state) => ({
          currentPage: page,
          visitedPages: new Set([...state.visitedPages, page]),
          navigationHistory: [...state.navigationHistory, page].slice(-10), // Keep last 10
        }))

        console.log(`🔮 Page transition: ${page}`)
      },

      addVisitedPage: (page: number) => {
        set((state) => ({
          visitedPages: new Set([...state.visitedPages, page]),
        }))
      },

      addEffect: (effect: SlutprintEffect) => {
        set((state) => ({
          activeEffects: [...state.activeEffects, effect],
        }))

        // Auto-remove after lifetime
        setTimeout(() => {
          get().removeEffect(effect.id)
        }, ZINE_CONFIG.effects.slutprintLifetime)
      },

      removeEffect: (effectId: string) => {
        set((state) => ({
          activeEffects: state.activeEffects.filter((effect) => effect.id !== effectId),
        }))
      },

      toggleEffects: () => {
        set((state) => ({ effectsEnabled: !state.effectsEnabled }))
      },

      toggleAnimations: () => {
        set((state) => ({ animationsEnabled: !state.animationsEnabled }))
      },

      toggleKeyboardNavigation: () => {
        set((state) => ({ keyboardNavigationEnabled: !state.keyboardNavigationEnabled }))
      },

      setTheme: (theme: ZineState["theme"]) => {
        set({ theme })
        document.documentElement.setAttribute("data-theme", theme)
      },

      setFontSize: (fontSize: ZineState["fontSize"]) => {
        set({ fontSize })
        document.documentElement.setAttribute("data-font-size", fontSize)
      },

      resetState: () => {
        set(initialState)
      },

      getNavigationState: (): NavigationState => {
        const state = get()
        return {
          currentPage: state.currentPage,
          totalPages: ZINE_CONFIG.totalPages,
          canGoNext: state.currentPage < ZINE_CONFIG.totalPages,
          canGoPrevious: state.currentPage > 1,
        }
      },

      canNavigateNext: () => {
        return get().currentPage < ZINE_CONFIG.totalPages
      },

      canNavigatePrevious: () => {
        return get().currentPage > 1
      },
    }),
    {
      name: "zine-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        visitedPages: Array.from(state.visitedPages), // Convert Set to Array for serialization
        theme: state.theme,
        fontSize: state.fontSize,
        effectsEnabled: state.effectsEnabled,
        animationsEnabled: state.animationsEnabled,
        keyboardNavigationEnabled: state.keyboardNavigationEnabled,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.visitedPages) {
          // Convert Array back to Set after rehydration
          state.visitedPages = new Set(state.visitedPages as unknown as number[])
        }
      },
    },
  ),
)

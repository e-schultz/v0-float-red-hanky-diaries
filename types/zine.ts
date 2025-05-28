export interface ZinePage {
  id: number
  title: string
  subtitle: string
  content: ZinePageContent
}

export interface ZinePageContent {
  sections: ContentSection[]
}

export interface ContentSection {
  type: "header" | "manifesto" | "quote" | "grid" | "code" | "ritual" | "list"
  data: any
  className?: string
}

export interface ZineConfig {
  totalPages: number
  animationTimings: {
    pageTransition: number
    slutprintFade: number
    ambientGeneration: number
  }
  effects: {
    ambientChance: number
    slutprintLifetime: number
  }
}

export interface NavigationState {
  currentPage: number
  totalPages: number
  canGoNext: boolean
  canGoPrevious: boolean
}

export interface SlutprintEffect {
  id: string
  x: number
  y: number
  timestamp: number
}

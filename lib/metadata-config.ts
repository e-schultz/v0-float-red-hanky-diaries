import { ZINE_CONTENT } from "@/data/zine-content"
import type { Metadata } from "next"
import type { ZinePage } from "@/types/zine"

export interface SocialCardConfig {
  title: string
  description: string
  image: string
  url: string
  siteName: string
  locale: string
  type: string
}

// Default social card configuration
export const DEFAULT_SOCIAL_CARD: SocialCardConfig = {
  title: "Red Hanky Popper Zine - Bottom Epistemology",
  description:
    "A Single Page Application in Bottom Epistemology exploring consciousness expansion and temporal activism.",
  image: "/api/og?page=1", // Default to first page OG image
  url: "https://red-hanky-zine.vercel.app",
  siteName: "Red Hanky Popper Zine",
  locale: "en_US",
  type: "website",
}

// Generate page-specific social card config
export function getPageSocialCard(pageId: number): SocialCardConfig {
  const page = ZINE_CONTENT.find((p) => p.id === pageId)

  if (!page) {
    return DEFAULT_SOCIAL_CARD
  }

  return {
    ...DEFAULT_SOCIAL_CARD,
    title: `${page.title} - Red Hanky Popper Zine`,
    description: page.subtitle,
    image: `/api/og?page=${pageId}`,
    url: `${DEFAULT_SOCIAL_CARD.url}?page=${pageId}`,
  }
}

// Generate metadata for Next.js
export function generateMetadata(page?: ZinePage): Metadata {
  const socialCard = page ? getPageSocialCard(page.id) : DEFAULT_SOCIAL_CARD

  return {
    title: socialCard.title,
    description: socialCard.description,
    openGraph: {
      title: socialCard.title,
      description: socialCard.description,
      url: socialCard.url,
      siteName: socialCard.siteName,
      images: [
        {
          url: socialCard.image,
          width: 1200,
          height: 630,
          alt: socialCard.title,
        },
      ],
      locale: socialCard.locale,
      type: socialCard.type,
    },
    twitter: {
      card: "summary_large_image",
      title: socialCard.title,
      description: socialCard.description,
      images: [socialCard.image],
      creator: "@redhankypopper",
      site: "@redhankypopper",
    },
    metadataBase: new URL(DEFAULT_SOCIAL_CARD.url),
  }
}

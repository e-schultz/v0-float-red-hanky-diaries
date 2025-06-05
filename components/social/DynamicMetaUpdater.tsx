"use client"

import { useEffect } from "react"
import { useZineStore } from "@/lib/state-manager"
import { getPageSocialCard } from "@/lib/metadata-config"
import { ZINE_CONTENT } from "@/data/zine-content"

export function DynamicMetaUpdater() {
  const currentPage = useZineStore((state) => state.currentPage)

  useEffect(() => {
    // Find the current page content
    const page = ZINE_CONTENT.find((p) => p.id === currentPage)
    if (!page) return

    // Get social card config for this page
    const socialCard = getPageSocialCard(currentPage)

    // Update document title
    document.title = socialCard.title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute("content", socialCard.description)
    }

    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]')
    if (canonicalLink) {
      canonicalLink.setAttribute("href", socialCard.url)
    } else {
      const link = document.createElement("link")
      link.rel = "canonical"
      link.href = socialCard.url
      document.head.appendChild(link)
    }

    // Update Open Graph meta tags
    updateMetaTag("og:title", socialCard.title)
    updateMetaTag("og:description", socialCard.description)
    updateMetaTag("og:image", socialCard.image)
    updateMetaTag("og:url", socialCard.url)

    // Update Twitter Card meta tags
    updateMetaTag("twitter:title", socialCard.title)
    updateMetaTag("twitter:description", socialCard.description)
    updateMetaTag("twitter:image", socialCard.image)
  }, [currentPage])

  // Helper function to update meta tags
  function updateMetaTag(property: string, content: string) {
    // Check if property uses og: or twitter: prefix
    const selector = property.startsWith("og:") ? `meta[property="${property}"]` : `meta[name="${property}"]`

    const metaTag = document.querySelector(selector)

    if (metaTag) {
      metaTag.setAttribute("content", content)
    } else {
      const meta = document.createElement("meta")
      if (property.startsWith("og:")) {
        meta.setAttribute("property", property)
      } else {
        meta.setAttribute("name", property)
      }
      meta.setAttribute("content", content)
      document.head.appendChild(meta)
    }
  }

  return null // This component doesn't render anything
}

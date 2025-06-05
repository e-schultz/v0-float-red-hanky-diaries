"use client"

import { useState, useEffect } from "react"
import { useZineStore } from "@/lib/state-manager"
import { getPageSocialCard } from "@/lib/metadata-config"

interface SocialCardPreviewProps {
  isOpen: boolean
  onClose: () => void
}

export function SocialCardPreview({ isOpen, onClose }: SocialCardPreviewProps) {
  const currentPage = useZineStore((state) => state.currentPage)
  const [socialCard, setSocialCard] = useState(() => getPageSocialCard(currentPage))

  useEffect(() => {
    if (isOpen) {
      setSocialCard(getPageSocialCard(currentPage))
    }
  }, [currentPage, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[2000] p-4">
      <div className="bg-void-black border-2 border-red-hanky rounded-lg max-w-3xl w-full overflow-hidden">
        <div className="p-4 border-b border-red-hanky flex justify-between items-center">
          <h2 className="text-xl font-bold text-red-hanky">Social Card Preview</h2>
          <button
            onClick={onClose}
            className="text-shimmer-white hover:text-red-hanky transition-colors"
            aria-label="Close preview"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Twitter Card Preview */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-popper-gold">Twitter Card</h3>
            <div className="border border-gray-700 rounded-lg overflow-hidden max-w-md">
              <div className="aspect-[1.91/1] bg-gray-900 relative">
                <img
                  src={socialCard.image || "/placeholder.svg"}
                  alt="Twitter card preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `/api/og?page=${currentPage}`
                  }}
                />
              </div>
              <div className="p-3 bg-gray-800">
                <div className="text-sm text-gray-400">red-hanky-zine.vercel.app</div>
                <div className="font-bold text-white">{socialCard.title}</div>
                <div className="text-sm text-gray-300 line-clamp-2">{socialCard.description}</div>
              </div>
            </div>
          </div>

          {/* Facebook/OG Preview */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-popper-gold">Facebook/Open Graph</h3>
            <div className="border border-gray-700 rounded-lg overflow-hidden max-w-md">
              <div className="aspect-[1.91/1] bg-gray-900 relative">
                <img
                  src={socialCard.image || "/placeholder.svg"}
                  alt="Open Graph preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `/api/og?page=${currentPage}`
                  }}
                />
              </div>
              <div className="p-3 bg-gray-800">
                <div className="text-xs text-gray-400 uppercase">{socialCard.siteName}</div>
                <div className="font-bold text-white">{socialCard.title}</div>
                <div className="text-sm text-gray-300 line-clamp-3">{socialCard.description}</div>
              </div>
            </div>
          </div>

          {/* Meta Information */}
          <div className="space-y-2 border-t border-gray-700 pt-4">
            <h3 className="text-lg font-semibold text-popper-gold">Meta Information</h3>
            <div className="font-mono text-sm bg-gray-900 p-3 rounded overflow-auto">
              <pre className="text-shimmer-white">
                {`// Open Graph Meta Tags
<meta property="og:title" content="${socialCard.title}" />
<meta property="og:description" content="${socialCard.description}" />
<meta property="og:image" content="${socialCard.image}" />
<meta property="og:url" content="${socialCard.url}" />
<meta property="og:type" content="${socialCard.type}" />
<meta property="og:site_name" content="${socialCard.siteName}" />
<meta property="og:locale" content="${socialCard.locale}" />

// Twitter Card Meta Tags
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${socialCard.title}" />
<meta name="twitter:description" content="${socialCard.description}" />
<meta name="twitter:image" content="${socialCard.image}" />
<meta name="twitter:creator" content="@redhankypopper" />
<meta name="twitter:site" content="@redhankypopper" />`}
              </pre>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-hanky text-shimmer-white rounded-full hover:bg-flesh-pink transition-colors"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  )
}

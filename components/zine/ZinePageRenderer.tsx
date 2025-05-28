"use client"

import { memo } from "react"
import type { ZinePage, ContentSection } from "@/types/zine"
import { useZineStore } from "@/lib/state-manager"

interface ZinePageRendererProps {
  page: ZinePage
  isActive: boolean
  slideDirection?: "next" | "prev" | null
}

const ContentSectionRenderer = memo(function ContentSectionRenderer({
  section,
  index,
}: {
  section: ContentSection
  index: number
}) {
  switch (section.type) {
    case "header":
      return (
        <div key={index} className="section-title">
          {section.data.title}{" "}
          {section.data.sigil && (
            <span className={`float-sigil animate-sigil-pulse ${section.data.className || ""}`}>
              {section.data.sigil}
            </span>
          )}
        </div>
      )

    case "manifesto":
      return (
        <div key={index}>
          {section.data.paragraphs.map((paragraph: string, pIndex: number) => (
            <div key={pIndex} className="manifesto-text" dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      )

    case "quote":
      return (
        <div key={index} className={`quote-block ${section.data.className || ""}`}>
          {section.data.text}
        </div>
      )

    case "grid":
      return (
        <div key={index} className="ethics-grid">
          {section.data.cards.map((card: any, cardIndex: number) => (
            <div key={cardIndex} className="ethics-card">
              <h4 className="card-title">{card.title}</h4>
              <p>{card.content}</p>
            </div>
          ))}
        </div>
      )

    case "code":
      return (
        <div key={index} className="code-block">
          {section.data.content}
        </div>
      )

    case "ritual":
      return (
        <div key={index} className="ritual-instructions">
          <h3 className="section-title">{section.data.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: section.data.content }} />
        </div>
      )

    case "list":
      return (
        <ul key={index} className="methodology-list">
          {section.data.items.map((item: any, itemIndex: number) => (
            <li key={itemIndex}>
              <strong>{item.title}:</strong> {item.description}
            </li>
          ))}
        </ul>
      )

    default:
      return null
  }
})

export const ZinePageRenderer = memo(function ZinePageRenderer({
  page,
  isActive,
  slideDirection,
}: ZinePageRendererProps) {
  const animationsEnabled = useZineStore((state) => state.animationsEnabled)

  const pageClasses = [
    "page",
    isActive ? "active" : "",
    slideDirection ? `slide-direction-${slideDirection}` : "",
    !animationsEnabled ? "animations-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={pageClasses} data-page={page.id}>
      <div className="page-header">
        <h1 className={`page-title ${page.id === 1 ? "animate-shimmer" : ""}`}>{page.title}</h1>
        <p className="page-subtitle">{page.subtitle}</p>
      </div>

      <div className="content-section">
        {page.content.sections.map((section, index) => (
          <ContentSectionRenderer key={index} section={section} index={index} />
        ))}
      </div>
    </div>
  )
})

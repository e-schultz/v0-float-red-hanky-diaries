import type { ReactNode } from "react"

interface ZinePageProps {
  children: ReactNode
  pageNumber: number
  currentPage: number
}

export function ZinePage({ children, pageNumber, currentPage }: ZinePageProps) {
  return (
    <div className={`page ${pageNumber === currentPage ? "active" : ""}`} data-page={pageNumber}>
      {children}
    </div>
  )
}

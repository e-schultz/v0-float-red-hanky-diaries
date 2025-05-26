interface PageIndicatorProps {
  currentPage: number
  totalPages: number
}

export function PageIndicator({ currentPage, totalPages }: PageIndicatorProps) {
  return (
    <div className="page-indicator">
      <span id="current-page">{currentPage}</span> / <span id="total-pages">{totalPages}</span>
    </div>
  )
}

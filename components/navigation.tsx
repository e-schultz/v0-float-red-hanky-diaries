"use client"

interface NavigationProps {
  currentPage: number
  totalPages: number
  onNext: () => void
  onPrevious: () => void
}

export function Navigation({ currentPage, totalPages, onNext, onPrevious }: NavigationProps) {
  return (
    <div className="navigation">
      <button className="nav-btn" id="prev-btn" onClick={onPrevious} disabled={currentPage === 1}>
        ← Previous
      </button>
      <button className="nav-btn" id="next-btn" onClick={onNext} disabled={currentPage === totalPages}>
        Next →
      </button>
    </div>
  )
}

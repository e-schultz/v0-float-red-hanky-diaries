import type { ReactNode } from "react"

interface ZineContainerProps {
  children: ReactNode
}

export function ZineContainer({ children }: ZineContainerProps) {
  return <div className="zine-container">{children}</div>
}

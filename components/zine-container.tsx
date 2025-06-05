import type { ReactNode } from "react"
import { SimpleShareButton } from "@/components/social/SimpleShareButton"

interface ZineContainerProps {
  children: ReactNode
}

export function ZineContainer({ children }: ZineContainerProps) {
  return (
    <div className="zine-container">
      {children}
      <SimpleShareButton />
    </div>
  )
}

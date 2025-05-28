"use client"

import { SlutprintEffect } from "./SlutprintEffect"
import type { SlutprintEffect as SlutprintEffectType } from "@/types/zine"

interface SlutprintContainerProps {
  effects: SlutprintEffectType[]
}

export function SlutprintContainer({ effects }: SlutprintContainerProps) {
  return (
    <>
      {effects.map((effect) => (
        <SlutprintEffect key={effect.id} effect={effect} />
      ))}
    </>
  )
}

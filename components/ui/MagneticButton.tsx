"use client"

import { useEffect, useRef } from "react"
import { initMagnetic, addRipple } from "@/lib/animations"
import Link from "next/link"

interface Props {
  children: React.ReactNode
  href?: string
  className?: string
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
}

export function MagneticButton({ children, href, className = "", onClick, type = "button", disabled }: Props) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const cleanupMagnetic = initMagnetic(ref.current)
    addRipple(ref.current)
    return () => {
      cleanupMagnetic()
    }
  }, [])

  const baseClasses = `relative inline-flex items-center justify-center overflow-hidden rounded-full font-display font-semibold tracking-wide transition-colors ${className}`

  if (href) {
    return (
      <Link href={href} ref={ref as any} className={baseClasses} onClick={onClick}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Link>
    )
  }

  return (
    <button ref={ref as any} type={type} className={baseClasses} onClick={onClick} disabled={disabled}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}

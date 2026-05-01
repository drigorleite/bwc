'use client'

import { useEffect, useRef } from 'react'

/**
 * AdSlot — renders a real Google AdSense ad unit.
 *
 * Publisher ID: ca-pub-9440937515445471
 *
 * The `adSlot` prop is the specific ad unit ID from your AdSense dashboard.
 * If omitted, AdSense auto ads will fill the container automatically.
 */

const FORMAT_CONFIG = {
  horizontal: {
    style:     { display: 'block' } as React.CSSProperties,
    adFormat:  'auto',
    fullWidth: true,
    minHeight: 90,
  },
  rectangle: {
    style:     { display: 'block' } as React.CSSProperties,
    adFormat:  'rectangle',
    fullWidth: false,
    minHeight: 250,
  },
  sidebar: {
    style:     { display: 'inline-block', width: '160px', height: '600px' } as React.CSSProperties,
    adFormat:  'vertical',
    fullWidth: false,
    minHeight: 600,
  },
} as const

const PUBLISHER_ID = 'ca-pub-9440937515445471'

interface Props {
  id: string
  format?: keyof typeof FORMAT_CONFIG
  /** Specific ad unit slot ID from AdSense dashboard (optional) */
  adSlot?: string
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export default function AdSlot({ id, format = 'horizontal', adSlot, className }: Props) {
  const pushed = useRef(false)
  const config = FORMAT_CONFIG[format]

  useEffect(() => {
    if (pushed.current) return
    if (typeof window === 'undefined') return
    try {
      window.adsbygoogle = window.adsbygoogle || []
      window.adsbygoogle.push({})
      pushed.current = true
    } catch (_) {
      // AdSense script not yet loaded — will be retried on next render
    }
  }, [])

  return (
    <div
      className={`my-6 flex flex-col items-center gap-1 overflow-hidden ${className ?? ''}`}
      data-ad-container={id}
    >
      <span className="text-[10px] uppercase tracking-widest text-gray-400">
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{
          ...config.style,
          minHeight: config.minHeight,
          width: config.fullWidth ? '100%' : undefined,
        }}
        data-ad-client={PUBLISHER_ID}
        {...(adSlot ? { 'data-ad-slot': adSlot } : {})}
        data-ad-format={config.adFormat}
        {...(config.fullWidth ? { 'data-full-width-responsive': 'true' } : {})}
      />
    </div>
  )
}

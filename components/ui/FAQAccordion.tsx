'use client'

import { useState } from 'react'
import { FAQ } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  faqs: FAQ[]
}

export default function FAQAccordion({ faqs }: Props) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="divide-y divide-gray-100 rounded-xl border border-gray-100">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left"
            aria-expanded={open === i}
          >
            <span className="font-medium text-gray-900">{faq.question}</span>
            <span
              className={cn(
                'mt-0.5 shrink-0 text-brand-600 transition-transform duration-200',
                open === i && 'rotate-180',
              )}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </span>
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm leading-relaxed text-gray-600">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

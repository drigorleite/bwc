'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Locale } from '@/types'
import { localeNames } from '@/lib/i18n'

interface Props {
  locale: Locale
}

export default function LanguageSwitcher({ locale }: Props) {
  const pathname = usePathname()

  function getAlternateHref(targetLocale: Locale) {
    const segments = pathname.split('/')
    segments[1] = targetLocale
    return segments.join('/')
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-0.5 text-sm">
      {(['en', 'pt-br'] as Locale[]).map((loc) => (
        <Link
          key={loc}
          href={getAlternateHref(loc)}
          className={`rounded-md px-2.5 py-1 font-medium transition-colors ${
            locale === loc
              ? 'bg-brand-600 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {loc === 'en' ? 'EN' : 'PT'}
        </Link>
      ))}
    </div>
  )
}

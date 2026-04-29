import { Locale } from '@/types'
import { t } from '@/lib/i18n'

interface Props {
  locale: Locale
  compact?: boolean
}

export default function AffiliateDisclosure({ locale, compact }: Props) {
  if (compact) {
    return (
      <p className="text-xs text-gray-500 italic">
        {t(locale, 'disclosure')}
      </p>
    )
  }

  return (
    <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
      <span className="mt-0.5 shrink-0 text-amber-500">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
      </span>
      <p className="text-xs text-amber-800">{t(locale, 'disclosure')}</p>
    </div>
  )
}

import { Locale } from '@/types'
import { t } from '@/lib/i18n'

interface Props {
  verdict: string
  locale: Locale
}

export default function FinalVerdictBox({ verdict, locale }: Props) {
  return (
    <div className="rounded-xl border-2 border-brand-200 bg-brand-50 p-6">
      <div className="mb-3 flex items-center gap-2">
        <svg className="h-5 w-5 text-brand-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L3.5 20.5l.5.5L12 17l8 4 .5-.5L12 2z"/>
        </svg>
        <h3 className="text-lg font-bold text-brand-900">{t(locale, 'verdict')}</h3>
      </div>
      <p className="text-gray-700 leading-relaxed">{verdict}</p>
    </div>
  )
}

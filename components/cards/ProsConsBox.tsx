import { Locale } from '@/types'
import { t } from '@/lib/i18n'

interface Props {
  pros: string[]
  cons: string[]
  locale: Locale
}

export default function ProsConsBox({ pros, cons, locale }: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-green-100 bg-green-50 p-4">
        <h4 className="mb-3 flex items-center gap-2 font-semibold text-green-800">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
          {t(locale, 'pros')}
        </h4>
        <ul className="space-y-1.5">
          {pros.map((pro, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-green-900">
              <span className="mt-0.5 shrink-0 text-green-500">+</span>
              {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-red-100 bg-red-50 p-4">
        <h4 className="mb-3 flex items-center gap-2 font-semibold text-red-800">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
          {t(locale, 'cons')}
        </h4>
        <ul className="space-y-1.5">
          {cons.map((con, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-red-900">
              <span className="mt-0.5 shrink-0 text-red-500">−</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

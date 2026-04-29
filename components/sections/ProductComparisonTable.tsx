import { ComparisonRow, Locale } from '@/types'
import { t } from '@/lib/i18n'
import RatingBadge from '@/components/ui/RatingBadge'
import AffiliateButton from '@/components/ui/AffiliateButton'

interface Props {
  rows: ComparisonRow[]
  locale: Locale
}

export default function ProductComparisonTable({ rows, locale }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            {[
              t(locale, 'best.for'),
              t(locale, 'strength'),
              t(locale, 'weakness'),
              t(locale, 'price.range'),
              t(locale, 'rating'),
              '',
            ].map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
              >
                {i === 0 ? (
                  <span>
                    {locale === 'en' ? 'Product' : 'Produto'} / {h}
                  </span>
                ) : h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((row, i) => (
            <tr key={i} className="bg-white transition-colors hover:bg-gray-50/60">
              <td className="px-4 py-4">
                <div className="font-semibold text-gray-900">{row.product}</div>
                <div className="text-xs text-gray-500">{row.bestFor}</div>
              </td>
              <td className="px-4 py-4 text-gray-700">{row.mainAdvantage}</td>
              <td className="px-4 py-4 text-gray-500">{row.mainDownside}</td>
              <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-900">{row.priceRange}</td>
              <td className="px-4 py-4">
                <RatingBadge rating={row.rating} />
              </td>
              <td className="px-4 py-4">
                <AffiliateButton
                  href={row.affiliateUrl}
                  locale={locale}
                  label="see"
                  variant="ghost"
                  size="sm"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

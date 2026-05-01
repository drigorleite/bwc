import Image from 'next/image'
import { Product, Locale } from '@/types'
import { t } from '@/lib/i18n'
import RatingBadge from '@/components/ui/RatingBadge'
import AffiliateButton from '@/components/ui/AffiliateButton'

interface Props {
  product: Product
  locale: Locale
  label?: string
  highlight?: boolean
}

const labelColors: Record<string, string> = {
  'Best Value':          'bg-green-100 text-green-800',
  'Best Premium':        'bg-purple-100 text-purple-800',
  'Best for Beginners':  'bg-blue-100 text-blue-800',
  'Best to Avoid':       'bg-red-100 text-red-800',
  'Melhor Custo-Benefício': 'bg-green-100 text-green-800',
  'Melhor Premium':      'bg-purple-100 text-purple-800',
  'Melhor para Iniciantes': 'bg-blue-100 text-blue-800',
  'Evitar':              'bg-red-100 text-red-800',
}

const productImageFallbacks: Record<string, string> = {
  'milwaukee-m18-fuel':
    'data:image/jpeg;base64,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',
}

export default function ProductRecommendationCard({ product, locale, label, highlight }: Props) {
  const affiliateUrl = locale === 'pt-br' && product.affiliateUrlBr
    ? product.affiliateUrlBr
    : product.affiliateUrl
  const imageSrc = product.image || productImageFallbacks[product.id] || ''
  const isDataImage = imageSrc.startsWith('data:')

  return (
    <div className={`relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
      highlight ? 'border-brand-300 ring-2 ring-brand-100' : 'border-gray-100'
    }`}>
      {label && (
        <div className="absolute left-4 top-4 z-10">
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${labelColors[label] ?? 'bg-gray-100 text-gray-700'}`}>
            {label}
          </span>
        </div>
      )}

      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
        {imageSrc ? (
          isDataImage ? (
            <img
              src={imageSrc}
              alt={product.name}
              className="h-full w-full object-contain p-4"
            />
          ) : (
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          )
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-400">
            <span className="text-5xl opacity-30">📦</span>
            <span className="text-xs font-semibold uppercase tracking-wide">Product image coming soon</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-gray-900 leading-snug">{product.name}</h3>
          <RatingBadge rating={product.rating} />
        </div>

        <div className="space-y-1.5 text-sm">
          <div className="flex gap-2">
            <span className="shrink-0 font-medium text-gray-500">{t(locale, 'best.for')}:</span>
            <span className="text-gray-700">{product.bestFor}</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 font-medium text-green-600">✓</span>
            <span className="text-gray-700">{product.mainStrength}</span>
          </div>
          <div className="flex gap-2">
            <span className="shrink-0 font-medium text-red-500">✗</span>
            <span className="text-gray-700">{product.mainWeakness}</span>
          </div>
        </div>

        <div className="mt-1 text-sm font-semibold text-gray-900">{product.priceRange}</div>

        <AffiliateButton
          href={affiliateUrl}
          locale={locale}
          label="check"
          variant="primary"
          size="md"
          className="mt-auto w-full justify-center"
        />
      </div>
    </div>
  )
}

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
  'Best Value': 'bg-green-100 text-green-800',
  'Best Premium': 'bg-purple-100 text-purple-800',
  'Best for Beginners': 'bg-blue-100 text-blue-800',
  'Best to Avoid': 'bg-red-100 text-red-800',
  'Melhor Custo-Benefício': 'bg-green-100 text-green-800',
  'Melhor Premium': 'bg-purple-100 text-purple-800',
  'Melhor para Iniciantes': 'bg-blue-100 text-blue-800',
  'Evitar': 'bg-red-100 text-red-800',
}

const productImageFallbacks: Record<string, string> = {
  'milwaukee-m18-fuel': '/images/drills/milwaukee-m18-fuel.svg',
  'dewalt-dck250': '/images/drills/dewalt-dck250.svg',
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
            <img src={imageSrc} alt={product.name} className="h-full w-full object-contain p-4" />
          ) : (
            <Image src={imageSrc} alt={product.name} fill className="object-contain p-4" />
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

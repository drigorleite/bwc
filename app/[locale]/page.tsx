import { Metadata } from 'next'
import { Locale } from '@/types'
import { t } from '@/lib/i18n'
import { getLocalePath, SITE_NAME } from '@/lib/utils'
import { categories } from '@/data/categories'
import { getFeaturedArticles } from '@/data/articles/index'
import AdSlot from '@/components/ui/AdSlot'

import HeroSection       from '@/components/sections/HeroSection'
import TrustBar          from '@/components/sections/TrustBar'
import CategoryGrid      from '@/components/sections/CategoryGrid'
import FeaturedArticles  from '@/components/sections/FeaturedArticles'
import HowWeChoose       from '@/components/sections/HowWeChoose'
import NewsletterSection from '@/components/sections/NewsletterSection'

interface Props { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  return {
    title:       locale === 'en' ? 'Honest Product Comparisons for Smarter Buying' : 'Comparações Honestas para Compras Mais Inteligentes',
    description: locale === 'en'
      ? 'Better Way Comparison: clear, honest product comparisons to help you buy the right product for your situation.'
      : 'Better Way Comparison: comparações honestas para ajudá-lo a comprar o produto certo para sua situação.',
    alternates: {
      canonical: `/${locale}`,
      languages: { 'en-US': '/en', 'pt-BR': '/pt-br' },
    },
  }
}

export default function HomePage({ params }: Props) {
  const locale   = params.locale as Locale
  const articles = getFeaturedArticles(locale, 7)

  return (
    <div>
      {/* 1. Hero */}
      <HeroSection locale={locale} />

      {/* 2. Trust signals marquee */}
      <TrustBar locale={locale} />

      {/* 3. Category grid */}
      <CategoryGrid
        categories={categories}
        locale={locale}
        title={t(locale, 'featured.categories')}
      />

      {/* 4. Mid-page ad slot */}
      <AdSlot id="home-mid" format="horizontal" />

      {/* 5. Featured articles */}
      <FeaturedArticles
        articles={articles}
        locale={locale}
        title={t(locale, 'featured.articles')}
      />

      {/* 6. How we choose — dark section */}
      <HowWeChoose locale={locale} />

      {/* 7. Newsletter CTA */}
      <NewsletterSection locale={locale} />
    </div>
  )
}

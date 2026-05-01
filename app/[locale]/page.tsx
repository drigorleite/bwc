import { Metadata } from 'next'
import { Locale } from '@/types'
import { t } from '@/lib/i18n'
import { getLocalePath, SITE_URL, SITE_NAME } from '@/lib/utils'
import { categories } from '@/data/categories'
import { getFeaturedArticles } from '@/data/articles/index'
import { buildBreadcrumbSchema, buildItemListSchema } from '@/lib/schema'
import AdSlot from '@/components/ui/AdSlot'

import HeroSection       from '@/components/sections/HeroSection'
import TrustBar          from '@/components/sections/TrustBar'
import CategoryGrid      from '@/components/sections/CategoryGrid'
import FeaturedArticles  from '@/components/sections/FeaturedArticles'
import HowWeChoose       from '@/components/sections/HowWeChoose'
import NewsletterSection from '@/components/sections/NewsletterSection'

interface Props { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale  = params.locale as Locale
  const isEN    = locale === 'en'
  const title   = isEN
    ? 'Honest Product Comparisons for Smarter Buying'
    : 'Comparações Honestas para Compras Mais Inteligentes'
  const desc    = isEN
    ? 'Better Way Comparison: clear, honest product comparisons to help you buy the right product for your exact situation. No paid placements, ever.'
    : 'Better Way Comparison: comparações honestas para ajudá-lo a comprar o produto certo para sua situação. Sem anúncios pagos.'
  const canonical = `${SITE_URL}/${locale}`

  return {
    title,
    description: desc,
    keywords: isEN
      ? ['product comparison', 'best products 2025', 'honest reviews', 'buying guide', 'product recommendations']
      : ['comparação de produtos', 'melhores produtos 2025', 'avaliações honestas', 'guia de compras'],
    alternates: {
      canonical,
      languages: {
        'en-US':     `${SITE_URL}/en`,
        'pt-BR':     `${SITE_URL}/pt-br`,
        'x-default': `${SITE_URL}/en`,
      },
    },
    openGraph: {
      title:       `${title} | ${SITE_NAME}`,
      description: desc,
      url:         canonical,
      siteName:    SITE_NAME,
      type:        'website',
      locale:      isEN ? 'en_US' : 'pt_BR',
      images: [{
        url: '/og-image.png', width: 1200, height: 630,
        alt: 'Better Way Comparison — Honest Product Comparisons',
      }],
    },
    twitter: {
      card:        'summary_large_image',
      site:        '@bwcomparison',
      title:       `${title} | ${SITE_NAME}`,
      description: desc,
      images:      [{ url: '/og-image.png', alt: 'Better Way Comparison' }],
    },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    },
  }
}

export default function HomePage({ params }: Props) {
  const locale   = params.locale as Locale
  const articles = getFeaturedArticles(locale, 7)

  // ── JSON-LD for homepage ────────────────────────────────────────────────────
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: locale === 'en' ? 'Home' : 'Início', url: `${SITE_URL}/${locale}` },
  ])
  const featuredListSchema = buildItemListSchema(
    articles.map((a) => ({ name: a.title, url: `${SITE_URL}/${locale}/${a.slug}`, description: a.metaDescription })),
    locale === 'en' ? 'Featured Comparison Guides' : 'Guias Comparativos em Destaque'
  )

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(featuredListSchema) }} />

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
    </>
  )
}

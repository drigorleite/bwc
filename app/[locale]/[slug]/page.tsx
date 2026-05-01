import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Locale } from '@/types'
import { t } from '@/lib/i18n'
import { getLocalePath, SITE_URL, SITE_NAME } from '@/lib/utils'
import { allArticles, getArticleBySlug } from '@/data/articles/index'
import { buildArticlePageSchemas } from '@/lib/schema'
import AffiliateDisclosure from '@/components/ui/AffiliateDisclosure'
import AffiliateButton from '@/components/ui/AffiliateButton'
import RatingBadge from '@/components/ui/RatingBadge'
import FAQAccordion from '@/components/ui/FAQAccordion'
import FinalVerdictBox from '@/components/ui/FinalVerdictBox'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AdSlot from '@/components/ui/AdSlot'
import ProductRecommendationCard from '@/components/cards/ProductRecommendationCard'
import ProsConsBox from '@/components/cards/ProsConsBox'
import ProductComparisonTable from '@/components/sections/ProductComparisonTable'

interface Props { params: { locale: string; slug: string } }

export async function generateStaticParams() {
  return allArticles.map((a) => ({ locale: a.locale, slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  const locale = params.locale as Locale
  const altLocale: Locale = locale === 'en' ? 'pt-br' : 'en'
  const altArticle = allArticles.find(
    (a) => a.locale === altLocale && a.slug.replace(/^(melhor-|best-)/, '') === article.slug.replace(/^(melhor-|best-)/, '')
  )

  return {
    title:       article.metaTitle,
    description: article.metaDescription,
    keywords:    [article.primaryKeyword, ...article.secondaryKeywords],
    authors:     [{ name: article.author }],
    openGraph: {
      title:         article.metaTitle,
      description:   article.metaDescription,
      type:          'article',
      url:           `${SITE_URL}/${locale}/${article.slug}`,
      siteName:      SITE_NAME,
      publishedTime: article.datePublished,
      modifiedTime:  article.dateModified,
      authors:       [article.author],
      section:       article.category,
      tags:          [article.primaryKeyword, ...article.secondaryKeywords],
      ...(article.heroImage ? { images: [{ url: article.heroImage, alt: article.title }] } : {
        images: [{ url: '/og-image.png', width: 1200, height: 630, alt: article.title }],
      }),
    },
    twitter: {
      card:        'summary_large_image',
      title:       article.metaTitle,
      description: article.metaDescription,
      images:      article.heroImage ? [article.heroImage] : ['/og-image.png'],
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/${article.slug}`,
      languages: {
        'en-US': altLocale === 'en' && altArticle
          ? `${SITE_URL}/en/${altArticle.slug}`
          : `${SITE_URL}/en/${article.slug}`,
        'pt-BR': altLocale === 'pt-br' && altArticle
          ? `${SITE_URL}/pt-br/${altArticle.slug}`
          : `${SITE_URL}/pt-br/${article.slug}`,
        'x-default': `${SITE_URL}/en/${article.slug}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
    },
  }
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const locale  = params.locale as Locale
  const schemas = buildArticlePageSchemas(article)

  const labelMap: Record<string, string> = ({
    en: {
      'Best for Beginners': 'Best for Beginners',
      'Best Value':         'Best Value',
      'Best Premium':       'Best Premium',
      'Best to Avoid':      'Best to Avoid',
      'Best Overall':       'Best Overall',
      'Best Compact':       'Best Compact',
    },
    'pt-br': {
      'Best for Beginners': 'Melhor para Iniciantes',
      'Best Value':         'Melhor Custo-Benefício',
      'Best Premium':       'Melhor Premium',
      'Best to Avoid':      'Evitar',
      'Best Overall':       'Melhor Geral',
      'Best Compact':       'Melhor Compacto',
    },
  } as Record<string, Record<string, string>>)[locale] ?? {}

  const categorySlug = article.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  return (
    <>
      {/* JSON-LD structured data */}
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Breadcrumbs */}
        <Breadcrumbs crumbs={[
          { label: locale === 'en' ? 'Home' : 'Início', href: getLocalePath(locale) },
          { label: article.category, href: getLocalePath(locale, `category/${categorySlug}`) },
          { label: article.title },
        ]} />

        {/* Article header */}
        <header className="mt-6">
          <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
            {article.category}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
            {article.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>
              {t(locale, 'by')}{' '}
              <span className="font-medium text-gray-700">{article.author}</span>
            </span>
            <span>·</span>
            <time dateTime={article.dateModified}>
              {t(locale, 'updated')}{' '}
              {new Date(article.dateModified).toLocaleDateString(
                locale === 'pt-br' ? 'pt-BR' : 'en-US',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </time>
          </div>
        </header>

        {/* Affiliate disclosure */}
        <div className="mt-6">
          <AffiliateDisclosure locale={locale} />
        </div>

        {/* Intro */}
        <p className="mt-6 text-lg leading-relaxed text-gray-700">{article.intro}</p>

        {/* Quick Recommendation Summary */}
        <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <h2 className="mb-4 text-lg font-bold text-gray-900">
            {locale === 'en' ? '⚡ Quick Summary — Best Picks' : '⚡ Resumo Rápido — Melhores Escolhas'}
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {article.recommendationCards.map((card) => {
              const product = article.products.find((p) => p.id === card.productId)
              return (
                <div key={card.label} className="flex items-start gap-3 rounded-xl bg-white p-3 shadow-sm">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {card.label.slice(0, 1)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-brand-600">{labelMap[card.label] ?? card.label}</div>
                    <div className="text-sm font-medium text-gray-900">{card.productName}</div>
                    <div className="text-xs text-gray-500">{card.reason}</div>
                  </div>
                  {product && (
                    <RatingBadge rating={product.rating} size="sm" className="ml-auto shrink-0" />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Product Cards */}
        <section className="mt-10" aria-label={locale === 'en' ? 'Top Picks' : 'Melhores Escolhas'}>
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            {locale === 'en' ? 'Top Picks' : 'Melhores Escolhas'}
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {article.products.map((product, i) => {
              const card = article.recommendationCards.find((c) => c.productId === product.id)
              const label = card ? (labelMap[card.label] ?? card.label) : undefined
              return (
                <ProductRecommendationCard
                  key={product.id}
                  product={product}
                  locale={locale}
                  label={label}
                  highlight={i === 0}
                />
              )
            })}
          </div>
        </section>

        <AdSlot id="article-mid-1" format="horizontal" />

        {/* Comparison Table */}
        <section className="mt-10" aria-label={t(locale, 'comparison.table')}>
          <h2 className="mb-4 text-2xl font-bold text-gray-900">{t(locale, 'comparison.table')}</h2>
          <ProductComparisonTable rows={article.comparisonTable} locale={locale} />
        </section>

        <AdSlot id="article-mid-2" format="horizontal" />

        {/* Individual Reviews */}
        {article.reviews.map((review) => (
          <section key={review.productId} className="mt-12 border-t border-gray-100 pt-10" aria-label={review.productName}>
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-900">{review.productName}</h2>
              <RatingBadge rating={review.rating} size="lg" showLabel />
            </div>
            <p className="mb-6 text-gray-700 leading-relaxed">{review.overview}</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {([
                [t(locale, 'build.quality'), review.buildQuality],
                [t(locale, 'performance'),   review.performance],
                [t(locale, 'value'),         review.valueForMoney],
              ] as [string, string][]).map(([title, content]) => (
                <div key={title} className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{content}</p>
                </div>
              ))}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-gray-500">{t(locale, 'who.should.buy')}</h3>
                <p className="text-sm text-green-700">{review.whoShouldBuy}</p>
                <h3 className="mb-1.5 mt-3 text-xs font-semibold uppercase tracking-wider text-gray-500">{t(locale, 'who.should.avoid')}</h3>
                <p className="text-sm text-red-600">{review.whoShouldAvoid}</p>
              </div>
            </div>
            <div className="mt-4">
              <ProsConsBox pros={review.pros} cons={review.cons} locale={locale} />
            </div>
            <div className="mt-5">
              <AffiliateButton href={review.affiliateUrl} locale={locale} label="check" variant="primary" size="lg" />
            </div>
          </section>
        ))}

        <AdSlot id="article-pre-faq" format="horizontal" />

        {/* Final Verdict */}
        <div className="mt-10">
          <FinalVerdictBox verdict={article.finalVerdict} locale={locale} />
        </div>

        {/* FAQ — marked up for FAQPage rich result */}
        {article.faqs.length > 0 && (
          <section className="mt-10" aria-label={t(locale, 'faq')}>
            <h2 className="mb-6 text-2xl font-bold text-gray-900">{t(locale, 'faq')}</h2>
            <FAQAccordion faqs={article.faqs} />
          </section>
        )}

        {/* Internal Links */}
        {article.internalLinks.length > 0 && (
          <nav className="mt-10 border-t border-gray-100 pt-8" aria-label={t(locale, 'related')}>
            <h3 className="mb-4 text-lg font-bold text-gray-900">{t(locale, 'related')}</h3>
            <div className="flex flex-wrap gap-3">
              {article.internalLinks.map((link) => (
                <Link
                  key={link.slug}
                  href={getLocalePath(link.locale, link.slug)}
                  className="rounded-lg border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 transition-colors hover:bg-brand-100"
                >
                  {link.title} →
                </Link>
              ))}
            </div>
          </nav>
        )}

        {/* Bottom disclosure */}
        <div className="mt-10 border-t border-gray-100 pt-6">
          <AffiliateDisclosure locale={locale} compact />
        </div>
      </div>
    </>
  )
}

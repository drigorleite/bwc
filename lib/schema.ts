/**
 * lib/schema.ts
 * Centralised JSON-LD schema builders for Better Way Comparison.
 * All schemas are validated against schema.org and Google's Rich Results spec.
 */

import { Article, Locale } from '@/types'
import { SITE_URL, SITE_NAME } from '@/lib/utils'

// ─── WebSite (sitelinks searchbox eligible) ──────────────────────────────────
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Clear, honest product comparisons for smarter buying decisions.',
    inLanguage: ['en-US', 'pt-BR'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/en/best-products?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

// ─── Organization ─────────────────────────────────────────────────────────────
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      url: `${SITE_URL}/en/contact`,
    },
  }
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────
export function buildBreadcrumbSchema(
  crumbs: { name: string; url?: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      ...(crumb.url ? { item: crumb.url } : {}),
    })),
  }
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────
export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ─── Article (Review Article) ─────────────────────────────────────────────────
export function buildArticleSchema(article: Article) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ReviewNewsArticle',
    headline: article.title,
    description: article.metaDescription,
    url: `${SITE_URL}/${article.locale}/${article.slug}`,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-512.png`,
      },
    },
    inLanguage: article.locale === 'pt-br' ? 'pt-BR' : 'en-US',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${article.locale}/${article.slug}`,
    },
    ...(article.heroImage ? { image: article.heroImage } : {}),
    keywords: [article.primaryKeyword, ...article.secondaryKeywords].join(', '),
  }
}

// ─── Product with Review ──────────────────────────────────────────────────────
export function buildProductSchemas(article: Article) {
  return article.products.map((p) => {
    const review = article.reviews.find((r) => r.productId === p.id)
    const priceParts = p.priceRange.replace(/[^0-9–\-]/g, '').split(/[–\-]/)
    const lowPrice = priceParts[0] ?? ''
    const highPrice = priceParts[1] ?? priceParts[0] ?? ''

    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: p.bestFor,
      sku: p.asin,
      brand: {
        '@type': 'Brand',
        name: p.name.split(' ')[0],
      },
      ...(p.image ? { image: p.image } : {}),
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: article.locale === 'pt-br' ? 'BRL' : 'USD',
        ...(lowPrice ? { lowPrice } : {}),
        ...(highPrice ? { highPrice } : {}),
        offerCount: 1,
        availability: 'https://schema.org/InStock',
        url: article.locale === 'pt-br' && p.affiliateUrlBr ? p.affiliateUrlBr : p.affiliateUrl,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: p.rating,
        bestRating: 10,
        worstRating: 0,
        reviewCount: review ? 1 : 1,
      },
      ...(review
        ? {
            review: {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: review.rating,
                bestRating: 10,
                worstRating: 0,
              },
              author: {
                '@type': 'Person',
                name: article.author,
              },
              datePublished: article.datePublished,
              reviewBody: review.overview,
              positiveNotes: {
                '@type': 'ItemList',
                itemListElement: review.pros.map((pro, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  name: pro,
                })),
              },
              negativeNotes: {
                '@type': 'ItemList',
                itemListElement: review.cons.map((con, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  name: con,
                })),
              },
            },
          }
        : {}),
    }
  })
}

// ─── ItemList (for category/best-products pages) ─────────────────────────────
export function buildItemListSchema(
  items: { name: string; url: string; description?: string }[],
  listName: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  }
}

// ─── Helper: render all schemas for an article page ──────────────────────────
export function buildArticlePageSchemas(article: Article) {
  const schemas = []

  schemas.push(
    buildBreadcrumbSchema([
      { name: 'Home', url: `${SITE_URL}/${article.locale}` },
      {
        name: article.category,
        url: `${SITE_URL}/${article.locale}/category/${article.category
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')}`,
      },
      { name: article.title, url: `${SITE_URL}/${article.locale}/${article.slug}` },
    ])
  )

  schemas.push(buildArticleSchema(article))

  const faqSchema = buildFAQSchema(article.faqs)
  if (faqSchema) schemas.push(faqSchema)

  schemas.push(...buildProductSchemas(article))

  return schemas
}

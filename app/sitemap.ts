import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/utils'
import { allArticles } from '@/data/articles/index'
import { categories } from '@/data/categories'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'pt-br'] as const
  const now = new Date().toISOString()

  const entries: MetadataRoute.Sitemap = []

  // ── Root redirect ─────────────────────────────────────────────────────────
  entries.push({
    url: SITE_URL,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  })

  // ── Home pages ────────────────────────────────────────────────────────────
  for (const locale of locales) {
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    })
  }

  // ── Static pages ──────────────────────────────────────────────────────────
  const staticPages = ['best-products', 'about', 'contact', 'affiliate-disclosure', 'privacy-policy', 'terms']
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${SITE_URL}/${locale}/${page}`,
        lastModified: now,
        changeFrequency: page === 'best-products' ? 'weekly' : 'monthly',
        priority: page === 'best-products' ? 0.8 : 0.4,
      })
    }
  }

  // ── Category pages ────────────────────────────────────────────────────────
  for (const locale of locales) {
    for (const cat of categories) {
      entries.push({
        url: `${SITE_URL}/${locale}/category/${cat.slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    }
  }

  // ── Article pages ─────────────────────────────────────────────────────────
  for (const article of allArticles) {
    entries.push({
      url: `${SITE_URL}/${article.locale}/${article.slug}`,
      lastModified: article.dateModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    })
  }

  return entries
}

import Link from 'next/link'
import Image from 'next/image'
import { Article, Locale } from '@/types'
import { getLocalePath } from '@/lib/utils'

interface Props {
  articles: Pick<Article, 'slug' | 'title' | 'metaDescription' | 'category' | 'heroImage' | 'datePublished' | 'locale'>[]
  locale: Locale
  title: string
}

const categoryColors: Record<string, string> = {
  'Kitchen & Home':          '#34c759',
  'Beauty & Skincare':       '#ff6b35',
  'Watches & Style':         '#0a84ff',
  'Tools & Home Improvement':'#ff9500',
  'Office & Productivity':   '#5856d6',
  'Pet Tech':                '#ff2d55',
  'Travel & Lifestyle':      '#007aff',
}

export default function FeaturedArticles({ articles, locale, title }: Props) {
  if (articles.length === 0) return null

  const [featured, ...rest] = articles

  return (
    <section className="bg-gray-50 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-8xl">
        {/* Section header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mb-3 inline-block rounded-full bg-brand-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-600">
              {locale === 'en' ? 'Latest research' : 'Pesquisa recente'}
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
          </div>
          <Link
            href={getLocalePath(locale, 'best-products')}
            className="inline-flex items-center gap-1.5 rounded-xl border border-brand-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-600 shadow-sm transition-all hover:bg-brand-50 hover:shadow-md"
          >
            {locale === 'en' ? 'View all comparisons' : 'Ver todas as comparações'}
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

        {/* Featured layout: 1 large + grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Large featured card */}
          <Link
            href={getLocalePath(locale, featured.slug)}
            className="group relative col-span-1 flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-brand-200 lg:col-span-1"
          >
            <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100 sm:h-64">
              {featured.heroImage ? (
                <Image
                  src={featured.heroImage}
                  alt={featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl opacity-30">📦</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <span
                className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold text-white"
                style={{ backgroundColor: categoryColors[featured.category] ?? '#0066dd' }}
              >
                {featured.category}
              </span>
              <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                {locale === 'en' ? 'Featured' : 'Destaque'}
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6">
              <h3 className="text-lg font-extrabold leading-snug text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                {featured.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                {featured.metaDescription}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {new Date(featured.datePublished).toLocaleDateString(
                    locale === 'pt-br' ? 'pt-BR' : 'en-US',
                    { year: 'numeric', month: 'short', day: 'numeric' }
                  )}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:underline">
                  {locale === 'en' ? 'Read comparison' : 'Ler comparação'}
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </div>
          </Link>

          {/* Remaining cards in 2-col grid */}
          <div className="col-span-1 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={getLocalePath(locale, article.slug)}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-brand-200"
              >
                <div className="relative h-40 w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  {article.heroImage ? (
                    <Image
                      src={article.heroImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-4xl opacity-20">📦</span>
                    </div>
                  )}
                  <span
                    className="absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                    style={{ backgroundColor: categoryColors[article.category] ?? '#0066dd' }}
                  >
                    {article.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h3 className="text-sm font-bold leading-snug text-gray-900 group-hover:text-brand-700 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{article.metaDescription}</p>
                  <span className="mt-auto text-xs text-gray-400">
                    {new Date(article.datePublished).toLocaleDateString(
                      locale === 'pt-br' ? 'pt-BR' : 'en-US',
                      { year: 'numeric', month: 'short', day: 'numeric' }
                    )}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

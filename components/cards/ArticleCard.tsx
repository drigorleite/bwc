import Link from 'next/link'
import Image from 'next/image'
import { Article, Locale } from '@/types'
import { getLocalePath } from '@/lib/utils'

interface Props {
  article: Pick<Article, 'slug' | 'title' | 'metaDescription' | 'category' | 'heroImage' | 'datePublished' | 'locale'>
  locale: Locale
}

export default function ArticleCard({ article, locale }: Props) {
  const href = getLocalePath(locale, article.slug)

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200">
        {article.heroImage ? (
          <Image src={article.heroImage} alt={article.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl opacity-20">
            📦
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-gray-700 backdrop-blur-sm">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-bold text-gray-900 leading-snug group-hover:text-brand-700 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
          {article.metaDescription}
        </p>
        <span className="mt-auto text-xs text-gray-400">
          {new Date(article.datePublished).toLocaleDateString(
            locale === 'pt-br' ? 'pt-BR' : 'en-US',
            { year: 'numeric', month: 'short', day: 'numeric' }
          )}
        </span>
      </div>
    </Link>
  )
}

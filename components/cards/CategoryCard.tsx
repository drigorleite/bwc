import Link from 'next/link'
import { Category, Locale } from '@/types'
import { getLocalePath } from '@/lib/utils'

interface Props {
  category: Category
  locale: Locale
}

export default function CategoryCard({ category, locale }: Props) {
  return (
    <Link
      href={getLocalePath(locale, `category/${category.slug}`)}
      className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
    >
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
        style={{ backgroundColor: category.color + '22' }}
      >
        {category.icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
          {category.name[locale]}
        </h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {category.description[locale]}
        </p>
      </div>
      <span className="mt-auto text-xs font-medium text-brand-600 group-hover:underline">
        {locale === 'en' ? 'See comparisons →' : 'Ver comparações →'}
      </span>
    </Link>
  )
}

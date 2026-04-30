import Link from 'next/link'
import { Category, Locale } from '@/types'
import { getLocalePath } from '@/lib/utils'

interface Props {
  categories: Category[]
  locale: Locale
  title: string
}

export default function CategoryGrid({ categories, locale, title }: Props) {
  return (
    <section className="mx-auto max-w-8xl px-4 py-20 sm:px-6">
      {/* Section header */}
      <div className="mb-12 text-center">
        <span className="mb-3 inline-block rounded-full bg-brand-50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-600">
          {locale === 'en' ? 'Browse by topic' : 'Navegar por tópico'}
        </span>
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-gray-500">
          {locale === 'en'
            ? 'Pick a category and find the best product for your exact situation.'
            : 'Escolha uma categoria e encontre o melhor produto para a sua situação.'}
        </p>
      </div>

      {/* Category grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
        {categories.map((cat, i) => (
          <Link
            key={cat.slug}
            href={getLocalePath(locale, `category/${cat.slug}`)}
            className={`gradient-border-card group flex flex-col items-center gap-3 p-5 text-center animate-fade-in-up delay-${Math.min((i + 1) * 100, 800)}`}
          >
            {/* Icon bubble */}
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-sm transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundColor: cat.color + '18' }}
            >
              {cat.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 leading-tight group-hover:text-brand-700 transition-colors">
                {cat.name[locale]}
              </h3>
            </div>
            <span
              className="mt-auto inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors"
              style={{ backgroundColor: cat.color + '18', color: cat.color }}
            >
              {locale === 'en' ? 'Explore →' : 'Explorar →'}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}

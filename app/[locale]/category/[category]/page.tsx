import { Metadata } from 'next'
import { Locale } from '@/types'
import { getLocalePath } from '@/lib/utils'
import { categories } from '@/data/categories'
import { getArticlesByCategory } from '@/data/articles/index'
import ArticleCard from '@/components/cards/ArticleCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AdSlot from '@/components/ui/AdSlot'

interface Props { params: { locale: string; category: string } }

export async function generateStaticParams() {
  const params: { locale: string; category: string }[] = []
  for (const cat of categories) {
    params.push({ locale: 'en',    category: cat.slug })
    params.push({ locale: 'pt-br', category: cat.slug })
  }
  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  const cat = categories.find((c) => c.slug === params.category)
  if (!cat) return {}
  return {
    title:       cat.name[locale],
    description: cat.description[locale],
  }
}

export default function CategoryPage({ params }: Props) {
  const locale = params.locale as Locale
  const cat    = categories.find((c) => c.slug === params.category)
  const catName = cat?.name[locale] ?? params.category

  const catNamesEN: Record<string, string> = {
    'watches-style': 'Watches & Style', 'beauty-skincare': 'Beauty & Skincare', 'kitchen-home': 'Kitchen & Home',
    'tools-home-improvement': 'Tools & Home Improvement', 'office-productivity': 'Office & Productivity', 'pet-tech': 'Pet Tech',
  }
  const catNamesPT: Record<string, string> = {
    'watches-style': 'Relógios & Estilo', 'beauty-skincare': 'Beleza & Skincare', 'kitchen-home': 'Cozinha & Casa',
    'tools-home-improvement': 'Ferramentas & Reforma', 'office-productivity': 'Escritório & Produtividade', 'pet-tech': 'Pet Tech',
  }
  const lookupName = locale === 'en' ? catNamesEN[params.category] : catNamesPT[params.category]
  const articles = getArticlesByCategory(lookupName ?? catName, locale)

  return (
    <div className="mx-auto max-w-8xl px-4 py-10 sm:px-6">
      <Breadcrumbs crumbs={[
        { label: locale === 'en' ? 'Home' : 'Início', href: getLocalePath(locale) },
        { label: catName },
      ]} />

      <div className="mt-6 flex items-center gap-4">
        {cat && (
          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
            style={{ backgroundColor: cat.color + '22' }}
          >
            {cat.icon}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{catName}</h1>
          {cat && <p className="mt-1 text-gray-500">{cat.description[locale]}</p>}
        </div>
      </div>

      <AdSlot id="category-top" format="horizontal" />

      {articles.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center">
          <p className="text-lg text-gray-400">
            {locale === 'en' ? 'Comparison articles coming soon.' : 'Artigos comparativos em breve.'}
          </p>
        </div>
      )}
    </div>
  )
}

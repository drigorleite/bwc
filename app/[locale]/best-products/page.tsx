import { Metadata } from 'next'
import { Locale } from '@/types'
import { getLocalePath, SITE_URL, SITE_NAME } from '@/lib/utils'
import { getArticlesByLocale } from '@/data/articles/index'
import { categories } from '@/data/categories'
import { buildBreadcrumbSchema, buildItemListSchema } from '@/lib/schema'
import ArticleCard from '@/components/cards/ArticleCard'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import AdSlot from '@/components/ui/AdSlot'

interface Props { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale    = params.locale as Locale
  const isEN      = locale === 'en'
  const title     = isEN ? 'Best Products — All Comparison Guides' : 'Melhores Produtos — Todos os Guias Comparativos'
  const desc      = isEN
    ? 'Browse all our product comparison guides. Every guide is thoroughly researched, ranked by value, and updated regularly.'
    : 'Navegue por todos os nossos guias comparativos de produtos. Cada guia é pesquisado minuciosamente e atualizado regularmente.'
  const canonical = `${SITE_URL}/${locale}/best-products`
  return {
    title,
    description: desc,
    alternates: {
      canonical,
      languages: {
        'en-US':     `${SITE_URL}/en/best-products`,
        'pt-BR':     `${SITE_URL}/pt-br/best-products`,
        'x-default': `${SITE_URL}/en/best-products`,
      },
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`, description: desc, url: canonical,
      siteName: SITE_NAME, type: 'website',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description: desc, images: ['/og-image.png'] },
    robots:  { index: true, follow: true },
  }
}

export default function BestProductsPage({ params }: Props) {
  const locale   = params.locale as Locale
  const articles = getArticlesByLocale(locale)

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: locale === 'en' ? 'Home' : 'Início', url: `${SITE_URL}/${locale}` },
    { name: locale === 'en' ? 'Best Products' : 'Melhores Produtos', url: `${SITE_URL}/${locale}/best-products` },
  ])
  const itemListSchema = buildItemListSchema(
    articles.map((a) => ({ name: a.title, url: `${SITE_URL}/${locale}/${a.slug}`, description: a.metaDescription })),
    locale === 'en' ? 'All Product Comparison Guides' : 'Todos os Guias Comparativos'
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
    <div className="mx-auto max-w-8xl px-4 py-10 sm:px-6">
      <Breadcrumbs crumbs={[
        { label: locale === 'en' ? 'Home' : 'Início', href: getLocalePath(locale) },
        { label: locale === 'en' ? 'Best Products' : 'Melhores Produtos' },
      ]} />

      <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {locale === 'en' ? 'Best Products — All Guides' : 'Melhores Produtos — Todos os Guias'}
      </h1>
      <p className="mt-2 text-gray-500">
        {locale === 'en'
          ? `${articles.length} comparison guides, each thoroughly researched.`
          : `${articles.length} guias comparativos, cada um pesquisado minuciosamente.`}
      </p>

      <AdSlot id="best-top" format="horizontal" />

      {categories.map((cat) => {
        const catNamesEN: Record<string, string> = { 'watches-style': 'Watches & Style', 'beauty-skincare': 'Beauty & Skincare', 'kitchen-home': 'Kitchen & Home', 'tools-home-improvement': 'Tools & Home Improvement', 'office-productivity': 'Office & Productivity', 'pet-tech': 'Pet Tech' }
        const catNamesPT: Record<string, string> = { 'watches-style': 'Relógios & Estilo', 'beauty-skincare': 'Beleza & Skincare', 'kitchen-home': 'Cozinha & Casa', 'tools-home-improvement': 'Ferramentas & Reforma', 'office-productivity': 'Escritório & Produtividade', 'pet-tech': 'Pet Tech' }
        const lookupName = locale === 'en' ? catNamesEN[cat.slug] : catNamesPT[cat.slug]
        const catArticles = articles.filter((a) => a.category === lookupName)
        if (!catArticles.length) return null
        return (
          <section key={cat.slug} className="mt-12">
            <div className="mb-5 flex items-center gap-3">
              <span className="text-2xl">{cat.icon}</span>
              <h2 className="text-xl font-bold text-gray-900">{cat.name[locale]}</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {catArticles.map((a) => (
                <ArticleCard key={a.slug} article={a} locale={locale} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
    </>
  )
}

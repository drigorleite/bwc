import { Metadata } from 'next'
import Link from 'next/link'
import { Locale } from '@/types'
import { t } from '@/lib/i18n'
import { getLocalePath, SITE_NAME } from '@/lib/utils'
import { categories } from '@/data/categories'
import { getFeaturedArticles } from '@/data/articles/index'
import CategoryCard from '@/components/cards/CategoryCard'
import ArticleCard from '@/components/cards/ArticleCard'
import AdSlot from '@/components/ui/AdSlot'

interface Props { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  return {
    title:       locale === 'en' ? 'Honest Product Comparisons for Smarter Buying' : 'Comparações Honestas para Compras Mais Inteligentes',
    description: locale === 'en'
      ? 'Better Way Comparison: clear, honest product comparisons to help you buy the right product for your situation.'
      : 'Better Way Comparison: comparações honestas para ajudá-lo a comprar o produto certo para sua situação.',
    alternates: {
      canonical: `/${locale}`,
      languages: { 'en-US': '/en', 'pt-BR': '/pt-br' },
    },
  }
}

export default function HomePage({ params }: Props) {
  const locale   = params.locale as Locale
  const articles = getFeaturedArticles(locale, 6)
  const howWeChoose = locale === 'en'
    ? [
        { icon: '🔍', title: 'Deep Research',     desc: 'We analyze hundreds of user reviews and spec sheets before recommending anything.' },
        { icon: '💰', title: 'Real Value Focus',  desc: 'We rank products by value delivered per dollar, not just by specs.' },
        { icon: '🚫', title: 'No Paid Placements',desc: 'Our rankings are never influenced by brands. Affiliate commissions never affect our picks.' },
        { icon: '🔄', title: 'Regularly Updated', desc: 'Prices and products change. We update our recommendations every few months.' },
      ]
    : [
        { icon: '🔍', title: 'Pesquisa Profunda',   desc: 'Analisamos centenas de avaliações e especificações antes de recomendar qualquer produto.' },
        { icon: '💰', title: 'Foco em Valor Real',  desc: 'Classificamos produtos pelo valor entregue por real, não apenas pelas especificações.' },
        { icon: '🚫', title: 'Sem Posicionamento Pago', desc: 'Nossas classificações nunca são influenciadas por marcas. Comissões afiliadas nunca afetam nossas escolhas.' },
        { icon: '🔄', title: 'Atualizado Regularmente', desc: 'Preços e produtos mudam. Atualizamos nossas recomendações a cada poucos meses.' },
      ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 px-4 py-20 text-white sm:px-6 sm:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
            {locale === 'en' ? 'Trusted by smart shoppers worldwide' : 'Confiado por compradores inteligentes no mundo todo'}
          </div>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            {t(locale, 'hero.title')}
          </h1>
          <p className="mt-6 text-lg text-white/80 sm:text-xl">
            {t(locale, 'hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href={getLocalePath(locale, 'category/watches-style')}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-base font-bold text-white shadow-lg transition-colors hover:bg-accent-dark"
            >
              {t(locale, 'hero.cta.primary')}
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href={getLocalePath(locale, 'best-products')}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/30 bg-white/10 px-7 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              {t(locale, 'hero.cta.secondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
            {t(locale, 'featured.categories')}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} locale={locale} />
          ))}
        </div>
      </section>

      <AdSlot id="home-mid" format="horizontal" />

      {/* Featured Articles */}
      <section className="bg-gray-50 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-8xl">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              {t(locale, 'featured.articles')}
            </h2>
            <Link
              href={getLocalePath(locale, 'best-products')}
              className="text-sm font-medium text-brand-600 hover:underline"
            >
              {locale === 'en' ? 'View all →' : 'Ver todos →'}
            </Link>
          </div>
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
              <p className="text-gray-400">{locale === 'en' ? 'Articles coming soon.' : 'Artigos em breve.'}</p>
            </div>
          )}
        </div>
      </section>

      {/* How We Choose */}
      <section className="mx-auto max-w-8xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">{t(locale, 'how.title')}</h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">{t(locale, 'how.desc')}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howWeChoose.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
              <div className="mb-3 text-3xl">{item.icon}</div>
              <h3 className="mb-2 font-bold text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Email signup */}
      <section className="bg-brand-950 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            {t(locale, 'newsletter.title')}
          </h2>
          <p className="mt-3 text-brand-200">{t(locale, 'newsletter.subtitle')}</p>
          <form className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder={t(locale, 'newsletter.placeholder')}
              className="flex-1 rounded-xl border-0 bg-white/10 px-4 py-3 text-white placeholder-white/50 ring-1 ring-white/20 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="rounded-xl bg-accent px-8 py-3 font-bold text-white transition-colors hover:bg-accent-dark"
            >
              {t(locale, 'newsletter.cta')}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

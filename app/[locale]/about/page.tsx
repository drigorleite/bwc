import { Metadata } from 'next'
import { Locale } from '@/types'
import { getLocalePath, SITE_URL, SITE_NAME } from '@/lib/utils'
import { buildBreadcrumbSchema, buildOrganizationSchema } from '@/lib/schema'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface Props { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  const isEN   = locale === 'en'
  const title  = isEN ? 'About Us' : 'Sobre Nós'
  const desc   = isEN
    ? 'Learn about Better Way Comparison and how we choose our product recommendations. No paid placements, ever.'
    : 'Conheça a Better Way Comparison e como escolhemos nossas recomendações de produtos. Sem anúncios pagos.'
  return {
    title, description: desc,
    alternates: {
      canonical: `${SITE_URL}/${locale}/about`,
      languages: { 'en-US': `${SITE_URL}/en/about`, 'pt-BR': `${SITE_URL}/pt-br/about`, 'x-default': `${SITE_URL}/en/about` },
    },
    openGraph: { title: `${title} | ${SITE_NAME}`, description: desc, url: `${SITE_URL}/${locale}/about`, siteName: SITE_NAME, type: 'website', images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }] },
    robots: { index: true, follow: true },
  }
}

export default function AboutPage({ params }: Props) {
  const locale = params.locale as Locale
  const isEN = locale === 'en'
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: isEN ? 'Home' : 'Início', url: `${SITE_URL}/${locale}` },
    { name: isEN ? 'About' : 'Sobre', url: `${SITE_URL}/${locale}/about` },
  ])
  const orgSchema = buildOrganizationSchema()
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumbs crumbs={[
        { label: isEN ? 'Home' : 'Início', href: getLocalePath(locale) },
        { label: isEN ? 'About' : 'Sobre' },
      ]} />
      <h1 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">
        {isEN ? 'About Better Way Comparison' : 'Sobre a Better Way Comparison'}
      </h1>
      <div className="prose prose-gray mt-8 max-w-none">
        {isEN ? (
          <>
            <p className="text-lg text-gray-700">Better Way Comparison exists to answer one question: <strong>what is the right product for your specific situation?</strong></p>
            <p className="text-gray-600 mt-4">Most product recommendation sites are built to maximize clicks, not to genuinely help buyers. We built Better Way Comparison on the opposite philosophy: deep research, transparent trade-offs, and clear recommendations based on your actual needs — not on whoever paid for a placement.</p>
            <h2 className="mt-8 text-xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-gray-600">To be the most honest and useful product comparison resource for buyers in the US and Brazil. Every article we publish follows the same standard: research-backed recommendations, disclosed affiliate relationships, and no fake enthusiasm.</p>
            <h2 className="mt-8 text-xl font-bold text-gray-900">How We Make Money</h2>
            <p className="text-gray-600">We earn commissions through Amazon Associates and other affiliate programs when you click our links and make a purchase. This never affects our rankings or recommendations. We would rather lose commission than recommend a bad product.</p>
            <h2 className="mt-8 text-xl font-bold text-gray-900">Our Team</h2>
            <p className="text-gray-600">Our writers and researchers come from backgrounds in technology, home improvement, skincare, and consumer electronics. Every article is written by someone who has used or extensively researched the products being compared.</p>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-700">A Better Way Comparison existe para responder uma pergunta: <strong>qual é o produto certo para a sua situação específica?</strong></p>
            <p className="text-gray-600 mt-4">A maioria dos sites de recomendação de produtos é construída para maximizar cliques, não para genuinamente ajudar compradores. Construímos a Better Way Comparison com a filosofia oposta: pesquisa profunda, trade-offs transparentes e recomendações claras baseadas nas suas necessidades reais.</p>
            <h2 className="mt-8 text-xl font-bold text-gray-900">Nossa Missão</h2>
            <p className="text-gray-600">Ser o recurso de comparação de produtos mais honesto e útil para compradores no Brasil e nos EUA. Cada artigo que publicamos segue o mesmo padrão: recomendações baseadas em pesquisa, relacionamentos afiliados divulgados e zero entusiasmo falso.</p>
            <h2 className="mt-8 text-xl font-bold text-gray-900">Como Ganhamos Dinheiro</h2>
            <p className="text-gray-600">Ganhamos comissões por meio do Programa de Associados da Amazon e outros programas de afiliados quando você clica nos nossos links e faz uma compra. Isso nunca afeta nossas classificações ou recomendações.</p>
          </>
        )}
      </div>
    </div>
    </>
  )
}

import { Metadata } from 'next'
import { Locale } from '@/types'
import { getLocalePath } from '@/lib/utils'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface Props { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  return { title: locale === 'en' ? 'Terms of Use' : 'Termos de Uso' }
}

export default function TermsPage({ params }: Props) {
  const locale = params.locale as Locale
  const isEN = locale === 'en'
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumbs crumbs={[
        { label: isEN ? 'Home' : 'Início', href: getLocalePath(locale) },
        { label: isEN ? 'Terms of Use' : 'Termos de Uso' },
      ]} />
      <h1 className="mt-6 text-3xl font-extrabold text-gray-900">{isEN ? 'Terms of Use' : 'Termos de Uso'}</h1>
      <p className="mt-2 text-sm text-gray-400">{isEN ? 'Last updated: April 2025' : 'Última atualização: Abril de 2025'}</p>
      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
        {isEN ? (
          <>
            <p>By using Better Way Comparison, you agree to these terms. If you disagree with any part, please discontinue use.</p>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Content Accuracy</h2><p>We strive for accuracy in all our comparisons. Product prices, availability, and specifications change frequently. Always verify current information on the retailer&apos;s website before purchasing.</p></section>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Affiliate Links</h2><p>Our site contains affiliate links to Amazon and other retailers. We earn a commission when you make a purchase through these links. This is disclosed clearly on every article page.</p></section>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">No Warranty</h2><p>Information is provided &quot;as is&quot; without warranty. We are not responsible for purchasing decisions made based on our content.</p></section>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Intellectual Property</h2><p>All content on this site is the property of Better Way Comparison. Do not reproduce without permission.</p></section>
          </>
        ) : (
          <>
            <p>Ao usar a Better Way Comparison, você concorda com estes termos.</p>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Precisão do Conteúdo</h2><p>Nos esforçamos para ser precisos em todas as nossas comparações. Preços, disponibilidade e especificações de produtos mudam frequentemente. Sempre verifique as informações atuais no site do varejista antes de comprar.</p></section>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Links de Afiliados</h2><p>Nosso site contém links de afiliados para a Amazon e outros varejistas. Ganhamos uma comissão quando você faz uma compra por esses links, o que é divulgado claramente.</p></section>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Sem Garantia</h2><p>As informações são fornecidas &quot;como estão&quot; sem garantia. Não somos responsáveis por decisões de compra baseadas em nosso conteúdo.</p></section>
          </>
        )}
      </div>
    </div>
  )
}

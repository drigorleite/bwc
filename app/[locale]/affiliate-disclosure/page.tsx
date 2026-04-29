import { Metadata } from 'next'
import { Locale } from '@/types'
import { getLocalePath } from '@/lib/utils'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface Props { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  return { title: locale === 'en' ? 'Affiliate Disclosure' : 'Divulgação de Afiliados' }
}

export default function AffiliateDisclosurePage({ params }: Props) {
  const locale = params.locale as Locale
  const isEN = locale === 'en'
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumbs crumbs={[
        { label: isEN ? 'Home' : 'Início', href: getLocalePath(locale) },
        { label: isEN ? 'Affiliate Disclosure' : 'Divulgação de Afiliados' },
      ]} />
      <h1 className="mt-6 text-3xl font-extrabold text-gray-900">{isEN ? 'Affiliate Disclosure' : 'Divulgação de Afiliados'}</h1>
      <div className="mt-8 space-y-5 text-gray-600 leading-relaxed">
        {isEN ? (
          <>
            <p>Better Way Comparison is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</p>
            <p>We also participate in the Amazon Programa de Associados in Brazil, linking to Amazon.com.br.</p>
            <p><strong>When you click on our links and make a purchase,</strong> we may earn a commission at no extra cost to you. This helps us fund the research and writing that goes into our comparison articles.</p>
            <p><strong>Our editorial independence is non-negotiable.</strong> Affiliate commissions never influence our product rankings or recommendations. We regularly recommend products that earn us smaller commissions when we believe they are the right choice for our readers.</p>
            <p>If you have any questions about our affiliate relationships, please <a href={getLocalePath(locale, 'contact')} className="text-brand-600 hover:underline">contact us</a>.</p>
          </>
        ) : (
          <>
            <p>A Better Way Comparison participa do Programa de Associados da Amazon, um programa de publicidade afiliada projetado para fornecer um meio para sites ganharem taxas de publicidade ao anunciar e vincular à Amazon.com.br e Amazon.com.</p>
            <p><strong>Quando você clica em nossos links e faz uma compra,</strong> podemos ganhar uma comissão sem custo adicional para você. Isso nos ajuda a financiar a pesquisa e redação que entram em nossos artigos comparativos.</p>
            <p><strong>Nossa independência editorial é inegociável.</strong> Comissões de afiliados nunca influenciam nossas classificações ou recomendações de produtos.</p>
            <p>Se você tiver dúvidas sobre nossos relacionamentos de afiliados, por favor <a href={getLocalePath(locale, 'contact')} className="text-brand-600 hover:underline">entre em contato conosco</a>.</p>
          </>
        )}
      </div>
    </div>
  )
}

import { Metadata } from 'next'
import { Locale } from '@/types'
import { getLocalePath } from '@/lib/utils'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface Props { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  return { title: locale === 'en' ? 'Privacy Policy' : 'Política de Privacidade' }
}

export default function PrivacyPolicyPage({ params }: Props) {
  const locale = params.locale as Locale
  const isEN = locale === 'en'
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <Breadcrumbs crumbs={[
        { label: isEN ? 'Home' : 'Início', href: getLocalePath(locale) },
        { label: isEN ? 'Privacy Policy' : 'Política de Privacidade' },
      ]} />
      <h1 className="mt-6 text-3xl font-extrabold text-gray-900">{isEN ? 'Privacy Policy' : 'Política de Privacidade'}</h1>
      <p className="mt-2 text-sm text-gray-400">{isEN ? 'Last updated: April 2025' : 'Última atualização: Abril de 2025'}</p>
      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
        {isEN ? (
          <>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Information We Collect</h2><p>We collect information you provide directly, such as when you subscribe to our newsletter (email address). We also collect standard analytics data (page views, referring URLs, device type) through tools like Google Analytics.</p></section>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Cookies</h2><p>We use cookies for analytics and to personalize your experience. You can disable cookies in your browser settings. Affiliate links to Amazon use Amazon&apos;s own cookie technology.</p></section>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Third-Party Services</h2><p>We use Amazon Associates, Google Analytics, and display advertising networks. These services have their own privacy policies.</p></section>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Contact</h2><p>Questions about your data? <a href={getLocalePath(locale, 'contact')} className="text-brand-600 hover:underline">Contact us here</a>.</p></section>
          </>
        ) : (
          <>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Informações que Coletamos</h2><p>Coletamos informações que você fornece diretamente, como quando se inscreve em nossa newsletter (endereço de e-mail). Também coletamos dados analíticos padrão por meio do Google Analytics.</p></section>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Cookies</h2><p>Usamos cookies para análise e personalização. Você pode desativar os cookies nas configurações do seu navegador.</p></section>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Serviços de Terceiros</h2><p>Usamos Amazon Associados, Google Analytics e redes de publicidade. Esses serviços têm suas próprias políticas de privacidade.</p></section>
            <section><h2 className="mb-2 text-lg font-bold text-gray-900">Contato</h2><p>Dúvidas sobre seus dados? <a href={getLocalePath(locale, 'contact')} className="text-brand-600 hover:underline">Entre em contato conosco aqui</a>.</p></section>
          </>
        )}
      </div>
    </div>
  )
}

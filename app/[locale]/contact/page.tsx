import { Metadata } from 'next'
import { Locale } from '@/types'
import { getLocalePath } from '@/lib/utils'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

interface Props { params: { locale: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale as Locale
  return { title: locale === 'en' ? 'Contact Us' : 'Contato' }
}

export default function ContactPage({ params }: Props) {
  const locale = params.locale as Locale
  const isEN = locale === 'en'
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <Breadcrumbs crumbs={[
        { label: isEN ? 'Home' : 'Início', href: getLocalePath(locale) },
        { label: isEN ? 'Contact' : 'Contato' },
      ]} />
      <h1 className="mt-6 text-3xl font-extrabold text-gray-900">{isEN ? 'Contact Us' : 'Entre em Contato'}</h1>
      <p className="mt-3 text-gray-500">{isEN ? 'Questions, partnership inquiries, or corrections? Reach out below.' : 'Perguntas, parcerias ou correções? Entre em contato abaixo.'}</p>
      <form className="mt-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">{isEN ? 'Name' : 'Nome'}</label>
          <input type="text" className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{isEN ? 'Message' : 'Mensagem'}</label>
          <textarea rows={5} className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100" />
        </div>
        <button type="submit" className="w-full rounded-xl bg-brand-600 py-3 font-bold text-white transition-colors hover:bg-brand-700">
          {isEN ? 'Send Message' : 'Enviar Mensagem'}
        </button>
      </form>
    </div>
  )
}

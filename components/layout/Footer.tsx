import Link from 'next/link'
import Image from 'next/image'
import { Locale } from '@/types'
import { t } from '@/lib/i18n'
import { getLocalePath } from '@/lib/utils'

interface Props {
  locale: Locale
}

export default function Footer({ locale }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-8xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href={getLocalePath(locale)} className="flex items-center gap-2">
              <Image
                src="/icon.png"
                alt="Better Way Comparison"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="font-bold text-gray-900">
                Better Way <span className="text-brand-600">Comparison</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-gray-500">{t(locale, 'footer.tagline')}</p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {t(locale, 'nav.categories')}
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { slug: 'watches-style',          en: 'Watches & Style',       pt: 'Relógios & Estilo' },
                { slug: 'beauty-skincare',         en: 'Beauty & Skincare',     pt: 'Beleza & Skincare' },
                { slug: 'kitchen-home',            en: 'Kitchen & Home',        pt: 'Cozinha & Casa' },
                { slug: 'tools-home-improvement',  en: 'Tools & Improvement',   pt: 'Ferramentas' },
                { slug: 'office-productivity',     en: 'Office & Productivity', pt: 'Escritório' },
                { slug: 'pet-tech',                en: 'Pet Tech',              pt: 'Pet Tech' },
              ].map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={getLocalePath(locale, `category/${cat.slug}`)}
                    className="text-gray-500 hover:text-brand-600 transition-colors"
                  >
                    {locale === 'en' ? cat.en : cat.pt}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {locale === 'en' ? 'Pages' : 'Páginas'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={getLocalePath(locale, 'about')} className="text-gray-500 hover:text-brand-600 transition-colors">{t(locale, 'nav.about')}</Link></li>
              <li><Link href={getLocalePath(locale, 'contact')} className="text-gray-500 hover:text-brand-600 transition-colors">{t(locale, 'nav.contact')}</Link></li>
              <li><Link href={getLocalePath(locale, 'best-products')} className="text-gray-500 hover:text-brand-600 transition-colors">{t(locale, 'nav.best')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              {locale === 'en' ? 'Legal' : 'Legal'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={getLocalePath(locale, 'affiliate-disclosure')} className="text-gray-500 hover:text-brand-600 transition-colors">{t(locale, 'footer.disclosure')}</Link></li>
              <li><Link href={getLocalePath(locale, 'privacy-policy')} className="text-gray-500 hover:text-brand-600 transition-colors">{t(locale, 'footer.privacy')}</Link></li>
              <li><Link href={getLocalePath(locale, 'terms')} className="text-gray-500 hover:text-brand-600 transition-colors">{t(locale, 'footer.terms')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-gray-400">
          <p>© {year} Better Way Comparison. {locale === 'en' ? 'All rights reserved.' : 'Todos os direitos reservados.'}</p>
          <p className="mt-1">
            {locale === 'en'
              ? 'Better Way Comparison is a participant in the Amazon Services LLC Associates Program.'
              : 'Better Way Comparison participa do Programa de Associados da Amazon.'}
          </p>
          <p className="mt-2">
            {locale === 'en' ? 'Developed by ' : 'Desenvolvido por '}
            <a
              href="https://rodrigoleite.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand-600 transition-colors"
            >
              Rodrigo Ribeiro Leite
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

import { notFound } from 'next/navigation'
import { Locale } from '@/types'
import { locales, hreflangMap } from '@/lib/i18n'
import { SITE_URL } from '@/lib/utils'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface Props {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default function LocaleLayout({ children, params }: Props) {
  const locale = params.locale as Locale
  if (!locales.includes(locale)) notFound()

  const altLocale: Locale = locale === 'en' ? 'pt-br' : 'en'

  return (
    <>
      <head>
        <link rel="alternate" hrefLang={hreflangMap[locale]}    href={`${SITE_URL}/${locale}`} />
        <link rel="alternate" hrefLang={hreflangMap[altLocale]} href={`${SITE_URL}/${altLocale}`} />
        <link rel="alternate" hrefLang="x-default"              href={`${SITE_URL}/en`} />
      </head>
      <div className="flex min-h-screen flex-col">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </div>
    </>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Locale } from '@/types'
import { t, locales } from '@/lib/i18n'
import { getLocalePath } from '@/lib/utils'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

interface Props {
  locale: Locale
}

const categories = [
  { slug: 'watches-style',         icon: '⌚' },
  { slug: 'beauty-skincare',       icon: '✨' },
  { slug: 'kitchen-home',          icon: '🍳' },
  { slug: 'tools-home-improvement',icon: '🔧' },
  { slug: 'office-productivity',   icon: '💼' },
  { slug: 'pet-tech',              icon: '🐾' },
]

const categoryNames: Record<string, Record<string, string>> = {
  'watches-style':          { en: 'Watches & Style',       'pt-br': 'Relógios & Estilo' },
  'beauty-skincare':        { en: 'Beauty & Skincare',     'pt-br': 'Beleza & Skincare' },
  'kitchen-home':           { en: 'Kitchen & Home',        'pt-br': 'Cozinha & Casa' },
  'tools-home-improvement': { en: 'Tools & Home Improvement', 'pt-br': 'Ferramentas & Reforma' },
  'office-productivity':    { en: 'Office & Productivity', 'pt-br': 'Escritório & Produtividade' },
  'pet-tech':               { en: 'Pet Tech',              'pt-br': 'Pet Tech' },
}

export default function Header({ locale }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [catOpen,  setCatOpen]  = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href={getLocalePath(locale)} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-black text-white">B</span>
          <span className="hidden font-bold text-gray-900 sm:block">
            Better Way <span className="text-brand-600">Comparison</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href={getLocalePath(locale)} className="text-gray-600 hover:text-gray-900 transition-colors">
            {t(locale, 'nav.home')}
          </Link>

          <div className="relative" onMouseLeave={() => setCatOpen(false)}>
            <button
              onMouseEnter={() => setCatOpen(true)}
              className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {t(locale, 'nav.categories')}
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            {catOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={getLocalePath(locale, `category/${cat.slug}`)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600"
                  >
                    <span>{cat.icon}</span>
                    {categoryNames[cat.slug][locale]}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href={getLocalePath(locale, 'best-products')} className="text-gray-600 hover:text-gray-900 transition-colors">
            {t(locale, 'nav.best')}
          </Link>
          <Link href={getLocalePath(locale, 'about')} className="text-gray-600 hover:text-gray-900 transition-colors">
            {t(locale, 'nav.about')}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher locale={locale} />
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="space-y-1">
            <Link href={getLocalePath(locale)} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
              {t(locale, 'nav.home')}
            </Link>
            {categories.map((cat) => (
              <Link key={cat.slug} href={getLocalePath(locale, `category/${cat.slug}`)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
                <span>{cat.icon}</span>
                {categoryNames[cat.slug][locale]}
              </Link>
            ))}
            <Link href={getLocalePath(locale, 'best-products')} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
              {t(locale, 'nav.best')}
            </Link>
            <Link href={getLocalePath(locale, 'about')} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={() => setMenuOpen(false)}>
              {t(locale, 'nav.about')}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

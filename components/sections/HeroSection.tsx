'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Locale } from '@/types'
import { t } from '@/lib/i18n'
import { getLocalePath } from '@/lib/utils'

interface Props {
  locale: Locale
}

const stats = [
  { value: '10+', labelEn: 'Categories',   labelPt: 'Categorias' },
  { value: '50+', labelEn: 'Comparisons',  labelPt: 'Comparações' },
  { value: '100%', labelEn: 'Independent', labelPt: 'Independente' },
]

export default function HeroSection({ locale }: Props) {
  return (
    <section className="hero-mesh relative overflow-hidden px-4 pb-0 pt-20 text-white sm:px-6 sm:pt-28">
      {/* Decorative floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-brand-500 opacity-10 blur-3xl" />
        <div className="animate-float-med delay-300 absolute -bottom-24 -left-24 h-[380px] w-[380px] rounded-full bg-accent opacity-10 blur-3xl" />
        <div className="animate-float-slow delay-500 absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-brand-400 opacity-5 blur-3xl" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Pill badge */}
        <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400"></span>
          </span>
          {locale === 'en' ? 'Trusted by smart shoppers worldwide' : 'Confiado por compradores inteligentes no mundo todo'}
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-in-up delay-100 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {locale === 'en' ? (
            <>
              Stop guessing.<br />
              <span className="text-shimmer">Start comparing.</span>
            </>
          ) : (
            <>
              Pare de adivinhar.<br />
              <span className="text-shimmer">Comece a comparar.</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-2xl text-lg text-white/75 sm:text-xl">
          {t(locale, 'hero.subtitle')}
        </p>

        {/* CTA buttons */}
        <div className="animate-fade-in-up delay-300 mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href={getLocalePath(locale, 'best-products')}
            className="group inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-base font-bold text-white shadow-lg shadow-accent/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/40"
          >
            {t(locale, 'hero.cta.primary')}
            <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <Link
            href={getLocalePath(locale, 'category/kitchen-home')}
            className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 hover:border-white/40"
          >
            {t(locale, 'hero.cta.secondary')}
          </Link>
        </div>

        {/* Stats row */}
        <div className="animate-fade-in-up delay-400 mt-14 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          {stats.map((stat, i) => (
            <div key={stat.value} className="px-6 py-5">
              <div className={`animate-count-up delay-${(i + 5) * 100} text-3xl font-extrabold text-white sm:text-4xl`}>
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
                {locale === 'en' ? stat.labelEn : stat.labelPt}
              </div>
            </div>
          ))}
        </div>

        {/* Icon floating above wave */}
        <div className="animate-fade-in delay-500 mt-12 flex justify-center">
          <div className="animate-float-med relative">
            <div className="absolute -inset-4 rounded-full bg-brand-500 opacity-20 blur-xl" />
            <Image
              src="/icon.png"
              alt="Better Way Comparison"
              width={80}
              height={80}
              className="relative h-20 w-20 object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative mt-16 h-16 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 64"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32 C240,64 480,0 720,32 C960,64 1200,0 1440,32 L1440,64 L0,64 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}

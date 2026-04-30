import { Locale } from '@/types'
import { t } from '@/lib/i18n'

interface Props {
  locale: Locale
}

const perks = {
  en: [
    { icon: '🎯', text: 'Curated top picks, not filler' },
    { icon: '📅', text: 'Monthly roundups only' },
    { icon: '🔒', text: 'No spam, ever' },
  ],
  'pt-br': [
    { icon: '🎯', text: 'Seleções curadas, sem enrolação' },
    { icon: '📅', text: 'Apenas resumos mensais' },
    { icon: '🔒', text: 'Sem spam, nunca' },
  ],
}

export default function NewsletterSection({ locale }: Props) {
  const items = perks[locale]

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 p-10 text-white shadow-2xl sm:p-14">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-500 opacity-20 blur-3xl" />
            <div className="absolute -bottom-10 left-10 h-48 w-48 rounded-full bg-accent opacity-15 blur-3xl" />
          </div>

          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left: copy */}
            <div>
              <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/70">
                {locale === 'en' ? 'Stay in the loop' : 'Fique por dentro'}
              </span>
              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                {t(locale, 'newsletter.title')}
              </h2>
              <p className="mt-3 text-brand-200">{t(locale, 'newsletter.subtitle')}</p>

              {/* Perks */}
              <ul className="mt-6 space-y-2">
                {items.map((perk) => (
                  <li key={perk.text} className="flex items-center gap-2.5 text-sm text-white/80">
                    <span className="text-base">{perk.icon}</span>
                    {perk.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form */}
            <div>
              <form className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder={t(locale, 'newsletter.placeholder')}
                  className="w-full rounded-xl border-0 bg-white/15 px-5 py-3.5 text-white placeholder-white/40 ring-1 ring-white/20 backdrop-blur-sm transition focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-accent px-8 py-3.5 font-bold text-white shadow-lg shadow-accent/30 transition-all hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5"
                >
                  {t(locale, 'newsletter.cta')}
                </button>
              </form>
              <p className="mt-3 text-center text-xs text-white/40">
                {locale === 'en'
                  ? 'Join thousands of smart shoppers. Unsubscribe anytime.'
                  : 'Junte-se a milhares de compradores inteligentes. Cancele quando quiser.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

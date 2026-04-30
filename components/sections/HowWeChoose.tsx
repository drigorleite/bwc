import { Locale } from '@/types'

interface Props {
  locale: Locale
}

const steps = {
  en: [
    {
      icon: '🔍',
      color: '#0066dd',
      bg: '#e0efff',
      title: 'Deep Research',
      desc: 'We analyze hundreds of user reviews and spec sheets before recommending anything.',
      step: '01',
    },
    {
      icon: '💰',
      color: '#34c759',
      bg: '#dcf5e4',
      title: 'Real Value Focus',
      desc: 'We rank products by value delivered per dollar, not just by specs or brand prestige.',
      step: '02',
    },
    {
      icon: '🚫',
      color: '#ff6b35',
      bg: '#ffe8df',
      title: 'No Paid Placements',
      desc: 'Our rankings are never influenced by brands. Affiliate commissions never affect our picks.',
      step: '03',
    },
    {
      icon: '🔄',
      color: '#5856d6',
      bg: '#eeeeff',
      title: 'Regularly Updated',
      desc: 'Prices and products change. We update our recommendations every few months.',
      step: '04',
    },
  ],
  'pt-br': [
    {
      icon: '🔍',
      color: '#0066dd',
      bg: '#e0efff',
      title: 'Pesquisa Profunda',
      desc: 'Analisamos centenas de avaliações e especificações antes de recomendar qualquer produto.',
      step: '01',
    },
    {
      icon: '💰',
      color: '#34c759',
      bg: '#dcf5e4',
      title: 'Foco em Valor Real',
      desc: 'Classificamos produtos pelo valor entregue por real, não apenas pelas especificações.',
      step: '02',
    },
    {
      icon: '🚫',
      color: '#ff6b35',
      bg: '#ffe8df',
      title: 'Sem Posicionamento Pago',
      desc: 'Nossas classificações nunca são influenciadas por marcas. Comissões afiliadas nunca afetam nossas escolhas.',
      step: '03',
    },
    {
      icon: '🔄',
      color: '#5856d6',
      bg: '#eeeeff',
      title: 'Atualizado Regularmente',
      desc: 'Preços e produtos mudam. Atualizamos nossas recomendações a cada poucos meses.',
      step: '04',
    },
  ],
}

export default function HowWeChoose({ locale }: Props) {
  const items = steps[locale]

  return (
    <section className="relative overflow-hidden bg-brand-950 px-4 py-20 sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-brand-800 opacity-30 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-accent opacity-10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-8xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/70">
            {locale === 'en' ? 'Our methodology' : 'Nossa metodologia'}
          </span>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            {locale === 'en' ? 'How We Choose Products' : 'Como Escolhemos os Produtos'}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-200">
            {locale === 'en'
              ? 'Every recommendation is based on real research, user feedback, and value analysis — never paid placement.'
              : 'Cada recomendação é baseada em pesquisa real, feedback de usuários e análise de valor — nunca em anúncios pagos.'}
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.step}
              className={`animate-fade-in-up delay-${(i + 1) * 100} relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20`}
            >
              {/* Step number */}
              <span className="absolute right-4 top-4 text-5xl font-black text-white/5 select-none">
                {item.step}
              </span>
              {/* Icon */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                style={{ backgroundColor: item.bg }}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-200">{item.desc}</p>
              </div>
              {/* Colored bottom accent */}
              <div
                className="absolute bottom-0 left-6 right-6 h-0.5 rounded-full opacity-40"
                style={{ backgroundColor: item.color }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Locale } from '@/types'

interface Props {
  locale: Locale
}

const signals = [
  { icon: '🔍', en: 'Deep independent research',    pt: 'Pesquisa independente profunda' },
  { icon: '💰', en: 'No paid placements ever',      pt: 'Sem posicionamento pago' },
  { icon: '🔄', en: 'Updated every few months',     pt: 'Atualizado regularmente' },
  { icon: '⭐', en: 'Real user feedback analyzed',  pt: 'Feedback real de usuários' },
  { icon: '🛡️', en: 'Editorial independence',       pt: 'Independência editorial' },
  { icon: '📊', en: 'Value-per-dollar ranking',     pt: 'Ranking por custo-benefício' },
]

export default function TrustBar({ locale }: Props) {
  const doubled = [...signals, ...signals]

  return (
    <div className="overflow-hidden border-y border-gray-100 bg-gray-50 py-3">
      <div className="marquee-track animate-marquee flex items-center gap-0">
        {doubled.map((s, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2 px-8 text-sm font-medium text-gray-600"
          >
            <span className="text-base">{s.icon}</span>
            <span>{locale === 'en' ? s.en : s.pt}</span>
            <span className="ml-8 text-gray-300">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}

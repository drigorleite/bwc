import { Locale } from '@/types'
import { t } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface Props {
  href: string
  locale: Locale
  variant?: 'primary' | 'secondary' | 'ghost'
  label?: 'check' | 'see' | 'view'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function AffiliateButton({
  href,
  locale,
  variant = 'primary',
  label = 'check',
  className,
  size = 'md',
}: Props) {
  const labelKey = {
    check: 'cta.check.price',
    see:   'cta.see.price',
    view:  'cta.view.amazon',
  }[label]

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }[size]

  const variantClasses = {
    primary:   'bg-accent hover:bg-accent-dark text-white font-semibold shadow-sm',
    secondary: 'bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-sm',
    ghost:     'border-2 border-brand-600 text-brand-600 hover:bg-brand-50 font-semibold',
  }[variant]

  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer sponsored"
      className={cn(
        'inline-flex items-center gap-2 rounded-lg transition-colors duration-150',
        sizeClasses,
        variantClasses,
        className,
      )}
    >
      <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 12.5v5a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 014 17.5v-11A2.5 2.5 0 016.5 4h5a.5.5 0 010 1h-5A1.5 1.5 0 005 6.5v11A1.5 1.5 0 006.5 19h11a1.5 1.5 0 001.5-1.5v-5a.5.5 0 011 0zM19.5 4h-5a.5.5 0 000 1h3.793l-8.147 8.146a.5.5 0 00.708.708L20 5.707V9.5a.5.5 0 001 0v-5a.5.5 0 00-.5-.5z"/>
      </svg>
      {t(locale, labelKey)}
    </a>
  )
}

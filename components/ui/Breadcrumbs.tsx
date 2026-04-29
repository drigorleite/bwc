import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

interface Props {
  crumbs: Crumb[]
}

export default function Breadcrumbs({ crumbs }: Props) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
        {crumbs.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <svg className="h-3 w-3 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            )}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-brand-600 transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="font-medium text-gray-800">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
